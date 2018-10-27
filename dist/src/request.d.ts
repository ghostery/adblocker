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
    sourceUrl: string;
    cpt: string | number;
}
export default class Request {
    filtersHit: any[];
    cpt: RequestType;
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
    constructor({ cpt, url, sourceUrl, }?: Partial<IRequestInitialization>);
    getTokens(): number[];
    getFuzzySignature(): Uint32Array;
}
