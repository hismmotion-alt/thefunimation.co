import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ORG_SCHEMA = {
  '@type': 'Organization',
  '@id': 'https://thefunimation.co/#organization',
  name: 'Funimation Studio',
  alternateName: 'Funimation',
  url: 'https://thefunimation.co/',
  logo: 'https://thefunimation.co/Fun!%20logo%20dark.svg',
  email: 'hello@thefunimation.co',
  telephone: '+1-818-966-4249',
  description: 'Funimation creates explainer videos, product animation, and interactive web motion for SaaS and startups across the US and Canada.',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '16437 Knapp Street',
    addressLocality: 'North Hills',
    addressRegion: 'CA',
    addressCountry: 'US'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    telephone: '+1-818-966-4249',
    email: 'hello@thefunimation.co',
    availableLanguage: 'English'
  },
  areaServed: [
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Country', name: 'Canada' }
  ],
  sameAs: [
    'https://www.linkedin.com/company/funanimation/'
  ]
};

function escape(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function nav(current) {
  const item = (href, label, key) => {
    const active = current === key ? ' aria-current="page"' : '';
    return `<a href="${href}"${active}>${label}</a>`;
  };
  return `<nav>
  <div class="nav-inner">
    <a class="logo" href="/" aria-label="Funimation Studio home">
      <img src="/Fun!%20logo%20dark.svg" alt="Funimation Studio">
    </a>
    <button class="nav-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="primaryNav">☰</button>
    <div class="nav-links" id="primaryNav">
      ${item('/work/', 'Work', 'work')}
      ${item('/services/', 'Services', 'services')}
      ${item('/process/', 'Process', 'process')}
      ${item('/about/', 'About', 'about')}
      ${item('/contact/', 'Get a free consultation', 'contact').replace('<a ', '<a class="btn-primary" ')}
    </div>
  </div>
</nav>`;
}

function footer() {
  return `<footer>
  <div class="footer-inner">
    <div class="footer-brand">
      <div class="logo logo-footer" style="margin-bottom:4px;">
        <img src="/Fun!%20logo%20white.svg" alt="Funimation Studio" loading="lazy" decoding="async">
      </div>
      <p>A Los Angeles–based animation studio creating explainer videos, interactive web animations, app motion, character animation, and motion graphics for SaaS companies, startups, and modern businesses.</p>
    </div>
    <div class="footer-col">
      <h6>Navigation</h6>
      <a href="/work/">Work</a>
      <a href="/services/">Services</a>
      <a href="/process/">Process</a>
      <a href="/about/">About</a>
      <a href="/industries/">Industries</a>
      <a href="/blog/">Blog</a>
      <a href="/contact/">Contact</a>
    </div>
    <div class="footer-col">
      <h6>Services</h6>
      <a href="/services/explainer-videos/">Explainer Videos</a>
      <a href="/services/saas-product-animation/">SaaS Animation</a>
      <a href="/services/interactive-web-animation/">Web Animation</a>
      <a href="/services/app-motion-design/">App Motion</a>
      <a href="/services/character-animation/">Character Animation</a>
      <a href="/services/motion-graphics/">Motion Graphics</a>
    </div>
    <div class="footer-col">
      <h6>Contact</h6>
      <a href="mailto:hello@thefunimation.co">hello@thefunimation.co</a>
      <a href="tel:+18189664249">(+1) 818 966 4249</a>
      <span class="footer-contact-text">16437 Knapp Street<br>North Hills, CA</span>
      <a href="https://www.linkedin.com/company/funanimation/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
    </div>
  </div>
  <div class="footer-bottom">
    <span>© 2026 Funimation Studio. All rights reserved.</span>
    <span>Made with motion ✨</span>
  </div>
</footer>`;
}

function faq(items) {
  return `<div class="faq-list reveal">
      ${items.map(({ q, a }) => `<div class="faq-item">
        <button class="faq-q" onclick="this.parentElement.classList.toggle('open')">
          ${q}
          <span class="icon">+</span>
        </button>
        <div class="faq-a"><p>${a}</p></div>
      </div>`).join('\n      ')}
    </div>`;
}

function cta(title, copy, primary = { href: '/contact/', label: 'Get a free consultation' }, secondary = { href: '/work/', label: 'See our work' }) {
  return `<section class="final-cta" id="cta">
  <div class="blob blob-1" style="width:450px;height:450px"></div>
  <div class="blob blob-2" style="width:380px;height:380px"></div>
  <h2>${title}</h2>
  <p>${copy}</p>
  <div class="hero-btns">
    <a href="${primary.href}" class="btn-primary">${primary.label}</a>
    <a href="${secondary.href}" class="btn-secondary">${secondary.label}</a>
  </div>
</section>`;
}

const HERO_CTAS = `<div class="hero-btns">
      <a href="/contact/" class="btn-primary">Get a free consultation</a>
      <a href="/work/" class="btn-secondary">See our work</a>
    </div>`;

function proofStrip({ video, poster, stills = [], label = 'Work in motion' }) {
  const cells = [];
  if (video) {
    cells.push(`<div class="proof-cell proof-video" data-hydrate-media>
      <video controls preload="none" poster="${poster}" width="1920" height="1080">
        <source data-src="${video}" type="video/mp4">
      </video>
    </div>`);
  }
  stills.forEach(still => {
    cells.push(`<div class="proof-cell"><img src="${still.src}" alt="${escape(still.alt)}" loading="lazy" decoding="async"></div>`);
  });
  return `<section class="proof-strip" aria-label="${escape(label)}">
  <div class="section-inner proof-strip-inner">
    ${cells.join('\n    ')}
  </div>
</section>`;
}

function page({ title, description, canonical, ogImage, ogAlt, ogType = 'website', current, schema = [], body }) {
  const graph = [ORG_SCHEMA, {
    '@type': 'WebSite',
    '@id': 'https://thefunimation.co/#website',
    url: 'https://thefunimation.co/',
    name: 'Funimation Studio',
    alternateName: 'Funimation',
    publisher: { '@id': 'https://thefunimation.co/#organization' },
    inLanguage: 'en-US'
  }, ...schema];
  const image = ogImage || 'https://thefunimation.co/1st%20project/cover.png';
  const alt = ogAlt || 'Funimation Studio animation work';
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'AW-18298026066');
    gtag('config', 'G-N7NFT18ENX');
    window.addEventListener('load', function () {
      var s = document.createElement('script');
      s.src = 'https://www.googletagmanager.com/gtag/js?id=AW-18298026066';
      s.async = true;
      document.head.appendChild(s);
    }, { once: true });
  </script>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escape(title)}</title>
