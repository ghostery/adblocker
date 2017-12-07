const fs = require('fs');
const path = require('path');

const deepEqual = require('deep-eql');
const functionEqual = require('function-equal');
const typeDetect = require('type-detect');

function comparator(left, right) {
  if (typeDetect(left) === 'function' && typeDetect(right) === 'function') {
    return functionEqual(left, right);
  }
  return null;
}

export function customDeepEqual(left, right) {
  return deepEqual(left, right, {
    comparator,
  });
}

function readAsset(filepath) {
  return fs.readFileSync(path.resolve(__dirname, '../../../', filepath), 'utf-8');
}

export function loadAllLists() {
  return [
    'assets/easylist-downloads.adblockplus.org/antiadblockfilters.txt',
    'assets/easylist.to/easylist/easylist.txt',
    'assets/easylist.to/easylistgermany/easylistgermany.txt',
    'assets/raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/badware.txt',
    'assets/raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/filters.txt',
    'assets/raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resource-abuse.txt',
    'assets/raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/unbreak.txt',
  ].map(readAsset).join('\n');
}

export function loadResources() {
  return readAsset('assets/raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resources.txt');
}
