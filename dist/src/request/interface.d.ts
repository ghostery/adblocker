export interface IRequest {
    url: string;
    tokens: number[];
    hostGD: string;
    hostname: string;
    sourceGD: string;
    sourceHostname: string;
    cpt: number;
    fuzzySignature: Uint32Array | undefined;
}
export declare function mkRequest({ url, hostname, domain, sourceHostname, sourceDomain, cpt }?: {
    url?: string | undefined;
    hostname?: string | undefined;
    domain?: string | undefined;
    sourceHostname?: string | undefined;
    sourceDomain?: string | undefined;
    cpt?: number | undefined;
}): IRequest;
