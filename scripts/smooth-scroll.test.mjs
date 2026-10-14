import test from 'node:test';
import assert from 'node:assert/strict';
import { createSmoothScroll } from '../js/smooth-scroll.mjs';

function fixture({ reduced = false, pointer = true, fails = false } = {}) {
  const queries = [{ matches: reduced }, { matches: pointer }];
  const events = new Map();
  for (const query of queries) {
    query.addEventListener = (key, fn) => { query.change = fn; };
    query.removeEventListener = () => {};
  }
  const instances = [];
  class Lenis {
    constructor(options) { this.options = options; instances.push(this); }
    destroy() { this.destroyed = true; }
    stop() { this.stopped = true; }
    start() { this.stopped = false; }
    scrollTo(target, options) { this.target = target; this.offset = options.offset; }
  }
  let loads = 0, native;
  const doc = {
    hidden: false, locked: false,
    body: { classList: { contains: () => false } },
    querySelector(selector) { return selector === '.modal-overlay.active' ? this.locked : { scrollIntoView(opts) { native = opts.behavior; } }; },
    addEventListener: (name, fn) => events.set(name, fn), removeEventListener() {}
  };
  const win = {
    matchMedia: query => queries[query.includes('reduced-motion') ? 0 : 1],
    addEventListener: (name, fn) => events.set(name, fn), removeEventListener() {}
  };
  const controller = createSmoothScroll({ win, doc, loadLenis: async () => { loads++; if (fails) throw Error('offline'); return { default: Lenis }; } });
  return { queries, doc, instances, events, controller, get loads() { return loads; }, get native() { return native; } };
}

test('desktop glide supports anchors and pauses while a modal is open', async () => {
  const f = fixture(); await Promise.resolve();
  assert.equal(f.instances[0].options.syncTouch, false);
  f.controller.scrollTo('#work'); assert.equal(f.instances[0].offset, -88);
  f.doc.locked = true; f.controller.syncLock(); assert.equal(f.instances[0].stopped, true);
  f.doc.locked = false; f.controller.syncLock(); assert.equal(f.instances[0].stopped, false);
  f.controller.destroy(); assert.equal(f.instances[0].destroyed, true);
});

test('reduced-motion/coarse pointers use native scroll without loading the library', async () => {
  const reduced = fixture({ reduced: true }); await Promise.resolve();
  assert.equal(reduced.loads, 0); reduced.controller.scrollTo('#work'); assert.equal(reduced.native, 'auto');
  const touch = fixture({ pointer: false }); await Promise.resolve(); assert.equal(touch.loads, 0);
});

test('preferences and hidden tabs tear down the animation loop and restore it safely', async () => {
  const f = fixture(); await Promise.resolve();
  f.queries[0].matches = true; await f.queries[0].change(); assert.equal(f.instances[0].destroyed, true);
  f.queries[0].matches = false; await f.queries[0].change(); assert.equal(f.instances.length, 2);
  f.doc.hidden = true; await f.events.get('visibilitychange')(); assert.equal(f.instances[1].destroyed, true);
  f.doc.hidden = false; await f.events.get('visibilitychange')(); assert.equal(f.instances.length, 3);
  assert.equal(f.loads, 1);
});

test('a failed library download leaves native anchor scrolling available', async () => {
  const f = fixture({ fails: true }); await Promise.resolve(); await Promise.resolve();
  f.controller.scrollTo('#work'); assert.equal(f.native, 'smooth'); assert.equal(f.instances.length, 0);
});
