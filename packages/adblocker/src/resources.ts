/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { getResourceForMime } from '@remusao/small';

import { StaticDataView, sizeOfASCII, sizeOfByte } from './data-view';

// Polyfill for `btoa`
function btoaPolyfill(buffer: string): string {
  if (typeof btoa !== 'undefined') {
    return btoa(buffer);
  } else if (typeof Buffer !== 'undefined') {
    return Buffer.from(buffer).toString('base64');
  }
  return buffer;
}

interface Resource {
  contentType: string;
  body: string;
}

// TODO - support # alias
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
      resources.set(buffer.getASCII(), {
        contentType: buffer.getASCII(),
        body: buffer.getASCII(),
      });
    }

    // Deserialize `js`
    const js: Map<string, string> = new Map();
    resources.forEach(({ contentType, body }, name) => {
      if (contentType === 'application/javascript') {
        js.set(name, body);
      }
    });

    return new Resources({
      checksum,
      js,
      resources,
    });
  }

  public static parse(data: string, { checksum }: { checksum: string }): Resources {
    const typeToResource: Map<string, Map<string, string>> = new Map();
    const trimComments = (str: string) => str.replace(/^\s*#.*$/gm, '');
    const chunks = data.split('\n\n');

    for (const chunk of chunks) {
      const resource = trimComments(chunk).trim();
      if (resource.length !== 0) {
        const firstNewLine = resource.indexOf('\n');
        const split = resource.slice(0, firstNewLine).split(/\s+/);
        const name = split[0];
        const type = split[1];
        const body = resource.slice(firstNewLine + 1);

        if (name === undefined || type === undefined || body === undefined) {
          continue;
        }

        let resources = typeToResource.get(type);
        if (resources === undefined) {
          resources = new Map();
          typeToResource.set(type, resources);
        }
        resources.set(name, body);
      }
    }

    // The resource containing javascirpts to be injected
    const js: Map<string, string> = typeToResource.get('application/javascript') || new Map();
    for (const [key, value] of js.entries()) {
      if (key.endsWith('.js')) {
        js.set(key.slice(0, -3), value);
      }
    }

    // Create a mapping from resource name to { contentType, data }
    // used for request redirection.
    const resourcesByName: Map<string, Resource> = new Map();
    typeToResource.forEach((resources, contentType) => {
      resources.forEach((resource: string, name: string) => {
        resourcesByName.set(name, {
          contentType,
          body: resource,
        });
      });
    });

    return new Resources({
      checksum,
      js,
      resources: resourcesByName,
    });
  }

  public readonly checksum: string;
  public readonly js: Map<string, string>;
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

    this.resources.forEach(({ contentType, body }, name) => {
      estimatedSize += sizeOfASCII(name) + sizeOfASCII(contentType) + sizeOfASCII(body);
    });

    return estimatedSize;
  }

  public serialize(buffer: StaticDataView): void {
    // Serialize `checksum`
    buffer.pushASCII(this.checksum);

    // Serialize `resources`
    buffer.pushUint16(this.resources.size);
    this.resources.forEach(({ contentType, body }, name) => {
      buffer.pushASCII(name);
      buffer.pushASCII(contentType);
      buffer.pushASCII(body);
    });
  }
}
