// combination of rchain domain and randomly chosen data.
const THE_TOKEN = 'rchain.coop/6kbIdoB2';

chrome.runtime.onMessage.addListener((data, sender, sendResponse) => {
  console.log('rchain bg got message:', data);
  if (!(data && data.type && data.type === THE_TOKEN)) { return; }
  console.log(`got ${THE_TOKEN}`);
  sendResponse({ success: true });
});
