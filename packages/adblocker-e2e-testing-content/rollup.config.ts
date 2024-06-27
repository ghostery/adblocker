/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';

export default [
  {
    input: './dist/src/script.js',
    output: {
      file: './dist/script.iife.min.js',
      format: 'iife',
      name: 'script',
      sourcemap: true,
    },
    plugins: [
      resolve(),
      terser({
        output: {
          comments: false,
        },
      }),
    ],
  },
];
