import { ElectronRequestType, fromElectronDetails } from './adblocker';

describe('#fromElectronDetails', () => {
  const baseRequest: {
    referrer: string;
    resourceType: ElectronRequestType;
    url: string;
  } = {
    referrer: 'https://sub.source.com',
    resourceType: 'script',
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
