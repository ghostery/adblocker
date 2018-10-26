import { getDomain, getHostname } from 'tldts';
import { createFuzzySignature, tokenize } from './utils';

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
  objectSubrequest,
  other,
  ping,
  script,
  stylesheet,
  subdocument,
  websocket,
  xlst,
  xmlhttprequest,
}

interface Types {
  [s: string]: RequestType;
}

const CPT_TO_TYPE: Types = {
  // Webextension request types
  csp_report: RequestType.csp,
  font: RequestType.font,
  image: RequestType.image,
  main_frame: RequestType.document,
  media: RequestType.media,
  object: RequestType.object,
  other: RequestType.other,
  ping: RequestType.ping,
  script: RequestType.script,
  stylesheet: RequestType.stylesheet,
  sub_frame: RequestType.subdocument,
  websocket: RequestType.websocket,
  xmlhttprequest: RequestType.xmlhttprequest,

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
  12: RequestType.objectSubrequest,
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

  cpt: string | number;
}

export default class Request {
  private cpt: RequestType;

  private url: string;
  private hostname?: string;
  private domain?: string;

  private sourceUrl: string;
  private sourceHostname?: string;
  private sourceDomain?: string;

  private tokens?: number[];
  private fuzzySignature?: Uint32Array;

  constructor({
    cpt = 6,

    // Request Url
    url = '',
    hostname,
    domain,

    // Page Url (sourceUrl)
    sourceUrl = '',
    sourceHostname,
    sourceDomain,
  }: Partial<IRequestInitialization> = {}) {
    this.cpt = CPT_TO_TYPE[cpt];

    this.url = url.toLowerCase();
    this.hostname = hostname;
    this.domain = domain;

    this.sourceUrl = sourceUrl.toLowerCase();
    this.sourceHostname = sourceHostname;
    this.sourceDomain = sourceDomain;
  }

  public getCpt(): RequestType {
    return this.cpt;
  }

  public getUrl(): string {
    return this.url;
  }

  public getHostname(): string {
    if (this.hostname === undefined) {
      this.hostname = getHostname(this.url) || '';
    }

    return this.hostname;
  }

  public getDomain(): string {
    if (this.domain === undefined) {
      this.domain = getDomain(this.getHostname()) || '';
    }
    return this.domain;
  }

  public getSourceUrl(): string {
    return this.sourceUrl;
  }

  public getSourceHostname(): string {
    if (this.sourceHostname === undefined) {
      this.sourceHostname = getHostname(this.sourceUrl) || '';
    }
    return this.sourceHostname;
  }

  public getSourceDomain(): string {
    if (this.sourceDomain === undefined) {
      this.sourceDomain = getDomain(this.getSourceHostname()) || '';
    }
    return this.sourceDomain;
  }

  public isFirstParty(): boolean {
    return this.getSourceDomain() === this.getDomain();
  }

  public getTokens(): number[] {
    if (this.tokens === undefined) {
      this.tokens = tokenize(this.url);
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
