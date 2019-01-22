import StaticDataView from '../src/data-view';
import ReverseIndex from '../src/engine/reverse-index';
import CosmeticFilter from '../src/filters/cosmetic';
import IFilter from '../src/filters/interface';
import NetworkFilter from '../src/filters/network';
import { parseFilters } from '../src/lists';
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

  describe('#update', () => {
    it('updates', () => {});
  });

  describe('#iterMatchingFilters', () => {});

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
