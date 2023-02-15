/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/* tslint:disable variable-name */

import { CompactMap } from '../map';
import { StaticDataView, sizeOfUTF8, sizeOfLength } from '../../data-view';
import NetworkFilter from '../../filters/network';

export interface ITracker {
  readonly key: string;
  readonly name: string;
  readonly category: string;
  readonly organization: string | null;
  readonly alias: string | null;
  readonly website_url: string | null;
  readonly ghostery_id: string;
  readonly domains: string[];
  readonly filters: string[];
}

/**
 * This function takes an object representing a tracker from TrackerDB dump
 * and validates its shape. The result is the same object, but strongly typed.
 */
export function isValid(tracker: any): tracker is ITracker {
  if (tracker === null) {
    return false;
  }

  if (typeof tracker !== 'object') {
    return false;
  }

  const {
    key,
    name,
    category,
    organization,
    alias,
    website_url: websiteUrl,
    ghostery_id: ghosteryId,
    domains,
    filters,
  } = tracker;

  if (typeof key !== 'string') {
    return false;
  }

  if (typeof name !== 'string') {
    return false;
  }

  if (typeof category !== 'string') {
    return false;
  }

  if (organization !== null && typeof organization !== 'string') {
    return false;
  }

  if (typeof alias !== 'string' && alias !== null) {
    return false;
  }

  if (websiteUrl !== null && typeof websiteUrl !== 'string') {
    return false;
  }

  if (typeof ghosteryId !== 'string') {
    return false;
  }

  if (!Array.isArray(domains) || !domains.every((domain) => typeof domain === 'string')) {
    return false;
  }

  if (!Array.isArray(filters) || !filters.every((filter) => typeof filter === 'string')) {
    return false;
  }

  return true;
}

export function getKeys(tracker: ITracker): number[] {
  const keys: number[] = [];

  for (const filter of tracker.filters) {
    const parsedFilter = NetworkFilter.parse(filter);
    if (parsedFilter !== null) {
      keys.push(parsedFilter.getId());
    }
  }

  for (const domain of tracker.domains) {
    const parsedFilter = NetworkFilter.parse(`||${domain}^`);
    if (parsedFilter !== null) {
      keys.push(parsedFilter.getId());
    }
  }

  return [...new Set(keys)];
}

export function getSerializedSize(tracker: ITracker): number {
  let sizeOfDomains = sizeOfLength(tracker.domains.length);
  for (const domain of tracker.domains) {
    sizeOfDomains += sizeOfUTF8(domain);
  }

  let sizeOfFilters = sizeOfLength(tracker.filters.length);
  for (const filter of tracker.filters) {
    sizeOfFilters += sizeOfUTF8(filter);
  }

  return (
    sizeOfUTF8(tracker.key) +
    sizeOfUTF8(tracker.name) +
    sizeOfUTF8(tracker.category) +
    sizeOfUTF8(tracker.organization || '') +
    sizeOfUTF8(tracker.alias || '') +
    sizeOfUTF8(tracker.website_url || '') +
    sizeOfUTF8(tracker.ghostery_id) +
    sizeOfDomains +
    sizeOfFilters
  );
}

export function serialize(tracker: ITracker, view: StaticDataView) {
  view.pushUTF8(tracker.key);
  view.pushUTF8(tracker.name);
  view.pushUTF8(tracker.category);
  view.pushUTF8(tracker.organization || '');
  view.pushUTF8(tracker.alias || '');
  view.pushUTF8(tracker.website_url || '');
  view.pushUTF8(tracker.ghostery_id);

  view.pushLength(tracker.domains.length);
  for (const domain of tracker.domains) {
    view.pushUTF8(domain);
  }

  view.pushLength(tracker.filters.length);
  for (const filter of tracker.filters) {
    view.pushUTF8(filter);
  }
}

export function deserialize(view: StaticDataView): ITracker {
  const key = view.getUTF8();
  const name = view.getUTF8();
  const category = view.getUTF8();
  const organization = view.getUTF8() || null;
  const alias = view.getUTF8() || null;
  const website_url = view.getUTF8() || null;
  const ghostery_id = view.getUTF8();

  const numberOfDomains = view.getLength();
  const domains = [];
  for (let i = 0; i < numberOfDomains; i += 1) {
    domains.push(view.getUTF8());
  }

  const numberOfFilters = view.getLength();
  const filters = [];
  for (let i = 0; i < numberOfFilters; i += 1) {
    filters.push(view.getUTF8());
  }

  return {
    key,
    name,
    category,
    organization,
    alias,
    website_url,
    ghostery_id,
    domains,
    filters,
  };
}

export function createMap(trackers: ITracker[]): CompactMap<ITracker> {
  return new CompactMap({
    getSerializedSize,
    getKeys,
    serialize,
    deserialize,
    values: trackers,
  });
}
