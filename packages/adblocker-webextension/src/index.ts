/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import browser, { Runtime, WebRequest, WebNavigation } from 'webextension-polyfill';
import { parse } from 'tldts-experimental';

import {
  FiltersEngine,
  HTMLSelector,
  isUTF8,
  NetworkFilter,
  Request,
  RequestType,
  StreamingHtmlFilter,
} from '@ghostery/adblocker';
import { IBackgroundCallback, IMessageFromBackground } from '@ghostery/adblocker-content';

// ============================================================================
// MV3 Support - declarativeNetRequest types and utilities
// ============================================================================

/**
 * Chrome declarativeNetRequest rule type
 */
interface DNRRule {
  id: number;
  priority?: number;
  action: {
    type: 'block' | 'redirect' | 'allow' | 'upgradeScheme' | 'modifyHeaders';
    redirect?: { url?: string; extensionPath?: string; transform?: object; regexSubstitution?: string };
    requestHeaders?: Array<{ header: string; operation: 'append' | 'set' | 'remove'; value?: string }>;
    responseHeaders?: Array<{ header: string; operation: 'append' | 'set' | 'remove'; value?: string }>;
  };
  condition: {
    urlFilter?: string;
    regexFilter?: string;
    resourceTypes?: string[];
    domains?: string[];
    excludedDomains?: string[];
    initiatorDomains?: string[];
    excludedInitiatorDomains?: string[];
    isUrlFilterCaseSensitive?: boolean;
  };
}

/**
 * Detect if we're running in a Manifest V3 context
 */
export function isManifestV3(): boolean {
  try {
    const manifest = chrome.runtime.getManifest();
    return manifest.manifest_version === 3;
  } catch {
    return false;
  }
}

/**
 * Check if declarativeNetRequest API is available
 */
export function hasDeclarativeNetRequest(): boolean {
  return typeof chrome !== 'undefined' &&
         typeof chrome.declarativeNetRequest !== 'undefined' &&
         typeof chrome.declarativeNetRequest.updateDynamicRules === 'function';
}

/**
 * Check if MV2 blocking webRequest is available
 */
function hasBlockingWebRequest(): boolean {
  try {
    return typeof browser.webRequest !== 'undefined' &&
           typeof browser.webRequest.onBeforeRequest !== 'undefined';
  } catch {
    return false;
  }
}

/** Cached result of manifest version check */
export const IS_MV3 = isManifestV3();

/** Cached result of DNR availability check */
export const HAS_DNR = hasDeclarativeNetRequest();

/**
 * Convert a NetworkFilter to a declarativeNetRequest rule
 */
function filterToDNRRule(filter: NetworkFilter, id: number): DNRRule | null {
  try {
    const pattern = filter.getFilter();
    if (!pattern) return null;

    // Determine action type
    let actionType: 'block' | 'redirect' | 'allow' = 'block';
    if (filter.isException()) {
      actionType = 'allow';
    }

    // Build the condition
    const condition: DNRRule['condition'] = {};

    // Convert filter pattern to urlFilter
    if (filter.isRegex()) {
      condition.regexFilter = pattern;
    } else {
      let urlFilter = pattern;

      // Handle anchors
      if (filter.isHostnameAnchor()) {
        urlFilter = `||${urlFilter}`;
      } else if (filter.isLeftAnchor()) {
        urlFilter = `|${urlFilter}`;
      }

      if (filter.isRightAnchor()) {
        urlFilter = `${urlFilter}|`;
      }

      condition.urlFilter = urlFilter;
    }

    // Set case sensitivity
    condition.isUrlFilterCaseSensitive = (filter as unknown as { isCaseSensitive: boolean }).isCaseSensitive ?? false;

    // Convert resource types
    const resourceTypes = getResourceTypesFromFilter(filter);
    if (resourceTypes.length > 0) {
      condition.resourceTypes = resourceTypes;
    }

    return {
      id,
      priority: filter.isException() ? 2 : 1,
      action: { type: actionType },
      condition,
    };
  } catch (err) {
    console.warn('[Adblocker MV3] Failed to convert filter to DNR rule:', err);
    return null;
  }
}

