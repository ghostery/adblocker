/*!
 * Copyright (c) 2017-present Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { HTMLSelector } from '../src/filters/cosmetic';
import {
  default as StreamingHtmlFilter,
  extractSelectorsFromRules,
  extractTagsFromHtml,
} from '../src/html-filtering';

// NOTE: `doc` is defined at the end of this file.

describe('html-filtering', () => {
  describe('#extractTagsFromHtml', () => {
    const tags = (html: string) => extractTagsFromHtml(html, 'script')[0];

    it('extracts all tags', () => {
      expect(tags('')).toEqual([]);
      expect(tags('foo')).toEqual([]);
      expect(tags('<script>bar</script>')).toEqual([[0, '<script>bar</script>']]);
      expect(tags('foo <script>bar</script>')).toEqual([[4, '<script>bar</script>']]);
      expect(tags(`
<!DOCTYPE html> <html lang="en"> <head>
<script>script1</script>
<script id="_$cookiemonster"/>
<script attr=321>console.log("<script>")</script>
`)).toEqual([
  [41, '<script>script1</script>'],
  [66, '<script id="_$cookiemonster"/>'],
  [97, '<script attr=321>console.log("<script>")</script>'],
]);
    });

    it('extracts tags from streamed document', () => {
      const tags1 = tags(doc);
      const tags2 = [];
      let rest = '';
      let offset = 0;
      for (let i = 0; i < doc.length; i += 10) {
        const result = extractTagsFromHtml(rest + doc.slice(i, i + 10), 'script');
        tags2.push(...result[0].map(([index, tag]) => [index + offset, tag]));
        offset += result[1].length;
        rest = result[2];
      }
      expect(tags1).toEqual(tags2);
    });

    describe('consumes as much input as possible', () => {
      const remains = (html: string) => {
        const result = extractTagsFromHtml(html, 'script');
        const parsed = result[1];
        const rest = result[2];
        expect(parsed + rest).toEqual(html);
        return rest;
      };

      it('handles empty', () => {
        expect(remains('')).toEqual('');
      });

      it('handles no tag', () => {
        expect(remains('foo')).toEqual('');
      });

      it('handles one tag', () => {
        expect(remains('foo<script>foo</script>')).toEqual('');
      });

      const str = 'foo<script>foo</script>foo<tag/><scri></scri><script>foo</script>';
      it('remains nothing with full tags', () => {
        expect(remains(str)).toEqual('');
      });

      it('remains partial', () => {
        expect(remains('foo <')).toEqual('<');
        expect(remains('foo <s')).toEqual('<s');
        expect(remains('foo <sc')).toEqual('<sc');
        expect(remains('foo <scr')).toEqual('<scr');
        expect(remains('foo <scri')).toEqual('<scri');
        expect(remains('foo <scrip')).toEqual('<scrip');
      });

      // Test all possible partial tags ending the string
      const tagStartIndex = 45; // start of last <script> tag
      for (let i = str.length - 1; i >= tagStartIndex; i -= 1) {
        const partial = str.slice(0, i);
        it(partial, () => {
          expect(remains(partial)).toBe(str.slice(tagStartIndex, i));
        });
      }
    });
  });

  describe('#extractSelectorsFromRules', () => {
    it('empty', () => {
      const [patterns, regexps] = extractSelectorsFromRules([]);
      expect(patterns).toHaveLength(0);
      expect(regexps).toHaveLength(0);
    });

    it('parses patterns and regexps', () => {
      const [patterns, regexps] = extractSelectorsFromRules([
        ['script', ['foo']],
        ['script', ['/foo/']],
        ['script', ['(bar)']],
        ['script', ['/(bar)/i']],
      ]);
      expect(patterns).toEqual(['foo', '(bar)']);
      expect(regexps).toEqual([/foo/, /(bar)/i]);
    });
  });

  describe('#StreamingHtmlFilter', () => {
    const filter = (html: string, filters: HTMLSelector[]): string => {
      const stream = new StreamingHtmlFilter(filters);

      // Feed `html` at once
      const res1 = stream.write(html) + stream.flush();

      // Feed `html` by small chunks
      let res2 = '';
      for (let i = 0; i < html.length; i += 10) {
        res2 += stream.write(html.slice(i, i + 10));
      }
      res2 += stream.flush();

      expect(res1).toEqual(res2);
      return res1;
    };

    it('handles empty', () => {
      expect(filter('', [['script', ['foo']]])).toBe('');
    });

    it('removes tags', () => {
      expect(filter('<script>foo</script>', [['script', ['foo']]])).toBe('');
      expect(filter('foo <script>foo</script>bar', [['script', ['foo']]])).toBe('foo bar');
      expect(filter('foo <script>fOo</script>bar', [['script', ['/foo/']]])).toBe('foo <script>fOo</script>bar');
      expect(filter('foo <script>fOo</script>bar', [['script', ['/foo/i']]])).toBe('foo bar');
    });

    it('handles streamed input', () => {
      expect(filter(doc, [['script', ['bar']]])).toBe(doc);
      expect(filter(doc, [
        ['script', ['/supports_TIMING_API/i']], // removes first script
        ['script', ['head_tag_start']], // removes second script
        ['script', ['app_html_start']], // removes third script
        ['script', ['ads_dot_js_fetch_start']], // removes fourth script
        ['script', ["__perfMark('redux_json_start');"]],
        ['script', ["__perfMark('js_deps_fetch_start'"]],
      ])).toBe(`
<!DOCTYPE html><html lang="en"><head><div id="2x-container"><<script src="https://www.redditstatic.com/desktop2x/js/ads.js"></script><script id="data">window.___r = {"accountManagerModalData":{}},;</script><script defer="" src="https://www.example.com/foo.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/RedesignContentFonts.509eef5d33306bd3b0d5.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/RedesignOldContentFonts.e450653685d17337cac6.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/vendors~Chat~Governance~Reddit.503ee0c2d353daa60d6e.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/vendors~Governance~Reddit.7e2adb288af56de67f65.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/vendors~Poll~Reddit.5f77a82de48fbb3beb21.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/vendors~EconHelperActions~Reddit.ae3c9f7d5b30b3be7151.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/vendors~Reddit.bb2ade21a865dbd52f3f.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/Chat~Governance~Reddit.19024d94a81678cf79e8.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/Governance~Reddit.98e55a3111b273b2f5dd.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/AdminCommunityTopics~Reddit.f091b12b417d6343dc18.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/Reddit.dc10f78afef6b219b26f.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/vendors~CollectionCommentsPage~CommentsPage~Explore~Frontpage~GovernanceReleaseNotesModal~ModListing~afc2720f.c6d86939d4bd0e144927.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/vendors~Chat~ChatMessageInput~CollectionCommentsPage~CommentsPage~Frontpage~PostCreation~RedesignCha~0aefb917.e6923ac4e90b854a1995.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/ChatMessageInput~ChatPost~CollectionCommentsPage~CommentsPage~Explore~Frontpage~GovernanceReleaseNot~3a34166c.dab3a37bed364deddf0e.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/ChatPost~CollectionCommentsPage~CommentsPage~Explore~Frontpage~GovernanceReleaseNotesModal~ModListin~44a849ee.85ccf598d319cc749b92.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/CollectionCommentsPage~CommentsPage~Explore~Frontpage~ModListing~ModQueuePages~ModerationPages~Multi~33b955cc.9c1942fb8eb4378e467c.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/CollectionCommentsPage~CommentsPage~Explore~Frontpage~GovernanceReleaseNotesModal~ModListing~ModQueu~900871b8.509ec80000f4968bb546.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/ChatPost~CollectionCommentsPage~CommentsPage~Frontpage~ModListing~ModQueuePages~ModerationPages~Mult~8849df7b.067fda741fb3f181c83f.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/CollectionCommentsPage~CommentsPage~Explore~Frontpage~ModListing~ModQueuePages~ModerationPages~Multi~5f2f5c2a.9e1690590f39e0d92f45.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/ChatPost~CollectionCommentsPage~CommentsPage~Frontpage~ModListing~ModQueuePages~Multireddit~Original~029c3338.33a759111dafa848481d.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/CommentsPage.dce215cbd6a2ed7e9969.js"></script></body></html>`);
    });
  });
});

const doc = (`
<!DOCTYPE html><html lang="en"><head><script>
          var __SUPPORTS_TIMING_API = typeof performance === 'object' && !!performance.mark && !! performance.measure && !!performance.getEntriesByType;
          function __perfMark(name) { __SUPPORTS_TIMING_API && performance.mark(name); };
          var __firstLoaded = false;
          function __markFirstPostVisible() {
            if (__firstLoaded) { return; }
            __firstLoaded = true;
            __perfMark("first_post_title_image_loaded");
          }
        </script><script>
          __perfMark('head_tag_start');
        </script><script>
          __perfMark('app_html_start');
        </script><div id="2x-container"><<script>
          __perfMark('ads_dot_js_fetch_start');
        </script><script src="https://www.redditstatic.com/desktop2x/js/ads.js"></script><script>
          __perfMark('redux_json_start');
        </script><script id="data">window.___r = {"accountManagerModalData":{}},;</script><script>
          __perfMark('js_deps_fetch_start');
        </script><script defer="" src="https://www.example.com/foo.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/RedesignContentFonts.509eef5d33306bd3b0d5.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/RedesignOldContentFonts.e450653685d17337cac6.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/vendors~Chat~Governance~Reddit.503ee0c2d353daa60d6e.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/vendors~Governance~Reddit.7e2adb288af56de67f65.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/vendors~Poll~Reddit.5f77a82de48fbb3beb21.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/vendors~EconHelperActions~Reddit.ae3c9f7d5b30b3be7151.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/vendors~Reddit.bb2ade21a865dbd52f3f.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/Chat~Governance~Reddit.19024d94a81678cf79e8.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/Governance~Reddit.98e55a3111b273b2f5dd.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/AdminCommunityTopics~Reddit.f091b12b417d6343dc18.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/Reddit.dc10f78afef6b219b26f.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/vendors~CollectionCommentsPage~CommentsPage~Explore~Frontpage~GovernanceReleaseNotesModal~ModListing~afc2720f.c6d86939d4bd0e144927.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/vendors~Chat~ChatMessageInput~CollectionCommentsPage~CommentsPage~Frontpage~PostCreation~RedesignCha~0aefb917.e6923ac4e90b854a1995.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/ChatMessageInput~ChatPost~CollectionCommentsPage~CommentsPage~Explore~Frontpage~GovernanceReleaseNot~3a34166c.dab3a37bed364deddf0e.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/ChatPost~CollectionCommentsPage~CommentsPage~Explore~Frontpage~GovernanceReleaseNotesModal~ModListin~44a849ee.85ccf598d319cc749b92.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/CollectionCommentsPage~CommentsPage~Explore~Frontpage~ModListing~ModQueuePages~ModerationPages~Multi~33b955cc.9c1942fb8eb4378e467c.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/CollectionCommentsPage~CommentsPage~Explore~Frontpage~GovernanceReleaseNotesModal~ModListing~ModQueu~900871b8.509ec80000f4968bb546.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/ChatPost~CollectionCommentsPage~CommentsPage~Frontpage~ModListing~ModQueuePages~ModerationPages~Mult~8849df7b.067fda741fb3f181c83f.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/CollectionCommentsPage~CommentsPage~Explore~Frontpage~ModListing~ModQueuePages~ModerationPages~Multi~5f2f5c2a.9e1690590f39e0d92f45.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/ChatPost~CollectionCommentsPage~CommentsPage~Frontpage~ModListing~ModQueuePages~Multireddit~Original~029c3338.33a759111dafa848481d.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/CommentsPage.dce215cbd6a2ed7e9969.js"></script></body></html>`);
