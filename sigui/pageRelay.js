// inspired by EIP 1102: Opt-in provider access
// https://eips.ethereum.org/EIPS/eip-1102
// https://github.com/MetaMask/metamask-extension/pull/4703

// @flow

const def = Object.freeze;

/*::
import { type BusTarget, type BusMessage, type BusReply, type BusPort } from './messageBus.js';
*/

// combination of rchain domain and randomly chosen data.
const RCHAIN_SIGNING = 'rchain.coop/6kbIdoB2';

function startRelay(runtime /*: typeof chrome.runtime*/, pgPort /*: BusPort*/) {
  console.log('startRelay...');

  const toPage = oneWayForwarder(`${RCHAIN_SIGNING}/page`, pgPort);

  // ISSUE: Callback declaration for runtime.onMessage in flow-interfaces-chrome
  // isn't right.
  const { onMessage } = (runtime /*:any*/);
  onMessage.addListener((msg, _sender, _sendResponse) => {
    toPage.receive(msg);
  });

  const toPopup = callbackForwarder(`${RCHAIN_SIGNING}/popup`, runtime, pgPort);
  pgPort.listen((msg /*: BusMessage | BusReply*/) => {
    if (msg.kind !== 'invoke') { return false; }
    return toPopup.receive(msg);
  });
}


// ISSUE: belongs in messageBus.js?
function callbackForwarder(name, destPort, srcPort) {
  function receive(msg) {
    if (msg.target !== name) { return false; }
    console.log('forwarder sending to runtime', msg);
    destPort.sendMessage(msg, (response) => {
      console.log('forwarder forwarding reply from runtime', response);
      srcPort.postMessage(response);
    });
    return true;
  }
  return def({ receive });
}


// ISSUE: belongs in messageBus.js?
function oneWayForwarder(name, port) {
  function receive(maybeMsg) {
    const msg = maybeMsg || {};
    if (msg.target !== name) { return; }

    const pgInvoke /*: BusMessage */ = {
      kind: 'invoke',
      target: msg.target,
      method: msg.method || '',
      refs: msg.refs || [],
      args: msg.args || [],
    };

    console.log('pageRelay relaying', pgInvoke.method, pgInvoke);
    port.postMessage(pgInvoke);
  }

  return def({ receive });
}


/* eslint-disable no-undef*/
startRelay(chrome.runtime, {
  postMessage: msg => window.postMessage(msg, '*'),
  listen: cb => window.addEventListener('message', event => cb(event.data)),
});
