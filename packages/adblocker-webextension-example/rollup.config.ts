/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import resolve from 'rollup-plugin-node-resolve';

export default [
  {
    input: './dist/es6/background.js',
    output: {
      file: './dist/iife/background.js',
      format: 'iife',
      name: 'adblocker',
      sourcemap: true,
    },
    plugins: [resolve()],
  },
  {
    input: './dist/es6/content-script.js',
    output: {
      file: './dist/iife/content-script.js',
      format: 'iife',
      name: 'adblocker',
      sourcemap: true,
    },
    plugins: [resolve()],
  },
];
