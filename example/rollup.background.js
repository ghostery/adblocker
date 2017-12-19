import config from '../rollup.config.js';


export default {
  ...config,
  input: './build/example/background.js',
  output: {
    file: 'background.bundle.js',
    format: 'iife',
  },
};
