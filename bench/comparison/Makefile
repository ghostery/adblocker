
all: deps run

deps:
	npm install --save ad-block git://github.com/duckduckgo/abp-filter-parser.git#0.2.0
	cd ../../node_modules/abp-filter-parser/ && npm install && cd -

run:
	NODE_ENV=production node --expose_gc run.js requests.json
