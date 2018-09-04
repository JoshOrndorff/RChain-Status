/* eslint-disable import/extensions */

import { fromJSData, toByteArray, toRholang } from './RHOCore.js';

import { sigTool, localStorage, uiParts } from './sigTool.js';


export default function popup(document, ua, nacl) {
  const byId = id => document.getElementById(id);
  const { showPubKey } = uiParts(byId);
  let relayPort = null;

  function lose(doing, exc) {
    const message = `failed ${doing}: ${exc.message}`;
    byId('status').textContent = message;
    if (relayPort) {
      relayPort.postMessage({ message, success: false });
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
          if (relayPort) {
            relayPort.postMessage({ success: true, signature: sig });
          }
        });
      ev.preventDefault();
    });

    // ISSUE: ua.chrome vs. ua.browser
    ua.chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      relayPort = ua.chrome.tabs.connect(tabs[0].id, { name: 'Rholang signing' });
      console.log('rhoSig created port:', relayPort);

      relayPort.postMessage({ offer: true });

      relayPort.onMessage.addListener(({ payload }) => {
        console.log('rhoSig got message on', relayPort, payload);

        const par = fromJSData(payload);
        console.log('rhoSig', { par });
        byId('data').value = JSON.stringify(payload);
        byId('rholang').value = toRholang(par);
      });
    });
  });
}
