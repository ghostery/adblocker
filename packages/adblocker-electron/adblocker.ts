import { ElectronRequestType, Request } from '@cliqz/adblocker';

/**
 * Create an instance of `Request` from `Electron.OnBeforeRequestDetails`.
 */
export function fromElectronDetails({
  url,
  resourceType,
  referrer,
}: {
  url: string;
  resourceType: ElectronRequestType;
  referrer: string;
}): Request {
  return Request.fromRawDetails({
    sourceUrl: referrer,
    type: resourceType || 'other',
    url,
  });
}

// re-export @cliqz/adblocker symbols for convenience
export * from '@cliqz/adblocker';
