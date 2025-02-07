import { createRequire } from 'node:module';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore https://github.com/isaacs/tshy?tab=readme-ov-file#commonjs-dialect-polyfills
export const PRELOAD_PATH = createRequire(import.meta.url).resolve(
  '@ghostery/adblocker-electron-preload',
);
