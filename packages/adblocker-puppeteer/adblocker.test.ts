import * as puppeteer from 'puppeteer';
import { fromPuppeteerDetails } from './adblocker';

describe('#fromPuppeteerDetails', () => {
  const baseFrame: Partial<puppeteer.Frame> = {
    url: () => 'https://sub.source.com',
  };

  const baseRequest: Partial<puppeteer.Request> = {
    frame: () => baseFrame as puppeteer.Frame,
    resourceType: () => 'script',
    url: () => 'https://sub.url.com',
  };

  it('gets sourceUrl from frame', () => {
    expect(fromPuppeteerDetails(baseRequest as puppeteer.Request)).toMatchObject({
      sourceDomain: 'source.com',
      sourceHostname: 'sub.source.com',
    });
  });

  it('gets type from resourceType', () => {
    expect(fromPuppeteerDetails(baseRequest as puppeteer.Request)).toMatchObject({
      type: 'script',
    });
  });

  it('gets url from url', () => {
    expect(fromPuppeteerDetails(baseRequest as puppeteer.Request)).toMatchObject({
      domain: 'url.com',
      hostname: 'sub.url.com',
      url: 'https://sub.url.com',
    });
  });
});
