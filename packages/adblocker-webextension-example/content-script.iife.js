/* crc32.js (C) 2014-present SheetJS -- http://sheetjs.com */
/* From: https://github.com/SheetJS/js-crc32/ */
var T = (function () {
    var c = 0;
    var table = new Int32Array(256);
    for (var n = 0; n !== 256; n += 1) {
        c = n;
        c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1;
        c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1;
        c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1;
        c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1;
        c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1;
        c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1;
        c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1;
        c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1;
        table[n] = c;
    }
    return table;
})();

/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
function fastHashBetween(str, begin, end) {
    var hash = 5381;
    for (var i = begin; i < end; i += 1) {
        hash = (hash * 33) ^ str.charCodeAt(i);
    }
    return hash >>> 0;
}
function fastHash(str) {
    if (!str) {
        return 0;
    }
    return fastHashBetween(str, 0, str.length);
}

/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
/**
 * Validate CSS selector. There is a fast path for simple selectors (e.g.: #foo
 * or .bar) which are the most common case. For complex ones, we rely on
 * `Element.matches` (if available).
 */
var isValidCss = (function () {
    var div = typeof document !== 'undefined'
        ? document.createElement('div')
        : {
            matches: function () {
                /* noop */
            }
        };
    var matches = function (selector) { return div.matches(selector); };
    var validSelectorRe = /^[#.]?[\w-.]+$/;
    return function isValidCssImpl(selector) {
        if (validSelectorRe.test(selector)) {
            return true;
        }
        try {
            matches(selector);
        }
        catch (ex) {
            return false;
        }
        return true;
    };
})();

/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
var HTTP_HASH = fastHash('http');
var HTTPS_HASH = fastHash('https');

function setDefaultsImpl(_a) {
    var _b = _a.allowIcannDomains, allowIcannDomains = _b === void 0 ? true : _b, _c = _a.allowPrivateDomains, allowPrivateDomains = _c === void 0 ? false : _c, _d = _a.detectIp, detectIp = _d === void 0 ? true : _d, _e = _a.extractHostname, extractHostname = _e === void 0 ? true : _e, _f = _a.mixedInputs, mixedInputs = _f === void 0 ? true : _f, _g = _a.validHosts, validHosts = _g === void 0 ? null : _g, _h = _a.validateHostname, validateHostname = _h === void 0 ? true : _h;
    return {
        allowIcannDomains: allowIcannDomains,
        allowPrivateDomains: allowPrivateDomains,
        detectIp: detectIp,
        extractHostname: extractHostname,
        mixedInputs: mixedInputs,
        validHosts: validHosts,
        validateHostname: validateHostname
    };
}
var DEFAULT_OPTIONS = setDefaultsImpl({});

/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
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
/**
 * Wrap a self-executing script into a block of custom logic to remove the
 * script tag once execution is terminated. This can be useful to not leave
 * traces in the DOM after injections.
 */
function autoRemoveScript(script) {
    return "\ntry {\n  " + script + "\n} catch (ex) { }\n\n(function() {\n  var currentScript = document.currentScript;\n  var parent = currentScript && currentScript.parentNode;\n\n  if (parent) {\n    parent.removeChild(currentScript);\n  }\n})();\n  ";
}
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

/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
var ACTIVE = true;
var MUTATION_OBSERVER = null;
function unload() {
    if (MUTATION_OBSERVER !== null) {
        MUTATION_OBSERVER.disconnect();
        MUTATION_OBSERVER = null;
    }
}
/**
 * Because all the filters and matching logic lives in the background of the
 * extension, the content script needs a way to request relevant cosmetic
 * filters for each frame. This channel of communication can be handled in
 * several ways (`connect`, `sendMessage`). Here we will make use of
 * `sendMessage` for one-off communications.
 *
 * `getCosmeticsFiltersWithSendMessage` wraps the logic of communicating with
 * the background and will be used to request cosmetics filters for the current
 * frame.
 *
 * The background should listen to these messages and answer back with lists of
 * filters to be injected in the page.
 */
function getCosmeticsFiltersWithSendMessage(_a) {
    var classes = _a.classes, hrefs = _a.hrefs, ids = _a.ids, lifecycle = _a.lifecycle;
    return new Promise(function (resolve) {
        chrome.runtime.sendMessage({
            action: 'getCosmeticsFilters',
            classes: classes,
            hrefs: hrefs,
            ids: ids,
            lifecycle: lifecycle
        }, function (response) {
            if (response !== undefined) {
                resolve(response);
            }
        });
    });
}
function handleResponseFromBackground(window, _a) {
    var active = _a.active, scripts = _a.scripts, styles = _a.styles;
    if (active === false) {
        ACTIVE = false;
        unload();
        return;
    }
    else {
        ACTIVE = true;
    }
    // Inject scripts
    if (scripts) {
        var _loop_1 = function (i) {
            setTimeout(function () { return injectScript(scripts[i], window.document); }, 0);
        };
        for (var i = 0; i < scripts.length; i += 1) {
            _loop_1(i);
        }
    }
    // Normal CSS
    if (styles && styles.length > 0) {
        setTimeout(function () { return injectCSSRule(styles, window.document); }, 0);
    }
    // Extended CSS
    // if (extended && extended.length > 0) {
    // }
}
/**
 * Takes care of injecting cosmetic filters in a given window. Responsabilities:
 * - Inject scripts.
 * - Block scripts.
 * - Inject CSS rules.
 *
 * All this happens by communicating with the background through the
 * `backgroundAction` function (to trigger request the sending of new rules
 * based on a domain or node selectors) and the `handleResponseFromBackground`
 * callback to apply new rules.
 */
function injectCosmetics(window, enableMutationObserver, getCosmeticsFilters) {
    if (enableMutationObserver === void 0) { enableMutationObserver = true; }
    if (getCosmeticsFilters === void 0) { getCosmeticsFilters = getCosmeticsFiltersWithSendMessage; }
    // Invoked as soon as content-script is injected to ask for background to
    // inject cosmetics and scripts as soon as possible. Some extra elements
    // might be inserted later whenever we know more about the content of the
    // page.
    getCosmeticsFilters({ lifecycle: 'start', ids: [], classes: [], hrefs: [] }).then(function (response) {
        return handleResponseFromBackground(window, response);
    });
    // On DOMContentLoaded, start monitoring the DOM. This means that we will
    // first check which ids and classes exist in the DOM as a one-off operation;
    // this will allow the injection of selectors which have a chance to match.
    // We also register a MutationObserver which will monitor the addition of new
    // classes and ids, and might trigger extra filters on a per-need basis.
    window.addEventListener('DOMContentLoaded', function () {
        // Keep track of values already seen and processed in this frame
        var knownIds = new Set();
        var knownClasses = new Set();
        var knownHrefs = new Set();
        // Given a list of `nodes` (i.e.: instances of `Element` class), extract
        // a list of class names and ids which we never saw before. These will be
        // used to request extra cosmetics to inject if needed.
        var handleNodes = function (nodes) {
            var _a = extractFeaturesFromDOM(nodes), classes = _a.classes, ids = _a.ids, hrefs = _a.hrefs;
            var newIds = [];
            var newClasses = [];
            var newHrefs = [];
            // Update ids
            for (var i = 0; i < ids.length; i += 1) {
                var id = ids[i];
                if (knownIds.has(id) === false) {
                    newIds.push(id);
                    knownIds.add(id);
                }
            }
            for (var i = 0; i < classes.length; i += 1) {
                var cls = classes[i];
                if (knownClasses.has(cls) === false) {
                    newClasses.push(cls);
                    knownClasses.add(cls);
                }
            }
            for (var i = 0; i < hrefs.length; i += 1) {
                var href = hrefs[i];
                if (knownHrefs.has(href) === false) {
                    newHrefs.push(href);
                    knownHrefs.add(href);
                }
            }
            if (newIds.length !== 0 || newClasses.length !== 0 || newHrefs.length !== 0) {
                // TODO - we might want to throttle that?
                getCosmeticsFilters({
                    classes: newClasses,
                    hrefs: newHrefs,
                    ids: newIds,
                    lifecycle: 'dom-update'
                }).then(function (response) { return handleResponseFromBackground(window, response); });
            }
        };
        // Since we did not start observing before, start by getting the list of
        // all ids and classes in the DOM at this point of time (DOMContentLoaded
        // event). Afterwards, we will rely on the mutation observer to detect
        // changes.
        handleNodes(Array.from(window.document.querySelectorAll('[id],[class],[href]')));
        // Start observing mutations to detect new ids and classes which would
        // need to be hidden.
        if (ACTIVE && enableMutationObserver && window.MutationObserver) {
            MUTATION_OBSERVER = new window.MutationObserver(function (mutations) {
                // Accumulate all nodes which were updated in `nodes`
                var nodes = [];
                for (var i = 0; i < mutations.length; i += 1) {
                    var mutation = mutations[i];
                    if (mutation.type === 'attributes') {
                        nodes.push(mutation.target);
                    }
                    else if (mutation.type === 'childList') {
                        var addedNodes = mutation.addedNodes;
                        for (var j = 0; j < addedNodes.length; j += 1) {
                            var addedNode = addedNodes[j];
                            nodes.push(addedNode);
                            if (addedNode.querySelectorAll !== undefined) {
                                var children = addedNode.querySelectorAll('[id],[class],[href]');
                                for (var k = 0; k < children.length; k += 1) {
                                    nodes.push(children[k]);
                                }
                            }
                        }
                    }
                }
                handleNodes(nodes);
            });
            MUTATION_OBSERVER.observe(window.document.documentElement, {
                attributeFilter: ['class', 'id', 'href'],
                attributes: true,
                childList: true,
                subtree: true
            });
        }
    }, { once: true, passive: true });
    // Clean-up afterwards
    window.addEventListener('unload', unload, { once: true, passive: true });
}

/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
/**
 * `injectCosmetics` is in charge of all ad-blocking logic on the content-script
 * side. It handles the following:
 * - Inject scripts into the page, which might be used to defuse anti-adblockers.
 * - Block the execution of some scripts in the page (only if the
 * 'beforescriptexecute' event is available, currently only on Firefox).
 */
injectCosmetics(window, true /* MutationObserver */);
