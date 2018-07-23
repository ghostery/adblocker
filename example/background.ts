import * as adblocker from '../index';

/**
 * Initialize the adblocker using lists of filters and resources. It returns a
 * Promise resolving on the `Engine` that we will use to decide what requests
 * should be blocked or altered.
 */
function loadAdblocker() {
  const engine = new adblocker.FiltersEngine({
    loadCosmeticFilters: true,
    loadNetworkFilters: true,
    optimizeAOT: false,
    version: 1,
  });

  return Promise.all([
    adblocker.fetchLists(),
    adblocker.fetchResources(),
  ]).then(([responses, resources]) => {
    const lists: Array<{ filters: string, checksum: string, asset: string }> = [];
    for (let i = 0; i < responses.length; i += 1) {
      lists.push({
        asset: '' + i,
        checksum: '',
        filters: responses[i],
      });
    }

    engine.onUpdateResource([{ filters: resources, checksum: '' }]);
    engine.onUpdateFilters(lists, new Set());

    return engine;
  });
}

/**
 * Because the WebRequest API does not give us access to the URL of the page
 * each request comes from (but we know from which tab they originate), we need
 * to independently keep a mapping from tab ids to source URLs. This information
 * is needed by the adblocker (some filters only apply on specific domains).
 */
const tabs = new Map();

function resetState(tabId, source) {
  tabs.set(tabId, { source, count: 0 });
}

function updateBadgeCount(tabId) {
  if (tabs.has(tabId)) {
    const { count } = tabs.get(tabId);
    chrome.browserAction.setBadgeText({ text: '' + count });
  }
}

function incrementBlockedCounter(tabId) {
  if (tabs.has(tabId)) {
    const tabStats = tabs.get(tabId);
    tabStats.count += 1;
    updateBadgeCount(tabId);
  }
}

chrome.tabs.onCreated.addListener((tab) => {
  resetState(tab.id, tab.url);
  updateBadgeCount(tab.id);
});

chrome.tabs.onUpdated.addListener((_0, _1, tab) => {
  if (tabs.has(tab.id)) {
    const { source } = tabs.get(tab.id);
    if (source !== tab.url) {
      resetState(tab.id, tab.url);
      updateBadgeCount(tab.id);
    }
  }
});

chrome.tabs.onActivated.addListener(({ tabId }) => {
  updateBadgeCount(tabId);
});

const types = {
  // maps string (web-ext) to int (FF cpt)
  beacon: 19,
  csp_report: 17,
  font: 14,
  image: 3,
  imageset: 21,
  main_frame: 6,
  media: 15,
  object: 5,
  object_subrequest: 12,
  other: 1,
  ping: 10,
  script: 2,
  stylesheet: 4,
  sub_frame: 7,
  web_manifest: 22,
  websocket: 16,
  xbl: 9,
  xml_dtd: 13,
  xmlhttprequest: 11,
  xslt: 18,
};

loadAdblocker().then((engine) => {
  function listener(details) {
    let source;
    if (tabs.has(details.tabId)) {
      source = tabs.get(details.tabId).source;
    }
    const result = engine.match({
      cpt: types[details.type],
      sourceUrl: source,
      url: details.url,
    });

    if (result.redirect) {
      incrementBlockedCounter(details.tabId);
      return { redirectUrl: result.redirect };
    } else if (result.match) {
      incrementBlockedCounter(details.tabId);
      return { cancel: true };
    }

    return {};
  }

  // Start listening to requests, and allow 'blocking' so that we can cancel
  // some of them (or redirect).
  chrome.webRequest.onBeforeRequest.addListener(
    listener,
    {
      urls: [
        '*://*/*',
      ],
    },
    ['blocking'],
  );

  // Start listening to messages coming from the content-script
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    // Extract hostname from sender's URL
    const url = sender.url;
    let hostname = '';
    if (url !== undefined) {
      hostname = (new URL(url)).hostname;
    }

    // Answer to content-script with a list of nodes
    if (msg.action === 'getCosmeticsForDomain') {
      sendResponse(engine.getDomainFilters(hostname));
    } else if (msg.action === 'getCosmeticsForNodes') {
      sendResponse(engine.getCosmeticsFilters(hostname, msg.args[0]));
    }
  });
});
