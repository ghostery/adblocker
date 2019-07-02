#!/usr/bin/env bash

set -o errexit
set -o nounset
set -o xtrace
set -o pipefail

lerna bootstrap
node licenser.js --ci
node lerna-lint.js --ci
npm run bundle
npm run test
