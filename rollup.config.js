import resolve from 'rollup-plugin-node-resolve';

const plugins = [
  resolve({
    module: true,
    jsnext: true,
    main: false,
    preferBuiltins: false,
    modulesOnly: true,
  }),
];

export default [
  {
    input: './build/index-cosmetics.js',
    output: {
      file: './dist/adblocker-cosmetics.umd.js',
      name: 'adblocker',
      format: 'umd',
    },
    plugins,
  },
  {
    input: './build/index-matching.js',
    output: {
      file: './dist/pattern-matching.es',
      format: 'es',
    },
    plugins,
  },
  {
    input: './build/index.js',
    output: {
      file: './dist/adblocker.umd.js',
      name: 'adblocker',
      format: 'umd',
    },
    plugins,
  },
  {
    input: './build/index.js',
    output: {
      file: './dist/adblocker.es.js',
      format: 'es',
    },
    plugins,
  },
];
