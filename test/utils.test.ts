import {} from 'jest';

import { parseList } from '../src/parsing/list';
import { fastHash, tokenize, tokenizeCSS } from '../src/utils';
import { loadAllLists } from './utils';

function t(tokens) {
  return tokens.map(fastHash);
}

expect.extend({
  toNotCollideWithOtherFilter(filter: { id: number }, map) {
    const found = map.get(filter.id);
    if (found !== undefined && found !== filter.toString()) {
      return {
        message: () =>
          `expected ${filter.toString()} to not collide, found ${found} (${filter.id})`,
        pass: false,
      };
    }

    return {
      message: () => 'Ok',
      pass: true,
    };
  },
});

function checkCollisions(filters) {
  const hashes = new Map();
  for (let i = 0; i < filters.length; i += 1) {
    const filter = filters[i];
    // @ts-ignore
    expect(filter).toNotCollideWithOtherFilter(hashes);
    hashes.set(filter.id, filters[i].toString());
  }
}

describe('Utils', () => {
  describe('fastHash', () => {
    const { networkFilters, cosmeticFilters } = parseList(loadAllLists());

    it('does not produce collision on network filters', () => {
      checkCollisions(networkFilters);
    });

    it('does not produce collision on cosmetic filters', () => {
      checkCollisions(cosmeticFilters);
    });
  });

  it('#tokenize', () => {
    expect(tokenize('')).toEqual(t([]));
    expect(tokenize('foo')).toEqual(t(['foo']));
    expect(tokenize('foo/bar')).toEqual(t(['foo', 'bar']));
    expect(tokenize('foo-bar')).toEqual(t(['foo', 'bar']));
    expect(tokenize('foo.bar')).toEqual(t(['foo', 'bar']));
  });

  it('#tokenizeCSS', () => {
    expect(tokenizeCSS('')).toEqual([]);
    expect(tokenizeCSS('.selector')).toEqual(t(['.selector']));
    expect(tokenizeCSS('.selector-foo')).toEqual(t(['.selector-foo']));
  });
});
