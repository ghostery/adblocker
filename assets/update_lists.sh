#!/bin/sh

curl 'https://easylist-downloads.adblockplus.org/antiadblockfilters.txt' > ./easylist-downloads.adblockplus.org/antiadblockfilters.txt &
curl 'https://easylist-downloads.adblockplus.org/easylistgermany.txt' > ./easylist.to/easylistgermany/easylistgermany.txt &
curl 'https://easylist.to/easylist/easylist.txt' > ./easylist.to/easylist/easylist.txt &
curl 'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/badware.txt' > ./raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/badware.txt &
curl 'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/filters.txt' > ./raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/filters.txt &
curl 'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resource-abuse.txt' > ./raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resource-abuse.txt &
curl 'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resources.txt' > ./raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/resources.txt &
curl 'https://raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/unbreak.txt' > ./raw.githubusercontent.com/uBlockOrigin/uAssets/master/filters/unbreak.txt &

# Wait for child processes to terminate
wait
