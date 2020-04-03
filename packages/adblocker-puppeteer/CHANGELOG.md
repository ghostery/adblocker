# v1.13.1 (Fri Apr 03 2020)

#### :bug: Bug Fix

- Correctly redirect to binary resources in puppeteer blocker [#715](https://github.com/cliqz-oss/adblocker/pull/715) ([@remusao](https://github.com/remusao))

#### :house: Internal

- Move from jest to mocha + chai [#682](https://github.com/cliqz-oss/adblocker/pull/682) ([@remusao](https://github.com/remusao))

#### :memo: Documentation

- Fix line break in CHANGELOG.md [#691](https://github.com/cliqz-oss/adblocker/pull/691) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

---

# v1.13.0 (Mon Mar 30 2020)

### Release Notes

_From #690_

PuppeteerBlocker is now more powerful and will be able to better block ads on most websites. Firstly, a bug was fixed which prevented injection of cosmetics in the main frame of pages. Secondly, PuppeteerBlocker will now monitor the DOM for changes to make sure that ads which load later are still "handled" (if you know what I mean). Lastly, PuppeteerBlocker is now able to look for advertisement iframes and remove them from the DOM completely, no more blank spaces left unattended...

---

#### :rocket: New Feature

- Fix PuppeteerBlocker and enable blocking of frames and DOM monitoring. [#690](https://github.com/cliqz-oss/adblocker/pull/690) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

---

# v1.12.3 (Sat Mar 28 2020)

#### :house: Internal

- Update README.md [#670](https://github.com/cliqz-oss/adblocker/pull/670) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

---

# v1.8.6 (Thu Feb 13 2020)

#### :nail_care: Polish

- Move BlockingContext methods back into Blocker class. [#496](https://github.com/cliqz-oss/adblocker/pull/496) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

---

# v1.8.1 (Wed Feb 12 2020)

#### :nail_care: Polish

- Expose original request details through Request class [#490](https://github.com/cliqz-oss/adblocker/pull/490) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

---

# v1.8.0 (Wed Feb 12 2020)

#### :running_woman: Performance

- Target ES6 instead of ES3 [#489](https://github.com/cliqz-oss/adblocker/pull/489) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))
