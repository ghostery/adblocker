import configs from '../rollup.config.js';

export default {
  input: './build/example/background.js',
  output: {
    file: 'background.bundle.js',
    format: 'iife',
  },
  plugins: configs[0].plugins,
};
