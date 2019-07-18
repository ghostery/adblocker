/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import * as tslib_1 from "tslib";
// Type definition
import { ipcMain } from 'electron';
import { parse } from 'tldts';
import Engine from '../engine/engine';
import Request from '../request';
/**
 * Wrap `FiltersEngine` into a Electron-friendly helper class.
 */
var ElectronBlocker = /** @class */ (function (_super) {
    tslib_1.__extends(ElectronBlocker, _super);
    function ElectronBlocker() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.onGetCosmeticFilters = function (e, id, msg) {
            // Extract hostname from sender's URL
            var url = e.sender.getURL();
            var frameId = 0;
            var parsed = parse(url);
            var hostname = parsed.hostname || '';
            var domain = parsed.domain || '';
            // Once per tab/page load we inject base stylesheets. These are always
            // the same for all frames of a given page because they do not depend on
            // a particular domain and cannot be cancelled using unhide rules.
            // Because of this, we specify `allFrames: true` when injecting them so
            // that we do not need to perform this operation for sub-frames.
            if (frameId === 0 && msg.lifecycle === 'start') {
                var _a = _this.getCosmeticsFilters({
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
                }), active = _a.active, styles = _a.styles;
                if (active === false) {
                    return;
                }
                _this.injectStyles(e.sender, styles);
            }
            // Separately, requests cosmetics which depend on the page it self
            // (either because of the hostname or content of the DOM). Content script
            // logic is responsible for returning information about lists of classes,
            // ids and hrefs observed in the DOM. MutationObserver is also used to
            // make sure we can react to changes.
            {
                var _b = _this.getCosmeticsFilters({
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
                }), active = _b.active, styles = _b.styles, scripts = _b.scripts;
                if (active === false) {
                    return;
                }
                _this.injectStyles(e.sender, styles);
                // Inject scripts from content script
                var responseFromBackground = {
                    active: active,
                    extended: [],
                    scripts: scripts,
                    styles: ''
                };
                e.sender.send("get-cosmetic-filters-" + id, responseFromBackground);
            }
        };
        _this.onRequest = function (details, callback) {
            var _a = _this.match(Request.fromElectronDetails(details)), redirect = _a.redirect, match = _a.match;
            if (redirect) {
                var dataUrl = redirect.dataUrl;
                callback({ redirectURL: dataUrl });
            }
            else {
                callback({ cancel: match });
            }
        };
        return _this;
    }
    ElectronBlocker.prototype.enableBlockingInSession = function (ses) {
        ses.webRequest.onBeforeRequest({ urls: ['<all_urls>'] }, this.onRequest);
        ses.setPreloads(["content.js"]);
        ipcMain.on('get-cosmetic-filters', this.onGetCosmeticFilters);
    };
    ElectronBlocker.prototype.injectStyles = function (sender, styles) {
        if (sender && styles.length > 0) {
            sender.insertCSS(styles);
        }
    };
    return ElectronBlocker;
}(Engine));
export default ElectronBlocker;
