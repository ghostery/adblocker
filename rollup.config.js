import builtins from 'rollup-plugin-node-builtins';
import commonjs from 'rollup-plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';
import babel from 'rollup-plugin-babel';
import babelrc from 'babelrc-rollup';

const namedExports = {
  'tldjs/index.js': ['parse', 'getPublicSuffix', 'extractHostname'],
};

const plugins = [
  globals(),
  builtins(),
  sourcemaps(),
  json(),

  nodeResolve({
    jsnext: true,
    main: true,
    browser: true,
  }),

  commonjs({
    extensions: ['.js', '.json'],
    namedExports,
  }),

  babel(babelrc({
    config: {
      babelrc: false,
      presets: [
        'es2015',
      ],
    },
  })),
];

export default [
  {
    input: './build/es6/index-cosmetics.js',
    output: {
      file: 'adblocker-cosmetics.umd.js',
      name: 'adblocker',
      format: 'umd',
    },
    plugins,
  },
  {
    input: './build/es6/index-matching.js',
    output: {
      file: 'pattern-matching.es',
      format: 'es',
    },
    plugins,
  },
  {
    input: './build/es6/index.js',
    output: {
      file: 'adblocker.umd.js',
      name: 'adblocker',
      format: 'umd',
    },
    plugins,
  },
];
