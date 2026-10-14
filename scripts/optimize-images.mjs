import fs from 'node:fs';

const thumbnails = JSON.parse(fs.readFileSync(new URL('./thumbnail-manifest.json', import.meta.url), 'utf8'));

// Keep original artwork for downloads/social cards; use small, sized covers in-page.
export function optimizeImages(html) {
  return html.replace(/<(?:img|video)\b[^>]*>/g, tag => {
    const isVideo = tag.startsWith('<video');
    const match = tag.match(isVideo ? /\bposter="([^"]+)"/ : /\b(?:data-)?src="([^"]+)"/);
    if (!match || /^(?:https?:|data:)/.test(match[1])) return tag;
    const cover = thumbnails[decodeURIComponent(match[1]).replace(/^\//, '').toLowerCase()];
    if (!cover) return tag;
    tag = tag.replace(match[0], `${isVideo ? 'poster' : 'src'}="${cover.src}"`);
    if (!isVideo && !/\bwidth=/.test(tag)) tag = tag.replace('<img', `<img width="${cover.width}" height="${cover.height}"`);
    return tag;
  });
}