<meta name="description" content="${escape(description)}">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<link rel="canonical" href="${canonical}">
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png?v=5">
<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png?v=5">
<link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png?v=5">
<link rel="icon" type="image/png" sizes="512x512" href="/favicon-512x512.png?v=5">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png?v=5">
<link rel="shortcut icon" href="/favicon.ico?v=5">
<link rel="icon" type="image/svg+xml" href="/Fun!%20logo%20dark.svg?v=5">
<meta name="theme-color" content="#FAFAF8">
<meta property="og:type" content="${ogType}">
<meta property="og:site_name" content="Funimation Studio">
<meta property="og:url" content="${canonical}">
<meta property="og:title" content="${escape(title)}">
<meta property="og:description" content="${escape(description)}">
<meta property="og:image" content="${image}">
<meta property="og:image:alt" content="${escape(alt)}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${escape(title)}">
<meta name="twitter:description" content="${escape(description)}">
<meta name="twitter:image" content="${image}">
<link rel="preconnect" href="https://cdn.jsdelivr.net" crossorigin>
<link rel="preload" href="/fonts/sora-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/css/site.css">
<script type="application/ld+json">
${JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }, null, 2)}
</script>

</head>
<body>
<div class="scroll-progress" aria-hidden="true"></div>
${nav(current)}
${body}
${footer()}
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/lenis@1.3.23/dist/lenis.min.js" defer></script>
<script src="/js/site.js" defer></script>
</body>
</html>
`;
}

function serviceSchema(name, serviceType, url, description) {
  return {
    '@type': 'Service',
    name,
    serviceType,
    description,
    url,
    provider: { '@id': 'https://thefunimation.co/#organization' },
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'Canada' }
    ]
  };
}

function writePage(rel, html) {
  const dest = path.join('/workspace', rel, 'index.html');
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.writeFileSync(dest, html);
  console.log('wrote', dest);
}

function moreIndustries(exclude) {
  const cards = [
    { key: 'saas', href: '/industries/saas-startups/', title: 'SaaS &amp; startups', copy: 'Explainers and product motion for teams that ship software every week.', more: 'SaaS animation →' },
    { key: 'health', href: '/industries/healthcare/', title: 'Healthcare', copy: 'Patient-facing and clinical-product stories that stay human, not institutional.', more: 'Healthcare animation →' },
    { key: 'ag', href: '/industries/agtech-cloud-sustainability/', title: 'AgTech, cloud &amp; sustainability', copy: 'Field systems, cloud platforms, and mission-led products that need to be seen.', more: 'AgTech &amp; cloud →' }
  ].filter(card => card.key !== exclude);
  cards.push({ key: 'hub', href: '/industries/', title: 'All industries', copy: 'SaaS, healthcare, and AgTech — one studio, the work that matches the brief.', more: 'Browse industries →' });
  return `<section class="section" style="background:#fff">
  <div class="section-inner">
    <h2 class="section-title">More industries</h2>
    <p class="section-desc">The same craft, different buyers. See the work that sits next to this one.</p>
    <div class="services-grid">
      ${cards.map(card => `<a class="service-card" href="${card.href}"><h3>${card.title}</h3><p>${card.copy}</p><span class="service-more">${card.more}</span></a>`).join('\n      ')}
    </div>
  </div>
