/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs'
import { copyFile, rm } from 'fs/promises';
import { existsSync } from 'fs';

const dtsPath = './dist/types/src/index.d.ts'

export default
  {
    input: './src/index.ts',
    output: [
      {
        file: './dist/index.cjs',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: './dist/index.js',
        format: 'esm',
        sourcemap: true,
      }
    ],
    plugins: [
      nodeResolve({
        browser: true,
        resolveOnly(module) {
          return module !== 'electron'
        },
      }),
      commonjs(),
      typescript({
        compilerOptions: {
          declarationDir: './dist/types',
        },
      }),
      {
        name: 'cts',
        writeBundle: {
          sequential: true,
          order: 'post',
          async handler() {
            if (existsSync(dtsPath)) {
              const ctsPath = dtsPath.replace(/\.d\.ts$/, '.d.cts');
              await copyFile(dtsPath, ctsPath);
              console.log('[cts] ' + dtsPath + ' → ' + ctsPath);
            } else {
              console.error('[cts] source declaration: ' + dtsPath + ' was not found!');
              console.error('[cts] check if the previous build stage has ended gracefully!');
            }
          },
        },
        options: {
          sequential: true,
          order: 'pre',
          async handler() {
            if (existsSync(dtsPath)) {
              await rm(dtsPath);
              console.warn('[cts] cleaned up ' + dtsPath);
            }
          },
        },
      }
    ],
  };
