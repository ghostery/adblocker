# Minimal Content Blocker

This is a minimal webextension doing adblocking/antitracking using most
popular block-lists. It is meant as a very thin wrapper around the
[adblocker](https://github.com/cliqz-oss/adblocker) library. You can use it to
debug the adblocker, or test new features.

## Workflow

1. `yarn bundle` will build the extension
2. Open your browser and load "unpacked extension" from this folder
3. On re-build, reload the extension in browser
