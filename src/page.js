// @ts-check

import {
  getAddrFromPrivateKey,
  makeAccount,
  makeConnection,
  RNode,
} from 'rchain-api';
import check from './checkElt';
import { registerHandler, setHandler, checkHandler } from './main.js';
import { checkBalance } from './revVault';
import { Base16, rhopm } from 'rchain-api';
// @ts-ignore resolveJsonModule doesn't work in .js?
import inboxInfo from 'liquid-democracy/rho_modules/inbox.json';

const { freeze } = Object;

const SEC = 1000;
const POLL_INTERVAL = 5 * SEC; // ISSUE: arbitrary
const REV = 10 ** 8;
const MAX_TX_FEE = { phloPrice: 1, phloLimit: 0.05 * REV }; // ISSUE: UI?

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
 *   clock: () => Promise<number>,
 *   setTimeout: typeof setTimeout,
 *   setInterval: typeof setInterval,
 * }} ScheduleAccess
 *
 * @typedef {{
 *   getRandomValues: typeof window.crypto.getRandomValues
 * }} CryptoRandom
 *
 * @typedef { import('rchain-api').Observer } Observer
 * @typedef { import('rchain-api').Validator } Validator
 * @typedef { import('rchain-api').RevAccount } RevAccount
 * @typedef { import('rchain-api/src/rnode-openapi-schema').DeployRequest } DeployRequest
 *
 * @typedef {{
 *   sign: (term: string) => Promise<DeployRequest>,
 *   polling: () => Promise<void>, // throws to abort
 * }} SigAccount
 */
export default function statusPage({
  $,
  mount,
  html,
  fetch,
  localStorage,
  clock,
  setTimeout,
  setInterval,
  getRandomValues,
}) {
  const rnode = RNode(fetch);

  // ISSUE: only if local
  runProposer(rnode.admin(check.theInput($('#adminBase')).value), 4 * SEC, {
    setInterval,
  });

  const state = (() => {
    let boxName = check.theInput($('#boxName')).value;
    let observerBase = check.theInput($('#observerBase')).value;
    let observer = rnode.observer(observerBase);
    let validatorBase = check.theInput($('#validatorBase')).value;
    let validator = rnode.validator(validatorBase);

    /** @type { string | null } */
    let privateKeyHex = null;
    /** @type { RevAccount | null } */
    let revAccount = null;
    let balance = 0;
    let maxAge = 0;
    /** @type { SigAccount | null } */
    let sigAccount = null;
    let conn = null;
    /** @type { Inbox | null } */
    let inbox = null;

    const resetAccount = async () => {
      if (!privateKeyHex) return;

      sigAccount = makeAccount(
        privateKeyHex,
        observer,
        { setTimeout, clock, period: POLL_INTERVAL },
        MAX_TX_FEE,
      );
      const aConn = makeConnection(state.validator, state.observer, sigAccount);
      conn = aConn;
      inbox = await inboxProxy(boxName, conn);
      inbox.write(['Big', 'bad', { name: 'wolf', teeth: 'large' }]);
      const uri = await inbox.uri();
      // TODO: save to localStorage; display
      console.log('inbox', { uri });
    };

    const state = {
      messages: [],

      // @ts-ignore ISSUE: ES-5 only... how to tell tsc that's what we're using?
      get observer() {
        return observer;
      },
      // @ts-ignore
      set observerBase(value) {
        observer = RNode(fetch).observer(value);
        resetAccount();
      },

      // @ts-ignore
      get validator() {
        return validator;
      },
      // @ts-ignore
      set validatorBase(value) {
        validator = RNode(fetch).validator(value);
        resetAccount();
      },

      // @ts-ignore
      get inbox() {
        return inbox;
      },

      // @ts-ignore
      get revAccount() {
        const reset = (x) => {
          resetAccount();
          return x;
        };

        if (revAccount !== null) return revAccount;

        state.maxAge = 0.1 * SEC;
        privateKeyHex = check.theInput($('#pkHex')).value;
        revAccount = getAddrFromPrivateKey(privateKeyHex);
        return reset(revAccount);

        privateKeyHex = localStorage.getItem('privateKeyHex');
        console.log('privateKey from localStorage?', { privateKeyHex });
        if (typeof privateKeyHex === 'string') {
          revAccount = getAddrFromPrivateKey(privateKeyHex);
          if (revAccount) return reset(revAccount);
          console.log('bad private key', { privateKeyHex });
        }

        console.log('generating new private key');
        const eckeylen = 32; // rnode-address.js#L69
        const buf = new Uint8Array(eckeylen);
        privateKeyHex = Base16.encode(getRandomValues(buf));
        revAccount = the(getAddrFromPrivateKey(privateKeyHex));
        localStorage.setItem('privateKeyHex', privateKeyHex);
        return reset(revAccount);
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
        clock().then((t) => {
          const delta = Math.max(0, maxAge - t);
          setTimeout(() => {
            console.log('checkBalance', { revAddr: state.revAccount.revAddr });
            checkBalance(observer, state.revAccount.revAddr)
              .then((bal) => {
                balance = bal;
                console.log('balance', { balance });
              })
              .catch((err) => {
                state.maxAge = maxAge * 1.5 + 0.1 * SEC;
                console.log(err); // TODO: Errors UI
              });
          }, delta);
        });
      },
    };
    return state;
  })();

  mount('#accountControl', accountControl(state, html));
  mount('#inboxControl', inboxControl(state, html));
}

