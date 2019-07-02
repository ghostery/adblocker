const { readFileSync } = require('fs');
const glob = require('glob');

const LERNA_CONFIG = JSON.parse(readFileSync('./lerna.json', 'utf-8'));

function assertMetadata(field, expected, package, { optional = false } = {}) {
  const parts = field.split('.');
  if (parts.length === 0) {
    console.error(`  + invalid field ${field}`);
    return;
  }

  let value = package[parts.shift()];
  while (value !== undefined && parts.length !== 0) {
    value = value[parts.shift()];
  }

  if (value === undefined) {
    if (optional === false) {
      console.error(`  + expected ${field} to be defined`);
    }
    return;
  }

  const normalizedValue = JSON.stringify(value);
  const normalizedExpected = JSON.stringify(expected);
  if (normalizedValue !== normalizedExpected) {
    console.error(`  + ${field} mismatch: got ${normalizedValue}, expected ${normalizedExpected}`);
  }
}

const EXPECTED_FIELDS = new Set([
  'author',
  'browser',
  'bugs',
  'dependencies',
  'description',
  'devDependencies',
  'files',
  'homepage',
  'license',
  'main',
  'module',
  'name',
  'peerDependencies',
  'publishConfig',
  'repository',
  'scripts',
  'types',
  'version',
]);

function packageLint(path, package) {
  console.log('linting', path);

  // Check that no extra fields exit
  for (const field of Object.keys(package)) {
    if (EXPECTED_FIELDS.has(field) === false) {
      console.error(`  + un-expected field ${field}`);
    }
  }

  // Check that name is correct
  const parts = path.split('/');
  const name = `@cliqz/${parts[parts.length - 2]}`;
  assertMetadata('name', name, package);

  // Check version of packages
  assertMetadata('version', LERNA_CONFIG.version, package);

  // Check versions of dependencies
  const versionBound = `^${LERNA_CONFIG.version}`;
  for (const deps of [
    package.dependencies || {},
    package.devDependencies || {},
    package.peerDependencies || {},
  ]) {
    for (const [name, version] of Object.entries(deps)) {
      if (name.startsWith('@cliqz/adblocker-') && version !== versionBound) {
        console.error(
          `  + version of dep ${name} mismatch: got ${version}, expected ${versionBound}`,
        );
      }
    }
  }

  // Check author
  assertMetadata('author', 'Cliqz', package);

  // Check homepage
  assertMetadata('homepage', 'https://github.com/cliqz-oss/adblocker#readme', package);

  // Check license
  assertMetadata('license', 'MPL-2.0', package);

  // Check exported bundles
  if (name.endsWith('-example') === false) {
    assertMetadata('main', 'build/cjs/adblocker.js', package);
    assertMetadata('module', 'build/es6/adblocker.js', package);
    assertMetadata('types', 'dist/types/adblocker.d.ts', package);
    assertMetadata('browser', 'dist/adblocker.umd.min.js', package, { optional: true });

    assertMetadata('files', ['build', 'dist'], package);

    assertMetadata('scripts.build-cjs', 'tsc -p . --outDir build/cjs --module commonjs', package, {
      optional: true,
    });
    assertMetadata('scripts.build-es6', 'tsc -p . --outDir build/es6 --module esnext', package, {
      optional: true,
    });
    assertMetadata(
      'scripts.build',
      "concurrently 'npm run build-cjs' 'npm run build-es6'",
      package,
      { optional: true },
    );
    assertMetadata('scripts.bundle', 'rollup --config rollup.config.ts', package, {
      optional: true,
    });
  }

  assertMetadata(
    'publishConfig',
    {
      'access': 'public',
    },
    package,
  );

  assertMetadata(
    'repository',
    {
      'type': 'git',
      'url': 'git@github.com:cliqz-oss/adblocker.git',
    },
    package,
  );

  assertMetadata(
    'bugs',
    {
      'url': 'https://github.com/cliqz-oss/adblocker/issues',
    },
    package,
  );

  // NOTE: these are currently checked by Travis
  // assertMetadata(
  //   'scripts.clean',
  //   name.endsWith('-example') ? "echo 'ok'" : 'rm -rfv dist build coverage',
  //   package,
  // );
  // assertMetadata(
  //   'scripts.test',
  //   name.endsWith('-example') ? "echo 'ok'" : 'rm -rfv dist build coverage',
  //   package,
  // );
  // assertMetadata(
  //   'scripts.bundle',
  //   name.endsWith('-example') ? "echo 'ok'" : 'rm -rfv dist build coverage',
  //   package,
  // );
  // assertMetadata(
  //   'scripts.lint',
  //   name.endsWith('-example') ? "echo 'ok'" : 'rm -rfv dist build coverage',
  //   package,
  // );

  // TODO: should we enforce these as well?
  //   "prebuild": "npm run clean",
  //   "prebundle": "npm run build",
  //   "prepack": "npm run bundle",
  //   "pretest": "npm run lint",
}

(function main() {
  console.log('Start linting project...');
  for (const p of glob.sync('./packages/*/package.json')) {
    packageLint(p, JSON.parse(readFileSync(p, 'utf-8')));
  }
})();
