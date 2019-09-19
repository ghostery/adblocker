/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { parse } from 'tldts-experimental';

import {
  FiltersEngine,
  HTMLSelector,
  isUTF8,
  Request,
  StreamingHtmlFilter,
  WebRequestType,
} from '@cliqz/adblocker';
import { IBackgroundCallback, IMessageFromBackground } from '@cliqz/adblocker-content';

export interface WebRequestBeforeRequestDetails {
  tabId: number;
  url: string;
  type: WebRequestType;
  requestId: string;

  initiator?: string;
  originUrl?: string;
  documentUrl?: string;
}

export type WebRequestHeadersReceivedDetails = WebRequestBeforeRequestDetails & {
  responseHeaders?: chrome.webRequest.HttpHeader[];
};

/**
 * Create an instance of `Request` from `chrome.webRequest.WebRequestDetails`.
 */
export function fromWebRequestDetails(
  details: WebRequestBeforeRequestDetails | WebRequestHeadersReceivedDetails,
): Request {
  return Request.fromRawDetails({
    sourceUrl: details.initiator || details.originUrl || details.documentUrl,
    tabId: details.tabId,
    type: details.type,
    url: details.url,
  });
}

export function updateResponseHeadersWithCSP(
  details: chrome.webRequest.BlockingResponse,
  policies: string | undefined,
): chrome.webRequest.BlockingResponse {
  if (policies === undefined) {
    return {};
  }

  let responseHeaders = details.responseHeaders || [];
  const CSP_HEADER_NAME = 'content-security-policy';

  // Collect existing CSP headers from response
  responseHeaders.forEach(({ name, value }) => {
    if (name.toLowerCase() === CSP_HEADER_NAME) {
      policies += `; ${value}`;
    }
  });

  // Remove all CSP headers from response
  responseHeaders = responseHeaders.filter(({ name }) => name.toLowerCase() !== CSP_HEADER_NAME);

  // Add updated CSP header
  responseHeaders.push({ name: CSP_HEADER_NAME, value: policies });

  return { responseHeaders };
}

// From https://github.com/kelseasy/web-ext-types/blob/master/global/index.d.ts#L1897
interface StreamFilter {
  error: string;
  status:
    | 'uninitialized'
    | 'transferringdata'
    | 'finishedtransferringdata'
    | 'suspended'
    | 'closed'
    | 'disconnected'
    | 'failed';

  onstart: (event: any) => void;
  ondata: (event: { data: ArrayBuffer }) => void;
  onstop: (event: any) => void;
  onerror: (event: any) => void;

  close(): void;
  disconnect(): void;
  resume(): void;
  suspend(): void;
  write(data: Uint8Array | ArrayBuffer): void;
}

