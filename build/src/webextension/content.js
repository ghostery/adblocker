/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */
import { extractFeaturesFromDOM } from '../content/helpers';
import { injectCSSRule, injectScript } from '../content/injection';
var ACTIVE = true;
var MUTATION_OBSERVER = null;
function unload() {
    if (MUTATION_OBSERVER !== null) {
        MUTATION_OBSERVER.disconnect();
        MUTATION_OBSERVER = null;
    }
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
export default function injectCosmetics(window, getCosmeticsFilters, enableMutationObserver) {
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
