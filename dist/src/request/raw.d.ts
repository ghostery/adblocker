export interface IRawRequest {
    url: string;
    sourceUrl: string;
    cpt: number;
}
export declare function processRawRequest(request: IRawRequest): import("./interface").IRequest;
