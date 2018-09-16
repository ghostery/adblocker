const WS_OPEN = 1;
const socket = new WebSocket('ws://localhost:3000');
let messages = [];


function sendMessageToCollector(message) {
  if (socket.readyState === WS_OPEN) {
    socket.send(JSON.stringify(message));
  } else {
    messages.push(message);
  }
}


socket.addEventListener('open', () => {
  messages.forEach(sendMessageToCollector);
  messages = [];
});


const tabs = new Map();

chrome.tabs.onCreated.addListener((tab) => {
  tabs.set(tab.id, tab.url);
});

chrome.tabs.onUpdated.addListener((_0, _1, tab) => {
  tabs.set(tab.id, tab.url);
});

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    let source;
    if (tabs.has(details.tabId)) {
      source = tabs.get(details.tabId);
    }

    sendMessageToCollector({
      ts: details.timeStamp,
      method: details.method,
      frameId: details.frameId,
      cpt: details.type,
      sourceUrl: source,
      url: details.url,
      body: details.requestBody,
    });
  },
  { urls: ['*://*/*'] },
  ['requestBody'],
);
