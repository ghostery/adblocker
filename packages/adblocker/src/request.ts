/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { parse } from 'tldts-experimental';
import TokensBuffer from './tokens-buffer';
import { createFuzzySignature, fastHash, tokenizeInPlace } from './utils';

const TLDTS_OPTIONS = {
  extractHostname: true,
  mixedInputs: false,
  validateHostname: false,
};

// From: https://github.com/electron/electron/blob/34c4c8d5088fa183f56baea28809de6f2a427e02/shell/browser/net/atom_network_delegate.cc#L30
export type ElectronRequestType =
  | 'image'
  | 'mainFrame'
  | 'object'
  | 'other'
  | 'script'
  | 'stylesheet'
  | 'subFrame'
  | 'xhr';

// From: https://github.com/DefinitelyTyped/DefinitelyTyped/blob/7f3549ed0050f2ca8d7fcc00c33eba21f0cbdd88/types/puppeteer/index.d.ts#L945
export type PuppeteerRequestType =
  | 'document'
  | 'stylesheet'
  | 'image'
  | 'media'
  | 'font'
  | 'script'
  | 'texttrack'
  | 'xhr'
  | 'fetch'
  | 'eventsource'
  | 'websocket'
  | 'manifest'
  | 'other';

// From: https://developer.chrome.com/extensions/webRequest#type-ResourceType
export type WebRequestTypeChrome = chrome.webRequest.ResourceType;

// From: https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/webRequest/ResourceType#Type
export type WebRequestTypeFirefox = browser.webRequest.ResourceType;

// The set of WebRequest types is the union of both Firefox and Chrome
export type WebRequestType = WebRequestTypeChrome | WebRequestTypeFirefox;

// The set of supported types is the union of WebRequest
export type RequestType = WebRequestType | ElectronRequestType | PuppeteerRequestType;

const TOKENS_BUFFER = new TokensBuffer(300);

export interface IRequestInitialization {
  requestId: string;
  tabId: number;

  url: string;
  hostname: string;
  domain: string;

  sourceUrl: string;
  sourceHostname: string;
  sourceDomain: string;

  type: RequestType;

  // Optional attribute referencing the original request details used to create
  // the Request instance. This can be for example:
  // * Electron.OnHeadersReceivedListenerDetails
  // * Electron.OnBeforeRequestListenerDetails
  // * puppeteer.Request
  // * webRequest details
  _originalRequestDetails: any | undefined;
}

export default class Request {
  /**
   * Create an instance of `Request` from raw request details.
   */
  public static fromRawDetails({
    requestId = '0',
    tabId = 0,
    url = '',
    hostname,
    domain,
    sourceUrl = '',
    sourceHostname,
    sourceDomain,
    type = 'main_frame',
    _originalRequestDetails,
  }: Partial<IRequestInitialization>): Request {
    url = url.toLowerCase();

    if (hostname === undefined || domain === undefined) {
      const parsed = parse(url, TLDTS_OPTIONS);
      hostname = hostname || parsed.hostname || '';
      domain = domain || parsed.domain || '';
    }

    // Initialize source URL
    if (sourceHostname === undefined || sourceDomain === undefined) {
      const parsed = parse(sourceUrl, TLDTS_OPTIONS);
      sourceHostname = sourceHostname || parsed.hostname || '';
      sourceDomain = sourceDomain || parsed.domain || '';
    }

    // source URL
    return new Request({
      requestId,
      tabId,

      domain,
      hostname,
      url,

      sourceDomain,
      sourceHostname,
      sourceUrl,

      type,

      _originalRequestDetails,
    });
  }

  public readonly _originalRequestDetails: any | undefined;

  public readonly type: RequestType;
  public readonly isHttp: boolean;
  public readonly isHttps: boolean;
  public readonly isSupported: boolean;
  public readonly isFirstParty: boolean;
  public readonly isThirdParty: boolean;

  public readonly id: string;
  public readonly tabId: number;
  public readonly url: string;
  public readonly hostname: string;
  public readonly domain: string;

  public readonly sourceHostname: string;
  public readonly sourceHostnameHash: number;
  public readonly sourceDomain: string;
  public readonly sourceDomainHash: number;

  // Lazy attributes
  private tokens: Uint32Array | undefined;
  private fuzzySignature: Uint32Array | undefined;

  constructor({
    requestId,
    tabId,

    type,

    domain,
    hostname,
    url,

    sourceDomain,
    sourceHostname,

    _originalRequestDetails,
  }: IRequestInitialization) {
    this._originalRequestDetails = _originalRequestDetails;
    this.id = requestId;
    this.tabId = tabId;
    this.type = type;

    this.url = url;
    this.hostname = hostname;
    this.domain = domain;

    this.sourceHostname = sourceHostname;
    this.sourceDomain = sourceDomain;

    this.sourceHostnameHash = fastHash(this.sourceHostname);
    this.sourceDomainHash = fastHash(this.sourceDomain);

    // Decide on party
    this.isThirdParty = this.sourceDomain.length === 0 ? false : this.sourceDomain !== this.domain;
    this.isFirstParty = !this.isThirdParty;

    // Check protocol
    this.isSupported = true;
    if (
      this.type === 'websocket' ||
      this.url.startsWith('ws:') ||
      this.url.startsWith('wss:')
    ) {
      this.isHttp = false;
      this.isHttps = false;
      this.type = 'websocket';
      this.isSupported = true;
    } else if (this.url.startsWith('http:')) {
      this.isHttp = true;
      this.isHttps = false;
    } else if (this.url.startsWith('https:')) {
      this.isHttps = true;
      this.isHttp = false;
    } else {
      this.isHttp = false;
      this.isHttps = false;
      this.isSupported = false;
    }

    // Lazy attributes
    this.tokens = undefined;
    this.fuzzySignature = undefined;
  }

  public getTokens(): Uint32Array {
    if (this.tokens === undefined) {
      TOKENS_BUFFER.seekZero();

      if (this.sourceDomain) {
        TOKENS_BUFFER.push(fastHash(this.sourceDomain));
      }

      if (this.sourceHostname) {
        TOKENS_BUFFER.push(fastHash(this.sourceHostname));
      }

      tokenizeInPlace(this.url, TOKENS_BUFFER);

      this.tokens = TOKENS_BUFFER.slice();
    }

    return this.tokens;
  }

  public getFuzzySignature(): Uint32Array {
    if (this.fuzzySignature === undefined) {
      this.fuzzySignature = createFuzzySignature(this.url);
    }
    return this.fuzzySignature;
  }

  public isMainFrame(): boolean {
    return this.type === 'main_frame' || this.type === 'mainFrame';
  }

  public isSubFrame(): boolean {
    return this.type === 'sub_frame' || this.type === 'subFrame';
  }
}

/**
 * Kept for backward compatibility. The recommended way is to call
 * `Request.fromRawDetails` directly.
 */
export function makeRequest(details: Partial<IRequestInitialization>): Request {
  return Request.fromRawDetails(details);
}
