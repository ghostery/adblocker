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
    cpt: string | number;
}
export default class Request {
    private cpt;
    private url;
    private hostname?;
    private domain?;
    private sourceUrl;
    private sourceHostname?;
    private sourceDomain?;
    private tokens?;
    private fuzzySignature?;
    constructor({ cpt, url, hostname, domain, sourceUrl, sourceHostname, sourceDomain, }?: Partial<IRequestInitialization>);
    getCpt(): RequestType;
    getUrl(): string;
    getHostname(): string;
    getDomain(): string;
    getSourceUrl(): string;
    getSourceHostname(): string;
    getSourceDomain(): string;
    isFirstParty(): boolean;
    getTokens(): number[];
    getFuzzySignature(): Uint32Array;
}
