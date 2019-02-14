# **Adblockers: Performance Overview**

Here we present a detailed analysis of the performance of some of the
most popular content-blocker engines: *uBlock Origin*, *Adblock Plus*,
*Brave*, *DuckDuckGo* and *Cliqz/Ghostery's* advanced adblocker (shipped
since Ghostery 8), which we will refer to as *Ghostery* for the rest of
the article.

This study was motivated by the recent [Manifest V3
controversy](https://bugs.chromium.org/p/chromium/issues/detail?id=896897).
One of the proposed changes involves crippling the WebRequest APIs to
limit their blocking abilities. Two justifications were put forth: one
related to *performance* and another related to privacy. The privacy
argument deserves its own separate analysis and will not be covered
here. In this study, we show that the *performance* argument does not
hold. Our comparison demonstrates that the most popular content-blockers
are already very efficient (having a sub-millisecond median decision
time per request) and should not result in any over-head noticeable by
users. Besides, efficiency is continuously improved and technologies
such as WebAssembly will allow to go even further.

This comparison does not involve full extensions, but instead **focuses
on network request blocking engines**, which is the most CPU intensive
task performed by content-blockers (in particular, this does not account
for cosmetics engines or subscription management). Here are the home
pages for all content-blockers compared:

* Ghostery and Cliqz's adblocker: https://github.com/cliqz-oss/adblocker
* Brave's adblocker: https://github.com/brave/ad-block
* DuckDuckGo's adblocker: https://github.com/duckduckgo/abp-filter-parser
* uBlock Origin: https://github.com/gorhill/uBlock
* Adblock Plus: https://github.com/adblockplus/adblockpluscore

We did not include native blockers from Chromium and Safari projects
as this would require some significant effort to package them in a way
that allows benchmarking against the other libraries. We leave this for
future work.

All blockers except *uBlock Origin* are available as JavaScript libraries
which can be loaded in Node.js. To allow comparing *uBlock Origin* as
well, we had to extract the static network filtering engine [out of
the extension](./ublock.js). The version of *uBlock Origin* running in
this benchmark *does not make use of the Webassembly* version of domain
matching.

All benchmarks were ran on an X1 Carbon 2016 (i7 U6600 + 16 GB) in
Node.js 11.9.0. Memory measurements were performed in Google Chrome version
72.0.3626.96 using the memory snapshot tool.

## Results

Before presenting the detailed analysis of the results, let us highlight
our findings in a nutshell:

- **Time to Process a Request in Ghostery** (median):
  - 2.7x faster than *uBlock Origin*
  - 2.9x faster than *Adblock Plus*
  - 6.3x faster than *Brave*'s Adblocker
  - 1258.4x faster than *DuckDuckGo*'s adblocker
- **Loading Ghostery's Blocking Engine** (from cache):
  - 368x faster than *Brave*'s Adblocker
  - 588x faster than *uBlock Origin*
  - 3575x faster than *Adblock Plus*
  - *DuckDuckGo*'s adblocker does not offer serialization, so the loading cost is always the one from parsing the lists.
- **Memory Consumption of Ghostery's Blocking Engine** (at startup, in Chrome):
  - 1.6x less memory than *uBlock Origin*
  - 8.4x less memory than *Adblock Plus*
  - 8.8x less memory than *DuckDuckGo*'s adblocker
  - The memory usage of *Brave* could not be evaluated using the devtools
    and thus is not included in this section.

### 0. About the Dataset

To measure the performance of each content-blocker, we replayed requests
from popular domains *once* and kept track of the time it took to decide
if they should be blocked or not. We then analyzed the results in three
different ways: all requests, blocked only and not blocked (taken from
the same run).

This requests dataset was created using a pool of Chrome
headless browsers (driven by the [`puppeteer` library](https://github.com/GoogleChrome/puppeteer))
to visit home pages of the *top 500 domains* (as reported by Cliqz
Search), as well as up to 3 pages of each domain (picked randomly from
the home page) and collecting all the network requests seen (URL, frame
URL and type). The dataset was shuffled in such a way that the different
pages were visited in a random order, but requests seen on each page
were replayed as they were recorded initially.

The dataset is composed of 242944 requests. We released the data publicly at
this URL: [requests_top500.json.gz](https://cdn.cliqz.com/adblocking/requests_top500.json.gz).
The script to create the dataset is also available:
[create_dataset.js](./create_dataset.js) and
[shuffle_dataset.js](./shuffle_dataset.js) was used to shuffle the
requests to produce the final data.

### 1. Composition of Requests

For the purpose of this comparison, we consider that each network
request can be either blocked or allowed by the content-blocker; we call
the process of deciding whether a request should be blocked or not:
*matching*. We observed that from our dataset, only ~19.2% are blocked
(average across all content-blockers).

![](./plots/requests-composition.svg)

It results from this observation that content-blockers will perform better on
average if they can efficiently decide which requests to *not block*.

The filters used to determine whether or not a request is to be blocked
are the ones from [Easylist](https://easylist-downloads.adblockplus.org/easylist.txt),
where we removed all the cosmetic rules before running the benchmarks.
The final list contains *38978 network filters* and is available here:
[easylist.txt](./easylist.txt).

It should be noted at this point that a larger proportion of requests
would be blocked by enabling extra filters lists such as *EasyPrivacy*.

### 2. Time To Match All Requests

We first look at all of the requests (whether they will eventually
be blocked or not). We use a log-scale for the x-axis (time in
milliseconds) to facilitate the comparison of the cumulative
distribution of the time it takes for content-blockers to decide whether
or not a request should be blocked.

Here is a break-down of the 99th percentile and median times for each
content-blocker:

|               | 99% OF REQUESTS              | MEDIAN                       |
| ------------- | ---------------------------- | ---------------------------- |
| **Ghostery**  | **0.050ms**                  | **0.007ms**                  |
| uBlock Origin | 0.124ms (**2.5x slower**)    | 0.017ms (**2.7x slower**)    |
| Adblock Plus  | 0.103ms (**2.1x slower**)    | 0.019ms (**2.9x slower**)    |
| Brave         | 1.288ms (**25.9x slower**)   | 0.041ms (**6.3x slower**)    |
| DuckDuckGo    | 12.085ms (**242.5x slower**) | 8.270ms (**1258.4x slower**) |

Below you can find the cumulative distribution plots of these timings:

![](./plots/ghostery-ublock-origin-brave-duckduckgo-adblock-plus-all.svg)

### 3. Time To Match Requests Which Are Not Blocked

The following table details 99th percentile and median timings for requests not
blocked:

|               | 99% OF REQUESTS              | MEDIAN                       |
| ------------- | ---------------------------- | ---------------------------- |
| **Ghostery**  | **0.049ms**                  | **0.006ms**                  |
| uBlock Origin | 0.112ms (**2.3x slower**)    | 0.018ms (**2.8x slower**)    |
| Adblock Plus  | 0.105ms (**2.2x slower**)    | 0.020ms (**3.1x slower**)    |
| Brave         | 1.270ms (**26.2x slower**)   | 0.038ms (**5.9x slower**)    |
| DuckDuckGo    | 11.190ms (**230.5x slower**) | 6.781ms (**1060.5x slower**) |

![](./plots/ghostery-ublock-origin-brave-duckduckgo-adblock-plus-not-blocked.svg)

### 4. Time To Match Requests Which Are Blocked

The following table details 99th percentile and median timings for requests blocked:

|               | 99% OF REQUESTS              | MEDIAN                      |
| ------------- | ---------------------------- | --------------------------- |
| **Ghostery**  | **0.052ms**                  | **0.007ms**                 |
| uBlock Origin | 0.165ms (**3.1x slower**)    | 0.016ms (**2.2x slower**)   |
| Adblock Plus  | 0.099ms (**1.9x slower**)    | 0.014ms (**1.9x slower**)   |
| Brave         | 1.468ms (**28.0x slower**)   | 0.062ms (**8.5x slower**)   |
| DuckDuckGo    | 13.025ms (**248.5x slower**) | 8.31ms (**1130.6x slower**) |

![](./plots/ghostery-ublock-origin-brave-duckduckgo-adblock-plus-blocked.svg)

On these graphs we observe a plateau for *Adblock Plus*, *Brave* and
*Duckduckgo*. This can be explained by the fact that these engines
implement some form of caching internally, thus having a very fast
response time for some requests which were already seen (redundancy in
requests comes from both common third-parties seen on multiple websites
as well as the fact that we load several pages for each domain). This
caching can be implemented on top of any content-blocker and does not
tell much about the efficiency of each; we can see this as a means to
trade *memory* against *CPU usage*.

From the previous measurements we see that Ghostery out-performs other
libraries in terms of matching speed. Without going into too many
details, here are some of the optimizations which can explain these
results:

* Ghostery makes use of a reverse index associating tokens to filters. Contrary
  to other libraries, we make sure that we pick *the best* token for each filter
  at construction time (best being defined as the *least seen token*). This incurs
  a one-time extra cost but results in maximized dispatching capabilities.
* Filters are stored in a very compact form, in typed arrays, and only loaded in
  memory lazily, when there is a chance they will be blocked (if we encounter
  identical tokens in URLs).
* Filters loaded in memory are optimized on-the-fly and multiple filters can be
  combined for increased efficiency. The optimizations were carefully crafted
  based on common cases observed in Easylist.


### 5. Serialization And Deserialization

In this section we have a look at the performance of content-blockers
when it comes to serializing their internal representation for faster
subsequent loading. Only *DuckDuckGo*'s engine does not provide this
feature. *uBlock Origin*, *Ghostery*, *Adblock Plus* and *Brave* all allow to
serialize or cache (*uBlock Origin*'s terminology is: *selfies*) the
entire blocking engine to either a string or a buffer, which can then be
used to speed-up subsequent loads.

Because this is a one-time operation, having a higher loading-time does not
impact significantly desktop users. On the other hand, the ability to quickly
initialize the content-blocker is critical on mobile.

Another use-case allowed by such capability is to perform the parsing
of the lists on the backend and ship the serialized form of the
content-blocker to clients directly, which removes the cost of
initialization completely.

We performed 100 serializations for each content-blocker and display the
results below:

![](./plots/ghostery-ublock-origin-brave-adblock-plus-serializationtimings.svg)

This bar plot contains the median time taken to serialize the engine for each
content-blocker:

![](./plots/serializationtimings.svg)

Similarly, we measure the time it takes to restore the content-blocker from its
serialized form:

![](./plots/ghostery-ublock-origin-brave-adblock-plus-deserializationtimings.svg)

And here is the median time:

![](./plots/deserializationtimings.svg)

Last but not least, we measured the size of the serialized buffer for each
content-blocker:

![](./plots/cache-size.svg)

From these measurements we see that *Ghostery* offers both significantly
faster serialization and deserialization times as well as a smaller
cache size.

The reason is the following: the internal representation is already
mostly stored in a compact form (using typed arrays); this means that
serialization only consists in adding a small amount of metadata
along-side the already available arrays and deserialization is
*essentially instantaneous* since it's enough to create some typed array
views on top of the serialized buffer (think of `mmap` but using typed
arrays). This also explains the very low memory consumption: after
initialization, the memory usage is only slightly higher than the size
of the serialized form.

### 6. Memory Consumption at Start-up

Here we consider the memory usage of each content-blocker, initialized
from lists (not from cache) after one full garbage collection. The
measurements were performed using Chrome's devtools memory snapshot. We
did not measure Brave here since the memory used from C++ side does not
seem to be taken into account in the snapshot. Also keep in mind that
this memory usage can vary at run-time as content-blockers might cache
frequently used resources, etc.

![](./plots/memory-usage-at-startup.svg)

As mentioned in the previous section on serialization, the very low
memory usage of *Ghostery* can be explained by the fact that the
internal representation mostly consists of very compact typed arrays
with some small over-head for extra meta-data. Again, we need to stress
here that this measures the network filtering engine of Ghostery only,
not the full extension, as described in the introduction.

### 7. Parsing Lists

In this graph, we present the time it takes for each content-blocker to
be initialized from the lists (without any prior caching, which means
initializing all internal resources by parsing the raw list). We see
that only Brave seems to be significantly slower and that *uBlock Origin*,
*Ghostery*, *Adblock Plus* and *DuckDuckGo* all perform well.

![](./plots/time-to-parse-easylist-all.svg)

It seems that the long parsing time for Brave is a [known
issue](https://github.com/brave/ad-block/issues/158) tracked on their
GitHub repository.

Now if we remove Brave, we see that there are still differences between
*uBlock Origin*, *Ghostery*, *Adblock Plus* and *DuckDuckGo*. One reason
*Ghostery* is slower than *uBlock Origin* and *AdblockPlus* here is that to
achieve maximum performance while matching as well as minimize memory
usage, there is a bit more work to do up-front. In practice this does
not matter so much since it is a one-time operation and that subsequent
loads are performed from cache, and this is really fast (in fact, we
can even perform the parsing backend-side and just ship the serialized
version of the blocker, which removes this step completely).

![](./plots/time-to-parse-easylist-without-brave.svg)

### 8. Conclusion

In this study we looked closely at the performance of some of the most
popular content-blockers in use today. In particular, we focused on the
efficiency of their network filtering engines, which is the most CPU
intensive task they perform.

This work was motivated by one of the claims formulated in the [Manifest V3
proposal](https://bugs.chromium.org/p/chromium/issues/detail?id=896897)
of the Chromium project: *"the extension then performs arbitrary (and
potentially very slow) JavaScript"*, talking about content-blockers'
ability to process all network requests. From the measurements, we do
not think this claim holds, as all popular content-blockers are already
very efficient and should not incur any noticeable slow-down for users.
Moreover, the efficiency of content-blockers is *continuously improving*,
either thanks to more innovative approaches or using technologies like
WebAssembly to reach native performance.

While most content-blockers are indeed efficient, they are not
equivalent and we observed that *Ghostery* performs consistently as well
or better across all dimensions, often surpassing other libraries.

We hope that these benchmarks will give an opportunity for content-blockers
developers to measure their own progress against other popular libraries;
benefiting all users, no matter which extension they use, as the efficiency of
content-blockers improves.
