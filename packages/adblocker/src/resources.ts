/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { getResourceForMime } from '@remusao/small';

import { StaticDataView, sizeOfUTF8, sizeOfASCII, sizeOfByte, sizeOfBool } from './data-view.js';

// Polyfill for `btoa`
function btoaPolyfill(buffer: string): string {
  if (typeof btoa !== 'undefined') {
    return btoa(buffer);
  } else if (typeof Buffer !== 'undefined') {
    return Buffer.from(buffer).toString('base64');
  }
  return buffer;
}

export interface Resource {
  contentType: string;
  body: string;
  aliasOf?: string;
}

// TODO - support empty resource body

/**
 * Abstraction on top of resources.txt used for redirections as well as script
 * injections. It contains logic to parse, serialize and get resources by name
 * for use in the engine.
 */
export default class Resources {
  public static deserialize(buffer: StaticDataView): Resources {
    const checksum = buffer.getASCII();

    // Deserialize `resources`
    const resources: Map<string, Resource> = new Map();
    const numberOfResources = buffer.getUint16();
    for (let i = 0; i < numberOfResources; i += 1) {
      const name = buffer.getASCII();
      const isAlias = buffer.getBool();
      if (isAlias === true) {
        resources.set(name, {
          contentType: buffer.getASCII(),
          body: buffer.getUTF8(),
        });
      } else {
        resources.set(name, {
          contentType: '',
          body: '',
          aliasOf: buffer.getASCII(),
        });
      }
    }

    // Fill aliases after deserializing everything
    for (const resource of resources.values()) {
      if (resource.aliasOf === undefined) {
        continue;
      }

      const origin = resources.get(resource.aliasOf);
      if (origin === undefined) {
        continue;
      }

      resource.body = origin.body;
      resource.contentType = origin.contentType;
    }

    // Deserialize `js`
    const js: Map<string, Resource> = new Map();
    resources.forEach((resource, name) => {
      if (resource.contentType === 'application/javascript') {
        js.set(name, resource);
      }
    });

    return new Resources({
      checksum,
      js,
      resources,
    });
  }

  public static parse(data: string, { checksum }: { checksum: string }): Resources {
    const typeToResource: Map<string, Map<string, { body: string; aliasOf?: string }>> = new Map();
    const trimComments = (str: string) => str.replace(/^\s*#.*$/gm, '');
    const chunks = data.split('\n\n');

    for (const chunk of chunks) {
      const resource = trimComments(chunk).trim();
      if (resource.length !== 0) {
        const firstNewLine = resource.indexOf('\n');
        const split = resource.slice(0, firstNewLine).split(/\s+/);
        const [name, type] = split;
        const aliases = (split[2] || '')
          .split(',')
          .map((alias) => alias.trim())
          .filter((alias) => alias.length !== 0);
        const body = resource.slice(firstNewLine + 1);

        if (name === undefined || type === undefined || body === undefined) {
          continue;
        }

        let resources = typeToResource.get(type);
        if (resources === undefined) {
          resources = new Map();
          typeToResource.set(type, resources);
        }
        resources.set(name, {
          body,
        });
        for (const alias of aliases) {
          resources.set(alias, {
            body,
            aliasOf: name,
          });
        }
      }
    }

    // The resource containing javascirpts to be injected
    const js: Map<string, Resource> = typeToResource.get('application/javascript') || new Map();
    for (const [key, value] of js.entries()) {
      if (key.endsWith('.js')) {
        js.set(key.slice(0, -3), {
          contentType: value.contentType,
          body: value.body,
          aliasOf: key,
        });
      }
    }

    // Create a mapping from resource name to { contentType, data }
    // used for request redirection.
    const resourcesByName: Map<string, Resource> = new Map();
    typeToResource.forEach((resources, contentType) => {
      resources.forEach((resource, name) => {
        if (resource.aliasOf === undefined) {
          resourcesByName.set(name, {
            contentType,
            body: resource.body,
          });
        } else {
          resourcesByName.set(name, {
            contentType,
            body: resource.body,
            aliasOf: resource.aliasOf,
          });
        }
      });
    });

    return new Resources({
      checksum,
      js,
      resources: resourcesByName,
    });
  }

  public readonly checksum: string;
  public readonly js: Map<string, Resource>;
  public readonly resources: Map<string, Resource>;

  constructor({ checksum = '', js = new Map(), resources = new Map() }: Partial<Resources> = {}) {
    this.checksum = checksum;
    this.js = js;
    this.resources = resources;
  }

  public getResource(name: string): Resource & { dataUrl: string } {
    const { body, contentType } = this.resources.get(name) || getResourceForMime(name);

    let dataUrl;
    if (contentType.indexOf(';') !== -1) {
      dataUrl = `data:${contentType},${body}`;
    } else {
      dataUrl = `data:${contentType};base64,${btoaPolyfill(body)}`;
    }

    return { body, contentType, dataUrl };
  }

  public getSerializedSize(): number {
    let estimatedSize = sizeOfASCII(this.checksum) + 2 * sizeOfByte(); // resources.size

    this.resources.forEach(({ contentType, body, aliasOf }, name) => {
      estimatedSize += sizeOfASCII(name) + sizeOfBool();
      if (aliasOf === undefined) {
        estimatedSize += sizeOfASCII(contentType) + sizeOfUTF8(body);
      } else {
        estimatedSize += sizeOfASCII(aliasOf);
      }
    });

    return estimatedSize;
  }

  public serialize(buffer: StaticDataView): void {
    // Serialize `checksum`
    buffer.pushASCII(this.checksum);

    // Serialize `resources`
    buffer.pushUint16(this.resources.size);
    this.resources.forEach(({ contentType, body, aliasOf }, name) => {
      buffer.pushASCII(name);
      buffer.pushBool(aliasOf === undefined);
      if (aliasOf === undefined) {
        buffer.pushASCII(contentType);
        buffer.pushUTF8(body);
      } else {
        buffer.pushASCII(aliasOf);
      }
    });
  }
}
