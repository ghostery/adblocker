import { fullLists, PuppeteerBlocker, Request } from '@cliqz/adblocker-puppeteer';
import fetch from 'node-fetch';
import * as puppeteer from 'puppeteer';
import { promises as fs } from 'fs';

function getUrlToLoad(): string {
  let url = 'https://www.mangareader.net/';
  if (process.argv[process.argv.length - 1].endsWith('.ts') === false) {
    url = process.argv[process.argv.length - 1];
  }

  return url;
}

(async () => {
  const blocker = await PuppeteerBlocker.fromLists(
    fetch,
    fullLists,
    {
      enableCompression: true,
    },
    {
      path: 'engine.bin',
      read: fs.readFile,
      write: fs.writeFile,
    },
  );

  const browser = await puppeteer.launch({
    // @ts-ignore
    defaultViewport: null,
    headless: false,
  });

  const page = await browser.newPage();
  await blocker.enableBlockingInPage(page);

  blocker.on('request-blocked', (request: Request) => {
    console.log('blocked', request.url);
  });

  blocker.on('request-redirected', (request: Request) => {
    console.log('redirected', request.url);
  });

  blocker.on('request-whitelisted', (request: Request) => {
    console.log('whitelisted', request.url);
  });

  blocker.on('csp-injected', (request: Request) => {
    console.log('csp', request.url);
  });

  blocker.on('script-injected', (script: string, url: string) => {
    console.log('script', script.length, url);
  });

  blocker.on('style-injected', (style: string, url: string) => {
    console.log('style', style.length, url);
  });

  await page.goto(getUrlToLoad());
})();
