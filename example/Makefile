
.PHONY: build/example watch clean

build/example: background.ts content-script.ts
	tsc -p .

content-script.bundle.js: build/example
	rollup -c rollup.content.js

background.bundle.js: build/example
	rollup -c rollup.background.js

watch:
	concurrently 'tsc -p . --watch' 'rollup -c rollup.content.js --watch' 'rollup -c rollup.background.js --watch'

clean:
	rm -frv *.bundle.js
	rm -frv build/

all: content-script.umd.js background.umd.js
