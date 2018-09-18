import configs from '../rollup.config.js';


export default {
  input: './build/example/content-script.js',
  output: {
    file: 'content-script.bundle.js',
    format: 'iife',
  },
  plugins: configs[0].plugins,
};
