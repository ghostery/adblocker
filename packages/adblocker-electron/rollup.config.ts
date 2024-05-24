/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import resolve from '@rollup/plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: './dist/src/adblocker.js',
    output: {
      file: './dist/adblocker.umd.min.js',
      format: 'umd',
      name: 'adblocker',
      sourcemap: true,
    },
    plugins: [
      resolve(),
      sourcemaps(),
      terser({
        output: {
          comments: false,
        },
      }),
    ],
  },
  {
    input: './dist/src/adblocker.js',
    output: [
      {
        dir: './dist/esm',
        format: 'esm',
        preserveModules: true,
        entryFileNames: '[name].js',
      },
      {
        dir: './dist/cjs',
        format: 'cjs',
        preserveModules: true,
        entryFileNames: '[name].cjs',
      },
    ],
  },
];