</section>`;
}

const ARTICLES = [
  {
    slug: '2d-vs-3d-animation',
    kicker: 'Craft notes',
    title: '2D vs 3D animation: which one actually helps your product?',
    description: 'A practical look at 2D versus 3D animation for explainers and product stories — when each earns its keep, and when 2D is the clearer choice.',
    ogImage: 'https://thefunimation.co/11%20project/cover.png',
    ogAlt: 'CaraKit 2D explainer still by Funimation',
    date: '2026-09-04',
    dateLabel: 'September 4, 2026'
  },
  {
    slug: 'rive-vs-lottie',
    kicker: 'Interactive motion',
    title: 'Rive vs Lottie: pick the runtime that fits the product',
    description: 'How we choose between Rive and Lottie for websites, apps, and product UI — without treating either as a default.',
    ogImage: 'https://thefunimation.co/bazaar/frames/01.png',
    ogAlt: 'Bazaar interactive icon still by Funimation',
    date: '2026-09-04',
    dateLabel: 'September 4, 2026'
  },
  {
    slug: 'explainer-video-length',
    kicker: 'Explainers',
    title: 'How long should an explainer video be?',
    description: 'Ideal explainer video length depends on the job: homepage story, feature launch, or paid social. Here is how we decide.',
    ogImage: 'https://thefunimation.co/4th%20project/cover.png',
    ogAlt: 'Sela Cloud explainer still by Funimation',
    date: '2026-09-04',
    dateLabel: 'September 4, 2026'
  },
  {
    slug: 'saas-onboarding-animation',
    kicker: 'Product motion',
    title: 'SaaS onboarding animation that helps people start',
    description: 'Onboarding animation and micro-interactions that make a SaaS product feel finished — without decorating every tap.',
    ogImage: 'https://thefunimation.co/8th%20project/cover-08.png',
    ogAlt: 'Secufy SOS app explainer still by Funimation',
    date: '2026-09-04',
    dateLabel: 'September 4, 2026'
  }
];

function articleSchema(article) {
  return {
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.description,
    url: `https://thefunimation.co/blog/${article.slug}/`,
    datePublished: article.date,
    dateModified: article.date,
    image: article.ogImage,
    inLanguage: 'en-US',
    author: {
      '@type': 'Organization',
      name: 'Funimation',
      '@id': 'https://thefunimation.co/#organization'
    },
    publisher: {
      '@id': 'https://thefunimation.co/#organization'
    },
    mainEntityOfPage: `https://thefunimation.co/blog/${article.slug}/`
  };
}

function relatedArticles(slug) {
  const others = ARTICLES.filter(article => article.slug !== slug).slice(0, 3);
  return `<section class="section">
  <div class="section-inner">
    <h2 class="section-title">Keep reading</h2>
    <div class="blog-list">
      ${others.map(article => `<a class="blog-card" href="/blog/${article.slug}/">
        <p class="blog-card-kicker">${article.kicker}</p>
        <h2>${escape(article.title)}</h2>
        <p>${escape(article.description)}</p>
        <span class="service-more">Read article →</span>
      </a>`).join('\n      ')}
    </div>
  </div>
</section>`;
}

