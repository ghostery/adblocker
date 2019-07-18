/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
/**
 * Abstraction on top of resources.txt used for redirections as well as script
 * injections. It contains logic to parse, serialize and get resources by name
 * for use in the engine.
 */
var Resources = /** @class */ (function () {
    function Resources(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.checksum, checksum = _c === void 0 ? '' : _c, _d = _b.js, js = _d === void 0 ? new Map() : _d, _e = _b.resources, resources = _e === void 0 ? new Map() : _e;
        this.checksum = checksum;
        this.js = js;
        this.resources = resources;
    }
    Resources.deserialize = function (buffer) {
        var checksum = buffer.getASCII();
        // Deserialize `resources`
        var resources = new Map();
        var numberOfResources = buffer.getUint8();
        for (var i = 0; i < numberOfResources; i += 1) {
            resources.set(buffer.getASCII(), {
                contentType: buffer.getASCII(),
                data: buffer.getASCII()
            });
        }
        // Deserialize `js`
        var js = new Map();
        resources.forEach(function (_a, name) {
            var contentType = _a.contentType, data = _a.data;
            if (contentType === 'application/javascript') {
                js.set(name, data);
            }
        });
        return new Resources({
            checksum: checksum,
            js: js,
            resources: resources
        });
    };
    Resources.parse = function (data, _a) {
        var checksum = _a.checksum;
        var typeToResource = new Map();
        var trimComments = function (str) { return str.replace(/^\s*#.*$/gm, ''); };
        var chunks = data.split('\n\n');
        for (var i = 0; i < chunks.length; i += 1) {
            var resource = trimComments(chunks[i]).trim();
            if (resource.length !== 0) {
                var firstNewLine = resource.indexOf('\n');
                var split = resource.slice(0, firstNewLine).split(/\s+/);
                var name_1 = split[0];
                var type = split[1];
                var body = resource.slice(firstNewLine + 1);
                if (name_1 === undefined || type === undefined || body === undefined) {
                    continue;
                }
                if (!typeToResource.has(type)) {
                    typeToResource.set(type, new Map());
                }
                typeToResource.get(type).set(name_1, body);
            }
        }
        // the resource containing javascirpts to be injected
        var js = typeToResource.get('application/javascript');
        // Create a mapping from resource name to { contentType, data }
        // used for request redirection.
        var resourcesByName = new Map();
        typeToResource.forEach(function (resources, contentType) {
            resources.forEach(function (resource, name) {
                resourcesByName.set(name, {
                    contentType: contentType,
                    data: resource
                });
            });
        });
        return new Resources({
            checksum: checksum,
            js: js,
            resources: resourcesByName
        });
    };
    Resources.prototype.getResource = function (name) {
        return this.resources.get(name);
    };
    Resources.prototype.serialize = function (buffer) {
        // Serialize `checksum`
        buffer.pushASCII(this.checksum);
        // Serialize `resources`
        buffer.pushUint8(this.resources.size);
        this.resources.forEach(function (_a, name) {
            var contentType = _a.contentType, data = _a.data;
            buffer.pushASCII(name);
            buffer.pushASCII(contentType);
            buffer.pushASCII(data);
        });
    };
    return Resources;
}());
export default Resources;
