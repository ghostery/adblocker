
all: deps run

requests.json:
	curl https://cdn.cliqz.com/adblocking/requests_top500.json.gz | gunzip > requests.json

# VERSION: a15e8020d092f7b9f96834d237b6ca560c6b4335
./blockers/adblockpluscore:
	git clone --branch=next https://github.com/adblockplus/adblockpluscore.git ./blockers/adblockpluscore
	cd ./blockers/adblockpluscore && git reset --hard a15e8020d092f7b9f96834d237b6ca560c6b4335

adblockpluscore: ./blockers/adblockpluscore

./node_modules/adblock-rs:
	npm install --no-save adblock-rs

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

min:
	NODE_ENV=production node run.js min requests.json

deps:
	npm run prepare

run: deps url tldts cliqz ublock adblockplus brave adblockfast
