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
];

function tasks(entryPoint) {
  return [
    // CommonJS + ES6
    {
      external: ['tslib', 'tldts', 'tsmaz'],
      input: `./build/${entryPoint}.js`,
      output: [
        { file: `./dist/${entryPoint}.esm.js`, format: 'es' },
        { file: `./dist/${entryPoint}.cjs.js`, format: 'cjs' },
      ],
    },
    // UMD
    {
      input: `./build/${entryPoint}.js`,
      output: {
        file: `./dist/${entryPoint}.umd.js`,
        format: 'umd',
        name: entryPoint,
      },
      plugins,
    },
    // ES6 minified
    {
      input: `./build/${entryPoint}.js`,
      output: {
        file: `./dist/${entryPoint}.esm.min.js`,
        format: 'es',
      },
      plugins: [
        ...plugins,
        compiler({
          language_out: 'NO_TRANSPILE',
          warning_level: 'DEFAULT',
        }),
      ],
    },
    // UMD + CommonJS minified
    {
      input: `./dist/${entryPoint}.esm.min.js`,
      output: [
        {
          file: `./dist/${entryPoint}.cjs.min.js`,
          format: 'cjs',
        },
        {
          file: `./dist/${entryPoint}.umd.min.js`,
          format: 'umd',
          name: entryPoint,
        },
      ],
    },
  ];
}

export default [...tasks('adblocker'), ...tasks('cosmetics'), ...tasks('circumvention')];
