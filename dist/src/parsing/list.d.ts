import { CosmeticFilter } from './cosmetic-filter';
import { NetworkFilter } from './network-filter';
export declare function f(strings: TemplateStringsArray): NetworkFilter | CosmeticFilter | null;
export declare function parseList(data: string, { loadNetworkFilters, loadCosmeticFilters, debug }?: {
    loadNetworkFilters?: boolean | undefined;
    loadCosmeticFilters?: boolean | undefined;
    debug?: boolean | undefined;
}): {
    networkFilters: NetworkFilter[];
    cosmeticFilters: CosmeticFilter[];
};
export declare function parseJSResource(data: string): Map<string, Map<string, string>>;
