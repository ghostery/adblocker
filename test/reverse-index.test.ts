import StaticDataView from '../src/data-view';
import ReverseIndex from '../src/engine/reverse-index';
import CosmeticFilter from '../src/filters/cosmetic';
import IFilter from '../src/filters/interface';
import NetworkFilter from '../src/filters/network';
import { parseFilters } from '../src/lists';
import { fastHash, tokenize } from '../src/utils';
import { loadAllLists } from './utils';

describe('ReverseIndex', () => {
  const { cosmeticFilters, networkFilters } = parseFilters(loadAllLists());

  describe('#getFilters', () => {
    function testGetFiltersImlp<T extends IFilter>(
      filters: T[],
      deserialize: (buffer: StaticDataView) => T,
    ): void {
      const reverseIndex = new ReverseIndex({
        deserialize,
        filters,
      });

      expect(new Set(reverseIndex.getFilters().map((f) => f.toString()))).toEqual(
        new Set(filters.map((f) => f.toString())),
      );
    }

    it('network', () => {
      testGetFiltersImlp<NetworkFilter>(networkFilters, NetworkFilter.deserialize);
    });

    it('cosmetic', () => {
      testGetFiltersImlp<CosmeticFilter>(cosmeticFilters, CosmeticFilter.deserialize);
    });
  });

  it('#update', () => {
    const reverseIndex = new ReverseIndex({
      deserialize: NetworkFilter.deserialize,
      filters: parseFilters('||foo.com', { loadCosmeticFilters: false, debug: true })
        .networkFilters,
    });

    // Expect our filter to be listed
    let filters = reverseIndex.getFilters();
    expect(filters.map((f) => f.rawLine)).toEqual(['||foo.com']);

    // Add one new filter
    reverseIndex.update(
      parseFilters('||bar.com', { loadCosmeticFilters: false, debug: true }).networkFilters,
    );
    filters = reverseIndex.getFilters();
    expect(filters.map((f) => f.rawLine)).toEqual(['||foo.com', '||bar.com']);

    // Add a third filter and remove the two others
    reverseIndex.update(
      parseFilters('||baz.com', { loadCosmeticFilters: false, debug: true }).networkFilters,
      new Set(filters.map((f) => f.getId())),
    );
    filters = reverseIndex.getFilters();
    expect(filters.map((f) => f.rawLine)).toEqual(['||baz.com']);

    // Update with no filters
    reverseIndex.update([], new Set(reverseIndex.getFilters().map((f) => f.getId())));
    expect(reverseIndex.getFilters()).toEqual([]);
  });

  describe('#iterMatchingFilters', () => {
    const emptyIndex = new ReverseIndex({ deserialize: NetworkFilter.deserialize });
    const filters = `
||foo.com
/ads/tracker.js$image
|woot|$redirect=noop.js
      `;
    const exampleIndex = new ReverseIndex({
      deserialize: NetworkFilter.deserialize,
      filters: parseFilters(filters, { loadCosmeticFilters: false, debug: true }).networkFilters,
    });

    it('works on empty index', () => {
      let matches = 0;
      const cb = (_: NetworkFilter) => {
        matches += 1;
        return true;
      };

      // No tokens
      emptyIndex.iterMatchingFilters(new Uint32Array(0), cb);
      expect(matches).toBe(0);

      // Some tokens
      emptyIndex.iterMatchingFilters(tokenize('foo bar baz'), cb);
      expect(matches).toBe(0);
    });

    it('handle no match', () => {
      for (let i = 0; i < 100; i += 1) {
        let matches = 0;
        const cb = (_: NetworkFilter) => {
          matches += 1;
          return true;
        };

        // No tokens
        exampleIndex.iterMatchingFilters(new Uint32Array([i]), cb);
        expect(matches).toBe(0);
      }
    });

    it('finds matches', () => {
      const matches: Set<string | undefined> = new Set();
      let ret: boolean = true;
      const cb = (f: NetworkFilter) => {
        matches.add(f.rawLine);
        return ret;
      };

      [
        ['foo', ['||foo.com']],
        ['com', []], // filter was indexed using 'foo' and not 'com'
        ['ads', ['/ads/tracker.js$image']],
        ['foo.ads', ['||foo.com', '/ads/tracker.js$image']],
        ['woot', ['|woot|$redirect=noop.js']],
        ['https://bar.foo.com/ads/tracker.js', ['||foo.com', '/ads/tracker.js$image']],
      ].forEach(([input, expected]) => {
        // Get all matches
        matches.clear();
        ret = true; // iterate on all filters
        exampleIndex.iterMatchingFilters(tokenize(input as string), cb);
        expect(matches).toEqual(new Set(expected));

        // Check early termination
        matches.clear();
        ret = false; // early termination on first filter
        exampleIndex.iterMatchingFilters(tokenize(input as string), cb);
        expect(matches.size).toEqual(expected.length === 0 ? 0 : 1);
      });
    });

    it('stores filters without tokens in wildcard bucket', () => {
      const index = new ReverseIndex({
        deserialize: NetworkFilter.deserialize,
        filters: parseFilters(
          `
wildcard
||foo.com
      `,
          { loadCosmeticFilters: false, debug: true },
        ).networkFilters,
      });

      const matches: Set<string | undefined> = new Set();
      const cb = (f: NetworkFilter) => {
        matches.add(f.rawLine);
        return true;
      };

      // Wildcard filter is always returned
      [
        ['foo', ['||foo.com', 'wildcard']],
        ['com', ['wildcard']], // filter was indexed using 'foo' and not 'com'
      ].forEach(([input, expected]) => {
        // Get all matches
        matches.clear();
        index.iterMatchingFilters(tokenize(input as string), cb);
        expect(matches).toEqual(new Set(expected));
      });
    });
  });

  describe('#getTokens', () => {
    it('no token if empty', () => {
      expect(
        new ReverseIndex({
          deserialize: NetworkFilter.deserialize,
        }).getTokens(),
      ).toEqual(new Uint32Array(0));
    });

    it('returns all indexing tokens', () => {
      expect(
        new ReverseIndex({
          deserialize: NetworkFilter.deserialize,
          filters: parseFilters(`
/ads/
/foo/
-bar-
          `).networkFilters,
        })
          .getTokens()
          .sort(),
      ).toEqual(new Uint32Array([fastHash('ads'), fastHash('foo'), fastHash('bar')]).sort());
    });
  });

  describe('#serialize', () => {
    function testSerializeIndexImpl<T extends IFilter>(
      filters: T[],
      deserialize: (buffer: StaticDataView) => T,
    ): void {
      const reverseIndex = new ReverseIndex({
        deserialize,
        filters,
      });

      // Serialize index
      const buffer = new StaticDataView(4000000);
      reverseIndex.serialize(buffer);

      // Deserialize
      buffer.seekZero();
      expect(ReverseIndex.deserialize(buffer, deserialize)).toEqual(reverseIndex);
    }

    it('network', () => {
      testSerializeIndexImpl(networkFilters, NetworkFilter.deserialize);
    });

    it('cosmetic', () => {
      testSerializeIndexImpl(cosmeticFilters, CosmeticFilter.deserialize);
    });
  });
});
