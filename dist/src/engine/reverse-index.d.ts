import IFilter from '../parsing/interface';
export interface IBucket<T extends IFilter> {
    cumulTime: number;
    filters: T[];
    hit: number;
    match: number;
    optimized: boolean;
    originals: T[];
    tokensHit: any;
}
interface IOptions<T> {
    optimizer: (filters: T[]) => T[];
    enableOptimizations: boolean;
}
export default class ReverseIndex<T extends IFilter> {
    size: number;
    index: Map<number, IBucket<T>>;
    private optimizer;
    private getTokens;
    constructor(filters: (cb: (f: T) => void) => void, getTokens: (filter: T) => number[][], { enableOptimizations, optimizer }?: Partial<IOptions<T>>);
    iterMatchingFilters(tokens: number[], cb: (f: T) => boolean): void;
    optimizeAheadOfTime(): void;
    private addFilters;
    private optimize;
    private iterBucket;
}
export {};
