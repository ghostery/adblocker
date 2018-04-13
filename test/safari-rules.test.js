import {} from 'jest';
import { f } from '../src/parsing/list';
import { convertCosmetics, convertFilter } from '../src/convertion/safari-rules';

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
let json = require('../../../converted_rules.json');
let i;
// json.length
for (i = 0; i < json.length; i++) {
  //describe('convert Filters', () => {
    let rule = json[i];
    // TODO: check for lowercase and punnycode
    // rule
    test('rule must be a valid safari rule', () => {
      // rule must be an object
      expect(typeof(rule)).toBe('object');
      // rule must have only 2 keys, action and trigger, of type object
      expect(Object.keys(rule).length).toBe(2);
      expect(typeof(rule.action)).toBe('object');
      expect(typeof(rule.trigger)).toBe('object');
      // trigger must have a non-empty url-filter, of type string
      let urlfilter = rule.trigger['url-filter'];
      expect(typeof(urlfilter)).toBe('string');
      expect(urlfilter).not.toBe('');
      // trigger can only have the following keys
      let triggerKeys = Object.keys(rule.trigger);
      let allowedKeys = ['url-filter', 'url-filter-is-case-sensitive', 'if-domain', 'unless-domain', 'resource-type', 'load-type', 'if-top-url', 'unless-top-url'];
      expect(allowedKeys).toEqual(expect.arrayContaining(triggerKeys));
      // action must have a type, with a value of type string
      expect(typeof(rule.action.type)).toBe('string');
      expect(rule.action.type).not.toBe('');
      // action can only have the following keys
      let actionKeys = Object.keys(rule.action);
      allowedKeys = ['type', 'selector'];
      expect(allowedKeys).toEqual(expect.arrayContaining(actionKeys));
      // url-filter must contain a valid regex
      // test if the value is a valid regex
      let value = rule.trigger['url-filter'];
      let isValid = true;
      try {
        new RegExp(value);
      } catch(e) {
          isValid = false;
      }
      expect(isValid).toBe(true);
      // url-filter-is-case-sensitive should be a boolean
      value = rule.trigger['url-filter-is-case-sensitive'];
      if (value !== undefined) {
        expect(typeof(value)).toBe('boolean');
      }
      // if-domain must be an array of strings
      value = rule.trigger['if-domain'];
      if (value !== undefined) {
        expect(Array.isArray(value)).toBe(true);
        let i;
        for (i = 0; i < value.length; i++) {
          expect(typeof(value[i])).toBe('string');
        }
      }
      // unless-domain must be an array of strings
      value = rule.trigger['unless-domain'];
      if (value !== undefined) {
        expect(Array.isArray(value)).toBe(true);
        let i;
        for (i = 0; i < value.length; i++) {
          expect(typeof(value[i])).toBe('string');
        }
      }
      // resource-type must be an array of strings with the following values
      let values = rule.trigger['resource-type'];
      if(values !== undefined) {
        let allowedValues = ['document', 'image', 'style-sheet', 'script', 'font', 'raw', 'svg-document', 'media', 'popup'];
        expect(allowedValues).toEqual(expect.arrayContaining(values));
      }
      // load-type must be an array of strings with the following values
      values = rule.trigger['load-type'];
      if(values !== undefined) {
        let allowedValues = ['first-party', 'third-party'];
        expect(allowedValues).toEqual(expect.arrayContaining(values));
      }
      // if-top-url must be an array of strings
      value = rule.trigger['if-top-url'];
      if (value !== undefined) {
        expect(Array.isArray(value)).toBe(true);
        let i;
        for (i = 0; i < value.length; i++) {
          expect(typeof(value[i])).toBe('string');
        }
      }
      // unless-top-url must be an array of strings
      value = rule.trigger['unless-top-url'];
      if (value !== undefined) {
        expect(Array.isArray(value)).toBe(true);
        let i;
        for (i = 0; i < value.length; i++) {
          expect(typeof(value[i])).toBe('string');
        }
      }
      // type must be a string with the following possible values
      let allowedValues = ['block', 'block-cookies', 'css-display-none', 'ignore-previous-rules', 'make-https'];
      value = rule.action.type;
      expect(typeof(value)).toBe('string');
      expect(allowedValues).toEqual(expect.arrayContaining([value]));
      // if type is css-display-none, a non-empty selector must exist
      if (rule.action.type === 'css-display-none') {
        expect(rule.action.selector).not.toBeUndefined();
        expect(rule.action.selector).not.toBe('');
      }
      // selector must be a non-empty string
      value = rule.action.selector;
      if (value !== undefined) {
        expect(typeof(value)).toBe('string');
        expect(value).not.toBe('');
      }
      // trigger cannot contain both if-domain and unless-domain
      let ifdomain = rule.trigger['if-domain'];
      let unlessdomain = rule.trigger['unless-domain'];
      if (ifdomain !== undefined) {
        expect(unlessdomain).toBeUndefined();
      }
      else if (unlessdomain !== undefined) {
        expect(ifdomain).toBeUndefined();
      }
      // trigger cannot contain both if-top-url and unless-top-url
      let ifurl = rule.trigger['if-top-url'];
      let unlessurl = rule.trigger['unless-top-url'];
      if (ifurl !== undefined) {
        expect(unlessurl).toBeUndefined();
      }
      else if (unlessurl !== undefined) {
        expect(ifurl).toBeUndefined();
      }
    });

    // test('', () => {

    // });
  //});
}
