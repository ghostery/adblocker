import { CosmeticFilter } from '../parsing/cosmetic-filter';
import { NetworkFilter } from '../parsing/network-filter';

export default interface IList {
  checksum: string;
  cosmetics: CosmeticFilter[];
  exceptions: NetworkFilter[];
  csp: NetworkFilter[];
  filters: NetworkFilter[];
  importants: NetworkFilter[];
  redirects: NetworkFilter[];
}
