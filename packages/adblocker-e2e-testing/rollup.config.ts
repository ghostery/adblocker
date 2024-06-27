/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

export default [
  {
    input: './dist/src/e2e.js',
    output: [
      {
        dir: './dist/esm',
        format: 'esm',
        preserveModules: true,
        entryFileNames: '[name].js',
        sourcemap: true,
      },
      {
        dir: './dist/cjs',
        format: 'cjs',
        preserveModules: true,
        entryFileNames: '[name].cjs',
        sourcemap: true,
      },
    ],
  },
];
