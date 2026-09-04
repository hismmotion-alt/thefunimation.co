import fs from 'node:fs';
import path from 'node:path';

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
    'https://www.linkedin.com/company/funanimation/',
    'https://www.fiverr.com/s/EgGWEVe'
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
      <a href="/#process">Process</a>
      <a href="/#about">About</a>
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
      <a href="/#process">Process</a>
      <a href="/#about">About</a>
      <a href="/contact/">Contact</a>
    </div>
    <div class="footer-col">
      <h6>Services</h6>
      <a href="/services/explainer-videos/">Explainer Videos</a>
      <a href="/services/saas-product-animation/">SaaS Animation</a>
      <a href="/services/interactive-web-animation/">Web Animation</a>
      <a href="/services/">App Motion</a>
      <a href="/services/">Character Animation</a>
    </div>
    <div class="footer-col">
      <h6>Contact</h6>
      <a href="mailto:hello@thefunimation.co">hello@thefunimation.co</a>
      <a href="tel:+18189664249">(+1) 818 966 4249</a>
      <span class="footer-contact-text">16437 Knapp Street<br>North Hills, CA</span>
      <a href="https://www.fiverr.com/s/EgGWEVe" target="_blank" rel="noopener noreferrer">Fiverr Profile</a>
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

function cta(title, copy, primary = { href: '/contact/', label: 'Start a Project' }, secondary = { href: '/work/', label: 'View Our Work' }) {
  return `<section class="final-cta" id="cta">
  <div class="blob blob-1" style="width:450px;height:450px"></div>
  <div class="blob blob-2" style="width:380px;height:380px"></div>
  <h2>${title}</h2>
  <p>${copy}</p>
  <div class="hero-btns" style="justify-content:center">
    <a href="${primary.href}" class="btn-primary">${primary.label}</a>
    <a href="${secondary.href}" class="btn-secondary" style="border-color:rgba(255,255,255,.35);color:#fff">${secondary.label}</a>
  </div>
</section>`;
}

