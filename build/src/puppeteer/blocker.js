/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import * as tslib_1 from "tslib";
import { parse } from 'tldts';
import { extractFeaturesFromDOM } from '../content/helpers';
import { autoRemoveScript } from '../content/injection';
import Engine from '../engine/engine';
import Request from '../request';
/**
 * Wrap `FiltersEngine` into a Puppeteer-friendly helper class.
 */
var PuppeteerBlocker = /** @class */ (function (_super) {
    tslib_1.__extends(PuppeteerBlocker, _super);
    function PuppeteerBlocker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PuppeteerBlocker.prototype.enableBlockingInPage = function (page) {
        var _this = this;
        // Make sure request interception is enabled for `page` before proceeding
        return page.setRequestInterception(true).then(function () {
            // NOTE - page.setBypassCSP(enabled) might be needed to perform injections on some pages
            // NOTE - we currently do not perform CSP headers injection as there is
            // currently no way to modify responses in puppeteer. This feature could
            // easily be added if puppeteer implements the required capability.
            // Register callback for network requets filtering
            page.on('request', function (request) {
                _this.onRequest(request);
            });
            // Register callback to cosmetics injection (CSS + scriptlets)
            page.on('framenavigated', function (frame) { return tslib_1.__awaiter(_this, void 0, void 0, function () {
                var ex_1;
                return tslib_1.__generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            _a.trys.push([0, 2, , 3]);
                            return [4 /*yield*/, this.onFrame(frame)];
                        case 1:
                            _a.sent();
                            return [3 /*break*/, 3];
                        case 2:
                            ex_1 = _a.sent();
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); });
        });
    };
    PuppeteerBlocker.prototype.onFrame = function (frame) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var _a, ids, hrefs, classes, url, parsed, hostname, domain, _b, active, scripts, styles, i;
            return tslib_1.__generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, frame.$$eval('[id],[class],[href]', extractFeaturesFromDOM)];
                    case 1:
                        _a = _c.sent(), ids = _a.ids, hrefs = _a.hrefs, classes = _a.classes;
                        url = frame.url();
                        parsed = parse(url);
                        hostname = parsed.hostname || '';
                        domain = parsed.domain || '';
                        _b = this.getCosmeticsFilters({
                            domain: domain,
                            hostname: hostname,
                            url: url,
                            // DOM information
                            classes: classes,
                            hrefs: hrefs,
                            ids: ids
                        }), active = _b.active, scripts = _b.scripts, styles = _b.styles;
                        // Abort if cosmetics are disabled
                        if (active === true) {
                            // Inject scripts
                            for (i = 0; i < scripts.length; i += 1) {
                                frame
                                    .addScriptTag({
                                    content: autoRemoveScript(scripts[i])
                                })["catch"](function () {
                                    // Ignore
                                });
                            }
                            // Inject CSS
                            if (styles.length !== 0) {
                                frame
                                    .addStyleTag({
                                    content: styles
                                })["catch"](function () {
                                    // Ignore
                                });
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    PuppeteerBlocker.prototype.onRequest = function (request) {
        var _a = this.match(Request.fromPuppeteerDetails(request)), redirect = _a.redirect, match = _a.match;
        if (redirect !== undefined) {
            var body = redirect.body, contentType = redirect.contentType;
            request.respond({
                body: body,
                contentType: contentType
            });
        }
        else if (match === true) {
            request.abort('blockedbyclient');
        }
        else {
            request["continue"]();
        }
    };
    return PuppeteerBlocker;
}(Engine));
export default PuppeteerBlocker;
