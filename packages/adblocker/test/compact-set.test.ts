/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { expect } from 'chai';
import 'mocha';

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
  expect(compactTokens(a``)).to.eql(a``);
  expect(compactTokens(a`b`)).to.eql(a`b`);
  expect(compactTokens(a`foo`)).to.eql(a`fo`);
  expect(compactTokens(a`bbbaaacc`)).to.eql(a`abc`);
});

it('#hasEmptyIntersection', () => {
  expect(hasEmptyIntersection(a`abcde`, a`efgh`)).to.be.false;
  expect(hasEmptyIntersection(a`efgh`, a`abcde`)).to.be.false;
  expect(hasEmptyIntersection(a`bcde`, a`aefgh`)).to.be.false;
  expect(hasEmptyIntersection(a`abcde`, a`fgh`)).to.be.true;
  expect(hasEmptyIntersection(a``, a``)).to.be.true;
  expect(hasEmptyIntersection(a`abc`, a``)).to.be.true;
  expect(hasEmptyIntersection(a``, a`abc`)).to.be.true;
  expect(hasEmptyIntersection(a``, a`abc`)).to.be.true;
});

it('#mergeCompactSets', () => {
  expect(mergeCompactSets([a``, a``])).to.eql(a``);
  expect(mergeCompactSets([a``, a`cde`])).to.eql(a`cde`);
  expect(mergeCompactSets([a`abc`, a``])).to.eql(a`abc`);
  expect(mergeCompactSets([a`abc`, a`cde`])).to.eql(a`abcde`);
  expect(mergeCompactSets([a`abc`, a`def`])).to.eql(a`abcdef`);
  expect(mergeCompactSets([a`cba`, a`cde`])).to.eql(a`abcde`);
  expect(mergeCompactSets([a`c`, a`b`, a`a`, a`cde`])).to.eql(a`abcde`);
});
