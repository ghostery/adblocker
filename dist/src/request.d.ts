export declare const enum RequestType {
    beacon = 0,
    csp = 1,
    document = 2,
    dtd = 3,
    fetch = 4,
    font = 5,
    image = 6,
    media = 7,
    object = 8,
    other = 9,
    ping = 10,
    script = 11,
    stylesheet = 12,
    subdocument = 13,
    websocket = 14,
    xlst = 15,
    xmlhttprequest = 16
}
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
    type: RequestType;
    isHttp: boolean;
    isHttps: boolean;
    isSupported: boolean;
    isFirstParty: boolean;
    url: string;
    hostname: string;
    domain: string;
    sourceUrl: string;
    sourceHostname: string;
    sourceHostnameHash: number;
    sourceDomain: string;
    sourceDomainHash: number;
    private tokens?;
    private fuzzySignature?;
    constructor({ type, url, hostname, domain, sourceUrl, sourceHostname, sourceDomain, }?: Partial<IRequestInitialization>);
    getTokens(): number[];
    getFuzzySignature(): Uint32Array;
}
