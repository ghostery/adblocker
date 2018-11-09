import { NetworkFilter } from '../parsing/network-filter';
import Request from '../request';
export declare function isAnchoredByHostname(filterHostname: string, hostname: string): boolean;
export default function matchNetworkFilter(filter: NetworkFilter, request: Request): boolean;
