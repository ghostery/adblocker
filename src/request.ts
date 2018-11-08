import { getDomain, getHostname } from 'tldts';
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
  public type: RequestType;
  public isHttp: boolean;
  public isHttps: boolean;
  public isSupported: boolean;
  public isFirstParty: boolean | null;
  public isThirdParty: boolean | null;

  public url: string;
  public hostname: string;
  public domain: string;

  public sourceUrl: string;
  public sourceHostname: string;
  public sourceHostnameHash: number;
  public sourceDomain: string;
  public sourceDomainHash: number;

  // Lazy attributes
  private tokens?: number[];
  private fuzzySignature?: Uint32Array;

  constructor({
    type = 'document',
    url = '',
    hostname,
    domain,

    sourceUrl = '',
    sourceHostname,
    sourceDomain,
  }: Partial<IRequestInitialization> = {}) {
    this.type = CPT_TO_TYPE[type] || RequestType.other;

    this.url = url.toLowerCase();

    // Optionally extract hostname and domain of url
    this.hostname = hostname || getHostname(this.url) || '';
    this.domain = domain || getDomain(this.hostname) || '';

    this.sourceUrl = sourceUrl.toLowerCase();

    // Optionally extract hostname and domain of sourceUrl
    this.sourceHostname = sourceHostname || getHostname(this.sourceUrl) || '';
    this.sourceDomain = sourceDomain || getDomain(this.sourceHostname) || '';

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
      this.tokens = [];
      if (this.sourceDomain) {
        this.tokens.push(fastHash(this.sourceDomain));
      }
      if (this.sourceHostname) {
        this.tokens.push(fastHash(this.sourceHostname));
      }
      this.tokens.push(...tokenize(this.url));
    }
    return new Uint32Array(this.tokens);
  }

  public getFuzzySignature(): Uint32Array {
    if (this.fuzzySignature === undefined) {
      this.fuzzySignature = createFuzzySignature(this.url);
    }
    return this.fuzzySignature;
  }
}
