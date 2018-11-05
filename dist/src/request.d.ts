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
    objectSubrequest = 9,
    other = 10,
    ping = 11,
    script = 12,
    stylesheet = 13,
    subdocument = 14,
    websocket = 15,
    xlst = 16,
    xmlhttprequest = 17
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
