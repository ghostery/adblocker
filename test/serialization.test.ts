import {} from 'jest';

import { customDeepEqual, loadAllLists, loadResources } from './utils';

import DynamicDataView from '../src/dynamic-data-view';
import Engine from '../src/filters-engine';
import { parseList } from '../src/parsing/list';
import { NetworkFilter } from '../src/parsing/network-filter';
import ReverseIndex from '../src/reverse-index';
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
  describe('filters', () => {
    const { networkFilters, cosmeticFilters } = parseList(loadAllLists());

    it('cosmetic', () => {
      cosmeticFilters.forEach((filter) => {
        const buffer = new DynamicDataView(100);
        serializeCosmeticFilter(filter, buffer);
        buffer.seek(0);
        expect(deserializeCosmeticFilter(buffer)).toEqual(filter);
      });
    });

    it('network', () => {
      networkFilters.forEach((filter) => {
        const buffer = new DynamicDataView(100);
        serializeNetworkFilter(filter, buffer);
        buffer.seek(0);
        expect(deserializeNetworkFilter(buffer)).toEqual(filter);
      });
    });
  });

  it('ReverseIndex', () => {
    const { networkFilters } = parseList(
      loadAllLists(),
      { loadCosmeticFilters: false },
    );

    const filters = new Map();
    networkFilters.forEach((filter) => {
      if (!filters.has(filter.id)) {
        filters.set(filter.id, filter);
      }
    });

    // Initialize index
    const reverseIndex = new ReverseIndex<NetworkFilter>(
      [...filters.values()],
      f => f.getTokens());

    // Serialize index
    const buffer = new DynamicDataView(4000000);
    serializeReverseIndex(reverseIndex, buffer);
    buffer.seek(0);

    const deserialized: any = {};
    deserializeReverseIndex(buffer, deserialized, filters);

    expect(deserialized).toEqual({
      index: reverseIndex.index,
      size: reverseIndex.size,
    });
  });

  it('Engine', () => {
    const resources = loadResources();
    const filters = loadAllLists();

    const engine = new Engine({
      loadCosmeticFilters: true,
      loadNetworkFilters: true,
      optimizeAOT: false,
      version: 42,
    });

    engine.onUpdateFilters(
      [{ filters, asset: 'list1', checksum: 'checksum' }],
      new Set(),
      false, // onDiskCache
      false, // debug
    );

    engine.onUpdateResource([
      { checksum: 'resources1', filters: resources },
    ]);
    expect(customDeepEqual(deserializeEngine(serializeEngine(engine), 42), engine)).toBeTruthy();
  });
});
