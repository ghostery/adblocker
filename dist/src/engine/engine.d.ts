import { NetworkFilter } from '../parsing/network-filter';
import { IRawRequest } from '../request/raw';
import CosmeticFilterBucket from './bucket/cosmetics';
import NetworkFilterBucket from './bucket/network';
import IList from './list';
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
    constructor({ loadCosmeticFilters, loadNetworkFilters, optimizeAOT, version, }: {
        loadCosmeticFilters: boolean;
        loadNetworkFilters: boolean;
        optimizeAOT: boolean;
        version: number;
    });
    hasList(asset: string, checksum: string): boolean;
    onUpdateResource(updates: Array<{
        filters: string;
        checksum: string;
    }>): void;
    onUpdateFilters(lists: Array<{
        filters: string;
        checksum: string;
        asset: string;
    }>, loadedAssets: Set<string>, onDiskCache?: boolean, debug?: boolean): Uint8Array | null;
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
    match(rawRequest: IRawRequest): {
        match: boolean;
        redirect?: string;
        exception?: NetworkFilter;
        filter?: NetworkFilter;
    };
}
