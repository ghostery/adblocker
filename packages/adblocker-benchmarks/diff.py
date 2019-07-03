from collections import defaultdict

cliqz_blocked = defaultdict(set)
with open("cliqz_blocks.txt") as input_file:
    for line in input_file:
        if "<++>" in line:
            url, rule = line.strip().split("<++>", 1)
            cliqz_blocked[url].add(rule)


abp_blocked = defaultdict(set)
with open("abp_blocks.txt") as input_file:
    for line in input_file:
        if "<++>" in line:
            url, rule = line.strip().split("<++>", 1)
            abp_blocked[url].add(rule)

for url, rules in cliqz_blocked.items():
    if url not in abp_blocked:
        print(url)


for url, rules in abp_blocked.items():
    if url not in cliqz_blocked:
        print(url, rules)
