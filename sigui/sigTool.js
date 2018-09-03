/* global btoa, unescape, encodeURIComponent */

/**
 * @param ext ref [compat][1]
 * @param ext.chrome
 *
 * [1]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Chrome_incompatibilities
 */
export default function popup(document, { chrome, browser }, nacl) {
  const byId = id => document.getElementById(id);

  const localStorage = browser ? browser.storage.local : {
    set: items => asPromise(chrome, callback => chrome.storage.local.set(items, callback)),
    get: key => asPromise(chrome, callback => chrome.storage.local.get(key, callback)),
  };

  document.addEventListener('DOMContentLoaded', () => {
    sigTool(byId, localStorage, nacl);
  });
}


function sigTool(byId, local, nacl) {
  /* Assigning to params is the norm for DOM stuff. */
  /* eslint-disable no-param-reassign */

  function getFormData() {
    return {
      label: byId('label').value,
      password: byId('password').value,
    };
  }

  function showPubKey(signingKey) {
    byId('label').value = signingKey.label;
    byId('pubKey').value = signingKey.pubKey;
  }

  byId('save').addEventListener('click', (ev) => {
    byId('status').textContent = '';
    const signingKey = generate(getFormData(), nacl);
    showPubKey(signingKey);
    local.set({ signingKey })
      .catch((oops) => {
        byId('status').textContent = `failed to save key: ${oops.message}`;
        console.log(oops);
      });

    ev.preventDefault();
  });

  local.get('signingKey')
    .then(item => showPubKey(item.signingKey))
    .catch((oops) => { console.log('failed to get signingKey:', oops); });
}


function generate({ label, password }, nacl) {
  const utf8 = s => Uint8Array.from(unescape(encodeURIComponent(s)));
  const storeKey = nacl.hash(utf8(password)).slice(0, nacl.secretbox.keyLength);
  const nonce = nacl.randomBytes(nacl.secretbox.nonceLength);
  const newKeyPair = nacl.sign.keyPair();
  const encryptedKey = nacl.secretbox(newKeyPair.secretKey, nonce, storeKey);

  return {
    label,
    nonce: btoa(nonce),
    encryptedKey: btoa(encryptedKey),
    pubKey: btoa(newKeyPair.publicKey),
  };
}

/**
 * Adapt callback-style API using Promises.
 *
 * Instead of obj.method(...arg, callback),
 * use send(cb => obj.method(...arg, cb)) and get a promise.
 *
 * ref https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Chrome_incompatibilities
 * https://github.com/mdn/webextensions-examples/issues/194
 *
 * @param calling: a function of the form (cb) => o.m(..., cb)
 * @return A promise for the result passed to cb
 */
function asPromise(chrome, calling) {
  function executor(resolve, reject) {
    function callback(result) {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
        return;
      }
      resolve(result);
    }

    calling(callback);
  }

  return new Promise(executor);
}
