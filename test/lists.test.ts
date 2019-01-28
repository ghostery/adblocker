import { loadAllLists } from './utils';

import StaticDataView from '../src/data-view';
import CosmeticFilter from '../src/filters/cosmetic';
import NetworkFilter from '../src/filters/network';
import Lists, { f, List, parseFilters } from '../src/lists';

const FILTERS = loadAllLists();
const { cosmeticFilters, networkFilters } = parseFilters(FILTERS, { debug: true });

function expectElementsToBeTheSame(elements1: any[], elements2: any[]): void {
  expect(new Set(elements1)).toEqual(new Set(elements2));
}

describe('#List', () => {
  it('#serialize', () => {
    const list = new List({
      debug: true,
      loadCosmeticFilters: true,
      loadNetworkFilters: true,
    });

    list.update(FILTERS, 'checksum');

    const buffer = new StaticDataView(2000000);
    list.serialize(buffer);
    buffer.seekZero();
    expect(List.deserialize(buffer)).toEqual(list);
  });

  it('#getCosmeticFiltersIds', () => {
    const list = new List();
    list.update(FILTERS, 'checksum');
    expectElementsToBeTheSame(
      list.getCosmeticFiltersIds(),
      cosmeticFilters.map((filter) => filter.getId()),
    );
  });

  it('#getNetworkFiltersIds', () => {
    const list = new List();
    list.update(FILTERS, 'checksum');
    expectElementsToBeTheSame(
      list.getNetworkFiltersIds(),
      networkFilters.map((filter) => filter.getId()),
    );
  });

  describe('#update', () => {
    it('returns all filters in initialize update', () => {
      const list = new List({ debug: true });
      const diff = list.update(FILTERS, 'checksum');

      expect(diff.removedNetworkFilters).toHaveLength(0);
      expect(diff.removedCosmeticFilters).toHaveLength(0);

      expectElementsToBeTheSame(
        diff.newNetworkFilters.map((filter) => filter.rawLine),
        networkFilters.map((filter) => filter.rawLine),
      );

      expectElementsToBeTheSame(
        diff.newCosmeticFilters.map((filter) => filter.rawLine),
        cosmeticFilters.map((filter) => filter.rawLine),
      );
    });

    it('returns all filters as removed for empty update', () => {
      // Initial list
      const list = new List({ debug: true });
      list.update(FILTERS, 'checksum');

      const diff = list.update('', 'checksum2');

      // No new filters
      expect(diff.newCosmeticFilters).toHaveLength(0);
      expect(diff.newNetworkFilters).toHaveLength(0);

      // All filters removed
      expectElementsToBeTheSame(
        diff.removedNetworkFilters,
        networkFilters.map((filter) => filter.getId()),
      );

      expectElementsToBeTheSame(
        diff.removedCosmeticFilters,
        cosmeticFilters.map((filter) => filter.getId()),
      );
    });

    it('returns empty diff for same list', () => {
      const list = new List({ debug: true });
      list.update(FILTERS, 'checksum');

      // Same list
      expect(list.update(FILTERS, 'checksum2')).toEqual({
        newCosmeticFilters: [],
        newNetworkFilters: [],
        removedCosmeticFilters: [],
        removedNetworkFilters: [],
      });

      // Same checksum
      expect(list.update('', 'checksum2')).toEqual({
        newCosmeticFilters: [],
        newNetworkFilters: [],
        removedCosmeticFilters: [],
        removedNetworkFilters: [],
      });
    });

    it('return correct diff', () => {
      const list = new List({ debug: true });
      let diff = list.update(
        `
||foo.com
||bar.com
###.selector
      `,
        'checksum1',
      );

      expect(diff.removedNetworkFilters).toHaveLength(0);
      expect(diff.removedCosmeticFilters).toHaveLength(0);

      // One cosmetic filter
      expectElementsToBeTheSame(diff.newCosmeticFilters.map((filter) => filter.rawLine), [
        '###.selector',
      ]);

      // Two network filters
      expectElementsToBeTheSame(diff.newNetworkFilters.map((filter) => filter.rawLine), [
        '||foo.com',
        '||bar.com',
      ]);

      // Update with one new cosmetic filter and one network filter removed
      diff = list.update(
        `
||foo.com
###.selector
###.selector2
      `,
        'checksum2',
      );

      expect(diff.removedCosmeticFilters).toHaveLength(0);
      expect(diff.newNetworkFilters).toHaveLength(0);

      expect(diff.removedNetworkFilters).toEqual([(f`||bar.com` as NetworkFilter).getId()]);
      expectElementsToBeTheSame(diff.newCosmeticFilters.map((filter) => filter.rawLine), [
        '###.selector2',
      ]);

      // Remove all cosmetics and add new network filters
      diff = list.update(
        `
||foo.com
||bar.com
||baz.de
      `,
        'checksum3',
      );

      expect(diff.removedNetworkFilters).toHaveLength(0);
      expectElementsToBeTheSame(diff.removedCosmeticFilters, [
        (f`###.selector` as CosmeticFilter).getId(),
        (f`###.selector2` as CosmeticFilter).getId(),
      ]);

      expect(diff.newCosmeticFilters).toHaveLength(0);
      expectElementsToBeTheSame(diff.newNetworkFilters.map((filter) => filter.rawLine), [
        '||bar.com',
        '||baz.de',
      ]);
    });
  });
});

