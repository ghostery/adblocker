import fetch from 'cross-fetch';

function fetchResource(url: string): Promise<string> {
  return fetch(url).then(response => response.text());
}

const defaultLists = [
  'https://easylist.to/easylist/easylist.txt',
  'https://easylist.to/easylist/easyprivacy.txt',
  'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/badware.txt',
  'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/filters.txt',
  'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/privacy.txt',
  'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resource-abuse.txt',
  'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/unbreak.txt',
];

/**
 * Fetch latest version of default blocking lists.
 */
export function fetchLists(lists: string[] = defaultLists): Promise<string[]> {
  return Promise.all(lists.map(fetchResource));
}

/**
 * Fetch latest version of uBlock Origin's resources, used to inject scripts in
 * the page or redirect request to data URLs.
 */
export function fetchResources(): Promise<string> {
  return fetchResource('https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resources.txt');
}
