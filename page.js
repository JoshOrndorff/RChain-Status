export default function statusPage(ui, fetch) {
  // ISSUE: UI should show registration in progress;
  // likewise other listeners.
  ui.registerButton.addEventListener('click', () => {
    console.log('register button pressed');

    // ISSUE: URLs should be nouns, not verbs
    // likewise /set, /check below
    fetch(urlEncode`/register?name=${ui.nameBox.value}`, { method: 'POST' })
      .done((res) => {
        console.log('response was: ', res);
      });
  });


  ui.checkButton.addEventListener('click', () => {
    const userName = ui.friendBox.value;
    console.log('Checking status for ', userName);

    // ISSUE: should be GET
    fetch(urlEncode`/check?name=${userName}`, { method: 'POST' })
      .done((result) => {
        console.log('response was: ', result);
        ui.friendStatusP.textContent = result; // eslint-disable-line no-param-reassign
      });
  });


  ui.setStatusButton.addEventListener('click', () => {
    const newStatus = ui.newStatusBox.value;
    const userName = ui.nameBox.value;

    const url = urlEncode`/set?name=${userName}&status=${newStatus}`;
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
