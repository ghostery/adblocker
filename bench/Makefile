
.PHONY: all

all: dataset/requests.json
	NODE_ENV=production node --max_old_space_size=8192 --expose-gc run_benchmark.js dataset/requests.json

dataset/requests.json:
	make -C dataset
