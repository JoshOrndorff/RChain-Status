import messageBus from './sigui/messageBus.js';

const def = obj => Object.freeze(obj);
// combination of rchain domain and randomly chosen data.
const RCHAIN_SIGNING = 'rchain.coop/6kbIdoB2';


export default function statusPage(ui, port, fetch) {
  const getName = () => ui.nameBox.value;
  const friendName = () => ui.friendBox.value;
  let toSign = null;

  const bus = messageBus(port, 'statusPage');
  // bus.attach(`${RCHAIN_SIGNING}/popup`, bus.makeProxy());

  /**
   * Get an offer to sign data.
   * @param objs - array of live objects
   * @param objs[0] - signer making the offer
   */
  function offer([signer]) {
    if (!toSign) { return; }
    signer.invoke('requestSignature', [], toSign)
      .then(({ signature, pubKey }) => { ui.showText(ui.signature, signature); })
      .catch((problem) => { ui.showText(ui.problem, problem.message); });
  }
  bus.attach(`${RCHAIN_SIGNING}/page`, bus.fromNear(def({ offer })));

  port.onmessage((event) => {
    bus.receive(event.data);
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
