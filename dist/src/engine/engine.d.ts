import { NetworkFilter } from '../parsing/network-filter';
import { IRequestInitialization } from '../request';
import CosmeticFilterBucket from './bucket/cosmetics';
import NetworkFilterBucket from './bucket/network';
import IList from './list';
interface IOptions {
    loadCosmeticFilters: boolean;
    loadNetworkFilters: boolean;
    optimizeAOT: boolean;
    enableOptimizations: boolean;
    version: number;
}
export default class FilterEngine {
    version: number;
    lists: Map<string, IList>;
    exceptions: NetworkFilterBucket;
    importants: NetworkFilterBucket;
    redirects: NetworkFilterBucket;
    filters: NetworkFilterBucket;
    cosmetics: CosmeticFilterBucket;
    size: number;
    resourceChecksum: string;
    js: Map<string, string>;
    resources: Map<string, {
        contentType: string;
        data: string;
    }>;
    loadCosmeticFilters: boolean;
    loadNetworkFilters: boolean;
    optimizeAOT: boolean;
    enableOptimizations: boolean;
    constructor({ enableOptimizations, loadCosmeticFilters, loadNetworkFilters, optimizeAOT, version, }: IOptions);
    serialize(): Uint8Array;
    hasList(asset: string, checksum: string): boolean;
    onUpdateResource(updates: Array<{
        filters: string;
        checksum: string;
    }>): void;
    onUpdateFilters(lists: Array<{
        filters: string;
        checksum: string;
        asset: string;
    }>, loadedAssets?: Set<string>, debug?: boolean): void;
    optimize(): void;
    getCosmeticsFilters(hostname: string, nodes: string[][]): {
        active: boolean;
        blockedScripts: string[];
        scripts: string[];
        styles: string[];
    };
    getDomainFilters(hostname: string): {
        active: boolean;
        blockedScripts: string[];
        scripts: string[];
        styles: string[];
    };
    matchAll(rawRequest: Partial<IRequestInitialization>): Set<NetworkFilter>;
    match(rawRequest: Partial<IRequestInitialization>): {
        match: boolean;
        redirect?: string;
        exception?: NetworkFilter;
        filter?: NetworkFilter;
    };
}
export {};
