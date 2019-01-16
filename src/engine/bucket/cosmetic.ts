import StaticDataView from '../../data-view';
import CosmeticFilter from '../../filters/cosmetic';
import { tokenizeHostnames } from '../../utils';

import ReverseIndex from '../reverse-index';

export default class CosmeticFilterBucket {
  public static deserialize(buffer: StaticDataView): CosmeticFilterBucket {
    const bucket = new CosmeticFilterBucket();
    bucket.genericRules = buffer.getUint32ArrayStrict();
    bucket.hostnameIndex = ReverseIndex.deserialize(buffer);
    return bucket;
  }

  public hostnameIndex: ReverseIndex<CosmeticFilter>;
  public genericRules: Uint32Array;
  private cache: CosmeticFilter[];

  constructor(filters?: (cb: (f: CosmeticFilter) => void) => void) {
    // This will be used to keep in cache the generic CosmeticFilter instances.
    // It will be populated the first time filters are required. TODO - maybe we
    // do not need the full instance there? But instead the selectors only (we
    // only need to know enough to inject and apply exceptions).
    this.cache = [];

    // This accelerating data structure is used to retrieve cosmetic filters for
    // a given hostname. We only store filters having at least one hostname
    // specified and we index each filter several time (one time per hostname).
    const idsOfGenericRules: number[] = [];
    this.hostnameIndex = new ReverseIndex((cb: (f: CosmeticFilter) => void) => {
      if (filters !== undefined) {
        filters((f: CosmeticFilter) => {
          if (f.hasHostnames()) {
            cb(f);
          } else {
            idsOfGenericRules.push(f.getId());
          }
        });
      }
    });

    // Store generic cosmetic filters in an array. It will be used whenever we
    // need to inject cosmetics in a page and filtered according to
    // domain-specific exceptions/unhide.
    this.genericRules = new Uint32Array(idsOfGenericRules);
  }

  public serialize(buffer: StaticDataView): void {
    buffer.pushUint32ArrayStrict(this.genericRules);
    this.hostnameIndex.serialize(buffer);
  }

  public getCosmeticsFilters(
    hostname: string,
    domain: string,
    getFilter: (id: number) => CosmeticFilter | undefined,
  ): CosmeticFilter[] {
    const disabledRules = new Set();

    if (this.cache.length === 0) {
      // Populate cache. TODO - maybe it would be faster to get all the filters
      // in batch? Since we know we will want to get all the generic ones it
      // does not make sense to do one lookup for each of them.
      for (let i = 0; i < this.genericRules.length; i += 1) {
        const filter = getFilter(this.genericRules[i]);
        if (filter !== undefined) {
          this.cache.push(filter);
        }
      }
    }

    const rules: CosmeticFilter[] = [];

    // Collect rules specifying a domain
    this.hostnameIndex.iterMatchingFilters(
      tokenizeHostnames(hostname),
      getFilter,
      (rule: CosmeticFilter) => {
        if (rule.match(hostname, domain)) {
          if (rule.isUnhide()) {
            disabledRules.add(rule.getSelector());
          } else {
            rules.push(rule);
          }
        }

        return true;
      },
    );

    if (disabledRules.size === 0) {
      // No exception/unhide found, so we return all the rules
      return [...rules, ...this.cache];
    }

    const rulesWithoutExceptions: CosmeticFilter[] = [];
    for (let i = 0; i < rules.length; i += 1) {
      const rule = rules[i];
      if (!disabledRules.has(rule.getSelector())) {
        console.error('???? 1'); // this is not reached during tests?
        rulesWithoutExceptions.push(rule);
      }
    }

    for (let i = 0; i < this.cache.length; i += 1) {
      const rule = this.cache[i];
      if (!disabledRules.has(rule.getSelector())) {
        console.error('???? 2'); // this is not reached during tests?
        rulesWithoutExceptions.push(rule);
      }
    }

    return rulesWithoutExceptions;
  }
}
