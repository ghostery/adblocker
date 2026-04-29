/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import Config from '../../config.js';
import crc32 from '../../crc32.js';
import { EMPTY_UINT32_ARRAY, EMPTY_UINT8_ARRAY, StaticDataView } from '../../data-view.js';
import IFilter from '../../filters/interface.js';

// Serialized containers use this layout:
//   [number of filters][N + 1 offsets][serialized filter bytes]
// Offsets are relative to the start of the serialized filter bytes. The table
// is required by #merge so serialized filter ranges can be hashed/copied
// without deserializing every source filter first. Offsets are encoded as
// regular uint32 values instead of a Uint32Array view so containers can be read
// from any parent-buffer offset.

/**
 * Generic filters container (for both CosmeticFilter and NetworkFilter
 * instances). This abstracts away some of the logic to serialize/lazy-load
 * lists of filters (which is useful for things like generic cosmetic filters
 * or $badfilter).
 */
export default class FiltersContainer<T extends IFilter> {
  public static merge<T extends IFilter>(
    sources: FiltersContainer<T>[],
    opts?: {
      hashFunc?: (arr: Uint8Array, beg: number, end: number) => number | string | bigint;
    },
  ): FiltersContainer<T> {
    if (sources.length < 2) {
      throw new Error('FiltersContainer.merge requires at least two source containers.');
    }

    const firstSource = sources[0];
    let numberOfFilters = 0;

    for (const source of sources) {
      if (source.config.debug === true) {
        // Filters-container merging deduplicates serialized filter bytes
        // directly. Debug builds embed non-semantic data such as `rawLine` and
        // domain debug parts in those bytes, so equivalent filters could hash
        // differently. Supporting this would require deserializing filters and
        // rebuilding semantic IDs, which defeats the purpose of this fast path.
        throw new Error('FiltersContainer.merge requires debug=false for every source.');
      }

      if (source.config.enableCompression !== firstSource.config.enableCompression) {
        throw new Error('FiltersContainer.merge requires matching compression settings.');
      }

      numberOfFilters += source.numberOfFilters;
    }

    // Fast exit if there are no filters to merge.
    if (numberOfFilters === 0) {
      return new FiltersContainer({
        config: firstSource.config,
        deserialize: firstSource.deserialize,
        filters: [],
      });
    }

    // See reverse-index.ts for additional notes regarding hash function.
    const hashFunc = typeof opts?.hashFunc === 'function' ? opts.hashFunc : crc32;

    const filtersByHash: Map<number | bigint | string, Uint8Array> = new Map();

    // Recover serialized filter ranges from the offset table. The container
    // stores N + 1 offsets for N filters; two consecutive offsets give the byte
    // range of one filter relative to the start of the filters section.
    for (const source of sources) {
      if (source.numberOfFilters === 0) {
        continue;
      }

      for (
        let i = 0, filterIndex: number, filterIndexEnd: number;
        i < source.numberOfFilters;
        i += 1
      ) {
        filterIndex = source.offsets[i];
        filterIndexEnd = source.offsets[i + 1];
        filtersByHash.set(
          hashFunc(source.filters, filterIndex, filterIndexEnd),
          source.filters.subarray(filterIndex, filterIndexEnd),
        );
      }
    }

    // Rebuild a compact filters container from the deduplicated serialized
    // filters.
    let filtersIndexSize = 0;
    for (const filter of filtersByHash.values()) {
      filtersIndexSize += filter.byteLength;
    }

    const view = StaticDataView.allocate(filtersIndexSize, firstSource.config);
    const offsets = new Uint32Array(filtersByHash.size + 1);

    let index = 0;
    for (const filter of filtersByHash.values()) {
      offsets[index++] = view.pos;
      view.buffer.set(filter, view.pos);
      view.setPos(view.pos + filter.byteLength);
    }
    offsets[index] = view.getPos();

    const container = new FiltersContainer({
      config: firstSource.config,
      deserialize: firstSource.deserialize,
      filters: [],
    });
    container.filters = view.subarray();
    container.offsets = offsets;
    container.numberOfFilters = filtersByHash.size;
    return container;
  }

  public static deserialize<T extends IFilter>(
    buffer: StaticDataView,
    deserialize: (view: StaticDataView) => T,
    config: Config,
  ): FiltersContainer<T> {
    const container = new FiltersContainer({ deserialize, config, filters: [] });
    const numberOfFilters = buffer.getUint32();
    container.numberOfFilters = numberOfFilters;

    if (numberOfFilters !== 0) {
      container.offsets = new Uint32Array(numberOfFilters + 1);
      for (let i = 0; i < container.offsets.length; i += 1) {
        container.offsets[i] = buffer.getUint32();
      }

      const filtersIndexSize = container.offsets[numberOfFilters];
      container.filters = buffer.buffer.subarray(buffer.pos, buffer.pos + filtersIndexSize);
      buffer.setPos(buffer.pos + filtersIndexSize);
    }

    return container;
  }

