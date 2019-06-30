/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import compiler from '@ampproject/rollup-plugin-closure-compiler';
import resolve from 'rollup-plugin-node-resolve';

const plugins = [
  resolve({
    modulesOnly: true,
  }),
  compiler({
    language_out: 'NO_TRANSPILE',
    warning_level: 'DEFAULT',
  }),
];

export default [
  {
    input: './build/es6/background.js',
    output: {
      file: './dist/background.iife.js',
      format: 'iife',
    },
    plugins,
  },
  {
    input: './build/es6/content-script.js',
    output: {
      file: './dist/content-script.iife.js',
      format: 'iife',
    },
    plugins,
  },
];
