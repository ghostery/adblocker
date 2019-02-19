The files in this directory are directly extracted from the uBlock Origin
project. See [LICENSE.txt](./LICENSE.txt) for information about the license of
this source code.

Most of the files were extracted as-is but some modifications
were required to make the WebAssembly modules work in
Node.js. In case of modification you will find a `.patch`
file indicating the changes compared to original (e.g.:
[publicsuffixlist.patch](./publicsuffixlist.patch))

This code from the following commit: [47ceaea3b916681e90604002224d87e76f21222f](https://github.com/gorhill/uBlock/commit/47ceaea3b916681e90604002224d87e76f21222f)
