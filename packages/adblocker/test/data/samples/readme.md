The files ending with `.br` file extension are the brotli compressed objects.
`brotli` CLI from Google can be used to compress and decompress objects. See the following link for the usage: https://github.com/google/brotli/blob/master/c/tools/brotli.md

You can use the following command to process all objects in the directory:
- Compression: `for f in ./*; do [[ -f "$f" && "$f" != *".br" ]] && brotli "$f"; done`
- Decompression: `for f in ./*; do [[ -f "$f" && "$f" == *".br" ]] && brotli --decompress "$f"; done`
