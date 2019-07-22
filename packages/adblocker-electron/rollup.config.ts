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
  // ES6 + CommonJS minified
  {
    external: ['electron'],
    input: './build/es6/adblocker.js',
    output: [
      {
        file: './dist/adblocker.esm.min.js',
        format: 'es',
        sourcemap: true,
      },
      {
        file: './dist/adblocker.cjs.min.js',
        format: 'cjs',
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
  {
    external: ['electron'],
    input: './build/es6/content.js',
    output: [
      {
        file: './dist/content.min.js',
        format: 'cjs',
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
