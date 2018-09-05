// inspired by EIP 1102: Opt-in provider access
// https://eips.ethereum.org/EIPS/eip-1102
// https://github.com/MetaMask/metamask-extension/pull/4703

// @flow

/*::
import { type BusTarget, type BusMessage, type BusReply, type BusPort } from './messageBus.js';
*/

// combination of rchain domain and randomly chosen data.
const RCHAIN_SIGNING = 'rchain.coop/6kbIdoB2';

function startRelay(runtime /*: typeof chrome.runtime*/, pgPort /*: BusPort*/) {
  console.log('startRelay...');

  runtime.onMessage.addListener((maybeMsg, _sender, _sendResponse) => {
    const msg = maybeMsg || {};
    if (msg.target !== `${RCHAIN_SIGNING}/page`) { return; }
    pgPort.postMessage({
      kind: 'invoke',
      target: msg.target,
      method: msg.method || '',
      refs: msg.refs || [],
      args: msg.args || [],
    });
    // issue: how to handle replies?
  });

  pgPort.listen((msg /*: BusMessage | BusReply*/) => {
    if (msg.kind !== 'invoke') { return false; }
    if (msg.target !== `${RCHAIN_SIGNING}/popup`) { return false; }
    runtime.sendMessage(msg, (response) => {
      pgPort.postMessage(response);
    });
    return true;
  });
}


/* eslint-disable no-undef*/
startRelay(chrome.runtime, {
  postMessage: msg => window.postMessage(msg, '*'),
  listen: cb => window.addEventListener('message', cb),
});
