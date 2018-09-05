// @flow

/*::
import { type BusMessage, type BusReply, type BusPort } from './sigui/messageBus.js';
 */

const def = obj => Object.freeze(obj);
// combination of rchain domain and randomly chosen data.
const RCHAIN_SIGNING = 'rchain.coop/6kbIdoB2';


export default function statusPage(ui /*: any*/, port /*: BusPort */, fetch /*: typeof fetch*/) {
  const getName = () => ui.nameBox.value;
  const friendName = () => ui.friendBox.value;
  let toSign = null;

  // bus.attach(`${RCHAIN_SIGNING}/popup`, bus.makeProxy());

  /**
   * Get an offer to sign data.
   * @param objs - array of live objects
   * @param objs[0] - signer making the offer
   */
  function offer([signer]) {
    console.log('@@page got offer to sign by', signer);
    if (!toSign) { return; }
    signer.invoke('requestSignature', [], toSign)
      .then(({ signature }) => { ui.showText(ui.signature, signature); })
      .catch((problem) => { ui.showText(ui.problem, problem.message); });
  }

  let pending = null;
  port.listen((rx /*: BusMessage | BusReply */) => {

    // It's a bit of a fib that we only get BusMessage | BusReply
    if (!rx || !['invoke', 'success', 'failure'].includes(rx.kind)) { return false; }

    console.log('@@page got message', rx);
    if (rx.kind === 'invoke') {
      if (rx.target !== `${RCHAIN_SIGNING}/page`) { return false; }
      if (rx.method !== 'offer') { return false; }
      const signer = def({
        invoke: (verb, _refs, ...args) => {
          const msg /*: BusMessage*/ = {
            kind: 'invoke',
            target: `${RCHAIN_SIGNING}/popup`,
            method: verb,
            refs: [],
            args,
          };
          const todo = new Promise((resolve, reject) => {
            pending = { resolve, reject };
          });
          console.log('@@page signer invoke sending', msg);
          port.postMessage(msg);
          return todo;
        },
      });
      offer([signer]);
    } else if (pending) {
      if (rx.kind === 'success') {
        console.log('@@page resolving signature promise.');
        pending.resolve({ signature: rx.result }); //@@@@
      } else {
        console.log('@@page rejecting signature promise.');
        pending.reject(new Error(rx.message));
      }
    }
    return true;
  });

  ui.registerButton.addEventListener('click', () => {
    toSign = ['register', { name: getName() }];
    console.log('register:', { toSign });
  });

  /*@@@@
  remoteAction(
    ui.registerButton,
    () => fetch(urlEncode`/users/${getName()}`, { method: 'POST' }),
    () => `register ${getName()}`,
  );
  */

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

  remoteAction(
    ui.setStatusButton,
    () => fetch(
      urlEncode`/users/${getName()}/status?status=${ui.newStatusBox.value}`,
      { method: 'POST' },
    ),
    () => `set status for ${getName()}`,
  );

  /**
   * Attach remote action to button.
   * On click, disable the button, do the action, enable the button,
   * and, in case of error, show the message.
   */
  function remoteAction(button, action, label) {
    button.addEventListener('click', () => {
      console.log(`${label()} button pressed`);
      ui.disable(button);

      action()
        .then((res) => {
          console.log('response was: ', res);
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


function urlEncode(template, ...subs) {
  const encoded = subs.map(encodeURIComponent);

  const out = [];
  template.forEach((part, ix) => {
    out.push(part);
    out.push(encoded[ix]);
  });

  return out.join('');
}
