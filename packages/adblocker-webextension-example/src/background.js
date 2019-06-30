/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import * as tslib_1 from "tslib";
import { fetchLists, fetchResources, WebExtensionBlocker } from '@cliqz/adblocker-webextension';
/**
 * Initialize the adblocker using lists of filters and resources. It returns a
 * Promise resolving on the `Engine` that we will use to decide what requests
 * should be blocked or altered.
 */
function loadAdblocker() {
    console.log('Fetching resources...');
    return Promise.all([fetchLists(), fetchResources()]).then(function (_a) {
        var _b = tslib_1.__read(_a, 2), responses = _b[0], resources = _b[1];
        console.log('Initialize adblocker...');
        var deduplicatedLines = new Set();
        for (var i = 0; i < responses.length; i += 1) {
            var lines = responses[i].split(/\n/g);
            for (var j = 0; j < lines.length; j += 1) {
                deduplicatedLines.add(lines[j]);
            }
        }
        var deduplicatedFilters = Array.from(deduplicatedLines).join('\n');
        var t0 = Date.now();
        var engine = WebExtensionBlocker.parse(deduplicatedFilters, {
            enableCompression: true
        });
        var total = Date.now() - t0;
        console.log('parsing filters', total);
        t0 = Date.now();
        engine.updateResources(resources, '' + resources.length);
        total = Date.now() - t0;
        console.log('parsing resources', total);
        t0 = Date.now();
        var serialized = engine.serialize();
        total = Date.now() - t0;
        console.log('serialization', total);
        console.log('size', serialized.byteLength);
        t0 = Date.now();
        var deserialized = WebExtensionBlocker.deserialize(serialized);
        total = Date.now() - t0;
        console.log('deserialization', total);
        return deserialized;
    });
}
/**
 * Keep track of number of network requests altered for each tab
 */
var counter = new Map();
/**
 * Helper function used to both reset, increment and show the current value of
 * the blocked requests counter for a given tabId.
 */
function updateBlockedCounter(tabId, _a) {
    var _b = _a === void 0 ? {} : _a, _c = _b.reset, reset = _c === void 0 ? false : _c, _d = _b.incr, incr = _d === void 0 ? false : _d;
    counter.set(tabId, (reset === true ? 0 : counter.get(tabId) || 0) + (incr === true ? 1 : 0));
    chrome.browserAction.setBadgeText({
        text: '' + (counter.get(tabId) || 0)
    });
}
// Whenever the active tab changes, then we update the count of blocked request
chrome.tabs.onActivated.addListener(function (_a) {
    var tabId = _a.tabId;
    return updateBlockedCounter(tabId);
});
loadAdblocker().then(function (engine) {
    // Start listening to requests, and allow 'blocking' so that we can cancel
    // some of them (or redirect).
    chrome.webRequest.onBeforeRequest.addListener(function (details) {
        var blockingResponse = engine.onBeforeRequest(details);
        updateBlockedCounter(details.tabId, {
            incr: Boolean(blockingResponse.cancel || blockingResponse.redirectUrl),
            reset: details.type === 'main_frame'
        });
        return blockingResponse;
    }, {
        urls: ['<all_urls>']
    }, ['blocking']);
    chrome.webRequest.onHeadersReceived.addListener(function (details) { return engine.onHeadersReceived(details); }, { urls: ['<all_urls>'], types: ['main_frame'] }, ['blocking', 'responseHeaders']);
    // Start listening to messages coming from the content-script
    chrome.runtime.onMessage.addListener(function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return engine.onRuntimeMessage.apply(engine, tslib_1.__spread(args));
    });
    console.log('Ready to roll!');
});
