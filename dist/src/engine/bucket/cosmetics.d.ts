import { CosmeticFilter } from '../../parsing/cosmetic-filter';
import ReverseIndex from '../reverse-index';
export default class CosmeticFilterBucket {
    hostnameIndex: ReverseIndex<CosmeticFilter>;
    selectorIndex: ReverseIndex<CosmeticFilter>;
    size: number;
    constructor(filters?: CosmeticFilter[]);
    createContentScriptResponse(rules: CosmeticFilter[]): {
        active: boolean;
        blockedScripts: string[];
        scripts: string[];
        styles: string[];
    };
    getDomainRules(hostname: string, js: Map<string, string>): CosmeticFilter[];
    getMatchingRules(hostname: string, nodeInfo: string[][]): CosmeticFilter[];
    private filterExceptions;
}
