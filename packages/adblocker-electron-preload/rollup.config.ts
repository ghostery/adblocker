/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import resolve from '@rollup/plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: './dist/src/preload.js',
  external: ['electron'],
  output: [
    {
      file: './dist/cjs/preload.cjs',
      format: 'commonjs',
      sourcemap: true,
    },
    {
      file: './dist/esm/preload.cjs',
      format: 'esm',
      sourcemap: true,
    },
  ],
  plugins: [
    resolve({
      mainFields: ['main'],
    }),
    commonjs(),
    sourcemaps(),
  ],
};
