import { expect } from 'chai';
import 'mocha';

import * as pw from 'playwright';

import { fromPlaywrightDetails, getHostnameHashesFromLabelsBackward } from '../adblocker';

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
