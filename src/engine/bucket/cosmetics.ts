import matchCosmeticFilter from '../../matching/cosmetics';
import { CosmeticFilter } from '../../parsing/cosmetic-filter';
import { tokenizeHostnames } from '../../utils';

import ReverseIndex from '../reverse-index';

export default class CosmeticFilterBucket {
  public readonly hostnameIndex: ReverseIndex<CosmeticFilter>;

  // TODO - make readonly
  public genericRules: CosmeticFilter[];
  public size: number;

  constructor(filters: (cb: (f: CosmeticFilter) => void) => void) {
    // Store generic cosmetic filters in an array. It will be used whenever we
    // need to inject cosmetics in a paged and filtered according to
    // domain-specific exceptions/unhide.
    this.genericRules = [];

    // This accelerating data structure is used to retrieve cosmetic filters for
    // a given hostname. We only store filters having at least one hostname
    // specified and we index each filter several time (one time per hostname).
    this.hostnameIndex = new ReverseIndex(
      (cb: (f: CosmeticFilter) => void) => {
        filters((f: CosmeticFilter) => {
          if (f.hasHostnames()) {
            cb(f);
          } else {
            this.genericRules.push(f);
          }
        });
      },
      (filter: CosmeticFilter) => filter.getTokens(),
    );

    this.size = this.hostnameIndex.size + this.genericRules.length;
  }

  public getCosmeticsFilters(hostname: string) {
    const disabledRules = new Set();
    const rules: CosmeticFilter[] = [];

    // Collect rules specifying a domain
    this.hostnameIndex.iterMatchingFilters(tokenizeHostnames(hostname), (rule: CosmeticFilter) => {
      if (matchCosmeticFilter(rule, hostname)) {
        if (rule.isUnhide()) {
          disabledRules.add(rule.getSelector());
        } else {
          rules.push(rule);
        }
      }

      return true;
    });

    if (disabledRules.size === 0) {
      // No exception/unhide found, so we return all the rules
      return [...rules, ...this.genericRules];
    }

    const rulesWithoutExceptions: CosmeticFilter[] = [];
    for (let i = 0; i < rules.length; i += 1) {
      const rule = rules[i];
      if (!disabledRules.has(rule.getSelector())) {
        rulesWithoutExceptions.push(rule);
      }
    }

    for (let i = 0; i < this.genericRules.length; i += 1) {
      const rule = this.genericRules[i];
      if (!disabledRules.has(rule.getSelector())) {
        rulesWithoutExceptions.push(rule);
      }
    }

    return rulesWithoutExceptions;
  }
}
