const list = String.raw`
[Adblock Plus 2.0]
! Checksum: 25Q1CoQsDWVdOu09X4Cubg
! Version: 201711280910
! Title: Adblock Warning Removal List
! Last modified: 28 Nov 2017 09:10 UTC
! Expires: 1 days (update frequency)
! Homepage: https://easylist.to/
!
! Please report any unblocked obtrusive anti adblock messages or problems
! in the forums (https://forums.lanik.us/) or via e-mail (easylist.subscription+anti@gmail.com).
! Please check our guidelines before reporting: https://easylist.to/2013/05/10/anti-adblock-guide-for-site-admins
!
! *** antiadblockfilters:antiadblockfilters/antiadblock_arabic.txt ***
!
/deadblocker/*
/mod_ablockdetector/*
!
###adblock_screen
###adblock_message
##.adblock_floating_message
##.adblock_msg
##.deadblocker-header-bar
!
4algeria.com###exposeMask
4algeria.com##.xenOverlay
!
! *** antiadblockfilters:antiadblockfilters/antiadblock_chinese.txt ***
! *** antiadblockfilters:antiadblockfilters/antiadblock_czech.txt ***
! *** antiadblockfilters:antiadblockfilters/antiadblock_dutch.txt ***
bouweenpc.nl###header-banner
rtlxl.nl##.adblock
spele.nl##.adblocker
koolhydraatarmerecepten.info##body > [style^="z-index: 1000000; "]
! *** antiadblockfilters:antiadblockfilters/antiadblock_english.txt ***
flightradar24.com###bottomRightPanel
videofun.me###flowplayer > div[class][style]:first-child
yocast.tv###ra9e
flightradar24.com###responsiveBottomPanel
myanimelist.net##._unit
##.ad-blocker-warning
biggestplayer.me##.adblock + *
hearthhead.com,wowhead.com##.block-bg
wowhead.com##.block-bgimg
euroiphone.eu##.div-download-h
euroiphone.eu##.div-download-v
findretros.com##.fuck-adblock
technologypep.com##.main-container-wrap > div[class$="-bg"]
technologypep.com##.main-container-wrap > div[id][class][style*="opacity"]
biggestplayer.me##.masr
videobug.net,videofun.me,vidzur.com##.randid
toolslib.net##.row > .col-md-7 > .panel-default
hearthhead.com,thottbot.com,wowhead.com##.sidebar-bg
biggestplayer.me##.soret
spanishdict.com##.whitelist
/adblock-alerter/js/adblock_alerter.js
/adblock-img.
play44.net,videobug.net,videofun.me,vidzur.com,yucache.net##[style^="position: absolute; width: 100%;"]
strikeout.co,vipbox.sx,vipleague.co,vipleague.is##div[style="display: block;"]
nexusmods.com##div[style="float: left; width: 728px; height: 90px; background: #313131;"]
playonlinux.com##div[style="text-align:center;  border-radius:7px; width:160px;  border:1px solid #666666;  margin-left:5px;padding-right:5px;color:#FFF;  background-color:#666;font-family:Maven Pro,century gothic, arial, helvetica, sans serif;padding-top:94px;  height:600px;  padding-left:5px; font-size:18px; "]
byzoo.org,videobug.net##div[style^="position: absolute; width: 300px;"]
homerun.re,strikeout.co,vipbox.sx,vipleague.ch,vipleague.co,vipleague.is,vipleague.me##span[id][style] > div[id]:first-child:last-child
||amazonaws.com^*/abb-msg.js$domain=hardocp.com
||corrosif.science^$domain=filerev.cc|pencurimovie.pw
||rockradio.com^*/blockadblock-$script,domain=rockradio.com
||www.google.*/ajax/pi/phd?abd=0$xmlhttprequest
! NSFW
redtube.com###as_131
redtube.com###slidePanelContainerAB
redtube.com##.qb
shadbase.com##img[alt="adblock"]
! *** antiadblockfilters:antiadblockfilters/antiadblock_finnish.txt ***
! *** antiadblockfilters:antiadblockfilters/antiadblock_french.txt ***
!
/ad-blocking-advisor/*
/adblock-notice-
/adblock-notify-by-bweb/*
/adblock-warning-teaser/*
/adblock_gate/images/animated.gif?
/adblock_notify.js
/adblocker_message_
/AdblockMessage.
/antiadblockmsg.
/simple-adblock-notice/*
/wp-content/plugins/ad-block-defender/*
/wp-content/plugins/deadblocker/*
/wp-content/uploads/an-temp/*$script,stylesheet
!
||bdgest.com/js/site.js?
||cmath.fr/images/fond2.gif
||cmath.fr/images/fondsticky.gif
||ed-protect.org/cdn-cgi/apps/head/
||nikopik.com/wp-content/themes/*/js/nikopik.js
||nordpresse.be/wp-content/uploads/$script
||nrj.fr/nrj?Page=/rg.fake&
||skyrock.net/img/*/adblock/
!
@@/advertisement.js$script,~third-party,domain=fun-animes.fr
@@/noadblock-nice-message/assets/js/ads.js?$script,~third-party
!
@@||ausujet.com/skins/common/ads.js
@@||cyberdean.fr/js/advertisement.js
@@||dbz-fantasy.com/ads.css
@@||dev-dyod.fr/styles/ads.css
@@||forums.macg.co/js/audentio/funbox/advertisement.js
@@||france.carbu.com/templates/media/js/ads.js$script
@@||frandroid.com/ads.js
@@||free-reseau.fr/css/publicite.css|$stylesheet
@@||fusacq.com/javascript/advertising.js|$script
@@||gameblog.fr/scripts/adframe.js
@@||grattable.com/blogads.css
@@||hdnumerique.com/tpl/jscript/advert.js
@@||impactmangas.fr/ads.js|$script,~third-party
@@||item-voyage.fr/ads.css
@@||jeux-geographiques.com/js/adblock_detector.js
@@||jeuxvideo-live.com/js/ads.js
@@||ktu.sv2.biz/sv3/advertisement.js
@@||larvf.com/js/ads.js
@@||macg.co/js/audentio/funbox/advertisement.js
@@||manga-news.com/js/advert.js$script
@@||numerama.com/ads.js
@@||pagerank.fr/js*/advert.js?$script
@@||penducado.com/styles/ads.css
@@||presse-algerie.net/js/ads.js$script
@@||primfx.com/js/ads.js|$script,~third-party
@@||ps3-infos.fr/adsense/openads/ads/ads.js
@@||ptitchef.com/js/ads.js
@@||static.koreus.com/js/advert.js
@@||trackr.fr/sites/all/themes/contrib/touch/js/miroirs/adwordstracking.js
@@||universfreebox.com/js/advertisement.js
@@||uplea.com/js/advertisement.js
@@||wamiz.com/css/ads.css
@@||zagaz.com/img/blogads.css
!
###AdBlockDialog
###abp-killer
###adBlockAlert
###adBlockAlertWrap
###adBlockDetect
###adBlockerModal
###adb-actived
###adb-enabled
###adb-enabled3
###adb-warning
###adblock-alert
###adblock-box
###adblock-modal
###adblock-msg
###adblock-overlay
###adblockDetect
###adblock_detected
###adblocker_announce
###adblocker_message
###adblocker_modal_overlay
###advertisementjsalert
###anti_adblock
###fnAdblockingOverlay
###message_adblock
##.AdblockMessage
##.AdblockMessage_msg
##.ad-block-enabled
##.ad-block-message
##.ad-blocked
##.ad-blocker-warning
##.ad-blocking-advisor-wrapper
##.adBlockDetectedSign
##.adBlockNotification
##.adBlockNotificationOverlay
##.adBlockWarning
##.adb-enabled
##.adbd-background
##.adbd-message
##.adbd-wrapper
##.adblock-modal
##.adblock-modal-content
##.adblock-notification-wrapper
##.adblock-warning-teaser
##.adblockOverlay
##.adblock_detector
##.adblock_enabled
##.adblock_floating_message
##.adblocker-message
##.adblocker-wrap
##.counterAdblocks
##.deadblocker-header-bar
##.deadblocker-header-bar-inner
##.dispositifAdblock
##.dispositifAdblockContent
##.dispositifAdblockMessageBox
##.js-checkad-warning
##.kill-adblock-container
##.noadblock
##.top-bar-adblock
##[class][data-sitename][data-header-version] > div[id^="detection-block"]
!
streamwatching.fr###adblockplus
jaitoutcompris.com###antiBlock
vide-greniers.org###content > #pageContectFull > [id][style^="background-color:"]
venez.fr###dv_warn_block
iphonesoft.fr,iphonetweak.fr###msgNoPub
retinaboys.com###screen_block
doodle.com##.doodlead
fan-de-cinema.com##.fancybox-overlay
clkme.me,clkmein.com,cllkme.com,corneey.com,destyy.com,festyy.com,gestyy.com,jigbig.tk,newsfortrump.ga,sh.st,shorte.st,skiip.me,skipp.io,viid.me,wiid.me##.information-container
etr.fr##.no_block
radiox.com##.notifyjs-corner
vide-greniers.org##[href="/explications-publicite"]
tunnl.com##[id^="blockedAddons"]
papergeek.fr##[id^="padb_widget_"]
forumdz.com##body .breadcrumb + center > [color="red"] > b
forum.pcastuces.com##div > [src] + [id] + [class][style^="display: block;"]
prixdubaril.com##div > div[class^="sweet-"][style]
phonandroid.com##div[class][style*="none repeat scroll 0% 0%;"]
bd-sanctuary.com,cine-sanctuary.com,comics-sanctuary.com,manga-sanctuary.com##div[style^="background:#444;"]
!
#@##adblocktest
!
dbz-fantasy.com#@##adTeaser
dz-android.com,freeiphone.fr,hommedumatch.fr,jetetroll.com,testious.com#@##adsense
debrideurstream.fr#@##pubdirecte
ot-boutique.fr#@##publicite
iwin.com#@##sponsorText
fairytailmx.com#@##sponsored-ad
forum.virtualdjing.com#@#.adFrame
abcbourse.com#@#.adsbox
dealerdunet.fr#@#.text_ads
comptoir-info.com#@#.textad
!
! *** antiadblockfilters:antiadblockfilters/antiadblock_german.txt ***
##.diysdk_webServices_banners1und1MainContent
usgang.ch###rectangle-wrapper
||jappy.tv/i/wrbng/abb.png
! *** antiadblockfilters:antiadblockfilters/antiadblock_hebrew.txt ***
! *** antiadblockfilters:antiadblockfilters/antiadblock_indonesian.txt ***
! *** antiadblockfilters:antiadblockfilters/antiadblock_italian.txt ***
! *** antiadblockfilters:antiadblockfilters/antiadblock_latvian.txt ***
! *** antiadblockfilters:antiadblockfilters/antiadblock_romanian.txt ***
! *** antiadblockfilters:antiadblockfilters/antiadblock_russian.txt ***
d3.ru##section[data-uid="ad"]
d3.ru##section[data-uid="extraAd"]
d3.ru##.b-promo__placeholder
mycrib.ru,piggy-bank.online##[data-type="anti-abp"]
fightnews.info##body > blockquote
newdeaf-online.net,newsland.com,logist.uxxo.ru##body > div[id]:not([class])[style="display: block;"]
psjailbreak.ru##div[id^="advertur_"] + div[id][style^="width"]
glav.su##body > div[id]:not([class])[style*="background"][style*="display: block"]
sd-company.su###dom_adblock
webdesign-master.ru###adbd
vesti-ukr.com###adblockpopup
mindspace.ru###adblock_screen
happy-hack.ru###admitad-cookie-check-popup
wotactions.com###ads_warning
firebit.net###adv-300 + div[class][align="center"][style^="background-color"]
cxem.net###antiAdBlock
elhow.ru###b-info-wrapper
ma.by###bodysubcont > div[style^="padding"]:not([id]):not([class])
delfi.ee###delfiTopBar
info-mage.ru###helpme[style="display: block;"]
kissvk.com###madBlockModal,.modal-backdrop
gisclub.tv,teremok.org.ua,webos-forums.ru###mdl_adb
ostroh.info###modal.modal-bg
all-episodes.net###odin
kompravda.eu,kp.ru###popapIsBlockedAd
pb.wtf,piratbit.org,piratbit.ru###result > .request
mnogoto4ka.ru###sb-site > div[class][style*="z-index"][style*="999999"]
professorweb.ru###submain > div[class^="a"][style]
kaermorhen.ru###top-ban-container
numberempire.com###toplink > h3[style="color: red"]
ganoderma-mushrooms.com,korrektor.name,varicream.org###turn_advert.adblock
czx.to###vdl_ctnr
eurabota.com##.abtop
sprashivalka.com##.ad
cc-fan.ru,cc-fan.tv,cn-fan.ru,fox-fan.ru,goodfon.ru,satsis.info,swordmaster.org##.adb
hentaiz.org##.adblocker
vsadu.ru##.adb-block
tuchkatv.ru##.adb_m
hentaiz.org,life.ru,mastergrad.com,forum.qrz.ru##.adblock
exler.ru##.adblock-pls
zakon.kz##.adblock_alert
nulled.cc##.adblock_floating_message
kubik3.ru##.adbs
print-post.com##.addbl
24video.xxx##.adt
benfilm.net##.alert-block
ria.ru##.antiblock
rufilmtv.org##.attention
ixbt.com##.b-blockadblock
cs-amba.ru##.banka
electric-house.ru##.blok_forum > div[style]
audio-hi-fi.ru,electro-sila.ru##.blok_new > div[style]
kinoafisha.info,tvcook.ru##.cat
autonews.ru,rbc.ru##.checkad_info
rusopen.com##.classblsi.addshr
www.qrz.ru##.content_row > div[class][-abp-properties="background*z-index"]:not([style])
smotrisport.online,smotrisport.tv##.dont-add-our-site-pls
go.mail.ru##.js-adb-msg
rbcplus.ru##.js-checkad-warning
space.utema.ru##.main-content-padding > div[class]:not([itemprop])
megatest.online##.msg-AdBlock
ykt.ru##.n-banner--adblocked
animeland.su,itcats.ru,noadsradio.ru,sharkgame.ru,w10.jeanzzz.ru##.no-adb
delfi.lv##.notification-widget
radio.yandex.by,radio.yandex.kz,radio.yandex.ru,radio.yandex.ua##.page-root .notify
radio.yandex.by,radio.yandex.kz,radio.yandex.ru,radio.yandex.ua##.page-root .notify *
music.yandex.by,music.yandex.kz,music.yandex.ru,music.yandex.ua##.page-root > .notify
music.yandex.by,music.yandex.kz,music.yandex.ru,music.yandex.ua##.page-root > .notify *
darkteam.net##.pls_rmv
pythonworld.ru##.pythonworld-contributor
fanfics.me##.red.nodata
playunturned.ru##.side_left > center
playunturned.ru##.side_right > center
101.ru##.showMessageAdBlock
objavlenija.respublika.cz##.sweet-alert,.sweet-overlay
hs-manacost.ru##.td-a-rec
/api/scripts/mainjs?token$script,domain=liveresult.ru
/forum/docs/requests.js$script,domain=nnm-club.lib|nnm-club.name|nnm-club.tv|nnmclub.to
/fuckadblock.js$domain=ace-stream.tv
@@||sports.ru^*/adfox.$xmlhttprequest
pic4you.ru,pic5you.ru##body > #bb
forum.vip-cxema.org##body > #document_modal.modal,#some_ad_block_key_popup
it-enginer.ru##body > #modal[style*="blur"]
swaego.ru##body > .special-message-wrapper
ukr.net##body > .yellow-die
factorio.su##body > div[class][style*="background"][style*="display: block"]
gdekluet.ru##body > div[class^="stop-block"]
factorio.su##body > div[id][class][style*="background"][style*="visible"]
tut.by##body > div[style*="position: fixed;"][style*="right: 0;"]
bychico.net,dyrik.ru,ecosounds.net,fainaidea.com,in-drive.ru,obozrevatel.com,oknotivi.ru,sandero.ru,tehnobzor.ru##body > div[style*="z-index"][style*="999999"]
dugtor.ru##body > noindex
gismeteo.by,gismeteo.ru##div[class^="stopblock"]
sport.rbc.ru##div[data-name="adb_warn_sport"]
eset-key.ru,politonline.ru,showmehow.ru##div[data-type="anti-abp"]
lostfilm.tv##div[class^="alarm"]
pvcalc.ru##div[style^="position:fixed; top:0px; left:0px; opacity: 0.9;"]
acomics.ru##div[style*="/design/common/pic/please"]
ph4.ru##div[style^="width: 728px; height: 90px;"]
ph4.ru##table[width][height="90"][style]
bigpuzzle.ru##td[valign="top"][width="200px"][height="600"] > div[style]
||adscat.ru^$third-party
||animeteatr.ru/a-detector/
||avito.ru^*/some-pretty-script.js
||fairtop.in/template/js/fdetect.js
||i140.ru/js/etxm*.js|$script
||ipprof.ru/wp-content/plugins/ad-blocking-advisor/
||kontrolnaya-rabota.ru^*/fuckadblock.js$script
||kontrolnaya-rabota.ru^*/toastr.$script,stylesheet
||mhelp.kz/wp-content/plugins/wp-adblock-dedect/
||pwnews.net/des/antiblock.js$script
||rusnext.ru/advar.js$script
||sdamgia.ru/img/blockadblock_
||shellcat.ru^$third-party
! *** antiadblockfilters:antiadblockfilters/antiadblock_slovak.txt ***
! *** antiadblockfilters:antiadblockfilters/antiadblock_spanish.txt ***`;

export default list;
