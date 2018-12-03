function fetchResource(url: string): Promise<string> {
  return fetch(url).then((response: any) => response.text());
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
    enabledByDefault: false,
    url:
      'https://pgl.yoyo.org/adservers/serverlist.php?hostformat=adblockplus&showintro=1&mimetype=plaintext',
  },
  {
    category: Category.Misc,
    enabledByDefault: false,
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
];

/**
 * Fetch latest version of enabledByDefault blocking lists.
 */
export function fetchLists(): Promise<string[]> {
  return Promise.all(
    lists.filter(({ enabledByDefault }) => enabledByDefault).map(({ url }) => fetchResource(url)),
  );
}

/**
 * Fetch latest version of uBlock Origin's resources, used to inject scripts in
 * the page or redirect request to data URLs.
 */
export function fetchResources(): Promise<string> {
  return fetchResource(
    'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resources.txt',
  );
}
