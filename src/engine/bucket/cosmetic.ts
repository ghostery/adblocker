/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import StaticDataView from '../../data-view';
import CosmeticFilter, {
  DEFAULT_HIDDING_STYLE,
  getEntityHashesFromLabelsBackward,
  getHostnameHashesFromLabelsBackward,
} from '../../filters/cosmetic';
import ReverseIndex from '../reverse-index';
import FiltersContainer from './filters';

/**
 * Given a list of CSS selectors, create a valid stylesheet ready to be
 * injected in the page. This also takes care to no create rules with too many
 * selectors for Chrome, see: https://crbug.com/804179
 */
export function createStylesheet(rules: string[], style: string): string {
  if (rules.length === 0) {
    return '';
  }

  const maximumNumberOfSelectors = 1024;
  const parts: string[] = [];
  const styleStr: string = ` { ${style} }`;

  for (let i = 0; i < rules.length; i += maximumNumberOfSelectors) {
    // Accumulate up to `maximumNumberOfSelectors` selectors into `selector`.
    // We use string concatenation here since it's faster than using
    // `Array.prototype.join`.
    let selector = rules[i];
    for (
      let j = i + 1, end = Math.min(rules.length, i + maximumNumberOfSelectors);
      j < end;
      j += 1
    ) {
      selector += ',\n' + rules[j];
    }

    // Insert CSS after last selector (e.g.: `{ display: none }`)
    selector += styleStr;

    // If `rules` has less then the limit, we can short-circuit here
    if (rules.length < maximumNumberOfSelectors) {
      return selector;
    }

    // Keep track of this chunk and process next ones
    parts.push(selector);
  }

  // Join all chunks together
  return parts.join('\n');
}

/**
 * If at least one filter from `rules` has a custom style (e.g.: `##.foo
 * :style(...)`) then we fallback to `createStylesheetFromRulesWithCustomStyles`
 * which is slower then `createStylesheetFromRules`.
 */
function createStylesheetFromRulesWithCustomStyles(rules: CosmeticFilter[]): string {
  const selectorsPerStyle: Map<string, string[]> = new Map();

  for (let i = 0; i < rules.length; i += 1) {
    const rule = rules[i];
    const style = rule.getStyle();
    const selectors = selectorsPerStyle.get(style);
    if (selectors === undefined) {
      selectorsPerStyle.set(style, [rule.getSelector()]);
    } else {
      selectors.push(rule.getSelector());
    }
  }

  const stylesheets: string[] = [];
  for (const [style, selectors] of selectorsPerStyle.entries()) {
    stylesheets.push(createStylesheet(selectors, style));
  }

  return stylesheets.join('\n\n');
}

/**
 * Given a list of cosmetic filters, create a stylesheet ready to be injected.
 * This function is optimistic and will assume there is no `:style` filter in
 * `rules`. In case one is found on the way, we fallback to the slower
 * `createStylesheetFromRulesWithCustomStyles` function.
 */
function createStylesheetFromRules(rules: CosmeticFilter[]): string {
  const selectors: string[] = [];
  for (let i = 0; i < rules.length; i += 1) {
    const rule = rules[i];

    if (rule.hasCustomStyle()) {
      return createStylesheetFromRulesWithCustomStyles(rules);
    }

    selectors.push(rule.selector);
  }

  return createStylesheet(selectors, DEFAULT_HIDDING_STYLE);
}

function createLookupTokens(hostname: string, domain: string): Uint32Array {
  const hostnamesHashes = getHostnameHashesFromLabelsBackward(hostname, domain);
  const entitiesHashes = getEntityHashesFromLabelsBackward(hostname, domain);
  let index = 0;
  const tokens = new Uint32Array(hostnamesHashes.length + entitiesHashes.length);

  for (let i = 0; i < hostnamesHashes.length; i += 1) {
    tokens[index++] = hostnamesHashes[i];
  }

  for (let i = 0; i < entitiesHashes.length; i += 1) {
    tokens[index++] = entitiesHashes[i];
  }

  return tokens;
}

