import { expect } from 'chai';
import 'mocha';

import * as e2e from '@cliqz/adblocker-e2e-testing';
import * as pw from 'playwright';

import {
  PlaywrightBlocker,
  fromPlaywrightDetails,
  getHostnameHashesFromLabelsBackward,
} from '../src/index.js';

describe('#fromPlaywrightDetails', () => {
  const baseFrame: Partial<pw.Frame> = {
    url: () => 'https://sub.source.com',
  };

  const baseRequest: Partial<pw.Request> = {
    frame: () => baseFrame as pw.Frame,
    resourceType: () => 'script',
    url: () => 'https://sub.url.com',
  };

  it('gets sourceUrl from frame', () => {
    expect(fromPlaywrightDetails(baseRequest as pw.Request)).to.deep.include({
      sourceHostnameHashes: getHostnameHashesFromLabelsBackward('sub.source.com', 'source.com'),
    });
  });

  it('gets type from resourceType', () => {
    expect(fromPlaywrightDetails(baseRequest as pw.Request)).to.deep.include({
      type: 'script',
    });
  });

  it('gets url from url', () => {
    expect(fromPlaywrightDetails(baseRequest as pw.Request)).to.deep.include({
      domain: 'url.com',
      hostname: 'sub.url.com',
      url: 'https://sub.url.com',
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
    const browser = await pw.firefox.launch();
    console.log('Playwright browser launched.');
    const page = await browser.newPage();
    console.log('Playwright page opened.');

    const blocker = PlaywrightBlocker.parse(e2e.filters);
    blocker.updateResources(await e2e.getResources(), 'test');
    console.log('Filters parsed.');
    await blocker.enableBlockingInPage(page);
    await page.goto(address, { waitUntil: 'networkidle' });
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
    console.log('Playwright page closed.');
    await browser.close();
    console.log('Playwright browser closed.');
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
