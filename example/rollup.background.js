import config from '../rollup.config.js';

const fullConfig = config[2];

export default {
  ...fullConfig,
  input: './build/example/background.js',
  output: {
    file: 'background.bundle.js',
    format: 'iife',
  },
};
