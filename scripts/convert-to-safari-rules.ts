import { convertCosmetics, convertFilter } from '../src/convertion/safari-rules';
import { parseList } from '../src/parsing/list';
import { fetchLists } from './fetch-lists';

const allowedTriggerKeys = new Set([
  'url-filter', 'url-filter-is-case-sensitive', 'if-domain',
  'unless-domain', 'resource-type', 'load-type', 'if-top-url', 'unless-top-url',
]);

const allowedActionKeys = new Set([
  'type', 'selector',
]);

const allowedResourceTypes = new Set([
  'document', 'image', 'style-sheet', 'script', 'font', 'raw', 'svg-document', 'media', 'popup',
]);

const allowedLoadTypes = new Set(['first-party', 'third-party']);

const allowedActions = new Set(['block', 'block-cookies', 'css-display-none', 'ignore-previous-rules', 'make-https']);

function checkObjectKeysAllowed(keys, allowedKeys) {
  for (let i = 0; i < keys.length; i += 1) {
    if (!allowedKeys.has(keys[i])) {
      throw new Error('key not allowed');
     }
  }
}

function isOfType(thing, type, errormsg: string) {
  isSame(typeof thing, type, errormsg);
}

function isSame(thing, anotherThing, errormsg: string) {
  if (thing !== anotherThing) {
    throw new Error(errormsg + ' | ' + thing + ' | ' + anotherThing);
  }
}

function isNotSame(thing, anotherThing, errormsg: string) {
  if (thing === anotherThing) {
    throw new Error(errormsg + ' | ' + thing + ' | ' + anotherThing);
  }
}

function isGreaterThan(thing: number, anotherThing: number, errormsg: string) {
  if (thing <= anotherThing) {
    throw new Error(errormsg + ' | ' + thing + ' | ' + anotherThing);
  }
}

