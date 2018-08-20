// TODO - split in several benchmarking files
// * real engine creation + network request benchmark with (server streaming data + launchers):
//    * node.js launcher
//    * browser launcher (webextension: Chromium + Firefox)
//    * node.js Brave launcher
// Everything could be launched from a single runners (taking options?). This
// would dump a report which would be easy to inspect by a human (and also to
// automatically detect regressions?) -> it would be dumped on disk then only
// overwritten any time there is no regression of more than N%? (Or no
// regression at all)

const chalk = require('chalk');
const fs = require('fs');
const Benchmark = require('benchmark');
const fetch = require('cross-fetch');
const { AdBlockClient, FilterOptions } = require('ad-block');
const { parse } = require('tldjs');
const { createEngine, createBraveClient } = require('./utils');

const {
  benchEngineCreation,
  benchEngineOptimization,
  benchEngineSerialization,
  benchEngineDeserialization,
  benchNetworkFiltersParsing,
  benchCosmeticsFiltersParsing,
  benchStringHashing,
  benchStringTokenize,

  benchBraveDeserialize,
  benchBraveSerialize,
  // benchBraveEngineCreation,
} = require('./micro');


function fetchResource(url) {
  return fetch(url).then(response => response.text());
}


async function loadLists() {
  return {
    lists: await Promise.all([
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
    ].map(fetchResource)),
    resources: await fetchResource('https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resources.txt'),
  };
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

function triggerGC() {
  if (global.gc) {
    global.gc();
  } else {
    console.log('global.gc not available, measuring memory without.');
  }
}

function getMemoryConsumption() {
  triggerGC();
  return process.memoryUsage().heapUsed / 1024 / 1024;
}

function createBraveEngine(lists) {
  const client = createBraveClient(lists);

  // TODO getParsingStats
  // console.log('Brave parsing stats', client.getParsingStats());

  return {
    // Implement match using same API as FiltersEngine
    match: ({ cpt, sourceUrl, url }) => ({
      match: client.matches(
        url,
        typesToBrave[cpt] || FilterOptions.noFilterOption,
        parse(sourceUrl).domain,
      ),
    }),
    findMatchingFilters: ({ cpt, sourceUrl, url }) => client.findMatchingFilters(
      url,
      typesToBrave[cpt] || FilterOptions.noFilterOption,
      parse(sourceUrl).domain,
    ),
  };
}

function createCliqzEngine(lists, resources) {
  const { engine } = createEngine(lists, resources, {
    loadCosmeticFilters: true,
    loadNetworkFilters: true,
  });

  return {
    match: req => engine.match(req),
    findMatchingFilters: (req) => {
      const {
        match, exception, filter,
      } = engine.match(req);
      return {
        matches: match,
        matchingFilter: match ? filter : undefined,
        matchingExceptionFilter: exception ? filter : undefined,
      };
    },
  };
}


function createEngines(lists, resources) {
  // Create Engine
  console.log('Create engine');
  let baseLineMemory = getMemoryConsumption();
  const engine = createCliqzEngine(lists, resources);
  const engineConsumption = getMemoryConsumption() - baseLineMemory;
  console.log(`Engine consumption: ${engineConsumption} MB`);

  // Create Brave Engine
  console.log('Create Brave engine');
  baseLineMemory = getMemoryConsumption();
  const braveEngine = createBraveEngine(lists, resources);
  // TODO: This does not seem to count memory allocated by Brave
  const braveEngineConsumption = getMemoryConsumption() - baseLineMemory;
  console.log(`Brave Engine consumption: ${braveEngineConsumption} MB`);

  return {
    engine,
    braveEngine,
  };
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

const NANOSECS_PER_SEC = 1e9;

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


function getFiltersFromLists(lists) {
  const filters = [];

  for (let i = 0; i < lists.length; i += 1) {
    const splitted = lists[i].split(/\n/g);
    for (let j = 0; j < splitted.length; j += 1) {
      filters.push(splitted[j]);
    }
  }

  return filters;
}


/**
 * Micro benchmarks are a set of benchmarks measuring specific aspects of the library
 */
function runMiroBenchmarks(lists, resources) {
  // Create adb engine to use in benchmark
  const { engine, serialized } = createEngine(lists, resources, {
    loadCosmeticFilters: true,
    loadNetworkFilters: true,
    optimizeAOT: true,
  }, true /* Also serialize engine */);

  // Create Brave engine to use in benchmark
  const braveEngine = new AdBlockClient();
  braveEngine.parse(lists.join('\n'));

  const serializedBraveEngine = braveEngine.serialize();

  const filters = getFiltersFromLists(lists);
  const results = {};

  // Arguments shared among benchmarks
  const args = {
    lists,
    resources,
    engine,
    filters,
    serialized,
    braveEngine,
    serializedBraveEngine,
  };

  [
    benchEngineOptimization,
    benchStringHashing,
    benchCosmeticsFiltersParsing,
    benchStringTokenize,
    benchNetworkFiltersParsing,
    benchEngineCreation,
    benchEngineDeserialization,
    benchEngineSerialization,

    benchBraveDeserialize,
    benchBraveSerialize,

    // NOTE: this is a bit slow but probably not very relevant as
    // serialization/deserialization is very fast and is likely used in
    // production.
    // benchBraveEngineCreation,
  ].forEach((bench) => {
    const suite = new Benchmark.Suite();
    suite.add(bench.name, () => bench(args)).on('cycle', (event) => {
      results[bench.name] = {
        opsPerSecond: event.target.hz,
        relativeMarginOfError: event.target.stats.rme,
        numberOfSamples: event.target.stats.sample.length,
      };
    }).run({ async: false });
  });

  return {
    engineStats: {
      numFilters: engine.size,
      numCosmeticFilters: engine.cosmetics.size,
      numExceptionFilters: engine.exceptions.size,
      numImportantFilters: engine.importants.size,
      numRedirectFilters: engine.redirects.size,
    },
    braveEngineStats: braveEngine.getParsingStats(),
    microBenchmarks: results,
  };
}


function runMemoryBench(lists, resources) {
  // Create adb engine to use in benchmark
  let baseMemory = getMemoryConsumption();
  // eslint-disable-next-line no-unused-vars
  const { engine, serialized } = createEngine(lists, resources, {
    loadCosmeticFilters: true,
    loadNetworkFilters: true,
    optimizeAOT: true,
  }, true /* Also serialize engine */);
  const engineMemory = getMemoryConsumption() - baseMemory;

  // Create Brave engine to use in benchmark
  baseMemory = getMemoryConsumption();
  const braveEngine = new AdBlockClient();
  braveEngine.parse(lists.join('\n'));
  const braveEngineMemory = getMemoryConsumption() - baseMemory;

  const serializedBraveEngine = braveEngine.serialize();

  return {
    memory: {
      engineSerializedBytes: serialized.byteLength,
      engineMemory,
      braveEngineSerializedBytes: serializedBraveEngine.byteLength,
      braveEngineMemory,
    },
  };
}


function compareNumbers(name, {
  number1,
  relativeMarginOfError1,
  number2,
  relativeMarginOfError2,
  unit,
}) {
  const number1WithError = number1 * (1.0 + (relativeMarginOfError1 / 100.0));
  const number2WithError = number2 * (1.0 - (relativeMarginOfError2 / 100.0));
  const change = Math.floor(((number2WithError - number1WithError) / number2WithError) * 100.0);

  if (change > 0) {
    console.log(`${chalk.grey.bold.bgRed(name)} ${chalk.green(Math.floor(number1))} ~> ${chalk.red.bold(Math.floor(number2))} ${unit} (+${change}%)`);
  } else {
    console.log(`${chalk.grey.bold.bgGreen(name)} ${chalk.red(Math.floor(number1))} ~> ${chalk.green.bold(Math.floor(number2))} ${unit} (${change}%)`);
  }
}

function compareMemoryResults(results1, results2) {
  compareNumbers('engineSerializedBytes', {
    number1: results1.engineSerializedBytes,
    relativeMarginOfError1: 0.0,
    number2: results2.engineSerializedBytes,
    relativeMarginOfError2: 0.0,
    unit: 'bytes',
  });
  compareNumbers('engineMemory', {
    number1: results1.engineMemory,
    relativeMarginOfError1: 0.0,
    number2: results2.engineMemory,
    relativeMarginOfError2: 0.0,
    unit: 'MB',
  });
}

function compareMicroBenchmarkResults(results1, results2) {
  Object.keys(results1).forEach((key) => {
    if (results2[key] !== undefined) {
      compareNumbers(key, {
        number1: results1[key].opsPerSecond,
        relativeMarginOfError1: results1[key].relativeMarginOfError,
        number2: results2[key].opsPerSecond,
        relativeMarginOfError2: results2[key].relativeMarginOfError,
        unit: 'ops/sec',
      });
    }
  });
}

function compareBenchmarkResults(results1, results2) {
  compareMemoryResults(results1.memory, results2.memory);
  console.log();
  compareMicroBenchmarkResults(results1.microBenchmarks, results2.microBenchmarks);
}

async function main() {
  console.log('Get lists...');
  const { lists, resources } = await loadLists();

  const benchmarkResults = {
    ...runMemoryBench(lists, resources),
    ...runMiroBenchmarks(lists, resources),
  };

  // Read previous bench dump if any
  const benchDumpPath = '.bench.json';
  try {
    const previousResults = JSON.parse(fs.readFileSync(
      benchDumpPath,
      { encoding: 'utf-8' },
    ));
    compareBenchmarkResults(previousResults, benchmarkResults);
  } catch (ex) {
    /* No previous result to compare to */
    console.error('EX', ex);
  }

  // Dump current results
  fs.writeFileSync(
    benchDumpPath,
    JSON.stringify(benchmarkResults),
    { encoding: 'utf-8' },
  );

  return;

  console.log('Loading requests...');
  const requests = loadRequests();

  console.log('Creating engine...');
  const { engine, braveEngine } = createEngines(lists, resources);
  compareResults(engine, braveEngine, requests);

  console.log('>>>> tld.js baseline');
  runBenchmark({
    match: ({ url, sourceUrl }) => ((parse(url).domain || '').length + (parse(sourceUrl).domain || '').length) > 0,
  }, requests);

  console.log('>>>> Engine');
  runBenchmark(engine, requests);

  console.log('>>>> Brave Engine');
  runBenchmark(braveEngine, requests);
}

main();
