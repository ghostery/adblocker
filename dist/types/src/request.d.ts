/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
/// <reference types="chrome" />
import * as puppeteer from 'puppeteer';
export declare type WebRequestTypeChrome = chrome.webRequest.ResourceType;
export declare type WebRequestTypeFirefox = 'beacon' | 'csp_report' | 'font' | 'image' | 'imageset' | 'main_frame' | 'media' | 'object' | 'object_subrequest' | 'other' | 'ping' | 'script' | 'speculative' | 'stylesheet' | 'sub_frame' | 'web_manifest' | 'websocket' | 'xbl' | 'xml_dtd' | 'xmlhttprequest' | 'xslt';
export declare type WebRequestType = WebRequestTypeChrome | WebRequestTypeFirefox;
export declare type PuppeteerRequestType = 'document' | 'eventsource' | 'fetch' | 'font' | 'image' | 'manifest' | 'media' | 'other' | 'script' | 'stylesheet' | 'texttrack' | 'websocket' | 'xhr';
export declare type ElectronRequestType = 'image' | 'mainFrame' | 'object' | 'other' | 'script' | 'stylesheet' | 'subFrame' | 'xhr';
export declare type RequestType = WebRequestType | PuppeteerRequestType | ElectronRequestType;
export interface WebRequestBeforeRequestDetails {
    url: string;
    type: WebRequestType;
    initiator?: string;
    originUrl?: string;
    documentUrl?: string;
}
export declare type WebRequestHeadersReceivedDetails = WebRequestBeforeRequestDetails & {
    responseHeaders?: chrome.webRequest.HttpHeader[];
};
export interface IRequestInitialization {
    url: string;
    hostname: string;
    domain: string;
    sourceUrl: string;
    sourceHostname: string;
    sourceDomain: string;
    type: RequestType;
}
export default class Request {
    /**
     * Create an instance of `Request` from raw request details.
     */
    static fromRawDetails({ url, hostname, domain, sourceUrl, sourceHostname, sourceDomain, type, }: Partial<IRequestInitialization>): Request;
    /**
     * Create an instance of `Request` from `chrome.webRequest.WebRequestDetails`.
     */
    static fromWebRequestDetails(details: WebRequestBeforeRequestDetails | WebRequestHeadersReceivedDetails): Request;
    /**
     * Create an instance of `Request` from `puppeteer.Request`.
     */
    static fromPuppeteerDetails(details: puppeteer.Request): Request;
    /**
     * Create an instance of `Request` from `Electron.OnBeforeRequestDetails`.
     */
    static fromElectronDetails({ url, resourceType, referrer, }: {
        url: string;
        resourceType: string;
        referrer: string;
    }): Request;
    readonly type: RequestType;
    readonly isHttp: boolean;
    readonly isHttps: boolean;
    readonly isSupported: boolean;
    readonly isFirstParty: boolean;
    readonly isThirdParty: boolean;
    readonly url: string;
    readonly hostname: string;
    readonly domain: string;
    readonly sourceHostname: string;
    readonly sourceHostnameHash: number;
    readonly sourceDomain: string;
    readonly sourceDomainHash: number;
    private tokens;
    private fuzzySignature;
    constructor({ type, domain, hostname, url, sourceDomain, sourceHostname, }: IRequestInitialization);
    getTokens(): Uint32Array;
    getFuzzySignature(): Uint32Array;
}
/**
 * Kept for backward compatibility. The recommended way is to call
 * `Request.fromRawDetails` directly.
 */
export declare function makeRequest(details: Partial<IRequestInitialization>): Request;