export function testRule(rule) {

  // TODO: test if string is punycode encoded.

  // rule must be an object
  // expect(typeof rule).toBe('object');
  isOfType(rule, 'object', 'rule must be of type object');

  // rule must have only 2 keys, action and trigger, of type object
  // expect(Object.keys(rule).length).toBe(2);
  isSame(Object.keys(rule).length, 2, 'rule must have 2 keys');
  // expect(typeof rule.action).toBe('object');
  isOfType(rule.action, 'object',  'action must be of type object');
  // expect(typeof rule.trigger).toBe('object');
  isOfType(rule.trigger, 'object',  'trigger must be of type object');

  // trigger must have a non-empty url-filter, of type string
  const urlfilter = rule.trigger['url-filter'];
  // expect(typeof urlfilter).toBe('string');
  isOfType(urlfilter, 'string',  'url-filter must be of type string');
  // expect(urlfilter).not.toBe('');
  isNotSame(urlfilter, '', 'url-filter cannot be an empty string');

  // trigger can only have the following keys
  // expect(allowedTriggerKeys).toContainKeys(Object.keys(rule.trigger));
  checkObjectKeysAllowed(Object.keys(rule.trigger), allowedTriggerKeys);

  // action must have a type, with a value of type string
  // expect(typeof rule.action.type).toBe('string');
  isOfType(rule.action.type, 'string', 'action must have a type, with a value of type string');
  // expect(rule.action.type).not.toBe('');
  isNotSame(rule.action.type, '', 'type cannot be an empty string');

  // action can only have the following keys
  // expect(allowedActionKeys).toContainKeys(Object.keys(rule.action));
  checkObjectKeysAllowed(Object.keys(rule.action), allowedActionKeys);

  // url-filter must contain a valid regex
  // test if the value is a valid regex
  let value = rule.trigger['url-filter'];
  let isValid = true;
  try {
    new RegExp(value);
  } catch (e) {
    isValid = false;
  }
  // expect(isValid).toBe(true);
  isSame(isValid, true, 'url-filter must be a valid regex');

  // url-filter-is-case-sensitive should be a boolean
  value = rule.trigger['url-filter-is-case-sensitive'];
  if (value !== undefined) {
    // expect(typeof value).toBe('boolean');
    isOfType(value, 'boolean', 'url-filter-is-case-sensitive should be a boolean');
  }

  // if-domain must be a non-empty array of punnycode lowercase strings
  value = rule.trigger['if-domain'];
  if (value !== undefined) {
    // expect(Array.isArray(value)).toBe(true);
    isSame(Array.isArray(value), true, 'if-domain must be a non-empty array of punnycode lowercase strings');
    // expect(value.length).not.toBeLessThan(1);
    isGreaterThan(value.length, 0, 'if-domain cannot be an empty array');

    for (let j = 0; j < value.length; j += 1) {
      const elem = value[j];
      // expect(typeof elem).toBe('string');
      isOfType(elem, 'string', 'domain must be a string');
      // expect(elem === elem.toLowerCase()).toBe(true);
      isSame(elem, elem.toLowerCase(), 'domain must be a lowercase string');
      // TODO: test if string is punycode encoded
    }
  }

  // unless-domain must be a non-empty array of punnycode lowercase strings
  value = rule.trigger['unless-domain'];
  if (value !== undefined) {
    // expect(Array.isArray(value)).toBe(true);
    isSame(Array.isArray(value), true, 'unless-domain must be a non-empty array of punnycode lowercase strings');
    // expect(value.length).not.toBeLessThan(1);
    isGreaterThan(value.length, 0, 'unless-domain cannot be an empty array');
    for (let j = 0; j < value.length; j += 1) {
      const elem = value[j];
      // expect(typeof elem).toBe('string');
      isOfType(elem, 'string', 'domain must be a string');
      // expect(elem === elem.toLowerCase()).toBe(true);
      isSame(elem, elem.toLowerCase(), 'domain must be a lowercase string');
      // TODO: test if string is punycode encoded
    }
  }

  // resource-type must be a non-empty array of strings with the following values
  value = rule.trigger['resource-type'];
  if (value !== undefined) {
    // expect(value.length).not.toBeLessThan(1);
    isGreaterThan(value.length, 0, 'resource-type must be a non-empty array of strings');
    checkObjectKeysAllowed(value, allowedResourceTypes);
  }

  // load-type must be a non-empty array of strings with the following values
  value = rule.trigger['load-type'];
  if (value !== undefined) {
    // expect(value.length).not.toBeLessThan(1);
    isGreaterThan(value.length, 0, 'load-type must be a non-empty array of strings');
    checkObjectKeysAllowed(value, allowedLoadTypes);
  }

  // if-top-url must be a non-empty array of punnycode lowercase strings
  value = rule.trigger['if-top-url'];
  if (value !== undefined) {
    // expect(Array.isArray(value)).toBe(true);
    isSame(Array.isArray(value), true, 'if-top-url must be a non-empty array of punnycode lowercase strings');
    // expect(value.length).not.toBeLessThan(1);
    isGreaterThan(value.length, 0, 'if-top-url cannot be an empty array');
    for (let j = 0; j < value.length; j += 1) {
      const elem = value[j];
      // expect(typeof elem).toBe('string');
      isOfType(elem, 'string', 'domain must be a string');
      // expect(elem === elem.toLowerCase()).toBe(true);
      isSame(elem, elem.toLowerCase(), 'domain must be a lowercase string');
      // TODO: test if string is punycode encoded
    }
  }

  // unless-top-url must be a non-empty array of punnycode lowercase strings
  value = rule.trigger['unless-top-url'];
  if (value !== undefined) {
    // expect(Array.isArray(value)).toBe(true);
    isSame(Array.isArray(value), true, 'unless-top-url must be a non-empty array of punnycode lowercase strings');
    // expect(value.length).not.toBeLessThan(1);
    isGreaterThan(value.length, 0, 'unless-top-url cannot be an empty array');
    for (let j = 0; j < value.length; j += 1) {
      const elem = value[j];
      // expect(typeof elem).toBe('string');
      isOfType(elem, 'string', 'domain must be a string');
      // expect(elem === elem.toLowerCase()).toBe(true);
      isSame(elem, elem.toLowerCase(), 'domain must be a lowercase string');
      // TODO: test if string is punycode encoded
    }
  }

  // type must be a string with the following possible values
  value = rule.action.type;
  // expect(allowedActions.has(value)).toBe(true);
  isSame(allowedActions.has(value), true, 'invalid type');

  // if type is css-display-none, a non-empty selector must exist
  if (rule.action.type === 'css-display-none') {
    // expect(rule.action.selector).not.toBeUndefined();
    isNotSame(rule.action.selector, undefined, 'if type is css-display-none, a non-empty selector must exist');
    // expect(rule.action.selector).not.toBe('');
    isNotSame(rule.action.selector, '', 'selector cannot be an empty string when the type is css-display-none');
  }

  // selector must be a non-empty string
  value = rule.action.selector;
  if (value !== undefined) {
    // expect(typeof value).toBe('string');
    isOfType(value, 'string', 'selector must be a string');
    // expect(value).not.toBe('');
    isNotSame(value, '', 'selector cannot be an emtpy string');
  }

  // trigger cannot contain both if-domain and unless-domain
  const ifdomain = rule.trigger['if-domain'];
  const unlessdomain = rule.trigger['unless-domain'];
  if (ifdomain !== undefined) {
    // expect(unlessdomain).toBeUndefined();
    isSame(unlessdomain, undefined, 'trigger cannot contain both if-domain and unless-domain');
  } else if (unlessdomain !== undefined) {
    // expect(ifdomain).toBeUndefined();
    isSame(ifdomain, undefined, 'trigger cannot contain both if-domain and unless-domain');
  }

  // trigger cannot contain both if-top-url and unless-top-url
  const ifurl = rule.trigger['if-top-url'];
  const unlessurl = rule.trigger['unless-top-url'];
  if (ifurl !== undefined) {
    // expect(unlessurl).toBeUndefined();
    isSame(unlessurl, undefined, 'trigger cannot contain both if-top-url and unless-top-url');
  } else if (unlessurl !== undefined) {
    // expect(ifurl).toBeUndefined();
    isSame(ifurl, undefined, 'trigger cannot contain both if-top-url and unless-top-url');
  }
}

