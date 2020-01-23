import { fullLists, PlaywrightBlocker, Request } from '@cliqz/adblocker-playwright';
import fetch from 'node-fetch';

import * as pw from 'playwright';

(async () => {
  const blocker = await PlaywrightBlocker.fromLists(fetch, fullLists, {
    enableCompression: true,
  });

  const browser = await pw.chromium.launch({ headless: false });
  // const browser = await pw.firefox.launch({ headless: false });
  // const browser = await pw.webkit.launch();

  const context = await browser.newContext();
  const page = await context.newPage();

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

  await page.goto('https://www.mangareader.net/');
  await page.screenshot({ path: 'output.png' });
  await blocker.disableBlockingInPage(page);
  await browser.close();
})();
