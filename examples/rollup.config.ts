/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import compiler from '@ampproject/rollup-plugin-closure-compiler';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

const plugins = [
  resolve({
    preferBuiltins: false,
  }),
  commonjs(),
  compiler({
    language_out: 'NO_TRANSPILE',
    warning_level: 'DEFAULT',
  }),
];

export default [
  {
    input: './build/example/background.js',
    output: {
      file: 'background.iife.js',
      format: 'iife',
      name: 'adblocker',
    },
    plugins,
  },
  {
    input: './build/example/content-script.js',
    output: {
      file: 'content-script.iife.js',
      format: 'iife',
      name: 'adblocker',
    },
    plugins,
  },
];
