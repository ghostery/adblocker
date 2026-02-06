/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { expect } from 'chai';
import 'mocha';
import { createReadStream, mkdtemp } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { rm, writeFile } from 'node:fs/promises';
import { fork, spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { ENGINE_VERSION, FiltersEngine, Config } from '../src/index.js';
import { allLists } from './utils.js';

async function run(cwd: string, cmd: string, args: string[]) {
  return new Promise<string>((resolve, reject) => {
    const process = spawn(cmd, args, {
      cwd,
    });
    const chunks: string[] = [];
    process.stdout.on('data', (chunk) => chunks.push(chunk));
    process.once('error', (error) => {
      reject(error);
    });
    process.once('close', (code) => {
      if (code === null) {
        reject(new Error('Child process terminated!'));
        return;
      }
      if (code !== 0) {
        reject(new Error(`Child process terminated with non-zero exit code: ${code}`));
        return;
      }
      resolve(chunks.join('\n'));
    });
  });
}

function hashFile(filePath: string, algorithm: string = 'sha256') {
  return new Promise((resolve, reject) => {
    const hash = createHash(algorithm);
    const stream = createReadStream(filePath);

    stream.once('error', reject);
    stream.once('end', () => resolve(hash.digest('hex')));
    stream.pipe(hash);
  });
}

type Post = {
  filters: string;
  config: Partial<Config>;
  outpath: string;
};

// This script must be "self-containable" as it will be called using child_process.
// Please, use dynamic import to bring dependencies.
async function builder() {
  const fs = await import('node:fs/promises');
  const adblocker = await import('@ghostery/adblocker');

  process.on('message', async ({ id, data }: { id: number; data: Post }) => {
    const engine = adblocker.FiltersEngine.parse(
      data.filters,
      // @ts-expect-error This should use the npm:@ghostery/adblocker and it is not
      // considered predictable anymore.
      data.config,
    );
    const buf = Buffer.alloc(engine.getSerializedSize());
    engine.serialize(buf);

    await fs.writeFile(data.outpath, buf);

    process.send!({ id, payload: adblocker.ENGINE_VERSION });
  });
}

async function createBuilder(version: string = 'latest') {
  // Create tempdir
  const dir = await new Promise<string>((resolve, reject) => {
    mkdtemp(join(tmpdir(), 'ghostery-adblocker-'), (error, directory) => {
      if (error) {
        reject(error);
      }

      resolve(directory);
    });
  });

  // Setup application
  await writeFile(
    join(dir, 'package.json'),
    JSON.stringify({
      type: 'module',
      dependencies: {
        '@ghostery/adblocker': version,
      },
    }),
    'utf8',
  );
  await writeFile(join(dir, 'index.js'), `(${builder.toString()})()`, 'utf8');

  // Run `npm install`
  await run(dir, 'npm', ['install']);

  // Prepare worker context for async messaging
  const tasks: [number, (payload: number) => void][] = [];
  let counter = 0;

  // Start worker
  const worker = fork(join(dir, 'index.js'));
  worker.on('message', ({ id, payload }: { id: number; payload: number }) => {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i][0] === id) {
        const callback = tasks[i][1];
        tasks.splice(i, 1);
        callback(payload);
        break;
      }
    }
  });
  worker.once('close', (code) => {
    // SIGINT from `cleanup()`
    if (code !== null) {
      throw new Error('Worker process exited with an unexpected exit code: ' + code);
    }
  });

  async function build(data: Omit<Post, 'outpath'>) {
    const token = Date.now().toString(36);

    const currentEngineExportPath = join(dir, `engine-current-${token}.bin`);
    const engine = FiltersEngine.parse(data.filters, data.config);
    const buf = Buffer.alloc(engine.getSerializedSize());
    engine.serialize(buf);
    await writeFile(currentEngineExportPath, buf);

    const previousEngineExportPath = join(dir, `engine-previous-${token}.bin`);
    const previousEngineVersion = await post({ ...data, outpath: previousEngineExportPath });

    return {
      currentEngineVersion: ENGINE_VERSION,
      currentEngineExportPath,
      previousEngineVersion,
      previousEngineExportPath,
    };
  }

  async function post(data: Partial<Post> & { outpath: Post['outpath'] }) {
    const id = counter++;

    return new Promise((resolve) => {
      function callback(payload: number) {
        resolve(payload);
      }

      tasks.push([id, callback]);
      worker.send({
        id,
        data,
      });
    });
  }

  async function cleanup() {
    // Kill the worker
    await new Promise<void>((resolve) => {
      worker.once('close', resolve);
      worker.kill('SIGINT');
    });

    // Remove tempdir
    await rm(dir, { recursive: true }).catch((error) => {
      console.error('Failed to create a tempdir on the path of', dir);
      throw error;
    });
  }

  return {
    build,
    post,
    cleanup,
  };
}

describe('migration', () => {
  let builder: Awaited<ReturnType<typeof createBuilder>>;

  before(async () => {
    builder = await createBuilder();
  });

  after(async () => {
    await builder.cleanup();
  });

  async function compareHash(filters: string, config: Partial<Config>) {
    const {
      currentEngineVersion,
      currentEngineExportPath,
      previousEngineVersion,
      previousEngineExportPath,
    } = await builder.build({
      filters,
      config,
    });

    const currentEngineHash = await hashFile(currentEngineExportPath);
    const previousEngineHash = await hashFile(previousEngineExportPath);

    if (currentEngineVersion === previousEngineVersion) {
      expect(currentEngineHash).to.be.eql(
        previousEngineHash,
        'Serialised engine binary hash between the current and npm version should be equal!',
      );
    } else {
      expect(currentEngineHash).not.to.be.eql(previousEngineHash);
    }
  }

  describe('ENGINE_VERSION', () => {
    // These tests are to describe side-effects of engine binary incompatibilities
    // between multiple adblocker library versions. If you're seeing errors, you
    // should increase the `ENGINE_VERSION` variable.

    it('assets', async () => {
      await compareHash(allLists, {
        loadPreprocessors: true,
        loadExtendedSelectors: true,
        // Running optimisations don't make sense as they depend on the output of
        // codebook generation from the assets. The option here is declared
        // explicitly to describe the potential side-effect.
        enableOptimizations: false,
      });
    });

    context('preprocessors', () => {
      it('preprocessors correctly serialize filter ID mappings', async () => {
        await compareHash(
          `
!#if env_ghostery
||foo.com^
||bar.com^$domain=baz.com
foo.com##a
bar.com##div
!#endif
||qux.com^
||quux.com^$domain=corge.com
qux.com##a
quux.com##div
`,
          { loadPreprocessors: true },
        );
      });
    });
  });
});
