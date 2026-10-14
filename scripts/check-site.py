"""Check generated routes, assets, structured data, and form/image contracts."""
from collections import Counter
from html.parser import HTMLParser
import json
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parent.parent


class Page(HTMLParser):
    def __init__(self, path):
        super().__init__()
        self.path, self.refs, self.ids, self.images, self.forms = path, [], [], [], []
        self.structured, self.json_text = [], None
        self.posters = []

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get('id'):
            self.ids.append(attrs['id'])
        for name in ('href', 'src', 'data-src', 'poster'):
            if attrs.get(name):
                self.refs.append(attrs[name])
        if tag == 'img':
            self.images.append(attrs)
        if tag == 'video' and attrs.get('poster'):
            self.posters.append(attrs['poster'])
        if tag == 'form':
            self.forms.append({'attrs': attrs, 'fields': []})
        if tag in ('input', 'textarea', 'select') and self.forms:
            self.forms[-1]['fields'].append(attrs)
        if tag == 'script' and attrs.get('type') == 'application/ld+json':
            self.json_text = ''

    def handle_data(self, data):
        if self.json_text is not None:
            self.json_text += data

    def handle_endtag(self, tag):
        if tag == 'script' and self.json_text is not None:
            self.structured.append(json.loads(self.json_text))
            self.json_text = None


pages = {}
for path in ROOT.rglob('*.html'):
    if '.git' in path.parts:
        continue
    page = Page(path)
    page.feed(path.read_text())
    pages[path] = page

covers = {name.lower() for name in json.loads((ROOT / 'scripts/thumbnail-manifest.json').read_text())}
errors, refs, images = [], 0, 0
for path, page in pages.items():
    label = str(path.relative_to(ROOT))
    errors.extend(f'{label}: duplicate id {name}' for name, count in Counter(page.ids).items() if count > 1)
    for ref in page.refs:
        url = urlsplit(ref)
        if url.scheme or url.netloc:
            continue
        refs += 1
        target = (ROOT / unquote(url.path).lstrip('/') if url.path.startswith('/') else path.parent / unquote(url.path)).resolve()
        if not url.path:
            target = path
        if target.is_dir():
            target /= 'index.html'
        if not target.is_file():
            errors.append(f'{label}: missing asset/route {ref}')
        elif url.fragment and target in pages and unquote(url.fragment) not in pages[target].ids:
            errors.append(f'{label}: missing anchor {ref}')
    for image in page.images:
        images += 1
        src = image.get('src', '')
        if unquote(src).lstrip('/').lower() in covers:
            errors.append(f'{label}: project cover bypasses optimized thumbnail: {src}')
        if '/thumbnails/' in src:
            if not image.get('width') or not image.get('height'):
                errors.append(f'{label}: thumbnail has no reserved dimensions: {src}')
        if 'alt' not in image:
            errors.append(f'{label}: image has no alt attribute')
        if image.get('data-src') and '/scenes/' not in image['data-src']:
            errors.append(f'{label}: image relies on script hydration')
    for poster in page.posters:
        if unquote(poster).lstrip('/').lower() in covers:
            errors.append(f'{label}: video poster bypasses optimized cover: {poster}')
    for form in page.forms:
        attrs = form['attrs']
        if attrs.get('data-netlify') != 'true':
            continue
        fields = {field.get('name'): field for field in form['fields']}
        if fields.get('form-name', {}).get('value') != attrs.get('name'):
            errors.append(f'{label}: Netlify form name does not match')
        if attrs.get('netlify-honeypot') not in fields:
            errors.append(f'{label}: Netlify honeypot is missing')
    if 'cdn.jsdelivr.net/npm/gsap' in path.read_text() or 'cdn.jsdelivr.net/npm/lenis' in path.read_text():
        errors.append(f'{label}: blocking motion dependency restored')

print(f'Checked {len(pages)} pages, {refs} local references, and {images} images.')
if errors:
    raise SystemExit('\n'.join(errors))
print('PASS: routes, anchors, assets, image sizing, JSON-LD, and Netlify form declarations.')
