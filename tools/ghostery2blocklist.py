#!/usr/bin/env python
# -*- coding: utf-8 -*-

import json
import sys


def convert_host_path_patterns(patterns):
    def convert_rec(node):
        for label, value in node.items():
            if label == "$":
                for path_item in value:
                    path = path_item["path"]
                    bug = path_item["id"]
                    if path.endswith(".png"):
                        yield (f"^$image,xhr,bug={bug}", path)
                    elif path.endswith(".js"):
                        yield (f"^$script,bug={bug}", path)
                    elif path.endswith(".html"):
                        yield (f"^$bug={bug}", path)
                    elif path.endswith(".php"):
                        yield (f"^$bug={bug}", path)
                    elif path.endswith(".gif"):
                        yield (f"^$image,xhr,bug={bug}", path)
                    elif path.endswith(".json"):
                        yield (f"^$,bug={bug}", path)
                    else:
                        yield (f"$bug={bug}", path)
            else:
                for prefix in convert_rec(value):
                    yield prefix + (label,)

    return [
        f'||{".".join(labels)}^{path}{option}'
        for (option, path, *labels) in convert_rec(patterns)
    ]


def convert_host_patterns(patterns):
    def convert_rec(node):
        for label, value in node.items():
            if label == "$":
                yield (f"^$bug={value}",)
            else:
                for prefix in convert_rec(value):
                    yield prefix + (label,)

    return [
        f'||{".".join(labels)}{option}' for (option, *labels) in convert_rec(patterns)
    ]


def convert_path_patterns(patterns):
    # A path pattern can match anywhere in the URL path
    return [f"{pattern}$bug={bug}" for pattern, bug in patterns.items()]


