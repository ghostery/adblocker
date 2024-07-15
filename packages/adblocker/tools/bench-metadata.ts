import { getRawTrackerDB } from '../test/utils.js';
import { FiltersEngine, NetworkFilter } from '../src/index.js';

(() => {
  const rawTrackerDB = getRawTrackerDB();

  // Measure creating engine from TrackerDB release
  {
    const times = [];
    for (let i = 0; i < 1; i += 1) {
      const t0 = Date.now();
      FiltersEngine.fromTrackerDB(rawTrackerDB);
      const t1 = Date.now();
      times.push(t1 - t0);
    }
    console.log('Create TrackerDB engine:', Math.min(...times), 'milliseconds');
  }

  // Measure serialization and deserialization
  {
    const buffer = new Uint8Array(2_000_000);
    const serializationTimes = [];
    const deserializationTimes = [];
    for (let i = 0; i < 100; i += 1) {
      const engine = FiltersEngine.fromTrackerDB(rawTrackerDB);

      const st0 = Date.now();
      const serialized = engine.serialize(buffer);
      const st1 = Date.now();
      serializationTimes.push(st1 - st0);

      const dt0 = Date.now();
      FiltersEngine.deserialize(serialized);
      const dt1 = Date.now();
      deserializationTimes.push(dt1 - dt0);
    }

    console.log('Serialize TrackerDB engine:', Math.min(...serializationTimes), 'milliseconds');
    console.log(
      'Deserialize TrackerDB engine:',
      Math.min(...deserializationTimes),
      'milliseconds',
    );
  }

  // Measure matching time
  {
    const matchingTimes = [];

    const inputs: NetworkFilter[] = [];
    for (const pattern of FiltersEngine.fromTrackerDB(rawTrackerDB)?.metadata?.getPatterns() ||
      []) {
      for (const domain of pattern.domains) {
        inputs.push(NetworkFilter.parse(`||${domain}^`) as NetworkFilter);
      }
      for (const filter of pattern.filters) {
        inputs.push(NetworkFilter.parse(filter) as NetworkFilter);
      }
    }

    for (let i = 0; i < 1; i += 1) {
      const engine = FiltersEngine.fromTrackerDB(rawTrackerDB);

      const t0 = Date.now();
      for (const input of inputs) {
        if (!engine.metadata?.fromFilter(input)) {
          console.error('This should never happen!');
        }
      }
      const t1 = Date.now();
      matchingTimes.push(t1 - t0);
    }

    console.log(
      'Matching against TrackerDB engine:',
      Math.min(...matchingTimes) / inputs.length,
      'milliseconds per call to `fromFilter(...)`',
    );
    console.log(
      `Total to match all domains and filters from TrackerDB (${inputs.length}):`,
      Math.min(...matchingTimes),
      'milliseconds',
    );
  }
})();
