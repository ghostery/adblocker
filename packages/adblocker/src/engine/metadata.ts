/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { CompactMap } from './map.js';
import { StaticDataView } from '../data-view.js';
import NetworkFilter from '../filters/network.js';

import {
  ICategory,
  createMap as createCategoriesMap,
  isValid as isValidCategory,
  deserialize as deserializeCategory,
  getKey as getCategoryKey,
} from './metadata/categories.js';

import {
  IOrganization,
  createMap as createOrganizationsMap,
  isValid as isValidOrganization,
  deserialize as deserializeOrganization,
  getKey as getOrganizationKey,
} from './metadata/organizations.js';

import {
  IPattern,
  createMap as createPatternsMap,
  isValid as isValidPattern,
  deserialize as deserializePattern,
} from './metadata/patterns.js';

export interface IPatternLookupResult {
  pattern: IPattern;
  organization: IOrganization | null;
  category: ICategory | null;
}

// Optionally, we can also compress their names and descriptions but I think that should not be necessary as it's probably pretty small.

// Usage in MV3 extension
// ======================
// 1. The extension will load the binary engine containing metadata and store it locally
// 2. Either on webRequest events or DNR filter IDs (requires to synchronize the IDs), we tag the request with their metadata
// (2.) At runtime, we will either feed it a request and we expect to get metadata (match, get filter, then from filter ID, get metadata)
//    Or we feed it the filter ID directly, from the DNR engine (but then it means we need to use the filter hash as an ID there as well and hope for no collision)

export class Metadata {
  public static deserialize(buffer: StaticDataView): Metadata {
    const metadata = new Metadata(null);
    metadata.categories = CompactMap.deserialize(buffer, deserializeCategory);
    metadata.organizations = CompactMap.deserialize(buffer, deserializeOrganization);
    metadata.patterns = CompactMap.deserialize(buffer, deserializePattern);
    return metadata;
  }

  public organizations: CompactMap<IOrganization>;
  public categories: CompactMap<ICategory>;
  public patterns: CompactMap<IPattern>;

  constructor(rawTrackerDB: any) {
    if (!rawTrackerDB) {
      this.organizations = createOrganizationsMap([]);
      this.categories = createCategoriesMap([]);
      this.patterns = createPatternsMap([]);
      return;
    }

    const {
      patterns: rawPatterns,
      organizations: rawOrganizations,
      categories: rawCategories,
    } = rawTrackerDB;

    // Type-check categories
    const categories: ICategory[] = [];
    if (typeof rawCategories === 'object') {
      for (const [key, category] of Object.entries(rawCategories)) {
        if (typeof category !== 'object') {
          continue;
        }
        const categoryWithKey = { key, ...category };
        if (isValidCategory(categoryWithKey)) {
          categories.push(categoryWithKey);
        } else {
          console.error('?? invalid category', categoryWithKey);
        }
      }
    }
    this.categories = createCategoriesMap(categories);

    // Type-check organizations
    const organizations: IOrganization[] = [];
    if (typeof rawOrganizations === 'object') {
      for (const [key, organization] of Object.entries(rawOrganizations)) {
        if (typeof organization !== 'object') {
          continue;
        }
        const organizationWithKey = { key, ...organization };
        if (isValidOrganization(organizationWithKey)) {
          organizations.push(organizationWithKey);
        } else {
          console.error('?? invalid organization', organizationWithKey);
        }
      }
    }
    this.organizations = createOrganizationsMap(organizations);

    // Type-check patterns
    const patterns: IPattern[] = [];
    if (typeof rawPatterns === 'object') {
      for (const [key, pattern] of Object.entries(rawPatterns)) {
        if (typeof pattern !== 'object') {
          continue;
        }
        const patternWithKey = { key, ...pattern };
        if (isValidPattern(patternWithKey)) {
          patterns.push(patternWithKey);
        } else {
          console.error('?? invalid pattern', patternWithKey);
        }
      }
    }
    this.patterns = createPatternsMap(patterns);
  }

  public getCategories(): ICategory[] {
    return this.categories.getValues();
  }

  public getOrganizations(): IOrganization[] {
    return this.organizations.getValues();
  }

  public getPatterns(): IPattern[] {
    return this.patterns.getValues();
  }

  /**
   * Estimate the total serialized size of this Metadata instance.
   */
  public getSerializedSize(): number {
    return (
      this.categories.getSerializedSize() +
      this.organizations.getSerializedSize() +
      this.patterns.getSerializedSize()
    );
  }

  /**
   * Serialize this instance of Metadata into `view`
   */
  public serialize(buffer: StaticDataView): void {
    this.categories.serialize(buffer);
    this.organizations.serialize(buffer);
    this.patterns.serialize(buffer);
  }

  /**
   * Given an instance of NetworkFilter, retrieve pattern, organization and
   * category information.
   */
  public fromFilter(filter: NetworkFilter): IPatternLookupResult[] {
    return this.fromId(filter.getId());
  }

  /**
   * Given a domain, retrieve pattern, organization and category information.
   */
  public fromDomain(domain: string): IPatternLookupResult[] {
    const domainParts = domain.split('.');

    for (; domainParts.length >= 2; domainParts.shift()) {
      const subdomain = domainParts.join('.');
      const parsedDomainFilter = NetworkFilter.parse(`||${subdomain}^`);

      if (parsedDomainFilter === null) {
        continue;
      }

      const patterns = this.fromId(parsedDomainFilter.getId());
      if (patterns.length > 0) {
        return patterns;
      }
    }
    return [];
  }

  /**
   * Given an `id` from filter, retrieve using the NetworkFilter.getId() method,
   * lookup associated patterns (including organization and category) in an
   * efficient way.
   */
  public fromId(id: number): IPatternLookupResult[] {
    const results: IPatternLookupResult[] = [];

    for (const pattern of this.patterns.get(id)) {
      results.push({
        pattern,
        category: this.categories.get(getCategoryKey({ key: pattern.category }))?.[0],
        organization:
          pattern.organization !== null
            ? this.organizations.get(getOrganizationKey({ key: pattern.organization }))?.[0]
            : null,
      });
    }

    return results;
  }
}
