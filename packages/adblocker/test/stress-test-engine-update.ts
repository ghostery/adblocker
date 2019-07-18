/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

/**
 * This script can be used to stress-test the adblocker and validate our filter
 * builder at the same time. In a nutshell, it will download all the supported
 * lists (available on CDN), as well as all the possible diffs from one version
 * to the next for each list then perform the following:
 *
 * 1. check: FiltersEngine can be initialized from list
 * 2. check: FiltersEngine can be updated with diff
 * 3. check: serialized version of FiltersEngine is byte-identical after update
 * 4. check: serialized versions can be de-serialized into the same FiltersEngine
 * 5. check: no ID collisions for filters
 */

import axios from 'axios';
import { brotliDecompressSync } from 'zlib';
import {
  Config,
  FiltersEngine,
  generateDiff,
  getLinesWithFilters,
  parseFilter,
} from '../adblocker';
import { typedArrayEqual } from './utils';

/**
 * Convert `option` into its normalized version, if any. Otherwise return the
 * option un-changed. For example `stylesheet` will be normalized to `css`.
 * This particular helper could eventually be included in the adblocker library
 * directly but it is not yet clear if the expected performance overhead is
 * worth it.
 *
 * This transformation is needed so that we can actually detect diffs. In some
 * cases, filters are simply migrated to new option: 'foo$stylesheet' to
 * 'foo$css'. This is conceptually the exact same filter but the original
 * string is different so the FiltersEngine before and after update would
 * contain the same filters except in `debug` mode where the rawLine of this
 * particular filter would not match.
 */
function replacer(option: string): string {
  switch (option) {
    case 'third-party':
      return '3p';
    case 'first-party':
      return '1p';
    case 'object-subrequest':
      return 'object';
    case 'stylesheet':
      return 'css';
    case 'subdocument':
      return 'frame';
    case 'xmlhttprequest':
      return 'xhr';
    case 'document':
      return 'doc';
    default:
      return 'option';
  }
}

/**
 * Normalize a raw filter by replacing options with their canonical forms. For
 * example `||foo.com$stylesheet,first-party,xhr` would be normalized to
 * `||foo.com$css,1p,xhr`.
 */
const REGEX = /third-party|first-party|object-subrequest|stylesheet|subdocument|xmlhttprequest|document/g;
function normalizeFilters(rawFilter: string): string {
  const indexOfOptions = rawFilter.lastIndexOf('$');
  if (indexOfOptions === -1) {
    return rawFilter;
  }

  REGEX.lastIndex = indexOfOptions;
  return rawFilter.replace(REGEX, replacer);
}

/**
 * Global config used for all `FiltersEngine`. This allows to change options
 * globally without having to change all used configs.
 */
const ENGINE_CONFIG = new Config({
  debug: true,
});

/**
 * Make sure instances of CosmeticFilter and NetworkFilter from strings in
 * `filters` do not yield any IDs collision. In otherwise, check that there are
 * not any two filters from `filters` with the same ID.
 */
function checkIdCollisions(filters: Set<string>): string[] {
  const collisions: string[] = [];

  const ids: Map<number, string> = new Map();
  for (const line of Array.from(filters)) {
    const filter = parseFilter(line);
    if (filter !== null) {
      const id = filter.getId();
      if (ids.has(id)) {
        collisions.push(`${line} collides with ${ids.get(id)}`);
      } else {
        ids.set(id, line);
      }
    }
  }

  return collisions;
}

/**
 * Given two sets of filters (in raw string form), return a list of differences
 * between them (i.e.: filters in one set but not the other).
 */
function filtersDiff(
  name1: string,
  filters1: Set<string>,
  name2: string,
  filters2: Set<string>,
): string[] {
  const differences: string[] = [];
  for (const f of Array.from(filters1)) {
    if (!filters2.has(f)) {
      differences.push(`Filter in ${name1} but not ${name2}: ${f}`);
    }
  }

  for (const f of Array.from(filters2)) {
    if (!filters1.has(f)) {
      differences.push(`Filter in ${name2} but not ${name1}: ${f}`);
    }
  }

  return differences;
}

