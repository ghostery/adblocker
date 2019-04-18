import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import pkg from './package.json';

const plugins = [
  resolve({
    preferBuiltins: false,
    mainFields: ['jsnext:main', 'module', 'main'],
  }),
  commonjs(),
];

export default [
  // Custom bundle for content-script, contains only a small subset
  {
    input: './build/index-cosmetics.js',
    output: {
      file: './dist/adblocker-cosmetics.umd.js',
      name: 'adblocker',
      format: 'umd',
    },
    plugins,
  },
  // Browser-friendly bundle
  {
    input: './build/index.js',
    output: {
      file: pkg.browser,
      name: 'adblocker',
      format: 'umd',
    },
    plugins,
  },
  // Commonjs and ES module bundles (without third-party deps)
  {
    input: './build/index.js',
    external: ['tslib'],
    output: [
      { file: pkg.module, format: 'es' },
      { file: pkg.main, format: 'cjs' },
    ],
  },
];
