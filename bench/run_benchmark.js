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
//
// TODO
// * Output statistics about the benchmark as well as memory usage
//
// TODO: We could make it possible to run the benchmark in any browser
// supporting webextension by running it with Selenium, then streaming the data
// using a WebSocket. The adblocker would be running in the browser and
// processing the requests + making the measurement. We could also compare this
// with Node.js perf and output a summary.
//
// TODO: Update to tld.js next major version for perf boost

const fs = require('fs');

const chalk = require('chalk');
const Benchmark = require('benchmark');
const fetch = require('cross-fetch');

const {
  createEngine, createBraveClient, NANOSECS_PER_SEC, loadRequests, getFiltersFromLists,
} = require('./utils');

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

const {
  benchTldsBaseline,
  benchMatching,
  benchBraveMatching,
} = require('./macro');

const { compareResults } = require('./compare');

function fetchResource(url) {
  return fetch(url).then(response => response.text());
}


async function loadLists() {
  return {
    lists: await Promise.all([
      'https://easylist.to/easylist/easylist.txt',

      'https://easylist-downloads.adblockplus.org/easylistgermany.txt',
      'https://easylist-downloads.adblockplus.org/antiadblockfilters.txt',
      'https://easylist.to/easylist/easylist.txt',
      // 'https://easylist.to/easylist/easyprivacy.txt',
      'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/badware.txt',
      'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/filters.txt',
      // 'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/privacy.txt',
      'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resource-abuse.txt',
      'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/unbreak.txt',
    ].map(fetchResource)),
    resources: await fetchResource('https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resources.txt'),
  };
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


function runMacroBenchmarks(lists, resources) {
  console.log('Loading requests...');
  const requests = loadRequests();

  console.log('Creating engine...');
  const { engine } = createEngine(lists, resources, {
    loadCosmeticFilters: false,
    loadNetworkFilters: true,
    optimizeAOT: true,
  });

  console.log('Creating Brave engine...');
  const braveEngine = createBraveClient(lists);

  const results = {};

  [
    benchTldsBaseline,
    benchMatching,
    benchBraveMatching,
  ].forEach((bench) => {
    triggerGC();
    const t0 = process.hrtime();
    bench({
      engine,
      braveEngine,
      requests,
    });
    const diff = process.hrtime(t0);
    const seconds = diff[0] + (diff[1] / NANOSECS_PER_SEC);
    const opsPerSecond = requests.length / seconds;
    results[bench.name] = {
      opsPerSecond,
      relativeMarginOfError: 0.0,
      numberOfSamples: 1,
    };
  });

  return {
    macroBenchmarks: results,
  };
}

/**
 * Micro benchmarks are a set of benchmarks measuring specific aspects of the library
 */
function runMicroBenchmarks(lists, resources) {
  // Create adb engine to use in benchmark
  const { engine, serialized } = createEngine(lists, resources, {
    loadCosmeticFilters: true,
    loadNetworkFilters: true,
    optimizeAOT: true,
  }, true /* Also serialize engine */);

  // Create Brave engine to use in benchmark
  const braveEngine = createBraveClient(lists);
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
  const braveEngine = createBraveClient(lists);
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
  number2,
  unit,
  moreIsBetter,
}) {
  const multiplicator = number2 / number1;

  const nameOutput = chalk.yellow.bold(name);
  const ok = () => console.log(`${chalk.black.bold.bgGreen('OK')} ${nameOutput} ${chalk.red(Math.floor(number1))} ~> ${chalk.green.bold(Math.floor(number2))} ${unit} (x${multiplicator.toFixed(2)})`);
  const notOk = () => console.log(`${chalk.yellow.bold.bgRed('FAIL')} ${nameOutput} ${chalk.green(Math.floor(number1))} ~> ${chalk.red.bold(Math.floor(number2))} ${unit} (x${multiplicator.toFixed(2)})`);
  const neutral = () => console.log(`${chalk.black.bold.bgWhite('OK')} ${nameOutput} ${chalk.green.bold(Math.floor(number2))} ${unit}`);

  if (multiplicator > 1.001) {
    if (moreIsBetter) {
      ok();
    } else {
      notOk();
    }
  } else if (Math.abs(1.0 - multiplicator) <= 0.01) {
    neutral();
  } else if (moreIsBetter) {
    notOk();
  } else {
    ok();
  }
}

