
all: deps run

adblockpluscore:
	git clone --depth=1 https://github.com/adblockplus/adblockpluscore.git && cd adblockpluscore && npm install && cd -

../../node_modules/abp-filter-parser:
	npm install --save git://github.com/duckduckgo/abp-filter-parser.git#0.2.0
	cd ../../node_modules/abp-filter-parser/ && npm install && cd -

../../node_modules/ad-block:
	npm install --save ad-block

brave: ../../node_modules/ad-block
	NODE_ENV=production node run.js brave requests.json

cliqz:
	NODE_ENV=production node run.js cliqz requests.json

ublock:
	NODE_ENV=production node run.js ublock requests.json

adblockplus: adblockpluscore
	NODE_ENV=production node run.js adblockplus requests.json

duckduckgo: ../../node_modules/abp-filter-parser
	NODE_ENV=production node run.js duckduckgo requests.json

run: cliqz ublock adblockplus brave duckduckgo
