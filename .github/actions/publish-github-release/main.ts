import { execSync } from 'child_process';
import { resolve } from 'path';

import { getInput } from '@actions/core';
import { GitHub } from '@actions/github';

const token = getInput('token', { required: true });

const currentTag = execSync(`git describe --abbrev=0 --tags ${process.env.GITHUB_SHA}`)
  .toString()
  .trim();
console.log(`currentTag: '${currentTag}'`);

const lastTag = execSync(`git describe --abbrev=0 --tags ${currentTag}^`)
  .toString()
  .trim();
console.log(`lastTag: '${lastTag}'`);

let changelog = execSync(
  `node ${resolve(
    __dirname,
    'node_modules/.bin/lerna-changelog',
  )} --from ${lastTag} --to ${currentTag}`,
).toString().trim();

// Remove header, which is redundant with GitHub metadata
const indexAfterTitle = changelog.indexOf('\n\n');
if (indexAfterTitle !== -1) {
  changelog = changelog.slice(indexAfterTitle).trim();
}

(new GitHub(token)).repos.createRelease({
  body: changelog,
  owner: 'cliqz-oss',
  repo: 'adblocker',
  tag_name: currentTag,
});
