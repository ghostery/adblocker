import config from '../rollup.config.js';


export default {
  ...config,
  input: './build/example/content-script.js',
  output: {
    file: 'content-script.bundle.js',
    format: 'iife',
  },
};
