import { expect } from 'chai';
import 'mocha';

import {
  fromWebRequestDetails,
  updateResponseHeadersWithCSP,
  OnBeforeRequestDetailsType,
  getHostnameHashesFromLabelsBackward,
} from '../adblocker';

describe('#updateResponseHeadersWithCSP', () => {
  const baseDetails: OnBeforeRequestDetailsType = {
    requestId: '42',
    tabId: 42,
    type: 'main_frame',
    url: 'https://foo.com',
  };

  it('does not update if no policies', () => {
    expect(updateResponseHeadersWithCSP(baseDetails, undefined)).to.eql({});
  });

  it('creates headers if they do not exist', () => {
    expect(updateResponseHeadersWithCSP(baseDetails, 'CSP')).to.eql({
      responseHeaders: [{ name: 'content-security-policy', value: 'CSP' }],
    });
  });

  it('create csp header if not exist', () => {
    expect(updateResponseHeadersWithCSP({ ...baseDetails, responseHeaders: [] }, 'CSP')).to.eql({
      responseHeaders: [{ name: 'content-security-policy', value: 'CSP' }],
    });
  });

  it('leaves other headers unchanged', () => {
    expect(
      updateResponseHeadersWithCSP(
        { ...baseDetails, responseHeaders: [{ name: 'header1', value: 'value1' }] },
        'CSP',
      ),
    ).to.eql({
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
    ).to.eql({
      responseHeaders: [{ name: 'content-security-policy', value: 'CSP; CSP1' }],
    });
  });
});

describe('#fromWebRequestDetails', () => {
  it('uses "initiator" if available', () => {
    expect(
      fromWebRequestDetails({
        initiator: 'https://sub.foo.com',
        requestId: '42',
        tabId: 0,
        type: 'script',
        url: 'https://url',
      }),
    ).to.deep.include({
      sourceHostnameHashes: getHostnameHashesFromLabelsBackward('sub.foo.com', 'foo.com'),
    });
  });

  it('uses "originUrl" if "initiator" not available', () => {
    expect(
      fromWebRequestDetails({
        originUrl: 'https://sub.foo.com',
        requestId: '42',
        tabId: 0,
        type: 'script',
        url: 'https://url',
      }),
    ).to.deep.include({
      sourceHostnameHashes: getHostnameHashesFromLabelsBackward('sub.foo.com', 'foo.com'),
    });
  });

  it('uses "documentUrl" if "originUrl" not available', () => {
    expect(
      fromWebRequestDetails({
        documentUrl: 'https://sub.foo.com',
        requestId: '42',
        tabId: 0,
        type: 'script',
        url: 'https://url',
      }),
    ).to.deep.include({
      sourceHostnameHashes: getHostnameHashesFromLabelsBackward('sub.foo.com', 'foo.com'),
    });
  });

  it('parses details', () => {
    expect(
      fromWebRequestDetails({
        documentUrl: 'https://sub.soURCE.com',
        requestId: '42',
        tabId: 0,
        type: 'script',
        url: 'https://sub.url.com',
      }),
    ).to.deep.include({
      domain: 'url.com',
      hostname: 'sub.url.com',
      url: 'https://sub.url.com',

      sourceHostnameHashes: getHostnameHashesFromLabelsBackward('sub.source.com', 'source.com'),

      type: 'script',
    });
  });
});
