import { createFuzzySignature, fastHash, tokenize } from './utils';

// TODO - add unit tests (for initialization with existing domain, hostname, etc.)

export const enum RequestType {
  beacon,
  csp,
  document,
  dtd,
  fetch,
  font,
  image,
  media,
  object,
  other,
  ping,
  script,
  stylesheet,
  subdocument,
  websocket,
  xlst,
  xmlhttprequest,
}

const CPT_TO_TYPE: {
  [s: string]: RequestType;
} = {
  // Webextension request types
  beacon: RequestType.ping,
  csp_report: RequestType.csp,
  document: RequestType.document,
  font: RequestType.font,
  image: RequestType.image,
  imageset: RequestType.image,
  main_frame: RequestType.document,
  media: RequestType.media,
  object: RequestType.object,
  object_subrequest: RequestType.object,
  other: RequestType.other,
  ping: RequestType.ping,
  script: RequestType.script,
  speculative: RequestType.other,
  stylesheet: RequestType.stylesheet,
  sub_frame: RequestType.subdocument,
  web_manifest: RequestType.other,
  websocket: RequestType.websocket,
  xbl: RequestType.other,
  xhr: RequestType.xmlhttprequest,
  xml_dtd: RequestType.other,
  xmlhttprequest: RequestType.xmlhttprequest,
  xslt: RequestType.other,

  // Firefox Bootstrap: https://developer.mozilla.org/en-US/docs/Archive/Mozilla/nsIContentPolicy
  1: RequestType.other,
  2: RequestType.script,
  3: RequestType.image,
  4: RequestType.stylesheet,
  5: RequestType.object,
  6: RequestType.document,
  7: RequestType.subdocument,
  10: RequestType.ping,
  11: RequestType.xmlhttprequest,
  12: RequestType.object,
  13: RequestType.dtd,
  14: RequestType.font,
  15: RequestType.media,
  16: RequestType.websocket,
  17: RequestType.csp,
  18: RequestType.xlst,
  19: RequestType.beacon,
  20: RequestType.fetch,
  21: RequestType.image,
};

const TOKENS_BUFFER = new Uint32Array(300);

export interface IRequestInitialization {
  url: string;
  hostname: string;
  domain: string;

  sourceUrl: string;
  sourceHostname: string;
  sourceDomain: string;

  type: string | number;
}

export default class Request {
  public readonly rawType: string | number;
  public readonly type: RequestType;
  public readonly isHttp: boolean;
  public readonly isHttps: boolean;
  public readonly isSupported: boolean;
  public readonly isFirstParty: boolean | null;
  public readonly isThirdParty: boolean | null;

  public readonly url: string;
  public readonly hostname: string;
  public readonly domain: string;

  public readonly sourceUrl: string;
  public readonly sourceHostname: string;
  public readonly sourceHostnameHash: number;
  public readonly sourceDomain: string;
  public readonly sourceDomainHash: number;

  // Set later
  public bug?: number;

  // Lazy attributes
  private tokens?: Uint32Array;
  private fuzzySignature?: Uint32Array;

  constructor({
    type,

    domain,
    hostname,
    url,

    sourceDomain,
    sourceHostname,
    sourceUrl,
  }: IRequestInitialization) {
    this.type = CPT_TO_TYPE[type] || RequestType.other;
    this.rawType = type;

    this.url = url;
    this.hostname = hostname;
    this.domain = domain;

    this.sourceUrl = sourceUrl;
    this.sourceHostname = sourceHostname;
    this.sourceDomain = sourceDomain;

    this.sourceHostnameHash = fastHash(this.sourceHostname);
    this.sourceDomainHash = fastHash(this.sourceDomain);

    // Decide on party
    this.isFirstParty = this.sourceDomain.length === 0 ? null : this.sourceDomain === this.domain;
    this.isThirdParty = this.sourceDomain.length === 0 ? null : !this.isFirstParty;

    // Get protocol
    const endOfProtocol = this.url.indexOf(':');

    // If there is no protocol, we assume https
    if (endOfProtocol === -1) {
      this.isHttps = true;
      this.isHttp = false;
      this.isSupported = true;
    } else {
      const protocol = this.url.slice(0, endOfProtocol);
      this.isHttp = protocol === 'http';
      this.isHttps = this.isHttp === false && protocol === 'https';

      const isWebsocket =
        this.isHttp === false &&
        this.isHttps === false &&
        (protocol === 'ws' || protocol === 'wss');

      this.isSupported = this.isHttp || this.isHttps || isWebsocket;

      if (isWebsocket) {
        this.type = RequestType.websocket;
      }
    }
  }

  public getTokens(): Uint32Array {
    if (this.tokens === undefined) {
      let tokensBufferIndex = 0;
      if (this.sourceDomain) {
        TOKENS_BUFFER[tokensBufferIndex] = fastHash(this.sourceDomain);
        tokensBufferIndex += 1;
      }
      if (this.sourceHostname) {
        TOKENS_BUFFER[tokensBufferIndex] = fastHash(this.sourceHostname);
        tokensBufferIndex += 1;
      }

      const tokens = tokenize(this.url);
      TOKENS_BUFFER.set(tokens, tokensBufferIndex);
      tokensBufferIndex += tokens.length;

      this.tokens = TOKENS_BUFFER.slice(0, tokensBufferIndex);
    }

    return this.tokens;
  }

  public getFuzzySignature(): Uint32Array {
    if (this.fuzzySignature === undefined) {
      this.fuzzySignature = createFuzzySignature(this.url);
    }
    return this.fuzzySignature;
  }
}

/**
 * The library does not include a URL parser anymore, but for matching we still
 * rely on information about hostnames and domains of request URL as well as
 * source URL (optionally); the `makeRequest` helper function helps construct a
 * `Request` from partial inputs but you need to provide implementations of
 * functions to extract a hostname from a URL and extract the domain of a given
 * hostname. You could use `tldts` for this purpose but any other implementation
 * based on public suffix lists would work as well.
 *
 * Example of usage:
 *
 *   import * as tldts from 'tldts';
 *
 *   makeRequest({ url: 'https://foo.com', type: 'script' }, tldts);
 */
export function makeRequest(
  {
    url = '',
    hostname,
    domain,
    sourceUrl = '',
    sourceHostname,
    sourceDomain,
    type = 'document',
  }: Partial<IRequestInitialization>,
  {
    getHostname,
    getDomain,
  }: {
    getHostname: (url: string) => string | null;
    getDomain: (url: string) => string | null;
  },
): Request {
  // Initialize URL
  url = url.toLowerCase();
  hostname = hostname || getHostname(url) || '';
  domain = domain || getDomain(hostname) || '';

  // Initialize source URL
  sourceUrl = sourceUrl.toLowerCase();
  sourceHostname = sourceHostname || getHostname(sourceUrl) || '';
  sourceDomain = sourceDomain || getDomain(sourceHostname) || '';

  // source URL
  return new Request({
    domain,
    hostname,
    url,

    sourceDomain,
    sourceHostname,
    sourceUrl,

    type,
  });
}
