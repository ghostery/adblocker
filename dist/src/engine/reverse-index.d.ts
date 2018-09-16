import IFilter from '../parsing/interface';
declare function nope(arg: any): any;
export interface IBucket<T extends IFilter> {
    hit: number;
    optimized: boolean;
    filters: T[];
}
export default class ReverseIndex<T extends IFilter> {
    size: number;
    index: Map<number, IBucket<T>>;
    private optimizer;
    private getTokens;
    constructor(filters: T[], getTokens: (filter: IFilter) => number[][], { optimizer }?: {
        optimizer?: typeof nope | undefined;
    });
    iterMatchingFilters(tokens: number[], cb: (f: T) => boolean): void;
    report(): string;
    optimizeAheadOfTime(): void;
    private addFilters;
    private optimize;
    private iterBucket;
}
export {};
