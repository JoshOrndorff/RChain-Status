// @flow
/* eslint-disable import/extensions */

import { fromJSData, toByteArray, toRholang } from './RHOCore.js';

import { sigTool, localStorage } from './sigTool.js';

import messageBus from './messageBus.js';

const def = obj => Object.freeze(obj);
const RCHAIN_SIGNING = 'rchain.coop/6kbIdoB2';

/*::
import { type UserAgent, type SigningKey } from './sigTool.js';

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
      requestPending.reject(message);
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

    // ISSUE: ua.chrome vs. ua.browser
    ua.chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const relayPort = ua.chrome.tabs.connect(tabs[0].id || 0, { name: 'Rholang signing' });
      console.log('rhoSig created port:', relayPort);

      const bus = messageBus(relayPort, 'popup');
      const self = bus.attach(`${RCHAIN_SIGNING}/popup`, bus.fromNear(def({ requestSignature })));
      const pageAddr = `${RCHAIN_SIGNING}/page`;
      const pageClient = bus.attach(pageAddr, bus.makeProxy(pageAddr));
      pageClient.invoke('offer', [self]);

      let count = 0;
      relayPort.onMessage.addListener((msg) => {
        console.log('relayPort count:', count++, msg);
        bus.receive(msg);
      });
    });
  });
}
