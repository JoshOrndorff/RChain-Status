// inspired by EIP 1102: Opt-in provider access
// https://eips.ethereum.org/EIPS/eip-1102
// https://github.com/MetaMask/metamask-extension/pull/4703
function startRelay(document, window, chrome) {
  const byId = id => document.getElementById(id);

  // combination of rchain domain and randomly chosen data.
  const THE_TOKEN = 'rchain.coop/6kbIdoB2';
  let signingPort = null;
  console.log('startRelay: initially no port.');

  chrome.runtime.onConnect.addListener((port) => {
    console.log('pageRelay port connected', port);
    signingPort = port;

    port.onMessage.addListener((msg) => {
      if (msg.offer) {
        console.log('pageRelay: relaying offer to sign:', { msg, origin: window.origin });
        window.postMessage({ type: THE_TOKEN, offer: true }, window.origin);
      }
    });
  });

  // @return true if event is handled.
  window.addEventListener('message', (event) => {
    if (event.source !== window) { return false; }
    if (!event.data || !event.data.type || !event.data.type === THE_TOKEN) { return false; }
    if (!event.data.payload) {
      console.log('pageRelay: not a request to sign:', event.data);
      return false;
    }

    function lose(message) {
      byId(event.data.errorId).textContent = message;
      return null;
    }

    console.log('pageRelay got THE_TOKEN', event.data);
    if (!signingPort) {
      return lose('no port; install and open RChain signer?');
    }

    console.log('pageRelay requesting signature of', event.data.payload, signingPort);
    signingPort.postMessage(
      { payload: event.data.payload },
      ({ status, signature, message }) => {
        console.log('pageRelay reponse:', { status, signature });
        if (!status) {
          return lose(message) || true;
        }
        byId(event.data.signatureId).textContent = signature;
        return signature;
      },
    );

    return true;
  });
}

startRelay(document, window, chrome);
