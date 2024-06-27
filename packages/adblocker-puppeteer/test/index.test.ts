import { expect } from 'chai';
import 'mocha';

import * as e2e from '@cliqz/adblocker-e2e-testing';
import * as puppeteer from 'puppeteer';
import * as http from 'http';

import {
  fromPuppeteerDetails,
  getHostnameHashesFromLabelsBackward,
  PuppeteerBlocker,
} from '../src/index.js';
import { AddressInfo } from 'net';

describe('#fromPuppeteerDetails', () => {
  const baseFrame: Partial<puppeteer.Frame> = {
    url: () => 'https://sub.source.com',
  };

  const baseRequest: Partial<puppeteer.HTTPRequest> = {
    frame: () => baseFrame as puppeteer.Frame,
    resourceType: () => 'script',
    url: () => 'https://sub.url.com',
  };

  it('gets sourceUrl from frame', () => {
    expect(fromPuppeteerDetails(baseRequest as puppeteer.HTTPRequest)).to.deep.include({
      sourceHostnameHashes: getHostnameHashesFromLabelsBackward('sub.source.com', 'source.com'),
    });
  });

  it('gets type from resourceType', () => {
    expect(fromPuppeteerDetails(baseRequest as puppeteer.HTTPRequest)).to.deep.include({
      type: 'script',
    });
  });

  it('gets url from url', () => {
    expect(fromPuppeteerDetails(baseRequest as puppeteer.HTTPRequest)).to.deep.include({
      domain: 'url.com',
      hostname: 'sub.url.com',
      url: 'https://sub.url.com',
    });
  });
});

describe('#stylesInjection', () => {
  let server: http.Server;
  let port: number;
  let browser: puppeteer.Browser;
  let page: puppeteer.Page;

  before(async () => {
    server = http
      .createServer((req, res) => {
        if (req.method === 'GET') {
          res.writeHead(200, { 'Content-Type': 'text/html' });
          res.end('<html><title>Empty test HTML</title></html>');
        }
      })
      .listen(0, () => {
        const addressInfo = server.address() as AddressInfo;
        port = addressInfo.port;
        console.log('Test server listening on port', port);
      });
    browser = await puppeteer.launch();
    console.log('Puppeteer browser launched.');
    page = await browser.newPage();
    console.log('Puppeteer page opened.');
  });

  it('does not inject styles into original content', async () => {
    const url = `http://localhost:${port}`;
    const stylesInjectionPrefix = '<style';
    const blocker = PuppeteerBlocker.parse('###Meebo\\:AdElement\\.Root');

    await blocker.enableBlockingInPage(page);
    await page.goto(url, { waitUntil: 'networkidle2' });
    const contentWithoutAds = await page.content();

    await blocker.disableBlockingInPage(page);
    await page.goto(url, { waitUntil: 'networkidle2' });
    const content = await page.content();

    expect(contentWithoutAds).to.contain(stylesInjectionPrefix);
    expect(content).not.to.contain(stylesInjectionPrefix);
  });

  after(async () => {
    await page.close();
    console.log('Puppeteer page closed.');
    await browser.close();
    console.log('Puppeteer browser closed.');
    server.close(() => {
      console.log('Test server closed.');
    });
  });
});

describe('e2e', () => {
  let result: e2e.Result;

  before(async () => {
    const server = e2e.createServer();
    const address = await new Promise<string>((resolve, reject) => {
      server.listen(0, '127.0.0.1', () => {
        const addressInfo = server.address();

        if (typeof addressInfo === 'string') {
          resolve(addressInfo);
        } else if (addressInfo !== null) {
          resolve(`http://${addressInfo.address}:${addressInfo.port}/`);
        } else {
          reject(new Error('Failed to initialise the test server!'));
        }
      });
    });
    console.log('Test server listening at', address);
    const browser = await puppeteer.launch();
    console.log('Puppeteer browser launched.');
    const page = await browser.newPage();
    console.log('Puppeteer page opened.');
    const blocker = PuppeteerBlocker.parse(e2e.filters);
    blocker.updateResources(await e2e.getResources(), 'test');
    console.log('Filters parsed.');
    await blocker.enableBlockingInPage(page);
    await page.goto(address, { waitUntil: 'networkidle2' });
    console.log('Loaded the test page.');

    const el = await page.waitForSelector('#report > pre');
    if (!el) {
      throw new Error('Test page was not reached!');
    }

    result = JSON.parse(await el.evaluate((el) => el.textContent || 'null'));
    if (result === null) {
      throw new Error('Test page crashed!');
    }

    await page.close();
    console.log('Puppeteer page closed.');
    await browser.close();
    console.log('Puppeteer browser closed.');
    await new Promise<void>((resolve) => {
      server.close(() => {
        resolve();
      });
    });
    console.log('Test server closed.');
  });

  it('supports network and cosmetic filtering', () => {
    expect(result.network).to.include(e2e.NetworkFilteringCapability.RequestFiltering);
    expect(result.cosmetic).to.include(e2e.CosmeticFilteringCapability.StylesInjection);
  });

  it('injects scriptlets', () => {
    expect(result.cosmetic).to.include(e2e.CosmeticFilteringCapability.ScriptletInjecjtion);
  });
});
