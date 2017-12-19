import builtins from 'rollup-plugin-node-builtins';
import commonjs from 'rollup-plugin-commonjs';
import globals from 'rollup-plugin-node-globals';
import json from 'rollup-plugin-json';
import nodeResolve from 'rollup-plugin-node-resolve';
import sourcemaps from 'rollup-plugin-sourcemaps';

export default {
  input: './build/es6/index.js',
  output: {
    file: 'adblocker.umd.js',
    name: 'adblocker',
    format: 'umd',
  },
  plugins: [
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
      extensions: [ '.js', '.json' ],
      namedExports: {
        'tldjs/index.js': [ 'parse', 'getPublicSuffix' ],
        'fnv-plus/index.js': [ 'fast1a32' ],
        'text-encoding/index.js': [ 'TextEncoder', 'TextDecoder' ],
      },
    }),
  ]
};
