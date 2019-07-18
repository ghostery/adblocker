/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
var Config = /** @class */ (function () {
    function Config(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.debug, debug = _c === void 0 ? false : _c, _d = _b.enableCompression, enableCompression = _d === void 0 ? false : _d, _e = _b.enableOptimizations, enableOptimizations = _e === void 0 ? true : _e, _f = _b.integrityCheck, integrityCheck = _f === void 0 ? true : _f, _g = _b.loadCosmeticFilters, loadCosmeticFilters = _g === void 0 ? true : _g, _h = _b.loadGenericCosmeticsFilters, loadGenericCosmeticsFilters = _h === void 0 ? true : _h, _j = _b.loadNetworkFilters, loadNetworkFilters = _j === void 0 ? true : _j;
        this.debug = debug;
        this.enableCompression = enableCompression;
        this.enableOptimizations = enableOptimizations;
        this.integrityCheck = integrityCheck;
        this.loadCosmeticFilters = loadCosmeticFilters;
        this.loadGenericCosmeticsFilters = loadGenericCosmeticsFilters;
        this.loadNetworkFilters = loadNetworkFilters;
    }
    Config.deserialize = function (buffer) {
        return new Config({
            debug: buffer.getBool(),
            enableCompression: buffer.getBool(),
            enableOptimizations: buffer.getBool(),
            integrityCheck: buffer.getBool(),
            loadCosmeticFilters: buffer.getBool(),
            loadGenericCosmeticsFilters: buffer.getBool(),
            loadNetworkFilters: buffer.getBool()
        });
    };
    Config.prototype.serialize = function (buffer) {
        buffer.pushBool(this.debug);
        buffer.pushBool(this.enableCompression);
        buffer.pushBool(this.enableOptimizations);
        buffer.pushBool(this.integrityCheck);
        buffer.pushBool(this.loadCosmeticFilters);
        buffer.pushBool(this.loadGenericCosmeticsFilters);
        buffer.pushBool(this.loadNetworkFilters);
    };
    return Config;
}());
export default Config;
