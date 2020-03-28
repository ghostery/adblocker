import { expect } from 'chai';
import 'mocha';

import { ElectronBlocker, ElectronRequestType, fromElectronDetails } from '../adblocker';

describe('#fromElectronDetails', () => {
  const baseRequest: Electron.OnBeforeRequestListenerDetails = {
    id: 0,
    method: 'GET',
    referrer: 'https://sub.source.com',
    resourceType: 'script' as ElectronRequestType,
    timestamp: 0,
    uploadData: [],
    url: 'https://sub.url.com',
  };

  it('gets sourceUrl from referrer', () => {
    expect(fromElectronDetails(baseRequest)).to.deep.include({
      sourceDomain: 'source.com',
      sourceHostname: 'sub.source.com',
    });
  });

  it('gets type from resourceType', () => {
    expect(fromElectronDetails(baseRequest)).to.deep.include({
      type: 'script',
    });
  });

  it('gets url from url', () => {
    expect(fromElectronDetails(baseRequest)).to.deep.include({
      domain: 'url.com',
      hostname: 'sub.url.com',
      url: 'https://sub.url.com',
    });
  });
});

describe('#constructor', () => {
  describe('mutationObserver', () => {
    it('defaults to true', () => {
      expect(new ElectronBlocker().config.enableMutationObserver).to.be.true;
      expect(new ElectronBlocker({}).config.enableMutationObserver).to.be.true;
    });

    it('can be set to false', () => {
      expect(
        new ElectronBlocker({ config: { enableMutationObserver: false } }).config
          .enableMutationObserver,
      ).to.be.false;
    });
  });
});

describe('#parse', () => {
  describe('mutationObserver', () => {
    it('defaults to true', () => {
      expect(ElectronBlocker.parse('').config.enableMutationObserver).to.be.true;
      expect(ElectronBlocker.parse('', {}).config.enableMutationObserver).to.be.true;
    });

    it('can be set to false', () => {
      expect(
        ElectronBlocker.parse('', { enableMutationObserver: false }).config.enableMutationObserver,
      ).to.be.false;
    });
  });
});
