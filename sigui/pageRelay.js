function listenForMessage() {
  // combination of rchain domain and `pwgen -1 -s`.
  const THE_TOKEN = 'rchain.coop/6kbIdoB2';

  window.addEventListener('message', (event) => {
    console.log('pageRelay got message:', event);

    if (event.source !== window) { return; }
    if (!event.data || !event.data.type || !event.data.type == THE_TOKEN ) { return; }
    chrome.runtime.sendMessage({ type: THE_TOKEN })
  });
}

listenForMessage();
