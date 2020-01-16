"use strict";
/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
exports.__esModule = true;
/**
 * WARNING: this function should be self-contained and not rely on any global
 * symbol. That constraint needs to be fulfilled because this function can
 * potentially be injected in content-script (e.g.: see PuppeteerBlocker for
 * more details).
 */
function extractFeaturesFromDOM(elements) {
    var ignoredTags = new Set(['br', 'head', 'link', 'meta', 'script', 'style']);
    var classes = new Set();
    var hrefs = new Set();
    var ids = new Set();
    for (var i = 0; i < elements.length; i += 1) {
        var element = elements[i];
        if (element.nodeType !== 1 /* Node.ELEMENT_NODE */) {
            continue;
        }
        if (ignoredTags.has(element.localName)) {
            continue;
        }
        // Update ids
        var id = element.id;
        if (id) {
            ids.add(id);
        }
        // Update classes
        var classList = element.classList;
        for (var j = 0; j < classList.length; j += 1) {
            classes.add(classList[j]);
        }
        // Update href
        // @ts-ignore
        var href = element.href;
        if (href) {
            hrefs.add(href);
        }
    }
    return {
        classes: Array.from(classes),
        hrefs: Array.from(hrefs),
        ids: Array.from(ids)
    };
}
exports.extractFeaturesFromDOM = extractFeaturesFromDOM;
/**
 * Wrap a self-executing script into a block of custom logic to remove the
 * script tag once execution is terminated. This can be useful to not leave
 * traces in the DOM after injections.
 */
function autoRemoveScript(script) {
    // Minified using 'terser'
    return "try{" + script + "}catch(c){}!function(){var c=document.currentScript,e=c&&c.parentNode;e&&e.removeChild(c)}();";
    // Original:
    //
    //    try {
    //      ${script}
    //    } catch (ex) { }
    //
    //    (function() {
    //      var currentScript = document.currentScript;
    //      var parent = currentScript && currentScript.parentNode;
    //
    //      if (parent) {
    //        parent.removeChild(currentScript);
    //      }
    //    })();
}
exports.autoRemoveScript = autoRemoveScript;
function injectCSSRule(rule, doc) {
    var parent = doc.head || doc.getElementsByTagName('head')[0] || doc.documentElement;
    if (parent !== null) {
        var css = doc.createElement('style');
        css.type = 'text/css';
        css.id = 'cliqz-adblokcer-css-rules';
        css.appendChild(doc.createTextNode(rule));
        parent.appendChild(css);
    }
}
exports.injectCSSRule = injectCSSRule;
function injectScript(s, doc) {
    var script = doc.createElement('script');
    script.type = 'text/javascript';
    script.id = 'cliqz-adblocker-script';
    script.async = false;
    script.appendChild(doc.createTextNode(autoRemoveScript(s)));
    // Insert node
    var parent = doc.head || doc.documentElement;
    if (parent !== null) {
        parent.appendChild(script);
    }
}
exports.injectScript = injectScript;
//# sourceMappingURL=adblocker.js.map