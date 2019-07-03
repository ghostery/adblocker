#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o xtrace
set -o pipefail

npx lerna bootstrap
node licenser.js --ci
node lerna-lint.js --ci
yarn lint
yarn bundle
yarn test