/**
 * Map filter type flags to DNR resource types
 */
function getResourceTypesFromFilter(filter: NetworkFilter): string[] {
  const types: string[] = [];

  if (filter.fromDocument()) types.push('main_frame');
  if (filter.fromSubdocument()) types.push('sub_frame');
  if (filter.fromStylesheet()) types.push('stylesheet');
  if (filter.fromScript()) types.push('script');
  if (filter.fromImage()) types.push('image');
  if (filter.fromFont()) types.push('font');
  if (filter.fromXmlHttpRequest()) types.push('xmlhttprequest');
  if (filter.fromMedia()) types.push('media');
  if (filter.fromWebsocket()) types.push('websocket');
  if (filter.fromPing()) types.push('ping');
  if (filter.fromOther()) types.push('other');

  // If no specific types, allow all
  if (types.length === 0) {
    return ['main_frame', 'sub_frame', 'stylesheet', 'script', 'image', 'font', 'xmlhttprequest', 'media', 'websocket', 'ping', 'other'];
  }

  return types;
}

// ============================================================================
// Original type exports
// ============================================================================

export type OnBeforeRequestDetailsType = Pick<
  WebRequest.OnBeforeRequestDetailsType,
  'url' | 'type' | 'requestId' | 'tabId' | 'originUrl' | 'documentUrl'
> & { initiator?: string };

export type OnHeadersReceivedDetailsType = Pick<
  WebRequest.OnHeadersReceivedDetailsType,
  | 'responseHeaders'
  | 'url'
  | 'type'
  | 'tabId'
  | 'requestId'
  | 'originUrl'
  | 'documentUrl'
  | 'statusCode'
> & { initiator?: string };

type StreamFilter = WebRequest.StreamFilter & {
  onstart: (event: any) => void;
  ondata: (event: { data: ArrayBuffer }) => void;
  onstop: (event: any) => void;
  onerror: (event: any) => void;
};

type Browser = typeof browser;

function isFirefox() {
  try {
    return navigator.userAgent.indexOf('Firefox') !== -1;
  } catch (e) {
    return false;
  }
}

function usePushScriptsInjection() {
  return !isFirefox();
}

const USE_PUSH_SCRIPTS_INJECTION = usePushScriptsInjection();

/**
 * Create an instance of `Request` from WebRequest details.
 */
export function fromWebRequestDetails<
  T extends OnBeforeRequestDetailsType | OnHeadersReceivedDetailsType,
>(details: T): Request {
  const sourceUrl = details.initiator || details.originUrl || details.documentUrl;
  return Request.fromRawDetails(
    sourceUrl
      ? {
          _originalRequestDetails: details,
          requestId: details.requestId,
          sourceUrl,
          tabId: details.tabId,
          type: details.type,
          url: details.url,
        }
      : {
          _originalRequestDetails: details,
          requestId: details.requestId,
          tabId: details.tabId,
          type: details.type,
          url: details.url,
        },
  );
}

/**
 * Helper used when injecting custom CSP headers to update `responseHeaders`.
 */
export function updateResponseHeadersWithCSP(
  details: OnHeadersReceivedDetailsType,
  policies: string | undefined,
): WebRequest.BlockingResponse {
  if (policies === undefined) {
    return {};
  }

  let responseHeaders = details.responseHeaders || [];
  const CSP_HEADER_NAME = 'content-security-policy';

  responseHeaders.forEach(({ name, value }) => {
    if (name.toLowerCase() === CSP_HEADER_NAME) {
      policies += `; ${value}`;
    }
  });

  responseHeaders = responseHeaders.filter(({ name }) => name.toLowerCase() !== CSP_HEADER_NAME);
  responseHeaders.push({ name: CSP_HEADER_NAME, value: policies });

  return { responseHeaders };
}

