/* global unescape, encodeURIComponent */

const def = obj => Object.freeze(obj);
const utf8 = s => Uint8Array.from(unescape(encodeURIComponent(s)));


export function options(document, ua, nacl) {
  const byId = id => document.getElementById(id);
  const { showPubKey, lose } = uiParts(byId);

  document.addEventListener('DOMContentLoaded', () => {
    const tool = sigTool(localStorage(ua), nacl);
    tool.getKey()
      .then(showPubKey)
      .catch(oops => lose('get key', oops));

    byId('save').addEventListener('click', (ev) => {
      byId('status').textContent = '';

      tool.generate({
        label: byId('label').value,
        password: byId('password').value,
      })
        .then(showPubKey)
        .catch(oops => lose('generate key', oops));
      ev.preventDefault();
    });
  });
}


function uiParts(byId) {
  /* Assigning to params is the norm for DOM stuff. */
  /* eslint-disable no-param-reassign */

  function showPubKey({ label, pubKey }) {
    byId('label').value = label;
    byId('pubKey').value = pubKey;
  }

  function lose(doing, exc) {
    byId('status').textContent = `failed ${doing}: ${exc.message}`;
    console.log(exc);
  }

  return def({ showPubKey, lose });
}


/**
 * @param ext ref [compat][1]
 * @param ext.chrome
 *
 * [1]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Chrome_incompatibilities
 */
function localStorage({ browser, chrome }) {
  return browser ? browser.storage.local : def({
    set: items => asPromise(chrome, callback => chrome.storage.local.set(items, callback)),
    get: key => asPromise(chrome, callback => chrome.storage.local.get(key, callback)),
  });
}


export function popup(document, ua, nacl) {
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
      tool.getKey()
        .catch(oops => lose('get key', oops))
        .then((signingKey) => {
          const password = byId('password').value;
          let sig = '';
          try {
            sig = tool.signData(data, signingKey, password);
          } catch (oops) {
            lose('sign data', oops);
          }
          byId('sig').value = sig;
        });
      ev.preventDefault();
    });
  });
}


function sigTool(local, nacl) {
  function getKey() {
    return local.get('signingKey').then(({ signingKey }) => signingKey);
  }

  function generate({ label, password }) {
    const signingKey = encryptedKey(nacl.sign.keyPair(), { label, password });
    return local.set({ signingKey }).then(() => signingKey);
  }

  function encryptedKey(keyPair, { label, password }) {
    const sk = encryptWithNonce(keyPair.secretKey, passKey(password));

    return {
      label,
      secretKey: {
        nonce: b2h(sk.nonce),
        cipherText: b2h(sk.cipherText),
      },
      pubKey: b2h(keyPair.publicKey),
    };
  }

  /**
   * Hash text password to get bytes for secretbox key.
   */
  function passKey(password) {
    return nacl.hash(utf8(password)).slice(0, nacl.secretbox.keyLength);
  }

  function encryptWithNonce(message, key) {
    const nonce = nacl.randomBytes(nacl.secretbox.nonceLength);
    const cipherText = nacl.secretbox(message, nonce, key);
    return { cipherText, nonce };
  }

  function signData(data, signingKey, password) {
    const nonce = h2b(signingKey.secretKey.nonce);
    const box = h2b(signingKey.secretKey.cipherText);
    const secretKey = nacl.secretbox.open(box, nonce, passKey(password));

    if (!secretKey) {
      throw new Error('bad password');
    }

    const message = utf8(JSON.stringify(data));
    return b2h(nacl.sign.detached(message, secretKey));
  }

  return def({ getKey, generate, signData });
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


// ack: https://gist.github.com/tauzen/3d18825ae41ff3fc8981
function b2h(uint8arr) {
  if (!uint8arr) {
    return '';
  }

  let hexStr = '';
  for (let i = 0; i < uint8arr.length; i += 1) {
    let hex = (uint8arr[i] & 0xff).toString(16); // eslint-disable-line no-bitwise
    hex = (hex.length === 1) ? `0${hex}` : hex;
    hexStr += hex;
  }

  return hexStr;
}


function h2b(str) {
  if (!str) {
    return new Uint8Array();
  }

  const a = [];
  for (let i = 0, len = str.length; i < len; i += 2) {
    a.push(parseInt(str.substr(i, 2), 16));
  }

  return new Uint8Array(a);
}
