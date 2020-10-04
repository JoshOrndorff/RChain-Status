import statusPage from './page.js';

window.addEventListener('DOMContentLoaded', () => {
  statusPage(
    {
      getElementById: (id) => document.getElementById(id),
      hide: (elt) => {
        elt.hidden = false;
      },
      showText: (elt, txt) => {
        elt.textContent = txt;
        elt.hidden = false;
      },
      enable: (button) => {
        button.disabled = false;
      },
      disable: (button) => {
        button.disabled = true;
      },
    },
    { fetch },
  );
});
