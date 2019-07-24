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
    input: './build/es6/src/background.js',
    output: {
      file: './dist/background.iife.js',
      format: 'iife',
      name: 'adblocker',
    },
    plugins: [resolve()],
  },
  {
    input: './build/es6/src/content-script.js',
    output: {
      file: './dist/content-script.iife.js',
      format: 'iife',
      name: 'adblocker',
    },
    plugins: [resolve()],
  },
];