def convert_regex_patterns(patterns):
    return """
! (\\.feedburner\\.com\\/~f|feedproxy\\.google\\.com\\/~fc\\/)
||feedburner.com/~f$bug=26
||feedproxy.google.com/~fc$bug=26

! \\/woopra(\\.v(2|3|4))?\\.js
/woopra*.js$bug=32

! \\.google\\.com(...)?\\/coop\\/cse\\/brand
||google.com^*/coop/cse/brand$bug=64

! digg\\.com\\/[0-9a-zA-Z]*\\/diggthis\\.js
||digg.com^*/diggthis.js$bug=84

! twitter\\.com\\/javascripts\\/[0-9a-z]+\\.js
||twitter.com/javascripts/*js$bug=124

! (\\.haloscan\\.com\\/load\\/|js-kit\\.com\\/[0-9a-z\\/]+\\.js)
||haloscan.com/load/$bug=138
||js-kit.com/*.js$bug=138

! \\/adam\\/(cm8[0-9a-z_]+\\.js|detect)
/adam/cm8*.js$bug=480
/adam/detect$bug=480

! \\/resxcls[ax][0-9a-z_]*\\.js
resxclsax*.js$bug=483

! \\/gomez.+?\\.js
/gomez*.js$bug=484

! pmetrics\\.performancing\\.com\\/(js|in\\.php|[0-9]*\\.js)
||pmetrics.performancing.com/js$bug=603
||pmetrics.performancing.com/in.php$bug=603
||pmetrics.performancing.com/*.js$bug=603

! websitealive[0-9]\\.com
||websitealive*.com$bug=622

! \\/econda.*\\.js
/econda*.js$bug=635

! facebook\\.com\\/(v2\\.0\\/)?(plugins|widgets)\\/.*\\.php
||facebook.com/v2.0/plugins/*.php^$bug=719
||facebook.com/v2.0/widgets/*.php^$bug=719
||facebook.com/plugins/*.php^$bug=719
||facebook.com/widgets/*.php^$bug=719

! xcdn\\.xgraph\\.net\\/([0-9]|partner\\.js)
||xcdn.xgraph.net/partner.js^$script,bug=823

! (amconf|core|adcontent)\\.videoegg\\.com\\/(siteconf|eap|alternates|ads)\\/
||amconf.videoegg.com/siteconf/$bug=871
||core.videoegg.com/siteconf/$bug=871
||adcontent.videoegg.com/siteconf/$bug=871

||amconf.videoegg.com/eap/$bug=871
||core.videoegg.com/eap/$bug=871
||adcontent.videoegg.com/eap/$bug=871

||amconf.videoegg.com/alternates/$bug=871
||core.videoegg.com/alternates/$bug=871
||adcontent.videoegg.com/alternates/$bug=871

! (\\.google\\.com\\/\\_\\/\\+1\\/fastbutton|plus\\.google\\.com\\/js\\/client:plusone\\.js)
||google.com/_/+1/fastbutton$bug=1010
||plus.google.com/js/client:plusone.js^$bug=1010

! static\\.ak\\.connect\\.facebook\\.com\\/.*\\.js\\.php
||static.ak.connect.facebook.com/*.js.php^$bug=1028

!\\.1[12]2\\.2o7\\.net
||1*2.2o7.net^$bug=1033

! s(c)?_code[0-9a-zA-Z_-]*(\\.[0-9a-zA-Z_-]*)?\\.js
! $bug=1037

! \\/webtrends(.*)?\\.js
/webtrends.js$bug=1045

! revsci\\.(.*)\\/gw\\.js
revsci.*/gw.js^$bug=1053

! ucoz\\.(.*)\\/(stat|main)\\/
ucoz.*/stat/$bug=1067
ucoz.*/main/$bug=1067

! \\/opentag-(.*)\\.js
/opentag-*.js$bug=1273

! \\.thesearchagency\\.net\\/(.*)\\/tsaapi\\.js
||thesearchagency.net/*/tsaapi.js$bug=1451

! api\\.flattr\\.com\\/(.*)\\/load\\.js
||api.flattr.com/*/load.js$bug=1451

! baynote(-observer)?([0-9]+)\\.js
baynote*.js$bug=1975
baynote-observer*.js$bug=1975

! \\.list-manage[1-9]\\.com\\/track\\/
||list-manage*.com/track/$bug=2382

! (ea|eulerian).*\\/ea\\.js
ea*/ea.js$bug=2468
eulerian*/ea.js$bug=2468

! \\/webtrekk(.*)\\.js
/webtrekk*.js$bug=2567

! \\.2mdn\\.net\\/([0-9]+|ads|dot\\.gif|dynamic|viewad)
||2mdn.net/viewad$bug=2757
||2mdn.net/dynamic$bug=2757
||2mdn.net/dot.gif$bug=2757
||2mdn.net/ads$bug=2757

! \\/mbox(.*)?\\.js
/mbox*.js$bug=2770

! metrics\\..*\\.(com|net|org)\\/b\\/(s|ss)\\/
||metrics.*.com/b/s/$bug=3156
||metrics.*.com/b/ss/$bug=3156

||metrics.*.net/b/s/$bug=3156
||metrics.*.net/b/ss/$bug=3156

||metrics.*.org/b/s/$bug=3156
||metrics.*.org/b/ss/$bug=3156

! s3\\.amazonaws\\.com\\/aascript[\\.\\/a-zA-Z\\-]+\\/abandonaid[\\.\\/a-zA-Z\\-]+\\.js
||s3.amazonaws.com/aascript*/abandonaid*.js$bug=3266

! (ga|xhr)\\.[0-9]+\\.js
! ga.*.js$bug=3300
! xhr.*.js$bug=3300

! ^ox\\-d\\.
||ox-d.$bug=3330

! ^trackuity\\.
||trackuity.$bug=3346

! api\\.pressly\\.com\\/(.*)redirect\\.js
||api.pressly.com/*redirect.js^$bug=3449

! js\\.honeybadger\\.io\\/v[0-9\\.]+\\/honeybadger\\.min\\.js
||js.honeybadger.io/v*/honeybadger.min.js^$bug=3463

! imonomy\\.com\\/script\\/[a-z0-9]+\\/preload\\.js
||imonomy.com/script/*/preload.js^$bug=3478

! \\/mint\\/$
/mint/|$bug=3506

! assets\\.adobedtm\\.com\\/[0-9a-z]+\\/satellitelib-
||assets.adobedtm.com/*/satellitelib-$bug=3533

! core\\.bunchbox\\.co\\/[a-z0-9]+\\.min\\.js
||core.bunchbox.co/*.min.js$bug=3644

! c\\.mouse3k\\.com\\/[a-z0-9]+\\.min\\.js
||c.mouse3k.com/*.min.js$bug=3645

! altabold1\\.com\\/js\\/[a-z0-9]+\\.js
||altabold1.com/js/*.js$bug=3651

! static\\.richrelevance\\.net\\/[a-z0-9]+\\/rr\\.js
||static.richrelevance.net/*/rr.js$bug=3739

! js\\.medi-8\\.net\\/t\\/[a-z0-9]+\\/[a-z0-9]+\\/[a-z0-9]+\\.js
||js.medi-8.net/t/*/*.js$bug=3743

! cdn\\.branch\\.io\\/branch-v[0-9\\.]+\\.min\\.js
||cdn.branch.io/branch-v*.min.js$bug=3749

! wa-na\\.unileversolutions\\.com\\/ct\\/[a-z0-9]+\\/u\\.js
||wa-na.unileversolutions.com/ct/*/u.js$bug=3760

! jwpsrv\\.com\\/library\\/[a-z0-9]+\\.js
||jwpsrv.com/library/*.js$bug=3898

! googleadservices.com\\/pagead\\/conversion\\/[a-z0-9]+\\/
||googleadservices.com/pagead/conversion/$bug=3902

! player\\.hearstdigitalstudios\\.com\\/assets\\/player-[a-z0-9]+\\.js
||player.hearstdigitalstudios.com/assets/player-*.js$bug=3941

! plugin\\.aroad\\.in\\/c\\/[a-z0-9]+\\/
||plugin.aroad.in/c/$bug=3979

! ads.thehiveworks.com/delivery/asyncjs.php
||ads.thehiveworks.com/delivery/asyncjs.php$bug=4013

! cookie-script\\.com\\/s\\/[a-z0-9]+\\.js
||cookie-script.com/s/*.js$bug=4025

! tms\\.truoptik\\.com\\/[a-z0-9]+\\/init\\.js
||tms.truoptik.com/*/init.js$bug=4069

! speedtrap\\.(\\.*)\\.com
||speedtrap.*.com$bug=4075

! cdn\\.yldr\\.io\\/yldr\\.v[0-9\\.]+\\.min\\.js
||cdn.yldr.io/yldr.v*.min.js$bug=4145

! pbbl\\.co\\/r\\/[0-9]\\.js
||pbbl.co/r/*.js$bug=4203

! widgets\\.trustedshops\\.com\\/js\\/[a-z0-9]+\\.js
||widgets.trustedshops.com/js/*.js$bug=4315

! cdn\\.brand-display\\.com\\/tr\\/knx8304\\/[a-z0-9]+\\.js
||cdn.brand-display.com/tr/knx8304/*.js$bug=4320

! nzaza\\.com\\/seg\\/[0-9]+\\.js
||nzaz.com/seg/*.js$bug=4339

! code\\.poptm\\.com\\/[0-9]+\\.js
||code.poptm.com/*.js$bug=4431

! nexus\\.ensighten\\.com\\/[a-z0-9]+\\/bootstrap\\.js
||nexus.ensighten.com/*/bootstrap.js$bug=4474

! pagead2\\.googlesyndication.com\\/pub-config\\/[a-z0-9]+\\/ca-pub-[a-z0-9]+\\.js
||pagead2.googlesyndication.com/pub-config/*/ca-pub-*.js$bug=4482

! assets\\.adobedtm\\.com\\/[0-9a-z]+\\/scripts
||assets.adobedtm.com/*/scripts$bug=4500

! nexus\\.ensighten\\.com.*\\/Bootstrap\\.js
||nexus.ensighten.com.*/Bootstrap.js$bug=4512

! cdn\\.dynamicyield\\.com\\/api\\/[a-z0-9]+\\/api_dynamic\\.js
||cdn.dynamicyield.com/api/*/api_dynamic.js$bug=4561

! noddus.com\\/assets\\/embedded_widget-[a-z0-9]+\\.js
||noddus.com/assets/embedded_widget-*.js$bug=4587

! nexus.ensighten.com\\/[a-z]+\\/prod\\/code\\/[a-z0-9]+\\.js
||nexus.ensighten.com/*/prod/code/*.js$bug=4596

! nexus\\.ensighten\\.com\\/[a-z]+\\/production\\/code\\/[a-z0-9]+\\.js
||nexus.ensighten.com/*/production/code/*.js$bug=4597

! info\\.evidon\\.com\\/assets\\/site[0-9a-z]\\.png
||info.evidon.com/assets/site*.png$bug=4599

! servicer\\.mgid\\.com\\/[0-9]+
||servicer.mgid.com$bug=4600

! nexus\\.ensighten\\.com\\/[a-z]+\\/t-bat-prod\\/code\\/[a-z0-9]+\\.js
||nexus.ensighten.com/*/t-bat-prod/code/*.js$bug=4638

! nexus\\.ensighten\\.com\\/[a-z]+\\/prod\\/serverComponent\\.php
||nexus.ensighten.com/*/prod/serverComponent.php$bug=4639

! nexus\\.ensighten\\.com\\/[a-z]+\\/production\\/serverComponent\\.php
||nexus.ensighten.com/*/production/serverComponent.php$bug=4655

! wa-na.unileversolutions.com/na/dtm/[a-z0-9]+
||wa-na.unileversolutions.com/na/dtm/$bug=4659

! assets\\.adobedtm\\.com\\/[0-9a-z]+\\/s-code-contents-[0-9a-z]+\\.js
||assets.adobedtm.com/*/s-code-contents-*.js$bug=4688

! videonow\\.ru\\/v2\\/[a-z0-9]+\\/vn_module\\.js
||videonow.ru/v2/*/vn_module.js$bug=4690

! sdk\\.streamrail\\.com\\/vpaid\\/js\\/[a-z0-9]+\\/sam\\.js
||sdk.streamrail.com/vpaid/js/*/sam.js$bug=4723

! collector-[a-z0-9]+\\.tvsquared\\.com\\/tv2track\\.js
||collector-*.tvsquared.com/tv2track.js$bug=4742

! a\\.espncdn\\.com\\/redesign\\/[a-z0-9]+\\.[a-z0-9]+\\.[a-z0-9]+\\/js\\/espn-analytics\\.js
||a.espncdn.com/redesign/*/js/espn-analytics.js$bug=4744

! ss\\.beeketing\\.com\\/shop\\/[a-z0-9]+\\.json
||ss.beeketing.com/shop/*.json$bug=4751

! sdk\\.azureedge\\.net\\/js\\/1\\.beeketing\\.[a-z0-9]+\\.js
||sdk.azureedge.net/js/1.beeketing.*.js$bug=4752

! fo-static\\.omnitagjs\\.com\\/fo-static\\/build\\/[a-z0-9]+\\.chunk\\.js
||fo-static.omnitagjs.com/fo-static/build/*.chunk.js$bug=4761

! app\\.backinstock\\.org\\/widget\\/[a-z0-9]+\\.js
||app.backinstock.org/widget/*.js$bug=4786

! static\\.dynamicyield\\.com\\/scripts\\/[a-z0-9]+\\/dy-coll-min\\.js
||static.dynamicyield.com/scripts/*/dy-coll-min.js$bug=4816

! dc8xl0ndzn2cb\\.cloudfront\\.net\\/js\\/[a-z0-9]+\\/v1\\/keywee\\.js
||dc8xl0ndzn2cb.cloudfront.net/js/*/v1/keywee.js$bug=4856

! \\/matomo\\.(js|php)
/matomo.js$bug=4864
/matomo.php$bug=4864

! (ck|cg).yektanet.com
||cg.yektanet.com$bug=4880
||ck.yektanet.com$bug=4880
""".split(
        "\n"
    )


