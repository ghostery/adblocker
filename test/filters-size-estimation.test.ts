import StaticDataView from '../src/data-view';
import CosmeticFilter from '../src/filters/cosmetic';
import IFilter from '../src/filters/interface';
import NetworkFilter from '../src/filters/network';
import { parseFilters } from '../src/lists';
import { loadAllLists } from './utils';

describe('Make sure size estimate is accurate', () => {
  const { cosmeticFilters, networkFilters } = parseFilters(loadAllLists(), { debug: true });
  const buffer = new StaticDataView(1000000);

  function testSizeEstimate<T extends IFilter>(filters: T[]): void {
    for (let i = 0; i < filters.length; i += 1) {
      const filter = filters[i];
      const estimate = filter.getEstimatedSerializedSize();

      // Serialize filter
      buffer.seekZero();
      filter.serialize(buffer);
      const realSize = buffer.pos;

      if (realSize > estimate) {
        throw new Error(`${filter.toString()} got ${estimate} expected ${realSize}`);
      } else {
        expect(realSize).toBeLessThanOrEqual(estimate);
      }
    }
  }

  it('network', () => {
    testSizeEstimate<NetworkFilter>(networkFilters);
  });

  it('cosmetic', () => {
    testSizeEstimate<CosmeticFilter>(cosmeticFilters);
  });
});
