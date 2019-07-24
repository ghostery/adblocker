#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o xtrace
set -o pipefail

yarn bootstrap
node licenser.js --ci
node lerna-lint.js --ci
yarn lint
yarn build
yarn bundle
yarn test
