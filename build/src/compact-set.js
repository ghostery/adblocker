/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
export function compactTokens(tokens) {
    var sorted = tokens.sort();
    var lastIndex = 1;
    for (var i = 1; i < sorted.length; i += 1) {
        if (sorted[lastIndex - 1] !== sorted[i]) {
            sorted[lastIndex] = sorted[i];
            lastIndex += 1;
        }
    }
    return sorted.subarray(0, lastIndex);
}
export function hasEmptyIntersection(s1, s2) {
    var i = 0;
    var j = 0;
    while (i < s1.length && j < s2.length && s1[i] !== s2[j]) {
        if (s1[i] < s2[j]) {
            i += 1;
        }
        else if (s2[j] < s1[i]) {
            j += 1;
        }
    }
    return !(i < s1.length && j < s2.length);
}
export function concatTypedArrays(arrays) {
    var totalSize = 0;
    for (var i = 0; i < arrays.length; i += 1) {
        totalSize += arrays[i].length;
    }
    var result = new Uint32Array(totalSize);
    var index = 0;
    for (var i = 0; i < arrays.length; i += 1) {
        var array = arrays[i];
        for (var j = 0; j < array.length; j += 1) {
            result[index] = array[j];
            index += 1;
        }
    }
    return result;
}
export function mergeCompactSets() {
    var arrays = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        arrays[_i] = arguments[_i];
    }
    return compactTokens(concatTypedArrays(arrays));
}
