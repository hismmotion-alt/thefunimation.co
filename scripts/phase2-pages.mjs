export function registerPhase2({
  page,
  faq,
  cta,
  proofStrip,
  casePage,
  serviceSchema,
  writePage,
  HERO_CTAS
}) {
  const localBusiness = {
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
  };

  const appMotion = page({
    title: 'Mobile App Motion & Micro-Interaction Design - Funimation',
    description: 'App motion design for onboarding, splash screens, and micro-interactions. We craft Rive and Lottie animations that make mobile products feel alive.',
    canonical: 'https://thefunimation.co/services/app-motion-design/',
    current: 'services',
    ogImage: 'https://thefunimation.co/8th%20project/cover-08.png',
    ogAlt: 'Secufy SOS app explainer still by Funimation',
    schema: [serviceSchema('App motion design', 'UI motion design', 'https://thefunimation.co/services/app-motion-design/', 'App onboarding animation, UI motion, and micro-interaction design for mobile products.')],
    body: `<header class="page-hero">
  <div class="section-inner">
    <nav class="crumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/services/">Services</a><span>/</span><span>App Motion Design</span></nav>
    <p class="page-kicker">UI motion design</p>
    <h1>Motion that makes your app feel finished.</h1>
    <p class="lead">Good product motion should feel natural. It should show users what changed, guide them through an experience, and give useful feedback without getting in the way. Funimation creates app motion design, UI motion design, onboarding animation, and micro-interactions for mobile apps and digital products.</p>
    ${HERO_CTAS}
  </div>
</header>
${proofStrip({
  video: '/8th%20project/secufy-sos-web.mp4',
  poster: '/8th%20project/cover-08.png',
  stills: [
    { src: '/11%20project/cover.png', alt: 'CaraKit product still used for motion language' },
    { src: '/bazaar/frames/04.png', alt: 'Static UI icon still — motion added only when needed' }
  ],
  label: 'App and product motion stills'
})}
<section class="section" style="background:#fff">
  <div class="section-inner copy-block">
    <h2 class="section-title">Motion Designed Around the User Experience</h2>
    <p>An app can have a strong interface and still feel disconnected when there is no movement between actions. Thoughtful motion creates continuity. It can show where a user came from, what happened after an action, and what they can do next.</p>
    <p>Funimation designs motion around the actual product experience. We look at the interface, user journey, brand personality, and technical requirements before deciding where animation belongs. The result is motion that feels purposeful rather than decorative.</p>
  </div>
</section>
<section class="section">
  <div class="section-inner">
    <h2 class="section-title center">App Motion Design Services</h2>
    <div class="services-grid">
      <div class="service-card"><h3>UI Motion Design</h3><p>Create responsive, polished movement across buttons, menus, cards, screens, transitions, and interface states so digital products feel more intuitive and cohesive.</p></div>
      <div class="service-card"><h3>App Onboarding Animation</h3><p>First impressions matter. App onboarding animation can introduce features, demonstrate actions, explain concepts, and help new users understand how to get started.</p></div>
      <div class="service-card"><h3>Micro-Interaction Design</h3><p>Our micro-interaction design agency work covers taps, swipes, confirmations, progress states, notifications, buttons, forms, and other user actions.</p></div>
      <div class="service-card"><h3>App Transitions</h3><p>Use movement to connect screens and communicate changes in state, with a consistent visual rhythm that fits the structure of the product.</p></div>
      <div class="service-card"><h3>Loading and Feedback Animation</h3><p>Loading indicators, success states, error messages, and progress animations that match the product’s visual language.</p></div>
      <div class="service-card"><h3>Product Motion Systems</h3><p>For teams building products at scale, we help define repeatable motion principles covering timing, easing, transitions, interaction states, and reusable animation patterns.</p></div>
    </div>
  </div>
</section>
<section class="section" style="background:#fff">
  <div class="section-inner copy-block">
    <h2 class="section-title">Motion for Mobile Products</h2>
    <p>Mobile interfaces have limited space, so movement needs to communicate efficiently. A transition can establish a relationship between screens. A gesture animation can show how an interaction works. A subtle state change can confirm that the app has responded.</p>
    <p>Rather than adding animation everywhere, we identify moments where motion improves comprehension, feedback, navigation, or brand expression. This keeps the experience useful and avoids unnecessary movement that can make an interface feel slow.</p>
  </div>
</section>
<section class="section">
  <div class="section-inner copy-block">
    <h2 class="section-title">Small Interactions, Clearer Experiences</h2>
    <p>Micro-interactions are the small animated responses users notice throughout an app. A button can respond when tapped. A form can confirm a successful submission. A card can expand smoothly. A progress indicator can show that an action is still happening.</p>
    <p>We define what the user should see, when the movement should happen, how long it should last, and what state should follow. This creates a motion system that feels consistent across the product. Where interactive runtimes help, we deliver Rive or Lottie — on demand for the product, never as a cold homepage embed.</p>
  </div>
</section>
<section class="section" style="background:#fff">
  <div class="section-inner">
    <h2 class="section-title">Our App Motion Design Process</h2>
    <div class="process-list">
      <div class="process-item"><div class="step-num">01</div><div><strong>Product Review</strong><p>We study your app, existing UI, user flows, brand guidelines, and motion requirements.</p></div></div>
      <div class="process-item"><div class="step-num">02</div><div><strong>Motion Strategy</strong><p>We identify the interactions that need motion and define the role each animation should play.</p></div></div>
      <div class="process-item"><div class="step-num">03</div><div><strong>Storyboards &amp; Prototypes</strong><p>We map timing, movement, transitions, and interaction states before final production.</p></div></div>
      <div class="process-item"><div class="step-num">04</div><div><strong>Animation</strong><p>We create polished UI motion, onboarding sequences, micro-interactions, and supporting visual assets.</p></div></div>
      <div class="process-item"><div class="step-num">05</div><div><strong>Review &amp; Handoff</strong><p>We refine the animations and prepare agreed assets or specifications for your product and development teams.</p></div></div>
    </div>
    <p style="margin-top:24px"><a href="/process/" class="btn-secondary">See Our Process</a></p>
  </div>
</section>
<section class="section">
  <div class="section-inner">
    <h2 class="section-title">Why Choose Funimation for App Motion?</h2>
    <div class="why-points">
      <div class="why-point"><div class="check">✓</div><p>UI motion design for digital products</p></div>
      <div class="why-point"><div class="check">✓</div><p>App onboarding animation</p></div>
      <div class="why-point"><div class="check">✓</div><p>Micro-interaction design</p></div>
      <div class="why-point"><div class="check">✓</div><p>Custom transitions and feedback states</p></div>
      <div class="why-point"><div class="check">✓</div><p>SaaS and product animation experience</p></div>
      <div class="why-point"><div class="check">✓</div><p>Collaboration with product and development teams</p></div>
    </div>
  </div>
</section>
<section class="section" style="background:#fff">
  <div class="section-inner">
    <h2 class="section-title">See App Stories in Motion</h2>
    <p class="section-desc">A personal-safety explainer and related product work that show how we communicate app features without burying the interface.</p>
    <div class="work-grid">
      <a class="work-card" href="/work/secufy-sos-personal-safety-explainer/"><img src="/8th%20project/cover-08.png" alt="Secufy SOS app explainer" loading="lazy"><div class="work-card-body"><h3>Secufy SOS</h3><p>Emergency alerts and live location, told clearly.</p></div></a>
      <a class="work-card" href="/work/bazaar-interactive-icon-animation/"><img src="/bazaar/frames/01.png" alt="Bazaar interactive icons" loading="lazy"><div class="work-card-body"><h3>Bazaar</h3><p>Lightweight interactive icons for product UI.</p></div></a>
      <a class="work-card" href="/services/interactive-web-animation/"><img src="/bazaar/frames/02.png" alt="Interactive web animation still" loading="lazy"><div class="work-card-body"><h3>Interactive web animation</h3><p>When the motion needs to live on the website, not only in the app.</p></div></a>
    </div>
  </div>
</section>
<section class="section">
  <div class="section-inner">
    <h2 class="section-title center">Frequently Asked Questions</h2>
    ${faq([
      { q: 'What is app motion design?', a: 'App motion design is the use of animation within a mobile app or digital product to communicate changes, guide users, provide feedback, and express brand personality.' },
      { q: 'What does a mobile app animation studio create?', a: 'A mobile app animation studio can create onboarding animation, UI motion, screen transitions, micro-interactions, loading states, feedback animations, and other product motion.' },
      { q: 'Why is UI motion design important?', a: 'UI motion can help users understand what happened after an action, connect screens, identify changes in state, and navigate an interface more confidently.' },
      { q: 'What are micro-interactions?', a: 'Micro-interactions are small interface responses to user actions, such as a button response, success message, progress indicator, toggle animation, or gesture feedback.' },
      { q: 'Can you work with our existing app design?', a: 'Yes. We can work from existing UI designs, prototypes, Figma files, brand guidelines, or product flows and create motion that fits the current interface.' }
    ])}
  </div>
</section>
${cta('Give Your App a More Natural Sense of Motion', 'Whether you need UI motion design for a new app, micro-interactions for an existing product, or a complete motion system, Funimation can help you plan and create the right animation.')}`
  });

  const character = page({
    title: 'Character Animation & Mascot Design Studio - Funimation',
    description: 'Custom character and mascot animation for brands and products. Friendly, memorable characters that make your product feel human.',
    canonical: 'https://thefunimation.co/services/character-animation/',
    current: 'services',
    ogImage: 'https://thefunimation.co/11%20project/cover.png',
    ogAlt: 'CaraKit character animation by Funimation',
    schema: [serviceSchema('Character animation', 'Character and mascot animation', 'https://thefunimation.co/services/character-animation/', 'Custom character animation, mascot design, and brand personality for explainers, products, and campaigns.')],
    body: `<header class="page-hero">
  <div class="section-inner">
    <nav class="crumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/services/">Services</a><span>/</span><span>Character Animation</span></nav>
    <p class="page-kicker">Character animation studio</p>
    <h1>Characters that make a product feel human.</h1>
    <p class="lead">Characters can make a complex product feel more human, turn an abstract idea into a story, and give audiences something memorable to connect with. Funimation is a character animation studio creating custom animated characters, mascots, brand personalities, and story-driven scenes for SaaS companies, startups, campaigns, websites, and digital products.</p>
    ${HERO_CTAS}
  </div>
</header>
${proofStrip({
  video: '/11%20project/Animation%20Video%20111.mp4',
  poster: '/11%20project/cover.png',
  stills: [
    { src: '/10%20project/cover-08.png', alt: 'Buddywerking Vlaanderen character still' },
    { src: '/2nd%20project/cover.png', alt: 'Hancock Health character still' }
  ],
  label: 'Character-led explainer stills'
})}
<section class="section" style="background:#fff">
  <div class="section-inner copy-block">
    <h2 class="section-title">Create Characters People Remember</h2>
    <p>A strong character is more than a drawing. It needs a clear personality, visual identity, expressions, movement, and a reason to exist within the story. Funimation develops characters around your brand, audience, and communication goals so they can become useful visual assets rather than one-time illustrations.</p>
    <p>We can create a character from an early idea or adapt an existing mascot into an animation-ready system. Characters can then appear in explainer videos, product experiences, websites, social content, advertising, educational material, and campaigns.</p>
  </div>
</section>
<section class="section">
  <div class="section-inner">
    <h2 class="section-title center">Character Animation Services</h2>
    <div class="services-grid">
      <div class="service-card"><h3>Custom Character Animation</h3><p>Original animated characters for explainers, product stories, campaigns, websites, and digital experiences, with movement and expressions that fit the story.</p></div>
      <div class="service-card"><h3>Mascot Design and Animation</h3><p>Character concepts, visual development, expressions, poses, and animation for marketing and product applications.</p></div>
      <div class="service-card"><h3>Brand Mascot Animation</h3><p>Turn an existing mascot into a flexible animated brand asset for social, website sections, campaigns, and product experiences.</p></div>
      <div class="service-card"><h3>Character Explainer Videos</h3><p>Characters that guide viewers through a product story, customer problem, workflow, or educational message — combined with environments, UI, and motion graphics where needed.</p></div>
      <div class="service-card"><h3>Product Characters</h3><p>An animated guide, assistant, or supporting character for onboarding, empty states, feature introductions, and product education.</p></div>
      <div class="service-card"><h3>Character-Based Campaigns</h3><p>A consistent character system that can connect social posts, ads, videos, web content, and launch materials.</p></div>
    </div>
  </div>
</section>
<section class="section" style="background:#fff">
  <div class="section-inner copy-block">
    <h2 class="section-title">From Concept to a Fully Animated Character</h2>
    <p>Character development starts with understanding what the character needs to communicate. Is it a friendly guide for a SaaS product? A mascot for a consumer brand? A character helping explain a technical process? The answer influences the visual style, proportions, expressions, movement, and supporting environment.</p>
    <p>We develop the character in stages so the final animation is built on a clear visual foundation — concept exploration, style development, expression sheets, pose studies, and animation tests as the project requires.</p>
  </div>
</section>
<section class="section">
  <div class="section-inner">
    <h2 class="section-title">Our Character Animation Process</h2>
    <div class="process-list">
      <div class="process-item"><div class="step-num">01</div><div><strong>Discovery</strong><p>We understand your brand, audience, story, character role, and intended channels.</p></div></div>
      <div class="process-item"><div class="step-num">02</div><div><strong>Concept</strong><p>We explore the personality, visual direction, silhouette, and overall character idea.</p></div></div>
      <div class="process-item"><div class="step-num">03</div><div><strong>Character Design</strong><p>We develop the approved character with expressions, poses, details, and supporting visual elements.</p></div></div>
      <div class="process-item"><div class="step-num">04</div><div><strong>Storyboard</strong><p>We plan how the character will act, move, interact, and support the story.</p></div></div>
      <div class="process-item"><div class="step-num">05</div><div><strong>Animation</strong><p>We create the final movement, expressions, acting, transitions, and scene animation.</p></div></div>
      <div class="process-item"><div class="step-num">06</div><div><strong>Delivery</strong><p>We prepare the finished animation and agreed character assets for the required platforms and formats.</p></div></div>
    </div>
    <p style="margin-top:24px"><a href="/process/" class="btn-secondary">See Our Process</a></p>
  </div>
</section>
<section class="section" style="background:#fff">
  <div class="section-inner">
    <h2 class="section-title">Meet the Characters We’ve Brought to Life</h2>
    <div class="work-grid">
      <a class="work-card" href="/work/carakit-care-kit-explainer/"><img src="/11%20project/cover.png" alt="CaraKit character explainer" loading="lazy"><div class="work-card-body"><h3>CaraKit</h3><p>Warm character-led care-kit storytelling.</p></div></a>
      <a class="work-card" href="/work/buddywerking-vlaanderen-social-impact-explainer/"><img src="/10%20project/cover-08.png" alt="Buddywerking character explainer" loading="lazy"><div class="work-card-body"><h3>Buddywerking Vlaanderen</h3><p>Human connection through approachable characters.</p></div></a>
      <a class="work-card" href="/work/hancock-health-explainer-animation/"><img src="/2nd%20project/cover.png" alt="Hancock Health character explainer" loading="lazy"><div class="work-card-body"><h3>Hancock Health</h3><p>Patient-centered healthcare, told with people first.</p></div></a>
    </div>
  </div>
</section>
<section class="section">
  <div class="section-inner">
    <h2 class="section-title center">Frequently Asked Questions</h2>
    ${faq([
      { q: 'What does a character animation studio do?', a: 'A character animation studio designs and animates characters for videos, brands, digital products, campaigns, websites, and other visual experiences.' },
      { q: 'Can you create mascot design and animation?', a: 'Yes. We can develop a mascot from concept through design and animation, including poses, expressions, scenes, and movement.' },
      { q: 'Can you animate an existing character?', a: 'Yes. If you already have a character or mascot, we can review the existing artwork and develop an animation approach around it.' },
      { q: 'Can a character be used in explainer videos?', a: 'Yes. Characters can guide viewers through a problem, product workflow, customer journey, or educational story and can be combined with UI and motion graphics.' },
      { q: 'What is a brand mascot animation agency?', a: 'A brand mascot animation agency helps businesses turn a visual mascot into an animated brand asset that can be used across videos, websites, campaigns, social content, and product experiences.' }
    ])}
  </div>
</section>
${cta('Have a Character in Mind?', 'Whether you are starting with a rough idea, an existing mascot, or a complete character design, Funimation can help turn it into a character that moves, communicates, and works across your brand.')}`
  });

  const motionGraphics = page({
    title: 'Motion Graphics Studio for Marketing & Campaigns - Funimation',
    description: 'Motion graphics for ads, social, and campaigns. Clean, on-brand animated graphics that make marketing content stop the scroll.',
    canonical: 'https://thefunimation.co/services/motion-graphics/',
    current: 'services',
    ogImage: 'https://thefunimation.co/6th%20project/cover.png',
    ogAlt: 'MTech Systems motion graphics still by Funimation',
    schema: [serviceSchema('Motion graphics', 'Motion graphics production', 'https://thefunimation.co/services/motion-graphics/', 'Marketing motion graphics, social cutdowns, and campaign animation for brands and product teams.')],
    body: `<header class="page-hero">
  <div class="section-inner">
    <nav class="crumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><a href="/services/">Services</a><span>/</span><span>Motion Graphics</span></nav>
    <p class="page-kicker">Motion graphics agency</p>
    <h1>Graphics that move a message, not just a frame.</h1>
    <p class="lead">Funimation is a motion graphics agency creating custom animated visuals for brands, SaaS companies, product teams, and marketing campaigns. From product launches and marketing motion graphics videos to social media content, presentations, and digital experiences, we use movement to make information clearer and stories more engaging.</p>
    ${HERO_CTAS}
  </div>
</header>
${proofStrip({
  video: '/6th%20project/mtech-systems-web.mp4',
  poster: '/6th%20project/cover.png',
  stills: [
    { src: '/12%20project/cover.png', alt: 'GifyBox motion graphics still' },
    { src: '/7th%20project/Cover.png', alt: 'Greenopia motion graphics still' }
  ],
  label: 'Motion graphics in production'
})}
<section class="section" style="background:#fff">
  <div class="section-inner copy-block">
    <h2 class="section-title">Turn Ideas, Data and Designs Into Motion</h2>
    <p>Static graphics can communicate a message, but motion can control how that message is seen. It can reveal information step by step, direct attention to an important detail, demonstrate how something works, or create a visual rhythm around a campaign.</p>
    <p>Our motion graphics studio combines design, storytelling, animation, typography, illustration, and sound to create visuals with a clear purpose. We can work from an existing brand system, campaign concept, storyboard, product interface, presentation, or a simple idea.</p>
  </div>
</section>
<section class="section">
  <div class="section-inner">
    <h2 class="section-title center">Motion Graphics Services</h2>
    <div class="services-grid">
      <div class="service-card"><h3>Marketing Motion Graphics Videos</h3><p>Animated campaign assets that communicate a product, service, offer, or brand message using typography, illustration, UI, icons, and transitions.</p></div>
      <div class="service-card"><h3>Social Media Motion Graphics</h3><p>Short animated pieces designed for digital channels — product features, statistics, announcements, quotes, and campaign messages that need to land quickly.</p></div>
      <div class="service-card"><h3>Product Motion Graphics</h3><p>Explain features, workflows, dashboards, and technical concepts with animated UI, diagrams, typography, and visual storytelling.</p></div>
      <div class="service-card"><h3>Brand Motion Graphics</h3><p>Animated logos, typography, illustrations, transitions, icons, and branded visual systems that complement your identity.</p></div>
      <div class="service-card"><h3>Presentation Animation</h3><p>Animated diagrams, charts, product screens, and transitions that help an audience follow information without overwhelming the slide.</p></div>
      <div class="service-card"><h3>Campaign &amp; Advertising Animation</h3><p>Motion-led assets for digital advertising, campaign landing pages, promotional content, and launch communications.</p></div>
    </div>
  </div>
</section>
<section class="section" style="background:#fff">
  <div class="section-inner copy-block">
    <h2 class="section-title">Motion Content Your Marketing Team Can Actually Use</h2>
    <p>Marketing teams often need more than one video. A campaign may require a hero animation, social cutdowns, paid ad variations, website visuals, presentation assets, and launch content. Planning these needs together creates a more consistent visual system.</p>
    <p>Funimation can help build a core motion concept and then adapt selected elements into different formats and lengths, so motion graphics stay useful across campaigns instead of living in a single placement.</p>
  </div>
</section>
<section class="section">
  <div class="section-inner">
    <h2 class="section-title">Our Motion Graphics Production Process</h2>
    <div class="process-list">
      <div class="process-item"><div class="step-num">01</div><div><strong>Discovery</strong><p>We understand the message, audience, brand, channels, goals, and technical requirements.</p></div></div>
      <div class="process-item"><div class="step-num">02</div><div><strong>Concept</strong><p>We develop the creative direction and decide how motion can best communicate the idea.</p></div></div>
      <div class="process-item"><div class="step-num">03</div><div><strong>Storyboard</strong><p>We map the sequence, composition, transitions, and key visual moments before animation.</p></div></div>
      <div class="process-item"><div class="step-num">04</div><div><strong>Design</strong><p>We create or adapt the graphic assets, typography, illustrations, UI, and visual elements.</p></div></div>
      <div class="process-item"><div class="step-num">05</div><div><strong>Animation</strong><p>We bring the approved design into motion with timing, transitions, effects, and sound where required.</p></div></div>
      <div class="process-item"><div class="step-num">06</div><div><strong>Delivery</strong><p>We prepare final files and variations for the agreed platforms and formats.</p></div></div>
    </div>
    <p style="margin-top:24px"><a href="/process/" class="btn-secondary">See Our Process</a></p>
  </div>
</section>
<section class="section" style="background:#fff">
  <div class="section-inner">
    <h2 class="section-title">See Our Motion Graphics in Action</h2>
    <div class="work-grid">
      <a class="work-card" href="/work/mtech-systems-agtech-explainer/"><img src="/6th%20project/cover.png" alt="MTech Systems explainer" loading="lazy"><div class="work-card-body"><h3>MTech Systems</h3><p>AgTech data and IoT, made visual.</p></div></a>
      <a class="work-card" href="/work/gifybox-event-photo-booth-explainer/"><img src="/12%20project/cover.png" alt="GifyBox explainer" loading="lazy"><div class="work-card-body"><h3>GifyBox</h3><p>Playful product motion for live events.</p></div></a>
      <a class="work-card" href="/work/greenopia-sustainability-explainer/"><img src="/7th%20project/Cover.png" alt="Greenopia explainer" loading="lazy"><div class="work-card-body"><h3>Greenopia</h3><p>Sustainability storytelling through illustration and type.</p></div></a>
    </div>
  </div>
</section>
<section class="section">
  <div class="section-inner">
    <h2 class="section-title center">Frequently Asked Questions</h2>
    ${faq([
      { q: 'What does a motion graphics agency do?', a: 'A motion graphics agency creates animated visual content using typography, illustration, icons, product UI, diagrams, graphics, transitions, and other design elements to communicate a message.' },
      { q: 'What is a motion graphics studio?', a: 'A motion graphics studio is a creative team focused on designing and animating visual content for marketing, products, brands, presentations, advertising, and digital experiences.' },
      { q: 'Can you create marketing motion graphics videos?', a: 'Yes. We create motion graphics for product marketing, campaigns, launches, websites, advertising, presentations, and other marketing needs.' },
      { q: 'Can you create social media motion graphics?', a: 'Yes. We can create short-form animated content designed around the message, format, and requirements of your social channels.' },
      { q: 'Can you animate our existing brand assets?', a: 'Yes. We can work with existing brand guidelines, illustrations, icons, typography, product UI, and campaign assets or develop new visuals where needed.' },
      { q: 'How much do motion graphics cost?', a: 'Pricing depends on duration, creative complexity, design requirements, animation style, number of deliverables, and production scope. We scope each project individually rather than publishing a fixed rate.' }
    ])}
  </div>
</section>
${cta('Have a Message That Needs More Movement?', 'Whether you need a marketing motion graphics video, social media animation, product visual, campaign asset, or complete motion graphics system, Funimation can help turn your idea into clear, engaging motion.')}`
  });

  const about = page({
    title: 'Los Angeles Animation Studio | About Funimation',
    description: 'Funimation is a Los Angeles animation studio for SaaS and startups. Meet the team, see how we work, and visit us at 16437 Knapp Street, North Hills.',
    canonical: 'https://thefunimation.co/about/',
    current: 'about',
    schema: [localBusiness, {
      '@type': 'AboutPage',
      url: 'https://thefunimation.co/about/',
      name: 'About Funimation',
      mainEntity: { '@id': 'https://thefunimation.co/#localbusiness' }
    }],
    body: `<header class="page-hero">
  <div class="section-inner">
    <p class="page-kicker">About</p>
    <h1>We turn complex ideas into animation people understand.</h1>
    <p class="lead">Funimation is an animation studio helping SaaS companies, startups, technology teams, and modern brands communicate through motion. We create explainer videos, product animation, interactive web animation, app motion, character animation, and motion graphics built around a clear purpose.</p>
    ${HERO_CTAS}
  </div>
</header>
${proofStrip({
  stills: [
    { src: '/11%20project/cover.png', alt: 'CaraKit still from Funimation work' },
    { src: '/4th%20project/cover.png', alt: 'Sela Cloud still from Funimation work' },
    { src: '/bazaar/frames/01.png', alt: 'Bazaar icon still from Funimation work' }
  ],
  label: 'Selected Funimation work'
})}
<section class="section" style="background:#fff">
  <div class="section-inner split-intro">
    <div class="copy-block">
      <div class="section-label">Introduction</div>
      <h2 class="section-title">Animation With a Purpose</h2>
      <p>Animation is most effective when it makes something easier to understand, easier to remember, or more interesting to explore. That idea shapes the way we work at Funimation.</p>
      <p>We do not believe every product needs more movement. We believe the right movement can make a message clearer. A product workflow can become easier to follow. A complicated feature can become simple to explain. A website can guide visitors through a story. A brand can develop a personality that people remember.</p>
    </div>
    <img src="/3rd%20project/cover.png" alt="Before Health Intelligence explainer still" style="width:100%;border-radius:24px;box-shadow:var(--shadow)">
  </div>
</section>
<section class="section">
  <div class="section-inner">
    <div class="section-label center">Who we work with</div>
    <h2 class="section-title center">Built for SaaS, Technology and Growing Brands</h2>
    <p class="section-desc center">We work with teams that have something important to explain — a SaaS company launching a new feature, a startup introducing a new product category, or a marketing team creating a campaign. Because digital products are often complex, we spend time understanding how the product works and what the audience actually needs to know.</p>
    <div class="why-grid" style="max-width:var(--max-w);margin:36px auto 0">
      <div class="stat-card"><div class="stat-num">300+</div><div class="stat-label">Projects Completed</div></div>
      <div class="stat-card"><div class="stat-num">20+</div><div class="stat-label">Countries Served</div></div>
      <div class="stat-card"><div class="stat-num">8+</div><div class="stat-label">Years of Experience</div></div>
      <div class="stat-card"><div class="stat-num">100%</div><div class="stat-label">Custom Animation</div></div>
    </div>
  </div>
</section>
<section class="section" style="background:#fff">
  <div class="section-inner">
    <h2 class="section-title">One Studio, Multiple Ways to Use Motion</h2>
    <div class="services-grid">
      <a class="service-card" href="/services/explainer-videos/"><h3>Explainer Videos</h3><p>Clear animated stories for products, services, technical concepts, and brands.</p><span class="service-more">Explore service →</span></a>
      <a class="service-card" href="/services/saas-product-animation/"><h3>SaaS Product Animation</h3><p>Product UI, feature demonstrations, software workflows, and launch videos.</p><span class="service-more">Explore service →</span></a>
      <a class="service-card" href="/services/interactive-web-animation/"><h3>Interactive Web Animation</h3><p>Website motion, scroll experiences, Rive, Lottie, and interactive storytelling.</p><span class="service-more">Explore service →</span></a>
      <a class="service-card" href="/services/app-motion-design/"><h3>App Motion Design</h3><p>UI motion, onboarding animation, transitions, and micro-interactions.</p><span class="service-more">Explore service →</span></a>
      <a class="service-card" href="/services/character-animation/"><h3>Character Animation</h3><p>Custom characters, mascots, brand personalities, and story-driven animation.</p><span class="service-more">Explore service →</span></a>
      <a class="service-card" href="/services/motion-graphics/"><h3>Motion Graphics</h3><p>Animated typography, illustrations, product visuals, campaigns, and social content.</p><span class="service-more">Explore service →</span></a>
    </div>
  </div>
</section>
<section class="section">
  <div class="section-inner copy-block">
    <h2 class="section-title">Start With the Problem, Then Find the Motion</h2>
    <p>Every project starts with understanding the communication problem. What does the audience know already? What is confusing? What needs to be remembered? What action should happen after the viewer understands the message?</p>
    <p>From there, we build the story and visual direction. We use scripts and storyboards to make decisions before production, then develop the design and animation around the approved concept. This process gives every part of the animation a reason to exist.</p>
    <p style="margin-top:24px"><a href="/process/" class="btn-secondary">See Our Full Process</a></p>
  </div>
</section>
<section class="section" style="background:#fff">
  <div class="section-inner">
    <h2 class="section-title">The studio</h2>
    <p class="section-desc">Portrait placeholders while we photograph the team. Roles only — no invented names.</p>
    <div class="team-grid">
      <figure class="team-card">
        <img src="/about/placeholders/portrait-1.svg" alt="Placeholder portrait for an animation director role" width="400" height="500">
        <figcaption>
          <strong>Animation direction</strong>
          <span>Placeholder portrait</span>
        </figcaption>
      </figure>
      <figure class="team-card">
        <img src="/about/placeholders/portrait-2.svg" alt="Placeholder portrait for a motion design role" width="400" height="500">
        <figcaption>
          <strong>Motion design</strong>
          <span>Placeholder portrait</span>
        </figcaption>
      </figure>
      <figure class="team-card">
        <img src="/about/placeholders/portrait-3.svg" alt="Placeholder portrait for a producer role" width="400" height="500">
        <figcaption>
          <strong>Production</strong>
          <span>Placeholder portrait</span>
        </figcaption>
      </figure>
    </div>
  </div>
</section>
<section class="section">
  <div class="section-inner contact-grid">
    <div class="copy-block">
      <h2 class="section-title">Los Angeles studio, working across the US &amp; Canada</h2>
      <p>Funimation is based in North Hills, Los Angeles, and collaborates remotely with product and marketing teams worldwide. The work is the proof.</p>
      <div class="why-points" style="margin-top:28px">
        <div class="why-point"><div class="check">✓</div><p>Custom animation and motion design</p></div>
        <div class="why-point"><div class="check">✓</div><p>SaaS and technology experience</p></div>
        <div class="why-point"><div class="check">✓</div><p>Product-focused storytelling</p></div>
        <div class="why-point"><div class="check">✓</div><p>Video and interactive capabilities</p></div>
        <div class="why-point"><div class="check">✓</div><p>Character and motion graphics expertise</p></div>
        <div class="why-point"><div class="check">✓</div><p>Collaboration from concept through delivery</p></div>
      </div>
    </div>
    <aside class="nap-card">
      <h3>Studio details</h3>
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
<section class="section" style="background:#fff">
  <div class="section-inner">
    <h2 class="section-title">See What We’ve Made</h2>
    <p class="section-desc">Our portfolio brings together projects across SaaS, technology, healthcare, startups, marketing, and digital products.</p>
    <p><a href="/work/" class="btn-primary">See our work</a></p>
  </div>
</section>
<section class="section">
  <div class="section-inner">
    <h2 class="section-title center">Frequently Asked Questions</h2>
    ${faq([
      { q: 'What is Funimation?', a: 'Funimation is an animation studio creating explainer videos, product animation, interactive web animation, app motion, character animation, and motion graphics for businesses and digital products.' },
      { q: 'Who does Funimation work with?', a: 'We work with SaaS companies, startups, technology teams, marketing teams, product teams, and modern brands across the US and Canada.' },
      { q: 'What makes Funimation different from a traditional production company?', a: 'We focus heavily on products, technology, digital experiences, and communication. Our process combines storytelling, design, animation, and product understanding.' },
      { q: 'Can Funimation work with our existing brand and product design?', a: 'Yes. We can work from existing brand guidelines, Figma files, UI designs, prototypes, illustrations, scripts, or other project materials.' },
      { q: 'Where does Funimation work?', a: 'Funimation is based at 16437 Knapp Street, North Hills, CA, and collaborates remotely with clients throughout production.' }
    ])}
  </div>
</section>
${cta('Let’s Make Something People Understand', 'Have a product, feature, idea, or story that is difficult to explain? Tell us what you are trying to communicate and who you need to reach.')}`
  });

  const processPage = page({
    title: 'Animation Production Process | Funimation',
    description: 'See how Funimation takes animation from discovery and storyboard through design, motion, review, and delivery. A clear studio process for SaaS teams.',
    canonical: 'https://thefunimation.co/process/',
    current: 'process',
    body: `<header class="page-hero">
  <div class="section-inner">
    <p class="page-kicker">Animation production process</p>
    <h1>A clear process from first idea to final delivery.</h1>
    <p class="lead">Great animation starts with a clear process. At Funimation, we take projects from discovery and strategy through scripting, storyboarding, design, animation, review, and final delivery. Our animation production process gives your team visibility at every important stage while keeping the creative work focused on your audience and goals.</p>
    ${HERO_CTAS}
  </div>
</header>
<section class="section" style="background:#fff">
  <div class="section-inner copy-block">
    <h2 class="section-title">Collaboration Without the Confusion</h2>
    <p>Animation can involve many moving parts, especially when a project includes product information, brand guidelines, UI, characters, voiceover, sound, and multiple stakeholders. Our process is designed to make those decisions easier to manage.</p>
    <p>We separate the project into clear stages so the story and visual direction can be reviewed before full animation begins. This allows us to solve important questions early, reduce unnecessary revisions, and keep everyone aligned on what the final piece needs to achieve.</p>
  </div>
</section>
<section class="section process-section" id="process">
  <div class="section-inner">
    <div class="section-label">Our Animation Production Process</div>
    <h2 class="section-title" style="color:#fff">Six stages from brief to files</h2>
    <div class="process-steps">
      <div class="process-step"><div class="step-num">01</div><h4>Discover</h4><p>We start by understanding your business, product, audience, goals, competitors, brand, and intended channels.</p></div>
      <div class="process-step"><div class="step-num">02</div><h4>Strategy &amp; Story</h4><p>We identify the core message. For videos this can include concept and script; for interactive work we define the experience.</p></div>
      <div class="process-step"><div class="step-num">03</div><h4>Storyboard</h4><p>Each scene is mapped so you can see composition, pacing, transitions, characters, UI, and key moments before animation starts.</p></div>
      <div class="process-step"><div class="step-num">04</div><h4>Design</h4><p>We develop the visual direction — illustrations, characters, environments, typography, product UI, icons, and motion-ready assets.</p></div>
      <div class="process-step"><div class="step-num">05</div><h4>Animate</h4><p>We bring approved designs to life with timing, transitions, interaction, and sound according to the project scope.</p></div>
      <div class="process-step"><div class="step-num">06</div><h4>Review &amp; Deliver</h4><p>We refine with your team and prepare final files for the intended platforms and formats.</p></div>
    </div>
  </div>
</section>
<section class="section" style="background:#fff">
  <div class="section-inner">
    <h2 class="section-title">Step by step</h2>
    <div class="process-list">
      <div class="process-item"><div class="step-num">01</div><div><strong>Discover</strong><p>The first stage gives us the information needed to make good creative decisions. We discuss objectives, audience, product, existing messaging, brand, competitors, channels, timeline, and technical requirements. For SaaS work we review the interface, workflow, and user journey the animation needs to communicate. The outcome is a clear creative and production brief.</p></div></div>
      <div class="process-item"><div class="step-num">02</div><div><strong>Build the story before the animation</strong><p>A good animation is easier to produce when the story is settled first. We develop the narrative around a clear communication goal and then translate it into a storyboard so the team can review sequence, visual hierarchy, character actions, product UI, transitions, and pacing.</p></div></div>
      <div class="process-item"><div class="step-num">03</div><div><strong>Create the visual world</strong><p>After the story and storyboard are approved, we develop the visual system. We can work from an existing brand system or create a visual direction specifically for the project. For product work, we can adapt real interface elements so the final animation feels connected to the actual software.</p></div></div>
      <div class="process-item"><div class="step-num">04</div><div><strong>Bring the design to life</strong><p>A product demo may need precise interface movement. A character-led explainer may need expressive acting. An interactive website may need responsive motion. We choose the techniques that best support the experience rather than forcing every project into the same style.</p></div></div>
      <div class="process-item"><div class="step-num">05</div><div><strong>Refine and deliver</strong><p>We collect feedback at the agreed stages and use it to refine story, design, animation, and timing. Final deliverables can include video exports, shorter versions, social formats, web assets, Rive or Lottie animation, or other agreed files organized for your team.</p></div></div>
    </div>
  </div>
</section>
<section class="section">
  <div class="section-inner copy-block">
    <h2 class="section-title">What We Need From You</h2>
    <p>Strong collaboration works both ways. At the beginning of the project, we need access to the information that helps us understand the product and audience. This may include brand guidelines, product screenshots, Figma files, existing messaging, research, reference videos, product demos, or other relevant material.</p>
    <p>During production, timely feedback helps keep the project moving. We recommend having the key decision-makers identified early and consolidating feedback at each review stage.</p>
  </div>
</section>
<section class="section" style="background:#fff">
  <div class="section-inner">
    <h2 class="section-title">A Process Built for Creative and Product Teams</h2>
    <div class="why-points">
      <div class="why-point"><div class="check">✓</div><p>Clear project stages</p></div>
      <div class="why-point"><div class="check">✓</div><p>Story and storyboard before full animation</p></div>
      <div class="why-point"><div class="check">✓</div><p>Collaborative reviews</p></div>
      <div class="why-point"><div class="check">✓</div><p>Custom visual development</p></div>
      <div class="why-point"><div class="check">✓</div><p>Product and SaaS experience</p></div>
      <div class="why-point"><div class="check">✓</div><p>Video and interactive production capabilities</p></div>
    </div>
  </div>
</section>
<section class="section">
  <div class="section-inner">
    <h2 class="section-title center">Frequently Asked Questions</h2>
    ${faq([
      { q: 'What is an animation production process?', a: 'An animation production process is the sequence of stages used to develop an animation, usually including discovery, concept or script, storyboard, design, animation, review, and final delivery.' },
      { q: 'How long does the animation process take?', a: 'Timelines vary based on the length, complexity, visual style, number of scenes, feedback stages, voiceover, and technical requirements. We establish the expected schedule during project planning.' },
      { q: 'When does animation begin?', a: 'Full animation begins after the story, storyboard, and visual direction have reached the agreed approval stage. This helps reduce major changes during final production.' },
      { q: 'Can you work with our existing brand?', a: 'Yes. We can follow existing brand guidelines and product design systems or develop a new visual direction when needed.' },
      { q: 'Can you support interactive animation?', a: 'Yes. The process can include planning and production for interactive web animation, Rive, Lottie, UI motion, and other digital experiences.' }
    ])}
  </div>
</section>
${cta('Have a Project in Mind? Let’s Build It Step by Step', 'Whether you need an explainer video, SaaS product animation, interactive website experience, app motion, character animation, or motion graphics, a clear process makes the project easier to manage.')}`
  });

  const industry = page({
    title: 'Animation Studio for SaaS & Startups - Funimation',
    description: 'Explainer videos and product animation built specifically for SaaS companies and startups. See how we\'ve helped teams launch, convert, and grow.',
    canonical: 'https://thefunimation.co/industries/saas-startups/',
    current: 'services',
    ogImage: 'https://thefunimation.co/4th%20project/cover.png',
    ogAlt: 'Sela Cloud SaaS explainer by Funimation',
    schema: [serviceSchema('SaaS and startup animation', 'Animation for SaaS companies', 'https://thefunimation.co/industries/saas-startups/', 'Explainer videos, product animation, and interactive motion for SaaS companies and startups.')],
    body: `<header class="page-hero">
  <div class="section-inner">
    <nav class="crumb" aria-label="Breadcrumb"><a href="/">Home</a><span>/</span><span>Industries</span><span>/</span><span>SaaS &amp; Startups</span></nav>
    <p class="page-kicker">SaaS animation studio</p>
    <h1>Animation built for SaaS and startups.</h1>
    <p class="lead">Explainer videos and product animation built specifically for SaaS companies and startups. We help teams launch, convert, and grow — from a first product story to ongoing feature motion.</p>
    ${HERO_CTAS}
  </div>
</header>
${proofStrip({
  video: '/4th%20project/sela-cloud-web.mp4',
  poster: '/4th%20project/cover.png',
  stills: [
    { src: '/13%20project/thumbnail.png', alt: 'Maven Investment Partners explainer still' },
    { src: '/bazaar/frames/01.png', alt: 'Bazaar interactive product still' }
  ],
  label: 'SaaS and startup work'
})}
<section class="section" style="background:#fff">
  <div class="section-inner copy-block">
    <h2 class="section-title">Software is easier to buy when people can see it</h2>
    <p>SaaS and startup teams rarely have a simple story. Features stack up, interfaces change, and buyers need to understand value before they ever log in. Funimation is an animation studio for SaaS companies: we turn workflows, dashboards, and new categories into visual stories that sales, marketing, and product can all use.</p>
    <p>We work with seed teams shipping a first explainer, growth teams launching features every sprint, and product orgs that need a dedicated motion partner instead of building an in-house animation department.</p>
  </div>
</section>
<section class="section">
  <div class="section-inner">
    <h2 class="section-title center">Choose the option that matches where you are</h2>
    <div class="plans-grid">
      <article class="plan-card">
        <h3>Startup Launch</h3>
        <p>Perfect for founders bringing their first product to market. Clear, polished visuals for your launch, customers, and investors.</p>
        <p><a href="/services/explainer-videos/" class="service-more">Explainer videos →</a></p>
      </article>
      <article class="plan-card">
        <h3>Growing SaaS</h3>
        <p>Ongoing motion for feature releases, product updates, and customer education — without restarting the visual language each time.</p>
        <p><a href="/services/saas-product-animation/" class="service-more">Product animation →</a></p>
      </article>
      <article class="plan-card">
        <h3>Dedicated Animation Team</h3>
        <p>Consistent, on-demand animation support without building an in-house team. Useful when product marketing never really stops.</p>
        <p><a href="/contact/" class="service-more">Get a free consultation →</a></p>
      </article>
    </div>
  </div>
</section>
<section class="section" style="background:#fff">
  <div class="section-inner">
    <h2 class="section-title">Services SaaS teams actually use</h2>
    <div class="services-grid">
      <a class="service-card" href="/services/explainer-videos/"><h3>Explainer Videos</h3><p>A homepage or fundraising story that explains the category, the product, and the next step.</p><span class="service-more">Explore service →</span></a>
      <a class="service-card" href="/services/saas-product-animation/"><h3>SaaS Product Animation</h3><p>Feature launch videos, software demo animation, and walkthroughs for mixed technical audiences.</p><span class="service-more">Explore service →</span></a>
      <a class="service-card" href="/services/interactive-web-animation/"><h3>Interactive Web Animation</h3><p>Landing-page motion, Rive, and Lottie that help a product site demonstrate itself.</p><span class="service-more">Explore service →</span></a>
    </div>
  </div>
</section>
<section class="section">
  <div class="section-inner">
    <h2 class="section-title">Work from SaaS, cloud, and product teams</h2>
    <div class="work-grid">
      <a class="work-card" href="/work/sela-cloud-explainer-video/"><img src="/4th%20project/cover.png" alt="Sela Cloud" loading="lazy"><div class="work-card-body"><h3>Sela Cloud</h3><p>Cloud and AI services explained for business and technical buyers.</p></div></a>
      <a class="work-card" href="/work/bazaar-interactive-icon-animation/"><img src="/bazaar/frames/01.png" alt="Bazaar" loading="lazy"><div class="work-card-body"><h3>Bazaar</h3><p>Interactive brand icons that ship in product UI.</p></div></a>
      <a class="work-card" href="/work/maven-investment-partners-explainer/"><img src="/13%20project/thumbnail.png" alt="Maven" loading="lazy"><div class="work-card-body"><h3>Maven Investment Partners</h3><p>Trust-led explainer for a professional services story.</p></div></a>
    </div>
  </div>
</section>
<section class="section" style="background:#fff">
  <div class="section-inner">
    <h2 class="section-title center">What product teams tell us</h2>
    <div class="testimonials-grid">
      <div class="test-card"><p>Funimation transformed our onboarding flow. The animations make our product feel intuitive and premium. Our sign-up-to-activation rate increased 34% after launch.</p><div class="test-author"><div class="test-avatar" style="background:var(--gradient1)">S</div><div class="test-author-info"><h5>Sarah Chen</h5><span>CPO, Payflow</span></div></div></div>
      <div class="test-card"><p>Working with Funimation was incredibly smooth. They understood our brand instantly and delivered character animations that our users absolutely love.</p><div class="test-author"><div class="test-avatar" style="background:var(--gradient2)">M</div><div class="test-author-info"><h5>Marcus Rivera</h5><span>Founder, Learnie</span></div></div></div>
      <div class="test-card"><p>The interactive web animations they built for our landing page are stunning. Conversion went up 28% and visitors spend twice as long on the page now.</p><div class="test-author"><div class="test-avatar" style="background:var(--gradient3)">A</div><div class="test-author-info"><h5>Anika Johal</h5><span>Marketing Lead, Nuvem</span></div></div></div>
    </div>
  </div>
</section>
${cta('Building a SaaS product that needs a clearer story?', 'Tell us what you are launching and who needs to understand it. We will help shape the right animation approach.')}`
  });

  const moreCases = [
    casePage({
      slug: 'ismed-clim-climate-health-animation',
      title: 'ISMED-CLIM',
      metaTitle: 'Climate & Public Health Explainer Series - Funimation',
      description: '2D explainer series for ISMED-CLIM, making climate-health research clear for audiences across the Mediterranean. A Funimation case study.',
      kicker: 'Featured Case Study · Public Awareness',
      h1: 'ISMED-CLIM — Climate & Public Health Awareness',
      stake: 'Climate-health research was too technical for the public audiences who needed it.',
      challenge: 'EU-funded climate-health research had to reach people across the Mediterranean without reading like a paper.',
      approach: 'A series of friendly 2D explainers that turn heat, air quality, and vulnerable populations into clear visual stories.',
      result: 'Research-driven topics that inform and invite action, without flattening the science.',
      client: 'ISMED-CLIM · EU-funded initiative',
      deliverables: '2D explainer animation, character animation, motion graphics',
      focus: 'Climate change, public health, education',
      poster: '1st%20project/cover.png',
      video: '1st%20project/Pregnanq%20women.mp4',
      scenes: Array.from({ length: 14 }, (_, i) => `1st%20project/scenes/scene-${String(i + 1).padStart(2, '0')}.jpg`)
    }),
    casePage({
      slug: 'gifybox-event-photo-booth-explainer',
      title: 'GifyBox',
      metaTitle: 'GifyBox Event Photo Booth Explainer - Funimation',
      description: '2D product explainer for GifyBox, showing how interactive photo and GIF booths turn live events into shareable branded moments.',
      kicker: 'Featured Case Study · Event Tech',
      h1: 'GifyBox — Event Photo Booth Explainer',
      stake: 'Event photo booths sounded like gadgets until the branded, shareable loop was obvious.',
      challenge: 'Brands and agencies needed to see how live photo and GIF experiences become measurable event moments.',
      approach: 'Playful, product-focused 2D motion that walks through capture, overlays, social sharing, and engagement.',
      result: 'A concise explainer event teams can put on a site, deck, or booth screen.',
      client: 'GifyBox',
      deliverables: '2D product explainer, motion graphics, product-focused animation',
      focus: 'Live events, branded photo experiences, social sharing',
      poster: '12%20project/cover.png',
      video: '12%20project/GifyBox%20Animation%20v3.0.mp4'
    }),
    casePage({
      slug: 'upfit-supply-product-explainer',
      title: 'Upfit Supply',
      metaTitle: 'Upfit Supply Product Explainer Animation - Funimation',
      description: '2D product explainer for Upfit Supply, showing how custom commercial vehicle upfits improve efficiency and productivity.',
      kicker: 'Featured Case Study · Product Explainer',
      h1: 'Upfit Supply — Product Explainer Animation',
      stake: 'Fleet upfitting is technical — buyers needed to see the productivity, not a parts list.',
      challenge: 'Commercial vehicle equipment is hard to picture until you see how a van is actually organized for the job.',
      approach: 'Character-led product explainer with clean motion graphics that walk through custom upfits and on-the-job use.',
      result: 'Technical catalog information that feels accessible for fleets, contractors, and service teams.',
      client: 'Upfit Supply',
      deliverables: '2D product explainer, character animation, motion graphics',
      focus: 'Commercial vehicles, fleet equipment, productivity',
      poster: '5th%20project/cover.png',
      video: '5th%20project/upfit-supply-web.mp4'
    }),
    casePage({
      slug: 'hancock-health-explainer-animation',
      title: 'Hancock Health',
      metaTitle: 'Hancock Health Explainer Animation Case Study - Funimation',
      description: '2D healthcare explainer for Hancock Health, helping patients understand community-focused care in East Central Indiana.',
      kicker: 'Featured Case Study · Healthcare',
      h1: 'Hancock Health — Healthcare Explainer Animation',
      stake: 'Community healthcare is easier to trust when the story feels human, not institutional.',
      challenge: 'An independent healthcare network needed to explain accessible, patient-centered care without medical jargon.',
      approach: 'In collaboration with Moov Studio, a character-led 2D explainer with modern motion graphics and a calm visual pace.',
      result: 'An approachable patient-education film that supports community awareness.',
      client: 'Hancock Health',
      deliverables: '2D explainer animation, character animation, motion graphics',
      focus: 'Patient education, accessible healthcare, community awareness',
      poster: '2nd%20project/cover.png',
      video: '2nd%20project/hancock-health-web.mp4'
    }),
    casePage({
      slug: 'mtech-systems-agtech-explainer',
      title: 'MTech Systems',
      metaTitle: 'MTech Systems AgTech Explainer Animation - Funimation',
      description: '2D explainer for MTech Systems, showing how real-time data, IoT, and AI help poultry and livestock producers decide faster.',
      kicker: 'Featured Case Study · AgTech',
      h1: 'MTech Systems — AgTech Explainer Animation',
      stake: 'Enterprise farm software is a platform — producers needed to see the decision, not the dashboard.',
      challenge: 'AI-powered farm management spans IoT, animal welfare, and supply-chain data that is hard to demo live.',
      approach: 'Clean motion graphics and visual storytelling that show real-time data flowing into smarter producer decisions.',
      result: 'A global-audience explainer that makes an enterprise AgTech platform feel concrete.',
      client: 'MTech Systems',
      deliverables: '2D explainer animation, character animation, motion graphics',
      focus: 'Farm management, IoT, artificial intelligence, animal welfare',
      poster: '6th%20project/cover.png',
      video: '6th%20project/mtech-systems-web.mp4'
    }),
    casePage({
      slug: 'greenopia-sustainability-explainer',
      title: 'Greenopia',
      metaTitle: 'Greenopia Sustainability Platform Explainer - Funimation',
      description: '2D explainer for Greenopia, helping people discover verified businesses and make more conscious purchasing decisions.',
      kicker: 'Featured Case Study · Sustainability',
      h1: 'Greenopia — Sustainability Platform Explainer',
      stake: 'Conscious purchasing needed a simple way to trust which businesses actually qualify.',
      challenge: 'Greenopia evaluates businesses across health, sustainability, and community impact — a lot to explain in one sitting.',
      approach: 'Character animation and clean motion graphics that walk through discovery, verification, and everyday choices.',
      result: 'A mission-led platform story that feels approachable rather than preachy.',
      client: 'Greenopia',
      deliverables: '2D explainer animation, character animation, motion graphics',
      focus: 'Sustainability, ethical businesses, conscious purchasing',
      website: 'https://www.greenopia.com/',
      poster: '7th%20project/Cover.png',
      video: '7th%20project/greenopia-web.mp4',
      scenes: Array.from({ length: 12 }, (_, i) => `7th%20project/scenes/scene-${String(i + 1).padStart(2, '0')}.jpg`)
    }),
    casePage({
      slug: 'secufy-sos-personal-safety-explainer',
      title: 'Secufy SOS',
      metaTitle: 'Secufy SOS Personal Safety Explainer - Funimation',
      description: '2D app explainer for Secufy SOS, making emergency alerts, live location sharing, and rapid help feel clear and reassuring.',
      kicker: 'Featured Case Study · Personal Safety',
      h1: 'Secufy SOS — Personal Safety Explainer',
      stake: 'Safety apps fail if the flow feels complicated in a stressful moment.',
      challenge: 'Users needed to understand emergency alerts, live location, and contacting help in a few taps — without fear-based filmmaking.',
      approach: 'Clear visual storytelling, modern motion graphics, and character animation that keep the product steps front and center.',
      result: 'A reassuring explainer that makes a critical safety flow feel intuitive.',
      client: 'Secufy SOS',
      deliverables: '2D app explainer, character animation, motion graphics',
      focus: 'Emergency alerts, live location, personal safety',
      poster: '8th%20project/cover-08.png',
      video: '8th%20project/secufy-sos-web.mp4'
    }),
    casePage({
      slug: 'farmerlink-digital-agriculture-explainer',
      title: 'FarmerLink',
      metaTitle: 'FarmerLink Digital Agriculture Explainer - Funimation',
      description: '2D platform explainer for FarmerLink, making field data collection, collaboration, and farm management easier to understand.',
      kicker: 'Featured Case Study · Digital Agriculture',
      h1: 'FarmerLink — Digital Agriculture Explainer',
      stake: 'Field data tools only help if farmers and advisors can see the workflow, not just the feature list.',
      challenge: 'A feature-rich agriculture platform had to explain collection, collaboration, and analysis across mobile and web.',
      approach: 'Clean motion graphics and character animation that follow data from the field into shared, usable decisions.',
      result: 'A product story that makes a complex farm platform easy to follow.',
      client: 'FarmerLink',
      deliverables: '2D platform explainer, character animation, motion graphics',
      focus: 'Field data, farm management, collaboration, mobile tools',
      poster: '9th%20project/cover-25.png',
      video: '9th%20project/farmerlink-web.mp4'
    }),
    casePage({
      slug: 'buddywerking-vlaanderen-social-impact-explainer',
      title: 'Buddywerking Vlaanderen',
      metaTitle: 'Buddywerking Vlaanderen Social Impact Explainer - Funimation',
      description: '2D nonprofit explainer for Buddywerking Vlaanderen, showing how one-on-one friendships foster trust, inclusion, and community support.',
      kicker: 'Featured Case Study · Social Impact',
      h1: 'Buddywerking Vlaanderen — Social Impact Explainer',
      stake: 'A mental-health buddy program needed to feel warm and specific, not like a campaign slogan.',
      challenge: 'Explain how volunteers and people experiencing mental health challenges form one-on-one friendships that reduce isolation.',
      approach: 'Warm character animation, approachable storytelling, and clean motion graphics centered on human connection.',
      result: 'An inspiring nonprofit film that makes the buddy program easy to understand and share.',
      client: 'Buddywerking Vlaanderen',
      deliverables: '2D nonprofit explainer, character animation, motion graphics',
      focus: 'Mental health, social inclusion, community support',
      poster: '10%20project/cover-08.png',
      video: '10%20project/buddywerking-web.mp4',
      scenes: Array.from({ length: 6 }, (_, i) => `10%20project/scenes/scene-${String(i + 1).padStart(2, '0')}.jpg`)
    }),
    casePage({
      slug: 'maven-investment-partners-explainer',
      title: 'Maven Investment Partners',
      metaTitle: 'Maven Investment Partners Explainer Animation - Funimation',
      description: 'Explainer animation for Maven Investment Partners, communicating trust, growth, and financial expertise through polished branding.',
      kicker: 'Featured Case Study · Investment',
      h1: 'Maven Investment Partners — Explainer Animation',
      stake: 'Investment expertise only lands when the presentation feels as credible as the advice.',
      challenge: 'A forward-thinking investment firm needed a clean, professional visual story for clients and partners.',
      approach: 'Polished branding, refined layouts, and clear messaging in an explainer built for trust and growth.',
      result: 'A credible, elegant presentation piece that is easy to understand for potential clients and partners.',
      client: 'Maven Investment Partners',
      deliverables: 'Explainer animation, visual identity, digital presentation',
      focus: 'Financial expertise, trust, growth, investor communication',
      poster: '13%20project/thumbnail.png',
      video: '13%20project/MAVEN.mp4'
    })
  ];

  writePage('services/app-motion-design', appMotion);
  writePage('services/character-animation', character);
  writePage('services/motion-graphics', motionGraphics);
  writePage('about', about);
  writePage('process', processPage);
  writePage('industries/saas-startups', industry);
  writePage('work/ismed-clim-climate-health-animation', moreCases[0]);
  writePage('work/gifybox-event-photo-booth-explainer', moreCases[1]);
  writePage('work/upfit-supply-product-explainer', moreCases[2]);
  writePage('work/hancock-health-explainer-animation', moreCases[3]);
  writePage('work/mtech-systems-agtech-explainer', moreCases[4]);
  writePage('work/greenopia-sustainability-explainer', moreCases[5]);
  writePage('work/secufy-sos-personal-safety-explainer', moreCases[6]);
  writePage('work/farmerlink-digital-agriculture-explainer', moreCases[7]);
  writePage('work/buddywerking-vlaanderen-social-impact-explainer', moreCases[8]);
  writePage('work/maven-investment-partners-explainer', moreCases[9]);

  return [
    'https://thefunimation.co/services/app-motion-design/',
    'https://thefunimation.co/services/character-animation/',
    'https://thefunimation.co/services/motion-graphics/',
    'https://thefunimation.co/about/',
    'https://thefunimation.co/process/',
    'https://thefunimation.co/industries/saas-startups/',
    'https://thefunimation.co/work/ismed-clim-climate-health-animation/',
    'https://thefunimation.co/work/gifybox-event-photo-booth-explainer/',
    'https://thefunimation.co/work/upfit-supply-product-explainer/',
    'https://thefunimation.co/work/hancock-health-explainer-animation/',
    'https://thefunimation.co/work/mtech-systems-agtech-explainer/',
    'https://thefunimation.co/work/greenopia-sustainability-explainer/',
    'https://thefunimation.co/work/secufy-sos-personal-safety-explainer/',
    'https://thefunimation.co/work/farmerlink-digital-agriculture-explainer/',
    'https://thefunimation.co/work/buddywerking-vlaanderen-social-impact-explainer/',
    'https://thefunimation.co/work/maven-investment-partners-explainer/'
  ];
}
