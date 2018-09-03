/**
 * @param ext ref [compat][1]
 * @param ext.chrome
 *
 * [1]: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Chrome_incompatibilities
 */
export default function popup(document, { chrome, browser }) {
  const byId = id => document.getElementById(id);
  const noop = promise => promise;

  document.addEventListener('DOMContentLoaded', () => {
    sigTool(
      byId,
      browser ? browser.storage.local : chrome.storage.local,
      browser ? noop : asPromise,
    );
  });
}

function sigTool(byId, local, adapt) {
  /* Assigning to params is the norm for DOM stuff. */
  /* eslint-disable no-param-reassign */

  function save({ label, sekret }) {
    adapt(callback => local.set({ [label]: sekret }, callback))
      .then(() => {
        console.log('saved:', { [label]: sekret });
        byId('status').textContent = JSON.stringify({ [label]: sekret });
      })
      .catch((oops) => { console.log(oops); });
  }

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
