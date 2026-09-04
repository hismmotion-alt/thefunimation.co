  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const motionLite = document.body.hasAttribute('data-motion-lite');
  const MAX_LIVE_RIVE = 2;
  let lenis;

  const PROJECT_PAGE_URLS = {
    'ismed-clim': '/work/ismed-clim-climate-health-animation/',
    'hancock-health': '/work/hancock-health-explainer-animation/',
    'before-health': '/work/before-health-ai-healthcare-explainer/',
    'sela-cloud': '/work/sela-cloud-explainer-video/',
    'upfit-supply': '/work/upfit-supply-product-explainer/',
    'mtech-systems': '/work/mtech-systems-agtech-explainer/',
    'greenopia': '/work/greenopia-sustainability-explainer/',
    'secufy-sos': '/work/secufy-sos-personal-safety-explainer/',
    'farmerlink': '/work/farmerlink-digital-agriculture-explainer/',
    'buddywerking': '/work/buddywerking-vlaanderen-social-impact-explainer/',
    'carakit': '/work/carakit-care-kit-explainer/',
    'gifybox': '/work/gifybox-event-photo-booth-explainer/',
    'maven': '/work/maven-investment-partners-explainer/',
    'bazaar': '/work/bazaar-interactive-icon-animation/'
  };

  const PROJECT_MODAL_IDS = {
    'ismed-clim': 'projectModal',
    'hancock-health': 'hancockProjectModal',
    'before-health': 'beforeHealthProjectModal',
    'sela-cloud': 'selaCloudProjectModal',
    'upfit-supply': 'upfitSupplyProjectModal',
    'mtech-systems': 'mtechProjectModal',
    'greenopia': 'greenopiaProjectModal',
    'secufy-sos': 'secufyProjectModal',
    'farmerlink': 'farmerLinkProjectModal',
    'buddywerking': 'buddywerkingProjectModal',
    'carakit': 'carakitProjectModal',
    'gifybox': 'gifyboxProjectModal',
    'maven': 'mavenProjectModal',
    'bazaar': 'bazaarProjectModal'
  };

  function loadVideoSources(video) {
    let changed = false;
    video.querySelectorAll('source[data-src]').forEach(source => {
      if (!source.getAttribute('src')) {
        source.src = source.dataset.src;
        changed = true;
      }
    });
    if (changed) video.load();
  }

  function riveCard(iframe) {
    return iframe.closest('.rive-embed-card, .work-card-rive') || iframe.parentElement;
  }

  function riveHost(iframe) {
    return iframe.closest('.rive-embed-card, .work-card-rive') || iframe;
  }

  function setRiveLive(iframe, live) {
    const card = riveCard(iframe);
    if (!card) return;
    card.classList.toggle('is-rive-live', live);
    const poster = card.querySelector('.rive-poster');
    const posterSrc = poster && (poster.currentSrc || poster.getAttribute('src'));
    if (live && posterSrc) {
      card.style.setProperty('--rive-poster', 'url("' + posterSrc + '")');
    } else {
      card.style.removeProperty('--rive-poster');
    }
  }

  function markRiveFallback(iframe) {
    const card = riveCard(iframe);
    if (card) {
      card.classList.add('rive-static');
      card.classList.remove('is-rive-live');
      card.style.removeProperty('--rive-poster');
    }
    iframe.setAttribute('hidden', '');
    iframe.removeAttribute('src');
  }

  function hideRiveEnable(enable) {
    if (!enable) return;
    enable.hidden = true;
    enable.setAttribute('aria-hidden', 'true');
    enable.tabIndex = -1;
  }

  const intersectingRive = new Set();

  function isLiveRiveSrc(src) {
    return Boolean(src) && src !== 'about:blank';
  }

  function isFailedRive(iframe) {
    return iframe.dataset.riveFailed === 'true';
  }

  function liveRiveFrames() {
    return Array.from(document.querySelectorAll('iframe[data-src]')).filter(frame => isLiveRiveSrc(frame.getAttribute('src')));
  }

  function riveDistance(iframe) {
    const rect = riveHost(iframe).getBoundingClientRect();
    return Math.abs(rect.top + rect.height / 2 - window.innerHeight / 2);
  }

  function riveRank(a, b) {
    const dist = riveDistance(a) - riveDistance(b);
    if (dist !== 0) return dist;
    const aLoading = isLiveRiveSrc(a.getAttribute('src')) ? 0 : 1;
    const bLoading = isLiveRiveSrc(b.getAttribute('src')) ? 0 : 1;
    if (aLoading !== bLoading) return aLoading - bLoading;
    const pos = a.compareDocumentPosition(b);
    if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
    if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
    return 0;
  }

  function mountRiveFrame(iframe) {
    if (reduceMotion || !iframe.dataset.src || isFailedRive(iframe) || isLiveRiveSrc(iframe.getAttribute('src'))) return;
    iframe.removeAttribute('hidden');
    iframe.src = iframe.dataset.src;
  }

  function unmountRiveFrame(iframe) {
    if (!iframe.dataset.src) return;
    iframe.removeAttribute('src');
    setRiveLive(iframe, false);
  }

  function forgetRiveFrames(container) {
    if (!container) return;
    container.querySelectorAll('iframe[data-src]').forEach(frame => intersectingRive.delete(frame));
  }

  function reconcileLiveRive() {
    if (reduceMotion) return;
    const ranked = Array.from(intersectingRive).filter(frame => !isFailedRive(frame)).sort(riveRank);
    const keep = new Set(ranked.slice(0, MAX_LIVE_RIVE));
    liveRiveFrames().forEach(frame => {
      if (!keep.has(frame)) unmountRiveFrame(frame);
    });
    keep.forEach(mountRiveFrame);
  }

  function riveNearViewport(node) {
    const rect = node.getBoundingClientRect();
    return rect.bottom > -200 && rect.top < window.innerHeight + 200 && (rect.width > 0 || rect.height > 0);
  }

  function riveFramesToObserve(container) {
    return Array.from(container.querySelectorAll('iframe[data-src]')).filter(iframe => !iframe.closest('[data-rive-on-demand]'));
  }

  function iframeFromObserveTarget(target) {
    return target.matches('iframe') ? target : target.querySelector('iframe[data-src]');
  }

  function hydrateLazyMedia(container, options) {
    if (!container) return;
    const settings = Object.assign({ eagerVideo: false, rive: 'observe' }, options || {});
    container.querySelectorAll('img[data-src]').forEach(img => {
      if (!img.getAttribute('src')) img.src = img.dataset.src;
    });

    const scrollRoot = container.classList && container.classList.contains('modal-overlay')
      ? container
      : null;

    const videoIo = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        loadVideoSources(entry.target);
        observer.unobserve(entry.target);
      });
    }, { root: scrollRoot, rootMargin: '120px 0px', threshold: 0.01 });

    container.querySelectorAll('video').forEach(video => {
      if (settings.eagerVideo) loadVideoSources(video);
      else videoIo.observe(video);
    });

    if (container._lazyVideoIo) container._lazyVideoIo.disconnect();
    container._lazyVideoIo = videoIo;

    if (container._lazyIo) {
      forgetRiveFrames(container);
      container._lazyIo.disconnect();
      container._lazyIo = null;
    }

    if (reduceMotion || settings.rive === 'off') {
      container.querySelectorAll('iframe[data-src]').forEach(markRiveFallback);
      reconcileLiveRive();
      return;
    }

    if (settings.rive === 'wait') {
      container.querySelectorAll('iframe[data-src]').forEach(unmountRiveFrame);
      reconcileLiveRive();
      return;
    }

    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        const iframe = iframeFromObserveTarget(entry.target);
        if (!iframe) return;
        if (entry.isIntersecting) intersectingRive.add(iframe);
        else intersectingRive.delete(iframe);
      });
      reconcileLiveRive();
    }, { root: scrollRoot, rootMargin: '200px 0px', threshold: 0.01 });

    riveFramesToObserve(container).forEach(iframe => {
      const host = riveHost(iframe);
      io.observe(host);
      if (riveNearViewport(host)) intersectingRive.add(iframe);
    });
    container._lazyIo = io;
    reconcileLiveRive();
  }

  function bindRiveOnDemand(root) {
    (root || document).querySelectorAll('[data-rive-on-demand]').forEach(gallery => {
      if (gallery.dataset.riveBound === 'true') return;
      gallery.dataset.riveBound = 'true';
      const enable = gallery.querySelector('[data-enable-rive]');
      if (reduceMotion) {
        hydrateLazyMedia(gallery, { rive: 'off' });
        gallery.classList.add('is-rive-enabled');
        hideRiveEnable(enable);
        return;
      }
      hydrateLazyMedia(gallery, { rive: 'wait' });
      const start = () => {
        gallery.classList.add('is-rive-enabled');
        gallery.removeAttribute('data-rive-on-demand');
        hideRiveEnable(enable);
        hydrateLazyMedia(gallery, { rive: 'observe' });
      };
      if (enable) enable.addEventListener('click', start, { once: true });
    });
  }

  document.addEventListener('load', event => {
    const iframe = event.target;
    if (!iframe || iframe.tagName !== 'IFRAME' || !iframe.dataset.src) return;
    if (!isLiveRiveSrc(iframe.getAttribute('src'))) return;
    setRiveLive(iframe, true);
  }, true);

  document.addEventListener('error', event => {
    const iframe = event.target;
    if (!iframe || iframe.tagName !== 'IFRAME' || !iframe.dataset.src) return;
    iframe.dataset.riveFailed = 'true';
    setRiveLive(iframe, false);
    markRiveFallback(iframe);
    reconcileLiveRive();
  }, true);

  function unloadLazyMedia(container) {
    if (!container) return;
    if (container._lazyIo) {
      forgetRiveFrames(container);
      container._lazyIo.disconnect();
      container._lazyIo = null;
    }
    if (container._lazyVideoIo) {
      container._lazyVideoIo.disconnect();
      container._lazyVideoIo = null;
    }
    container.querySelectorAll('iframe[data-src]').forEach(iframe => {
      intersectingRive.delete(iframe);
      unmountRiveFrame(iframe);
    });
    reconcileLiveRive();
    container.querySelectorAll('video').forEach(video => {
      video.pause();
      video.querySelectorAll('source[data-src]').forEach(source => {
        source.removeAttribute('src');
      });
      video.load();
    });
  }

  function initHeroReel() {
    const video = document.getElementById('heroReel');
    if (!video) return;
    if (reduceMotion) {
      video.removeAttribute('autoplay');
      video.pause();
      video.querySelectorAll('source').forEach(source => {
        source.removeAttribute('src');
      });
      video.removeAttribute('src');
      video.load();
      return;
    }
    const syncPlayback = entry => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    };
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => entries.forEach(syncPlayback), { threshold: 0.2 });
      io.observe(video);
    }
  }

  function revealFallback() {
    document.querySelectorAll('.hero h1, .hero p, .hero-btns > *, .lottie-frame').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    const selectors = ['.reveal', '.reveal-stagger', '.reveal-left', '.reveal-right', '.reveal-scale', '.reveal-rotate', '.why-point'];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    selectors.forEach(selector => document.querySelectorAll(selector).forEach(el => observer.observe(el)));
  }

  function initMotion() {
    if (!window.gsap || !window.ScrollTrigger || !window.Lenis || reduceMotion || motionLite) {
      revealFallback();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    lenis = new Lenis({
      lerp: 0.085,
      smoothWheel: true,
      anchors: { offset: -72 },
      prevent: node => node.closest && Boolean(node.closest('[data-lenis-prevent]'))
    });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(time => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    gsap.set('.reveal, .reveal-scale, .why-point', { opacity: 1, y: 0, scale: 1 });
    gsap.set('.reveal-stagger > *', { opacity: 1, y: 0 });

    gsap.set('.hero h1, .hero p, .hero-btns > *, .lottie-frame', {
      opacity: 1,
      clearProps: 'transform'
    });

    const heroStage = document.querySelector('.hero-stage');
    const motionCard = heroStage ? heroStage.querySelector('.lottie-frame') : null;
    if (heroStage && motionCard && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
      const tiltY = gsap.quickTo(motionCard, 'rotationY', { duration: .65, ease: 'power3.out' });
      const tiltX = gsap.quickTo(motionCard, 'rotationX', { duration: .65, ease: 'power3.out' });
      const tiltMoveX = gsap.quickTo(motionCard, 'x', { duration: .65, ease: 'power3.out' });
      const tiltMoveY = gsap.quickTo(motionCard, 'y', { duration: .65, ease: 'power3.out' });
      gsap.set(motionCard, { transformPerspective: 900 });
      heroStage.addEventListener('pointermove', event => {
        const rect = heroStage.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - .5;
        const py = (event.clientY - rect.top) / rect.height - .5;
        tiltY(px * 10);
        tiltX(py * -9);
        tiltMoveX(px * 12);
        tiltMoveY(py * 10);
      });
      heroStage.addEventListener('pointerleave', () => {
        gsap.to(motionCard, { rotationY: 0, rotationX: 0, x: 0, y: 0, duration: .9, ease: 'elastic.out(1, .45)' });
      });
    }

    if (document.querySelector('.hero') && window.matchMedia('(min-width: 901px)').matches) {
      gsap.to('.hero-content', {
        yPercent: 22, opacity: .25, scale: .94, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1 }
      });
    }

    document.querySelectorAll('.section').forEach(section => {
      const headingParts = section.querySelectorAll('.section-label, .section-title, .section-desc');
      if (headingParts.length) {
        gsap.from(headingParts, {
          y: 44, opacity: 0, stagger: .1, duration: .85, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 78%', once: true }
        });
      }
    });

    [
      ['.services-grid', '.service-card'],
      ['.why-grid', '.stat-card'],
      ['.why-points', '.why-point'],
      ['.testimonials-grid', '.test-card']
    ].forEach(([trigger, targets]) => {
      if (!document.querySelector(trigger)) return;
      gsap.from(targets, {
        y: 58, opacity: 0, scale: .96, stagger: .1, duration: .8, ease: 'power3.out',
        scrollTrigger: { trigger, start: 'top 82%', once: true }
      });
    });

    if (!document.querySelector('[data-work-filters]')) document.querySelectorAll('.work-card:not(.extra-project)').forEach((card, index) => {
      gsap.from(card, {
        x: index % 2 ? 70 : -70, y: 30, opacity: 0, rotation: index % 2 ? 1.5 : -1.5,
        duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: card, start: 'top 84%', once: true }
      });
      const cardImg = card.querySelector('img');
      if (cardImg) {
        gsap.fromTo(cardImg, { scale: 1.12, yPercent: -4 }, {
          scale: 1.02, yPercent: 4, ease: 'none',
          scrollTrigger: { trigger: card, start: 'top bottom', end: 'bottom top', scrub: 1 }
        });
      }
    });

    if (document.querySelector('.process-step')) {
      gsap.from('.process-step', {
        y: 70, opacity: 0, rotationX: -12, transformOrigin: 'center bottom',
        stagger: .12, duration: .9, ease: 'power3.out',
        scrollTrigger: { trigger: '.process-steps', start: 'top 80%', once: true }
      });
    }
    if (document.querySelector('.process-section') && document.querySelector('.process-steps')) {
      gsap.to('.process-steps', {
        xPercent: -2.5, ease: 'none',
        scrollTrigger: { trigger: '.process-section', start: 'top bottom', end: 'bottom top', scrub: 1.5 }
      });
    }

    if (document.querySelector('.faq-item')) {
      gsap.from('.faq-item', {
        x: -38, opacity: 0, stagger: .08, duration: .7, ease: 'power3.out',
        scrollTrigger: { trigger: '.faq-list', start: 'top 82%', once: true }
      });
    }
    if (document.querySelector('.final-cta')) {
      gsap.from('.final-cta h2, .final-cta p, .final-cta .btn-primary', {
        y: 55, opacity: 0, stagger: .14, duration: .9, ease: 'power3.out',
        scrollTrigger: { trigger: '.final-cta', start: 'top 74%', once: true }
      });
    }

    if (document.querySelector('.scroll-progress')) {
      gsap.to('.scroll-progress', {
        scaleX: 1, ease: 'none',
        scrollTrigger: { start: 0, end: 'max', scrub: .25 }
      });
    }

    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  }

  function whenIdle(fn, timeout) {
    if ('requestIdleCallback' in window) requestIdleCallback(fn, { timeout: timeout || 1400 });
    else window.setTimeout(fn, 220);
  }

  function initDecorativeMotion() {
    if (!window.gsap || reduceMotion || motionLite) return;
    document.querySelectorAll('.btn-primary, .btn-secondary').forEach(button => {
      if (button.closest('.hero-btns')) return;
      button.addEventListener('pointermove', event => {
        const rect = button.getBoundingClientRect();
        gsap.to(button, {
          x: (event.clientX - rect.left - rect.width / 2) * .16,
          y: (event.clientY - rect.top - rect.height / 2) * .2,
          duration: .35, ease: 'power2.out'
        });
      });
      button.addEventListener('pointerleave', () => {
        gsap.to(button, { x: 0, y: 0, duration: .6, ease: 'elastic.out(1, .35)' });
      });
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMotion, { once: true });
  } else {
    initMotion();
  }
  initHeroReel();
  whenIdle(initDecorativeMotion, 1600);

  document.addEventListener('visibilitychange', () => {
    const video = document.getElementById('heroReel');
    if (document.hidden) {
      if (window.gsap) gsap.ticker.sleep();
      if (video) video.pause();
      return;
    }
    if (window.gsap) gsap.ticker.wake();
    if (video && !reduceMotion) {
      const rect = video.getBoundingClientRect();
      if (rect.bottom > 0 && rect.top < window.innerHeight) {
        video.play().catch(() => {});
      }
    }
  });

  const navEl = document.querySelector('nav');
  if (navEl) {
    window.addEventListener('scroll', () => {
      navEl.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  const countObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting && !e.target.dataset.counted) {
        e.target.dataset.counted = '1';
        const text = e.target.textContent;
        const num = parseInt(text);
        const suffix = text.replace(/[0-9]/g, '');
        const duration = 1800;
        const start = performance.now();
        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          e.target.textContent = Math.round(num * eased) + suffix;
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
      }
    });
  }, { threshold: 0.5 });
  document.querySelectorAll('.stat-num').forEach(el => countObs.observe(el));

  whenIdle(() => {
    if (reduceMotion || motionLite || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    document.querySelectorAll('.service-card, .test-card').forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        card.style.transform = 'perspective(600px) rotateX(' + (y * -8) + 'deg) rotateY(' + (x * 8) + 'deg) translateY(-4px)';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(600px) rotateX(0) rotateY(0) translateY(0)';
      });
    });
  }, 1800);

  const wizardSteps = Array.from(document.querySelectorAll('.wizard-step'));
  const wizardProgress = Array.from(document.querySelectorAll('.wizard-progress span'));
  let currentWizardStep = 0;

  function showWizardStep(index) {
    if (!wizardSteps.length) return;
    currentWizardStep = Math.max(0, Math.min(index, wizardSteps.length - 1));
    wizardSteps.forEach((step, stepIndex) => step.classList.toggle('active', stepIndex === currentWizardStep));
    wizardProgress.forEach((bar, barIndex) => bar.classList.toggle('active', barIndex <= currentWizardStep));
    const field = wizardSteps[currentWizardStep].querySelector('input, textarea');
    if (field) window.setTimeout(() => field.focus(), 180);
  }

  document.querySelectorAll('[data-next]').forEach(button => {
    button.addEventListener('click', () => {
      const field = wizardSteps[currentWizardStep] && wizardSteps[currentWizardStep].querySelector('input, textarea');
      if (field && !field.reportValidity()) return;
      showWizardStep(currentWizardStep + 1);
    });
  });
  document.querySelectorAll('[data-back]').forEach(button => {
    button.addEventListener('click', () => showWizardStep(currentWizardStep - 1));
  });

  const contactModal = document.getElementById('contactModal');

  function openModal(e) {
    if (e) e.preventDefault();
    if (!contactModal) {
      window.location.href = '/contact/';
      return;
    }
    showWizardStep(0);
    const status = document.querySelector('#projectForm .form-status');
    if (status) status.textContent = '';
    contactModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
  }
  function closeModal() {
    if (!contactModal) return;
    contactModal.classList.remove('active');
    document.body.style.overflow = '';
    if (lenis) lenis.start();
  }
  function openNamedProjectModal(id) {
    const projectModal = document.getElementById(id);
    if (!projectModal) return;
    projectModal.classList.add('active');
    projectModal.scrollTop = 0;
    document.body.style.overflow = 'hidden';
    const closeBtn = projectModal.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
    const hasOnDemandRive = Boolean(projectModal.querySelector('[data-rive-on-demand], [data-enable-rive]'));
    hydrateLazyMedia(projectModal, {
      eagerVideo: true,
      rive: reduceMotion ? 'off' : (hasOnDemandRive ? 'wait' : 'observe')
    });
    bindRiveOnDemand(projectModal);
  }
  function closeNamedProjectModal(id) {
    const projectModal = document.getElementById(id);
    if (!projectModal) return;
    projectModal.classList.remove('active');
    unloadLazyMedia(projectModal);
    document.body.style.overflow = '';
  }
  function openProjectModal() { openNamedProjectModal('projectModal'); }
  function closeProjectModal() { closeNamedProjectModal('projectModal'); }
  function openHancockProjectModal() { openNamedProjectModal('hancockProjectModal'); }
  function closeHancockProjectModal() { closeNamedProjectModal('hancockProjectModal'); }
  function openBeforeHealthProjectModal() { openNamedProjectModal('beforeHealthProjectModal'); }
  function closeBeforeHealthProjectModal() { closeNamedProjectModal('beforeHealthProjectModal'); }
  function openSelaCloudProjectModal() { openNamedProjectModal('selaCloudProjectModal'); }
  function closeSelaCloudProjectModal() { closeNamedProjectModal('selaCloudProjectModal'); }
  function openUpfitSupplyProjectModal() { openNamedProjectModal('upfitSupplyProjectModal'); }
  function closeUpfitSupplyProjectModal() { closeNamedProjectModal('upfitSupplyProjectModal'); }
  function openMtechProjectModal() { openNamedProjectModal('mtechProjectModal'); }
  function closeMtechProjectModal() { closeNamedProjectModal('mtechProjectModal'); }
  function openGreenopiaProjectModal() { openNamedProjectModal('greenopiaProjectModal'); }
  function closeGreenopiaProjectModal() { closeNamedProjectModal('greenopiaProjectModal'); }
  function openSecufyProjectModal() { openNamedProjectModal('secufyProjectModal'); }
  function closeSecufyProjectModal() { closeNamedProjectModal('secufyProjectModal'); }
  function openFarmerLinkProjectModal() { openNamedProjectModal('farmerLinkProjectModal'); }
  function closeFarmerLinkProjectModal() { closeNamedProjectModal('farmerLinkProjectModal'); }
  function openBuddywerkingProjectModal() { openNamedProjectModal('buddywerkingProjectModal'); }
  function closeBuddywerkingProjectModal() { closeNamedProjectModal('buddywerkingProjectModal'); }
  function openCarakitProjectModal() { openNamedProjectModal('carakitProjectModal'); }
  function closeCarakitProjectModal() { closeNamedProjectModal('carakitProjectModal'); }
  function openGifyboxProjectModal() { openNamedProjectModal('gifyboxProjectModal'); }
  function closeGifyboxProjectModal() { closeNamedProjectModal('gifyboxProjectModal'); }
  function openMavenProjectModal() { openNamedProjectModal('mavenProjectModal'); }
  function closeMavenProjectModal() { closeNamedProjectModal('mavenProjectModal'); }
  function openBazaarProjectModal() { openNamedProjectModal('bazaarProjectModal'); }
  function closeBazaarProjectModal() { closeNamedProjectModal('bazaarProjectModal'); }

  window.openModal = openModal;
  window.closeModal = closeModal;
  window.openProjectModal = openProjectModal;
  window.closeProjectModal = closeProjectModal;
  window.openHancockProjectModal = openHancockProjectModal;
  window.closeHancockProjectModal = closeHancockProjectModal;
  window.openBeforeHealthProjectModal = openBeforeHealthProjectModal;
  window.closeBeforeHealthProjectModal = closeBeforeHealthProjectModal;
  window.openSelaCloudProjectModal = openSelaCloudProjectModal;
  window.closeSelaCloudProjectModal = closeSelaCloudProjectModal;
  window.openUpfitSupplyProjectModal = openUpfitSupplyProjectModal;
  window.closeUpfitSupplyProjectModal = closeUpfitSupplyProjectModal;
  window.openMtechProjectModal = openMtechProjectModal;
  window.closeMtechProjectModal = closeMtechProjectModal;
  window.openGreenopiaProjectModal = openGreenopiaProjectModal;
  window.closeGreenopiaProjectModal = closeGreenopiaProjectModal;
  window.openSecufyProjectModal = openSecufyProjectModal;
  window.closeSecufyProjectModal = closeSecufyProjectModal;
  window.openFarmerLinkProjectModal = openFarmerLinkProjectModal;
  window.closeFarmerLinkProjectModal = closeFarmerLinkProjectModal;
  window.openBuddywerkingProjectModal = openBuddywerkingProjectModal;
  window.closeBuddywerkingProjectModal = closeBuddywerkingProjectModal;
  window.openCarakitProjectModal = openCarakitProjectModal;
  window.closeCarakitProjectModal = closeCarakitProjectModal;
  window.openGifyboxProjectModal = openGifyboxProjectModal;
  window.closeGifyboxProjectModal = closeGifyboxProjectModal;
  window.openMavenProjectModal = openMavenProjectModal;
  window.closeMavenProjectModal = closeMavenProjectModal;
  window.openBazaarProjectModal = openBazaarProjectModal;
  window.closeBazaarProjectModal = closeBazaarProjectModal;

  if (contactModal) {
    contactModal.addEventListener('click', function(e) {
      if (e.target === this) closeModal();
    });
  }
  Object.values(PROJECT_MODAL_IDS).forEach(id => {
    const el = document.getElementById(id);
    if (!el) return;
    el.addEventListener('click', function(e) {
      if (e.target === this) closeNamedProjectModal(id);
    });
  });

  document.addEventListener('keydown', function(e) {
    if (e.key !== 'Escape') return;
    closeModal();
    Object.values(PROJECT_MODAL_IDS).forEach(closeNamedProjectModal);
  });

  document.querySelectorAll('[data-open-contact]').forEach(btn => {
    btn.addEventListener('click', openModal);
  });

  const nav = document.querySelector('nav');
  const navToggle = document.querySelector('.nav-toggle');
  if (nav && navToggle) {
    navToggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('menu-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
      navToggle.textContent = isOpen ? '✕' : '☰';
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('menu-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Open navigation');
        navToggle.textContent = '☰';
      });
    });
  }

  const workGrid = document.querySelector('.work-grid');
  const showMoreButton = document.querySelector('.show-more-btn');
  const extraProjects = document.querySelectorAll('.extra-project');
  if (workGrid && showMoreButton) {
    showMoreButton.addEventListener('click', () => {
      const expanding = !workGrid.classList.contains('expanded');
      showMoreButton.setAttribute('aria-expanded', String(expanding));
      const label = showMoreButton.querySelector('.show-more-label');
      if (label) label.textContent = expanding ? 'Show less' : 'Show more';

      if (expanding) {
        workGrid.classList.add('expanded');
        hydrateLazyMedia(workGrid, { rive: reduceMotion ? 'off' : 'observe' });
        if (window.gsap) {
          gsap.fromTo(extraProjects,
            { opacity: 0, y: 50, scale: .97 },
            { opacity: 1, y: 0, scale: 1, stagger: .12, duration: .8, ease: 'power3.out', onComplete: () => window.ScrollTrigger && ScrollTrigger.refresh() }
          );
        }
      } else if (window.gsap) {
        gsap.to(extraProjects, {
          opacity: 0, y: 30, stagger: .06, duration: .35, ease: 'power2.in',
          onComplete: () => {
            workGrid.classList.remove('expanded');
            unloadLazyMedia(workGrid);
            gsap.set(extraProjects, { clearProps: 'opacity,transform' });
            if (window.ScrollTrigger) ScrollTrigger.refresh();
          }
        });
      } else {
        workGrid.classList.remove('expanded');
        unloadLazyMedia(workGrid);
      }
    });
  }

  const modalOpeners = {
    'ismed-clim': openProjectModal,
    'hancock-health': openHancockProjectModal,
    'before-health': openBeforeHealthProjectModal,
    'sela-cloud': openSelaCloudProjectModal,
    'upfit-supply': openUpfitSupplyProjectModal,
    'mtech-systems': openMtechProjectModal,
    'greenopia': openGreenopiaProjectModal,
    'secufy-sos': openSecufyProjectModal,
    'farmerlink': openFarmerLinkProjectModal,
    'buddywerking': openBuddywerkingProjectModal,
    'carakit': openCarakitProjectModal,
    'gifybox': openGifyboxProjectModal,
    'maven': openMavenProjectModal,
    'bazaar': openBazaarProjectModal
  };

  document.querySelectorAll('.work-card').forEach(card => {
    if (card.tagName === 'A') return;
    const openProject = () => {
      const opener = modalOpeners[card.dataset.project];
      if (opener) {
        opener();
        return;
      }
      openModal();
      const title = card.querySelector('h3');
      const details = document.getElementById('projectDetails');
      if (title && details) details.value = 'I’m interested in a project similar to ' + title.textContent + '.';
    };
    card.addEventListener('click', openProject);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProject();
      }
    });
  });

  const requestedProject = new URLSearchParams(window.location.search).get('project');
  if (requestedProject && PROJECT_PAGE_URLS[requestedProject]) {
    window.location.replace(PROJECT_PAGE_URLS[requestedProject]);
  } else if (requestedProject && modalOpeners[requestedProject] && document.getElementById(PROJECT_MODAL_IDS[requestedProject])) {
    modalOpeners[requestedProject]();
  }

  const chatLauncher = document.querySelector('.chat-launcher');
  const chatPanel = document.querySelector('.chat-panel');
  if (chatLauncher && chatPanel) {
    function setChat(open) {
      chatPanel.classList.toggle('open', open);
      chatLauncher.setAttribute('aria-expanded', String(open));
      chatLauncher.textContent = open ? '✕' : '✦';
    }
    chatLauncher.addEventListener('click', () => setChat(!chatPanel.classList.contains('open')));
    const chatClose = document.querySelector('.chat-close');
    if (chatClose) chatClose.addEventListener('click', () => setChat(false));
    const chatProject = document.querySelector('[data-chat-project]');
    if (chatProject) {
      chatProject.addEventListener('click', () => {
        setChat(false);
        openModal();
      });
    }
    const chatWork = document.querySelector('[data-chat-work]');
    if (chatWork) {
      chatWork.addEventListener('click', () => {
        setChat(false);
        if (document.getElementById('work')) {
          if (lenis) lenis.scrollTo('#work', { offset: -70 });
          else document.querySelector('#work').scrollIntoView({ behavior: 'smooth' });
        } else {
          window.location.href = '/work/';
        }
      });
    }
  }

  function reportConsultationConversion() {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', 'conversion', {
      send_to: 'AW-18298026066/9UqaCK-YqcscENLwlpVE'
    });
  }

  function bindNetlifyForm(form) {
    if (!form || form.dataset.bound === 'true') return;
    form.dataset.bound = 'true';
    form.addEventListener('submit', async e => {
      e.preventDefault();
      const status = form.querySelector('.form-status');
      const submitButton = form.querySelector('[type="submit"]');
      const originalLabel = submitButton ? submitButton.textContent : '';

      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = 'Sending…';
      }
      form.setAttribute('aria-busy', 'true');
      if (status) {
        status.style.color = 'var(--purple)';
        status.textContent = 'Sending your project brief…';
      }

      try {
        const response = await fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(new FormData(form)).toString()
        });

        if (!response.ok) throw new Error(`Form submission failed: ${response.status}`);

        reportConsultationConversion();
        if (status) {
          status.style.color = '#147d61';
          status.textContent = 'Thanks! Your message was sent. We’ll reply within one business day.';
        }
        if (submitButton) submitButton.textContent = 'Sent ✓';
        form.reset();

        window.setTimeout(() => {
          closeModal();
          showWizardStep(0);
          if (status) status.textContent = '';
          if (submitButton) {
            submitButton.textContent = originalLabel;
            submitButton.disabled = false;
          }
        }, 2200);
      } catch (error) {
        console.error(error);
        if (status) {
          status.style.color = '#c23b2a';
          status.textContent = 'Message could not be sent. Please email hello@thefunimation.co.';
        }
        if (submitButton) {
          submitButton.textContent = originalLabel;
          submitButton.disabled = false;
        }
      } finally {
        form.removeAttribute('aria-busy');
        if (status) status.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  // Netlify strips data-netlify / netlify-honeypot from served HTML after
  // detecting the form at build time, so do not bind on those attributes alone.
  const netlifyForms = new Set(
    [
      document.getElementById('projectForm'),
      document.getElementById('contactForm'),
      ...document.querySelectorAll('form[name="project-brief"], form[data-netlify="true"]')
    ].filter(Boolean)
  );
  netlifyForms.forEach(bindNetlifyForm);

  document.querySelectorAll('[data-hydrate-media]:not([data-rive-on-demand])').forEach(node => {
    hydrateLazyMedia(node, { rive: reduceMotion ? 'off' : 'observe' });
  });
  bindRiveOnDemand(document);

  const filterBar = document.querySelector('[data-work-filters]');
  if (filterBar && workGrid) {
    filterBar.addEventListener('click', event => {
      const button = event.target.closest('[data-filter]');
      if (!button) return;
      const filter = button.dataset.filter;
      filterBar.querySelectorAll('[data-filter]').forEach(btn => {
        btn.classList.toggle('active', btn === button);
        btn.setAttribute('aria-pressed', String(btn === button));
      });
      workGrid.querySelectorAll('.work-card').forEach(card => {
        const tags = (card.dataset.filters || '').split(/\s+/);
        const show = filter === 'all' || tags.includes(filter);
        card.classList.toggle('is-hidden', !show);
      });
    });
  }
