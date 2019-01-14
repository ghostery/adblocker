import { loadAllLists, loadResources } from './utils';

import StaticDataView from '../src/data-view';
import Engine from '../src/engine/engine';
import ReverseIndex from '../src/engine/reverse-index';
import CosmeticFilter from '../src/filters/cosmetic';
import IFilter from '../src/filters/interface';
import NetworkFilter from '../src/filters/network';
import { List } from '../src/lists';

describe('Serialization', () => {
  const list = List.parse({
    data: loadAllLists(),
  });
  const cosmeticFilters = list.getCosmeticFilters();
  const networkFilters = list.getNetworkFilters();

  describe('filters', () => {
    const buffer = new StaticDataView(1000000);
    it('cosmetic', () => {
      cosmeticFilters.forEach((filter) => {
        buffer.seekZero();
        filter.serialize(buffer);
        buffer.seekZero();
        expect(CosmeticFilter.deserialize(buffer)).toEqual(filter);
      });
    });

    it('network', () => {
      networkFilters.forEach((filter) => {
        buffer.seekZero();
        filter.serialize(buffer);
        buffer.seekZero();
        expect(NetworkFilter.deserialize(buffer)).toEqual(filter);
      });
    });
  });

  describe('ReverseIndex', () => {
    function testReverseIndex(filters: IFilter[]): void {
      // Initialize index
      const reverseIndex = new ReverseIndex((cb) => {
        filters.forEach(cb);
      });

      // Serialize index
      const buffer = new StaticDataView(4000000);
      reverseIndex.serialize(buffer);

      // Deserialize
      buffer.seekZero();
      expect(ReverseIndex.deserialize(buffer)).toEqual(reverseIndex);
    }

    it('network', () => {
      testReverseIndex(networkFilters);
    });

    it('cosmetic', () => {
      testReverseIndex(cosmeticFilters);
    });
  });

  it('Engine', () => {
    const engine = new Engine({
      debug: false,
      enableOptimizations: true,
      loadCosmeticFilters: true,
      loadNetworkFilters: true,
    });

    engine.onUpdateFilters([{ filters: loadAllLists(), asset: 'list1', checksum: 'checksum' }]);
    engine.onUpdateResource(loadResources(), 'resources1');

    const serialized = engine.serialize();

    const version = serialized[0];
    serialized[0] = 1; // override version
    expect(() => {
      Engine.deserialize(serialized);
    }).toThrow('serialized engine version mismatch');
    serialized[0] = version;

    expect(Engine.deserialize(serialized)).toEqual(engine);
  });
});
