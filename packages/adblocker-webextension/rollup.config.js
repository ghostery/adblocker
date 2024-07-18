/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import terser from '@rollup/plugin-terser';

export default {
  input: './dist/esm/index.js',
  output: {
    file: './dist/adblocker.umd.min.js',
    format: 'umd',
    name: 'adblocker',
    sourcemap: true,
  },
  plugins: [
    terser({
      output: {
        comments: false,
      },
    }),
  ],
};
