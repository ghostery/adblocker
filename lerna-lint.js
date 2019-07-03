const { readFileSync } = require('fs');
const glob = require('glob');

const ABORT_ON_ERROR = process.argv[process.argv.length - 1] === '--ci';
const LERNA_CONFIG = JSON.parse(readFileSync('./lerna.json', 'utf-8'));

function abort() {
  if (ABORT_ON_ERROR === true) {
    process.exit(1);
  }
}

function assertMetadata(field, expected, package, { optional = false } = {}) {
  const parts = field.split('.');
  if (parts.length === 0) {
    console.error(`  + invalid field ${field}`);
    abort();
    return;
  }

  let value = package[parts.shift()];
  while (value !== undefined && parts.length !== 0) {
    value = value[parts.shift()];
  }

  if (value === undefined) {
    if (optional === false) {
      console.error(`  + expected ${field} to be defined`);
      abort();
    }
    return;
  }

  const normalizedValue = JSON.stringify(value);
  const normalizedExpected = JSON.stringify(expected);
  if (normalizedValue !== normalizedExpected) {
    console.error(`  + ${field} mismatch: got ${normalizedValue}, expected ${normalizedExpected}`);
    abort();
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
  'husky',
  'license',
  'main',
  'module',
  'name',
  'peerDependencies',
  'private',
  'publishConfig',
  'repository',
  'scripts',
  'types',
  'version',
  'workspaces',
]);

(function main() {
  console.log('Start linting project...');

  // Make sure packages are used with same versions across sub-packages
  const packageVersions = {};

  for (const path of ['./package.json', ...glob.sync('./packages/*/package.json')]) {
    const package = JSON.parse(readFileSync(path, 'utf-8'));
    console.log('linting', path);

    // Check that no extra fields exit
    for (const field of Object.keys(package)) {
      if (EXPECTED_FIELDS.has(field) === false) {
        console.error(`  + un-expected field ${field}`);
        abort();
      }
    }

    // Check versions of dependencies
    const versionBound = `^${LERNA_CONFIG.version}`;
    for (const deps of [
      package.dependencies || {},
      package.devDependencies || {},
      package.peerDependencies || {},
    ]) {
      for (const [name, version] of Object.entries(deps)) {
        const currentVersion = packageVersions[name];
        if (currentVersion !== undefined && currentVersion !== version) {
          console.error(
            `  + version of dep ${name} mismatch: got ${version}, expected ${currentVersion}`,
          );
          abort();
        }
        packageVersions[name] = version;

        if (name.startsWith('@cliqz/adblocker-') && version !== versionBound) {
          console.error(
            `  + version of dep ${name} mismatch: got ${version}, expected ${versionBound}`,
          );
          abort();
        }
      }
    }

    // Check author
    assertMetadata('author', 'Cliqz', package);

    // Check homepage
    assertMetadata('homepage', 'https://github.com/cliqz-oss/adblocker#readme', package);

    // Check license
    assertMetadata('license', 'MPL-2.0', package);

    // Check repository
    assertMetadata(
      'repository',
      {
        'type': 'git',
        'url': 'git@github.com:cliqz-oss/adblocker.git',
      },
      package,
    );

    // Check bugs
    assertMetadata(
      'bugs',
      {
        'url': 'https://github.com/cliqz-oss/adblocker/issues',
      },
      package,
    );

    // Everything after that should not be defined in root package.json
    if (path === './package.json') {
      continue;
    }

    // Check that name is correct
    const parts = path.split('/');
    const name = `@cliqz/${parts[parts.length - 2]}`;
    assertMetadata('name', name, package);

    // Check version of packages
    assertMetadata('version', LERNA_CONFIG.version, package);

    // Check exported bundles
    if (name.endsWith('-example') === false && name.endsWith('-benchmarks') === false) {
      assertMetadata('main', 'build/cjs/adblocker.js', package);
      assertMetadata('module', 'build/es6/adblocker.js', package);
      assertMetadata('types', 'dist/types/adblocker.d.ts', package);
      assertMetadata('browser', 'dist/adblocker.umd.min.js', package, { optional: true });

      assertMetadata('files', ['LICENSE', 'build', 'dist'], package);

      assertMetadata(
        'scripts.build-cjs',
        'tsc -p . --outDir build/cjs --module commonjs',
        package,
        {
          optional: true,
        },
      );
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
      { optional: true },
    );

    assertMetadata(
      'scripts.clean',
      'rimraf dist build coverage',
      package,
      { optional: true },
    );

    // NOTE: this can be different depending on the package
    // assertMetadata(
    //   'scripts.test',
    //   '',
    //   package,
    //   { optional: true },
    // );

    assertMetadata(
      'scripts.bundle',
      'rollup --config rollup.config.ts',
      package,
      { optional: true },
    );

    assertMetadata(
      'scripts.lint',
      'tslint --config ../../tslint.json --project .',
      package,
      { optional: true },
    );

    assertMetadata(
      'scripts.prepack',
      'npm run bundle',
      package,
      { optional: true },
    );

    assertMetadata(
      'scripts.prebundle',
      'npm run build',
      package,
      { optional: true },
    );

    assertMetadata(
      'scripts.prebuild',
      'npm run clean',
      package,
      { optional: true },
    );

    assertMetadata(
      'scripts.pretest',
      'npm run lint',
      package,
      { optional: true },
    );
  }
})();
