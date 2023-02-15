/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { CompactMap } from './map';
import { StaticDataView } from '../data-view';
import NetworkFilter from '../filters/network';

import {
  ICategory,
  createMap as createCategoriesMap,
  isValid as isValidCategory,
  deserialize as deserializeCategory,
  getKey as getCategoryKey,
} from './metadata/categories';

import {
  IOrganization,
  createMap as createOrganizationsMap,
  isValid as isValidOrganization,
  deserialize as deserializeOrganization,
  getKey as getOrganizationKey,
} from './metadata/organizations';

import {
  ITracker,
  createMap as createTrackersMap,
  isValid as isValidTracker,
  deserialize as deserializeTracker,
} from './metadata/trackers';

export interface ITrackerLookupResult {
  tracker: ITracker;
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
    metadata.trackers = CompactMap.deserialize(buffer, deserializeTracker);
    return metadata;
  }

  public organizations: CompactMap<IOrganization>;
  public categories: CompactMap<ICategory>;
  public trackers: CompactMap<ITracker>;

  constructor(rawTrackerDB: any) {
    if (!rawTrackerDB) {
      this.organizations = createOrganizationsMap([]);
      this.categories = createCategoriesMap([]);
      this.trackers = createTrackersMap([]);
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

    // Type-check trackers
    const trackers: ITracker[] = [];
    if (typeof rawPatterns === 'object') {
      for (const [key, tracker] of Object.entries(rawPatterns)) {
        if (typeof tracker !== 'object') {
          continue;
        }
        const trackerWithKey = { key, ...tracker };
        if (isValidTracker(trackerWithKey)) {
          trackers.push(trackerWithKey);
        } else {
          console.error('?? invalid tracker', trackerWithKey);
        }
      }
    }
    this.trackers = createTrackersMap(trackers);
  }

  public getCategories(): ICategory[] {
    return this.categories.getValues();
  }

  public getOrganizations(): IOrganization[] {
    return this.organizations.getValues();
  }

  public getTrackers(): ITracker[] {
    return this.trackers.getValues();
  }

  /**
   * Estimate the total serialized size of this Metadata instance.
   */
  public getSerializedSize(): number {
    return (
      this.categories.getSerializedSize() +
      this.organizations.getSerializedSize() +
      this.trackers.getSerializedSize()
    );
  }

  /**
   * Serialize this instance of Metadata into `view`
   */
  public serialize(buffer: StaticDataView): void {
    this.categories.serialize(buffer);
    this.organizations.serialize(buffer);
    this.trackers.serialize(buffer);
  }

  /**
   * Given an instance of NetworkFilter, retrieve tracker, organization and
   * category information.
   */
  public fromFilter(filter: NetworkFilter): ITrackerLookupResult[] {
    return this.fromId(filter.getId());
  }

  /**
   * Given a domain, retrieve tracker, organization and category information.
   */
  public fromDomain(domain: string): ITrackerLookupResult[] {
    const parsedDomainFilter = NetworkFilter.parse(`||${domain}^`);
    if (parsedDomainFilter === null) {
      return [];
    }

    return this.fromId(parsedDomainFilter.getId());
  }

  /**
   * Given an `id` from filter, retrieve using the NetworkFilter.getId() method,
   * lookup associated trackers (including organization and category) in an
   * efficient way.
   */
  public fromId(id: number): ITrackerLookupResult[] {
    const results: ITrackerLookupResult[] = [];

    for (const tracker of this.trackers.get(id)) {
      results.push({
        tracker,
        category: this.categories.get(getCategoryKey({ key: tracker.category }))?.[0],
        organization:
          tracker.organization !== null
            ? this.organizations.get(getOrganizationKey({ key: tracker.organization }))?.[0]
            : null,
      });
    }

    return results;
  }
}
