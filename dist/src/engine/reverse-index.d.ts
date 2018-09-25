import IFilter from '../parsing/interface';
export interface IBucket<T extends IFilter> {
    hit: number;
    optimized: boolean;
    filters: T[];
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
    constructor(filters: (cb: (f: T) => void) => void, getTokens: (filter: T) => number[][], { enableOptimizations, optimizer, }?: Partial<IOptions<T>>);
    iterMatchingFilters(tokens: number[], cb: (f: T) => boolean): void;
    optimizeAheadOfTime(): void;
    private addFilters;
    private optimize;
    private iterBucket;
}
export {};
