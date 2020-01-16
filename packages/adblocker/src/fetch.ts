/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

interface FetchResponse {
  text: () => Promise<string>;
  arrayBuffer: () => Promise<ArrayBuffer>;
  json: () => Promise<any>;
}

export type Fetch = (url: string) => Promise<FetchResponse>;

export function fetchWithRetry(fetch: Fetch, url: string): Promise<FetchResponse> {
  let retry = 3;

  // Wrap `fetch` into a lightweight retry function which makes sure that if
  // fetching fails, it can be retried up to three times. Failure can happen if
  // the remote server times-out, but retrying fetching of the same URL will
  // usually succeed.
  const fetchWrapper = (): Promise<FetchResponse> => {
    return fetch(url).catch((ex) => {
      if (retry > 0) {
        retry -= 1;
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            fetchWrapper()
              .then(resolve)
              .catch(reject);
          }, 500);
        });
      }

      throw ex;
    });
  };

  return fetchWrapper();
}

function fetchResource(fetch: Fetch, url: string): Promise<string> {
  return fetchWithRetry(fetch, url).then((response) => response.text());
}

export function fetchPrebuilt(
  fetch: Fetch,
  configUrl: string,
  engineVersion: number,
): Promise<Uint8Array> {
  return fetchWithRetry(fetch, configUrl)
    .then((response) => response.json())
    .then((allowedLists) => fetchWithRetry(fetch, allowedLists.engines[engineVersion].url))
    .then((response) => response.arrayBuffer())
    .then((buffer) => new Uint8Array(buffer));
}

export const adsLists = [
  'https://easylist.to/easylist/easylist.txt',
  'https://pgl.yoyo.org/adservers/serverlist.php?hostformat=adblockplus&showintro=0&mimetype=plaintext',
  'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/annoyances.txt',
  'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/badware.txt',
  'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/filters.txt',
  'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resource-abuse.txt',
  'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/unbreak.txt',

  'https://easylist.to/easylistgermany/easylistgermany.txt',
];

export const adsAndTrackingLists = [
  ...adsLists,
  'https://easylist.to/easylist/easyprivacy.txt',
  'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/privacy.txt',
];

export const fullLists = [
  ...adsAndTrackingLists,
  'https://easylist-downloads.adblockplus.org/fanboy-annoyance.txt',
  'https://easylist-downloads.adblockplus.org/easylist-cookie.txt',
];

/**
 * Fetch latest version of enabledByDefault blocking lists.
 */
export function fetchLists(fetch: Fetch, urls: string[]): Promise<string[]> {
  return Promise.all(urls.map((url) => fetchResource(fetch, url)));
}

function getResourcesUrl(fetch: Fetch): Promise<string> {
  return fetchWithRetry(
    fetch,
    'https://cdn.cliqz.com/adblocker/resources/ublock-resources/metadata.json',
  )
    .then((response) => response.json())
    .then(
      ({ revisions }) =>
        `https://cdn.cliqz.com/adblocker/resources/ublock-resources/${
          revisions[revisions.length - 1]
        }/list.txt`,
    );
}

/**
 * Fetch latest version of uBlock Origin's resources, used to inject scripts in
 * the page or redirect request to data URLs.
 */
export function fetchResources(fetch: Fetch): Promise<string> {
  return getResourcesUrl(fetch).then((url) => fetchResource(fetch, url));
}
