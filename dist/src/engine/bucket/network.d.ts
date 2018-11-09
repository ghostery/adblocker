import { NetworkFilter } from '../../parsing/network-filter';
import Request from '../../request';
import ReverseIndex from '../reverse-index';
export default class NetworkFilterBucket {
    name: string;
    index: ReverseIndex<NetworkFilter>;
    size: number;
    constructor(name: string, filters: (cb: (f: NetworkFilter) => void) => void, enableOptimizations?: boolean);
    optimizeAheadOfTime(): void;
    matchAll(request: Request): NetworkFilter[];
    match(request: Request): NetworkFilter | undefined;
}
