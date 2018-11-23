import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';


const plugins = [
  resolve(),
  commonjs(),
];

export default [
  {
    input: './build/example/background.js',
    output: {
      file: 'background.iife.js',
      format: 'iife',
    },
    plugins,
  },
  {
    input: './build/example/content-script.js',
    output: {
      file: 'content-script.iife.js',
      format: 'iife',
    },
    plugins,
  },
];
