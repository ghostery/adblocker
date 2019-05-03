import StaticDataView from '../src/data-view';
import FiltersContainer from '../src/engine/bucket/filters';
import CosmeticFilter from '../src/filters/cosmetic';
import IFilter from '../src/filters/interface';
import NetworkFilter from '../src/filters/network';
import { parseFilters } from '../src/lists';
import { loadAllLists } from './utils';

describe('#FiltersContainer', () => {
  describe('#update', () => {
    let container: FiltersContainer<NetworkFilter>;
    const filters = [
      NetworkFilter.parse('||foo.com', true) as NetworkFilter,
      NetworkFilter.parse('||bar.com', true) as NetworkFilter,
      NetworkFilter.parse('||baz.com', true) as NetworkFilter,
    ];

    beforeEach(() => {
      container = new FiltersContainer({
        deserialize: NetworkFilter.deserialize,
      });
    });

    it('with no filters', () => {
      expect(container.getFilters()).toHaveLength(0);
      container.update([]);
      expect(container.getFilters()).toHaveLength(0);
    });

    it('with one filter', () => {
      expect(container.getFilters()).toHaveLength(0);
      container.update([filters[0]]);
      expect(container.getFilters().map((f: NetworkFilter) => f.rawLine)).toEqual([
        filters[0].rawLine,
      ]);
    });

    it('with one filter', () => {
      container.update([filters[0]]);
      container.update([]);
      expect(container.getFilters().map((f: NetworkFilter) => f.rawLine)).toEqual([
        filters[0].rawLine,
      ]);
    });

    it('deletes one filter', () => {
      container.update([filters[0]]);
      container.update([], new Set([filters[0].getId()]));
      expect(container.getFilters()).toHaveLength(0);
    });

    it('deletes and adds one filter', () => {
      container.update([filters[0]]);
      container.update([filters[1]], new Set([filters[0].getId()]));
      expect(container.getFilters().map((f: NetworkFilter) => f.rawLine)).toEqual([
        filters[1].rawLine,
      ]);
    });

    it('multiple updates', () => {
      container.update([filters[0]]);
      container.update([filters[1], filters[2]], new Set([filters[0].getId()]));
      expect(container.getFilters().map((f: NetworkFilter) => f.rawLine)).toEqual([
        filters[1].rawLine,
        filters[2].rawLine,
      ]);
      container.update([], new Set([filters[2].getId(), filters[1].getId()]));
      expect(container.getFilters()).toHaveLength(0);
    });
  });

  describe('#getFilters', () => {
    const { cosmeticFilters, networkFilters } = parseFilters(loadAllLists(), { debug: true });

    function testGetFiltersImlp<T extends IFilter>(
      filters: T[],
      deserialize: (buffer: StaticDataView) => T,
    ): void {
      const container = new FiltersContainer({
        deserialize,
        filters,
      });

      expect(new Set(container.getFilters().map((f) => f.toString()))).toEqual(
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
});