  // Data-view compatible typed array containing all the serialized filters.
  public filters: Uint8Array;

  // Offsets into `filters`: filter N is stored in [offsets[N], offsets[N + 1]).
  public offsets: Uint32Array;

  private numberOfFilters: number;

  private readonly deserialize: (view: StaticDataView) => T;

  // This does not need to be serialized as it is owned globally by the FiltersEngine.
  private readonly config: Config;

  constructor({
    config,
    deserialize,
    filters,
  }: {
    config: Config;
    deserialize: (view: StaticDataView) => T;
    filters: T[];
  }) {
    this.deserialize = deserialize;
    this.filters = EMPTY_UINT8_ARRAY;
    this.offsets = EMPTY_UINT32_ARRAY;
    this.numberOfFilters = 0;
    this.config = config;

    if (filters.length !== 0) {
      this.update(filters, undefined);
    }
  }

  /**
   * Update filters based on `newFilters` and `removedFilters`.
   */
  public update(newFilters: T[], removedFilters: Set<number> | undefined): void {
    let selected: T[] = [];
    const compression = this.config.enableCompression;

    // Add existing rules (removing the ones with ids in `removedFilters`)
    const currentFilters = this.getFilters();
    if (currentFilters.length !== 0) {
      // If no filter was removed (we only add new ones), we don't need to
      // filter out removed existing filters. So we just assign the array to
      // `selected` directly to save a bit of effort.
      if (removedFilters === undefined || removedFilters.size === 0) {
        selected = currentFilters;
      } else {
        // There might be some removed selected filters, so we iterate through
        // them and make sure we keep only the ones not having been deleted.
        for (const filter of currentFilters) {
          if (removedFilters.has(filter.getId()) === false) {
            selected.push(filter);
          }
        }
      }
    }

    // If `selected` and `currentFilters` have the same length then no filter was removed.
    const storedFiltersRemoved = selected.length !== currentFilters.length;

    // Add new rules.
    const numberOfExistingFilters: number = selected.length;
    for (const filter of newFilters) {
      selected.push(filter);
    }

    // Check if any new filter was added in `selected` (from `newFilters`).
    const storedFiltersAdded: boolean = selected.length > numberOfExistingFilters;

    // If selected changed, then update the compact representation of filters.
    if (selected.length === 0) {
      this.filters = EMPTY_UINT8_ARRAY;
      this.offsets = EMPTY_UINT32_ARRAY;
      this.numberOfFilters = 0;
    } else if (storedFiltersAdded === true || storedFiltersRemoved === true) {
      // When we run in `debug` mode, we enable fully deterministic updates of
      // internal data-structure. To this effect, we sort all filters before
      // insertion.
      if (this.config.debug === true) {
        selected.sort((f1: T, f2: T): number => f1.getId() - f2.getId());
      }

      // Estimate size of the buffer we will need to store filters.
      let bufferSizeEstimation = 0;
      for (const filter of selected) {
        bufferSizeEstimation += filter.getSerializedSize(compression);
      }

      // Store filters in their compact form
      const buffer = StaticDataView.allocate(bufferSizeEstimation, this.config);
      const offsets = new Uint32Array(selected.length + 1);
      for (let i = 0; i < selected.length; i += 1) {
        offsets[i] = buffer.getPos();
        selected[i].serialize(buffer);
      }
      offsets[selected.length] = buffer.getPos();

      // Update internals
      this.filters = buffer.subarray();
      this.offsets = offsets;
      this.numberOfFilters = selected.length;
    }
  }

  public getSerializedSize(): number {
    return 4 + this.offsets.byteLength + this.filters.byteLength;
  }

  public serialize(buffer: StaticDataView): void {
    buffer.pushUint32(this.numberOfFilters);

    for (const offset of this.offsets) {
      buffer.pushUint32(offset);
    }

    buffer.buffer.set(this.filters, buffer.pos);
    buffer.setPos(buffer.pos + this.filters.byteLength);
  }

  public getFilters(): T[] {
    // No filter stored in the container
    if (this.numberOfFilters === 0) {
      return [];
    }

    // Load all filters in memory and store them in `cache`
    const filters: T[] = [];
    const buffer = StaticDataView.fromUint8Array(this.filters, this.config);
    for (let i = 0; i < this.numberOfFilters; i += 1) {
      filters.push(this.deserialize(buffer));
    }

    return filters;
  }
}
