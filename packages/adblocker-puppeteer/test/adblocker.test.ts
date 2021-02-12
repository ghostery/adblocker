import { expect } from 'chai';
import 'mocha';

import * as puppeteer from 'puppeteer';

import { fromPuppeteerDetails, getHostnameHashesFromLabelsBackward } from '../adblocker';

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
