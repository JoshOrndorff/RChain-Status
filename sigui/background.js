chrome.runtime.onMessage.addListener(({ data }) => {
  console.log('rchain background got message:', data);
});
