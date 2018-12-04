import { loadAllLists, loadResources } from './utils';

import StaticDataView from '../src/data-view';
import Engine from '../src/engine/engine';
import ReverseIndex from '../src/engine/reverse-index';
import { parseList } from '../src/parsing/list';
import { NetworkFilter } from '../src/parsing/network-filter';
import {
  deserializeCosmeticFilter,
  deserializeEngine,
  deserializeNetworkFilter,
  deserializeReverseIndex,
  serializeCosmeticFilter,
  serializeEngine,
  serializeNetworkFilter,
  serializeReverseIndex,
} from '../src/serialization';

describe('Serialization', () => {
  const { networkFilters, cosmeticFilters } = parseList(loadAllLists());

  describe('filters', () => {
    const buffer = new StaticDataView(1000000);
    it('cosmetic', () => {
      cosmeticFilters.forEach((filter) => {
        buffer.seekZero();
        serializeCosmeticFilter(filter, buffer);
        buffer.seekZero();
        expect(deserializeCosmeticFilter(buffer)).toEqual(filter);
      });
    });

    it('network', () => {
      networkFilters.forEach((filter) => {
        buffer.seekZero();
        serializeNetworkFilter(filter, buffer);
        buffer.seekZero();
        expect(deserializeNetworkFilter(buffer)).toEqual(filter);
      });
    });
  });

  it('ReverseIndex', () => {
    const filters = new Map();
    networkFilters.forEach((filter) => {
      filters.set(filter.getId(), filter);
    });

    // Initialize index
    const reverseIndex = new ReverseIndex<NetworkFilter>((cb) => {
      networkFilters.forEach(cb);
    });

    // Serialize index
    const buffer = new StaticDataView(4000000);
    serializeReverseIndex(reverseIndex, buffer);
    buffer.seekZero();

    const deserialized = new ReverseIndex<NetworkFilter>();
    deserializeReverseIndex(buffer, deserialized, filters);
    expect(deserialized).toEqual(reverseIndex);
  });

  it('Engine', () => {
    const engine = new Engine({
      enableOptimizations: true,
      loadCosmeticFilters: true,
      loadNetworkFilters: true,
      optimizeAOT: false,
    });

    engine.onUpdateFilters([{ filters: loadAllLists(), asset: 'list1', checksum: 'checksum' }]);
    engine.onUpdateResource([{ checksum: 'resources1', filters: loadResources() }]);

    const serialized = serializeEngine(engine);

    const version = serialized[0];
    serialized[0] = 1; // override version
    expect(() => {
      deserializeEngine(serialized);
    }).toThrow('serialized engine version mismatch');
    serialized[0] = version;

    expect(deserializeEngine(serialized)).toEqual(engine);
  });
});