async function getMeta(url: string): Promise<any> {
  const meta = (await axios.get(url)).data;
  if (typeof meta === 'string') {
    const buffer = Buffer.from(
      (await axios.get(url, {
        responseType: 'arraybuffer',
      })).data,
    );
    return JSON.parse(brotliDecompressSync(buffer).toString('utf-8'));
  }

  return meta;
}

/**
 * Return the CDN URL of a specific revision `rev` (a hash) of subscription `list` (e.g. 'easylist').
 */
function urlOfRevision(list: string, rev: string): string {
  return `https://cdn.cliqz.com/adblocker/resources/${list}/${rev}/list.txt`;
}

/**
 * Fetch a list from CDN (given its URL). Apart from performing the fetching,
 * we also take care of detecting if the list was compressed using brotli
 * (which was the case before; then we switched to gzip for broader
 * compatibility).
 */
const REVISIONS_CACHE: Map<string, string> = new Map();
async function getRevision(url: string): Promise<string> {
  const cached = REVISIONS_CACHE.get(url);
  if (cached !== undefined) {
    return cached;
  }

  let data = (await axios.get(url)).data;
  if (!data.startsWith('[Ad')) {
    const buffer = Buffer.from(
      (await axios.get(url, {
        responseType: 'arraybuffer',
      })).data,
    );

    try {
      data = brotliDecompressSync(buffer).toString('utf-8');
    } catch (ex) {
      // Data is probably already decompressed
    }
  }

  REVISIONS_CACHE.set(url, data);

  return data;
}

/**
 * Return a set of filters (in their raw string form) from raw list. Also takes
 * care of normalizing options (e.g.: `stylesheet` -> `css`).
 */
function getFiltersFromList(list: string): Set<string> {
  return new Set(Array.from(getLinesWithFilters(list, ENGINE_CONFIG)).map(normalizeFilters));
}

/**
 * Return set of filters (in their raw string form) from a `FiltersEngine` instance.
 */
function getFiltersFromEngine(engine: FiltersEngine): Set<string> {
  const { networkFilters, cosmeticFilters } = engine.getFilters();

  return new Set([
    ...networkFilters.map(({ rawLine }) => normalizeFilters(rawLine as string)),
    ...cosmeticFilters.map(({ rawLine }) => normalizeFilters(rawLine as string)),
  ]);
}

/**
 * Return a serialized version of the `FiltersEngine` instance initialized from
 * `list`. Takes care of caching engines initialized from the same list and
 * return a copy of the serialized version to make sure no mutation is
 * possible.
 */
const ENGINES_CACHE: Map<string, Uint8Array> = new Map();
function getEngineFromList(list: string): Uint8Array {
  const cached = ENGINES_CACHE.get(list);
  if (cached !== undefined) {
    return cached.slice();
  }

  // Create FiltersEngine instance
  const engine = new FiltersEngine({ config: ENGINE_CONFIG });
  engine.updateFromDiff({
    added: Array.from(getFiltersFromList(list)),
  });
  const serialized = engine.serialize();

  // Cache for next time
  ENGINES_CACHE.set(list, serialized);

  return serialized.slice();
}

interface ITestCase {
  currentList: string;
  currentRevision: string;
  previousList: string;
  previousRevision: string;
}

/**
 * Fetch all versions of subscription `list` as well as all the available
 * updates (i.e.: diffs) from CDN. These will then be used to make sure all
 * updates are valid and that FiltersEngine can always be updated from them.
 */
