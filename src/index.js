// @ts-check
import htm from 'htm';
import m from 'mithril';
import statusPage from './page.js';

/**
 * @param {T | null | undefined } x
 * @returns { T }
 * @template T
 */
function the(x) {
  if (x === null || x === undefined)
    throw new TypeError('BUG: unexpected null / undefined');
  return x;
}

window.addEventListener('DOMContentLoaded', () => {
  const $ = (selector) => document.querySelector(selector);
  // const $$ = (selector) => document.querySelectorAll(selector);
  statusPage({
    $,
    mount: (selector, component) => m.mount(the($(selector)), component),
    html: htm.bind(m),
    localStorage,
    fetch,
    now: () => Promise.resolve(Date.now()),
    setTimeout,
    getRandomValues: (arr) => window.crypto.getRandomValues(arr),
  });
});
