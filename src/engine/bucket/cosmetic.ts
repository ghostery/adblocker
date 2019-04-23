import StaticDataView from '../../data-view';
import CosmeticFilter, {
  getEntityHashesFromLabelsBackward,
  getHostnameHashesFromLabelsBackward,
} from '../../filters/cosmetic';
import FiltersContainer from './filters';

import ReverseIndex from '../reverse-index';

/**
 * Predicate function used to select generic hide cosmetic filters. This will
 * be used by the FiltersContainer.
 */
function isGenericFilterPredicate(filter: CosmeticFilter): boolean {
  return filter.isGenericHide();
}

/**
 * Efficient container for CosmeticFilter instances. Allows to quickly
 * retrieved scripts and stylesheets to inject in pages for a specific
 * hostname/domain.
 */
export default class CosmeticFilterBucket {
  public static deserialize(buffer: StaticDataView): CosmeticFilterBucket {
    const bucket = new CosmeticFilterBucket();

    bucket.genericRules = FiltersContainer.deserialize(
      buffer,
      CosmeticFilter.deserialize,
      isGenericFilterPredicate,
    );
    bucket.hostnameIndex = ReverseIndex.deserialize(buffer, CosmeticFilter.deserialize);

    return bucket;
  }

  // `hostnameIndex` contains all cosmetic filters which are specific to one or
  // several domains (that includes entities as well). They are stored in a
  // reverse index which allows to efficiently get a subset of the filters
  // which could be injected on a given page (given hostname and domain).
  public hostnameIndex: ReverseIndex<CosmeticFilter>;

  // `genericRules` is a contiguous container of filters. In this case
  // we keep track of all generic cosmetic filters, which allows us to
  // efficiently inject them in any page (either all of them or none of
  // them, without having to match against the hostname/domain of the
  // page). Having them separated also makes it easier to disable them.
  public genericRules: FiltersContainer<CosmeticFilter>;

  constructor({ filters = [] }: { filters?: CosmeticFilter[] } = {}) {
    this.genericRules = new FiltersContainer({
      deserialize: CosmeticFilter.deserialize,
      filters: [],
      predicate: isGenericFilterPredicate,
    });

    this.hostnameIndex = new ReverseIndex({
      deserialize: CosmeticFilter.deserialize,
    });

    if (filters.length !== 0) {
      this.update(filters);
    }
  }

  public update(newFilters: CosmeticFilter[], removedFilters?: Set<number>): void {
    // `this.genericRules.update` returns an array of filters not having been selected.
    const hostnameSpecificRules = this.genericRules.update(newFilters, removedFilters);
    this.hostnameIndex.update(hostnameSpecificRules, removedFilters);
  }

  public serialize(buffer: StaticDataView): void {
    this.genericRules.serialize(buffer);
    this.hostnameIndex.serialize(buffer);
  }

  public getCosmeticsFilters(
    hostname: string,
    domain: string,
    allowGenericHides: boolean,
  ): CosmeticFilter[] {
    const disabledRules = new Set();
    const rules: CosmeticFilter[] = [];

    // Collect rules specifying a domain
    this.hostnameIndex.iterMatchingFilters(
      new Uint32Array([
        ...getHostnameHashesFromLabelsBackward(hostname, domain),
        ...getEntityHashesFromLabelsBackward(hostname, domain),
      ]),
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

    const rulesWithoutExceptions: CosmeticFilter[] = [];

    if (disabledRules.size === 0) {
      // No exception/unhide found, so all rules will be returned
      for (let i = 0; i < rules.length; i += 1) {
        rulesWithoutExceptions.push(rules[i]);
      }

      // If generic cosmetics are allowed, select the ones with a domain match
      if (allowGenericHides === true) {
        const genericRules = this.genericRules.getFilters();
        for (let i = 0; i < genericRules.length; i += 1) {
          const rule = genericRules[i];

          // Make sure that generic rules with negated domains/entities are checked
          if (rule.hasHostnameConstraint() && rule.match(hostname, domain) === false) {
            continue;
          }

          rulesWithoutExceptions.push(rule);
        }
      }
    } else {
      for (let i = 0; i < rules.length; i += 1) {
        const rule = rules[i];
        if (!disabledRules.has(rule.getSelector())) {
          rulesWithoutExceptions.push(rule);
        }
      }

      if (allowGenericHides === true) {
        const genericRules = this.genericRules.getFilters();
        for (let i = 0; i < genericRules.length; i += 1) {
          const rule = genericRules[i];

          // Make sure that generic rules with negated domains/entities are checked
          if (rule.hasHostnameConstraint() && rule.match(hostname, domain) === false) {
            continue;
          }

          if (disabledRules.has(rule.getSelector()) === false) {
            rulesWithoutExceptions.push(rule);
          }
        }
      }
    }

    return rulesWithoutExceptions;
  }
}
