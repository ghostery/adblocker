/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

export type Fetch = (url: string ) => Promise<{
  text: () => Promise<string>;
  arrayBuffer: () => Promise<ArrayBuffer>;
  json: () => Promise<any>;
}>;

function fetchResource(fetch: Fetch, url: string): Promise<string> {
  return fetch(url).then((response: any) => response.text());
}

export function fetchPrebuilt(
  fetch: Fetch,
  configUrl: string,
  engineVersion: number,
): Promise<Uint8Array> {
  return fetch(configUrl)
    .then((response) => response.json())
    .then((allowedLists) => fetch(allowedLists.engines[engineVersion].url))
    .then((response) => response.arrayBuffer())
    .then((buffer) => new Uint8Array(buffer));
}

const enum Category {
  Privacy,
  Ads,
  Unbreak,
  Circumvention,
  Country,
  Misc,
}

const lists = [
  {
    category: Category.Unbreak,
    enabledByDefault: true,
    url: 'https://easylist-downloads.adblockplus.org/antiadblockfilters.txt',
  },
  {
    category: Category.Country,
    country: 'de',
    enabledByDefault: true,
    url: 'https://easylist-downloads.adblockplus.org/easylistgermany.txt',
  },
  {
    category: Category.Ads,
    enabledByDefault: true,
    url: 'https://easylist.to/easylist/easylist.txt',
  },
  {
    category: Category.Privacy,
    enabledByDefault: false,
    url: 'https://easylist.to/easylist/easyprivacy.txt',
  },
  {
    category: Category.Ads,
    enabledByDefault: true,
    url:
      'https://pgl.yoyo.org/adservers/serverlist.php?hostformat=adblockplus&showintro=1&mimetype=plaintext',
  },
  {
    category: Category.Misc,
    enabledByDefault: true,
    url: 'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/badware.txt',
  },
  {
    category: Category.Ads,
    enabledByDefault: true,
    url: 'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/filters.txt',
  },
  {
    category: Category.Privacy,
    enabledByDefault: false,
    url: 'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/privacy.txt',
  },
  {
    category: Category.Misc,
    enabledByDefault: true,
    url:
      'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resource-abuse.txt',
  },
  {
    category: Category.Unbreak,
    enabledByDefault: true,
    url: 'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/unbreak.txt',
  },
  // Adguard filters
  {
    category: Category.Ads,
    description: 'English filters',
    enabledByDefault: false,
    url: 'https://filters.adtidy.org/extension/chromium/filters/2.txt',
  },
  {
    category: Category.Privacy,
    description: 'Spyware filters',
    enabledByDefault: false,
    url: 'https://filters.adtidy.org/extension/chromium/filters/3.txt',
  },
  {
    category: Category.Ads,
    description: 'German filters',
    enabledByDefault: false,
    url: 'https://filters.adtidy.org/extension/chromium/filters/6.txt',
  },
  {
    category: Category.Ads,
    description: 'Mobile ads filters',
    enabledByDefault: false,
    url: 'https://filters.adtidy.org/extension/chromium/filters/11.txt',
  },
];

export const adsLists = [
  'https://easylist.to/easylist/easylist.txt',
  // NOTE: the certificate from yoyo.org expired so for now we serve the list from a mirror on GitHub.
  // 'https://pgl.yoyo.org/adservers/serverlist.php?hostformat=adblockplus&showintro=1&mimetype=plaintext',
  'https://raw.githubusercontent.com/cliqz-oss/adblocker/master/packages/adblocker/assets/pgl.yoyo.org/adservers/serverlist.txt',
  'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resource-abuse.txt',
  'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/badware.txt',
  'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/filters.txt',
  'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/unbreak.txt',
];

export const adsAndTrackingLists = [
  ...adsLists,
  'https://easylist.to/easylist/easyprivacy.txt',
  'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/privacy.txt',
];

export const fullLists = [
  ...adsAndTrackingLists,
  'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/annoyances.txt',
  'https://easylist-downloads.adblockplus.org/fanboy-annoyance.txt',
  'https://www.fanboy.co.nz/fanboy-cookiemonster.txt'
];

/**
 * Fetch latest version of enabledByDefault blocking lists.
 */
export function fetchLists(fetch: Fetch, custom?: string[]): Promise<string[]> {
  return Promise.all(
    (custom || lists.filter(({ enabledByDefault }) => enabledByDefault).map(({ url }) => url)).map(
      (url) => fetchResource(fetch, url),
    ),
  );
}

/**
 * Fetch latest version of uBlock Origin's resources, used to inject scripts in
 * the page or redirect request to data URLs.
 */
export function fetchResources(
  fetch: Fetch,
  resourcesUrl: string = 'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resources.txt',
): Promise<string> {
  return fetchResource(fetch, resourcesUrl);
}
