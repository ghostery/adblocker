#!/bin/sh

# uBlock Origin
curl 'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/badware.txt' > ./raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/badware.txt &
curl 'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/filters.txt' > ./raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/filters.txt &
curl 'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resource-abuse.txt' > ./raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resource-abuse.txt &
curl 'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resources.txt' > ./raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resources.txt &
curl 'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/unbreak.txt' > ./raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/unbreak.txt &
curl 'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/privacy.txt' > ./raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/privacy.txt &

# Peter Lowe
curl 'https://pgl.yoyo.org/adservers/serverlist.php?hostformat=adblockplus&showintro=0&mimetype=plaintext' > ./pgl.yoyo.org/adservers/serverlist.txt

# Easylist
curl 'https://easylist.to/easylist/easyprivacy.txt' > ./easylist.to/easylist/easyprivacy.txt &
curl 'https://easylist.to/easylist/easylist.txt' > ./easylist.to/easylist/easylist.txt &
curl 'https://easylist-downloads.adblockplus.org/easylistgermany.txt' > ./easylist.to/easylistgermany/easylistgermany.txt &
curl 'https://easylist-downloads.adblockplus.org/antiadblockfilters.txt' > ./easylist-downloads.adblockplus.org/antiadblockfilters.txt &

# AdGuard
curl 'https://filters.adtidy.org/extension/ublock/filters/11.txt' > ./adguard/mobile.txt &

# Wait for child processes to terminate
wait
