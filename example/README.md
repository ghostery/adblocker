# Minimal Content Blocker

This is a minimal webextension doing adblocking/antitracking using most
popular block-lists. It is meant as a very thin wrapper around the
[adblocker](https://github.com/cliqz-oss/adblocker) library. You can use it to
debut the adblocker, or test new features.

## Workflow

1. `make watch` will build and monitor for changes
2. Open your browser and load "unpacked extension" from the `example` folder
3. On re-build, reload the extension in browser
