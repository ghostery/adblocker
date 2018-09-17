import { NetworkFilter } from '../../parsing/network-filter';
import { IRequest } from '../../request/interface';
import ReverseIndex from '../reverse-index';
export default class NetworkFilterBucket {
    name: string;
    index: ReverseIndex<NetworkFilter>;
    size: number;
    constructor(name: string, filters?: NetworkFilter[]);
    report(): string;
    optimizeAheadOfTime(): void;
    match(request: IRequest): NetworkFilter | undefined;
}
