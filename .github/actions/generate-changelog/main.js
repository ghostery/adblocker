"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
const child_process_1 = require("child_process");
child_process_1.execSync(`cd ${__dirname}; npm ci`);
const core_1 = require("@actions/core");
(() => {
    const currentTag = child_process_1.execSync(`git describe --abbrev=0 --tags ${process.env.GITHUB_SHA}`)
        .toString()
        .trim();
    if (process.env.GITHUB_WORKSPACE === undefined) {
        throw new Error('GITHUB_WORKSPACE was not specified in env');
    }
    const CHANGELOG_PATH = path_1.resolve(process.env.GITHUB_WORKSPACE, 'CHANGELOG.md');
    const CHANGELOG = child_process_1.execSync(`node ${path_1.resolve(__dirname, 'node_modules/.bin/lerna-changelog')} --from v0.12.0 --to ${currentTag}`).toString().trim();
    core_1.setOutput('updated', (CHANGELOG === fs_1.readFileSync(CHANGELOG_PATH, 'utf-8').trim()
        ? '0'
        : '1'));
    fs_1.writeFileSync(CHANGELOG_PATH, CHANGELOG, 'utf-8');
})();
