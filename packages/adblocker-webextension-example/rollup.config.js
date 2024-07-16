/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import commonjs from '@rollup/plugin-commonjs'
import typescript from '@rollup/plugin-typescript';
import nodeResolve from '@rollup/plugin-node-resolve';

export default [
  {
    input: './background.ts',
    output: {
      file: './dist/background.iife.js',
      format: 'iife',
      name: 'adblocker',
      sourcemap: true,
    },
    plugins: [commonjs(), nodeResolve(), typescript()],
  },
  {
    input: './content-script.ts',
    output: {
      file: './dist/content-script.iife.js',
      format: 'iife',
      name: 'adblocker',
      sourcemap: true,
    },
    plugins: [commonjs(), nodeResolve(), typescript()],
  },
];
