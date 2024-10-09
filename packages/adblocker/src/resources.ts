/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { getResourceForMime } from '@remusao/small';
import { Scripting } from 'webextension-polyfill';
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

export interface Redirect {
  contentType: string;
  body: string;
}

type ResourceBase = {
  names: string[];
  content: string;
};

export type Resource = ResourceBase & {
  contentType: string;
  encoding?: 'base64';
};

export type Scriptlet = ResourceBase & {
  dependencies: string[];
  fnName: string;
  executionWorld: Scripting.ExecutionWorld;
  requiresTrust: boolean;
};

type PartialBy<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export type ResourcesDistribution = {
  redirects: Resource[];
  scriptlets: PartialBy<Scriptlet, 'executionWorld' | 'requiresTrust'>[];
};

// TODO - support empty resource body

const SCRIPTLET_BODY_PREFIX = `if (typeof scriptletGlobals === 'undefined') {
  var scriptletGlobals = {};
}
`;
const SCRIPTLET_BODY_SUFFIX = `(...['{{1}}','{{2}}','{{3}}','{{4}}','{{5}}','{{6}}','{{7}}','{{8}}','{{9}}','{{10}}'].filter((a,i) => a !== '{{'+(i+1)+'}}').map((a) => decodeURIComponent(a)));`;

export function wrapScriptletBody(
  script: string,
  prefix: string = SCRIPTLET_BODY_PREFIX,
  suffix: string = SCRIPTLET_BODY_SUFFIX,
) {
  return prefix + script + suffix;
}

function assembleScriptlet(scriptlet: Scriptlet, scriptlets: Map<string, Scriptlet>) {
  const dependencies: Set<Scriptlet> = new Set();
  const queue: Scriptlet[] = [scriptlet];

  while (queue.length > 0) {
    const current = queue.pop()!;
    dependencies.add(current);

    for (const dependencyName of current.dependencies) {
      const dependency = scriptlets.get(dependencyName);
      if (dependency !== undefined && dependencies.has(dependency) === false) {
        queue.push(dependency);
        dependencies.add(dependency);
      }
    }
  }

  let body = '';
  for (const dependency of dependencies) {
    body += dependency.content + '\n';
  }

  return wrapScriptletBody(body + scriptlet.fnName);
}

