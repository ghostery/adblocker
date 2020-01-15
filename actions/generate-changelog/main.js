const { writeFileSync } = require('fs');
const { resolve } = require('path');

const { execSync } = require('child_process');
execSync(`cd ${__dirname}; npm ci`);

const currentTag = execSync(`git describe --abbrev=0 --tags ${process.env.GITHUB_SHA}`)
  .toString()
  .trim();

writeFileSync(
  resolve(process.env.GITHUB_WORKSPACE, 'CHANGELOG.md'),
  execSync(
    `node ${resolve(
      __dirname,
      'node_modules/.bin/lerna-changelog',
    )} --from v1.0.0 --to ${currentTag}`,
  ).toString().trim(),
  'utf-8',
);
