/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { expect } from 'chai';
import 'mocha';

import { TokensBuffer } from '../src/tokens-buffer.js';
import { parseFilters } from '../src/lists.js';
import {
  HASH_SEED,
  binLookup,
  binSearch,
  clearBit,
  fastHash,
  fastHashBetween,
  findLastIndexOfUnescapedCharacter,
  hasUnicode,
  setBit,
  tokenize,
  tokenizeInPlace,
  tokenizeNoSkip,
  tokenizeNoSkipInPlace,
  tokenizeWithWildcards,
  tokenizeWithWildcardsInPlace,
} from '../src/utils.js';
import requests from './data/requests.js';
import { allLists } from './utils.js';
import NetworkFilter, { normalizeRawFilterOptions } from '../src/filters/network.js';
import CosmeticFilter from '../src/filters/cosmetic.js';

function t(tokens: string[]): Uint32Array {
  return new Uint32Array(tokens.map(fastHash));
}

function checkCollisions(filters: (CosmeticFilter | NetworkFilter)[]): void {
  const hashes: Map<number, string> = new Map();
  for (const filter of filters) {
    const id = filter.getId();
    const found = hashes.get(id);
    const raw = normalizeRawFilterOptions(filter.toString());
    if (found !== undefined && raw !== found) {
      throw new Error(`expected ${raw} to not collide, found ${found}`);
    }
    hashes.set(id, raw);
  }
}

