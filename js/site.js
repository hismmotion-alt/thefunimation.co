  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let lenis;

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

  function hydrateLazyMedia(container) {
    container.querySelectorAll('img[data-src]').forEach(img => {
      if (!img.getAttribute('src')) img.src = img.dataset.src;
    });
    container.querySelectorAll('video').forEach(loadVideoSources);

    const scrollRoot = container.classList && container.classList.contains('modal-overlay')
      ? container
      : null;
    const io = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const iframe = entry.target;
        if (iframe.dataset.src && !iframe.getAttribute('src')) {
          iframe.src = iframe.dataset.src;
        }
        observer.unobserve(iframe);
      });
    }, { root: scrollRoot, rootMargin: '220px 0px', threshold: 0.01 });

    container.querySelectorAll('iframe[data-src]').forEach(iframe => {
      if (iframe.getAttribute('src')) return;
      io.observe(iframe);
    });
    if (container._lazyIo) container._lazyIo.disconnect();
    container._lazyIo = io;
  }

  function unloadLazyMedia(container) {
    if (container._lazyIo) {
      container._lazyIo.disconnect();
      container._lazyIo = null;
    }
    container.querySelectorAll('iframe[data-src]').forEach(iframe => {
      iframe.removeAttribute('src');
    });
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
    if (!window.gsap || !window.ScrollTrigger || !window.Lenis || reduceMotion) {
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

    // Existing CSS reveal classes are now controlled by GSAP.
    gsap.set('.reveal, .reveal-scale, .why-point', { opacity: 1, y: 0, scale: 1 });
    gsap.set('.reveal-stagger > *', { opacity: 1, y: 0 });

    gsap.set('.hero h1, .hero p, .hero-btns > *, .lottie-frame', {
      opacity: 1,
      clearProps: 'transform'
    });

    const heroStage = document.querySelector('.hero-stage');
    const motionCard = heroStage ? heroStage.querySelector('.lottie-frame') : null;
    // Stage chips and hero blobs are CSS-hidden; skip their GSAP loops.
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

    if (window.matchMedia('(min-width: 901px)').matches) {
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
      gsap.from(targets, {
        y: 58, opacity: 0, scale: .96, stagger: .1, duration: .8, ease: 'power3.out',
        scrollTrigger: { trigger, start: 'top 82%', once: true }
      });
    });

    document.querySelectorAll('.work-card:not(.extra-project)').forEach((card, index) => {
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

    gsap.from('.process-step', {
      y: 70, opacity: 0, rotationX: -12, transformOrigin: 'center bottom',
      stagger: .12, duration: .9, ease: 'power3.out',
      scrollTrigger: { trigger: '.process-steps', start: 'top 80%', once: true }
    });
    gsap.to('.process-steps', {
      xPercent: -2.5, ease: 'none',
      scrollTrigger: { trigger: '.process-section', start: 'top bottom', end: 'bottom top', scrub: 1.5 }
    });

    gsap.from('.faq-item', {
      x: -38, opacity: 0, stagger: .08, duration: .7, ease: 'power3.out',
      scrollTrigger: { trigger: '.faq-list', start: 'top 82%', once: true }
    });
    gsap.from('.final-cta h2, .final-cta p, .final-cta .btn-primary', {
      y: 55, opacity: 0, stagger: .14, duration: .9, ease: 'power3.out',
      scrollTrigger: { trigger: '.final-cta', start: 'top 74%', once: true }
    });

    gsap.to('.scroll-progress', {
      scaleX: 1, ease: 'none',
      scrollTrigger: { start: 0, end: 'max', scrub: .25 }
    });

    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
  }

  function whenIdle(fn, timeout) {
    if ('requestIdleCallback' in window) requestIdleCallback(fn, { timeout: timeout || 1400 });
    else window.setTimeout(fn, 220);
  }

  function initDecorativeMotion() {
    if (!window.gsap || reduceMotion) return;
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

  // Nav shadow on scroll
  window.addEventListener('scroll', () => {
    document.querySelector('nav').classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Animated stat counters
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

  // Card tilt is decorative; attach after first paint to keep TBT down.
  whenIdle(() => {
    if (reduceMotion || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
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

  // Conversational project brief
  const wizardSteps = Array.from(document.querySelectorAll('.wizard-step'));
  const wizardProgress = Array.from(document.querySelectorAll('.wizard-progress span'));
  let currentWizardStep = 0;

  function showWizardStep(index) {
    currentWizardStep = Math.max(0, Math.min(index, wizardSteps.length - 1));
    wizardSteps.forEach((step, stepIndex) => step.classList.toggle('active', stepIndex === currentWizardStep));
    wizardProgress.forEach((bar, barIndex) => bar.classList.toggle('active', barIndex <= currentWizardStep));
    const field = wizardSteps[currentWizardStep].querySelector('input, textarea');
    if (field) window.setTimeout(() => field.focus(), 180);
  }

  document.querySelectorAll('[data-next]').forEach(button => {
    button.addEventListener('click', () => {
      const field = wizardSteps[currentWizardStep].querySelector('input, textarea');
      if (field && !field.reportValidity()) return;
      showWizardStep(currentWizardStep + 1);
    });
  });
  document.querySelectorAll('[data-back]').forEach(button => {
    button.addEventListener('click', () => showWizardStep(currentWizardStep - 1));
  });

  // Modal open/close
  function openModal(e) {
    if (e) e.preventDefault();
    showWizardStep(0);
    document.querySelector('#projectForm .form-status').textContent = '';
    document.getElementById('contactModal').classList.add('active');
    document.body.style.overflow = 'hidden';
    if (lenis) lenis.stop();
  }
  function closeModal() {
    document.getElementById('contactModal').classList.remove('active');
    document.body.style.overflow = '';
    if (lenis) lenis.start();
  }
  function openNamedProjectModal(id) {
    const projectModal = document.getElementById(id);
    projectModal.classList.add('active');
    projectModal.scrollTop = 0;
    document.body.style.overflow = 'hidden';
    const closeBtn = projectModal.querySelector('.modal-close');
    if (closeBtn) closeBtn.focus();
    hydrateLazyMedia(projectModal);
  }
  function closeNamedProjectModal(id) {
    const projectModal = document.getElementById(id);
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
  // Close on overlay click
  document.getElementById('contactModal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
  });
  document.getElementById('projectModal').addEventListener('click', function(e) {
    if (e.target === this) closeProjectModal();
  });
  document.getElementById('hancockProjectModal').addEventListener('click', function(e) {
    if (e.target === this) closeHancockProjectModal();
  });
  document.getElementById('beforeHealthProjectModal').addEventListener('click', function(e) {
    if (e.target === this) closeBeforeHealthProjectModal();
  });
  document.getElementById('selaCloudProjectModal').addEventListener('click', function(e) {
    if (e.target === this) closeSelaCloudProjectModal();
  });
  document.getElementById('upfitSupplyProjectModal').addEventListener('click', function(e) {
    if (e.target === this) closeUpfitSupplyProjectModal();
  });
  document.getElementById('mtechProjectModal').addEventListener('click', function(e) {
    if (e.target === this) closeMtechProjectModal();
  });
  document.getElementById('greenopiaProjectModal').addEventListener('click', function(e) {
    if (e.target === this) closeGreenopiaProjectModal();
  });
  document.getElementById('secufyProjectModal').addEventListener('click', function(e) {
    if (e.target === this) closeSecufyProjectModal();
  });
  document.getElementById('farmerLinkProjectModal').addEventListener('click', function(e) {
    if (e.target === this) closeFarmerLinkProjectModal();
  });
  document.getElementById('buddywerkingProjectModal').addEventListener('click', function(e) {
    if (e.target === this) closeBuddywerkingProjectModal();
  });
  document.getElementById('carakitProjectModal').addEventListener('click', function(e) {
    if (e.target === this) closeCarakitProjectModal();
  });
  document.getElementById('gifyboxProjectModal').addEventListener('click', function(e) {
    if (e.target === this) closeGifyboxProjectModal();
  });
  document.getElementById('mavenProjectModal').addEventListener('click', function(e) {
    if (e.target === this) closeMavenProjectModal();
  });
  document.getElementById('bazaarProjectModal').addEventListener('click', function(e) {
    if (e.target === this) closeBazaarProjectModal();
  });
  // Close on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeModal();
      closeProjectModal();
      closeHancockProjectModal();
      closeBeforeHealthProjectModal();
      closeSelaCloudProjectModal();
      closeUpfitSupplyProjectModal();
      closeMtechProjectModal();
      closeGreenopiaProjectModal();
      closeSecufyProjectModal();
      closeFarmerLinkProjectModal();
      closeBuddywerkingProjectModal();
      closeCarakitProjectModal();
      closeGifyboxProjectModal();
      closeMavenProjectModal();
      closeBazaarProjectModal();
    }
  });
  // Wire up all CTA buttons
  document.querySelectorAll('.btn-primary, .form-submit').forEach(btn => {
    if (btn.classList.contains('form-submit')) return;
    btn.addEventListener('click', openModal);
  });

  // Mobile navigation
  const nav = document.querySelector('nav');
  const navToggle = document.querySelector('.nav-toggle');
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

  // Expandable portfolio
  const workGrid = document.querySelector('.work-grid');
  const showMoreButton = document.querySelector('.show-more-btn');
  const extraProjects = document.querySelectorAll('.extra-project');
  showMoreButton.addEventListener('click', () => {
    const expanding = !workGrid.classList.contains('expanded');
    showMoreButton.setAttribute('aria-expanded', String(expanding));
    showMoreButton.querySelector('.show-more-label').textContent = expanding ? 'Show less' : 'Show more';

    if (expanding) {
      workGrid.classList.add('expanded');
      hydrateLazyMedia(workGrid);
      if (window.gsap) {
        gsap.fromTo(extraProjects,
          { opacity: 0, y: 50, scale: .97 },
          { opacity: 1, y: 0, scale: 1, stagger: .12, duration: .8, ease: 'power3.out', onComplete: () => ScrollTrigger.refresh() }
        );
      }
    } else if (window.gsap) {
      gsap.to(extraProjects, {
        opacity: 0, y: 30, stagger: .06, duration: .35, ease: 'power2.in',
        onComplete: () => {
          workGrid.classList.remove('expanded');
          unloadLazyMedia(workGrid);
          gsap.set(extraProjects, { clearProps: 'opacity,transform' });
          ScrollTrigger.refresh();
        }
      });
    } else {
      workGrid.classList.remove('expanded');
      unloadLazyMedia(workGrid);
    }
  });

  // Portfolio cards lead naturally into a project conversation
  document.querySelectorAll('.work-card').forEach(card => {
    const openProject = () => {
      if (card.dataset.project === 'ismed-clim') {
        openProjectModal();
        return;
      }
      if (card.dataset.project === 'hancock-health') {
        openHancockProjectModal();
        return;
      }
      if (card.dataset.project === 'before-health') {
        openBeforeHealthProjectModal();
        return;
      }
      if (card.dataset.project === 'sela-cloud') {
        openSelaCloudProjectModal();
        return;
      }
      if (card.dataset.project === 'upfit-supply') {
        openUpfitSupplyProjectModal();
        return;
      }
      if (card.dataset.project === 'mtech-systems') {
        openMtechProjectModal();
        return;
      }
      if (card.dataset.project === 'greenopia') {
        openGreenopiaProjectModal();
        return;
      }
      if (card.dataset.project === 'secufy-sos') {
        openSecufyProjectModal();
        return;
      }
      if (card.dataset.project === 'farmerlink') {
        openFarmerLinkProjectModal();
        return;
      }
      if (card.dataset.project === 'buddywerking') {
        openBuddywerkingProjectModal();
        return;
      }
      if (card.dataset.project === 'carakit') {
        openCarakitProjectModal();
        return;
      }
      if (card.dataset.project === 'gifybox') {
        openGifyboxProjectModal();
        return;
      }
      if (card.dataset.project === 'maven') {
        openMavenProjectModal();
        return;
      }
      if (card.dataset.project === 'bazaar') {
        openBazaarProjectModal();
        return;
      }
      openModal();
      const title = card.querySelector('h3').textContent;
      document.getElementById('projectDetails').value = 'I’m interested in a project similar to ' + title + '.';
    };
    card.addEventListener('click', openProject);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        openProject();
      }
    });
  });

  // Guided chat
  const chatLauncher = document.querySelector('.chat-launcher');
  const chatPanel = document.querySelector('.chat-panel');
  function setChat(open) {
    chatPanel.classList.toggle('open', open);
    chatLauncher.setAttribute('aria-expanded', String(open));
    chatLauncher.textContent = open ? '✕' : '✦';
  }
  chatLauncher.addEventListener('click', () => setChat(!chatPanel.classList.contains('open')));
  document.querySelector('.chat-close').addEventListener('click', () => setChat(false));
  document.querySelector('[data-chat-project]').addEventListener('click', () => {
    setChat(false);
    openModal();
  });
  document.querySelector('[data-chat-work]').addEventListener('click', () => {
    setChat(false);
    if (lenis) lenis.scrollTo('#work', { offset: -70 });
    else document.querySelector('#work').scrollIntoView({ behavior: 'smooth' });
  });

  // Count a Google Ads lead only after Netlify accepts the form submission.
  function reportConsultationConversion() {
    if (typeof window.gtag !== 'function') return;
    window.gtag('event', 'conversion', {
      send_to: 'AW-18298026066/9UqaCK-YqcscENLwlpVE'
    });
  }

  // Submit project inquiries to Netlify Forms without leaving the page.
  document.getElementById('projectForm').addEventListener('submit', async e => {
    e.preventDefault();
    const form = e.currentTarget;
    const status = form.querySelector('.form-status');
    const submitButton = form.querySelector('[type="submit"]');
    const originalLabel = submitButton.textContent;

    submitButton.disabled = true;
    submitButton.textContent = 'Sending…';
    form.setAttribute('aria-busy', 'true');
    status.style.color = 'var(--purple)';
    status.textContent = 'Sending your project brief…';

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(new FormData(form)).toString()
      });

      if (!response.ok) throw new Error(`Form submission failed: ${response.status}`);

      reportConsultationConversion();
      status.style.color = '#147d61';
      status.textContent = 'Thanks! Your message was sent. We’ll reply within one business day.';
      submitButton.textContent = 'Sent ✓';
      form.reset();

      window.setTimeout(() => {
        closeModal();
        showWizardStep(0);
        status.textContent = '';
        submitButton.textContent = originalLabel;
        submitButton.disabled = false;
      }, 2200);
    } catch (error) {
      console.error(error);
      status.style.color = '#c23b2a';
      status.textContent = 'Message could not be sent. Please email hello@thefunimation.co.';
      submitButton.textContent = originalLabel;
      submitButton.disabled = false;
    } finally {
      form.removeAttribute('aria-busy');
      status.scrollIntoView({ block: 'nearest' });
    }
  });
