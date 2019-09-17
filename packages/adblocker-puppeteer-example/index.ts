import { fullLists, PuppeteerBlocker, Request } from '@cliqz/adblocker-puppeteer';
import fetch from 'node-fetch';
import puppeteer from 'puppeteer';

(async () => {
  const blocker = await PuppeteerBlocker.fromLists(fetch, fullLists, {
    enableCompression: true,
  });
  const browser = await puppeteer.launch({
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

  await page.goto('https://www.mangareader.net/');
})();
