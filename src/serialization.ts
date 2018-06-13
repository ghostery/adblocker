/**
 * This modules contains all functions and utils to serialize the adblocker
 * efficiently. The central part if `DynamicDataView`, a dynamically growing
 * ArrayBuffer exposing an API allowing to set values of type: String, uint8,
 * uint16 and uint32 efficiently.
 */

import DynamicDataView from './dynamic-data-view';
import Engine from './engine/engine';
import IList from './engine/list';
import ReverseIndex from './engine/reverse-index';
import { CosmeticFilter } from './parsing/cosmetic-filter';
import IFilter from './parsing/interface';
import { NetworkFilter } from './parsing/network-filter';

/**
 * To allow for a more compact representation of network filters, the
 * representation is composed of a mandatory header, and some optional
 *
 * Header:
 * =======
 *
 *  | opt | mask | id
 *    8     32     32
 *
 * For an empty filter having no pattern, hostname, the minimum size is: 72 bits.
 *
 * Then for each optional part (filter, hostname optDomains, optNotDomains,
 * redirect), it takes 16 bits for the length of the string + the length of the
 * string in byte.
 *
 * The optional parts are written in order of there number of occurrence in the
 * filter list using by the adblocker. The most common being `hostname`, then
 * `filter`, `optDomains`, `optNotDomains`, `redirect`.
 *
 * Example:
 * ========
 *
 * @@||cliqz.com would result in a serialized version:
 *
 * | 1 | mask | id | 9 | c | l | i | q | z | . | c | o | m  (19 bytes)
 *
 * In this case, the serialized version is actually bigger than the original
 * filter, but faster to deserialize. In the future, we could optimize the
 * representation to compact small filters better.
 *
 * Ideas:
 *  * variable length encoding for the mask (if not option, take max 1 byte).
 *  * first byte could contain the mask as well if small enough.
 *  * when packing ascii string, store several of them in each byte.
 */
function serializeNetworkFilter(
  filter: NetworkFilter,
  buffer: DynamicDataView,
): void {
  // Check number of optional parts (e.g.: filter, hostname, etc.)
  let numberOfOptionalParts = 0;

  if (filter.isRedirect()) {
    numberOfOptionalParts = 5;
  } else if (filter.hasOptNotDomains()) {
    numberOfOptionalParts = 4;
  } else if (filter.hasOptDomains()) {
    numberOfOptionalParts = 3;
  } else if (filter.hasFilter()) {
    numberOfOptionalParts = 2;
  } else if (filter.hasHostname()) {
    numberOfOptionalParts = 1;
  }

  buffer.pushUint8(numberOfOptionalParts);
  buffer.pushUint32(filter.mask);
  buffer.pushUint32(filter.id);

  if (numberOfOptionalParts === 0) {
    return;
  }

  buffer.pushStr(filter.hostname);
  if (numberOfOptionalParts === 1) {
    return;
  }

  buffer.pushStr(filter.filter);
  if (numberOfOptionalParts === 2) {
    return;
  }

  buffer.pushStr(filter.optDomains);
  if (numberOfOptionalParts === 3) {
    return;
  }

  buffer.pushStr(filter.optNotDomains);
  if (numberOfOptionalParts === 4) {
    return;
  }

  buffer.pushStr(filter.redirect);
}

/**
 * Deserialize network filters. The code accessing the buffer should be
 * symetrical to the one in `serializeNetworkFilter`.
 */
function deserializeNetworkFilter(buffer: DynamicDataView): NetworkFilter {
  const numberOfOptionalParts = buffer.getUint8();
  const mask = buffer.getUint32();
  const id = buffer.getUint32();

  const hostname = numberOfOptionalParts > 0 ? buffer.getStr() : '';
  const filter = numberOfOptionalParts > 1 ? buffer.getStr() : '';
  const optDomains = numberOfOptionalParts > 2 ? buffer.getStr() : '';
  const optNotDomains = numberOfOptionalParts > 3 ? buffer.getStr() : '';
  const redirect = numberOfOptionalParts > 4 ? buffer.getStr() : '';

  return new NetworkFilter({
    filter,
    hostname,
    id,
    mask,
    optDomains,
    optNotDomains,
    redirect,
  });
}

/**
 * The format of a cosmetic filter is:
 *
 * | mask | id | selector length | selector... | hostnames length | hostnames...
 *   32     32   16                              16
 *
 * The header (mask + id) is 64 bits, then we have a total of 32 bits to store
 * the length of `selector` and `hostnames` (16 bits each).
 *
 * Improvements similar to the onces mentioned in `serializeNetworkFilters`
 * could be applied here, to get a more compact representation.
 */
function serializeCosmeticFilter(
  filter: CosmeticFilter,
  buffer: DynamicDataView,
): void {
  buffer.pushUint8(filter.mask);
  buffer.pushUint32(filter.id);
  buffer.pushStr(filter.selector);
  buffer.pushStr(filter.hostnames);
}

/**
 * Deserialize cosmetic filters. The code accessing the buffer should be
 * symetrical to the one in `serializeCosmeticFilter`.
 */
