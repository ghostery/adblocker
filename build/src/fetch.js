/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
function fetchResource(url) {
    return fetch(url).then(function (response) { return response.text(); });
}
var lists = [
    {
        category: 2 /* Unbreak */,
        enabledByDefault: true,
        url: 'https://easylist-downloads.adblockplus.org/antiadblockfilters.txt'
    },
    {
        category: 4 /* Country */,
        country: 'de',
        enabledByDefault: true,
        url: 'https://easylist-downloads.adblockplus.org/easylistgermany.txt'
    },
    {
        category: 1 /* Ads */,
        enabledByDefault: true,
        url: 'https://easylist.to/easylist/easylist.txt'
    },
    {
        category: 0 /* Privacy */,
        enabledByDefault: false,
        url: 'https://easylist.to/easylist/easyprivacy.txt'
    },
    {
        category: 1 /* Ads */,
        enabledByDefault: true,
        url: 'https://pgl.yoyo.org/adservers/serverlist.php?hostformat=adblockplus&showintro=1&mimetype=plaintext'
    },
    {
        category: 5 /* Misc */,
        enabledByDefault: true,
        url: 'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/badware.txt'
    },
    {
        category: 1 /* Ads */,
        enabledByDefault: true,
        url: 'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/filters.txt'
    },
    {
        category: 0 /* Privacy */,
        enabledByDefault: false,
        url: 'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/privacy.txt'
    },
    {
        category: 5 /* Misc */,
        enabledByDefault: true,
        url: 'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resource-abuse.txt'
    },
    {
        category: 2 /* Unbreak */,
        enabledByDefault: true,
        url: 'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/unbreak.txt'
    },
    // Adguard filters
    {
        category: 1 /* Ads */,
        description: 'English filters',
        enabledByDefault: false,
        url: 'https://filters.adtidy.org/extension/chromium/filters/2.txt'
    },
    {
        category: 0 /* Privacy */,
        description: 'Spyware filters',
        enabledByDefault: false,
        url: 'https://filters.adtidy.org/extension/chromium/filters/3.txt'
    },
    {
        category: 1 /* Ads */,
        description: 'German filters',
        enabledByDefault: false,
        url: 'https://filters.adtidy.org/extension/chromium/filters/6.txt'
    },
    {
        category: 1 /* Ads */,
        description: 'Mobile ads filters',
        enabledByDefault: false,
        url: 'https://filters.adtidy.org/extension/chromium/filters/11.txt'
    },
];
/**
 * Fetch latest version of enabledByDefault blocking lists.
 */
export function fetchLists() {
    return Promise.all(lists.filter(function (_a) {
        var enabledByDefault = _a.enabledByDefault;
        return enabledByDefault;
    }).map(function (_a) {
        var url = _a.url;
        return fetchResource(url);
    }));
}
/**
 * Fetch latest version of uBlock Origin's resources, used to inject scripts in
 * the page or redirect request to data URLs.
 */
export function fetchResources() {
    return fetchResource('https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resources.txt');
}