/**
 * Efficient container for CosmeticFilter instances. Allows to quickly
 * retrieved scripts and stylesheets to inject in pages for a specific
 * hostname/domain.
 */
export default class CosmeticFilterBucket {
  public static deserialize(buffer: StaticDataView): CosmeticFilterBucket {
    const bucket = new CosmeticFilterBucket();

    bucket.genericRules = FiltersContainer.deserialize(buffer, CosmeticFilter.deserialize);
    bucket.unhideIndex = ReverseIndex.deserialize(buffer, CosmeticFilter.deserialize);
    bucket.hostnameIndex = ReverseIndex.deserialize(buffer, CosmeticFilter.deserialize);

    return bucket;
  }

  // `hostnameIndex` contains all cosmetic filters which are specific to one or
  // several domains (that includes entities as well). They are stored in a
  // reverse index which allows to efficiently get a subset of the filters
  // which could be injected on a given page (given hostname and domain).
  public hostnameIndex: ReverseIndex<CosmeticFilter>;
  public unhideIndex: ReverseIndex<CosmeticFilter>;

  // `genericRules` is a contiguous container of filters. In this case
  // we keep track of all generic cosmetic filters, which allows us to
  // efficiently inject them in any page (either all of them or none of
  // them, without having to match against the hostname/domain of the
  // page). Having them separated also makes it easier to disable them.
  public genericRules: FiltersContainer<CosmeticFilter>;

  // In-memory cache
  public baseStylesheet: string | null;
  public extraGenericRules: CosmeticFilter[] | null;

  constructor({ filters = [] }: { filters?: CosmeticFilter[] } = {}) {
    this.genericRules = new FiltersContainer({ deserialize: CosmeticFilter.deserialize });
    this.hostnameIndex = new ReverseIndex({ deserialize: CosmeticFilter.deserialize });
    this.unhideIndex = new ReverseIndex({ deserialize: CosmeticFilter.deserialize });

    // In-memory cache, lazily initialized
    this.baseStylesheet = null;
    this.extraGenericRules = null;

    if (filters.length !== 0) {
      this.update(filters);
    }
  }

  public update(newFilters: CosmeticFilter[], removedFilters?: Set<number>): void {
    const unHideRules: CosmeticFilter[] = [];
    const genericHideRules: CosmeticFilter[] = [];
    const hostnameSpecificRules: CosmeticFilter[] = [];

    for (let i = 0; i < newFilters.length; i += 1) {
      const rule = newFilters[i];
      if (rule.isUnhide()) {
        unHideRules.push(rule);
      } else if (rule.isGenericHide()) {
        genericHideRules.push(rule);
      } else {
        hostnameSpecificRules.push(rule);
      }
    }

    this.genericRules.update(genericHideRules, removedFilters);
    this.unhideIndex.update(unHideRules, removedFilters);
    this.hostnameIndex.update(hostnameSpecificRules, removedFilters);
  }

  public serialize(buffer: StaticDataView): void {
    this.genericRules.serialize(buffer);
    this.unhideIndex.serialize(buffer);
    this.hostnameIndex.serialize(buffer);
  }

  public getCosmeticsFilters(
    hostname: string,
    domain: string,
    allowGenericHides: boolean,
  ): { injections: CosmeticFilter[]; stylesheet: string } {
    const injections: CosmeticFilter[] = [];
    const styles: CosmeticFilter[] = [];

    const rules = this.getMatchingRules(hostname, domain, allowGenericHides);
    for (let i = 0; i < rules.length; i += 1) {
      const rule: CosmeticFilter = rules[i];

      if (rule.isScriptInject()) {
        injections.push(rule);
      } else {
        styles.push(rule);
      }
    }

    // Create final stylesheet
    let stylesheet = allowGenericHides === false ? '' : this.getBaseStylesheet();
    if (styles.length !== 0) {
      if (stylesheet.length !== 0) {
        stylesheet += '\n\n';
      }

      stylesheet += createStylesheetFromRules(styles);
    }

    return {
      injections,
      stylesheet,
    };
  }