const HTML_FILTERABLE_REQUEST_TYPES = new Set([
  'main_frame',
  'mainFrame',
  'sub_frame',
  'subFrame',
  'stylesheet',
  'script',
  'document',
  'fetch',
  'prefetch',
  'preflight',
  'xhr',
  'xmlhttprequest',
]);

const HTML_FILTERABLE_NON_TEXT_MIME_TYPES = new Set([
  'application/javascript',
  'application/json',
  'application/mpegurl',
  'application/vnd.api+json',
  'application/vnd.apple.mpegurl',
  'application/vnd.apple.mpegurl.audio',
  'application/x-javascript',
  'application/x-mpegurl',
  'application/xhtml+xml',
  'application/xml',
  'audio/mpegurl',
  'audio/x-mpegurl',
]);

export const MAXIMUM_RESPONSE_BUFFER_SIZE = 10 * 1024 * 1024;

function getHeaderFromDetails(
  details: OnHeadersReceivedDetailsType,
  headerName: WebRequest.HttpHeadersItemType['name'],
): string | undefined {
  return details.responseHeaders?.find((header) => header.name === headerName)?.value;
}

export function shouldApplyReplaceSelectors(request: Request): boolean {
  const details = request._originalRequestDetails as OnHeadersReceivedDetailsType;

  if (details.statusCode === 0) {
    return false;
  }

  if (details.statusCode < 200 || details.statusCode > 299) {
    return false;
  }

  const contentDisposition = (
    getHeaderFromDetails(details, 'content-disposition') || ''
  ).toLowerCase();
  if (contentDisposition !== '' && contentDisposition.startsWith('inline') === false) {
    return false;
  }

  const contentLength = Number(getHeaderFromDetails(details, 'content-length'));
  if (contentLength !== 0 && contentLength >= MAXIMUM_RESPONSE_BUFFER_SIZE) {
    return false;
  }

  const contentTypeHeader = (getHeaderFromDetails(details, 'content-type') || '').toLowerCase();
  if (
    contentTypeHeader.startsWith('text') ||
    HTML_FILTERABLE_NON_TEXT_MIME_TYPES.has(contentTypeHeader)
  ) {
    return true;
  }

  if (HTML_FILTERABLE_REQUEST_TYPES.has(request.type)) {
    return true;
  }

  return false;
}

/**
 * Enable stream HTML filter on request `id` using `rules`.
 */
export function filterRequestHTML(
  filterResponseData: Browser['webRequest']['filterResponseData'],
  request: Request,
  rules: HTMLSelector[],
): void {
  if (shouldApplyReplaceSelectors(request) === false) {
    rules = rules.filter(([type]) => type !== 'replace');
  }

  if (rules.length === 0) {
    return;
  }

  const filter = filterResponseData(request.id) as StreamFilter;
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  const htmlFilter = new StreamingHtmlFilter(rules);
  let accumulatedBufferSize = 0;

  const teardown = (event: { data?: ArrayBuffer }) => {
    try {
      const remaining =
        htmlFilter.write(decoder.decode()) +
        htmlFilter.flush(accumulatedBufferSize < MAXIMUM_RESPONSE_BUFFER_SIZE);
      if (remaining.length !== 0) {
        filter.write(encoder.encode(remaining));
      }
    } catch (ex) {
      console.error('Failed to flush HTML filterer', ex);
    }

    if (event.data !== undefined) {
      filter.write(event.data);
    }

    filter.disconnect();
  };

  filter.ondata = (event) => {
    if (isUTF8(new Uint8Array(event.data)) === false) {
      return teardown(event);
    }

    accumulatedBufferSize += event.data.byteLength;
    if (accumulatedBufferSize > MAXIMUM_RESPONSE_BUFFER_SIZE) {
      return teardown(event);
    }

    try {
      filter.write(encoder.encode(htmlFilter.write(decoder.decode(event.data, { stream: true }))));
    } catch (ex) {
      return teardown(event);
    }
  };

  filter.onstop = () => {
    teardown({});
  };
}

