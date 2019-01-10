/**
 * This modules contains all functions and utils to serialize the adblocker
 * efficiently. The central part if `StaticDataView`.
 */

import StaticDataView from './data-view';
import CosmeticFilterBucket from './engine/bucket/cosmetics';
import NetworkFilterBucket from './engine/bucket/network';
import Engine from './engine/engine';
import IList from './engine/list';
import ReverseIndex, { IBucket, newBucket } from './engine/reverse-index';
import { CosmeticFilter } from './parsing/cosmetic-filter';
import IFilter from './parsing/interface';
import { NetworkFilter } from './parsing/network-filter';

export const ENGINE_VERSION = 16;

/**
 * To allow for a more compact representation of network filters, the
 * representation is composed of a mandatory header, and some optional
 *
 * Header:
 * =======
 *
 *  | opt | mask
 *     8     32
 *
 * For an empty filter having no pattern, hostname, the minimum size is: 42 bits.
 *
 * Then for each optional part (filter, hostname optDomains, optNotDomains,
 * redirect), it takes 16 bits for the length of the string + the length of the
 * string in bytes.
 *
 * The optional parts are written in order of there number of occurrence in the
 * filter list used by the adblocker. The most common being `hostname`, then
 * `filter`, `optDomains`, `optNotDomains`, `redirect`.
 *
 * Example:
 * ========
 *
 * @@||cliqz.com would result in a serialized version:
 *
 * | 1 | mask | 9 | c | l | i | q | z | . | c | o | m  (16 bytes)
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
function serializeNetworkFilter(filter: NetworkFilter, buffer: StaticDataView): void {
  buffer.pushUint32(filter.getId());
  buffer.pushUint32(filter.mask);

  const index = buffer.getPos();
  buffer.pushUint8(0);

  // This bit-mask indicates which optional parts of the filter were serialized.
  let optionalParts = 0;

  if (filter.bug !== undefined) {
    optionalParts |= 1;
    buffer.pushUint16(filter.bug);
  }

  if (filter.isCSP()) {
    optionalParts |= 2;
    buffer.pushASCII(filter.csp);
  }

  if (filter.hasFilter()) {
    optionalParts |= 4;
    buffer.pushASCII(filter.filter);
  }

  if (filter.hasHostname()) {
    optionalParts |= 8;
    buffer.pushASCII(filter.hostname);
  }

  if (filter.hasOptDomains()) {
    optionalParts |= 16;
    buffer.pushUint32Array(filter.optDomains);
  }

  if (filter.hasOptNotDomains()) {
    optionalParts |= 32;
    buffer.pushUint32Array(filter.optNotDomains);
  }

  if (filter.isRedirect()) {
    optionalParts |= 64;
    buffer.pushASCII(filter.redirect);
  }

  buffer.setByte(index, optionalParts);
}

/**
 * Deserialize network filters. The code accessing the buffer should be
 * symetrical to the one in `serializeNetworkFilter`.
 */
function deserializeNetworkFilter(buffer: StaticDataView): NetworkFilter {
  const id = buffer.getUint32();
  const mask = buffer.getUint32();
  const optionalParts = buffer.getUint8();

  // The order of these statements is important. Since `buffer.getX()` will
  // internally increment the position of next byte to read, they need to be
  // retrieved in the exact same order they were serialized (check
  // `serializeNetworkFilter`).
  return new NetworkFilter({
    // Mandatory fields
    id,
    mask,

    // Optional parts
    bug: (optionalParts & 1) === 1 ? buffer.getUint16() : undefined,
    csp: (optionalParts & 2) === 2 ? buffer.getASCII() : undefined,
    filter: (optionalParts & 4) === 4 ? buffer.getASCII() : undefined,
    hostname: (optionalParts & 8) === 8 ? buffer.getASCII() : undefined,
    optDomains: (optionalParts & 16) === 16 ? buffer.getUint32Array() : undefined,
    optNotDomains: (optionalParts & 32) === 32 ? buffer.getUint32Array() : undefined,
    redirect: (optionalParts & 64) === 64 ? buffer.getASCII() : undefined,
  });
}

/**
 * The format of a cosmetic filter is:
 *
 * | mask | selector length | selector... | hostnames length | hostnames...
 *   32     16                              16
 *
 * The header (mask) is 32 bits, then we have a total of 32 bits to store the
 * length of `selector` and `hostnames` (16 bits each).
 *
 * Improvements similar to the onces mentioned in `serializeNetworkFilters`
 * could be applied here, to get a more compact representation.
 */
function serializeCosmeticFilter(filter: CosmeticFilter, buffer: StaticDataView): void {
  buffer.pushASCII(filter.hostnames);
  buffer.pushUint32(filter.getId());
  buffer.pushUint8(filter.mask);
  buffer.pushUTF8(filter.selector);
  buffer.pushASCII(filter.style);
}

/**
 * Deserialize cosmetic filters. The code accessing the buffer should be
 * symetrical to the one in `serializeCosmeticFilter`.
 */
