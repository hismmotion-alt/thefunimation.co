// Smooth only desktop wheel input; touch and reduced-motion remain native.
export function createSmoothScroll({
  win = window,
  doc = document,
  loadLenis = () => import('./vendor/lenis-1.3.26.mjs')
} = {}) {
  const reduced = win.matchMedia('(prefers-reduced-motion: reduce)');
  const pointer = win.matchMedia('(pointer: fine)');
  let instance, library, disposed = false;

  function reset() {
    if (instance) instance.destroy();
    instance = undefined;
  }

  function syncLock() {
    if (!instance) return;
    const locked = doc.body.classList.contains('nav-locked') || doc.querySelector('.modal-overlay.active');
    if (locked) instance.stop();
    else instance.start();
  }

  async function update() {
    if (disposed || reduced.matches || !pointer.matches || doc.hidden) {
      reset();
      return;
    }
    try {
      library ||= loadLenis();
      const { default: Lenis } = await library;
      if (disposed || instance || reduced.matches || !pointer.matches || doc.hidden) return;
      instance = new Lenis({
        autoRaf: true,
        lerp: 0.15,
        smoothWheel: true,
        syncTouch: false,
        anchors: true,
        stopInertiaOnNavigate: true,
        prevent: node => Boolean(node.closest('.modal-overlay, .nav-links, .chat-panel, textarea, select'))
      });
      syncLock();
    } catch {
      // Native scrolling and all page interactions remain available if loading fails.
      library = undefined;
    }
  }

  reduced.addEventListener('change', update);
  pointer.addEventListener('change', update);
  doc.addEventListener('visibilitychange', update);
  win.addEventListener('pagehide', reset);
  win.addEventListener('pageshow', update);
  update();

  return {
    syncLock,
    scrollTo(target) {
      if (instance) instance.scrollTo(target); // Lenis honors the shared CSS scroll-padding-top.
      else doc.querySelector(target)?.scrollIntoView({ behavior: reduced.matches ? 'auto' : 'smooth' });
    },
    destroy() {
      disposed = true;
      reset();
      reduced.removeEventListener('change', update);
      pointer.removeEventListener('change', update);
      doc.removeEventListener('visibilitychange', update);
      win.removeEventListener('pagehide', reset);
      win.removeEventListener('pageshow', update);
    }
  };
}