/**
 * This abstraction takes care of blocking in one instance of `browser`.
 * Supports both MV2 (webRequest) and MV3 (declarativeNetRequest).
 */
export class BlockingContext {
  private readonly onBeforeRequest: (
    details: OnBeforeRequestDetailsType,
  ) => WebRequest.BlockingResponse;
  private readonly onHeadersReceived: (
    details: OnHeadersReceivedDetailsType,
  ) => WebRequest.BlockingResponse;
  private readonly onRuntimeMessage: (
    msg: IBackgroundCallback & { action?: string },
    sender: Runtime.MessageSender,
  ) => Promise<void>;
  private readonly onCommittedHandler:
    | ((details: WebNavigation.OnCommittedDetailsType) => void)
    | undefined;

  // MV3 state
  private ruleIds: Set<number> = new Set();
  private nextRuleId = 1;

  constructor(
    private readonly browser: Browser,
    private readonly blocker: WebExtensionBlocker,
  ) {
    this.onBeforeRequest = (details) => blocker.onBeforeRequest(browser, details);
    this.onHeadersReceived = (details) => blocker.onHeadersReceived(browser, details);
    this.onRuntimeMessage = (msg, sender) => blocker.onRuntimeMessage(browser, msg, sender);

    if (
      this.blocker.config.enablePushInjectionsOnNavigationEvents === true &&
      USE_PUSH_SCRIPTS_INJECTION
    ) {
      if (this.browser.webNavigation?.onCommitted) {
        this.onCommittedHandler = (details) => blocker.onCommittedHandler(browser, details);
      } else {
        console.warn(
          'Consider adding the "webNavigation" permission in the manifest to improve the reliability of the adblocker. ' +
            'If you do not want to see this warning, turn off the "enablePushInjectionsOnNavigationEvents" flag.',
        );
      }
    }
  }

  /**
   * Enable blocking. Async to support MV3 declarativeNetRequest.
   */
  public async enable(): Promise<void> {
    // MV3: Use declarativeNetRequest
    if (IS_MV3 && HAS_DNR) {
      await this.enableMV3();
    }
    // MV2: Use webRequest with blocking
    else if (hasBlockingWebRequest() && this.blocker.config.loadNetworkFilters === true) {
      this.enableMV2();
    }

    // Start listening to messages coming from the content-script
    if (
      this.blocker.config.loadCosmeticFilters === true &&
      this.browser.runtime !== undefined &&
      this.browser.runtime.onMessage !== undefined
    ) {
      this.browser.runtime.onMessage.addListener(
        this.onRuntimeMessage as (
          message: unknown,
          sender: Runtime.MessageSender,
        ) => Promise<void>,
      );
    }

    if (this.onCommittedHandler) {
      this.browser.webNavigation.onCommitted.addListener(this.onCommittedHandler);
    }
  }

  /**
   * Enable network blocking using MV3 declarativeNetRequest API
   */
  private async enableMV3(): Promise<void> {
    console.log('[Adblocker MV3] Enabling with declarativeNetRequest');

    const rules = this.convertFiltersToDNR();

    if (rules.length === 0) {
      console.log('[Adblocker MV3] No rules to register');
      return;
    }

    // Chrome limits dynamic rules to 30,000
    const MAX_RULES = 30000;
    const rulesToAdd = rules.slice(0, MAX_RULES);

    if (rules.length > MAX_RULES) {
      console.warn(`[Adblocker MV3] Truncated rules from ${rules.length} to ${MAX_RULES}`);
    }

    try {
      // Remove any existing rules first
      const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
      const existingIds = existingRules.map((r) => r.id);

      await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: existingIds,
        addRules: rulesToAdd as chrome.declarativeNetRequest.Rule[],
      });

      rulesToAdd.forEach((r) => this.ruleIds.add(r.id));

