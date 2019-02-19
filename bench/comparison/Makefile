
all: deps run

puppeteer:
	npm install --save git://github.com/remusao/puppeteer-pool.git

# VERSION: 34c49bbf029e586226220c067c50cec6e8bf8842
adblockpluscore:
	tar xjvf adblockpluscore-34c49bbf029e586226220c067c50cec6e8bf8842.tar.bz2

# VERSION: 0.2.0
../../node_modules/abp-filter-parser:
	npm install --save git://github.com/duckduckgo/abp-filter-parser.git#0.2.0
	cd ../../node_modules/abp-filter-parser/ && npm install && cd -

# VERSION: 4.1.3
../../node_modules/ad-block:
	npm install --save ad-block@4.1.3

brave: ../../node_modules/ad-block
	NODE_ENV=production node run.js brave requests.json

ghostery:
	NODE_ENV=production node run.js ghostery requests.json

../../node_modules/jsdom:
	npm install --save-dev jsdom

../../node_modules/sandboxed-module:
	npm install --save-dev sandboxed-module

ublock: ../../node_modules/sandboxed-module ../../node_modules/jsdom
	NODE_ENV=production node run.js ublock requests.json

adblockplus: adblockpluscore
	NODE_ENV=production node run.js adblockplus requests.json

duckduckgo: ../../node_modules/abp-filter-parser
	NODE_ENV=production node run.js duckduckgo requests.json

tldts:
	NODE_ENV=production node run.js tldts requests.json

url:
	NODE_ENV=production node run.js url requests.json

deps: puppeteer adblockpluscore ../../node_modules/abp-filter-parser ../../node_modules/ad-block
run: url tldts ghostery ublock adblockplus brave duckduckgo
