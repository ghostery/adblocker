/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { fetchLists, fetchResources, WebExtensionBlocker } from '../adblocker';

/**
 * Initialize the adblocker using lists of filters and resources. It returns a
 * Promise resolving on the `Engine` that we will use to decide what requests
 * should be blocked or altered.
 */
function loadAdblocker() {
  console.log('Fetching resources...');
  return Promise.all([fetchLists(), fetchResources()]).then(([responses, resources]) => {
    console.log('Initialize adblocker...');
    const deduplicatedLines = new Set();
    for (let i = 0; i < responses.length; i += 1) {
      const lines = responses[i].split(/\n/g);
      for (let j = 0; j < lines.length; j += 1) {
        deduplicatedLines.add(lines[j]);
      }
    }
    const deduplicatedFilters = [...deduplicatedLines].join('\n');

    let t0 = Date.now();
    const engine = WebExtensionBlocker.parse(deduplicatedFilters, {
      enableCompression: true,
    });
    let total = Date.now() - t0;
    console.log('parsing filters', total);

    t0 = Date.now();
    engine.updateResources(resources, '' + resources.length);
    total = Date.now() - t0;
    console.log('parsing resources', total);

    t0 = Date.now();
    const serialized = engine.serialize();
    total = Date.now() - t0;
    console.log('serialization', total);
    console.log('size', serialized.byteLength);

    t0 = Date.now();
    const deserialized = WebExtensionBlocker.deserialize(serialized);
    total = Date.now() - t0;
    console.log('deserialization', total);

    return deserialized as WebExtensionBlocker;
  });
}

/**
 * Keep track of number of network requests altered for each tab
 */
const counter: Map<number, number> = new Map();

/**
 * Helper function used to both reset, increment and show the current value of
 * the blocked requests counter for a given tabId.
 */
function updateBlockedCounter(tabId: number, { reset = false, incr = false } = {}) {
  counter.set(tabId, (reset === true ? 0 : counter.get(tabId) || 0) + (incr === true ? 1 : 0));

  chrome.browserAction.setBadgeText({
    text: '' + (counter.get(tabId) || 0),
  });
}

// Whenever the active tab changes, then we update the count of blocked request
chrome.tabs.onActivated.addListener(({ tabId }: chrome.tabs.TabActiveInfo) =>
  updateBlockedCounter(tabId),
);

loadAdblocker().then((engine) => {
  // Start listening to requests, and allow 'blocking' so that we can cancel
  // some of them (or redirect).
  chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
      const blockingResponse = engine.onBeforeRequest(details);

      updateBlockedCounter(details.tabId, {
        incr: Boolean(blockingResponse.cancel || blockingResponse.redirectUrl),
        reset: details.type === 'main_frame',
      });

      return blockingResponse;
    },
    {
      urls: ['<all_urls>'],
    },
    ['blocking'],
  );

  chrome.webRequest.onHeadersReceived.addListener(
    (details) => engine.onHeadersReceived(details),
    { urls: ['<all_urls>'], types: ['main_frame'] },
    ['blocking', 'responseHeaders'],
  );

  // Start listening to messages coming from the content-script
  chrome.runtime.onMessage.addListener((...args) => engine.onRuntimeMessage(...args));

  console.log('Ready to roll!');
});
