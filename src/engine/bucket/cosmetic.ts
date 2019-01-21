import StaticDataView from '../../data-view';
import CosmeticFilter from '../../filters/cosmetic';
import { tokenizeHostnames } from '../../utils';

import ReverseIndex from '../reverse-index';

export default class CosmeticFilterBucket {
  public static deserialize(buffer: StaticDataView): CosmeticFilterBucket {
    const bucket = new CosmeticFilterBucket();

    bucket.genericRules = buffer.getBytes();
    bucket.hostnameIndex = ReverseIndex.deserialize(buffer, CosmeticFilter.deserialize);

    return bucket;
  }

  public hostnameIndex: ReverseIndex<CosmeticFilter>;
  public genericRules: Uint8Array;

  private cache: CosmeticFilter[];

  constructor({ filters = [] }: { filters?: CosmeticFilter[] } = {}) {
    this.cache = [];
    this.genericRules = new Uint8Array(0);
    this.hostnameIndex = new ReverseIndex<CosmeticFilter>({
      deserialize: CosmeticFilter.deserialize,
    });

    if (filters.length !== 0) {
      this.update(filters);
    }
  }

  public update(newFilters: CosmeticFilter[], removedFilters: number[] = []) {
    // This will be used to keep in cache the generic CosmeticFilter instances.
    // It will be populated the first time filters are required. TODO - maybe we
    // do not need the full instance there? But instead the selectors only (we
    // only need to know enough to inject and apply exceptions).
    const genericRules: CosmeticFilter[] = [];
    const hostnameSpecificRules: CosmeticFilter[] = [];
    for (let i = 0; i < newFilters.length; i += 1) {
      const filter = newFilters[i];
      if (filter.hasHostnames()) {
        hostnameSpecificRules.push(filter);
      } else {
        genericRules.push(filter);
      }
    }

    // This accelerating data structure is used to retrieve cosmetic filters for
    // a given hostname. We only store filters having at least one hostname
    // specified and we index each filter several time (one time per hostname).
    this.hostnameIndex.update(hostnameSpecificRules, removedFilters);

    // Store generic cosmetic filters in an array. It will be used whenever we
    // need to inject cosmetics in a page and filtered according to
    // domain-specific exceptions/unhide.
    const buffer = new StaticDataView(4000000);
    for (let i = 0; i < genericRules.length; i += 1) {
      genericRules[i].serialize(buffer);
    }

    this.cache = [];
    this.genericRules = buffer.crop().slice();
  }

  public serialize(buffer: StaticDataView): void {
    buffer.pushBytes(this.genericRules);
    this.hostnameIndex.serialize(buffer);
  }

  public getCosmeticsFilters(hostname: string, domain: string): CosmeticFilter[] {
    const disabledRules = new Set();

    if (this.cache.length === 0) {
      const buffer = new StaticDataView(0, this.genericRules);
      while (buffer.dataAvailable()) {
        this.cache.push(CosmeticFilter.deserialize(buffer));
      }
    }

    const rules: CosmeticFilter[] = [];

    // Collect rules specifying a domain
    this.hostnameIndex.iterMatchingFilters(tokenizeHostnames(hostname), (rule: CosmeticFilter) => {
      if (rule.match(hostname, domain)) {
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
      return [...rules, ...this.cache];
    }

    const rulesWithoutExceptions: CosmeticFilter[] = [];
    for (let i = 0; i < rules.length; i += 1) {
      const rule = rules[i];
      if (!disabledRules.has(rule.getSelector())) {
        rulesWithoutExceptions.push(rule);
      }
    }

    for (let i = 0; i < this.cache.length; i += 1) {
      const rule = this.cache[i];
      if (!disabledRules.has(rule.getSelector())) {
        rulesWithoutExceptions.push(rule);
      }
    }

    return rulesWithoutExceptions;
  }
}