function page({ title, description, canonical, ogImage, ogAlt, current, schema = [], bodyClass = '', extraHead = '', body }) {
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
<meta property="og:type" content="website">
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
${extraHead}
</head>
<body${bodyClass ? ` class="${bodyClass}"` : ''}>
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

const servicesHub = page({
  title: 'Animation Services for SaaS & Products | Funimation',
  description: 'Explainer videos, SaaS product animation, interactive web motion, and custom animation from Funimation. Serving startups across the US & Canada.',
  canonical: 'https://thefunimation.co/services/',
  current: 'services',
  schema: [serviceSchema('Animation services', 'Animation production', 'https://thefunimation.co/services/', 'Custom explainer videos, product animation, and interactive web motion for SaaS companies and startups.')],
  body: `<header class="page-hero">
  <div class="section-inner">
    <p class="page-kicker">Services</p>
    <h1>Animation Services for SaaS, Products and Modern Brands</h1>
    <p class="lead">Funimation is an animation studio for SaaS companies, startups, product teams, and growing brands. We create explainer videos, product animation, interactive web animation, app motion, character animation, and motion graphics that make complex ideas easier to understand and digital products more engaging.</p>
    <div class="hero-btns">
      <a href="/contact/" class="btn-primary">Get a Free Consultation</a>
      <a href="/work/" class="btn-secondary">See Our Work</a>
    </div>
  </div>
</header>
<div class="trusted">
  <p>Trusted by startups, SaaS teams and growing brands</p>
  <div class="why-grid" style="max-width:var(--max-w);margin:0 auto">
    <div class="stat-card"><div class="stat-num">300+</div><div class="stat-label">Projects Completed</div></div>
    <div class="stat-card"><div class="stat-num">20+</div><div class="stat-label">Countries Served</div></div>
    <div class="stat-card"><div class="stat-num">8+</div><div class="stat-label">Years of Experience</div></div>
    <div class="stat-card"><div class="stat-num">100%</div><div class="stat-label">Custom Animation</div></div>
  </div>
</div>
<section class="section" style="background:#fff">
  <div class="section-inner split-intro">
    <div class="copy-block">
      <div class="section-label">Introduction</div>
      <h2 class="section-title">Animation That Helps People Understand Your Product</h2>
      <p>Your product may be powerful, but that does not mean it is easy to explain. Funimation turns complex products, technical workflows, and new ideas into clear visual stories. As a SaaS animation company, we work with teams that need more than attractive visuals. We create animation that supports product marketing, customer education, launches, websites, apps, and brand communication.</p>
      <p>From a 2D explainer video to an interactive website experience, every project starts with the same question: what does your audience need to understand? We then build the story, design the visuals, and create the motion around that goal. The result is custom animation that feels right for your brand and gives people a clearer reason to keep watching, exploring, or taking the next step.</p>
    </div>
    <img src="/11%20project/cover.png" alt="CaraKit explainer animation still from Funimation" style="width:100%;border-radius:24px;box-shadow:var(--shadow)">
  </div>
</section>
<section class="section" id="service-grid">
  <div class="section-inner">
    <div class="section-label center">Our Animation Services</div>
    <h2 class="section-title center">Six ways we help products and brands move</h2>
    <div class="services-grid">
      <a class="service-card" href="/services/explainer-videos/">
        <div class="service-icon" style="background:rgba(255,107,53,0.1)">🎬</div>
        <h3>Explainer Videos</h3>
        <p>As an explainer video company, we create clear 2D explainer video production for SaaS products, startups, technology, healthcare, and other complex businesses. We combine concise storytelling, custom design, character animation, and motion to explain what you do and why it matters.</p>
        <span class="service-more">Explore service →</span>
      </a>
      <a class="service-card" href="/services/saas-product-animation/">
        <div class="service-icon" style="background:rgba(108,77,255,0.1)">💻</div>
        <h3>SaaS Product Animation</h3>
        <p>Our SaaS product animation helps product and marketing teams showcase features, workflows, launches, and user journeys. As a product animation studio, we can create software demo animation, feature launch video content, onboarding visuals, and product stories for websites, sales teams, and campaigns.</p>
        <span class="service-more">Explore service →</span>
      </a>
      <a class="service-card" href="/services/interactive-web-animation/">
        <div class="service-icon" style="background:rgba(56,189,248,0.1)">🌐</div>
        <h3>Interactive Web Animation</h3>
        <p>Bring your website to life with interactive web animation, website motion design, scroll animation design, hover states, and interactive storytelling. We also create lightweight Rive and Lottie experiences that can support modern product websites and digital interfaces.</p>
        <span class="service-more">Explore service →</span>
      </a>
      <div class="service-card">
        <div class="service-icon" style="background:rgba(74,222,181,0.1)">📱</div>
        <h3>App Motion Design</h3>
        <p>Make mobile experiences clearer and more engaging with app onboarding animation, UI motion design, transitions, feedback states, and micro-interaction design. We create motion that supports usability while giving your product a more distinctive personality.</p>
      </div>
      <div class="service-card">
        <div class="service-icon" style="background:rgba(255,211,77,0.15)">🧸</div>
        <h3>Character Animation</h3>
        <p>A memorable character can make a product easier to connect with. Our character animation studio creates custom characters, mascots, brand personalities, and story-driven scenes for product experiences, explainers, campaigns, and educational content.</p>
      </div>
      <div class="service-card">
        <div class="service-icon" style="background:rgba(255,107,53,0.08)">✨</div>
        <h3>Motion Graphics</h3>
        <p>Our motion graphics studio creates animated visuals for product launches, presentations, ads, social media, websites, and marketing campaigns. We use typography, illustration, icons, data, and movement to make information more engaging without losing clarity.</p>
      </div>
    </div>
  </div>
</section>
<section class="section" style="background:#fff">
  <div class="section-inner copy-block">
    <div class="section-label">SaaS &amp; product focus</div>
    <h2 class="section-title">Built for SaaS and Digital Products</h2>
    <p>Digital products change quickly. New features launch, interfaces evolve, and marketing teams constantly need fresh ways to explain value. Funimation helps SaaS and product teams keep up with that pace through focused animation support.</p>
    <p>We can create a launch video for a new feature, a product walkthrough for sales, an explainer for your homepage, an onboarding animation for your app, or a set of reusable motion assets for marketing. Because we understand software and digital products, we can translate screens, workflows, technical concepts, and user journeys into visual stories that make sense to the people using them.</p>
  </div>
</section>
<section class="section">
  <div class="section-inner">
    <div class="section-label center">Why Funimation</div>
    <h2 class="section-title center">Why Choose Funimation?</h2>
    <p class="section-desc center">Animation should do more than look good. It should make your product clearer, your message easier to follow, and your brand more memorable.</p>
    <div class="why-points">
      <div class="why-point"><div class="check">✓</div><p>SaaS and startup experience</p></div>
      <div class="why-point"><div class="check">✓</div><p>Video and interactive animation in one studio</p></div>
      <div class="why-point"><div class="check">✓</div><p>100% custom animation with no templates</p></div>
      <div class="why-point"><div class="check">✓</div><p>Motion designed around product and user experience</p></div>
      <div class="why-point"><div class="check">✓</div><p>Flexible support for launches, campaigns, and ongoing content</p></div>
      <div class="why-point"><div class="check">✓</div><p>Based in Los Angeles and working with clients worldwide</p></div>
    </div>
  </div>
</section>
<section class="section process-section" id="process">
  <div class="section-inner">
    <div class="section-label">From First Idea to Final Animation</div>
    <h2 class="section-title" style="color:#fff">A simple process from idea to delivery</h2>
    <div class="process-steps">
      <div class="process-step"><div class="step-num">01</div><h4>Discover</h4><p>We learn about your product, audience, goals, and message.</p></div>
      <div class="process-step"><div class="step-num">02</div><h4>Script &amp; Storyboard</h4><p>We shape the story and plan the visual flow.</p></div>
      <div class="process-step"><div class="step-num">03</div><h4>Design</h4><p>We develop the visual style, characters, scenes, and animation-ready assets.</p></div>
      <div class="process-step"><div class="step-num">04</div><h4>Animate</h4><p>We bring the approved design to life with polished motion and interaction.</p></div>
      <div class="process-step"><div class="step-num">05</div><h4>Deliver</h4><p>We provide the final files in the formats your team needs, depending on the project.</p></div>
    </div>
    <p style="margin-top:28px"><a href="/#process" class="btn-secondary" style="border-color:rgba(255,255,255,.3);color:#fff">See Our Process</a></p>
  </div>
</section>
<section class="section" style="background:#fff">
  <div class="section-inner">
    <div class="section-label">Featured Work</div>
    <h2 class="section-title">Animation That Speaks for Itself</h2>
    <p class="section-desc">Explore real examples of explainer videos, product stories, interactive experiences, character animation, and motion graphics created for startups, SaaS teams, healthcare organizations, and modern brands.</p>
    <div class="work-grid">
      <a class="work-card" href="/work/carakit-care-kit-explainer/">
        <img src="/11%20project/cover.png" alt="CaraKit care-kit explainer animation cover" loading="lazy">
        <div class="work-card-body"><div class="work-tags"><span class="work-tag">Explainer</span></div><h3>CaraKit</h3><p>Care-kit brand explainer with warm character animation.</p></div>
      </a>
      <a class="work-card" href="/work/sela-cloud-explainer-video/">
        <img src="/4th%20project/cover.png" alt="Sela Cloud explainer animation cover" loading="lazy">
        <div class="work-card-body"><div class="work-tags"><span class="work-tag">Cloud &amp; AI</span></div><h3>Sela Cloud</h3><p>Cloud infrastructure and AI services, told simply.</p></div>
      </a>
      <a class="work-card" href="/work/bazaar-interactive-icon-animation/">
        <img src="/1st%20project/cover.png" alt="Interactive motion example" loading="lazy">
        <div class="work-card-body"><div class="work-tags"><span class="work-tag">Rive</span></div><h3>Bazaar</h3><p>Interactive brand icons built for web and product UI.</p></div>
      </a>
    </div>
    <p style="margin-top:28px"><a href="/work/" class="btn-primary">View All Work</a></p>
  </div>
</section>
<section class="section">
  <div class="section-inner">
    <div class="section-label center">FAQ</div>
    <h2 class="section-title center">Frequently Asked Questions</h2>
    ${faq([
      { q: 'What types of animation does Funimation create?', a: 'We create 2D explainer videos, SaaS product animation, interactive web animation, app motion design, character animation, motion graphics, Rive animation, and Lottie animation.' },
      { q: 'Do you work with SaaS companies and startups?', a: 'Yes. SaaS and startup teams are a core focus. We create animation for product launches, feature education, onboarding, websites, sales, and marketing.' },
      { q: 'Can you create animation for websites and apps?', a: 'Yes. We create interactive website motion, UI animation, micro-interactions, Rive and Lottie assets, and app-focused motion.' },
      { q: 'Is every animation custom?', a: 'Yes. Funimation’s work is custom-created around the client’s product, audience, message, and visual identity.' },
      { q: 'Where is Funimation based?', a: 'Funimation is based in Los Angeles and works with clients worldwide, including teams across the US and Canada.' }
    ])}
  </div>
</section>
${cta('Have a Product or Idea That Needs Motion?', 'Whether you need an explainer video company for a launch, a product animation studio for a new feature, or interactive web animation for your website, Funimation can help turn your idea into a clear visual experience.', { href: '/contact/', label: 'Start a Project' }, { href: '/contact/', label: 'Get a Free Consultation' })}`
});

const explainer = page({
  title: 'SaaS Explainer Video Company | 2D Explainer Videos - Funimation',
  description: 'Custom 2D explainer videos for SaaS and startups. We turn complex products into clear, engaging stories that convert. Serving clients across the US & Canada.',
  canonical: 'https://thefunimation.co/services/explainer-videos/',
  current: 'services',
  ogImage: 'https://thefunimation.co/11%20project/cover.png',
  ogAlt: 'CaraKit 2D explainer video by Funimation',
  schema: [serviceSchema('Explainer videos', '2D explainer video production', 'https://thefunimation.co/services/explainer-videos/', 'Custom 2D explainer videos for SaaS companies, startups, and modern brands.')],
  body: `<header class="page-hero">
  <div class="section-inner">
    <nav class="crumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/services/">Services</a><span>/</span><span>Explainer Videos</span></nav>
    <p class="page-kicker">Explainer video company</p>
    <h1>Explainer Video Company for SaaS, Startups and Modern Brands</h1>
    <p class="lead">Complex products are easier to understand when the story is clear. Funimation is an explainer video company creating custom 2D explainer video production for SaaS businesses, startups, technology teams, and brands that need to explain what they do, how their product works, and why it matters.</p>
    <div class="hero-btns">
      <a href="/contact/" class="btn-primary">Start Your Project</a>
      <a href="/work/" class="btn-secondary">View Explainer Videos</a>
    </div>
  </div>
</header>
<section class="section" style="background:#fff">
  <div class="section-inner copy-block">
    <h2 class="section-title">Turn Complex Ideas Into Clear Stories</h2>
    <p>Your audience should not need a technical background to understand your product. Our explainer video production process takes complex features, workflows, services, and ideas and turns them into simple visual stories. We combine strategy, scripting, storyboard development, custom illustration, character animation, motion design, sound, and editing to create videos that are easy to follow and built around your goals.</p>
    <p>Whether you are launching a SaaS platform, introducing a new feature, explaining a technical service, or helping customers understand a complicated process, the right explainer video can make your message more approachable. We focus on the information your audience actually needs, so every scene has a purpose.</p>
  </div>
</section>
<section class="section">
  <div class="section-inner">
    <h2 class="section-title center">Explainer Videos We Create</h2>
    <div class="services-grid">
      <div class="service-card"><h3>SaaS Explainer Videos</h3><p>As a SaaS explainer video company, we help software teams explain dashboards, workflows, integrations, automation, AI features, and product benefits so prospects understand the product faster.</p></div>
      <div class="service-card"><h3>2D Explainer Video Production</h3><p>Our 2D explainer video production combines illustration, typography, icons, characters, UI elements, and motion. We create a visual system around your brand rather than relying on generic templates.</p></div>
      <div class="service-card"><h3>Startup Explainer Video Services</h3><p>Startups often have to explain a new idea before their audience fully understands the category. We help founders communicate the problem, solution, differentiator, and value proposition for websites, pitches, launches, and campaigns.</p></div>
      <div class="service-card"><h3>Product Explainer Videos</h3><p>Show customers how your product works through a focused visual walkthrough. Product explainer videos can introduce core functionality, demonstrate a workflow, or highlight the value of a specific feature.</p></div>
      <div class="service-card"><h3>Technical Explainer Videos</h3><p>Technical products can be difficult to communicate through static copy alone. We simplify technical concepts through visual storytelling, diagrams, motion graphics, UI animation, and carefully structured narratives.</p></div>
      <a class="service-card" href="/services/"><h3>Explore Our Services</h3><p>Explainer videos sit alongside SaaS product animation and interactive web motion. See the full service set if you need more than a single video.</p><span class="service-more">View all services →</span></a>
    </div>
  </div>
</section>
<section class="section" style="background:#fff">
  <div class="section-inner copy-block">
    <h2 class="section-title">What Makes an Explainer Video Work?</h2>
    <p>Great explainer videos are not simply short animated presentations. They guide the viewer from a problem to a solution and make the value of that solution easy to grasp. We build each video around a clear message, logical story, strong visual direction, and purposeful motion.</p>
    <p>A strong explainer typically answers a few important questions: What problem does your audience have? Why is it difficult today? What does your product or service change? How does it work? And what should the viewer do next? By answering those questions in the right order, the video can communicate more effectively without overwhelming the audience.</p>
  </div>
</section>
<section class="section">
  <div class="section-inner">
    <h2 class="section-title">Our Explainer Video Production Process</h2>
    <div class="process-list">
      <div class="process-item"><div class="step-num">01</div><div><strong>Discovery</strong><p>We learn about your business, audience, product, competitors, and project goals.</p></div></div>
      <div class="process-item"><div class="step-num">02</div><div><strong>Script</strong><p>We turn your information into a focused narrative with a clear beginning, middle, and end.</p></div></div>
      <div class="process-item"><div class="step-num">03</div><div><strong>Storyboard</strong><p>We plan each scene so the script and visuals work together before animation begins.</p></div></div>
      <div class="process-item"><div class="step-num">04</div><div><strong>Design</strong><p>We develop the illustration style, characters, UI elements, typography, color direction, and other visual assets.</p></div></div>
      <div class="process-item"><div class="step-num">05</div><div><strong>Animation</strong><p>We add movement, transitions, timing, sound design, and polish to bring the approved storyboard to life.</p></div></div>
      <div class="process-item"><div class="step-num">06</div><div><strong>Delivery</strong><p>We prepare the final video for the channels and formats your team needs, including MP4, web-embed, and Lottie when interactive use is part of the brief.</p></div></div>
    </div>
    <p style="margin-top:24px"><a href="/#process" class="btn-secondary">See Our Full Process</a></p>
  </div>
</section>
<section class="section" style="background:#fff">
  <div class="section-inner">
    <h2 class="section-title">Why Work With Funimation?</h2>
    <p class="copy-block">Choosing an explainer video company is about more than finding an animation team. You need a partner that can understand the product, identify the important message, and translate it into visuals your audience can follow. We do not start with a template and force your story into it.</p>
    <div class="why-points" style="margin-top:28px">
      <div class="why-point"><div class="check">✓</div><p>Custom scripts and storyboards</p></div>
      <div class="why-point"><div class="check">✓</div><p>Original visual design and animation</p></div>
      <div class="why-point"><div class="check">✓</div><p>SaaS and technology experience</p></div>
      <div class="why-point"><div class="check">✓</div><p>2D character and motion graphics capabilities</p></div>
      <div class="why-point"><div class="check">✓</div><p>Support for marketing, sales, launch, and education</p></div>
      <div class="why-point"><div class="check">✓</div><p>Collaboration from concept through final delivery</p></div>
    </div>
  </div>
</section>
<section class="section">
  <div class="section-inner copy-block">
    <h2 class="section-title">Where Can You Use an Explainer Video?</h2>
    <p>An explainer video can support multiple stages of the customer journey. Add one to your homepage to communicate the product quickly. Use it on a product page to explain a feature. Include it in a sales presentation to help prospects understand the value proposition. Use shorter sections or cutdowns for paid campaigns, social media, onboarding, and email marketing.</p>
    <p>For SaaS companies, explainer videos can also help explain new product features, integrations, technical workflows, and changes to the user experience. Creating one strong core video can give your marketing and sales teams a flexible visual asset that can be adapted for different channels.</p>
  </div>
</section>
<section class="section" style="background:#fff">
  <div class="section-inner">
    <h2 class="section-title">See How We Explain Complex Ideas</h2>
    <p class="section-desc">Featured explainer case studies from healthcare, care, and cloud teams.</p>
    <div class="work-grid">
      <a class="work-card" href="/work/carakit-care-kit-explainer/"><img src="/11%20project/cover.png" alt="CaraKit explainer video" loading="lazy"><div class="work-card-body"><h3>CaraKit</h3><p>Care-kit brand explainer.</p></div></a>
      <a class="work-card" href="/work/before-health-ai-healthcare-explainer/"><img src="/3rd%20project/cover.png" alt="Before Health Intelligence explainer" loading="lazy"><div class="work-card-body"><h3>Before Health Intelligence</h3><p>AI healthcare explainer.</p></div></a>
      <a class="work-card" href="/work/sela-cloud-explainer-video/"><img src="/4th%20project/cover.png" alt="Sela Cloud explainer" loading="lazy"><div class="work-card-body"><h3>Sela Cloud</h3><p>Cloud and AI explainer.</p></div></a>
    </div>
    <p style="margin-top:24px"><a href="/work/" class="btn-primary">View Our Work</a></p>
  </div>
</section>
<section class="section">
  <div class="section-inner">
    <h2 class="section-title center">Frequently Asked Questions</h2>
    ${faq([
      { q: 'How much does an explainer video cost?', a: 'The cost depends on factors such as video length, script complexity, visual style, number of scenes, character work, product UI animation, sound design, and production requirements. We recommend an approach based on your goals and budget rather than a single fixed rate.' },
      { q: 'How much does a SaaS explainer video cost?', a: 'SaaS explainer video pricing varies by scope. A product-focused video may require UI animation, technical storytelling, and more detailed visual planning. We scope each project individually rather than applying one fixed price.' },
      { q: 'How long should an explainer video be?', a: 'The ideal length depends on the message and audience. We prioritize clarity and pacing rather than adding scenes simply to reach a specific runtime.' },
      { q: 'Do you create 2D explainer videos?', a: 'Yes. 2D explainer video production is one of our core capabilities, including custom illustration, character animation, typography, UI animation, and motion graphics.' },
      { q: 'Do you work with startups?', a: 'Yes. Our startup explainer video services are designed to help new and growing companies communicate products, ideas, and value propositions clearly.' }
    ])}
  </div>
</section>
${cta('Have a Product That Needs Explaining?', 'Tell us what you are building, who you need to reach, and what you want people to understand. We will help shape the story and create an explainer video that makes the message clear.', { href: '/contact/', label: 'Start a Project' }, { href: '/contact/', label: 'Talk to Our Team' })}`
});

const saas = page({
  title: 'SaaS Product Animation Studio | Feature & Demo Videos - Funimation',
  description: 'Product and SaaS animation for feature launches, onboarding, and app walkthroughs. We help SaaS teams show, not just tell, how their product works.',
  canonical: 'https://thefunimation.co/services/saas-product-animation/',
  current: 'services',
  ogImage: 'https://thefunimation.co/4th%20project/cover.png',
  ogAlt: 'Sela Cloud SaaS product animation by Funimation',
  schema: [serviceSchema('SaaS product animation', 'Product animation', 'https://thefunimation.co/services/saas-product-animation/', 'Feature launch videos, software demo animation, and product walkthroughs for SaaS teams.')],
  body: `<header class="page-hero">
  <div class="section-inner">
    <nav class="crumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/services/">Services</a><span>/</span><span>SaaS Product Animation</span></nav>
    <p class="page-kicker">Product animation studio</p>
    <h1>SaaS Product Animation That Makes Software Easier to Understand</h1>
    <p class="lead">Your software can do a lot. Your audience should not have to figure it all out alone. Funimation is a product animation studio creating custom SaaS product animation, software demo animation, and feature launch videos that show how digital products work and why their features matter.</p>
    <div class="hero-btns">
      <a href="/contact/" class="btn-primary">Start Your Project</a>
      <a href="/work/" class="btn-secondary">View Our Product Animation</a>
    </div>
  </div>
</header>
<section class="section" style="background:#fff">
  <div class="section-inner copy-block">
    <h2 class="section-title">Show Your Product, Not Just Your Screenshots</h2>
    <p>Static screenshots can show what a product looks like, but animation can show what it does. Funimation helps SaaS and product teams turn interfaces, workflows, features, and technical ideas into visual stories that are easier for prospects, customers, and internal teams to understand.</p>
    <p>Our SaaS product animation combines product UI, motion graphics, storytelling, and interaction to create focused visual experiences. We can highlight one important feature or build a complete product story around the customer journey. The approach depends on what you need the audience to understand and where the animation will be used.</p>
  </div>
</section>
<section class="section">
  <div class="section-inner">
    <h2 class="section-title center">SaaS Product Animation Services</h2>
    <div class="services-grid">
      <div class="service-card"><h3>Product Feature Animation</h3><p>Show a feature from start to finish. We animate product interfaces, actions, transitions, and outcomes so viewers can understand how the feature works without navigating the software themselves.</p></div>
      <div class="service-card"><h3>Software Demo Animation</h3><p>A software demo animation can communicate a product workflow in a concise, controlled format. We highlight the screens and actions that matter most while removing the distractions that often come with a live product demo.</p></div>
      <div class="service-card"><h3>Feature Launch Video</h3><p>A feature launch video can help marketing, sales, customer success, and product teams communicate an update consistently across your website, campaigns, presentations, and social channels.</p></div>
      <div class="service-card"><h3>Product Walkthroughs</h3><p>Use animation to guide viewers through onboarding, a core workflow, or a new user journey. We can combine UI animation with illustrations, characters, diagrams, and motion graphics when the product story needs more context.</p></div>
      <div class="service-card"><h3>SaaS Marketing Animation</h3><p>Turn product functionality into marketing content that explains value rather than simply listing features. These animations can support landing pages, paid campaigns, email, sales enablement, events, and product marketing.</p></div>
      <a class="service-card" href="/services/"><h3>Explore Our Services</h3><p>Need a broader explainer or interactive web motion as well? See how product animation fits the rest of the studio.</p><span class="service-more">View all services →</span></a>
    </div>
  </div>
</section>
<section class="section" style="background:#fff">
  <div class="section-inner copy-block">
    <h2 class="section-title">Explain the Feature and the Value Behind It</h2>
    <p>Product animation works best when it answers more than “what does this button do?” We focus on the reason the feature matters to the user. What problem does it solve? What changes after the user adopts it? How does it fit into the larger workflow?</p>
    <p>By connecting interface actions with user outcomes, animation can make a feature easier to remember. A good product story can move from the customer’s challenge to the product workflow, then show the result in a way that feels quick and intuitive.</p>
  </div>
</section>
<section class="section">
  <div class="section-inner">
    <h2 class="section-title">One Animation, Multiple Business Uses</h2>
    <p class="section-desc">A well-planned SaaS product animation can support more than one campaign. We plan the story and visual assets with these uses in mind.</p>
    <div class="services-grid">
      <div class="service-card"><h3>Marketing</h3><p>Feature pages, launch campaigns, and paid content that show the product in motion.</p></div>
      <div class="service-card"><h3>Sales</h3><p>Presentations and demos when a live walkthrough is not practical.</p></div>
      <div class="service-card"><h3>Product</h3><p>Internal alignment on what a release actually does.</p></div>
      <div class="service-card"><h3>Customer success</h3><p>Shorter sections for education, onboarding, and help content.</p></div>
    </div>
  </div>
</section>
<section class="section" style="background:#fff">
  <div class="section-inner">
    <h2 class="section-title">Our SaaS Product Animation Process</h2>
    <div class="process-list">
      <div class="process-item"><div class="step-num">01</div><div><strong>Product Discovery</strong><p>We learn how the product works, who uses it, what feature needs attention, and what outcome the animation should support.</p></div></div>
      <div class="process-item"><div class="step-num">02</div><div><strong>Story &amp; Script</strong><p>We turn the product information into a focused narrative that connects functionality with customer value.</p></div></div>
      <div class="process-item"><div class="step-num">03</div><div><strong>Storyboard &amp; UI Planning</strong><p>We map the scenes, interface states, camera movement, transitions, and supporting visual elements.</p></div></div>
      <div class="process-item"><div class="step-num">04</div><div><strong>Visual Design</strong><p>We adapt your existing brand and product design or create a custom visual direction for the animation.</p></div></div>
      <div class="process-item"><div class="step-num">05</div><div><strong>Animation</strong><p>We animate the UI, transitions, typography, illustrations, characters, and other elements required by the story.</p></div></div>
      <div class="process-item"><div class="step-num">06</div><div><strong>Review &amp; Delivery</strong><p>We refine the animation through the agreed review stages and prepare final assets for your intended channels.</p></div></div>
    </div>
    <p style="margin-top:24px"><a href="/#process" class="btn-secondary">See Our Process</a></p>
  </div>
</section>
<section class="section">
  <div class="section-inner">
    <h2 class="section-title">Why Choose Funimation as Your Product Animation Studio?</h2>
    <p class="copy-block">Software animation needs a different approach from a generic promotional video. The audience needs to understand an interface, workflow, or technical concept while still seeing the value behind it. We can work from product screenshots, Figma files, prototypes, existing brand guidelines, or a product demonstration.</p>
    <div class="why-points" style="margin-top:28px">
      <div class="why-point"><div class="check">✓</div><p>SaaS and digital product focus</p></div>
      <div class="why-point"><div class="check">✓</div><p>Custom product UI animation</p></div>
      <div class="why-point"><div class="check">✓</div><p>Feature launch video production</p></div>
      <div class="why-point"><div class="check">✓</div><p>Software demo animation</p></div>
      <div class="why-point"><div class="check">✓</div><p>2D motion graphics and illustration</p></div>
      <div class="why-point"><div class="check">✓</div><p>Collaboration with product and marketing teams</p></div>
    </div>
  </div>
</section>
<section class="section" style="background:#fff">
  <div class="section-inner copy-block">
    <h2 class="section-title">Where to Use SaaS Product Animation</h2>
    <p>Use product animation wherever your audience needs to understand software quickly. Add it to a homepage to demonstrate the product at a glance. Place it on a feature page to explain a specific workflow. Use it in a launch campaign to introduce a new capability. Add it to a sales deck when a live demo is not practical.</p>
    <p>Product animation can also support onboarding, customer education, help content, social media, paid advertising, webinars, and internal presentations. The same core story can often be edited or repurposed into shorter pieces for different channels.</p>
    <p style="margin-top:20px"><a href="/contact/" class="btn-primary">Discuss Your Product</a></p>
  </div>
</section>
<section class="section">
  <div class="section-inner">
    <h2 class="section-title">See Product Stories in Motion</h2>
    <div class="work-grid">
      <a class="work-card" href="/work/sela-cloud-explainer-video/"><img src="/4th%20project/cover.png" alt="Sela Cloud product story" loading="lazy"><div class="work-card-body"><h3>Sela Cloud</h3><p>Cloud and AI services explained for mixed audiences.</p></div></a>
      <a class="work-card" href="/work/before-health-ai-healthcare-explainer/"><img src="/3rd%20project/cover.png" alt="Before Health product story" loading="lazy"><div class="work-card-body"><h3>Before Health Intelligence</h3><p>Predictive healthcare technology, made approachable.</p></div></a>
      <a class="work-card" href="/work/carakit-care-kit-explainer/"><img src="/11%20project/cover.png" alt="CaraKit product story" loading="lazy"><div class="work-card-body"><h3>CaraKit</h3><p>A product story built around care and clarity.</p></div></a>
    </div>
  </div>
</section>
<section class="section" style="background:#fff">
  <div class="section-inner">
    <h2 class="section-title center">Frequently Asked Questions</h2>
    ${faq([
      { q: 'What is SaaS product animation?', a: 'SaaS product animation uses motion, product UI, visual storytelling, and design to explain how software works or demonstrate the value of a feature.' },
      { q: 'What does a product animation studio create?', a: 'A product animation studio can create feature animations, software demos, product walkthroughs, launch videos, UI motion, and other visual content designed around a digital product.' },
      { q: 'Can you create a software demo animation from our existing product?', a: 'Yes. We can work from screenshots, product recordings, Figma files, prototypes, or live product demonstrations to plan the animation.' },
      { q: 'Can you create a feature launch video?', a: 'Yes. We can create feature launch videos that explain what changed, why it matters, and how customers can use the new functionality.' },
      { q: 'How much does product animation cost?', a: 'Pricing depends on the scope, number of scenes, animation complexity, UI detail, storytelling requirements, and final deliverables. We recommend scoping the project around your specific goal rather than using a one-size-fits-all price.' }
    ])}
  </div>
</section>
${cta('Have a SaaS Product That Needs a Better Story?', 'Whether you are launching a new feature, improving your homepage, supporting sales, or explaining a complex workflow, Funimation can turn your product into a clear visual story.')}`
});

const interactive = page({
  title: 'Interactive Web Animation Studio | Rive & Lottie Experts - Funimation',
  description: 'Interactive website animation, Rive, and Lottie design for landing pages and product sites. Lightweight, on-brand motion that boosts engagement and conversion.',
  canonical: 'https://thefunimation.co/services/interactive-web-animation/',
  current: 'services',
  schema: [serviceSchema('Interactive web animation', 'Rive and Lottie animation', 'https://thefunimation.co/services/interactive-web-animation/', 'Interactive website motion, Rive, Lottie, and scroll animation for product sites.')],
  body: `<header class="page-hero">
  <div class="section-inner">
    <nav class="crumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/services/">Services</a><span>/</span><span>Interactive Web Animation</span></nav>
    <p class="page-kicker">Rive &amp; Lottie</p>
    <h1>Interactive Web Animation That Makes Digital Experiences Move</h1>
    <p class="lead">Make your website more engaging with interactive web animation built around your brand and user experience. Funimation creates website motion design, scroll animation, interactive UI elements, Rive experiences, and Lottie animation that help visitors understand, explore, and connect with your digital product.</p>
    <div class="hero-btns">
      <a href="/contact/" class="btn-primary">Start Your Project</a>
      <a href="/work/bazaar-interactive-icon-animation/" class="btn-secondary">See Our Interactive Work</a>
    </div>
  </div>
</header>
<section class="section" style="background:#fff">
  <div class="section-inner copy-block">
    <h2 class="section-title">Motion That Responds to the User</h2>
    <p>Modern websites can do more than display information. Thoughtful animation can guide attention, explain how a product works, show relationships between ideas, and create moments that make a brand memorable. Our interactive web animation services combine design and motion with the way people actually move through a page.</p>
    <p>Instead of adding animation simply because it looks impressive, we use motion where it has a job to do. A transition can connect two sections. A micro-interaction can confirm an action. A scroll animation can reveal a product story at the right moment. An interactive visual can demonstrate a workflow that would otherwise take several paragraphs to explain. One client landing-page engagement test saw conversion lift 28% after interactive motion shipped — the point is purpose, not decoration.</p>
  </div>
</section>
<section class="section">
  <div class="section-inner">
    <h2 class="section-title center">Interactive Web Animation Services</h2>
    <div class="services-grid">
      <div class="service-card"><h3>Website Motion Design</h3><p>Create a stronger visual flow with animated typography, illustrations, UI elements, transitions, and branded movement for landing pages, product websites, and campaign pages.</p></div>
      <div class="service-card"><h3>Scroll Animation Design</h3><p>Use scroll as part of the story. We create scroll animation design that reveals information progressively, connects scenes, highlights product features, and keeps visual momentum.</p></div>
      <div class="service-card"><h3>Rive Animation</h3><p>As a Rive animation studio, we create interactive vector-based motion for websites and products — useful for responsive interactions, animated UI, characters, and experiences that react to user input.</p></div>
      <div class="service-card"><h3>Lottie Animation</h3><p>Our Lottie animation agency services help product and web teams add lightweight motion to icons, buttons, onboarding moments, loading states, empty states, and other UI components.</p></div>
      <div class="service-card"><h3>Interactive UI Animation</h3><p>Bring interfaces to life with hover states, transitions, feedback animations, animated components, and micro-interactions that make digital products feel more responsive.</p></div>
      <div class="service-card"><h3>Interactive Storytelling</h3><p>Turn a product story or brand message into an experience where motion appears as the user explores — especially effective for technology, SaaS, and product-focused websites.</p></div>
    </div>
  </div>
</section>
<section class="section" style="background:#fff">
  <div class="section-inner copy-block">
    <h2 class="section-title">Rive and Lottie Animation for Modern Products</h2>
    <p>Rive and Lottie give product teams practical ways to bring custom motion into digital interfaces. We design animation with implementation in mind, so the final assets can work as part of the experience rather than as isolated video files.</p>
    <p>Rive is particularly useful when an animation needs to respond to interaction or state changes. Lottie is well suited to lightweight interface animation and reusable motion assets. We can help determine which approach fits the experience, create the animation, and work with your design or development team on the final implementation requirements.</p>
  </div>
</section>
<section class="section" data-hydrate-media>
  <div class="section-inner">
    <h2 class="section-title">Case study: Bazaar interactive icon system</h2>
    <p class="section-desc">A lightweight Rive icon system for web and product UI. The live embed below loads only when it is about to enter view.</p>
    <div class="rive-embed-card" style="max-width:420px">
      <iframe data-src="https://rive.app/s/jnWiap4xwUyTwzj0M5uZhQ/embed" title="Bazaar interactive icon preview" loading="lazy" allow="autoplay"></iframe>
    </div>
    <p style="margin-top:20px"><a href="/work/bazaar-interactive-icon-animation/" class="btn-secondary">Open the Bazaar case study</a></p>
  </div>
</section>
<section class="section" style="background:#fff">
  <div class="section-inner">
    <h2 class="section-title">Why Add Animation to Your Website?</h2>
    <p class="copy-block">Interactive animation can improve the way information is presented when it is designed with a clear purpose. The key is restraint. We design motion around the user journey so animation supports the experience instead of slowing it down or distracting from the message.</p>
    <div class="services-grid" style="margin-top:28px">
      <div class="service-card"><h3>Explain</h3><p>Show a workflow without forcing users to read a long explanation.</p></div>
      <div class="service-card"><h3>Guide</h3><p>Direct attention to the next step, feature, or proof point.</p></div>
      <div class="service-card"><h3>Engage</h3><p>Give visitors a reason to keep exploring the page.</p></div>
      <div class="service-card"><h3>Differentiate</h3><p>Create a more distinctive product-site experience.</p></div>
    </div>
  </div>
</section>
<section class="section">
  <div class="section-inner">
    <h2 class="section-title">Our Interactive Animation Process</h2>
    <div class="process-list">
      <div class="process-item"><div class="step-num">01</div><div><strong>Discovery</strong><p>We understand your website, product, audience, goals, technical requirements, and existing design system.</p></div></div>
      <div class="process-item"><div class="step-num">02</div><div><strong>Motion Planning</strong><p>We identify where animation can improve the experience and define the interaction behavior.</p></div></div>
      <div class="process-item"><div class="step-num">03</div><div><strong>Design</strong><p>We create the visual assets, motion language, interaction states, and animation direction.</p></div></div>
      <div class="process-item"><div class="step-num">04</div><div><strong>Prototype &amp; Animate</strong><p>We build the approved interactions and refine timing, transitions, responsiveness, and user feedback.</p></div></div>
      <div class="process-item"><div class="step-num">05</div><div><strong>Handoff</strong><p>We prepare implementation-ready assets and documentation for your development team, based on the agreed technical approach.</p></div></div>
    </div>
    <p style="margin-top:24px"><a href="/#process" class="btn-secondary">Explore Our Process</a></p>
  </div>
</section>
<section class="section" style="background:#fff">
  <div class="section-inner copy-block">
    <h2 class="section-title">Built for SaaS, Product and Brand Websites</h2>
    <p>Interactive web animation is especially useful when a website needs to explain something that is difficult to communicate through static design. We can animate dashboards, product interfaces, workflows, diagrams, characters, illustrations, icons, and data-driven visuals.</p>
    <p>A SaaS homepage might use motion to show how a workflow moves from one step to another. A product page might animate a new feature as users scroll. A startup website might use an interactive character to guide visitors through its story. These experiences can be designed as individual sections or as a connected motion system across the website.</p>
  </div>
</section>
<section class="section">
  <div class="section-inner">
    <h2 class="section-title">Why Choose Funimation for Interactive Web Animation?</h2>
    <div class="why-points">
      <div class="why-point"><div class="check">✓</div><p>Custom interactive motion</p></div>
      <div class="why-point"><div class="check">✓</div><p>Rive and Lottie capabilities</p></div>
      <div class="why-point"><div class="check">✓</div><p>SaaS and digital product focus</p></div>
      <div class="why-point"><div class="check">✓</div><p>Website motion and scroll animation</p></div>
      <div class="why-point"><div class="check">✓</div><p>UI animation and micro-interactions</p></div>
      <div class="why-point"><div class="check">✓</div><p>Collaboration with design and development teams</p></div>
    </div>
  </div>
</section>
<section class="section" style="background:#fff">
  <div class="section-inner">
    <h2 class="section-title center">Frequently Asked Questions</h2>
    ${faq([
      { q: 'What is interactive web animation?', a: 'Interactive web animation uses motion that responds to scrolling, hovering, clicking, page states, or other user actions. It can make a website more engaging while helping users understand information.' },
      { q: 'What does a Rive animation studio do?', a: 'A Rive animation studio creates interactive vector animation that can respond to user input and application states. We use Rive for suitable web and product experiences.' },
      { q: 'Can you create Lottie animations?', a: 'Yes. We create Lottie animation assets for interfaces, onboarding, icons, illustrations, and other lightweight product experiences.' },
      { q: 'Can you create scroll animation design?', a: 'Yes. We can plan and create scroll-based motion that reveals content, connects sections, demonstrates product functionality, or supports storytelling.' },
      { q: 'Will the animation work on mobile?', a: 'Mobile behavior is considered during the planning stage. We design interactions around the requirements and performance needs of the target devices.' }
    ])}
  </div>
</section>
${cta('Ready to Make Your Website More Interactive?', 'Whether you need website motion design, scroll animation, Rive, Lottie, or custom interactive storytelling, Funimation can create motion that fits your brand and supports the user journey.')}`
});

const workCards = [
  { href: '/work/carakit-care-kit-explainer/', filters: 'explainer character', img: '/11%20project/cover.png', alt: 'CaraKit explainer cover', tags: 'Care & Recovery · Explainer', title: 'CaraKit — Care-Kit Brand Explainer', copy: 'Helping people understand how curated, treatment-aware gifts can bring comfort and practical support.' },
  { href: '/work/before-health-ai-healthcare-explainer/', filters: 'explainer product', img: '/3rd%20project/cover.png', alt: 'Before Health Intelligence cover', tags: 'AI Healthcare · Explainer', title: 'Before Health Intelligence — AI Healthcare Explainer', copy: 'Making predictive health technology clear through approachable characters and modern visual storytelling.' },
  { href: '/work/sela-cloud-explainer-video/', filters: 'explainer product', img: '/4th%20project/cover.png', alt: 'Sela Cloud cover', tags: 'Cloud & AI · Explainer', title: 'Sela Cloud — Cloud & AI Explainer Animation', copy: 'Simplifying cloud infrastructure and AI services for business and technical audiences.' },
  { href: '/work/bazaar-interactive-icon-animation/', filters: 'interactive', img: '/hero-reel-poster.jpg', alt: 'Interactive motion still', tags: 'Interactive · Rive', title: 'Bazaar — Interactive Brand Icon Animation', copy: 'A lightweight interactive icon system bringing motion, feedback, and personality to Bazaar’s digital experience.' },
  { href: '/?project=maven', filters: 'explainer', img: '/13%20project/thumbnail.png', alt: 'Maven Investment Partners thumbnail', tags: 'Investment · Explainer', title: 'Maven Investment Partners — Explainer Animation', copy: 'Communicating trust, growth, and financial expertise through polished branding and clear presentation.' },
  { href: '/?project=ismed-clim', filters: 'explainer', img: '/1st%20project/cover.png', alt: 'ISMED-CLIM cover', tags: 'Climate & Health · Explainer', title: 'ISMED-CLIM — Climate & Public Health Awareness', copy: 'Making climate-health research clear, accessible, and engaging for audiences across the Mediterranean.' },
  { href: '/?project=gifybox', filters: 'explainer product', img: '/12%20project/cover.png', alt: 'GifyBox cover', tags: 'Event Tech · Product Explainer', title: 'GifyBox — Event Photo Booth Explainer', copy: 'Showing how interactive photo and GIF experiences turn live events into shareable branded moments.' },
  { href: '/?project=upfit-supply', filters: 'explainer product', img: '/5th%20project/cover.png', alt: 'Upfit Supply cover', tags: 'Commercial Vehicles · Product', title: 'Upfit Supply — Product Explainer Animation', copy: 'Showing how custom commercial vehicle solutions improve efficiency, organization, and productivity.' },
  { href: '/?project=hancock-health', filters: 'explainer', img: '/2nd%20project/cover.png', alt: 'Hancock Health cover', tags: 'Healthcare · Explainer', title: 'Hancock Health — Healthcare Explainer Animation', copy: 'An approachable visual story helping patients understand community-focused healthcare services.' },
  { href: '/?project=mtech-systems', filters: 'explainer product', img: '/6th%20project/cover.png', alt: 'MTech Systems cover', tags: 'AgTech · Explainer', title: 'MTech Systems — AgTech Explainer Animation', copy: 'Explaining how real-time data, IoT, and AI help producers make smarter decisions across the supply chain.' },
  { href: '/?project=greenopia', filters: 'explainer', img: '/7th%20project/Cover.png', alt: 'Greenopia cover', tags: 'Sustainability · Explainer', title: 'Greenopia — Sustainability Platform Explainer', copy: 'Helping people understand how to discover verified businesses and make more conscious purchasing decisions.' },
  { href: '/?project=secufy-sos', filters: 'explainer', img: '/8th%20project/cover-08.png', alt: 'Secufy SOS cover', tags: 'Personal Safety · App', title: 'Secufy SOS — Personal Safety Explainer', copy: 'Making emergency alerts, live location sharing, and rapid access to help clear and reassuring.' },
  { href: '/?project=farmerlink', filters: 'explainer product', img: '/9th%20project/cover-25.png', alt: 'FarmerLink cover', tags: 'Digital Agriculture · Explainer', title: 'FarmerLink — Digital Agriculture Explainer', copy: 'Making field data collection, collaboration, and data-driven farm management easy to understand.' },
  { href: '/?project=buddywerking', filters: 'explainer character', img: '/10%20project/cover-08.png', alt: 'Buddywerking cover', tags: 'Social Impact · Nonprofit', title: 'Buddywerking Vlaanderen — Social Impact Explainer', copy: 'Showing how meaningful one-on-one friendships foster trust, inclusion, and community support.' }
];

const workHub = page({
  title: 'Animation Studio Portfolio | Explainer & SaaS Work - Funimation',
  description: 'Browse Funimation’s animation studio portfolio: explainer videos, SaaS product animation, and interactive Rive work for startups and digital products.',
  canonical: 'https://thefunimation.co/work/',
  current: 'work',
  body: `<header class="page-hero">
  <div class="section-inner">
    <p class="page-kicker">Portfolio</p>
    <h1>Our Work</h1>
    <p class="lead">Explore a selection of animation, motion design, and interactive projects created by Funimation. From SaaS product animation and explainer videos to character animation and interactive web experiences, our portfolio shows how we use design and motion to make complex ideas easier to understand.</p>
    <div class="hero-btns">
      <a href="/contact/" class="btn-primary">Start a Project</a>
      <a href="/services/" class="btn-secondary">Explore Services</a>
    </div>
  </div>
</header>
<section class="section" style="background:#fff">
  <div class="section-inner">
    <h2 class="section-title">Animation Built Around a Purpose</h2>
    <p class="copy-block">Every project starts with a different challenge. One client may need to explain a complex SaaS workflow. Another may need a feature launch video. A product team may need UI motion or onboarding animation. A brand may need a character that can become part of its identity. We do not use one visual style for every project. Browse the work below to see how different ideas become animated experiences.</p>
    <div class="filter-bar" data-work-filters role="group" aria-label="Filter portfolio">
      <button class="filter-btn active" type="button" data-filter="all" aria-pressed="true">All Work</button>
      <button class="filter-btn" type="button" data-filter="explainer" aria-pressed="false">Explainer Videos</button>
      <button class="filter-btn" type="button" data-filter="product" aria-pressed="false">SaaS Product Animation</button>
      <button class="filter-btn" type="button" data-filter="interactive" aria-pressed="false">Interactive Web Animation</button>
      <button class="filter-btn" type="button" data-filter="character" aria-pressed="false">Character Animation</button>
    </div>
    <div class="work-grid" style="margin-top:28px">
      ${workCards.map(card => `<a class="work-card" href="${card.href}" data-filters="${card.filters}">
        <img src="${card.img}" alt="${escape(card.alt)}" loading="lazy" decoding="async">
        <div class="work-card-body">
          <div class="work-tags"><span class="work-tag">${card.tags}</span></div>
          <h3>${card.title}</h3>
          <p>${card.copy}</p>
        </div>
      </a>`).join('\n      ')}
    </div>
  </div>
</section>
<section class="section">
  <div class="section-inner copy-block">
    <h2 class="section-title">What Goes Into Each Project</h2>
    <p>A finished animation is only one part of the process. Behind each project are discovery, research, scripting, storyboarding, visual development, design, animation, sound, reviews, and final delivery. We work with client teams to understand the product and audience, then translate that understanding into a visual story.</p>
    <p>Wave-1 case studies — CaraKit, Before Health Intelligence, Sela Cloud, and Bazaar — have dedicated pages. Other projects currently open from the homepage so you can still watch the film and read the original write-up.</p>
  </div>
</section>
<section class="section" style="background:#fff">
  <div class="section-inner">
    <h2 class="section-title center">Frequently Asked Questions</h2>
    ${faq([
      { q: 'What can I see in the Funimation portfolio?', a: 'Our work includes explainer videos, SaaS product animation, interactive web animation, app motion design, motion graphics, and character animation.' },
      { q: 'Do you have a SaaS animation portfolio?', a: 'Yes. The portfolio features SaaS and product projects, including UI-led stories, software demonstrations, and feature-focused animation.' },
      { q: 'Can I request a project similar to something in your portfolio?', a: 'Yes. If you like a particular storytelling approach, animation style, character treatment, or UI animation technique, we can discuss how that approach could be adapted to your product and brand.' },
      { q: 'Where can I learn more about your services?', a: 'Explore the Services page for explainer videos, SaaS product animation, interactive web animation, app motion, motion graphics, and character animation.' }
    ])}
  </div>
</section>
${cta('Like What You See? Let’s Create Something Together', 'If you have a product, feature, campaign, website, or idea that needs animation, tell us what you are trying to communicate.', { href: '/contact/', label: 'Start a Project' }, { href: '/contact/', label: 'Contact Us' })}`
});

function casePage({ slug, title, metaTitle, description, kicker, h1, paragraphs, client, deliverables, focus, website, poster, video, scenes, videoName, rive }) {
  const canonical = `https://thefunimation.co/work/${slug}/`;
  const schema = [{
    '@type': 'CreativeWork',
    name: h1,
    url: canonical,
    creator: { '@id': 'https://thefunimation.co/#organization' },
    about: focus
  }];
  if (video) {
    schema.push({
      '@type': 'VideoObject',
      name: videoName || h1,
      description,
      thumbnailUrl: `https://thefunimation.co/${poster}`,
      contentUrl: `https://thefunimation.co/${video}`
    });
  }
  const sceneHtml = scenes ? `<section class="project-scenes">
    <div class="project-scenes-head">
      <h3>Visual scenes</h3>
      <p>Selected frames from the animation’s visual development</p>
    </div>
    <div class="scene-grid">
      ${scenes.map((src, i) => `<a href="/${src}" target="_blank"><img src="/${src}" alt="${escape(client)} visual scene ${i + 1}" loading="lazy"></a>`).join('\n      ')}
    </div>
  </section>` : '';
  const media = rive
    ? `<section class="rive-project-gallery" data-hydrate-media>
    <div class="rive-project-head">
      <h3>Interactive icon collection</h3>
      <p>Explore the live Rive animations below. Move, click, or tap to experience their interactive states. Embeds load only when they approach the viewport.</p>
    </div>
    <div class="rive-gallery-grid">
      ${rive.map((src, i) => `<div class="rive-embed-card"><iframe data-src="${src}" title="Bazaar interactive icon ${i + 1}" loading="lazy" allow="autoplay" allowfullscreen></iframe></div>`).join('\n      ')}
    </div>
  </section>`
    : `<div class="project-media" data-hydrate-media>
    <video controls preload="none" poster="/${poster}" width="1920" height="1080">
      <source data-src="/${video}" type="video/mp4">
      Your browser does not support HTML video.
    </video>
  </div>`;

  return page({
    title: metaTitle,
    description,
    canonical,
    current: 'work',
    ogImage: `https://thefunimation.co/${poster}`,
    ogAlt: h1,
    schema,
    bodyClass: 'case-page',
    body: `${media}
    ${sceneHtml}
    <div class="project-content">
      <div class="project-content-main">
        <nav class="crumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/work/">Work</a><span>/</span><span>${escape(client)}</span></nav>
        <div class="project-kicker">${kicker}</div>
        <h1 id="caseTitle">${h1}</h1>
        ${paragraphs.map(p => `<p>${p}</p>`).join('\n        ')}
      </div>
      <aside class="project-meta">
        <div class="project-meta-item"><strong>Client</strong><span>${escape(client)}</span></div>
        <div class="project-meta-item"><strong>Deliverables</strong><span>${escape(deliverables)}</span></div>
        <div class="project-meta-item"><strong>Focus</strong><span>${escape(focus)}</span></div>
        ${website ? `<div class="project-meta-item"><strong>Website</strong><span><a href="${website}" target="_blank" rel="noopener noreferrer">${website.replace('https://', '')} ↗</a></span></div>` : ''}
        <a class="project-resource" href="/contact/">Contact us</a>
      </aside>
    </div>
    <section class="section">
      <div class="section-inner">
        <h2 class="section-title">More work</h2>
        <p><a href="/work/" class="btn-secondary">Back to portfolio</a> <a href="/services/" class="btn-primary" style="margin-left:8px">Explore services</a></p>
      </div>
    </section>
    ${cta('Want a similar result?', 'Tell us about the product or story you need to explain. We will help shape the right animation approach.')}`
  });
}

const carakit = casePage({
  slug: 'carakit-care-kit-explainer',
  title: 'CaraKit',
  metaTitle: 'CaraKit Explainer Video Case Study - Funimation',
  description: '2D explainer animation for CaraKit, a care-kit brand supporting people through treatment and recovery. A Funimation case study.',
  kicker: 'Featured Case Study · Care & Recovery',
  h1: 'CaraKit — Care-Kit Brand Explainer',
  paragraphs: [
    'Funimation created a 2D explainer animation for CaraKit, a thoughtful care-kit brand helping people send meaningful support to loved ones going through cancer treatment, surgery, and recovery. The video was designed to communicate CaraKit’s compassionate approach to gifting, showing how curated, treatment-aware products can bring comfort, reassurance, and practical care during some of life’s hardest moments.',
    'Through warm character animation, clean motion graphics, and gentle visual storytelling, we helped transform CaraKit’s mission into an approachable and emotionally resonant explainer that makes it easier for people to understand how to show up with care.'
  ],
  client: 'CaraKit',
  deliverables: '2D explainer animation, character animation, motion graphics',
  focus: 'Cancer treatment, surgery recovery, compassionate gifting',
  poster: '11%20project/cover.png',
  video: '11%20project/Animation%20Video%20111.mp4'
});

const beforeHealth = casePage({
  slug: 'before-health-ai-healthcare-explainer',
  title: 'Before Health Intelligence',
  metaTitle: 'AI Healthcare Explainer Video Case Study - Funimation',
  description: '2D explainer animation for Before Health Intelligence, translating predictive AI healthcare into a clear, memorable story.',
  kicker: 'Featured Case Study · AI Healthcare',
  h1: 'Before Health Intelligence — AI Healthcare Explainer',
  paragraphs: [
    'Funimation partnered with Before Health Intelligence to create an engaging 2D explainer animation showcasing how artificial intelligence and wearable technology can help predict critical health events before they happen. The video translates advanced medical technology into a clear, accessible story, illustrating how predictive algorithms analyze data from everyday devices to support earlier intervention and better patient outcomes.',
    'Through modern motion graphics and clean visual storytelling, we helped communicate a complex healthcare innovation in a way that’s easy to understand and memorable.'
  ],
  client: 'Before Health Intelligence',
  deliverables: '2D explainer animation, character animation, motion graphics',
  focus: 'Artificial intelligence, wearable technology, predictive healthcare',
  poster: '3rd%20project/cover.png',
  video: '3rd%20project/before-health-web.mp4',
  scenes: Array.from({ length: 12 }, (_, i) => `3rd%20project/scenes/scene-${String(i + 1).padStart(2, '0')}.jpg`)
});

const sela = casePage({
  slug: 'sela-cloud-explainer-video',
  title: 'Sela Cloud',
  metaTitle: 'Cloud & AI Explainer Animation Case Study - Funimation',
  description: '2D explainer animation for Sela Cloud, simplifying cloud infrastructure and AI services for business and technical audiences.',
  kicker: 'Featured Case Study · Cloud & AI',
  h1: 'Sela Cloud — Cloud & AI Explainer Animation',
  paragraphs: [
    'Funimation created a 2D explainer animation for Sela Cloud, a global cloud consulting partner helping SaaS and AI companies build, migrate, and optimize solutions across AWS, Microsoft Azure, and Google Cloud. The animation simplifies complex cloud infrastructure and AI concepts into an engaging visual story, making technical services easy to understand for both business and technical audiences.',
    'Through modern motion graphics and clear storytelling, we helped showcase Sela Cloud’s expertise in accelerating innovation, improving scalability, and driving digital transformation.'
  ],
  client: 'Sela Cloud',
  deliverables: '2D explainer animation, character animation, motion graphics',
  focus: 'Cloud infrastructure, AI services, digital transformation',
  website: 'https://selacloud.com/',
  poster: '4th%20project/cover.png',
  video: '4th%20project/sela-cloud-web.mp4',
  scenes: Array.from({ length: 8 }, (_, i) => `4th%20project/scenes/scene-${String(i + 1).padStart(2, '0')}.jpg`)
});

const bazaar = casePage({
  slug: 'bazaar-interactive-icon-animation',
  title: 'Bazaar',
  metaTitle: 'Interactive Rive Icon Animation Case Study - Funimation',
  description: 'Interactive Rive icon system for Bazaar — lightweight brand motion designed for web and mobile interfaces. A Funimation case study.',
  kicker: 'Featured Case Study · Interactive Brand Motion',
  h1: 'Bazaar — Interactive Brand Icon Animation',
  paragraphs: [
    'Funimation partnered with Bazaar to create a collection of interactive animated icons that bring their digital brand experience to life. Designed with performance and usability in mind, the animations provide subtle, engaging feedback while reinforcing the brand’s visual identity across web and mobile interfaces.',
    'By combining thoughtful motion design with clean, lightweight animation, we helped create a more polished, dynamic, and memorable user experience.'
  ],
  client: 'Bazaar',
  deliverables: 'Interactive icon system, brand motion, Rive animations',
  focus: 'Web and mobile interaction, usability, lightweight motion',
  poster: 'hero-reel-poster.jpg',
  rive: [
    'https://rive.app/s/jnWiap4xwUyTwzj0M5uZhQ/embed',
    'https://rive.app/s/kLDNhJdhoU2DvY19aiHJkQ/embed',
    'https://rive.app/s/mcV4lUTPBEmtRWzSiIWklw/embed',
    'https://rive.app/s/ex290J8yKEuKhFn5CPiFnQ/embed',
    'https://rive.app/s/hmuv20UmekyWcseE6yhyyw/embed',
    'https://rive.app/s/WeifwonwnkqCjAligEDshA/embed',
    'https://rive.app/s/z4mQrdbJW0i_kRwuy2VtsA/embed',
    'https://rive.app/s/ld273qprv0_dxu3OztUOFw/embed',
    'https://rive.app/s/1Kp3JxG5FUSWYG_QFcxcXg/embed',
    'https://rive.app/s/--ZdVd43mEi4m49uK35j1g/embed',
    'https://rive.app/s/-4LQ5Dh72E6b7Bu5BGx_mA/embed'
  ]
});

const contact = page({
  title: 'Contact Funimation | Los Angeles Animation Studio',
  description: 'Start a project with Funimation. Email hello@thefunimation.co, call +1 818 966 4249, or visit 16437 Knapp Street, North Hills.',
  canonical: 'https://thefunimation.co/contact/',
  current: 'contact',
  schema: [{
    '@type': 'LocalBusiness',
    '@id': 'https://thefunimation.co/#localbusiness',
    name: 'Funimation Studio',
    image: 'https://thefunimation.co/Fun!%20logo%20dark.svg',
    url: 'https://thefunimation.co/',
    telephone: '+1-818-966-4249',
    email: 'hello@thefunimation.co',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '16437 Knapp Street',
      addressLocality: 'North Hills',
      addressRegion: 'CA',
      addressCountry: 'US'
    },
    parentOrganization: { '@id': 'https://thefunimation.co/#organization' },
    areaServed: [
      { '@type': 'Country', name: 'United States' },
      { '@type': 'Country', name: 'Canada' }
    ]
  }, {
    '@type': 'ContactPage',
    url: 'https://thefunimation.co/contact/',
    name: 'Contact Funimation',
    mainEntity: { '@id': 'https://thefunimation.co/#localbusiness' }
  }],
  body: `<header class="page-hero">
  <div class="section-inner">
    <p class="page-kicker">Contact</p>
    <h1>Let’s Talk About Your Project</h1>
    <p class="lead">Tell us what you’re building, what you need to communicate, and where the animation will be used. We’ll help you find the right approach.</p>
  </div>
</header>
<section class="section" style="background:#fff">
  <div class="section-inner contact-grid">
    <div class="contact-card">
      <h2>Start a Project</h2>
      <p class="page-lead" style="margin-bottom:22px">We’ll review your project and get back to you with the next steps.</p>
      <form id="contactForm" class="contact-form" name="project-brief" method="POST" data-netlify="true" netlify-honeypot="bot-field">
        <input type="hidden" name="form-name" value="project-brief">
        <input type="hidden" name="subject" value="New project inquiry from thefunimation.co/contact/">
        <p hidden><label>Do not fill this out: <input name="bot-field"></label></p>
        <div class="form-row">
          <div class="form-group">
            <label for="contactName">Name <span class="req">*</span></label>
            <input id="contactName" name="name" type="text" autocomplete="name" required>
          </div>
          <div class="form-group">
            <label for="contactEmail">Work Email <span class="req">*</span></label>
            <input id="contactEmail" name="email" type="email" autocomplete="email" required>
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="contactCompany">Company</label>
            <input id="contactCompany" name="company" type="text" autocomplete="organization">
          </div>
          <div class="form-group">
            <label for="contactWebsite">Website</label>
            <input id="contactWebsite" name="website" type="url" autocomplete="url" placeholder="https://">
          </div>
        </div>
        <div class="form-row">
          <div class="form-group">
            <label for="contactType">Project Type</label>
            <select id="contactType" name="project-type">
              <option value="">Select one</option>
              <option>Explainer Video</option>
              <option>SaaS Product Animation</option>
              <option>Interactive Web Animation</option>
              <option>App Motion Design</option>
              <option>Motion Graphics</option>
              <option>Character Animation</option>
              <option>Other</option>
            </select>
          </div>
          <div class="form-group">
            <label for="contactTimeline">Timeline</label>
            <input id="contactTimeline" name="timeline" type="text" placeholder="e.g. Launching in Q4">
          </div>
        </div>
        <div class="form-group">
          <label for="contactBudget">Budget</label>
          <select id="contactBudget" name="budget">
            <option value="">Let’s discuss</option>
            <option>Still defining</option>
            <option>Prefer not to say</option>
          </select>
        </div>
        <div class="form-group">
          <label for="contactMessage">Tell us about your project <span class="req">*</span></label>
          <textarea id="contactMessage" name="message" required placeholder="Your project details, goals, requirements and useful links"></textarea>
        </div>
        <button class="form-submit" type="submit">Send Project Details</button>
        <p class="form-status" role="status" aria-live="polite" style="margin-top:16px;color:var(--purple);font-weight:600;"></p>
      </form>
    </div>
    <aside class="nap-card">
      <h3>Contact Funimation</h3>
      <div class="nap-list">
        <div>
          <span class="nap-label">Email</span>
          <a href="mailto:hello@thefunimation.co">hello@thefunimation.co</a>
        </div>
        <div>
          <span class="nap-label">Phone</span>
          <a href="tel:+18189664249">+1 818 966 4249</a>
        </div>
        <div>
          <span class="nap-label">Location</span>
          <span>16437 Knapp Street<br>North Hills, CA</span>
        </div>
        <div>
          <span class="nap-label">Social</span>
          <a href="https://www.linkedin.com/company/funanimation/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://www.fiverr.com/s/EgGWEVe" target="_blank" rel="noopener noreferrer">Fiverr</a>
        </div>
      </div>
    </aside>
  </div>
</section>
<section class="section">
  <div class="section-inner">
    <h2 class="section-title">A Simple Start</h2>
    <div class="next-steps">
      <div class="next-step"><strong>01 Share your project</strong><p>Tell us what you need and what you want to achieve.</p></div>
      <div class="next-step"><strong>02 We review your requirements</strong><p>We look at your goals, scope, timeline and project details.</p></div>
      <div class="next-step"><strong>03 We discuss the best way forward</strong><p>We recommend the right creative and production approach.</p></div>
    </div>
  </div>
</section>
<section class="section" style="background:#fff">
  <div class="section-inner">
    <h2 class="section-title">What Can We Help With?</h2>
    <div class="services-grid">
      <a class="service-card" href="/services/explainer-videos/"><h3>Explainer Videos</h3><p>Clear 2D stories for products, launches, and education.</p></a>
      <a class="service-card" href="/services/saas-product-animation/"><h3>SaaS Product Animation</h3><p>Feature launches, demos, and product walkthroughs.</p></a>
      <a class="service-card" href="/services/interactive-web-animation/"><h3>Interactive Web Animation</h3><p>Rive, Lottie, scroll, and website motion.</p></a>
    </div>
  </div>
</section>
${cta('Have an Idea? Let’s Make It Move.', 'Have a product, feature, campaign or story that needs animation? Let’s turn it into something clear, useful and memorable.', { href: '/work/', label: 'View Our Work' }, { href: '/services/', label: 'Explore Services' })}`
});

