/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { parse } from 'tldts';
import TokensBuffer from './tokens-buffer';
import { createFuzzySignature, fastHash, tokenizeInPlace } from './utils';
var TLDTS_OPTIONS = {
    extractHostname: true,
    mixedInputs: false,
    validateHostname: false
};
var TOKENS_BUFFER = new TokensBuffer(300);
var Request = /** @class */ (function () {
    function Request(_a) {
        var type = _a.type, domain = _a.domain, hostname = _a.hostname, url = _a.url, sourceDomain = _a.sourceDomain, sourceHostname = _a.sourceHostname;
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
        if (this.url.startsWith('http:')) {
            this.isHttp = true;
            this.isHttps = false;
        }
        else if (this.url.startsWith('https:')) {
            this.isHttps = true;
            this.isHttp = false;
        }
        else if (this.url.startsWith('ws:') || this.url.startsWith('wss:')) {
            this.isHttp = false;
            this.isHttps = false;
            this.type = 'websocket';
            this.isSupported = true;
        }
        else {
            this.isHttp = false;
            this.isHttps = false;
            this.isSupported = false;
        }
        // Lazy attributes
        this.tokens = undefined;
        this.fuzzySignature = undefined;
    }
    /**
     * Create an instance of `Request` from raw request details.
     */
    Request.fromRawDetails = function (_a) {
        var _b = _a.url, url = _b === void 0 ? '' : _b, hostname = _a.hostname, domain = _a.domain, _c = _a.sourceUrl, sourceUrl = _c === void 0 ? '' : _c, sourceHostname = _a.sourceHostname, sourceDomain = _a.sourceDomain, _d = _a.type, type = _d === void 0 ? 'main_frame' : _d;
        url = url.toLowerCase();
        if (hostname === undefined || domain === undefined) {
            var parsed = parse(url, TLDTS_OPTIONS);
            hostname = hostname || parsed.hostname || '';
            domain = domain || parsed.domain || '';
        }
        // Initialize source URL
        if (sourceHostname === undefined || sourceDomain === undefined) {
            var parsed = parse(sourceUrl, TLDTS_OPTIONS);
            sourceHostname = sourceHostname || parsed.hostname || '';
            sourceDomain = sourceDomain || parsed.domain || '';
        }
        // source URL
        return new Request({
            domain: domain,
            hostname: hostname,
            url: url,
            sourceDomain: sourceDomain,
            sourceHostname: sourceHostname,
            sourceUrl: sourceUrl,
            type: type
        });
    };
    /**
     * Create an instance of `Request` from `chrome.webRequest.WebRequestDetails`.
     */
    Request.fromWebRequestDetails = function (details) {
        return Request.fromRawDetails({
            sourceUrl: details.initiator || details.originUrl || details.documentUrl,
            type: details.type,
            url: details.url
        });
    };
    /**
     * Create an instance of `Request` from `puppeteer.Request`.
     */
    Request.fromPuppeteerDetails = function (details) {
        var frame = details.frame();
        return Request.fromRawDetails({
            sourceUrl: frame !== null ? frame.url() : undefined,
            type: details.resourceType(),
            url: details.url()
        });
    };
    /**
     * Create an instance of `Request` from `Electron.OnBeforeRequestDetails`.
     */
    Request.fromElectronDetails = function (_a) {
        var url = _a.url, resourceType = _a.resourceType, referrer = _a.referrer;
        return Request.fromRawDetails({
            sourceUrl: referrer,
            type: (resourceType || 'other'),
            url: url
        });
    };
    Request.prototype.getTokens = function () {
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
    };
    Request.prototype.getFuzzySignature = function () {
        if (this.fuzzySignature === undefined) {
            this.fuzzySignature = createFuzzySignature(this.url);
        }
        return this.fuzzySignature;
    };
    return Request;
}());
export default Request;
/**
 * Kept for backward compatibility. The recommended way is to call
 * `Request.fromRawDetails` directly.
 */
export function makeRequest(details) {
    return Request.fromRawDetails(details);
}
