/* eslint-disable import/extensions */

import { fromJSData, toByteArray, toRholang } from './RHOCore.js';

import { sigTool, localStorage, uiParts } from './sigTool.js';


export default function popup(document, ua, nacl) {
  const byId = id => document.getElementById(id);
  const { showPubKey, lose } = uiParts(byId);

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
        });
      ev.preventDefault();
    });
  });
}
