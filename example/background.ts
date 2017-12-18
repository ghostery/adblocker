import * as adblocker from '../index';

function fetchResources() {
  return fetch(
    'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resources.txt',
  ).then(r => r.text());
}

function fetchLists() {
  return Promise.all([
    'https://easylist.to/easylist/easylist.txt',
    'https://easylist.to/easylist/easyprivacy.txt',
    'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/annoyances.txt',
    'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/badware.txt',
    'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/filters.txt',
    'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/privacy.txt',
    'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resource-abuse.txt',
    'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/unbreak.txt',
  ].map(url => fetch(url))).then(rs => Promise.all(rs.map(r => r.text())));
}

function loadAdblocker() {
  const engine = new adblocker.FiltersEngine({
    loadCosmeticFilters: true,
    loadNetworkFilters: true,
    optimizeAOT: false,
    version: 1,
  });

  return Promise.all([
    fetchLists(),
    fetchResources(),
  ]).then(([responses, resources]) => {
    const lists: Array<{ filters: string, checksum: string, asset: string }> = [];
    for (let i = 0; i < responses.length; i += 1) {
      lists.push({
        asset: '' + i,
        checksum: '',
        filters: responses[i],
      });
    }

    console.log(lists.length);

    engine.onUpdateResource([{ filters: resources, checksum: '' }]);
    engine.onUpdateFilters(lists, new Set());

    return engine;
  });
}

const tabs = new Map();

chrome.tabs.onCreated.addListener((tab) => {
  tabs.set(tab.id, tab.url);
});

chrome.tabs.onUpdated.addListener((_0, _1, tab) => {
  tabs.set(tab.id, tab.url);
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
    const source = tabs.get(details.tabId);
    const result = engine.match({
      cpt: types[details.type],
      sourceUrl: source,
      url: details.url,
    });

    if (result.redirect) {
      console.log('REDIRECT', details.url, result);
      return { redirectUrl: result.redirect };
    } else if (result.match) {
      console.log('BLOCKING', details.url, result);
      return { cancel: true };
    }

    return {};
  }

  chrome.webRequest.onBeforeRequest.addListener(
    listener,
    {
      urls: [
        '*://*/*',
      ],
    },
    ['blocking'],
  );
});
