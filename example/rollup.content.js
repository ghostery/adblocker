import config from '../rollup.config.js';

const fullConfig = config[2];

export default {
  ...fullConfig,
  input: './build/example/content-script.js',
  output: {
    file: 'content-script.bundle.js',
    format: 'iife',
  },
};
