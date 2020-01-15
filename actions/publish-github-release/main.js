const { resolve } = require('path');

const { execSync } = require('child_process');
execSync(`cd ${__dirname}; npm ci`);

const core = require('@actions/core');
const github = require('@actions/github');

const token = core.getInput('token', { required: true });

const currentTag = execSync(`git describe --abbrev=0 --tags ${process.env.GITHUB_SHA}`)
  .toString()
  .trim();
console.log(`currentTag: '${currentTag}'`);

const lastTag = execSync(`git describe --abbrev=0 --tags ${currentTag}^`)
  .toString()
  .trim();
console.log(`lastTag: '${lastTag}'`);

const changelog = execSync(
  `node ${resolve(
    __dirname,
    'node_modules/.bin/lerna-changelog',
  )} --from ${lastTag} --to ${currentTag}`,
).toString().trim();

(new github.GitHub(token)).repos.createRelease({
  owner: 'cliqz-oss',
  repo: 'adblocker',
  tag_name: currentTag,
  body: JSON.parse(changelog),
});
