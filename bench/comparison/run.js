const fs = require('fs');
const path = require('path');
const readline = require('readline');

const tldts = require('tldts');
const { makeRequest } = require('../../');

const initUblock = require('./ublock.js');
const initBrave = require('./brave.js');
const initDuckduckgo = require('./duckduckgo.js');
const initCliqz = require('./cliqz.js');

const CHECK_BRAVE = false;
const CHECK_DGG = false;
const CHECK_CLIQZ = true;
const CHECK_UBLOCK = false;

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

function triggerGC() {
  if (global.gc) {
    global.gc();
  } else {
    console.log('global.gc not available, measuring memory without.');
  }
}

function getMemoryConsumption() {
  return process.memoryUsage().heapUsed;
}

function loadLists() {
  return [
    // 'raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resource-abuse.txt',
    // 'raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/filters.txt',
    // 'raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/unbreak.txt',
    // 'raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/badware.txt',
    // 'easylist-downloads.adblockplus.org/antiadblockfilters.txt',
    // 'easylist.to/easylistgermany/easylistgermany.txt',
    // 'pgl.yoyo.org/adservers/serverlist.txt',
    // 'easylist.to/easylist/easyprivacy.txt',
    'easylist.to/easylist/easylist.txt',
  ].map(asset => fs.readFileSync(path.resolve(__dirname, '../../assets/', asset), { encoding: 'utf-8' })).join('\n');
}

async function main() {
  const rawLists = loadLists();

  const stats = {};
  const engines = [];

  [
    ['cliqz', CHECK_CLIQZ, initCliqz],
    ['ublock', CHECK_UBLOCK, initUblock],
    ['brave', CHECK_BRAVE, initBrave],
    ['ddg', CHECK_DGG, initDuckduckgo],
  ].forEach(([name, enabled, init]) => {
    if (enabled) {
      triggerGC();
      const baseMemory = getMemoryConsumption();

      console.log(`Loading ${name}...`);
      const start = process.hrtime();
      const engine = init(rawLists);
      const diff = process.hrtime(start);
      const totalHighResolution = (diff[0] * 1000000000 + diff[1]) / 1000000;

      const beforeGCMem = getMemoryConsumption();
      triggerGC();
      const afterGCMem = getMemoryConsumption();

      console.log(`Took ${totalHighResolution}`);
      console.log(`Memory before GC: ${beforeGCMem}`);
      console.log(`Memory after GC: ${afterGCMem}`);

      stats[name] = {
        timeToParseLists: totalHighResolution,
        memoryBeforeGC: beforeGCMem - baseMemory,
        memoryAfterGC: afterGCMem - baseMemory,
        matches: [],
        noMatches: [],
      };

      engines.push([name, engine]);
    }
  });

  const lines = readline.createInterface({
    input: fs.createReadStream(process.argv[process.argv.length - 1]),
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

    // Ignore query parameters
    const indexOfQuery = request.url.indexOf('?');
    if (indexOfQuery !== -1) {
      request.url = request.url.slice(0, indexOfQuery);
    }

    const parsed = makeRequest({
      ...request,
      type: request.cpt,
    }, tldts);

    if (parsed.domain === '' || parsed.hostname === '' || parsed.sourceHostname === '' || parsed.sourceDomain === '') {
      return;
    }

    // Process request for each engine
    for (let i = 0; i < engines.length; i += 1) {
      const [name, engine] = engines[i];
      const start = process.hrtime();
      const match = engine(parsed);
      const diff = process.hrtime(start);
      const totalHighResolution = (diff[0] * 1000000000 + diff[1]) / 1000000;

      if (match) {
        stats[name].matches.push(totalHighResolution);
      } else {
        stats[name].noMatches.push(totalHighResolution);
      }
    }
  });

  await new Promise((resolve) => {
    lines.on('close', resolve);
  });

  const cmp = (a, b) => a - b;

  for (let i = 0; i < engines.length; i += 1) {
    const [name] = engines[i];

    const engineStats = stats[name];
    engineStats.matches.sort(cmp);
    engineStats.noMatches.sort(cmp);
    engineStats.all = [
      ...engineStats.matches,
      ...engineStats.noMatches,
    ].sort(cmp);

    const { matches, noMatches, all } = engineStats;

    console.log();
    console.log(`>>>> ${name}`);
    console.log(`Total requests: ${all.length}`);
    console.log(`Total match: ${matches.length}`);
    console.log(`Total no match: ${noMatches.length}`);
    console.log();
    console.log(`Min match: ${min(matches)}`);
    console.log(`Max match: ${max(matches)}`);
    console.log(`Avg match: ${avg(matches)}`);
    console.log();
    console.log(`Min no match: ${min(noMatches)}`);
    console.log(`Max no match: ${max(noMatches)}`);
    console.log(`Avg no match: ${avg(noMatches)}`);
    console.log();
    console.log(`Min (total): ${min(all)}`);
    console.log(`Max (total): ${max(all)}`);
    console.log(`Avg (total): ${avg(all)}`);
  }

  fs.writeFileSync('all_timings.json', JSON.stringify(stats), { encoding: 'utf-8' });
}

main();
