const fs = require('fs');

const adblocker = require('../adblocker.umd.js');
const fetch = require('cross-fetch');
const { AdBlockClient, FilterOptions } = require('ad-block');
const { parse } = require('tldjs');

const lists = [
  'https://easylist.to/easylist/easylist.txt',

  // 'https://easylist-downloads.adblockplus.org/easylistgermany.txt',
  // 'https://easylist-downloads.adblockplus.org/antiadblockfilters.txt',
  // 'https://easylist.to/easylist/easylist.txt',
  // 'https://easylist.to/easylist/easyprivacy.txt',
  // 'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/badware.txt',
  // 'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/filters.txt',
  // 'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/privacy.txt',
  // 'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resource-abuse.txt',
  // 'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/unbreak.txt',
];

function fetchResource(url) {
  return fetch(url).then(response => response.text());
}

// TODO
// * Output statistics about the benchmark as well as memory usage
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

const typesToBrave = {
  font: FilterOptions.font,
  image: FilterOptions.image,
  imageset: FilterOptions.image,
  main_frame: FilterOptions.document,
  media: FilterOptions.media,
  object: FilterOptions.object,
  object_subrequest: FilterOptions.objectSubrequest,
  other: FilterOptions.other,
  ping: FilterOptions.ping,
  script: FilterOptions.script,
  stylesheet: FilterOptions.stylesheet,
  sub_frame: FilterOptions.subdocument,
  websocket: FilterOptions.websocket,
  xbl: FilterOptions.xbl,
  xmlhttprequest: FilterOptions.xmlHttpRequest,
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

function getMemoryConsumption() {
  if (global.gc) {
    global.gc();
  } else {
    console.log('global.gc not available, measuring memory without.');
  }

  return process.memoryUsage().heapUsed / 1024 / 1024;
}

function createBraveEngine(filtersLists, resources) {
  const client = new AdBlockClient();

  for (let i = 0; i < filtersLists.length; i += 1) {
    client.parse(filtersLists[i]);
  }

  // TODO getParsingStats
  console.log('Brave parsing stats', client.getParsingStats());

  return {
    // Implement match using same API as FiltersEngine
    match: ({ cpt, sourceUrl, url }) => ({
      match: client.matches(url, typesToBrave[cpt] || FilterOptions.noFilterOption, parse(sourceUrl).domain)
    }),
    findMatchingFilters: ({ cpt, sourceUrl, url }) =>
      client.findMatchingFilters(url, typesToBrave[cpt] || FilterOptions.noFilterOption, parse(sourceUrl).domain),
  };
}

function createEngine(filtersLists, resources) {
  const engine = new adblocker.FiltersEngine({
    loadCosmeticFilters: false,
    loadNetworkFilters: true,
    optimizeAOT: false,
    version: 1,
  });

  const lists = [];
  for (let i = 0; i < filtersLists.length; i += 1) {
    lists.push({
      asset: '' + i,
      checksum: '',
      filters: filtersLists[i],
    });
  }

  engine.onUpdateResource([{ filters: resources, checksum: '' }]);
  engine.onUpdateFilters(lists, new Set());

  return {
    match: req => engine.match(req),
    findMatchingFilters: (req) => {
      const { match, redirect, exception, filter } = engine.match(req);
      return {
        matches: match,
        matchingFilter: match ? filter : undefined,
        matchingExceptionFilter: exception ? filter: undefined,
      };
    },
  };
}

function createEngines() {
  return Promise.all([
    Promise.all(lists.map(fetchResource)),
    fetchResource('https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resources.txt'),
  ]).then(([filtersLists, resources]) => {
    // Create Engine
    console.log('Create engine');
    let baseLineMemory = getMemoryConsumption();
    const engine = createEngine(filtersLists, resources);
    const engineConsumption = getMemoryConsumption() - baseLineMemory;
    console.log(`Engine consumption: ${engineConsumption} MB`);

    // Create Brave Engine
    console.log('Create Brave engine');
    baseLineMemory = getMemoryConsumption();
    const braveEngine = createBraveEngine(filtersLists, resources);
    // TODO: This does not seem to count memory allocated by Brave
    const braveEngineConsumption = getMemoryConsumption() - baseLineMemory;
    console.log(`Brave Engine consumption: ${braveEngineConsumption} MB`);

    return {
      engine,
      braveEngine,
    };
  });
}

function compareResults(engine, braveEngine, requests) {
  for (let i = 0; i < requests.length; i += 1) {
    const request = requests[i % requests.length];
    if (request.sourceUrl === undefined) { continue; }
    const requestInfo = {
      cpt: types[request.cpt],
      sourceUrl: request.sourceUrl,
      url: request.url,
    };

    const match = engine.findMatchingFilters(requestInfo);

    // findMatchingFilters
    const braveMatch = braveEngine.findMatchingFilters(requestInfo);

    if (match.matches !== braveMatch.matches) {
      console.log('Mismatch', {
        ...requestInfo,
        match,
        braveMatch,
      });
    }
  }
}

function runBenchmark(engine, requests, requestsToProcess = null) {
  if (!requestsToProcess) {
    requestsToProcess = requests.length;
  }
  console.log(`Start benchmark with ${requests.length} requests...`);
  let noMatch = 0;
  const t0 = process.hrtime();

  for (let i = 0; i < requestsToProcess; i += 1) {
    const request = requests[i % requests.length];
    if (engine.match({
      cpt: types[request.cpt],
      sourceUrl: request.sourceUrl,
      url: request.url,
    }).match) {
      noMatch += 1;
    }
  }

  const diff = process.hrtime(t0);

  console.log('Number of matches', noMatch);
  const nanoseconds = diff[0] * NANOSECS_PER_SEC + diff[1];

  // Timings
  console.log('Total', nanoseconds, 'ns');
  // console.log('Total', nanoseconds / MICROSECS_PER_SEC, 'μs');
  // console.log('Total', nanoseconds / MICROSECS_PER_SEC, 'ms');
  console.log('Total', nanoseconds / NANOSECS_PER_SEC, 'seconds');

  console.log('Avg', nanoseconds / (requestsToProcess), 'ns/request');
  console.log('Avg', (nanoseconds / (requestsToProcess)) / 1e6, 'ms/request');
  console.log('Avg', (nanoseconds / (requestsToProcess)) / NANOSECS_PER_SEC, 'second/request');
}


const NANOSECS_PER_SEC = 1e9;
const MICROSECS_PER_SEC = 1e6;
const MS_PER_SEC = 1e3;



function main() {
  console.log('Creating engine...');
  return createEngines().then(({ engine, braveEngine }) => {
    console.log('Loading requests...');
    const requests = loadRequests();

    compareResults(engine, braveEngine, requests);

    console.log('>>>> tld.js baseline');
    runBenchmark({
      match: ({ url, sourceUrl }) =>
        ((parse(url).domain || '').length + (parse(sourceUrl).domain || '').length) > 0
    }, requests);

    console.log('>>>> Engine');
    runBenchmark(engine, requests);

    console.log('>>>> Brave Engine');
    runBenchmark(braveEngine, requests);
  });
}

main();
