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

export interface ICategory {
  key: string;
  name: string;
  color: string;
  description: string;
}

export function isValid(category: any): category is ICategory {
  if (category === null) {
    return false;
  }

  if (typeof category !== 'object') {
    return false;
  }

  const { key, name, color, description } = category;

  if (typeof key !== 'string') {
    return false;
  }

  if (typeof name !== 'string') {
    return false;
  }

  if (typeof color !== 'string') {
    return false;
  }

  if (typeof description !== 'string') {
    return false;
  }

  return true;
}

export function getKey(category: { key: string }): number {
  return fastHash(category.key);
}

export function getSerializedSize(category: ICategory): number {
  return (
    sizeOfUTF8(category.key) +
    sizeOfUTF8(category.name) +
    sizeOfUTF8(category.color) +
    sizeOfUTF8(category.description)
  );
}

export function serialize(category: ICategory, view: StaticDataView) {
  view.pushUTF8(category.key);
  view.pushUTF8(category.name);
  view.pushUTF8(category.color);
  view.pushUTF8(category.description);
}

export function deserialize(view: StaticDataView): ICategory {
  return {
    key: view.getUTF8(),
    name: view.getUTF8(),
    color: view.getUTF8(),
    description: view.getUTF8(),
  };
}

export function createMap(categories: ICategory[]): CompactMap<ICategory> {
  return new CompactMap({
    getSerializedSize,
    getKeys: (category) => [getKey(category)],
    serialize,
    deserialize,
    values: categories,
  });
}
