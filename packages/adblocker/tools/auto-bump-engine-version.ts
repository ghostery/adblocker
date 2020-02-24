import { promises as fs } from 'fs';
import { resolve, join } from 'path';

(async () => {
  const engineSourcePath = resolve(__dirname, join('..', 'src', 'engine', 'engine.ts'));
  const engineSource = await fs.readFile(engineSourcePath, 'utf-8');

  await fs.writeFile(
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
})();