function compareMemoryResults(results1, results2) {
  compareNumbers('engineSerializedBytes', {
    number1: results1.engineSerializedBytes,
    number2: results2.engineSerializedBytes,
    unit: 'bytes',
    moreIsBetter: false,
  });

  compareNumbers('engineMemory', {
    number1: results1.engineMemory,
    number2: results2.engineMemory,
    unit: 'MB',
    moreIsBetter: false,
  });

  console.log();
  compareNumbers('Versus Brave Serialized', {
    number1: results2.braveEngineSerializedBytes,
    number2: results2.engineSerializedBytes,
    unit: 'bytes',
    moreIsBetter: false,
  });
}

function compareMacroBenchmarkResults(results1, results2) {
  Object.keys(results1).forEach((key) => {
    if (results2[key] !== undefined) {
      compareNumbers(key, {
        number1: results1[key].opsPerSecond,
        number2: results2[key].opsPerSecond,
        unit: 'ops/sec',
        moreIsBetter: true,
      });
    }
  });

  // Versus Brave
  console.log();
  compareNumbers('Versus Brave Matching', {
    number1: results2.benchBraveMatching.opsPerSecond,
    number2: results2.benchMatching.opsPerSecond,
    unit: 'ops/sec',
    moreIsBetter: true,
  });
}

function compareMicroBenchmarkResults(results1, results2) {
  Object.keys(results1).forEach((key) => {
    if (results2[key] !== undefined) {
      compareNumbers(key, {
        number1: results1[key].opsPerSecond,
        number2: results2[key].opsPerSecond,
        unit: 'ops/sec',
        moreIsBetter: true,
      });
    }
  });

  // Versus Brave
  console.log();
  compareNumbers('Versus Brave Serialize', {
    number1: results2.benchBraveSerialize.opsPerSecond,
    number2: results2.benchEngineSerialization.opsPerSecond,
    unit: 'ops/sec',
    moreIsBetter: true,
  });
  compareNumbers('Versus Brave Deserialize', {
    number1: results2.benchBraveDeserialize.opsPerSecond,
    number2: results2.benchEngineDeserialization.opsPerSecond,
    unit: 'ops/sec',
    moreIsBetter: true,
  });
}

function compareBenchmarkResults(results1, results2) {
  console.log(chalk.bold('Memory Benchmark:'));
  console.log(chalk.bold('================='));
  if (results1.memory !== undefined && results2.memory !== undefined) {
    compareMemoryResults(results1.memory, results2.memory);
  }

  console.log();
  console.log(chalk.bold('Micro Benchmark:'));
  console.log(chalk.bold('================'));
  if (results1.microBenchmarks !== undefined && results2.microBenchmarks !== undefined) {
    compareMicroBenchmarkResults(results1.microBenchmarks, results2.microBenchmarks);
  }

  console.log();
  console.log(chalk.bold('Macro Benchmark:'));
  console.log(chalk.bold('================'));
  if (results1.macroBenchmarks !== undefined && results2.macroBenchmarks !== undefined) {
    compareMacroBenchmarkResults(results1.macroBenchmarks, results2.macroBenchmarks);
  }
}

async function main() {
  console.log('Get lists...');
  const { lists, resources } = await loadLists();

  // TODO: enable with a flag
  compareResults(lists, resources);
  return;

  const benchmarkResults = {
    ...runMemoryBench(lists, resources),
    ...runMicroBenchmarks(lists, resources),
    ...runMacroBenchmarks(lists, resources),
  };
  console.log(benchmarkResults);

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
    compareBenchmarkResults(benchmarkResults, benchmarkResults);
  }

  // Dump current results
  fs.writeFileSync(
    benchDumpPath,
    JSON.stringify(benchmarkResults),
    { encoding: 'utf-8' },
  );
}

main();
