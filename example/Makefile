
.PHONY: all watch

all:
	npx tsc -p .
	npx rollup -c rollup.config.js

watch:
	npx concurrently 'tsc -p . --watch' 'rollup -c rollup.config.js --watch'

clean:
	rm -frv *.iife.js
	rm -frv build/