export function convertAndValidateFilters(lists) {
  const { networkFilters, cosmeticFilters } = parseList(lists);
  const rules: any[] = [];
  const exceptions: any[] = [];

  for (let j = 0; j < networkFilters.length; j += 1) {
    const filter = networkFilters[j];
    const rule = convertFilter(filter);
    if (rule !== null && rule !== undefined) {
      try {
        testRule(rule);
      } catch (ex) {
        return ex;
      }
      if (rule.action.type === 'ignore-previous-rules') {
        exceptions.push(rule);
      } else {
        rules.push(rule);
      }
    }
  }

  for (let i = 0; i < cosmeticFilters.length; i += 1) {
    const cosmetic = cosmeticFilters[i];
    const rule = convertCosmetics(cosmetic);
    if (rule !== null && rule !== undefined) {
      try {
        testRule(rule);
      } catch (ex) {
        return ex;
      }
      rules.push(rule);
    }
  }
  return JSON.stringify([...rules, ...exceptions]);
}

const adblockerLists = [
  'https://easylist.to/easylist/easylist.txt',
  'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/annoyances.txt',
  'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/badware.txt',
  'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/filters.txt',
  'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resource-abuse.txt',
  'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/unbreak.txt',
];

// const antitrackingLists = [
//   'https://easylist.to/easylist/easyprivacy.txt',
//   'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/privacy.txt',
// ]

function main() {
  fetchLists(adblockerLists).then(list => {
    console.log(convertAndValidateFilters(list.join('\n')));
  });
}

main();