describe('utils.ts', () => {
  describe('#normalizeRawFilterOptions', () => {
    it('handles empty string', () => {
      expect(normalizeRawFilterOptions('')).to.equal('');
    });

    it('handle empty selector', () => {
      expect(normalizeRawFilterOptions('$css')).to.equal('$css');
      expect(normalizeRawFilterOptions('$stylesheet')).to.equal('$css');
    });

    it('does nothing on normalized', () => {
      for (const filter of ['/ads/', '/ads/$css', '/ads/$css,font']) {
        expect(normalizeRawFilterOptions(filter), filter).to.equal(filter);
      }
    });

    it('normalizes trailing wildcard', () => {
      expect(normalizeRawFilterOptions('*$css')).to.equal('$css');
    });

    it('ignores options from selector', () => {
      expect(normalizeRawFilterOptions('/ads/$first-party/still/selector$css')).to.equal(
        '/ads/$first-party/still/selector$css',
      );
    });

    it('returns lower-cased filter', () => {
      expect(normalizeRawFilterOptions('/Ads/')).to.equal('/ads/');
      expect(normalizeRawFilterOptions('/Ads/$CSS')).to.equal('/ads/$css');
    });

    it('removes $all option', () => {
      expect(normalizeRawFilterOptions('/ads/$all')).to.equal('/ads/');
    });
  });

  describe('#fastHash', () => {
    it('does not produce collision on network filters', () => {
      checkCollisions(
        parseFilters(allLists, {
          loadCosmeticFilters: false,
          debug: true,
        }).networkFilters,
      );
    });

    it('does not produce collision on cosmetic filters', () => {
      checkCollisions(
        parseFilters(allLists, {
          loadNetworkFilters: false,
          debug: true,
        }).cosmeticFilters,
      );
    });

    it('does not produce collision on requests dataset', () => {
      const networkFiltersFromRequests: NetworkFilter[] = [];
      for (const { filters } of requests) {
        for (const filter of filters) {
          const parsed = NetworkFilter.parse(filter);
          if (parsed === null) {
            throw new Error(`Could not parse ${filter}`);
          }
          networkFiltersFromRequests.push(parsed);
        }
      }
      checkCollisions(networkFiltersFromRequests);
    });

    it('returns HASH_SEED for empty string and non-strings', () => {
      expect(fastHash('')).to.equal(HASH_SEED);
      expect(fastHashBetween('', 0, 0)).to.equal(HASH_SEED);

      expect(fastHash([] as any)).to.equal(HASH_SEED);
    });
  });

  it('detects remaining space in buffer', () => {
    const buffer = new TokensBuffer(1);

    buffer.reset();
    tokenizeInPlace('/foo/baz/baz', false, false, buffer);
    expect(buffer.pos).to.equal(1);

    buffer.reset();
    tokenizeNoSkipInPlace('/foo/baz/baz', buffer);
    expect(buffer.pos).to.equal(1);

    buffer.reset();
    tokenizeWithWildcardsInPlace('/foo/baz/baz', false, false, buffer);
    expect(buffer.pos).to.equal(1);
  });

  it('#tokenizeWithWildcards', () => {
    expect(tokenizeWithWildcards('', false, false)).to.eql(t([]));
    expect(tokenizeWithWildcards('', true, false)).to.eql(t([]));
    expect(tokenizeWithWildcards('', false, true)).to.eql(t([]));
    expect(tokenizeWithWildcards('', true, true)).to.eql(t([]));

    expect(tokenizeWithWildcards('foo.barƬ*', false, false)).to.eql(t(['foo']));
    expect(tokenizeWithWildcards('foo.barƬ*', false, true)).to.eql(t(['foo']));
    expect(tokenizeWithWildcards('foo.barƬ*', true, false)).to.eql(t([]));
    expect(tokenizeWithWildcards('foo.barƬ*', true, true)).to.eql(t([]));

    expect(tokenizeWithWildcards('*foo.barƬ', false, false)).to.eql(t(['barƬ']));
    expect(tokenizeWithWildcards('*foo.barƬ*', false, false)).to.eql(t([]));
    expect(tokenizeWithWildcards('*foo*barƬ*', false, false)).to.eql(t([]));
    expect(tokenizeWithWildcards('foo*barƬ*', false, false)).to.eql(t([]));
    expect(tokenizeWithWildcards('foo*barƬ', false, false)).to.eql(t([]));
    expect(tokenizeWithWildcards('foo**barƬ', false, false)).to.eql(t([]));

    expect(tokenizeWithWildcards('foo/bar baz', false, false)).to.eql(t(['foo', 'bar', 'baz']));
    expect(tokenizeWithWildcards('foo/bar baz', true, false)).to.eql(t(['bar', 'baz']));
    expect(tokenizeWithWildcards('foo/bar baz', true, true)).to.eql(t(['bar']));
    expect(tokenizeWithWildcards('foo/bar baz', false, true)).to.eql(t(['foo', 'bar']));
    expect(tokenizeWithWildcards('foo////bar  baz', false, true)).to.eql(t(['foo', 'bar']));
  });

  it('#tokenize', () => {
    expect(tokenize('', false, false)).to.eql(t([]));
    expect(tokenize('foo', false, false)).to.eql(t(['foo']));
    expect(tokenize('foo/bar', false, false)).to.eql(t(['foo', 'bar']));
    expect(tokenize('foo-bar', false, false)).to.eql(t(['foo', 'bar']));
    expect(tokenize('foo.bar', false, false)).to.eql(t(['foo', 'bar']));
    expect(tokenize('foo.barƬ', false, false)).to.eql(t(['foo', 'barƬ']));
    expect(tokenize('*foo.barƬ', false, false)).to.eql(t(['foo', 'barƬ']));
    expect(tokenize('*foo*.barƬ', false, false)).to.eql(t(['foo', 'barƬ']));
    expect(tokenize('*foo*.barƬ', true, false)).to.eql(t(['foo', 'barƬ']));
    expect(tokenize('foo*.barƬ', false, false)).to.eql(t(['foo', 'barƬ']));
    expect(tokenize('foo.*barƬ', false, false)).to.eql(t(['foo', 'barƬ']));
    expect(tokenize('foo.barƬ*', false, false)).to.eql(t(['foo', 'barƬ']));
  });

  it('#tokenizeNoSkip', () => {
    expect(tokenizeNoSkip('')).to.eql(t([]));
    expect(tokenizeNoSkip('foo')).to.eql(t(['foo']));
    expect(tokenizeNoSkip('foo/bar')).to.eql(t(['foo', 'bar']));
    expect(tokenizeNoSkip('foo-bar')).to.eql(t(['foo', 'bar']));
    expect(tokenizeNoSkip('foo.bar')).to.eql(t(['foo', 'bar']));
    expect(tokenizeNoSkip('foo.barƬ')).to.eql(t(['foo', 'barƬ']));
    expect(tokenizeNoSkip('*foo.barƬ')).to.eql(t(['foo', 'barƬ']));
    expect(tokenizeNoSkip('*foo*.barƬ')).to.eql(t(['foo', 'barƬ']));
    expect(tokenizeNoSkip('*foo*.barƬ')).to.eql(t(['foo', 'barƬ']));
    expect(tokenizeNoSkip('foo*.barƬ')).to.eql(t(['foo', 'barƬ']));
    expect(tokenizeNoSkip('foo.*barƬ')).to.eql(t(['foo', 'barƬ']));
    expect(tokenizeNoSkip('foo.barƬ*')).to.eql(t(['foo', 'barƬ']));
  });

  it('#hasUnicode', () => {
    for (let i = 0; i < 127; i += 1) {
      expect(hasUnicode(`foo${String.fromCharCode(i)}`)).to.be.false;
    }

    expect(hasUnicode('｡◕ ∀ ◕｡)')).to.be.true;
    expect(hasUnicode('｀ｨ(´∀｀∩')).to.be.true;
    expect(hasUnicode('__ﾛ(,_,*)')).to.be.true;
    expect(hasUnicode('・(￣∀￣)・:*:')).to.be.true;
    expect(hasUnicode('ﾟ･✿ヾ╲(｡◕‿◕｡)╱✿･ﾟ')).to.be.true;
    expect(hasUnicode(',。・:*:・゜’( ☻ ω ☻ )。・:*:・゜’')).to.be.true;
    expect(hasUnicode('(╯°□°）╯︵ ┻━┻)')).to.be.true;
    expect(hasUnicode('(ﾉಥ益ಥ）ﾉ ┻━┻')).to.be.true;
    expect(hasUnicode('┬─┬ノ( º _ ºノ)')).to.be.true;
    expect(hasUnicode('( ͡° ͜ʖ ͡°)')).to.be.true;
    expect(hasUnicode('¯_(ツ)_/¯')).to.be.true;
  });

  it('#binLookup', () => {
    expect(binLookup(new Uint32Array(0), 42)).to.be.false;
    expect(binLookup(new Uint32Array([]), 42)).to.be.false;
    expect(binLookup(new Uint32Array([42]), 42)).to.be.true;
    expect(binLookup(new Uint32Array([1, 2, 3, 4, 42]), 42)).to.be.true;
    expect(binLookup(new Uint32Array([1, 2, 3, 4, 42]), 1)).to.be.true;
    expect(binLookup(new Uint32Array([1, 2, 3, 4, 42]), 3)).to.be.true;
    expect(binLookup(new Uint32Array([1, 2, 3, 4, 42]), 43)).to.be.false;
    expect(binLookup(new Uint32Array([1, 2, 3, 4, 42]), 0)).to.be.false;
    expect(binLookup(new Uint32Array([1, 2, 3, 4, 42]), 5)).to.be.false;
  });

  describe('#binSearch', () => {
    it('returns -1 on empty array', () => {
      expect(binSearch(new Uint32Array(0), 42)).to.equal(-1);
    });

    it('handles array of one element', () => {
      expect(binSearch(new Uint32Array([1]), 42)).to.equal(-1);
      expect(binSearch(new Uint32Array([42]), 42)).to.equal(0);
    });

    it('handles array of two elements', () => {
      expect(binSearch(new Uint32Array([0, 1]), 42)).to.equal(-1);
      expect(binSearch(new Uint32Array([1, 42]), 42)).to.equal(1);
      expect(binSearch(new Uint32Array([42, 1]), 42)).to.equal(0);
      expect(binSearch(new Uint32Array([42, 42]), 42)).not.to.equal(-1);
    });

    it('handles no match', () => {
      expect(binSearch(new Uint32Array(10000), 42)).to.equal(-1);
    });

    it('handles match on first element', () => {
      const array = new Uint32Array(10000);
      for (let i = 1; i < array.length; i += 1) {
        array[i] = 1;
      }
      expect(binSearch(array, 0)).to.equal(0);
    });

    it('handles match on last element', () => {
      const array = new Uint32Array(10000);
      array[array.length - 1] = 42;
      expect(binSearch(array, 42)).to.equal(array.length - 1);
    });
  });

  it('#findLastIndexOfUnescapedCharacter', () => {
    const line = String.raw`||www.youtube.com/playlist?list=$xhr,1p,replace=/("trackingParam":"kx_fmPxhoPZR)[-_0-9A-Za-z]{150}[-_0-9A-Za-z]+?([-_0-9A-Za-z]{55}lLKPQ-SS"\})/\$1\$2/`;
    expect(findLastIndexOfUnescapedCharacter(line, '$')).to.be.eql(32);
  });

  context('bit operations', () => {
    // The reason not to unsigned right shift with zero here is because it doens't affect to the AND operations.
    // A number after any bit operations is signed in JavaScript.
    // If all of the bit fields are settled correctly, we see all numbers in signed state and having a signed number as a mask is fine.
    const lastBit = 1 << 31; // -2147483648

    describe('#setBit', () => {
      it('keeps the integer always unsigned', () => {
        const n = setBit(0, lastBit);
        // The result should be positive 2147483648 (1 << 31) after the OR operation.
        expect(n).to.be.eql(2147483648);
        // The binary representation of the number should have a length of 32 with the first byte set.
        expect(n.toString(2)).to.be.eql('10000000000000000000000000000000');
      });
    });

    describe('#clearBit', () => {
      it('keeps the integer always unsigned', () => {
        const n = clearBit(lastBit, 0);
        expect(n).to.be.eql(2147483648);
        expect(n.toString(2)).to.be.eql('10000000000000000000000000000000');
      });
    });
  });
});
