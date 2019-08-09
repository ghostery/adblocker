import { fromWebRequestDetails, updateResponseHeadersWithCSP } from './adblocker';

describe('#updateResponseHeadersWithCSP', () => {
  const baseDetails: chrome.webRequest.WebResponseHeadersDetails = {
    frameId: 42,
    method: 'POST',
    parentFrameId: 42,
    requestId: '42',
    statusCode: 200,
    statusLine: '',
    tabId: 42,
    timeStamp: 0,
    type: 'main_frame',
    url: 'https://foo.com',
  };

  it('does not update if no policies', () => {
    expect(updateResponseHeadersWithCSP(baseDetails, undefined)).toEqual({});
  });

  it('creates headers if they do not exist', () => {
    expect(updateResponseHeadersWithCSP(baseDetails, 'CSP')).toEqual({
      responseHeaders: [{ name: 'content-security-policy', value: 'CSP' }],
    });
  });

  it('create csp header if not exist', () => {
    expect(updateResponseHeadersWithCSP({ ...baseDetails, responseHeaders: [] }, 'CSP')).toEqual({
      responseHeaders: [{ name: 'content-security-policy', value: 'CSP' }],
    });
  });

  it('leaves other headers unchanged', () => {
    expect(
      updateResponseHeadersWithCSP(
        { ...baseDetails, responseHeaders: [{ name: 'header1', value: 'value1' }] },
        'CSP',
      ),
    ).toEqual({
      responseHeaders: [
        { name: 'header1', value: 'value1' },
        { name: 'content-security-policy', value: 'CSP' },
      ],
    });
  });

  it('updates existing csp policies', () => {
    // Lower-case header name
    expect(
      updateResponseHeadersWithCSP(
        {
          ...baseDetails,
          responseHeaders: [{ name: 'cOnTeNt-Security-policy', value: 'CSP1' }],
        },
        'CSP',
      ),
    ).toEqual({
      responseHeaders: [{ name: 'content-security-policy', value: 'CSP; CSP1' }],
    });
  });
});

describe('#fromWebRequestDetails', () => {
  it('uses "initiator" if available', () => {
    expect(
      fromWebRequestDetails({
        initiator: 'https://sub.foo.com',
        tabId: 0,
        type: 'script',
        url: 'https://url',
      }),
    ).toMatchObject({
      sourceDomain: 'foo.com',
      sourceHostname: 'sub.foo.com',
    });
  });

  it('uses "originUrl" if "initiator" not available', () => {
    expect(
      fromWebRequestDetails({
        originUrl: 'https://sub.foo.com',
        tabId: 0,
        type: 'script',
        url: 'https://url',
      }),
    ).toMatchObject({
      sourceDomain: 'foo.com',
      sourceHostname: 'sub.foo.com',
    });
  });

  it('uses "documentUrl" if "originUrl" not available', () => {
    expect(
      fromWebRequestDetails({
        documentUrl: 'https://sub.foo.com',
        tabId: 0,
        type: 'script',
        url: 'https://url',
      }),
    ).toMatchObject({
      sourceDomain: 'foo.com',
      sourceHostname: 'sub.foo.com',
    });
  });

  it('parses details', () => {
    expect(
      fromWebRequestDetails({
        documentUrl: 'https://sub.soURCE.com',
        tabId: 0,
        type: 'script',
        url: 'https://sub.url.com',
      }),
    ).toMatchObject({
      domain: 'url.com',
      hostname: 'sub.url.com',
      url: 'https://sub.url.com',

      sourceDomain: 'source.com',
      sourceHostname: 'sub.source.com',

      type: 'script',
    });
  });
});
