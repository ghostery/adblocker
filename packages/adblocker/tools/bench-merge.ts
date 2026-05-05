/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import {
  constants,
  performance,
  PerformanceObserver,
  type PerformanceEntry,
} from 'node:perf_hooks';

import { FiltersEngine, adsLists, adsAndTrackingLists, fullLists } from '../src/index.js';

const PREFIX =
  'https://raw.githubusercontent.com/ghostery/adblocker/master/packages/adblocker/assets';

const LISTS = {
  ads: adsLists,
  tracking: adsAndTrackingLists,
  full: fullLists,
};

type ListName = keyof typeof LISTS;
type GcKind = 'major' | 'minor' | 'incremental' | 'weakcb' | 'other';

interface GcPerformanceEntry extends PerformanceEntry {
  kind?: number;
  detail?: {
    kind?: number;
  };
}

interface GcEvent {
  kind: GcKind;
  durationMs: number;
}

interface GcStats {
  count: number;
  durationMs: number;
  byKind: Record<GcKind, number>;
}

interface RunStats {
  timeMs: number;
  heapUsedDelta: number;
  rssDelta: number;
  peakHeapUsed: number;
  peakRss: number;
  forcedGcMs: number | null;
  retainedHeapUsed: number | null;
  retainedRss: number | null;
  gc: GcStats;
}

function getListName(): ListName {
  const name = process.argv[2] ?? 'ads';
  if (name === 'ads' || name === 'tracking' || name === 'full') {
    return name;
  }

  throw new Error(`Unknown list set "${name}". Expected one of: ads, tracking, full.`);
}

function getRuns(): number {
  const rawRuns = process.env['BENCH_MERGE_RUNS'];
  const runs = Number(rawRuns ?? 10);
  if (!Number.isInteger(runs) || runs <= 0) {
    throw new Error(`Invalid BENCH_MERGE_RUNS "${rawRuns}". Expected a positive integer.`);
  }

  return runs;
}

function loadFromLocalAssets(lists: string[]): string[] {
  return lists.map((path) =>
    readFileSync(join(import.meta.dirname, '..', 'assets', path.slice(PREFIX.length)), 'utf-8'),
  );
}

function formatBytes(bytes: number): string {
  const sign = bytes < 0 ? '-' : '';
  return `${sign}${(Math.abs(bytes) / 1024 / 1024).toFixed(2)}MiB`;
}

function formatMemory(memory: NodeJS.MemoryUsage): string {
  return `rss=${formatBytes(memory.rss)} heapUsed=${formatBytes(memory.heapUsed)} heapTotal=${formatBytes(
    memory.heapTotal,
  )} external=${formatBytes(memory.external)}`;
}

function canRunGarbageCollector(): boolean {
  return typeof (globalThis as typeof globalThis & { gc?: () => void }).gc === 'function';
}

function runGarbageCollector(): void {
  (globalThis as typeof globalThis & { gc?: () => void }).gc?.();
}

function getGcKind(entry: GcPerformanceEntry): GcKind {
  const kind = entry.detail?.kind ?? entry.kind;

  switch (kind) {
    case constants.NODE_PERFORMANCE_GC_MAJOR:
      return 'major';
    case constants.NODE_PERFORMANCE_GC_MINOR:
      return 'minor';
    case constants.NODE_PERFORMANCE_GC_INCREMENTAL:
      return 'incremental';
    case constants.NODE_PERFORMANCE_GC_WEAKCB:
      return 'weakcb';
    default:
      return 'other';
  }
}

function createGcStats(): GcStats {
  return {
    count: 0,
    durationMs: 0,
    byKind: {
      major: 0,
      minor: 0,
      incremental: 0,
      weakcb: 0,
      other: 0,
    },
  };
}

function collectGcEvents(entries: PerformanceEntry[], events: GcEvent[]): void {
  for (const entry of entries) {
    if (entry.entryType === 'gc') {
      events.push({
        kind: getGcKind(entry),
        durationMs: entry.duration,
      });
    }
  }
}

function summarizeGcEvents(events: GcEvent[]): GcStats {
  const stats = createGcStats();

  for (const event of events) {
    stats.count += 1;
    stats.durationMs += event.durationMs;
    stats.byKind[event.kind] += 1;
  }

  return stats;
}

function formatGcStats(stats: GcStats): string {
  return `observed=count=${stats.count} total=${stats.durationMs.toFixed(2)}ms major=${stats.byKind.major} minor=${
    stats.byKind.minor
  } incremental=${stats.byKind.incremental} weakcb=${stats.byKind.weakcb} other=${stats.byKind.other}`;
}

function average(values: number[]): number {
  return values.reduce((total, value) => total + value, 0) / values.length;
}

function sumGcStats(stats: GcStats[]): GcStats {
  const total = createGcStats();

  for (const stat of stats) {
    total.count += stat.count;
    total.durationMs += stat.durationMs;
    total.byKind.major += stat.byKind.major;
    total.byKind.minor += stat.byKind.minor;
    total.byKind.incremental += stat.byKind.incremental;
    total.byKind.weakcb += stat.byKind.weakcb;
    total.byKind.other += stat.byKind.other;
  }

  return total;
}

function presentValues(values: Array<number | null>): number[] {
  return values.filter((value): value is number => value !== null);
}

function formatOptionalAverageAndMax(
  values: Array<number | null>,
  format: (value: number) => string,
): string {
  const present = presentValues(values);
  if (present.length === 0) {
    return 'unavailable';
  }

  return `${format(average(present))}/${format(Math.max(...present))}`;
}

