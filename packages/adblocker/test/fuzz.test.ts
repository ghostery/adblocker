/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { expect } from 'chai';
import 'mocha';
import fc, { StringConstraints } from 'fast-check';
import { NetworkFilter } from '../src/index.js';
import FilterEngine from '../src/engine/engine.js';
import { StaticDataView } from '../src/data-view.js';

// Higher `numRuns` value can take a lot of time depending on the runner performance.
// Tests defined here are set with the timeout of zero to avoid mocha timeout error.
function getNumRuns() {
  const env = process.env['FUZZ_RUNS'];
  if (!env) {
    return 100;
  }
  const runs = parseInt(env.replace(/_/g, ''), 10);
  if (isNaN(runs)) {
    console.warn(`Invalid "FUZZ_RUNS" env was set: FUZZ_RUNS=${env}`);
    return 100;
  }
  if (runs === -1) {
    return Number.POSITIVE_INFINITY;
  }
  return runs;
}

fc.configureGlobal({ numRuns: getNumRuns() });

describe('#StaticDataView', () => {
  [false, true].map(function (enableCompression) {
    context(`compression=${enableCompression}`, () => {
      (
        [
          {
            unit: 'grapheme-ascii',
            len: 1_000_000,
            byteLen: 1_001_000,
          },
          {
            unit: 'binary-ascii',
            len: 1_000_000,
            byteLen: 1_001_000,
          },
          {
            unit: 'binary',
            len: 1_000_000,
            byteLen: 4_001_000,
          },
        ] satisfies Array<{
          // https://fast-check.dev/docs/core-blocks/arbitraries/primitives/string/
          unit: StringConstraints['unit'];
          // The length of string to be generated.
          len: number;
          // The bytes length required to be represented on the buffer.
          // For example, in case of UTF8 strings,it requires maximum of 4 bytes per character.
          byteLen: number;
        }>
      ).map(({ unit, len, byteLen }) => {
        // Test involving smaz compression
        it(`#pushRawNetwork unit=${unit}`, () => {
          const view = StaticDataView.allocate(byteLen, { enableCompression });
          fc.assert(
            fc.property(fc.string({ unit, maxLength: len }), (str) => {
              view.seekZero();
              view.pushRawNetwork(str);
              view.seekZero();
              expect(view.getRawNetwork()).to.be.eql(str);
            }),
          );
        }).timeout(0);

        // Test only with UTF8 serialization
        it(`#pushUTF8 unit=${unit}`, () => {
          const view = StaticDataView.allocate(byteLen, { enableCompression });
          fc.assert(
            fc.property(fc.string({ unit, maxLength: len }), (str) => {
              view.seekZero();
              view.pushUTF8(str);
              view.seekZero();
              expect(view.getUTF8()).to.be.eql(str);
            }),
          );
        }).timeout(0);
      });
    });
  });
});

describe('#FilterEngine', () => {
  it('stacks #NetworkFilter', () => {
    fc.assert(
      fc.property(
        fc.array(fc.string({ unit: 'binary' }), { minLength: 2 }),
        fc.integer({ min: 0, max: 1 << 30 }),
        (arr, num) => {
          const filters = arr.map(
            (str) =>
              new NetworkFilter({
                filter: undefined,
                hostname: undefined,
                mask: num,
                domains: undefined,
                denyallow: undefined,
                // The below two are saved using UTF-8
                optionValue: undefined,
                rawLine: `$replace=/.+/${str}/`,
                regex: undefined,
              }),
          );
          const engine = FilterEngine.empty({
            loadNetworkFilters: true,
            enableHtmlFiltering: true,
          });
          engine.update({
            newNetworkFilters: filters,
          });
          expect(engine).to.be.deep.equal(FilterEngine.deserialize(engine.serialize()));
        },
      ),
    );
  }).timeout(0);
});
