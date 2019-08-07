import { ElectronBlocker, ElectronRequestType, fromElectronDetails } from './adblocker';

describe('#fromElectronDetails', () => {
  const baseRequest: Electron.OnBeforeRequestDetails = {
    id: 0,
    method: 'GET',
    referrer: 'https://sub.source.com',
    resourceType: 'script' as ElectronRequestType,
    timestamp: 0,
    uploadData: [],
    url: 'https://sub.url.com',
  };

  it('gets sourceUrl from referrer', () => {
    expect(fromElectronDetails(baseRequest)).toMatchObject({
      sourceDomain: 'source.com',
      sourceHostname: 'sub.source.com',
    });
  });

  it('gets type from resourceType', () => {
    expect(fromElectronDetails(baseRequest)).toMatchObject({
      type: 'script',
    });
  });

  it('gets url from url', () => {
    expect(fromElectronDetails(baseRequest)).toMatchObject({
      domain: 'url.com',
      hostname: 'sub.url.com',
      url: 'https://sub.url.com',
    });
  });
});

describe('#constructor', () => {
  describe('mutationObserver', () => {
    it('defaults to true', () => {
      expect(new ElectronBlocker().config.enableMutationObserver).toBeTruthy();
      expect(new ElectronBlocker({}).config.enableMutationObserver).toBeTruthy();
    });

    it('can be set to false', () => {
      expect(
        new ElectronBlocker({ config: { enableMutationObserver: false } }).config
          .enableMutationObserver,
      ).toBeFalsy();
    });
  });
});

describe('#parse', () => {
  describe('mutationObserver', () => {
    it('defaults to true', () => {
      expect(ElectronBlocker.parse('').config.enableMutationObserver).toBeTruthy();
      expect(ElectronBlocker.parse('', {}).config.enableMutationObserver).toBeTruthy();
    });

    it('can be set to false', () => {
      expect(
        ElectronBlocker.parse('', { enableMutationObserver: false }).config.enableMutationObserver,
      ).toBeFalsy();
    });
  });
});
