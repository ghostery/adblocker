/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { Scripting } from 'webextension-polyfill';

import { getResourceForMime } from '@remusao/small';

import { StaticDataView, sizeOfUTF8, sizeOfASCII, sizeOfBool } from './data-view.js';

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
  names: string[];
  body: string;
  contentType: string;
}

interface Scriptlet {
  names: string[];
  body: string;
  dependencies: string[];
  executionWorld: Scripting.ExecutionWorld;
  requiresTrust: boolean;
}

export interface ResourcesDistribution {
  redirects: Array<{
    names: string[];
    content: string;
    contentType: string;
    encoding?: 'base64';
  }>;
  scriptlets: Array<{
    names: string[];
    content: string;
    dependencies: string[];
    executionWorld?: Scripting.ExecutionWorld;
    requiresTrust?: boolean;
  }>;
}

// TODO - support empty resource body

const assembleScript = (script: string, dependencies: string[] = []): string =>
  [
    `if (typeof scriptletGlobals === 'undefined') { var scriptletGlobals = {}; }`,
    ...dependencies,
    `(${script})(...['{{1}}','{{2}}','{{3}}','{{4}}','{{5}}','{{6}}','{{7}}','{{8}}','{{9}}','{{10}}'].filter((a,i) => a !== '{{'+(i+1)+'}}').map((a) => decodeURIComponent(a)))`,
  ].join(';');

/**
 * Abstraction on top of resources.txt used for redirections as well as script
 * injections. It contains logic to parse, serialize and get resources by name
 * for use in the engine.
 */
export default class Resources {
  public static deserialize(buffer: StaticDataView): Resources {
    const checksum = buffer.getASCII();

    // Deserialize `resources`
    const resources: Resource[] = [];
    const scriptlets: Scriptlet[] = [];

    for (let i = 0, numberOfResources = buffer.getUint16(); i < numberOfResources; i++) {
      const names: string[] = [];
      for (let i = 0, numberOfNames = buffer.getUint16() /* Read length of `names` array */; i < numberOfNames; i++) {
        names.push(buffer.getASCII());
      }
      resources.push({
        names,
        body:buffer.getUTF8(),
        contentType: buffer.getASCII(),
      });
    }

    for (let i = 0, numberOfScriptlets = buffer.getUint16(); i < numberOfScriptlets; i++) {
      const names: string[] = [];
      for (let i = 0, numberOfNames = buffer.getUint16() /* Read length of `names` array */; i < numberOfNames; i++) {
        names.push(buffer.getASCII());
      }
      const content = buffer.getUTF8();
      const isExecutionWorldIsolated = buffer.getBool();
      const requiresTrust = buffer.getBool();
      const dependencies: string[] = [];
      for (
        let i = 0, l = buffer.getUint16() /* Read length of `dependencies` array */;
        i < l;
        i++
      ) {
        dependencies.push(buffer.getASCII());
      }

      scriptlets.push({
        names,
        body: content,
        executionWorld: isExecutionWorldIsolated === true ? 'ISOLATED' : 'MAIN',
        requiresTrust,
        dependencies,
      });
    }

    return new Resources({
      checksum,
      scriptlets,
      resources,
    });
  }

  public static parse(data: string, { checksum }: { checksum: string }): Resources {
    const distribution: ResourcesDistribution = JSON.parse(data);

    const resources: Resource[] = [];
    for (const redirect of distribution.redirects) {
      resources.push({
        names: redirect.names,
        body: redirect.content,
        contentType:
          redirect.contentType + (redirect.encoding !== undefined ? `;${redirect.encoding}` : ''),
      });
    }

    const scriptlets: Scriptlet[] = [];
    for (const scriptlet of distribution.scriptlets) {
      scriptlets.push({
        names: scriptlet.names,
        body: scriptlet.content,
        dependencies: scriptlet.dependencies,
        executionWorld: scriptlet.executionWorld ?? 'MAIN',
        requiresTrust: scriptlet.requiresTrust ?? false,
      });
    }

    return new Resources({
      checksum,
      scriptlets,
      resources,
    });
  }

  public readonly checksum: string;
  public readonly scriptlets: Scriptlet[];
  public readonly resources: Resource[];
  private readonly scriptletsByName: Map<string, Scriptlet>;
  private readonly resourcesByName: Map<string, Resource>;
  private readonly scriptletsCache: Map<string, string>;

