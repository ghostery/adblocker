<h1 align="center">Adblocker Benchmarks</h2>

<p align="center">
  <em>
    Efficient
    · Minimal
    · JavaScript
    · TypeScript
    · uBlock Origin- and Easylist-compatible
  </em>
  <br />
  <em>
    <a href="https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker">Node.js</a>
    · <a href="https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker-puppeteer">Puppeteer</a>
    · <a href="https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker-electron">Electron</a>
    · <a href="https://github.com/cliqz-oss/adblocker/tree/master/packages/adblocker-webextension">WebExtension</a>
  </em>
</p>

<p align="center">
  <a href="https://github.com/cliqz-oss/adblocker/actions?query=workflow%3ATests">
    <img alt="Github Actions Build Status" src="https://img.shields.io/github/workflow/status/cliqz-oss/adblocker/Tests?label=tests&style=flat-square"></a>
  <a href="https://github.com/cliqz-oss/adblocker/actions?query=workflow%3Assets">
    <img alt="Github Actions Assets Status" src="https://img.shields.io/github/workflow/status/cliqz-oss/adblocker/Assets?label=assets&style=flat-square"></a>
  <a href="https://twitter.com/acdlite/status/974390255393505280">
    <img alt="Blazing Fast" src="https://img.shields.io/badge/speed-blazing%20%F0%9F%94%A5-brightgreen.svg?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/@cliqz/adblocker">
    <img alt="npm version" src="https://img.shields.io/npm/v/@cliqz/adblocker.svg?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/@cliqz/adblocker">
    <img alt="weekly downloads from npm" src="https://img.shields.io/npm/dw/@cliqz/adblocker.svg?style=flat-square"></a>
  <br/>
  <a href="#badge">
    <img alt="code style: prettier" src="https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square"></a>
  <a href="https://twitter.com/cliqz">
    <img alt="Follow Cliqz on Twitter" src="https://img.shields.io/twitter/follow/cliqz.svg?label=follow+cliqz&style=flat-square"></a>
  <a href="https://github.com/cliqz-oss/adblocker">
    <img alt="Dependabot" src="https://img.shields.io/badge/dependabot-enabled-brightgreen?logo=dependabot&style=flat-square"></a>
  <a href="https://github.com/cliqz-oss/adblocker/blob/master/LICENSE">
    <img alt="License Badge" src="https://img.shields.io/github/license/cliqz-oss/adblocker?style=flat-square"></a>
  <a href="https://lgtm.com/projects/g/cliqz-oss/adblocker?mode=list">
    <img alt="LGTM Badge" src="https://img.shields.io/lgtm/alerts/github/cliqz-oss/adblocker?style=flat-square"></a>
</p>

---

These micro-benchmarks compare different content-blockers network-filter
matching engines as well as the time it takes to process raw requests (e.g.:
extracting hostnames and domains from URLs).

## Running Benchmarks

Install [Rust](https://www.rust-lang.org/tools/install) and [Node.js](https://nodejs.org/en/download/).

Run `npm install` to install the dependencies.

Run `make` to start benchmarking.

## Results Analysis

Setup your Python environment:
```sh
$ pip install -r requirements.txt
$ jupyter notebook
```

Then open `comparing_adblockers.ipynb`.
