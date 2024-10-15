/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import type { Scripting } from 'webextension-polyfill';

import { getResourceForMime } from '@remusao/small';

import { StaticDataView, sizeOfUTF8, sizeOfASCII, sizeOfBool, sizeOfByte } from './data-view.js';

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
  name: string;
  aliases: string[];
  body: string;
  contentType: string;
}

function isResourceValid(resource: any): resource is Resource {
  if (resource === null) {
    return false;
  }

  if (typeof resource !== 'object') {
    return false;
  }

  const { name, aliases, body, contentType } = resource;

  if (typeof name !== 'string') {
    return false;
  }

  if (!Array.isArray(aliases) || !aliases.every((alias) => typeof alias === 'string')) {
    return false;
  }

  if (typeof body !== 'string') {
    return false;
  }

  if (typeof contentType !== 'string') {
    return false;
  }

  return true;
}

interface Scriptlet {
  name: string;
  aliases: string[];
  body: string;
  dependencies: string[];
  // TODO: add support for scritplet injection in ISOLATED worlds
  executionWorld?: 'MAIN' | 'ISOLATED';
  // TODO: add support for trusted scritplet
  requiresTrust?: boolean;
}

function isScriptletValid(scriptlet: any): scriptlet is Scriptlet {
  if (scriptlet === null) {
    return false;
  }

  if (typeof scriptlet !== 'object') {
    return false;
  }

  const { name, aliases, body, dependencies, executionWorld, requiresTrust } = scriptlet;

  if (typeof name !== 'string') {
    return false;
  }

  if (!Array.isArray(aliases) || !aliases.every((alias) => typeof alias === 'string')) {
    return false;
  }

  if (typeof body !== 'string') {
    return false;
  }

  if (
    !Array.isArray(dependencies) ||
    !dependencies.every((depencency) => typeof depencency === 'string')
  ) {
    return false;
  }

  if (
    typeof executionWorld !== 'undefined' &&
    executionWorld !== 'MAIN' &&
    executionWorld !== 'ISOLATED'
  ) {
    return false;
  }

  if (typeof requiresTrust !== 'undefined' && typeof requiresTrust !== 'boolean') {
    return false;
  }

  return true;
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
      const name = buffer.getASCII();
      const aliases: string[] = [];
      for (let i = 0, numberOfAliases = buffer.getUint16(); i < numberOfAliases; i++) {
        aliases.push(buffer.getASCII());
      }
      resources.push({
        name,
        aliases,
        body: buffer.getUTF8(),
        contentType: buffer.getASCII(),
      });
    }

    for (let i = 0, numberOfScriptlets = buffer.getUint16(); i < numberOfScriptlets; i++) {
      const name = buffer.getASCII();
      const aliases: string[] = [];
      for (let i = 0, numberOfAliases = buffer.getUint16(); i < numberOfAliases; i++) {
        aliases.push(buffer.getASCII());
      }
      const body = buffer.getUTF8();
      const hasExecutionWorld = buffer.getBool();
      const isExecutionWorldIsolated = buffer.getBool();
      const hasRequiresTrust = buffer.getBool();
      const requiresTrust = buffer.getBool();
      const dependencies: string[] = [];
      for (let i = 0, numberOfDependencies = buffer.getUint16(); i < numberOfDependencies; i++) {
        dependencies.push(buffer.getASCII());
      }
      const scriptlet: Scriptlet = {
        name,
        aliases,
        body,
        dependencies,
      };
      if (hasExecutionWorld) {
        scriptlet.executionWorld = isExecutionWorldIsolated === true ? 'ISOLATED' : 'MAIN';
      }
      if (hasRequiresTrust) {
        scriptlet.requiresTrust = requiresTrust;
      }
      scriptlets.push(scriptlet);
    }

    return new Resources({
      checksum,
      scriptlets,
      resources,
    });
  }

  public static parse(data: string, { checksum }: { checksum: string }): Resources {
    const distribution = JSON.parse(data);

    if (distribution === null || typeof distribution !== 'object') {
      throw new Error(`Cannot parse resources.json`);
    }

    const { scriptlets: rawScriplets, redirects: rawResources } = distribution;

    const resources: Resource[] = [];
    if (Array.isArray(rawResources)) {
      for (const redirect of rawResources) {
        if (isResourceValid(redirect)) {
          resources.push(redirect);
        } else {
          throw new Error(`Cannot parse redirect resource: ${JSON.stringify(redirect)}`);
        }
      }
    }

    const scriptlets: Scriptlet[] = [];
    if (Array.isArray(rawScriplets)) {
      for (const scriptlet of rawScriplets) {
        if (isScriptletValid(scriptlet)) {
          scriptlets.push(scriptlet);
        } else {
          throw new Error(`Cannot parse scriptlet: ${JSON.stringify(scriptlet)}`);
        }
      }
    }

    return new Resources({
      checksum,
      scriptlets,
      resources,
    });
  }

  public static copy(sourceResources: Resources) {
    const checksum = sourceResources.checksum;
    const resources: Resource[] = [];
    const scriptlets: Scriptlet[] = [];

    for (const resource of sourceResources.resources) {
      resources.push(structuredClone(resource));
    }

    for (const scriptlet of sourceResources.scriptlets) {
      scriptlets.push(structuredClone(scriptlet));
    }

    return new this({
      checksum,
      resources,
      scriptlets,
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
      for (const name of [resource.name, ...resource.aliases]) {
        if (this.resourcesByName.has(name)) {
          throw new Error(`Resource with a name or alias "${name}" already exists`);
        }
        this.resourcesByName.set(name, resource);
      }
    }
    for (const scriptlet of this.scriptlets) {
      for (const name of [scriptlet.name, ...scriptlet.aliases]) {
        if (this.scriptletsByName.has(name)) {
          throw new Error(`Scriptlet with a name or alias "${name}" already exists`);
        }
        this.scriptletsByName.set(name, scriptlet);
      }
    }

    // iterate the scriptlets again once all dependencies are present in scriptletsByName
    for (const scriptlet of this.scriptlets) {
      for (const dependencyName of scriptlet.dependencies) {
        if (!this.scriptletsByName.has(dependencyName)) {
          throw new Error(
            `Scriptlet with a name or alias "${scriptlet.name}" has a missing depencency "${dependencyName}"`,
          );
        }
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
    // Scriptlets with names ending with `.fn` is always treated as dependencies
    if (name.endsWith('.fn')) {
      return undefined;
    }

    const scriptlet = this.scriptletsByName.get(name.endsWith('.js') ? name : `${name}.js`);

    if (scriptlet === undefined) {
      return undefined;
    }

    let script = this.scriptletsCache.get(scriptlet.name);

    if (script !== undefined) {
      if (script.length === 0) {
        return undefined;
      }
      return script;
    }

    const dependencies = this.getScriptletDependencies(scriptlet);
    script = assembleScript(scriptlet.body, dependencies);

    this.scriptletsCache.set(scriptlet.name, script);
    return script;
  }

  private getScriptletDependencies(scriptlet: Scriptlet): string[] {
    const dependencies: Map<string, string> = new Map();
    const queue: string[] = [...scriptlet.dependencies];

    while (queue.length > 0) {
      const dependencyName = queue.pop()!;
      if (dependencies.has(dependencyName)) {
        continue;
      }
      // dependecy is there as presence is enforced by the updateAliases
      const dependency = this.scriptletsByName.get(dependencyName)!;
      dependencies.set(dependencyName, dependency.body);
      queue.push(...dependency.dependencies);
    }

    return Array.from(dependencies.values());
  }

  public getSerializedSize(): number {
    let estimatedSize = sizeOfASCII(this.checksum); // resources.size

    estimatedSize += 2 * sizeOfByte();
    for (const { name, aliases, body: content, contentType } of this.resources) {
      estimatedSize += sizeOfASCII(name);
      estimatedSize += aliases.reduce(
        (state, alias) => state + sizeOfASCII(alias),
        2 * sizeOfByte(),
      );
      estimatedSize += sizeOfUTF8(content);
      estimatedSize += sizeOfASCII(contentType);
    }

    estimatedSize += 2 * sizeOfByte();
    for (const { name, aliases, body: content, dependencies } of this.scriptlets) {
      estimatedSize += sizeOfASCII(name);
      estimatedSize += aliases.reduce(
        (state, alias) => state + sizeOfASCII(alias),
        2 * sizeOfByte(),
      );
      estimatedSize += sizeOfUTF8(content);
      estimatedSize += sizeOfBool(); // executionWorld present
      estimatedSize += sizeOfBool(); // executionWorld
      estimatedSize += sizeOfBool(); // requiresTrust present
      estimatedSize += sizeOfBool(); // requiresTrust
      estimatedSize += dependencies.reduce(
        (state, dependency) => state + sizeOfASCII(dependency),
        2 * sizeOfByte(),
      );
    }

    return estimatedSize;
  }

  public serialize(buffer: StaticDataView): void {
    // Serialize `checksum`
    buffer.pushASCII(this.checksum);

    // Serialize `resources`
    buffer.pushUint16(this.resources.length);
    for (const { name, aliases, body: content, contentType } of this.resources) {
      buffer.pushASCII(name);
      buffer.pushUint16(aliases.length);
      for (const alias of aliases) {
        buffer.pushASCII(alias);
      }
      buffer.pushUTF8(content);
      buffer.pushASCII(contentType);
    }

    // Serialize `scriptlets`
    buffer.pushUint16(this.scriptlets.length);
    for (const {
      name,
      aliases,
      body: content,
      dependencies,
      executionWorld,
      requiresTrust,
    } of this.scriptlets) {
      buffer.pushASCII(name);
      buffer.pushUint16(aliases.length);
      for (const alias of aliases) {
        buffer.pushASCII(alias);
      }
      buffer.pushUTF8(content);
      buffer.pushBool(executionWorld !== undefined);
      buffer.pushBool(executionWorld === 'ISOLATED');
      buffer.pushBool(requiresTrust !== undefined);
      buffer.pushBool(requiresTrust === true);
      buffer.pushUint16(dependencies.length);
      dependencies.forEach((dependency) => buffer.pushASCII(dependency));
    }
  }
}
