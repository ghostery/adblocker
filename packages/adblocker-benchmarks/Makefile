.PHONY: all clean deps run ubo-snfe adblockpluscore adblock-rs brave cliqz cliqz-compression ublock adblockplus tldts url min

all: deps run

requests.json:
	curl https://cdn.cliqz.com/adblocking/requests_top500.json.gz | gunzip > requests.json

./blockers/ublock/.git:
	git submodule update --recursive --depth 1 --init blockers/ublock

./node_modules/uBO-snfe:
	make -C ./blockers/ublock install-nodejs clean

ubo-snfe: ./blockers/ublock/.git ./node_modules/uBO-snfe

./blockers/adblockpluscore/.git:
	git submodule update --recursive --depth 1 --init blockers/adblockpluscore

adblockpluscore: ./blockers/adblockpluscore/.git

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

clean:
	rm -f requests.json
	npm uninstall uBO-snfe adblock-rs
	git submodule deinit --all
