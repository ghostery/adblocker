/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { compactTokens, hasEmptyIntersection, mergeCompactSets } from '../src/compact-set';

function a(strings: TemplateStringsArray): Uint32Array {
  const str = strings.raw[0];
  const array = new Uint32Array(str.length);
  for (let i = 0; i < str.length; i += 1) {
    array[i] = str.charCodeAt(i);
  }
  return array;
}

it('#compactTokens', () => {
  expect(compactTokens(a``)).toEqual(a``);
  expect(compactTokens(a`b`)).toEqual(a`b`);
  expect(compactTokens(a`foo`)).toEqual(a`fo`);
  expect(compactTokens(a`bbbaaacc`)).toEqual(a`abc`);
});

it('#hasEmptyIntersection', () => {
  expect(hasEmptyIntersection(a`abcde`, a`efgh`)).toEqual(false);
  expect(hasEmptyIntersection(a`efgh`, a`abcde`)).toEqual(false);
  expect(hasEmptyIntersection(a`bcde`, a`aefgh`)).toEqual(false);
  expect(hasEmptyIntersection(a`abcde`, a`fgh`)).toEqual(true);
  expect(hasEmptyIntersection(a``, a``)).toEqual(true);
  expect(hasEmptyIntersection(a`abc`, a``)).toEqual(true);
  expect(hasEmptyIntersection(a``, a`abc`)).toEqual(true);
  expect(hasEmptyIntersection(a``, a`abc`)).toEqual(true);
});

it('#mergeCompactSets', () => {
  expect(mergeCompactSets([a``, a``])).toEqual(a``);
  expect(mergeCompactSets([a``, a`cde`])).toEqual(a`cde`);
  expect(mergeCompactSets([a`abc`, a``])).toEqual(a`abc`);
  expect(mergeCompactSets([a`abc`, a`cde`])).toEqual(a`abcde`);
  expect(mergeCompactSets([a`abc`, a`def`])).toEqual(a`abcdef`);
  expect(mergeCompactSets([a`cba`, a`cde`])).toEqual(a`abcde`);
  expect(mergeCompactSets([a`c`, a`b`, a`a`, a`cde`])).toEqual(a`abcde`);
});
