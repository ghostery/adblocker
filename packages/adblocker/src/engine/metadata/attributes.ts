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

    return new this({ lists });
  }

  public readonly lists: Map<string, List>;
  public readonly reverseIndex: Map<FilterId, IAttribute>;

  constructor({ lists = new Map() }: { lists?: Map<string, List> | undefined }) {
    this.lists = lists;
    this.reverseIndex = new Map();
  }

  private upsert(filterId: FilterId, newAttribute: IAttribute) {
    const currentAttribute = this.reverseIndex.get(filterId);
    if (currentAttribute === undefined) {
      this.reverseIndex.set(filterId, newAttribute);
      return;
    }

    for (const newLocation of newAttribute.locations) {
      const index = currentAttribute.locations.findIndex(function (location) {
        return location.name === newLocation.name;
      });
      if (index === -1) {
        currentAttribute.locations.push(newLocation);
      } else {
        currentAttribute.locations[index].lineNumber = newLocation.lineNumber;
      }
    }
  }

  public addFilter(name: string, filterId: FilterId, lineNumber: LineNumber) {
    const list = this.lists.get(name);
    if (list === undefined) {
      this.lists.set(name, new Map([[filterId, lineNumber]]));
    } else {
      list.set(filterId, lineNumber);
    }

    this.upsert(filterId, {
      locations: [
        {
          name,
          lineNumber,
        },
      ],
    });
  }

  public removeFilter(name: string, filterId: FilterId) {
    const list = this.lists.get(name);
    if (list === undefined) {
      return;
    }

    list.delete(filterId);

    const attribute = this.reverseIndex.get(filterId);
    if (attribute === undefined) {
      return;
    }

    const index = attribute.locations.findIndex(function (location) {
      return location.name === name;
    });
    if (index === -1) {
      return;
    }

    if (attribute.locations.length === 1) {
      this.reverseIndex.delete(filterId);
    } else {
      attribute.locations.splice(index, 1);
    }
  }

  public addList(name: string, newList: List) {
    const currentList = this.lists.get(name);
    if (currentList !== undefined) {
      for (const [filterId] of currentList) {
        if (newList.has(filterId)) {
          continue;
        }

        const attribute = this.reverseIndex.get(filterId);
        if (attribute === undefined) {
          this.reverseIndex.delete(filterId);
          continue;
        }

        const index = attribute.locations.findIndex(function (location) {
          return location.name === name;
        });
        if (index === -1) {
          continue;
        }

        if (attribute.locations.length === 1) {
          this.reverseIndex.delete(filterId);
        } else {
          attribute.locations.splice(index, 1);
        }
      }
    }

    for (const [filterId, lineNumber] of newList) {
      this.upsert(filterId, {
        locations: [
          {
            name,
            lineNumber,
          },
        ],
      });
    }

    this.lists.set(name, newList);
  }

  public removeList(name: string) {
    const list = this.lists.get(name);
    if (list === undefined) {
      return;
    }

    for (const [filterId] of list) {
      const attribute = this.reverseIndex.get(filterId);
      if (attribute === undefined) {
        continue;
      }

      const index = attribute.locations.findIndex(function (location) {
        return location.name === name;
      });
      if (index === -1) {
        continue;
      }

      if (attribute.locations.length === 1) {
        this.reverseIndex.delete(filterId);
      } else {
        attribute.locations.splice(index, 1);
      }
    }
    this.lists.delete(name);
  }

  public getAttribute(filterId: FilterId): IAttribute | undefined {
    let attribute = this.reverseIndex.get(filterId);
    if (attribute !== undefined) {
      return attribute;
    }

    attribute = {
      locations: [],
    } satisfies IAttribute;

    for (const [name, list] of this.lists) {
      const lineNumber = list.get(filterId);
      if (lineNumber !== undefined) {
        attribute.locations.push({ name, lineNumber });
      }
    }

    this.reverseIndex.set(filterId, attribute);
    return attribute;
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
