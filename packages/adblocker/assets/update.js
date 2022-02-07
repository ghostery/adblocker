const fs = require('fs');
const path = require('path');
const got = require('got');
const adb = require('@cliqz/adblocker');

(async () => {
  // Update resources.txt
  fs.writeFileSync(
    path.join(__dirname, 'ublock-origin', 'resources.txt'),
    await got(
      `https://cdn.cliqz.com/adblocker/resources/ublock-resources/${(
        await got(
          'https://cdn.cliqz.com/adblocker/resources/ublock-resources/metadata.json',
        ).json()
      ).revisions.pop()}/list.txt`,
    ).text(),
    'utf-8',
  );

  let duplicatesCount = 0;
  let badfiltersCount = 0;

  const badfilters = new Map();
  const seen = new Map();

  // Update lists
  for (const [url, key] of [
    // uBO
    [
      'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/unbreak.txt',
      ['ublock-origin', 'unbreak.txt'],
    ],
    [
      'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/filters.txt',
      ['ublock-origin', 'filters.txt'],
    ],
    [
      'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/filters-2020.txt',
      ['ublock-origin', 'filters-2020.txt'],
    ],
    [
      'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/filters-2021.txt',
      ['ublock-origin', 'filters-2021.txt'],
    ],
    [
      'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/filters-2022.txt',
      ['ublock-origin', 'filters-2022.txt'],
    ],
    [
      'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/badware.txt',
      ['ublock-origin', 'badware.txt'],
    ],
    [
      'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resource-abuse.txt',
      ['ublock-origin', 'resource-abuse.txt'],
    ],
    [
      'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/annoyances.txt',
      ['ublock-origin', 'annoyances.txt'],
    ],
    [
      'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/privacy.txt',
      ['ublock-origin', 'privacy.txt'],
    ],

    // Peter Lowe
    [
      'https://pgl.yoyo.org/adservers/serverlist.php?hostformat=adblockplus&showintro=0&mimetype=plaintext',
      ['peter-lowe', 'serverlist.txt'],
    ],

    // Easylist
    ['https://easylist.to/easylist/easyprivacy.txt', ['easylist', 'easyprivacy.txt']],
    ['https://easylist.to/easylist/easylist.txt', ['easylist', 'easylist.txt']],
    ['https://secure.fanboy.co.nz/fanboy-cookiemonster.txt', ['easylist', 'easylist-cookie.txt']],
    [
      'https://easylist.to/easylistgermany/easylistgermany.txt',
      ['easylist', 'easylistgermany.txt'],
    ],

    // Fanboy
    // [
    //   'https://easylist-downloads.adblockplus.org/fanboy-annoyance.txt',
    //   ['fanboy', 'annoyance.txt'],
    // ],
  ]) {
    const lines = (await got(url).text())
      .split(/[\r\n]/g)
      .map((line) => line.trim())
      .map((line) => {
        const filter = adb.parseFilter(line);

        if (filter === null) {
          return line;
        }

        if (filter.isBadFilter?.()) {
          badfilters.set(filter.getIdWithoutBadFilter(), `${key.join('/')}`);
          return `! [badfilter] ${line}`;
        }

        const badfilter = badfilters.get(filter.getIdWithoutBadFilter?.());
        if (badfilter !== undefined) {
          badfiltersCount += 1;
          return `! [badfilter] from ${badfilter}\n! ${line}`;
        }

        const dup = seen.get(filter.getId());
        if (dup !== undefined) {
          duplicatesCount += 1;
          return `! [dup] from ${dup}\n! ${line}`;
        }

        seen.set(filter.getId(), `${key.join('/')}`);
        return line;
      });

    fs.writeFileSync(path.join(__dirname, ...key), lines.join('\n'), 'utf-8');
  }

  console.log({ duplicates: duplicatesCount, badfilters: badfiltersCount });
})();
