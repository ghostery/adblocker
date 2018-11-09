import IFilter from './interface';
export declare class CosmeticFilter implements IFilter {
    mask: number;
    selector?: string;
    hostnames?: string;
    id?: number;
    rawLine?: string;
    private hostnamesArray?;
    constructor({ hostnames, id, mask, selector, }: {
        hostnames?: string;
        id?: number;
        mask: number;
        selector?: string;
    });
    isCosmeticFilter(): boolean;
    isNetworkFilter(): boolean;
    toString(): string;
    getId(): number;
    getTokens(): Uint32Array[];
    getTokensSelector(): Uint32Array;
    getSelector(): string;
    hasHostnames(): boolean;
    getHostnames(): string[];
    isUnhide(): boolean;
    isScriptInject(): boolean;
    isScriptBlock(): boolean;
}
export declare function parseCosmeticFilter(line: string): CosmeticFilter | null;