describe('Lists', () => {
  it('#deserialize', () => {
    const lists = new Lists({ debug: true });
    lists.update([
      { name: 'list1', checksum: 'checksum1', list: '||foo.com' },
      { name: 'list2', checksum: 'checksum2', list: '||bar.com' },
    ]);

    const buffer = new StaticDataView(1000000);
    lists.serialize(buffer);
    buffer.seekZero();
    expect(Lists.deserialize(buffer)).toEqual(lists);
  });

  it('#getLoaded', () => {
    const lists = new Lists();

    // Initialize with two lists
    lists.update([
      { name: 'list1', checksum: 'checksum1', list: '||foo.com' },
      { name: 'list2', checksum: 'checksum2', list: '||bar.com' },
    ]);
    expectElementsToBeTheSame(lists.getLoaded(), ['list1', 'list2']);

    // Add a third list
    lists.update([{ name: 'list3', checksum: 'checksum3', list: '||baz.com' }]);
    expectElementsToBeTheSame(lists.getLoaded(), ['list1', 'list2', 'list3']);
  });

  it('#has', () => {
    const lists = new Lists();

    // Initialize with two lists
    lists.update([
      { name: 'list1', checksum: 'checksum1', list: '||foo.com' },
      { name: 'list2', checksum: 'checksum2', list: '||bar.com' },
    ]);

    expect(lists.has('list1', 'checksum1')).toBeTruthy();
    expect(lists.has('list1', 'checksum')).toBeFalsy();

    expect(lists.has('list2', 'checksum2')).toBeTruthy();
    expect(lists.has('list2', 'checksum')).toBeFalsy();

    expect(lists.has('list3', 'checksum')).toBeFalsy();
  });

  it('#delete', () => {
    const lists = new Lists();

    // Initialize with two lists
    lists.update([
      { name: 'list1', checksum: 'checksum1', list: '||foo.com' },
      { name: 'list2', checksum: 'checksum2', list: '||bar.com' },
      { name: 'list3', checksum: 'checksum3', list: '||baz.com' },
    ]);

    const diff = lists.delete(['list1', 'list3']);

    // Check diff
    expect(diff.newCosmeticFilters).toHaveLength(0);
    expect(diff.newNetworkFilters).toHaveLength(0);
    expect(diff.removedCosmeticFilters).toHaveLength(0);
    expectElementsToBeTheSame(diff.removedNetworkFilters, [
      (f`||foo.com` as NetworkFilter).getId(),
      (f`||baz.com` as NetworkFilter).getId(),
    ]);

    // Check loaded lists
    expect(lists.has('list1', 'checksum1')).toBeFalsy();
    expect(lists.has('list3', 'checksum3')).toBeFalsy();
    expect(lists.has('list2', 'checksum2')).toBeTruthy();
  });

  it('#update', () => {
    const lists = new Lists({ debug: true });
    let diff = lists.update([
      { name: 'list1', checksum: 'checksum1', list: '||foo.com' },
      { name: 'list2', checksum: 'checksum2', list: '##.selector' },
    ]);

    expect(diff.removedNetworkFilters).toHaveLength(0);
    expect(diff.removedCosmeticFilters).toHaveLength(0);

    expectElementsToBeTheSame(diff.newCosmeticFilters.map((filter) => filter.rawLine), [
      '##.selector',
    ]);
    expectElementsToBeTheSame(diff.newNetworkFilters.map((filter) => filter.rawLine), [
      '||foo.com',
    ]);

    // Update with new filters
    diff = lists.update([
      { name: 'list1', checksum: 'checksum1_1', list: '||bar.com' },
      { name: 'list3', checksum: 'checksum3', list: '##.selector2' },
    ]);

    expectElementsToBeTheSame(diff.newNetworkFilters.map((filter) => filter.rawLine), [
      '||bar.com',
    ]);
    expectElementsToBeTheSame(diff.newCosmeticFilters.map((filter) => filter.rawLine), [
      '##.selector2',
    ]);
    expectElementsToBeTheSame(diff.removedNetworkFilters, [
      (f`||foo.com` as NetworkFilter).getId(),
    ]);
    expect(diff.removedCosmeticFilters).toHaveLength(0);
  });
});

describe('#f', () => {
  it('handles CosmeticFilter', () => {
    const filter = f`##.selector`;
    expect(filter).not.toBeNull();
    if (filter !== null) {
      expect(filter.isCosmeticFilter()).toBeTruthy();
    }
  });

  it('handles NetworkFitler', () => {
    const filter = f`||foo.com`;
    expect(filter).not.toBeNull();
    if (filter !== null) {
      expect(filter.isNetworkFilter()).toBeTruthy();
    }
  });

  it('returns null for invalid filter', () => {
    expect(f`#$#~~~`).toBeNull();
  });
});
