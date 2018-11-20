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
    input: './dist/es6/index-cosmetics.js',
    output: {
      file: './dist/adblocker-cosmetics.umd.js',
      name: 'adblocker',
      format: 'umd',
    },
    plugins,
  },
  {
    input: './dist/es6/index.js',
    output: {
      file: './dist/adblocker.umd.js',
      name: 'adblocker',
      format: 'umd',
    },
    plugins,
  },
];
