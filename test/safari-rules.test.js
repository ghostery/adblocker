/* globals jest, expect, test */

// import {} from 'jest';
// import { f } from '../src/parsing/list';
// import { convertCosmetics, convertFilter } from '../src/convertion/safari-rules';

// expect.extend({
//   toBeConvertedTo(filter, expectedSafariRule) {
//     let safariRule;
//     if (filter.isNetworkFilter()) {
//       safariRule = convertFilter(filter);
//     } else {
//       safariRule = convertCosmetics(filter);
//     }

//     try {
//       expect(safariRule).toEqual(expectedSafariRule);
//     } catch (ex) {
//       return {
//         message: () =>
//           `expected ${filter.toString()} to be converted to ${JSON.stringify(expectedSafariRule)}, got: ${JSON.stringify(safariRule)}`,
//         pass: false,
//       };
//     }

//     return {
//       message: () =>
//         `expected ${filter.toString()} to not be converted to ${JSON.stringify(expectedSafariRule)}`,
//       pass: true,
//     };
//   },
// });

// describe('#convertFilter', () => {
//   it('converts', () => {
//     expect(f`||foo.com`).toBeConvertedTo({
//       action: { type: 'block' },
//       trigger: {
//         'url-filter': '(.*)?foo.com/',
//         'url-filter-is-case-sensitive': false,
//         'unless-domain': [],
//         'load-type': []
//       }
//     });
//   });
// });

// describe('#convertCosmetics', () => {
// });

jest.dontMock('../../../converted_rules.json');
const json = require('../../../converted_rules.json');

const allowedTriggerKeys = new Set([
  'url-filter', 'url-filter-is-case-sensitive', 'if-domain', 'unless-domain', 'resource-type', 'load-type', 'if-top-url', 'unless-top-url',
]);

const allowedActionKeys = new Set([
  'type', 'selector',
]);

const allowedResourceTypes = new Set([
  'document', 'image', 'style-sheet', 'script', 'font', 'raw', 'svg-document', 'media', 'popup',
]);

const allowedLoadTypeValues = new Set(['first-party', 'third-party']);

const allowedActions = new Set(['block', 'block-cookies', 'css-display-none', 'ignore-previous-rules', 'make-https']);

function checkObjectKeysAllowed(keys, allowedKeys) {
  for (let i = 0; i < keys.length; i += 1) {
    expect(allowedKeys.has(keys[i])).toBe(true);
  }
}

test('rule must be a valid safari rule', () => {
  for (let i = 0; i < json.length; i += 1) {
    // describe('convert Filters', () => {
    const rule = json[i];
    // TODO: check for lowercase and punnycode
    // rule
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
    checkObjectKeysAllowed(Object.keys(rule.trigger), allowedTriggerKeys);

    // action must have a type, with a value of type string
    expect(typeof rule.action.type).toBe('string');
    expect(rule.action.type).not.toBe('');

    // action can only have the following keys
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
    expect(isValid).toBe(true);

    // url-filter-is-case-sensitive should be a boolean
    value = rule.trigger['url-filter-is-case-sensitive'];
    if (value !== undefined) {
      expect(typeof value).toBe('boolean');
    }

    // if-domain must be an array of strings
    value = rule.trigger['if-domain'];
    if (value !== undefined) {
      expect(Array.isArray(value)).toBe(true);
      for (let j = 0; j < value.length; j += 1) {
        expect(typeof value[j]).toBe('string');
      }
    }

    // unless-domain must be an array of strings
    value = rule.trigger['unless-domain'];
    if (value !== undefined) {
      expect(Array.isArray(value)).toBe(true);
      for (let j = 0; j < value.length; j += 1) {
        expect(typeof value[j]).toBe('string');
      }
    }

    // resource-type must be an array of strings with the following values
    checkObjectKeysAllowed(
      rule.trigger['resource-type'] || [],
      allowedResourceTypes,
    );

    // load-type must be an array of strings with the following values
    checkObjectKeysAllowed(
      rule.trigger['load-type'] || [],
      allowedLoadTypeValues,
    );

    // if-top-url must be an array of strings
    value = rule.trigger['if-top-url'];
    if (value !== undefined) {
      expect(Array.isArray(value)).toBe(true);
      for (let j = 0; j < value.length; j += 1) {
        expect(typeof value[j]).toBe('string');
      }
    }

    // unless-top-url must be an array of strings
    value = rule.trigger['unless-top-url'];
    if (value !== undefined) {
      expect(Array.isArray(value)).toBe(true);
      for (let j = 0; j < value.length; j += 1) {
        expect(typeof value[j]).toBe('string');
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
});