function deserializeCosmeticFilter(buffer: StaticDataView): CosmeticFilter {
  // The order of these fields should be the same as when we serialize them.
  return new CosmeticFilter({
    hostnames: buffer.getASCII(),
    id: buffer.getUint32(),
    mask: buffer.getUint8(),
    selector: buffer.getUTF8(),
    style: buffer.getASCII(),
  });
}

function serializeNetworkFilters(filters: NetworkFilter[], buffer: StaticDataView): void {
  buffer.pushUint32(filters.length);
  for (let i = 0; i < filters.length; i += 1) {
    serializeNetworkFilter(filters[i], buffer);
  }
}

function serializeCosmeticFilters(filters: CosmeticFilter[], buffer: StaticDataView): void {
  buffer.pushUint32(filters.length);
  for (let i = 0; i < filters.length; i += 1) {
    serializeCosmeticFilter(filters[i], buffer);
  }
}

function deserializeNetworkFilters(
  buffer: StaticDataView,
  allFilters: Map<number, NetworkFilter>,
): NetworkFilter[] {
  const length = buffer.getUint32();
  const filters: NetworkFilter[] = [];
  for (let i = 0; i < length; i += 1) {
    const filter = deserializeNetworkFilter(buffer);
    filters.push(filter);
    allFilters.set(filter.getId(), filter);
  }

  return filters;
}

function deserializeCosmeticFilters(
  buffer: StaticDataView,
  allFilters: Map<number, CosmeticFilter>,
): CosmeticFilter[] {
  const length = buffer.getUint32();
  const filters: CosmeticFilter[] = [];
  for (let i = 0; i < length; i += 1) {
    const filter = deserializeCosmeticFilter(buffer);
    filters.push(filter);
    allFilters.set(filter.getId(), filter);
  }

  return filters;
}

function serializeLists(buffer: StaticDataView, lists: Map<string, IList>): void {
  // Serialize number of lists
  buffer.pushUint8(lists.size);

  lists.forEach((list, asset) => {
    buffer.pushASCII(asset);
    buffer.pushASCII(list.checksum);
    serializeCosmeticFilters(list.cosmetics, buffer);
    serializeNetworkFilters(list.csp, buffer);
    serializeNetworkFilters(list.exceptions, buffer);
    serializeNetworkFilters(list.filters, buffer);
    serializeNetworkFilters(list.importants, buffer);
    serializeNetworkFilters(list.redirects, buffer);
  });
}

