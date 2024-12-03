import { exec } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { cpus } from 'node:os';
import { promisify } from 'node:util';

const execPrem = promisify(exec);

const KINDS = [
  'network-csp',
  'network-redirect',
  'network-filter',
  'network-hostname',
  'cosmetic-selector',
  'raw-network',
  'raw-cosmetic',
] as const;
type Kind = (typeof KINDS)[number];

const SCRIPT_PATH = './tools/generate_compression_codebook.ts';

const IS_CI = typeof process.env['CI'] !== 'undefined';

async function runCodebookGeneration(kind: Kind, maxNgram?: number) {
  let cmd = `tsx '${SCRIPT_PATH}' '${kind}'`;
  if (maxNgram !== undefined) {
    cmd += ` '${maxNgram}'`;
  }

  try {
    await execPrem(cmd);
    return false;
  } catch (error) {
    console.error(
      `[ERROR] Failed to generate codebook for the kind of "${kind}" with "maxNgram" of "${maxNgram}"`,
      error,
    );
    return true;
  }
}

async function getScriptContent() {
  return readFile(SCRIPT_PATH, 'utf8');
}

async function tryCodebookGeneration(kind: Kind) {
  const pattern = new RegExp(`if \\(kind === '${kind}'\\) {\n +maxNgram = (\\d+);`);
  const match = pattern.exec(await getScriptContent());
  if (IS_CI === false || match === null) {
    console.warn(
      `[WARN] Skipping automatic search for maximum "maxNgram" value as looking up pre-defined "maxNgram" value for the kind "${kind}" failed or the environment variable "CI" was not set!`,
    );

    return runCodebookGeneration(kind);
  }

  const [fullMatch, maxNgramLiteral] = match;
  let maxNgramSize = parseInt(maxNgramLiteral, 10);

  for (;;) {
    console.log(`[INFO] Trying "maxNgram" of "${maxNgramSize}" for the kind "${kind}"...`);

    const crashed = await runCodebookGeneration(kind, maxNgramSize);
    if (crashed === false) {
      break;
    }

    --maxNgramSize;
  }

  const foundMaxNgramLiteral = maxNgramSize.toString();
  if (maxNgramLiteral !== foundMaxNgramLiteral) {
    await writeFile(
      SCRIPT_PATH,
      (await getScriptContent()).replace(
        fullMatch,
        fullMatch.replace(maxNgramLiteral, foundMaxNgramLiteral),
      ),
      'utf8',
    );
  }

  return;
}

type Task = (...args: any[]) => Promise<any>;

class Threads {
  tasks: Task[] = [];
  processes: number = 0;

  constructor(readonly maxConcurrency: number = cpus().length) {
    console.log(`[INFO] Limiting maximum concurrency to "${maxConcurrency}"...`);
  }

  public enqueue(task: Task) {
    this.tasks.push(task);

    // Create process which will continue to consume tasks until they run out.
    if (this.processes >= this.maxConcurrency) {
      return;
    }
    void this.process();
  }

  private async process() {
    this.processes++;

    while (this.tasks.length > 0) {
      const task = this.tasks.shift();
      if (task === undefined) {
        break;
      }

      await task();
    }

    this.processes--;
  }
}

void (async function () {
  const threads = new Threads();

  for (const kind of KINDS) {
    async function task() {
      tryCodebookGeneration(kind);
    }

    threads.enqueue(task);
  }
})();
