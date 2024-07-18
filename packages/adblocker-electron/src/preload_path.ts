import { createRequire } from 'node:module';

//@ts-ignore
export const PRELOAD_PATH = createRequire(import.meta.url).resolve(
  '@cliqz/adblocker-electron-preload',
);
