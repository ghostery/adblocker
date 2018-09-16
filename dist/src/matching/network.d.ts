import { NetworkFilter } from '../parsing/network-filter';
import { IRequest } from '../request/interface';
export declare function isAnchoredByHostname(filterHostname: string, hostname: string): boolean;
export default function matchNetworkFilter(filter: NetworkFilter, request: IRequest): boolean;
