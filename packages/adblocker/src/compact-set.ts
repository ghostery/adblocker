/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

export function compactTokens(tokens: Uint32Array): Uint32Array {
  const sorted = tokens.sort();
  let lastIndex = 1;
  for (let i = 1; i < sorted.length; i += 1) {
    if (sorted[lastIndex - 1] !== sorted[i]) {
      sorted[lastIndex++] = sorted[i];
    }
  }

  return sorted.subarray(0, lastIndex);
}

export function hasEmptyIntersection(s1: Uint32Array, s2: Uint32Array): boolean {
  let i = 0;
  let j = 0;

  while (i < s1.length && j < s2.length && s1[i] !== s2[j]) {
    if (s1[i] < s2[j]) {
      i += 1;
    } else {
      j += 1;
    }
  }

  return i === s1.length || j === s2.length;
}

const EMPTY_UINT32_ARRAY = new Uint32Array(0);

export function concatTypedArrays(arrays: Uint32Array[]): Uint32Array {
  if (arrays.length === 0) {
    return EMPTY_UINT32_ARRAY;
  }

  if (arrays.length === 1) {
    return arrays[0];
  }

  let totalSize = 0;
  for (let i = 0; i < arrays.length; i += 1) {
    totalSize += arrays[i].length;
  }

  const result = new Uint32Array(totalSize);
  let index = 0;
  for (let i = 0; i < arrays.length; i += 1) {
    const array = arrays[i];
    for (let j = 0; j < array.length; j += 1) {
      result[index++] = array[j];
    }
  }

  return result;
}

export function mergeCompactSets(arrays: Uint32Array[]): Uint32Array {
  return compactTokens(concatTypedArrays(arrays));
}
