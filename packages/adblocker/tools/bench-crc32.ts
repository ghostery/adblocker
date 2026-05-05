import crc32 from '../src/crc32.js';
import crc32Legacy from '../src/crc32_legacy.js';

type Crc32Fn = (buf: Uint8Array, start: number, end: number) => number;

interface BenchmarkCase {
  readonly name: string;
  readonly size: number;
  readonly iterations: number;
}

const CASES: BenchmarkCase[] = [
  { name: 'tiny', size: 64, iterations: 2_000_000 },
  { name: 'small', size: 1024, iterations: 500_000 },
  { name: 'medium', size: 64 * 1024, iterations: 10_000 },
  { name: 'large', size: 1024 * 1024, iterations: 1_000 },
];

function makeBuffer(size: number): Uint8Array {
  const buf = new Uint8Array(size);

  for (let i = 0; i < buf.length; i += 1) {
    buf[i] = (i * 31 + (i >>> 3)) & 0xff;
  }

  return buf;
}

function runBenchmark(
  fn: Crc32Fn,
  buf: Uint8Array,
  iterations: number,
): { checksum: number; elapsedMs: number } {
  let checksum = 0;

  for (let i = 0; i < 1_000; i += 1) {
    checksum = (checksum + fn(buf, 0, buf.length)) >>> 0;
  }

  const start = process.hrtime.bigint();

  for (let i = 0; i < iterations; i += 1) {
    checksum = (checksum + fn(buf, 0, buf.length)) >>> 0;
  }

  const end = process.hrtime.bigint();

  return {
    checksum: checksum >>> 0,
    elapsedMs: Number(end - start) / 1_000_000,
  };
}

function formatThroughput(bytes: number, elapsedMs: number): string {
  const mb = bytes / 1024 / 1024;
  const seconds = elapsedMs / 1000;

  return `${(mb / seconds).toFixed(2)} MiB/s`;
}

for (const benchmarkCase of CASES) {
  const buf = makeBuffer(benchmarkCase.size);
  const bytes = benchmarkCase.size * benchmarkCase.iterations;

  const current = runBenchmark(crc32, buf, benchmarkCase.iterations);
  const legacy = runBenchmark(crc32Legacy, buf, benchmarkCase.iterations);
  const speedup = legacy.elapsedMs / current.elapsedMs;

  console.log(
    `${benchmarkCase.name} (${benchmarkCase.size} bytes × ${benchmarkCase.iterations}):`,
  );
  console.log(
    `  current: ${current.elapsedMs.toFixed(2)} ms, ${formatThroughput(bytes, current.elapsedMs)}, checksum=${current.checksum}`,
  );
  console.log(
    `  legacy:  ${legacy.elapsedMs.toFixed(2)} ms, ${formatThroughput(bytes, legacy.elapsedMs)}, checksum=${legacy.checksum}`,
  );
  console.log(`  speedup: ${speedup.toFixed(2)}x`);
}