writePage('services', servicesHub);
writePage('services/explainer-videos', explainer);
writePage('services/saas-product-animation', saas);
writePage('services/interactive-web-animation', interactive);
writePage('work', workHub);
writePage('work/carakit-care-kit-explainer', carakit);
writePage('work/before-health-ai-healthcare-explainer', beforeHealth);
writePage('work/sela-cloud-explainer-video', sela);
writePage('work/bazaar-interactive-icon-animation', bazaar);
writePage('contact', contact);

const urls = [
  'https://thefunimation.co/',
  'https://thefunimation.co/services/',
  'https://thefunimation.co/services/explainer-videos/',
  'https://thefunimation.co/services/saas-product-animation/',
  'https://thefunimation.co/services/interactive-web-animation/',
  'https://thefunimation.co/work/',
  'https://thefunimation.co/work/carakit-care-kit-explainer/',
  'https://thefunimation.co/work/before-health-ai-healthcare-explainer/',
  'https://thefunimation.co/work/sela-cloud-explainer-video/',
  'https://thefunimation.co/work/bazaar-interactive-icon-animation/',
  'https://thefunimation.co/contact/'
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((loc, i) => `  <url>
    <loc>${loc}</loc>
    <lastmod>2026-09-04</lastmod>
    <changefreq>monthly</changefreq>
    <priority>${i === 0 ? '1.0' : loc.includes('/services/') || loc.includes('/work/') || loc.includes('/contact/') ? '0.8' : '0.7'}</priority>
  </url>`).join('\n')}
</urlset>
`;
fs.writeFileSync('/workspace/sitemap.xml', sitemap);
console.log('updated sitemap.xml');
