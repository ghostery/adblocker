
all: deps run

../../node_modules/puppeteer-pool:
	npm install --save https://github.com/remusao/puppeteer-pool.git

requests.json:
	curl https://cdn.cliqz.com/adblocking/requests_top500.json.gz | gunzip > requests.json

# VERSION: 0b3423e3147bad4c001f5ae3456571a164a6e2e5
./blockers/adblockpluscore:
	git clone --branch=next https://github.com/adblockplus/adblockpluscore.git ./blockers/adblockpluscore
	cd ./blockers/adblockpluscore && git reset --hard 0b3423e3147bad4c001f5ae3456571a164a6e2e5

# VERSION: 0.2.0
../../node_modules/abp-filter-parser:
	npm install --save https://github.com/duckduckgo/abp-filter-parser.git#0.2.0
	cd ../../node_modules/abp-filter-parser/ && npm install && cd -

# VERSION: 4.1.3
../../node_modules/ad-block:
	npm install --save ad-block@4.1.3

../../dist:
	cd ../../ && npm ci && npm pack

brave: ../../node_modules/ad-block
	NODE_ENV=production node run.js brave requests.json

ghostery:
	NODE_ENV=production node run.js ghostery requests.json

../../node_modules/jsdom:
	npm install --save jsdom

../../node_modules/sandboxed-module:
	npm install --save sandboxed-module

ublock: ../../node_modules/sandboxed-module ../../node_modules/jsdom
	NODE_ENV=production node run.js ublock requests.json

adblockplus: ./blockers/adblockpluscore
	NODE_ENV=production node run.js adblockplus requests.json

duckduckgo: ../../node_modules/abp-filter-parser
	NODE_ENV=production node run.js duckduckgo requests.json

tldts:
	NODE_ENV=production node run.js tldts requests.json

url:
	NODE_ENV=production node run.js url requests.json

adblockfast:
	NODE_ENV=production node run.js adblockfast requests.json

deps: requests.json \
	  ../../dist \
	  ../../node_modules/abp-filter-parser \
	  ../../node_modules/ad-block \
	  ../../node_modules/jsdom \
	  ../../node_modules/puppeteer-pool \
	  ../../node_modules/sandboxed-module \
	  ./blockers/adblockpluscore

run: deps url tldts ghostery ublock adblockplus brave duckduckgo adblockfast
