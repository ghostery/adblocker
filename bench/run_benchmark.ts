/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

// TODO - split in several benchmarking files
// * real engine creation + network request benchmark with (server streaming data + launchers):
//    * node.js launcher
//    * browser launcher (webextension: Chromium + Firefox)
// Everything could be launched from a single runners (taking options?). This
// would dump a report which would be easy to inspect by a human (and also to
// automatically detect regressions?) -> it would be dumped on disk then only
// overwritten any time there is no regression of more than N%? (Or no
// regression at all)
//
// TODO: We could make it possible to run the benchmark in any browser
// supporting webextension by running it with Selenium, then streaming the data
// using a WebSocket. The adblocker would be running in the browser and
// processing the requests + making the measurement. We could also compare this
// with Node.js perf and output a summary.

import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

import * as Benchmark from 'benchmark';
import * as chalk from 'chalk';

import {
  benchCosmeticsFiltersParsing,
  benchEngineCreation,
  benchEngineDeserialization,
  benchEngineSerialization,
  benchGetCosmeticsFilters,
  benchGetCosmeticTokens,
  benchGetNetworkTokens,
  benchNetworkFiltersParsing,
  benchRequestParsing,
  benchStringTokenize,
} from './micro';
import requests from './requests';
import { createEngine, getFiltersFromLists, parseFilters } from './utils';

const GREP = (process.env.GREP || '').toLowerCase();

