# Comparison With Other Blockers

These micro-benchmarks compare different content-blockers network-filter
matching engines as well as the time it takes to process raw requests (e.g.:
extracting hostnames and domains from URLs).

## Running Benchmarks

```sh
$ cd ./bench/comparison
$ make
```

## Results Analysis

Setup your Python environment:
```sh
$ pip install -r requirements.txt
$ jupyter notebook
```

Then open `comparing_adblockers.ipynb`
