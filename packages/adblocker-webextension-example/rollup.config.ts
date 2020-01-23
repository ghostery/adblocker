/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';

export default [
  {
    input: './dist/cjs/background.js',
    output: {
      file: './dist/background.iife.js',
      format: 'iife',
      name: 'adblocker',
      sourcemap: true,
    },
    plugins: [
      commonjs(),
      resolve(),
      sourcemaps(),
    ],
  },
  {
    input: './dist/cjs/content-script.js',
    output: {
      file: './dist/content-script.iife.js',
      format: 'iife',
      name: 'adblocker',
      sourcemap: true,
    },
    plugins: [
      commonjs(),
      resolve(),
      sourcemaps(),
    ],
  },
];
