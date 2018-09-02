export default function statusPage(ui, fetch) {
  const getName = () => ui.nameBox.value;

  remoteAction(
    ui.registerButton,
    () => fetch(urlEncode`/users/${getName()}`, { method: 'POST' }),
    () => `register ${getName()}`,
  );

  remoteAction(
    ui.checkButton,
    () => fetch(urlEncode`/users/${getName()}/status`),
    () => `get status for ${getName()}`,
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
      /* eslint-disable no-param-reassign */
      button.disabled = true;

      action()
        .then((res) => {
          button.disabled = false;
          console.log('response was: ', res);
          if (!res.ok) {
            res.json().then(oops => showProblem(`failed to ${label()}: ${oops.message}`));
            return res;
          }
          ui.problem.hidden = true;
          return res;
        })
        .catch(oops => showProblem(oops.message));
    });

    function showProblem(message) {
      button.disabled = false;
      ui.problem.textContent = message;
      ui.problem.hidden = false;
    }
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
