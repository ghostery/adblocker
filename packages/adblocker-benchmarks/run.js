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

const requests = require('./requests.json');

const ENGINE = process.argv[2];
const FLAGS = process.argv.slice(3).filter(arg => arg.startsWith('--'));

const DEBUG = FLAGS.includes('--debug');
const HOSTS_ONLY = FLAGS.includes('--hosts-only');

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
  ping: 'ping',

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
  const filename = HOSTS_ONLY ? 'hosts.txt' : 'easylist.txt';
  let content = fs.readFileSync(path.resolve(__dirname, filename), { encoding: 'utf-8' })
                .replace(/^\[Adblock\b.*\n/, '');

  if (!HOSTS_ONLY) {
    content += fs.readFileSync(path.resolve(__dirname, 'easyprivacy.txt'), { encoding: 'utf-8' })
               .replace(/^\[Adblock\b.*\n/, '');
  }

  // Remove filters with regular expression patterns containing lookahead and
  // lookbehind assertions.
  // https://github.com/cliqz-oss/adblocker/discussions/2114#discussioncomment-1135161
  //
  // Note: The regular expression below is not right, but it does the job.
  content = content.replace(/^(@@)?\/.*\(\?.*/gm, '');

  return content;
}

function wait(milliseconds) {
  return new Promise(resolve => {
    setTimeout(resolve, milliseconds);
  });
}

async function memoryUsage(base = { heapUsed: 0, heapTotal: 0, }) {
  if (!FLAGS.includes('--memory')) {
    return ({ heapUsed: 0, heapTotal: 0, });
  }

  gc();

  // Wait for 1 second for GC to run
  await wait(1000);

  let { heapUsed, heapTotal, } = process.memoryUsage();

  heapUsed -= base.heapUsed;
  heapTotal -= base.heapTotal;

  return ({ heapUsed, heapTotal, });
}

async function debug(moduleId, rawLists) {
  const output = [];

  const Cls = require(moduleId);

  if (Cls.initialize) {
    await Cls.initialize({ hostsOnly: HOSTS_ONLY });
  }

  const engine = await Cls.parse(rawLists);

  for (let index = 0; index < requests.length; index += 1) {
    const { url, frameUrl, cpt } = requests[index];

    if (!isSupportedUrl(url) || !isSupportedUrl(frameUrl)) {
      continue;
    }

    const match = engine.match({ type: WEBREQUEST_OPTIONS[cpt], frameUrl, url });

    let matchDebug = null;
    if (engine.matchDebug) {
      matchDebug = engine.matchDebug({ type: WEBREQUEST_OPTIONS[cpt], frameUrl, url });
    }

    output.push({ index, url, frameUrl, cpt, match, matchDebug });
  }

  fs.writeFileSync(`./${ENGINE}.debug.json`, JSON.stringify(output, null, 2));

  console.log(`./${ENGINE}.debug.json`);
}

async function main() {
  const rawLists = loadLists();

  let moduleId;
  switch (ENGINE) {
    case 'adblockplus':
      moduleId = './blockers/adblockplus.js';
      break;
    case 'brave':
      moduleId = './blockers/brave.js';
      break;
    case 'duckduckgo':
      moduleId = './blockers/duckduckgo.js';
      break;
    case 'cliqz':
      moduleId = './blockers/cliqz.js';
      break;
    case 'cliqzCompression':
      moduleId = './blockers/cliqz-compression.js';
      break;
    case 're':
      moduleId = './blockers/re_baseline.js';
      break;
    case 'tldts':
      moduleId = './blockers/tldts_baseline.js';
      break;
    case 'ublock':
      moduleId = './blockers/ublock.js';
      break;
    case 'url':
      moduleId = './blockers/url_baseline.js';
      break;
    case 'adblockfast':
      moduleId = './blockers/adblockfast.js';
      break;
    case 'min':
      moduleId = './blockers/minbrowser.js';
      break;
    case 'hosts-lookup':
      moduleId = './blockers/hosts-lookup.js';
      break;
    case 'tsurlfilter':
      moduleId = './blockers/tsurlfilter.js';
      break;
    default:
      console.error(`Unknown blocker ${ENGINE}`);
      process.exit(1);
  }

  if (DEBUG) {
    return debug(moduleId, rawLists);
  }

  const baseMemory = await memoryUsage();

  // Initialize
  let start = process.hrtime();
  const Cls = require(moduleId);

  if (Cls.initialize) {
    await Cls.initialize({ hostsOnly: HOSTS_ONLY });
  }

  let diff = process.hrtime(start);
  const initializationTime = (diff[0] * 1000000000 + diff[1]) / 1000000;

  const initializationMemory = await memoryUsage(baseMemory);

  // Parse rules
  start = process.hrtime();
  let engine = await Cls.parse(rawLists);
  diff = process.hrtime(start);
  const parsingTime = (diff[0] * 1000000000 + diff[1]) / 1000000;

  const parsingMemory = await memoryUsage(baseMemory);

  // Bench serialization
  const serializationTimings = [];
  const deserializationTimings = [];
  let cacheSize = null;
  if (engine.serialize && !FLAGS.includes('--skip-serialization')) {
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

    if (!(cpt in WEBREQUEST_OPTIONS)) {
      console.warn(`Warning: Unrecognized type '${cpt}'`);
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
  console.log(_T`Initialization time: ${initializationTime}`);
  console.log();
  console.log(_N`Total requests: ${stats.all.length}`);
  console.log(_N`Total match: ${stats.matches.length}`);
  console.log(_N`Total no match: ${stats.noMatches.length}`);
  console.log();
  console.log(_N`Number of samples: ${stats.matches.length}`);
  console.log(_T`Min match: ${min(stats.matches)}`);
  console.log(_T`Max match: ${max(stats.matches)}`);
  console.log(_T`Avg match: ${avg(stats.matches)}`);
  console.log();
  console.log(_N`Number of samples: ${stats.noMatches.length}`);
  console.log(_T`Min no match: ${min(stats.noMatches)}`);
  console.log(_T`Max no match: ${max(stats.noMatches)}`);
  console.log(_T`Avg no match: ${avg(stats.noMatches)}`);
  console.log();
  console.log(_N`Number of samples: ${stats.all.length}`);
  console.log(_T`Min (total): ${min(stats.all)}`);
  console.log(_T`Max (total): ${max(stats.all)}`);
  console.log(_T`Avg (total): ${avg(stats.all)}`);
  console.log();

  fs.writeFileSync(`./data/${ENGINE}_timings.json`, JSON.stringify(stats), { encoding: 'utf-8' });

  // [!] Important: Release references to objects so GC can free up the
  //     associated memory.
  stats.matches = [];
  stats.noMatches = [];
  stats.all = [];

  const matchingMemory = await memoryUsage(baseMemory);

  if (FLAGS.includes('--memory')) {
    console.log('Memory on initialization');
    console.log(_S`Heap used: ${initializationMemory.heapUsed}`);
    console.log(_S`Heap total: ${initializationMemory.heapTotal}`);
    console.log();
    console.log(_N`Memory after parsing ${rawLists.split(/\n/g).length} lines`);
    console.log(_S`Heap used: ${parsingMemory.heapUsed}`);
    console.log(_S`Heap total: ${parsingMemory.heapTotal}`);
    console.log();
    console.log(_N`Memory after matching ${requests.length} requests`);
    console.log(_S`Heap used: ${matchingMemory.heapUsed}`);
    console.log(_S`Heap total: ${matchingMemory.heapTotal}`);
    console.log();
  }
}

main();
