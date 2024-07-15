/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { CompactMap } from '../map.js';
import { StaticDataView, sizeOfUTF8 } from '../../data-view.js';
import { fastHash } from '../../utils.js';

export interface IOrganization {
  key: string;
  name: string;
  description: string | null;
  website_url: string | null;
  country: string | null;
  privacy_policy_url: string | null;
  privacy_contact: string | null;
  ghostery_id: string | null;
}

/**
 * This function takes an object representing an organization from TrackerDB
 * dump and validates its shape. The result is the same object, but strongly
 * typed.
 */
export function isValid(organization: any): organization is IOrganization {
  if (organization === null) {
    return false;
  }

  if (typeof organization !== 'object') {
    return false;
  }

  const {
    key,
    name,
    description,
    country,
    website_url: websiteUrl,
    privacy_policy_url: privacyPolicyUrl,
    privacy_contact: privacyContact,
    ghostery_id: ghosteryId,
  } = organization;

  if (typeof key !== 'string') {
    return false;
  }

  if (typeof name !== 'string') {
    return false;
  }

  if (description !== null && typeof description !== 'string') {
    return false;
  }

  if (country !== null && typeof country !== 'string') {
    return false;
  }

  if (websiteUrl !== null && typeof websiteUrl !== 'string') {
    return false;
  }

  if (privacyPolicyUrl !== null && typeof privacyPolicyUrl !== 'string') {
    return false;
  }

  if (privacyContact !== null && typeof privacyContact !== 'string') {
    return false;
  }

  if (ghosteryId !== null && typeof ghosteryId !== 'string') {
    return false;
  }

  return true;
}

export function getKey(organization: { key: string }): number {
  return fastHash(organization.key);
}

export function getSerializedSize(organization: IOrganization): number {
  return (
    sizeOfUTF8(organization.key) +
    sizeOfUTF8(organization.name) +
    sizeOfUTF8(organization.description || '') +
    sizeOfUTF8(organization.website_url || '') +
    sizeOfUTF8(organization.country || '') +
    sizeOfUTF8(organization.privacy_policy_url || '') +
    sizeOfUTF8(organization.privacy_contact || '') +
    sizeOfUTF8(organization.ghostery_id || '')
  );
}

export function serialize(organization: IOrganization, view: StaticDataView) {
  view.pushUTF8(organization.key);
  view.pushUTF8(organization.name);
  view.pushUTF8(organization.description || '');
  view.pushUTF8(organization.website_url || '');
  view.pushUTF8(organization.country || '');
  view.pushUTF8(organization.privacy_policy_url || '');
  view.pushUTF8(organization.privacy_contact || '');
  view.pushUTF8(organization.ghostery_id || '');
}

export function deserialize(view: StaticDataView): IOrganization {
  return {
    key: view.getUTF8(),
    name: view.getUTF8(),
    description: view.getUTF8() || null,
    website_url: view.getUTF8() || null,
    country: view.getUTF8() || null,
    privacy_policy_url: view.getUTF8() || null,
    privacy_contact: view.getUTF8() || null,
    ghostery_id: view.getUTF8() || null,
  };
}

export function createMap(organizations: IOrganization[]): CompactMap<IOrganization> {
  return new CompactMap({
    getSerializedSize,
    getKeys: (organization) => [getKey(organization)],
    serialize,
    deserialize,
    values: organizations,
  });
}