      console.log(`[Adblocker MV3] Registered ${rulesToAdd.length} blocking rules`);
    } catch (err) {
      console.error('[Adblocker MV3] Failed to register rules:', err);
    }
  }

  /**
   * Enable network blocking using MV2 webRequest API
   */
  private enableMV2(): void {
    if (this.browser.webRequest === undefined) {
      return;
    }

    this.browser.webRequest.onBeforeRequest.addListener(
      this.onBeforeRequest,
      { urls: ['http://*/*', 'https://*/*'] },
      ['blocking'],
    );

    this.browser.webRequest.onHeadersReceived.addListener(
      this.onHeadersReceived,
      { urls: ['http://*/*', 'https://*/*'] },
      ['blocking', 'responseHeaders'],
    );
  }

  /**
   * Convert NetworkFilters to declarativeNetRequest rules
   */
  private convertFiltersToDNR(): DNRRule[] {
    const rules: DNRRule[] = [];

    // Access internal FiltersEngine structure to get network filters
    const engine = this.blocker as unknown as {
      filters?: { networkFilters?: NetworkFilter[] };
      lists?: Map<string, { networkFilters?: NetworkFilter[] }>;
    };

    let filters: NetworkFilter[] = [];

    if (engine.filters?.networkFilters) {
      filters = engine.filters.networkFilters;
    } else if (engine.lists) {
      engine.lists.forEach((list) => {
        if (list.networkFilters) {
          filters = filters.concat(list.networkFilters);
        }
      });
    }

    for (const filter of filters) {
      const rule = filterToDNRRule(filter, this.nextRuleId++);
      if (rule) {
        rules.push(rule);
      }
    }

    return rules;
  }

  /**
   * Disable blocking. Async to support MV3 declarativeNetRequest.
   */
  public async disable(): Promise<void> {
    // MV3: Remove DNR rules
    if (IS_MV3 && HAS_DNR) {
      await this.disableMV3();
    }
    // MV2: Remove webRequest listeners
    else if (this.browser.webRequest !== undefined) {
      this.browser.webRequest.onBeforeRequest.removeListener(this.onBeforeRequest);
      this.browser.webRequest.onHeadersReceived.removeListener(this.onHeadersReceived);
    }

    if (this.browser.runtime !== undefined && this.browser.runtime.onMessage !== undefined) {
      this.browser.runtime.onMessage.removeListener(
        this.onRuntimeMessage as (
          message: unknown,
          sender: Runtime.MessageSender,
        ) => Promise<void>,
      );
    }

    if (this.onCommittedHandler) {
      this.browser.webNavigation.onCommitted.removeListener(this.onCommittedHandler);
    }
  }

  /**
   * Disable MV3 blocking by removing all DNR rules
   */
  private async disableMV3(): Promise<void> {
    if (this.ruleIds.size === 0) return;

    try {
      await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: Array.from(this.ruleIds),
      });
      this.ruleIds.clear();
      console.log('[Adblocker MV3] Disabled - removed all rules');
    } catch (err) {
      console.error('[Adblocker MV3] Failed to remove rules:', err);
    }
  }

  get pushInjectionsActive() {
    return this.onCommittedHandler !== undefined;
  }
}

/**
 * Wrap `FiltersEngine` into a WebExtension-friendly helper class. It exposes
 * methods to interface with WebExtension APIs needed to block ads.
 */
export class WebExtensionBlocker extends FiltersEngine {
  private readonly contexts: WeakMap<Browser, BlockingContext> = new WeakMap();

  // -----------------------------------------------------------------------
  //
  // Helpers to enable and disable blocking for 'browser'
  //
  // -----------------------------------------------------------------------

  /**
   * Enable blocking in the given browser instance.
   * Now async to support MV3 declarativeNetRequest API.
   */
  public async enableBlockingInBrowser(browser: Browser): Promise<BlockingContext> {
    let context: undefined | BlockingContext = this.contexts.get(browser);
    if (context !== undefined) {
      return context;
    }

    context = new BlockingContext(browser, this);
    this.contexts.set(browser, context);
    await context.enable();

    return context;
  }