function deserializeCosmeticFilter(buffer: DynamicDataView): CosmeticFilter {
  const mask = buffer.getUint8();
  const id = buffer.getUint32();
  const selector = buffer.getStr();
  const hostnames = buffer.getStr();

  return new CosmeticFilter({
    hostnames,
    id,
    mask,
    selector,
  });
}

function serializeNetworkFilters(
  filters: NetworkFilter[],
  buffer: DynamicDataView,
): void {
  buffer.pushUint32(filters.length);
  for (let i = 0; i < filters.length; i += 1) {
    serializeNetworkFilter(filters[i], buffer);
  }
}

function serializeCosmeticFilters(
  filters: CosmeticFilter[],
  buffer: DynamicDataView,
): void {
  buffer.pushUint32(filters.length);
  for (let i = 0; i < filters.length; i += 1) {
    serializeCosmeticFilter(filters[i], buffer);
  }
}

function deserializeNetworkFilters(
  buffer: DynamicDataView,
  allFilters: Map<number, NetworkFilter>,
): NetworkFilter[] {
  const length = buffer.getUint32();
  const filters: NetworkFilter[] = [];
  for (let i = 0; i < length; i += 1) {
    const filter = deserializeNetworkFilter(buffer);
    filters.push(filter);
    allFilters.set(filter.id, filter);
  }

  return filters;
}

function deserializeCosmeticFilters(
  buffer: DynamicDataView,
  allFilters: Map<number, CosmeticFilter>,
): CosmeticFilter[] {
  const length = buffer.getUint32();
  const filters: CosmeticFilter[] = [];
  for (let i = 0; i < length; i += 1) {
    const filter = deserializeCosmeticFilter(buffer);
    filters.push(filter);
    allFilters.set(filter.id, filter);
  }

  return filters;
}

function serializeLists(
  buffer: DynamicDataView,
  lists: Map<string, IList>,
): void {
  // Serialize number of lists
  buffer.pushUint8(lists.size);

  lists.forEach((list, asset) => {
    buffer.pushStr(asset);
    buffer.pushStr(list.checksum);
    serializeCosmeticFilters(list.cosmetics, buffer);
    serializeNetworkFilters(list.exceptions, buffer);
    serializeNetworkFilters(list.filters, buffer);
    serializeNetworkFilters(list.importants, buffer);
    serializeNetworkFilters(list.redirects, buffer);
  });
}

function deserializeLists(
  buffer: DynamicDataView,
): {
  cosmeticFilters: Map<number, CosmeticFilter>;
  networkFilters: Map<number, NetworkFilter>;
  lists: Map<string, IList>;
} {
  const lists = new Map();
  const networkFilters = new Map();
  const cosmeticFilters = new Map();

  // Get number of assets
  const size = buffer.getUint8();
  for (let i = 0; i < size; i += 1) {
    lists.set(buffer.getStr(), {
      checksum: buffer.getStr(),
      cosmetics: deserializeCosmeticFilters(buffer, cosmeticFilters),
      exceptions: deserializeNetworkFilters(buffer, networkFilters),
      filters: deserializeNetworkFilters(buffer, networkFilters),
      importants: deserializeNetworkFilters(buffer, networkFilters),
      redirects: deserializeNetworkFilters(buffer, networkFilters),
    });
  }

  return {
    cosmeticFilters,
    lists,
    networkFilters,
  };
}

function serializeBucket<T extends IFilter>(
  token: number,
  filters: T[],
  buffer: DynamicDataView,
) {
  buffer.pushUint16(filters.length);
  buffer.pushUint32(token);

  for (let i = 0; i < filters.length; i += 1) {
    buffer.pushUint32(filters[i].id);
  }
}

function deserializeBucket<T extends IFilter>(
  buffer: DynamicDataView,
  filters: Map<number, T>,
): {
  token: number;
  bucket: { filters: T[]; hit: number; optimized: boolean };
} {
  const bucket: T[] = [];

  const length: number = buffer.getUint16();
  const token: number = buffer.getUint32();

  for (let i = 0; i < length; i += 1) {
    const id = buffer.getUint32();
    const filter = filters.get(id);
    if (filter !== undefined) {
      bucket.push(filter);
    }
  }

  return {
    bucket: {
      filters: bucket,
      hit: 0,
      optimized: false,
    },
    token,
  };
}

function serializeReverseIndex<T extends IFilter>(
  reverseIndex: ReverseIndex<T>,
  buffer: DynamicDataView,
): void {
  const index = reverseIndex.index;
  const tokens = [...index.keys()];

  buffer.pushUint32(reverseIndex.size);
  buffer.pushUint32(tokens.length);

  index.forEach((bucket, token) => {
    serializeBucket<T>(token, bucket.filters, buffer);
  });
}

function deserializeReverseIndex<T extends IFilter>(
  buffer: DynamicDataView,
  index: ReverseIndex<T>,
  filters: Map<number, T>,
): ReverseIndex<T> {
  const deserializedIndex = new Map();

  const size = buffer.getUint32();
  const numberOfTokens = buffer.getUint32();

  for (let i = 0; i < numberOfTokens; i += 1) {
    const { token, bucket } = deserializeBucket<T>(buffer, filters);
    deserializedIndex.set(token, bucket);
  }

  index.index = deserializedIndex;
  index.size = size;

  return index;
}

