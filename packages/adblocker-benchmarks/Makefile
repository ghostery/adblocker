node_command := NODE_ENV=production node

ifeq ($(SHOW_MEMORY), 1)
	node_command := $(node_command) --expose-gc
	run_options := $(run_options) --memory
endif

.PHONY: all clean deps run ubo-core adblockpluscore tsurlfilter-node adblock-rs brave cliqz cliqz-compression ublock adblockplus tsurlfilter tldts url min

all: deps run

requests.json:
	curl https://cdn.cliqz.com/adblocking/requests_top500.json.gz | gunzip \
		| sed -e '$$ ! s/$$/,/; 1 s/^/\[/; $$ s/$$/]/' > requests.json

./blockers/ublock/.git:
	git submodule update --recursive --depth 1 --init blockers/ublock

./node_modules/@gorhill/ubo-core:
	make -C ./blockers/ublock install-nodejs clean
	npx rollup ./node_modules/@gorhill/ubo-core/index.js \
		--file ./node_modules/@gorhill/ubo-core/bundle.min.cjs --format cjs \
		--context global --plugin terser

ubo-core: ./blockers/ublock/.git ./node_modules/@gorhill/ubo-core

./node_modules/adblockpluscore:
	cp -R ./blockers/adblockpluscore ./node_modules
	cp ./blockers/adblockpluscore-index.js ./node_modules/adblockpluscore/lib
	npx rollup ./node_modules/adblockpluscore/lib/adblockpluscore-index.js \
		--file ./node_modules/adblockpluscore/lib/bundle.min.cjs --format cjs \
		--plugin commonjs --plugin json --plugin terser --output.exports named

./blockers/adblockpluscore/.git:
	git submodule update --recursive --depth 1 --init blockers/adblockpluscore

adblockpluscore: ./blockers/adblockpluscore/.git ./node_modules/adblockpluscore

./node_modules/@adguard/tsurlfilter:
	npm install --no-save @adguard/tsurlfilter
	npx rollup ./node_modules/@adguard/tsurlfilter/dist/tsurlfilter.umd.js \
		--file ./node_modules/@adguard/tsurlfilter/dist/bundle.min.cjs --format cjs \
		--context global --plugin terser

tsurlfilter-node: ./node_modules/@adguard/tsurlfilter

./node_modules/adblock-rs:
	npm install --no-save adblock-rs

adblock-rs: ./node_modules/adblock-rs

brave:
	$(node_command) run.js brave $(run_options)

cliqz:
	$(node_command) run.js cliqz $(run_options)

cliqz-compression:
	$(node_command) run.js cliqzCompression $(run_options)

ublock:
	$(node_command) run.js ublock $(run_options)

adblockplus:
	$(node_command) run.js adblockplus $(run_options)

tsurlfilter:
	$(node_command) run.js tsurlfilter $(run_options)

tldts:
	$(node_command) run.js tldts $(run_options)

url:
	$(node_command) run.js url $(run_options)

adblockfast:
	$(node_command) run.js adblockfast $(run_options)

min:
	$(node_command) run.js min $(run_options)

deps:
	npm run prepare

run: deps url tldts cliqz ublock adblockplus brave adblockfast

clean:
	rm -f requests.json
	npm uninstall tsurlfilter adblockpluscore ubo-core adblock-rs
	git submodule deinit --all