function time(
  name: string,
  runs: number,
  gcObserver: PerformanceObserver,
  gcEvents: GcEvent[],
  cb: () => void,
): void {
  const stats: RunStats[] = [];

  const drainGcEvents = (): void => {
    collectGcEvents(gcObserver.takeRecords(), gcEvents);
  };

  for (let i = 0; i < runs; i += 1) {
    if (canRunGarbageCollector()) {
      runGarbageCollector();
    }
    drainGcEvents();

    const memoryBefore = process.memoryUsage();
    const gcStart = gcEvents.length;
    const start = performance.now();
    cb();
    const timeMs = performance.now() - start;
    const memoryAfter = process.memoryUsage();

    drainGcEvents();
    const gc = summarizeGcEvents(gcEvents.slice(gcStart));

    let forcedGcMs: number | null = null;
    let retainedHeapUsed: number | null = null;
    let retainedRss: number | null = null;

    if (canRunGarbageCollector()) {
      const gcStartTime = performance.now();
      runGarbageCollector();
      forcedGcMs = performance.now() - gcStartTime;
      drainGcEvents();

      const memoryAfterGc = process.memoryUsage();
      retainedHeapUsed = memoryAfterGc.heapUsed;
      retainedRss = memoryAfterGc.rss;
    }

    stats.push({
      timeMs,
      heapUsedDelta: memoryAfter.heapUsed - memoryBefore.heapUsed,
      rssDelta: memoryAfter.rss - memoryBefore.rss,
      peakHeapUsed: Math.max(memoryBefore.heapUsed, memoryAfter.heapUsed),
      peakRss: Math.max(memoryBefore.rss, memoryAfter.rss),
      forcedGcMs,
      retainedHeapUsed,
      retainedRss,
      gc,
    });
  }

  const times = stats.map((stat) => stat.timeMs);
  const heapUsedDeltas = stats.map((stat) => stat.heapUsedDelta);
  const rssDeltas = stats.map((stat) => stat.rssDelta);
  const min = Math.min(...times);
  const avg = average(times);
  const avgHeapUsedDelta = average(heapUsedDeltas);
  const avgRssDelta = average(rssDeltas);
  const maxHeapUsedDelta = Math.max(...heapUsedDeltas);
  const maxRssDelta = Math.max(...rssDeltas);
  const peakHeapUsed = Math.max(...stats.map((stat) => stat.peakHeapUsed));
  const peakRss = Math.max(...stats.map((stat) => stat.peakRss));
  const totalGc = sumGcStats(stats.map((stat) => stat.gc));

  console.log(`${name}: min=${min.toFixed(2)}ms avg=${avg.toFixed(2)}ms`);
  console.log(
    `  memory: heapΔ(avg/max)=${formatBytes(
      avgHeapUsedDelta,
    )}/${formatBytes(maxHeapUsedDelta)} rssΔ(avg/max)=${formatBytes(avgRssDelta)}/${formatBytes(
      maxRssDelta,
    )} peakHeap=${formatBytes(peakHeapUsed)} peakRss=${formatBytes(peakRss)}`,
  );
  console.log(
    `  gc: ${formatGcStats(totalGc)} forced(avg/max)=${formatOptionalAverageAndMax(
      stats.map((stat) => stat.forcedGcMs),
      (value) => `${value.toFixed(2)}ms`,
    )} retainedHeap(avg/max)=${formatOptionalAverageAndMax(
      stats.map((stat) => stat.retainedHeapUsed),
      formatBytes,
    )} retainedRss(avg/max)=${formatOptionalAverageAndMax(
      stats.map((stat) => stat.retainedRss),
      formatBytes,
    )}`,
  );
}

(() => {
  const listName = getListName();
  const runs = getRuns();
  const gcEvents: GcEvent[] = [];
  const gcObserver = new PerformanceObserver((list) =>
    collectGcEvents(list.getEntries(), gcEvents),
  );
  gcObserver.observe({ entryTypes: ['gc'] });

  const memoryBeforeLoading = process.memoryUsage();
  const rawLists = loadFromLocalAssets(LISTS[listName]);
  const memoryAfterLoading = process.memoryUsage();
  const engines = rawLists.map((raw) =>
    FiltersEngine.parse(raw, {
      debug: false,
      enableCompression: true,
    }),
  );

  if (canRunGarbageCollector()) {
    runGarbageCollector();
  }
  collectGcEvents(gcObserver.takeRecords(), gcEvents);
  gcEvents.length = 0;

  console.log(`Merge benchmark: ${listName}`);
  console.log(`Sources: ${engines.length}`);
  console.log(`Runs: ${runs}`);
  console.log(
    `GC exposed: ${
      canRunGarbageCollector()
        ? 'yes'
        : 'no (run node with --expose-gc to include forced GC/retained heap)'
    }`,
  );
  console.log(`Memory before loading: ${formatMemory(memoryBeforeLoading)}`);
  console.log(`Memory after loading:  ${formatMemory(memoryAfterLoading)}`);
  console.log(`Memory after parsing:  ${formatMemory(process.memoryUsage())}`);

  try {
    time('legacy merge', runs, gcObserver, gcEvents, () => {
      FiltersEngine.merge(engines);
    });

    time('binary merge', runs, gcObserver, gcEvents, () => {
      FiltersEngine.merge(engines, { useBinaryMerge: true });
    });
  } finally {
    gcObserver.disconnect();
  }
})();
