export default function statusPage(ui, fetch) {
  // ISSUE: UI should show registration in progress;
  // likewise other listeners.
  ui.registerButton.addEventListener('click', () => {
    console.log('register button pressed');

    /* eslint-disable no-param-reassign */
    ui.registerButton.disabled = true;

    const name = ui.nameBox.value;
    fetch(urlEncode`/users/${name}`, { method: 'POST' })
      .then((res) => {
        ui.registerButton.disabled = false;
        console.log('response was: ', res);
        if (!res.ok) {
          res.json().then(oops => showProblem(`failed to register ${name}: ${oops.message}`));
          return;
        }
        ui.problem.hidden = true;
      })
      .catch(oops => showProblem(oops.message));
  });

  function showProblem(message) {
    ui.registerButton.disabled = false;
    ui.problem.textContent = message;
    ui.problem.hidden = false;
  }

  ui.checkButton.addEventListener('click', () => {
    const userName = ui.friendBox.value;
    console.log('Checking status for ', userName);

    fetch(urlEncode`/users/${userName}/status`)
      .done((result) => {
        console.log('response was: ', result);
        ui.friendStatusP.textContent = result;
      });
  });


  ui.setStatusButton.addEventListener('click', () => {
    const newStatus = ui.newStatusBox.value;
    const userName = ui.nameBox.value;

    const url = urlEncode`/users/${userName}?status=${newStatus}`;
    console.log(url);

    fetch(url, { method: 'POST' })
      .done((result) => {
        console.log('response was: ', result);
      });
  });
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
