// @ts-check

import { getAddrFromPrivateKey, RNode } from 'rchain-api';
import check from './checkElt';
import { registerHandler, setHandler, checkHandler } from './main.js';
import { checkBalance } from './revVault';
import { Base16, rhopm } from 'rchain-api';
import inboxInfo from 'liquid-democracy/rho_modules/inbox.json';

const { freeze } = Object;

// ISSUE: publish rho_modules in liquid-democracy package
// ISSUE: rhopm limited to testnet?
const [_fn, inboxURI] = rhopm.depEntry(inboxInfo);
console.log({ inboxURI });

console.log('hello from page.js');

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

/**
 * @param { DomAccess & HTMLBuilder & MithrilMount
 *          & NetAccess & ScheduleAccess & CryptoRandom
 *          & LocalStorage } io
 *
 * @typedef {{
 *   $: typeof document.querySelector,
 * }} DomAccess
 *
 * @typedef {{
 *   html: any, // TODO: htm(m) type
 * }} HTMLBuilder
 *
 * @typedef {{
 *   mount: (selector: string, component: import('mithril').Component) => void,
 * }} MithrilMount
 *
 * @typedef {{
 *   fetch: typeof fetch
 * }} NetAccess
 *
 * @typedef {{
 *   localStorage: typeof window.localStorage
 * }} LocalStorage
 *
 * @typedef {{
 *   now: () => Promise<number>,
 *   setTimeout: typeof setTimeout,
 * }} ScheduleAccess
 *
 * @typedef {{
 *   getRandomValues: typeof window.crypto.getRandomValues
 * }} CryptoRandom
 */
export default function statusPage({
  $,
  mount,
  html,
  fetch,
  localStorage,
  now,
  setTimeout,
  getRandomValues,
}) {
  const state = (() => {
    let observerBase = check.theInput($('#observerBase')).value;
    let observer = RNode(fetch).observer(observerBase);
    let balance = 0;
    /** @type { RevAccount | null } */
    let revAccount = null;
    let maxAge = 0;

    return {
      // @ts-ignore
      set observerURI(value) {
        observer = RNode(fetch).observer(value);
      },
      // @ts-ignore
      get revAccount() {
        if (revAccount !== null) return revAccount;

        state.maxAge = 0;

        let privateKeyHex = localStorage.getItem('privateKeyHex');
        console.log('privateKey from localStorage?', { privateKeyHex });
        if (typeof privateKeyHex === 'string') {
          revAccount = getAddrFromPrivateKey(privateKeyHex);
          if (revAccount) return revAccount;
          console.log('bad private key', { privateKeyHex });
        }

        console.log('generating new private key');
        const eckeylen = 32; // rnode-address.js#L69
        const buf = new Uint8Array(eckeylen);
        privateKeyHex = Base16.encode(getRandomValues(buf));
        revAccount = the(getAddrFromPrivateKey(privateKeyHex));
        localStorage.setItem('privateKeyHex', privateKeyHex);
        return revAccount;
      },
      // @ts-ignore
      get balance() {
        return balance;
      },
      // @ts-ignore
      get maxAge() {
        return maxAge;
      },
      // @ts-ignore
      set maxAge(value) {
        maxAge = value;
        now().then((t) => {
          const delta = Math.max(0, value - t);
          setTimeout(() => {
            console.log('checkBalance', { revAddr: state.revAccount.revAddr });
            checkBalance(observer, state.revAccount.revAddr)
              .then((bal) => {
                balance = bal;
                console.log('balance', { balance });
              })
              .catch((err) => {
                console.log(err); // TODO: Errors UI
              });
          }, delta);
        });
      },
    };
  })();

  mount('#accountControl', accountControl(state, html));
}

/**
 *
 * @param {{ balance: number, maxAge: number,
 *           revAccount: RevAccount }} state
 * @param {*} html
 *
 * @typedef { import('rchain-api').Observer } Observer
 * @typedef { import('rchain-api').RevAccount } RevAccount
 */
function accountControl(state, html) {
  const fmt = new Intl.NumberFormat('en-US', {
    maximumFractionDigits: 3,
    minimumFractionDigits: 3,
  });
  const REV = 1e8;
  return freeze({
    view() {
      return html`<button
        title=${state.revAccount.revAddr}
        onclick=${() => {
          state.maxAge = 0;
        }}
      >
        ${fmt.format(state.balance / REV)}
      </button>`;
    },
  });
}

function statusPageOLD(dom, { fetch }) {
  const byId = dom.getElementById;

  const ui = freeze({
    nameBox: check.theInput(byId('name')),
    registerButton: byId('register'),
    newStatusBox: check.theInput(byId('new-status')),
    nonceBox: check.theInput(byId('nonce')),
    setStatusButton: byId('set-status'),
    friendBox: check.theInput(byId('friend-name')),
    checkButton: check.theButton(byId('check-status')),
    friendStatusP: byId('friend-status'),
    proposeButton: byId('propose'),
    problem: byId('problem'),
    signature: byId('signature'),
    anImg: byId('regAvatar'),
  });

  const getName = () => ui.nameBox.value;
  const friendName = () => ui.friendBox.value;

  ui.registerButton.addEventListener('click', () => {
    registerHandler(getName());
  });

  ui.setStatusButton.addEventListener('click', () => {
    setHandler(getName(), ui.newStatusBox.value);
  });

  remoteAction(
    ui.checkButton,
    () =>
      checkHandler(friendName()).then((res) => {
        res.json().then(({ status }) => {
          dom.showText(ui.friendStatusP, status);
        });
        return res;
      }),
    () => `get status for ${friendName()}`,
  );

  function updateAvatar(name) {
    const src = `https://robohash.org/${name}?size=48x48&amp;set=set3`;
    ui.anImg.setAttribute('src', src);
    ui.anImg.hidden = false;
  }

  typingPause(ui.nameBox, updateAvatar, 500);

  /**
   * Attach remote action to button.
   * On click, disable the button, do the action, enable the button,
   * and, in case of error, show the message.
   * @param { HTMLButtonElement } button
   * @param { () => Promise<any> } action
   * @param { () => string } label
   */
  function remoteAction(button, action, label) {
    button.addEventListener('click', () => {
      console.log('remoteAction button pressed:', label);
      dom.disable(button);

      action()
        .then((res) => {
          console.log('remoteAction response was: ', label, res);
          if (res.ok) {
            dom.hide(ui.problem);
          } else {
            res.json().then((oops) => {
              dom.showText(ui.problem, `failed to ${label()}: ${oops.message}`);
            });
          }
          return res;
        })
        .catch((oops) => dom.showText(ui.problem, oops.message))
        .then((_) => dom.enable(button));
    });
  }
}

/**
 * @param { HTMLInputElement } field
 * @param { (value: string) => void } go
 * @param { number } ms
 */
function typingPause(field, go, ms) {
  let timer;
  field.addEventListener('keyup', (_event) => {
    clearTimeout(timer);
    if (field.value) {
      timer = setTimeout(() => go(field.value), ms);
    }
  });
}

function urlEncode(template, ...subs) {
  const encoded = subs.map(encodeURIComponent);

  const out = [];
  template.forEach((part, ix) => {
    out.push(part);
    out.push(encoded[ix]);
  });

  return out.join('');
}