  private getMatchingRules(
    hostname: string,
    domain: string,
    allowGenericHides: boolean,
  ): CosmeticFilter[] {
    const tokens = createLookupTokens(hostname, domain);

    // Collect unhidden selectors. They will be used to filter-out canceled
    // rules from `this.hostnameIndex` and `genericRules`.
    const disabledRules: Set<string> = new Set();
    this.unhideIndex.iterMatchingFilters(tokens, (rule: CosmeticFilter) => {
      if (rule.match(hostname, domain)) {
        disabledRules.add(rule.getSelector());
      }

      return true;
    });

    // Collect matching rules, filtering out selectors found in `disabledRules`.
    const rules: CosmeticFilter[] = [];
    this.hostnameIndex.iterMatchingFilters(tokens, (rule: CosmeticFilter) => {
      if (
        rule.match(hostname, domain) &&
        (disabledRules.size === 0 || !disabledRules.has(rule.getSelector()))
      ) {
        rules.push(rule);
      }

      return true;
    });

    // Optionally, collect genericHide rules, also filtering out selectors from
    // `disabledRules`. We need to make sure the `rule` matches the hostname
    // and domain since some generic rules can specify negated hostnames and
    // entities.
    if (allowGenericHides === true) {
      const genericRules = this.getGenericRules();
      for (let i = 0; i < genericRules.length; i += 1) {
        const rule = genericRules[i];
        if (
          (rule.hasHostnameConstraint() === false || rule.match(hostname, domain) === true) &&
          (disabledRules.size === 0 || disabledRules.has(rule.getSelector()) === false)
        ) {
          rules.push(rule);
        }
      }
    }

    return rules;
  }

  private getGenericRules(): CosmeticFilter[] {
    if (this.extraGenericRules === null) {
      return this.lazyPopulateGenericRulesCache().genericRules;
    }
    return this.extraGenericRules;
  }

  private getBaseStylesheet(): string {
    if (this.baseStylesheet === null) {
      return this.lazyPopulateGenericRulesCache().baseStylesheet;
    }
    return this.baseStylesheet;
  }

  private lazyPopulateGenericRulesCache(): {
    baseStylesheet: string;
    genericRules: CosmeticFilter[];
  } {
    if (this.baseStylesheet === null || this.extraGenericRules === null) {
      // Collect all selectors which can be subjected to an unhide rule
      const unHideRules = this.unhideIndex.getFilters();
      const canBeHiddenSelectors: Set<string> = new Set();
      for (let i = 0; i < unHideRules.length; i += 1) {
        canBeHiddenSelectors.add(unHideRules[i].getSelector());
      }

      // Split generic rules into two groups:
      // 1. Rules which cannot be hidden
      // 2. Rules which can be hidden on some domains
      //
      // This allows to create a base stylesheet which we know will never
      // change then keep a minority of rules in-memory which can potentially
      // be hidden.
      const genericRules = this.genericRules.getFilters();
      const cannotBeHiddenRules: CosmeticFilter[] = [];
      const canBeHiddenRules: CosmeticFilter[] = [];
      for (let i = 0; i < genericRules.length; i += 1) {
        const rule = genericRules[i];
        if (
          rule.hasCustomStyle() ||
          rule.isScriptInject() ||
          rule.hasHostnameConstraint() ||
          canBeHiddenSelectors.has(rule.getSelector())
        ) {
          canBeHiddenRules.push(rule);
        } else {
          cannotBeHiddenRules.push(rule);
        }
      }

      this.baseStylesheet = createStylesheetFromRules(cannotBeHiddenRules);
      this.extraGenericRules = canBeHiddenRules;
    }

    return {
      baseStylesheet: this.baseStylesheet,
      genericRules: this.extraGenericRules,
    };
  }
}
