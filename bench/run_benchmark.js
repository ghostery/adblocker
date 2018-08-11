const fs = require('fs');
const adblocker = require('../adblocker.umd.js');
const fetch = require('cross-fetch');

const lists = [
  'https://easylist.to/easylist/easylist.txt',
  'https://easylist.to/easylist/easyprivacy.txt',
  'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/badware.txt',
  'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/filters.txt',
  'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/privacy.txt',
  'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resource-abuse.txt',
  'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/unbreak.txt',
];

function fetchResource(url) {
  return fetch(url).then(response => response.text());
}

// TODO
// 1. Load dump of URLs created by `create_dataset`
// 2. Create engine using specified set of lists
// 3. Run all URLs through the engine, measuring the execution time
// 4. Output statistics about the benchmark as well as memory usage
//
// TODO: We could make it possible to run the benchmark in any browser
// supporting webextension by running it with Selenium, then streaming the data
// using a WebSocket. The adblocker would be running in the browser and
// processing the requests + making the measurement. We could also compare this
// with Node.js perf and output a summary.

const types = {
  // maps string (web-ext) to int (FF cpt)
  beacon: 19,
  csp_report: 17,
  font: 14,
  image: 3,
  imageset: 21,
  main_frame: 6,
  media: 15,
  object: 5,
  object_subrequest: 12,
  other: 1,
  ping: 10,
  script: 2,
  stylesheet: 4,
  sub_frame: 7,
  web_manifest: 22,
  websocket: 16,
  xbl: 9,
  xml_dtd: 13,
  xmlhttprequest: 11,
  xslt: 18,
};

function loadRequests() {
  const requestsPath = process.argv[process.argv.length - 1];
  return fs.readFileSync(requestsPath, { encoding: 'utf-8' })
    .split(/\n/g)
    .map((line) => {
      try { return JSON.parse(line); } catch (ex) { return null; }
    })
    .filter(r => r !== null);
}

function createEngine() {
  const engine = new adblocker.FiltersEngine({
    loadCosmeticFilters: true,
    loadNetworkFilters: true,
    optimizeAOT: false,
    version: 1,
  });

  return Promise.all([
    Promise.all(lists.map(fetchResource)),
    fetchResource('https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resources.txt'),
  ]).then(([filters, resources]) => {
    const lists = [];
    for (let i = 0; i < filters.length; i += 1) {
      lists.push({
        asset: '' + i,
        checksum: '',
        filters: filters[i],
      });
    }

    engine.onUpdateResource([{ filters: resources, checksum: '' }]);
    engine.onUpdateFilters(lists, new Set());

    return engine;
  });
}

function runBenchmark(engine, requests) {
  for (let i = 0; i < 5 * 200000; i += 1) {
    const request = requests[i % requests.length];
    engine.match({
      cpt: types[request.type],
      sourceUrl: request.sourceUrl,
      url: request.url,
    });
  }
}


const NANOSECS_PER_SEC = 1e9;
const MICROSECS_PER_SEC = 1e6;
const MS_PER_SEC = 1e3;


function getMemoryConsumption() {
  global.gc();
  return process.memoryUsage().heapUsed / 1024 / 1024;
}

function main() {
  const baseLineMemory = getMemoryConsumption();

  console.log('Creating engine...');
  return createEngine().then((engine) => {
    const engineMemory = getMemoryConsumption() - baseLineMemory;
    console.log('Loading requests...');
    const requests = loadRequests();

    console.log(`Start benchmark with ${requests.length} requests...`);

    const t0 = process.hrtime();
    runBenchmark(engine, requests);
    const diff = process.hrtime(t0);
    const nanoseconds = diff[0] * NANOSECS_PER_SEC + diff[1];

    // Timings
    console.log('Total', nanoseconds, 'ns');
    // console.log('Total', nanoseconds / MICROSECS_PER_SEC, 'μs');
    // console.log('Total', nanoseconds / MICROSECS_PER_SEC, 'ms');
    console.log('Total', nanoseconds / NANOSECS_PER_SEC, 'seconds');

    console.log('Avg', nanoseconds / (5 * requests.length), 'ns/request');
    console.log('Avg', (nanoseconds / (5 * requests.length)) / 1e6, 'ms/request');
    console.log('Avg', (nanoseconds / (5 * requests.length)) / NANOSECS_PER_SEC, 'second/request');

    // Memory used
    console.log(`Approximate memory usage: ${getMemoryConsumption()} MB`);
    console.log(`Base consumption: ${baseLineMemory} MB`);
    console.log(`Engine consumption: ${engineMemory} MB`);
  });
}

main();
