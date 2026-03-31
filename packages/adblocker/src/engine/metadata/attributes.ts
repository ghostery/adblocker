/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { sizeOfByte, sizeOfLength, sizeOfUTF8, StaticDataView } from '../../data-view.js';

type FilterId = number & { __hint?: 'filterId' };
type LineNumber = number & { __hint?: 'lineNumber' };

/**
 * List holds the actual line number data for filter ID.
 */
export type List = Map<FilterId, LineNumber>;

/**
 * Chunk is an intermediate data structure to share code path in
 * the serialisation size calculation and data serialisation. For
 * efficient data storage, it maintains sorted array of filter ID
 * using the line number as an offset.
 *
 * [I | ... | K | X | ...]
 *  ^----------------------- I: Length of chunks
 *      ^------------------- UTF8 chunk for the list name
 *            ^------------- K: Line number offset for fellow IDs
 *                ^--------- X: Length of filter IDs
 */
type Chunk = [LineNumber, FilterId[]];

function transformListIntoChunks(list: List): Chunk[] {
  const enum ListRef {
    FilterId = 0,
    LineNumber = 1,
  }

  const sorted = [...list.entries()].sort(function ([, a], [, b]) {
    return a - b;
  });
  const chunks: Chunk[] = [];
  for (let i = 0, k = 0; i < sorted.length; i = ++k) {
    const [filterId, lineNumber] = sorted[i];
    const chunk: FilterId[] = [filterId];
    for (k = i + 1; k < sorted.length; k++) {
      if (lineNumber + 1 !== sorted[k][ListRef.LineNumber]) {
        break;
      }
      chunk.push(sorted[k][ListRef.FilterId]);
    }
    chunks.push([lineNumber, chunk]);
  }
  return chunks;
}

/**
 * IAttribute is the final data structure returned to the user.
 * It belongs to SourceMap, so the user can access to per-filter
 * level attribute quick. It's designed to be independant from
 * the engine resources such as `engine.lists`.
 */
export interface IAttribute {
  locations: Array<{
    name: string;
    lineNumber: LineNumber;
  }>;
}

export type SourceMap = Map<FilterId, IAttribute>;

function mergeAttribute(root: IAttribute, leaf: IAttribute): void {
  for (const location of leaf.locations) {
    const redundantIndex = root.locations.findIndex(function (existingLocation) {
      return location.name === existingLocation.name;
    });
    if (redundantIndex === -1) {
      root.locations.push(location);
    } else {
      // Replace the existing metadata
      root.locations.splice(redundantIndex, 1, location);
    }
  }
}

function generateSourceMap(lists: Map<string, List>): SourceMap {
  const sourceMap: SourceMap = new Map();
  for (const [name, map] of lists) {
    for (const [filterId, lineNumber] of map) {
      const root = sourceMap.get(filterId);
      const leaf = {
        locations: [{ name, lineNumber }],
      };
      if (root === undefined) {
        sourceMap.set(filterId, leaf);
      } else {
        mergeAttribute(root, leaf);
      }
    }
  }

  return sourceMap;
}

export class AttributeProvider {
  public static deserialize(view: StaticDataView): AttributeProvider {
    const lists: Map<string, List> = new Map();
    const listSize = view.getLength();
    for (let i = 0; i < listSize; i++) {
      const list: List = new Map();
      const name = view.getUTF8();
      const chunkSize = view.getLength();
      for (let k = 0; k < chunkSize; k++) {
        const offset = view.getLength();
        const filterIdsSize = view.getLength();
        for (let z = 0; z < filterIdsSize; z++) {
          list.set(view.getUint32(), offset + z);
        }
      }
      lists.set(name, list);
    }

    const sourceMap = generateSourceMap(lists);

    return new this({ lists, sourceMap });
  }

  public readonly lists: Map<string, List>;
  private readonly sourceMap: SourceMap;

  constructor({
    lists = new Map(),
    sourceMap = new Map(),
  }: {
    lists?: Map<string, List> | undefined;
    sourceMap?: SourceMap | undefined;
  }) {
    this.lists = lists;
    this.sourceMap = sourceMap;
  }

  private upsert(filterId: FilterId, leaf: IAttribute) {
    const root = this.sourceMap.get(filterId);
    if (root === undefined) {
      this.sourceMap.set(filterId, leaf);
    } else {
      mergeAttribute(root, leaf);
    }
  }

  public importFilter(filterId: FilterId, attribute: IAttribute) {
    for (const { name, lineNumber } of attribute.locations) {
      const list = this.lists.get(name);
      if (list === undefined) {
        this.lists.set(name, new Map([[filterId, lineNumber]]));
      } else {
        list.set(filterId, lineNumber);
      }

      this.upsert(filterId, {
        locations: [{ name, lineNumber }],
      });
    }
  }

  public dropFilter(filterId: FilterId) {
    for (const [, map] of this.lists) {
      map.delete(filterId);
    }

    this.sourceMap.delete(filterId);
  }

  public importList(name: string, map: List) {
    this.lists.set(name, map);

    for (const [filterId, lineNumber] of map) {
      this.upsert(filterId, {
        locations: [{ name, lineNumber }],
      });
    }
  }

  public dropList(name: string) {
    this.lists.delete(name);

    for (const [filterId, attribute] of this.sourceMap) {
      if (attribute.locations.length === 1) {
        this.sourceMap.delete(filterId);
      } else {
        const index = attribute.locations.findIndex(function (location) {
          return location.name === name;
        });
        if (index !== -1) {
          attribute.locations.splice(index, 1);
        }
      }
    }
  }

  public getAttribute(filterId: FilterId): IAttribute | undefined {
    return this.sourceMap.get(filterId);
  }

  public getSerializedSize(): number {
    let estimate: number = 0;

    estimate += sizeOfLength(this.lists.size);
    for (const [name, list] of this.lists) {
      const chunks = transformListIntoChunks(list);
      estimate += sizeOfUTF8(name);
      estimate += sizeOfLength(chunks.length);
      for (const [offset, filterIds] of chunks) {
        estimate += sizeOfLength(offset);
        estimate += sizeOfLength(filterIds.length);
        estimate += sizeOfByte() * 4 * filterIds.length;
      }
    }

    return estimate;
  }

  public serialize(view: StaticDataView): void {
    view.pushLength(this.lists.size);
    for (const [name, list] of this.lists) {
      const chunks = transformListIntoChunks(list);
      view.pushUTF8(name);
      view.pushLength(chunks.length);
      for (const [offset, filterIds] of chunks) {
        view.pushLength(offset);
        view.pushLength(filterIds.length);
        for (const filterId of filterIds) {
          view.pushUint32(filterId);
        }
      }
    }
  }
}
