import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

import { execSync } from 'child_process';
execSync(`cd ${__dirname}; npm ci`);

import { setOutput } from '@actions/core';

(() => {
  const currentTag = execSync(`git describe --abbrev=0 --tags ${process.env.GITHUB_SHA}`)
    .toString()
    .trim();

  if (process.env.GITHUB_WORKSPACE === undefined) {
    throw new Error('GITHUB_WORKSPACE was not specified in env');
  }

  const CHANGELOG_PATH = resolve(process.env.GITHUB_WORKSPACE, 'CHANGELOG.md');
  const CHANGELOG =   execSync(
    `node ${resolve(
      __dirname,
      'node_modules/.bin/lerna-changelog',
    )} --from v0.12.0 --to ${currentTag}`,
  ).toString().trim();

  setOutput(
    'updated',
    (
      CHANGELOG === readFileSync(CHANGELOG_PATH, 'utf-8').trim()
        ? '0'
        : '1'
    ),
  );

  writeFileSync(
    CHANGELOG_PATH,
    CHANGELOG,
    'utf-8',
  );
})();
