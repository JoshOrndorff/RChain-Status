// @flow

import { fromJSData, toByteArray, toRholang } from './RHOCore.js';

import { sigTool, localStorage } from './sigTool.js';

const RCHAIN_SIGNING = 'rchain.coop/6kbIdoB2';

/*::
import { type UserAgent, type SigningKey } from './sigTool.js';
import { type BusMessage } from './messageBus.js';

import type Nacl from './lib/nacl-fast.min.js';
*/

export default function popup(document /*: Document*/, ua /*: UserAgent */, nacl /*: Nacl*/) {
  const tool = sigTool(localStorage(ua), nacl);
  const die = (id) => { throw new Error(id); };
  const byId = id => document.getElementById(id) || die(id);
  // casting thru any. so THERE!
  const fieldById = id => ((byId(id) /*:any*/)/*: HTMLInputElement*/);

  /**
   * Signature request from page
   */
  let requestPending = null;
  function requestSignature(_refs, payload) {
    const par = fromJSData(payload);
    console.log('rhoSig', { par });
    fieldById('data').value = JSON.stringify(payload);
    fieldById('rholang').value = toRholang(par);
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
          requestPending.resolve(sig);
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
    fieldById('label').value = label;
    fieldById('pubKey').value = pubKey;
  }

  document.addEventListener('DOMContentLoaded', () => {
    tool.getKey()
      .then(showPubKey)
      .catch(oops => lose('get key', oops));

    byId('sign').addEventListener('click', () => {
      byId('status').textContent = '';
      let par;

      try {
        par = fromJSData(JSON.parse(fieldById('data').value));
      } catch (oops) {
        lose('parsing data', oops);
        return;
      }
      byId('rholang').textContent = toRholang(par);
      signProcess(par, fieldById('password').value)
        .then((sig) => {
          fieldById('sig').value = sig;
        })
        .catch(oops => lose('get key', oops));
    });

    const selfRef = `${RCHAIN_SIGNING}/popup`;
    // ISSUE: ua.chrome vs. ua.browser
    ua.chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const offerToSign /*: BusMessage */ = {
        kind: 'invoke',
        target: `${RCHAIN_SIGNING}/page`,
        method: 'offer',
        refs: [selfRef],
        args: [],
      };
      const ignoreReply = () => null;
      console.log('@@rhoSig sending', offerToSign.method, offerToSign);
      ua.chrome.tabs.sendMessage(tabs[0].id || 0, offerToSign, ignoreReply);
    });

    // ISSUE: flow-interfaces-chrome doesn't realize sendResponse takes an arg
    ua.chrome.runtime.onMessage.addListener((msg, _sender, sendResponse) => {
      console.log('@@rhoSig received', msg);
      if (msg.target !== selfRef) { return undefined; }
      if (msg.method !== 'requestSignature') { return undefined; } // ISSUE: reply with error?
      console.log('@@rhoSig received invoke self', msg.method);

      requestSignature(msg.refs || [], ...[].concat(msg.args))
        .then((sig) => {
          const win = { kind: 'success', result: sig };
          sendResponse(win);
        })
        .catch((oops) => {
          const fail = { kind: 'failure', message: oops.message };
          sendResponse(fail);
        });

      return true;
    });
  });
}
