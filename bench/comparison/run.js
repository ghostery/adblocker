const fs = require('fs');
const path = require('path');
const readline = require('readline');

const tldts = require('tldts');
const { makeRequest } = require('../../');

const UBlockOrigin = require('./ublock.js');
const Brave = require('./brave.js');
const Duckduckgo = require('./duckduckgo.js');
const Cliqz = require('./cliqz.js');
const AdBlockPlus = require('./adblockplus.js');

const ENGINE = process.argv[process.argv.length - 2];
const REQUESTS_PATH = process.argv[process.argv.length - 1];

console.log(`* ${ENGINE}`);

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

function avg(arr) {
  let sum = 0.0;
  for (let i = 0; i < arr.length; i += 1) {
    sum += arr[i];
  }

  return sum / arr.length;
}

function loadLists() {
  return fs.readFileSync(path.resolve(__dirname, './easylist.txt'), { encoding: 'utf-8' });
}

async function main() {
  const rawLists = loadLists();

  const Cls = {
    adblockplus: AdBlockPlus,
    brave: Brave,
    cliqz: Cliqz,
    duckduckgo: Duckduckgo,
    ublock: UBlockOrigin,
  }[ENGINE];

  // Parse rules
  let start = process.hrtime();
  let engine = Cls.parse(rawLists);
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
      diff = process.hrtime(start);
      serializationTimings.push((diff[0] * 1000000000 + diff[1]) / 1000000);
    }
    cacheSize = serialized.length;

    // Deserialize
    for (let i = 0; i < 100; i += 1) {
      start = process.hrtime();
      engine.deserialize(serialized);
      diff = process.hrtime(start);
      deserializationTimings.push((diff[0] * 1000000000 + diff[1]) / 1000000);
    }
  }

  // Create a clean engine for benchmarking
  engine = Cls.parse(rawLists);

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

  const pages = new Set();
  const domains = new Set();

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

    const parsed = makeRequest({
      ...request,
      type: request.cpt,
    }, tldts);

    if (parsed.domain === '' || parsed.hostname === '' || parsed.sourceHostname === '' || parsed.sourceDomain === '') {
      return;
    }

    pages.add(parsed.sourceUrl);
    domains.add(parsed.sourceDomain);

    // Process request for each engine
    start = process.hrtime();
    const match = engine.match(parsed);
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

  console.log();
  console.log('> Domains', domains.size);
  console.log('> Pages', pages.size);

  const cmp = (a, b) => a - b;

  stats.matches.sort(cmp);
  stats.noMatches.sort(cmp);
  stats.all = [
    ...stats.matches,
    ...stats.noMatches,
  ].sort(cmp);

  const { matches, noMatches, all } = stats;

  console.log();
  console.log(`Avg serialization time (${serializationTimings.length} samples): ${avg(serializationTimings)}`);
  console.log(`Avg deserialization time (${deserializationTimings.length} samples): ${avg(deserializationTimings)}`);
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
