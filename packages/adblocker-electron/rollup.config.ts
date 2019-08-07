/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import resolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';

export default [
  {
    // CommonJs bundle for preload script
    external: ['electron', 'path'],
    input: './dist/es6/adblocker.js',
    output: {
      file: './dist/cjs/adblocker.js',
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [resolve({ preferBuiltins: true }), sourcemaps()],
  },
  {
    // CommonJs bundle for preload script
    external: ['electron'],
    input: './dist/es6/preload.js',
    output: {
      file: './dist/cjs/preload.js',
      format: 'cjs',
      sourcemap: true,
    },
    plugins: [resolve({ preferBuiltins: true }), sourcemaps()],
  },
];
