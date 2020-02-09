/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

import { setOutput } from '@actions/core';

(() => {
  const currentTag = execSync(`git describe --abbrev=0 --tags ${process.env.GITHUB_SHA}`)
    .toString()
    .trim();

  if (process.env.GITHUB_WORKSPACE === undefined) {
    throw new Error('GITHUB_WORKSPACE was not specified in env');
  }

  const CHANGELOG_PATH = resolve(process.env.GITHUB_WORKSPACE, 'CHANGELOG.md');
  const CHANGELOG = execSync(
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