export function registerPhase3({
  page: pageFn = page,
  faq: faqFn = faq,
  cta: ctaFn = cta,
  proofStrip: proofFn = proofStrip,
  serviceSchema: serviceFn = serviceSchema,
  writePage: writeFn = writePage,
  HERO_CTAS: heroCtas = HERO_CTAS
} = {}) {
  const industriesHub = pageFn({
    title: 'Industries We Animate For - Funimation',
    description: 'Animation for SaaS and startups, healthcare, and AgTech, cloud, and sustainability. See the work, then get a free consultation.',
    canonical: 'https://thefunimation.co/industries/',
    current: 'services',
    ogImage: 'https://thefunimation.co/3rd%20project/cover.png',
    ogAlt: 'Before Health healthcare explainer by Funimation',
    schema: [{
      '@type': 'CollectionPage',
      name: 'Industries',
      url: 'https://thefunimation.co/industries/',
      description: 'Industry pages for Funimation animation work across SaaS, healthcare, and AgTech.',
      isPartOf: { '@id': 'https://thefunimation.co/#website' }
    }],
    body: `<header class="page-hero">
  <div class="section-inner">
    <nav class="crumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span>Industries</span></nav>
    <p class="page-kicker">Industries</p>
    <h1>Animation for the stories we know how to tell.</h1>
    <p class="lead">Funimation works where the product is hard to see on a slide: software, care, and the systems that grow or move the world. These pages are about the work — not a generic industry pitch.</p>
    ${heroCtas}
  </div>
</header>
<section class="section" style="background:#fff">
  <div class="section-inner">
    <div class="services-grid">
      <a class="service-card" href="/industries/saas-startups/"><h3>SaaS &amp; startups</h3><p>Explainers, feature motion, and interactive product stories for teams that ship software.</p><span class="service-more">See SaaS work →</span></a>
      <a class="service-card" href="/industries/healthcare/"><h3>Healthcare</h3><p>Patient education, clinical products, and safety flows that have to stay clear under scrutiny.</p><span class="service-more">See healthcare work →</span></a>
      <a class="service-card" href="/industries/agtech-cloud-sustainability/"><h3>AgTech, cloud &amp; sustainability</h3><p>Farm platforms, cloud consulting, and mission-led products that need a shared visual story.</p><span class="service-more">See AgTech &amp; cloud →</span></a>
    </div>
  </div>
</section>
<section class="section">
  <div class="section-inner copy-block">
    <h2 class="section-title">Proof first, category second</h2>
    <p>Industry pages are useful when they point at real projects. <a href="/work/sela-cloud-explainer-video/">Sela Cloud</a> and <a href="/work/bazaar-interactive-icon-animation/">Bazaar</a> sit with SaaS. <a href="/work/before-health-ai-healthcare-explainer/">Before Health</a> and <a href="/work/hancock-health-explainer-animation/">Hancock Health</a> sit with care. <a href="/work/mtech-systems-agtech-explainer/">MTech</a>, <a href="/work/farmerlink-digital-agriculture-explainer/">FarmerLink</a>, and <a href="/work/greenopia-sustainability-explainer/">Greenopia</a> sit with field systems and sustainability.</p>
    <p>If you are choosing a service instead of a vertical, start with <a href="/services/explainer-videos/">explainer videos</a>, <a href="/services/saas-product-animation/">SaaS product animation</a>, or the full <a href="/work/">work</a> index.</p>
  </div>
</section>
${ctaFn('Not sure which page fits?', 'Tell us the product and who needs to understand it. We will point you at the right motion approach.')}`
  });

  const healthcare = pageFn({
    title: 'Healthcare Animation & Patient Explainers - Funimation',
    description: 'Healthcare animation for patient education, clinical products, and safety flows. See Before Health, Hancock Health, and related work.',
    canonical: 'https://thefunimation.co/industries/healthcare/',
    current: 'services',
    ogImage: 'https://thefunimation.co/3rd%20project/cover.png',
    ogAlt: 'Before Health Intelligence healthcare explainer by Funimation',
    schema: [serviceFn('Healthcare animation', 'Animation for healthcare organizations', 'https://thefunimation.co/industries/healthcare/', 'Explainer videos and product animation for healthcare organizations, clinical products, and patient education.')],
    body: `<header class="page-hero">
  <div class="section-inner">
    <nav class="crumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/industries/">Industries</a><span>/</span><span>Healthcare</span></nav>
    <p class="page-kicker">Healthcare</p>
    <h1>Animation that makes care easier to trust.</h1>
    <p class="lead">Healthcare stories fail when they sound like a brochure or a paper. Funimation turns clinical products, patient education, and safety flows into visual stories people can follow — without inventing claims the work cannot hold.</p>
    ${heroCtas}
  </div>
</header>
${proofFn({
  video: '/3rd%20project/before-health-web.mp4',
  poster: '/3rd%20project/cover.png',
  stills: [
    { src: '/2nd%20project/cover.png', alt: 'Hancock Health healthcare explainer still' },
    { src: '/8th%20project/cover-08.png', alt: 'Secufy SOS personal safety explainer still' }
  ],
  label: 'Healthcare and safety work'
})}
<section class="section" style="background:#fff">
  <div class="section-inner copy-block">
    <h2 class="section-title">Care is easier to choose when people can see it</h2>
    <p>Patients, clinicians, and buyers do not share the same vocabulary. A predictive model, a community hospital network, or a safety app can all be true and still feel distant. We build healthcare animation around the moment someone needs to understand what happens next — not around a generic “medical look.”</p>
    <p>That is the brief behind <a href="/work/before-health-ai-healthcare-explainer/">Before Health Intelligence</a>: wearable data and earlier intervention, told as everyday health moments instead of algorithm slides. It is also the brief behind <a href="/work/hancock-health-explainer-animation/">Hancock Health</a>, where community care had to feel human rather than institutional.</p>
  </div>
</section>
<section class="section">
  <div class="section-inner">
    <h2 class="section-title center">Choose the option that matches the audience</h2>
    <div class="plans-grid">
      <article class="plan-card">
        <h3>Patient education</h3>
        <p>Calm, character-led explainers for services, access, and what to expect — the Hancock Health kind of story.</p>
        <p><a href="/services/explainer-videos/" class="service-more">Explainer videos →</a></p>
      </article>
      <article class="plan-card">
        <h3>Clinical products</h3>
        <p>Product and AI stories that stay accurate enough for a mixed clinical and consumer audience.</p>
        <p><a href="/services/saas-product-animation/" class="service-more">Product animation →</a></p>
      </article>
      <article class="plan-card">
        <h3>Safety and care apps</h3>
        <p>Flows that have to be obvious under stress — the <a href="/work/secufy-sos-personal-safety-explainer/">Secufy SOS</a> problem, solved with clear steps instead of fear.</p>
        <p><a href="/services/app-motion-design/" class="service-more">App motion →</a></p>
      </article>
    </div>
  </div>
</section>
<section class="section" style="background:#fff">
  <div class="section-inner">
    <h2 class="section-title">Services healthcare teams actually use</h2>
    <div class="services-grid">
      <a class="service-card" href="/services/explainer-videos/"><h3>Explainer Videos</h3><p>A shared story for patients, families, or hospital marketing that does not read like a pamphlet.</p><span class="service-more">Explore service →</span></a>
      <a class="service-card" href="/services/character-animation/"><h3>Character Animation</h3><p>Guides and patients who make a clinical idea feel human without turning it into a cartoon.</p><span class="service-more">Explore service →</span></a>
      <a class="service-card" href="/services/app-motion-design/"><h3>App Motion Design</h3><p>Onboarding and micro-interactions for care and safety products where every extra step costs trust.</p><span class="service-more">Explore service →</span></a>
    </div>
  </div>
</section>
<section class="section">
  <div class="section-inner">
    <h2 class="section-title">Work from healthcare and adjacent care</h2>
    <div class="work-grid">
      <a class="work-card" href="/work/before-health-ai-healthcare-explainer/"><img src="/3rd%20project/cover.png" alt="Before Health Intelligence" loading="lazy"><div class="work-card-body"><h3>Before Health Intelligence</h3><p>Predictive AI and wearables, told as everyday health moments.</p></div></a>
      <a class="work-card" href="/work/hancock-health-explainer-animation/"><img src="/2nd%20project/cover.png" alt="Hancock Health" loading="lazy"><div class="work-card-body"><h3>Hancock Health</h3><p>Community-focused care that feels approachable, not institutional.</p></div></a>
      <a class="work-card" href="/work/secufy-sos-personal-safety-explainer/"><img src="/8th%20project/cover-08.png" alt="Secufy SOS" loading="lazy"><div class="work-card-body"><h3>Secufy SOS</h3><p>Emergency alerts and live location, kept calm and usable.</p></div></a>
    </div>
  </div>
</section>
<section class="section" style="background:#fff">
  <div class="section-inner">
    <h2 class="section-title center">Questions we hear from healthcare teams</h2>
    ${faqFn([
      { q: 'Can animation stay accurate enough for healthcare?', a: 'Yes — when the script is reviewed against what you can actually claim. We write for clarity first, then leave room for clinical or compliance review before animation locks.' },
      { q: 'Do you only make patient-facing videos?', a: 'No. We also explain clinical products, AI features, and safety apps to mixed audiences — the Before Health and Secufy kind of brief.' },
      { q: 'What about climate or public-health education?', a: 'We have made research-led explainers as well, including the ISMED-CLIM climate-health series. If the audience is the public, the same craft applies.' }
    ])}
  </div>
</section>
${moreIndustries('health')}
${ctaFn('Building a healthcare story that needs to stay clear?', 'Tell us who has to understand it — patients, clinicians, or buyers. We will help shape the right animation approach.')}`
  });

  const agtech = pageFn({
    title: 'AgTech, Cloud & Sustainability Animation - Funimation',
    description: 'Animation for AgTech, cloud, and sustainability products. See MTech, FarmerLink, Greenopia, and Sela Cloud.',
    canonical: 'https://thefunimation.co/industries/agtech-cloud-sustainability/',
    current: 'services',
    ogImage: 'https://thefunimation.co/6th%20project/cover.png',
    ogAlt: 'MTech Systems AgTech explainer by Funimation',
    schema: [serviceFn('AgTech, cloud, and sustainability animation', 'Animation for AgTech and cloud products', 'https://thefunimation.co/industries/agtech-cloud-sustainability/', 'Explainer videos and product animation for AgTech platforms, cloud services, and sustainability products.')],
    body: `<header class="page-hero">
  <div class="section-inner">
    <nav class="crumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/industries/">Industries</a><span>/</span><span>AgTech, Cloud &amp; Sustainability</span></nav>
    <p class="page-kicker">AgTech, cloud &amp; sustainability</p>
    <h1>Animation for systems you cannot demo in a field.</h1>
    <p class="lead">Farm platforms, cloud infrastructure, and sustainability products are real — and still hard to show. Funimation turns IoT, data, and mission into a story producers, buyers, and operators can share.</p>
    ${heroCtas}
  </div>
</header>
${proofFn({
  video: '/6th%20project/mtech-systems-web.mp4',
  poster: '/6th%20project/cover.png',
  stills: [
    { src: '/9th%20project/cover-25.png', alt: 'FarmerLink digital agriculture explainer still' },
    { src: '/7th%20project/Cover.png', alt: 'Greenopia sustainability explainer still' }
  ],
  label: 'AgTech and sustainability work'
})}
<section class="section" style="background:#fff">
  <div class="section-inner copy-block">
    <h2 class="section-title">The dashboard is not the story</h2>
    <p>AgTech and cloud products often look like software and behave like infrastructure. A live demo can stall. A sustainability score can sound like marketing. We look for the decision the audience has to make — then animate the path to it.</p>
    <p><a href="/work/mtech-systems-agtech-explainer/">MTech Systems</a> needed producers to see real-time data becoming a choice, not a farm-management screenshot. <a href="/work/farmerlink-digital-agriculture-explainer/">FarmerLink</a> had to follow field data from collection to a shared decision. <a href="/work/greenopia-sustainability-explainer/">Greenopia</a> had to make verification feel usable, not preachy. <a href="/work/sela-cloud-explainer-video/">Sela Cloud</a> had to hold business and technical buyers in the same cloud-and-AI story.</p>
  </div>
</section>
<section class="section">
  <div class="section-inner">
    <h2 class="section-title center">Choose the option that matches the system</h2>
    <div class="plans-grid">
      <article class="plan-card">
        <h3>Farm and field platforms</h3>
        <p>IoT, livestock, and crop tools that only make sense when you can see the workflow — not the feature list.</p>
        <p><a href="/services/explainer-videos/" class="service-more">Explainer videos →</a></p>
      </article>
      <article class="plan-card">
        <h3>Cloud and infrastructure</h3>
        <p>Consulting and platform stories for mixed technical audiences, the Sela Cloud kind of brief.</p>
        <p><a href="/services/saas-product-animation/" class="service-more">Product animation →</a></p>
      </article>
      <article class="plan-card">
        <h3>Sustainability products</h3>
        <p>Mission-led platforms that have to stay concrete — discovery, proof, and everyday choices.</p>
        <p><a href="/contact/" class="service-more">Get a free consultation →</a></p>
      </article>
    </div>
  </div>
</section>
<section class="section" style="background:#fff">
  <div class="section-inner">
    <h2 class="section-title">Services these teams actually use</h2>
    <div class="services-grid">
      <a class="service-card" href="/services/explainer-videos/"><h3>Explainer Videos</h3><p>A homepage or sales story that makes a platform, farm system, or mission feel concrete.</p><span class="service-more">Explore service →</span></a>
      <a class="service-card" href="/services/saas-product-animation/"><h3>SaaS Product Animation</h3><p>Feature and workflow motion when the product is software sitting on top of a physical system.</p><span class="service-more">Explore service →</span></a>
      <a class="service-card" href="/services/motion-graphics/"><h3>Motion Graphics</h3><p>Data, maps, and process visuals that keep a technical story moving without a live environment.</p><span class="service-more">Explore service →</span></a>
    </div>
  </div>
</section>
<section class="section">
  <div class="section-inner">
    <h2 class="section-title">Work from AgTech, cloud, and sustainability</h2>
    <div class="work-grid">
      <a class="work-card" href="/work/mtech-systems-agtech-explainer/"><img src="/6th%20project/cover.png" alt="MTech Systems" loading="lazy"><div class="work-card-body"><h3>MTech Systems</h3><p>Real-time farm data and IoT, made concrete for producers.</p></div></a>
      <a class="work-card" href="/work/farmerlink-digital-agriculture-explainer/"><img src="/9th%20project/cover-25.png" alt="FarmerLink" loading="lazy"><div class="work-card-body"><h3>FarmerLink</h3><p>Field data from collection to a shared, usable decision.</p></div></a>
      <a class="work-card" href="/work/greenopia-sustainability-explainer/"><img src="/7th%20project/Cover.png" alt="Greenopia" loading="lazy"><div class="work-card-body"><h3>Greenopia</h3><p>A sustainability platform that feels approachable, not preachy.</p></div></a>
      <a class="work-card" href="/work/sela-cloud-explainer-video/"><img src="/4th%20project/cover.png" alt="Sela Cloud" loading="lazy"><div class="work-card-body"><h3>Sela Cloud</h3><p>Cloud and AI services explained for business and technical buyers.</p></div></a>
    </div>
  </div>
</section>
<section class="section" style="background:#fff">
  <div class="section-inner">
    <h2 class="section-title center">Questions we hear from these teams</h2>
    ${faqFn([
      { q: 'Can you explain a platform without showing every screen?', a: 'Yes. We look for the decision the viewer has to make, then animate the path to it. Dashboards stay supporting evidence, not the whole film.' },
      { q: 'Do you work with mixed farm and software audiences?', a: 'That is the usual brief. Producers, operators, and technical buyers rarely want the same density. The story has to hold all three without talking down.' },
      { q: 'Is this only AgTech?', a: 'No. Cloud consulting and sustainability products sit here because they share the same problem: the system is real, and still hard to demo live.' }
    ])}
  </div>
</section>
${moreIndustries('ag')}
${ctaFn('Building a platform that is hard to demo live?', 'Tell us what the system does and who has to trust it. We will help shape the right animation approach.')}`
  });

  const blogHub = pageFn({
    title: 'Animation Notes & Resources - Funimation',
    description: 'Practical notes from Funimation on explainer length, 2D vs 3D, Rive vs Lottie, and SaaS onboarding animation.',
    canonical: 'https://thefunimation.co/blog/',
    current: '',
    ogImage: 'https://thefunimation.co/bazaar/frames/01.png',
    ogAlt: 'Funimation interactive product still',
    schema: [{
      '@type': 'Blog',
      name: 'Funimation Notes',
      url: 'https://thefunimation.co/blog/',
      description: 'Practical writing on explainer videos, product animation, and interactive motion.',
      publisher: { '@id': 'https://thefunimation.co/#organization' },
      inLanguage: 'en-US',
      blogPost: ARTICLES.map(article => ({
        '@type': 'BlogPosting',
        headline: article.title,
        url: `https://thefunimation.co/blog/${article.slug}/`,
        datePublished: article.date,
        description: article.description
      }))
    }],
    body: `<header class="page-hero">
  <div class="section-inner">
    <nav class="crumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span>Blog</span></nav>
    <p class="page-kicker">Notes</p>
    <h1>Writing that helps you choose the motion, not decorate it.</h1>
    <p class="lead">These are field notes from Funimation — the questions teams ask before a brief is even written. Useful on purpose: how to choose a medium, a runtime, and a length that helps the product.</p>
    <div class="hero-btns">
      <a href="/work/" class="btn-primary">See our work</a>
      <a href="/contact/" class="btn-secondary">Get a free consultation</a>
    </div>
  </div>
</header>
<section class="section" style="background:#fff">
  <div class="section-inner copy-block">
    <h2 class="section-title">What you will find here</h2>
    <p>When to stay in 2D. When Rive is worth it and when Lottie is enough. How long an explainer should actually run. What onboarding animation is for. If you already know the job, skip to <a href="/services/">services</a>, <a href="/work/">work</a>, or <a href="/contact/">contact</a>.</p>
  </div>
</section>
<section class="section">
  <div class="section-inner">
    <h2 class="section-title">Launch articles</h2>
    <div class="blog-list">
      ${ARTICLES.map(article => `<a class="blog-card" href="/blog/${article.slug}/">
        <p class="blog-card-kicker">${article.kicker}</p>
        <h2>${escape(article.title)}</h2>
        <p>${escape(article.description)}</p>
        <span class="service-more">Read article →</span>
      </a>`).join('\n      ')}
    </div>
  </div>
</section>
${ctaFn('Have a product that needs a clearer story?', 'If a note here matches the brief, send it with your project. If it does not, start from the work.')}`
  });

  const articleBodies = {
    '2d-vs-3d-animation': `<p>Teams often ask for 3D because it sounds more “premium,” or for 2D because it sounds faster. Neither is a strategy. The useful question is: what does the viewer need to understand, and what production will actually get you there?</p>
<h2>What 2D is good at</h2>
<p>2D animation is still the default for most <a href="/services/explainer-videos/">explainer videos</a> we make. It is strong when the story is about a relationship, a process, or a product that should feel approachable. Characters, interfaces, and simple environments can carry a healthcare or SaaS story without asking the audience to admire the render.</p>
<p>That is why <a href="/work/before-health-ai-healthcare-explainer/">Before Health</a> and <a href="/work/hancock-health-explainer-animation/">Hancock Health</a> live in 2D. Predictive AI and community care both needed warmth and clarity. A fully modeled hospital would have added cost and time without adding understanding.</p>
<h2>What 3D is good at</h2>
<p>3D earns its keep when the object is the product: a device, a vehicle interior, a piece of hardware that has to feel dimensional. It can also help when you need a camera move through a real space that 2D would have to fake. If the brief is “make this physical thing desirable,” 3D is often the honest medium.</p>
<p>It is a heavier pipeline. Modeling, lighting, and look-dev take time. Changes late in the process cost more than a 2D revision. That is not an argument against 3D — it is a reason not to choose it for a workflow explainer.</p>
<h2>A practical way to choose</h2>
<ul>
  <li>If the hero is a person, a workflow, or a software surface, start in 2D.</li>
  <li>If the hero is a physical object that has to feel held, consider 3D — or a hybrid where only that object is dimensional.</li>
  <li>If the audience is mixed (clinicians and patients, founders and buyers), 2D usually stays clearer on a homepage.</li>
  <li>If you already have a 3D product model, we can talk about using it as a support, not the whole film.</li>
</ul>
<p>Funimation’s day-to-day work is 2D explainers, <a href="/services/saas-product-animation/">product animation</a>, and interactive motion. We will say so if a brief wants something we are not the right studio for. That is more useful than stretching a 2D pipeline into a 3D promise.</p>
<h2>Cost, without invented numbers</h2>
<p>3D is usually the more expensive production because more stages have to lock before you see a finished shot. 2D is not “cheap animation” — a designed explainer with custom characters and a tight story still takes real craft — but it is typically the more focused spend when the job is explanation. If you need a sense of fit, <a href="/contact/">get a free consultation</a> rather than shopping a fake rate card.</p>
<p>See related work on the <a href="/work/">work</a> page, or read how we think about <a href="/blog/explainer-video-length/">explainer length</a> once the medium is chosen.</p>`,
    'rive-vs-lottie': `<p>Rive and Lottie both put motion on a website or in an app. They are not interchangeable. One is closer to a small interactive product. The other is closer to a lightweight, timeline-based clip. Choosing the wrong one usually shows up as a janky landing page or a file nobody on the product team wants to maintain.</p>
<h2>Lottie, in practice</h2>
<p>Lottie is a good fit when the motion is short, mostly linear, and needs to ship as a small file: a success check, a loader, an icon that plays once. Designers can export from After Effects. Engineers know the players. For many <a href="/services/app-motion-design/">app motion</a> moments, Lottie is enough — and enough is the point.</p>
<p>It is weaker when you need states, inputs, or a piece that should listen to the UI. You end up stitching clips together, or pretending a timeline is a state machine.</p>
<h2>Rive, in practice</h2>
<p>Rive is built for interaction. State machines, inputs, and runtime control mean an icon can hover, complete, fail, and idle without swapping files. That is why the <a href="/work/bazaar-interactive-icon-animation/">Bazaar</a> icon system lives in Rive: the art had to ship in product UI and respond, not just decorate a page.</p>
<p>Rive asks more of the design-and-dev handshake. Someone has to own the runtime. If the motion will only play once on scroll and never again, that extra surface area is wasted.</p>
<h2>How we choose on a brief</h2>
<ul>
  <li>One-shot, decorative, or marketing-loop motion: start with Lottie — or a video if it does not need to be vector-crisp.</li>
  <li>UI that has to react (hover, progress, empty states, branded icons in product): start with Rive.</li>
  <li>A marketing site that should demonstrate the product: often Rive on a few hero moments, not a page full of embeds. See <a href="/services/interactive-web-animation/">interactive web animation</a>.</li>
  <li>A SaaS onboarding flow: mix. Explain with video or 2D; confirm actions with Lottie or Rive micro-interactions. More on that in <a href="/blog/saas-onboarding-animation/">SaaS onboarding animation</a>.</li>
</ul>
<p>We do not drop a cold Rive embed on a homepage and call it a case study. Interactive work should be on demand, gated, and honest about performance. If you are deciding between the two for a launch, bring the surface (web, iOS, Android) and the interaction list to a <a href="/contact/">consultation</a>. We will tell you which runtime we would actually build.</p>
<p>For the broader product story around software teams, see <a href="/industries/saas-startups/">SaaS &amp; startups</a> and the <a href="/work/">work</a> index.</p>`,
    'explainer-video-length': `<p>There is no universal “ideal explainer video length.” There is a length that matches the job. A homepage film, a feature launch, and a paid social cut are three different objects that happen to share a production.</p>
<h2>The homepage story</h2>
<p>For most SaaS and product explainers we make, the useful range is about 60 to 90 seconds. Long enough to name the problem, show the product doing the work, and leave a next step. Short enough that a buyer will finish it. <a href="/work/sela-cloud-explainer-video/">Sela Cloud</a> is this shape: mixed business and technical buyers, one shared story, no live demo required.</p>
<p>Past two minutes, you are usually asking for patience the homepage does not have. Under 45 seconds, you may only have time for a mood, not a mechanism — which is fine for a teaser, not for an explainer.</p>
<h2>Feature and product cuts</h2>
<p><a href="/services/saas-product-animation/">Product animation</a> for a feature release can be shorter: 20 to 45 seconds if the audience already knows the category. You are not introducing the company. You are showing what changed. Those cuts also travel into email, in-app banners, and sales decks.</p>
<h2>Paid and social</h2>
<p>Paid social usually wants the first useful image in the opening seconds, then a version that still makes sense with the sound off. That is often a recut of the explainer, not a second full production. If the only plan is a 90-second film and “we will cut it down later,” plan the recut in the storyboard or you will be inventing a new film in edit.</p>
<h2>How we decide on a project</h2>
<ul>
  <li>Who is watching, and have they already bought the category?</li>
  <li>Where will it live first — homepage, fundraising deck, or in-product?</li>
  <li>How many ideas must survive? One problem and one mechanism beat five features.</li>
  <li>Will you need a 15-second and a 6-second sibling? Say so before design.</li>
</ul>
<p>Length is a writing problem before it is an animation problem. Our <a href="/process/">process</a> locks story and storyboard so you are not discovering the runtime in the last week. For industry-specific examples, see <a href="/industries/saas-startups/">SaaS</a>, <a href="/industries/healthcare/">healthcare</a>, and the <a href="/work/">work</a> page.</p>
<p>If you want a sense of whether your story wants 60 seconds or a set of short feature films, <a href="/contact/">get a free consultation</a>. We will talk about the job, not a fake per-second price.</p>`,
    'saas-onboarding-animation': `<p>Onboarding animation is not a tiny explainer glued to sign-up. It is motion that helps someone do the first useful thing in the product. If it only looks premium, it is decoration. If it shows what changed after a tap, it is doing the job.</p>
<h2>What actually helps activation</h2>
<p>New users are trying to map the interface to an outcome they already wanted. Good onboarding animation can:</p>
<ul>
  <li>Show where to start, without a wall of tooltips.</li>
  <li>Confirm that an action landed — a save, an invite, a connected account.</li>
  <li>Preview a feature that is empty on day one, so the blank state is not a dead end.</li>
  <li>Carry brand personality in the first session, when the product still feels generic.</li>
</ul>
<p>That is <a href="/services/app-motion-design/">app motion</a> and micro-interaction work, not a replacement for <a href="/services/explainer-videos/">an explainer</a>. The explainer lives on the site and in sales. Onboarding lives in the product.</p>
<h2>Micro-interactions versus a film</h2>
<p>A 60-second film inside onboarding is usually a stall. People came to try the product. Use a short sequence for the first-run story if the category is new, then get out of the way. After that, motion should be local: the button, the progress, the success.</p>
<p><a href="/work/secufy-sos-personal-safety-explainer/">Secufy SOS</a> is a useful reference even though the public piece is an explainer: the product story is a few taps in a stressful moment. The same discipline applies to SaaS onboarding. If the flow is complicated, fix the flow. Then animate the clarity.</p>
<p>Interactive runtimes help when the UI itself should move. We wrote about that split in <a href="/blog/rive-vs-lottie/">Rive vs Lottie</a>. For marketing sites, see <a href="/services/interactive-web-animation/">interactive web animation</a>. For feature launches aimed at people who already signed up, see <a href="/services/saas-product-animation/">SaaS product animation</a>.</p>
<h2>A motion system, not one-off sparkle</h2>
<p>The teams that get value from this work define timing, easing, and states once. Then every new feature inherits the same language. That is slower on week one and faster on week twelve. It is also how you avoid a product that feels like five different studios visited the file.</p>
<p>We work this way with <a href="/industries/saas-startups/">SaaS and startup</a> teams, and the same rules apply when the product is a <a href="/industries/healthcare/">care app</a> or a field tool. If you want a partner for the first-run and the ongoing feature motion, start with the <a href="/work/">work</a> or <a href="/contact/">a free consultation</a>.</p>`
  };

  const articlePages = ARTICLES.map(article => {
    const html = pageFn({
      title: `${article.title} - Funimation`,
      description: article.description,
      canonical: `https://thefunimation.co/blog/${article.slug}/`,
      current: '',
      ogType: 'article',
      ogImage: article.ogImage,
      ogAlt: article.ogAlt,
      schema: [articleSchema(article)],
      body: `<header class="page-hero article-hero">
  <div class="section-inner">
    <nav class="crumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/blog/">Blog</a><span>/</span><span>${escape(article.kicker)}</span></nav>
    <p class="page-kicker">${article.kicker}</p>
    <h1>${escape(article.title)}</h1>
    <p class="article-byline"><strong>Funimation</strong><span aria-hidden="true">·</span><time datetime="${article.date}">${article.dateLabel}</time></p>
    <p class="lead">${escape(article.description)}</p>
  </div>
</header>
<section class="section" style="background:#fff">
  <div class="section-inner article-body">
    ${articleBodies[article.slug]}
  </div>
</section>
${relatedArticles(article.slug)}
${ctaFn('Want this thinking on your product?', 'Share the brief. We will tell you whether an explainer, product motion, or a smaller interaction is the right next step.')}`
    });
    writeFn(`blog/${article.slug}`, html);
    return `https://thefunimation.co/blog/${article.slug}/`;
  });

  writeFn('industries', industriesHub);
  writeFn('industries/healthcare', healthcare);
  writeFn('industries/agtech-cloud-sustainability', agtech);
  writeFn('blog', blogHub);

  return [
    'https://thefunimation.co/industries/',
    'https://thefunimation.co/industries/healthcare/',
    'https://thefunimation.co/industries/agtech-cloud-sustainability/',
    'https://thefunimation.co/blog/',
    ...articlePages
  ];
}

function appendSitemap(urls) {
  const sitemapPath = path.join('/workspace', 'sitemap.xml');
  let xml = fs.readFileSync(sitemapPath, 'utf8');
  const existing = new Set([...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]));
  const additions = urls.filter(url => !existing.has(url)).map(loc => `  <url>
    <loc>${loc}</loc>
    <lastmod>2026-09-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${loc.endsWith('/blog/') || loc.includes('/industries/') ? '0.8' : '0.7'}</priority>
  </url>`);
  if (!additions.length) return;
  xml = xml.replace('</urlset>', `${additions.join('\n')}\n</urlset>`);
  fs.writeFileSync(sitemapPath, xml);
  console.log('updated sitemap.xml');
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const urls = registerPhase3();
  appendSitemap(urls);
}
