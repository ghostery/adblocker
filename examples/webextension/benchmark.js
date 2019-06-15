/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */

const fs = require('fs');
const path = require('path');

const chalk = require('chalk');
const puppeteer = require('puppeteer');

const METRICS = [
  'Timestamp',
  'Documents',
  'Frames',
  'JSEventListeners',
  'Nodes',
  'LayoutCount',
  'RecalcStyleCount',
  'LayoutDuration',
  'RecalcStyleDuration',
  'ScriptDuration',
  'TaskDuration',
  'JSHeapUsedSize',
  'JSHeapTotalSize',

  // Custom addition, total loading time in milliseconds
  'TotalLoadTimeMs',
];

async function sleep(timestamp) {
  await new Promise((resolve) => {
    setTimeout(resolve, timestamp);
  });
}

function median(values) {
  if (values.length === 0) return 0;

  values.sort((a, b) => a - b);

  const half = Math.floor(values.length / 2);

  if (values.length % 2) {
    return values[half];
  }

  return (values[half - 1] + values[half]) / 2.0;
}

function metricsAvg(metricsArray) {
  const result = {};
  for (const dimension of METRICS) {
    result[dimension] = median(metricsArray.map(metrics => metrics[dimension]));
  }
  return result;
}

function percent(low, high) {
  return Math.floor(100.0 - (low / high) * 100.0);
}

function valuesCompare(dimension, name1, v1, name2, v2) {
  if (v1 > v2) {
    console.log(
      `    + ${chalk.bold(dimension)}: ${v1} vs. ${v2} (${name1} is ${chalk.underline(
        percent(v2, v1),
      )}% ${chalk.red('higher')})`,
    );
  } else if (v1 === v2) {
    console.log(`    + ${dimension}: ${v1} == ${v2}`);
  } else {
    console.log(
      `    + ${dimension}: ${v1} vs. ${v2} (${name1} is ${percent(v1, v2)}% ${chalk.green('lower')})`,
    );
  }
}

function metricsCompare(name1, metrics1, name2, metrics2) {
  for (let i = 0; i < metrics1.length; i += 1) {
    const m1 = metrics1[i];
    const m2 = metrics2[i];
    console.log(`  + ${chalk.underline(m1.url)}`);

    // TODO - check which requests were not blocked?
    valuesCompare('requests', name1, m1.requests.length, name2, m2.requests.length);

    for (const dimension of METRICS) {
      valuesCompare(dimension, name1, m1.metrics[dimension], name2, m2.metrics[dimension]);
    }
  }
}

async function runPage(browser, url) {
  console.log(`  > run benchmark on ${chalk.underline(url)}`);
  let page = await browser.newPage();

  console.log('    + warm-up cache');
  // Warm-up cache and keep track of all requests seen on the page
  const requests = [];
  const onRequest = (request) => {
    requests.push(request);
  };
  page.on('request', onRequest);
  await page.goto(url, { waitUntil: 'networkidle0' });
  page.removeListener('request', onRequest);
  console.log(`      + ${requests.length} requests`);
  await page.close();

  // await page.tracing.start([options]); TODO profiling information

  console.log('    + start benchmarking');
  const metricsArray = [];
  for (let i = 0; i < 5; i += 1) {
    try {
      page = await browser.newPage();
      const t0 = Date.now();
      await page.goto(url, { waitUntil: 'networkidle2' });
      const total = Math.floor(Date.now() - t0);
      console.log(`      + iteration ${i} (${total} ms)`);

      metricsArray.push({
        ...(await page.metrics()),
        TotalLoadTimeMs: total,
      });
      await page.close();
    } catch (ex) {
      console.error('Could not load', url);
    }
  }

  return {
    url,
    requests: requests.map(r => ({
      url: r.url(),
      method: r.method(),
      type: r.resourceType(),
      frame: r.frame() ? r.frame().url() : null,
    })),
    metrics: metricsAvg(metricsArray),
  };
}

async function runBenchmark(browser) {
  const results = [];
  for (const url of [
    'https://remusao.github.io',
    'https://spiegel.de',
    'https://bild.de',
    'https://wikipedia.org',
    'https://amazon.com',
    'https://reddit.com',
    'https://xvideos.com',
    'https://imdb.com',
    'https://google.com',
    'https://wikia.com',
    'https://youtube.com',
    'https://stackoverflow.com',
    'https://github.com',
    'https://theguardian.com',
    'https://mail.ru',
    'https://bbc.co.uk',
    'https://facebook.com',
    'https://pornhub.com',
    'https://microsoft.com',
    'https://xhamster.com',
  ]) {
    results.push(await runPage(browser, url));
  }

  return results;
}

function getBrowserWithExtension(pathToExtension) {
  return puppeteer.launch({
    headless: false,
    args: [
      `--disable-extensions-except=${pathToExtension}`,
      `--load-extension=${pathToExtension}`,
      // '--start-fullscreen',
    ],
  });
}

function getBrowserWithUBO() {
  return getBrowserWithExtension(path.join(__dirname, 'ublock'));
}

function getBrowserWithABP() {
  return getBrowserWithExtension(path.join(__dirname, 'abp'));
}

function getBrowserWithCliqz() {
  return getBrowserWithExtension(path.join(__dirname, '.'));
}

function getBrowserVanilla() {
  return puppeteer.launch({ headless: false });
}

(async () => {
  let results = {};
  const arg = process.argv[process.argv.length - 1];

  if (arg.endsWith('.json')) {
    results = JSON.parse(fs.readFileSync(arg, { encoding: 'utf-8' }));
  } else {
    for (const [name, createBrowser] of [
      ['abp', getBrowserWithABP],
      ['ublock', getBrowserWithUBO],
      ['cliqz', getBrowserWithCliqz],
      ['vanilla', getBrowserVanilla],
    ]) {
      console.log(`= Bench: ${chalk.bold(name)}`);
      const browser = await createBrowser();
      await sleep(10000);
      results[name] = await runBenchmark(browser);
      await browser.close();
    }
  }

  console.log();
  console.log('~ Cliqz vs. Vanilla');
  metricsCompare('Cliqz', results.cliqz, 'Vanilla', results.vanilla);

  console.log();
  console.log('~ Cliqz vs. uBO');
  metricsCompare('Cliqz', results.cliqz, 'uBO', results.ublock);

  console.log();
  console.log('~ Cliqz vs. ABP');
  metricsCompare('Cliqz', results.cliqz, 'ABP', results.abp);

  const output = 'results.json';
  console.log();
  console.log('Persisting results into', chalk.underline(output));
  fs.writeFileSync(output, JSON.stringify(results), { encoding: 'utf-8' });
})();
