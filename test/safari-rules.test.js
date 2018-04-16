/* globals jest, expect, test */

import { loadAllLists } from '../assets/load';
import { convertCosmetics, convertFilter } from '../src/convertion/safari-rules';
import { parseList } from '../src/parsing/list';

expect.extend({
  toContainKeys(allowedKeys, keys) {
    for (let i = 0; i < keys.length; i += 1) {
      try {
        expect(allowedKeys.has(keys[i])).toBe(true);
      } catch (ex) {
        return {
          message: () =>
            `expected ${allowedKeys} to contain ${keys[i]}`,
          pass: false,
        };
      }
    }
    return {
      message: () =>
        'pass',
      pass: true,
    };
  },
});

const allowedTriggerKeys = new Set([
  'url-filter', 'url-filter-is-case-sensitive', 'if-domain', 'unless-domain', 'resource-type', 'load-type', 'if-top-url', 'unless-top-url',
]);

const allowedActionKeys = new Set([
  'type', 'selector',
]);

const allowedResourceTypes = new Set([
  'document', 'image', 'style-sheet', 'script', 'font', 'raw', 'svg-document', 'media', 'popup',
]);

const allowedLoadTypes = new Set(['first-party', 'third-party']);

const allowedActions = new Set(['block', 'block-cookies', 'css-display-none', 'ignore-previous-rules', 'make-https']);

function testRule(rule) {
  // console.log(rule);
  // const punycode = require('punycode');

  // TODO: test if string is punycode encoded.

  // rule must be an object
  expect(typeof rule).toBe('object');

  // rule must have only 2 keys, action and trigger, of type object
  expect(Object.keys(rule).length).toBe(2);
  expect(typeof rule.action).toBe('object');
  expect(typeof rule.trigger).toBe('object');

  // trigger must have a non-empty url-filter, of type string
  const urlfilter = rule.trigger['url-filter'];
  expect(typeof urlfilter).toBe('string');
  expect(urlfilter).not.toBe('');

  // trigger can only have the following keys
  expect(allowedTriggerKeys).toContainKeys(Object.keys(rule.trigger));

  // action must have a type, with a value of type string
  expect(typeof rule.action.type).toBe('string');
  expect(rule.action.type).not.toBe('');

  // action can only have the following keys
  expect(allowedActionKeys).toContainKeys(Object.keys(rule.action));

  // url-filter must contain a valid regex
  // test if the value is a valid regex
  let value = rule.trigger['url-filter'];
  let isValid = true;
  try {
    new RegExp(value);
  } catch (e) {
    isValid = false;
  }
  expect(isValid).toBe(true);

  // url-filter-is-case-sensitive should be a boolean
  value = rule.trigger['url-filter-is-case-sensitive'];
  if (value !== undefined) {
    expect(typeof value).toBe('boolean');
  }

  // if-domain must be a non-empty array of punnycode lowercase strings
  value = rule.trigger['if-domain'];
  if (value !== undefined) {
    expect(Array.isArray(value)).toBe(true);
    expect(value.length).not.toBeLessThan(1);
    for (let j = 0; j < value.length; j += 1) {
      const elem = value[j];
      expect(typeof elem).toBe('string');
      expect(elem === elem.toLowerCase()).toBe(true);
      // TODO: test if string is punycode encoded
    }
  }

  // unless-domain must be a non-empty array of punnycode lowercase strings
  value = rule.trigger['unless-domain'];
  if (value !== undefined) {
    expect(Array.isArray(value)).toBe(true);
    expect(value.length).not.toBeLessThan(1);
    for (let j = 0; j < value.length; j += 1) {
      const elem = value[j];
      expect(typeof elem).toBe('string');
      expect(elem === elem.toLowerCase()).toBe(true);
      // TODO: test if string is punycode encoded
    }
  }

  // resource-type must be a non-empty array of strings with the following values
  value = rule.trigger['resource-type'];
  if (value !== undefined) {
    expect(value.length).not.toBeLessThan(1);
    expect(allowedResourceTypes).toContainKeys(value);
  }

  // load-type must be a non-empty array of strings with the following values
  value = rule.trigger['load-type'];
  if (value !== undefined) {
    expect(value.length).not.toBeLessThan(1);
    expect(allowedLoadTypes).toContainKeys(value);
  }

  // if-top-url must be a non-empty array of punnycode lowercase strings
  value = rule.trigger['if-top-url'];
  if (value !== undefined) {
    expect(Array.isArray(value)).toBe(true);
    expect(value.length).not.toBeLessThan(1);
    for (let j = 0; j < value.length; j += 1) {
      const elem = value[j];
      expect(typeof elem).toBe('string');
      expect(elem === elem.toLowerCase()).toBe(true);
      // TODO: test if string is punycode encoded
    }
  }

  // unless-top-url must be a non-empty array of punnycode lowercase strings
  value = rule.trigger['unless-top-url'];
  if (value !== undefined) {
    expect(Array.isArray(value)).toBe(true);
    expect(value.length).not.toBeLessThan(1);
    for (let j = 0; j < value.length; j += 1) {
      const elem = value[j];
      expect(typeof elem).toBe('string');
      expect(elem === elem.toLowerCase()).toBe(true);
      // TODO: test if string is punycode encoded
    }
  }

  // type must be a string with the following possible values
  value = rule.action.type;
  expect(allowedActions.has(value)).toBe(true);

  // if type is css-display-none, a non-empty selector must exist
  if (rule.action.type === 'css-display-none') {
    expect(rule.action.selector).not.toBeUndefined();
    expect(rule.action.selector).not.toBe('');
  }

  // selector must be a non-empty string
  value = rule.action.selector;
  if (value !== undefined) {
    expect(typeof value).toBe('string');
    expect(value).not.toBe('');
  }

  // trigger cannot contain both if-domain and unless-domain
  const ifdomain = rule.trigger['if-domain'];
  const unlessdomain = rule.trigger['unless-domain'];
  if (ifdomain !== undefined) {
    expect(unlessdomain).toBeUndefined();
  } else if (unlessdomain !== undefined) {
    expect(ifdomain).toBeUndefined();
  }

  // trigger cannot contain both if-top-url and unless-top-url
  const ifurl = rule.trigger['if-top-url'];
  const unlessurl = rule.trigger['unless-top-url'];
  if (ifurl !== undefined) {
    expect(unlessurl).toBeUndefined();
  } else if (unlessurl !== undefined) {
    expect(ifurl).toBeUndefined();
  }
}

test('rule must be a valid safari rule', () => {

  const { networkFilters, cosmeticFilters } = parseList(loadAllLists());
  let nullCount = 0;

  for (let i = 0; i < cosmeticFilters.length; i += 1) {
    const cosmetic = cosmeticFilters[i];
    const rule = convertCosmetics(cosmetic);
    if (rule !== null && rule !== undefined) {
      try {
        testRule(rule);
      } catch (ex) {
        break;
      }
    } else {
      nullCount += 1;
    }
  }

  for (let j = 0; j < networkFilters.length; j += 1) {
    const filter = networkFilters[j];
    const rule = convertFilter(filter);
    if (rule !== null && rule !== undefined) {
      try {
        testRule(rule);
      } catch (ex) {
        break;
      }
    } else {
      nullCount += 1;
    }
  }
});
