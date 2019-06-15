import axios from 'axios';
import puppeteer from 'puppeteer';
import { ENGINE_VERSION, PuppeteerBlocker } from '../../';

async function loadAdblocker(): Promise<PuppeteerBlocker> {
  // Fetch `allowed-lists.json` from CDN. It contains information about where
  // to find pre-built engines as well as lists of filters (e.g.: Easylist,
  // etc.).
  console.time('fetch allowed lists');
  const { engines } = (await axios.get(
    'https://cdn.cliqz.com/adblocker/configs/desktop-ads-trackers/allowed-lists.json',
  )).data;
  console.timeEnd('fetch allowed lists');

  // Once we have the config, we can get the URL of the pre-built engine
  // corresponding to our installed @cliqz/adblocker version (i.e.:
  // ENGINE_VERSION). This guarantees that we can download a compabitle one.
  console.time('fetch serialized engine');
  const serialized = (await axios.get(engines[ENGINE_VERSION].url, {
    responseType: 'arraybuffer',
  })).data;
  console.timeEnd('fetch serialized engine');

  // Deserialize the FiltersEngine instance from binary form.
  console.time('deserialize engine');
  const engine = PuppeteerBlocker.deserialize(new Uint8Array(serialized)) as PuppeteerBlocker;
  console.timeEnd('deserialize engine');

  return engine;
}

(async () => {
  const engine = await loadAdblocker();
  const browser = await puppeteer.launch({
    defaultViewport: null,
    headless: false,
  });

  const page = await browser.newPage();
  await engine.enableBlockingInPage(page);
  await page.goto('https://www.mangareader.net/');
  await page.goto('https://economist.com/');
  await page.goto('https://spiegel.de/');
})();
