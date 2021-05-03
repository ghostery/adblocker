import { expect } from 'chai';
import 'mocha';

import * as puppeteer from 'puppeteer';
import fetch from 'cross-fetch';

import {fromPuppeteerDetails, getHostnameHashesFromLabelsBackward, PuppeteerBlocker} from '../adblocker';

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

  it('does not inject styles into original content', async () => {
    const browser = await puppeteer.launch();
    try {
      const page = await browser.newPage();
      try {
        const url = 'https://example.com';
        const stylesInjectionPrefix = '<style type="text/css">#Meebo\\:AdElement\\.Root';
        const blocker = await PuppeteerBlocker.fromPrebuiltFull(fetch);

        await blocker.enableBlockingInPage(page);
        await page.goto(url, {waitUntil: 'networkidle2'});
        const contentWithoutAds = await page.content();

        await blocker.disableBlockingInPage(page);
        await page.goto(url, {waitUntil: 'networkidle2'});
        const content = await page.content();

        expect(contentWithoutAds).to.contain(stylesInjectionPrefix);
        expect(content).not.to.contain(stylesInjectionPrefix);
      } finally {
        await page.close();
      }
    } finally {
      await browser.close();
    }
  });

});