function scriptletsToJsMapping(scriptlets: Map<string, Scriptlet>) {
  const js: Map<string, string> = new Map();

  for (const scriptlet of new Set(scriptlets.values())) {
    const content = assembleScriptlet(scriptlet, scriptlets);
    for (const name of scriptlet.names) {
      js.set(name, content);
      if (name.endsWith('.js')) {
        js.set(name.slice(0, -3), content);
      }
    }
  }

  return js;
}

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
    const scriptlets: Map<string, Scriptlet> = new Map();

    for (let i = 0, l = buffer.getUint16(); i < l; i++) {
      const names: string[] = [];
      for (let i = 0, l = buffer.getUint16() /* Read length of `names` array */; i < l; i++) {
        names.push(buffer.getASCII());
      }
      const content = buffer.getUTF8();
      const contentType = buffer.getASCII();

      const redirect: Resource = {
        names,
        content,
        contentType,
      };
      if (buffer.getBool() === true) {
        redirect.encoding = buffer.getASCII() as 'base64';
      }

      for (const name of names) {
        resources.set(name, redirect);
      }
    }

    for (let i = 0, l = buffer.getUint16(); i < l; i++) {
      const names: string[] = [];
      for (let i = 0, l = buffer.getUint16() /* Read length of `names` array */; i < l; i++) {
        names.push(buffer.getASCII());
      }
      const content = buffer.getUTF8();
      const fnName = buffer.getASCII();
      const executionWorld = buffer.getASCII() as Scriptlet['executionWorld'];
      const requiresTrust = buffer.getBool();
      const dependencies: string[] = [];
      for (
        let i = 0, l = buffer.getUint16() /* Read length of `dependencies` array */;
        i < l;
        i++
      ) {
        dependencies.push(buffer.getASCII());
      }

      const scriptlet: Scriptlet = {
        names,
        content,
        fnName,
        executionWorld,
        requiresTrust,
        dependencies,
      };
      for (const name of names) {
        scriptlets.set(name, scriptlet);
      }
    }

    return new Resources({
      checksum,
      resources,
      scriptlets,
    });
  }

  public static parse(data: string, { checksum }: { checksum: string }): Resources {
    if (data.length === 0) {
      return new Resources({ checksum });
    }

    const distribution: ResourcesDistribution = JSON.parse(data);
    const resources: Map<string, Resource> = new Map();

    for (const redirect of distribution.redirects) {
      for (const name of redirect.names) {
        resources.set(name, redirect);
      }
    }

    const scriptlets: Map<string, Scriptlet> = new Map();
    for (const scriptlet of distribution.scriptlets) {
      scriptlet.executionWorld ??= 'MAIN';
      scriptlet.requiresTrust ??= false;
      for (const name of scriptlet.names) {
        scriptlets.set(name, scriptlet as Scriptlet);
      }
    }

    return new Resources({
      checksum,
      scriptlets,
      resources,
    });
  }

  public readonly checksum: string;
  public readonly scriptlets: Map<string, Scriptlet>;
  public readonly resources: Map<string, Resource>;
  public readonly scriptletCaches: Map<string, string>;

  constructor({
    checksum = '',
    resources = new Map(),
    scriptlets = new Map(),
  }: Partial<Resources> = {}) {
    this.checksum = checksum;
    this.resources = resources;
    this.scriptlets = scriptlets;
    this.scriptletCaches = scriptletsToJsMapping(scriptlets);
  }

  public getResource(name: string): Redirect & { dataUrl: string } {
    let body: string;
    let contentType: string;

    const resource = this.resources.get(name);
    if (resource === undefined) {
      const fallback = getResourceForMime(name);
      body = fallback.body;
      contentType = fallback.contentType;
    } else {
      body = resource.content;
      contentType = resource.contentType;
      if (resource.encoding !== undefined) {
        contentType += ';' + resource.encoding;
      }
    }

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

    this.resources.forEach(({ names, content, contentType, encoding }) => {
      estimatedSize += names.reduce((state, name) => state + sizeOfASCII(name), 2);
      estimatedSize += sizeOfUTF8(content);
      estimatedSize += sizeOfASCII(contentType);
      estimatedSize += sizeOfBool();
      if (encoding !== undefined) {
        estimatedSize += sizeOfASCII(encoding);
      }
    });

    this.scriptlets.forEach(({ names, content, dependencies, executionWorld }) => {
      estimatedSize += names.reduce((state, name) => state + sizeOfASCII(name), 2);
      estimatedSize += sizeOfUTF8(content);
      estimatedSize += sizeOfASCII(executionWorld);
      estimatedSize += sizeOfBool();
      estimatedSize += dependencies.reduce(
        (state, dependency) => state + sizeOfASCII(dependency),
        2,
      );
    });

    return estimatedSize;
  }

  public serialize(buffer: StaticDataView): void {
    // Serialize `checksum`
    buffer.pushASCII(this.checksum);

    // Serialize `resources`
    const resources: Set<Resource> = new Set(this.resources.values());
    buffer.pushUint16(resources.size);
    resources.forEach(({ names, content, contentType, encoding }) => {
      buffer.pushUint16(names.length);
      for (const name of names) {
        buffer.pushASCII(name);
      }
      buffer.pushUTF8(content);
      buffer.pushASCII(contentType);
      if (encoding === undefined) {
        buffer.pushBool(false);
      } else {
        buffer.pushBool(true);
        buffer.pushASCII(encoding);
      }
    });

    // Serialize `scriptlets`
    const scriptlets: Set<Scriptlet> = new Set(this.scriptlets.values());
    buffer.pushUint16(scriptlets.size);
    scriptlets.forEach(
      ({ names, content, fnName, dependencies, executionWorld, requiresTrust }) => {
        buffer.pushUint16(names.length);
        for (const name of names) {
          buffer.pushASCII(name);
        }
        buffer.pushUTF8(content);
        buffer.pushASCII(fnName);
        buffer.pushASCII(executionWorld);
        buffer.pushBool(requiresTrust);
        buffer.pushUint16(dependencies.length);
        dependencies.forEach((dependency) => buffer.pushASCII(dependency));
      },
    );
  }
}
