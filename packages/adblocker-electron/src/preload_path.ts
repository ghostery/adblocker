import { createRequire } from 'node:module';

export const PRELOAD_PATH = createRequire(import.meta.url).resolve(
  '@ghostery/adblocker-electron-preload',
);
