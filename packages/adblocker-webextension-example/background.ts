/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import {
  BlockingResponse,
  HTMLSelector,
  Request,
  WebExtensionBlocker,
} from '@ghostery/adblocker-webextension';
import { Browser } from 'webextension-polyfill';

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

chrome.browserAction.onClicked.addListener(async (_) => {
  console.log('Trying to open a sample page');

  const details = {
    url: chrome.extension.getURL('sample.html'),
  };

  // @ts-expect-error somehow chrome.tabs.query didn't work
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
  let [tab] = await browser.tabs.query(details);

  if (tab === undefined) {
    tab = await chrome.tabs.create(details);
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  void chrome.tabs.update(tab.id, {
    active: true,
  });
});

declare global {
  interface Window {
    adblocker: WebExtensionBlocker;
    browser: Browser;
  }
}

function runner() {
  const blocker = WebExtensionBlocker.parse('##^script:has-text(test)', {
    enableCompression: true,
    enableHtmlFiltering: true,
    loadExtendedSelectors: true,
  });

  window.adblocker = blocker;

  blocker.enableBlockingInBrowser(window.browser);

  blocker.on('request-blocked', (request: Request, result: BlockingResponse) => {
    incrementBlockedCounter(request, result);
    console.log('block', request.url);
  });

  blocker.on('request-redirected', (request: Request, result: BlockingResponse) => {
    incrementBlockedCounter(request, result);
    console.log('redirect', request.url, result);
  });

  blocker.on('csp-injected', (request: Request, csps: string) => {
    console.log('csp', request.url, csps);
  });

  blocker.on('script-injected', (script: string, url: string) => {
    console.log('script', script.length, url);
  });

  blocker.on('style-injected', (style: string, url: string) => {
    console.log('style', url, style.length);
  });

  blocker.on('html-filtered', (htmlSelectors: HTMLSelector[], url: string) => {
    console.log('html selectors', htmlSelectors, url);
  });

  blocker.on('filter-matched', ({ filter, exception }, context) => {
    console.log('filter-matched', filter, exception, context);
  });

  console.log('Ready to roll!');
}

runner();
