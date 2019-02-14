from collections import namedtuple
import json

import matplotlib.pyplot as plt
import numpy as np
from slugify import slugify


Dist = namedtuple("Requests", ["raw", "cdf"])


class Adblocker:
    def __init__(self, filename, color, label):
        self.label = label
        self.color = color
        self._raw = self.load_data(filename)

        self.cacheSize = self._raw["cacheSize"]
        self.parsingTime = self._raw["parsingTime"]

        serializationTimings = self._raw.get("serializationTimings")
        if serializationTimings:
            self.serializationTimings = Dist(
                raw=serializationTimings, cdf=self.generateCDF(serializationTimings)
            )

        deserializationTimings = self._raw.get("deserializationTimings")
        if deserializationTimings:
            self.deserializationTimings = Dist(
                raw=deserializationTimings, cdf=self.generateCDF(deserializationTimings)
            )

        # data
        self.blocked = Dist(
            raw=self._raw["matches"], cdf=self.generateCDF(self._raw["matches"])
        )
        self.not_blocked = Dist(
            raw=self._raw["noMatches"], cdf=self.generateCDF(self._raw["noMatches"])
        )
        self.all = Dist(raw=self._raw["all"], cdf=self.generateCDF(self._raw["all"]))

    @staticmethod
    def load_data(filename):
        with open(filename, "r") as f:
            return json.load(f)

    @staticmethod
    def generateCDF(array):
        cdf_attrs = namedtuple("cdf_attrs", ["cdf", "bin_edges"])

        data_size = len(array)

        # Set bins edges
        data_set = sorted(set(array))
        bins = np.append(data_set, data_set[-1] + 1)

        # Use the histogram function to bin the data
        counts, bin_edges = np.histogram(array, bins=bins, density=False)
        counts = counts.astype(float) / data_size

        # Find the cdf
        _cdf = np.cumsum(counts)

        return cdf_attrs(cdf=_cdf, bin_edges=bin_edges)


def compare_CDF(
    *args,
    attr="match",
    log_x=False,
    log_y=False,
    xlim=None,
    save=True,
    y_label="Fraction of Requests",
    title=None,
):
    fig, ax = plt.subplots()

    for a in args:
        _attr = getattr(a, attr)
        ax.plot(
            _attr.cdf.bin_edges[0:-1],
            _attr.cdf.cdf,
            linestyle="--",
            linewidth=2,
            color=a.color,
            label=a.label,
        )

    # Plot the cdf
    ax.grid(linestyle="--", linewidth=1)
    if xlim:
        ax.set_xlim(*xlim)
    ax.legend(loc="lower right")
    plt.tight_layout(pad=3)
    if log_x:
        plt.xscale("log")
        plt.xlabel("Time (ms) \n log (base 10)")
    else:
        plt.xlabel("Time (ms)")
    if log_y:
        plt.yscale("log")
        plt.ylabel(f"{y_label} \n log (base 10)")
    else:
        plt.ylabel(y_label)

    if title is not None:
        plt.title(title)

    if save:
        filename = slugify(f'{"-".join(map(lambda x: x.label, args))}-{attr}')
        fig.savefig(f"plots/{filename}.svg")
    plt.show()


def barplot(df, metric, ylabel, color, save=True, title=None):
    if title is None:
        title = metric.title()
    fig, ax = plt.subplots()
    plt.bar(x=df.adblocker, height=df[metric], width=0.5, color=color)

    # Plot the cdf
    ax.grid(linestyle="--", linewidth=1)

    plt.tight_layout(pad=3)
    plt.ylabel(ylabel)
    plt.title(title)
    if save:
        fig.savefig(f"plots/{slugify(metric)}.svg")
    plt.show()


def pieplot(*args, save=True):
    match = []
    no_match = []

    for a in args:
        match.append(len(a.blocked.raw))
        no_match.append(len(a.not_blocked.raw))

    sizes = [np.mean(match), np.mean(no_match)]
    labels = ["Blocked", "Not Blocked"]
    colors = ["#ff9999", "#91c5f5"]
    explode = (0.05, 0.05)
    plt.pie(
        sizes,
        colors=colors,
        labels=labels,
        autopct="%1.1f%%",
        startangle=90,
        pctdistance=0.85,
        explode=explode,
    )

    # draw circle
    centre_circle = plt.Circle((0, 0), 0.70, fc="white")
    fig = plt.gcf()
    fig.gca().add_artist(centre_circle)

    # Equal aspect ratio ensures that pie is drawn as a circle
    plt.axis("equal")
    plt.tight_layout()
    plt.title("Proportion of Blocked Requests")
    plt.show()
    fig.savefig("plots/requests-composition.svg")


def get_99p(adblocker):
    return [
        adblocker.all.cdf.bin_edges[
            len([x for x in adblocker.all.cdf.cdf if x < 0.99])
        ],
        adblocker.not_blocked.cdf.bin_edges[
            len([x for x in adblocker.not_blocked.cdf.cdf if x < 0.99])
        ],
        adblocker.blocked.cdf.bin_edges[
            len([x for x in adblocker.blocked.cdf.cdf if x < 0.99])
        ],
    ]


def generate_table(p99, medians, request_type):
    tables = {"99": p99, "median": medians}

    args = {}
    blockers = ["ghostery", "ublock", "abp", "brave", "duck"]
    for name in blockers:
        for kind in ["median", "99"]:
            table = tables[kind]
            args[f"{name}_{kind}"] = "%.3f" % float(
                table[name][table.request_type == request_type]
            )
            for vs in blockers:
                if vs != "ghostery":
                    args[f"vs_{vs}_{kind}"] = "%.1f" % float(
                        table[f"{vs}_vs_ghostery"][table.request_type == request_type]
                    )

    return """
|               | 99% OF REQUESTS              | MEDIAN                       |
| ------------- | ---------------------------- | ---------------------------- |
| **Ghostery**  | **{ghostery_99}ms**                  | **{ghostery_median}ms**                  |
| uBlock Origin | {ublock_99}ms (**{vs_ublock_99}x slower**)    | {ublock_median}ms (**{vs_ublock_median}x slower**)    |
| Adblock Plus  | {abp_99}ms (**{vs_abp_99}x slower**)    | {abp_median}ms (**{vs_abp_median}x slower**)    |
| Brave         | {brave_99}ms (**{vs_brave_99}x slower**)   | {brave_median}ms (**{vs_brave_median}x slower**)    |
| DuckDuckGo    | {duck_99}ms (**{vs_duck_99}x slower**) | {duck_median}ms (**{vs_duck_median}x slower**) |
    """.format(
        **args
    )
