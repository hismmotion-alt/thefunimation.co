import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import test from 'node:test';

const source = fs.readFileSync(new URL('../js/site.js', import.meta.url), 'utf8');
const binding = source.slice(source.indexOf('  function bindNetlifyForm('), source.indexOf('  // Netlify strips'));

function fixture({ invalid = false, wizard = false, fetchImpl } = {}) {
  const attrs = new Map(), timers = [], requests = [];
  const status = { style: {}, textContent: '', scrollIntoView() {} };
  const button = { textContent: 'Send', disabled: false };
  const field = { willValidate: true, validity: { valid: !invalid }, reportValidity() { this.reported = true; } };
  let submit, reset = false, step = null, conversions = 0;
  const form = {
    id: wizard ? 'projectForm' : 'contactForm', dataset: {}, elements: [field],
    addEventListener(name, callback) { if (name === 'submit') submit = callback; },
    getAttribute: key => attrs.get(key), setAttribute: (key, val) => attrs.set(key, val), removeAttribute: key => attrs.delete(key),
    querySelector: selector => selector === '.form-status' ? status : button,
    reset() { reset = true; }
  };
  const context = {
    window: { setTimeout(fn, ms) { timers.push({ fn, ms }); return timers.length; }, clearTimeout(id) { if (timers[id - 1]) timers[id - 1].cleared = true; } },
    wizardSteps: [{ contains: f => f === field }], showWizardStep: index => { step = index; },
    AbortController, URLSearchParams, FormData: class { constructor() { return [['form-name', 'project-brief'], ['name', 'Test'], ['email', 'test@example.test'], ['message', 'Test only']]; } },
    fetch: async (url, options) => { requests.push({ url, options }); return fetchImpl ? fetchImpl(url, options) : { ok: true }; },
    reportConsultationConversion: () => { conversions++; }, closeModal() {}, console: { error() {} }
  };
  vm.runInNewContext(binding + '\nthis.bind = bindNetlifyForm;', context);
  context.bind(form);
  return { form, field, status, button, requests, timers, get step() { return step; }, get reset() { return reset; }, get conversions() { return conversions; }, submit: () => submit({ preventDefault() {} }) };
}

test('success sends a Netlify-encoded brief, resets fields, and clears busy state', async () => {
  const f = fixture(); await f.submit();
  assert.equal(f.requests.length, 1);
  assert.equal(new URLSearchParams(f.requests[0].options.body).get('form-name'), 'project-brief');
  assert.match(f.status.textContent, /message was sent/);
  assert.equal(f.reset, true); assert.equal(f.conversions, 1);
  assert.equal(f.form.getAttribute('aria-busy'), undefined);
  assert.equal(f.timers.find(t => t.ms === 20000).cleared, true);
  f.timers.find(t => t.ms === 2200).fn();
  assert.equal(f.button.disabled, false);
});

test('failed requests preserve the brief, show an email fallback, and allow retry', async () => {
  const f = fixture({ fetchImpl: async () => ({ ok: false, status: 503 }) }); await f.submit();
  assert.match(f.status.textContent, /hello@thefunimation.co/);
  assert.equal(f.reset, false); assert.equal(f.conversions, 0); assert.equal(f.button.disabled, false);
  await f.submit(); assert.equal(f.requests.length, 2);
});

test('a stalled request times out and restores the submit button', async () => {
  const f = fixture({ fetchImpl: (url, opts) => new Promise((resolve, reject) => opts.signal.addEventListener('abort', () => reject(new Error('aborted')))) });
  const pending = f.submit(); f.timers.find(t => t.ms === 20000).fn(); await pending;
  assert.equal(f.button.disabled, false); assert.equal(f.reset, false);
  assert.match(f.status.textContent, /could not be sent/);
});

test('repeated submit events cannot send duplicate requests while busy', async () => {
  let finish;
  const f = fixture({ fetchImpl: () => new Promise(resolve => { finish = resolve; }) });
  const pending = f.submit(); await f.submit();
  assert.equal(f.requests.length, 1); finish({ ok: true }); await pending;
});

test('wizard submission reveals an invalid hidden step before reporting validity', async () => {
  const f = fixture({ invalid: true, wizard: true }); await f.submit();
  assert.equal(f.step, 0); assert.equal(f.field.reported, true);
  assert.equal(f.requests.length, 0); assert.equal(f.button.disabled, false);
});
