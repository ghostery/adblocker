import { loadAllLists, loadResources } from './utils';

import StaticDataView from '../src/data-view';
import Engine from '../src/engine/engine';
import CosmeticFilter from '../src/filters/cosmetic';
import IFilter from '../src/filters/interface';
import NetworkFilter from '../src/filters/network';
import { parseFilters } from '../src/lists';

describe('Serialization', () => {
  const { cosmeticFilters, networkFilters } = parseFilters(loadAllLists(), { debug: true });

  describe('filters', () => {
    const buffer = new StaticDataView(1000000);
    const checkFilterSerialization = (Filter: any, filter: IFilter) => {
      buffer.seekZero();
      filter.serialize(buffer);
      buffer.seekZero();
      expect(Filter.deserialize(buffer)).toEqual(filter);
    };

    it('cosmetic', () => {
      for (let i = 0; i < cosmeticFilters.length; i += 1) {
        checkFilterSerialization(CosmeticFilter, cosmeticFilters[i]);
      }
    });

    it('network', () => {
      for (let i = 0; i < networkFilters.length; i += 1) {
        checkFilterSerialization(NetworkFilter, networkFilters[i]);
      }
    });

    it('with bug ID', () => {
      checkFilterSerialization(NetworkFilter, NetworkFilter.parse('ads$bug=42') as NetworkFilter);
    });
  });

  describe('Engine', () => {
    const buffer = new Uint8Array(15000000);
    it('fails with wrong version', () => {
      const engine = new Engine();
      const serialized = engine.serialize(buffer);
      const version = serialized[0];
      serialized[0] = 1; // override version
      expect(() => {
        Engine.deserialize(serialized);
      }).toThrow('serialized engine version mismatch');
      serialized[0] = version;
      expect(Engine.deserialize(serialized)).toEqual(engine);
    });

    it('handles full engine', () => {
      const engine = new Engine();
      engine.updateResources(loadResources(), 'resources1');
      engine.update({
        newCosmeticFilters: cosmeticFilters,
        newNetworkFilters: networkFilters,
      });

      // Add one list
      engine.updateList({
        checksum: 'checksum',
        list: `
||foo.com
domain.com##.selector
/ads/$script
###foo
        `,
        name: 'list',
      });

      const serialized = engine.serialize(buffer);
      expect(Engine.deserialize(serialized)).toEqual(engine);
    });
  });
});
