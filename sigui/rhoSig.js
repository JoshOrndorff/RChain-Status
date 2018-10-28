/** rhoSig -- RHOCore signing UI
@flow
*/

import { fromJSData, toByteArray, toRholang } from './RHOCore.js';

import { sigTool, localStorage, input } from './sigTool.js';

const def = Object.freeze;
const RCHAIN_SIGNING = 'rchain.coop/6kbIdoB2';

/*::
import { type UserAgent, type SigningKey } from './sigTool.js';
import {
  type BusMessage,
  type BusReply,
  type BusDelayedTarget,
  type FarRef2,
} from './messageBus.js';

import type Nacl from './lib/nacl-fast.min.js';
*/

export default function popup(document /*: Document*/, ua /*: UserAgent */, nacl /*: Nacl*/) {
  const tool = sigTool(localStorage(ua), nacl);
  const die = (id) => { throw new TypeError(`coding bug: no such id ${id}`); };
  const byId = id => document.getElementById(id) || die(id);

  /**
   * Signature request from page
   */
  let requestPending = null;
  function requestSignature(_refs, payload) {
    const par = fromJSData(payload);
    console.log('rhoSig', { par });
    input(byId('data')).value = JSON.stringify(payload);
    input(byId('rholang')).value = toRholang(par);
    return new Promise((resolve, reject) => {
      requestPending = { resolve, reject };
    });
  }

  function signProcess(par, password) {
    return tool.getKey()
      .then((signingKey) => {
        const message = toByteArray(par);

        const sig = tool.signMessage(message, signingKey, password);
        if (requestPending) {
          requestPending.resolve({ signature: sig, pubKey: signingKey.pubKey });
          requestPending = null;
        }
        return sig;
      });
  }

  function lose(doing, exception) {
    const message = `failed ${doing}: ${exception.message}`;
    byId('status').textContent = message;

    if (requestPending) {
      requestPending.reject(new Error(message));
      requestPending = null;
    }
    console.log(exception);
  }

  function showPubKey({ label, pubKey } /*: SigningKey*/) {
    /* Assigning to params is the norm for DOM stuff. */
    /* eslint-disable no-param-reassign */
    input(byId('label')).value = label;
    input(byId('pubKey')).value = pubKey;
  }

  document.addEventListener('DOMContentLoaded', () => {
    tool.getKey()
      .then(showPubKey)
      .catch(oops => lose('get key', oops));

    byId('sign').addEventListener('click', () => {
      byId('status').textContent = '';
      let par;

      try {
        par = fromJSData(JSON.parse(input(byId('data')).value));
      } catch (oops) {
        lose('parsing data', oops);
        return;
      }
      byId('rholang').textContent = toRholang(par);
      signProcess(par, input(byId('password')).value)
        .then((sig) => {
          input(byId('sig')).value = sig;
        })
        .catch(oops => lose('get key', oops));
    });

    const selfRef = `${RCHAIN_SIGNING}/popup`;
    const self = promiseProxy(selfRef, def({ requestSignature }));
    // ISSUE: ua.chrome vs. ua.browser
    ua.chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const toPage = oneWayProxy(`${RCHAIN_SIGNING}/page`, ua.chrome.tabs, tabs[0].id || 0);
      toPage.invokeRef('offer', [selfRef]);
    });

    // ISSUE: flow-interfaces-chrome doesn't realize sendResponse takes an arg
    const { onMessage } = (ua.chrome.runtime /*:any*/);
    onMessage.addListener(
      (msg, _sender, sendResponse) => self.receive(msg, sendResponse),
    );
  });
}


function oneWayProxy(name, port, tabId) /*: FarRef2 */{
  const ignoreReply = () => null;

  function invokeRef(method, refs, ...args) {
    const msg /*: BusMessage */ = { method, refs, args, target: name, kind: 'invoke' };
    console.log('rhoSig oneWayProxy sending', msg.method, msg);
    port.sendMessage(tabId, msg, ignoreReply);
    return Promise.reject(new TypeError('one way!'));
  }
  return def({ invokeRef });
}


function promiseProxy(name, obj) /*: BusDelayedTarget */ {
  function receive({ target, method, refs, args }, sendResponse) {
    if (target !== name) { return undefined; }
    if (!(method in obj)) { return undefined; } // ISSUE: reply with error?
    console.log('@@rhoSig promiseProxy received invoke', method);

    obj[method](refs, ...args)
      .then((result) => {
        const win /*: BusReply */ = { result, kind: 'success' };
        sendResponse(win);
      })
      .catch(({ message }) => {
        const fail /*: BusReply */ = { message, kind: 'failure' };
        sendResponse(fail);
      });
    return true;
  }
  return def({ receive });
}