  constructor({ checksum = '', resources = [], scriptlets = [] }: Partial<Resources> = {}) {
    this.checksum = checksum;
    this.resources = resources;
    this.scriptlets = scriptlets;
    this.scriptletsCache = new Map();
    this.resourcesByName = new Map();
    this.scriptletsByName = new Map();
    this.updateAliases();
  }

  /**
   * In case of scriptlet or resource update, you need to clear the populated caches and mappings by calling this method.
   */
  public updateAliases() {
    this.scriptletsCache.clear();
    this.resourcesByName.clear();
    this.scriptletsByName.clear();
    for (const resource of this.resources) {
      for (const name of resource.names) {
        this.resourcesByName.set(name, resource);
      }
    }
    for (const scriptlet of this.scriptlets) {
      for (const name of scriptlet.names) {
        this.scriptletsByName.set(name, scriptlet);
      }
    }
  }

  public getResource(name: string): { body: string; contentType: string; dataUrl: string } {
    const { body, contentType } = this.resourcesByName.get(name) || getResourceForMime(name);

    let dataUrl;
    if (contentType.indexOf(';') !== -1) {
      dataUrl = `data:${contentType},${body}`;
    } else {
      dataUrl = `data:${contentType};base64,${btoaPolyfill(body)}`;
    }

    return { body, contentType, dataUrl };
  }

  public getScriptlet(name: string): string | undefined {
    if (name.endsWith('.fn')) {
      return undefined;
    }

    const scriptlet = this.scriptletsByName.get(name) || this.scriptletsByName.get(name + '.js');

    if (scriptlet === undefined) {
      this.scriptletsCache.set(name, '');
      return undefined;
    }

    const [scriptletName] = scriptlet.names;
    let script = this.scriptletsCache.get(scriptletName);

    if (script !== undefined) {
      if (script.length === 0) {
        return undefined;
      }
      return script;
    }

    const dependencies = this.getScriptletDepenencies(scriptlet);
    script = assembleScript(scriptlet.body, dependencies);

    this.scriptletsCache.set(scriptletName, script);
    return script;
  }

  private getScriptletDepenencies(scriptlet: Scriptlet): string[] {
    const dependencies: Map<string, string> = new Map();
    const queue: string[] = [...scriptlet.dependencies];

    while (queue.length > 0) {
      const dependencyName = queue.pop()!;
      if (dependencies.has(dependencyName)) {
        continue;
      }
      const dependency = this.scriptletsByName.get(dependencyName);
      if (dependency === undefined) {
        dependencies.set(
          dependencyName,
          `console.warn('@ghostery/adblocker: cannot find dependency: "${dependencyName}" for scriptlet: "${scriptlet.names[0]}"')`,
        );
        continue;
      }
      dependencies.set(dependencyName, dependency.body);
      queue.push(...dependency.dependencies);
    }

    return Array.from(dependencies.values());
  }

  public getSerializedSize(): number {
    let estimatedSize = sizeOfASCII(this.checksum) + 2; // resources.size

    this.resources.forEach(({ names, body: content, contentType }) => {
      estimatedSize += names.reduce((state, name) => state + sizeOfASCII(name), 2);
      estimatedSize += sizeOfUTF8(content);
      estimatedSize += sizeOfASCII(contentType);
    });

    this.scriptlets.forEach(({ names, body: content, dependencies }) => {
      estimatedSize += names.reduce((state, name) => state + sizeOfASCII(name), 2);
      estimatedSize += sizeOfUTF8(content);
      estimatedSize += sizeOfBool(); // executionWorld
      estimatedSize += sizeOfBool(); // requiresTrust
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
    buffer.pushUint16(this.resources.length);
    this.resources.forEach(({ names, body: content, contentType }) => {
      buffer.pushUint16(names.length);
      for (const name of names) {
        buffer.pushASCII(name);
      }
      buffer.pushUTF8(content);
      buffer.pushASCII(contentType);
    });

    // Serialize `scriptlets`
    buffer.pushUint16(this.scriptlets.length);
    this.scriptlets.forEach(
      ({ names, body: content, dependencies, executionWorld, requiresTrust }) => {
        buffer.pushUint16(names.length);
        for (const name of names) {
          buffer.pushASCII(name);
        }
        buffer.pushUTF8(content);
        buffer.pushBool(executionWorld === 'ISOLATED');
        buffer.pushBool(requiresTrust === true);
        buffer.pushUint16(dependencies.length);
        dependencies.forEach((dependency) => buffer.pushASCII(dependency));
      },
    );
  }
}
