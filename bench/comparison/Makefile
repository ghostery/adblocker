
all: deps run

../../node_modules/puppeteer-pool:
	npm install --save https://github.com/remusao/puppeteer-pool.git

requests.json:
	curl https://cdn.cliqz.com/adblocking/requests_top500.json.gz | gunzip > requests.json

# VERSION: 69118b828db0f6a53bc2306deacffc5361aeef0c
./blockers/adblockpluscore:
	git clone --branch=next https://github.com/adblockplus/adblockpluscore.git ./blockers/adblockpluscore
	cd ./blockers/adblockpluscore && git reset --hard c84ece65137ef991559c6b78d13eae3296236b4e

# VERSION: 0.2.0
../../node_modules/abp-filter-parser:
	npm install --save https://github.com/duckduckgo/abp-filter-parser.git
	cd ../../node_modules/abp-filter-parser/ && npm install && cd -

# VERSION: latest
../../node_modules/adblock-rs:
	npm install --save adblock-rs

../../dist:
	cd ../../ && npm ci && npm pack

brave: ../../node_modules/adblock-rs
	NODE_ENV=production node run.js brave requests.json

cliqz:
	NODE_ENV=production node run.js cliqz requests.json

cliqz-compression:
	NODE_ENV=production node run.js cliqzCompression requests.json

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
	  ../../node_modules/adblock-rs \
	  ../../node_modules/jsdom \
	  ../../node_modules/puppeteer-pool \
	  ../../node_modules/sandboxed-module \
	  ./blockers/adblockpluscore

run: deps url tldts cliqz ublock adblockplus brave adblockfast duckduckgo