function loadLists(): { lists: string[]; resources: string } {
  return {
    lists: [
      readFileSync(
        resolve(__dirname, '../packages/adblocker/assets/easylist/easylist.txt'),
        { encoding: 'utf-8' },
      ),
    ],
    resources: readFileSync(
      resolve(__dirname, '../packages/adblocker/assets/ublock-origin/resources.txt'),
      { encoding: 'utf-8' },
    ),
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
  return process.memoryUsage().heapTotal;
}

interface BenchResult {
  opsPerSecond: number;
  relativeMarginOfError: number;
  numberOfSamples: number;
}

interface BenchMicroResults {
  [name: string]: BenchResult;
}

interface BenchResults {
  memory: BenchMemoryResult;
  microBenchmarks: BenchMicroResults;
}

/**
 * Micro benchmarks are a set of benchmarks measuring specific aspects of the library
 */
function runMicroBenchmarks(
  lists: string[],
  resources: string,
): { microBenchmarks: BenchMicroResults } {
  console.log('Run micro bench...');
  // Create adb engine to use in benchmark
  const { engine, serialized } = createEngine(
    lists,
    resources,
    {
      loadCosmeticFilters: true,
      loadNetworkFilters: true,
    },
    true /* Also serialize engine */,
  );

  const filters = getFiltersFromLists(lists);
  const combinedLists = filters.join('\n');
  const { networkFilters, cosmeticFilters } = parseFilters(combinedLists);
  const results: BenchMicroResults = {};

  // Arguments shared among benchmarks
  const args = {
    combinedLists,
    cosmeticFilters,
    engine,
    filters,
    lists,
    networkFilters,
    requests,
    resources,
    serialized,
  };

  [
    benchCosmeticsFiltersParsing,
    benchEngineCreation,
    benchEngineDeserialization,
    benchEngineSerialization,
    benchGetCosmeticTokens,
    benchGetCosmeticsFilters,
    benchGetNetworkTokens,
    benchNetworkFiltersParsing,
    benchRequestParsing,
    benchStringTokenize,
  ].forEach((bench) => {
    if (bench.name.toLowerCase().includes(GREP)) {
      const suite = new Benchmark.Suite();
      suite
        .add(bench.name, () => bench(args))
        .on('cycle', (event: any) => {
          results[bench.name] = {
            numberOfSamples: event.target.stats.sample.length,
            opsPerSecond: event.target.hz,
            relativeMarginOfError: event.target.stats.rme,
          };
        })
        .run({ async: false });
    }
  });

  return {
    microBenchmarks: results,
  };
}

interface BenchMemoryResult {
  engineMemory: number;
  engineSerializedBytes: number;
}

function runMemoryBench(lists: string[], resources: string): { memory: BenchMemoryResult } {
  if ('runMemoryBench'.includes(GREP) === false) {
    return {
      memory: {
        engineMemory: NaN,
        engineSerializedBytes: NaN,
      },
    };
  }

  console.log('Run memory bench...');
  // Create adb engine to use in benchmark
  const baseMemory = getMemoryConsumption();
  const { serialized } = createEngine(
    lists,
    resources,
    {
      loadCosmeticFilters: true,
      loadNetworkFilters: true,
    },
    true /* Also serialize engine */,
  );
  const engineMemory = getMemoryConsumption() - baseMemory;

  return {
    memory: {
      engineMemory,
      engineSerializedBytes: serialized === undefined ? 0 : serialized.byteLength,
    },
  };
}

function compareNumbers(
  name: string,
  {
    number1,
    number2,
    unit,
    moreIsBetter,
  }: {
    number1: number;
    number2: number;
    unit: string;
    moreIsBetter: boolean;
  },
) {
  const multiplicator = number2 / number1;

  const nameOutput = chalk.yellow.bold(name);
  const ok = () =>
    console.log(
      `${chalk.black.bold.bgGreen('OK')} ${nameOutput} ${chalk.red(
        '' + Math.floor(number1),
      )} ~> ${chalk.green.bold('' + Math.floor(number2))} ${unit} (x${multiplicator.toFixed(2)})`,
    );
  const notOk = () =>
    console.log(
      `${chalk.yellow.bold.bgRed('FAIL')} ${nameOutput} ${chalk.green(
        '' + Math.floor(number1),
      )} ~> ${chalk.red.bold('' + Math.floor(number2))} ${unit} (x${multiplicator.toFixed(2)})`,
    );
  const neutral = () =>
    console.log(
      `${chalk.black.bold.bgWhite('OK')} ${nameOutput} ${chalk.green.bold(
        '' + Math.floor(number2),
      )} ${unit}`,
    );

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

function compareMemoryResults(results1: BenchMemoryResult, results2: BenchMemoryResult) {
  compareNumbers('engineSerializedBytes', {
    moreIsBetter: false,
    number1: results1.engineSerializedBytes,
    number2: results2.engineSerializedBytes,
    unit: 'bytes',
  });

  compareNumbers('engineMemory', {
    moreIsBetter: false,
    number1: results1.engineMemory,
    number2: results2.engineMemory,
    unit: 'MB',
  });
}

function compareMicroBenchmarkResults(results1: BenchMicroResults, results2: BenchMicroResults) {
  Object.keys(results1).forEach((key) => {
    if (results2[key] !== undefined) {
      compareNumbers(key, {
        moreIsBetter: true,
        number1: results1[key].opsPerSecond,
        number2: results2[key].opsPerSecond,
        unit: 'ops/sec',
      });
    }
  });
}

function compareBenchmarkResults(results1: BenchResults, results2: BenchResults) {
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
}

function main() {
  console.log('Get lists...');
  const { lists, resources } = loadLists();

  console.log('Run Benchmark...');
  const benchmarkResults = {
    ...runMemoryBench(lists, resources),
    ...runMicroBenchmarks(lists, resources),
  };
  console.log(benchmarkResults);

  // Read previous bench dump if any
  const benchDumpPath = '.bench.json';
  try {
    const previousResults = JSON.parse(readFileSync(benchDumpPath, { encoding: 'utf-8' }));
    compareBenchmarkResults(previousResults, benchmarkResults);
  } catch (ex) {
    /* No previous result to compare to */
    compareBenchmarkResults(benchmarkResults, benchmarkResults);
  }

  // Dump current results
  writeFileSync(benchDumpPath, JSON.stringify(benchmarkResults), { encoding: 'utf-8' });
}

main();