/**
 * @param {import('rchain-api/types/src/rnode').RNodeAdmin} proposer
 * @param {number} period
 * @param {{ setInterval: typeof setInterval }} sched
 */
function runProposer(proposer, period, { setInterval }) {
  const pid = setInterval(() => {
    proposer
      .propose()
      .then(() => {
        console.log('proposed');
      })
      .catch((err) => {
        console.log('propose failed', { err: err.message });
      });
  }, period);
}

/**
 * @param {string} boxName
 * @param {*} conn
 * @returns {Promise<Inbox>}
 *
 * @typedef {{
 *   uri: () => Promise<string>,
 *   write: (msg: [string, string, Record<string, unknown>]) => Promise<string>,
 *   peek: () => Promise<unknown>,
 *   read: () => Promise<unknown>,
 *   readByType: (ty: string) => Promise<unknown>,
 *   readBySubType: (ty: string, sub: string) => Promise<unknown>,
 * }} Inbox
 */
function inboxProxy(boxName, conn) {
  return conn.spawn(
    boxName,
    `
    new rl(\`rho:registry:lookup\`),
        insertArbitrary(\`rho:registry:insertArbitrary\`),
        ch in {
      rl!(\`${inboxURI}\`, *ch) | for (Inbox <- ch) {
        Inbox!(*ch) |
        for (read, write, peek <- ch) {
          insertArbitrary!(*write, *ch) | for (@writeURI <- ch) {
            contract target(@"uri", return) = {
              return!(writeURI)
            }
            |
            contract target(@"write", @m, return) = {
              write!(m, *return)
            }
            |
            contract target(@"peek", return) = {
              peek!(*return)
            }
            |
            contract target(@"read", return) = {
              read!(*return)
            }
            |
            contract target(@"readByType", @ty, return) = {
              read!(ty, *return)
            }
            |
            contract target(@"readBySubType", @ty, @subty, return) = {
              read!(ty, subty, *return)
            }
          }
        }
      }
    }
    `,
  );
}

/**
 *
 * @param {{ balance: number, maxAge: number,
 *           revAccount: RevAccount }} state
 * @param {*} html
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
          state.maxAge = 0.05 * SEC;
        }}
      >
        ${fmt.format(state.balance / REV)}
      </button>`;
    },
  });
}

/** @type { (form: Element) => void } */
const turnOffSubmit = (form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
  });
};

/**
 * @param {{ inbox: Inbox, messages: Message[] }} state
 * @param {*} html
 *
 * @typedef {[string, string, Record<string, unknown> ]} Message
 */
function inboxControl(state, html) {
  const { stringify: show } = JSON;
  const { keys } = Object;
  return freeze({
    view() {
      return html` <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Subtype</th>
              <th>Keys</th>
            </tr>
          </thead>
          <tbody>
            ${state.messages.map(
              ([ty, sub, caps]) =>
                html`<tr>
                  <td>${ty}</td>
                  <td>${sub}</td>
                  <td>${show(keys(caps))}</td>
                </tr>`,
            )}
          </tbody>
        </table>
        <br />
        <button
          onclick=${async (event) => {
            event.preventDefault();
            if (!state.inbox) return;
            // @ts-ignore
            const expr = await state.inbox.peek();
            const { ExprPar: messages } = expr;
            state.messages = messages;
          }}
        >
          Peek!
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

  // remoteAction(
  //   ui.checkButton,
  //   () =>
  //     checkHandler(friendName()).then((res) => {
  //       res.json().then(({ status }) => {
  //         dom.showText(ui.friendStatusP, status);
  //       });
  //       return res;
  //     }),
  //   () => `get status for ${friendName()}`,
  // );

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
