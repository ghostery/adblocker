/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { browser } from 'webextension-polyfill-ts';

import {
  BlockingResponse,
  fullLists,
  HTMLSelector,
  Request,
  WebExtensionBlocker,
} from '@cliqz/adblocker-webextension';

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

function incrementBlockedCounter(request: Request, blockingResponse: BlockingResponse): void {
  updateBlockedCounter(request.tabId, {
    incr: Boolean(blockingResponse.match),
    reset: request.isMainFrame(),
  });
}

// Whenever the active tab changes, then we update the count of blocked request
chrome.tabs.onActivated.addListener(({ tabId }: chrome.tabs.TabActiveInfo) =>
  updateBlockedCounter(tabId),
);

// Reset counter if tab is reloaded
chrome.tabs.onUpdated.addListener((tabId, { status, url }) => {
  if (status === 'loading' && url === undefined) {
    updateBlockedCounter(tabId, {
      incr: false,
      reset: true,
    });
  }
});

WebExtensionBlocker.fromLists(fetch, fullLists, {
  enableCompression: true,
  enableHtmlFiltering: true,
  loadExtendedSelectors: true,
}).then((blocker: WebExtensionBlocker) => {
  blocker.enableBlockingInBrowser(browser);

  blocker.on('request-blocked', (request: Request, result: BlockingResponse) => {
    incrementBlockedCounter(request, result);
    console.log('block', request.url);
  });

  blocker.on('request-redirected', (request: Request, result: BlockingResponse) => {
    incrementBlockedCounter(request, result);
    console.log('redirect', request.url, result);
  });

  blocker.on('csp-injected', (request: Request) => {
    console.log('csp', request.url);
  });

  blocker.on('script-injected', (script: string, url: string) => {
    console.log('script', script.length, url);
  });

  blocker.on('style-injected', (style: string, url: string) => {
    console.log('style', url, style.length);
  });

  blocker.on('html-filtered', (htmlSelectors: HTMLSelector[]) => {
    console.log('html selectors', htmlSelectors);
  });

  console.log('Ready to roll!');
});
