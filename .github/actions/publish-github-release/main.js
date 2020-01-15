"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const path_1 = require("path");
const core_1 = require("@actions/core");
const github_1 = require("@actions/github");
const token = core_1.getInput('token', { required: true });
const currentTag = child_process_1.execSync(`git describe --abbrev=0 --tags ${process.env.GITHUB_SHA}`)
    .toString()
    .trim();
console.log(`currentTag: '${currentTag}'`);
const lastTag = child_process_1.execSync(`git describe --abbrev=0 --tags ${currentTag}^`)
    .toString()
    .trim();
console.log(`lastTag: '${lastTag}'`);
let changelog = child_process_1.execSync(`node ${path_1.resolve(__dirname, 'node_modules/.bin/lerna-changelog')} --from ${lastTag} --to ${currentTag}`).toString().trim();
// Remove header, which is redundant with GitHub metadata
const indexAfterTitle = changelog.indexOf('\n\n');
if (indexAfterTitle !== -1) {
    changelog = changelog.slice(indexAfterTitle).trim();
}
(new github_1.GitHub(token)).repos.createRelease({
    body: changelog,
    owner: 'cliqz-oss',
    repo: 'adblocker',
    tag_name: currentTag,
});
