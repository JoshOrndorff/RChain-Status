// @ts-check
import htm from 'htm';
import m from 'mithril';
import statusPage from './page.js';

window.addEventListener('DOMContentLoaded', () => {
  const $ = (selector) => document.querySelector(selector);
  // const $$ = (selector) => document.querySelectorAll(selector);
  statusPage({
    $,
    mount: (selector, component) => m.mount($(selector), component),
    html: htm.bind(m),
    localStorage,
    fetch,
    now: Date.now,
    setTimeout,
    getRandomValues: (arr) => window.crypto.getRandomValues(arr),
  });
});
