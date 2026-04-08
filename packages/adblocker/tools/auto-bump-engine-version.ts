import { readFileSync, writeFileSync } from 'node:fs';
import { resolve, join } from 'node:path';

const engineSourcePath = resolve(import.meta.dirname, join('..', 'src', 'engine', 'engine.ts'));
const engineSource = readFileSync(engineSourcePath, 'utf-8');

writeFileSync(
  engineSourcePath,
  engineSource.replace(
    /(^export const ENGINE_VERSION =\s+)(\d+)(;$)/m,
    (match, prefix, version, suffix, offset) => {
      console.log('Match:', { match, prefix, version, suffix, offset });

      const currentVersion = Number(version);
      console.log('Current version:', currentVersion);

      const nextVersion = currentVersion + 1;
      console.log('Next version:', nextVersion);

      return `${prefix}${nextVersion}${suffix}`;
    },
  ),
  'utf-8',
);
