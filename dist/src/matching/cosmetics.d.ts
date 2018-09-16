import { CosmeticFilter } from '../parsing/cosmetic-filter';
export default function matchCosmeticFilter(filter: CosmeticFilter, hostname: string): {
    hostname: string;
} | null;
