
.PHONY: content-script.bunble.js background.bundle.js build/example watch clean

ROLLUP="../node_modules/.bin/rollup"

all: content-script.bundle.js background.bundle.js

build/example:
	tsc -p tsconfig.json --module ES6 --outDir build

content-script.bundle.js: build/example
	${ROLLUP} -c rollup.content.js

background.bundle.js: build/example
	${ROLLUP} -c rollup.background.js

watch:
	concurrently 'tsc -p tsconfig.json --module ES6 --outDir build --watch' 'rollup -c rollup.content.js --watch' 'rollup -c rollup.background.js --watch'

clean:
	rm -frv *.bundle.js
	rm -frv build/
