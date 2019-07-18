/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import StaticDataView from './data-view';
interface IResource {
    contentType: string;
    data: string;
}
/**
 * Abstraction on top of resources.txt used for redirections as well as script
 * injections. It contains logic to parse, serialize and get resources by name
 * for use in the engine.
 */
export default class Resources {
    static deserialize(buffer: StaticDataView): Resources;
    static parse(data: string, { checksum }: {
        checksum: string;
    }): Resources;
    readonly checksum: string;
    readonly js: Map<string, string>;
    readonly resources: Map<string, IResource>;
    constructor({ checksum, js, resources }?: Partial<Resources>);
    getResource(name: string): IResource | undefined;
    serialize(buffer: StaticDataView): void;
}
export {};
