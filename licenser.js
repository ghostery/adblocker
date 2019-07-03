const { promises } = require('fs');
const glob = require('glob');

const BLACKLIST = [
  'packages/adblocker/src/punycode.ts',
  'packages/adblocker/src/crc32.ts',
  'bench/comparison/blockers/adblockfast.js',
];

const PATTERNS = [
  './packages/*/LICENSE',
  './packages/*/jest.config.js',
  './packages/*/{src,test,example}/**/*.ts',
  './bench/comparison/shuffle_dataset.js',
  './bench/comparison/blockers/brave.js',
  './bench/comparison/blockers/re_baseline.js',
  './bench/comparison/blockers/adblockplus.js',
  './bench/comparison/blockers/adblockfast.js',
  './bench/comparison/blockers/ublock.js',
  './bench/comparison/blockers/url_baseline.js',
  './bench/comparison/blockers/duckduckgo.js',
  './bench/comparison/blockers/tldts_baseline.js',
  './bench/comparison/blockers/cliqz.js',
  './bench/comparison/blockers/cliqzCompression.js',
  './bench/comparison/create_dataset.js',
  './bench/comparison/run.js',
  './bench/run_benchmark.js',
  './bench/micro.js',
  './bench/utils.js',
];

const ABORT_ON_ERROR = process.argv[process.argv.length - 1] === '--ci';

function abort() {
  if (ABORT_ON_ERROR === true) {
    process.exit(1);
  }
}

const COPYRIGHT_HEADER_MARKER = '/*!';
const COPYRIGHT_NOTICE = `Copyright (c) 2017-${new Date().getFullYear()} Cliqz GmbH. All rights reserved.`;
const COPYRIGHT_HEADER = `/*!
 * ${COPYRIGHT_NOTICE}
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */`;

async function checkLicenseRoot(path, content) {
  if (!content.startsWith('Copyright')) {
    console.log(`No copyright notice in ${path}. Adding...`);
    abort();
    await promises.writeFile(path, `${COPYRIGHT_NOTICE}\n\n${content.trim()}`, { encoding: 'utf-8' });
  } else if (!content.startsWith(COPYRIGHT_NOTICE)) {
    const endOfNoticeIndex = content.indexOf('\n');
    if (endOfNoticeIndex === -1) {
      console.error('Could not parse notice, aborting...', path);
      abort();
      return;
    }

    console.log(`Notice out-dated in ${path}. Updating...`);
    console.log(`Found: ${content.slice(0, endOfNoticeIndex)}`);
    abort();
    await promises.writeFile(path, `${COPYRIGHT_NOTICE}\n\n${content.slice(endOfNoticeIndex).trim()}`, { encoding: 'utf-8' });
  } else {
    console.log('LICENSE is up-to-date!', path);
  }
}

async function checkLicense(path, content) {
  const copyrightStartIndex = content.indexOf(COPYRIGHT_HEADER_MARKER);

  if (copyrightStartIndex === -1) {
    console.log(`No copyright notice in ${path}. Adding...`);
    abort();
    await promises.writeFile(path, `${COPYRIGHT_HEADER}\n\n${content}`, { encoding: 'utf-8' });
  } else {
    const copyrightEndIndex = content.indexOf('*/', copyrightStartIndex);
    if (copyrightEndIndex === -1) {
      console.error('Could not parse header, aborting...', path);
      abort();
      return;
    }

    const copyrightHeader = content.slice(copyrightStartIndex, copyrightEndIndex + 2).trim();
    if (copyrightHeader !== COPYRIGHT_HEADER) {
      console.log(`Header out-dated in ${path}. Updating...`);
      console.log(`Found:\n${copyrightHeader}`);
      abort();
      await promises.writeFile(path, content.replace(copyrightHeader, COPYRIGHT_HEADER), {
        encoding: 'utf-8',
      });
    } else {
      console.log('Header is up-to-date!', path);
    }
  }
}

async function check(path) {
  if (BLACKLIST.some(b => path.endsWith(b))) {
    console.log('Ignoring blacklisted', path);
    return;
  }

  const content = (await promises.readFile(path, { encoding: 'utf-8' }));
  if (path.endsWith('LICENSE')) {
    await checkLicenseRoot(path, content);
  } else {
    await checkLicense(path, content);
  }
}

(async function main() {
  console.log('Start linting project...');
  const files = [].concat(...PATTERNS.map(p => glob.sync(p)));
  await Promise.all(files.map(check));
}());
