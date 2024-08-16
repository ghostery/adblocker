import { expect } from 'chai';
import 'mocha';

import { WebRequest } from 'webextension-polyfill-ts';

import {
  fromWebRequestDetails,
  updateResponseHeadersWithCSP,
  OnBeforeRequestDetailsType,
  getHostnameHashesFromLabelsBackward,
  OnHeadersReceivedDetailsType,
  shouldApplyReplaceSelectors,
  filterRequestHTML,
  MAXIMUM_RESPONSE_BUFFER_SIZE,
} from '../src/index.js';

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

describe('html-filtering', () => {
  context('#shouldApplyReplaceSelectors', () => {
    function createWebRequestDetails({
      responseType,
      headers,
    }: {
      responseType: WebRequest.ResourceType;
      headers: Record<string, string>;
    }) {
      const url = 'https://foo.com/';
      const requestId = 'req-01';
      const tabId = 1;
      const details: OnHeadersReceivedDetailsType = {
        requestId,
        tabId,
        url,
        responseHeaders: Object.entries(headers).map(([name, value]) => ({
          name,
          value,
        })),
        type: responseType,
      };

      return details;
    }

    const sets: Array<Parameters<typeof createWebRequestDetails>[0] & { result: boolean }> = [
      {
        responseType: 'main_frame',
        headers: {
          'content-type': 'text/html',
        },
        result: true,
      },
      {
        responseType: 'script',
        headers: {
          'content-type': 'application/javascript',
        },
        result: true,
      },
      {
        responseType: 'stylesheet',
        headers: {},
        result: true,
      },
      {
        responseType: 'script',
        headers: {
          'content-type': 'application/javascript',
          'content-length': (MAXIMUM_RESPONSE_BUFFER_SIZE + 1).toString(),
        },
        result: false,
      },
    ];

    sets.forEach((set) => {
      const details = createWebRequestDetails(set);
      const request = fromWebRequestDetails(details);

      it(`${set.result ? 'allows' : 'rejects'} filtering ${set.responseType} type of ${set.headers['content-type']}`, () => {
        expect(shouldApplyReplaceSelectors(request, details)).to.be.eql(set.result);
      });
    });
  });

  describe('#MAXIMUM_RESPONSE_BUFFER_SIZE', () => {
    class StreamFilter implements WebRequest.StreamFilter {
      public _pushed: number = 0;
      public _pulled: Uint8Array = new Uint8Array();

      public ondata: (data: WebRequest.StreamFilterEventData) => void = this._ondata;
      public onstart: (data: WebRequest.StreamFilterEventData) => void = this._noop;
      public onstop: (data: WebRequest.StreamFilterEventData) => void = this._ondata;
      public onerror: (data: WebRequest.StreamFilterEventData) => void = this._noop;

      public status: WebRequest.StreamFilterStatus = 'uninitialized';
      public error: string = '';

      private isResumable() {
        return (
          this.status !== 'closed' && this.status !== 'failed' && this.status !== 'disconnected'
        );
      }

      public create(_requestId: number, _addonId: string): void {
        throw new Error('StreamFilter.create() is not implemented!');
      }

      public suspend(): void {
        this.status = 'suspended';
      }

      public resume(): void {
        if (this.isResumable() === false) {
          this.error = 'This instance is not resumable!';
          this.onerror({
            data: Uint8Array.from([]),
          });
          return;
        }
        this.status = 'transferringdata';
      }

      public close(): void {
        this.status = 'closed';
      }

      public disconnect(): void {
        this.status = 'disconnected';
        this.ondata = this._ondata;
        this.onstop = this._noop;
      }

      public write(data: ArrayBuffer | Uint8Array): void {
        const next = new Uint8Array(this._pulled.byteLength + data.byteLength);
        next.set(this._pulled);
        next.set(new Uint8Array(data), this._pulled.byteLength);
        this._pulled = next;
      }

      public _ondata(event: WebRequest.StreamFilterEventData) {
        this.write(event.data);
      }

      public _noop() {}

      public _push(data: ArrayBuffer | Uint8Array, isLast: boolean = false) {
        if (
          this.status !== 'transferringdata' &&
          this.status !== 'uninitialized' &&
          this.status !== 'disconnected'
        ) {
          this.error = 'Further data transfer cannot be done since the stream is already closed!';
          this.onerror({
            data: Uint8Array.from([]),
          });
          return;
        }

        if (this._pushed === 0) {
          this.status = 'transferringdata';
        }

        this.ondata({ data });
        if (isLast === true) {
          this.onstop({ data: Uint8Array.from([]) });
          this.status = 'finishedtransferringdata';
        }
      }

      public _reset() {
        this._pulled = new Uint8Array();
        this._pushed = 0;
        this.status = 'uninitialized';
        this.error = '';
        this.ondata = this._ondata;
        this.onstart = this._noop;
        this.onstop = this._ondata;
        this.onerror = this._noop;
      }
    }

    it('stops processing more than MAXIMUM_RESPONSE_BUFFER_SIZE', () => {
      const streamFilter = new StreamFilter();
      const details: OnHeadersReceivedDetailsType = {
        responseHeaders: [
          {
            name: 'content-type',
            value: 'text/text',
          },
        ],
        url: 'https://foo.com/script.js',
        type: 'main_frame',
        originUrl: 'https://foo.com/',
        tabId: 0,
        requestId: 'req-00',
      };
      const request = fromWebRequestDetails(details);

      function filterResponseData(_requestId: string): WebRequest.StreamFilter {
        return streamFilter;
      }

      filterRequestHTML(filterResponseData, request, [['replace', [new RegExp('a', 'g'), 'b']]]);

      // Fill MAXIMUM_RESPONSE_BUFFER_SIZE
      const NOISE_BUFFER_SIZE = 1024 * 1024;
      for (
        let i = 0, noise = Uint8Array.from(new Array(NOISE_BUFFER_SIZE).fill('a'.charCodeAt(0)));
        i < MAXIMUM_RESPONSE_BUFFER_SIZE;
        i += NOISE_BUFFER_SIZE
      ) {
        streamFilter._push(noise);
      }

      streamFilter._push(Uint8Array.from(['b'.charCodeAt(0)]), true);

      let sum = 0;
      for (const octet of streamFilter._pulled) {
        sum += octet;
      }

      streamFilter._reset();

      expect(sum).to.be.eql('b'.charCodeAt(0) * (MAXIMUM_RESPONSE_BUFFER_SIZE + 1));
    });
  });
});
