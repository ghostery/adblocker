/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import * as tslib_1 from "tslib";
import { parse } from 'tldts';
import Engine from '../engine/engine';
import Request from '../request';
import { updateResponseHeadersWithCSP } from '../utils';
export function checkAvailableAPIs() {
    // TODO
}
/**
 * Wrap `FiltersEngine` into a WebExtension-friendly helper class. It exposes
 * methods to interface with WebExtension APIs needed to block ads.
 */
var WebExtensionBlocker = /** @class */ (function (_super) {
    tslib_1.__extends(WebExtensionBlocker, _super);
    function WebExtensionBlocker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     * Deal with request cancellation (`{ cancel: true }`) and redirection (`{ redirectUrl: '...' }`).
     */
    WebExtensionBlocker.prototype.onBeforeRequest = function (details) {
        var request = Request.fromWebRequestDetails(details);
        var _a = this.match(request), redirect = _a.redirect, match = _a.match;
        if (redirect !== undefined) {
            return { redirectUrl: redirect.dataUrl };
        }
        else if (match === true) {
            return { cancel: true };
        }
        return {};
    };
    /**
     *
     */
    WebExtensionBlocker.prototype.onHeadersReceived = function (details) {
        return updateResponseHeadersWithCSP(details, this.getCSPDirectives(Request.fromWebRequestDetails(details)));
    };
    WebExtensionBlocker.prototype.onRuntimeMessage = function (msg, sender, sendResponse) {
        if (sender.tab === undefined || sender.tab.id === undefined || sender.frameId === undefined) {
            return;
        }
        // Make sure we only listen to messages coming from our content-script
        // based on the value of `action`.
        if (msg.action === 'getCosmeticsFilters') {
            // Extract hostname from sender's URL
            var _a = sender.url, url = _a === void 0 ? '' : _a, frameId = sender.frameId;
            var parsed = parse(url);
            var hostname = parsed.hostname || '';
            var domain = parsed.domain || '';
            // Once per tab/page load we inject base stylesheets. These are always
            // the same for all frames of a given page because they do not depend on
            // a particular domain and cannot be cancelled using unhide rules.
            // Because of this, we specify `allFrames: true` when injecting them so
            // that we do not need to perform this operation for sub-frames.
            if (frameId === 0 && msg.lifecycle === 'start') {
                var _b = this.getCosmeticsFilters({
                    domain: domain,
                    hostname: hostname,
                    url: url,
                    classes: msg.classes,
                    hrefs: msg.hrefs,
                    ids: msg.ids,
                    // This needs to be done only once per tab
                    getBaseRules: true,
                    getInjectionRules: false,
                    getRulesFromDOM: false,
                    getRulesFromHostname: false
                }), active = _b.active, styles = _b.styles;
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
                var _c = this.getCosmeticsFilters({
                    domain: domain,
                    hostname: hostname,
                    url: url,
                    classes: msg.classes,
                    hrefs: msg.hrefs,
                    ids: msg.ids,
                    // This needs to be done only once per frame
                    getBaseRules: false,
                    getInjectionRules: msg.lifecycle === 'start',
                    getRulesFromHostname: msg.lifecycle === 'start',
                    // This will be done every time we get information about DOM mutation
                    getRulesFromDOM: msg.lifecycle === 'dom-update'
                }), active = _c.active, styles = _c.styles, scripts = _c.scripts;
                if (active === false) {
                    return;
                }
                this.injectStylesWebExtension(styles, { tabId: sender.tab.id, frameId: frameId });
                // Inject scripts from content script
                var responseFromBackground = {
                    active: active,
                    extended: [],
                    scripts: scripts,
                    styles: ''
                };
                sendResponse(responseFromBackground);
            }
        }
    };
    WebExtensionBlocker.prototype.injectStylesWebExtension = function (styles, _a) {
        var tabId = _a.tabId, frameId = _a.frameId, _b = _a.allFrames, allFrames = _b === void 0 ? false : _b;
        if (styles.length > 0 &&
            typeof chrome !== 'undefined' &&
            chrome.tabs &&
            chrome.tabs.insertCSS) {
            chrome.tabs.insertCSS(tabId, {
                allFrames: allFrames,
                code: styles,
                cssOrigin: 'user',
                frameId: frameId,
                matchAboutBlank: true,
                runAt: 'document_start'
            }, function () {
                if (chrome.runtime.lastError) {
                    console.error('Error while injecting CSS', chrome.runtime.lastError.message);
                }
            });
        }
    };
    return WebExtensionBlocker;
}(Engine));
export default WebExtensionBlocker;
