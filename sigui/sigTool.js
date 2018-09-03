function sigTool(document, local) {
  const byId = id => document.getElementById(id);

  function save({ label, sekret }) {
    asPromise(callback => local.set({ [label]: sekret }, callback))
      .then(() => {
        console.log('saved:', { [label]: sekret });
        byId('status').textContent = JSON.stringify({ [label]: sekret });
      })
      .catch((oops) => { console.log(oops); });
  }

  function loaded() {
    function getFormData() {
      return {
        label: byId('label').value,
        sekret: byId('sekret').value,
      };
    }

    byId('save').addEventListener('click', (ev) => {
      save(getFormData());
      ev.preventDefault();
    });
  }

  document.addEventListener('DOMContentLoaded', loaded);
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
function asPromise(calling) {
  function executor(resolve, reject) {
    const callback = (err, result) => {
      if (err) {
        reject(err);
      }
      resolve(result);
    };

    calling(callback);
  }

  return new Promise(executor);
}


/** ISSUE: ambient
I'd much rather pass this authority explicitly from tool.html, adding

  "content_security_policy": "script-src 'sha256-xbIV...='; object-src 'self'",

I get:

  ReferenceError: browser is not defined
*/
sigTool(document, chrome.storage.local);
