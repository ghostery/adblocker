import StaticDataView, { EMPTY_UINT8_ARRAY } from '../../data-view';
import IFilter from '../../filters/interface';

/**
 * Generic filters container (for both CosmeticFilter and NetworkFilter
 * instances). This abstracts away some of the logic to serialize/lazy-load
 * lists of filters (which is useful for things like generic cosmetic filters
 * or $badfilter).
 */
export default class FiltersContainer<T extends IFilter> {
  public static deserialize<T extends IFilter>(
    buffer: StaticDataView,
    deserialize: (view: StaticDataView) => T,
    predicate: (f: T) => boolean,
  ): FiltersContainer<T> {
    const container = new FiltersContainer({
      deserialize,
      filters: [],
      predicate,
    });
    container.filters = buffer.getBytes();
    return container;
  }

  // Data-view compatible typed array containing all the serialized filters.
  public filters: Uint8Array;

  // Predicate allows the `update` function to select a subset of new filters
  // which should be stored in this container, ignoring the rest.
  private readonly predicate: (f: T) => boolean;
  private readonly deserialize: (view: StaticDataView) => T;

  // Optionally keep an in-memory cache of the filter instances after the first call to `getFilters`.
  private cache: T[];

  constructor({
    filters,
    deserialize,
    predicate,
  }: {
    filters: T[];
    deserialize: (view: StaticDataView) => T;
    predicate: (f: T) => boolean;
  }) {
    this.predicate = predicate;
    this.deserialize = deserialize;
    this.cache = [];
    this.filters = EMPTY_UINT8_ARRAY;

    if (filters.length !== 0) {
      this.update(filters);
    }
  }

  /**
   * Update filters based on `newFilters` and `removedFilters`. It makes use of
   * a custom `this.predicate` function to select a sub-set of all the filters.
   * In the end, the method returns the list of remaining filters which were not
   * selected by `this.predicate`.
   */
  public update(newFilters: T[], removedFilters?: Set<number>): T[] {
    // Estimate size of the buffer we will need to store filters. This avoids
    // having to allocate a big chunk of memory up-front if it's not needed.
    // We start with the current size of `this.filters` then update it with
    // removed/added filters.
    let bufferSizeEstimation: number = this.filters.byteLength;

    let selected: T[] = [];
    const remaining: T[] = [];

    // Add existing rules (removing the ones with ids in `removedFilters`)
    const currentFilters = this.getFilters({ noCache: true });
    if (currentFilters.length !== 0) {
      // If no filter was removed (we only add new ones), we don't need to
      // filter out removed existing filters. So we just assign the array to
      // `selected` directly to save a bit of effort.
      if (removedFilters === undefined || removedFilters.size === 0) {
        selected = currentFilters;
      } else {
        // There might be some removed selected filters, so we iterate through
        // them and make sure we keep only the ones not having been deleted.
        for (let i = 0; i < currentFilters.length; i += 1) {
          const filter = currentFilters[i];
          if (removedFilters.has(filter.getId()) === false) {
            selected.push(filter);
          } else {
            bufferSizeEstimation -= filter.getSerializedSize();
          }
        }
      }
    }

    // If `selected` and `currentFilters` have the same length then no filter was removed.
    const storedFiltersRemoved = selected.length !== currentFilters.length;

    // Add new rules: keep the one where predicate is true in `selected` and
    // the others in `remaining`; they will be returned to the caller.
    const numberOfExistingFilters: number = selected.length;
    for (let i = 0; i < newFilters.length; i += 1) {
      const filter = newFilters[i];
      if (this.predicate(filter) === true) {
        bufferSizeEstimation += filter.getSerializedSize();
        selected.push(filter);
      } else {
        remaining.push(filter);
      }
    }

    // Check if any new filter was added in `selected` (from `newFilters`).
    const storedFiltersAdded: boolean = selected.length > numberOfExistingFilters;

    // If selected changed, then update the compact representation of filters.
    if (storedFiltersAdded === true || storedFiltersRemoved === true) {
      // Store filters in their compact form
      const buffer = new StaticDataView(bufferSizeEstimation + 4);
      buffer.pushUint32(selected.length);
      for (let i = 0; i < selected.length; i += 1) {
        selected[i].serialize(buffer);
      }

      // Update internals
      this.filters = buffer.slice();
      this.cache = [];
    } else if (selected.length === 0) {
      this.filters = EMPTY_UINT8_ARRAY;
      this.cache = [];
    }

    return remaining;
  }

  public serialize(buffer: StaticDataView): void {
    buffer.pushBytes(this.filters);
  }

  public getFilters({ noCache = false } = {}): T[] {
    if (this.cache.length === 0) {
      // No filter stored in the container
      if (this.filters.length <= 4) {
        return [];
      }

      // Load all filters in memory and store them in `cache`
      const cache = [];
      const buffer = StaticDataView.fromUint8Array(this.filters);
      const numberOfFilters = buffer.getUint32();
      for (let i = 0; i < numberOfFilters; i += 1) {
        cache.push(this.deserialize(buffer));
      }

      // If `noCache` is specified, then we do not store the list of filters
      // in-memory and just return it to the caller.
      if (noCache === true) {
        return cache;
      }

      // Otherwise, keep filters in-memory for later access
      this.cache = cache;
    }

    return this.cache;
  }
}
