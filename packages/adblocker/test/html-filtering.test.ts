/*!
 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { expect } from 'chai';
import 'mocha';

import {
  HTMLSelector,
  default as StreamingHtmlFilter,
  extractSelectorsFromRules,
  extractTagsFromHtml,
} from '../src/html-filtering.js';
import { getRequestSamplePath, loadRequestSample } from './utils.js';
import { replaceOptionValueToRegexp } from '../src/filters/network.js';

// NOTE: `doc` is defined at the end of this file.

describe('html-filtering', () => {
  describe('#extractTagsFromHtml', () => {
    const tags = (html: string) => extractTagsFromHtml(html, 'script')[0];

    it('extracts all tags', () => {
      expect(tags('')).to.eql([]);
      expect(tags('foo')).to.eql([]);
      expect(tags('<script>bar</script>')).to.eql([[0, '<script>bar</script>']]);
      expect(tags('foo <script>bar</script>')).to.eql([[4, '<script>bar</script>']]);
      expect(
        tags(`
<!DOCTYPE html> <html lang="en"> <head>
<script>script1</script>
<script id="_$cookiemonster"/>
<script attr=321>console.log("<script>")</script>
`),
      ).to.eql([
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
      expect(tags1).to.eql(tags2);
    });

    describe('consumes as much input as possible', () => {
      const remains = (html: string) => {
        const result = extractTagsFromHtml(html, 'script');
        const parsed = result[1];
        const rest = result[2];
        expect(parsed + rest).to.equal(html);
        return rest;
      };

      it('handles empty', () => {
        expect(remains('')).to.equal('');
      });

      it('handles no tag', () => {
        expect(remains('foo')).to.equal('');
      });

      it('handles one tag', () => {
        expect(remains('foo<script>foo</script>')).to.equal('');
      });

      const str = 'foo<script>foo</script>foo<tag/><scri></scri><script>foo</script>';
      it('remains nothing with full tags', () => {
        expect(remains(str)).to.equal('');
      });

      it('remains partial', () => {
        expect(remains('foo <')).to.equal('<');
        expect(remains('foo <s')).to.equal('<s');
        expect(remains('foo <sc')).to.equal('<sc');
        expect(remains('foo <scr')).to.equal('<scr');
        expect(remains('foo <scri')).to.equal('<scri');
        expect(remains('foo <scrip')).to.equal('<scrip');
      });

      // Test all possible partial tags ending the string
      const tagStartIndex = 45; // start of last <script> tag
      for (let i = str.length - 1; i >= tagStartIndex; i -= 1) {
        const partial = str.slice(0, i);
        it(partial, () => {
          expect(remains(partial)).to.equal(str.slice(tagStartIndex, i));
        });
      }
    });
  });

  describe('#extractSelectorsFromRules', () => {
    it('empty', () => {
      expect(extractSelectorsFromRules([])).to.have.lengthOf(0);
    });

    it('parses patterns and regexps', () => {
      expect(
        extractSelectorsFromRules([
          ['script', ['foo']],
          ['script', ['/foo/']],
          ['script', ['(bar)']],
          ['script', ['/(bar)/i']],
          ['script', ['foo', '/(bar)/i', 'bar', '/baz/']],
        ]),
      ).to.eql([
        [['foo'], []],
        [[], [/foo/]],
        [['(bar)'], []],
        [[], [/(bar)/i]],
        [
          ['foo', 'bar'],
          [/(bar)/i, /baz/],
        ],
      ]);
    });
  });

  describe('#replaceOptionValueToRegexp', () => {
    it('unescapes non special characters', () => {
      expect(replaceOptionValueToRegexp(String.raw`/\,//`)).to.deep.equal([/,/, '']);
      expect(replaceOptionValueToRegexp(String.raw`/\>//`)).to.deep.equal([/>/, '']);
      expect(replaceOptionValueToRegexp(String.raw`/\=//`)).to.deep.equal([/=/, '']);
      expect(replaceOptionValueToRegexp(String.raw`/\://`)).to.deep.equal([/:/, '']);
    });

    it('allows escaped slashes', () => {
      expect(replaceOptionValueToRegexp(String.raw`/\///`)).to.deep.equal([/\//, '']);
    });
  });

  describe('#StreamingHtmlFilter', () => {
    const filter = (html: string, filters: HTMLSelector[] = []): string => {
      const stream = new StreamingHtmlFilter(filters);

      // Feed `html` at once
      const res1 = stream.write(html) + stream.flush();

      // Feed `html` by small chunks
      let res2 = '';
      for (let i = 0; i < html.length; i += 10) {
        res2 += stream.write(html.slice(i, i + 10));
      }
      res2 += stream.flush();

      expect(res1).to.equal(res2);

      return res1;
    };

    it('handles empty', () => {
      expect(filter('', [['script', ['foo']]])).to.equal('');
    });

    describe('removes tags', () => {
      it('simple plain pattern (full HTML)', () => {
        expect(filter('<script>foo</script>', [['script', ['foo']]])).to.equal('');
      });

      it('simple plain pattern (partial HTML)', () => {
        expect(filter('foo <script>foo</script>bar', [['script', ['foo']]])).to.equal('foo bar');
      });

      it('RegExp pattern (full HTML)', () => {
        expect(filter('<script>fOo</script>', [['script', ['/foo/']]])).to.equal(
          '<script>fOo</script>',
        );
        expect(filter('<script>foo</script>', [['script', ['/foo/']]])).to.equal('');
      });

      it('RegExp pattern (partial HTML)', () => {
        expect(filter('foo <script>fOo</script>bar', [['script', ['/foo/']]])).to.equal(
          'foo <script>fOo</script>bar',
        );
      });

      it('case-insensitive RegExp', () => {
        expect(filter('foo <script>fOo</script>bar', [['script', ['/foo/i']]])).to.equal(
          'foo bar',
        );
      });

      it('multi-pattern', () => {
        const patterns: HTMLSelector[] = [['script', ['foo', 'bar', '/baz/i']]];

        const html1 = 'foo <script></script> bar baz';
        expect(filter(html1, patterns)).to.equal(html1);

        const html2 = 'foo <script>foo</script> bar baz';
        expect(filter(html2, patterns)).to.equal(html2);

        const html3 = 'foo <script>bar    foo</script> bar baz';
        expect(filter(html3, patterns)).to.equal(html3);

        const html4 = 'foo <script>bar  baz  foo</script> bar baz';
        expect(filter(html4, patterns)).to.equal('foo  bar baz');

        const html5 = 'foo <script>bar  BAZ  foo</script> bar baz';
        expect(filter(html5, patterns)).to.equal('foo  bar baz');
      });
    });

    it('handles streamed input', () => {
      expect(filter(doc, [['script', ['bar']]])).to.equal(doc);
      expect(
        filter(doc, [
          ['script', ['/supports_TIMING_API/i']], // removes first script
          ['script', ['head_tag_start']], // removes second script
          ['script', ['app_html_start']], // removes third script
          ['script', ['ads_dot_js_fetch_start']], // removes fourth script
          ['script', ["__perfMark('redux_json_start');"]],
          ['script', ["__perfMark('js_deps_fetch_start'"]],
        ]),
      ).to.equal(`
<!DOCTYPE html><html lang="en"><head><div id="2x-container"><<script src="https://www.redditstatic.com/desktop2x/js/ads.js"></script><script id="data">window.___r = {"accountManagerModalData":{}},;</script><script defer="" src="https://www.example.com/foo.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/RedesignContentFonts.509eef5d33306bd3b0d5.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/RedesignOldContentFonts.e450653685d17337cac6.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/vendors~Chat~Governance~Reddit.503ee0c2d353daa60d6e.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/vendors~Governance~Reddit.7e2adb288af56de67f65.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/vendors~Poll~Reddit.5f77a82de48fbb3beb21.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/vendors~EconHelperActions~Reddit.ae3c9f7d5b30b3be7151.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/vendors~Reddit.bb2ade21a865dbd52f3f.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/Chat~Governance~Reddit.19024d94a81678cf79e8.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/Governance~Reddit.98e55a3111b273b2f5dd.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/AdminCommunityTopics~Reddit.f091b12b417d6343dc18.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/Reddit.dc10f78afef6b219b26f.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/vendors~CollectionCommentsPage~CommentsPage~Explore~Frontpage~GovernanceReleaseNotesModal~ModListing~afc2720f.c6d86939d4bd0e144927.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/vendors~Chat~ChatMessageInput~CollectionCommentsPage~CommentsPage~Frontpage~PostCreation~RedesignCha~0aefb917.e6923ac4e90b854a1995.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/ChatMessageInput~ChatPost~CollectionCommentsPage~CommentsPage~Explore~Frontpage~GovernanceReleaseNot~3a34166c.dab3a37bed364deddf0e.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/ChatPost~CollectionCommentsPage~CommentsPage~Explore~Frontpage~GovernanceReleaseNotesModal~ModListin~44a849ee.85ccf598d319cc749b92.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/CollectionCommentsPage~CommentsPage~Explore~Frontpage~ModListing~ModQueuePages~ModerationPages~Multi~33b955cc.9c1942fb8eb4378e467c.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/CollectionCommentsPage~CommentsPage~Explore~Frontpage~GovernanceReleaseNotesModal~ModListing~ModQueu~900871b8.509ec80000f4968bb546.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/ChatPost~CollectionCommentsPage~CommentsPage~Frontpage~ModListing~ModQueuePages~ModerationPages~Mult~8849df7b.067fda741fb3f181c83f.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/CollectionCommentsPage~CommentsPage~Explore~Frontpage~ModListing~ModQueuePages~ModerationPages~Multi~5f2f5c2a.9e1690590f39e0d92f45.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/ChatPost~CollectionCommentsPage~CommentsPage~Frontpage~ModListing~ModQueuePages~Multireddit~Original~029c3338.33a759111dafa848481d.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/CommentsPage.dce215cbd6a2ed7e9969.js"></script></body></html>`);
    });

    describe('handles modifiers', () => {
      it('handles simple forms', () => {
        expect(
          filter(`{"trackingParam":"a"}`, [
            ['replace', [new RegExp('"trackingParam":"(\\w+)"'), '"$1":""']],
          ]),
        ).to.be.eql(`{"a":""}`);
      });

      it('handles html modifiers with global replaces', () => {
        expect(
          filter(doc, [['replace', [new RegExp("__perfMark\\('.+?'\\);", 'g'), '']]]),
        ).not.to.include("__perfMark('");
        expect(filter(doc, [['replace', [new RegExp('redditstatic\\.com', 'g'), 'domain.tld']]]))
          .to.include('https://www.domain.tld/desktop2x/js/ads.js')
          .to.include(
            'https://www.domain.tld/desktop2x/RedesignContentFonts.509eef5d33306bd3b0d5.js',
          )
          .to.include(
            'https://www.domain.tld/desktop2x/RedesignOldContentFonts.e450653685d17337cac6.js',
          )
          .not.to.include('redditstatic.com');
      });

      it('handles multiple modifiers', () => {
        expect(
          filter(doc, [
            ['replace', [new RegExp('__SUPPORTS_TIMING_API &&'), 'false &&']],
            ['replace', [new RegExp('redditstatic\\.com', 'g'), 'domain.tld']],
          ]),
        )
          .to.include('function __perfMark(name) { false && performance.mark(name); };')
          .not.to.include('redditstatic.com');
      });

      it('handles html modifiers with html selectors', () => {
        expect(
          filter(doc, [
            ['script', ["__perfMark('"]],
            ['replace', [new RegExp('(__firstLoaded = )false'), '$1true']],
          ]),
        )
          .not.to.include("__perfMark('")
          .not.to.include('__firstLoaded = false');

        // -- html selector should not be inferenced by modifiers
        expect(
          filter(doc, [
            ['script', ["__perfMark('"]],
            ['replace', [new RegExp('script', 'g'), 'pre']],
          ]),
        )
          .not.to.include("__perfMark('")
          .not.to.include('script');

        expect(
          filter(doc, [
            ['script', ['app_html_start']],
            ['replace', [new RegExp('app_html_start', 'g'), '']],
          ]),
        ).not.to.include('app_html_start');
      });

      const urls = [
        {
          url: 'https://alliptvlinks.com/tktk-content/plugins/rwaKVtBAQPrF!vFGebtUlLymZ)E45/gzwGRql+kTV!Svj-ITOh+YiJ)Av-9.js',
          filters: [String.raw`/\bconst now.+?, 100/clearInterval(timer);resolve();}, 100/gms`],
        },
        {
          url: 'https://www.youtube.com/watch?v=4tPrAe4Wiyg.html',
          filters: [
            String.raw`/"adPlacements.*?([A-Z]"\}|"\}{2\,4})\}\]\,//`,
            String.raw`/"adSlots.*?\}\]\}\}\]\,//`,
          ],
        },
        {
          url: 'https://rekidai-info.github.io/_app/immutable/components/pages/index/_page.svelte-74656d8d.js',
          filters: [String.raw`/throw Error\("Ad blocker detected."\)//`],
        },
        {
          url: 'https://bitcotasks.com/assets/js/mainjs.php',
          filters: [String.raw`/entry.duration > 0/entry.duration < 10/`],
        },
      ] as const;

      for (const { url, filters } of urls) {
        it(`filters: ${filters.join(',')}`, () => {
          const modified = filter(
            loadRequestSample(getRequestSamplePath(url)),
            filters.map((filter) => ['replace', replaceOptionValueToRegexp(filter)!]),
          );
          expect(modified).to.be.eql(loadRequestSample(getRequestSamplePath(url + '.modified')));
        });
      }
    });
  });
});

const doc = `
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
        </script><script defer="" src="https://www.example.com/foo.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/RedesignContentFonts.509eef5d33306bd3b0d5.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/RedesignOldContentFonts.e450653685d17337cac6.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/vendors~Chat~Governance~Reddit.503ee0c2d353daa60d6e.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/vendors~Governance~Reddit.7e2adb288af56de67f65.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/vendors~Poll~Reddit.5f77a82de48fbb3beb21.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/vendors~EconHelperActions~Reddit.ae3c9f7d5b30b3be7151.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/vendors~Reddit.bb2ade21a865dbd52f3f.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/Chat~Governance~Reddit.19024d94a81678cf79e8.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/Governance~Reddit.98e55a3111b273b2f5dd.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/AdminCommunityTopics~Reddit.f091b12b417d6343dc18.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/Reddit.dc10f78afef6b219b26f.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/vendors~CollectionCommentsPage~CommentsPage~Explore~Frontpage~GovernanceReleaseNotesModal~ModListing~afc2720f.c6d86939d4bd0e144927.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/vendors~Chat~ChatMessageInput~CollectionCommentsPage~CommentsPage~Frontpage~PostCreation~RedesignCha~0aefb917.e6923ac4e90b854a1995.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/ChatMessageInput~ChatPost~CollectionCommentsPage~CommentsPage~Explore~Frontpage~GovernanceReleaseNot~3a34166c.dab3a37bed364deddf0e.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/ChatPost~CollectionCommentsPage~CommentsPage~Explore~Frontpage~GovernanceReleaseNotesModal~ModListin~44a849ee.85ccf598d319cc749b92.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/CollectionCommentsPage~CommentsPage~Explore~Frontpage~ModListing~ModQueuePages~ModerationPages~Multi~33b955cc.9c1942fb8eb4378e467c.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/CollectionCommentsPage~CommentsPage~Explore~Frontpage~GovernanceReleaseNotesModal~ModListing~ModQueu~900871b8.509ec80000f4968bb546.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/ChatPost~CollectionCommentsPage~CommentsPage~Frontpage~ModListing~ModQueuePages~ModerationPages~Mult~8849df7b.067fda741fb3f181c83f.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/CollectionCommentsPage~CommentsPage~Explore~Frontpage~ModListing~ModQueuePages~ModerationPages~Multi~5f2f5c2a.9e1690590f39e0d92f45.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/ChatPost~CollectionCommentsPage~CommentsPage~Frontpage~ModListing~ModQueuePages~Multireddit~Original~029c3338.33a759111dafa848481d.js"></script><script defer="" src="https://www.redditstatic.com/desktop2x/CommentsPage.dce215cbd6a2ed7e9969.js"></script></body></html>`;
