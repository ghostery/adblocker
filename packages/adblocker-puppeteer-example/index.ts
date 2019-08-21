import { fullLists, PuppeteerBlocker, Request } from '@cliqz/adblocker-puppeteer';
import fetch from 'node-fetch';
import puppeteer from 'puppeteer';

(async () => {
  const engine = await PuppeteerBlocker.fromLists(fetch, fullLists);
  const browser = await puppeteer.launch({
    defaultViewport: null,
    headless: false,
  });

  const page = await browser.newPage();
  await engine.enableBlockingInPage(page);

  engine.on('request-blocked', (request: Request) => {
    console.log('blocked', request.url);
  });

  engine.on('request-redirected', (request: Request) => {
    console.log('redirected', request.url);
  });

  engine.on('request-whitelisted', (request: Request) => {
    console.log('whitelisted', request.url);
  });

  engine.on('csp-injected', (request: Request) => {
    console.log('csp', request.url);
  });

  engine.on('script-injected', (script: string, url: string) => {
    console.log('script', script.length, url);
  });

  engine.on('style-injected', (style: string, url: string) => {
    console.log('style', style.length, url);
  });

  await page.goto('https://www.mangareader.net/');
})();
