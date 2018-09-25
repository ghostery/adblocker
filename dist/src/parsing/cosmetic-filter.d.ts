import IFilter from './interface';
export declare class CosmeticFilter implements IFilter {
    id: number;
    mask: number;
    selector: string;
    hostnames: string;
    rawLine: string | null;
    private hostnamesArray;
    constructor({ mask, selector, hostnames, id, }: {
        mask: number;
        selector: string;
        hostnames: string;
        id: number;
    });
    isCosmeticFilter(): boolean;
    isNetworkFilter(): boolean;
    toString(): string;
    getTokens(): number[][];
    getTokensSelector(): number[];
    getSelector(): string;
    hasHostnames(): boolean;
    getHostnames(): string[];
    isUnhide(): boolean;
    isScriptInject(): boolean;
    isScriptBlock(): boolean;
}
export declare function parseCosmeticFilter(line: string): CosmeticFilter | null;