  /**
   * Disable blocking in the given browser instance.
   * Now async to support MV3 declarativeNetRequest API.
   */
  public async disableBlockingInBrowser(browser: Browser): Promise<void> {
    const context: undefined | BlockingContext = this.contexts.get(browser);
    if (context === undefined) {
      throw new Error('Trying to disable blocking which was not enabled');
    }

    this.contexts.delete(browser);
    await context.disable();
  }

  public onCommittedHandler(
    browser: Browser,
    details: WebNavigation.OnCommittedDetailsType,
  ): void {
    const { hostname, domain } = parse(details.url);
    if (!hostname) {
      return;
    }

    const { active, scripts } = this.getCosmeticsFilters({
      url: details.url,
      hostname,
      domain: domain || '',
      getBaseRules: false,
      getInjectionRules: true,
      getExtendedRules: false,
      getRulesFromDOM: false,
      getRulesFromHostname: true,
      callerContext: {
        tabId: details.tabId,
        frameId: details.frameId,
      },
    });

    if (active === false) {
      return;
    }

    if (scripts.length > 0) {
      this.executeScriptlets(browser, details, scripts);
    }
  }

  public isBlockingEnabled(browser: Browser): boolean {
    return this.contexts.has(browser);
  }

  private pushInjectionsActive(browser: Browser): boolean {
    const context = this.contexts.get(browser);
    if (!context) {
      return false;
    }
    return context.pushInjectionsActive;
  }

  // -----------------------------------------------------------------------
  //
  // WebExtensionBlocker-specific additions to FiltersEngine
  //
  // -----------------------------------------------------------------------

  public performHTMLFiltering(browser: Browser, request: Request): void {
    if (
      this.config.enableHtmlFiltering === true &&
      browser.webRequest !== undefined &&
      browser.webRequest.filterResponseData !== undefined &&
      typeof TextDecoder !== 'undefined' &&
      typeof TextEncoder !== 'undefined'
    ) {
      const htmlFilters = this.getHtmlFilters(request);
      if (htmlFilters.length !== 0) {
        filterRequestHTML(browser.webRequest.filterResponseData, request, htmlFilters);
      }
    }
  }

  private handleRuntimeMessage = async (
    browser: Browser,
    msg: IBackgroundCallback & { action?: string },
    sender: Runtime.MessageSender,
    sendResponse: (response: IMessageFromBackground) => void,
  ): Promise<void> => {
    const promises: Promise<void>[] = [];

    if (msg.action !== 'getCosmeticsFilters') {
      return;
    }

    if (sender.tab === undefined) {
      throw new Error('required "sender.tab" information is not available');
    }

    if (sender.tab.id === undefined) {
      throw new Error('required "sender.tab.id" information is not available');
    }

    if (sender.frameId === undefined) {
      throw new Error('required "sender.frameId" information is not available');
    }

    const { url = '', frameId } = sender;
    const parsed = parse(url);
    const hostname = parsed.hostname || '';
    const domain = parsed.domain || '';

    if (frameId === 0 && msg.lifecycle === 'start') {
      const { active, styles } = this.getCosmeticsFilters({
        domain,
        hostname,
        url,
        classes: msg.classes,
        hrefs: msg.hrefs,
        ids: msg.ids,
        getBaseRules: true,
        getInjectionRules: false,
        getExtendedRules: false,
        getRulesFromDOM: false,
        getRulesFromHostname: false,
        callerContext: {
          tabId: sender.tab?.id,
          frameId: sender.frameId,
        },
      });

      if (active === false) {
        return;
      }

      promises.push(
        this.injectStylesWebExtension(browser, styles, {
          tabId: sender.tab.id,
          allFrames: true,
        }),
      );
    }

    {
      const { active, styles, scripts, extended } = this.getCosmeticsFilters({
        domain,
        hostname,
        url,
        classes: msg.classes,
        hrefs: msg.hrefs,
        ids: msg.ids,
        getBaseRules: false,
        getInjectionRules: msg.lifecycle === 'start',
        getExtendedRules: msg.lifecycle === 'start',
        getRulesFromHostname: msg.lifecycle === 'start',
        getRulesFromDOM: msg.lifecycle === 'dom-update',
        callerContext: {
          tabId: sender.tab?.id,
          frameId: sender.frameId,
        },
      });

      if (active === false) {
        return;
      }

      promises.push(
        this.injectStylesWebExtension(browser, styles, { tabId: sender.tab.id, frameId }),
      );

      if (scripts.length !== 0 && !this.pushInjectionsActive(browser)) {
        sendResponse({
          active,
          extended,
          scripts,
          styles: '',
        });
      }
    }

    await Promise.all(promises);
  };