async function collectTestCases(list: string) {
  const cases: Array<{
    currentRevision: string;
    previousRevision: string;
  }> = [];
  const meta = await getMeta(`https://cdn.cliqz.com/adblocker/resources/${list}/metadata.json`);
  const revisions: Set<string> = new Set();

  // Append current revision (the most recent one)
  const previousRevisions = [...meta.previousRevisions, meta.latestRevision];

  // Skip the first one which will not have any previous rev
  for (let i = 1; i < previousRevisions.length; i += 1) {
    const currentRevision = previousRevisions[i];
    revisions.add(currentRevision);
    for (let j = Math.max(i - 7, 0); j < i; j += 1) {
      const previousRevision = previousRevisions[j];
      revisions.add(previousRevision);
      cases.push({
        currentRevision,
        previousRevision,
      });
    }
  }

  // Fetch revisions
  await Promise.all(
    Array.from(revisions).map((revision) => getRevision(urlOfRevision(list, revision))),
  );

  const testCases: ITestCase[] = [];
  for (const { previousRevision, currentRevision } of cases) {
    const previousList = REVISIONS_CACHE.get(urlOfRevision(list, previousRevision));
    const currentList = REVISIONS_CACHE.get(urlOfRevision(list, currentRevision));

    if (previousList !== undefined && currentList !== undefined) {
      testCases.push({
        currentList,
        currentRevision,
        previousList,
        previousRevision,
      });
    }
  }

  return testCases;
}

/**
 * Start stress-test!
 */
async function run() {
  for (const list of [
    'cliqz-filters',
    'easylist',
    'easyprivacy',
    'plowe-0',
    'ublock-abuse',
    'ublock-badware',
    'ublock-filters',
    'ublock-privacy',
    'ublock-unbreak',
    'whotracksme-filters',
  ]) {
    console.log(`> ${list}`);
    const testCases = await collectTestCases(list);
    REVISIONS_CACHE.clear(); // free memory

    for (const { previousRevision, currentRevision, currentList, previousList } of testCases) {
      console.log(` + ${previousRevision} => ${currentRevision}`);

      // Generate diff between two versions
      let diff = generateDiff(previousList, currentList, ENGINE_CONFIG);
      diff = {
        added: diff.added.map(normalizeFilters),
        removed: diff.removed.map(normalizeFilters),
      };

      // Check that previous rev and current rev do not yield the same Engine
      const currentEngineSerialized = getEngineFromList(currentList);
      const previousEngineSerialized = getEngineFromList(previousList);
      const previousEngine = FiltersEngine.deserialize(previousEngineSerialized);

      if (typedArrayEqual(currentEngineSerialized, previousEngineSerialized)) {
        throw new Error('Expected engines to not be equal');
      }

      // Update `previousEngine` with diff and expect to find `currentEngine`
      const updated = previousEngine.updateFromDiff(diff);
      if (updated === false) {
        throw new Error('Expected engine to have been updated');
      }

      // Check filters are the same
      const filtersFromList = getFiltersFromList(currentList);

      const collisions = checkIdCollisions(filtersFromList);
      if (collisions.length !== 0) {
        console.log('Found ID collisions');
        for (const collision of collisions) {
          console.log(collision);
        }
      }

      const filtersFromCurrentEngine = getFiltersFromEngine(
        FiltersEngine.deserialize(currentEngineSerialized),
      );
      const filtersFromUpdatedEngine = getFiltersFromEngine(previousEngine);

      const diff1 = filtersDiff('fromList', filtersFromList, 'fromFull', filtersFromCurrentEngine);
      if (diff1.length !== 0) {
        console.log('Found discrepancy in filters');
        for (const difference of diff1) {
          console.log(difference);
        }
      }

      const diff2 = filtersDiff(
        'fromList',
        filtersFromList,
        'fromUpdated',
        filtersFromUpdatedEngine,
      );
      if (diff2.length !== 0) {
        console.log('Found discrepancy in filters');
        for (const difference of diff2) {
          console.log(difference);
        }
      }

      const updatedEngineSerialized = previousEngine.serialize();
      if (typedArrayEqual(updatedEngineSerialized, currentEngineSerialized) === false) {
        throw new Error('Expected serialized engines to be equal');
      }

      // Make sure we can re-serialize on top of updated engine
      const reSerialized = FiltersEngine.deserialize(updatedEngineSerialized).serialize();
      if (typedArrayEqual(reSerialized, currentEngineSerialized) === false) {
        throw new Error('Expected re-serialized engines to be equal');
      }
    }

    ENGINES_CACHE.clear();
  }
}

run();
