node_command := NODE_ENV=production node

ifeq ($(DEBUG), 1)
	run_options := $(run_options) --debug
endif

ifneq ($(COMPARE), )
	run_options := $(run_options) --compare=$(COMPARE)
endif

ifeq ($(SHOW_MEMORY), 1)
	node_command := $(node_command) --expose-gc
	run_options := $(run_options) --memory
endif

ifeq ($(HOSTS_ONLY), 1)
	run_options := $(run_options) --hosts-only
endif

ifeq ($(SKIP_SERIALIZATION), 1)
	run_options := $(run_options) --skip-serialization
endif

.PHONY: all clean deps run ubo-core adblockpluscore tsurlfilter-node fast-hosts-lookup adblock-rs brave cliqz cliqz-compression ublock adblockplus tsurlfilter tldts url min re hosts-lookup

all: deps run

requests.json:
	curl -O --compressed https://raw.githubusercontent.com/mjethani/scaling-palm-tree/06ef031aa3d2742dc7e6234f579e28a9b6d499b0/requests.json

./node_modules/@gorhill/ubo-core:
	yarn add @gorhill/ubo-core@0.1.14

./node_modules/@gorhill/ubo-core/bundle.min.cjs:
	npx rollup ./node_modules/@gorhill/ubo-core/index.js \
		--file ./node_modules/@gorhill/ubo-core/bundle.min.cjs --format cjs \
		--context global --plugin terser

ubo-core: ./node_modules/@gorhill/ubo-core ./node_modules/@gorhill/ubo-core/bundle.min.cjs

./node_modules/adblockpluscore:
	yarn add adblockpluscore@0.3.1

./node_modules/adblockpluscore/lib/bundle.min.cjs:
	cp ./blockers/adblockpluscore-index.js ./node_modules/adblockpluscore/lib
	npx rollup ./node_modules/adblockpluscore/lib/adblockpluscore-index.js \
		--file ./node_modules/adblockpluscore/lib/bundle.min.cjs --format cjs \
		--plugin commonjs --plugin json --plugin terser --output.exports named

adblockpluscore: ./node_modules/adblockpluscore ./node_modules/adblockpluscore/lib/bundle.min.cjs

./node_modules/@adguard/tsurlfilter:
	yarn add @adguard/tsurlfilter@0.7.26

tsurlfilter-node: ./node_modules/@adguard/tsurlfilter

./node_modules/fast-hosts-lookup:
	yarn add mjethani/fast-hosts-lookup#9136bb8c331ee5dba8ac1a0018552cace11e2afa

fast-hosts-lookup: ./node_modules/fast-hosts-lookup

./node_modules/adblock-rs:
	yarn add adblock-rs@0.3.15

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

re:
	$(node_command) run.js re $(run_options)

hosts-lookup:
	$(node_command) run.js hosts-lookup $(run_options)

deps:
	yarn download-deps

run: deps url tldts cliqz ublock adblockplus brave adblockfast

clean:
	rm -f requests.json
	yarn remove fast-hosts-lookup @adguard/tsurlfilter adblockpluscore @gorhill/ubo-core adblock-rs
