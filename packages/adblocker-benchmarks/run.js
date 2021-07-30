/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

const fs = require('fs');
const path = require('path');

const { _N, _T, _S } = require('./string.js');

const ENGINE = process.argv[process.argv.length - 2];
const REQUESTS_PATH = process.argv[process.argv.length - 1];

// Mute info-level output from uBlock Origin
console.info = () => {};

console.log(`* ${ENGINE}`);

// This maps puppeteer types to WebRequest types
const WEBREQUEST_OPTIONS = {
  // Consider document requests as sub_document. This is because the request
  // dataset does not contain sub_frame or main_frame but only 'document' and
  // different blockers have different behaviours.
  document: 'sub_frame',
  stylesheet: 'stylesheet',
  image: 'image',
  media: 'media',
  font: 'font',
  script: 'script',
  xhr: 'xmlhttprequest',
  fetch: 'xmlhttprequest',
  websocket: 'websocket',

  // other
  other: 'other',
  eventsource: 'other',
  manifest: 'other',
  texttrack: 'other',
};

function min(arr) {
  let acc = Infinity;
  for (let i = 0; i < arr.length; i += 1) {
    acc = Math.min(acc, arr[i]);
  }
  return acc;
}

function max(arr) {
  let acc = -Infinity;
  for (let i = 0; i < arr.length; i += 1) {
    acc = Math.max(acc, arr[i]);
  }
  return acc;
}

function sum(arr) {
  let s = 0.0;
  for (let i = 0; i < arr.length; i += 1) {
    s += arr[i];
  }
  return s;
}

function avg(arr) {
  return sum(arr) / arr.length;
}

function isSupportedUrl(url) {
  return !!url && (
    url.startsWith('http:')
    || url.startsWith('https:')
    || url.startsWith('ws:')
    || url.startsWith('wss:')
  );
}

function loadLists() {
  return fs.readFileSync(path.resolve(__dirname, './easylist.txt'), { encoding: 'utf-8' });
}

async function main() {
  const rawLists = loadLists();

  let Cls;
  switch (ENGINE) {
    case 'adblockplus':
      Cls = require('./blockers/adblockplus.js');
      break;
    case 'brave':
      Cls = require('./blockers/brave.js');
      break;
    case 'duckduckgo':
      Cls = require('./blockers/duckduckgo.js');
      break;
    case 'cliqz':
      Cls = require('./blockers/cliqz.js');
      break;
    case 'cliqzCompression':
      Cls = require('./blockers/cliqz-compression.js');
      break;
    case 're':
      Cls = require('./blockers/re_baseline.js');
      break;
    case 'tldts':
      Cls = require('./blockers/tldts_baseline.js');
      break;
    case 'ublock':
      Cls = require('./blockers/ublock.js');
      break;
    case 'url':
      Cls = require('./blockers/url_baseline.js');
      break;
    case 'adblockfast':
      Cls = require('./blockers/adblockfast.js');
      break;
    case 'min':
      Cls = require('./blockers/minbrowser.js');
      break;
    default:
      console.error(`Unknown blocker ${ENGINE}`);
      process.exit(1);
  }

  // Initialize
  if (Cls.initialize) {
    await Cls.initialize();
  }

  // Parse rules
  let start = process.hrtime();
  let engine = await Cls.parse(rawLists);
  let diff = process.hrtime(start);
  const parsingTime = (diff[0] * 1000000000 + diff[1]) / 1000000;

  // Bench serialization
  const serializationTimings = [];
  const deserializationTimings = [];
  let cacheSize = null;
  if (engine.serialize) {
    // Serialize
    let serialized;
    for (let i = 0; i < 100; i += 1) {
      start = process.hrtime();

      serialized = engine.serialize();
      if (serialized instanceof Promise) {
        serialized = await serialized;
      }

      diff = process.hrtime(start);
      serializationTimings.push((diff[0] * 1000000000 + diff[1]) / 1000000);
    }
    cacheSize = serialized.length || serialized.byteLength;

    // Deserialize
    for (let i = 0; i < 100; i += 1) {
      start = process.hrtime();
      const deserializing = engine.deserialize(serialized);
      if (deserializing instanceof Promise) {
        await deserializing;
      }

      diff = process.hrtime(start);
      deserializationTimings.push((diff[0] * 1000000000 + diff[1]) / 1000000);
    }
  }

  // Create a clean engine for benchmarking
  engine = await Cls.parse(rawLists);

  const stats = {
    parsingTime,
    serializationTimings,
    deserializationTimings,
    cacheSize,
    matches: [],
    noMatches: [],
  };

  const requests = fs.readFileSync(REQUESTS_PATH, 'utf8').split(/[\n\r]+/g).map(JSON.parse);
  let index = 0;
  for (const request of requests) {
    if (index !== 0 && index % 10000 === 0) {
      console.log(_N`Processed ${index} requests`);
    }
    index += 1;

    const { url, frameUrl, cpt } = request;

    if (!isSupportedUrl(url) || !isSupportedUrl(frameUrl)) {
      continue;
    }

    start = process.hrtime();
    const match = engine.match({ type: WEBREQUEST_OPTIONS[cpt], frameUrl, url });
    diff = process.hrtime(start);
    const totalHighResolution = (diff[0] * 1000000000 + diff[1]) / 1000000;

    if (match) {
      stats.matches.push(totalHighResolution);
    } else {
      stats.noMatches.push(totalHighResolution);
    }
  }

  const cmp = (a, b) => a - b;

  stats.matches.sort(cmp);
  stats.noMatches.sort(cmp);
  stats.all = [...stats.matches, ...stats.noMatches].sort(cmp);

  const { matches, noMatches, all } = stats;

  console.log();
  console.log(
    _N`Avg serialization time (${serializationTimings.length} samples): ` +
    _T`${avg(serializationTimings)}`,
  );
  console.log(
    _N`Avg deserialization time (${deserializationTimings.length} samples): ` +
    _T`${avg(deserializationTimings)}`,
  );
  console.log(_S`Serialized size: ${cacheSize}`);
  console.log(_T`List parsing time: ${parsingTime}`);
  console.log();
  console.log(_N`Total requests: ${all.length}`);
  console.log(_N`Total match: ${matches.length}`);
  console.log(_N`Total no match: ${noMatches.length}`);
  console.log();
  console.log(_N`Number of samples: ${matches.length}`);
  console.log(_T`Min match: ${min(matches)}`);
  console.log(_T`Max match: ${max(matches)}`);
  console.log(_T`Avg match: ${avg(matches)}`);
  console.log();
  console.log(_N`Number of samples: ${noMatches.length}`);
  console.log(_T`Min no match: ${min(noMatches)}`);
  console.log(_T`Max no match: ${max(noMatches)}`);
  console.log(_T`Avg no match: ${avg(noMatches)}`);
  console.log();
  console.log(_N`Number of samples: ${all.length}`);
  console.log(_T`Min (total): ${min(all)}`);
  console.log(_T`Max (total): ${max(all)}`);
  console.log(_T`Avg (total): ${avg(all)}`);

  fs.writeFileSync(`./data/${ENGINE}_timings.json`, JSON.stringify(stats), { encoding: 'utf-8' });
}

main();