// Detect charset with UTF-8 encoding from HTML
const CHARSET_TAG_RE = /<meta charset=['"]utf-8/i;
const CHARSET_HTTP_EQUIV_RE = /<meta http-equiv="content-type" content="text\/html;charset=utf-8/i;

/**
 * Check if HTML filtering is possible in this browser. Only Firefox is supported.
 */
function isHTMLFilteringSupported(): boolean {
  // @ts-ignore
  const browser: any = typeof browser !== 'undefined' ? browser : chrome;

  // Apply HTML filtering is any
  return (
    typeof TextDecoder !== 'undefined' &&
    typeof TextEncoder !== 'undefined' &&
    browser.webRequest !== undefined &&
    browser.webRequest.filterResponseData !== undefined
  );
}

function filterRequestHTML(details: { requestId: string }, rules: HTMLSelector[]): void {
  // @ts-ignore
  const browser: any = typeof browser !== 'undefined' ? browser : chrome;

  // Create filter to observe loading of resource
  const filter: StreamFilter = browser.webRequest.filterResponseData(details.requestId);
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  const htmlFilter = new StreamingHtmlFilter(rules);
  let utf8: undefined | boolean;

  filter.ondata = (event) => {
    let decoded = '';
    try {
      // Attempt decoding chunk (ArrayBuffer) into a string.
      decoded = decoder.decode(event.data, { stream: true });
    } catch (ex) {
      // If we fail to decode chunk, then we need to be extra conservative
      // and we stop listening to streaming response. This is most likely
      // because we do not support this encoding.
      filter.write(event.data);
      filter.disconnect();
      return;
    }

    // Try to guess encoding on first chunk received. The assumption is that
    // we will find either `charset` or `http-equiv` meta-tag in the header.
    // If none of this is found, then we fallback to using `isUTF8` which
    // will make sure `event.data` is valid utf-8 (this check is more
    // costly).
    if (utf8 === undefined) {
      utf8 =
        CHARSET_TAG_RE.test(decoded) ||
        CHARSET_HTTP_EQUIV_RE.test(decoded) ||
        isUTF8(new Uint8Array(event.data));
    }

    // We only proceed to filter this chunk if we could confirm that encoding
    // if utf-8. Otherwise we simply proxy the data as-is to not risk
    // breaking the page.
    if (utf8 === true) {
      filter.write(encoder.encode(htmlFilter.write(decoded)));
    } else {
      filter.write(event.data);
    }
  };

  filter.onstop = async () => {
    // Make sure we push remaining data if any (needed because both `decoder`
    // and `htmlFilter` can keep a chunk of data internally which would need
    // extra input to be processed).
    const remaining = encoder.encode(htmlFilter.write(decoder.decode())) + htmlFilter.flush();

    if (remaining.length !== 0) {
      filter.write(encoder.encode(remaining));
    }

    filter.disconnect();
  };
}

/**
 * Wrap `FiltersEngine` into a WebExtension-friendly helper class. It exposes
 * methods to interface with WebExtension APIs needed to block ads.
 */
export class WebExtensionBlocker extends FiltersEngine {
  public enableBlockingInBrowser(): void {
    if (this.config.loadNetworkFilters === true) {
      chrome.webRequest.onBeforeRequest.addListener(
        this.onBeforeRequest,
        { urls: ['<all_urls>'] },
        ['blocking'],
      );

      chrome.webRequest.onHeadersReceived.addListener(
        this.onHeadersReceived,
        { urls: ['<all_urls>'], types: ['main_frame'] },
        ['blocking', 'responseHeaders'],
      );
    }

    // Start listening to messages coming from the content-script
    if (this.config.loadCosmeticFilters === true) {
      chrome.runtime.onMessage.addListener(this.onRuntimeMessage);
    }
  }

  public disableBlockingInBrowser(): void {
    if (this.config.loadNetworkFilters === true) {
      chrome.webRequest.onBeforeRequest.removeListener(this.onBeforeRequest);
      chrome.webRequest.onHeadersReceived.removeListener(this.onHeadersReceived);
    }

    // Start listening to messages coming from the content-script
    if (this.config.loadCosmeticFilters === true) {
      chrome.runtime.onMessage.removeListener(this.onRuntimeMessage);
    }
  }

  /**
   * Deal with request cancellation (`{ cancel: true }`) and redirection (`{ redirectUrl: '...' }`).
   */
  private onBeforeRequest = (
    details: WebRequestBeforeRequestDetails,
  ): chrome.webRequest.BlockingResponse => {
    const request = fromWebRequestDetails(details);
    if (request.isMainFrame()) {
      // Here we optionally perform HTML filtering. This can only be done if:
      // 1. `enableHtmlFiltering` is set to `true`.
      // 2. `browser.webRequest.filterResponseData` (Firefox only!).
      // 3. `TextEncoder` and `TextDecoder` are available.
      if (this.config.enableHtmlFiltering === true && isHTMLFilteringSupported()) {
        const htmlFilters = this.getHtmlFilters(request);
        if (htmlFilters.length !== 0) {
          filterRequestHTML(details, htmlFilters);
        }
      }

      return {};
    }

    const { redirect, match } = this.match(request);

    if (redirect !== undefined) {
      return { redirectUrl: redirect.dataUrl };
    } else if (match === true) {
      return { cancel: true };
    }

    return {};
  };

  /**
   *
   */
  private onHeadersReceived = (
    details: WebRequestHeadersReceivedDetails,
  ): chrome.webRequest.BlockingResponse => {
    return updateResponseHeadersWithCSP(
      details,
      this.getCSPDirectives(fromWebRequestDetails(details)),
    );
  };

  private onRuntimeMessage = (
    msg: IBackgroundCallback & { action?: string },
    sender: chrome.runtime.MessageSender,
    sendResponse: (response?: any) => void,
  ): void => {
    if (sender.tab === undefined || sender.tab.id === undefined || sender.frameId === undefined) {
      return;
    }

    // Make sure we only listen to messages coming from our content-script
    // based on the value of `action`.
    if (msg.action === 'getCosmeticsFilters') {
      // Extract hostname from sender's URL
      const { url = '', frameId } = sender;
      const parsed = parse(url);
      const hostname = parsed.hostname || '';
      const domain = parsed.domain || '';

      // Once per tab/page load we inject base stylesheets. These are always
      // the same for all frames of a given page because they do not depend on
      // a particular domain and cannot be cancelled using unhide rules.
      // Because of this, we specify `allFrames: true` when injecting them so
      // that we do not need to perform this operation for sub-frames.
      if (frameId === 0 && msg.lifecycle === 'start') {
        const { active, styles } = this.getCosmeticsFilters({
          domain,
          hostname,
          url,

          classes: msg.classes,
          hrefs: msg.hrefs,
          ids: msg.ids,

          // This needs to be done only once per tab
          getBaseRules: true,
          getInjectionRules: false,
          getRulesFromDOM: false,
          getRulesFromHostname: false,
        });

        if (active === false) {
          return;
        }

        this.injectStylesWebExtension(styles, { tabId: sender.tab.id, allFrames: true });
      }

      // Separately, requests cosmetics which depend on the page it self
      // (either because of the hostname or content of the DOM). Content script
      // logic is responsible for returning information about lists of classes,
      // ids and hrefs observed in the DOM. MutationObserver is also used to
      // make sure we can react to changes.
      {
        const { active, styles, scripts } = this.getCosmeticsFilters({
          domain,
          hostname,
          url,

          classes: msg.classes,
          hrefs: msg.hrefs,
          ids: msg.ids,

          // This needs to be done only once per frame
          getBaseRules: false,
          getInjectionRules: msg.lifecycle === 'start',
          getRulesFromHostname: msg.lifecycle === 'start',

          // This will be done every time we get information about DOM mutation
          getRulesFromDOM: msg.lifecycle === 'dom-update',
        });

        if (active === false) {
          return;
        }

        this.injectStylesWebExtension(styles, { tabId: sender.tab.id, frameId });

        // Inject scripts from content script
        const responseFromBackground: IMessageFromBackground = {
          active,
          extended: [],
          scripts,
          styles: '',
        };
        sendResponse(responseFromBackground);
      }
    }
  };

  private injectStylesWebExtension(
    styles: string,
    {
      tabId,
      frameId,
      allFrames = false,
    }: {
      tabId: number;
      frameId?: number;
      allFrames?: boolean;
    },
  ): void {
    if (
      styles.length > 0 &&
      typeof chrome !== 'undefined' &&
      chrome.tabs &&
      chrome.tabs.insertCSS
    ) {
      chrome.tabs.insertCSS(
        tabId,
        {
          allFrames,
          code: styles,
          cssOrigin: 'user',
          frameId,
          matchAboutBlank: true,
          runAt: 'document_start',
        },
        () => {
          if (chrome.runtime.lastError) {
            console.error('Error while injecting CSS', chrome.runtime.lastError.message);
          }
        },
      );
    }
  }
}

// Re-export symbols from @cliqz/adblocker
export * from '@cliqz/adblocker';
