// @flow

/*::
import {
  type BusPort,
  type BusMessage,
  type BusReply,
  type BusTarget,
  type FarRef,
} from './sigui/messageBus.js';
 */

import { fromJSData, toRholang } from './sigui/RHOCore.js';

const def = Object.freeze;

// combination of rchain domain and randomly chosen data.
const RCHAIN_SIGNING = 'rchain.coop/6kbIdoB2';


export default function statusPage(ui /*: any*/, port /*: BusPort */, fetch /*: typeof fetch*/) {
  const getName = () => ui.nameBox.value;
  const friendName = () => ui.friendBox.value;
  let toSign = null;
  let operation = null;

  // bus.attach(`${RCHAIN_SIGNING}/popup`, bus.makeProxy());

  /**
   * Get an offer to sign data.
   * @param objs - array of live objects
   * @param objs[0] - signer making the offer
   */
  function offer([signer]) {
    if (!toSign) { return; }
    console.log('page requesting signature of', toSign);
    signer.invoke('requestSignature', [], toSign)
      .then(({ signature, pubKey }) => {
        //const withSig = {"register": [getName(), pubKey, signature, "bogusReturnChan"]}//[].concat(toSign, [{ signature, pubKey }]);

        if (operation === "register"){
          // TODO make this better and move it to main.js
          const rholangCode = `@"register"!(${JSON.stringify(getName())}, "${signature}", "${pubKey}", "bogusReturn")`
          ui.signature.value = rholangCode;
          fetch(urlEncode`/users/${getName()}?code=${rholangCode}`, { method: 'POST' })
        }
        else if (operation == "post"){
          fetch(urlEncode`/users/${getName()}/status?status=${ui.newStatusBox.value}&signature=${signature}`, { method: 'POST' })
        }
        else{
          throw new TypeError("in offer. operation was neither register nor post");
        }
      })
      .catch((problem) => { ui.showText(ui.problem, problem.message); });
  }

  const pending = [];
  const signer = makeProxy(`${RCHAIN_SIGNING}/popup`, port, pending);
  const byTarget = new Map([[`${RCHAIN_SIGNING}/popup`, signer]]);
  const self = publish(`${RCHAIN_SIGNING}/page`, def({ offer }), byTarget);

  port.listen((rx /*: BusMessage | BusReply */) => {
    // It's a bit of a fib that we only get BusMessage | BusReply
    if (!rx || !['invoke', 'success', 'failure'].includes(rx.kind)) { return false; }

    // console.log('page got bus message', rx);
    if (rx.kind === 'invoke') {
      return self.receive(rx);
    }

    if (pending) {
      if (rx.kind === 'success') {
        pending[0].resolve(rx.result);
      } else {
        pending[0].reject(new Error(rx.message));
      }
      pending.pop();
      return true;
    }

    return false;
  });

  ui.registerButton.addEventListener('click', () => {
    if (ui.registerSign.checked) {
      toSign = getName();
      operation = "register";
    }
    else {
      // Insecure register
      fetch(urlEncode`/users/${getName()}`, { method: 'POST' });
      // TODO make the button busy
      // TODO report status
    }
  });

  ui.setStatusButton.addEventListener('click', () => {
    if (ui.statusSign.checked) {
      toSign = [ui.newStatusBox.value, parseInt(ui.nonceBox.value, 10)];
      operation = "post";
    }
    else {
      // Insecure post
      fetch(
        urlEncode`/users/${getName()}/status?status=${ui.newStatusBox.value}`,
        { method: 'POST' },
      );
    }
  });


  remoteAction(
    ui.checkButton,
    () => fetch(urlEncode`/users/${friendName()}/status`)
      .then((res) => {
        res.json().then(({ status }) => {
          ui.showText(ui.friendStatusP, status);
        });
        return res;
      }),
    () => `get status for ${friendName()}`,
  );


  /**
   * Attach remote action to button.
   * On click, disable the button, do the action, enable the button,
   * and, in case of error, show the message.
   */
  function remoteAction(button, action, label) {
    button.addEventListener('click', () => {
      console.log('remoteAction button pressed:', label);
      ui.disable(button);

      action()
        .then((res) => {
          console.log('remoteAction response was: ', label, res);
          if (res.ok) {
            ui.hide(ui.problem);
          } else {
            res.json().then((oops) => {
              ui.showText(ui.problem, `failed to ${label()}: ${oops.message}`);
            });
          }
          return res;
        })
        .catch(oops => ui.showText(ui.problem, oops.message))
        .finally(_ => ui.enable(button));
    });
  }
}


// ISSUE: publish and makeProxy belong in messageBus.js
// but that means exporting them, which means fleshing out type annotations,
// and I'd rather not take time for that just now.
function publish(name, obj, byTarget) /*: BusTarget */{
  function receive({ target, method, refs, args } /*: BusMessage*/) {
    if (target !== name) { return false; }
    if (!(method in obj)) { return false; }
    const locals = refs.map(ref => byTarget.get(ref));
    console.log(`published ${name} receved call:`, method, locals, args);
    obj[method](locals, ...args);
    return true;
  }
  return def({ receive });
}


function makeProxy(target, port, pending) /*: FarRef */{
  function invoke(method, refs, ...args) {
    if (refs.length > 0) {
      throw new TypeError('not implemented: proxy with Refs');
    }

    const msg /*: BusMessage*/ = { target, method, args, refs: [], kind: 'invoke' };
    const todo = new Promise((resolve, reject) => {
      pending.push({ resolve, reject });
    });
    console.log(`proxy ${target} invoke sending`, msg);
    port.postMessage(msg);
    return todo;
  }
  return def({ invoke });
}


function urlEncode(template, ...subs) {
  const encoded = subs.map(encodeURIComponent);

  const out = [];
  template.forEach((part, ix) => {
    out.push(part);
    out.push(encoded[ix]);
  });

  return out.join('');
}
