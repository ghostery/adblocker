/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { CompactMap } from '../map.js';
import { StaticDataView, sizeOfUTF8, sizeOfLength } from '../../data-view.js';
import NetworkFilter from '../../filters/network.js';

export interface IPattern {
  readonly key: string;
  readonly name: string;
  readonly category: string;
  readonly organization: string | null;
  readonly alias: string | null;
  readonly website_url: string | null;
  readonly ghostery_id: string | null;
  readonly domains: string[];
  readonly filters: string[];
}

/**
 * This function takes an object representing a pattern from TrackerDB dump
 * and validates its shape. The result is the same object, but strongly typed.
 */
export function isValid(pattern: any): pattern is IPattern {
  if (pattern === null) {
    return false;
  }

  if (typeof pattern !== 'object') {
    return false;
  }

  const {
    key,
    name,
    category,
    organization,
    alias,
    website_url: websiteUrl,
    domains,
    filters,
  } = pattern;

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

  if (!Array.isArray(domains) || !domains.every((domain) => typeof domain === 'string')) {
    return false;
  }

  if (!Array.isArray(filters) || !filters.every((filter) => typeof filter === 'string')) {
    return false;
  }

  return true;
}

export function getKeys(pattern: IPattern): number[] {
  const keys: number[] = [];

  for (const filter of pattern.filters) {
    const parsedFilter = NetworkFilter.parse(filter);
    if (parsedFilter !== null) {
      keys.push(parsedFilter.getId());
    }
  }

  for (const domain of pattern.domains) {
    const parsedFilter = NetworkFilter.parse(`||${domain}^`);
    if (parsedFilter !== null) {
      keys.push(parsedFilter.getId());
    }
  }

  return [...new Set(keys)];
}

export function getSerializedSize(pattern: IPattern): number {
  let sizeOfDomains = sizeOfLength(pattern.domains.length);
  for (const domain of pattern.domains) {
    sizeOfDomains += sizeOfUTF8(domain);
  }

  let sizeOfFilters = sizeOfLength(pattern.filters.length);
  for (const filter of pattern.filters) {
    sizeOfFilters += sizeOfUTF8(filter);
  }

  return (
    sizeOfUTF8(pattern.key) +
    sizeOfUTF8(pattern.name) +
    sizeOfUTF8(pattern.category) +
    sizeOfUTF8(pattern.organization || '') +
    sizeOfUTF8(pattern.alias || '') +
    sizeOfUTF8(pattern.website_url || '') +
    sizeOfUTF8(pattern.ghostery_id || '') +
    sizeOfDomains +
    sizeOfFilters
  );
}

export function serialize(pattern: IPattern, view: StaticDataView) {
  view.pushUTF8(pattern.key);
  view.pushUTF8(pattern.name);
  view.pushUTF8(pattern.category);
  view.pushUTF8(pattern.organization || '');
  view.pushUTF8(pattern.alias || '');
  view.pushUTF8(pattern.website_url || '');
  view.pushUTF8(pattern.ghostery_id || '');

  view.pushLength(pattern.domains.length);
  for (const domain of pattern.domains) {
    view.pushUTF8(domain);
  }

  view.pushLength(pattern.filters.length);
  for (const filter of pattern.filters) {
    view.pushUTF8(filter);
  }
}

export function deserialize(view: StaticDataView): IPattern {
  const key = view.getUTF8();
  const name = view.getUTF8();
  const category = view.getUTF8();
  const organization = view.getUTF8() || null;
  const alias = view.getUTF8() || null;
  const website_url = view.getUTF8() || null;
  const ghostery_id = view.getUTF8() || null;

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

export function createMap(patterns: IPattern[]): CompactMap<IPattern> {
  return new CompactMap({
    getSerializedSize,
    getKeys,
    serialize,
    deserialize,
    values: patterns,
  });
}
