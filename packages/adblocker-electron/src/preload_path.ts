import { createRequire } from 'node:module';

//@ts-ignore
export const PRELOAD_PATH = createRequire(import.meta.url).resolve(
  '@ghostery/adblocker-electron-preload',
);
