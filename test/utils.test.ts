import { List } from '../src/lists';
import { fastHash, tokenize } from '../src/utils';
import requests from './data/requests';
import { loadAllLists } from './utils';

function t(tokens: string[]): Uint32Array {
  return new Uint32Array(tokens.map(fastHash));
}

expect.extend({
  toNotCollideWithOtherFilter(filter: { getId: () => number }, map) {
    const found = map.get(filter.getId());
    if (found !== undefined && found !== filter.toString()) {
      return {
        message: () =>
          `expected ${filter.toString()} to not collide, found ${found} (${filter.getId()})`,
        pass: false,
      };
    }

    return {
      message: () => 'Ok',
      pass: true,
    };
  },
});

function checkCollisions(filters: any[]) {
  const hashes = new Map();
  for (let i = 0; i < filters.length; i += 1) {
    const filter = filters[i];
    // @ts-ignore
    expect(filter).toNotCollideWithOtherFilter(hashes);
    hashes.set(filter.getId(), filters[i].toString());
  }
}

describe('Utils', () => {
  describe('fastHash', () => {
    it('does not produce collision on network filters', () => {
      checkCollisions(
        List.parse({
          data: loadAllLists(),
        }).getNetworkFilters(),
      );
    });

    it('does not produce collision on requests dataset', () => {
      // Collect all raw filters
      checkCollisions(
        List.parse({
          data: requests.map(({ filters }) => filters.join('\n')).join('\n'),
        }).getNetworkFilters(),
      );
    });

    it('does not produce collision on cosmetic filters', () => {
      checkCollisions(
        List.parse({
          data: loadAllLists(),
        }).getCosmeticFilters(),
      );
    });
  });

  it('#tokenize', () => {
    expect(tokenize('')).toEqual(t([]));
    expect(tokenize('foo')).toEqual(t(['foo']));
    expect(tokenize('foo/bar')).toEqual(t(['foo', 'bar']));
    expect(tokenize('foo-bar')).toEqual(t(['foo', 'bar']));
    expect(tokenize('foo.bar')).toEqual(t(['foo', 'bar']));
  });
});
