export default function statusPage(ui, fetch, port) {
  const getName = () => ui.nameBox.value;
  const friendName = () => ui.friendBox.value;
  const THE_TOKEN = 'rchain.coop/6kbIdoB2';
  let toSign = null;

  ui.registerButton.addEventListener('click', () => {
    toSign = ['register', { name: getName() }];
    console.log('register:', { toSign });
  });

  port.onmessage((event) => {
    if (event.data.type !== THE_TOKEN) { return; }
    if (event.data.offer) {
      console.log('statusPage: got offer to sign:', { data: event.data, toSign });

      if (!toSign) { return; }

      console.log('register: sending', { toSign });
      port.postMessage({
        type: THE_TOKEN,
        payload: toSign,
      }, '*');
    } else if ('success' in event.data) {
      if (event.data.success) {
        ui.showText(ui.signature, event.data.signature);
      } else {
        ui.showText(ui.problem, event.data.message);
      }
    }
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