function deserializeLists(
  buffer: StaticDataView,
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
    lists.set(buffer.getASCII(), {
      checksum: buffer.getASCII(),
      cosmetics: deserializeCosmeticFilters(buffer, cosmeticFilters),
      csp: deserializeNetworkFilters(buffer, networkFilters),
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

function serializeListOfFilter<T extends IFilter>(filters: T[], buffer: StaticDataView) {
  buffer.pushUint16(filters.length);
  for (let i = 0; i < filters.length; i += 1) {
    buffer.pushUint32(filters[i].getId());
  }
}

function serializeBucket<T extends IFilter>(token: number, filters: T[], buffer: StaticDataView) {
  buffer.pushUint32(token);
  serializeListOfFilter(filters, buffer);
}

function deserializeListOfFilters<T extends IFilter>(
  buffer: StaticDataView,
  filters: Map<number, T>,
): T[] {
  const bucket: T[] = [];
  const length = buffer.getUint16();

  for (let i = 0; i < length; i += 1) {
    const filter = filters.get(buffer.getUint32());
    if (filter !== undefined) {
      bucket.push(filter);
    }
  }

  return bucket;
}

function deserializeBucket<T extends IFilter>(
  buffer: StaticDataView,
  filters: Map<number, T>,
): {
  token: number;
  bucket: IBucket<T>;
} {
  const token = buffer.getUint32();

  return {
    bucket: newBucket<T>(deserializeListOfFilters(buffer, filters)),
    token,
  };
}

function serializeReverseIndex<T extends IFilter>(
  reverseIndex: ReverseIndex<T>,
  buffer: StaticDataView,
): void {
  const index = reverseIndex.index;

  buffer.pushUint32(reverseIndex.size);
  buffer.pushUint32(index.size);

  index.forEach((bucket, token) => {
    serializeBucket<T>(token, bucket.originals || bucket.filters, buffer);
  });
}

function deserializeReverseIndex<T extends IFilter>(
  buffer: StaticDataView,
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

function serializeNetworkFilterBucket(bucket: NetworkFilterBucket, buffer: StaticDataView): void {
  buffer.pushASCII(bucket.name);
  buffer.pushUint8(Number(bucket.enableOptimizations));
  serializeReverseIndex(bucket.index, buffer);
}

function deserializeNetworkFilterBucket(
  buffer: StaticDataView,
  filters: Map<number, NetworkFilter>,
): NetworkFilterBucket {
  const bucket = new NetworkFilterBucket(
    buffer.getASCII() || '',
    undefined,
    Boolean(buffer.getUint8()),
  );
  bucket.index = deserializeReverseIndex<NetworkFilter>(buffer, bucket.index, filters);
  bucket.size = bucket.index.size;
  return bucket;
}

function serializeCosmeticFilterBucket(
  bucket: CosmeticFilterBucket,
  buffer: StaticDataView,
): void {
  serializeListOfFilter(bucket.genericRules, buffer);
  serializeReverseIndex(bucket.hostnameIndex, buffer);
}

function deserializeCosmeticFilterBucket(
  buffer: StaticDataView,
  filters: Map<number, CosmeticFilter>,
): CosmeticFilterBucket {
  const bucket = new CosmeticFilterBucket();
  bucket.genericRules = deserializeListOfFilters(buffer, filters);
  bucket.hostnameIndex = deserializeReverseIndex<CosmeticFilter>(
    buffer,
    bucket.hostnameIndex,
    filters,
  );
  bucket.size = bucket.hostnameIndex.size + bucket.genericRules.length;
  return bucket;
}

function serializeResources(engine: Engine, buffer: StaticDataView): void {
  // Serialize `resourceChecksum`
  buffer.pushASCII(engine.resourceChecksum);

  // Serialize `resources`
  buffer.pushUint8(engine.resources.size);
  engine.resources.forEach(({ contentType, data }, name) => {
    buffer.pushASCII(name);
    buffer.pushASCII(contentType);
    buffer.pushASCII(data);
  });
}

function deserializeResources(
  buffer: StaticDataView,
): {
  js: Map<string, string>;
  resources: Map<string, { contentType: string; data: string }>;
  resourceChecksum: string;
} {
  const js = new Map();
  const resources = new Map();
  const resourceChecksum = buffer.getASCII() || '';

  // Deserialize `resources`
  const resourcesSize = buffer.getUint8();
  for (let i = 0; i < resourcesSize; i += 1) {
    resources.set(buffer.getASCII(), {
      contentType: buffer.getASCII(),
      data: buffer.getASCII(),
    });
  }

  // Deserialize `js`
  resources.forEach(({ contentType, data }, name) => {
    if (contentType === 'application/javascript') {
      js.set(name, data);
    }
  });

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
  // `StaticDataView` is able to resize itself dynamically if needed.
  const buffer = new StaticDataView(8000000);

  buffer.pushUint8(ENGINE_VERSION);
  buffer.pushUint8(Number(engine.enableOptimizations));
  buffer.pushUint8(Number(engine.loadCosmeticFilters));
  buffer.pushUint8(Number(engine.loadNetworkFilters));
  buffer.pushUint8(Number(engine.optimizeAOT));

  buffer.pushUint32(Number(engine.size));

  // Resources (js, resources)
  serializeResources(engine, buffer);

  // Lists
  serializeLists(buffer, engine.lists);

  // Buckets
  serializeNetworkFilterBucket(engine.filters, buffer);
  serializeNetworkFilterBucket(engine.exceptions, buffer);
  serializeNetworkFilterBucket(engine.importants, buffer);
  serializeNetworkFilterBucket(engine.redirects, buffer);
  serializeNetworkFilterBucket(engine.csp, buffer);

  serializeCosmeticFilterBucket(engine.cosmetics, buffer);

  return buffer.crop();
}

function deserializeEngine(serialized: Uint8Array): Engine {
  const buffer = new StaticDataView(0, serialized);

  // Before starting deserialization, we make sure that the version of the
  // serialized engine is the same as the current source code. If not, we start
  // fresh and create a new engine from the lists.
  const serializedEngineVersion = buffer.getUint8();
  if (ENGINE_VERSION !== serializedEngineVersion) {
    throw new Error('serialized engine version mismatch');
  }

  // Create a new engine with same options
  const options = {
    enableOptimizations: Boolean(buffer.getUint8()),
    loadCosmeticFilters: Boolean(buffer.getUint8()),
    loadNetworkFilters: Boolean(buffer.getUint8()),
    optimizeAOT: Boolean(buffer.getUint8()),
  };
  const engine = new Engine(options);
  engine.size = buffer.getUint32();

  // Deserialize resources
  const { js, resources, resourceChecksum } = deserializeResources(buffer);

  engine.js = js;
  engine.resources = resources;
  engine.resourceChecksum = resourceChecksum;

  // Deserialize lists + filters
  const { lists, networkFilters, cosmeticFilters } = deserializeLists(buffer);

  engine.lists = lists;

  // Deserialize buckets
  engine.filters = deserializeNetworkFilterBucket(buffer, networkFilters);
  engine.exceptions = deserializeNetworkFilterBucket(buffer, networkFilters);
  engine.importants = deserializeNetworkFilterBucket(buffer, networkFilters);
  engine.redirects = deserializeNetworkFilterBucket(buffer, networkFilters);
  engine.csp = deserializeNetworkFilterBucket(buffer, networkFilters);
  engine.cosmetics = deserializeCosmeticFilterBucket(buffer, cosmeticFilters);

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