  public onBeforeRequest = (
    _: Browser,
    details: OnBeforeRequestDetailsType,
  ): WebRequest.BlockingResponse => {
    const request = fromWebRequestDetails(details);

    if (this.config.guessRequestTypeFromUrl === true && request.type === 'other') {
      request.guessTypeOfRequest();
    }

    const { redirect, match } = this.match(request);

    if (redirect !== undefined) {
      return { redirectUrl: redirect.dataUrl };
    } else if (match === true) {
      return { cancel: true };
    }

    return {};
  };

  public onHeadersReceived = (
    browser: Browser,
    details: OnHeadersReceivedDetailsType,
  ): WebRequest.BlockingResponse => {
    const request = fromWebRequestDetails(details);

    this.performHTMLFiltering(browser, request);

    return updateResponseHeadersWithCSP(details, this.getCSPDirectives(request));
  };

  public onRuntimeMessage = (
    browser: Browser,
    msg: IBackgroundCallback & { action?: string },
    sender: Runtime.MessageSender,
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      this.handleRuntimeMessage(browser, msg, sender, resolve as (response: IMessageFromBackground) => void)
        .catch(reject)
        .finally(() => resolve());
    });
  };

  private async injectStylesWebExtension(
    browser: Browser,
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
  ): Promise<void> {
    if (styles.length === 0) {
      return;
    }

    if (browser.tabs === undefined) {
      throw new Error('required "tabs" API is not defined');
    }

    if (browser.tabs.insertCSS === undefined) {
      throw new Error('required "tabs.insertCSS" API is not defined');
    }

    return browser.tabs.insertCSS(
      tabId,
      frameId
        ? {
            allFrames,
            code: styles,
            cssOrigin: 'user',
            frameId,
            matchAboutBlank: true,
            runAt: 'document_start',
          }
        : {
            allFrames,
            code: styles,
            cssOrigin: 'user',
            matchAboutBlank: true,
            runAt: 'document_start',
          },
    );
  }

  private executeScriptlets(
    browser: Browser,
    details: WebNavigation.OnCommittedDetailsType,
    scripts: string[],
  ): void {
    let debugMarker;
    if (this.config.debug) {
      debugMarker = (text: string) => `console.log('[ADBLOCKER-DEBUG]:', ${JSON.stringify(text)});`;
    } else {
      debugMarker = () => '';
    }

    const codeRunningInPage = `(function(){
${debugMarker('run scriptlets (executing in "page world")')}
${scripts.join('\n\n')}}
)()`;

    const codeRunningInContentScript = `
(function(code) {
${debugMarker('run injection wrapper (executing in "content script world")')}
var script;
try {
  script = document.createElement('script');
  script.appendChild(document.createTextNode(decodeURIComponent(code)));
  (document.head || document.documentElement).appendChild(script);
} catch (ex) {
  console.error('Failed to run script', ex);
}
if (script) {
  if (script.parentNode) {
    script.parentNode.removeChild(script);
  }
  script.textContent = '';
}
})(\`${encodeURIComponent(codeRunningInPage)}\`);`;

    browser.tabs
      .executeScript(details.tabId, {
        code: codeRunningInContentScript,
        runAt: 'document_start',
        frameId: details.frameId,
        matchAboutBlank: true,
      })
      .catch((err) => {
        console.error('Failed to inject scriptlets', err);
      });
  }
}

// Re-export symbols from @ghostery/adblocker
export * from '@ghostery/adblocker';
