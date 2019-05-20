/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { getDomain, getHostname, parse } from 'tldts';
import {
  fastHash,
  fetchLists,
  fetchResources,
  FiltersEngine,
  makeRequest,
  Request,
  updateResponseHeadersWithCSP,
} from '../index';

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
    const engine = FiltersEngine.parse(deduplicatedFilters);
    let total = Date.now() - t0;
    console.log('parsing filters', total);

    t0 = Date.now();
    engine.updateResources(resources, '' + fastHash(resources));
    total = Date.now() - t0;
    console.log('parsing resources', total);

    t0 = Date.now();
    const serialized = engine.serialize();
    total = Date.now() - t0;
    console.log('serialization', total);
    console.log('size', serialized.byteLength);

    t0 = Date.now();
    const deserialized = FiltersEngine.deserialize(serialized);
    total = Date.now() - t0;
    console.log('deserialization', total);

    return deserialized;
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

function requestFromDetails({
  initiator,
  type,
  url,
}:
  | chrome.webRequest.WebRequestBodyDetails
  | chrome.webRequest.WebResponseHeadersDetails): Request {
  return makeRequest(
    {
      sourceUrl: initiator,
      type,
      url,
    },
    parse,
  );
}

loadAdblocker().then((engine) => {
  // Start listening to requests, and allow 'blocking' so that we can cancel
  // some of them (or redirect).
  chrome.webRequest.onBeforeRequest.addListener(
    (details) => {
      const { redirect, match } = engine.match(requestFromDetails(details));

      updateBlockedCounter(details.tabId, {
        incr: Boolean(redirect || match),
        reset: details.type === 'main_frame',
      });

      // Create blocking response { cancel, redirectUrl }
      if (redirect !== undefined) {
        return { redirectUrl: redirect };
      } else if (match === true) {
        return { cancel: true };
      }

      return {};
    },
    {
      urls: ['<all_urls>'],
    },
    ['blocking'],
  );

  chrome.webRequest.onHeadersReceived.addListener(
    (details) =>
      updateResponseHeadersWithCSP(details, engine.getCSPDirectives(requestFromDetails(details))),
    { urls: ['<all_urls>'], types: ['main_frame'] },
    ['blocking', 'responseHeaders'],
  );

  // Start listening to messages coming from the content-script
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    if (sender.tab === undefined || sender.tab.id === undefined) {
      return;
    }

    // Answer to content-script with a list of nodes
    if (msg.action === 'getCosmeticsFilters') {
      // Extract hostname from sender's URL
      const url = sender.url || '';
      const hostname = getHostname(url) || '';
      const domain = getDomain(hostname) || '';

      let t0 = Date.now();
      const { active, styles, scripts } = engine.getCosmeticsFilters({
        domain,
        hostname,
        url,
      });
      let total = Date.now() - t0;
      console.log('getCosmeticsFilters', total);

      if (active === false) {
        return;
      }

      // Use tabs API to inject cosmetics
      if (styles.length > 0) {
        t0 = Date.now();
        chrome.tabs.insertCSS(
          sender.tab.id,
          {
            code: styles,
            cssOrigin: 'user',
            frameId: sender.frameId,
            matchAboutBlank: true,
            runAt: 'document_start',
          },
          () => {
            total = Date.now() - t0;
            console.log('insertCSS', total);
            if (chrome.runtime.lastError) {
              console.error('Error while injecting CSS', chrome.runtime.lastError.message);
            }
          },
        );
      }

      // Inject scripts from content script
      sendResponse({
        active,
        scripts,
      });
    }
  });

  console.log('Ready to roll!');
});