function serializeResources(engine: Engine, buffer: DynamicDataView): void {
  // Serialize `resourceChecksum`
  buffer.pushStr(engine.resourceChecksum);

  // Serialize `js`
  buffer.pushUint8(engine.js.size);
  engine.js.forEach((resource, name) => {
    buffer.pushStr(name);
    buffer.pushStr(resource);
  });

  // Serialize `resources`
  buffer.pushUint8(engine.resources.size);
  engine.resources.forEach(({ contentType, data }, name) => {
    buffer.pushStr(name);
    buffer.pushStr(contentType);
    buffer.pushStr(data);
  });
}

function deserializeResources(
  buffer: DynamicDataView,
): {
  js: Map<string, string>;
  resources: Map<string, { contentType: string, data: string }>;
  resourceChecksum: string;
} {
  const js = new Map();
  const resources = new Map();
  const resourceChecksum = buffer.getStr();

  // Deserialize `js`
  const jsSize = buffer.getUint8();
  for (let i = 0; i < jsSize; i += 1) {
    js.set(
      buffer.getStr(), // name
      buffer.getStr(), // resource
    );
  }

  // Deserialize `resources`
  const resourcesSize = buffer.getUint8();
  for (let i = 0; i < resourcesSize; i += 1) {
    resources.set(buffer.getStr(), {
      contentType: buffer.getStr(),
      data: buffer.getStr(),
    });
  }

  return {
    js,
    resourceChecksum,
    resources,
  };
}

/**
 * Creates a string representation of the full engine. It can be stored
 * on-disk for faster loading of the adblocker. The `load` method of a
 * `Engine` instance can be used to restore the engine *in-place*.
 */
function serializeEngine(engine: Engine): Uint8Array {
  // Create a big buffer! It does not have to be the right size since
  // `DynamicDataView` is able to resize itself dynamically if needed.
  const buffer = new DynamicDataView(4000000);

  buffer.pushUint8(engine.version);
  buffer.pushUint8(Number(engine.loadCosmeticFilters));
  buffer.pushUint8(Number(engine.loadNetworkFilters));
  buffer.pushUint8(Number(engine.optimizeAOT));

  // Resources (js, resources)
  serializeResources(engine, buffer);

  // Lists
  serializeLists(buffer, engine.lists);

  // Buckets
  serializeReverseIndex(engine.filters.index, buffer);
  serializeReverseIndex(engine.exceptions.index, buffer);
  serializeReverseIndex(engine.importants.index, buffer);
  serializeReverseIndex(engine.redirects.index, buffer);
  serializeReverseIndex(engine.cosmetics.hostnameIndex, buffer);
  serializeReverseIndex(engine.cosmetics.selectorIndex, buffer);

  return buffer.crop();
}

function deserializeEngine(serialized: Uint8Array, version: number): Engine {
  const buffer = new DynamicDataView(0);
  buffer.set(serialized);

  // Before starting deserialization, we make sure that the version of the
  // serialized engine is the same as the current source code. If not, we start
  // fresh and create a new engine from the lists.
  const serializedEngineVersion = buffer.getUint8();
  if (version !== serializedEngineVersion) {
    throw new Error('serialized engine version mismatch');
  }

  // Create a new engine with same options
  const options = {
    loadCosmeticFilters: Boolean(buffer.getUint8()),
    loadNetworkFilters: Boolean(buffer.getUint8()),
    optimizeAOT: Boolean(buffer.getUint8()),
    version: serializedEngineVersion,
  };
  const engine = new Engine(options);

  // Deserialize resources
  const { js, resources, resourceChecksum } = deserializeResources(buffer);

  engine.js = js;
  engine.resources = resources;
  engine.resourceChecksum = resourceChecksum;

  // Deserialize lists + filters
  const { lists, networkFilters, cosmeticFilters } = deserializeLists(buffer);

  engine.lists = lists;

  // Deserialize buckets
  deserializeReverseIndex<NetworkFilter>(
    buffer,
    engine.filters.index,
    networkFilters,
  );
  deserializeReverseIndex<NetworkFilter>(
    buffer,
    engine.exceptions.index,
    networkFilters,
  );
  deserializeReverseIndex<NetworkFilter>(
    buffer,
    engine.importants.index,
    networkFilters,
  );
  deserializeReverseIndex<NetworkFilter>(
    buffer,
    engine.redirects.index,
    networkFilters,
  );
  deserializeReverseIndex<CosmeticFilter>(
    buffer,
    engine.cosmetics.hostnameIndex,
    cosmeticFilters,
  );
  deserializeReverseIndex<CosmeticFilter>(
    buffer,
    engine.cosmetics.selectorIndex,
    cosmeticFilters,
  );

  return engine;
}

export {
  IFilter,
  serializeNetworkFilter,
  deserializeNetworkFilter,
  serializeCosmeticFilter,
  deserializeCosmeticFilter,
  serializeReverseIndex,
  deserializeReverseIndex,
  serializeEngine,
  deserializeEngine,
};
