/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import compiler from '@ampproject/rollup-plugin-closure-compiler';
import resolve from 'rollup-plugin-node-resolve';

export default [
  // ES6 + UMD + CommonJS minified
  {
    input: './build/es6/index.js',
    output: [
      {
        file: './dist/index.esm.min.js',
        format: 'es',
        sourcemap: true,
      },
      {
        file: './dist/index.cjs.min.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: './dist/index.umd.min.js',
        format: 'umd',
        name: 'adblocker',
        sourcemap: true,
      },
    ],
    plugins: [
      resolve(),
      compiler({
        language_out: 'NO_TRANSPILE',
        warning_level: 'DEFAULT',
      }),
    ],
  },
];
