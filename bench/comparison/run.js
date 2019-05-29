/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/* eslint-disable no-await-in-loop */

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const UBlockOrigin = require('./blockers/ublock.js');
const Brave = require('./blockers/brave.js');
const Duckduckgo = require('./blockers/duckduckgo.js');
const Cliqz = require('./blockers/cliqz.js');
const AdBlockPlus = require('./blockers/adblockplus.js');
const Tldts = require('./blockers/tldts_baseline.js');
const Url = require('./blockers/url_baseline.js');
const Re = require('./blockers/re_baseline.js');
const AdblockFast = require('./blockers/adblockfast.js');

const ENGINE = process.argv[process.argv.length - 2];
const REQUESTS_PATH = process.argv[process.argv.length - 1];

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
  let acc = Number.MAX_VALUE;
  for (let i = 0; i < arr.length; i += 1) {
    acc = Math.min(acc, arr[i]);
  }
  return acc;
}

function max(arr) {
  let acc = -1;
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

  const Cls = {
    adblockplus: AdBlockPlus,
    brave: Brave,
    duckduckgo: Duckduckgo,
    cliqz: Cliqz,
    re: Re,
    tldts: Tldts,
    ublock: UBlockOrigin,
    url: Url,
    adblockfast: AdblockFast,
  }[ENGINE];

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

  const lines = readline.createInterface({
    input: fs.createReadStream(REQUESTS_PATH),
    crlfDelay: Infinity,
  });

  let index = 0;
  lines.on('line', (line) => {
    if (index !== 0 && index % 10000 === 0) {
      console.log(`Processed ${index} requests`);
    }
    index += 1;

    let request = null;
    try {
      request = JSON.parse(line);
    } catch (ex) {
      return;
    }

    const { url, frameUrl, cpt } = request;

    if (!isSupportedUrl(url) || !isSupportedUrl(frameUrl)) {
      return;
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
  });

  await new Promise((resolve) => {
    lines.on('close', resolve);
  });

  const cmp = (a, b) => a - b;

  stats.matches.sort(cmp);
  stats.noMatches.sort(cmp);
  stats.all = [...stats.matches, ...stats.noMatches].sort(cmp);

  const { matches, noMatches, all } = stats;

  console.log();
  console.log(
    `Avg serialization time (${serializationTimings.length} samples): ${avg(
      serializationTimings,
    )}`,
  );
  console.log(
    `Avg deserialization time (${deserializationTimings.length} samples): ${avg(
      deserializationTimings,
    )}`,
  );
  console.log(`Serialized size: ${cacheSize}`);
  console.log(`List parsing time: ${parsingTime}`);
  console.log();
  console.log(`Total requests: ${all.length}`);
  console.log(`Total match: ${matches.length}`);
  console.log(`Total no match: ${noMatches.length}`);
  console.log();
  console.log(`Number of samples: ${matches.length}`);
  console.log(`Min match: ${min(matches)}`);
  console.log(`Max match: ${max(matches)}`);
  console.log(`Avg match: ${avg(matches)}`);
  console.log();
  console.log(`Number of samples: ${noMatches.length}`);
  console.log(`Min no match: ${min(noMatches)}`);
  console.log(`Max no match: ${max(noMatches)}`);
  console.log(`Avg no match: ${avg(noMatches)}`);
  console.log();
  console.log(`Number of samples: ${all.length}`);
  console.log(`Min (total): ${min(all)}`);
  console.log(`Max (total): ${max(all)}`);
  console.log(`Avg (total): ${avg(all)}`);

  fs.writeFileSync(`./data/${ENGINE}_timings.json`, JSON.stringify(stats), { encoding: 'utf-8' });
}

main();
