
.PHONY: all watch

all:
	npx tsc -p .
	npx rollup -c rollup.config.ts

watch:
	npx concurrently 'tsc -p . --watch' 'rollup -c rollup.config.ts --watch'

clean:
	rm -frv *.iife.js
	rm -frv build/