def convert_first_party_exceptions(exceptions):
    for bug_id, patterns in exceptions.items():
        for pattern in patterns:
            pattern = pattern.rstrip("*").strip()
            if "/" in pattern:
                pattern = pattern.split("/", 1)[0]

            yield f"@@$bug={bug_id},domain={pattern}"


def main():
    filters = []
    with open(sys.argv[1], "r") as bugs_file:
        db = json.load(bugs_file)
        patterns = db["patterns"]

        filters.extend(["! Host patterns (from `host` part of bug DB)"])
        filters.extend(convert_host_patterns(patterns["host"]))

        filters.extend(["", "! Host Path patterns (from `host_path` part of bug DB)"])
        filters.extend(convert_host_path_patterns(patterns["host_path"]))

        filters.extend(["", "! Path patterns (from `path` part of bug DB)"])
        filters.extend(convert_path_patterns(patterns["path"]))

        filters.extend(["", "! Regex patterns (from `regex` part of bug DB)"])
        filters.extend(convert_regex_patterns(patterns["regex"]))

        filters.extend(
            ["", "! First Party Exceptions (from `firstPartyException` part of bug DB)"]
        )
        filters.extend(convert_first_party_exceptions(db["firstPartyExceptions"]))

    print("\n".join(filters))


if __name__ == "__main__":
    main()
