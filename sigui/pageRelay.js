// inspired by EIP 1102: Opt-in provider access
// https://eips.ethereum.org/EIPS/eip-1102
// https://github.com/MetaMask/metamask-extension/pull/4703

const def = obj => Object.freeze(obj);

// combination of rchain domain and randomly chosen data.
const RCHAIN_SIGNING = 'rchain.coop/6kbIdoB2';

function startRelay(document, window, chrome) {
  let pageClient = null;
  let signer = null;

  console.log('startRelay: initially no signer proxy.');

  chrome.runtime.onConnect.addListener((popupPort) => {
    console.log('pageRelay port connected', popupPort);
    pageClient = oneWayTarget(`${RCHAIN_SIGNING}/page`, window);
    let count = 0;
    popupPort.onMessage.addListener((msg) => {
      console.log('pageRelay popupPort message', count++);
      if (msg.target === `${RCHAIN_SIGNING}/page`) {
        pageClient.receive(msg);
      }
    });
    signer = crossBusForwarder(`${RCHAIN_SIGNING}/popup`, popupPort, window);
  });

  window.addEventListener('message', (event) => {
    if (event.data.target !== `${RCHAIN_SIGNING}/popup`) { return false; }
    if (!signer) { return true; }
    signer.receive(event.data);
    return true;
  });
}


function crossBusForwarder(targetId, targetPort, srcPort) {
  let count = 0;

  function receive({ method, refs, args }) {
    let replyChan = new MessageChannel();
    if (refs.length !== 0) {
      throw new Error('not implemented: forwarding refs');
    }
    targetPort.postMessage({ target: targetId, method, args, refs: [] }, '*', [replyChan.port2]);
    console.log('crossBus receive fwd', targetId, { method, refs, args });

    replyChan.port1.onmessage = (event) => {
      srcPort.postMessage(event.data, '*');
      console.log('crossBus replyChan', count++, targetId, event.data.target, event.data.method, event.data.inReplyTo);
      // ISSUE: garbage collect the channel?
      replyChan = null;
    };
    return Promise.reject(new Error('only src gets to see result'));
  }

  return def({ receive });
}

function oneWayTarget(targetId, port) {
  function receive({ method, refs, args }) {
    port.postMessage({ target: targetId, method, refs, args }, '*');
    console.log('oneWayTarget sent to', targetId, method);
    return Promise.resolve(null);
  }
  return def({ receive });
}


startRelay(document, window, chrome); // eslint-disable-line no-undef
