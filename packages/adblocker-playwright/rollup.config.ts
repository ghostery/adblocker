/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';

export default [
  {
    input: './adblocker.ts',
    output: {
      file: './dist/adblocker.umd.min.js',
      format: 'umd',
      name: 'adblocker',
      sourcemap: true,
    },
    plugins: [
      typescript(),
      resolve(),
      terser({
        output: {
          comments: false,
        },
      }),
    ],
  },
  {
    input: './adblocker.ts',
    output: [
      {
        dir: './dist',
        format: 'esm',
        preserveModules: true,
        entryFileNames: '[name].js',
        sourcemap: true,
      },
      {
        dir: './dist',
        format: 'cjs',
        preserveModules: true,
        entryFileNames: '[name].cjs',
        sourcemap: true,
      },
    ],
    plugins: [
      // compilerOptions are here a workaround for @rollup/plugin-typescript not being able to emit declarations
      typescript({ compilerOptions: { declarationDir: 'dist/types' } }),
      copy({
        targets: [
          { src: 'dist/types/adblocker.d.ts', dest: 'dist/types', rename: 'adblocker.d.cts' },
        ],
        hook: 'writeBundle',
      }),
    ],
  },
];
