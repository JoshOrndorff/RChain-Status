// @ts-check
/* global HTMLButtonElement, HTMLInputElement, HTMLTextAreaElement */

const { freeze } = Object;

const check = {
  notNull(x, context) {
    if (!x) {
      throw new Error(`null/undefined ${context}`);
    }
    return x;
  },

  /** @type { (elt: unknown) => HTMLButtonElement } */
  theButton(elt) {
    if (!(elt instanceof HTMLButtonElement)) { throw new Error('not Button'); }
    return elt;
  },

  /** @type { (elt: unknown) => HTMLInputElement } */
  theInput(elt) {
    if (!(elt instanceof HTMLInputElement)) { throw new Error('not input'); }
    return elt;
  },

  /** @type { (elt: unknown) => HTMLTextAreaElement } */
  theTextArea(elt) {
    if (!(elt instanceof HTMLTextAreaElement)) { throw new Error('not input'); }
    return elt;
  },
};


/**
 * @param {{
 *   getElementById: typeof document.getElementById,
 *   hide: (elt: Element) => void,
 *   showText: (elt: Element, txt: string) => void,
 *   enable: (b: HTMLButtonElement) => void,
 *   disable: (b: HTMLButtonElement) => void,
 *  }} dom
 * @param { typeof fetch } fetch
 */
export default function statusPage(dom, fetch) {
  const byId = dom.getElementById;

  const ui = freeze({
    nameBox: check.theInput(byId('name')),
    registerButton: byId('register'),
    newStatusBox: check.theInput(byId('new-status')),
    nonceBox: check.theInput(byId('nonce')),
    setStatusButton: byId('set-status'),
    friendBox: check.theInput(byId('friend-name')),
    checkButton: check.theButton(byId('check-status')),
    friendStatusP: byId('friend-status'),
    proposeButton: byId('propose'),
    problem: byId('problem'),
    signature: byId('signature'),
    anImg: byId('regAvatar'),
  });

  const getName = () => ui.nameBox.value;
  const friendName = () => ui.friendBox.value;
  let toSign;
  let operation;

  ui.registerButton.addEventListener('click', () => {
    toSign = getName();
    operation = 'register';
  });

  ui.setStatusButton.addEventListener('click', () => {
    toSign = [ui.newStatusBox.value, parseInt(ui.nonceBox.value, 10)];
    operation = 'post';
  });


  remoteAction(
    ui.checkButton,
    () => fetch(urlEncode`/users/${friendName()}/status`)
      .then((res) => {
        res.json().then(({ status }) => {
          dom.showText(ui.friendStatusP, status);
        });
        return res;
      }),
    () => `get status for ${friendName()}`,
  );

  function updateAvatar(name) {
    const src = `https://robohash.org/${name}?size=48x48&amp;set=set3`;
    ui.anImg.setAttribute('src', src);
    ui.anImg.hidden = false;
  }

  typingPause(ui.nameBox, updateAvatar, 500);

  /**
   * Attach remote action to button.
   * On click, disable the button, do the action, enable the button,
   * and, in case of error, show the message.
   * @param { HTMLButtonElement } button
   * @param { () => Promise<any> } action
   * @param { () => string } label
   */
  function remoteAction(button, action, label) {
    button.addEventListener('click', () => {
      console.log('remoteAction button pressed:', label);
      dom.disable(button);

      action()
        .then((res) => {
          console.log('remoteAction response was: ', label, res);
          if (res.ok) {
            dom.hide(ui.problem);
          } else {
            res.json().then((oops) => {
              dom.showText(ui.problem, `failed to ${label()}: ${oops.message}`);
            });
          }
          return res;
        })
        .catch(oops => dom.showText(ui.problem, oops.message))
        .then(_ => dom.enable(button));
    });
  }
}

/**
 * @param { HTMLInputElement } field
 * @param { (value: string) => void } go
 * @param { number } ms
 */
function typingPause(field, go, ms) {
  let timer;
  field.addEventListener('keyup', (_event) => {
    clearTimeout(timer);
    if (field.value) {
      timer = setTimeout(() => go(field.value), ms);
    }
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
