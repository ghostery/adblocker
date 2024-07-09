/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';

export default {
  input: './preload.ts',
  external: ['electron'],
  output: [
    {
      file: './dist/preload.js',
      format: 'esm',
      sourcemap: true,
    },
    {
      file: './dist/preload.cjs',
      format: 'cjs',
      sourcemap: true,
    },
  ],
  plugins: [
    resolve({
      mainFields: ['main'],
    }),
    commonjs(),
    // compilerOptions are here a workaround for @rollup/plugin-typescript not being able to emit declarations
    typescript({ compilerOptions: { declarationDir: './dist/types' } }),
    copy({
      targets: [
        { src: './dist/types/preload.d.ts', dest: './dist/types', rename: 'preload.d.cts' },
      ],
      hook: 'writeBundle',
    }),
  ],
};
