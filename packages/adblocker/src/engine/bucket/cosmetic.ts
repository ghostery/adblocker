/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { IMessageFromBackground } from '@cliqz/adblocker-content';

import { compactTokens, concatTypedArrays } from '../../compact-set';
import Config from '../../config';
import { StaticDataView } from '../../data-view';
import CosmeticFilter, { DEFAULT_HIDDING_STYLE } from '../../filters/cosmetic';
import {
  getEntityHashesFromLabelsBackward,
  getHostnameHashesFromLabelsBackward,
} from '../../request';
import { hashStrings, tokenizeNoSkip } from '../../utils';
import { noopOptimizeCosmetic } from '../optimizer';
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

    // If `rules` has less than the limit, we can short-circuit here
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
 * which is slower than `createStylesheetFromRules`.
 */
function createStylesheetFromRulesWithCustomStyles(rules: CosmeticFilter[]): string {
  const selectorsPerStyle: Map<string, string[]> = new Map();

  for (const rule of rules) {
    const style = rule.getStyle();
    const selectors = selectorsPerStyle.get(style);
    if (selectors === undefined) {
      selectorsPerStyle.set(style, [rule.getSelector()]);
    } else {
      selectors.push(rule.getSelector());
    }
  }

  const stylesheets: string[] = [];
  const selectorsPerStyleArray = Array.from(selectorsPerStyle.entries());
  for (const [style, selectors] of selectorsPerStyleArray) {
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
  for (const rule of rules) {
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
  const tokens = new Uint32Array(hostnamesHashes.length + entitiesHashes.length);

  let index = 0;

  for (const hash of hostnamesHashes) {
    tokens[index++] = hash;
  }

  for (const hash of entitiesHashes) {
    tokens[index++] = hash;
  }

  return tokens;
}

/**
 * Efficient container for CosmeticFilter instances. Allows to quickly
 * retrieved scripts and stylesheets to inject in pages for a specific
 * hostname/domain.
 */
export default class CosmeticFilterBucket {
  public static deserialize(buffer: StaticDataView, config: Config): CosmeticFilterBucket {
    const bucket = new CosmeticFilterBucket({ config });

    bucket.genericRules = FiltersContainer.deserialize(buffer, CosmeticFilter.deserialize, config);

    bucket.classesIndex = ReverseIndex.deserialize(
      buffer,
      CosmeticFilter.deserialize,
      noopOptimizeCosmetic,
      config,
    );

    bucket.hostnameIndex = ReverseIndex.deserialize(
      buffer,
      CosmeticFilter.deserialize,
      noopOptimizeCosmetic,
      config,
    );

    bucket.hrefsIndex = ReverseIndex.deserialize(
      buffer,
      CosmeticFilter.deserialize,
      noopOptimizeCosmetic,
      config,
    );

    bucket.htmlIndex = ReverseIndex.deserialize(
      buffer,
      CosmeticFilter.deserialize,
      noopOptimizeCosmetic,
      config,
    );

    bucket.idsIndex = ReverseIndex.deserialize(
      buffer,
      CosmeticFilter.deserialize,
      noopOptimizeCosmetic,
      config,
    );

    bucket.unhideIndex = ReverseIndex.deserialize(
      buffer,
      CosmeticFilter.deserialize,
      noopOptimizeCosmetic,
      config,
    );

    return bucket;
  }

  // `genericRules` is a contiguous container of filters. In this case
  // we keep track of all generic cosmetic filters, which allows us to
  // efficiently inject them in any page (either all of them or none of
  // them, without having to match against the hostname/domain of the
  // page). Having them separated also makes it easier to disable them.
  public genericRules: FiltersContainer<CosmeticFilter>;

  // `hostnameIndex` contains all cosmetic filters which are specific to one or
  // several domains (that includes entities as well). They are stored in a
  // reverse index which allows to efficiently get a subset of the filters
  // which could be injected on a given page (given hostname and domain).
  public classesIndex: ReverseIndex<CosmeticFilter>;
  public hostnameIndex: ReverseIndex<CosmeticFilter>;
  public hrefsIndex: ReverseIndex<CosmeticFilter>;
  public htmlIndex: ReverseIndex<CosmeticFilter>;
  public idsIndex: ReverseIndex<CosmeticFilter>;
  public unhideIndex: ReverseIndex<CosmeticFilter>;

  // In-memory cache
  public baseStylesheet: string | null;
  public extraGenericRules: CosmeticFilter[] | null;

  constructor({ filters = [], config }: { filters?: CosmeticFilter[]; config: Config }) {
    this.genericRules = new FiltersContainer({
      config,
      deserialize: CosmeticFilter.deserialize,
      filters: [],
    });

    this.classesIndex = new ReverseIndex({
      config,
      deserialize: CosmeticFilter.deserialize,
      filters: [],
      optimize: noopOptimizeCosmetic,
    });

    this.hostnameIndex = new ReverseIndex({
      config,
      deserialize: CosmeticFilter.deserialize,
      filters: [],
      optimize: noopOptimizeCosmetic,
    });

    this.hrefsIndex = new ReverseIndex({
      config,
      deserialize: CosmeticFilter.deserialize,
      filters: [],
      optimize: noopOptimizeCosmetic,
    });

    this.htmlIndex = new ReverseIndex({
      config,
      deserialize: CosmeticFilter.deserialize,
      filters: [],
      optimize: noopOptimizeCosmetic,
    });

    this.idsIndex = new ReverseIndex({
      config,
      deserialize: CosmeticFilter.deserialize,
      filters: [],
      optimize: noopOptimizeCosmetic,
    });

    this.unhideIndex = new ReverseIndex({
      config,
      deserialize: CosmeticFilter.deserialize,
      filters: [],
      optimize: noopOptimizeCosmetic,
    });

    // In-memory cache, lazily initialized
    this.baseStylesheet = null;
    this.extraGenericRules = null;

    if (filters.length !== 0) {
      this.update(filters, undefined, config);
    }
  }

  public getFilters(): CosmeticFilter[] {
    const filters: CosmeticFilter[] = [];
    return filters.concat(
      this.genericRules.getFilters(),
      this.classesIndex.getFilters(),
      this.hostnameIndex.getFilters(),
      this.hrefsIndex.getFilters(),
      this.htmlIndex.getFilters(),
      this.idsIndex.getFilters(),
      this.unhideIndex.getFilters(),
    );
  }

  public update(
    newFilters: CosmeticFilter[],
    removedFilters: Set<number> | undefined,
    config: Config,
  ): void {
    const classSelectors: CosmeticFilter[] = [];
    const genericHideRules: CosmeticFilter[] = [];
    const hostnameSpecificRules: CosmeticFilter[] = [];
    const hrefSelectors: CosmeticFilter[] = [];
    const htmlRules: CosmeticFilter[] = [];
    const idSelectors: CosmeticFilter[] = [];
    const unHideRules: CosmeticFilter[] = [];

    for (const rule of newFilters) {
      if (rule.isUnhide()) {
        unHideRules.push(rule);
      } else if (rule.isHtmlFiltering()) {
        htmlRules.push(rule);
      } else if (rule.isGenericHide()) {
        if (rule.isClassSelector()) {
          classSelectors.push(rule);
        } else if (rule.isIdSelector()) {
          idSelectors.push(rule);
        } else if (rule.isHrefSelector()) {
          hrefSelectors.push(rule);
        } else {
          genericHideRules.push(rule);
        }
      } else if (rule.isExtended() === false || config.loadExtendedSelectors === true) {
        hostnameSpecificRules.push(rule);
      }
    }

    this.genericRules.update(genericHideRules, removedFilters);
    this.classesIndex.update(classSelectors, removedFilters);
    this.hostnameIndex.update(hostnameSpecificRules, removedFilters);
    this.hrefsIndex.update(hrefSelectors, removedFilters);
    this.htmlIndex.update(htmlRules, removedFilters);
    this.idsIndex.update(idSelectors, removedFilters);
    this.unhideIndex.update(unHideRules, removedFilters);
  }

  public getSerializedSize(): number {
    return (
      this.genericRules.getSerializedSize() +
      this.classesIndex.getSerializedSize() +
      this.hostnameIndex.getSerializedSize() +
      this.hrefsIndex.getSerializedSize() +
      this.htmlIndex.getSerializedSize() +
      this.idsIndex.getSerializedSize() +
      this.unhideIndex.getSerializedSize()
    );
  }

  public serialize(buffer: StaticDataView): void {
    this.genericRules.serialize(buffer);
    this.classesIndex.serialize(buffer);
    this.hostnameIndex.serialize(buffer);
    this.hrefsIndex.serialize(buffer);
    this.htmlIndex.serialize(buffer);
    this.idsIndex.serialize(buffer);
    this.unhideIndex.serialize(buffer);
  }

  public getHtmlRules({
    domain,
    hostname,
  }: {
    domain: string;
    hostname: string;
  }): CosmeticFilter[] {
    // Tokens from `hostname` and `domain` which will be used to lookup filters
    // from the reverse index. The same tokens are re-used for multiple indices.
    const hostnameTokens = createLookupTokens(hostname, domain);
    const rules: CosmeticFilter[] = [];
    this.htmlIndex.iterMatchingFilters(hostnameTokens, (rule: CosmeticFilter) => {
      if (rule.match(hostname, domain)) {
        rules.push(rule);
      }
      return true;
    });

    // If we found at least one candidate, check if we have unhidden rules.
    const disabledRules: Set<string> = new Set();
    if (rules.length !== 0) {
      this.unhideIndex.iterMatchingFilters(hostnameTokens, (rule: CosmeticFilter) => {
        if (rule.match(hostname, domain)) {
          disabledRules.add(rule.getSelector());
        }

        return true;
      });
    }

    return rules.filter(
      (rule) => disabledRules.size === 0 || disabledRules.has(rule.getSelector()) === false,
    );
  }

  /**
   * Request cosmetics and scripts to inject in a page.
   */
  public getCosmeticsFilters({
    domain,
    hostname,

    classes = [],
    hrefs = [],
    ids = [],

    allowGenericHides = true,
    allowSpecificHides = true,

    // Allows to specify which rules to return
    getBaseRules = true,
    getInjectionRules = true,
    getExtendedRules = true,
    getRulesFromDOM = true,
    getRulesFromHostname = true,
  }: {
    domain: string;
    hostname: string;

    classes: string[] | undefined;
    hrefs: string[] | undefined;
    ids: string[] | undefined;

    allowGenericHides: boolean;
    allowSpecificHides: boolean;

    getBaseRules?: boolean;
    getInjectionRules?: boolean;
    getExtendedRules?: boolean;
    getRulesFromDOM?: boolean;
    getRulesFromHostname?: boolean;
  }): {
    injections: CosmeticFilter[];
    extended: IMessageFromBackground['extended'];
    stylesheet: string;
  } {
    // Tokens from `hostname` and `domain` which will be used to lookup filters
    // from the reverse index. The same tokens are re-used for multiple indices.
    const hostnameTokens = createLookupTokens(hostname, domain);
    const rules: CosmeticFilter[] = [];

    // =======================================================================
    // Rules: hostname-specific
    // =======================================================================
    // Collect matching rules which specify a hostname constraint.
    if (getRulesFromHostname === true) {
      this.hostnameIndex.iterMatchingFilters(hostnameTokens, (rule: CosmeticFilter) => {
        // A hostname-specific filter is considered if it's a scriptlet (not
        // impacted by disabling of specific filters) or specific hides are
        // allowed.
        if (
          (allowSpecificHides === true || rule.isScriptInject() === true) &&
          rule.match(hostname, domain)
        ) {
          rules.push(rule);
        }
        return true;
      });
    }

    // =======================================================================
    // Rules: generic hide
    // =======================================================================
    // Optionally, collect genericHide rules. We need to make sure the `rule`
    // matches the hostname and domain since some generic rules can specify
    // negated hostnames and entities (e.g.: ~foo.*##generic).
    if (allowGenericHides === true && getRulesFromHostname === true) {
      const genericRules = this.getGenericRules();
      for (const rule of genericRules) {
        if (rule.match(hostname, domain) === true) {
          rules.push(rule);
        }
      }
    }

    // =======================================================================
    // Class selector based
    // =======================================================================
    if (allowGenericHides === true && getRulesFromDOM === true && classes.length !== 0) {
      this.classesIndex.iterMatchingFilters(hashStrings(classes), (rule: CosmeticFilter) => {
        if (rule.match(hostname, domain)) {
          rules.push(rule);
        }
        return true;
      });
    }

    // =======================================================================
    // Id selector based
    // =======================================================================
    if (allowGenericHides === true && getRulesFromDOM === true && ids.length !== 0) {
      this.idsIndex.iterMatchingFilters(hashStrings(ids), (rule: CosmeticFilter) => {
        if (rule.match(hostname, domain)) {
          rules.push(rule);
        }
        return true;
      });
    }

    // =======================================================================
    // Href selector based
    // =======================================================================
    if (allowGenericHides === true && getRulesFromDOM === true && hrefs.length !== 0) {
      this.hrefsIndex.iterMatchingFilters(
        compactTokens(concatTypedArrays(hrefs.map((href) => tokenizeNoSkip(href)))),
        (rule: CosmeticFilter) => {
          if (rule.match(hostname, domain)) {
            rules.push(rule);
          }
          return true;
        },
      );
    }

    const extended: CosmeticFilter[] = [];
    const injections: CosmeticFilter[] = [];
    const styles: CosmeticFilter[] = [];

    // If we found at least one candidate, check if we have unhidden rules,
    // apply them and dispatch rules into `injections` (i.e.: '+js(...)'),
    // `extended` (i.e. :not(...)), and `styles` (i.e.: '##rule').
    if (rules.length !== 0) {
      // =======================================================================
      // Rules: unhide
      // =======================================================================
      // Collect unhidden selectors. They will be used to filter-out canceled
      // rules from other indices.
      let injectionsDisabled = false;
      const disabledRules: Set<string> = new Set();
      this.unhideIndex.iterMatchingFilters(hostnameTokens, (rule: CosmeticFilter) => {
        if (rule.match(hostname, domain)) {
          disabledRules.add(rule.getSelector());

          // Detect special +js() rules to disable scriptlet injections
          if (
            rule.isScriptInject() === true &&
            rule.isUnhide() === true &&
            rule.getSelector().length === 0
          ) {
            injectionsDisabled = true;
          }
        }

        return true;
      });

      // Apply unhide rules + dispatch
      for (const rule of rules) {
        // Make sure `rule` is not un-hidden by a #@# filter
        if (disabledRules.size !== 0 && disabledRules.has(rule.getSelector())) {
          continue;
        }

        // Dispatch rules in `injections` or `styles` depending on type
        if (rule.isScriptInject() === true) {
          if (getInjectionRules === true && injectionsDisabled === false) {
            injections.push(rule);
          }
        } else if (rule.isExtended()) {
          if (getExtendedRules === true) {
            extended.push(rule);
          }
        } else {
          styles.push(rule);
        }
      }
    }

    // Create final stylesheet
    let stylesheet: string =
      getBaseRules === false || allowGenericHides === false ? '' : this.getBaseStylesheet();

    if (styles.length !== 0) {
      if (stylesheet.length !== 0) {
        stylesheet += '\n\n';
      }

      stylesheet += createStylesheetFromRules(styles);
    }

    const extendedProcessed: IMessageFromBackground['extended'] = [];
    if (extended.length !== 0) {
      const extendedStyles: Map<string, string> = new Map();
      for (const rule of extended) {
        const ast = rule.getSelectorAST();
        if (ast !== undefined) {
          const attribute = rule.isRemove() ? undefined : rule.getStyleAttributeHash();

          if (attribute !== undefined) {
            extendedStyles.set(rule.getStyle(), attribute);
          }

          extendedProcessed.push({
            ast,
            remove: rule.isRemove(),
            attribute,
          });
        }
      }

      if (extendedStyles.size !== 0) {
        if (stylesheet.length !== 0) {
          stylesheet += '\n\n';
        }

        stylesheet += [...extendedStyles.entries()]
          .map(([style, attribute]) => `[${attribute}] { ${style} }`)
          .join('\n\n');
      }
    }

    return {
      extended: extendedProcessed,
      injections,
      stylesheet,
    };
  }

  /**
   * Return the list of filters which can potentially be un-hidden by another
   * rule currently contained in the cosmetic bucket.
   */
  private getGenericRules(): CosmeticFilter[] {
    if (this.extraGenericRules === null) {
      return this.lazyPopulateGenericRulesCache().genericRules;
    }
    return this.extraGenericRules;
  }

  /**
   * The base stylesheet is made of generic filters (not specific to any
   * hostname) which cannot be hidden (i.e.: there is currently no rule which
   * might hide their selector). This means that it will never change and is
   * the same for all sites. We generate it once and re-use it any-time we want
   * to inject it.
   */
  private getBaseStylesheet(): string {
    if (this.baseStylesheet === null) {
      return this.lazyPopulateGenericRulesCache().baseStylesheet;
    }
    return this.baseStylesheet;
  }

  /**
   * This is used to lazily generate both the list of generic rules which can
   * *potentially be un-hidden* (i.e.: there exists at least one unhide rule
   * for the selector) and a stylesheet containing all selectors which cannot
   * be un-hidden. Since this list will not change between updates we can
   * generate once and use many times.
   */
  private lazyPopulateGenericRulesCache(): {
    baseStylesheet: string;
    genericRules: CosmeticFilter[];
  } {
    if (this.baseStylesheet === null || this.extraGenericRules === null) {
      // Collect all selectors which can be subjected to an unhide rule
      const unHideRules = this.unhideIndex.getFilters();
      const canBeHiddenSelectors: Set<string> = new Set();
      for (const rule of unHideRules) {
        canBeHiddenSelectors.add(rule.getSelector());
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
      for (const rule of genericRules) {
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
