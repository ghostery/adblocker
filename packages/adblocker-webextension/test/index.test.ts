import { expect } from 'chai';
import 'mocha';

import { WebRequest } from 'webextension-polyfill-ts';
import { NetworkFilter } from '@cliqz/adblocker';

import {
  fromWebRequestDetails,
  updateResponseHeadersWithCSP,
  OnBeforeRequestDetailsType,
  getHostnameHashesFromLabelsBackward,
  shouldApplyReplaceSelectors,
  filterRequestHTML,
  MAXIMUM_RESPONSE_BUFFER_SIZE,
  HTMLSelector,
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
    const createRequestWithDetails = ({
      type,
      headers,
    }: {
      type: WebRequest.ResourceType;
      headers: Record<string, string>;
    }) =>
      fromWebRequestDetails({
        requestId: 'req-01',
        tabId: 1,
        url: 'https://foo.com/',
        type,
        responseHeaders: Object.entries(headers).map(([name, value]) => ({
          name,
          value,
        })),
      });

    it('accepts main_frame resposne with text/html', () => {
      const request = createRequestWithDetails({
        type: 'main_frame',
        headers: {
          'content-type': 'text/html',
        },
      });
      expect(shouldApplyReplaceSelectors(request)).to.be.true;
    });

    it('accepts script response with content-type header of application/javascript', () => {
      const request = createRequestWithDetails({
        type: 'script',
        headers: {
          'content-type': 'application/javascript',
        },
      });
      expect(shouldApplyReplaceSelectors(request)).to.be.true;
    });

    it('accepts stylesheet response without additional context', () => {
      const request = createRequestWithDetails({
        type: 'stylesheet',
        headers: {},
      });
      expect(shouldApplyReplaceSelectors(request)).to.be.true;
    });

    it('rejects script response larger than MAXIMUM_RESPONSE_BUFFER_SIZE', () => {
      const request = createRequestWithDetails({
        type: 'script',
        headers: {
          'content-type': 'application/javascript',
          'content-length': (MAXIMUM_RESPONSE_BUFFER_SIZE + 1).toString(),
        },
      });
      expect(shouldApplyReplaceSelectors(request)).to.be.false;
    });
  });

  context('respects MAXIMUM_RESPONSE_BUFFER_SIZE', () => {
    class StreamFilterMock implements WebRequest.StreamFilter {
      public _pushed: number = 0;
      public _pulled: Uint8Array = new Uint8Array();

      public ondata: (data: WebRequest.StreamFilterEventData) => void = this._ondata;
      public onstart: (data: WebRequest.StreamFilterEventData) => void = this._noop;
      public onstop: (data: WebRequest.StreamFilterEventData) => void = this._ondata;
      public onerror: (data: WebRequest.StreamFilterEventData) => void = this._noop;

      public status: WebRequest.StreamFilterStatus = 'uninitialized';
      public error: string = '';

      get content() {
        return this._pulled;
      }

      private _noop(): void {}

      public create(_requestId: number, _addonId: string): void {
        throw new Error('StreamFilter.create() is not implemented!');
      }

      public suspend(): void {
        this.status = 'suspended';
      }

      public resume(): void {
        if (
          this.status !== 'closed' &&
          this.status !== 'failed' &&
          (this.status !== 'disconnected') === false
        ) {
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

      public _ondata(event: WebRequest.StreamFilterEventData): void {
        this.write(event.data);
      }

      public _push(data: ArrayBuffer | Uint8Array, isLast: boolean = false): void {
        if (this.status !== 'transferringdata' && this.status !== 'uninitialized') {
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

      public _fill({
        char,
        chunks,
        chunkSize,
      }: {
        char: string;
        chunks: number;
        chunkSize: number;
      }) {
        for (let i = 0; i < chunks; i += 1) {
          const noise = Uint8Array.from(new Array(chunkSize).fill(char.charCodeAt(0)));
          this._push(noise, i === chunks - 1);
        }
      }
    }

    const request = fromWebRequestDetails({
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
    });

    it('replaces stream content when smaller than MAXIMUM_RESPONSE_BUFFER_SIZE', () => {
      const filter = NetworkFilter.parse('foo.com$replace=/a/b/g')!;
      const htmlSelector: HTMLSelector = ['replace', filter.getHtmlModifier()!];
      const streamFilterMock = new StreamFilterMock();
      filterRequestHTML(() => streamFilterMock, request, [htmlSelector]);
      // fill the stream below the MAXIMUM_RESPONSE_BUFFER_SIZE
      streamFilterMock._fill({ char: 'a', chunks: 9, chunkSize: 1024 * 1024 });
      // checking only first and last character for a sake of test performance
      expect(String.fromCharCode(streamFilterMock.content.at(0)!)).to.be.eql('b');
      expect(
        String.fromCharCode(streamFilterMock.content.at(streamFilterMock.content.length - 1)!),
      ).to.be.eql('b');
    });

    it('does not affect steams larger than MAXIMUM_RESPONSE_BUFFER_SIZE', () => {
      const filter = NetworkFilter.parse('foo.com$replace=/a/b/g')!;
      const htmlSelector: HTMLSelector = ['replace', filter.getHtmlModifier()!];
      const streamFilterMock = new StreamFilterMock();
      filterRequestHTML(() => streamFilterMock, request, [htmlSelector]);
      // fill the stream above the MAXIMUM_RESPONSE_BUFFER_SIZE
      streamFilterMock._fill({ char: 'a', chunks: 10, chunkSize: 1024 * 1024 });
      // checking only first and last character for a sake of test performance
      expect(String.fromCharCode(streamFilterMock.content.at(0)!)).to.be.eql('a');
      expect(
        String.fromCharCode(streamFilterMock.content.at(streamFilterMock.content.length - 1)!),
      ).to.be.eql('a');
    });
  });
});
