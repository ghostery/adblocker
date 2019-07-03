
all: deps run

requests.json:
	curl https://cdn.cliqz.com/adblocking/requests_top500.json.gz | gunzip > requests.json

# VERSION: 69118b828db0f6a53bc2306deacffc5361aeef0c
./blockers/adblockpluscore:
	git clone --branch=next https://github.com/adblockplus/adblockpluscore.git ./blockers/adblockpluscore
	cd ./blockers/adblockpluscore && git reset --hard 396adf60f5df167c654222d9ed52f6a4da8dd16c

adblockpluscore: ./blockers/adblockpluscore

./node_modules/adblock-rs:
	npm install adblock-rs

adblock-rs: ./node_modules/adblock-rs

brave:
	NODE_ENV=production node run.js brave requests.json

cliqz:
	NODE_ENV=production node run.js cliqz requests.json

cliqz-compression:
	NODE_ENV=production node run.js cliqzCompression requests.json

ublock:
	NODE_ENV=production node run.js ublock requests.json

adblockplus:
	NODE_ENV=production node run.js adblockplus requests.json

tldts:
	NODE_ENV=production node run.js tldts requests.json

url:
	NODE_ENV=production node run.js url requests.json

adblockfast:
	NODE_ENV=production node run.js adblockfast requests.json

deps:
	npm run prepare

run: deps url tldts cliqz ublock adblockplus brave adblockfast
