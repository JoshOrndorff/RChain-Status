/* eslint-disable import/extensions */

import { fromJSData, toByteArray, toRholang } from './RHOCore.js';

import { sigTool, localStorage, uiParts } from './sigTool.js';


export default function popup(document, ua, nacl) {
  const byId = id => document.getElementById(id);
  const { showPubKey } = uiParts(byId);
  let clientP = null;

  function lose(doing, exc) {
    const message = `failed ${doing}: ${exc.message}`;
    byId('status').textContent = message;
    if (clientP) {
      clientP.reject(message);
    }
    console.log(exc);
  }

  document.addEventListener('DOMContentLoaded', () => {
    const tool = sigTool(localStorage(ua), nacl);
    tool.getKey()
      .then(showPubKey)
      .catch(oops => lose('get key', oops));

    byId('sign').addEventListener('click', (ev) => {
      byId('status').textContent = '';

      const data = JSON.parse(byId('data').value);
      byId('rholang').textContent = toRholang(fromJSData(data));

      tool.getKey()
        .catch(oops => lose('get key', oops))
        .then((signingKey) => {
          const password = byId('password').value;
          const message = toByteArray(fromJSData(data));

          let sig = '';
          try {
            sig = tool.signMessage(message, signingKey, password);
          } catch (oops) {
            lose('sign data', oops);
          }
          byId('sig').value = sig;
          if (clientP) {
            clientP.resolve(sig);
          }
        });
      ev.preventDefault();
    });

    // ISSUE: ua.chrome vs. ua.browser
    ua.chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const port = ua.chrome.tabs.connect(tabs[0].id, { name: 'Rholang signing' });
      console.log('rhoSig created port:', port);

      port.postMessage({ offer: true });

      port.onMessage.addListener(({ payload }, callback) => {
        console.log('rhoSig got message on', port, payload);

        const par = fromJSData(payload);
        console.log('rhoSig', { par });
        byId('data').value = JSON.stringify(payload);
        byId('rholang').value = toRholang(par);

        // ISSUE: surely there's some deferred pattern or something for this.
        clientP = {
          resolve: (sig) => {
            callback({ success: true, signature: sig });
            clientP = null;
          },
          reject: (msg) => {
            callback({ success: false, message: msg });
            clientP = null;
          },
        };
      });
    });
  });
}
