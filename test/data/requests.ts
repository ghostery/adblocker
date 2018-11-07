export default [
  {
    "filters": [
      "||google-analytics.com^",
      "||google-analytics.com/analytics.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://www.google-analytics.com/analytics.js"
  },
  {
    "filters": [
      "||fastly-insights.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://www.fastly-insights.com"
  },
  {
    "check": true,
    "filters": [
      "@@||google.com/recaptcha/$script",
      "@@||google.com/recaptcha/$image,script"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://www.google.com/recaptcha/"
  },
  {
    "filters": [
      "||googleadservices.com^",
      "||googleadservices.com^$third-party",
      "/pagead/conversion."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.googleadservices.com/pagead/conversion.js"
  },
  {
    "filters": [
      "||googletagmanager.com/gtm.js?$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.googletagmanager.com/gtm.js?"
  },
  {
    "filters": [
      "/generate_204$image"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://clients1.google.com/generate_204"
  },
  {
    "check": true,
    "filters": [
      "|https://$image,media,script,third-party,domain=~feedback.pornhub.com|pornhub.com|redtube.com|redtube.com.br|tube8.com|tube8.es|tube8.fr|youporn.com|youporngay.com",
      "@@||phncdn.com/www-static/js/lib/$script"
    ],
    "sourceUrl": "https://www.pornhub.com",
    "type": "script",
    "url": "https://ci.phncdn.com/www-static/js/lib/"
  },
  {
    "check": true,
    "filters": [
      "/atatus.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ci.phncdn.com/www-static/js/vmobile/atatus.js"
  },
  {
    "filters": [
      "@@||phncdn.com^$image,media,object,stylesheet,domain=gaytube.com|pornhub.com|redtube.com|redtube.it|tube8.com|tube8.es|tube8.fr|xtube.com|youjizz.com|youporn.com|youporngay.com"
    ],
    "sourceUrl": "https://www.pornhub.com",
    "type": "stylesheet",
    "url": "https://ci.phncdn.com"
  },
  {
    "check": true,
    "filters": [
      "@@||phncdn.com/mg_utils-$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn1d-static-shared.phncdn.com/mg_utils-1.0.0.js"
  },
  {
    "check": true,
    "filters": [
      "@@||phncdn.com/www-static/js/mg_modal-$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ci.phncdn.com/www-static/js/mg_modal-1.0.0.js"
  },
  {
    "check": true,
    "filters": [
      "@@||phncdn.com/www-static/js/vmobile/utils.js$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ci.phncdn.com/www-static/js/vmobile/utils.js"
  },
  {
    "check": true,
    "filters": [
      "@@||phncdn.com/www-static/js/vmobile/html5-canvas.js$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ci.phncdn.com/www-static/js/vmobile/html5-canvas.js"
  },
  {
    "check": true,
    "filters": [
      "|https://$image,xmlhttprequest,domain=pornhub.com|redtube.com|redtube.com.br|tube8.com|tube8.es|tube8.fr|youporn.com|youporngay.com",
      "@@||phncdn.com^$image,object-subrequest,other,domain=pornhub.com|redtube.com|redtube.com.br|tube8.com|tube8.es|tube8.fr|youporn.com|youporngay.com"
    ],
    "sourceUrl": "https://www.pornhub.com",
    "type": "image",
    "url": "https://ci.phncdn.com"
  },
  {
    "filters": [
      "||vntsm.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://hb.vntsm.com"
  },
  {
    "filters": [
      "@@||gstatic.com/recaptcha/$image,script"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://www.gstatic.com/recaptcha/"
  },
  {
    "check": true,
    "filters": [
      "/googleads.$domain=~googleads.media|~googleads.blog",
      "/googleads.",
      "||doubleclick.net^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://googleads.g.doubleclick.net"
  },
  {
    "filters": [
      "||microsoft.com/_log?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://uhf.microsoft.com/_log?"
  },
  {
    "filters": [
      "||google.com/pagead/"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://www.google.com/pagead/"
  },
  {
    "filters": [
      "||bing.com/fd/ls/$~ping"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.bing.com/fd/ls/"
  },
  {
    "check": true,
    "filters": [
      "||trafficjunky.net^$third-party,important",
      "||trafficjunky.net^$third-party",
      "||trafficjunky.net^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://media.trafficjunky.net"
  },
  {
    "filters": [
      "@@||fbcdn.net/rsrc.php/"
    ],
    "sourceUrl": "https://",
    "type": "stylesheet",
    "url": "https://static.xx.fbcdn.net/rsrc.php/"
  },
  {
    "filters": [
      "||quantserve.com^",
      "||quantserve.com^$~object-subrequest,third-party",
      "/quant.js",
      "||quantserve.com^$third-party,script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://secure.quantserve.com/quant.js"
  },
  {
    "filters": [
      "||connect.facebook.net^*/fbevents.js$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://connect.facebook.net/en_US/fbevents.js"
  },
  {
    "filters": [
      "||scorecardresearch.com^",
      "||scorecardresearch.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://sb.scorecardresearch.com"
  },
  {
    "check": true,
    "filters": [
      "||doubleclick.net^$third-party,domain=3news.co.nz|92q.com|abc-7.com|addictinggames.com|allbusiness.com|bizjournals.com|bloomberg.com|bnn.ca|boom92houston.com|boom945.com|boomphilly.com|break.com|cbc.ca|cbs19.tv|cbs3springfield.com|cbslocal.com|complex.com|dailymail.co.uk|darkhorizons.com|doubleviking.com|euronews.com|extratv.com|fandango.com|fox19.com|fox5vegas.com|gorillanation.com|hawaiinewsnow.com|hellobeautiful.com|hiphopnc.com|hot1041stl.com|hothiphopdetroit.com|hotspotatl.com|hulu.com|imdb.com|indiatimes.com|indyhiphop.com|ipowerrichmond.com|joblo.com|kcra.com|kctv5.com|ketv.com|koat.com|koco.com|kolotv.com|kpho.com|kptv.com|ksat.com|ksbw.com|ksfy.com|ksl.com|kypost.com|kysdc.com|live5news.com|livestation.com|livestream.com|metro.us|metronews.ca|miamiherald.com|my9nj.com|myboom1029.com|mycolumbuspower.com|nbcrightnow.com|neatorama.com|necn.com|neopets.com|news.com.au|news4jax.com|newsone.com|nintendoeverything.com|oldschoolcincy.com|pagesuite-professional.co.uk|pandora.com|play.it|player.theplatform.com|radio.com|radionowindy.com|rottentomatoes.com|sbsun.com|shacknews.com|sk-gaming.com|ted.com|thebeatdfw.com|theboxhouston.com|theglobeandmail.com|timesnow.tv|tv2.no|ustream.tv|wapt.com|washingtonpost.com|wate.com|wbaltv.com|wcvb.com|wdrb.com|wdsu.com|wflx.com|wfmz.com|wfsb.com|wgal.com|whdh.com|wired.com|wisn.com|wiznation.com|wlky.com|wlns.com|wlwt.com|wmur.com|wnem.com|wowt.com|wral.com|wsj.com|wsmv.com|wsvn.com|wtae.com|wthr.com|wxii12.com|wyff4.com|yahoo.com|youtube-nocookie.com|youtube.com|zhiphopcleveland.com"
    ],
    "sourceUrl": "https://m.youtube.com",
    "type": "xhr",
    "url": "https://googleads.g.doubleclick.net"
  },
  {
    "filters": [
      "/r/collect?",
      "||google-analytics.com/r/collect^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.google-analytics.com/r/collect?"
  },
  {
    "filters": [
      "||quantcount.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://rules.quantcount.com"
  },
  {
    "filters": [
      "||connect.facebook.net/signals/$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://connect.facebook.net/signals/"
  },
  {
    "filters": [
      "/ads/iframe"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://www.pornhub.com/ads/iframe-mobile-3.0.0.html"
  },
  {
    "filters": [
      "/ad_data_"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://m.youtube.com/ad_data_204"
  },
  {
    "filters": [
      "/js/analytics."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://platform.linkedin.com/js/analytics.js"
  },
  {
    "filters": [
      "||moatads.com^$third-party",
      "||moatads.com^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://z.moatads.com"
  },
  {
    "filters": [
      "||rs.mail.ru^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://rs.mail.ru"
  },
  {
    "filters": [
      "||tns-counter.ru^",
      "||tns-counter.ru^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.tns-counter.ru"
  },
  {
    "check": true,
    "filters": [
      "||counter.yadro.ru^",
      "||yadro.ru^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://counter.yadro.ru"
  },
  {
    "filters": [
      "||mail.ru/k?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://r3.mail.ru/k?"
  },
  {
    "filters": [
      "/adservice.$domain=~adservice.io"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://adservice.google.de"
  },
  {
    "filters": [
      "/securepubads.",
      "/pubads_"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://securepubads.g.doubleclick.net/gpt/pubads_impl_266.js"
  },
  {
    "filters": [
      "||facebook.com/tr$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.facebook.com/tr"
  },
  {
    "filters": [
      "||trafficfactory.biz^$third-party",
      "||trafficfactory.biz^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://rpc-php.trafficfactory.biz"
  },
  {
    "filters": [
      "||top-fwz1.mail.ru^",
      "||mail.ru/counter?",
      "/counter?id="
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://top-fwz1.mail.ru/counter?id=2579437;pid=0;r="
  },
  {
    "filters": [
      "@@||upload.wikimedia.org/wikipedia/"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://upload.wikimedia.org/wikipedia/"
  },
  {
    "filters": [
      "/px.js?ch=$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://platform.linkedin.com/js/px.js?ch=1"
  },
  {
    "check": true,
    "filters": [
      "@@||phncdn.com/jquery-$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn1d-static-shared.phncdn.com/jquery-2.0.3.js"
  },
  {
    "filters": [
      "://ads.$domain=~ads.ac.uk|~ads.adstream.com.ro|~ads.am|~ads.colombiaonline.com|~ads.comeon.com|~ads.elcarado.com|~ads.google.com|~ads.harvard.edu|~ads.lapalingo.com|~ads.lordlucky.com|~ads.mobilebet.com|~ads.msstate.edu|~ads.nc|~ads.nimses.com|~ads.quasaraffiliates.com|~ads.red|~ads.route.cc|~ads.sk|~ads.socialtheater.com|~ads.toplayaffiliates.com|~ads.viksaffiliates.com|~ads.watson.ch|~ads.xtribeapp.com|~badassembly.com|~caravansforsale.co.uk|~fusac.fr|~memo2.nl|~reempresa.org|~seriouswheels.com"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "https://ads.google.com"
  },
  {
    "check": true,
    "filters": [
      "||doubleclick.net^$image,third-party",
      "||stats.g.doubleclick.net^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://stats.g.doubleclick.net"
  },
  {
    "filters": [
      "||xhcdn.com^*/xpops."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static-cl.xhcdn.com/js/mobile/xpops.js"
  },
  {
    "filters": [
      "||tsyndicate.com^$third-party",
      "||tsyndicate.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.tsyndicate.com"
  },
  {
    "filters": [
      ".jp/ads/",
      "/ads/images/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.google.co.jp/ads/images/"
  },
  {
    "filters": [
      "/ads/js/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.google.com/ads/js/"
  },
  {
    "filters": [
      "||google.*/client_204?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.google.com.mx/client_204?"
  },
  {
    "filters": [
      ".com/ads/$image,object,subdocument"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      ".de/ads/$~xmlhttprequest"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.google.de/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "script",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "||rover.ebay.$image,object,script"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://rover.ebay.com"
  },
  {
    "check": true,
    "filters": [
      "@@||phncdn.com/jquery/$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn1d-static-shared.phncdn.com/jquery/"
  },
  {
    "check": true,
    "filters": [
      "@@||phncdn.com/www-static/js/vmobile/head.js$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ci.phncdn.com/www-static/js/vmobile/head.js"
  },
  {
    "check": true,
    "filters": [
      "@@||phncdn.com/www-static/js/vtablet/$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ci.phncdn.com/www-static/js/vtablet/"
  },
  {
    "check": true,
    "filters": [
      "@@||phncdn.com/www-static/js/vmobile/autocomplete-$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ci.phncdn.com/www-static/js/vmobile/autocomplete-search.js"
  },
  {
    "check": true,
    "filters": [
      "@@||phncdn.com/www-static/js/vmobile/phub.js$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ci.phncdn.com/www-static/js/vmobile/phub.js"
  },
  {
    "check": true,
    "filters": [
      "/popunder-"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ci.phncdn.com/www-static/js/vmobile/popunder-build.js"
  },
  {
    "check": true,
    "filters": [
      "@@||phncdn.com/www-static/js/vmobile/footer.js$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ci.phncdn.com/www-static/js/vmobile/footer.js"
  },
  {
    "check": true,
    "filters": [
      "@@||phncdn.com/www-static/js/promo-banner.js$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ci.phncdn.com/www-static/js/promo-banner.js"
  },
  {
    "check": true,
    "filters": [
      "||contentabc.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn11.contentabc.com"
  },
  {
    "filters": [
      "||microsoft.com/collect/"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://web.vortex.data.microsoft.com/collect/"
  },
  {
    "filters": [
      "||ad.mail.ru^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ad.mail.ru"
  },
  {
    "check": true,
    "filters": [
      "||google-analytics.com/collect"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.google-analytics.com/collect"
  },
  {
    "check": true,
    "filters": [
      ".net/ads_"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://ads.trafficjunky.net/ads_batch"
  },
  {
    "filters": [
      "||youtube.com/*_204?$~xmlhttprequest"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://m.youtube.com/csi_204?"
  },
  {
    "filters": [
      "||analytics.163.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://analytics.163.com"
  },
  {
    "filters": [
      "||amazon.*/uedata/"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.amazon.com/uedata/"
  },
  {
    "filters": [
      "/showads."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://m.media-amazon.com/images/G/01/csm/showads.v2.js"
  },
  {
    "filters": [
      "||mc.yandex.ru^",
      "||yandex.ru/metrika/"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://mc.yandex.ru/metrika/"
  },
  {
    "filters": [
      "||btrace.qq.com^",
      "||qq.com/kvcollect?"
    ],
    "sourceUrl": "https://",
    "type": "other",
    "url": "https://btrace.qq.com/kvcollect?"
  },
  {
    "filters": [
      "||qq.com/collect?"
    ],
    "sourceUrl": "https://xw.qq.com",
    "type": "image",
    "url": "https://trace.qq.com/collect?"
  },
  {
    "filters": [
      "/pingd?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://pingfore.qq.com/pingd?"
  },
  {
    "filters": [
      "||app.link^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://app.link"
  },
  {
    "filters": [
      "||events.redditmedia.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://events.redditmedia.com"
  },
  {
    "filters": [
      "||netflix.com/ichnaea/log"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://www.netflix.com/ichnaea/log"
  },
  {
    "filters": [
      ".in/ads/",
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.co.in",
    "type": "image",
    "url": "https://www.google.co.in/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.co.in",
    "type": "image",
    "url": "https://www.google.co.in/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.co.in",
    "type": "image",
    "url": "https://www.google.co.in/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.co.in",
    "type": "image",
    "url": "https://www.google.co.in/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.co.in",
    "type": "image",
    "url": "https://www.google.co.in/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.co.in",
    "type": "image",
    "url": "https://www.google.co.in/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.co.in",
    "type": "image",
    "url": "https://www.google.co.in/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.co.in",
    "type": "image",
    "url": "https://www.google.co.in/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.co.in",
    "type": "image",
    "url": "https://www.google.co.in/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.co.in",
    "type": "image",
    "url": "https://www.google.co.in/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.co.in",
    "type": "image",
    "url": "https://www.google.co.in/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.co.in",
    "type": "image",
    "url": "https://www.google.co.in/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.co.in",
    "type": "image",
    "url": "https://www.google.co.in/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.co.in",
    "type": "image",
    "url": "https://www.google.co.in/ads/"
  },
  {
    "filters": [
      "/log-reporter."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s1.hdslb.com/bfs/seed/jinkela/short/report/log-reporter.js"
  },
  {
    "filters": [
      "/log/report/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s1.hdslb.com/bfs/seed/log/report/"
  },
  {
    "filters": [
      "||amplitude.com^",
      "||amplitude.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://api.amplitude.com"
  },
  {
    "filters": [
      "||imgur.com/lumbar.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://p.imgur.com/lumbar.gif?"
  },
  {
    "filters": [
      "||branch.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.branch.io"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.co.in",
    "type": "image",
    "url": "https://www.google.co.in/ads/"
  },
  {
    "check": true,
    "filters": [
      "@@||api.branch.io^*/open$xmlhttprequest"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://api.branch.io/v1/open"
  },
  {
    "filters": [
      "||redditmedia.com/gtm/jail?"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://www.redditmedia.com/gtm/jail?"
  },
  {
    "filters": [
      "||amazon-adsystem.com^$third-party",
      "||amazon-adsystem.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://c.amazon-adsystem.com"
  },
  {
    "filters": [
      "||wl.jd.com^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://wl.jd.com"
  },
  {
    "filters": [
      "/delstats/*",
      "/imp/rtm?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://svcs.ebay.com/delstats/imp/rtm?"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "/ht.js?site_"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://hubt.pornhub.com/js/ht.js?site_id=3"
  },
  {
    "check": true,
    "filters": [
      "|http://$image,script,third-party,domain=pornhub.com|redtube.com|redtube.com.br|tube8.com|tube8.es|tube8.fr|youporn.com|youporngay.com",
      "|http://$image,xmlhttprequest,domain=pornhub.com|redtube.com|redtube.com.br|tube8.com|tube8.es|tube8.fr|youporn.com|youporngay.com",
      "|http://$image,media,script,third-party,domain=~feedback.pornhub.com|pornhub.com|redtube.com|redtube.com.br|tube8.com|tube8.es|tube8.fr|youporn.com|youporngay.com"
    ],
    "sourceUrl": "https://www.pornhub.com",
    "type": "image",
    "url": "http://"
  },
  {
    "check": true,
    "filters": [
      "@@||phncdn.com/vortex-simple-*.js|$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn1d-static-shared.phncdn.com/vortex-simple-1.0.0.js"
  },
  {
    "check": true,
    "filters": [
      "||yandex.*/clck/$~ping"
    ],
    "sourceUrl": "https://",
    "type": "other",
    "url": "https://yandex.ru/clck/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "script",
    "url": "https://www.google.com/ads/"
  },
  {
    "check": true,
    "filters": [
      "||pubmatic.com^$third-party",
      "||pubmatic.com^",
      "/adserver/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ads.pubmatic.com/AdServer/"
  },
  {
    "filters": [
      "||beacon.wikia-services.com^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://beacon.wikia-services.com"
  },
  {
    "filters": [
      "@@||wikia.nocookie.net^*/images/$image"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://static.wikia.nocookie.net/qube-assets/f2/3430/images/"
  },
  {
    "check": true,
    "filters": [
      "||ib.adnxs.com^",
      "||adnxs.com^$third-party",
      "||adnxs.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://ib.adnxs.com"
  },
  {
    "check": true,
    "filters": [
      "||bidder.criteo.com^$third-party",
      "||criteo.com^",
      "||criteo.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://bidder.criteo.com"
  },
  {
    "filters": [
      "||contextweb.com^$third-party",
      "||contextweb.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://bid.contextweb.com"
  },
  {
    "filters": [
      "||districtm.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://dmx.districtm.io"
  },
  {
    "check": true,
    "filters": [
      "||google.com/log?"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://play.google.com/log?"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||googletagmanager.com/gtm.js?$domain=adsoup.com|airasia.com|asus.com|bhaskar.com|broadcom.com|computerworlduk.com|desigual.com|drumstick.com|ebuyer.com|elevationscu.com|gamepix.com|git-tower.com|google.com|itv.com|jobs.net|keygames.com|magicjack.com|moviefone.com|nestio.com|newsy.com|optus.com.au|rebtel.com|rockstargames.com|rollingstone.com|rozetka.com.ua|sixflags.com|support.amd.com|talktalk.co.uk|techradar.com|toto.co.jp|usmagazine.com"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "script",
    "url": "https://www.googletagmanager.com/gtm.js?"
  },
  {
    "filters": [
      "/conversion_async.",
      "/pagead/conversion_"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.googleadservices.com/pagead/conversion_async.js"
  },
  {
    "filters": [
      "/o.svg?"
    ],
    "sourceUrl": "http://",
    "type": "fetch",
    "url": "https://pdata.pops.fastly-insights.com/o.svg?"
  },
  {
    "filters": [
      "||media-imdb.com/twilight/?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://s.media-imdb.com/twilight/?"
  },
  {
    "filters": [
      "||zergnet.com/zerg.js$script,third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.zergnet.com/zerg.js"
  },
  {
    "filters": [
      "/amp-analytics-"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
  },
  {
    "filters": [
      "||rlcdn.com^",
      "||rlcdn.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://id.rlcdn.com"
  },
  {
    "filters": [
      "||alb.reddit.com^",
      ".com/i.gif?"
    ],
    "sourceUrl": "https://www.reddit.com",
    "type": "image",
    "url": "https://alb.reddit.com/i.gif?"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "||collector.xhamster.com^",
      "?log=stats&"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://collector.xhamster.com/?log=stats&ref=&_=1540302682391"
  },
  {
    "filters": [
      ".com/v.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://hpd.baidu.com/v.gif?"
  },
  {
    "filters": [
      "||mookie1.com^$third-party",
      "||mookie1.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://odr.mookie1.com"
  },
  {
    "filters": [
      "||spotxchange.com^$third-party",
      "||spotxchange.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://sync.search.spotxchange.com"
  },
  {
    "filters": [
      "||agkn.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://aa.agkn.com"
  },
  {
    "filters": [
      "||adform.net^",
      "||adform.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://c1.adform.net"
  },
  {
    "filters": [
      "||1rx.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://sync.1rx.io"
  },
  {
    "filters": [
      "||krxd.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://usermatch.krxd.net"
  },
  {
    "check": true,
    "filters": [
      "||cm.g.doubleclick.net^",
      "||doubleclick.net/pixel?$third-party",
      "/pixel?google_"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://cm.g.doubleclick.net/pixel?google_nid=a9&google_cm&ex=doubleclick.net"
  },
  {
    "filters": [
      "||bidswitch.net^",
      "||bidswitch.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://x.bidswitch.net"
  },
  {
    "filters": [
      "||bluekai.com^",
      "||bluekai.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://tags.bluekai.com"
  },
  {
    "filters": [
      ".openx.$domain=~openx.com",
      "||openx.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://us-u.openx.net"
  },
  {
    "filters": [
      "||casalemedia.com^$third-party",
      "||casalemedia.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ssum-sec.casalemedia.com"
  },
  {
    "filters": [
      "||advertising.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://pixel.advertising.com"
  },
  {
    "filters": [
      "||rubiconproject.com^$third-party",
      "||rubiconproject.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://token.rubiconproject.com"
  },
  {
    "filters": [
      "||ads.yahoo.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ads.yahoo.com"
  },
  {
    "filters": [
      "||ipredictive.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://sync.ipredictive.com"
  },
  {
    "filters": [
      "||demdex.net^",
      "||demdex.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://dpm.demdex.net"
  },
  {
    "check": true,
    "filters": [
      "||taboola.com^$third-party",
      "||taboola.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://trc.taboola.com"
  },
  {
    "filters": [
      "||googlesyndication.com^",
      "||googlesyndication.com/safeframe/"
    ],
    "sourceUrl": "https://",
    "type": "other",
    "url": "https://tpc.googlesyndication.com/safeframe/"
  },
  {
    "filters": [
      "||radar.cedexis.com^",
      "||cedexis.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://radar.cedexis.com"
  },
  {
    "filters": [
      "||veta.naver.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://mv.veta.naver.com"
  },
  {
    "filters": [
      "||lcs.naver."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://lcs.naver.com"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "||mmstat.com^$third-party",
      ".com/g.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://gj.mmstat.com/g.gif?"
  },
  {
    "filters": [
      "/1x1.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://m.aliexpress.com/img/1x1.gif?"
  },
  {
    "filters": [
      "/__utm.gif"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ssl.google-analytics.com/r/__utm.gif"
  },
  {
    "filters": [
      "@@||google.com/jsapi$script,third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.google.com/jsapi"
  },
  {
    "check": true,
    "filters": [
      "||optimizely.com^$third-party",
      "||optimizely.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.optimizely.com"
  },
  {
    "filters": [
      "/web_page_view?"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://data.bilibili.com/v/web/web_page_view?"
  },
  {
    "filters": [
      "/log/web?"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://data.bilibili.com/log/web?"
  },
  {
    "filters": [
      "||stats.wp.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://stats.wp.com"
  },
  {
    "filters": [
      "||pixel.wp.com^",
      ".com/b.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://pixel.wp.com/b.gif?"
  },
  {
    "filters": [
      "/yads-",
      "/yads."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://yads.c.yimg.jp/js/yads-async.js"
  },
  {
    "filters": [
      "/yads/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s.yimg.jp/images/listing/tool/yads/"
  },
  {
    "filters": [
      "@@||yimg.jp/images/listing/tool/yads/yads-stream-conf-top_smp.js$domain=yahoo.co.jp"
    ],
    "sourceUrl": "https://m.yahoo.co.jp",
    "type": "script",
    "url": "https://s.yimg.jp/images/listing/tool/yads/yads-stream-conf-top_smp.js"
  },
  {
    "filters": [
      "||wordpress.com/geo/"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://public-api.wordpress.com/geo/"
  },
  {
    "filters": [
      "/t.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://pixel.wp.com/t.gif?"
  },
  {
    "filters": [
      "://c1.*/c.gif?",
      ".com/c.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://c1.microsoft.com/c.gif?"
  },
  {
    "filters": [
      "||weborama.fr^$third-party",
      "||weborama.fr^",
      "/dispatch.fcgi?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://wcm.solution.weborama.fr/fcgi-bin/dispatch.fcgi?"
  },
  {
    "filters": [
      "://c.*/c.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://c.bing.com/c.gif?"
  },
  {
    "filters": [
      "||mediator.mail.ru^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://mediator.mail.ru"
  },
  {
    "filters": [
      "||msecnd.net/scripts/a/ai.0.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://az416426.vo.msecnd.net/scripts/a/ai.0.js"
  },
  {
    "filters": [
      "||petametrics.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://cdn.petametrics.com"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "script",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "||vk.com/js/lib/px.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://vk.com/js/lib/px.js"
  },
  {
    "filters": [
      "@@||gravatar.com/avatar$image,third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://2.gravatar.com/avatar"
  },
  {
    "filters": [
      "||msecnd.net/scripts/jsll-"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://az725175.vo.msecnd.net/scripts/jsll-4.js"
  },
  {
    "filters": [
      "||clicktale.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdnssl.clicktale.net"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "||visualstudio.com/v2/track$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://dc.services.visualstudio.com/v2/track"
  },
  {
    "filters": [
      "/adwords.$domain=~ppc.ee|~radom.pl"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "https://adwords.google.com"
  },
  {
    "check": true,
    "filters": [
      "||google-analytics.com/plugins/",
      "@@||google-analytics.com/plugins/$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.google-analytics.com/plugins/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "script",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "script",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "||criteo.net^$third-party",
      "/publishertag.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://static.criteo.net/js/ld/publishertag.js"
  },
  {
    "filters": [
      "||cxense.com^",
      "||cxense.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://cdn.cxense.com"
  },
  {
    "filters": [
      "||twitter.com/i/jot"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://syndication.twitter.com/i/jot"
  },
  {
    "filters": [
      "||props.id^",
      "||props.id^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://st-a.props.id"
  },
  {
    "filters": [
      "||creativecdn.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "xhr",
    "url": "https://pubs2-asia.creativecdn.com"
  },
  {
    "filters": [
      "||adobedtm.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://assets.adobedtm.com"
  },
  {
    "filters": [
      "||bnc.lt^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "https://bnc.lt"
  },
  {
    "filters": [
      "||livejasmin.com^$third-party,domain=~awempire.com"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.livejasmin.com"
  },
  {
    "filters": [
      "||static.criteo.net/images^$third-party",
      "/pixel.gif?"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://static.criteo.net/images/pixel.gif?"
  },
  {
    "filters": [
      "||3.cn/cesu/r?"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://fd.3.cn/cesu/r?"
  },
  {
    "filters": [
      "||yahoo.com/b?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ganon.yahoo.com/b?"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||yimg.jp/images/listing/tool/yads/impl/yads-stream-conf-top_smp.js$domain=yahoo.co.jp"
    ],
    "sourceUrl": "https://m.yahoo.co.jp",
    "type": "script",
    "url": "https://s.yimg.jp/images/listing/tool/yads/impl/yads-stream-conf-top_smp.js"
  },
  {
    "check": true,
    "filters": [
      "@@||phncdn.com/html5player/$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn1d-static-shared.phncdn.com/html5player/"
  },
  {
    "filters": [
      "||pingjs.qq.com^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://pingjs.qq.com"
  },
  {
    "check": true,
    "filters": [
      "||mxpnl.com^$third-party",
      "/mixpanel-*.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js"
  },
  {
    "filters": [
      "/m.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://log.mmstat.com/m.gif?"
  },
  {
    "filters": [
      "||beacon.sina.com.cn^",
      ".cn/a.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://beacon.sina.com.cn/a.gif?"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "script",
    "url": "https://www.google.com/ads/"
  },
  {
    "check": true,
    "filters": [
      "||mixpanel.com^$third-party",
      "||mixpanel.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://api.mixpanel.com"
  },
  {
    "filters": [
      "/advertising/*$~xmlhttprequest,domain=~advertising.org.il|~commercialplanet.eu|~kloterfarms.com|~temple.edu|~themarker.com"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://images-fe.ssl-images-amazon.com/images/G/01/ads/advertising/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "/prebid1."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://a.espncdn.com/prod/scripts/prebid1.15.0.js"
  },
  {
    "check": true,
    "filters": [
      "@@||phncdn.com/www-static/js/quality-$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://di.phncdn.com/www-static/js/quality-selector.js"
  },
  {
    "check": true,
    "filters": [
      "@@||phncdn.com/www-static/js/vmobile/widget-$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://di.phncdn.com/www-static/js/vmobile/widget-player.js"
  },
  {
    "filters": [
      "||google-analytics.com/gtm/js?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.google-analytics.com/gtm/js?"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "||googletagmanager.com/gtag/$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.googletagmanager.com/gtag/"
  },
  {
    "filters": [
      "/atrk.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://d31qbv1cthcecs.cloudfront.net/atrk.js"
  },
  {
    "filters": [
      "/beacon.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://b.scorecardresearch.com/beacon.js"
  },
  {
    "filters": [
      "/ad_status."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://static.doubleclick.net/instream/ad_status.js"
  },
  {
    "filters": [
      "||imasdk.googleapis.com^$third-party",
      "/ima3.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://imasdk.googleapis.com/js/sdkloader/ima3.js"
  },
  {
    "filters": [
      "||baidu.com/hm.gif?"
    ],
    "sourceUrl": "https://m.baidu.com",
    "type": "image",
    "url": "https://hm.baidu.com/hm.gif?"
  },
  {
    "filters": [
      "||alexametrics.com^$third-party",
      "/atrk.gif?"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://certify.alexametrics.com/atrk.gif?"
  },
  {
    "filters": [
      "||cloudfront-labs.amazonaws.com^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://cloudfront-labs.amazonaws.com"
  },
  {
    "check": true,
    "filters": [
      "@@||phncdn.com/www-static/js/vmobile/show.js$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://di.phncdn.com/www-static/js/vmobile/show.js"
  },
  {
    "check": true,
    "filters": [
      "@@||phncdn.com/www-static/js/vmobile/comments.js$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://di.phncdn.com/www-static/js/vmobile/comments.js"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "script",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "/yads_"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s.yimg.jp/images/listing/tool/yads/uadf/yads_vimps.js"
  },
  {
    "filters": [
      "||yjtag.jp^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s.yjtag.jp"
  },
  {
    "filters": [
      "/clear.gif?"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://s.yimg.jp/images/approach/jslib/clear.gif?"
  },
  {
    "filters": [
      "||twitter.com/jot.html"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "https://platform.twitter.com/jot.html"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "||yjtag.yahoo.co.jp^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://yjtag.yahoo.co.jp"
  },
  {
    "filters": [
      "||alipay.com/service/clear.png?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ynuf.alipay.com/service/clear.png?"
  },
  {
    "filters": [
      "/in.php?referer="
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.xvideos.com/in.php?referer="
  },
  {
    "filters": [
      "||everesttech.net^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://cm.everesttech.net"
  },
  {
    "filters": [
      "/criteo_"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://s.yimg.jp/images/listing/tool/yads/criteo_api.html"
  },
  {
    "filters": [
      "||an.yandex.ru^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://an.yandex.ru"
  },
  {
    "filters": [
      "||popads.net^$third-party",
      "||popads.net^"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.popads.net"
  },
  {
    "filters": [
      "||omtrdc.net^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "xhr",
    "url": "http://espndotcom.tt.omtrdc.net"
  },
  {
    "filters": [
      ".com/ad/$~image,third-party,domain=~mediaplex.com"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://a.espncdn.com/ad/"
  },
  {
    "filters": [
      "/omniture/tracking."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://a.espncdn.com/js/omniture/tracking.js"
  },
  {
    "filters": [
      "?_siteid="
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://rs.mail.ru/d20304452.gif?_SITEID=173&rnd=322507571&ts=1540302687"
  },
  {
    "check": true,
    "filters": [
      "||cas.criteo.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cas.criteo.com"
  },
  {
    "filters": [
      "||cmap.alibaba.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://cmap.alibaba.com"
  },
  {
    "filters": [
      "||bat.bing.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://bat.bing.com"
  },
  {
    "filters": [
      "||tmall.com/add?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://pass.tmall.com/add?"
  },
  {
    "filters": [
      "||sohu.com/pv.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://js.sohu.com/pv.js"
  },
  {
    "filters": [
      "||xnxx.com^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.xnxx.com"
  },
  {
    "filters": [
      "||im.ov.yahoo.co.jp^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://im.ov.yahoo.co.jp"
  },
  {
    "filters": [
      "||quantummetric.com^",
      "||quantummetric.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.quantummetric.com"
  },
  {
    "filters": [
      "||hm.baidu.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://hm.baidu.com"
  },
  {
    "filters": [
      "||track.pricespider.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://track.pricespider.com"
  },
  {
    "filters": [
      "/adjs/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://img3.doubanio.com/f/adjs/"
  },
  {
    "filters": [
      "||teads.tv^$third-party",
      "||teads.tv^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://a.teads.tv"
  },
  {
    "filters": [
      "/rsya-tag-users/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://yastatic.net/q/set/s/rsya-tag-users/"
  },
  {
    "filters": [
      "||pv.sohu.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://pv.sohu.com"
  },
  {
    "filters": [
      "@@||youtube.com/iframe_api$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.youtube.com/iframe_api"
  },
  {
    "filters": [
      "||bing.com/action/"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://bat.bing.com/action/"
  },
  {
    "filters": [
      "/pagead/conversion/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.googleadservices.com/pagead/conversion/"
  },
  {
    "filters": [
      "||vk.com/rtrg?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://vk.com/rtrg?"
  },
  {
    "filters": [
      "||xnxx.com/in.php?referer"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.xnxx.com/in.php?referer="
  },
  {
    "filters": [
      "/pagead/js/*",
      "||googlesyndication.com/pagead/"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tpc.googlesyndication.com/pagead/js/"
  },
  {
    "filters": [
      "/pagead2.",
      "||pagead2.googlesyndication.com^$~object-subrequest",
      "/pagead/osd.",
      "||pagead2.googlesyndication.com^$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://pagead2.googlesyndication.com/pagead/osd.js"
  },
  {
    "filters": [
      "/uedata?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.amazon.com/ap/uedata?"
  },
  {
    "filters": [
      ".net/ads/",
      "/ads/img/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://cdn.sstatic.net/ads/img/"
  },
  {
    "filters": [
      "||ensighten.com^",
      "||ensighten.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://nexus.ensighten.com"
  },
  {
    "filters": [
      "||t.paypal.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://t.paypal.com"
  },
  {
    "filters": [
      "/gajs/analytics.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.paypalobjects.com/gajs/analytics.js"
  },
  {
    "filters": [
      "/yandex-metrica-watch/*"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://cdn.jsdelivr.net/npm/yandex-metrica-watch/"
  },
  {
    "filters": [
      "/sa.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://track.sohu.com/sa.gif?"
  },
  {
    "filters": [
      "||impact-ad.jp^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://aw.dw.impact-ad.jp"
  },
  {
    "filters": [
      "||beacon.tingyun.com^"
    ],
    "sourceUrl": "https://",
    "type": "other",
    "url": "https://beacon.tingyun.com"
  },
  {
    "filters": [
      "||collector1.xhamster.com^",
      "?log=stats-"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://collector1.xhamster.com/?log=stats-beta&ref=&v=3.1&_=1540302692023"
  },
  {
    "filters": [
      "||sohu.com/count/"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://i.go.sohu.com/count/"
  },
  {
    "filters": [
      "||exosrv.com^$third-party",
      "||exosrv.com^"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.exosrv.com"
  },
  {
    "filters": [
      "/optimizely.$domain=~optimizely.com"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://cdn.espn.com/sports/optimizely.js"
  },
  {
    "filters": [
      "||collector.githubapp.com^"
    ],
    "sourceUrl": "https://",
    "type": "other",
    "url": "https://collector.githubapp.com"
  },
  {
    "filters": [
      "/getads?"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://v.amazon-adsystem.com/va/fw/getAds?"
  },
  {
    "filters": [
      "/advert.$domain=~advert.ae|~advert.io|~motortrader.com.my"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://mc.webvisor.org/metrika/advert.gif"
  },
  {
    "filters": [
      "||aralego.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://sync.aralego.com"
  },
  {
    "filters": [
      "||github.com/_private/browser/stats"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://api.github.com/_private/browser/stats"
  },
  {
    "filters": [
      "||imp.optaim.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://imp.optaim.com"
  },
  {
    "check": true,
    "filters": [
      "||outbrain.com^$third-party",
      "||outbrain.com^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://widgets.outbrain.com"
  },
  {
    "filters": [
      "||irs01.$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://iqiyi.irs01.com"
  },
  {
    "filters": [
      "/amp4ads-"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.ampproject.org/rtv/011810152207300/amp4ads-host-v0.js"
  },
  {
    "check": true,
    "filters": [
      "/adview?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://securepubads.g.doubleclick.net/pagead/adview?"
  },
  {
    "filters": [
      "/adchoices/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://tpc.googlesyndication.com/pagead/images/adchoices/"
  },
  {
    "filters": [
      "||visualrevenue.com^",
      "||visualrevenue.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://a.visualrevenue.com"
  },
  {
    "filters": [
      "||abmr.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ak1s.abmr.net"
  },
  {
    "check": true,
    "filters": [
      "/google-analytics."
    ],
    "sourceUrl": "https://appsource.microsoft.com",
    "type": "script",
    "url": "https://appsource.microsoft.com/google-analytics.js"
  },
  {
    "filters": [
      ".net/p.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://p.typekit.net/p.gif?"
  },
  {
    "filters": [
      "||imrworldwide.com^",
      "||imrworldwide.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://cdn-gl.imrworldwide.com"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "script",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "||fout.jp^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://js.rfp.fout.jp"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "/smartads.$domain=~smartads.cz|~smartads.io",
      "/mobileads/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://smartads.mobile.yahoo.co.jp/MobileAds/"
  },
  {
    "filters": [
      "||adsrvr.org^$third-party",
      "||adsrvr.org^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://match.adsrvr.org"
  },
  {
    "filters": [
      "||exelator.com^",
      "||exelator.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://loadm.exelator.com"
  },
  {
    "filters": [
      "||xplosion.de^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://ups.xplosion.de"
  },
  {
    "filters": [
      "/imgad?"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://tpc.googlesyndication.com/pagead/imgad?"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "script",
    "url": "https://www.google.com/ads/"
  },
  {
    "check": true,
    "filters": [
      "||log.optimizely.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://341800575.log.optimizely.com"
  },
  {
    "filters": [
      "||youku.com/ypvlog?"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://p.l.youku.com/ypvlog?"
  },
  {
    "check": true,
    "filters": [
      "/showad."
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://ads.pubmatic.com/AdServer/js/showad.js"
  },
  {
    "filters": [
      "||demandbase.com^",
      "||demandbase.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://api.demandbase.com"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "||zog.link^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://in6.zog.link"
  },
  {
    "filters": [
      "||qq.com/dataimport/"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://tudg.qq.com/dataimport/"
  },
  {
    "filters": [
      "/log.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://hermes.jd.com/log.gif?"
  },
  {
    "filters": [
      "||betrad.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://l.betrad.com"
  },
  {
    "check": true,
    "filters": [
      "||acuityplatform.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://acuityplatform.com"
  },
  {
    "filters": [
      "||mxptint.net^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://lrp.mxptint.net"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "||rdsig.yahoo.co.jp^$image"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://rdsig.yahoo.co.jp"
  },
  {
    "filters": [
      "||zemanta.com^$third-party",
      "||zemanta.com/usersync/outbrain/?"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://b1sync.zemanta.com/usersync/outbrain/?"
  },
  {
    "filters": [
      "||tubecorporate.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://st.tubecorporate.com"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "check": true,
    "filters": [
      "||ad.doubleclick.net^$~object-subrequest,third-party",
      "||ad.doubleclick.net^$third-party,image"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ad.doubleclick.net"
  },
  {
    "filters": [
      "||pos.baidu.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://pos.baidu.com"
  },
  {
    "check": true,
    "filters": [
      "||turn.com^$third-party",
      "||ad.turn.com^",
      "||turn.com^"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://ad.turn.com"
  },
  {
    "check": true,
    "filters": [
      "||de17a.com^",
      "||de17a.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://d5p.de17a.com"
  },
  {
    "filters": [
      "||mathtag.com^",
      "||mathtag.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://sync.mathtag.com"
  },
  {
    "check": true,
    "filters": [
      ".adsby.",
      "||bidtheatre.com^$third-party",
      "||adsby.bidtheatre.com^"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://match.adsby.bidtheatre.com"
  },
  {
    "check": true,
    "filters": [
      "||basebanner.com^$third-party",
      "||basebanner.com^"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://match.basebanner.com"
  },
  {
    "filters": [
      "||sitescout.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://pixel-sync.sitescout.com"
  },
  {
    "filters": [
      "||upravel.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://sync.upravel.com"
  },
  {
    "check": true,
    "filters": [
      "||rfihub.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://p.rfihub.com"
  },
  {
    "filters": [
      "||quantserve.com^$third-party,image"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://pixel.quantserve.com"
  },
  {
    "filters": [
      "||dotomi.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://pubmatic-match.dotomi.com"
  },
  {
    "filters": [
      "||onaudience.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://pixel.onaudience.com"
  },
  {
    "filters": [
      ".com/ads."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ads.exosrv.com/ads.js"
  },
  {
    "filters": [
      "||csi.gstatic.com^"
    ],
    "sourceUrl": "http://",
    "type": "other",
    "url": "https://csi.gstatic.com"
  },
  {
    "filters": [
      "||erne.co/tags?"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "https://grey.erne.co/tags?"
  },
  {
    "filters": [
      ".com/ads-"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://syndication.exosrv.com/ads-priv.php"
  },
  {
    "filters": [
      "||facebook.com/brandlift.php"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://www.facebook.com/brandlift.php"
  },
  {
    "filters": [
      "||googlesyndication.com/simgad/"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://tpc.googlesyndication.com/simgad/"
  },
  {
    "filters": [
      "||googlesyndication.com^*/simgad/"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://tpc.googlesyndication.com/daca_images/simgad/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "script",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "||chartbeat.com^",
      "/chartbeat_",
      "||chartbeat.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://static.chartbeat.com/js/chartbeat_pub.js"
  },
  {
    "filters": [
      "/alog.min.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://fex.bdstatic.com/hunter/alog/alog.min.js"
  },
  {
    "filters": [
      "||simpli.fi^",
      "||simpli.fi^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://um.simpli.fi"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "/adnetwork.$domain=~adnetwork.ai|~adnetwork.ie"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://adnetwork.adasiaholdings.com"
  },
  {
    "filters": [
      ".ar/ads/"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.google.com.ar/ads/"
  },
  {
    "filters": [
      "/adsense_$domain=~adsense.googleblog.com|~support.google.com"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.google.com.ar/images/branding/product/1x/adsense_64dp.png"
  },
  {
    "filters": [
      "||ptengine.jp^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://js.ptengine.jp"
  },
  {
    "filters": [
      "?bannerid="
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://ads.nicovideo.jp/bannertext?bannerid=81392&zoneid=1209&"
  },
  {
    "filters": [
      "/track.gif^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://www.hao123.com/images/track.gif"
  },
  {
    "filters": [
      "||bizible.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.bizible.com"
  },
  {
    "filters": [
      "||maxmind.com^*/geoip2.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://js.maxmind.com/js/apis/geoip2/v2.1/geoip2.js"
  },
  {
    "filters": [
      "||marketo.net^$third-party",
      "@@||munchkin.marketo.net/munchkin.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://munchkin.marketo.net/munchkin.js"
  },
  {
    "filters": [
      "||c212.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.c212.net"
  },
  {
    "filters": [
      "||smartadserver.com^$third-party",
      "||smartadserver.com^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://sync.smartadserver.com"
  },
  {
    "check": true,
    "filters": [
      "|https://$script,third-party,xmlhttprequest,domain=txxx.com"
    ],
    "sourceUrl": "https://m.txxx.com",
    "type": "script",
    "url": "https://"
  },
  {
    "filters": [
      "||i-mobile.co.jp^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://spad.i-mobile.co.jp"
  },
  {
    "check": true,
    "filters": [
      "/advertising.$domain=~advertising.amazon.ca|~advertising.amazon.cn|~advertising.amazon.co.jp|~advertising.amazon.co.uk|~advertising.amazon.com|~advertising.amazon.com.au|~advertising.amazon.com.mx|~advertising.amazon.de|~advertising.amazon.es|~advertising.amazon.fr|~advertising.amazon.in|~advertising.amazon.it|~advertising.berlin-airport.de|~advertising.bulurum.com|~advertising.byhoxby.com|~advertising.dailymotion.com|~advertising.expedia.com|~advertising.lavenir.net|~advertising.mobile.de|~advertising.org.il|~advertising.roku.com|~advertising.sevenwestmedia.com.au|~advertising.shpock.com|~advertising.theguardian.com",
      "/advertising.$domain=~advertising.amazon.ca|~advertising.amazon.cn|~advertising.amazon.co.jp|~advertising.amazon.co.uk|~advertising.amazon.com|~advertising.amazon.com.au|~advertising.amazon.com.mx|~advertising.amazon.de|~advertising.amazon.es|~advertising.amazon.fr|~advertising.amazon.in|~advertising.amazon.it|~advertising.berlin-airport.de|~advertising.bulurum.com|~advertising.byhoxby.com|~advertising.dailymotion.com|~advertising.expedia.com|~advertising.lavenir.net|~advertising.mobile.de|~advertising.org.il|~advertising.sevenwestmedia.com.au|~advertising.shpock.com|~advertising.theguardian.com"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.txxx.com/js/advertising.js"
  },
  {
    "check": true,
    "filters": [
      "||hotjar.com^$third-party",
      "||hotjar.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static.hotjar.com"
  },
  {
    "filters": [
      "||eclick.baidu.com^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://eclick.baidu.com"
  },
  {
    "filters": [
      "/LogImpression?"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://ads.nicovideo.jp/api/OxBannerService/logImpression?"
  },
  {
    "filters": [
      "||effectivemeasure.net^$third-party",
      "||effectivemeasure.net^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://me-ssl.effectivemeasure.net"
  },
  {
    "filters": [
      "/gen_204?$image,script",
      "||google.*/gen_204?$~xmlhttprequest"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.google.com.eg/gen_204?"
  },
  {
    "filters": [
      "||js-agent.newrelic.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://js-agent.newrelic.com"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      ".com/s.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://kcart.alipay.com/s.gif?"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "script",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "/amp-ad-"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.ampproject.org/rtv/011810152207300/v0/amp-ad-exit-0.1.js"
  },
  {
    "filters": [
      "||nr-data.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://bam.nr-data.net"
  },
  {
    "filters": [
      "||socdm.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "xhr",
    "url": "http://d.socdm.com"
  },
  {
    "filters": [
      "||apvdr.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://apvdr.com"
  },
  {
    "filters": [
      "||adtdp.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://adsd-sync.amanad.adtdp.com"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "$script,third-party,domain=0dt.net|123videos.tv|171gifs.com|1proxy.de|2ddl.download|2ddl.ooo|300mbfilms.org|300mbmovies4u.lol|321jav.com|353online.com|4downfiles.org|4horlover.blogspot.com|4horlover2.blogspot.com|4proxy.de|61tube.com|69sugar.com|6jav.com|6teentube.am|7starhd.com|9xmovies.site|a-o.ninja|abcmalayalam.co|abgdianci.com|acidimg.cc|adultdouga.biz|aflamfree.net|aflamtorrent.com|agarios.org|ahlamtv.com|akvideo.stream|al.ly|alantv.net|alivefoot.us|alivefootballstreaming.com|allpeliculas.com|alltube.tv|ally.sh|amabitch.com|amateur.ug|ancensored.com|andrija-i-andjelka.com|animakai.info|anime-music.info|anime-shitai.tv|anime-sugoi.com|animeado.net|animeai.org|animeai2.net|animeid.io|animelek.com|animemusicdownload.info|animepahe.com|animesenzalimiti.com|animesonline2hd.org|animesonlinetk.info|animesorion.org|animezone.pl|anitube.es|antenasport.eu|anyanime.com|apklover.net|aquariumgays.com|arab-moviez.org|arabloads.net|arabp2p.com|archived.moe|artgifsocean.com|asianporndistrict.com|asianxv.com|assistirfilmeshd.org|assistirfilmesonline2.net|atchtheofficeonline.net|avonline.tv|avpockiehd.com|axxomovies.in|azkempire.com|aznude.com|baixarsomusica.com|bajarjuegospcgratis.com|bakacan.com|balkandownload.org|balkanje.com|bdmusicboss.net|bdsmporn.us|bdsmstreak.com|beautiesbondage.com|becekin.net|beelink.in|behchala.com|bemetal.net|bersek.xyz|bestsongspk.com|big4umovies.net|bilasport.com|bilasport.me|bilasport.pw|bitch-show.com|bitporno.com|blackboxrepack.com|blacklionmusic.com|blogqpot.com|bludv.com|bokep2017.com|bokepcewek.net|bokepseks.co|bolly2tolly.com|bouncebreak.com|brazzershd.co|btdb.in|btdb.to|bugiltelanjang17.com|byetv.org|bypassed.cab|bypassed.plus|bypassed.team|calcioitalia.stream|camrouge.com|camwhores.co|cartoonhd.be|cartoonhd.cc|cartoonhd.globa|cartoonhd.global|cartoonth12.com|catchcoin.pw|catosports.ml|centraldeanimes.biz|centrum-dramy.pl|cholotubex.com|cinemamkv.xyz|cinetux.net|clicknupload.org|clik.pw|cliphayho.com|cloudy.ec|coastalhut.com|columbia-xxx.com|comicporno.org|comicsmanics.com|cookiesnetfl1x.com|cooltamil.com|coreimg.net|coroas40.com|coshurl.co|couchtuner.fr|couchtuner.nu|cricbox.net|cwtube.dj|czechmoneyteens.com|dailyuploads.net|dato.porn|datpiff.biz|dblatino.com|dclinks.info|dd-books.com|ddlfr.pw|debrideco.com|demonoid.co|depedlps.blogspot.com|desixnxx.net|devil-torrents.pl|discografiascompletas.net|divxatope1.com|djmazamp3.info|dokazm.mk|donlotfile.com|download-xyz.com|downloadgameps3.com|downloadgamepsp.com|downloadgamexbox.com|dragonball-time.com|drakorindo.com|drakorindofilms.com|drhmonegyi.net|dvdwap.com|dzrepackteam.com|e-hentai.me|e-jav.com|easyxtubes.com|edmdl.com|ekasiwap.com|electro-torrent.pl|embedlink.info|embedsr.to|erodouga69.com|erostar.jp|estrenosdoramas.net|estrenosdoramas.org|etsmods.net|eurostreaming.video|exposure.pw|fagken.com|fas.li|fastdrama.co|faststream.in|faststream.ws|fbstreams.me|felipephtutoriais.com.br|filecrypt.cc|fileflares.com|filerocks.us|filesupload.org|filma24.org|filmaon.com|filmclub.tv|filmehd.net|filmeserialeonline.org|filmeseseriesonline.net|filmesonline1080p.com|filmesonline4.com|filmesonlineagora.com|filmesonlineplay.com|filmesonlinex.biz|filmetraduseonline.ro|filmgur.com|filmi7.com|filminvazio.com|filmovi.eu|filmozu.net|filmuptobox.net|filsex.com|firstrowas1.cc|flashbd24.blogspot.com|flixanity.online|foxurl.net|freeadultcomix.com|freeiptvlinks.net|freelivesports.co|freemoviestream.xyz|freeomovie.com|freesoftwaredlul.com|fuckingsession.com|full-serie.biz|fullmaza.net|fullpinoymovies.net|futebolps2.com|fxporn.net|gameofporn.net|gamepciso.com|gamestorrent.co|garotosbrasil.com|gaycock4u.com|gaysex69.net|gibanica.club|girlswithmuscle.com|go4up.com|gogoanime.ch|goldchannelmovie.net|gottateens.com|gravuregirlz.com|grcrt.net|guasavemp3.com|hacknetfl1x.net|halacima.net|happy-foxie.com|haylike.net|hdarkzone.com|hdencoders.com|hdmovie16.ws|hdmovie24.net|hdmusic23.net|hdmusic25.com|hdmusic90.co|hdporner720.com|hdpornfull.co|hdpornfull.net|hdshows.in|hdteenvids.com|hdtube.co|hdzex.net|healthsoul.info|hentai-for.me|hentai-id.tv|hentai.to|hentaicomicsbr.net|hentaihaven.org|hentaiplay.net|hentaiplus.co|hentaistream.co|her69.net|herobo.com|heymanga.me|hindimoviesonlines.net|hiper.cool|hitomi.la|hkfree.co|homeporn.tv|hon3yhd.com|hqq.watch|hulkload.com|hyperdebrid.net|i-gay.org|icwutudidare.info|idolblog.org|ig2fap.com|igg-games.com|ightdl.xyz|iiddl.net|iimgur.club|ilinks.ug|ilovefilmesonline.biz|image-bugs.com|imagecoin.net|imagecool.org|img2share.com|imgshot.pw|imgshots.com|imgsmile.com|immunicity.cab|immunicity.plus|immunicity.team|incestoporno.org|insharee.com|iprojectfreetv.us|iptvsatlinks.blogspot.com|itastreaming.gratis|ivhunter.com|iwatchgameofthrones.cc|izporn.net|jav-for.me|javeu.com|javfhd.tv|javfinder.to|javgay.com|javhd.pro|javhd4k.com|javkimochiii.com|javleak.com|javmobile.net|javmost.com|javonline.online|javpob.com|javrom.com|javstream.co|javus.net|jdownloader2premium.com|jilhub.xyz|jizzman.com|jogostorrentgratis.net|jpfiles.eu|jpgayporn.net|jpidols.tv|k18.co|k2nblog.com|karanpc.com|kingstheme.com|kingvid.tv|kissanime.ru|kissasian.com|kizzboy.com|kooora2day.com|koraspeak.com|koreansubindo.net|kreskowkazone.pl|kreskowki.tv|kshowes.net|kwik.cx|l2s.io|lacajita.xyz|lambingan.su|latinohentai.com|layar-21.com|layarindo21.com|lecheanal.com|leech.ae|leosims.com|letsjav.com|linclik.com|link2download.net|livecamtv.me|livehd90m.info|livesoccertv.live|livestreaming24.net|loonertube.com|lyricsy.ir|macgames-download.com|macnwins.com|magesy.be|manatelugump3.net|mangacanblog.com|maniacosporcomics.com|marapcana.eu|marvin-vibez.to|masflowmusik.net|masterfilmesonlinegratis.info|maxinlive.com|mbfcast.pw|mbfsports.com|media1fire.com|megafilmeshdplus.org|megafodabr.com|megahentaicomics.com|megaseriesonline.com|megatobox.net|meguminime.com|metaserie.com|milfcomix.com|milversite.me|minatosuki.com|minatosuki.website|minhaserie.me|minkly.me|mitemovie.com|mixhdporn.com|mkvcage.com|mkvtv.net|mlbstream.me|mmfilmes.com|mocnoi.com|modelblog.org|movie24k.ch|movieerotic.net|moviehd-free.com|moviehd-xxx.com|movierulz.ch|movierulz.cm|movierulz.xyz|movies24hd.co|movies5x.com|moviesak47.com|moviesgoldonline.net|moviesgoldonline.pro|moviesgolds.com|movieshdgratis.com.mx|movietubenow.bz|movietv.ws|moviezplanet.org|movieztimes.com|mp3haat.com|mp3kart.cc|mp3kart.co|mp3kart.com|mp3mydownload.com|mp3puu.com|mp3songdl.net|mp4upload.com|musculoduro.com.br|muvibg.com|mylucah.co|mymoviepot.xyz|myreadingmanga.info|mzansifun.com|mzansiporntube.com|mzansixxx.com|namethatpornstar.com|naphi.lol|nasze-kino.online|nbafullhd.com|nbastreams.me|neko-miku.com|nekonime.com|newhdmovie24.biz|newhdmovie24.co|newhdmovies.net|newmusic.trade|newpct.com|newpct1.com|nflstream.net|nflstreams.me|ngentot.tv|nhlstreams.me|ninfetasnovinhas.net|nodefiles.com|nontonanime.org|nontononlinedrama.com|nosteam.com.ro|nosteam.org.ro|nudeyoung.xyz|nulledcenter.com|nungg.com|nungmovies-hd.com|nuttit.com|nxtcomicsclub.com|ocsstream.info|ohohd.com|ohyeah1080.com|okmovie-hd.com|olangal.pro|oload.tv|omberbagi.com|ondeeubaixo.com|one-series.cc|onlinefilmovisaprevodom.cc|onlinefilmsitesii.net|onlinemoviesgold.one|onlinemoviesprime.net|openload.co|openx.tv|opujem.com|otaku-animehd.com|otorrents.com|ottakae.com|owndrives.com|pahe.in|pandamovie.eu|pass69.com|pcgames-download.com|peliculasabc.net|peliculasgo.com|peliculasm.tv|peliculasmega1k.com|peliculastomas01.org|pelisplus.tv|pelisxporno.com|pentasex.com|perfecthdmovies.pw|perulareshd.pw|phimotv.net|picanteeproibido.com.br|pinaycute.com|pipocao.com|pirateaccess.xyz|piratebay.co.in|planetsport.pw|playbokep.me|playpornfree.net|playpornfree.org|pleermp3.net|pokemonlaserielatino.com|polskie-torrenty.com|popjav.com|porneq.com|pornfromcz.com|pornfromczech.com|pornhardx.com|pornhd5k.com|pornhubz.tumblr.com|pornleak.net|pornlibrary.net|pornmegabox.net|pornobae.com|pornocomics.net|pornotorrent.com.br|pornotorrent.org|pornpassw0rds.com|pornsexonline.xxx|pornvibe.org|pornvxl.com|pornzexx.com|portalroms.com|portalultautv.com|primewire.io|programasvirtualespc.net|projectfreetvhd.co|projectfreetvi.info|psarips.com|pubfilmonline.net|pure-anime.tv|pussybook.xyz|putarfilm.com|q3sk-dizi.blogspot.com|querofilmehd.com|r34anim.com|rapcloud.co|rapidvideo.com|raptu.com|realcam.me|reallifecamhd.com|reallifecamvd.com|ripvod.com|root.sx|rosextube.com|runvideo.net|sankakucomplex.com|savvystreams.blogspot.co.uk|savvystreams.blogspot.com|sceper.ws|sdmoviespoint.in|serialed.blogspot.com|series-cravings.tv|seriesblanco.com|seriesblanco.tv|seriescr.com|seriesfuture.com|seriesintorrent.com|serieslatino.tv|seriesparaassistironline.org|seriesparalatinoamerica.blogspot.com|sexisfree.net|sexix.net|sexiz.net|sexkino.to|sexloading.com|sextop.net|sexvui.net|sexxdesi.net|sexy-youtubers.com|sexyeroticgirls.comshofonline.org|short.am|shush.se|sinevizyonda.org|singgah.in|sitpad.info|skidrow-games.io|skidrowcrack.com|skidrowgamesreloaded.com|sklns.net|sky-streams.blogspot.co.uk|smallencode.com|soccerembed.blogspot.com|solotorrent.net|soparagamestorrents.com|spacemov.tv|speedplay.pro|sportp2p.com|sports4u.net|sportshd.me|sportups.me|srkcast.com|stadium-live.biz|streamango.com|streamcherry.com|streamingok.com|streamjav.net|streamlord.com|streampornfree.com|strikeout.co|strikeout.me|suki48.web.id|superteenz.com|sweext.com|swfchan.com|tamilmv.eu|tamilmv.vc|tamilrasigan.net|tamilyogi.fm|taxidrivermovie.com|tddl.tv|teenboytwink.com|teentubeq.com|tele-wizja.com|telugudon.com|telugupalaka.com|teluguringtones.co|telugusexstorieskathalu.net|tfpdl.de|theapricity.com|thebarchive.com|thebestofcafucus.com|thepiratebay.cd|thepiratebay24.ga|thepiratebay3.org|theputlocker.net|thesimplebay.pro|thevid.net|thiruttuvcd.me|thplayers.com|tlenovelas.net|todaypk.ag|todaypk.li|todoinmega.com|tokusatsuindo.com|torjackan.info|torrentcounter.cc|torrentfilmesbr.com|torrentlocura.com|torrentool.com|torrentoon.com|torrentrapid.com|torrentscompletos.com|torrentsgroup.com|tousatu.biz|tr7music.me|tuhentaionline.com|tumejortorrent.com|tuportaldemusica.com|turkishseries.li|tuserie.com|tushyporn.net|tvrex.net|twitchstats.net|twoddl.co|u2s.io|ufreetv.com|unblocked.cab|unblocked.plus|unblocked.team|unduhfilmrama.biz|upcomics.org|uporniahd.com|urle.co|usabit.com|uskip.me|utaseries.co|utaseries.com|uwatchfree.co|v100v.net|vdizpk.com|veekyforums.com|veporn.net|vercanalestv.com|verdirectotv.com|verpeliculasporno.gratis|vertusnovelas.net|veyqo.net|veziserialeonline.info|vibokep.info|vidabc.com|video.az|videobokepgratis.me|videobokepincest.xyz|videoexa.com|videosexbokep.org|videosnudes.com|vidfile.net|vidiobokeptop.com|vidtome.co|vidz7.com|vidzcode.com|viooz.ac|vipbox.nu|vipcast.pw|vipleague.co|vipleague.ws|vipracing.biz|viralfeedhindi.com|viralshow.info|vivatorrents.com|viveseries.com|vivetusnovelas.com|vixvids.to|vpondo.com|vpornex.com|watchaha.com|watcharcheronline.com|watchcommunity.cc|watchcommunity.tv|watcheng.tv|watchers.to|watchfomny.tv|watchjavidol.com|watchjavonline.com|watchme247.co.il|watchmygamesonline.com|watchparksandrecreation.cc|watchparksandrecreation.net|watchpornfree.me|watchtheofficeonline.cc|watchtheofficeonline.net|watchxxxparody.com|wetblog.org|wibudesu.com|wolverdon-filmes.com|world4ufree.ws|worldfree4u.lol|worldfree4u.ws|worldfree4umovie.live|worldvidz.com|wplocker.com|xbnat.com|xdvideos.org|xfilmywap.com|xgatinhas.com|xkorean.net|xmovies1.com|xmovies247.com|xmovies8.org|xrares.com|xteenchan.com|xvideospanish.com|xxgasm.com|xxhdporn.com|xxx-comics.com|xxxstooorage.com|yallakora-online.com|yedhit.com|yeucontrai.com|yify-torrent.xyz|yify.bz|yodrama.com|youav.com|youpornzz.com|yourbittorrent.com|yourporn.sexy|youswear.com|ytsyify.com|yuptorrents.com|yuuk.net|zambianobserver.com|zfilmeonline.eu|zippymoviez.top|zippysharealbum.download|zippysharemediafire.club|zonavideo.net|zone-series.cc|zoocine.co|zoomtv.me|zw-net.com"
    ],
    "sourceUrl": "https://openload.co",
    "type": "script",
    "url": "https://uod2quk646.com/a4a81342d44754d915ef43ea77312574/invoke.js"
  },
  {
    "filters": [
      "@@||dailymotion.com/cdn/manifest/video/$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://dmxleo.dailymotion.com/cdn/manifest/video/"
  },
  {
    "filters": [
      "-dspcookiematching.",
      "||dmxleo.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://public-prod-dspcookiematching.dmxleo.com"
  },
  {
    "filters": [
      "||exactag.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://m.exactag.com"
  },
  {
    "filters": [
      "/pageadimg/*"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://tpc.googlesyndication.com/pageadimg/"
  },
  {
    "filters": [
      "||stadig.ifeng.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://stadig.ifeng.com"
  },
  {
    "filters": [
      "||pixanalytics.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://falcon.pixanalytics.com"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "||gscontxt.net^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://bbc.gscontxt.net"
  },
  {
    "filters": [
      "||crwdcntrl.net^",
      "||crwdcntrl.net^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://tags.crwdcntrl.net"
  },
  {
    "check": true,
    "filters": [
      "||ad.crwdcntrl.net^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://ad.crwdcntrl.net"
  },
  {
    "filters": [
      "||cdn.onesignal.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.onesignal.com"
  },
  {
    "filters": [
      "/js_tracking?"
    ],
    "sourceUrl": "https://",
    "type": "other",
    "url": "https://www.booking.com/js_tracking?"
  },
  {
    "filters": [
      "||adadvisor.net^$third-party",
      "||adadvisor.net^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://adadvisor.net"
  },
  {
    "filters": [
      "||dyntrk.com^",
      "||dyntrk.com^$third-party",
      ".com/adx/"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://gu.dyntrk.com/adx/"
  },
  {
    "filters": [
      "||bidr.io^",
      "||bidr.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://match.prod.bidr.io"
  },
  {
    "filters": [
      "/cm.gif?",
      "||atm.youku.com^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://cm.miaozhen.atm.youku.com/cm.gif?"
  },
  {
    "filters": [
      "||clmbtech.com^$third-party",
      "/ad/commons/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static.clmbtech.com/ad/commons/"
  },
  {
    "filters": [
      "||cricbuzz.com/js/banners/"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://m.cricbuzz.com/js/banners/"
  },
  {
    "filters": [
      "||ssc.api.bbc.com^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://ssc.api.bbc.com"
  },
  {
    "filters": [
      "/adx.$domain=~adx.uk.com|~adx.wowfi.com"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://wn.pos.baidu.com/adx.php"
  },
  {
    "filters": [
      "||company-target.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://api.company-target.com"
  },
  {
    "filters": [
      "||sa.bbc.co.uk^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://sa.bbc.co.uk"
  },
  {
    "filters": [
      "||tns.simba.taobao.com^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://tns.simba.taobao.com"
  },
  {
    "filters": [
      "||tribalfusion.com^$third-party",
      "||tribalfusion.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://a.tribalfusion.com"
  },
  {
    "filters": [
      "||skimresources.com^",
      "||skimresources.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://x.skimresources.com"
  },
  {
    "filters": [
      "||netmng.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://pubmatic2waycm-atl.netmng.com"
  },
  {
    "filters": [
      "||widespace.com^"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://sync.widespace.com"
  },
  {
    "filters": [
      "||adhigh.net^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://px.adhigh.net"
  },
  {
    "check": true,
    "filters": [
      "||tapad.com^$third-party",
      "||tapad.com^"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://pixel.tapad.com"
  },
  {
    "filters": [
      "||gwallet.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://rp.gwallet.com"
  },
  {
    "check": true,
    "filters": [
      "||gumgum.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://rtb.gumgum.com"
  },
  {
    "filters": [
      "||rundsp.com^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://match.rundsp.com"
  },
  {
    "check": true,
    "filters": [
      "||w55c.net^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://pm.w55c.net"
  },
  {
    "filters": [
      "/log/browser/event"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://de.ask.com/log/browser/event"
  },
  {
    "filters": [
      "||visiblemeasures.com^$~object-subrequest,third-party",
      "||visiblemeasures.com^",
      "||visiblemeasures.com^$third-party,image"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://l2.visiblemeasures.com"
  },
  {
    "filters": [
      "||3lift.com^$third-party",
      "||3lift.com^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://ib.3lift.com"
  },
  {
    "filters": [
      "||adotmob.com^$third-party",
      "||adotmob.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://sync.adotmob.com"
  },
  {
    "filters": [
      ".com/1.gif?"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://log.mmstat.com/1.gif?"
  },
  {
    "filters": [
      "/overlayad."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://transit.yahoo.co.jp/js/overlayAd.js"
  },
  {
    "check": true,
    "filters": [
      "||pagead2.googlesyndication.com^$other"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "https://pagead2.googlesyndication.com"
  },
  {
    "filters": [
      "||stickyadstv.com^$third-party",
      "||stickyadstv.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ads.stickyadstv.com"
  },
  {
    "filters": [
      "||adsafeprotected.com^$third-party",
      "||adsafeprotected.com^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://static.adsafeprotected.com"
  },
  {
    "filters": [
      "/show_ads.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://pagead2.googlesyndication.com/pagead/show_ads.js"
  },
  {
    "check": true,
    "filters": [
      "||ero-advertising.com^$third-party",
      "||ero-advertising.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://go.ero-advertising.com"
  },
  {
    "check": true,
    "filters": [
      "/pagead/html/*"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://googleads.g.doubleclick.net/pagead/html/"
  },
  {
    "check": true,
    "filters": [
      "/pagead/ads?"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://googleads.g.doubleclick.net/pagead/ads?"
  },
  {
    "filters": [
      "||ct.pinterest.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ct.pinterest.com"
  },
  {
    "filters": [
      "||pingdom.net^$third-party",
      "/prum."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://rum-static.pingdom.net/prum.min.js"
  },
  {
    "filters": [
      "||analytics.yahoo.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://sp.analytics.yahoo.com"
  },
  {
    "filters": [
      "||affinity.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://backfills3.ph.affinity.com"
  },
  {
    "filters": [
      "/alog/dp."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://fex.bdstatic.com/hunter/alog/dp.mobile.min.js"
  },
  {
    "filters": [
      "||254a.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://r.254a.com"
  },
  {
    "filters": [
      "||pagead2.googlesyndication.com^$image"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://pagead2.googlesyndication.com"
  },
  {
    "filters": [
      "||adition.com^$third-party",
      "||adition.com^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://dsp.adfarm1.adition.com"
  },
  {
    "filters": [
      "||lijit.com^",
      "||lijit.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://ap.lijit.com"
  },
  {
    "filters": [
      "/ads.min.js"
    ],
    "sourceUrl": "https://",
    "type": "fetch",
    "url": "https://de.softonic.com/ads.min.js"
  },
  {
    "filters": [
      "||dnn506yrbagrg.cloudfront.net^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://dnn506yrbagrg.cloudfront.net"
  },
  {
    "filters": [
      "/chartbeat.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://static.chartbeat.com/js/chartbeat.js"
  },
  {
    "filters": [
      "||edigitalsurvey.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://edigitalsurvey.com"
  },
  {
    "filters": [
      "/openx/*"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://pr-bh.ybp.yahoo.com/sync/openx/"
  },
  {
    "filters": [
      "||bttrack.com^$third-party",
      "||bttrack.com^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://bttrack.com"
  },
  {
    "filters": [
      "||volvelle.tech^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://a.volvelle.tech"
  },
  {
    "filters": [
      "/adtest/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://s.yimg.jp/bdv/adtest/"
  },
  {
    "filters": [
      "||visualwebsiteoptimizer.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://dev.visualwebsiteoptimizer.com"
  },
  {
    "filters": [
      "||luckyorange.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ssl.luckyorange.com"
  },
  {
    "filters": [
      "/event-tracking.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.canvaslms.com/js/event-tracking.js"
  },
  {
    "filters": [
      "/beacon.gif?"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://rum-collector-2.pingdom.net/img/beacon.gif?"
  },
  {
    "filters": [
      "||maxmind.com/geoip/$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://geoip-js.maxmind.com/geoip/"
  },
  {
    "filters": [
      ".lms-analytics/",
      "-analytics/insight."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://snap.licdn.com/li.lms-analytics/insight.min.js"
  },
  {
    "filters": [
      "||servebom.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://pixel.servebom.com"
  },
  {
    "filters": [
      "||fwmrm.net^$~object-subrequest,third-party",
      ".net/ad/$~object-subrequest",
      "||fwmrm.net^$third-party,image"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://1f2e7.v.fwmrm.net/ad/"
  },
  {
    "filters": [
      "||brightedge.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ccdn.brightedge.com"
  },
  {
    "filters": [
      "||ads-twitter.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static.ads-twitter.com"
  },
  {
    "filters": [
      "||luckyorange.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "fetch",
    "url": "https://settings.luckyorange.net"
  },
  {
    "filters": [
      "||bizographics.com^$third-party",
      "||bizographics.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://sjs.bizographics.com"
  },
  {
    "filters": [
      "||yimg.com/wi/ytc.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s.yimg.com/wi/ytc.js"
  },
  {
    "filters": [
      "||yahoo.co.jp/js/s_retargeting.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://b92.yahoo.co.jp/js/s_retargeting.js"
  },
  {
    "filters": [
      "||serving-sys.com^",
      "||serving-sys.com^$third-party",
      "/ebonetag.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://secure-ds.serving-sys.com/SemiCachedScripts/ebOneTag.js"
  },
  {
    "filters": [
      "||ads.linkedin.com^$third-party",
      "||ads.linkedin.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://px.ads.linkedin.com"
  },
  {
    "filters": [
      "||exdynsrv.com^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.exdynsrv.com"
  },
  {
    "filters": [
      "/generic.ads.",
      ".ads.css"
    ],
    "sourceUrl": "https://",
    "type": "stylesheet",
    "url": "https://cdnstatic.detik.com/live/css/msite/generic.ads.css"
  },
  {
    "filters": [
      "||creative-serving.com^$third-party",
      "||ads.creative-serving.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ads.creative-serving.com"
  },
  {
    "filters": [
      "/adsct?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://t.co/i/adsct?"
  },
  {
    "filters": [
      "||analytics.twitter.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://analytics.twitter.com"
  },
  {
    "filters": [
      "||crazyegg.com^",
      "||crazyegg.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://sample.crazyegg.com"
  },
  {
    "filters": [
      "||gtrk.s3.amazonaws.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://gtrk.s3.amazonaws.com"
  },
  {
    "filters": [
      "||admedo.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://pool.admedo.com"
  },
  {
    "filters": [
      "||pix.impdesk.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://pix.impdesk.com"
  },
  {
    "filters": [
      "||eyeota.net^",
      "||eyeota.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ps.eyeota.net"
  },
  {
    "filters": [
      ".com/pv.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://pb.sogou.com/pv.gif?"
  },
  {
    "filters": [
      "||nexac.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://r.nexac.com"
  },
  {
    "filters": [
      "||ib-ibi.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://global.ib-ibi.com"
  },
  {
    "filters": [
      "/adsbygoogle."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
  },
  {
    "filters": [
      "||tidaltv.com^$third-party",
      "||tidaltv.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://sync.tidaltv.com"
  },
  {
    "filters": [
      "/delivery/spc.",
      "/spc.php"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://newrevive.detik.com/delivery/spc.php"
  },
  {
    "filters": [
      "/delivery/fl."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://newrevive.detik.com/delivery/fl.js"
  },
  {
    "filters": [
      "/hit.xiti?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://logws1363.ati-host.net/hit.xiti?"
  },
  {
    "filters": [
      "/LogAnalysisTracker/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.detik.net.id/LogAnalysisTracker/"
  },
  {
    "check": true,
    "filters": [
      "|https://$script,third-party,xmlhttprequest,domain=mediafire.com"
    ],
    "sourceUrl": "https://www.mediafire.com",
    "type": "script",
    "url": "https://"
  },
  {
    "filters": [
      "@@||ajax.googleapis.com^$script,domain=mediafire.com"
    ],
    "sourceUrl": "https://www.mediafire.com",
    "type": "script",
    "url": "https://ajax.googleapis.com"
  },
  {
    "filters": [
      "@@||ravenjs.com^$script,domain=mediafire.com"
    ],
    "sourceUrl": "https://www.mediafire.com",
    "type": "script",
    "url": "https://cdn.ravenjs.com"
  },
  {
    "filters": [
      "||fc2.com/counter_img.php?"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://media.fc2.com/counter_img.php?"
  },
  {
    "filters": [
      "||fc2.com/ana/"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://media3.fc2.com/ana/"
  },
  {
    "filters": [
      "/includes/ads/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://m.cricbuzz.com/includes/ads/"
  },
  {
    "filters": [
      "||google.*/gen204?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://translate.google.cn/gen204?"
  },
  {
    "filters": [
      "||sinaimg.cn/unipro/pub/"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.sinaimg.cn/unipro/pub/"
  },
  {
    "filters": [
      "||microad.net^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://j.microad.net"
  },
  {
    "filters": [
      "/468x60.",
      "468x60.gif|"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://click.sabavision.com/public/public/images/loadings/468x60.gif"
  },
  {
    "filters": [
      "||microadinc.com^$third-party",
      ".com/ad?"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://s-rtb.send.microadinc.com/ad?"
  },
  {
    "filters": [
      "||ds-aksb-a.akamaihd.net^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ds-aksb-a.akamaihd.net"
  },
  {
    "check": true,
    "filters": [
      "||pixel.adsafeprotected.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://pixel.adsafeprotected.com"
  },
  {
    "filters": [
      "||in.zog.link^"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://in.zog.link"
  },
  {
    "filters": [
      "||rfihub.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://c1.rfihub.net"
  },
  {
    "filters": [
      "||2mdn.net^$~object-subrequest,third-party",
      "||2mdn.net^",
      "||2mdn.net^$third-party,script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s0.2mdn.net"
  },
  {
    "filters": [
      "||t.sharethis.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://t.sharethis.com"
  },
  {
    "filters": [
      "||ml314.com^$third-party",
      "||ml314.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ml314.com"
  },
  {
    "filters": [
      "||su.addthis.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://su.addthis.com"
  },
  {
    "filters": [
      "@@||connect.facebook.net^$script,domain=mediafire.com"
    ],
    "sourceUrl": "https://www.mediafire.com",
    "type": "script",
    "url": "https://connect.facebook.net"
  },
  {
    "filters": [
      "/spacer.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://static.agkn.com/spacer.gif?"
  },
  {
    "filters": [
      "/delivery/lg."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://newrevive.detik.com/delivery/lg.php"
  },
  {
    "check": true,
    "filters": [
      "@@||tubecup.org^$xmlhttprequest,domain=txxx.com"
    ],
    "sourceUrl": "https://m.txxx.com",
    "type": "xhr",
    "url": "https://st.tubecup.org"
  },
  {
    "filters": [
      "@@||p.jwpcdn.com^$script,third-party",
      "@@||p.jwpcdn.com^$third-party,script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ssl.p.jwpcdn.com"
  },
  {
    "filters": [
      "/script/ads.",
      "/ads.js?"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://spdeliver.i-mobile.co.jp/script/ads.js?"
  },
  {
    "filters": [
      "||ru4.com^",
      "||ru4.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://msec.xp1.ru4.com"
  },
  {
    "filters": [
      "||smaato.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://soma.smaato.net"
  },
  {
    "filters": [
      "||acxiomapac.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://s.acxiomapac.com"
  },
  {
    "filters": [
      "||userreport.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://pdw-usr.userreport.com"
  },
  {
    "filters": [
      "||rkdms.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://mid.rkdms.com"
  },
  {
    "filters": [
      "||media.net^$third-party",
      "||media.net^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://contextual.media.net"
  },
  {
    "filters": [
      "||rqtrk.eu^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ws2.rqtrk.eu"
  },
  {
    "filters": [
      "||adsafety.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://tags.adsafety.net"
  },
  {
    "filters": [
      "@@||scorecardresearch.com/beacon.js$domain=agame.com|ahmedabadmirror.com|allmusic.com|amctv.com|apl.tv|babycenter.com|bonappetit.com|calgaryherald.com|canada.com|cbc.ca|dailymail.co.uk|deviantart.com|discovery.com|edmontonjournal.com|fastcompany.com|financialpost.com|firstwefeast.com|hitfix.com|huffingtonpost.com|indiatimes.com|investigationdiscovery.com|landandfarm.com|last.fm|leaderpost.com|m.tmz.com|montrealgazette.com|nationalpost.com|newsday.com|ottawacitizen.com|outsideonline.com|radaronline.com|salon.com|sci2.tv|syfy.com|theprovince.com|thestar.com|thestarphoenix.com|thinkatheist.com|tlc.com|tmz.com|v3.co.uk|vancouversun.com|windsorstar.com"
    ],
    "sourceUrl": "https://www.deviantart.com",
    "type": "script",
    "url": "https://sb.scorecardresearch.com/beacon.js"
  },
  {
    "filters": [
      "||discordapp.com^*/science"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://discordapp.com/api/science"
  },
  {
    "filters": [
      "||da-ads.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://www.da-ads.com"
  },
  {
    "filters": [
      "||360yield.com^$third-party",
      "||360yield.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ad.360yield.com"
  },
  {
    "filters": [
      "||semasio.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://uip.semasio.net"
  },
  {
    "filters": [
      "||liadm.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://i.liadm.com"
  },
  {
    "filters": [
      "?adzone=",
      "&adsize=",
      "=300x250&",
      "&advid=$~image"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.da-ads.com/ads.js?adzone=top&adsize=300x250&advid=1540302710304"
  },
  {
    "filters": [
      "||frog.wix.com^",
      "||frog.wix.com/da-client$image,redirect=1x1-transparent.gif,domain=deviantart.com"
    ],
    "sourceUrl": "https://www.deviantart.com",
    "type": "image",
    "url": "https://frog.wix.com/da-client"
  },
  {
    "filters": [
      "||ebaystatic.com^*/iam_"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://secureir.ebaystatic.com/cr/v/c1/iam_ebay_506_4.js"
  },
  {
    "filters": [
      "||ebaystatic.com^*/agof_survey_"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://secureir.ebaystatic.com/cr/v/c1/agof_survey_ebay_506.min.js"
  },
  {
    "filters": [
      "||ioam.de^",
      "||ioam.de/tx.io?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://de.ioam.de/tx.io?"
  },
  {
    "filters": [
      "/adcore_$domain=~adcore.ch|~adcore.com.au"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://spdeliver.i-mobile.co.jp/script/adcore_pc_inline.js"
  },
  {
    "filters": [
      "/ad_spot."
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://spnet2-1.i-mobile.co.jp/ad_spot.aspx"
  },
  {
    "filters": [
      "/prebid_$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://st.deviantart.net/css/prebid_jc.js"
  },
  {
    "filters": [
      "||appier.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://gocm.c.appier.net"
  },
  {
    "filters": [
      "||tm.jsuol.com.br^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tm.jsuol.com.br"
  },
  {
    "filters": [
      "_300x250_"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://api.grumft.com/gt/ZONA_IAB_300x250_2"
  },
  {
    "filters": [
      "||googletagservices.com/tag/js/gpt_$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.googletagservices.com/tag/js/gpt_mobile.js"
  },
  {
    "filters": [
      "||sonobi.com^$third-party",
      "||sonobi.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://apex.go.sonobi.com"
  },
  {
    "filters": [
      "_prebid_"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://ap.lijit.com/rtb/bid?src=prebid_prebid_1.18.0"
  },
  {
    "filters": [
      "||amung.us^",
      "||amung.us^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://whos.amung.us"
  },
  {
    "filters": [
      "/dfp/dfp-",
      "/dfp-gpt."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static.ettoday.net/dfp/dfp-gpt.js"
  },
  {
    "filters": [
      "/pagead/gen_"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://pagead2.googlesyndication.com/pagead/gen_204"
  },
  {
    "filters": [
      "||dapxl.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://dapxl.com"
  },
  {
    "filters": [
      "||googlesyndication.com/sodar/"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tpc.googlesyndication.com/sodar/"
  },
  {
    "check": true,
    "filters": [
      "||2mdn.net^$third-party,other"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://s0.2mdn.net"
  },
  {
    "filters": [
      "||creativecdn.com/tags?"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://asia.creativecdn.com/tags?"
  },
  {
    "filters": [
      "||2mdn.net^$third-party,image"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://s0.2mdn.net"
  },
  {
    "filters": [
      "||tm.uol.com.br^"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://tm.uol.com.br"
  },
  {
    "filters": [
      "||vimeocdn.com/js_opt/ablincoln_combined.min.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://f.vimeocdn.com/js_opt/ablincoln_combined.min.js"
  },
  {
    "filters": [
      "/ad/common/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://cdn.grumft.com/ad/common/"
  },
  {
    "filters": [
      ".net/ads.",
      "/ads.php"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ad.ettoday.net/ads.php"
  },
  {
    "filters": [
      "/promo/ads/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://static.licdn.com/scds/common/u/images/promo/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "script",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "||flagcounter.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://s07.flagcounter.com"
  },
  {
    "check": true,
    "filters": [
      "||vimeo.com^*?type=$ping"
    ],
    "sourceUrl": "https://",
    "type": "other",
    "url": "https://vimeo.com/ablincoln/fatal_attraction?type=pageview&target=%2F"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "check": true,
    "filters": [
      "||brealtime.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "https://cookie.brealtime.com"
  },
  {
    "check": true,
    "filters": [
      "||domdex.com^$third-party",
      "||domdex.com^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://magnetic.t.domdex.com"
  },
  {
    "filters": [
      "||s.pixfs.net/js/pixlogger.min.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s.pixfs.net/js/pixlogger.min.js"
  },
  {
    "filters": [
      "/fingerprint.min.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://front.pixfs.net/js/fingerprint.min.js"
  },
  {
    "filters": [
      "||googlesyndication.com/sadbundle/"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://tpc.googlesyndication.com/sadbundle/"
  },
  {
    "filters": [
      "||redintelligence.net^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://hal9000.redintelligence.net"
  },
  {
    "filters": [
      "||sbeacon.sina.com.cn/e.gif"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://sbeacon.sina.com.cn/e.gif"
  },
  {
    "filters": [
      "||tynt.com^",
      "||tynt.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tcr.tynt.com"
  },
  {
    "filters": [
      "/prebid.$script,domain=~prebid.org",
      "/prebid/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static.ettoday.net/ad/prebid/prebid.js"
  },
  {
    "filters": [
      ".za/ads/",
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.co.za",
    "type": "image",
    "url": "https://www.google.co.za/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.co.za",
    "type": "image",
    "url": "https://www.google.co.za/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.co.za",
    "type": "image",
    "url": "https://www.google.co.za/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.co.za",
    "type": "image",
    "url": "https://www.google.co.za/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.co.za",
    "type": "image",
    "url": "https://www.google.co.za/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.co.za",
    "type": "image",
    "url": "https://www.google.co.za/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.co.za",
    "type": "image",
    "url": "https://www.google.co.za/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.co.za",
    "type": "image",
    "url": "https://www.google.co.za/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.co.za",
    "type": "image",
    "url": "https://www.google.co.za/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.co.za",
    "type": "image",
    "url": "https://www.google.co.za/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.co.za",
    "type": "image",
    "url": "https://www.google.co.za/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.co.za",
    "type": "image",
    "url": "https://www.google.co.za/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.co.za",
    "type": "image",
    "url": "https://www.google.co.za/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.co.za",
    "type": "image",
    "url": "https://www.google.co.za/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "check": true,
    "filters": [
      "||doubleclick.net^*/trackimp/$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ad.doubleclick.net/ddm/trackimp/"
  },
  {
    "filters": [
      "||admaster.com.cn^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://v.admaster.com.cn"
  },
  {
    "filters": [
      "/addata.$domain=~addata.io"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tpc.googlesyndication.com/pagead/gadgets/html5/addata.js"
  },
  {
    "filters": [
      "||eyeviewads.com^$third-party",
      "||eyeviewads.com^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://track.eyeviewads.com"
  },
  {
    "filters": [
      "||vindicosuite.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://mpp.vindicosuite.com"
  },
  {
    "check": true,
    "filters": [
      "||cx.atdmt.com^",
      "||atdmt.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://cx.atdmt.com"
  },
  {
    "check": true,
    "filters": [
      "||amplify.outbrain.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://amplify.outbrain.com"
  },
  {
    "filters": [
      "/videojs.ads."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://player.ivideosmart.com/ivxplayer/v1/js/videojs.ads.js"
  },
  {
    "filters": [
      "/ads-2.",
      "/js/ads-",
      "@@||ads.nicovideo.jp/assets/js/ads-*.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ads.nicovideo.jp/assets/js/ads-2.28.3.min.js"
  },
  {
    "check": true,
    "filters": [
      "||ad.zanox.com^",
      "||zanox.com^",
      "||zanox.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "https://ad.zanox.com"
  },
  {
    "check": true,
    "filters": [
      "://banners.$third-party",
      "||banners.webmasterplan.com^$third-party",
      "||webmasterplan.com^",
      "||webmasterplan.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://banners.webmasterplan.com"
  },
  {
    "filters": [
      "://banner.$third-party"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "https://banner.congstar.de"
  },
  {
    "check": true,
    "filters": [
      "||zanox.com/ppv/$third-party"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "https://ad.zanox.com/ppv/"
  },
  {
    "filters": [
      "||myvisualiq.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://vt.myvisualiq.net"
  },
  {
    "filters": [
      "||indexww.com^$third-party",
      "||indexww.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://js-sec.indexww.com"
  },
  {
    "filters": [
      "/prebid-"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.cnn.com/ads/adfuel/modules/prebid-1.23.0.js"
  },
  {
    "filters": [
      "||ugdturner.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.ugdturner.com"
  },
  {
    "filters": [
      "/keypress.js$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://i.cdn.turner.com/ads/adfuel/modules/keypress.js"
  },
  {
    "filters": [
      ".io/ads."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tracking.imfast.io/ads.js"
  },
  {
    "filters": [
      "||postrelease.com^$third-party",
      "||postrelease.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://a.postrelease.com"
  },
  {
    "filters": [
      "||sharethrough.com^$third-party",
      "||sharethrough.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://native.sharethrough.com"
  },
  {
    "filters": [
      "||beemray.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cnn.sdk.beemray.com"
  },
  {
    "filters": [
      "/adsense/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.google.com/adsense/"
  },
  {
    "filters": [
      "||contentspread.net^$third-party",
      "_120x60."
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://cdn.contentspread.net/24i/pb_logo_120x60.gif"
  },
  {
    "filters": [
      "||ti.tradetracker.net^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://ti.tradetracker.net"
  },
  {
    "check": true,
    "filters": [
      "||doubleclick.net^*/ad/$~object-subrequest,third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ad.doubleclick.net/ddm/ad/"
  },
  {
    "filters": [
      "@@||translate.google.com^$script,domain=mediafire.com"
    ],
    "sourceUrl": "https://www.mediafire.com",
    "type": "script",
    "url": "https://translate.google.com"
  },
  {
    "filters": [
      "||twitter.com/oct.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://platform.twitter.com/oct.js"
  },
  {
    "filters": [
      "||static.tradetracker.net^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://static.tradetracker.net"
  },
  {
    "filters": [
      "@@||translate.googleapis.com^$script,domain=mediafire.com"
    ],
    "sourceUrl": "https://www.mediafire.com",
    "type": "script",
    "url": "https://translate.googleapis.com"
  },
  {
    "filters": [
      "||siftscience.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://b.siftscience.com"
  },
  {
    "filters": [
      "||bounceexchange.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tag.bounceexchange.com/340/i.js"
  },
  {
    "check": true,
    "filters": [
      "||amplifypixel.outbrain.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://amplifypixel.outbrain.com"
  },
  {
    "filters": [
      "/VisitorIdentification.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.niddk.nih.gov/layouts/system/VisitorIdentification.js"
  },
  {
    "check": true,
    "filters": [
      "||taboola.com^*/log/"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://trc.taboola.com/yahoojp-p4-c3-dl/log/"
  },
  {
    "filters": [
      "||haostat.qihoo.com^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://haostat.qihoo.com"
  },
  {
    "filters": [
      "/js/ads."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://cdn.diply.com/resources/js/ads.min.js"
  },
  {
    "filters": [
      "||digitalgov.gov/Universal-Federated-Analytics-Min.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://dap.digitalgov.gov/Universal-Federated-Analytics-Min.js"
  },
  {
    "filters": [
      "||foresee.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://gateway.foresee.com"
  },
  {
    "filters": [
      "/Criteo/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static.ettoday.net/ad/criteo/"
  },
  {
    "filters": [
      "||clickiocdn.com/t/common_"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s.clickiocdn.com/t/common_258.js"
  },
  {
    "filters": [
      "||usabilla.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://w.usabilla.com"
  },
  {
    "filters": [
      "/packed.analytics."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://mstatic.spankbang.com/static_mobile/gen/packed.analytics.f015fde7.js"
  },
  {
    "filters": [
      "||spankbang.com^*/mpop.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://mstatic.spankbang.com/static_mobile/JS/mpop.js"
  },
  {
    "filters": [
      "||proper.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://global.proper.io"
  },
  {
    "filters": [
      "||spoutable.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s.spoutable.com"
  },
  {
    "filters": [
      "||addthisedge.com/live/",
      "||m.addthisedge.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://m.addthisedge.com/live/"
  },
  {
    "filters": [
      "||addthis.com/live/"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://m.addthis.com/live/"
  },
  {
    "check": true,
    "filters": [
      "$xmlhttprequest,domain=adfreetv.ch|alltube.pl|alltube.tv|auroravid.to|catrumahminimalis.me|ddmix.net|dekoder.ws|estream.to|flashx.cc|freecontent.stream|leon08.tk|leon12.tk|leon16.tk|myeffect.net|nowvideo.sx|onlinevideoconverter.com|powvideo.net|sleeptimer.org|sorteosrd.com|streambeam.io|streamplay.top|szukajka.tv|tainies.online|vidfile.net|vidgg.to|wholecloud.net"
    ],
    "sourceUrl": "https://www.onlinevideoconverter.com",
    "type": "xhr",
    "url": "https://"
  },
  {
    "filters": [
      "||micpn.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://stlftx5f.micpn.com"
  },
  {
    "filters": [
      "||analytics.spankbang.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://analytics.spankbang.com"
  },
  {
    "filters": [
      "||googletagmanager.com/ns.html?$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://www.googletagmanager.com/ns.html?"
  },
  {
    "filters": [
      "-300x250-$~xmlhttprequest"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static.ettoday.net/ad/prebid/prebid-mw-300x250-2-cf.js"
  },
  {
    "filters": [
      "/www/delivery/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://a.spankbang.com/www/delivery/"
  },
  {
    "filters": [
      "||traffichunt.com^$third-party",
      "||traffichunt.com^"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://ads.traffichunt.com"
  },
  {
    "filters": [
      "||scupio.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://rec.scupio.com"
  },
  {
    "check": true,
    "filters": [
      "||rva.outbrain.com^",
      "/analytics-v1."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://rva.outbrain.com/analytics-v1.js"
  },
  {
    "filters": [
      "/dtagent_"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.onlinesbi.com/dtagent_ICA23egjrvx_6000500111012.js"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "script",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "||t.insigit.com^",
      "||insigit.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://t.insigit.com"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "/geoip_script?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.scribd.com/ssi/geoip_script?"
  },
  {
    "filters": [
      "/adsbytenmax."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tenmax-static.cacafly.net/ssp/adsbytenmax.js"
  },
  {
    "filters": [
      "||tenmax.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://dmp.tenmax.io"
  },
  {
    "filters": [
      "/publicidade.",
      "/publicidade/*"
    ],
    "sourceUrl": "https://",
    "type": "stylesheet",
    "url": "https://s3.glbimg.com/cdn/libs/publicidade/1.1.0/publicidade.css"
  },
  {
    "filters": [
      "||navdmp.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tag.navdmp.com"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "check": true,
    "filters": [
      "/ads2.",
      "||ads2.contentabc.com^",
      ".com/ads?"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://ads2.contentabc.com/ads?"
  },
  {
    "filters": [
      "/LogImpression."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ads.nicovideo.jp/api/OxBannerService/logImpression.jsonp"
  },
  {
    "check": true,
    "filters": [
      "||doublemax.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://ad.doublemax.net"
  },
  {
    "filters": [
      "||et.nytimes.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://et.nytimes.com"
  },
  {
    "filters": [
      "@@||g.doubleclick.net/gpt/pubads_impl_$script,domain=120sports.com|al.com|allmusic.com|beqala.com|blastingnews.com|bodas.com.mx|bodas.net|brandonsun.com|canoe.com|caranddriver.com|casamentos.com.br|casamentos.pt|casamiento.com.uy|casamientos.com.ar|cbsnews.com|cleveland.com|consequenceofsound.net|cwtv.com|daveramsey.com|deadspin.com|denofgeek.co|denofgeek.com|drupalcommerce.org|ebaumsworld.com|economist.com|ew.com|fastcompany.com|flightcentre.co.uk|foodkick.com|foxnews.com|gamespot.com|gawker.com|gizmodo.com|goalzz.com|greyhoundbet.racingpost.com|gsmarena.com|gulflive.com|independent.co.uk|indianexpress.com|investopedia.com|io9.com|jalopnik.com|jezebel.com|kotaku.com|latimes.com|lehighvalleylive.com|lifehacker.com|liverpoolfc.com|livescience.com|m.tmz.com|mardigras.com|mariages.net|marvel.com|masslive.com|matrimonio.com|matrimonio.com.co|matrimonio.com.pe|matrimonios.cl|merriam-webster.com|mlb.com|mlive.com|nauticexpo.com|nj.com|nola.com|noodle.com|nydailynews.com|nytimes.com|opb.org|orbitz.com|oregonlive.com|out.com|pennlive.com|phonearena.com|phoronix.com|pianobuyer.com|pocketnow.com|qz.com|ripley.cl|ripley.com.pe|seahawks.com|sendtonews.com|silive.com|syracuse.com|thesimsresource.com|thoughtcatalog.com|time.com|tmz.com|upi.com|urbandictionary.com|vanityfair.com|video.foxbusiness.com|vroomvroomvroom.com.au|washingtonexaminer.com|weather.com|weddingspot.co.uk|winnipegfreepress.com|wlj.net|wsj.com|wtop.com|wwe.com|zavvi.com|zdnet.com|zillow.com"
    ],
    "sourceUrl": "https://www.nytimes.com",
    "type": "script",
    "url": "https://securepubads.g.doubleclick.net/gpt/pubads_impl_266.js"
  },
  {
    "filters": [
      "/webad."
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://webad.fivecdm.com"
  },
  {
    "filters": [
      "||freshmarketer.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.freshmarketer.com/222317/774992.js"
  },
  {
    "filters": [
      "/ads/bz_"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://hw-cdn.contentabc.com/ads/bz_300x250_807417"
  },
  {
    "filters": [
      "/js/adv."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://wapv.sogou.com/style_2016/js/adv.min.js"
  },
  {
    "filters": [
      "/dynaTraceMonitor^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://www.onlinesbi.com/dynaTraceMonitor"
  },
  {
    "filters": [
      "||linkedin.com/analytics/"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.linkedin.com/analytics/"
  },
  {
    "filters": [
      "||im-apps.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://sync.im-apps.net"
  },
  {
    "filters": [
      "||perimeterx.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://client.perimeterx.net"
  },
  {
    "filters": [
      "||adingo.jp^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn-fluct.sh.adingo.jp"
  },
  {
    "filters": [
      "||ssp.hinet.net^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://t.ssp.hinet.net"
  },
  {
    "filters": [
      "||fqtag.com^",
      "||fqtag.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://s.fqtag.com"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "script",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "||innity.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://as.innity.com"
  },
  {
    "filters": [
      "||hexagon-analytics.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://hexagon-analytics.com"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "||ipify.org^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://api.ipify.org"
  },
  {
    "filters": [
      "/count.php?"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://mb.dkn.tv/counter/count.php?"
  },
  {
    "filters": [
      "||exoclick.com^$third-party",
      "||exoclick.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://syndication.exoclick.com"
  },
  {
    "filters": [
      "||googletagservices.com/dcm/dcmads.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.googletagservices.com/dcm/dcmads.js"
  },
  {
    "filters": [
      "/clickm.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://clickm.fang.com/click/new/clickm.js"
  },
  {
    "filters": [
      "||d1z2jf7jlzjs58.cloudfront.net^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://d1z2jf7jlzjs58.cloudfront.net"
  },
  {
    "filters": [
      "||s.360.cn^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://s.360.cn"
  },
  {
    "filters": [
      "||ads.yap.yahoo.com^",
      "/getads."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ads.yap.yahoo.com/nosdk/wj/v1/getAds.do"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "script",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "||netseer.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://cm.netseer.com"
  },
  {
    "filters": [
      "||ctnsnet.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://cm.ctnsnet.com"
  },
  {
    "filters": [
      "||parsely.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://srv-2018-10-23-13.config.parsely.com"
  },
  {
    "filters": [
      "/horizon-track."
    ],
    "sourceUrl": "https://",
    "type": "other",
    "url": "https://horizon-track.globo.com"
  },
  {
    "check": true,
    "filters": [
      "||traffichaus.com^$third-party",
      "/adserve/*"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://syndication.traffichaus.com/adserve/"
  },
  {
    "filters": [
      "||admixer.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://inv-nets.admixer.net"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||d1z2jf7jlzjs58.cloudfront.net/p.js$script,domain=nfl.com"
    ],
    "sourceUrl": "https://www.nfl.com",
    "type": "script",
    "url": "https://d1z2jf7jlzjs58.cloudfront.net/p.js"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "||pixel.parsely.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://srv-2018-10-23-13.pixel.parsely.com"
  },
  {
    "check": true,
    "filters": [
      "||adstatic.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://vip.adstatic.com"
  },
  {
    "filters": [
      "||globo.com/geo?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://api.globo.com/geo?"
  },
  {
    "filters": [
      "||chartbeat.net^",
      "||chartbeat.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://mabping.chartbeat.net"
  },
  {
    "filters": [
      "||ad-m.asia^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://sync-dsp.ad-m.asia"
  },
  {
    "filters": [
      "||rotumal.com^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.rotumal.com"
  },
  {
    "filters": [
      "||connextra.com^$third-party",
      "||connextra.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://zz.connextra.com"
  },
  {
    "check": true,
    "filters": [
      "@@||ypncdn.com/cb/assets/js/$script,domain=youporn.com|youporngay.com|youpornru.com"
    ],
    "sourceUrl": "https://www.youporn.com",
    "type": "script",
    "url": "https://fs.ypncdn.com/cb/assets/js/"
  },
  {
    "check": true,
    "filters": [
      "@@||ypncdn.com^$image,media,other,domain=youporn.com|youporngay.com|youpornru.com"
    ],
    "sourceUrl": "https://www.youporn.com",
    "type": "image",
    "url": "https://fs.ypncdn.com"
  },
  {
    "filters": [
      "||deliver.ifeng.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://iis1.deliver.ifeng.com"
  },
  {
    "check": true,
    "filters": [
      ".co/ads/"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.google.com.co/ads/"
  },
  {
    "filters": [
      "/300x600-"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://s0.2mdn.net/5546726/300x600-Brand2.gif"
  },
  {
    "filters": [
      "||youporn.com^$script,domain=youporn.com"
    ],
    "sourceUrl": "https://www.youporn.com",
    "type": "script",
    "url": "https://ht.youporn.com"
  },
  {
    "filters": [
      "||nytimes.com^*/data-layer?"
    ],
    "sourceUrl": "https://",
    "type": "fetch",
    "url": "https://a.nytimes.com/svc/nyt/data-layer?"
  },
  {
    "filters": [
      "||bkrtx.com^$third-party",
      "/bk-coretag.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tags.bkrtx.com/js/bk-coretag.js"
  },
  {
    "filters": [
      "/show-ads."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://a1.nyt.com/analytics/show-ads.js"
  },
  {
    "filters": [
      "||cnzz.com^$third-party",
      "||cnzz.com/c.php?"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://w.cnzz.com/c.php?"
  },
  {
    "filters": [
      "||swiftypecdn.com/cc.js$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s.swiftypecdn.com/cc.js"
  },
  {
    "filters": [
      "||cc.swiftype.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://cc.swiftype.com"
  },
  {
    "filters": [
      "||baidu.com/h.js?"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://hm.baidu.com/h.js?"
  },
  {
    "filters": [
      "://adv.$domain=~adv.cincsys.com|~adv.co.it|~adv.derfunke.at|~adv.ee|~adv.gg|~adv.michaelgat.com|~adv.msk.ru|~adv.ru|~adv.vg|~adv.works|~advids.co|~erti.se|~escreverdireito.com|~farapp.com|~forex-tv-online.com|~r7.com|~typeform.com|~welaika.com"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://adv.office-partner.de"
  },
  {
    "check": true,
    "filters": [
      "|https://$script,domain=yts.am",
      ".com/ntfc.php?$script"
    ],
    "sourceUrl": "https://yts.am",
    "type": "script",
    "url": "https://pushno.com/ntfc.php?"
  },
  {
    "check": true,
    "filters": [
      "@@||ajax.cloudflare.com/cdn-cgi/scripts/$script,third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ajax.cloudflare.com/cdn-cgi/scripts/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "script",
    "url": "https://www.google.com/ads/"
  },
  {
    "check": true,
    "filters": [
      "@@||yts.am/assets/minified/modded1.js$script,first-party"
    ],
    "sourceUrl": "https://yts.am",
    "type": "script",
    "url": "https://yts.am/assets/minified/modded1.js"
  },
  {
    "check": true,
    "filters": [
      "||oclasrv.com^$third-party",
      "||oclasrv.com^",
      ".php?zoneid=",
      "||go.oclasrv.com/apu.php$script,redirect=noopjs"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://go.oclasrv.com/apu.php?zoneid=1655784"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "||doublepimpssl.com^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.doublepimpssl.com"
  },
  {
    "filters": [
      "||nextoptim.com^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.nextoptim.com"
  },
  {
    "filters": [
      "||miaozhen.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://g.cn.miaozhen.com"
  },
  {
    "filters": [
      "||cnzz.com/stat.",
      "/stat.htm?"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://q14.cnzz.com/stat.htm?"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "script",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "||vimeocdn.com/add/player-stats?"
    ],
    "sourceUrl": "https://",
    "type": "other",
    "url": "https://fresnel.vimeocdn.com/add/player-stats?"
  },
  {
    "filters": [
      "||inmobi.com^$third-party",
      "||inmobi.com^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://cf.cdn.inmobi.com"
  },
  {
    "filters": [
      "||globalwebindex.net^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://gwiqcdn.globalwebindex.net"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "||mediaforge.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tags.mediaforge.com"
  },
  {
    "filters": [
      "/track/pix2.asp?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www2.smartadserver.com/track/pix2.asp?"
  },
  {
    "filters": [
      "||innovid.com^$third-party",
      "||innovid.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ag.innovid.com"
  },
  {
    "filters": [
      "||gemius.pl^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://googlecm.hit.gemius.pl"
  },
  {
    "filters": [
      "/afr.php?",
      "/delivery/afr."
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://a.spankbang.com/www/delivery/afr.php?"
  },
  {
    "filters": [
      "/horizon-pageview?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://horizon.globo.com/auth-session/activity/home_2016/horizon-pageview?"
  },
  {
    "filters": [
      "||treasuredata.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.treasuredata.com"
  },
  {
    "filters": [
      "||vimeo.com/log/"
    ],
    "sourceUrl": "https://",
    "type": "other",
    "url": "https://player.vimeo.com/log/"
  },
  {
    "filters": [
      "||scanscout.com^$third-party",
      "||scanscout.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://dt.scanscout.com"
  },
  {
    "filters": [
      "||sociaplus.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://bukalapak.api.sociaplus.com"
  },
  {
    "filters": [
      "/gweb/analytics/*",
      "/autotrack.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.google.com/js/gweb/analytics/autotrack.js"
  },
  {
    "filters": [
      "/quantcast/*"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://www.ladbible.com/assets/images/quantcast/"
  },
  {
    "filters": [
      "||contentfeed.net^$third-party",
      "/adv_banner_"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://banners.contentfeed.net/12515/ADV_Banner_49.jpg"
  },
  {
    "filters": [
      "||6sc.co^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://j.6sc.co"
  },
  {
    "filters": [
      "/img.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://b.6sc.co/v1/beacon/img.gif?"
  },
  {
    "filters": [
      "@@||g.doubleclick.net/gpt/pubads_impl_$script,domain=concursovirtual.com.br|forum.kooora.com|lavozdegalicia.es|payback.pl|posta.com.tr|uol.com.br"
    ],
    "sourceUrl": "https://www.uol.com.br",
    "type": "script",
    "url": "https://securepubads.g.doubleclick.net/gpt/pubads_impl_266.js"
  },
  {
    "filters": [
      "||tailtarget.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tt-10162-1.seg.t.tailtarget.com"
  },
  {
    "filters": [
      "||shared.65twenty.com^"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "https://shared.65twenty.com"
  },
  {
    "check": true,
    "filters": [
      "@@||yts.am/assets/minified/modded1.js$script,first-party"
    ],
    "sourceUrl": "https://yts.am",
    "type": "script",
    "url": "https://yts.am/assets/minified/modded1.js"
  },
  {
    "filters": [
      "||ero-advertising.com^*/banners/"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://data.ero-advertising.com/datanew/banners/"
  },
  {
    "filters": [
      "||counter.snackly.co^"
    ],
    "sourceUrl": "https://",
    "type": "other",
    "url": "https://counter.snackly.co"
  },
  {
    "filters": [
      "/gscounters."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://gscounters.us1.gigya.com"
  },
  {
    "filters": [
      "/commercial/sponsor/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://static.theguardian.com/commercial/sponsor/"
  },
  {
    "filters": [
      "/advertiser/*$domain=~affili.net|~affiliprint.com|~bingads.microsoft.com|~linkpizza.com|~mobileapptracking.com|~trialpay.com"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://cdn.contentspread.net/24i/advertiser/"
  },
  {
    "filters": [
      "||stroeerdigitalmedia.de^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.stroeerdigitalmedia.de"
  },
  {
    "filters": [
      "||stroeerdigitalgroup.de/metatag/$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.stroeerdigitalgroup.de/metatag/"
  },
  {
    "filters": [
      "||phar.gu-web.net^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://phar.gu-web.net"
  },
  {
    "filters": [
      "/werbemittel/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.twin-media.de/banner/zoro/Werbemittel/"
  },
  {
    "check": true,
    "filters": [
      "||webgains.com/link.html$third-party",
      "||webgains.com^",
      "||webgains.com^$third-party",
      "||track.webgains.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://track.webgains.com/link.html"
  },
  {
    "filters": [
      ".com/x.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://shunfei-cm.cn.miaozhen.com/x.gif?"
  },
  {
    "filters": [
      "||mxcdn.net^$third-party",
      "/serve/mtrcs_"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s400.mxcdn.net/bb-mx/serve/mtrcs_679600.js"
  },
  {
    "filters": [
      "||m6r.eu^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://tracking.m6r.eu"
  },
  {
    "filters": [
      "||nuggad.net^",
      "||nuggad.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://si.nuggad.net"
  },
  {
    "check": true,
    "filters": [
      "||fullstory.com^$third-party",
      "||fullstory.com/s/fs.js$script",
      "||fullstory.com^",
      "||fullstory.com/s/fs.js$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://fullstory.com/s/fs.js"
  },
  {
    "filters": [
      "@@||evidon.com/geo/*$script,domain=cnet.com|marieclaire.com|techrepublic.com|zdnet.com"
    ],
    "sourceUrl": "https://www.cnet.com",
    "type": "script",
    "url": "https://c.evidon.com/geo/"
  },
  {
    "filters": [
      "/v60.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://secure-au.imrworldwide.com/v60.js"
  },
  {
    "filters": [
      "||meetrics.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://lb17.s400.meetrics.net"
  },
  {
    "filters": [
      "||dc8xl0ndzn2cb.cloudfront.net^",
      "||cloudfront.net*/keywee.min.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://dc8xl0ndzn2cb.cloudfront.net/js/theladbiblecom/v0/keywee.min.js"
  },
  {
    "filters": [
      "||adscale.de^$third-party",
      "||adscale.de^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://js.adscale.de"
  },
  {
    "filters": [
      "||theadex.com^",
      "||theadex.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://dmp.theadex.com"
  },
  {
    "filters": [
      "||ibillboard.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://bbcdn-bbnaut.ibillboard.com"
  },
  {
    "filters": [
      "||emetriq.de^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.emetriq.de"
  },
  {
    "filters": [
      "||go-mpulse.net^$third-party",
      "@@||go-mpulse.net/boomerang/$script,domain=cnet.com"
    ],
    "sourceUrl": "https://www.cnet.com",
    "type": "script",
    "url": "https://c.go-mpulse.net/boomerang/"
  },
  {
    "filters": [
      "/300x250-"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://s0.2mdn.net/6785415/300x250-FK-herbst.gif"
  },
  {
    "check": true,
    "filters": [
      "||track.adform.net^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://track.adform.net"
  },
  {
    "check": true,
    "filters": [
      "@@||yts.am/assets/minified/modded1.js$script,first-party"
    ],
    "sourceUrl": "https://yts.am",
    "type": "script",
    "url": "https://yts.am/assets/minified/modded1.js"
  },
  {
    "filters": [
      "||marketing.alibaba.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://marketing.alibaba.com"
  },
  {
    "check": true,
    "filters": [
      "||velocecdn.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://velocecdn.com/script/native_render.js"
  },
  {
    "filters": [
      "_dfp_targeting."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.roiq-vice.ranker.com/client/assets/minified/roiq_dfp_targeting.js"
  },
  {
    "check": true,
    "filters": [
      "||buzzadnetwork.com^$third-party",
      "/a/display.php?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://buzzadnetwork.com/a/display.php?"
  },
  {
    "filters": [
      "||cookiex.ngd.yahoo.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://cookiex.ngd.yahoo.com"
  },
  {
    "filters": [
      "||maxymiser.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://service.maxymiser.net"
  },
  {
    "filters": [
      "||rutarget.ru^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://google-sync.rutarget.ru"
  },
  {
    "filters": [
      "/criteo."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://cmap.alibaba.com/criteo.gif"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~imagebam.com|~japan-guide.com|~linkedin.com|~mediaplex.com|~sitioswebmexi.com|~online.wsj.com",
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "filters": [
      "||wikihow.com/x/collect?"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://m.wikihow.com/x/collect?"
  },
  {
    "filters": [
      "||visualdna.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://e.visualdna.com"
  },
  {
    "filters": [
      "/Maxymiser/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://a248.e.akamai.net/assets.huluim.com/maxymiser/"
  },
  {
    "filters": [
      "/dynamic_ytrack_"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://liveramp.sync.yume.com/tracker/dynamic_ytrack_sync"
  },
  {
    "filters": [
      "||dynad.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "font",
    "url": "https://static.dynad.net"
  },
  {
    "check": true,
    "filters": [
      "@@||thumbs-cdn.redtube.com^$image,domain=redtube.com|redtube.com.br"
    ],
    "sourceUrl": "https://www.redtube.com",
    "type": "image",
    "url": "https://thumbs-cdn.redtube.com"
  },
  {
    "check": true,
    "filters": [
      "@@||redtube.com^*/media/videos/$image"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://thumbs-cdn.redtube.com/m=e4L18f/media/videos/"
  },
  {
    "check": true,
    "filters": [
      "@@||rdtcdn.com^$image,media,other,domain=redtube.com|redtube.com.br"
    ],
    "sourceUrl": "https://www.redtube.com",
    "type": "image",
    "url": "https://ei-ph.rdtcdn.com"
  },
  {
    "filters": [
      "||doubleverify.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.doubleverify.com"
  },
  {
    "filters": [
      ".io/track?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://w-it.m-t.io/track?"
  },
  {
    "filters": [
      ".com/p.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://perf.mmstat.com/p.gif?"
  },
  {
    "filters": [
      "||doubleclick.net^*/adj/$~object-subrequest,third-party",
      "||ad.doubleclick.net^$third-party,script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ad.doubleclick.net/ddm/adj/"
  },
  {
    "filters": [
      "/mtiFontTrackingCode."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://vice-web-statics-cdn.vice.com/fonts/mtiFontTrackingCode.js"
  },
  {
    "filters": [
      "||naver.net/wcslog.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://wcs.naver.net/wcslog.js"
  },
  {
    "check": true,
    "filters": [
      "||statcounter.com^$third-party",
      "||statcounter.com^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.statcounter.com"
  },
  {
    "filters": [
      "||tracker.bt.uol.com.br^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tracker.bt.uol.com.br"
  },
  {
    "filters": [
      "||wcs.naver.com^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://wcs.naver.com"
  },
  {
    "filters": [
      "/omniture/visitorapi.",
      "/VisitorAPI.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://p.nfltags.com/omniture/VisitorAPI.js"
  },
  {
    "filters": [
      "/scripts/ad."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://s.nflcdn.com/static/site/7.5/scripts/ad.js"
  },
  {
    "check": true,
    "filters": [
      "|ws://$other,domain=pornhub.com|redtube.com|redtube.com.br|tube8.com|tube8.es|tube8.fr|xtube.com|youporn.com|youporngay.com"
    ],
    "sourceUrl": "https://www.youporn.com",
    "type": "other",
    "url": "https://"
  },
  {
    "filters": [
      "/ad.min."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://t1.daumcdn.net/adfit/static/ad.min.js"
  },
  {
    "filters": [
      "/google_analytics_"
    ],
    "sourceUrl": "https://",
    "type": "fetch",
    "url": "https://secure.hulu.com/api/4.0/site_config/dev/google_analytics_config"
  },
  {
    "filters": [
      "||daumcdn.net/tiara/"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://m2.daumcdn.net/tiara/"
  },
  {
    "filters": [
      "||meter-svc.nytimes.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://meter-svc.nytimes.com"
  },
  {
    "filters": [
      "||pswec.com/px/$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://n.pswec.com/px/"
  },
  {
    "check": true,
    "filters": [
      "@@||yts.am/assets/minified/modded1.js$script,first-party"
    ],
    "sourceUrl": "https://yts.am",
    "type": "script",
    "url": "https://yts.am/assets/minified/modded1.js"
  },
  {
    "filters": [
      "?adspot_"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://nt.compass-fit.jp/lift_widget.js?adspot_id=4274010"
  },
  {
    "filters": [
      "||adxvip.com^$third-party",
      "/CookieMapping?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://cm.adxvip.com/CookieMapping?"
  },
  {
    "filters": [
      "||flashtalking.com^$third-party",
      "||flashtalking.com^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://servedby.flashtalking.com"
  },
  {
    "filters": [
      "||static.parsely.com^$third-party",
      "@@||static.parsely.com/p.js$script,domain=nfl.com"
    ],
    "sourceUrl": "http://www.nfl.com",
    "type": "script",
    "url": "http://static.parsely.com/p.js"
  },
  {
    "filters": [
      "||t.pswec.com^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://t.pswec.com"
  },
  {
    "filters": [
      "/rest/analytics/*"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://explore.researchgate.net/rest/analytics/"
  },
  {
    "filters": [
      "||innity.net^$third-party",
      "/admanager.$~object-subrequest,domain=~admanager.google.com"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.innity.net/admanager.js"
  },
  {
    "filters": [
      "||logly.co.jp^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://l.logly.co.jp"
  },
  {
    "filters": [
      "||fastapi.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://cm.fastapi.net"
  },
  {
    "filters": [
      "||adsymptotic.com^",
      "||adsymptotic.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://p.adsymptotic.com"
  },
  {
    "filters": [
      "||googlesyndication.com/ddm/"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ade.googlesyndication.com/ddm/"
  },
  {
    "check": true,
    "filters": [
      "||cdn.taboola.com/libtrc/*/loader.js$script,redirect=noopjs,important,domain=cnet.com"
    ],
    "sourceUrl": "https://www.cnet.com",
    "type": "script",
    "url": "https://cdn.taboola.com/libtrc/cbsinteractive-cnet/loader.js"
  },
  {
    "filters": [
      "||dw.cbsi.com^$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://dw.cbsi.com"
  },
  {
    "filters": [
      "||tru.am^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tru.am"
  },
  {
    "filters": [
      "||tealiumiq.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://collect.tealiumiq.com"
  },
  {
    "filters": [
      "||segment.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://api.segment.io"
  },
  {
    "filters": [
      ".com/ad.$domain=~ad-tuning.de"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://web-scripts.vice.com/ad.vice.com"
  },
  {
    "filters": [
      "||analytics.mlstatic.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://analytics.mlstatic.com"
  },
  {
    "filters": [
      "@@||dw.cbsi.com/anonc.js$domain=cnet.com|gamespot.com|giantbomb.com"
    ],
    "sourceUrl": "https://www.cnet.com",
    "type": "script",
    "url": "https://dw.cbsi.com/anonc.js"
  },
  {
    "filters": [
      "||trowel.twitch.tv^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://trowel.twitch.tv"
  },
  {
    "filters": [
      "||tubemogul.com^$third-party",
      "||tubemogul.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://psi.tubemogul.com"
  },
  {
    "filters": [
      "/asyncjs.$domain=~asyncjs.com"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://revive.outin.cn/www/gtr/asyncjs.php"
  },
  {
    "filters": [
      "||sinajs.cn/open/analytics/",
      "/analytics/js/*"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://tjs.sjs.sinajs.cn/open/analytics/js/"
  },
  {
    "filters": [
      "/prebid?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://rtb.openx.net/sync/prebid?"
  },
  {
    "filters": [
      "/clear/c.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://dw.cbsi.com/clear/c.gif?"
  },
  {
    "filters": [
      "||perfectmarket.com^$third-party",
      "||widget.perfectmarket.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://widget.perfectmarket.com"
  },
  {
    "filters": [
      "/load.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://dejavu.mercadolibre.com/load.gif?"
  },
  {
    "filters": [
      "||mercadoclics.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://dejavu.mercadoclics.com"
  },
  {
    "filters": [
      "||dejavu.mlapps.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://dejavu.mlapps.com"
  },
  {
    "filters": [
      "||dejavu.mercadolivre.com.br^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://dejavu.mercadolivre.com.br"
  },
  {
    "filters": [
      "||track.tiara.daum.net^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://track.tiara.daum.net"
  },
  {
    "filters": [
      "/display.ad."
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://display.ad.daum.net"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "filters": [
      "/adscale.$domain=~adscale.com"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://adscale.nuggad.net"
  },
  {
    "filters": [
      "/Nuggad?"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://ih.adscale.de/adscale-ih/nuggad?"
  },
  {
    "filters": [
      "||rs.sinajs.cn^",
      ".cn/b.gif?"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://rs.sinajs.cn/b.gif?"
  },
  {
    "filters": [
      "||lndata.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://cm.lndata.com"
  },
  {
    "filters": [
      "||dna.uol.com.br^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://dna.uol.com.br"
  },
  {
    "filters": [
      "/vglnk.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.viglink.com/api/vglnk.js"
  },
  {
    "check": true,
    "filters": [
      "@@||yts.am/assets/minified/modded1.js$script,first-party"
    ],
    "sourceUrl": "https://yts.am",
    "type": "script",
    "url": "https://yts.am/assets/minified/modded1.js"
  },
  {
    "filters": [
      "/adrequisitor-",
      "/logclick."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://adrequisitor-af.lp.uol.com.br/logClick.js"
  },
  {
    "filters": [
      "||client-event-reporter.twitch.tv^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://client-event-reporter.twitch.tv"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "filters": [
      "@@||alicdn.com/retcode/log/log.js$script,domain=alibaba.com"
    ],
    "sourceUrl": "https://m.alibaba.com",
    "type": "script",
    "url": "https://g.alicdn.com/retcode/log/log.js"
  },
  {
    "check": true,
    "filters": [
      "||partner.googleadservices.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://partner.googleadservices.com"
  },
  {
    "filters": [
      "||viglink.com/images/pixel.gif"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://cdn.viglink.com/images/pixel.gif"
  },
  {
    "filters": [
      "/akam/10/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.ikea.com/akam/10/"
  },
  {
    "filters": [
      "/compiled/ads-"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://assets.genius.com/javascripts/compiled/ads-8e526b9fc894f094e1dc.js"
  },
  {
    "filters": [
      "||akstat.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "other",
    "url": "https://22f6a935.akstat.io"
  },
  {
    "filters": [
      "||yieldmanager.com^$third-party",
      "||yieldmanager.com^",
      "/pixel?id="
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ad.yieldmanager.com/pixel?id=2261190&t=2"
  },
  {
    "filters": [
      "||fastclick.net^$third-party",
      "||fastclick.net^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://secure.fastclick.net"
  },
  {
    "check": true,
    "filters": [
      "||taboola.com/tb?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://15.taboola.com/tb?"
  },
  {
    "filters": [
      "||viglink.com/api/ping$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://api.viglink.com/api/ping"
  },
  {
    "filters": [
      "||2mdn.net^$third-party,stylesheet"
    ],
    "sourceUrl": "https://",
    "type": "stylesheet",
    "url": "https://s0.2mdn.net"
  },
  {
    "filters": [
      "/akam/*/pixel_"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://www.ikea.com/akam/10/pixel_6ca16ab6"
  },
  {
    "filters": [
      "||entitlements.jwplayer.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "xhr",
    "url": "http://entitlements.jwplayer.com"
  },
  {
    "filters": [
      "/analytics.ad."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://analytics.ad.daum.net"
  },
  {
    "filters": [
      "/ad/load."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.kixer.com/ad/load.js"
  },
  {
    "filters": [
      "||geoservice.curse.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://geoservice.curse.com"
  },
  {
    "filters": [
      "||brand-display.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://tr.brand-display.com"
  },
  {
    "filters": [
      "||gtags.net^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://cms.gtags.net"
  },
  {
    "filters": [
      "@@||google-analytics.com/analytics.js$script,domain=developers.google.com"
    ],
    "sourceUrl": "https://developers.google.com",
    "type": "script",
    "url": "https://www.google-analytics.com/analytics.js"
  },
  {
    "filters": [
      "||ssp.rambler.ru^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ssp.rambler.ru"
  },
  {
    "filters": [
      "||livejournal.com/ljcounter/?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://xc3.services.livejournal.com/ljcounter/?"
  },
  {
    "filters": [
      "||d1xfq2052q7thw.cloudfront.net^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://d1xfq2052q7thw.cloudfront.net"
  },
  {
    "filters": [
      "/asyncspc."
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://revive.outin.cn/www/gtr/asyncspc.php"
  },
  {
    "filters": [
      "/adplayer/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://t1.daumcdn.net/biz/ui/adplayer/"
  },
  {
    "check": true,
    "filters": [
      "@@||yts.am/assets/minified/modded1.js$script,first-party"
    ],
    "sourceUrl": "https://yts.am",
    "type": "script",
    "url": "https://yts.am/assets/minified/modded1.js"
  },
  {
    "filters": [
      "||ads.adfox.ru^",
      "||adfox.ru^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ads.adfox.ru"
  },
  {
    "filters": [
      "||d2na2p72vtqyok.cloudfront.net^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://d2na2p72vtqyok.cloudfront.net"
  },
  {
    "filters": [
      "-contrib-ads/"
    ],
    "sourceUrl": "https://",
    "type": "stylesheet",
    "url": "https://cdnjs.cloudflare.com/ajax/libs/videojs-contrib-ads/"
  },
  {
    "filters": [
      "/cross_pixels."
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://dejavu.mercadolivre.com.br/cross_pixels.js"
  },
  {
    "filters": [
      "||insticator.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://geoip.insticator.com"
  },
  {
    "filters": [
      "||awaps.yandex.ru^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://awaps.yandex.ru"
  },
  {
    "filters": [
      "/adfox/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://an.yandex.ru/mapuid/adfox/"
  },
  {
    "filters": [
      "||px.dynamicyield.com^",
      "||px.dynamicyield.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://px.dynamicyield.com"
  },
  {
    "filters": [
      "||rambler.ru/cnt/"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://kraken.rambler.ru/cnt/"
  },
  {
    "filters": [
      "||serving-sys.com/BurstingPipe/$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://bs.serving-sys.com/BurstingPipe/"
  },
  {
    "filters": [
      "/ad-server."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ad-server.eu"
  },
  {
    "filters": [
      "||adform.net/banners/$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://s1.adform.net/Banners/"
  },
  {
    "filters": [
      "/librato-collector."
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://librato-collector.genius.com"
  },
  {
    "filters": [
      "||rxthdr.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://pa.rxthdr.com"
  },
  {
    "filters": [
      "||directadvert.ru^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://code.directadvert.ru"
  },
  {
    "filters": [
      ".com/doubleclick/"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://dclk-match.dotomi.com/doubleclick/"
  },
  {
    "check": true,
    "filters": [
      "/adserver.$~xmlhttprequest"
    ],
    "sourceUrl": "https://",
    "type": "other",
    "url": "https://bs.serving-sys.com/BurstingPipe/adServer.bs"
  },
  {
    "filters": [
      "||dailymail.co.uk/rta2/"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://scripts.dailymail.co.uk/rta2/"
  },
  {
    "filters": [
      "@@||dailymail.co.uk/abe/$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.dailymail.co.uk/abe/"
  },
  {
    "filters": [
      "||serving-sys.com/BurstingRes/$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://secure-ds.serving-sys.com/BurstingRes/"
  },
  {
    "filters": [
      "||summerhamster.com^$third-party",
      "/bcn?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.summerhamster.com/bcn?"
  },
  {
    "filters": [
      "||ted.dailymail.co.uk^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://ted.dailymail.co.uk"
  },
  {
    "filters": [
      "||t.dailymail.co.uk^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://t.dailymail.co.uk"
  },
  {
    "check": true,
    "filters": [
      "/google-analytics.$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://google-analytics.com"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "filters": [
      "||stargame.com/g.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://gg.stargame.com/g.js"
  },
  {
    "filters": [
      "||cloudfront.net*/sp.js|"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://d1fc8wv8zag5ca.cloudfront.net/2.9.0/sp.js"
  },
  {
    "filters": [
      "||scarabresearch.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://recommender.scarabresearch.com"
  },
  {
    "filters": [
      "||geoip-lookup.vice.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://geoip-lookup.vice.com"
  },
  {
    "filters": [
      "||zdbb.net^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://cdn.static.zdbb.net"
  },
  {
    "filters": [
      "||convertexperiments.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn-3.convertexperiments.com"
  },
  {
    "filters": [
      "||ynuf.alibaba.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ynuf.alibaba.com"
  },
  {
    "filters": [
      "||rnet.plus^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://api.rnet.plus"
  },
  {
    "filters": [
      ".snowplowanalytics.$domain=~snowplowanalytics.com"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://clickstream2.digikala.com/com.snowplowanalytics.snowplow"
  },
  {
    "filters": [
      "||duckduckgo.com/t/"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://improving.duckduckgo.com/t/"
  },
  {
    "filters": [
      "/rpc/preccount?"
    ],
    "sourceUrl": "https://",
    "type": "fetch",
    "url": "https://de.indeed.com/m/rpc/preccount?"
  },
  {
    "filters": [
      "||sokrati.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://cdn.chuknu.sokrati.com/22623/tracker.js"
  },
  {
    "filters": [
      "||forkcdn.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://impulse.forkcdn.com"
  },
  {
    "filters": [
      "-300x250_"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://s0.2mdn.net/8229649/1-300x250_3sapatilhas99_kvverao.jpg"
  },
  {
    "filters": [
      "||tracking.sokrati.com^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://tracking.sokrati.com"
  },
  {
    "filters": [
      "||adro.co^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://api.adro.co"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "filters": [
      "||variti.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://bael5.variti.net"
  },
  {
    "filters": [
      "/300x250_"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://s0.2mdn.net/8229649/300x250_3-sapat_nis-99_kv_gnenerico.jpg"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "filters": [
      "||sync.rambler.ru^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://sync.rambler.ru"
  },
  {
    "filters": [
      "/adchoice_"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://s.yimg.com/lq/lib/can_interstitial/icons/adchoice_1.4.png"
  },
  {
    "filters": [
      "||beacon.walmart.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://beacon.walmart.com"
  },
  {
    "filters": [
      "/rpc/log?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://gdc.indeed.com/rpc/log?"
  },
  {
    "filters": [
      "@@||ensighten.com^*/scode/$script,domain=norton.com"
    ],
    "sourceUrl": "https://safeweb.norton.com",
    "type": "script",
    "url": "https://nexus.ensighten.com/symantec/scode/"
  },
  {
    "filters": [
      "||b2c.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://api.b2c.com"
  },
  {
    "filters": [
      "/ajs.php?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://newrevive.detik.com/delivery/ajs.php?"
  },
  {
    "filters": [
      "||t4ft.de^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://c.t4ft.de"
  },
  {
    "check": true,
    "filters": [
      "|https://$script,third-party,xmlhttprequest,domain=1337x.to"
    ],
    "sourceUrl": "https://www.1337x.to",
    "type": "script",
    "url": "https://"
  },
  {
    "filters": [
      "||djv99sxoqpv11.cloudfront.net^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://djv99sxoqpv11.cloudfront.net"
  },
  {
    "filters": [
      "@@||ensighten.com^*/serverComponent.php?$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://nexus.ensighten.com/symantec/cp1/serverComponent.php?"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "filters": [
      "||adx.com.ru^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://adx.com.ru"
  },
  {
    "filters": [
      "||bid.run^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://spb.bid.run"
  },
  {
    "filters": [
      "||datamind.ru^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://sync.datamind.ru"
  },
  {
    "filters": [
      "||bumlam.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://sync.bumlam.com"
  },
  {
    "filters": [
      "||audtd.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://sync.audtd.com"
  },
  {
    "filters": [
      ".adriver.$~object-subrequest",
      "||adriver.ru^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ssp.adriver.ru"
  },
  {
    "filters": [
      "||stats.seedr.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://stats.seedr.com"
  },
  {
    "filters": [
      "||adsniper.ru^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://sync3.adsniper.ru"
  },
  {
    "filters": [
      "||republer.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://sync.republer.com"
  },
  {
    "filters": [
      "/show_ad?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://serve2.adzouk1tag.com/show_ad?"
  },
  {
    "filters": [
      "/rum.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://beacon.walmart.com/rum.gif?"
  },
  {
    "filters": [
      "||native.ai^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://cdn.native.ai"
  },
  {
    "filters": [
      "||engageya.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://widget.engageya.com"
  },
  {
    "filters": [
      "/px?t="
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://secure.adnxs.com/px?t=2&id=847154&seg=7690177"
  },
  {
    "filters": [
      "||disqusads.com^$third-party",
      "||disqusads.com^"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://disqusads.com"
  },
  {
    "filters": [
      "||referrer.disqus.com^",
      "/event.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://referrer.disqus.com/juggler/event.gif?"
  },
  {
    "filters": [
      "||audsp.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://sync.audsp.com"
  },
  {
    "filters": [
      "||beap-bc.yahoo.com^"
    ],
    "sourceUrl": "https://",
    "type": "other",
    "url": "https://beap-bc.yahoo.com"
  },
  {
    "filters": [
      "||quantserve.com/api/"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://pixel.quantserve.com/api/"
  },
  {
    "filters": [
      "/adunit."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://services.brid.tv/player/build/plugins/adunit.js"
  },
  {
    "filters": [
      "||deployads.com^$third-party",
      "||deployads.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tags-cdn.deployads.com"
  },
  {
    "filters": [
      "||avocet.io^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ads.avocet.io"
  },
  {
    "check": true,
    "filters": [
      "||insightexpressai.com^$third-party",
      "||insightexpressai.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://secure.insightexpressai.com"
  },
  {
    "filters": [
      "||aidata.io^$third-party",
      ".io/0.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://x01.aidata.io/0.gif?"
  },
  {
    "filters": [
      "||genieessp.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://js.genieessp.com"
  },
  {
    "filters": [
      ".ng/ads/"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.google.com.ng/ads/"
  },
  {
    "filters": [
      "/tracking-jquery-shim."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.comcast.com/learn/public/js/dtm/tracking-jquery-shim.min.js"
  },
  {
    "filters": [
      "||bannerflow.com^$third-party",
      "||bannerflow.com^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://cdn.bannerflow.com"
  },
  {
    "filters": [
      "||boudja.com^$third-party",
      "||boudja.com^"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://boudja.com"
  },
  {
    "filters": [
      "||xfinity.com/event/"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://dl.cws.xfinity.com/event/"
  },
  {
    "filters": [
      "/v1/pixel?"
    ],
    "sourceUrl": "http://",
    "type": "xhr",
    "url": "https://552bb0d73c307b0d68d1e3fb.tracker.bannerflow.com/api/tr/v1/pixel?"
  },
  {
    "filters": [
      "/ping.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://stats.brid.tv/ping.gif?"
  },
  {
    "filters": [
      "|http://$script,third-party,domain=100percentfedup.com|activistpost.com|addictinginfo.com|alfonzorachel.com|allthingsvegas.com|americanewshub.com|americansublime.com|americasfreedomfighters.com|askmefast.com|auntyacid.com|barbwire.com|beforeitsnews.com|bestfunnyjokes4u.com|bighealthreport.com|bigleaguepolitics.com|bipartisanreport.com|boredomtherapy.com|breaking911.com|breakingnews.ie|breathecast.com|bugout.news|bulletsfirst.net|celebrity-gossip.net|cheapism.com|cheatsheet.com|chicksonright.com|clashdaily.com|classicalite.com|collapse.news|comicallyincorrect.com|conservativebyte.com|conservativeintel.com|conservativetribune.com|conservativevideos.com|constitution.com|coviral.com|craigjames.com|creepybasement.com|crossmap.com|cyberwar.news|dailydot.com|dailyfeed.co.uk|dailyheadlines.net|dailyhealthpost.com|dailysurge.com|dailywire.com|damnlol.com|dccrimestories.com|deneenborelli.com|digitaljournal.com|eaglerising.com|earnthenecklace.com|enstarz.com|evil.news|faithit.com|fitnessconnoisseur.com|foreverymom.com|freedom.news|freedomdaily.com|freedomforce.com|freedomoutpost.com|freewarefiles.com|funnyand.com|gamerant.com|gamersheroes.com|girlsjustwannahaveguns.com|glitch.news|godfatherpolitics.com|gosocial.co|grammarist.com|greatamericanrepublic.com|groopspeak.com|guardianlv.com|guns.news|gymflow100.com|hallels.com|hautereport.com|headcramp.com|healthstatus.com|hispolitica.com|hngn.com|honesttopaws.com|ifyouonlynews.com|infowars.com|instigatornews.com|intellectualconservative.com|janmorganmedia.com|jobsnhire.com|joeforamerica.com|juicerhead.com|justdiy.com|kdramastars.com|keepandbear.com|knowledgedish.com|kpopstarz.com|lastresistance.com|latinpost.com|legalinsurrection.com|liberty.news|libertyalliance.com|libertyunyielding.com|lidblog.com|lifebuzz.com|madworldnews.com|makeagif.com|medicine.news|mentalflare.com|minutemennews.com|moneyversed.com|musictimes.com|myscienceacademy.org|natural.news|naturalblaze.com|naturalnews.com|naturalsociety.com|natureworldnews.com|newser.com|newseveryday.com|newsthump.com|oddee.com|opednews.com|parentherald.com|patriotnewswire.com|patriotoutdoornews.com|patriottribune.com|pickthebrain.com|politicaloutcast.com|politichicks.com|practicallyviral.com|quirlycues.com|rantlifestyle.com|readysethealth.com|realfarmacy.com|realmomsrealreviews.com|realtytoday.com|redhotchacha.com|redmaryland.com|returnofkings.com|reviveusa.com|rightwingnews.com|rightwingtribune.com|robotics.news|rollingout.com|rpnewswire.com|sarahpalin.com|shark-tank.com|shedthoselbs.com|slender.news|sonsoflibertymedia.com|spectator.org|stevedeace.com|stupid.news|supercheats.com|survivalnation.com|techconsumer.com|technobuffalo.com|techtimes.com|terezowens.com|theblacksphere.net|theboredmind.com|thefreethoughtproject.com|thegatewaypundit.com|thehayride.com|thelibertarianrepublic.com|thelibertydaily.com|themattwalshblog.com|thepoke.co.uk|thepolitistick.com|therealside.com|therightscoop.com|theviralmob.com|tinypic.com|tosavealife.com|traileraddict.com|truththeory.com|twisted.news|universityherald.com|urbantabloid.com|usherald.com|valuewalk.com|vcpost.com|vgpie.com|victoriajackson.com|videogamesblogger.com|viralnova.com|viralthread.com|visiontoamerica.com|wakingtimes.com|westernjournalism.com|winningdemocrats.com|xtribune.com|youthhealthmag.com",
      "||rtk.io^$third-party",
      ".js?dfp="
    ],
    "sourceUrl": "http://www.dailyfeed.co.uk",
    "type": "script",
    "url": "http://thor.rtk.io/QcEX/qw1q_ZIkz_qQCt/jita.js?dfp=1"
  },
  {
    "filters": [
      "|https://$script,third-party,domain=100percentfedup.com|activistpost.com|addictinginfo.com|alfonzorachel.com|allthingsvegas.com|americanewshub.com|americansublime.com|americasfreedomfighters.com|askmefast.com|auntyacid.com|barbwire.com|beforeitsnews.com|bestfunnyjokes4u.com|bighealthreport.com|bigleaguepolitics.com|bipartisanreport.com|boredomtherapy.com|breaking911.com|breakingnews.ie|breathecast.com|bugout.news|bulletsfirst.net|celebrity-gossip.net|cheapism.com|cheatsheet.com|chicksonright.com|clashdaily.com|classicalite.com|collapse.news|comicallyincorrect.com|conservativebyte.com|conservativeintel.com|conservativetribune.com|conservativevideos.com|constitution.com|coviral.com|craigjames.com|creepybasement.com|crossmap.com|cyberwar.news|dailydot.com|dailyfeed.co.uk|dailyheadlines.net|dailyhealthpost.com|dailysurge.com|dailywire.com|damnlol.com|dccrimestories.com|deneenborelli.com|digitaljournal.com|eaglerising.com|earnthenecklace.com|enstarz.com|evil.news|faithit.com|fitnessconnoisseur.com|foreverymom.com|freedom.news|freedomdaily.com|freedomforce.com|freedomoutpost.com|freewarefiles.com|funnyand.com|gamerant.com|gamersheroes.com|girlsjustwannahaveguns.com|glitch.news|godfatherpolitics.com|gosocial.co|grammarist.com|greatamericanrepublic.com|groopspeak.com|guardianlv.com|guns.news|gymflow100.com|hallels.com|hautereport.com|headcramp.com|healthstatus.com|hispolitica.com|hngn.com|honesttopaws.com|ifyouonlynews.com|infowars.com|instigatornews.com|intellectualconservative.com|janmorganmedia.com|jobsnhire.com|joeforamerica.com|juicerhead.com|justdiy.com|kdramastars.com|keepandbear.com|knowledgedish.com|kpopstarz.com|lastresistance.com|latinpost.com|legalinsurrection.com|liberty.news|libertyalliance.com|libertyunyielding.com|lidblog.com|lifebuzz.com|madworldnews.com|makeagif.com|medicine.news|mentalflare.com|minutemennews.com|moneyversed.com|musictimes.com|myscienceacademy.org|natural.news|naturalblaze.com|naturalnews.com|naturalsociety.com|natureworldnews.com|newser.com|newseveryday.com|newsthump.com|oddee.com|opednews.com|parentherald.com|patriotnewswire.com|patriotoutdoornews.com|patriottribune.com|pickthebrain.com|politicaloutcast.com|politichicks.com|practicallyviral.com|quirlycues.com|rantlifestyle.com|readysethealth.com|realfarmacy.com|realmomsrealreviews.com|realtytoday.com|redhotchacha.com|redmaryland.com|returnofkings.com|reviveusa.com|rightwingnews.com|rightwingtribune.com|robotics.news|rollingout.com|rpnewswire.com|sarahpalin.com|shark-tank.com|shedthoselbs.com|slender.news|sonsoflibertymedia.com|spectator.org|stevedeace.com|stupid.news|supercheats.com|survivalnation.com|techconsumer.com|technobuffalo.com|techtimes.com|terezowens.com|theblacksphere.net|theboredmind.com|thefreethoughtproject.com|thegatewaypundit.com|thehayride.com|thelibertarianrepublic.com|thelibertydaily.com|themattwalshblog.com|thepoke.co.uk|thepolitistick.com|therealside.com|therightscoop.com|theviralmob.com|tinypic.com|tosavealife.com|traileraddict.com|truththeory.com|twisted.news|universityherald.com|urbantabloid.com|usherald.com|valuewalk.com|vcpost.com|vgpie.com|victoriajackson.com|videogamesblogger.com|viralnova.com|viralthread.com|visiontoamerica.com|westernjournalism.com|winningdemocrats.com|xtribune.com|youthhealthmag.com"
    ],
    "sourceUrl": "http://www.dailyfeed.co.uk",
    "type": "script",
    "url": "https://"
  },
  {
    "filters": [
      "/piwik.$image,script,domain=~matomo.org|~piwik.org"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://outbraintrack.optimove.net/piwik.js"
  },
  {
    "filters": [
      "||cloudfront.net*/tracker.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://d2zah9y47r7bi2.cloudfront.net/releases/current/tracker.js"
  },
  {
    "filters": [
      "||quora.com/qevents.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://a.quora.com/qevents.js"
  },
  {
    "filters": [
      "||h-bid.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static.h-bid.com/w3schools.com/20180525/snhb-w3schools.min.js"
  },
  {
    "check": true,
    "filters": [
      "||kissmetrics.com^$third-party",
      "||kissmetrics.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://i.kissmetrics.com"
  },
  {
    "check": true,
    "filters": [
      "/scripts.kissmetrics.com/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://scripts.kissmetrics.com/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "filters": [
      "@@||connect.facebook.net^$script,third-party,domain=100percentfedup.com|activistpost.com|addictinginfo.com|alfonzorachel.com|allthingsvegas.com|americansublime.com|askmefast.com|auntyacid.com|barbwire.com|bestfunnyjokes4u.com|bighealthreport.com|bipartisanreport.com|boredomtherapy.com|breaking911.com|breathecast.com|bugout.news|bulletsfirst.net|celebrity-gossip.net|clashdaily.com|classicalite.com|collapse.news|comicallyincorrect.com|conservativebyte.com|conservativevideos.com|constitution.com|coviral.com|craigjames.com|creepybasement.com|crossmap.com|cyberwar.news|dailydot.com|dailyfeed.co.uk|dailyheadlines.net|dailyhealthpost.com|dailysurge.com|damnlol.com|dccrimestories.com|deneenborelli.com|digitaljournal.com|eaglerising.com|earnthenecklace.com|enstarz.com|evil.news|fitnessconnoisseur.com|foreverymom.com|freedom.news|freedomdaily.com|freedomforce.com|freedomoutpost.com|gamerant.com|girlsjustwannahaveguns.com|glitch.news|godfatherpolitics.com|gosocial.co|grammarist.com|greatamericanrepublic.com|groopspeak.com|guardianlv.com|guns.news|gymflow100.com|hallels.com|hautereport.com|headcramp.com|healthstatus.com|hispolitica.com|hngn.com|honesttopaws.com|ifyouonlynews.com|infowars.com|instigatornews.com|intellectualconservative.com|janmorganmedia.com|jobsnhire.com|joeforamerica.com|juicerhead.com|justdiy.com|kdramastars.com|keepandbear.com|knowledgedish.com|kpopstarz.com|lastresistance.com|latinpost.com|legalinsurrection.com|liberty.news|libertyalliance.com|libertyunyielding.com|lidblog.com|medicine.news|mentalflare.com|minutemennews.com|musictimes.com|myscienceacademy.org|natural.news|naturalblaze.com|naturalnews.com|naturalsociety.com|natureworldnews.com|newser.com|newseveryday.com|newsthump.com|oddee.com|opednews.com|parentherald.com|patriotoutdoornews.com|patriottribune.com|pickthebrain.com|politicaloutcast.com|politichicks.com|practicallyviral.com|quirlycues.com|rantlifestyle.com|realfarmacy.com|realmomsrealreviews.com|realtytoday.com|redhotchacha.com|redmaryland.com|returnofkings.com|rightwingnews.com|robotics.news|shark-tank.com|shedthoselbs.com|slender.news|sonsoflibertymedia.com|spectator.org|stevedeace.com|stupid.news|supercheats.com|techconsumer.com|techtimes.com|theblacksphere.net|theboredmind.com|thefreethoughtproject.com|thegatewaypundit.com|thehayride.com|thelibertarianrepublic.com|themattwalshblog.com|thepoke.co.uk|therealside.com|theviralmob.com|tosavealife.com|traileraddict.com|truththeory.com|twisted.news|universityherald.com|urbantabloid.com|usherald.com|valuewalk.com|vcpost.com|victoriajackson.com|videogamesblogger.com|viralnova.com|viralthread.com|visiontoamerica.com|wakingtimes.com|westernjournalism.com|winningdemocrats.com|xtribune.com|youthhealthmag.com"
    ],
    "sourceUrl": "http://www.dailyfeed.co.uk",
    "type": "script",
    "url": "https://connect.facebook.net"
  },
  {
    "filters": [
      "||quora.com/_/ad/"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://q.quora.com/_/ad/"
  },
  {
    "filters": [
      "||lucklayed.info^$third-party",
      "||lucklayed.info^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://lucklayed.info"
  },
  {
    "filters": [
      "||croissed.info^$third-party",
      "||croissed.info^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://croissed.info"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "filters": [
      "@@||s0.2mdn.net/instream/*$domain=cnet.com|nfl.com|wistv.com",
      "@@||2mdn.net/instream/html5/ima3.js$domain=~superfilm.pl"
    ],
    "sourceUrl": "https://www.nfl.com",
    "type": "script",
    "url": "https://s0.2mdn.net/instream/html5/ima3.js"
  },
  {
    "filters": [
      "/300x250."
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://d.kapanlaginetwork.com/banner/custom/backfill-kln/300x250.php"
  },
  {
    "check": true,
    "filters": [
      "||irqs.ioam.de^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://irqs.ioam.de"
  },
  {
    "filters": [
      "||doubleclick.net/json?$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://fls.doubleclick.net/json?"
  },
  {
    "filters": [
      "||primevideo.com/uedata/"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.primevideo.com/uedata/"
  },
  {
    "filters": [
      "||spongecell.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://analytics.spongecell.com"
  },
  {
    "filters": [
      "/comscore/streamsense."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s.cdn.turner.com/analytics/comscore/streamsense.5.2.0.160629.min.js"
  },
  {
    "filters": [
      "||logger.uol.com.br^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://logger.uol.com.br"
  },
  {
    "filters": [
      "||amazon.*/ajax/counter?"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://www.amazon.it/ah/ajax/counter?"
  },
  {
    "filters": [
      "/static/ad-"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://t1.daumcdn.net/adfit/static/ad-native.min.js"
  },
  {
    "filters": [
      "||iperceptions.com^",
      "||iperceptions.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://universal.iperceptions.com"
  },
  {
    "filters": [
      "||impactradius-event.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://d.impactradius-event.com"
  },
  {
    "check": true,
    "filters": [
      "||sumo.com^$third-party,domain=~dante-ri.hr",
      "||sumo.com^$third-party",
      "||sumo.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://load.sumo.com"
  },
  {
    "filters": [
      "/imp.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://pixel2.adzouk1tag.com/tracker/imp.gif?"
  },
  {
    "filters": [
      "||trackjs.com/usage.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://usage.trackjs.com/usage.gif?"
  },
  {
    "filters": [
      "@@||youtube.com/player_api$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.youtube.com/player_api"
  },
  {
    "filters": [
      "||trendemon.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://prod.trendemon.com"
  },
  {
    "filters": [
      "||distillery.wistia.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://distillery.wistia.com"
  },
  {
    "filters": [
      "||choices.truste.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://choices.truste.com"
  },
  {
    "filters": [
      "/sync.gif?partner_"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://api.viglink.com/api/sync.gif?partner_id=lot"
  },
  {
    "filters": [
      "/AdobeAnalyticsSDK.",
      "@@||vice.com/*/AdobeAnalyticsSDK$script,first-party"
    ],
    "sourceUrl": "https://video.vice.com",
    "type": "script",
    "url": "https://web-scripts.vice.com/v1.0.4/AdobeAnalyticsSDK.min.js"
  },
  {
    "filters": [
      "@@||z.cdn.turner.com/analytics/cnnexpan/jsmd.min.js$script,domain=cnn.com"
    ],
    "sourceUrl": "https://edition.cnn.com",
    "type": "script",
    "url": "https://z.cdn.turner.com/analytics/cnnexpan/jsmd.min.js"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "filters": [
      ".com/track?$~object",
      "||aniview.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://track.aniview.com/track?"
  },
  {
    "filters": [
      "/adbet-"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://rutrk.org/iframe/adbet-top-2.html"
  },
  {
    "filters": [
      "||openstat.net^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://openstat.net"
  },
  {
    "filters": [
      "||viglink.com/api/optimize^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://api.viglink.com/api/optimize"
  },
  {
    "check": true,
    "filters": [
      "||primevideo.com^*/ref="
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "https://www.primevideo.com/auth-redirect/ref=atv_nb_sign_in"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "filters": [
      "||adbetnet.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://xml.adbetnet.com"
  },
  {
    "filters": [
      "||adspirit.de^$third-party",
      "||adspirit.de^",
      "/adscript."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://accado.adspirit.de/adscript.php"
  },
  {
    "filters": [
      "||mgid.com^$third-party,domain=~marketgid.com|~marketgid.com.ua",
      "||mgid.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://jsc.mgid.com"
  },
  {
    "filters": [
      "/stat?event=",
      "?event=pixel."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://medium.com/_/stat?event=pixel.load&origin=https%3A%2F%2Fmedium.com"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "filters": [
      "/pstats."
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://a.rfihub.com/pstats.html"
  },
  {
    "filters": [
      "||marketgid.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://jsc.marketgid.com"
  },
  {
    "filters": [
      "||vogo-vogo.ru^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://vogo-vogo.ru"
  },
  {
    "filters": [
      "/reklama/*"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "https://sportvia.ru/reklama/"
  },
  {
    "filters": [
      "||sape.ru^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://cdn-rtb.sape.ru"
  },
  {
    "filters": [
      "||uuidksinc.net^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://uuidksinc.net"
  },
  {
    "filters": [
      "||advcash.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://wallet.advcash.com"
  },
  {
    "filters": [
      "://affiliate.$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://affiliate.olymptrade.com"
  },
  {
    "filters": [
      ".com/adv?"
    ],
    "sourceUrl": "http://",
    "type": "xhr",
    "url": "http://ssp.playbuzz.com/adv?"
  },
  {
    "filters": [
      "/pubads."
    ],
    "sourceUrl": "http://",
    "type": "xhr",
    "url": "https://pubads.g.doubleclick.net"
  },
  {
    "filters": [
      "||nexage.com^$third-party",
      "||nexage.com^"
    ],
    "sourceUrl": "http://",
    "type": "xhr",
    "url": "http://ads.nexage.com"
  },
  {
    "filters": [
      "@@||imasdk.googleapis.com/js/sdkloader/ima3.js$domain=dibujos.net|ensonhaber.com|f5haber.com|marieclaire.fr|r7.com|radio-canada.ca|tv2.no|uol.com.br"
    ],
    "sourceUrl": "https://tvefamosos.uol.com.br",
    "type": "script",
    "url": "https://imasdk.googleapis.com/js/sdkloader/ima3.js"
  },
  {
    "filters": [
      "||adsnative.com^$third-party",
      "||adsnative.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static.adsnative.com"
  },
  {
    "filters": [
      "||promo-bc.com^$third-party",
      "/hit.php?"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://promo-bc.com/hit.php?"
  },
  {
    "filters": [
      "||acint.net^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.acint.net"
  },
  {
    "filters": [
      "||collector-medium.lightstep.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://collector-medium.lightstep.com"
  },
  {
    "filters": [
      "||media6degrees.com^$third-party",
      "||media6degrees.com^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://idpix.media6degrees.com"
  },
  {
    "filters": [
      "||appsflyer.com^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://app.appsflyer.com"
  },
  {
    "filters": [
      "||digitaltarget.ru^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://tag.digitaltarget.ru"
  },
  {
    "filters": [
      "||morgdm.ru^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://sync.morgdm.ru"
  },
  {
    "filters": [
      "||trafmag.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://t.trafmag.com"
  },
  {
    "filters": [
      "||utarget.ru^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://utarget.ru"
  },
  {
    "filters": [
      "||recreativ.ru^$third-party",
      "||track.recreativ.ru^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://track.recreativ.ru"
  },
  {
    "filters": [
      "||exe.bid^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://sync-eu.exe.bid"
  },
  {
    "filters": [
      "||targeterra.info^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://cm.targeterra.info"
  },
  {
    "filters": [
      "||octomarket.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://octomarket.com"
  },
  {
    "filters": [
      "||inq.com/tagserver/logging/"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://comcast.inq.com/tagserver/logging/"
  },
  {
    "filters": [
      "||adfox.yandex.ru^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://matchid.adfox.yandex.ru"
  },
  {
    "filters": [
      "||archive.org^*/analytics.js",
      "/includes/analytics."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://archive.org/includes/analytics.js"
  },
  {
    "filters": [
      "||betweendigital.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://ads.betweendigital.com"
  },
  {
    "filters": [
      "||vertamedia.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://sync.vertamedia.com"
  },
  {
    "filters": [
      ".adlabs.$domain=~adlabs.ru"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://stat.adlabs.ru"
  },
  {
    "filters": [
      "||lkqd.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://ssp.lkqd.net"
  },
  {
    "filters": [
      "||k.streamrail.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://k.streamrail.com"
  },
  {
    "filters": [
      "||marketgid.com/c?"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://c.marketgid.com/c?"
  },
  {
    "filters": [
      "/showads^"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://ad.setn.com/Ads/ShowAds"
  },
  {
    "filters": [
      "||onetag-sys.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://onetag-sys.com"
  },
  {
    "filters": [
      "||adgrx.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://cm.adgrx.com"
  },
  {
    "filters": [
      "||cnt.my^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://x.cnt.my"
  },
  {
    "filters": [
      "@@||graph.facebook.com^$image,script,third-party,domain=100percentfedup.com|activistpost.com|addictinginfo.com|alfonzorachel.com|allthingsvegas.com|americansublime.com|askmefast.com|auntyacid.com|barbwire.com|bestfunnyjokes4u.com|bighealthreport.com|bipartisanreport.com|boredomtherapy.com|breaking911.com|breathecast.com|bulletsfirst.net|celebrity-gossip.net|clashdaily.com|classicalite.com|collapse.news|comicallyincorrect.com|conservativebyte.com|conservativevideos.com|constitution.com|coviral.com|craigjames.com|creepybasement.com|crossmap.com|cyberwar.news|dailyfeed.co.uk|dailyheadlines.net|dailyhealthpost.com|dailysurge.com|dccrimestories.com|deneenborelli.com|digitaljournal.com|eaglerising.com|earnthenecklace.com|enstarz.com|evil.news|fitnessconnoisseur.com|foreverymom.com|freedom.news|freedomdaily.com|freedomforce.com|freedomoutpost.com|girlsjustwannahaveguns.com|glitch.news|godfatherpolitics.com|greatamericanrepublic.com|groopspeak.com|guardianlv.com|guns.news|gymflow100.com|hallels.com|hautereport.com|healthstatus.com|hispolitica.com|hngn.com|honesttopaws.com|ifyouonlynews.com|infowars.com|instigatornews.com|intellectualconservative.com|janmorganmedia.com|jobsnhire.com|joeforamerica.com|juicerhead.com|justdiy.com|kdramastars.com|keepandbear.com|kpopstarz.com|lastresistance.com|latinpost.com|legalinsurrection.com|liberty.news|libertyalliance.com|libertyunyielding.com|lidblog.com|medicine.news|mentalflare.com|minutemennews.com|musictimes.com|myscienceacademy.org|natural.news|naturalblaze.com|naturalnews.com|naturalsociety.com|natureworldnews.com|newser.com|newseveryday.com|newsthump.com|oddee.com|opednews.com|patriotoutdoornews.com|patriottribune.com|photobucket.com|pickthebrain.com|politicaloutcast.com|politichicks.com|practicallyviral.com|quirlycues.com|rantlifestyle.com|realfarmacy.com|realmomsrealreviews.com|realtytoday.com|redhotchacha.com|redmaryland.com|returnofkings.com|rightwingnews.com|robotics.news|shark-tank.com|shedthoselbs.com|slender.news|sonsoflibertymedia.com|spectator.org|stevedeace.com|stupid.news|supercheats.com|techconsumer.com|techtimes.com|theblacksphere.net|theboredmind.com|thefreethoughtproject.com|thegatewaypundit.com|themattwalshblog.com|thepoke.co.uk|therealside.com|theviralmob.com|tosavealife.com|truththeory.com|twisted.news|urbantabloid.com|usherald.com|valuewalk.com|vcpost.com|victoriajackson.com|videogamesblogger.com|viralnova.com|viralthread.com|visiontoamerica.com|wakingtimes.com|winningdemocrats.com|xtribune.com|youthhealthmag.com"
    ],
    "sourceUrl": "http://www.dailyfeed.co.uk",
    "type": "script",
    "url": "https://graph.facebook.com"
  },
  {
    "filters": [
      "/adsimages/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://attach.setn.com/adsimages/"
  },
  {
    "filters": [
      "/googima.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ssl.p.jwpcdn.com/player/plugins/googima/v/8.4.2/googima.js"
  },
  {
    "filters": [
      "||yieldlab.net^$third-party",
      "||yieldlab.net^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ad.yieldlab.net"
  },
  {
    "filters": [
      "||analytics.archive.org^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://analytics.archive.org"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "script",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "_ad_close."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://attach.setn.com/website/m/images/icon/float_ad_close.png"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "||justpremium.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://ox-d.justpremium.com"
  },
  {
    "filters": [
      "/ad-template."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://api.adsnative.com/v1/ad-template.json"
  },
  {
    "filters": [
      "||godaddy.com/image.aspx?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://img.godaddy.com/image.aspx?"
  },
  {
    "filters": [
      "||ngastatic.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ngastatic.com/s4c/tracker.js"
  },
  {
    "filters": [
      "||jsrdn.com/s/1.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s.jsrdn.com/s/1.js"
  },
  {
    "filters": [
      "||adlightning.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tagan.adlightning.com"
  },
  {
    "filters": [
      "/divolte.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://web-analytics0.com/divolte.js"
  },
  {
    "filters": [
      "||scounter.rambler.ru^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://scounter.rambler.ru"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "filters": [
      "/320x250."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://cdnstatic.detik.com/live/html5/dpr-ri/april2018/18/320x250.jpg"
  },
  {
    "filters": [
      "||ngacm.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://ngacm.com"
  },
  {
    "filters": [
      "||godaddy.com/pageevents.aspx"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://img.godaddy.com/pageEvents.aspx"
  },
  {
    "filters": [
      "||seg.sharethis.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://seg.sharethis.com"
  },
  {
    "filters": [
      "/script/analytics/*"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://script1.s.kakaku.k-img.com/script/analytics/"
  },
  {
    "filters": [
      "||metric.gstatic.com^"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "https://p4-faaav4qvtwweo-3egofrhggfakx52c-if-v6exp3-v4.metric.gstatic.com"
  },
  {
    "filters": [
      "/csc-event?"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://web-analytics0.com/csc-event?"
  },
  {
    "filters": [
      "/pixel.png?"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://www.marathonbet.com/pixel.png?"
  },
  {
    "check": true,
    "filters": [
      "||npttech.com/advertising.js$important,script,redirect=fuckadblock.js-3.2.0",
      "@@||npttech.com/advertising.js$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.npttech.com/advertising.js"
  },
  {
    "filters": [
      "/google-analytics-",
      "@@/wp-content/plugins/google-analytics-premium/*$script,stylesheet,first-party"
    ],
    "sourceUrl": "https://www.yelpblog.com",
    "type": "script",
    "url": "https://www.yelpblog.com/wp-content/plugins/google-analytics-premium/"
  },
  {
    "filters": [
      "_resource/analytics.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://corporate.walmart.com/_resource/analytics.js"
  },
  {
    "filters": [
      "||vm5apis.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://vawpro.vm5apis.com"
  },
  {
    "filters": [
      "/onead_"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.setn.com/m/js/onead_mir.js"
  },
  {
    "filters": [
      "||linksynergy.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ct1.ra.linksynergy.com"
  },
  {
    "filters": [
      "||dc-storm.com^",
      "||dc-storm.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://nyt2.dc-storm.com"
  },
  {
    "filters": [
      "||dable.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static.dable.io"
  },
  {
    "check": true,
    "filters": [
      "||owneriq.net^",
      "||px.owneriq.net^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://px.owneriq.net"
  },
  {
    "filters": [
      "||deepintent.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://euwest-match.deepintent.com"
  },
  {
    "filters": [
      "/directadvert-"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://rutrk.org/iframe/directadvert-240x120-1.html"
  },
  {
    "filters": [
      "/ads8.",
      "||kompasads.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ads8.kompasads.com"
  },
  {
    "filters": [
      "||googleapis.com/ivc.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://gadasource.storage.googleapis.com/ivc.js"
  },
  {
    "filters": [
      "/CookiePingback?"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://www.tripadvisor.com/CookiePingback?"
  },
  {
    "filters": [
      "||tamgrt.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://www.tamgrt.com"
  },
  {
    "filters": [
      "||bigmining.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://cdn.bigmining.com"
  },
  {
    "filters": [
      "/ad-specs."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ad-specs.guoshipartners.com"
  },
  {
    "check": true,
    "filters": [
      "/googleanalytics.js"
    ],
    "sourceUrl": "https://www.setn.com",
    "type": "script",
    "url": "https://www.setn.com/js/ga/googleanalytics.js"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "filters": [
      "/xgemius."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://assets.allegrostatic.com/display-pl/lib/gem/xgemius.js"
  },
  {
    "filters": [
      "/textad?"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://ad.setn.com/Ads/TextAD?"
  },
  {
    "filters": [
      "&adslot="
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://static.tacdn.com/img2/x.gif?&ads=1&adsize=2&adslot=3&rnd=93067"
  },
  {
    "filters": [
      "||digitru.st^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://cdn.digitru.st"
  },
  {
    "check": true,
    "filters": [
      "||doubleclick.net/activity$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://pubads.g.doubleclick.net/activity;dc_iu="
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "filters": [
      "/set_tracking.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.dmm.com/js/common/set_tracking.js"
  },
  {
    "filters": [
      "||twiago.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://a.twiago.com"
  },
  {
    "filters": [
      "/ad1.$domain=~ad1.de|~ad1.in|~vereinslinie.de"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ad1.adfarm1.adition.com"
  },
  {
    "filters": [
      "/advertisement/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://attach.setddg.com/advertisement/"
  },
  {
    "filters": [
      "/taevents-"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static.tacdn.com/js3/taevents-c-v22228732872b.js"
  },
  {
    "filters": [
      "||connexity.net^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://pxl.connexity.net"
  },
  {
    "filters": [
      "||extend.tv^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://sync.extend.tv"
  },
  {
    "check": true,
    "filters": [
      ".ace.advertising.",
      "||ace.advertising.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ox.pxl.ace.advertising.com"
  },
  {
    "filters": [
      "/advertisement.$domain=~advertisement.solutions.zalando.com"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static2.farakav.com/varzesh3/assets/js/advertisement.js"
  },
  {
    "filters": [
      "/vice-ads."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://vice-ads.s3.amazonaws.com"
  },
  {
    "filters": [
      "/s.gif?l="
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://api.share.baidu.com/s.gif?l=http://m.youth.cn/"
  },
  {
    "filters": [
      "||baidu.com^*/s.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://sp0.baidu.com/9_Q4simg2RQJ8t7jm9iCKT-xh_/s.gif?"
  },
  {
    "filters": [
      "||ad-stir.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://js.ad-stir.com"
  },
  {
    "filters": [
      "||counter2.blog.livedoor.com^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://counter2.blog.livedoor.com"
  },
  {
    "filters": [
      "||histats.com^",
      "||histats.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s10.histats.com"
  },
  {
    "filters": [
      ".cc/s.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://rlog.popin.cc/s.gif?"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "filters": [
      "||crptentry.com^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.crptentry.com"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "filters": [
      "-sticky-ad-"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.ampproject.org/v0/amp-sticky-ad-1.0.js"
  },
  {
    "filters": [
      "/amp-geo-"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.ampproject.org/v0/amp-geo-0.1.js"
  },
  {
    "filters": [
      "||scroll.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static.scroll.com"
  },
  {
    "filters": [
      "||2mdn.net^$third-party,font"
    ],
    "sourceUrl": "https://",
    "type": "font",
    "url": "https://s0.2mdn.net"
  },
  {
    "filters": [
      "||nend.net^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://js1.nend.net"
  },
  {
    "filters": [
      "/ad2.$domain=~vereinslinie.de"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://ad2.nend.net"
  },
  {
    "filters": [
      "||web-t.9gag.com^",
      "/piwik.php"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://web-t.9gag.com/piwik.php"
  },
  {
    "filters": [
      "/comscore."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://weather.com/weather/assets/comscore.0775758c3c488c7318c16e658da58eb4.js"
  },
  {
    "filters": [
      "||abeagle-public.buzzfeed.com^"
    ],
    "sourceUrl": "https://",
    "type": "fetch",
    "url": "https://abeagle-public.buzzfeed.com"
  },
  {
    "filters": [
      "||siteimprove.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://us2.siteimprove.com"
  },
  {
    "filters": [
      "||acq.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://js.acq.io"
  },
  {
    "filters": [
      "||pixiedust.buzzfeed.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://pixiedust.buzzfeed.com"
  },
  {
    "filters": [
      "||ads.programattik.com^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://ads.programattik.com"
  },
  {
    "filters": [
      "||amoad.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://j.amoad.com"
  },
  {
    "filters": [
      "||livedoor.net^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://blogroll.livedoor.net"
  },
  {
    "filters": [
      "/blank.gif?*&"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://blogroll.livedoor.net/img/blank.gif?channel_id=21017&_=1540302784647"
  },
  {
    "filters": [
      "||infolinks.com^$third-party",
      "||infolinks.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://resources.infolinks.com"
  },
  {
    "filters": [
      "||cdn.segment.com^",
      "||segment.com^$third-party",
      "/analytics.js/v1/*",
      "/analytics.min.",
      "@@||segment.com/analytics.js/*/analytics.min.js$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.segment.com/analytics.js/v1/MQh0Jm5dRE/analytics.min.js"
  },
  {
    "filters": [
      "/tracker.min.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tamasha.com/dist/t1538785732308/js/tracker.min.js"
  },
  {
    "filters": [
      "/js/ads_",
      "/ads_tracker."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tamasha.com/dist/t1538785732308/js/ads_tracker.min.js"
  },
  {
    "filters": [
      "||app.pendo.io^",
      "||app.pendo.io/data/ptm.gif"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://app.pendo.io/data/ptm.gif"
  },
  {
    "filters": [
      "||hlserve.com^$third-party",
      "/beacon?",
      "@@||hlserve.com/beacon?$domain=walmart.com"
    ],
    "sourceUrl": "https://www.walmart.com",
    "type": "image",
    "url": "https://b.hlserve.com/beacon?"
  },
  {
    "filters": [
      "/amplitude-*.js$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.amplitude.com/libs/amplitude-4.4.0-min.gz.js"
  },
  {
    "filters": [
      "||appboycdn.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://js.appboycdn.com"
  },
  {
    "filters": [
      "||pixiv.org^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://d.pixiv.org"
  },
  {
    "filters": [
      "/elqcfg.min.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://img.en25.com/i/elqCfg.min.js"
  },
  {
    "filters": [
      "||eloqua.com^$~stylesheet,third-party",
      "||eloqua.com^$third-party,image"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://s2376.t.eloqua.com"
  },
  {
    "filters": [
      "/ad/jsonp/*"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://d.amoad.com/ad/jsonp/"
  },
  {
    "filters": [
      "||bf-ad.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://a.bf-ad.net"
  },
  {
    "filters": [
      "/adengine."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://a.bf-ad.net/pubjs/weather/adengine.js"
  },
  {
    "filters": [
      "||youle55.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://rwq.youle55.com"
  },
  {
    "filters": [
      "/images/ad/*"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://enjoy.eastday.com/images/ad/"
  },
  {
    "filters": [
      "||dmm.com^*/dmm.tracking."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://stat.i3.dmm.com/latest/js/dmm.tracking.min.js"
  },
  {
    "filters": [
      "||dyncdn.me/static/20/js/expla*.js$domain=rarbg.is|rarbg.to|rarbgmirror.com|rarbgproxy.org|rarbgprx.org"
    ],
    "sourceUrl": "http://www.rarbg.to",
    "type": "script",
    "url": "https://dyncdn.me/static/20/js/expla89.js"
  },
  {
    "filters": [
      "||statsy.net^$third-party",
      "/a.php?ref="
    ],
    "sourceUrl": "http://",
    "type": "xhr",
    "url": "http://statsy.net/a.php?ref=&res=640x360&ab=2&_=1540302786228"
  },
  {
    "filters": [
      "||facebook.com^*/instream/vast.xml?"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://an.facebook.com/v1/instream/vast.xml?"
  },
  {
    "filters": [
      "||dmm.com/analytics/"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://trac.i3.dmm.com/analytics/"
  },
  {
    "filters": [
      "||maxmind.com/js/device.js$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://device.maxmind.com/js/device.js"
  },
  {
    "filters": [
      "||log.pinterest.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://log.pinterest.com"
  },
  {
    "filters": [
      "/icon_ad."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.3dmgame.com/page/images/icon_ad.png"
  },
  {
    "filters": [
      "/ads_frame."
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://www.pixiv.net/ads_frame.php"
  },
  {
    "filters": [
      "||50bang.org^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://union2.50bang.org"
  },
  {
    "filters": [
      "||tanx.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://p.tanx.com"
  },
  {
    "filters": [
      "||gssprt.jp^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://cs.gssprt.jp"
  },
  {
    "filters": [
      "||microad.jp^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://s-cs.send.microad.jp"
  },
  {
    "filters": [
      "||yieldmo.com^$third-party",
      "||yieldmo.com^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://ads.yieldmo.com"
  },
  {
    "filters": [
      "||omnitagjs.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://visitor.omnitagjs.com"
  },
  {
    "check": true,
    "filters": [
      "/log_event?$domain=~youtube.com",
      "/log_event?"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://www.youtube.com/youtubei/v1/log_event?"
  },
  {
    "filters": [
      "||amazon.com^*/events/$domain=~aws.amazon.com"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://unagi-eu.amazon.com/1/events/"
  },
  {
    "filters": [
      "/logging/log-"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://www.amazon.es/gp/sponsored-products/logging/log-action.html"
  },
  {
    "filters": [
      "||trafficstars.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.trafficstars.com"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "filters": [
      "/adver.$domain=~adver.biz|~adver.media"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://www.funshion.net.cn/img/adver.png"
  },
  {
    "filters": [
      "||lp4.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://pp.lp4.io"
  },
  {
    "filters": [
      "||atanx.alicdn.com^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://atanx.alicdn.com"
  },
  {
    "filters": [
      "|https://$script,stylesheet,third-party,xmlhttprequest,domain=zippyshare.com"
    ],
    "sourceUrl": "https://www.zippyshare.com",
    "type": "stylesheet",
    "url": "https://"
  },
  {
    "filters": [
      "/adops.$domain=~adops.co.il"
    ],
    "sourceUrl": "https://",
    "type": "stylesheet",
    "url": "https://s3.amazonaws.com/adops.zillowstatic.com"
  },
  {
    "filters": [
      "||admob.com^$third-party",
      "||admob.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://media.admob.com"
  },
  {
    "filters": [
      "||google-analytics.com/cx/api.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.google-analytics.com/cx/api.js"
  },
  {
    "filters": [
      "||event.api.drift.com^"
    ],
    "sourceUrl": "https://",
    "type": "fetch",
    "url": "https://event.api.drift.com"
  },
  {
    "filters": [
      "/webstat_"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://stat.baike.com/js/webstat_manage.js"
  },
  {
    "filters": [
      "/pg_pixel?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.airbnb.com/pg_pixel?"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "filters": [
      "||pv.ltn.com.tw^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://pv.ltn.com.tw"
  },
  {
    "filters": [
      "/GoogleDFP."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.ltn.com.tw/assets/js/GoogleDFP.js"
  },
  {
    "filters": [
      "/fingerprint2.min.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://cache.ltn.com.tw/js/fingerprint2.min.js"
  },
  {
    "filters": [
      "/adimg/*"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://img.ltn.com.tw/Upload/ADImg/"
  },
  {
    "filters": [
      "/idleAds."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.ltn.com.tw/assets/js/idleAds.js"
  },
  {
    "filters": [
      "?ads=$domain=~booking.loganair.co.uk"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "https://comic.pixiv.net/works/5197?ads=tf_hot_work_index&first_story_only=true"
  },
  {
    "filters": [
      "||stat.zol.com.cn^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://stat.zol.com.cn"
  },
  {
    "filters": [
      "/google_ad_"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://pv.ltn.com.tw/google_ad_block_check.js"
  },
  {
    "filters": [
      "||airbnb.*/tracking/"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://www.airbnb.com/tracking/"
  },
  {
    "filters": [
      "@@||line-apps.com^$domain=line.me"
    ],
    "sourceUrl": "https://store.line.me",
    "type": "script",
    "url": "https://scdn.line-apps.com"
  },
  {
    "filters": [
      "||adx1.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://disqus.rtb.adx1.com"
  },
  {
    "filters": [
      "/eluminate?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://sofa.bankofamerica.com/eluminate?"
  },
  {
    "filters": [
      "/setcookie?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ue.flipboard.com/setcookie?"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "filters": [
      "||stat.media^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://stat.media"
  },
  {
    "filters": [
      "||target.mixi.media^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://target.mixi.media"
  },
  {
    "filters": [
      ".at/ads/"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.google.at/ads/"
  },
  {
    "filters": [
      "||unrulymedia.com^$third-party",
      "||unrulymedia.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://video.unrulymedia.com"
  },
  {
    "filters": [
      "||popcash.net^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.popcash.net"
  },
  {
    "filters": [
      "||admarketplace.net^$third-party",
      "||admarketplace.net^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://imp.admarketplace.net"
  },
  {
    "filters": [
      "||hudong.com/flux.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://ll.hudong.com/flux.js"
  },
  {
    "filters": [
      "://anx.*/anx.gif?"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://anx.tb.ask.com/anx.gif?"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.nownews.com",
    "type": "xhr",
    "url": "https://ad2018.nownews.com/ad/"
  },
  {
    "filters": [
      "||ads.cc^$third-party",
      "||ads.cc^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ads.cc"
  },
  {
    "filters": [
      "||yieldoptimizer.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://tag.yieldoptimizer.com"
  },
  {
    "filters": [
      "||emarbox.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://cmp.emarbox.com"
  },
  {
    "filters": [
      "/impression.php?"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://cache.ltn.com.tw/app/program/impression.php?"
  },
  {
    "filters": [
      "||33across.com^$third-party",
      "||33across.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn-sic.33across.com"
  },
  {
    "filters": [
      "||dwin1.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.dwin1.com"
  },
  {
    "filters": [
      "||xg4ken.com^",
      "||xg4ken.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://resources.xg4ken.com"
  },
  {
    "filters": [
      "/webdig.js?z="
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://tongji.eastday.com/webdig.js?z=1"
  },
  {
    "check": true,
    "filters": [
      "||stats3.unrulymedia.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://stats3.unrulymedia.com"
  },
  {
    "filters": [
      "||gstat.orange.fr^",
      "@@||s.gstat.orange.fr/lib/gs.js?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s.gstat.orange.fr/lib/gs.js?"
  },
  {
    "filters": [
      "/o_tealium."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://c.woopic.com/Magic/o_tealium.js"
  },
  {
    "filters": [
      "||orangeads.fr^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://all.orfr.adgtw.orangeads.fr"
  },
  {
    "filters": [
      "@@||bat.bing.com/bat.js$script,domain=airbnb.co.uk|airbnb.com"
    ],
    "sourceUrl": "https://www.airbnb.com",
    "type": "script",
    "url": "https://bat.bing.com/bat.js"
  },
  {
    "filters": [
      "||musthird.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ss.musthird.com"
  },
  {
    "filters": [
      "/300x250/*$~media"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.sex.com/ads/oct18/300x250/"
  },
  {
    "filters": [
      "||amazonaws.com/ki.js/"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s3.amazonaws.com/ki.js/"
  },
  {
    "filters": [
      "||s.adroll.com^$third-party",
      "||s.adroll.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s.adroll.com"
  },
  {
    "filters": [
      "/api/log?"
    ],
    "sourceUrl": "http://",
    "type": "xhr",
    "url": "https://nbrecsys.4paradigm.com/action/api/log?"
  },
  {
    "filters": [
      "@@||fncstatic.com^*/visitorapi.js$script,domain=foxbusiness.com|foxnews.com"
    ],
    "sourceUrl": "https://www.foxnews.com",
    "type": "script",
    "url": "https://global.fncstatic.com/static/isa/app/lib/VisitorAPI.js"
  },
  {
    "filters": [
      "/stat.php?"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://s95.cnzz.com/stat.php?"
  },
  {
    "filters": [
      "||d.adroll.com^$third-party",
      "||d.adroll.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://d.adroll.com"
  },
  {
    "filters": [
      "||a-ssl.ligatus.com^$third-party",
      "||ligatus.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://a-ssl.ligatus.com"
  },
  {
    "filters": [
      "/collectStats;"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ameblo.jp/_api/collectStats;data=f;kind=view;device=sp;v=1540302801954"
  },
  {
    "filters": [
      "||sy.ameblo.jp^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://sy.ameblo.jp"
  },
  {
    "filters": [
      "||adroll.com/pixel/"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://d.adroll.com/pixel/"
  },
  {
    "filters": [
      "*/blockadblock.$script,redirect=fuckadblock.js-3.2.0"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://news.livedoor.com/js/lite/blockadblock.js"
  },
  {
    "filters": [
      "||google-analytics.com/ga_exp.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.google-analytics.com/ga_exp.js"
  },
  {
    "filters": [
      "||trw12.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://trw12.com"
  },
  {
    "filters": [
      "||ln.ameba.jp^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ln.ameba.jp"
  },
  {
    "filters": [
      "||uservoice.com^*/track.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://by2.uservoice.com/t2/204861/web/track.js"
  },
  {
    "filters": [
      "/tracker.php?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://t.cqq5id8n.com/tracker.php?"
  },
  {
    "check": true,
    "filters": [
      "||bid.g.doubleclick.net^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://bid.g.doubleclick.net"
  },
  {
    "filters": [
      "||pagead2.googlesyndication.com/pagead/js/adsbygoogle.js$script,redirect=googletagmanager.com/gtm.js,domain=breitbart.com"
    ],
    "sourceUrl": "https://www.breitbart.com",
    "type": "script",
    "url": "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
  },
  {
    "filters": [
      "-ads3.htm"
    ],
    "sourceUrl": "https://",
    "type": "other",
    "url": "https://www.breitbart.com/t/assets/iframe/fb-ads3.html"
  },
  {
    "filters": [
      "||ligatus.com/rms/rend?"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://ssl.ligatus.com/rms/rend?"
  },
  {
    "filters": [
      ".com/z.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://c.woopic.com/z.gif?"
  },
  {
    "filters": [
      "/px.gif?"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://ssl.ligatus.com/render/px.gif?"
  },
  {
    "filters": [
      "||invitemedia.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://pixel.invitemedia.com"
  },
  {
    "filters": [
      "||ligadx.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://adx.ligadx.com"
  },
  {
    "filters": [
      "||beampulse.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://as-2313968.cdn.beampulse.com"
  },
  {
    "check": true,
    "filters": [
      "||sync.adap.tv^",
      "||adap.tv^$~object-subrequest,third-party",
      "||adap.tv^",
      "||adap.tv^$third-party,image"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://sync.adap.tv"
  },
  {
    "filters": [
      "/amzn_ads.",
      "||amazon-adsystem.com/aax2/amzn_ads.js$script,redirect=amazon-adsystem.com/aax2/amzn_ads.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://c.amazon-adsystem.com/aax2/amzn_ads.js"
  },
  {
    "filters": [
      "||smartredirect.de^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://js.smartredirect.de"
  },
  {
    "check": true,
    "filters": [
      "||adaptv.advertising.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://sync.adaptv.advertising.com"
  },
  {
    "filters": [
      "||sy.amebame.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://sy.amebame.com"
  },
  {
    "filters": [
      "||loopme.me^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://csync.loopme.me"
  },
  {
    "filters": [
      "||stackadapt.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://sync.srv.stackadapt.com"
  },
  {
    "filters": [
      ".net/ad2/",
      "@@||fastly.net/ad2/$image,script,xmlhttprequest"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://0914.global.ssl.fastly.net/ad2/"
  },
  {
    "filters": [
      "||facebook.com/audiencenetwork/$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://www.facebook.com/audiencenetwork/"
  },
  {
    "filters": [
      "/onead."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://onead.onevision.com.tw"
  },
  {
    "filters": [
      "||powerlinks.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://px.powerlinks.com"
  },
  {
    "filters": [
      "||conative.de^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.conative.de"
  },
  {
    "filters": [
      "||nativendo.de^$third-party",
      "||d.nativendo.de^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://d.nativendo.de"
  },
  {
    "filters": [
      "||logsss.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://glsdk.logsss.com"
  },
  {
    "filters": [
      "||affasi.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://js.affasi.com"
  },
  {
    "filters": [
      "||rhythmxchange.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://sync.rhythmxchange.com"
  },
  {
    "filters": [
      "||afy11.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ad.afy11.net"
  },
  {
    "filters": [
      "||permutive.com^",
      "||permutive.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.permutive.com"
  },
  {
    "filters": [
      "728x90.jpg|",
      "_728x90."
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://img.gmw.cn/index_banner/20180920_wlzgj_728x90.jpg"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "script",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "/us.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://sync.go.sonobi.com/us.gif?"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "/geoip?"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://api.permutive.com/v2.0/geoip?"
  },
  {
    "filters": [
      "||df-srv.de^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://d.df-srv.de"
  },
  {
    "filters": [
      "||baidu.com/pixel?"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://cm.pos.baidu.com/pixel?"
  },
  {
    "filters": [
      "/ads_door."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://ent.ltn.com.tw/assets/js/ads_door.js"
  },
  {
    "filters": [
      "/_bm/bd-"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://m.olx.ua/_bm/bd-1-30"
  },
  {
    "check": true,
    "filters": [
      "||taboola.com^*/notify-impression?$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://nr.taboola.com/newsroom/1.0/cbsinteractive-cbssports/notify-impression?"
  },
  {
    "filters": [
      "||kameleoon.eu^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://9omvin7vhk.kameleoon.eu"
  },
  {
    "filters": [
      "||polarcdn-pentos.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://polarcdn-pentos.com"
  },
  {
    "filters": [
      "/nativeads/*"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://polarcdn-terrax.com/nativeads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "||exposebox.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://server.exposebox.com"
  },
  {
    "filters": [
      "||storygize.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.storygize.net"
  },
  {
    "check": true,
    "filters": [
      "||rtax.criteo.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://rtax.criteo.com"
  },
  {
    "filters": [
      "||webterren.com/webdig.js?"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://cl.webterren.com/webdig.js?"
  },
  {
    "filters": [
      "||washingtonpost.com/wp-stat/analytics/",
      "@@||washingtonpost.com/wp-stat/analytics/latest/main.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.washingtonpost.com/wp-stat/analytics/latest/main.js"
  },
  {
    "filters": [
      "/adimage/*"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://img1.kakaku.k-img.com/images/ad/adadmin/adimage/"
  },
  {
    "filters": [
      "/trk.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://trk.freepik.com/trk.gif?"
  },
  {
    "filters": [
      "||r.orange.fr^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://r.orange.fr"
  },
  {
    "filters": [
      "||d1m6l9dfulcyw7.cloudfront.net^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://d1m6l9dfulcyw7.cloudfront.net"
  },
  {
    "filters": [
      "||arcpublishing.com^*/datapoint/save"
    ],
    "sourceUrl": "https://",
    "type": "fetch",
    "url": "https://cdn-api.arcpublishing.com/v1.0/loxodo/datapoint/save"
  },
  {
    "filters": [
      "/adswrapper."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://o.aolcdn.com/ads/adsWrapper.js"
  },
  {
    "filters": [
      "_fpn.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://fpn.flipboard.com/pix/__fpn.gif?"
  },
  {
    "filters": [
      "||kameleoon.com^$third-party",
      "/visit.gif?"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://tlp-04.kameleoon.com/visit.gif?"
  },
  {
    "filters": [
      "||contentsquare.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://c.contentsquare.net"
  },
  {
    "filters": [
      "||atwola.com^$third-party",
      "||atwola.com^",
      "/addyn/3.0/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://at.atwola.com/addyn/3.0/"
  },
  {
    "filters": [
      "||geo.yahoo.com^"
    ],
    "sourceUrl": "https://",
    "type": "other",
    "url": "https://geo.yahoo.com"
  },
  {
    "filters": [
      "-prebid.$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://a.fsdn.com/con/js/sftheme/vendor/bizx-prebid.js"
  },
  {
    "filters": [
      "/adframe."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://a.fsdn.com/con/js/adframe.js"
  },
  {
    "filters": [
      "||mediavoice.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://plugin.mediavoice.com"
  },
  {
    "filters": [
      "||polarmobile.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://meraxes-cdn.polarmobile.com"
  },
  {
    "filters": [
      "||al.autohome.com.cn^",
      "_pv_init?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://al.autohome.com.cn/mda_pv_init?"
  },
  {
    "filters": [
      "||autohome.com.cn/impress?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://pcmx.autohome.com.cn/impress?"
  },
  {
    "filters": [
      "/bannerfarm."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://bannerfarm.aolp.jp"
  },
  {
    "filters": [
      "||adtechus.com^$third-party",
      "||adtechus.com^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://aka-cdn.adtechus.com"
  },
  {
    "filters": [
      "/dcs.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://sdc-qczj.pingan.com:12743/dcs8ucp91bkqoash0ixxdenxe_9h1b/dcs.gif?"
  },
  {
    "filters": [
      "||ced.sascdn.com^",
      "||sascdn.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ced.sascdn.com"
  },
  {
    "filters": [
      "||mediav.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://static.mediav.com"
  },
  {
    "filters": [
      "||widget.engageya.com/engageya_loader.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://widget.engageya.com/engageya_loader.js"
  },
  {
    "filters": [
      "/adimg.$domain=~adimg.ru"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://adimg.daumcdn.net"
  },
  {
    "filters": [
      "||d3cxv97fi8q177.cloudfront.net^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://d3cxv97fi8q177.cloudfront.net"
  },
  {
    "filters": [
      ".com/3.gif?"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://cl3.webterren.com/3.gif?"
  },
  {
    "filters": [
      "||btstatic.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://s.btstatic.com"
  },
  {
    "filters": [
      ".theadtech."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://pixels.dsp.theadtech.com"
  },
  {
    "filters": [
      "||mediarithmics.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://cookie-matching.mediarithmics.com"
  },
  {
    "filters": [
      "||taggify.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://sync.taggify.net"
  },
  {
    "filters": [
      "/ssl-intgr-net/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s3.amazonaws.com/ssl-intgr-net/"
  },
  {
    "filters": [
      "/banners/ad_",
      "||com/banners/$image,object,subdocument"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://o.kooora.com/banners/Ad_21_10_18_320x50.jpg"
  },
  {
    "filters": [
      "/pv_count."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://al.autohome.com.cn/pv_count.php"
  },
  {
    "filters": [
      "_pv_log?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://al.autohome.com.cn/mda_pv_log?"
  },
  {
    "filters": [
      "/cover_ad."
    ],
    "sourceUrl": "http://",
    "type": "stylesheet",
    "url": "http://sports.ltn.com.tw/assets/css/cover_ad.css"
  },
  {
    "filters": [
      "||eyereturn.com^$third-party",
      "||eyereturn.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://cm.eyereturn.com"
  },
  {
    "filters": [
      "||thebrighttag.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://s.thebrighttag.com"
  },
  {
    "check": true,
    "filters": [
      "||ce.lijit.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ce.lijit.com"
  },
  {
    "filters": [
      "||atemda.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://atemda.com"
  },
  {
    "filters": [
      "||smartclip.net^$~object-subrequest,third-party",
      "||smartclip.net^$third-party",
      "||smartclip.net^$third-party,image"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ad.sxp.smartclip.net"
  },
  {
    "filters": [
      "/adswrapperintl."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s.aolcdn.com/ads/adsWrapperIntl.min.js"
  },
  {
    "filters": [
      "||publir.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://a.publir.com"
  },
  {
    "filters": [
      "||email-match.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://atout.email-match.com"
  },
  {
    "filters": [
      "||onthe.io^$script,third-party",
      "||onthe.io^$third-party,script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.onthe.io"
  },
  {
    "filters": [
      "||nervoussummer.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://nervoussummer.com"
  },
  {
    "filters": [
      "||tracker.nbcuas.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://tracker.nbcuas.com"
  },
  {
    "filters": [
      "||kampyle.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn-usent.kampyle.com"
  },
  {
    "filters": [
      "||n.mailfire.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://n.mailfire.io"
  },
  {
    "filters": [
      "||revcontent.com^$third-party",
      "||revcontent.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://trends.revcontent.com"
  },
  {
    "filters": [
      "||tt.onthe.io^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://tt.onthe.io"
  },
  {
    "filters": [
      "||d3qxwzhswv93jk.cloudfront.net^",
      "||cloudfront.net/esf.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://d3qxwzhswv93jk.cloudfront.net/esf.js"
  },
  {
    "check": true,
    "filters": [
      "||pagefair.com^$third-party",
      "||pagefair.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://asset.pagefair.com"
  },
  {
    "filters": [
      "||pagefair.net^$third-party",
      "||pagefair.net^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://asset.pagefair.net"
  },
  {
    "filters": [
      "@@||global.fncstatic.com/$script,domain=video.foxnews.com"
    ],
    "sourceUrl": "https://video.foxnews.com",
    "type": "script",
    "url": "https://global.fncstatic.com/"
  },
  {
    "check": true,
    "filters": [
      "/adimages/*$~subdocument",
      "/adsense.$domain=~adsense.az|~adsense.googleblog.com"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://asset.pagefair.com/adimages/adsense.js"
  },
  {
    "filters": [
      "/adition."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://imagesrv.adition.com/js/adition.js"
  },
  {
    "check": true,
    "filters": [
      "/stats/page_view_"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://stats.pagefair.com/stats/page_view_event"
  },
  {
    "filters": [
      "/pxl.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://s.yimg.com/ap/build/images/pxl.gif?"
  },
  {
    "filters": [
      "||growingio.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://assets.growingio.com"
  },
  {
    "check": true,
    "filters": [
      "||ads.tremorhub.com^",
      "||tremorhub.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://gklfs-ktn14.ads.tremorhub.com"
  },
  {
    "filters": [
      "||trustx.org^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://sofia.trustx.org"
  },
  {
    "filters": [
      "||kargo.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://krk.kargo.com"
  },
  {
    "filters": [
      "@@||vidible.tv/prod/$script,third-party",
      "@@||vidible.tv/prod/$media,object,other"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn-ssl.vidible.tv/prod/"
  },
  {
    "filters": [
      "||trk*.vidible.tv^",
      "/impression.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://trk.vidible.tv/trk/impression.gif?"
  },
  {
    "filters": [
      "/log/init?"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://restapi.amap.com/v3/log/init?"
  },
  {
    "filters": [
      "/pc_ads."
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://cpro.baidustatic.com/cpro/ui/noexpire/img/4.0.0/pc_ads.1x.png"
  },
  {
    "check": true,
    "filters": [
      "/advertisers/*$domain=~datalift360.com|~home.tapjoy.com|~panel.rightflow.com|~propelmedia.com|~publisuites.com"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://video.adaptv.advertising.com/ad/ads/advertisers/"
  },
  {
    "filters": [
      "/brand-ad-"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://brand-ad-innovations.s3.amazonaws.com"
  },
  {
    "filters": [
      "||probtn.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.probtn.com"
  },
  {
    "filters": [
      "||spotscenered.info^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.spotscenered.info"
  },
  {
    "filters": [
      "||clrstm.com^"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://tag.clrstm.com"
  },
  {
    "filters": [
      "||stat.tianya.cn^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://stat.tianya.cn"
  },
  {
    "filters": [
      "||collect.tianya.cn^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://collect.tianya.cn"
  },
  {
    "filters": [
      "/clickAnalyse."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://collect.tianya.cn/clickAnalyse.jsp"
  },
  {
    "check": true,
    "filters": [
      "/adserver-",
      "||adtech.advertising.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://adserver-us.adtech.advertising.com"
  },
  {
    "filters": [
      "_300_250_"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://ads.admaru.com/js/baike_admaru_300_250_mobile.js"
  },
  {
    "filters": [
      "||surveywall-api.survata.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://px.surveywall-api.survata.com"
  },
  {
    "check": true,
    "filters": [
      "||geo.query.yahoo.com^$~xmlhttprequest,domain=~mail.yahoo.com"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://geo.query.yahoo.com"
  },
  {
    "filters": [
      "||gismeteo.*/stat.gif"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.gismeteo.ru/stat.gif"
  },
  {
    "filters": [
      "|https://$image,script,subdocument,third-party,xmlhttprequest,domain=yourporn.sexy",
      "@@||ajax.googleapis.com^$script,domain=yourporn.sexy",
      "@@||googleapis.com^$script,domain=171gifs.com|1proxy.de|2ddl.download|300mbfilms.org|300mbmovies4u.lol|321jav.com|353online.com|4horlover.blogspot.com|4horlover2.blogspot.com|4proxy.de|61tube.com|69sugar.com|6jav.com|6teentube.am|7starhd.com|9xmovies.site|abcmalayalam.co|abgdianci.com|adultdouga.biz|aflamfree.net|aflamtorrent.com|agarios.org|ahlamtv.com|al.ly|alantv.net|alivefoot.us|alivefootballstreaming.com|allpeliculas.com|alltube.tv|ally.sh|amabitch.com|amateur.ug|ancensored.com|andrija-i-andjelka.com|animakai.info|anime-music.info|anime-shitai.tv|anime-sugoi.com|animeado.net|animeai.org|animeai2.net|animeid.io|animelek.com|animemusicdownload.info|animesenzalimiti.com|animesonline2hd.org|animesonlinetk.info|animesorion.org|animezone.pl|anitube.es|antenasport.eu|anyanime.com|apklover.net|aquariumgays.com|arab-moviez.org|arabloads.net|arabp2p.com|archived.moe|artgifsocean.com|asianporndistrict.com|asianxv.com|assistirfilmeshd.org|assistirfilmesonline2.net|avonline.tv|avpockiehd.com|axxomovies.in|azkempire.com|aznude.com|baixarsomusica.com|bajarjuegospcgratis.com|bakacan.com|balkandownload.org|balkanje.com|bdmusicboss.net|bdsmporn.us|bdsmstreak.com|beautiesbondage.com|becekin.net|beelink.in|behchala.com|bersek.xyz|bestsongspk.com|big4umovies.net|bilasport.pw|bitch-show.com|bitporno.com|blackboxrepack.com|blacklionmusic.com|blogqpot.com|bludv.com|bokep2017.com|bokepcewek.net|bokepseks.co|bolly2tolly.com|bouncebreak.com|brazzershd.co|btdb.in|bugiltelanjang17.com|bypassed.cab|bypassed.plus|bypassed.team|calcioitalia.stream|camrouge.com|camwhores.co|cartoonhd.be|cartoonhd.cc|cartoonhd.globa|cartoonhd.global|cartoonth12.com|catchcoin.pw|catosports.ml|centraldeanimes.biz|cholotubex.com|cinemamkv.xyz|cinetux.net|clik.pw|cliphayho.com|cloudy.ec|coastalhut.com|columbia-xxx.com|comicporno.org|comicsmanics.com|cookiesnetfl1x.com|cooltamil.com|coroas40.com|coshurl.co|couchtuner.fr|couchtuner.nu|cricbox.net|cwtube.dj|czechmoneyteens.com|dailyuploads.net|dato.porn|datpiff.biz|dblatino.com|dclinks.info|dd-books.com|debrideco.com|demonoid.co|depedlps.blogspot.com|desixnxx.net|devil-torrents.pl|discografiascompletas.net|divxatope1.com|djmazamp3.info|dokazm.mk|donlotfile.com|download-xyz.com|downloadgameps3.com|downloadgamepsp.com|downloadgamexbox.com|dragonball-time.com|drakorindo.com|drakorindofilms.com|drhmonegyi.net|dvdwap.com|dzrepackteam.com|e-hentai.me|e-jav.com|easyxtubes.com|edmdl.com|ekasiwap.com|electro-torrent.pl|embedlink.info|embedsr.to|erodouga69.com|erostar.jp|estrenosdoramas.net|estrenosdoramas.org|etsmods.net|eurostreaming.video|exposure.pw|fagken.com|fas.li|fastdrama.co|faststream.in|faststream.ws|felipephtutoriais.com.br|filecrypt.cc|filerocks.us|filesupload.org|filmaon.com|filmclub.tv|filmehd.net|filmeserialeonline.org|filmeseseriesonline.net|filmesonline1080p.com|filmesonline4.com|filmesonlineagora.com|filmesonlineplay.com|filmesonlinex.biz|filmetraduseonline.ro|filmgur.com|filmi7.com|filminvazio.com|filmovi.eu|filmozu.net|filmuptobox.net|filsex.com|flashbd24.blogspot.com|flixanity.online|freeadultcomix.com|freeiptvlinks.net|freelivesports.co|freemoviestream.xyz|freesoftwaredlul.com|fuckingsession.com|full-serie.biz|fullmaza.net|fullpinoymovies.net|futebolps2.com|fxporn.net|gameofporn.net|gamepciso.com|gamestorrent.co|garotosbrasil.com|gaycock4u.com|gaysex69.net|gibanica.club|girlswithmuscle.com|gogoanime.ch|goldchannelmovie.net|gottateens.com|gravuregirlz.com|grcrt.net|guasavemp3.com|hacknetfl1x.net|halacima.net|happy-foxie.com|haylike.net|hdarkzone.com|hdencoders.com|hdmovie16.ws|hdmovie24.net|hdmusic23.net|hdmusic25.com|hdmusic90.co|hdporner720.com|hdpornfull.co|hdpornfull.net|hdshows.in|hdteenvids.com|hdtube.co|hdzex.net|healthsoul.info|hentai-for.me|hentai-id.tv|hentai.to|hentaicomicsbr.net|hentaiplay.net|hentaiplus.co|hentaistream.co|her69.net|herobo.com|heymanga.me|hindimoviesonlines.net|hiper.cool|hkfree.co|homeporn.tv|hon3yhd.com|hqq.watch|hulkload.com|hyperdebrid.net|i-gay.org|icwutudidare.info|idolblog.org|ig2fap.com|igg-games.com|ightdl.xyz|iimgur.club|ilinks.ug|ilovefilmesonline.biz|image-bugs.com|imagecoin.net|imgshot.pw|imgsmile.com|immunicity.cab|immunicity.plus|immunicity.team|incestoporno.org|insharee.com|iprojectfreetv.us|iptvsatlinks.blogspot.com|itastreaming.gratis|ivhunter.com|iwatchgameofthrones.cc|izporn.net|jav-for.me|javeu.com|javfhd.tv|javfinder.to|javgay.com|javhd.pro|javhd4k.com|javkimochiii.com|javleak.com|javmobile.net|javmost.com|javonline.online|javpob.com|javrom.com|javstream.co|javus.net|jdownloader2premium.com|jilhub.xyz|jizzman.com|jogostorrentgratis.net|jpfiles.eu|jpgayporn.net|jpidols.tv|k18.co|k2nblog.com|karanpc.com|kingstheme.com|kingvid.tv|kissanime.ru|kissasian.com|kizzboy.com|kooora2day.com|koraspeak.com|koreansubindo.net|kreskowkazone.pl|kreskowki.tv|kshowes.net|l2s.io|lacajita.xyz|lambingan.su|layar-21.com|layarindo21.com|lecheanal.com|leech.ae|leosims.com|letsjav.com|linclik.com|link2download.net|livehd90m.info|livesoccertv.live|livestreaming24.net|loonertube.com|lyricsy.ir|macgames-download.com|macnwins.com|magesy.be|manatelugump3.net|mangacanblog.com|maniacosporcomics.com|marapcana.eu|marvin-vibez.to|masflowmusik.net|masterfilmesonlinegratis.info|maxinlive.com|mbfcast.pw|media1fire.com|megafilmeshdplus.org|megafodabr.com|megahentaicomics.com|megaseriesonline.com|megatobox.net|meguminime.com|metaserie.com|milfcomix.com|milversite.me|minatosuki.com|minatosuki.website|minhaserie.me|mitemovie.com|mixhdporn.com|mkvtv.net|mmfilmes.com|mocnoi.com|modelblog.org|movie24k.ch|movieerotic.net|moviehd-free.com|moviehd-xxx.com|movierulz.ch|movierulz.cm|movierulz.xyz|movies24hd.co|movies5x.com|moviesak47.com|moviesgoldonline.net|moviesgoldonline.pro|moviesgolds.com|movieshdgratis.com.mx|movietubenow.bz|movietv.ws|moviezplanet.org|movieztimes.com|mp3haat.com|mp3kart.cc|mp3kart.co|mp3kart.com|mp3mydownload.com|mp3puu.com|mp3songdl.net|mp4upload.com|musculoduro.com.br|muvibg.com|mylucah.co|mymoviepot.xyz|mzansifun.com|mzansiporntube.com|mzansixxx.com|namethatpornstar.com|naphi.lol|nasze-kino.online|nbafullhd.com|neko-miku.com|nekonime.com|newhdmovie24.biz|newhdmovie24.co|newhdmovies.net|newpct.com|newpct1.com|nflstream.net|ngentot.tv|ninfetasnovinhas.net|nontonanime.org|nontononlinedrama.com|nosteam.com.ro|nosteam.org.ro|nudeyoung.xyz|nulledcenter.com|nungg.com|nungmovies-hd.com|nuttit.com|nxtcomicsclub.com|ocsstream.info|ohohd.com|ohyeah1080.com|okmovie-hd.com|olangal.pro|omberbagi.com|ondeeubaixo.com|one-series.cc|onlinefilmovisaprevodom.cc|onlinefilmsitesii.net|onlinemoviesgold.one|onlinemoviesprime.net|openx.tv|opujem.com|otaku-animehd.com|otorrents.com|ottakae.com|pahe.in|pandamovie.eu|pass69.com|pcgames-download.com|peliculasabc.net|peliculasgo.com|peliculasm.tv|peliculasmega1k.com|peliculastomas01.org|pelisplus.tv|pelisxporno.com|pentasex.com|perfecthdmovies.pw|perulareshd.pw|phimotv.net|picanteeproibido.com.br|pinaycute.com|pipocao.com|pirateaccess.xyz|piratebay.co.in|planetsport.pw|playbokep.me|playpornfree.net|pleermp3.net|pokemonlaserielatino.com|polskie-torrenty.com|popjav.com|porneq.com|pornfromcz.com|pornfromczech.com|pornhardx.com|pornhd5k.com|pornhubz.tumblr.com|pornleak.net|pornlibrary.net|pornmegabox.net|pornobae.com|pornocomics.net|pornotorrent.com.br|pornotorrent.org|pornpassw0rds.com|pornsexonline.xxx|pornvibe.org|pornvxl.com|pornzexx.com|portalroms.com|portalultautv.com|primewire.io|programasvirtualespc.net|projectfreetvhd.co|projectfreetvi.info|psarips.com|pubfilmonline.net|pure-anime.tv|pussybook.xyz|putarfilm.com|q3sk-dizi.blogspot.com|querofilmehd.com|r34anim.com|rapcloud.co|reallifecamhd.com|reallifecamvd.com|ripvod.com|rosextube.com|runvideo.net|savvystreams.blogspot.co.uk|savvystreams.blogspot.com|sceper.ws|sdmoviespoint.in|serialed.blogspot.com|series-cravings.tv|seriesblanco.com|seriesblanco.tv|seriescr.com|seriesfuture.com|seriesintorrent.com|serieslatino.tv|seriesparaassistironline.org|seriesparalatinoamerica.blogspot.com|sexisfree.net|sexix.net|sexiz.net|sexkino.to|sexloading.com|sexvui.net|sexxdesi.net|sexy-youtubers.com|sexyeroticgirls.comshofonline.org|short.am|shush.se|sinevizyonda.org|singgah.in|sitpad.info|skidrow-games.io|skidrowcrack.com|skidrowgamesreloaded.com|sklns.net|sky-streams.blogspot.co.uk|soccerembed.blogspot.com|solotorrent.net|soparagamestorrents.com|spacemov.tv|speedplay.pro|sports4u.net|sportshd.me|stadium-live.biz|streamcherry.com|streamingok.com|streamlord.com|streampornfree.com|strikeout.co|suki48.web.id|superteenz.com|sweext.com|tamilmv.eu|tamilmv.vc|tamilrasigan.net|tamilyogi.fm|teenboytwink.com|teentubeq.com|tele-wizja.com|telugudon.com|telugupalaka.com|teluguringtones.co|telugusexstorieskathalu.net|tfpdl.de|theapricity.com|thebarchive.com|thebestofcafucus.com|thepiratebay.cd|thepiratebay24.ga|thepiratebay3.org|theputlocker.net|thesimplebay.pro|thevid.net|thiruttuvcd.me|thplayers.com|tlenovelas.net|todaypk.ag|todaypk.li|todoinmega.com|tokusatsuindo.com|torjackan.info|torrentcounter.cc|torrentfilmesbr.com|torrentlocura.com|torrentool.com|torrentoon.com|torrentrapid.com|torrentscompletos.com|torrentsgroup.com|tousatu.biz|tr7music.me|tuhentaionline.com|tumejortorrent.com|tuportaldemusica.com|turkishseries.li|tuserie.com|tushyporn.net|tvrex.net|twitchstats.net|u2s.io|ufreetv.com|unblocked.cab|unblocked.plus|unblocked.team|unduhfilmrama.biz|upcomics.org|uporniahd.com|urle.co|usabit.com|uskip.me|utaseries.co|utaseries.com|uwatchfree.co|v100v.net|vdizpk.com|veekyforums.com|veporn.net|vercanalestv.com|verdirectotv.com|verpeliculasporno.gratis|vertusnovelas.net|veyqo.net|veziserialeonline.info|vibokep.info|vidabc.com|video.az|videobokepgratis.me|videobokepincest.xyz|videoexa.com|videosexbokep.org|videosnudes.com|vidiobokeptop.com|vidtome.co|vidz7.com|vidzcode.com|viooz.ac|vipracing.biz|viralshow.info|vivatorrents.com|viveseries.com|vivetusnovelas.com|vixvids.to|vpondo.com|vpornex.com|watchaha.com|watcharcheronline.com|watchcommunity.cc|watchcommunity.tv|watchers.to|watchfomny.tv|watchjavidol.com|watchjavonline.com|watchme247.co.il|watchparksandrecreation.cc|watchpornfree.me|watchtheofficeonline.cc|watchtheofficeonline.net|watchxxxparody.com|wetblog.org|wibudesu.com|wolverdon-filmes.com|world4ufree.ws|worldvidz.com|wplocker.com|xdvideos.org|xfilmywap.com|xgatinhas.com|xkorean.net|xmovies1.com|xmovies247.com|xmovies8.org|xrares.com|xteenchan.com|xvideospanish.com|xxgasm.com|xxhdporn.com|xxx-comics.com|xxxstooorage.com|yallakora-online.com|yedhit.com|yeucontrai.com|yify-torrent.xyz|yify.bz|yodrama.com|youpornzz.com|yourporn.sexy|youswear.com|ytsyify.com|yuptorrents.com|yuuk.net|zambianobserver.com|zfilmeonline.eu|zippymoviez.top|zippysharealbum.download|zonavideo.net|zone-series.cc|zoocine.co|zoomtv.me|zw-net.com"
    ],
    "sourceUrl": "https://www.yourporn.sexy",
    "type": "script",
    "url": "https://ajax.googleapis.com"
  },
  {
    "filters": [
      "@@||trafficdeposit.com//blog/$image,domain=yourporn.sexy"
    ],
    "sourceUrl": "https://www.yourporn.sexy",
    "type": "image",
    "url": "https://s17.trafficdeposit.com//blog/"
  },
  {
    "filters": [
      "@@||trafficdeposit.com/blog/$image,domain=yourporn.sexy"
    ],
    "sourceUrl": "https://www.yourporn.sexy",
    "type": "image",
    "url": "https://s18.trafficdeposit.com/blog/"
  },
  {
    "filters": [
      "||clcknads.pro^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ca.clcknads.pro"
  },
  {
    "filters": [
      "||flickr.com/beacon_"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://www.flickr.com/beacon_page_timings.gne"
  },
  {
    "filters": [
      "||events.ocdn.eu^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://events.ocdn.eu"
  },
  {
    "filters": [
      "||kropka.onet.pl^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://kropka.onet.pl"
  },
  {
    "filters": [
      "||ad.71i.de^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ad.71i.de"
  },
  {
    "filters": [
      "||2mdn.net^$third-party,media"
    ],
    "sourceUrl": "http://",
    "type": "media",
    "url": "https://gcdn.2mdn.net"
  },
  {
    "filters": [
      "/ad.html?",
      "/html/ad."
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://img.scupio.com/html/ad.html?"
  },
  {
    "filters": [
      "/ad/images/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://img.scupio.com/ad/images/"
  },
  {
    "filters": [
      "||csr.onet.pl^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://csr.onet.pl"
  },
  {
    "filters": [
      "||constintptr.com^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.constintptr.com"
  },
  {
    "filters": [
      "@@||yps.link/emoji/$image,domain=yourporn.sexy"
    ],
    "sourceUrl": "https://www.yourporn.sexy",
    "type": "image",
    "url": "https://yps.link/emoji/"
  },
  {
    "filters": [
      "/adplayer.$domain=~adplayer.media"
    ],
    "sourceUrl": "https://",
    "type": "stylesheet",
    "url": "https://acdn.adnxs.com/as/1d/extensions/adplayer.css"
  },
  {
    "filters": [
      "||tagger.opecloud.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tagger.opecloud.com"
  },
  {
    "filters": [
      "/banner.php"
    ],
    "sourceUrl": "http://",
    "type": "xhr",
    "url": "http://waptianqi.2345.com/public/banner.php"
  },
  {
    "check": true,
    "filters": [
      "||adserver.71i.de^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://adserver.71i.de"
  },
  {
    "filters": [
      "-720x120-"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://waptianqi.2345.com/images/s11/2018-720x120-2.gif"
  },
  {
    "filters": [
      "/stat.js?"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://s.zol-img.com.cn/bms/js/stat.js?"
  },
  {
    "filters": [
      "||spanids.dictionary.com^"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://spanids.dictionary.com"
  },
  {
    "filters": [
      "||track.thesaurus.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://track.thesaurus.com"
  },
  {
    "filters": [
      "||spanids.thesaurus.com^"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://spanids.thesaurus.com"
  },
  {
    "filters": [
      "@@||cdn.shopify.com^*/assets/$script,third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://cdn.shopify.com/s/assets/"
  },
  {
    "check": true,
    "filters": [
      "||ad.doubleclick.net^$third-party,other"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://ad.doubleclick.net"
  },
  {
    "filters": [
      "/AppMeasurement.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.samsung.com/etc/designs/smg/global/js/AppMeasurement.js"
  },
  {
    "filters": [
      "/stat.gif?",
      ".gif?event="
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://referrer.disqus.com/juggler/stat.gif?event=lounge.loading.view"
  },
  {
    "filters": [
      "||px.spiceworks.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://px.spiceworks.com"
  },
  {
    "filters": [
      "||proxad.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://statsweb.proxad.net"
  },
  {
    "filters": [
      "/images/ads/*"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://waptianqi.2345.com/images/ads/"
  },
  {
    "filters": [
      "||vidcpm.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.vidcpm.com"
  },
  {
    "filters": [
      "@@||ensighten.com^*/code/$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://nexus.ensighten.com/samsungde/prod/code/"
  },
  {
    "filters": [
      "||levexis.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://sec.levexis.com"
  },
  {
    "filters": [
      "||idio.co^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://js.idio.co"
  },
  {
    "filters": [
      "/snowplow/*$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://d78fikflryjgj.cloudfront.net/lib/snowplow/"
  },
  {
    "filters": [
      "||hs-analytics.net^",
      "||hs-analytics.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://js.hs-analytics.net"
  },
  {
    "filters": [
      "/pix.gif?"
    ],
    "sourceUrl": "https://",
    "type": "fetch",
    "url": "https://metrics.gfycat.com/pix.gif?"
  },
  {
    "filters": [
      "/b/ss/*/JS-"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://omtr2.partners.salesforce.com/b/ss/salesforcemarketing/1/JS-2.4.0"
  },
  {
    "filters": [
      "||adbetclickin.pink^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://serving.adbetclickin.pink"
  },
  {
    "filters": [
      "||litix.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://img.litix.io"
  },
  {
    "filters": [
      "||pardot.com/pd.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://pi.pardot.com/pd.js"
  },
  {
    "filters": [
      "||lh.secure.yahoo.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://lh.secure.yahoo.com"
  },
  {
    "filters": [
      "||d8rk54i4mohrb.cloudfront.net^",
      "||cloudfront.net/js/reach.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://d8rk54i4mohrb.cloudfront.net/js/reach.js"
  },
  {
    "filters": [
      "||track.hubspot.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://track.hubspot.com"
  },
  {
    "filters": [
      "||invoca.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://pnapi.invoca.net"
  },
  {
    "filters": [
      "||simplereach.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://edge.simplereach.com"
  },
  {
    "filters": [
      "||csbew.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://static.csbew.com"
  },
  {
    "filters": [
      ".com/analytics?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://pi.pardot.com/analytics?"
  },
  {
    "filters": [
      "||click.suning.cn^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://click.suning.cn"
  },
  {
    "filters": [
      "||stat.pladform.ru^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://stat.pladform.ru"
  },
  {
    "filters": [
      "/tizers.php?"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://recreativ.ru/tizers.php?"
  },
  {
    "filters": [
      "||o12zs3u2n.com^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.o12zs3u2n.com"
  },
  {
    "filters": [
      "||cityadspix.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://cityadspix.com"
  },
  {
    "filters": [
      "_ads.js?",
      "_show_ads."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.eyny.com/data/cache/js_show_ads.js?"
  },
  {
    "filters": [
      "||s-vop.sundaysky.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://s-vop.sundaysky.com"
  },
  {
    "filters": [
      "||ethn.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ethn.io"
  },
  {
    "filters": [
      "=728x90&"
    ],
    "sourceUrl": "http://",
    "type": "xhr",
    "url": "http://www.eyny.com/ads&channel=1&format=728x90&type=image&border=0&ajax=1"
  },
  {
    "filters": [
      "||browsiprod.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://events.browsiprod.com"
  },
  {
    "filters": [
      "/advertise/*$domain=~legl.co"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://a235.static-file.com/shared/upload/advertise/"
  },
  {
    "filters": [
      "/pixelcounter."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://pixelcounter.marca.com"
  },
  {
    "check": true,
    "filters": [
      "||tradedoubler.com^",
      "||tradedoubler.com^$third-party",
      "||imp*.tradedoubler.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://impes.tradedoubler.com"
  },
  {
    "filters": [
      "/advert/*"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://rutube.ru/api/advert/"
  },
  {
    "filters": [
      "/ads/1."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ads.jeded.com/ads/1.js"
  },
  {
    "filters": [
      "||x.fidelity-media.com^$third-party",
      "/delivery/hb.php"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://x.fidelity-media.com/delivery/hb.php"
  },
  {
    "filters": [
      "||ad4game.com^$third-party",
      "||ad4game.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://ads.ad4game.com"
  },
  {
    "check": true,
    "filters": [
      "@@||jwpsrv.com^$xmlhttprequest"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://assets-jpcust.jwpsrv.com"
  },
  {
    "filters": [
      "||bannersnack.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.bannersnack.com"
  },
  {
    "filters": [
      "/admax/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ads.nexage.com/js/admax/"
  },
  {
    "filters": [
      "||zeotap.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://spl.zeotap.com"
  },
  {
    "filters": [
      "/adserve."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://mtcmed02.nexage.com/admax/adServe.do"
  },
  {
    "filters": [
      "||slack.com/clog/track/"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://slack.com/clog/track/"
  },
  {
    "filters": [
      "@@||cdn.ndtv.com/static/$script,domain=ndtv.com",
      "@@||ndtv.com^$script,first-party",
      "@@||ndtv.com^$first-party,script"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://cdn.ndtv.com/static/"
  },
  {
    "filters": [
      "||ndtv.com^*/banner/"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://drop.ndtv.com/albums/uploadedpics/banner/"
  },
  {
    "filters": [
      "||d1ivexoxmp59q7.cloudfront.net^*/live.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://d1ivexoxmp59q7.cloudfront.net/slack/live.js"
  },
  {
    "filters": [
      "||ad.atdmt.com/m/"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ad.atdmt.com/m/"
  },
  {
    "filters": [
      "||convertro.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://slack.sp1.convertro.com"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "script",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://drop.ndtv.com"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://drop.ndtv.com"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://drop.ndtv.com"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://cdn.ndtv.com"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://cdn.ndtv.com"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://electionsdata.ndtv.com"
  },
  {
    "filters": [
      "||amazonaws.com^$script,domain=300mbdownload.net|bittorrent.am|globes.co.il|grantorrent.net|hdvid.life|hdvid.tv|hdvid.xyz|kannadamovies.biz|katcr.host|macupload.net|mp3goo.com|ndtv.com|onhax.me|onvid.club|onvid.xyz|rgmechanicsgames.com|serietvsubita.net|streamplay.to|thevideobee.to|usersfiles.com|vshare.eu"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://s3.amazonaws.com"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "script",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://drop.ndtv.com"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://edata.ndtv.com"
  },
  {
    "filters": [
      "/adfox.$domain=~adfox.de|~adfox.group|~adfox.hu"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn1.img.ria.ru/min/js/libs/banners/adfox.loader.bind.js"
  },
  {
    "filters": [
      "/ad.css?"
    ],
    "sourceUrl": "https://",
    "type": "stylesheet",
    "url": "https://www.duba.com/static/v2/css/home/ad/ad.css?"
  },
  {
    "filters": [
      "||decibelinsight.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.decibelinsight.net"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://sports.ndtv.com"
  },
  {
    "filters": [
      ".ie/ads/",
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.ie",
    "type": "image",
    "url": "https://www.google.ie/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.ie",
    "type": "image",
    "url": "https://www.google.ie/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.ie",
    "type": "image",
    "url": "https://www.google.ie/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.ie",
    "type": "image",
    "url": "https://www.google.ie/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.ie",
    "type": "image",
    "url": "https://www.google.ie/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.ie",
    "type": "image",
    "url": "https://www.google.ie/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.ie",
    "type": "image",
    "url": "https://www.google.ie/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.ie",
    "type": "image",
    "url": "https://www.google.ie/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.ie",
    "type": "image",
    "url": "https://www.google.ie/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.ie",
    "type": "image",
    "url": "https://www.google.ie/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.ie",
    "type": "image",
    "url": "https://www.google.ie/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.ie",
    "type": "image",
    "url": "https://www.google.ie/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.ie",
    "type": "image",
    "url": "https://www.google.ie/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://www.google.ie",
    "type": "image",
    "url": "https://www.google.ie/ads/"
  },
  {
    "filters": [
      "||optimix.asia^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://bshare.optimix.asia"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://drop.ndtv.com"
  },
  {
    "filters": [
      "@@||ensighten.com^*/Bootstrap.js$domain=americanexpress.com|caranddriver.com|cart.autodesk.com|citizensbank.com|dell.com|france24.com|homedepot.com|hp.com|rfi.fr|sbs.com.au|sfgate.com|staples.com|t-mobile.com|target.com|verizonwireless.com|williamhill.com|zales.com"
    ],
    "sourceUrl": "https://www8.hp.com",
    "type": "script",
    "url": "https://nexus.ensighten.com/hp/hpcom_prod/Bootstrap.js"
  },
  {
    "filters": [
      "||d41.co^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://vid0377.d41.co"
  },
  {
    "filters": [
      "||trugaze.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.trugaze.io"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://edata.ndtv.com"
  },
  {
    "filters": [
      "/QualtricsSurvey."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ssl.www8.hp.com/h10000/cma/ng/lib/survey/qualtricsSurvey.js"
  },
  {
    "check": true,
    "filters": [
      "||ad.linksynergy.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ad.linksynergy.com"
  },
  {
    "filters": [
      "/adblockDetector."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static.addevweb.com/SMSdk/assets/AdBlockDetection/adblockDetector.js"
  },
  {
    "filters": [
      "||collect.igodigital.com^$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://1339402.collect.igodigital.com"
  },
  {
    "filters": [
      ".com/gads/"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://index.sindonews.com/gads/"
  },
  {
    "filters": [
      "/adtag.",
      "||adtag.cc^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://adtag.cc"
  },
  {
    "filters": [
      "||sentemanactri.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://b.sentemanactri.com"
  },
  {
    "filters": [
      "||wbtrk.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://um.wbtrk.net"
  },
  {
    "filters": [
      "||ria.ru/js/counter.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://a.ria.ru/js/counter.js"
  },
  {
    "filters": [
      "@@||tags.w55c.net/rs?*&t=marketing$image"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://tags.w55c.net/rs?id=d8e93f81826a42119aa6c2618664e8e8&t=marketing"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "script",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "/ads/ads."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://beeg.com/static/js/ads/ads.js"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "||beeg.com/logo.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://beeg.com/logo.gif?"
  },
  {
    "filters": [
      "||videoplaza.tv^$~object-subrequest,third-party",
      "||videoplaza.tv^$third-party,other"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://es-sunicontent.videoplaza.tv"
  },
  {
    "filters": [
      "/adlabel."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://static.addevweb.com/SMSdk/ico/adlabel.png"
  },
  {
    "check": true,
    "filters": [
      "||juicyads.com^$third-party",
      "||juicyads.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://adserver.juicyads.com"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://drop.ndtv.com"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://drop.ndtv.com"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://cdn.ndtv.com"
  },
  {
    "filters": [
      "||s-onetag.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://get.s-onetag.com"
  },
  {
    "filters": [
      "||stats.cloudwp.io^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://stats.cloudwp.io"
  },
  {
    "filters": [
      "/event.cgi?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ad.adriver.ru/cgi-bin/event.cgi?"
  },
  {
    "filters": [
      "/nativeads."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ads.exosrv.com/nativeads.js"
  },
  {
    "filters": [
      "/adshow."
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://adserver.juicyads.com/adshow.php"
  },
  {
    "filters": [
      "||adrecover.com^$third-party",
      "||adrecover.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://delivery.adrecover.com/27265/adRecover.js"
  },
  {
    "filters": [
      "||tongji.mafengwo.cn^",
      "/stat_click."
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://tongji.mafengwo.cn/stat_click.gif"
  },
  {
    "filters": [
      "@@||d1l6p2sc9645hc.cloudfront.net/tracker.js|"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://d1l6p2sc9645hc.cloudfront.net/tracker.js"
  },
  {
    "filters": [
      "||twitter.com/i/csp_report?"
    ],
    "sourceUrl": "https://",
    "type": "other",
    "url": "https://twitter.com/i/csp_report?"
  },
  {
    "filters": [
      "||atas.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://spot-01.atas.io"
  },
  {
    "filters": [
      "||data.gosquared.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://data.gosquared.com"
  },
  {
    "filters": [
      "||adlooxtracking.com^$third-party",
      "||adlooxtracking.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://as.adlooxtracking.com"
  },
  {
    "filters": [
      "/adcontrol."
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://m.mafengwo.cn/news/adControl.php"
  },
  {
    "filters": [
      "||epimg.net/js/pbs/"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ep00.epimg.net/js/pbs/"
  },
  {
    "filters": [
      "/pxlctl."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://pxlctl.elpais.com"
  },
  {
    "filters": [
      "/AudienceNetworkPrebid.",
      "@@||connect.facebook.*/*/AudienceNetworkPrebid.js$script,domain=cbssports.com",
      "@@||connect.facebook.com^*/AudienceNetworkPrebid.js$domain=cbssports.com"
    ],
    "sourceUrl": "https://www.cbssports.com",
    "type": "script",
    "url": "https://connect.facebook.com/en_US/AudienceNetworkPrebid.js"
  },
  {
    "filters": [
      "@@||imasdk.googleapis.com/js/sdkloader/ima3.js$domain=allcatvideos.com|audiomack.com|beinsports.com|blastingnews.com|bloomberg.com|cbc.ca|cbsnews.com|cbssports.com|cnet.com|complex.com|cwtv.com|dramafever.com|gamejolt.com|healthmeans.com|indystar.com|metrolyrics.com|mobg.io|news.sky.com|play.ludigames.com|player.performgroup.com|powr.com|rumble.com|snopes.com|thestreet.com|theverge.com|ultimedia.com|usatoday.com|video.foxbusiness.com|video.foxnews.com|vidyomani.com|yiv.com"
    ],
    "sourceUrl": "https://www.cbssports.com",
    "type": "script",
    "url": "https://imasdk.googleapis.com/js/sdkloader/ima3.js"
  },
  {
    "filters": [
      "||infinigraph.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://dst.infinigraph.com"
  },
  {
    "filters": [
      "@@||connect.facebook.net^*/AudienceNetworkPrebid.js$domain=cbssports.com"
    ],
    "sourceUrl": "https://www.cbssports.com",
    "type": "script",
    "url": "https://connect.facebook.net/en_US/AudienceNetworkPrebid.js"
  },
  {
    "filters": [
      "/track_event."
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://tongji.mafengwo.cn/track_event.gif"
  },
  {
    "filters": [
      "||mediametrics.ru^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://mediametrics.ru"
  },
  {
    "filters": [
      "||optmd.com^"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://cdn.optmd.com"
  },
  {
    "filters": [
      "||eqads.com^$third-party",
      "||eqads.com^"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://um2.eqads.com"
  },
  {
    "filters": [
      "||nrich.ai^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://dsp.nrich.ai"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://edata.ndtv.com"
  },
  {
    "filters": [
      "/videoads/*"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://preview-design.gridtechno.com/VIDEOADS/"
  },
  {
    "filters": [
      "/log/analytics"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://open.spotify.com/log/analytics"
  },
  {
    "filters": [
      "||news.smi2.ru^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://news.smi2.ru"
  },
  {
    "filters": [
      "||lentainform.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://jsn.lentainform.com"
  },
  {
    "filters": [
      "||infox.sg^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://rb.infox.sg"
  },
  {
    "filters": [
      "||btrll.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://geo-um.btrll.com"
  },
  {
    "filters": [
      "||target.smi2.net^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://target.smi2.net"
  },
  {
    "filters": [
      "||nicequest.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://mpc.nicequest.com"
  },
  {
    "filters": [
      "||nanovisor.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://cenome.nanovisor.io"
  },
  {
    "filters": [
      "&ad_url="
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://s0.2mdn.net/1635909/1x1image.jpg?&ad_url="
  },
  {
    "filters": [
      "&ad_channel="
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://connect.facebook.net/favicon.ico?&ad_channel="
  },
  {
    "filters": [
      "||ads.twitter.com^",
      "&ad_number="
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ads.twitter.com/favicon.ico?&ad_number="
  },
  {
    "filters": [
      "||intellimize.co^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://api.intellimize.co"
  },
  {
    "filters": [
      "||btttag.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://slickdeals.btttag.com"
  },
  {
    "filters": [
      "/us-ads."
    ],
    "sourceUrl": "https://",
    "type": "other",
    "url": "https://us-ads.openx.net"
  },
  {
    "filters": [
      "||tracking.epicgames.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tracking.epicgames.com"
  },
  {
    "filters": [
      "||target.smi2.ru^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://target.smi2.ru"
  },
  {
    "filters": [
      "/track.png?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://tracking.epicgames.com/track.png?"
  },
  {
    "filters": [
      "||group-ib.ru^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://ibbe.group-ib.ru"
  },
  {
    "filters": [
      "||run-syndicate.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.run-syndicate.com"
  },
  {
    "filters": [
      "||heapanalytics.com^",
      "||heapanalytics.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.heapanalytics.com"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://cdn.ndtv.com"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://cdn.ndtv.com"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://cdn.ndtv.com"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://cdn.ndtv.com"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://cdn.ndtv.com"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://cdn.ndtv.com"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://cdn.ndtv.com"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://cdn.ndtv.com"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://cdn.ndtv.com"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://electionsdata.ndtv.com"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://cdn.ndtv.com"
  },
  {
    "filters": [
      "||chinadaily.com.cn/s?"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://same.chinadaily.com.cn/s?"
  },
  {
    "filters": [
      "/ad-bottom."
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://www.chinadaily.com.cn/image_e/2018/ad-bottom.png"
  },
  {
    "filters": [
      "||elasticad.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://cdn.elasticad.net"
  },
  {
    "filters": [
      "||data2.gosquared.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://data2.gosquared.com"
  },
  {
    "check": true,
    "filters": [
      "/google_analytics/*"
    ],
    "sourceUrl": "https://www.taboola.com",
    "type": "script",
    "url": "https://www.taboola.com/sites/all/modules/google_analytics/"
  },
  {
    "filters": [
      "/adcdn."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://adcdn.goo.ne.jp"
  },
  {
    "filters": [
      "||gadgets360.com/pricee/$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.gadgets360.com/pricee/"
  },
  {
    "filters": [
      "&ad_keyword="
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://pagead2.googlesyndication.com/favicon.ico?&ad_keyword="
  },
  {
    "filters": [
      "_728x90/"
    ],
    "sourceUrl": "https://",
    "type": "other",
    "url": "https://s0.2mdn.net/6440533/1495124845208/Raise%20Your%20Hands_728x90/"
  },
  {
    "check": true,
    "filters": [
      "@@||t8cdn.com/assets/pc/js/$script,domain=tube8.com|tube8.es|tube8.fr"
    ],
    "sourceUrl": "https://www.tube8.com",
    "type": "script",
    "url": "https://es.t8cdn.com/assets/pc/js/"
  },
  {
    "check": true,
    "filters": [
      "@@||t8cdn.com^$image,media,domain=tube8.com|tube8.es|tube8.fr"
    ],
    "sourceUrl": "https://www.tube8.com",
    "type": "image",
    "url": "https://es.t8cdn.com"
  },
  {
    "filters": [
      "/fuckadblock.min.js",
      "*/fuckadblock.$script,redirect=fuckadblock.js-3.2.0"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdnjs.cloudflare.com/ajax/libs/fuckadblock/3.2.1/fuckadblock.min.js"
  },
  {
    "filters": [
      "||goo.ne.jp^*/vltracedmd.js"
    ],
    "sourceUrl": "https://www.goo.ne.jp",
    "type": "script",
    "url": "https://log000.goo.ne.jp/js/VLTraceDMD.js"
  },
  {
    "check": true,
    "filters": [
      "@@||cdn.jsdelivr.net/algoliasearch/3/algoliasearch.min.js$script,domain=tube8.com|tube8.es|tube8.fr"
    ],
    "sourceUrl": "https://www.tube8.com",
    "type": "script",
    "url": "https://cdn.jsdelivr.net/algoliasearch/3/algoliasearch.min.js"
  },
  {
    "filters": [
      "/trans/logger.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://icon.zol-img.com.cn/public/bdshare/static/api/js/trans/logger.js"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://drop.ndtv.com"
  },
  {
    "filters": [
      "/pop.js|"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://thepiratebay3.org/main_files/pop.js"
  },
  {
    "filters": [
      "_files/analytics."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://thepiratebay3.org/main_files/analytics.js"
  },
  {
    "filters": [
      "||popads.net/pop.js$script,redirect=popads.net.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://c1.popads.net/pop.js"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://edata.ndtv.com"
  },
  {
    "check": true,
    "filters": [
      "||etahub.com^",
      "||etahub.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "other",
    "url": "https://etahub.com"
  },
  {
    "filters": [
      "||lockerdome.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://lockerdome.com"
  },
  {
    "filters": [
      "||adsco.re^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://c.adsco.re"
  },
  {
    "filters": [
      "||uim.tifbs.net^",
      "||uim.tifbs.net/js/*.js$script,redirect=noopjs,domain=gmx.net|web.de"
    ],
    "sourceUrl": "https://www.gmx.net",
    "type": "script",
    "url": "https://uim.tifbs.net/js/3936.js"
  },
  {
    "filters": [
      "||click.ali213.net^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://click.ali213.net"
  },
  {
    "filters": [
      "||xlisting.jp^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://pulsar.xlisting.jp"
  },
  {
    "filters": [
      "/tracklog.",
      "/empty.js.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://tracklog.58.com/m/click/empty.js.gif?"
  },
  {
    "filters": [
      "||heapanalytics.com/h?$image"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://heapanalytics.com/h?"
  },
  {
    "filters": [
      "@@||googlecommerce.com^$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.googlecommerce.com"
  },
  {
    "filters": [
      "||smct.co^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://smct.co"
  },
  {
    "filters": [
      "||episerver.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://hpde.peerius.episerver.net"
  },
  {
    "filters": [
      "_300x250."
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://static.idgdmg.com.cn/html/priming/zol_back_300x250.html"
  },
  {
    "filters": [
      "||uimserv.net^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://uir.uimserv.net"
  },
  {
    "filters": [
      "||wa.ui-portal.de^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://wa.ui-portal.de"
  },
  {
    "check": true,
    "filters": [
      "@@||algolia.net^*/indexes/$xmlhttprequest,domain=tube8.com|tube8.es|tube8.fr"
    ],
    "sourceUrl": "https://www.tube8.com",
    "type": "xhr",
    "url": "https://bnzmzkcxit-dsn.algolia.net/1/indexes/"
  },
  {
    "check": true,
    "filters": [
      "@@||cdn.jsdelivr.net/autocomplete.js/0/autocomplete.min.js$script,domain=tube8.com|tube8.es|tube8.fr"
    ],
    "sourceUrl": "https://www.tube8.com",
    "type": "script",
    "url": "https://cdn.jsdelivr.net/autocomplete.js/0/autocomplete.min.js"
  },
  {
    "filters": [
      "/ados.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://a.wattpad.com/js/ados.js"
  },
  {
    "filters": [
      "/adpic."
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://adpic.chinadaily.com.cn"
  },
  {
    "filters": [
      "||clickagy.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://aorta.clickagy.com"
  },
  {
    "filters": [
      "/lib/tracking/*",
      "/tracking/comscore/*",
      "@@||cbsinteractive.com^*/lib/tracking/comscore/$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://vidtech.cbsinteractive.com/uvpjs/2.9.2/lib/tracking/comscore/"
  },
  {
    "filters": [
      "||ptengine.cn^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://js.ptengine.cn"
  },
  {
    "filters": [
      "||adnami.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://assets.adnami.io"
  },
  {
    "filters": [
      "||underdog.media^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://bid.underdog.media"
  },
  {
    "filters": [
      "||google-analytics.com/siteopt.js?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ssl.google-analytics.com/siteopt.js?"
  },
  {
    "filters": [
      "/track.p?"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://www.ashleymadison.com/app/public/track.p?"
  },
  {
    "filters": [
      "/adservice-",
      "/adservice/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://js.ui-portal.de/c/ads/adservice/adservice-2-connector-current.js"
  },
  {
    "filters": [
      "/cookieId.htm"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://m.shein.com/image/cookieId.html"
  },
  {
    "filters": [
      "||relap.io^*/head.js?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://relap.io/api/v6/head.js?"
  },
  {
    "filters": [
      "/services/counter/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ria.ru/services/counter/"
  },
  {
    "filters": [
      "/googleads_"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://game.goo.ne.jp/googleads_ima_html5_samples"
  },
  {
    "filters": [
      "||ad.admitad.com^",
      "||admitad.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ad.admitad.com"
  },
  {
    "filters": [
      "||emediate.eu^$third-party",
      "||emediate.eu^",
      "/eas_tag.1.0.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://eas4.emediate.eu/EAS_tag.1.0.js"
  },
  {
    "filters": [
      "&ad_network_"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ads.twitter.com/favicon.ico?&ad_network_"
  },
  {
    "filters": [
      "&ad_zones="
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://connect.facebook.net/favicon.ico?&ad_zones="
  },
  {
    "filters": [
      "&ad_classid="
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://s0.2mdn.net/1635909/1x1image.jpg?&ad_classid="
  },
  {
    "filters": [
      "/visualrevenue.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://motor.elpais.com/wp-content/themes/motor18/js/visualRevenue.js"
  },
  {
    "filters": [
      "||bebi.com^$third-party",
      "||bebi.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://st.bebi.com"
  },
  {
    "filters": [
      "||mainroll.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://improvedigital.mainroll.com"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://drop.ndtv.com"
  },
  {
    "filters": [
      "||beacon.errorception.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://beacon.errorception.com"
  },
  {
    "check": true,
    "filters": [
      "||vrt.outbrain.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://vrt.outbrain.com"
  },
  {
    "check": true,
    "filters": [
      "||vrp.outbrain.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://vrp.outbrain.com"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://edata.ndtv.com"
  },
  {
    "filters": [
      "/mmcore.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://service.maxymiser.net/cdn/americanexpress/js/mmcore.js"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://food.ndtv.com",
    "type": "script",
    "url": "https://food.ndtv.com"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://food.ndtv.com",
    "type": "script",
    "url": "https://food.ndtv.com"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://food.ndtv.com",
    "type": "script",
    "url": "https://food.ndtv.com"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://food.ndtv.com",
    "type": "script",
    "url": "https://food.ndtv.com"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://food.ndtv.com",
    "type": "script",
    "url": "https://food.ndtv.com"
  },
  {
    "filters": [
      "||adop.cc^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://compass.adop.cc"
  },
  {
    "filters": [
      "||adnium.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://a.adnium.com"
  },
  {
    "filters": [
      "||nativeroll.tv^$third-party",
      "||nativeroll.tv^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn01.nativeroll.tv"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://food.ndtv.com",
    "type": "script",
    "url": "https://edata.ndtv.com"
  },
  {
    "filters": [
      "/xiti.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://st1.idealista.com/static/common/js/ext/xiti/xiti.js"
  },
  {
    "filters": [
      "||adskeeper.co.uk^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://jsc.adskeeper.co.uk"
  },
  {
    "filters": [
      "||xiti.com^",
      "||xiti.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://logs3.xiti.com"
  },
  {
    "filters": [
      "||pushengage.com^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://clientcdn.pushengage.com"
  },
  {
    "filters": [
      "||research.de.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://s79.research.de.com"
  },
  {
    "filters": [
      "||h.imedia.cz^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://h.imedia.cz"
  },
  {
    "filters": [
      "||i.imedia.cz^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://i.imedia.cz"
  },
  {
    "filters": [
      "/adblock.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.egy.best/static/global/js/adblock.js"
  },
  {
    "filters": [
      "/static/ad/*"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://ad.impactify.io/static/ad/"
  },
  {
    "check": true,
    "filters": [
      "||3ca28642b714623b2.com^$third-party",
      "/\\.com\\/[0-9]{2,9}\\/$/$script,stylesheet,third-party,xmlhttprequest",
      "/\\:\\/\\/[a-z0-9]{5,40}\\.com\\/[0-9]{2,9}\\/$/$script,stylesheet,third-party,xmlhttprequest",
      "/\\:\\/\\/[a-z0-9]{5,}\\.com\\/[A-Za-z0-9]{3,}\\/$/$script,third-party,xmlhttprequest"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://3ca28642b714623b2.com/1101038/"
  },
  {
    "filters": [
      "||m2.ai^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://m2d.m2.ai"
  },
  {
    "filters": [
      "/delivery/ag."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://a03.uadexchange.com/delivery/ag.php"
  },
  {
    "check": true,
    "filters": [
      "/reklama.$~stylesheet,domain=~reklama.mariafm.ru"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://i.imedia.cz/html/www.seznam.cz/reklama.html"
  },
  {
    "filters": [
      "||optmstr.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://a.optmstr.com"
  },
  {
    "filters": [
      "||firstimpression.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ecdn.firstimpression.io"
  },
  {
    "filters": [
      "||log.prezi.com^",
      "||prezi.com/log/"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://log.prezi.com/log/"
  },
  {
    "filters": [
      "||adtrue.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.adtrue.com"
  },
  {
    "filters": [
      "||sociomantic.com^$third-party",
      "/adpan/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://us-sonar.sociomantic.com/js/2010-07-01/adpan/"
  },
  {
    "filters": [
      "/baynote/*",
      "||baynote.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://springer-www.baynote.net/baynote/"
  },
  {
    "filters": [
      "||districtm.ca^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://prebid.districtm.ca"
  },
  {
    "filters": [
      "||komoona.com^$third-party",
      "||komoona.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s.komoona.com"
  },
  {
    "filters": [
      "||sekindo.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://hb.sekindo.com"
  },
  {
    "filters": [
      "||optmnstr.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://api.optmnstr.com"
  },
  {
    "filters": [
      "||steelhousemedia.com^",
      "||steelhousemedia.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://dx.steelhousemedia.com"
  },
  {
    "filters": [
      "||tracking.g2crowd.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tracking.g2crowd.com"
  },
  {
    "filters": [
      "||drom.ru/dummy."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.drom.ru/dummy.gif"
  },
  {
    "filters": [
      "/spc_fi.php"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.firstimpression.io/delivery/spc_fi.php"
  },
  {
    "filters": [
      "||cpmstar.com/view.aspx",
      "||cpmstar.com^",
      "||cpmstar.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://server.cpmstar.com/view.aspx"
  },
  {
    "filters": [
      "||cpmstar.com/cached/"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ssl.cdne.cpmstar.com/cached/"
  },
  {
    "filters": [
      "/static.ad."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://static.ad.libimseti.cz"
  },
  {
    "filters": [
      "/adobe-analytics/*",
      "@@||mlbstatic.com/*/VisitorAPI.js$script,domain=mlb.com"
    ],
    "sourceUrl": "https://www.mlb.com",
    "type": "script",
    "url": "https://www.mlbstatic.com/mlb.com/adobe-analytics/VisitorAPI.js"
  },
  {
    "filters": [
      "@@||mlbstatic.com/*/AppMeasurement$script,domain=mlb.com"
    ],
    "sourceUrl": "https://www.mlb.com",
    "type": "script",
    "url": "https://www.mlbstatic.com/mlb.com/adobe-analytics/AppMeasurement-mlb.js"
  },
  {
    "filters": [
      "&event=view&"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.drom.ru/dummy.txt?section=drom&event=view&who=region__0"
  },
  {
    "filters": [
      "||yandex.*/count/"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://yabs.yandex.kz/count/"
  },
  {
    "filters": [
      "||servedby-buysellads.com^$third-party,domain=~buysellads.com",
      "||servedby-buysellads.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://m.servedby-buysellads.com"
  },
  {
    "filters": [
      "||buysellads.com^$third-party",
      "||buysellads.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s3.buysellads.com"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://auto.ndtv.com",
    "type": "script",
    "url": "https://edata.ndtv.com"
  },
  {
    "filters": [
      "||cszz.ru^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://cszz.ru"
  },
  {
    "filters": [
      "/ad_img/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://pbs.twimg.com/ad_img/"
  },
  {
    "filters": [
      "/static/ads/*"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://cdn.egy.best/static/ads/"
  },
  {
    "filters": [
      "||baidu.com/x.js?"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://datax.baidu.com/x.js?"
  },
  {
    "check": true,
    "filters": [
      "||superadexchange.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.superadexchange.com"
  },
  {
    "filters": [
      "/baynoteobserver/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://springer-www.baynote.net/baynote/tags3/baynoteObserver/"
  },
  {
    "filters": [
      "/api/analytics/*"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://www.wish.com/api/analytics/"
  },
  {
    "filters": [
      "||c.imedia.cz^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://c.imedia.cz"
  },
  {
    "filters": [
      "||clck.yandex.ru^$~other",
      "||clck.yandex.ru^$image"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://clck.yandex.ru"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://drop.ndtv.com"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://drop.ndtv.com"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://www.ndtv.com"
  },
  {
    "filters": [
      "||fimg-resp.seznam.cz^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://fimg-resp.seznam.cz"
  },
  {
    "filters": [
      "||freegeoip.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://freegeoip.net"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://www.ndtv.com"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://edata.ndtv.com"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://edata.ndtv.com"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://edata.ndtv.com"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://edata.ndtv.com"
  },
  {
    "filters": [
      "||aexp-static.com/api/axpi/omniture/s_code_myca_context.js$domain=americanexpress.com"
    ],
    "sourceUrl": "https://global.americanexpress.com",
    "type": "script",
    "url": "https://www.aexp-static.com/api/axpi/omniture/s_code_myca_context.js"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://www.ndtv.com"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://www.ndtv.com"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://www.ndtv.com"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://www.ndtv.com"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://www.ndtv.com"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://www.ndtv.com"
  },
  {
    "filters": [
      "@@||ndtv.com^$script,first-party"
    ],
    "sourceUrl": "https://www.ndtv.com",
    "type": "script",
    "url": "https://edata.ndtv.com"
  },
  {
    "filters": [
      ".org/adv/"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://boards.4chan.org/adv/"
  },
  {
    "filters": [
      "||yallboen.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://xhr.yallboen.com"
  },
  {
    "filters": [
      "@@||4cdn.org/adv/$image,xmlhttprequest,domain=4chan.org"
    ],
    "sourceUrl": "http://boards.4chan.org",
    "type": "image",
    "url": "http://i.4cdn.org/adv/"
  },
  {
    "filters": [
      "/dtagent630_"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://m.hm.com/dtmonitor/dtagent630_jp_1305.js"
  },
  {
    "filters": [
      "/analyticsmediator."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.wiley.com/_ui/shared/js/analyticsmediator.js"
  },
  {
    "filters": [
      "||adzerk.net^$third-party,domain=~strava.com",
      "||adzerk.net^",
      ".net/i.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://engine.adzerk.net/i.gif?"
  },
  {
    "filters": [
      "||webengage.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ssl.widgets.webengage.com"
  },
  {
    "filters": [
      "||o-s.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://c.o-s.io"
  },
  {
    "filters": [
      "/afs/ads/*"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://www.google.com/afs/ads/"
  },
  {
    "filters": [
      "||ritogaga.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://ritogaga.com"
  },
  {
    "filters": [
      "/advertisment."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://img3.auto.cz/auto/skins/m.2016/js/advertisment.js"
  },
  {
    "check": true,
    "filters": [
      "|https://$third-party,xmlhttprequest,domain=4chan.org|americanewshub.com|americasfreedomfighters.com|boredomtherapy.com|breakingnews.ie|bugout.news|cheapism.com|chicksonright.com|clashdaily.com|conservativeintel.com|conservativetribune.com|creepybasement.com|dccrimestories.com|eaglerising.com|freewarefiles.com|godfatherpolitics.com|grammarist.com|healthstatus.com|honesttopaws.com|instigatornews.com|janmorganmedia.com|knowledgedish.com|lastresistance.com|legalinsurrection.com|libertyalliance.com|lifebuzz.com|madworldnews.com|makeagif.com|mentalflare.com|natureworldnews.com|newser.com|patriotnewswire.com|readysethealth.com|rightwingtribune.com|rollingout.com|rpnewswire.com|sarahpalin.com|survivalnation.com|terezowens.com|thefreethoughtproject.com|thelibertydaily.com|thepolitistick.com|therealside.com|therightscoop.com|usherald.com|vgpie.com|westernjournalism.com|xtribune.com"
    ],
    "sourceUrl": "http://boards.4chan.org",
    "type": "xhr",
    "url": "https://"
  },
  {
    "filters": [
      "||pushame.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://pushame.com"
  },
  {
    "filters": [
      "||counter.tldw.me^"
    ],
    "sourceUrl": "https://",
    "type": "other",
    "url": "https://counter.tldw.me"
  },
  {
    "filters": [
      "||dimml.io^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://cdn.dimml.io"
  },
  {
    "filters": [
      "||performax.cz^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://delivery.performax.cz"
  },
  {
    "check": true,
    "filters": [
      "||fwmrm.net^$third-party,other"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://cue.v.fwmrm.net"
  },
  {
    "filters": [
      "||nxtck.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://optout.nxtck.com"
  },
  {
    "filters": [
      "/integration?pixel="
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://i.ctnsnet.com/int/integration?pixel=42412771&nid=304042&cont=s"
  },
  {
    "filters": [
      "||analytics.edgekey.net^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://79423.analytics.edgekey.net"
  },
  {
    "filters": [
      "||pixel.cpex.cz^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://pixel.cpex.cz"
  },
  {
    "check": true,
    "filters": [
      "|http://$third-party,xmlhttprequest,domain=4chan.org|alfonzorachel.com|americanewshub.com|americasfreedomfighters.com|beforeitsnews.com|boredomtherapy.com|breakingnews.ie|bugout.news|cheapism.com|chicksonright.com|clashdaily.com|conservativeintel.com|conservativetribune.com|creepybasement.com|dailywire.com|dccrimestories.com|eaglerising.com|freedomdaily.com|freewarefiles.com|funnyand.com|gamerant.com|godfatherpolitics.com|grammarist.com|headcramp.com|healthstatus.com|hngn.com|honesttopaws.com|instigatornews.com|intellectualconservative.com|janmorganmedia.com|jobsnhire.com|joeforamerica.com|kdramastars.com|knowledgedish.com|kpopstarz.com|lastresistance.com|latinpost.com|legalinsurrection.com|libertyalliance.com|libertyunyielding.com|lifebuzz.com|madworldnews.com|makeagif.com|mentalflare.com|musictimes.com|natureworldnews.com|newser.com|parentherald.com|patriotnewswire.com|patriottribune.com|pickthebrain.com|readysethealth.com|realtytoday.com|rightwingtribune.com|rollingout.com|rpnewswire.com|sarahpalin.com|supercheats.com|survivalnation.com|terezowens.com|theblacksphere.net|thefreethoughtproject.com|thehayride.com|thelibertydaily.com|themattwalshblog.com|thepolitistick.com|therealside.com|therightscoop.com|universityherald.com|urbantabloid.com|usherald.com|vgpie.com|wakingtimes.com|westernjournalism.com|xtribune.com|youthhealthmag.com",
      "@@||a.4cdn.org/*.json$xmlhttprequest,domain=4chan.org"
    ],
    "sourceUrl": "http://boards.4chan.org",
    "type": "xhr",
    "url": "http://a.4cdn.org/int/threads.json"
  },
  {
    "filters": [
      "||strossle.it^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://proxy.strossle.it"
  },
  {
    "filters": [
      "||adtlgc.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://code3.adtlgc.com"
  },
  {
    "check": true,
    "filters": [
      "||smartlook.com^$third-party",
      "||smartlook.com^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://rec.smartlook.com"
  },
  {
    "filters": [
      "_300_250."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://s.yimg.jp/images/im/innerad/QC_300_250.jpg"
  },
  {
    "filters": [
      "||video-cdn.net/event?"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://ca.video-cdn.net/event?"
  },
  {
    "filters": [
      "||carbonads.com^$third-party",
      "||carbonads.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.carbonads.com"
  },
  {
    "filters": [
      "/netmind-$script",
      "@@||spiegel.de/layout/js/http/netmind-$script"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://m.spiegel.de/layout/js/http/netmind-V8-57-1.js"
  },
  {
    "check": true,
    "filters": [
      "||adition.com^$important,domain=spiegel.de",
      "||adition.com^$domain=spiegel.de",
      "@@||imagesrv.adition.com/js/adition.js$domain=spiegel.de"
    ],
    "sourceUrl": "http://m.spiegel.de",
    "type": "script",
    "url": "https://imagesrv.adition.com/js/adition.js"
  },
  {
    "check": true,
    "filters": [
      "||carbonads.net^$third-party",
      "||carbonads.net^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://srv.carbonads.net"
  },
  {
    "filters": [
      "/urchin.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://www.google-analytics.com/urchin.js"
  },
  {
    "filters": [
      "||spklw.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "xhr",
    "url": "http://widgets.spklw.com"
  },
  {
    "filters": [
      "||buysellads.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://cdn4.buysellads.net"
  },
  {
    "filters": [
      "/js/tracking/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.crunchyroll.com/versioned_assets/js/tracking/"
  },
  {
    "filters": [
      "||cb-content.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "http://static.cb-content.com"
  },
  {
    "filters": [
      "||ioam.de/tx.io?$domain=autobild.de|focus.de|kabeleins.de|metal-hammer.de|musikexpress.de|prosieben.de|prosiebenmaxx.de|quoka.de|ran.de|rollingstone.de|sat1.de|sixx.de|spiegel.de|stern.de|tellows.de|transfermarkt.de"
    ],
    "sourceUrl": "http://m.spiegel.de",
    "type": "script",
    "url": "http://de.ioam.de/tx.io?"
  },
  {
    "filters": [
      "/nm_trck.gif?",
      "/nm_trck.gif?$domain=spiegel.de"
    ],
    "sourceUrl": "http://m.spiegel.de",
    "type": "image",
    "url": "http://c.spiegel.de/nm_trck.gif?"
  },
  {
    "filters": [
      "-480x120."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://cdn4.uzone.id/assets/uploads/others/uzone/Banner-480x120.jpg"
  },
  {
    "filters": [
      ".ads1-",
      "-adnow.$domain=~zappistore.com",
      "||ads1-adnow.com^$third-party",
      "/adv_out."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://st-n.ads1-adnow.com/js/adv_out.js"
  },
  {
    "filters": [
      "||aimatch.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://content.aimatch.com"
  },
  {
    "check": true,
    "filters": [
      "||adition.com/banner?$domain=spiegel.de"
    ],
    "sourceUrl": "http://m.spiegel.de",
    "type": "script",
    "url": "https://ad13.adfarm1.adition.com/banner?"
  },
  {
    "filters": [
      "/admp-"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://admp-tc-vlmedia.adtlgc.com"
  },
  {
    "filters": [
      "||pushance.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://pushance.com"
  },
  {
    "filters": [
      "/scripts/ads.",
      "@@||flvto.biz/scripts/ads.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.flvto.biz/scripts/ads.js"
  },
  {
    "filters": [
      "/pagestat?"
    ],
    "sourceUrl": "http://",
    "type": "xhr",
    "url": "http://admp-tc-vlmedia.adtlgc.com/event/v3/pagestat?"
  },
  {
    "filters": [
      "/arstat?"
    ],
    "sourceUrl": "http://",
    "type": "xhr",
    "url": "http://admp-tc-vlmedia.adtlgc.com/event/v3/arstat?"
  },
  {
    "filters": [
      "||cint.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://collector.cint.com"
  },
  {
    "filters": [
      "||js.users.51.la^",
      "||users.51.la^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://js.users.51.la"
  },
  {
    "filters": [
      "||users-api.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://sync.users-api.com"
  },
  {
    "filters": [
      "||static.parsely.com^$domain=spiegel.de"
    ],
    "sourceUrl": "http://m.spiegel.de",
    "type": "script",
    "url": "http://static.parsely.com"
  },
  {
    "filters": [
      "||google-analytics.com/analytics.js$domain=kabeleins.de|metal-hammer.de|musikexpress.de|prosieben.de|prosiebenmaxx.de|quoka.de|ran.de|rollingstone.de|sat1.de|sixx.de|spiegel.de|stern.de"
    ],
    "sourceUrl": "http://m.spiegel.de",
    "type": "script",
    "url": "https://www.google-analytics.com/analytics.js"
  },
  {
    "filters": [
      "||adalliance.io^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "https://optout.adalliance.io"
  },
  {
    "filters": [
      "||emsservice.de^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "xhr",
    "url": "http://static.emsservice.de"
  },
  {
    "filters": [
      "||emetriq.de^$domain=kabeleins.de|prosieben.de|prosiebenmaxx.de|ran.de|sat1.de|sixx.de|spiegel.de|stern.de|transfermarkt.de"
    ],
    "sourceUrl": "http://m.spiegel.de",
    "type": "script",
    "url": "https://dyn.emetriq.de"
  },
  {
    "filters": [
      "||yieldlab.net^$domain=spiegel.de",
      "@@||ad.yieldlab.net^$script,domain=spiegel.de"
    ],
    "sourceUrl": "http://m.spiegel.de",
    "type": "script",
    "url": "https://ad.yieldlab.net"
  },
  {
    "filters": [
      "||flvto.biz/scripts/banners.php?"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://www.flvto.biz/scripts/banners.php?"
  },
  {
    "filters": [
      "/show_ads_"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.trfmxt.com/js/show_ads_mxttrf.js"
  },
  {
    "check": true,
    "filters": [
      "||bidder.criteo.com^$domain=spiegel.de"
    ],
    "sourceUrl": "http://m.spiegel.de",
    "type": "xhr",
    "url": "http://bidder.criteo.com"
  },
  {
    "filters": [
      "||xplosion.de^$domain=spiegel.de|stern.de"
    ],
    "sourceUrl": "http://m.spiegel.de",
    "type": "script",
    "url": "https://ups.xplosion.de"
  },
  {
    "filters": [
      "||g.doubleclick.net^$domain=spiegel.de"
    ],
    "sourceUrl": "http://m.spiegel.de",
    "type": "script",
    "url": "https://securepubads.g.doubleclick.net"
  },
  {
    "filters": [
      "/js/tracking.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://dev.evernote.com/media/js/tracking.js"
  },
  {
    "filters": [
      ".lk/ads/"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.google.lk/ads/"
  },
  {
    "filters": [
      ".cn/s.gif?"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://s.union.360.cn/s.gif?"
  },
  {
    "filters": [
      "||googlesyndication.com/safeframe/$domain=spiegel.de"
    ],
    "sourceUrl": "http://m.spiegel.de",
    "type": "other",
    "url": "http://tpc.googlesyndication.com/safeframe/"
  },
  {
    "filters": [
      "||rmtag.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://intljs.rmtag.com"
  },
  {
    "filters": [
      "||theadex.com^$domain=spiegel.de"
    ],
    "sourceUrl": "http://m.spiegel.de",
    "type": "image",
    "url": "http://xpl.theadex.com"
  },
  {
    "filters": [
      "||pagead2.googlesyndication.com^$domain=spiegel.de"
    ],
    "sourceUrl": "http://m.spiegel.de",
    "type": "script",
    "url": "http://pagead2.googlesyndication.com"
  },
  {
    "filters": [
      "||meetrics.net^$domain=spiegel.de|stern.de"
    ],
    "sourceUrl": "http://m.spiegel.de",
    "type": "script",
    "url": "https://s240.meetrics.net"
  },
  {
    "filters": [
      "||mxcdn.net^$domain=spiegel.de|stern.de"
    ],
    "sourceUrl": "http://m.spiegel.de",
    "type": "script",
    "url": "https://s407.mxcdn.net"
  },
  {
    "filters": [
      "/log.htm?"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://image.ruliweb.com/view/log.htm?"
  },
  {
    "filters": [
      "||user-api.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://cdn.user-api.com"
  },
  {
    "filters": [
      ".ads5-",
      "||ads5-adnow.com^$third-party",
      "/adnow-"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://st-n.ads5-adnow.com/i/logo/adnow-v2.png"
  },
  {
    "filters": [
      "||flashtalking.com^$domain=spiegel.de"
    ],
    "sourceUrl": "http://m.spiegel.de",
    "type": "script",
    "url": "https://servedby.flashtalking.com"
  },
  {
    "filters": [
      "/247px.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://d1af033869koo7.cloudfront.net/psp/cap1enterprise-v1-001/247px.js"
  },
  {
    "filters": [
      "||mplxtms.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://secure-cdn.mplxtms.com"
  },
  {
    "filters": [
      "||contentsfeed.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://linkback.contentsfeed.com"
  },
  {
    "filters": [
      "||bfmio.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://ioms.bfmio.com"
  },
  {
    "check": true,
    "filters": [
      "/ad3.$domain=~ad3.eu|~vereinslinie.de"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://ad3.adfarm1.adition.com"
  },
  {
    "filters": [
      "||mediaplex.com^",
      "||mediaplex.com^$third-party",
      "||mediaplex.com^*/universal.html"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://secure.img-cdn.mediaplex.com/0/2399/universal.html"
  },
  {
    "check": true,
    "filters": [
      "||adfarm.mediaplex.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://adfarm.mediaplex.com"
  },
  {
    "filters": [
      "/assets/analytics:",
      "@@||sahibinden.com/assets/analytics*.js$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static.sahibinden.com/assets/analytics:1.js"
  },
  {
    "filters": [
      "||247-inc.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://tie.247-inc.net"
  },
  {
    "filters": [
      "||a.ligatus.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://a.ligatus.com"
  },
  {
    "filters": [
      "||doublepimp.com^$third-party",
      "||doublepimp.com^"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.doublepimp.com"
  },
  {
    "filters": [
      "||cloudfront.net/sentinel.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://d3avqv6zaxegeu.cloudfront.net/sentinel.js"
  },
  {
    "filters": [
      "||go.com/stat/",
      "/dolWebAnalytics.",
      "@@||go.com/stat/dolwebanalytics.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://global.go.com/stat/dolWebAnalytics.js"
  },
  {
    "filters": [
      "||go.com/capmon/GetDE/?"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://tredir.go.com/capmon/GetDE/?"
  },
  {
    "filters": [
      "||fwmrm.net^$third-party,script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://mssl.fwmrm.net"
  },
  {
    "filters": [
      "||pagead2.googlesyndication.com^$script,important,domain=thefreedictionary.com",
      "@@||pagead2.googlesyndication.com/pagead/js/adsbygoogle.js$domain=slideplayer.com|tampermonkey.net|thefreedictionary.com"
    ],
    "sourceUrl": "http://www.thefreedictionary.com",
    "type": "script",
    "url": "http://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
  },
  {
    "filters": [
      "/api/tracking/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.grammarly.com/api/tracking/"
  },
  {
    "filters": [
      "||crunchyroll.com/tracker",
      "/tracker?*="
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.crunchyroll.com/tracker?t=px&v=fp&k=911979&p=n"
  },
  {
    "filters": [
      "||pubwise.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.pubwise.io"
  },
  {
    "filters": [
      "/hc/tracking/*",
      "/tracking/events?"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://yardim.sahibinden.com/hc/tracking/events?"
  },
  {
    "filters": [
      "/global/tracker."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://fb.ru/misc/js/global/tracker.js"
  },
  {
    "filters": [
      "||3gl.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://g.3gl.net"
  },
  {
    "filters": [
      "/bnrsrv."
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://a.farlex.com/_/bnrsrv.ashx"
  },
  {
    "filters": [
      "/img/ads/*",
      "/ads/ad-"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.idntimes.com/assets/img/ads/ad-icon.png"
  },
  {
    "filters": [
      "/ad-loading."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.idntimes.com/assets/img/ads/ad-loading.gif"
  },
  {
    "filters": [
      "||inspectlet.com^",
      "||inspectlet.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.inspectlet.com"
  },
  {
    "filters": [
      "||adform.net^$domain=spiegel.de"
    ],
    "sourceUrl": "http://m.spiegel.de",
    "type": "image",
    "url": "http://dmp.adform.net"
  },
  {
    "filters": [
      "/tagmanager/pptm."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.paypal.com/tagmanager/pptm.js"
  },
  {
    "filters": [
      "||academia.edu/record_hit"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://www.academia.edu/record_hit"
  },
  {
    "filters": [
      "||teads.tv^$domain=spiegel.de"
    ],
    "sourceUrl": "http://m.spiegel.de",
    "type": "script",
    "url": "http://a.teads.tv"
  },
  {
    "filters": [
      "||merlin.abc.go.com^"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://merlin.abc.go.com"
  },
  {
    "filters": [
      "||cwkuki.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://t.cwkuki.com"
  },
  {
    "filters": [
      "@@||pagead2.googlesyndication.com/pagead/$script,domain=gsmarena.com|merriam-webster.com"
    ],
    "sourceUrl": "https://www.merriam-webster.com",
    "type": "script",
    "url": "https://pagead2.googlesyndication.com/pagead/"
  },
  {
    "filters": [
      "||qq.com/stats?",
      "/stats?sid="
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://tajs.qq.com/stats?sId=36778060"
  },
  {
    "filters": [
      "||go.com/disneyid/responder?"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://abcnews.go.com/disneyid/responder?"
  },
  {
    "filters": [
      "||yunshipei.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://s.yunshipei.com"
  },
  {
    "filters": [
      "||marinsm.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tag.marinsm.com"
  },
  {
    "filters": [
      "||tracker.marinsm.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tracker.marinsm.com"
  },
  {
    "filters": [
      "||ga.clearbit.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ga.clearbit.com"
  },
  {
    "filters": [
      "||microsoft.com/Collector/"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://browser.pipe.aria.microsoft.com/Collector/"
  },
  {
    "filters": [
      "||prfct.co^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://pixel-geo.prfct.co"
  },
  {
    "filters": [
      "||nakanohito.jp^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://bs.nakanohito.jp"
  },
  {
    "check": true,
    "filters": [
      "|https://$script,third-party,xmlhttprequest,domain=hdzog.com"
    ],
    "sourceUrl": "https://m.hdzog.com",
    "type": "script",
    "url": "https://"
  },
  {
    "check": true,
    "filters": [
      "||adnxs.com^$domain=spiegel.de"
    ],
    "sourceUrl": "http://m.spiegel.de",
    "type": "image",
    "url": "http://ib.adnxs.com"
  },
  {
    "filters": [
      "||2mdn.net^$domain=spiegel.de"
    ],
    "sourceUrl": "http://m.spiegel.de",
    "type": "script",
    "url": "https://s0.2mdn.net"
  },
  {
    "filters": [
      "||smartadserver.com^$domain=spiegel.de"
    ],
    "sourceUrl": "http://m.spiegel.de",
    "type": "image",
    "url": "https://rtb-csync.smartadserver.com"
  },
  {
    "filters": [
      "||googlesyndication.com/sodar/$domain=spiegel.de"
    ],
    "sourceUrl": "http://m.spiegel.de",
    "type": "script",
    "url": "http://tpc.googlesyndication.com/sodar/"
  },
  {
    "filters": [
      "||prf.hn^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://aos-creative.prf.hn"
  },
  {
    "filters": [
      "||affec.tv^$third-party",
      "||affec.tv^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://go.affec.tv"
  },
  {
    "filters": [
      "/amp.gif?"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://amp.akamaized.net/amp.gif?"
  },
  {
    "filters": [
      "||brsrvr.com^$third-party",
      "/br-trk-"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdns.brsrvr.com/v1/br-trk-5407.js"
  },
  {
    "filters": [
      "||airpr.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://px.airpr.com"
  },
  {
    "filters": [
      "||c.microsoft.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://c.microsoft.com"
  },
  {
    "filters": [
      "||estara.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://as00.estara.com"
  },
  {
    "filters": [
      "||qtmojo.com/pixel?"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://cm.qtmojo.com/pixel?"
  },
  {
    "filters": [
      "||reachmax.cn^$third-party",
      "/rm.gif?"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://m.reachmax.cn/rm.gif?"
  },
  {
    "filters": [
      "||vamaker.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://cm.vamaker.com"
  },
  {
    "filters": [
      "||fugetech.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://its.fugetech.com"
  },
  {
    "filters": [
      "/ad.slot."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.inven.co.kr/common/lib/js/ad.slot.js"
  },
  {
    "filters": [
      "||metrics.brightcove.com^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://metrics.brightcove.com"
  },
  {
    "check": true,
    "filters": [
      "||247realmedia.com^$third-party",
      "/realmedia/ads/*",
      "/adstream_"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://oasc17.247realmedia.com/RealMedia/ads/adstream_mjx.ads"
  },
  {
    "filters": [
      "||fb.ru/stat/"
    ],
    "sourceUrl": "http://",
    "type": "xhr",
    "url": "http://fb.ru/stat/"
  },
  {
    "filters": [
      "/cms.gif?"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://bx01.optimix.asia/cms.gif?"
  },
  {
    "check": true,
    "filters": [
      "/ads/creatives/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://cdn.oas-c17.adnxs.com/RealMedia/ads/Creatives/"
  },
  {
    "filters": [
      "||analytics.newscred.com^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://analytics.newscred.com"
  },
  {
    "filters": [
      "||aio.media^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://api.aio.media"
  },
  {
    "filters": [
      "/metrics/metrics"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://m.usps.com/m/assets/scripts/metrics/metrics-all.js"
  },
  {
    "filters": [
      "/detm-container-"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.att.com/scripts/adobe/virtual/detm-container-hdr.js"
  },
  {
    "filters": [
      "||resonance.pk^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://player.resonance.pk"
  },
  {
    "filters": [
      "&ad_type_"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://tpc.googlesyndication.com/favicon.ico?&ad_type_"
  },
  {
    "filters": [
      "/yieldmanager/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://secure.footprint.net/yieldmanager/"
  },
  {
    "filters": [
      "||stats.merriam-webster.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://stats.merriam-webster.com"
  },
  {
    "filters": [
      "/stats/lookup?"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://www.merriam-webster.com/lapi/v1/mwol-search/stats/lookup?"
  },
  {
    "filters": [
      "||stat-rock.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://cdn.stat-rock.com"
  },
  {
    "filters": [
      "/gtm/gtm-"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://d1t2rd51fys1kv.cloudfront.net/js/gtm/gtm-8f522b0bea.json"
  },
  {
    "filters": [
      "||counter.rambler.ru^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://counter.rambler.ru"
  },
  {
    "filters": [
      "||top100-images.rambler.ru^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://top100-images.rambler.ru"
  },
  {
    "check": true,
    "filters": [
      "||hdzog.com^$first-party,xmlhttprequest",
      "@@||hdzog.com/player/timelines.php?$first-party,xmlhttprequest"
    ],
    "sourceUrl": "https://m.hdzog.com",
    "type": "xhr",
    "url": "https://m.hdzog.com/player/timelines.php?"
  },
  {
    "check": true,
    "filters": [
      "@@||omtrdc.net^*/mbox/json?$xmlhttprequest,domain=argos.co.uk|att.com|swisscom.ch|t-mobile.com"
    ],
    "sourceUrl": "https://www.att.com",
    "type": "xhr",
    "url": "https://attservicesinc.tt.omtrdc.net/m2/attservicesinc/mbox/json?"
  },
  {
    "filters": [
      "/getbanner.php?",
      ".php?zone_id="
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://ads.livetvcdn.net//getbanner.php?zone_id=91&rnd=618003853"
  },
  {
    "check": true,
    "filters": [
      "||top.mail.ru^$third-party",
      "||top.mail.ru^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://d3.c3.b1.a1.top.mail.ru"
  },
  {
    "filters": [
      "||captifymedia.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "fetch",
    "url": "https://rd.captifymedia.com"
  },
  {
    "filters": [
      "/adrum-"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://eum.lotto24.de/adrum/adrum-ext.99c2fcc5ccc30ea4d38a1a74eeb7a6a6.js"
  },
  {
    "filters": [
      "/fp/clear.png?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://fp.tongdun.net/fp/clear.png?"
  },
  {
    "filters": [
      "||tagsrvcs.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s.tagsrvcs.com"
  },
  {
    "filters": [
      "||webmd.com/pixel/"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://img.webmd.com/pixel/"
  },
  {
    "filters": [
      "||ls.webmd.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ls.webmd.com"
  },
  {
    "filters": [
      "||akamaihd.net/log?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://qsearch-a.akamaihd.net/log?"
  },
  {
    "filters": [
      "||cpx.to^",
      "||cpx.to^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://p.cpx.to"
  },
  {
    "filters": [
      "/trackingCode.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://fast.fonts.net/t/trackingCode.js"
  },
  {
    "check": true,
    "filters": [
      "||mouseflow.com^$third-party",
      "||mouseflow.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.mouseflow.com"
  },
  {
    "filters": [
      "||unid.go.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.unid.go.com"
  },
  {
    "filters": [
      "||trkn.us^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://trkn.us"
  },
  {
    "filters": [
      "/advt.$domain=~advt.ch"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://advt.manoramaonline.com"
  },
  {
    "filters": [
      "||conative.de^$domain=spiegel.de",
      "@@||conative.de/serve/domain/158/config.js$domain=spiegel.de"
    ],
    "sourceUrl": "http://m.spiegel.de",
    "type": "script",
    "url": "http://cdn.conative.de/serve/domain/158/config.js"
  },
  {
    "filters": [
      "/detm_adobe."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.att.com/scripts/adobe/prod/detm_adobe.js"
  },
  {
    "check": true,
    "filters": [
      "||hdzog.com^$first-party,xmlhttprequest",
      "@@||hdzog.com/player/timelines.php?$first-party,xmlhttprequest"
    ],
    "sourceUrl": "https://m.hdzog.com",
    "type": "xhr",
    "url": "https://m.hdzog.com/player/timelines.php?"
  },
  {
    "filters": [
      "||lytics.io^",
      "||lytics.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://api.lytics.io"
  },
  {
    "filters": [
      "||segments.adap.tv^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://segments.adap.tv"
  },
  {
    "filters": [
      "||specificclick.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://mpp.specificclick.net"
  },
  {
    "filters": [
      "||andbeyond.media^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://rtbcdn.andbeyond.media"
  },
  {
    "check": true,
    "filters": [
      "/ad4.$domain=~ad4.wpengine.com|~vereinslinie.de"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://ad4.adfarm1.adition.com"
  },
  {
    "filters": [
      "/track/impression?"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "https://imp.control.kochava.com/track/impression?"
  },
  {
    "filters": [
      "/imp?slot="
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://adn.inven.co.kr/imp?slot=1653&type=if&ibt=ns1459"
  },
  {
    "filters": [
      "||sitelabweb.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://colrep.sitelabweb.com"
  },
  {
    "filters": [
      "/tongji.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.guancha.cn/js/tongji.js"
  },
  {
    "filters": [
      "/tracker_pageview."
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://www.coursehero.com/ajax/tracker_pageview.php"
  },
  {
    "filters": [
      "/adview/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.elfagr.com/adview/"
  },
  {
    "filters": [
      "/upload/ads/*$domain=~ads.ae"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.elfagr.com/upload/ads/"
  },
  {
    "filters": [
      "||dsh7ky7308k4b.cloudfront.net^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://dsh7ky7308k4b.cloudfront.net"
  },
  {
    "filters": [
      "||pagead2.googlesyndication.com^$script,important,domain=champion.gg|gsmarena.com"
    ],
    "sourceUrl": "https://m.gsmarena.com",
    "type": "script",
    "url": "https://pagead2.googlesyndication.com"
  },
  {
    "filters": [
      "/utm.gif?"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://tcc.conative.de/cotracking/utm.gif?"
  },
  {
    "filters": [
      "||widerplanet.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://adtg.widerplanet.com"
  },
  {
    "filters": [
      "@@||adservice.google.*/integrator.js$domain=gsmarena.com|nydailynews.com"
    ],
    "sourceUrl": "https://m.gsmarena.com",
    "type": "script",
    "url": "https://adservice.google.de/adsid/integrator.js"
  },
  {
    "filters": [
      "||adtng.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://a.adtng.com"
  },
  {
    "filters": [
      "||admatrix.jp^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://sync-tapi.admatrix.jp"
  },
  {
    "filters": [
      "/adx-exchange."
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://adx-exchange.toast.com"
  },
  {
    "check": true,
    "filters": [
      "/ads/click_"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "https://ls.webmd.com/RealMedia/ads/click_lx.ads"
  },
  {
    "filters": [
      "/scripts/tracking.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://m.usps.com/m/assets/scripts/tracking.js"
  },
  {
    "filters": [
      "/stats/tracker.js"
    ],
    "sourceUrl": "http://",
    "type": "xhr",
    "url": "http://about.att.com/libs/wcm/stats/tracker.js"
  },
  {
    "check": true,
    "filters": [
      "||hdzog.com^$first-party,xmlhttprequest",
      "@@||hdzog.com/player/timelines.php?$first-party,xmlhttprequest"
    ],
    "sourceUrl": "https://m.hdzog.com",
    "type": "xhr",
    "url": "https://m.hdzog.com/player/timelines.php?"
  },
  {
    "filters": [
      "@@||mssl.fwmrm.net/p/abc_live/$script,domain=abc.go.com"
    ],
    "sourceUrl": "https://abc.go.com",
    "type": "script",
    "url": "https://mssl.fwmrm.net/p/abc_live/"
  },
  {
    "filters": [
      "@@||v.fwmrm.net/ad/g/1$script,domain=abc.go.com"
    ],
    "sourceUrl": "https://abc.go.com",
    "type": "script",
    "url": "https://2912a.v.fwmrm.net/ad/g/1"
  },
  {
    "filters": [
      "||zedo.com^$third-party",
      "||zedo.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://3407.tm.zedo.com"
  },
  {
    "filters": [
      "||c3tag.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://694-ct.c3tag.com"
  },
  {
    "filters": [
      "/adsetup."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://oasjs.kataweb.it/adsetup.js"
  },
  {
    "filters": [
      "_160x600_"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://s0.2mdn.net/8169043/1525127277764/LBK_swoosh_160x600_1.png"
  },
  {
    "filters": [
      "/160x600_"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://s0.2mdn.net/8169043/1525127277764/160x600_bg.jpg"
  },
  {
    "filters": [
      "||stat.eagleplatform.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://lentaru.stat.eagleplatform.com"
  },
  {
    "filters": [
      "/advertisement_"
    ],
    "sourceUrl": "https://",
    "type": "stylesheet",
    "url": "https://lentaru.media.eagleplatform.com/player/plugins/advertisement_skin"
  },
  {
    "filters": [
      "||madsone.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://eu2.madsone.com"
  },
  {
    "filters": [
      "/telegraph-advertising/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static.telegraph.co.uk/telegraph-advertising/"
  },
  {
    "filters": [
      "||count.spiegel.de^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://count.spiegel.de"
  },
  {
    "filters": [
      "/wt.js?http"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://scripts.kataweb.it/wt/wt.js?https%3A%2F%2Fwww.repubblica.it%2F"
  },
  {
    "filters": [
      ".ru/ads/",
      "/160x600.",
      "160x600.gif|"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://teasers.ru/ads/160x600.gif"
  },
  {
    "filters": [
      "||smartnews-ads.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.smartnews-ads.com"
  },
  {
    "filters": [
      "/beacon.html?"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://js.fout.jp/beacon.html?"
  },
  {
    "filters": [
      "||adspruce.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://sdk.adspruce.com"
  },
  {
    "filters": [
      "||nativeads.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://rtb.nativeads.com"
  },
  {
    "filters": [
      "||mynativeplatform.com/pub2/"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://cks.mynativeplatform.com/pub2/"
  },
  {
    "filters": [
      "||pixel.s3xified.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://pixel.s3xified.com"
  },
  {
    "filters": [
      "||altitude-arena.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ads.altitude-arena.com"
  },
  {
    "filters": [
      "||videostat.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://dsp.videostat.com"
  },
  {
    "filters": [
      "||switchadhub.com^$third-party",
      "||switchadhub.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://delivery.h.switchadhub.com"
  },
  {
    "filters": [
      "||lfstmedia.com^$third-party",
      "||lfstmedia.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ads.lfstmedia.com"
  },
  {
    "filters": [
      "||grapeshot.co.uk^$third-party",
      "||grapeshot.co.uk^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://telegraph.grapeshot.co.uk"
  },
  {
    "filters": [
      "||adtelligent.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://files-service.adtelligent.com"
  },
  {
    "filters": [
      "||adkernel.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://sync.adkernel.com"
  },
  {
    "filters": [
      "||delivery.porn.com^"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://delivery.porn.com"
  },
  {
    "filters": [
      "||wcfbc.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://fbc.wcfbc.net"
  },
  {
    "filters": [
      "/display_ad"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.dmm.com/js/marketing/display_ad.js"
  },
  {
    "filters": [
      "/ak-ads-",
      "-ads-ns."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ak-ads-ns.prisasd.com"
  },
  {
    "filters": [
      "||impressionmonster.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://delivery.impressionmonster.com"
  },
  {
    "filters": [
      "/opentag-",
      "@@||cloudfront.net/opentag-*.js$domain=mackweldon.com|telegraph.co.uk"
    ],
    "sourceUrl": "https://www.telegraph.co.uk",
    "type": "script",
    "url": "https://d3c3cq33003psk.cloudfront.net/opentag-35657-1096944.js"
  },
  {
    "filters": [
      "@@||exoclick.com/ad_track.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ads.exoclick.com/ad_track.js"
  },
  {
    "filters": [
      "/advanced-ads/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://rolloid.net/wp-content/plugins/advanced-ads/"
  },
  {
    "filters": [
      "/advanced-ads-"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://rolloid.net/wp-content/plugins/advanced-ads-responsive"
  },
  {
    "filters": [
      "||jubna.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://jubna.com"
  },
  {
    "filters": [
      "||ekg.riotgames.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://ekg.riotgames.com"
  },
  {
    "filters": [
      "/house_ad_"
    ],
    "sourceUrl": "https://",
    "type": "stylesheet",
    "url": "https://weblio.hs.llnwd.net/e2/css/smp/house_ad_on_load_modal.css"
  },
  {
    "filters": [
      "&ad_height="
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ads.twitter.com/favicon.ico?&ad_height="
  },
  {
    "filters": [
      "&ad_type="
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://connect.facebook.net/favicon.ico?&ad_type="
  },
  {
    "filters": [
      "||kitbit.net^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://kitbit.net"
  },
  {
    "filters": [
      "||facetz.net^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://front.facetz.net"
  },
  {
    "filters": [
      "/728x90."
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://fb.ru/adv/728x90.jpg"
  },
  {
    "filters": [
      "||zm232.com^$third-party",
      "||zm232.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://zm232.com"
  },
  {
    "filters": [
      "||opentag-stats.qubit.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://opentag-stats.qubit.com"
  },
  {
    "filters": [
      "||automatad.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://go.automatad.com"
  },
  {
    "filters": [
      "||trustpilot.com/stats/"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://widget.trustpilot.com/stats/"
  },
  {
    "filters": [
      "||cccpmo.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://track.cccpmo.com"
  },
  {
    "filters": [
      "/adverts/*",
      "/ad-400."
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://hm732.com/adverts/ad-400.js"
  },
  {
    "filters": [
      "||stat.sputnik.ru^",
      "/cnt.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://stat.sputnik.ru/cnt.js"
  },
  {
    "filters": [
      "||infinity-tracking.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ict.infinity-tracking.net"
  },
  {
    "filters": [
      "||akamaihd.net/bping.php?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://qsearch-a.akamaihd.net/bping.php?"
  },
  {
    "filters": [
      "/vuukle-analytics."
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://vuukle-analytics.appspot.com"
  },
  {
    "check": true,
    "filters": [
      "||oriel.io^$third-party",
      "@@||advertising.oriel.io^$xmlhttprequest"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://advertising.oriel.io"
  },
  {
    "filters": [
      "@@||query.petametrics.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://query.petametrics.com"
  },
  {
    "filters": [
      "_beacon?"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://archiveofourown.org/ngx_pagespeed_beacon?"
  },
  {
    "filters": [
      "||exponential.com^$third-party",
      "||exponential.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tags.expo9.exponential.com"
  },
  {
    "filters": [
      "||neodatagroup.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "other",
    "url": "https://js-ssl.neodatagroup.com"
  },
  {
    "filters": [
      "||mycdn2.co^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://p282054.mycdn2.co"
  },
  {
    "filters": [
      "||eproof.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://cdn.eproof.com"
  },
  {
    "filters": [
      "||intermarkets.net^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://cdn.intermarkets.net"
  },
  {
    "filters": [
      "||pubguru.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.pubguru.com"
  },
  {
    "filters": [
      "||awin1.com^",
      "||awin1.com^$third-party",
      "||awin1.com/cshow.php$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://www.awin1.com/cshow.php"
  },
  {
    "filters": [
      "/affiliate/banner/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://files.bs-motoparts.eu/Affiliate/Banner/"
  },
  {
    "filters": [
      "/displayad."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s.tribalfusion.com/displayAd.js"
  },
  {
    "check": true,
    "filters": [
      "||quantcast.com^$third-party",
      "||quantcast.com^",
      "||widget.quantcast.com^"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://widget.quantcast.com"
  },
  {
    "filters": [
      "||quantserve.com/pixel;"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://pixel.quantserve.com/pixel;ref=https:"
  },
  {
    "filters": [
      ".com/ga.js?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ssl.google-analytics.com/ga.js?"
  },
  {
    "filters": [
      "/smetrics.*/b/ss/*",
      "||smetrics.att.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://smetrics.att.com/b/ss/"
  },
  {
    "filters": [
      "||d2oh4tlt9mrke9.cloudfront.net^",
      "/sessioncam.recorder.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://d2oh4tlt9mrke9.cloudfront.net/Record/js/sessioncam.recorder.js"
  },
  {
    "filters": [
      "/onetag/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://na5.thunderhead.com/one/rt/web/onetag/"
  },
  {
    "filters": [
      "||sessioncam.com^",
      "||sessioncam.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ws.sessioncam.com"
  },
  {
    "filters": [
      "||answerscloud.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://gateway.answerscloud.com"
  },
  {
    "filters": [
      "@@||cdn.shopify.com^*/javascripts/$script,third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.shopify.com/static/javascripts/"
  },
  {
    "filters": [
      "||provenpixel.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://upx.provenpixel.com"
  },
  {
    "filters": [
      "/adrum."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.intuit.com/etc/designs/phoenix/appDynamics/adrum.js"
  },
  {
    "filters": [
      "||therubiqube.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://store.therubiqube.com"
  },
  {
    "filters": [
      "||thewhizmarketing.com^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.thewhizmarketing.com"
  },
  {
    "filters": [
      "||ip-api.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "http://ip-api.com"
  },
  {
    "filters": [
      "&ad_box_"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://s0.2mdn.net/1635909/1x1image.jpg?&ad_box_"
  },
  {
    "filters": [
      "||eum-appdynamics.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://col.eum-appdynamics.com"
  },
  {
    "filters": [
      "||widgethost.barnebys.com^$third-party",
      "||barnebys.com/widgets/$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://widgethost.barnebys.com/widgets/"
  },
  {
    "filters": [
      "||pptv.com/webdelivery/"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://de.as.pptv.com/webdelivery/"
  },
  {
    "filters": [
      "||digidip.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static.digidip.net"
  },
  {
    "filters": [
      "||demand.supply^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://live.demand.supply"
  },
  {
    "filters": [
      "/particles/analytics."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cf.eip.telegraph.co.uk/particle-CMS/particles/analytics.js"
  },
  {
    "filters": [
      "||mainadv.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.mainadv.com"
  },
  {
    "filters": [
      "/__ssobj/core.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://quickbooks.intuit.com/__ssobj/core.js"
  },
  {
    "filters": [
      "||heatmap.it^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://u.heatmap.it"
  },
  {
    "filters": [
      "||omguk.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://track.omguk.com"
  },
  {
    "filters": [
      "||torvind.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://torvind.com"
  },
  {
    "filters": [
      "||ssl-services.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://retarget.ssl-services.com"
  },
  {
    "filters": [
      "||mrelko.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://mrelko.com"
  },
  {
    "filters": [
      "||rbnt.org^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://t01.rbnt.org"
  },
  {
    "filters": [
      "||luxup.ru^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://luxup.ru"
  },
  {
    "filters": [
      "/__ssobj/sync?$image"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://search2.payroll.com/__ssobj/sync?"
  },
  {
    "filters": [
      "/adsonphoto/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://advt.manoramaonline.com/2016/adsonphoto/"
  },
  {
    "filters": [
      "||datawrkz.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://adunit.datawrkz.com"
  },
  {
    "filters": [
      "||seedtag.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://config.seedtag.com"
  },
  {
    "filters": [
      "||rem-track.bild.de^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://rem-track.bild.de"
  },
  {
    "filters": [
      "/analytics/engine/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://i.plug.it/iplug/js/lib/iol/analytics/engine/"
  },
  {
    "filters": [
      "||plug.it^*/iol_evnt."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://i.plug.it/iplug/js/lib/iol/evnt/iol_evnt.min.js"
  },
  {
    "check": true,
    "filters": [
      "||doubleclick.net^$third-party,domain=augsburger-allgemeine.de|autobild.de|bild.de|buffed.de|bundesliga.de|cnet.de|computerbild.de|dashausanubis.de|de.msn.com|dooloop.tv|eyep.tv|filmjunkies.de|flashgames.de|focus.de|gameone.de|gamepro.de|gamesaktuell.de|gamestar.de|gameswelt.at|gameswelt.ch|gameswelt.de|gameswelt.tv|gamezone.de|gzsz.rtl.de|hatenight.com|homerj.de|icarly.de|kino.de|kochbar.de|laola1.tv|lustich.de|motorvision.de|myvideo.at|myvideo.ch|myvideo.de|n-tv.de|onlinewelten.com|pcgames.de|pcgameshardware.de|pcwelt.de|radio.de|ran.de|rtlregional.de|southpark.de|spiegel.tv|spiele-zone.de|spongebob.de|sport.de|spox.com|spreeradio.de|t-online.de|teleboerse.de|the-hills.tv|trailerseite.de|tvmovie.de|video.de|videogameszone.de|vip.de|vodafonelive.de|vox.de|welt.de|wetter.de|wetterschnecken.de|wikifit.de|www.rtl2.de|zdnet.de"
    ],
    "sourceUrl": "https://m.bild.de",
    "type": "image",
    "url": "https://cm.g.doubleclick.net"
  },
  {
    "filters": [
      "|https://$image,script,third-party,xmlhttprequest,domain=vporn.com"
    ],
    "sourceUrl": "https://www.vporn.com",
    "type": "script",
    "url": "https://"
  },
  {
    "filters": [
      "||t.wayfair.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://t.wayfair.com"
  },
  {
    "filters": [
      "@@/wp-content/plugins/google-analytics-for-wordpress/*$script,stylesheet,first-party"
    ],
    "sourceUrl": "https://www.vanguardngr.com",
    "type": "script",
    "url": "https://www.vanguardngr.com/wp-content/plugins/google-analytics-for-wordpress/"
  },
  {
    "filters": [
      "||evnt.iol.it^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://evnt.iol.it"
  },
  {
    "filters": [
      "/ads/adv/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://i.plug.it/iplug/js/lib/iol/analytics/ads/adv/"
  },
  {
    "filters": [
      "/Tag.eng$script,third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://engine.phn.doublepimp.com/Tag.engine"
  },
  {
    "filters": [
      "||azurewebsites.net^*/telemetry.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://moprd-cdnservice-uw1.azurewebsites.net/telemetryapi/1/telemetry.js"
  },
  {
    "filters": [
      "||reson8.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ds.reson8.com"
  },
  {
    "filters": [
      "||karma.mdpcdn.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://karma.mdpcdn.com"
  },
  {
    "filters": [
      "/getad.$domain=~getad.pl"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://adbutler-fermion.com/getad.img"
  },
  {
    "check": true,
    "filters": [
      "||servedbyadbutler.com^$third-party",
      "||servedbyadbutler.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://servedbyadbutler.com"
  },
  {
    "filters": [
      "||fishki.net/code?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://engine.fishki.net/code?"
  },
  {
    "filters": [
      "||adup-tech.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://rtb.d.adup-tech.com"
  },
  {
    "filters": [
      "||fishki.net/counter/"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://m.fishki.net/counter/"
  },
  {
    "filters": [
      "/advert-$domain=~advert-technology.com|~advert-technology.ru"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://img.yumpu.com/62164170/1/216x306/advert-catalogue-23102018.jpg"
  },
  {
    "filters": [
      "/tracking/tracking."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://assets.yumpu.com/release/kLnkY0kNyn/v4/js/modules/tracking/tracking.js"
  },
  {
    "filters": [
      "||selectablemedia.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.selectablemedia.com"
  },
  {
    "filters": [
      "@@||aolcdn.com^*/adsWrapper.$domain=aol.com|engadget.com|games.com|huffingtonpost.com|mapquest.com|stylelist.ca"
    ],
    "sourceUrl": "https://www.engadget.com",
    "type": "script",
    "url": "https://o.aolcdn.com/ads/adsWrapper.min.js"
  },
  {
    "filters": [
      "||ad-score.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://data.ad-score.com"
  },
  {
    "filters": [
      "/json/tracking/*"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://account.y8.com/api/v1/json/tracking/"
  },
  {
    "filters": [
      "/adtech-"
    ],
    "sourceUrl": "https://",
    "type": "font",
    "url": "https://static.telegraph.co.uk/adtech-static"
  },
  {
    "filters": [
      "/gemius.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://iwa.iplsc.com/gemius.js"
  },
  {
    "filters": [
      "/iwa.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://iwa.iplsc.com/iwa.js"
  },
  {
    "filters": [
      "/hit.t?",
      "||interia.pl^*/hit."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://iwa.hit.interia.pl/3/hit.t?"
  },
  {
    "filters": [
      "||mixmarket.biz^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://tr.mixmarket.biz"
  },
  {
    "filters": [
      "/hit.c?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://iwa.hit.interia.pl/3/hit.c?"
  },
  {
    "check": true,
    "filters": [
      "|https://$script,third-party,xmlhttprequest,domain=uptobox.com|uptostream.com"
    ],
    "sourceUrl": "https://uptobox.com",
    "type": "script",
    "url": "https://"
  },
  {
    "filters": [
      "@@||gstatic.com^$script,domain=uptobox.com|uptostream.com"
    ],
    "sourceUrl": "https://uptobox.com",
    "type": "script",
    "url": "https://www.gstatic.com"
  },
  {
    "filters": [
      "@@/wp-content/plugins/google-analytics-for-wordpress/*$script,stylesheet,first-party"
    ],
    "sourceUrl": "https://www.vanguardngr.com",
    "type": "script",
    "url": "https://www.vanguardngr.com/wp-content/plugins/google-analytics-for-wordpress/"
  },
  {
    "filters": [
      "||bugherd.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.bugherd.com"
  },
  {
    "filters": [
      "||hub.com.pl^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://e.hub.com.pl"
  },
  {
    "filters": [
      "/thetracker.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://awscdn.detik.net.id/LogAnalysisTracker/thetracker.js"
  },
  {
    "filters": [
      "/ads2/*"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://emisja.adsearch.pl/_/ads2/"
  },
  {
    "check": true,
    "filters": [
      "||aktrack.pubmatic.com^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://aktrack.pubmatic.com"
  },
  {
    "filters": [
      "||l.sharethis.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://l.sharethis.com"
  },
  {
    "filters": [
      "||nsaudience.pl^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://gdpr.api.dmp.nsaudience.pl"
  },
  {
    "check": true,
    "filters": [
      "||doubleclick.net^*/adi/$~object-subrequest,third-party"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "https://ad.doubleclick.net/ddm/adi/"
  },
  {
    "filters": [
      "||facebook.com/method/links.getStats?$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://api.facebook.com/method/links.getStats?"
  },
  {
    "filters": [
      "||zukxd6fkxqn.com^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.zukxd6fkxqn.com"
  },
  {
    "filters": [
      "||beacon.rum.dynapis.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://beacon.rum.dynapis.com"
  },
  {
    "filters": [
      "/adchoices."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://static-assets.bleacherreport.com/img/molecules/footer/adChoices.png"
  },
  {
    "filters": [
      "||monetate.net^",
      "||monetate.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://se.monetate.net"
  },
  {
    "filters": [
      "||beacon.livefyre.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://beacon.livefyre.com"
  },
  {
    "filters": [
      "&adserv="
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://js.iplsc.com/inpl.adb/1.0.20/empt.js?t=1&adserv=1"
  },
  {
    "filters": [
      "/rt_tag.",
      "_tag.ofs."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static.emol.cl/emol50/js/rt_tag.ofs.js"
  },
  {
    "filters": [
      "||mparticle.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://jssdkcdns.mparticle.com"
  },
  {
    "filters": [
      "||kinoprogramm.bild.de^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://kinoprogramm.bild.de"
  },
  {
    "filters": [
      "||stats.mos.ru^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://stats.mos.ru"
  },
  {
    "filters": [
      "||adxion.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://pn2.adxion.com"
  },
  {
    "filters": [
      "||admedia.com^$third-party",
      "||admedia.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://b.admedia.com"
  },
  {
    "filters": [
      "/rtracker."
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://rtracker.emol.com"
  },
  {
    "filters": [
      "@@/wp-content/plugins/google-analytics-for-wordpress/*$script,stylesheet,first-party"
    ],
    "sourceUrl": "https://www.vanguardngr.com",
    "type": "script",
    "url": "https://www.vanguardngr.com/wp-content/plugins/google-analytics-for-wordpress/"
  },
  {
    "filters": [
      "/google_ads."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://securepubads.g.doubleclick.net/gampad/google_ads.js"
  },
  {
    "filters": [
      "||adswizz.com^",
      "||adswizz.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://synchroscript.deliveryengine.adswizz.com"
  },
  {
    "filters": [
      "||commander1.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://klm.commander1.com"
  },
  {
    "filters": [
      "/advert_"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://rutube.ru/player/advert_support.js"
  },
  {
    "filters": [
      "||sundaysky.com/vop/$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn1-res.sundaysky.com/vop/"
  },
  {
    "check": true,
    "filters": [
      "||youboranqs01.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://nqs-nl12-c2.youboranqs01.com"
  },
  {
    "filters": [
      "://promo.$third-party",
      "||awempire.com^$third-party",
      "||awempire.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://promo.awempire.com"
  },
  {
    "filters": [
      "/performance_timing/log?"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://www.wayfair.com/a/performance_timing/log?"
  },
  {
    "filters": [
      "/tracking/referrer?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.wayfair.com/a/account/tracking/referrer?"
  },
  {
    "filters": [
      "||spotx.tv^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://js.spotx.tv"
  },
  {
    "check": true,
    "filters": [
      "/ads/directory/*",
      "@@||cam4.*/ads/directory/$first-party,xmlhttprequest,domain=~gaytube.com|~pornhub.com|~redtube.com|~redtube.com.br|~tube8.com|~tube8.es|~tube8.fr|~xtube.com|~youjizz.com|~youporn.com|~youporngay.com"
    ],
    "sourceUrl": "https://www.cam4.com",
    "type": "xhr",
    "url": "https://www.cam4.com/ads/directory/"
  },
  {
    "filters": [
      "||classistatic.com^*/sponsors/",
      "/sponsors/ads/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ca.classistatic.com/static/V/7249.2/js/sponsors/ads/"
  },
  {
    "filters": [
      "||pulsar.ebay.$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://pulsar.ebay.com"
  },
  {
    "check": true,
    "filters": [
      "||vra.outbrain.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://vra.outbrain.com"
  },
  {
    "filters": [
      "||spotxcdn.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.spotxcdn.com"
  },
  {
    "filters": [
      "||addroplet.com^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.addroplet.com"
  },
  {
    "filters": [
      "||plista.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static-uk.plista.com"
  },
  {
    "filters": [
      "/ads/bottom/*"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://www.cam4.com/ads/bottom/"
  },
  {
    "filters": [
      "||tgdaudience.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://traffic.tgdaudience.com"
  },
  {
    "check": true,
    "filters": [
      "||hltv.org/*php|",
      "||geo*.hltv.org^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://geo2.hltv.org/rekl13.php"
  },
  {
    "filters": [
      "||cloudfront.net/?a="
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://d2q1qtsl33ql2r.cloudfront.net/?a=5b3033e2f4d14cbeb159bce2147902d5"
  },
  {
    "filters": [
      "||mmtro.com^",
      "||mmtro.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://mmtro.com"
  },
  {
    "filters": [
      "||static.hltv.org/*images/retina2/*$image,first-party"
    ],
    "sourceUrl": "https://www.hltv.org",
    "type": "image",
    "url": "https://static.hltv.org//images/retina2/"
  },
  {
    "filters": [
      "||c8.net.ua^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://match.c8.net.ua"
  },
  {
    "filters": [
      "||collector.snplow.net^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://com-rypl-main.collector.snplow.net"
  },
  {
    "filters": [
      "/336x280_"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://client.bannerspace.net/016375/336x280_ret_JS7_2586.jpg"
  },
  {
    "filters": [
      "||4dsply.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://engine.4dsply.com"
  },
  {
    "filters": [
      "||pushnative.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://go.pushnative.com"
  },
  {
    "filters": [
      "/globalAdTag."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.interactivemedia.net/live/t-o-home/live/globalAdTag.min.js"
  },
  {
    "filters": [
      "||trbo.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static-v2.trbo.com"
  },
  {
    "filters": [
      "||yieldlove.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn-a.yieldlove.com"
  },
  {
    "filters": [
      "||getclicky.com^",
      "||getclicky.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static.getclicky.com"
  },
  {
    "filters": [
      "||ptengine.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cjs.ptengine.com"
  },
  {
    "filters": [
      "||gaug.es^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://secure.gaug.es"
  },
  {
    "filters": [
      "/in.getclicky.com/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://in.getclicky.com/"
  },
  {
    "check": true,
    "filters": [
      "||ad4mat.de^$third-party",
      "||ad4mat.de^"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://www.ad4mat.de"
  },
  {
    "filters": [
      "||giraff.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://code.giraff.io"
  },
  {
    "filters": [
      "||advertserve.com^$third-party",
      "||advertserve.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://betnetmed.advertserve.com"
  },
  {
    "filters": [
      "||c.t-online.de^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://c.t-online.de"
  },
  {
    "check": true,
    "filters": [
      "@@||cam4.*/ads/directory/$first-party,xmlhttprequest,domain=~gaytube.com|~pornhub.com|~redtube.com|~redtube.com.br|~tube8.com|~tube8.es|~tube8.fr|~xtube.com|~youjizz.com|~youporn.com|~youporngay.com"
    ],
    "sourceUrl": "https://www.cam4.com",
    "type": "xhr",
    "url": "https://www.cam4.com/ads/directory/"
  },
  {
    "filters": [
      "||revrtb.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://xml.revrtb.com"
  },
  {
    "filters": [
      "/ads/profile/*"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://www.cam4.com/ads/profile/"
  },
  {
    "filters": [
      "/servlet/view/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://betnetmed.advertserve.com/servlet/view/"
  },
  {
    "filters": [
      "/ecap.min.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://sum.cntvwb.cn/ecap.min.js"
  },
  {
    "filters": [
      "||wrating.com^$third-party",
      ".com/a.gif?"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://cntv.wrating.com/a.gif?"
  },
  {
    "filters": [
      "||ad4mat.net^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://static-de.ad4mat.net"
  },
  {
    "filters": [
      "||news.cn/webdig.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://webd.home.news.cn/webdig.js"
  },
  {
    "filters": [
      "/aff/ads_"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://creative.mlsat02.de/telekom/aff/ads_media.php"
  },
  {
    "filters": [
      "/collect/kf?"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://sum.cntvwb.cn/dc/collect/kf?"
  },
  {
    "filters": [
      "/counter/views/*"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://m.fishki.net/counter/views/"
  },
  {
    "check": true,
    "filters": [
      "/ads/banner_"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://www.ad4mat.de/ads/banner_data.php"
  },
  {
    "filters": [
      "||t.nativendo.de^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://t.nativendo.de"
  },
  {
    "filters": [
      "||advolution.de^$third-party",
      "/tPx.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://asn.advolution.de/000168786F0013710/tpx.gif?"
  },
  {
    "filters": [
      ".cn/1.gif?"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://webd.home.news.cn/1.gif?"
  },
  {
    "filters": [
      "||iesnare.com^",
      "||iesnare.com^$third-party",
      "@@||mpsnare.iesnare.com/snare.js$domain=citi.com|citibank.com|enmasse.com|login.skype.com"
    ],
    "sourceUrl": "https://online.citi.com",
    "type": "script",
    "url": "https://mpsnare.iesnare.com/snare.js"
  },
  {
    "filters": [
      "||webspectator.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://wfpscripts.webspectator.com"
  },
  {
    "filters": [
      "||ivitrack.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://matching.ivitrack.com"
  },
  {
    "filters": [
      "||angsrvr.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://sy.eu.angsrvr.com"
  },
  {
    "filters": [
      "||pippio.com^",
      "/pippio.",
      "||pippio.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://pippio.com"
  },
  {
    "filters": [
      "||springserve.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://vid.springserve.com"
  },
  {
    "filters": [
      ".com/js/ga.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://attach2.mobile01.com/js/ga.js"
  },
  {
    "check": true,
    "filters": [
      "||mqs.ioam.de^",
      "||ioam.de/?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://mqs.ioam.de/?"
  },
  {
    "filters": [
      "||ns1p.net^",
      "||ns1p.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://1eucsnx-m.ns1p.net"
  },
  {
    "filters": [
      "@@/wp-content/plugins/google-analytics-for-wordpress/*$script,stylesheet,first-party"
    ],
    "sourceUrl": "https://www.vanguardngr.com",
    "type": "script",
    "url": "https://www.vanguardngr.com/wp-content/plugins/google-analytics-for-wordpress/"
  },
  {
    "filters": [
      "||tumblr.com/impixu?"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://px.srvcs.tumblr.com/impixu?"
  },
  {
    "filters": [
      "/analytics.html?"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "https://assets.tumblr.com/analytics.html?"
  },
  {
    "filters": [
      "/fp/tags.js?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://content22.online.citi.com/fp/tags.js?"
  },
  {
    "filters": [
      "||hubspot.com/analytics/"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://js.hubspot.com/analytics/"
  },
  {
    "filters": [
      "@@||google-analytics.com^$domain=avianca.com|jackbox.tv|newegg.com|bikstok.sonymusicshop.dk"
    ],
    "sourceUrl": "https://m.newegg.com",
    "type": "script",
    "url": "https://www.google-analytics.com"
  },
  {
    "filters": [
      "@@||monetate.net^*/entry.js$domain=newegg.com"
    ],
    "sourceUrl": "https://m.newegg.com",
    "type": "script",
    "url": "https://se.monetate.net/js/2/a-f0e60b81/p/m.newegg.com/entry.js"
  },
  {
    "filters": [
      "||yandex.ru/cycounter?"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://www.yandex.ru/cycounter?"
  },
  {
    "filters": [
      "||pf.newegg.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://pf.newegg.com"
  },
  {
    "filters": [
      "/comscore_engine."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ssl-i.plug.it/iplug/js/lib/iol/tr/engine/comscore_engine.min.js"
  },
  {
    "filters": [
      "||spot.im/yad/"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://publisher-assets.spot.im/yad/"
  },
  {
    "filters": [
      "||spot.im/api/tracker/"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://www.spot.im/api/tracker/"
  },
  {
    "filters": [
      "||aixifan.com/acsdk/log.min.js?"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://cdn.aixifan.com/acsdk/log.min.js?"
  },
  {
    "filters": [
      "/sensorsdata.",
      "@@||aixifan.com^*/sensorsdata.min.js?$domain=acfun.cn"
    ],
    "sourceUrl": "http://m.acfun.cn",
    "type": "script",
    "url": "http://cdn.aixifan.com/acfun-H5/public/script/sensorsdata.min.js?"
  },
  {
    "check": true,
    "filters": [
      "@@||cam4.*/ads/directory/$first-party,xmlhttprequest,domain=~gaytube.com|~pornhub.com|~redtube.com|~redtube.com.br|~tube8.com|~tube8.es|~tube8.fr|~xtube.com|~youjizz.com|~youporn.com|~youporngay.com"
    ],
    "sourceUrl": "https://www.cam4.com",
    "type": "xhr",
    "url": "https://www.cam4.com/ads/directory/"
  },
  {
    "filters": [
      "/dctk.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://a.travel-assets.com/datacapture/2/js/dctk.js"
  },
  {
    "filters": [
      "||mdotlabs.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://stag.mdotlabs.com"
  },
  {
    "filters": [
      "/entry_stats?"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://www.theverge.com/services/entry_stats?"
  },
  {
    "filters": [
      "@@||monetate.net/trk/$script,domain=newegg.com"
    ],
    "sourceUrl": "https://m.newegg.com",
    "type": "script",
    "url": "https://f.monetate.net/trk/"
  },
  {
    "filters": [
      "@@||monetate.net/img/$script,domain=newegg.com"
    ],
    "sourceUrl": "https://m.newegg.com",
    "type": "script",
    "url": "https://sb.monetate.net/img/"
  },
  {
    "filters": [
      "||sail-horizon.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ak.sail-horizon.com"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "script",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "||met.vgwort.de^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ssl-t-online.met.vgwort.de"
  },
  {
    "filters": [
      "||uciservice.com^$third-party",
      "/adinfo?"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://www.uciservice.com/adinfo?"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@/wp-content/plugins/google-analytics-for-wordpress/*$script,stylesheet,first-party"
    ],
    "sourceUrl": "https://www.vanguardngr.com",
    "type": "script",
    "url": "https://www.vanguardngr.com/wp-content/plugins/google-analytics-for-wordpress/"
  },
  {
    "filters": [
      "||collector.prod.expedia.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://collector.prod.expedia.com"
  },
  {
    "filters": [
      "/datacapture/track"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://www.expedia.com/api/datacapture/track"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "||liqwid.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.liqwid.net"
  },
  {
    "filters": [
      "||intellitxt.com^$third-party",
      "||intellitxt.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://k.intellitxt.com"
  },
  {
    "filters": [
      "||u5c93.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "other",
    "url": "https://c2.u5c93.com"
  },
  {
    "filters": [
      "@@||hdliveextra-a.akamaihd.net^$domain=nbcsports.com"
    ],
    "sourceUrl": "https://www.nbcsports.com",
    "type": "script",
    "url": "https://hdliveextra-a.akamaihd.net"
  },
  {
    "check": true,
    "filters": [
      "@@||cam4.*/ads/directory/$first-party,xmlhttprequest,domain=~gaytube.com|~pornhub.com|~redtube.com|~redtube.com.br|~tube8.com|~tube8.es|~tube8.fr|~xtube.com|~youjizz.com|~youporn.com|~youporngay.com"
    ],
    "sourceUrl": "https://www.cam4.com",
    "type": "xhr",
    "url": "https://www.cam4.com/ads/directory/"
  },
  {
    "filters": [
      "/ad.gif|",
      "@@||static.hltv.org/images/*/AD.gif$image"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://static.hltv.org/images/bigflags/30x20/AD.gif"
  },
  {
    "filters": [
      "||contentinsights.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ingestion.contentinsights.com"
  },
  {
    "filters": [
      "||statistics.crowdynews.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://statistics.crowdynews.com"
  },
  {
    "filters": [
      "/piwik/*$domain=~github.com|~matomo.org|~piwik.org"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://collector-282.tvsquared.com/piwik/"
  },
  {
    "filters": [
      "||mtrcs.samba.tv^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tag.mtrcs.samba.tv"
  },
  {
    "filters": [
      "||content.livesportmedia.eu^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://content.livesportmedia.eu"
  },
  {
    "filters": [
      "@@/wp-content/plugins/google-analytics-for-wordpress/*$script,stylesheet,first-party"
    ],
    "sourceUrl": "https://www.vanguardngr.com",
    "type": "script",
    "url": "https://www.vanguardngr.com/wp-content/plugins/google-analytics-for-wordpress/"
  },
  {
    "filters": [
      "@@||scorecardresearch.com/c2/plugins/streamsense_plugin_theplatform.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://sb.scorecardresearch.com/c2/plugins/streamsense_plugin_theplatform.js"
  },
  {
    "filters": [
      "/ados?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://e-9435.adzerk.net/ados?"
  },
  {
    "filters": [
      "-160x600_"
    ],
    "sourceUrl": "http://",
    "type": "xhr",
    "url": "http://ampatcape.com/-160x600_"
  },
  {
    "check": true,
    "filters": [
      "||c.mgid.com^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://c.mgid.com"
  },
  {
    "filters": [
      ".uk/ads."
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://www.independent.co.uk/ads.txt"
  },
  {
    "filters": [
      "||perr.h-cdn.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://perr.h-cdn.com"
  },
  {
    "filters": [
      "||newegg.com/tracking",
      ".com/tracking?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://pf.newegg.com/tracking?"
  },
  {
    "filters": [
      "||appspot.com/api/track/"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://triggeredmail.appspot.com/api/track/"
  },
  {
    "filters": [
      "/qtracker-"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://dtxtngytz5im1.cloudfront.net/qtracker-5.0.0.min.js"
  },
  {
    "filters": [
      "||dd6zx4ibq538k.cloudfront.net^",
      "||cloudfront.net/smartserve-"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://dd6zx4ibq538k.cloudfront.net/smartserve-2034.js"
  },
  {
    "filters": [
      "||bet365affiliates.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://imstore.bet365affiliates.com"
  },
  {
    "filters": [
      "||cdnondemand.org^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.cdnondemand.org"
  },
  {
    "filters": [
      "@@||rbk.ru^*/ads/ads.js?|$script,domain=autonews.ru|rbc.ru|rbcplus.ru|sportrbc.ru"
    ],
    "sourceUrl": "https://www.rbc.ru",
    "type": "script",
    "url": "https://s.rbk.ru/v8_top_static/common/common-8.5.151/scripts/repo/ads/ads.js?"
  },
  {
    "filters": [
      "@@||yjcontentdelivery.com^$script,domain=youjizz.com"
    ],
    "sourceUrl": "https://www.youjizz.com",
    "type": "script",
    "url": "https://cdne-static.yjcontentdelivery.com"
  },
  {
    "check": true,
    "filters": [
      "||www.youjizz.com^$image"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://cdne-pics.youjizz.com"
  },
  {
    "filters": [
      "||prebid.org^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://currency.prebid.org"
  },
  {
    "filters": [
      "||beacon.riskified.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://beacon.riskified.com"
  },
  {
    "filters": [
      "/Certona/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn-static.farfetch.com/certona/"
  },
  {
    "filters": [
      "||speedcurve.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.speedcurve.com"
  },
  {
    "filters": [
      ".skimlinks.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s.skimresources.com/js/68756X1554900.skimlinks.js"
  },
  {
    "filters": [
      "||youjizz.com^$script",
      "/owa.tracker-combined-min.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://esearch.youjizz.com/modules/base/js/owa.tracker-combined-min.js"
  },
  {
    "filters": [
      "||qubitproducts.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://stash.qubitproducts.com"
  },
  {
    "filters": [
      "@@||a.bf-ad.net/makabo/ads_fol_init.js$script,domain=chip.de"
    ],
    "sourceUrl": "https://www.chip.de",
    "type": "script",
    "url": "https://a.bf-ad.net/makabo/ads_fol_init.js"
  },
  {
    "filters": [
      "$script,domain=pornhd.com",
      "@@||cdn-static.pornhd.com/pornhd/$script,domain=pornhd.com"
    ],
    "sourceUrl": "https://www.pornhd.com",
    "type": "script",
    "url": "https://cdn-static.pornhd.com/pornhd/"
  },
  {
    "filters": [
      "/at.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.pornhd.com/at.gif?"
  },
  {
    "filters": [
      "||res-x.com^$third-party",
      "@@||res-x.com^*/Resonance.aspx?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.res-x.com/ws/r2/Resonance.aspx?"
  },
  {
    "filters": [
      "/foresee/*"
    ],
    "sourceUrl": "https://",
    "type": "stylesheet",
    "url": "https://scache.vzw.com/foresee/"
  },
  {
    "filters": [
      "/adriver.$~object-subrequest"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn1.img.sputniknews.com/min/js/libs/adriver.core.2.js"
  },
  {
    "filters": [
      "||tracking.pornhd.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tracking.pornhd.com"
  },
  {
    "filters": [
      "/myImage.track?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://tracking.cdiscount.com/tracking/myImage.track?"
  },
  {
    "filters": [
      "/siteAnalytics-",
      "@@||expedia.com/minify/siteAnalytics-$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.expedia.com/minify/siteAnalytics-min-3060034759.js"
  },
  {
    "filters": [
      "@@||securepubads.g.doubleclick.net/gpt/pubads_impl_$script,domain=rbc.ru"
    ],
    "sourceUrl": "https://www.rbc.ru",
    "type": "script",
    "url": "https://securepubads.g.doubleclick.net/gpt/pubads_impl_266.js"
  },
  {
    "filters": [
      "||emerse.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://tracking.emerse.com"
  },
  {
    "filters": [
      "||adthrive.com^$third-party",
      "||adthrive.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ads.adthrive.com"
  },
  {
    "filters": [
      "/tealium-udo."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.easports.com/tealium-udo.js"
  },
  {
    "filters": [
      "||ntv.io^$third-party",
      "||ntv.io^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s.ntv.io"
  },
  {
    "filters": [
      "||medialand.ru^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://engine.rbc.medialand.ru"
  },
  {
    "filters": [
      "||pageinfo.motorsport.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://pageinfo.motorsport.com"
  },
  {
    "filters": [
      "||blueconic.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.blueconic.net"
  },
  {
    "filters": [
      "||ccgateway.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://analytics.ccgateway.net"
  },
  {
    "filters": [
      "||cdn-net.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.cdn-net.com"
  },
  {
    "filters": [
      "||chip.de/collect"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://rt.chip.de/collect"
  },
  {
    "filters": [
      "@@||linkshrink.net/content/js/jquery-*.min.js$script"
    ],
    "sourceUrl": "https://linkshrink.net",
    "type": "script",
    "url": "https://linkshrink.net/content/js/jquery-2.1.4.min.js"
  },
  {
    "filters": [
      "||wsj.net/pb/pb.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://sts3.wsj.net/pb/pb.js"
  },
  {
    "check": true,
    "filters": [
      "@@||cam4.*/ads/directory/$first-party,xmlhttprequest,domain=~gaytube.com|~pornhub.com|~redtube.com|~redtube.com.br|~tube8.com|~tube8.es|~tube8.fr|~xtube.com|~youjizz.com|~youporn.com|~youporngay.com"
    ],
    "sourceUrl": "https://www.cam4.com",
    "type": "xhr",
    "url": "https://www.cam4.com/ads/directory/"
  },
  {
    "filters": [
      "|https://$image,script,subdocument,third-party,xmlhttprequest,domain=linkshrink.net"
    ],
    "sourceUrl": "https://linkshrink.net",
    "type": "script",
    "url": "https://"
  },
  {
    "check": true,
    "filters": [
      "||datacollect*.abtasty.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "fetch",
    "url": "https://datacollect9.abtasty.com"
  },
  {
    "filters": [
      "||tags.newscgp.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://us.tags.newscgp.com"
  },
  {
    "filters": [
      "/cxense-candy.js",
      "@@||wsj.net/*/cxense-candy.js$script,domain=wsj.com"
    ],
    "sourceUrl": "https://www.wsj.com",
    "type": "script",
    "url": "https://sts3.wsj.net/iweb/static_html_files/cxense-candy.js"
  },
  {
    "filters": [
      "||nanigans.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.nanigans.com"
  },
  {
    "filters": [
      "@@||scdn.cxense.com/cx.$script,domain=wsj.com"
    ],
    "sourceUrl": "https://www.wsj.com",
    "type": "script",
    "url": "https://scdn.cxense.com/cx.js"
  },
  {
    "filters": [
      "/getad?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://aax-us-east.amazon-adsystem.com/x/getad?"
  },
  {
    "filters": [
      "/NetworkTracking."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://support.avast.com/jslibrary/1539646802000/sfdc/NetworkTracking.js"
  },
  {
    "filters": [
      "@@||api.cxense.com/public/widget/data?$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://api.cxense.com/public/widget/data?"
  },
  {
    "filters": [
      "/top_ad."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.online.sh.cn/shol/09indexjs/images/top_ad.js"
  },
  {
    "filters": [
      "@@||ajax.googleapis.com^$script,domain=gaytube.com|pornhub.com|redtube.com|redtube.it|tube8.com|tube8.es|tube8.fr|xtube.com|youjizz.com|youporn.com|youporngay.com"
    ],
    "sourceUrl": "https://www.xtube.com",
    "type": "script",
    "url": "https://ajax.googleapis.com"
  },
  {
    "filters": [
      "||filestorage.chip.de/videoplayer^$first-party"
    ],
    "sourceUrl": "https://www.chip.de",
    "type": "script",
    "url": "https://filestorage.chip.de/videoplayer"
  },
  {
    "filters": [
      "||ncaudienceexchange.com^"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://www.ncaudienceexchange.com"
  },
  {
    "filters": [
      "||adledge.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://rs.adledge.com"
  },
  {
    "filters": [
      "||acexedge.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s.acexedge.com"
  },
  {
    "check": true,
    "filters": [
      "@@||cam4.*/ads/directory/$first-party,xmlhttprequest,domain=~gaytube.com|~pornhub.com|~redtube.com|~redtube.com.br|~tube8.com|~tube8.es|~tube8.fr|~xtube.com|~youjizz.com|~youporn.com|~youporngay.com"
    ],
    "sourceUrl": "https://www.cam4.com",
    "type": "xhr",
    "url": "https://www.cam4.com/ads/directory/"
  },
  {
    "filters": [
      "||analytics.ecosia.org^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://analytics.ecosia.org"
  },
  {
    "filters": [
      "||ps.ecosia.org^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ps.ecosia.org"
  },
  {
    "filters": [
      "/scripts/analytics."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://hello.zeddit.com/Scripts/analytics.js"
  },
  {
    "filters": [
      "/tracking.*/view?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://tracking.pornhd.com/view?"
  },
  {
    "filters": [
      "/tracking.*/viewRes?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://tracking.pornhd.com/viewRes?"
  },
  {
    "filters": [
      "-ads-manager/"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.freejobalert.com/wp-content/plugins/simple-ads-manager/"
  },
  {
    "filters": [
      "||disqus.com/api/ping?$third-party"
    ],
    "sourceUrl": "http://",
    "type": "xhr",
    "url": "https://links.services.disqus.com/api/ping?"
  },
  {
    "filters": [
      "||pubmine.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://s.pubmine.com"
  },
  {
    "filters": [
      "||svonm.com/hd-main.js$script,redirect=hd-main.js,domain=chip.de|cinema.de|cdnapi.kaltura.com"
    ],
    "sourceUrl": "https://www.chip.de",
    "type": "script",
    "url": "https://hgc-cf-cache-1.svonm.com/hd-main.js"
  },
  {
    "filters": [
      "/xbanner.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://creative.speednetwork19.com/speednetwork14/tags/xbanner/xbanner.js"
  },
  {
    "check": true,
    "filters": [
      "||piguiqproxy.com/api$xmlhttprequest,redirect=nooptext,domain=kinozal.tv"
    ],
    "sourceUrl": "http://kinozal.tv",
    "type": "xhr",
    "url": "https://piguiqproxy.com/api"
  },
  {
    "filters": [
      "||mtrcss.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://mtrcss.com"
  },
  {
    "filters": [
      "@@||imasdk.googleapis.com/js/sdkloader/ima3.js$domain=chip.de|event.mivitec.net|radio.de|welect.de"
    ],
    "sourceUrl": "https://www.chip.de",
    "type": "script",
    "url": "https://imasdk.googleapis.com/js/sdkloader/ima3.js"
  },
  {
    "filters": [
      "||audience.newscgp.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://us.audience.newscgp.com"
  },
  {
    "filters": [
      "||mxpopad.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://mxpopad.com"
  },
  {
    "filters": [
      "||loadercdn.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://loadercdn.com"
  },
  {
    "filters": [
      "/tracking.*/impression?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://tracking.pornhd.com/impression?"
  },
  {
    "filters": [
      "||adk2x.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://speednetwork14.adk2x.com"
  },
  {
    "filters": [
      "||mxtads.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://mxtads.com"
  },
  {
    "check": true,
    "filters": [
      "||livestatisc.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://livestatisc.com"
  },
  {
    "filters": [
      "/set-cookie.gif?"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://www.mgnewplg.com/set-cookie.gif?"
  },
  {
    "filters": [
      "||rec.udn.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://rec.udn.com"
  },
  {
    "filters": [
      "||adsk2.co^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://ee8f928b71ed0dc6033231fa0943d9f5.adsk2.co"
  },
  {
    "filters": [
      "||d2nq0f8d9ofdwv.cloudfront.net/track.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://d2nq0f8d9ofdwv.cloudfront.net/track.js"
  },
  {
    "filters": [
      "||pv.udn.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://pv.udn.com"
  },
  {
    "filters": [
      "||rbc.ru/count/"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://r.rbc.ru/count/"
  },
  {
    "filters": [
      "||zqtk.net^",
      "||zqtk.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://segment-data.zqtk.net"
  },
  {
    "filters": [
      "||reundcwkqvctq.com^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.reundcwkqvctq.com"
  },
  {
    "filters": [
      "_werbebanner_"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ssl.1.damoh.chip.de/hic_qos?adv_partner&_werbebanner_"
  },
  {
    "filters": [
      "||clarium.global.ssl.fastly.net^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://clarium.global.ssl.fastly.net"
  },
  {
    "filters": [
      "||analytics.meituan.net^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://analytics.meituan.net"
  },
  {
    "filters": [
      "||vidora.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://assets.vidora.com"
  },
  {
    "filters": [
      "/omgpixel."
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://collector.prod.expedia.com/omgpixel.json"
  },
  {
    "filters": [
      "||ixiaa.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://kr.ixiaa.com"
  },
  {
    "check": true,
    "filters": [
      "||ads.rediff.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ads.rediff.com"
  },
  {
    "filters": [
      "||sina.com.cn/view?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://sax.sina.com.cn/view?"
  },
  {
    "filters": [
      "/fingerprint.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://rapidgator.net/assets/52a3c5b1/fingerprint.js"
  },
  {
    "filters": [
      ".net/e.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://s.el-mundo.net/e.gif?"
  },
  {
    "filters": [
      "/gomez/*$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://scache.vzw.com/scripts/gomez/"
  },
  {
    "filters": [
      "/dynamic-ad/*",
      "-ad/embed."
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://display.vitrines.in/dynamic-ad/embed.js"
  },
  {
    "filters": [
      "||amazonaws.com/new.cetrk.com/"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s3.amazonaws.com/new.cetrk.com/"
  },
  {
    "filters": [
      "_Analytics.js?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static.viva.co.id/appasset-2018/desktop-2018/js/viva_analytics.js?"
  },
  {
    "filters": [
      "||imads.rediff.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://imads.rediff.com"
  },
  {
    "filters": [
      "||usmetric.rediff.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://usmetric.rediff.com"
  },
  {
    "filters": [
      "||rediff.com^*/?rkey="
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://usmetric.rediff.com/ushome.rediff.com/?rkey=1375143581&device=mob"
  },
  {
    "filters": [
      "||verizonwireless.com/mpel.js?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://es.verizonwireless.com/mpel.js?"
  },
  {
    "filters": [
      "||track1.viewdeos.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://track1.viewdeos.com"
  },
  {
    "filters": [
      "||box.com/gen204?"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://app.box.com/gen204?"
  },
  {
    "filters": [
      ".com/js/ad."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://img.scupio.com/js/ad.js"
  },
  {
    "filters": [
      "||track.viewdeos.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://track.viewdeos.com"
  },
  {
    "filters": [
      "||voicefive.com^",
      "||voicefive.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://sb.voicefive.com"
  },
  {
    "filters": [
      "||networld.hk^$third-party",
      "/ad2/res/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://i.l.networld.hk/ad2/res/"
  },
  {
    "filters": [
      "/audience-extraction.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://m.discuss.com.hk/include/js/audience-extraction.js"
  },
  {
    "filters": [
      "||hot-mob.com^$third-party",
      "/hotmobtag_"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://code.hot-mob.com/api/javascript/sdk4/hotmobtag_min.js"
  },
  {
    "filters": [
      "/advertisements/*"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://bffmobilesite.cdiscount.com/advertisements/"
  },
  {
    "filters": [
      "_120x600."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://s0.2mdn.net/5524229/1539862361860/booknow_120x600.jpg"
  },
  {
    "filters": [
      "/lib/ads."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://code.hot-mob.com/api/javascript/sdk4/lib/ads.min.js"
  },
  {
    "filters": [
      "/getThirdPartyTracking?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://webapi.hot-mob.com/api/cookie/getThirdPartyTracking?"
  },
  {
    "filters": [
      "||eroterest.net^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.eroterest.net"
  },
  {
    "filters": [
      "||counter.ukr.net^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://counter.ukr.net"
  },
  {
    "filters": [
      "||c.bigmir.net^",
      "||bigmir.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://c.bigmir.net"
  },
  {
    "filters": [
      "-ad1."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://im.rediff.com/500-500/getahead/2018/sep/07condom-ad1.jpg"
  },
  {
    "filters": [
      "||target.ukr.net^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://target.ukr.net"
  },
  {
    "filters": [
      "@@||phncdn.com/timings-$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn1d-static-shared.phncdn.com/timings-1.0.1.js"
  },
  {
    "filters": [
      "@@||phncdn.com/tubes-$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn1d-static-shared.phncdn.com/tubes-1.0.0.js"
  },
  {
    "filters": [
      "||vidazoo.com/event/"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://bis-ssl.vidazoo.com/event/"
  },
  {
    "filters": [
      "||itc.cn/pv/"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://a1.itc.cn/pv/"
  },
  {
    "filters": [
      "-text-ads."
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://www.icicibank.com/chatbot-text-ads.html"
  },
  {
    "filters": [
      "/adv/adriver"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.vesti.ru/i/external/adv/adriver.core.2.js"
  },
  {
    "filters": [
      "/adv.png"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://www.vesti.ru/i/adv.png"
  },
  {
    "filters": [
      "||adsfactor.net^$third-party",
      "/adj.php?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://servedby.adsfactor.net/adj.php?"
  },
  {
    "filters": [
      "||adblockmetrics.ru^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://adblockmetrics.ru"
  },
  {
    "filters": [
      "/ad/banner/*",
      "_adsense_",
      "_adserver/",
      "_adview_",
      ".ad.json?"
    ],
    "sourceUrl": "http://",
    "type": "xhr",
    "url": "https://adblockmetrics.ru/ad/banner/_adsense_/_adserver/_adview_.ad.json?"
  },
  {
    "filters": [
      "/mobile_ad."
    ],
    "sourceUrl": "https://",
    "type": "stylesheet",
    "url": "https://adpic.pchome.com.tw/css/mobile_ad.css"
  },
  {
    "filters": [
      "://adcl.$domain=~adcl.com"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://adcl.pchome.com.tw"
  },
  {
    "filters": [
      "||tag.aticdn.net^",
      "/smarttag.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tag.aticdn.net/589884/smarttag.js"
  },
  {
    "filters": [
      "/xpcadshow."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://kdpic.pchome.com.tw/img/js/xpcadshow.js"
  },
  {
    "filters": [
      "/right_ad_"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.pchome.com.tw/img/right_ad_banner34045.gif"
  },
  {
    "check": true,
    "filters": [
      "@@||ad.crwdcntrl.net^$script,domain=cityam.com|investopedia.com"
    ],
    "sourceUrl": "https://www.investopedia.com",
    "type": "script",
    "url": "https://ad.crwdcntrl.net"
  },
  {
    "filters": [
      "/horizon.*/track?",
      "/horizon/track?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://horizon.sailthru.com/horizon/track?"
  },
  {
    "check": true,
    "filters": [
      "||i.skimresources.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://i.skimresources.com"
  },
  {
    "filters": [
      "||collector.schibsted.io^"
    ],
    "sourceUrl": "https://",
    "type": "fetch",
    "url": "https://collector.schibsted.io"
  },
  {
    "filters": [
      "/show.cgi?adp"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://www.smi.ru/show.cgi?adp=29&div=DIV_SMI_29"
  },
  {
    "filters": [
      "||directadvert.net^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://www.directadvert.net"
  },
  {
    "filters": [
      "||contentpass.net/stats?$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://api.contentpass.net/stats?"
  },
  {
    "filters": [
      "/mpf-mediator."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://mediator.imgsmail.ru/2/mpf-mediator.min.js"
  },
  {
    "filters": [
      "||metric*.rediff.com^"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://metric.rediff.com"
  },
  {
    "filters": [
      "||eporner.com/dot/$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.eporner.com/dot/"
  },
  {
    "filters": [
      "||medyanetads.com^$third-party",
      "||medyanetads.com^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://app.medyanetads.com"
  },
  {
    "filters": [
      "/dfp.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://app.medyanetads.com/dfp.js"
  },
  {
    "filters": [
      "||clicks.hurriyet.com.tr^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://clicks.hurriyet.com.tr"
  },
  {
    "filters": [
      "/boomLogger."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://lg.naukri.com/nLogger/boomLogger.php"
  },
  {
    "filters": [
      "||retargetly.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://api.retargetly.com"
  },
  {
    "filters": [
      "||dataxpand.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tc.dataxpand.com"
  },
  {
    "filters": [
      "||crsspxl.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tag.crsspxl.com"
  },
  {
    "filters": [
      "/ad-stub-",
      "/adctrl/*",
      "-ad-plugin-",
      "/cdn-ad-"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://ad-stub-vgtrk.cdnvideo.ru/adctrl/plugin/html5/v1/cdn-ad-plugin-html5.js"
  },
  {
    "filters": [
      ".advert.$domain=~advert.ae|~advert.io|~advert.ly"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://player.vgtrk.com/js/ads.adfox.weborama.advert.banner.js"
  },
  {
    "filters": [
      "@@||player.vgtrk.com/js/stat.js?"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://player.vgtrk.com/js/stat.js?"
  },
  {
    "filters": [
      "||d2focgxak1cn74.cloudfront.net^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://d2focgxak1cn74.cloudfront.net"
  },
  {
    "filters": [
      "||trafficforce.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://delivery.trafficforce.com"
  },
  {
    "check": true,
    "filters": [
      "|ws://$domain=4shared.com"
    ],
    "sourceUrl": "https://www.4shared.com",
    "type": "stylesheet",
    "url": "https://"
  },
  {
    "check": true,
    "filters": [
      "@@||4shared.com^$image,script,xmlhttprequest",
      "@@||4shared.com^$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static.4shared.com"
  },
  {
    "check": true,
    "filters": [
      "|https://$script,third-party,xmlhttprequest,domain=4shared.com"
    ],
    "sourceUrl": "https://www.4shared.com",
    "type": "script",
    "url": "https://"
  },
  {
    "check": true,
    "filters": [
      "@@||4shared.com^$image"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://static.4shared.com"
  },
  {
    "filters": [
      "/sovrn_beacon_"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ap.lijit.com/www/sovrn_beacon_standalone"
  },
  {
    "filters": [
      "|https://$script,domain=motherless.com",
      "@@||ajax.googleapis.com^$script,domain=motherless.com",
      "|https://$third-party,xmlhttprequest,domain=motherless.com"
    ],
    "sourceUrl": "https://motherless.com",
    "type": "script",
    "url": "https://ajax.googleapis.com"
  },
  {
    "filters": [
      "@@||motherless.com/scripts/site.min.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://motherless.com/scripts/site.min.js"
  },
  {
    "filters": [
      "@@||motherless.com/scripts/bots.min.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://motherless.com/scripts/bots.min.js"
  },
  {
    "filters": [
      "/site_ads."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://motherless.com/scripts/site_ads.js"
  },
  {
    "filters": [
      "@@||motherless.com/scripts/jquery.*.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://motherless.com/scripts/jquery.backgroundSize.min.js"
  },
  {
    "filters": [
      "@@||motherless.com/scripts/home_page.min.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://motherless.com/scripts/home_page.min.js"
  },
  {
    "filters": [
      "@@||motherless.com/scripts/perfect-scrollbar.jquery.min.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://motherless.com/scripts/perfect-scrollbar.jquery.min.js"
  },
  {
    "filters": [
      "@@||motherless.com/scripts/responsive.min.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://motherless.com/scripts/responsive.min.js"
  },
  {
    "filters": [
      "@@||motherless.com/scripts/mobile/index.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://motherless.com/scripts/mobile/index.js"
  },
  {
    "filters": [
      "/banner_ads/*"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://x4i6u4n6.ssl.hwcdn.net/Banner_ads/"
  },
  {
    "filters": [
      "-criteo."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://m.kp.ru/js/frames/header-bidding-criteo.js"
  },
  {
    "filters": [
      "||track.dictionary.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://track.dictionary.com"
  },
  {
    "check": true,
    "filters": [
      "||jscount.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.jscount.com"
  },
  {
    "filters": [
      "||ato.mx^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://s.ato.mx"
  },
  {
    "filters": [
      "||adomik.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://news-127845-hdb.adomik.com"
  },
  {
    "filters": [
      "/js_tracker.",
      "_tracker.js?"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://click.dangdang.com/js_tracker.js?"
  },
  {
    "filters": [
      "/metrika/watch_"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "https://mc.yandex.ru/metrika/watch_match.html"
  },
  {
    "filters": [
      "||facebook.com*/impression.php"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.facebook.com/impression.php"
  },
  {
    "filters": [
      "/advertisement-$domain=~berlin-airport.de"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://pt-static4.jsmstat.com/_common/script/adblock/advertisement-v518938.js"
  },
  {
    "filters": [
      "/adshow2."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://kdcl.pchome.com.tw/adshow2.html"
  },
  {
    "filters": [
      "_ad.php?"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://apis.pchome.com.tw/PFB_AD.php?"
  },
  {
    "filters": [
      "/rumstat."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://rumstat.cdnvideo.ru"
  },
  {
    "filters": [
      "_wreport.fcgi?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://kpruanalytics.solution.weborama.fr/fcgi-bin/comptage_wreport.fcgi?"
  },
  {
    "filters": [
      "||faggrim.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://faggrim.com"
  },
  {
    "filters": [
      "||sellpoints.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://t.sellpoints.com"
  },
  {
    "filters": [
      "||crm4d.com^$third-party",
      "/weborama.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://p.crm4d.com/sync/weborama.js"
  },
  {
    "filters": [
      "/pixelappcollector.",
      ".uk/track?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://pixelappcollector.thesun.co.uk/track?"
  },
  {
    "filters": [
      "||click.jasmin.com^",
      "/awe/ccs."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://click.jasmin.com/awe/ccs.php"
  },
  {
    "filters": [
      "||click.livejasmin.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://click.livejasmin.com"
  },
  {
    "filters": [
      "||keywee.co^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.keywee.co"
  },
  {
    "filters": [
      ".com/r.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://sync.dmp.otm-r.com/r.gif?"
  },
  {
    "filters": [
      "||cloudfront.net/vis_opt.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://d5phz18u4wuww.cloudfront.net/vis_opt.js"
  },
  {
    "filters": [
      "||acrabakasaka.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://xhr.acrabakasaka.com"
  },
  {
    "filters": [
      "||io.narrative.io/?$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://io.narrative.io/?"
  },
  {
    "filters": [
      "/bundles/metrics."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.wunderground.com/bundles/metrics.6c3accb7419a5ccca533.js"
  },
  {
    "filters": [
      "||servedbyopenx.com^$third-party",
      "||servedbyopenx.com^",
      "://ox-*/jstag^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ox-d.ask.servedbyopenx.com/w/1.0/jstag"
  },
  {
    "filters": [
      "/ads4.$domain=~ads4.city"
    ],
    "sourceUrl": "http://",
    "type": "xhr",
    "url": "http://ads4.admatic.com.tr"
  },
  {
    "filters": [
      "||adincube.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://tag.adincube.com"
  },
  {
    "filters": [
      "||bnserving.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.bnserving.com"
  },
  {
    "filters": [
      "/tracker/track.php?"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://www.reimageplus.com/tracker/track.php?"
  },
  {
    "filters": [
      "||t.kck.st^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://t.kck.st"
  },
  {
    "filters": [
      "||duowan.com/duowan.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.duowan.com/duowan.js"
  },
  {
    "filters": [
      "/yastat.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://pub.dwstatic.com/common/js/yastat.js"
  },
  {
    "filters": [
      "||newstarads.com^$third-party",
      "||newstarads.com^"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.newstarads.com"
  },
  {
    "filters": [
      "/ads5."
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://ads5.admatic.com.tr"
  },
  {
    "filters": [
      "/RecordHit?"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://www.squarespace.com/api/census/RecordHit?"
  },
  {
    "filters": [
      "||wxug.com^*/sourcepoint/$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://icons.wxug.com/scripts/sourcepoint/"
  },
  {
    "filters": [
      "||analytics-static.ugc.bazaarvoice.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://analytics-static.ugc.bazaarvoice.com"
  },
  {
    "filters": [
      "||luxup2.ru^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://luxup2.ru"
  },
  {
    "filters": [
      "/showad/*"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://ads5.admatic.com.tr/showad/"
  },
  {
    "filters": [
      "||bazaarvoice.com/sid.gif"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://network.bazaarvoice.com/sid.gif"
  },
  {
    "filters": [
      "||velocitycdn.com^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.velocitycdn.com"
  },
  {
    "filters": [
      "||eclick.vn^$third-party",
      "||eclick.vn^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://scdn.eclick.vn"
  },
  {
    "filters": [
      "/visitorCookie."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://assets.yenisafak.com/yenisafak/assetsNew/js/VisitorCookie.js"
  },
  {
    "filters": [
      "||82o9v830.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://82o9v830.com"
  },
  {
    "filters": [
      "/adtags."
    ],
    "sourceUrl": "https://",
    "type": "stylesheet",
    "url": "https://cs3.wettercomassets.com/wcomv5/css/advertising/adtags.css"
  },
  {
    "filters": [
      "||polyad.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://core.polyad.net"
  },
  {
    "filters": [
      "||inskinad.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.inskinad.com"
  },
  {
    "filters": [
      "||ev.kck.st^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://ev.kck.st"
  },
  {
    "filters": [
      "/tracking.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://emea-v3.tracking.justpremium.com/tracking.gif?"
  },
  {
    "filters": [
      "||ntvcld-a.akamaihd.net^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ntvcld-a.akamaihd.net"
  },
  {
    "filters": [
      "/chartbeat.js$domain=wetter.com"
    ],
    "sourceUrl": "https://www.wetter.com",
    "type": "script",
    "url": "https://static.chartbeat.com/js/chartbeat.js"
  },
  {
    "filters": [
      "||ioam.de/tx.io?$domain=wetter.com"
    ],
    "sourceUrl": "https://www.wetter.com",
    "type": "script",
    "url": "https://de.ioam.de/tx.io?"
  },
  {
    "filters": [
      "||theadex.com^$domain=wetter.com"
    ],
    "sourceUrl": "https://www.wetter.com",
    "type": "script",
    "url": "https://dmp.theadex.com"
  },
  {
    "filters": [
      "||evgnet.com/beacon/"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.evgnet.com/beacon/"
  },
  {
    "filters": [
      "||mobtrks.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://go.mobtrks.com"
  },
  {
    "filters": [
      "||vihub.ru^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://dmp.vihub.ru"
  },
  {
    "filters": [
      "/ads.aspx"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.inskinad.com/ISAPAdServer/AdS.aspx"
  },
  {
    "filters": [
      "||e-planning.net^$third-party",
      "||e-planning.net^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://i.e-planning.net"
  },
  {
    "filters": [
      "||evergage.com^",
      "||evergage.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://lenovo.evergage.com"
  },
  {
    "filters": [
      "/inv/ads/*",
      "@@||investopedia.com/inv/ads/$image,domain=investopedia.com"
    ],
    "sourceUrl": "https://www.investopedia.com",
    "type": "image",
    "url": "https://i.investopedia.com/inv/ads/"
  },
  {
    "filters": [
      "||goutee.top^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://goutee.top"
  },
  {
    "filters": [
      "||tradelab.fr^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://cdn.tradelab.fr"
  },
  {
    "filters": [
      "||estat.com^",
      "||estat.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://w.estat.com"
  },
  {
    "filters": [
      "/adtrack.$domain=~adtrack.ca"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://adtrack.adleadevent.com"
  },
  {
    "filters": [
      "||webtrendslive.com^",
      "||webtrendslive.com^$third-party",
      "/wtid.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://statse.webtrendslive.com/dcs2227ulli4xxp3oi2yv4qus_5g8l/wtid.js"
  },
  {
    "filters": [
      "/logduration/*",
      "/wadsAdsLoaded/*"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://goutee.top/logduration/wadsAdsLoaded/"
  },
  {
    "check": true,
    "filters": [
      "||undertone.com^$third-party",
      "||ads.undertone.com^",
      "||undertone.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ads.undertone.com"
  },
  {
    "filters": [
      "||intentmedia.net^$third-party",
      "||intentmedia.net^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://adapters.cdn.intentmedia.net"
  },
  {
    "filters": [
      "||proofpositivemedia.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://api.proofpositivemedia.com"
  },
  {
    "filters": [
      "/Api/Ad."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://api-34-219-167-236.b2c.com/api/ad.gif"
  },
  {
    "filters": [
      "@@||reuters.com/ads.js$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.reuters.com/ads.js"
  },
  {
    "filters": [
      "@@||motherless.com/scripts/auth.min.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://motherless.com/scripts/auth.min.js"
  },
  {
    "filters": [
      "@@||motherless.com/scripts/jwplayer.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://motherless.com/scripts/jwplayer.js"
  },
  {
    "filters": [
      "/boomerang.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.groupon.com/coupons/static/js/boomerang.js"
  },
  {
    "filters": [
      "||groupon.com/analytic/",
      "/view.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.groupon.com/analytic/view.gif?"
  },
  {
    "filters": [
      "||admantx.com^",
      "/admantx/*",
      "||admantx.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://async01.admantx.com/admantx/"
  },
  {
    "filters": [
      "@@||media.net/bidexchange.js$domain=reuters.com"
    ],
    "sourceUrl": "https://www.reuters.com",
    "type": "script",
    "url": "https://contextual.media.net/bidexchange.js"
  },
  {
    "filters": [
      "/pb.min."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s2.wp.com/wp-content/themes/vip/nypost-2016/static/js/pb.min.js"
  },
  {
    "filters": [
      "/bundles/ads-"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.wunderground.com/bundles/ads-action-refresh.e2225ca5a297cdd19c9b.js"
  },
  {
    "filters": [
      "/vip-analytics."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s0.wp.com/wp-content/mu-plugins/2-vip/js/vip-analytics.js"
  },
  {
    "filters": [
      "||cloudfront.net/analytics.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://d2dq2ahtl5zl1z.cloudfront.net/analytics.js"
  },
  {
    "filters": [
      "||accn.allocine.net^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://accn.allocine.net"
  },
  {
    "filters": [
      "@@||ps.w.org^*/assets/$image,domain=wordpress.org"
    ],
    "sourceUrl": "https://wordpress.org",
    "type": "image",
    "url": "https://ps.w.org/dark-mode/assets/"
  },
  {
    "filters": [
      "||carambo.la^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://route.carambo.la"
  },
  {
    "filters": [
      "||pixel.watch^",
      "||pixel.watch^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://pixel.watch"
  },
  {
    "filters": [
      "||pxc.otto.de^"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://pxc.otto.de"
  },
  {
    "filters": [
      "/iframe.php?spotID="
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://hd100546b.com/iframe.php?spotID=182&w=300&h=250"
  },
  {
    "filters": [
      "/mediametrie.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.allocine.fr/js_v7/src/jwplayer/plugin/mediametrie.js"
  },
  {
    "check": true,
    "filters": [
      ".com/js/ads/"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static.4shared.com/js/ads/"
  },
  {
    "check": true,
    "filters": [
      "||logging.carambo.la^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://logging.carambo.la"
  },
  {
    "check": true,
    "filters": [
      "||analytics.carambo.la^"
    ],
    "sourceUrl": "https://",
    "type": "fetch",
    "url": "https://analytics.carambo.la"
  },
  {
    "filters": [
      "/getads|"
    ],
    "sourceUrl": "https://",
    "type": "fetch",
    "url": "https://xtr.carambo.la/GetAds"
  },
  {
    "filters": [
      "||urdupoint.com^*/banners/"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://m.urdupoint.com/includes/banners/"
  },
  {
    "filters": [
      "/publicidad/*",
      "@@||bancodevenezuela.com/imagenes/publicidad/$first-party"
    ],
    "sourceUrl": "http://www.bancodevenezuela.com",
    "type": "image",
    "url": "http://www.bancodevenezuela.com/imagenes/publicidad/"
  },
  {
    "filters": [
      "@@||bancodevenezuela.com/imagenes/publicidad/$first-party"
    ],
    "sourceUrl": "http://www.bancodevenezuela.com",
    "type": "image",
    "url": "http://www.bancodevenezuela.com/imagenes/publicidad/"
  },
  {
    "filters": [
      "@@||bancodevenezuela.com/imagenes/publicidad/$first-party"
    ],
    "sourceUrl": "http://www.bancodevenezuela.com",
    "type": "image",
    "url": "http://www.bancodevenezuela.com/imagenes/publicidad/"
  },
  {
    "filters": [
      "@@||bancodevenezuela.com/imagenes/publicidad/$first-party"
    ],
    "sourceUrl": "http://www.bancodevenezuela.com",
    "type": "image",
    "url": "http://www.bancodevenezuela.com/imagenes/publicidad/"
  },
  {
    "filters": [
      "@@||bancodevenezuela.com/imagenes/publicidad/$first-party"
    ],
    "sourceUrl": "http://www.bancodevenezuela.com",
    "type": "image",
    "url": "http://www.bancodevenezuela.com/imagenes/publicidad/"
  },
  {
    "filters": [
      "@@||bancodevenezuela.com/imagenes/publicidad/$first-party"
    ],
    "sourceUrl": "http://www.bancodevenezuela.com",
    "type": "image",
    "url": "http://www.bancodevenezuela.com/imagenes/publicidad/"
  },
  {
    "filters": [
      "@@||bancodevenezuela.com/imagenes/publicidad/$first-party"
    ],
    "sourceUrl": "http://www.bancodevenezuela.com",
    "type": "image",
    "url": "http://www.bancodevenezuela.com/imagenes/publicidad/"
  },
  {
    "filters": [
      "@@||bancodevenezuela.com/imagenes/publicidad/$first-party"
    ],
    "sourceUrl": "http://www.bancodevenezuela.com",
    "type": "image",
    "url": "http://www.bancodevenezuela.com/imagenes/publicidad/"
  },
  {
    "filters": [
      "/adv_teasers."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static-cache.ua.prom.ua/js/adv_teasers.js"
  },
  {
    "filters": [
      "||mbww.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tt.mbww.com"
  },
  {
    "filters": [
      "||cadreon.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://unity.cadreon.com"
  },
  {
    "filters": [
      "||googletagservices.com/tag/js/gpt.js$script,redirect=noopjs,domain=playground.ru"
    ],
    "sourceUrl": "http://www.playground.ru",
    "type": "script",
    "url": "https://www.googletagservices.com/tag/js/gpt.js"
  },
  {
    "filters": [
      "||licensing.bitmovin.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://licensing.bitmovin.com"
  },
  {
    "filters": [
      "||customer.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://assets.customer.io"
  },
  {
    "filters": [
      "728x90.png|"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://d2yoo3qu6vrk5d.cloudfront.net/comercial/FormatosPauta/728x90.png"
  },
  {
    "filters": [
      "_300x600."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://d2yoo3qu6vrk5d.cloudfront.net/comercial/FormatosPauta/left_300x600.gif"
  },
  {
    "filters": [
      "/meta-tracker/*"
    ],
    "sourceUrl": "http://",
    "type": "xhr",
    "url": "http://193.36.45.180/meta-tracker/"
  },
  {
    "filters": [
      "||audience.acpm.fr^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tag.audience.acpm.fr"
  },
  {
    "filters": [
      "||partner.worldoftanks.com^",
      "/js/tracker.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://partner.worldoftanks.com/static/js/tracker.js"
  },
  {
    "filters": [
      "/tracker/tracker-$domain=~bugs.chromium.org",
      "/tracker-config.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://partner.worldoftanks.com/media/tracker/tracker-config.js"
  },
  {
    "filters": [
      "||geoip.nekudo.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://geoip.nekudo.com"
  },
  {
    "filters": [
      "||eloqua.com^$third-party,script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s334284386.t.eloqua.com"
  },
  {
    "filters": [
      "/imageads/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://cdn.okezone.com/www/2015/imageads/"
  },
  {
    "filters": [
      "||researchintel.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://onsite2.researchintel.com"
  },
  {
    "filters": [
      "/ad_title_"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://tblg.k-img.com/images/smartphone/icon/ad_title_bg.gif"
  },
  {
    "filters": [
      "@@||bancodevenezuela.com/imagenes/publicidad/$first-party"
    ],
    "sourceUrl": "http://www.bancodevenezuela.com",
    "type": "image",
    "url": "http://www.bancodevenezuela.com/imagenes/publicidad/"
  },
  {
    "filters": [
      "@@||bancodevenezuela.com/imagenes/publicidad/$first-party"
    ],
    "sourceUrl": "http://www.bancodevenezuela.com",
    "type": "image",
    "url": "http://www.bancodevenezuela.com/imagenes/publicidad/"
  },
  {
    "filters": [
      "@@||bancodevenezuela.com/imagenes/publicidad/$first-party"
    ],
    "sourceUrl": "http://www.bancodevenezuela.com",
    "type": "image",
    "url": "http://www.bancodevenezuela.com/imagenes/publicidad/"
  },
  {
    "filters": [
      "@@||bancodevenezuela.com/imagenes/publicidad/$first-party"
    ],
    "sourceUrl": "http://www.bancodevenezuela.com",
    "type": "image",
    "url": "http://www.bancodevenezuela.com/imagenes/publicidad/"
  },
  {
    "filters": [
      "@@||bancodevenezuela.com/imagenes/publicidad/$first-party"
    ],
    "sourceUrl": "http://www.bancodevenezuela.com",
    "type": "image",
    "url": "http://www.bancodevenezuela.com/imagenes/publicidad/"
  },
  {
    "filters": [
      "@@||bancodevenezuela.com/imagenes/publicidad/$first-party"
    ],
    "sourceUrl": "http://www.bancodevenezuela.com",
    "type": "image",
    "url": "http://www.bancodevenezuela.com/imagenes/publicidad/"
  },
  {
    "filters": [
      "@@||bancodevenezuela.com/imagenes/publicidad/$first-party"
    ],
    "sourceUrl": "http://www.bancodevenezuela.com",
    "type": "image",
    "url": "http://www.bancodevenezuela.com/imagenes/publicidad/"
  },
  {
    "filters": [
      "@@||bancodevenezuela.com/imagenes/publicidad/$first-party"
    ],
    "sourceUrl": "http://www.bancodevenezuela.com",
    "type": "image",
    "url": "http://www.bancodevenezuela.com/imagenes/publicidad/"
  },
  {
    "filters": [
      "||actiflex.org^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "https://actiflex.org"
  },
  {
    "filters": [
      "/standalone/ads-",
      "/ads-cch-"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.lequipe.fr/elements/js/standalone/ads-cch-20181023100659.js"
  },
  {
    "filters": [
      "||valuecommerce.com^$third-party",
      "||valuecommerce.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://trj.valuecommerce.com"
  },
  {
    "filters": [
      "@@||bancodevenezuela.com/imagenes/publicidad/$first-party"
    ],
    "sourceUrl": "http://www.bancodevenezuela.com",
    "type": "image",
    "url": "http://www.bancodevenezuela.com/imagenes/publicidad/"
  },
  {
    "filters": [
      "@@||bancodevenezuela.com/imagenes/publicidad/$first-party"
    ],
    "sourceUrl": "http://www.bancodevenezuela.com",
    "type": "image",
    "url": "http://www.bancodevenezuela.com/imagenes/publicidad/"
  },
  {
    "filters": [
      "@@||bancodevenezuela.com/imagenes/publicidad/$first-party"
    ],
    "sourceUrl": "http://www.bancodevenezuela.com",
    "type": "image",
    "url": "http://www.bancodevenezuela.com/imagenes/publicidad/"
  },
  {
    "filters": [
      "@@||bancodevenezuela.com/imagenes/publicidad/$first-party"
    ],
    "sourceUrl": "http://www.bancodevenezuela.com",
    "type": "image",
    "url": "http://www.bancodevenezuela.com/imagenes/publicidad/"
  },
  {
    "filters": [
      "@@||bancodevenezuela.com/imagenes/publicidad/$first-party"
    ],
    "sourceUrl": "http://www.bancodevenezuela.com",
    "type": "image",
    "url": "http://www.bancodevenezuela.com/imagenes/publicidad/"
  },
  {
    "filters": [
      "@@||bancodevenezuela.com/imagenes/publicidad/$first-party"
    ],
    "sourceUrl": "http://www.bancodevenezuela.com",
    "type": "image",
    "url": "http://www.bancodevenezuela.com/imagenes/publicidad/"
  },
  {
    "filters": [
      "@@||bancodevenezuela.com/imagenes/publicidad/$first-party"
    ],
    "sourceUrl": "http://www.bancodevenezuela.com",
    "type": "image",
    "url": "http://www.bancodevenezuela.com/imagenes/publicidad/"
  },
  {
    "filters": [
      "@@||bancodevenezuela.com/imagenes/publicidad/$first-party"
    ],
    "sourceUrl": "http://www.bancodevenezuela.com",
    "type": "image",
    "url": "http://www.bancodevenezuela.com/imagenes/publicidad/"
  },
  {
    "filters": [
      "||netcore.co.in^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tw.netcore.co.in"
  },
  {
    "check": true,
    "filters": [
      "/728x90_"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://pastebin.com/adserver/728x90_custom_safe.php"
  },
  {
    "filters": [
      "/admanager/*$~object-subrequest"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tags.newdreamglobal.com/admanager/"
  },
  {
    "filters": [
      "||begun.ru^$third-party",
      "||begun.ru^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://autocontext.begun.ru"
  },
  {
    "filters": [
      "||netcoresmartech.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://twa.netcoresmartech.com"
  },
  {
    "filters": [
      "/js/dart.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s4.reutersmedia.net/resources/js/dart.js"
  },
  {
    "filters": [
      "/adfrequencycapping."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s2.reutersmedia.net/resources/js/adFrequencyCapping.js"
  },
  {
    "filters": [
      "||revsci.net^$third-party",
      "||revsci.net^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://js.revsci.net"
  },
  {
    "filters": [
      "||d16fk4ms6rqz1v.cloudfront.net^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://d16fk4ms6rqz1v.cloudfront.net"
  },
  {
    "filters": [
      "||fogl1onf.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://fogl1onf.com"
  },
  {
    "filters": [
      "||adxcore.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://mtag.adxcore.com"
  },
  {
    "filters": [
      "/adjs_"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ad.adxcore.com/adjs_r.php"
  },
  {
    "filters": [
      "||onfocus.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://iq.onfocus.io"
  },
  {
    "filters": [
      ".adsense."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://script.onfocus.io/ad/onfocus.adsense.js"
  },
  {
    "filters": [
      "/visits/pixel?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://events.mediarithmics.com/v1/visits/pixel?"
  },
  {
    "filters": [
      "||i2ad.jp^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://i2ad.jp"
  },
  {
    "filters": [
      "/spcjs.php"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://c.echoban.ru/delivery/spcjs.php"
  },
  {
    "filters": [
      "/smarttag-prod."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.lequipe.fr/v6/js/smarttag-prod.js"
  },
  {
    "filters": [
      "/core-tracking.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s2.reutersmedia.net/resources_v2/js/core-tracking.js"
  },
  {
    "filters": [
      "/adbanner."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://adbanner.adxcore.com"
  },
  {
    "filters": [
      "||ayads.co^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ads.ayads.co"
  },
  {
    "filters": [
      "||dtprofit.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://a.dtprofit.com"
  },
  {
    "filters": [
      "||adv.drtuber.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://adv.drtuber.com"
  },
  {
    "filters": [
      "||extreme-dm.com^",
      "||extreme-dm.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://t1.extreme-dm.com"
  },
  {
    "filters": [
      "||bs.yandex.ru^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://bs.yandex.ru"
  },
  {
    "filters": [
      "||video.oms.eu^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.video.oms.eu"
  },
  {
    "filters": [
      "||hotlog.ru^",
      "||hotlog.ru^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://js.hotlog.ru"
  },
  {
    "filters": [
      "||creative.stripchat.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://creative.stripchat.com"
  },
  {
    "filters": [
      "/adcenter.$script,domain=~adcenter.capgemini.com|~adcenter.nu|~m-m-g.com"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://adcenter.gmarket.co.kr"
  },
  {
    "filters": [
      "||ozon.ru^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.ozon.ru"
  },
  {
    "filters": [
      ".com/log/?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://l.adxcore.com/log/?"
  },
  {
    "filters": [
      "/adasync."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://a.twiago.com/adasync.min.js"
  },
  {
    "filters": [
      "||adscience.nl^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://rtb7.adscience.nl"
  },
  {
    "filters": [
      "/figanalytics.",
      "/figanalytics/*"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://a.f1g.fr/assets-sl/figanalytics/figanalytics.js"
  },
  {
    "filters": [
      "/onfocus-tag."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://a.f1g.fr/build/onfocus-tag.js"
  },
  {
    "filters": [
      "||survicate.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://api.survicate.com"
  },
  {
    "filters": [
      "||try.abtasty.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://try.abtasty.com"
  },
  {
    "filters": [
      "||exponea.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ozon-api.exponea.com"
  },
  {
    "filters": [
      "||logmatic.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://api.logmatic.io"
  },
  {
    "filters": [
      "/adunits."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://adunits.datawrkz.com"
  },
  {
    "filters": [
      "/advertise.$domain=~advertise.apartments.com|~advertise.directoryofillustration.com|~advertise.isleofskye.com|~advertise.market|~advertise.medillsb.com|~advertise.movem.co.uk|~advertise.sobihamilton.ca|~advertise.sphamovingads.com|~advertise.welovebuzz.com|~bingads.microsoft.com|~engineering.com"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://st.championat.com/shared/advertise.js"
  },
  {
    "filters": [
      "||imagetwist.com^$script,first-party",
      "@@||imagetwist.com/xupload.js",
      "||imagetwist.com^$first-party,script"
    ],
    "sourceUrl": "https://www.imagetwist.com",
    "type": "script",
    "url": "https://imagetwist.com/xupload.js"
  },
  {
    "filters": [
      "||imagetwist.com^$script,first-party",
      "@@||imagetwist.com/jquery-*.js"
    ],
    "sourceUrl": "https://www.imagetwist.com",
    "type": "script",
    "url": "https://www.imagetwist.com/jquery-1.12.4.min.js"
  },
  {
    "filters": [
      "||imagetwist.com^$script,first-party",
      "@@||imagetwist.com/jquery.*.js"
    ],
    "sourceUrl": "https://www.imagetwist.com",
    "type": "script",
    "url": "https://www.imagetwist.com/jquery.easing.1.3.js"
  },
  {
    "filters": [
      "||imagetwist.com^$script,first-party"
    ],
    "sourceUrl": "https://www.imagetwist.com",
    "type": "script",
    "url": "https://www.imagetwist.com"
  },
  {
    "filters": [
      "||imagetwist.com^$script,first-party"
    ],
    "sourceUrl": "https://www.imagetwist.com",
    "type": "script",
    "url": "https://imagetwist.com"
  },
  {
    "filters": [
      "/u/ads/*"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://hw-static.worldstarhiphop.com/u/ads/"
  },
  {
    "filters": [
      "/banner.cgi?"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://www2.nhk.or.jp/toppage/api/banner.cgi?"
  },
  {
    "filters": [
      "/logger/p.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.mathrubhumi.com/logger/p.gif?"
  },
  {
    "filters": [
      "||iasds01.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ci.iasds01.com"
  },
  {
    "filters": [
      "||truoptik.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://dmp.truoptik.com"
  },
  {
    "filters": [
      "||imagetwist.com^$script,first-party"
    ],
    "sourceUrl": "https://imagetwist.com",
    "type": "script",
    "url": "https://imagetwist.com"
  },
  {
    "filters": [
      "||imagetwist.com^$script,first-party"
    ],
    "sourceUrl": "https://imagetwist.com",
    "type": "script",
    "url": "https://imagetwist.com"
  },
  {
    "filters": [
      "||imagetwist.com^$script,first-party"
    ],
    "sourceUrl": "https://imagetwist.com",
    "type": "script",
    "url": "https://imagetwist.com"
  },
  {
    "filters": [
      "||imagetwist.com^$script,first-party"
    ],
    "sourceUrl": "https://imagetwist.com",
    "type": "script",
    "url": "https://imagetwist.com"
  },
  {
    "filters": [
      "||imagetwist.com^$script,first-party"
    ],
    "sourceUrl": "https://imagetwist.com",
    "type": "script",
    "url": "https://imagetwist.com"
  },
  {
    "filters": [
      "||distiltag.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://dptr.distiltag.com"
  },
  {
    "filters": [
      "||analytics.shareaholic.com^"
    ],
    "sourceUrl": "http://",
    "type": "xhr",
    "url": "https://analytics.shareaholic.com"
  },
  {
    "filters": [
      "||salesmanago.pl^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "xhr",
    "url": "http://app2.salesmanago.pl"
  },
  {
    "filters": [
      "||shareaholic.com/partners.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://partner.shareaholic.com/partners.js"
  },
  {
    "filters": [
      "||zebestof.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://dpm.zebestof.com"
  },
  {
    "filters": [
      "||movad.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ad2.movad.net"
  },
  {
    "filters": [
      "@@||cnbc.com^*/showads.js$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.cnbc.com/staticContent/showads.js"
  },
  {
    "filters": [
      "||aso1.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://media.aso1.net"
  },
  {
    "filters": [
      "||imagetwist.com^$script,first-party"
    ],
    "sourceUrl": "https://imagetwist.com",
    "type": "script",
    "url": "https://imagetwist.com"
  },
  {
    "filters": [
      "||imagetwist.com^$script,first-party"
    ],
    "sourceUrl": "https://imagetwist.com",
    "type": "script",
    "url": "https://imagetwist.com"
  },
  {
    "filters": [
      "||imagetwist.com^$script,first-party"
    ],
    "sourceUrl": "https://imagetwist.com",
    "type": "script",
    "url": "https://imagetwist.com"
  },
  {
    "filters": [
      "||imagetwist.com^$script,first-party"
    ],
    "sourceUrl": "https://imagetwist.com",
    "type": "script",
    "url": "https://imagetwist.com"
  },
  {
    "filters": [
      "||imagetwist.com^$script,first-party"
    ],
    "sourceUrl": "https://imagetwist.com",
    "type": "script",
    "url": "https://imagetwist.com"
  },
  {
    "filters": [
      "/postview.gif?"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://portal.o2online.de/nws/img/postview.gif?"
  },
  {
    "filters": [
      "||imagetwist.com^$script,first-party"
    ],
    "sourceUrl": "https://imagetwist.com",
    "type": "script",
    "url": "https://imagetwist.com"
  },
  {
    "filters": [
      "||imagetwist.com^$script,first-party"
    ],
    "sourceUrl": "https://imagetwist.com",
    "type": "script",
    "url": "https://imagetwist.com"
  },
  {
    "filters": [
      "||imagetwist.com^$script,first-party"
    ],
    "sourceUrl": "https://imagetwist.com",
    "type": "script",
    "url": "https://imagetwist.com"
  },
  {
    "filters": [
      "||imagetwist.com^$script,first-party"
    ],
    "sourceUrl": "https://imagetwist.com",
    "type": "script",
    "url": "https://imagetwist.com"
  },
  {
    "filters": [
      "||imagetwist.com^$script,first-party"
    ],
    "sourceUrl": "https://imagetwist.com",
    "type": "script",
    "url": "https://imagetwist.com"
  },
  {
    "filters": [
      "||data.queryly.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://data.queryly.com"
  },
  {
    "filters": [
      "||imagetwist.com/?op="
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "https://imagetwist.com/?op=registration"
  },
  {
    "filters": [
      "||imagetwist.com^$script,first-party"
    ],
    "sourceUrl": "https://imagetwist.com",
    "type": "script",
    "url": "https://imagetwist.com"
  },
  {
    "filters": [
      "||imagetwist.com^$script,first-party"
    ],
    "sourceUrl": "https://imagetwist.com",
    "type": "script",
    "url": "https://imagetwist.com"
  },
  {
    "filters": [
      "||imagetwist.com^$script,first-party"
    ],
    "sourceUrl": "https://imagetwist.com",
    "type": "script",
    "url": "https://imagetwist.com"
  },
  {
    "filters": [
      "||imagetwist.com^$script,first-party"
    ],
    "sourceUrl": "https://imagetwist.com",
    "type": "script",
    "url": "https://imagetwist.com"
  },
  {
    "filters": [
      "||imagetwist.com^$script,first-party"
    ],
    "sourceUrl": "https://imagetwist.com",
    "type": "script",
    "url": "https://imagetwist.com"
  },
  {
    "filters": [
      "||pushnest.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://pushnest.com"
  },
  {
    "filters": [
      "/ads-pd."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ads-pd.nbcuni.com"
  },
  {
    "filters": [
      "||vrtzads.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://cookie.vrtzads.com"
  },
  {
    "filters": [
      "||ad.gt^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://idm.ad.gt"
  },
  {
    "filters": [
      "||imagetwist.com^$script,first-party"
    ],
    "sourceUrl": "https://imagetwist.com",
    "type": "script",
    "url": "https://imagetwist.com"
  },
  {
    "filters": [
      "||imagetwist.com^$script,first-party"
    ],
    "sourceUrl": "https://imagetwist.com",
    "type": "script",
    "url": "https://imagetwist.com"
  },
  {
    "filters": [
      "||imagetwist.com^$script,first-party"
    ],
    "sourceUrl": "https://imagetwist.com",
    "type": "script",
    "url": "https://imagetwist.com"
  },
  {
    "filters": [
      "||imagetwist.com^$script,first-party"
    ],
    "sourceUrl": "https://imagetwist.com",
    "type": "script",
    "url": "https://imagetwist.com"
  },
  {
    "filters": [
      "||imagetwist.com^$script,first-party"
    ],
    "sourceUrl": "https://imagetwist.com",
    "type": "script",
    "url": "https://imagetwist.com"
  },
  {
    "filters": [
      "||imagetwist.com/banner/"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://imagetwist.com/banner/"
  },
  {
    "filters": [
      "-468x60."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://imagetwist.com/banner/ImageTwist-468x60.png"
  },
  {
    "filters": [
      "-728x90_"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://imagetwist.com/banner/ImageTwist-728x90_2.gif"
  },
  {
    "filters": [
      "-728x90.",
      "728x90.gif|"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://imagetwist.com/banner/ImageTwist-728x90.gif"
  },
  {
    "filters": [
      "||onclickmega.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://onclickmega.com"
  },
  {
    "filters": [
      "@@||gemius.pl/gstream.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://gatr.hit.gemius.pl/gstream.js"
  },
  {
    "filters": [
      "||onclicksuper.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://onclicksuper.com"
  },
  {
    "check": true,
    "filters": [
      "/analytics/analytics.$third-party",
      "/analytics/analytics.$~xmlhttprequest"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://scripts.hepsiburada.net/assets/analytics/analytics.min.js"
  },
  {
    "filters": [
      "/ads.css"
    ],
    "sourceUrl": "https://",
    "type": "stylesheet",
    "url": "https://cdn2.admatic.com.tr/content/ads.css"
  },
  {
    "filters": [
      "||pixxur.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://pixxur.com"
  },
  {
    "filters": [
      "||adobetag.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.adobetag.com"
  },
  {
    "filters": [
      "/pageview.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://cdn.audiencedata.net/js/v1/pageview.js"
  },
  {
    "filters": [
      "||fitanalytics.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://integrations.fitanalytics.com"
  },
  {
    "filters": [
      "||skysports.com/commercial/"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://img.skysports.com/commercial/"
  },
  {
    "filters": [
      "/cedexis/*"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://productimages.hepsiburada.net/cedexis/"
  },
  {
    "filters": [
      "_adunit."
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://m.sporx.com/_banner/fill_adunit.php"
  },
  {
    "filters": [
      "||akamai.net/chartbeat."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://a248.e.akamai.net/chartbeat.download.akamai.com"
  },
  {
    "filters": [
      "||pp8.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://pb.sys.pp8.com"
  },
  {
    "filters": [
      "||ecustomeropinions.com^$third-party",
      "||ecustomeropinions.com^*/i.php?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ecustomeropinions.com/survey/i.php?"
  },
  {
    "filters": [
      "/monetization/pixel-"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.playbuzz.com/content/monetization/pixel-sdk"
  },
  {
    "filters": [
      "||ftjcfx.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.ftjcfx.com"
  },
  {
    "filters": [
      "||webvisor.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://report-2.appmetrica.webvisor.com"
  },
  {
    "filters": [
      "||ns-cdn.com^*/ns_vmtag.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://ps.ns-cdn.com/dsatserving2/scripts/ns_vmtag.js"
  },
  {
    "filters": [
      "|https://$script,xmlhttprequest,domain=imagefap.com"
    ],
    "sourceUrl": "https://www.imagefap.com",
    "type": "script",
    "url": "https://"
  },
  {
    "filters": [
      "||flix360.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://t.flix360.com"
  },
  {
    "filters": [
      "||toplist.cz^",
      "||toplist.cz^$third-party",
      "/dot.asp?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://toplist.cz/dot.asp?"
  },
  {
    "filters": [
      "||instreamvideo.ru^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://instreamvideo.ru"
  },
  {
    "filters": [
      "||las4srv.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://traffic.las4srv.com"
  },
  {
    "filters": [
      "||idntfy.ru^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://idntfy.ru"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "script",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||imagefap.com/combine.php?$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.imagefap.com/combine.php?"
  },
  {
    "filters": [
      "/ad_loader."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.imagefap.com/jscripts/ad_loader.js"
  },
  {
    "filters": [
      "@@||ads.exoclick.com^$script,domain=8muses.com|imagefap.com"
    ],
    "sourceUrl": "https://www.imagefap.com",
    "type": "script",
    "url": "https://ads.exoclick.com"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "check": true,
    "filters": [
      "@@||imagefap.com/img/logo.gif$xmlhttprequest"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://www.imagefap.com/img/logo.gif"
  },
  {
    "filters": [
      "||analytics.ooyala.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://analytics.ooyala.com"
  },
  {
    "filters": [
      "/pixel.cgi?"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://www.fqtag.com/pixel.cgi?"
  },
  {
    "filters": [
      "@@||yui.yahooapis.com^"
    ],
    "sourceUrl": "http://",
    "type": "stylesheet",
    "url": "http://yui.yahooapis.com"
  },
  {
    "filters": [
      "||l.ooyala.com^"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://l.ooyala.com"
  },
  {
    "filters": [
      "||ooyala.com/sas/analytics?"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://player.ooyala.com/sas/analytics?"
  },
  {
    "filters": [
      "@@||imagefap.com/jscripts/gallery.js$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.imagefap.com/jscripts/gallery.js"
  },
  {
    "filters": [
      "||r-ad.ne.jp^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://bk.r-ad.ne.jp"
  },
  {
    "filters": [
      "||stats.pandora.com^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://stats.pandora.com"
  },
  {
    "filters": [
      "||collective-media.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://a.collective-media.net"
  },
  {
    "filters": [
      "||speakol.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://crawler.speakol.com"
  },
  {
    "filters": [
      "||ads.servebom.com^",
      "@@||servebom.com/tmn*.js$script,domain=tomsguide.com|tomshardware.co.uk|tomshardware.com|wonderhowto.com"
    ],
    "sourceUrl": "https://www.tomshardware.com",
    "type": "script",
    "url": "https://ads.servebom.com/tmnhead.js"
  },
  {
    "filters": [
      "/misc/ad-"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://www.yifysubtitles.com/images/misc/ad-orbitron.jpg"
  },
  {
    "filters": [
      "||24smi.info^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://counter.24smi.info"
  },
  {
    "filters": [
      "||rat.rakuten.co.jp^$~xmlhttprequest",
      "||rat.rakuten.co.jp^$image"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://rat.rakuten.co.jp"
  },
  {
    "filters": [
      "/clickstream.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://assets.purch.com/loe/latest/clickstream.js"
  },
  {
    "filters": [
      "||chango.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://cc.chango.com"
  },
  {
    "filters": [
      "||pro-market.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://fei.pro-market.net"
  },
  {
    "filters": [
      "||perfdrive.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.perfdrive.com"
  },
  {
    "filters": [
      "/track/event/*"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://api.sail-track.com/v1/track/event/"
  },
  {
    "filters": [
      "||ramp.purch.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ramp.purch.com"
  },
  {
    "filters": [
      "||viralcpm.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.viralcpm.com"
  },
  {
    "filters": [
      "||turbobit.net/platform/js/lib/pus/"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://m.turbobit.net/platform/js/lib/pus/"
  },
  {
    "filters": [
      "/common/ads/*",
      "/ads/www/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.memurlar.net/common/ads/www/"
  },
  {
    "filters": [
      "||sessions.exchange^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://get.sessions.exchange"
  },
  {
    "filters": [
      "||nhk.or.jp^*/bc.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www3.nhk.or.jp/news/parts16/js/bc.js"
  },
  {
    "filters": [
      "||deqwas.net^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://kimgcs.deqwas.net"
  },
  {
    "filters": [
      "||analytics-egain.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://analytics.analytics-egain.com"
  },
  {
    "filters": [
      "/app/tracking/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://a.jimdo.com/app/tracking/"
  },
  {
    "filters": [
      "||bunchbox.co^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.bunchbox.co"
  },
  {
    "filters": [
      "||bitmedianetwork.com^"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.bitmedianetwork.com"
  },
  {
    "filters": [
      "||flirt4free.com^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "https://www.flirt4free.com"
  },
  {
    "filters": [
      "||redtram.com^$script,third-party",
      "||redtram.com^$third-party,script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://js-ru.redtram.com"
  },
  {
    "filters": [
      "||vs4.com/impr.php?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.vs4.com/impr.php?"
  },
  {
    "filters": [
      "||neobux.com^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.neobux.com"
  },
  {
    "filters": [
      "||dw.com/tracking/",
      "/tracking/xtcore."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://commons.dw.com/tracking/xtcore.js"
  },
  {
    "filters": [
      "@@||analytics.edgekey.net/html5/akamaihtml5-min.js$domain=nhk.or.jp"
    ],
    "sourceUrl": "https://www3.nhk.or.jp",
    "type": "script",
    "url": "https://79423.analytics.edgekey.net/html5/akamaihtml5-min.js"
  },
  {
    "filters": [
      "@@/wp-content/plugins/google-analytics-premium/*$script,stylesheet,first-party"
    ],
    "sourceUrl": "https://www.cengage.co.uk",
    "type": "script",
    "url": "https://www.cengage.co.uk/wp-content/plugins/google-analytics-premium/"
  },
  {
    "filters": [
      "||banners.videosecrets.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://banners.videosecrets.com"
  },
  {
    "filters": [
      "/advelvet-"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://advelvet-liftablemedia.global.ssl.fastly.net"
  },
  {
    "filters": [
      "||trbna.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://trbna.com"
  },
  {
    "filters": [
      "/om.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://lgr.visilabs.net/n11com/om.gif?"
  },
  {
    "filters": [
      "/counter.aspx?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://log.news.zing.vn/Counter.aspx?"
  },
  {
    "check": true,
    "filters": [
      "728x90.htm|"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://www.cnbeta.com/assets/adx728x90.htm"
  },
  {
    "filters": [
      "/uutils.fcg?"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://s89.ucoz.net/cgi/uutils.fcg?"
  },
  {
    "check": true,
    "filters": [
      "/adlogger_"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://static.googles.com/adserver/adlogger_tracker.php"
  },
  {
    "filters": [
      "@@/wp-content/plugins/google-analytics-premium/*$script,stylesheet,first-party"
    ],
    "sourceUrl": "http://www.dailypost.ng",
    "type": "script",
    "url": "http://cdn1.dailypost.ng/wp-content/plugins/google-analytics-premium/"
  },
  {
    "filters": [
      "||ancestrycdn.com/tao/at/"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.ancestrycdn.com/tao/at/"
  },
  {
    "filters": [
      "||click.aliexpress.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "https://s.click.aliexpress.com"
  },
  {
    "filters": [
      "||cdn.auth0.com/*/analytics.min.js$script,redirect=noopjs,domain=tomsguide.com"
    ],
    "sourceUrl": "https://www.tomsguide.com",
    "type": "script",
    "url": "https://cdn.auth0.com/js/analytics/1.2.1/analytics.min.js"
  },
  {
    "filters": [
      "||stack-sonar.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.stack-sonar.com"
  },
  {
    "filters": [
      "&action=js_stats&"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.porntrex.com/?mode=async&action=js_stats&rand=1540303174735"
  },
  {
    "filters": [
      "||teefpagayhb.com^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.teefpagayhb.com"
  },
  {
    "filters": [
      "@@||google-analytics.com/analytics.js$domain=afternic.com|allmusic.com|amctv.com|bebo.com|bennysva.com|blastingnews.com|ch10.co.il|cliphunter.com|daemon-tools.cc|desigual.com|easyjet.com|firehousesubs.com|gamepix.com|greentoe.com|housing.wisc.edu|infogr.am|jackbox.tv|jobs.net|keygames.com|manowthaimordialloc.com.au|maxiclimber.com|orbitum.com|pluto.tv|pure.com|rebtel.com|sbnation.com|sci2.tv|seatgeek.com|stitcher.com|support.amd.com|tagheuer.com.au|tv10play.se|tv3play.se|tv6play.se|tv8play.se|video.pbs.org|vox.com|vpnster.com|weather.gov|westernunion.at|westernunion.be|westernunion.ca|westernunion.ch|westernunion.cl|westernunion.co.jp|westernunion.co.nz|westernunion.co.uk|westernunion.co.za|westernunion.com|westernunion.com.au|westernunion.com.co|westernunion.com.hk|westernunion.com.my|westernunion.com.pe|westernunion.de|westernunion.fr|westernunion.ie|westernunion.it|westernunion.nl|westernunion.ph|westernunion.pl|westernunion.se|westernunion.sg|www.google.com"
    ],
    "sourceUrl": "https://us.blastingnews.com",
    "type": "script",
    "url": "https://www.google-analytics.com/analytics.js"
  },
  {
    "filters": [
      "||rapidvideo.com^$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.rapidvideo.com"
  },
  {
    "filters": [
      "@@||rapidvideo.com/js/jquery.validate.min.js$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.rapidvideo.com/js/jquery.validate.min.js"
  },
  {
    "filters": [
      "@@||rapidvideo.com/js/jquery-ui.min.js$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.rapidvideo.com/js/jquery-ui.min.js"
  },
  {
    "filters": [
      "@@||rapidvideo.com/js/jquery.limit-1.2.source.js$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.rapidvideo.com/js/jquery.limit-1.2.source.js"
  },
  {
    "filters": [
      "@@||rapidvideo.com/js/jquery.tipsy.js$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.rapidvideo.com/js/jquery.tipsy.js"
  },
  {
    "filters": [
      "@@||rapidvideo.com/js/new.js$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.rapidvideo.com/js/new.js"
  },
  {
    "filters": [
      "/adman.$domain=~adman.ee|~adman.studio",
      "||adman.gr^$third-party",
      "||adman.gr^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://static.adman.gr/adman.js"
  },
  {
    "filters": [
      "||onscroll.com^$third-party",
      "||onscroll.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://dfp-gateway.us.onscroll.com"
  },
  {
    "filters": [
      ".adpartner.$domain=~adpartner.cz"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://a4p.adpartner.pro"
  },
  {
    "filters": [
      "-content-ad."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://a4p.adpartner.pro/vunit/media/adpartner-content-ad.min.js"
  },
  {
    "filters": [
      "@@||s.reembed.com^$script"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://s.reembed.com"
  },
  {
    "filters": [
      "/cross-domain-cookie?"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://www.ancestry.com/lp/cross-domain-cookie?"
  },
  {
    "filters": [
      "/library/svy/*/broker.js",
      "||microsoft.com/library/svy/"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.microsoft.com/library/svy/xbox/broker.js"
  },
  {
    "filters": [
      "@@/wp-content/plugins/google-analytics-premium/*$script,stylesheet,first-party"
    ],
    "sourceUrl": "http://dailypost.ng",
    "type": "script",
    "url": "http://cdn1.dailypost.ng/wp-content/plugins/google-analytics-premium/"
  },
  {
    "filters": [
      "||intelliad.de^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://t23.intelliad.de"
  },
  {
    "filters": [
      "/ad-plugin/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://player.ooyala.com/static/v4/stable/4.24.11/ad-plugin/"
  },
  {
    "filters": [
      "/analytics-plugin/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://player.ooyala.com/static/v4/stable/4.24.11/analytics-plugin/"
  },
  {
    "filters": [
      "@@/wp-content/plugins/google-analytics-premium/*$script,stylesheet,first-party"
    ],
    "sourceUrl": "http://dailypost.ng",
    "type": "script",
    "url": "http://cdn1.dailypost.ng/wp-content/plugins/google-analytics-premium/"
  },
  {
    "filters": [
      "/assets/ad/*",
      "@@||xbox.com/assets/ad/$image,first-party"
    ],
    "sourceUrl": "https://www.xbox.com",
    "type": "image",
    "url": "https://compass-ssl.xbox.com/assets/ad/"
  },
  {
    "filters": [
      "@@||xbox.com/assets/ad/$image,first-party"
    ],
    "sourceUrl": "https://www.xbox.com",
    "type": "image",
    "url": "https://compass-ssl.xbox.com/assets/ad/"
  },
  {
    "filters": [
      "@@||xbox.com/assets/ad/$image,first-party"
    ],
    "sourceUrl": "https://www.xbox.com",
    "type": "image",
    "url": "https://compass-ssl.xbox.com/assets/ad/"
  },
  {
    "filters": [
      "||affiliates.rozetka.com.ua^"
    ],
    "sourceUrl": "https://m.rozetka.com.ua",
    "type": "script",
    "url": "https://affiliates.rozetka.com.ua"
  },
  {
    "filters": [
      "||log.snapdeal.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://log.snapdeal.com"
  },
  {
    "filters": [
      "@@/wp-content/plugins/google-analytics-premium/*$script,stylesheet,first-party"
    ],
    "sourceUrl": "http://dailypost.ng",
    "type": "script",
    "url": "http://cdn1.dailypost.ng/wp-content/plugins/google-analytics-premium/"
  },
  {
    "filters": [
      "||eboundservices.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://publisher.eboundservices.com"
  },
  {
    "filters": [
      "||caltat.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://cdn3.caltat.com"
  },
  {
    "filters": [
      "/pixel/img/*",
      "||pixel.sojern.com^",
      "||sojern.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://pixel.sojern.com/pixel/img/"
  },
  {
    "filters": [
      "/ad/view/*"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://ie-g2.gumgum.com/ad/view/"
  },
  {
    "filters": [
      "@@/wp-content/plugins/google-analytics-premium/*$script,stylesheet,first-party"
    ],
    "sourceUrl": "http://dailypost.ng",
    "type": "script",
    "url": "http://cdn1.dailypost.ng/wp-content/plugins/google-analytics-premium/"
  },
  {
    "filters": [
      "||jivox.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://pxl.jivox.com"
  },
  {
    "filters": [
      "/gatag.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.ca.gov/js/gatag.js"
  },
  {
    "filters": [
      "||appspot.com/collect"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://core-analytics-dot-liftable-bq-streamer.appspot.com/collect"
  },
  {
    "filters": [
      "@@/wp-content/plugins/google-analytics-premium/*$script,stylesheet,first-party"
    ],
    "sourceUrl": "http://dailypost.ng",
    "type": "script",
    "url": "http://cdn1.dailypost.ng/wp-content/plugins/google-analytics-premium/"
  },
  {
    "filters": [
      "/heatmap.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.timeanddate.com/common/heatmap.js"
  },
  {
    "filters": [
      ".ads3-",
      "||ads3-adnow.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://st-n.ads3-adnow.com"
  },
  {
    "filters": [
      "||hurra.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ssl.hurra.com"
  },
  {
    "filters": [
      "||connatix.com^",
      "||connatix.com/min/connatix.renderer.infeed.min.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.connatix.com/min/connatix.renderer.infeed.min.js"
  },
  {
    "filters": [
      "/advertiser.$domain=~advertiser.adverbid.com|~advertiser.autorepairconnect.com|~advertiser.growmobile.com|~linkpizza.com|~panel.rightflow.com|~trialpay.com|~unity3d.com"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://content.hybrid.ai/astraone/advertiser.png"
  },
  {
    "filters": [
      "/advertisments/*"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://www.ca.gov/-/media/Global-Files/Advertisments/"
  },
  {
    "filters": [
      "/hads-"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://scontent.xx.fbcdn.net/hads-ak-prn2"
  },
  {
    "filters": [
      "||sddan.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://js.sddan.com"
  },
  {
    "filters": [
      "/revboostprocdnadsprod."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://revboostprocdnadsprod.azureedge.net"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "script",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "check": true,
    "filters": [
      "/aff_ad?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://trk.topfxpro.com/aff_ad?"
  },
  {
    "filters": [
      "||go2speed.org^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://media.go2speed.org"
  },
  {
    "filters": [
      "||tmgr.ccmbg.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tmgr.ccmbg.com"
  },
  {
    "filters": [
      "/clicklognew."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://secure.dhgate.com/track/clicklognew.jsp"
  },
  {
    "filters": [
      "||tharbadir.com^",
      "||tharbadir.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tharbadir.com"
  },
  {
    "filters": [
      "||google.com^*/log?"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://play.google.com/play/log?"
  },
  {
    "filters": [
      "/afr?auid="
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://uk-ads.openx.net/w/1.0/afr?auid=392783&cb=INSERT_RANDOM_NUMBER_HERE"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://play.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "||verifier.live^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://verifier.live"
  },
  {
    "filters": [
      "|http*://$image,third-party,xmlhttprequest,domain=123movies-proxy.ru|123movies.cz|123movies.gs|123movies.is|123movies.live|123movies.net|123movies.net.ru|123movies.ru|123movies.vc|123moviesfree.com|123movieshd.net|123movieshd.tv|9cartoon.me|animehaven.to|auroravid.to|ay8ou8ohth.com|bitvid.sx|btdb.in|btdb.to|clipconverter.cc|cloudtime.to|cmovieshd.com|divxme.com|downloadming.tv|dropapk.com|flyordie.com|full-pcsoftware.com|halacima.net|hdmusic99.in|hdtv-rls.com|kannadamovies.biz|kissanime.ru|kissmanga.com|livetvcafe.net|movdivx.com|mp3clan.one|nowvideo.li|nowvideo.sx|nowvideo.to|ocean0fgames.com|oogh8ot0el.com|otakustream.tv|otorrents.com|putlocker.co|rgmechanicsgames.com|solarmovie.sc|speedvid.net|stream2watch.org|suprafiles.co|thepiratebay.cd|vidto.me|vidtudu.com|wholecloud.net"
    ],
    "sourceUrl": "https://www.clipconverter.cc",
    "type": "image",
    "url": "https://"
  },
  {
    "filters": [
      "||static.criteo.net/flash^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://static.criteo.net/flash"
  },
  {
    "filters": [
      "@@/wp-content/plugins/google-analytics-for-wordpress/*$script,stylesheet,first-party"
    ],
    "sourceUrl": "https://transmitter.ieee.org",
    "type": "script",
    "url": "https://transmitter.ieee.org/wp-content/plugins/google-analytics-for-wordpress/"
  },
  {
    "filters": [
      "||fraudmetrix.cn^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static.fraudmetrix.cn"
  },
  {
    "filters": [
      "/federated-analytics."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.homelandsecurity.noaa.gov/main/federated-analytics.js"
  },
  {
    "filters": [
      "||tags.news.com.au^$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tags.news.com.au"
  },
  {
    "filters": [
      "/pixel.*/track/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://i1.wp.com/pixel.tcog.cp1.news.com.au/track/"
  },
  {
    "filters": [
      "/track/component/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://i1.wp.com/pixel.tcog.cp1.news.com.au/track/component/"
  },
  {
    "filters": [
      ".adnigma."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s3.amazonaws.com/www.adnigma.com"
  },
  {
    "filters": [
      "/WebAnalytics."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://webanalytics.library.cornell.edu"
  },
  {
    "filters": [
      "/utrack.js?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tags.news.com.au/prod/utrack/utrack.js?"
  },
  {
    "check": true,
    "filters": [
      "||tcog.news.com.au^$other"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://a.tcog.news.com.au"
  },
  {
    "filters": [
      "/nielsen.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tags.news.com.au/prod/nielsen/nielsen.js"
  },
  {
    "filters": [
      "@@||tags.news.com.au/prod/metrics/metrics.js$script,first-party"
    ],
    "sourceUrl": "https://www.news.com.au",
    "type": "script",
    "url": "https://tags.news.com.au/prod/metrics/metrics.js"
  },
  {
    "filters": [
      "||tcog.news.com.au^$~xmlhttprequest"
    ],
    "sourceUrl": "https://",
    "type": "fetch",
    "url": "https://a.tcog.news.com.au"
  },
  {
    "filters": [
      "||t.purch.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://t.purch.com"
  },
  {
    "check": true,
    "filters": [
      "/googleanalytics.js$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s.po.st/static/v4/js/plugins/googleAnalytics.js"
  },
  {
    "filters": [
      "||adskom.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ssp.adskom.com"
  },
  {
    "filters": [
      "/ard.png?"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://www.bhphotovideo.com/__ssobj/ard.png?"
  },
  {
    "filters": [
      "||a8.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://statics.a8.net"
  },
  {
    "filters": [
      "@@||tags.news.com.au/prod/metrics/metrics.js$script,first-party"
    ],
    "sourceUrl": "https://www.news.com.au",
    "type": "script",
    "url": "https://tags.news.com.au/prod/metrics/metrics.js"
  },
  {
    "check": true,
    "filters": [
      "||analytics.foresee.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://analytics.foresee.com"
  },
  {
    "filters": [
      "/advertorials/*"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://idora.milliyet.com.tr/Mobil/Advertorials/"
  },
  {
    "filters": [
      "/gifbanner?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ad.jp.ap.valuecommerce.com/servlet/gifbanner?"
  },
  {
    "filters": [
      "||imonomy.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://srv.imonomy.com"
  },
  {
    "filters": [
      "||rockyou.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://tas-sync.rockyou.net"
  },
  {
    "filters": [
      "||admanmedia.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://mona.admanmedia.com"
  },
  {
    "filters": [
      "||analitits.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.analitits.com"
  },
  {
    "filters": [
      "/trackingVtm."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static.abc.es/nibara/2.0.15/trackingVtm.js"
  },
  {
    "filters": [
      "||static.vocento.com/dab/*.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static.vocento.com/dab/latest/strategy.js"
  },
  {
    "filters": [
      "/openx_"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://stadvtools.akamaized.net/openx/gazzetta/openx_async.js"
  },
  {
    "filters": [
      "/TrackingService.js",
      "/trackingService/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://stadvtools.akamaized.net/trackingservice/gazzetta/TrackingService.js"
  },
  {
    "filters": [
      "/event/v3?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://analitits.com/t/event/v3?"
  },
  {
    "filters": [
      "/adsence."
    ],
    "sourceUrl": "https://",
    "type": "stylesheet",
    "url": "https://cdn.yjc.ir/media/css/adsence.css"
  },
  {
    "filters": [
      "||aps.hearstnp.com^",
      "/loadads."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://aps.hearstnp.com/Scripts/loadAds.js"
  },
  {
    "filters": [
      "||abc.es/pixel/"
    ],
    "sourceUrl": "https://www.abc.es",
    "type": "script",
    "url": "https://rrss.abc.es/pixel/"
  },
  {
    "filters": [
      "||porn300.com^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.porn300.com"
  },
  {
    "filters": [
      "||trfpump.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://t.trfpump.com"
  },
  {
    "filters": [
      "/spixel.",
      "/pixel/js/*$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://spixel.socy.es/pixel/js/"
  },
  {
    "filters": [
      "/pixel.json?"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://rrss.abc.es/pixel.json?"
  },
  {
    "filters": [
      "||kiosked.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://scripts.kiosked.com"
  },
  {
    "filters": [
      "/runtimejs/intercept/*",
      "/intercept.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://d2bnxibecyz4h5.cloudfront.net/runtimejs/intercept/intercept.js"
  },
  {
    "filters": [
      "||mm-syringe.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://bucket1.mm-syringe.com"
  },
  {
    "filters": [
      "/beaconconfigs/*"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://surveygizmobeacon.s3.amazonaws.com/beaconconfigs/"
  },
  {
    "filters": [
      "/adview.$domain=~adview.mu|~adview.online"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ads.escinteractive.com/adview.php"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "script",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "/iframe-tracker.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://rs.maxiporn.com/js/iframe-tracker.js"
  },
  {
    "filters": [
      "||pixel.yabidos.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://pixel.yabidos.com"
  },
  {
    "filters": [
      "||ad-delivery.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ad-delivery.net"
  },
  {
    "filters": [
      "||metrics-api.librato.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://metrics-api.librato.com"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "||elr.sfr.fr^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://elr.sfr.fr"
  },
  {
    "filters": [
      "||ew3.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ew3.io"
  },
  {
    "filters": [
      "||track.tcppu.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://track.tcppu.com"
  },
  {
    "filters": [
      "||in.com/common/script_catch.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s.in.com/common/script_catch.js"
  },
  {
    "filters": [
      "@@||tags.news.com.au/prod/metrics/metrics.js$script,first-party"
    ],
    "sourceUrl": "https://www.news.com.au",
    "type": "script",
    "url": "https://tags.news.com.au/prod/metrics/metrics.js"
  },
  {
    "filters": [
      "||fortpush.com^",
      "||fortpush.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://fortpush.com"
  },
  {
    "filters": [
      "||botman.ninja^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://js.assets.botman.ninja"
  },
  {
    "filters": [
      "||posst.co^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://inapi.posst.co"
  },
  {
    "filters": [
      "/PageTracker."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.verizon.com/resources/verizonglobalhome/scripts/pagetracker.js"
  },
  {
    "filters": [
      "/vzTracker/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.verizon.com/vzTracker/"
  },
  {
    "filters": [
      "||cpaevent.ru^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://cl.cpaevent.ru"
  },
  {
    "filters": [
      "||fotostrana.ru/start/"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://m.fotostrana.ru/start/"
  },
  {
    "filters": [
      "||bbelements.com^$third-party",
      "||bbelements.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://bbcdn.go.idnes.bbelements.com"
  },
  {
    "filters": [
      "/trackad."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://trackad.cz"
  },
  {
    "filters": [
      "||keyword.daumdn.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://cts.keyword.daumdn.com"
  },
  {
    "filters": [
      "||conductrics.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn-v3.conductrics.com"
  },
  {
    "filters": [
      "||tracking.olx-st.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://tracking.olx-st.com"
  },
  {
    "filters": [
      "||ebz.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://as.ebz.io"
  },
  {
    "filters": [
      "/acecounter/*",
      "/acecounter_"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://dimg.donga.com/acecounter/acecounter_V70.20130719.js"
  },
  {
    "filters": [
      "@@||last.fm^$script,first-party",
      "@@||last.fm^$first-party,script"
    ],
    "sourceUrl": "https://www.last.fm",
    "type": "script",
    "url": "https://www.last.fm"
  },
  {
    "filters": [
      "||sofascore.com/geoip.js"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://www.sofascore.com/geoip.js"
  },
  {
    "filters": [
      "||adocean.pl^$third-party",
      "||adocean.pl^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://trgde.adocean.pl"
  },
  {
    "filters": [
      "||siteimproveanalytics.com^",
      "||siteimproveanalytics.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://siteimproveanalytics.com"
  },
  {
    "filters": [
      "@@||imrworldwide.com/v60.js$domain=last.fm|musicfeeds.com.au|nzherald.co.nz|realestateview.com.au|sf.se|threenow.co.nz|weatherchannel.com.au"
    ],
    "sourceUrl": "https://www.last.fm",
    "type": "script",
    "url": "https://secure-us.imrworldwide.com/v60.js"
  },
  {
    "filters": [
      "/adtags/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://js.searchlinks.com/adtags/"
  },
  {
    "filters": [
      "/frontend_loader.js$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.analdin.com/nb/frontend_loader.js"
  },
  {
    "filters": [
      "||dreamsearch.or.kr^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://www.dreamsearch.or.kr"
  },
  {
    "filters": [
      "/adnetwork/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://media.innity.net/adnetwork/"
  },
  {
    "filters": [
      "||cad.donga.com^"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://cad.donga.com"
  },
  {
    "filters": [
      "@@||tags.news.com.au/prod/metrics/metrics.js$script,first-party"
    ],
    "sourceUrl": "https://www.news.com.au",
    "type": "script",
    "url": "https://tags.news.com.au/prod/metrics/metrics.js"
  },
  {
    "filters": [
      "||o333o.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://a.o333o.com"
  },
  {
    "filters": [
      "||imagebam.com^$script",
      "@@||imagebam.com/JS/imagebam.js$script"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.imagebam.com/JS/imagebam.js"
  },
  {
    "filters": [
      "@@||imagebam.com/JS/jquery.1.5.js$script"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.imagebam.com/JS/jquery.1.5.js"
  },
  {
    "filters": [
      "@@||imagebam.com^*ad$first-party,script",
      "@@||imagebam.com/JS/plupload.full.min.new.js$script"
    ],
    "sourceUrl": "http://www.imagebam.com",
    "type": "script",
    "url": "http://www.imagebam.com/JS/plupload.full.min.new.js"
  },
  {
    "filters": [
      "@@||imagebam.com/JS/pupload_anon.js$script"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.imagebam.com/JS/pupload_anon.js"
  },
  {
    "filters": [
      "||www.imagebam.com^$image",
      "@@||imagebam.com/img/icons/star.png$image"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://www.imagebam.com/img/icons/star.png"
  },
  {
    "filters": [
      "@@||imagebam.com/img/ib_badge.gif$image"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://www.imagebam.com/img/ib_badge.gif"
  },
  {
    "filters": [
      "@@||imagebam.com/img/icons/page_white_get.png$image"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://www.imagebam.com/img/icons/page_white_get.png"
  },
  {
    "filters": [
      "@@||imagebam.com/img/help.png$image"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://www.imagebam.com/img/help.png"
  },
  {
    "filters": [
      "@@||imagebam.com/img/tux.png$image"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://www.imagebam.com/img/tux.png"
  },
  {
    "filters": [
      "||bnr.alza.cz^",
      "/extBnr.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://bnr.alza.cz/extBnr.gif?"
  },
  {
    "filters": [
      "@@||imagebam.com/img/input_bg.png$image"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://www.imagebam.com/img/input_bg.png"
  },
  {
    "filters": [
      "@@||imagebam.com/img/clicktostart.png$image"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://www.imagebam.com/img/clicktostart.png"
  },
  {
    "filters": [
      "@@||imagebam.com/img/icons/lightbulb.png$image"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://www.imagebam.com/img/icons/lightbulb.png"
  },
  {
    "filters": [
      "@@||imagebam.com/img/tab-line.gif$image"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://www.imagebam.com/img/tab-line.gif"
  },
  {
    "filters": [
      "@@||imagebam.com/img/tab-back.png$image"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://www.imagebam.com/img/tab-back.png"
  },
  {
    "filters": [
      "@@||imagebam.com/img/imagebam.png$image"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://www.imagebam.com/img/imagebam.png"
  },
  {
    "filters": [
      "_ads.html"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://1gr.cz/prilohy/reklama/idn-wsq_ads.html"
  },
  {
    "filters": [
      "@@||imagebam.com/JS/pt.js$script"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.imagebam.com/JS/pt.js"
  },
  {
    "filters": [
      "/assets/tracking-"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://assets0.desk.com/assets/tracking-1b7234dfdb53a1f5d1f8c427e6b594f3.js"
  },
  {
    "filters": [
      "@@||tags.news.com.au/prod/metrics/metrics.js$script,first-party"
    ],
    "sourceUrl": "https://www.news.com.au",
    "type": "script",
    "url": "https://tags.news.com.au/prod/metrics/metrics.js"
  },
  {
    "filters": [
      "/openx.$domain=~openx.tv"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://openx.elmogaz.com"
  },
  {
    "filters": [
      "||dynatrace.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://js-cdn.dynatrace.com"
  },
  {
    "filters": [
      "||p.ctpost.com/article?i="
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://p.ctpost.com/article?i=13327444&s=chron&ts=1540303243252"
  },
  {
    "filters": [
      "/ads7."
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://ads7.hsoub.com"
  },
  {
    "filters": [
      "/adsjs/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.theatlantic.com/packages/adsjs/"
  },
  {
    "filters": [
      "||adspsp.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://prod.adspsp.com"
  },
  {
    "filters": [
      "||ibm.com/common/stats/"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.ibm.com/common/stats/"
  },
  {
    "filters": [
      "/assets/ads/*"
    ],
    "sourceUrl": "http://",
    "type": "xhr",
    "url": "http://www.epochtimes.com/assets/ads/"
  },
  {
    "filters": [
      "||coremetrics.com^",
      "||coremetrics.com^$third-party",
      "@@||coremetrics.com*/eluminate.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://libs.coremetrics.com/eluminate.js"
  },
  {
    "filters": [
      "/ads.compat."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.theatlantic.com/packages/adsjs/ads.compat.min.js"
  },
  {
    "filters": [
      "@@||facdn.net/art/$image,domain=furaffinity.net"
    ],
    "sourceUrl": "http://www.furaffinity.net",
    "type": "image",
    "url": "http://d.facdn.net/art/"
  },
  {
    "check": true,
    "filters": [
      "||survey.g.doubleclick.net^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://survey.g.doubleclick.net"
  },
  {
    "filters": [
      "-auto-ads-"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://amp.cloudflare.com/rtv/011530043289240/v0/amp-auto-ads-0.1.js"
  },
  {
    "filters": [
      "-adv.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.cda.pl/rek1-adv.js"
  },
  {
    "filters": [
      "/ads3."
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://ads3.hsoub.com"
  },
  {
    "filters": [
      "/analytics/video_$domain=~twitch.tv"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://www.vilynx.com/api2.0/analytics/video_hit"
  },
  {
    "filters": [
      "||zoyxbjmmlsrc.com^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.zoyxbjmmlsrc.com"
  },
  {
    "filters": [
      "||clickonometrics.pl^",
      "||clickonometrics.pl^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://sync.clickonometrics.pl"
  },
  {
    "filters": [
      "/ads/banner-",
      "/banner-ad."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn1ht.traffichaus.com/ads/banner-ad.js"
  },
  {
    "filters": [
      "_top_ad."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://cad.donga.com/M/view_top_ad.js"
  },
  {
    "filters": [
      "||adinc.kr^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://ad.adinc.kr"
  },
  {
    "filters": [
      "_ad1.$~stylesheet"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://cad.donga.com/M/view_ad1.js"
  },
  {
    "filters": [
      "_ad6.$domain=~facebook.com|~messenger.com"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://cad.donga.com/M/view_ad6.js"
  },
  {
    "filters": [
      "_ad9."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://cad.donga.com/M/view_ad9.js"
  },
  {
    "filters": [
      "||soska.us^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://soska.us"
  },
  {
    "filters": [
      "|https://$script,xmlhttprequest,domain=eztv.ag|eztv.tf|eztv.yt",
      "@@||ajax.googleapis.com^$script,domain=eztv.ag|eztv.tf|eztv.yt"
    ],
    "sourceUrl": "https://eztv.ag",
    "type": "script",
    "url": "https://ajax.googleapis.com"
  },
  {
    "filters": [
      "@@||cdnjs.cloudflare.com^$script,domain=eztv.ag|eztv.tf|eztv.yt"
    ],
    "sourceUrl": "https://eztv.ag",
    "type": "script",
    "url": "https://cdnjs.cloudflare.com"
  },
  {
    "filters": [
      "@@||eztv.ag/js/search_shows*.js$script,domain=eztv.ag|eztv.tf|eztv.yt"
    ],
    "sourceUrl": "https://eztv.ag",
    "type": "script",
    "url": "https://eztv.ag/js/search_shows1.js"
  },
  {
    "filters": [
      "@@||tags.news.com.au/prod/metrics/metrics.js$script,first-party"
    ],
    "sourceUrl": "https://www.news.com.au",
    "type": "script",
    "url": "https://tags.news.com.au/prod/metrics/metrics.js"
  },
  {
    "filters": [
      "/ads/article."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.epochtimes.com/assets/themes/m-djy/js/ads/article.min.js"
  },
  {
    "filters": [
      "||bf-ad.net^$domain=focus.de",
      "@@||bf-ad.net/pubjs/focus/adengine.js$domain=focus.de"
    ],
    "sourceUrl": "https://m.focus.de",
    "type": "script",
    "url": "https://a.bf-ad.net/pubjs/focus/adengine.js"
  },
  {
    "filters": [
      "||lp4.io^$domain=focus.de"
    ],
    "sourceUrl": "https://m.focus.de",
    "type": "script",
    "url": "https://pp.lp4.io"
  },
  {
    "filters": [
      "||googletagmanager.com^$domain=focus.de"
    ],
    "sourceUrl": "https://m.focus.de",
    "type": "script",
    "url": "https://www.googletagmanager.com"
  },
  {
    "filters": [
      "||ioam.de/tx.io?$domain=focus.de"
    ],
    "sourceUrl": "https://m.focus.de",
    "type": "script",
    "url": "https://de.ioam.de/tx.io?"
  },
  {
    "filters": [
      "||googlesyndication.com^$domain=focus.de"
    ],
    "sourceUrl": "https://m.focus.de",
    "type": "image",
    "url": "https://tpc.googlesyndication.com"
  },
  {
    "filters": [
      "||medrx.telstra.com.au^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://medrx.telstra.com.au"
  },
  {
    "filters": [
      "||go2affise.com^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.go2affise.com"
  },
  {
    "filters": [
      "||ednplus.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://adex.ednplus.com"
  },
  {
    "filters": [
      "||ad4989.co.kr^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://adgrp1.ad4989.co.kr"
  },
  {
    "filters": [
      "/xtclicks."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.meteofrance.com/mf3-base-theme/js/xiti/xtclicks.js"
  },
  {
    "filters": [
      "||conative.de^$domain=focus.de"
    ],
    "sourceUrl": "https://m.focus.de",
    "type": "script",
    "url": "https://cdn.conative.de"
  },
  {
    "filters": [
      "||xplosion.de^$domain=focus.de"
    ],
    "sourceUrl": "https://m.focus.de",
    "type": "script",
    "url": "https://ups.xplosion.de"
  },
  {
    "check": true,
    "filters": [
      "||bidder.criteo.com^$domain=focus.de"
    ],
    "sourceUrl": "https://m.focus.de",
    "type": "xhr",
    "url": "https://bidder.criteo.com"
  },
  {
    "filters": [
      "||nativendo.de^$domain=focus.de"
    ],
    "sourceUrl": "https://m.focus.de",
    "type": "xhr",
    "url": "https://d.nativendo.de"
  },
  {
    "filters": [
      "||3lift.com^$domain=focus.de"
    ],
    "sourceUrl": "https://m.focus.de",
    "type": "xhr",
    "url": "https://tlx.3lift.com"
  },
  {
    "filters": [
      "||yieldlab.net^$domain=autobild.de|focus.de|transfermarkt.de"
    ],
    "sourceUrl": "https://m.focus.de",
    "type": "xhr",
    "url": "https://ad.yieldlab.net"
  },
  {
    "check": true,
    "filters": [
      "||adnxs.com^$domain=autobild.de|focus.de|transfermarkt.de|widgets.outbrain.com"
    ],
    "sourceUrl": "https://m.focus.de",
    "type": "xhr",
    "url": "https://ib.adnxs.com"
  },
  {
    "check": true,
    "filters": [
      "||g.doubleclick.net^$domain=focus.de|imasdk.googleapis.com|transfermarkt.de"
    ],
    "sourceUrl": "https://m.focus.de",
    "type": "image",
    "url": "https://stats.g.doubleclick.net"
  },
  {
    "filters": [
      "||ad.about.co.kr^"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://ad.about.co.kr"
  },
  {
    "filters": [
      "||png2imag.club^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.png2imag.club"
  },
  {
    "filters": [
      "@@||g.doubleclick.net/gpt/pubads_impl_$script,domain=focus.de"
    ],
    "sourceUrl": "https://m.focus.de",
    "type": "script",
    "url": "https://securepubads.g.doubleclick.net/gpt/pubads_impl_266.js"
  },
  {
    "filters": [
      "||emetriq.de^$domain=focus.de"
    ],
    "sourceUrl": "https://m.focus.de",
    "type": "script",
    "url": "https://cdn.emetriq.de"
  },
  {
    "filters": [
      "||adition.com^$domain=focus.de|g.doubleclick.net|transfermarkt.de"
    ],
    "sourceUrl": "https://m.focus.de",
    "type": "image",
    "url": "https://dsp.adfarm1.adition.com"
  },
  {
    "filters": [
      "||pagead2.googlesyndication.com^$domain=autobild.de|focus.de|transfermarkt.de",
      "@@||pagead2.googlesyndication.com/pagead/osd.js$domain=focus.de"
    ],
    "sourceUrl": "https://m.focus.de",
    "type": "script",
    "url": "https://pagead2.googlesyndication.com/pagead/osd.js"
  },
  {
    "filters": [
      "||adpnut.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://media.adpnut.com"
  },
  {
    "filters": [
      "/static/adv/*"
    ],
    "sourceUrl": "https://",
    "type": "stylesheet",
    "url": "https://www.gismeteo.ua/static/adv/"
  },
  {
    "filters": [
      "||luxupadva.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s.luxupadva.com"
  },
  {
    "filters": [
      "||amazon-adsystem.com^$domain=autobild.de|focus.de|transfermarkt.de"
    ],
    "sourceUrl": "https://m.focus.de",
    "type": "script",
    "url": "https://c.amazon-adsystem.com"
  },
  {
    "filters": [
      "||cmcore.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://data.cmcore.com"
  },
  {
    "filters": [
      "||netinsight.co.kr^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://ad.xc.netinsight.co.kr"
  },
  {
    "filters": [
      "||adform.net^$domain=autobild.de|focus.de|googlesyndication.com"
    ],
    "sourceUrl": "https://m.focus.de",
    "type": "image",
    "url": "https://dmp.adform.net"
  },
  {
    "filters": [
      "/ruxitagentjs_"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.delta.com/ruxitagentjs_2SVfhjqr_10119170522100716.js"
  },
  {
    "filters": [
      "/sitecatalyst/tracking."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.delta.com/etc/clientlibs/sitecatalyst/tracking.min.js"
  },
  {
    "filters": [
      ".sitecatalyst.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.delta.com/content/www/_jcr_content/analytics.sitecatalyst.js"
  },
  {
    "filters": [
      "/analytics.config.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.delta.com/content/www/_jcr_content/analytics.config.js"
  },
  {
    "filters": [
      "/jquery.dfp.min.js$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.joq.al/assets/js/jquery.dfp.min.js"
  },
  {
    "filters": [
      "/fuckadblock.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s2.gismeteo.ua/static/js/fuckadblock.js"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "http://tabloalmas2.blogfa.com",
    "type": "script",
    "url": "http://www.blogfa.com/ad/"
  },
  {
    "filters": [
      "/adx/js/*",
      "/cdn/adx/*"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://cdn-exchange.toastoven.net/cdn/adx/js/"
  },
  {
    "filters": [
      "/sbtracking/pageview2?"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://news.sportbox.ru/sbtracking/pageview2?"
  },
  {
    "filters": [
      "/adfile/*"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.book118.com/adfile/"
  },
  {
    "filters": [
      "||clevernt.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://clevernt.com"
  },
  {
    "filters": [
      "||realclick.co.kr^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://ssp.realclick.co.kr"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "http://asheghane61.blogfa.com",
    "type": "script",
    "url": "http://www.blogfa.com/ad/"
  },
  {
    "filters": [
      "||play-asia.com^$image,third-party",
      "||play-asia.com^$third-party,image"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.play-asia.com"
  },
  {
    "filters": [
      "=googleanalytics_"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://horriblesubs.info/?ga_action=googleanalytics_get_script"
  },
  {
    "filters": [
      "/ads/banners/*"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://www.blogfa.com/ads/banners/"
  },
  {
    "filters": [
      "||tkpi.delta.com^",
      "/datacollectcode?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tkpi.delta.com/datacollectcode?"
  },
  {
    "filters": [
      "||krxd.net^$domain=focus.de"
    ],
    "sourceUrl": "https://m.focus.de",
    "type": "image",
    "url": "https://beacon.krxd.net"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "http://tabloalmas.blogfa.com",
    "type": "script",
    "url": "http://www.blogfa.com/ad/"
  },
  {
    "filters": [
      "||bidgear.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://platform.bidgear.com"
  },
  {
    "filters": [
      "?affiliate=$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://www.bet365.com/dl/~offer?affiliate=365_773866"
  },
  {
    "filters": [
      "||tru.webelapp.com^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://tru.webelapp.com"
  },
  {
    "filters": [
      "/libc/ads/*",
      "/ads/abrad."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.abril.com.br/libc/ads/abrad.min.js"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "http://tabloalmas.blogfa.com",
    "type": "script",
    "url": "http://www.blogfa.com/ad/"
  },
  {
    "filters": [
      "||glean.pop6.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://glean.pop6.com"
  },
  {
    "filters": [
      "||clickfuse.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://srv.clickfuse.com"
  },
  {
    "filters": [
      "/imp.php?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://srv.clickfuse.com/showads/track/imp.php?"
  },
  {
    "filters": [
      "||mlstat.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.mlstat.com"
  },
  {
    "check": true,
    "filters": [
      "||retargeter.com^$third-party",
      "||retargeter.com^"
    ],
    "sourceUrl": "http://",
    "type": "xhr",
    "url": "http://click.retargeter.com.br"
  },
  {
    "filters": [
      "@@||connect.facebook.net^$script,domain=eztv.ag|eztv.tf|eztv.yt"
    ],
    "sourceUrl": "https://eztv.ag",
    "type": "script",
    "url": "https://connect.facebook.net"
  },
  {
    "filters": [
      "||tr.webantenna.info^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://tr.webantenna.info"
  },
  {
    "check": true,
    "filters": [
      "||adultfriendfinder.com/go/$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "https://adultfriendfinder.com/go/"
  },
  {
    "filters": [
      "||smartredirect.de^$domain=focus.de"
    ],
    "sourceUrl": "https://m.focus.de",
    "type": "script",
    "url": "https://js.smartredirect.de"
  },
  {
    "filters": [
      "||genieedmp.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://genieedmp.com"
  },
  {
    "filters": [
      "/apw.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.corriere.it/apw.js"
  },
  {
    "filters": [
      "/adv.asp"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://spdmg-backend2.i-mobile.co.jp/adv.aspx"
  },
  {
    "filters": [
      "_adnetwork."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://gamma.cachefly.net/js/m_adnetwork.js"
  },
  {
    "check": true,
    "filters": [
      "/ads6.$domain=~ads6.adesignstudio.eu",
      "/ads6."
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://ads6.hsoub.com"
  },
  {
    "filters": [
      "||testin.cn^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://abapi.testin.cn"
  },
  {
    "filters": [
      "/banner.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://static.1tv.ru/player/special/banner.gif?"
  },
  {
    "filters": [
      "||justicejudo.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://justicejudo.com"
  },
  {
    "filters": [
      "@@||newrelic.com/nr-*.min.js$domain=play.spotify.com|surveymonkey.co.uk|surveymonkey.com|surveymonkey.de|surveymonkey.ru"
    ],
    "sourceUrl": "https://de.surveymonkey.com",
    "type": "script",
    "url": "https://js-agent.newrelic.com/nr-1099.min.js"
  },
  {
    "filters": [
      "/adops/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://js2.corriereobjects.it/adops/"
  },
  {
    "filters": [
      "/uploaded/ads/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://newsmedia.tasnimnews.com/Tasnim//Uploaded/Ads/"
  },
  {
    "filters": [
      "||facebook.com/common/scribe_endpoint.php"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.facebook.com/common/scribe_endpoint.php"
  },
  {
    "filters": [
      "||moatads.com^$domain=autobild.de|focus.de",
      "@@||moatads.com^*/moatad.js$domain=focus.de|transfermarkt.de"
    ],
    "sourceUrl": "https://m.focus.de",
    "type": "script",
    "url": "https://z.moatads.com/groupmdelorealdcmdisplay860035276432/moatad.js"
  },
  {
    "filters": [
      "/xtcore_"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://m.avito.ma/js/xtcore_m.js"
  },
  {
    "filters": [
      "||prpops.com^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.prpops.com"
  },
  {
    "filters": [
      "||defpush.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://defpush.com"
  },
  {
    "filters": [
      "||9anime.*/sw.js$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www1.9anime.to/sw.js"
  },
  {
    "filters": [
      "||d3pkae9owd2lcf.cloudfront.net/*.gz.js$important,script,redirect=d3pkae9owd2lcf.cloudfront.net/mb105.js,domain=hotslogs.com|poe.trade|wowhead.com",
      "||d3pkae9owd2lcf.cloudfront.net^"
    ],
    "sourceUrl": "http://poe.trade",
    "type": "script",
    "url": "http://d3pkae9owd2lcf.cloudfront.net/mb105.gz.js"
  },
  {
    "filters": [
      "/ads/show."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.imyanmarads.com/ads/show.js"
  },
  {
    "filters": [
      "_ad2."
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://pics.auction.co.kr/renewal/lp/icon_ad2.gif"
  },
  {
    "filters": [
      "||shallowsmile.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://shallowsmile.com"
  },
  {
    "filters": [
      "/px/*/blank.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.howtogeek.com/wp-content/uploads/px/370466/blank.gif?"
  },
  {
    "filters": [
      "/css/ad."
    ],
    "sourceUrl": "http://",
    "type": "stylesheet",
    "url": "http://www.itmedia.co.jp/css/ad.css"
  },
  {
    "filters": [
      "/1px.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://resfu.thumbr.io/media/img/1px.gif?"
  },
  {
    "filters": [
      "||wt-safetag.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://responder.wt-safetag.com"
  },
  {
    "filters": [
      "||d1r27qvpjiaqj3.cloudfront.net^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://d1r27qvpjiaqj3.cloudfront.net"
  },
  {
    "filters": [
      "||aprtn.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://aprtn.com"
  },
  {
    "check": true,
    "filters": [
      "/^https?:\\/\\/([0-9a-z\\-]+\\.)?(9anime|animeland|animenova|animeplus|animetoon|animewow|gamestorrent|goodanime|gogoanime|igg-games|kimcartoon|memecenter|readcomiconline|toonget|toonova|watchcartoononline)\\.[a-z]{2,4}\\/(?!([Ee]xternal|[Ii]mages|[Ss]cripts|[Uu]ploads|ac|ajax|assets|combined|content|cov|cover|(img\\/bg)|(img\\/icon)|inc|jwplayer|player|playlist-cat-rss|static|thumbs|wp-content|wp-includes)\\/)(.*)/$image,other,script,first-party,xmlhttprequest"
    ],
    "sourceUrl": "https://www1.9anime.to",
    "type": "xhr",
    "url": "https://www1.9anime.to/"
  },
  {
    "filters": [
      "/mtracking."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://invttjs.com.br/mtracking.gif"
  },
  {
    "filters": [
      "||biallo2.de^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tanz.biallo2.de"
  },
  {
    "filters": [
      "||mateti.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.mateti.net"
  },
  {
    "filters": [
      "||vdna-assets.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://a1.vdna-assets.com"
  },
  {
    "filters": [
      "||callousbrake.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://callousbrake.com"
  },
  {
    "filters": [
      "||mpnrs.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www1.mpnrs.com"
  },
  {
    "filters": [
      "||wt-eu02.net^",
      "||wt-eu02.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://rai-italia01.wt-eu02.net"
  },
  {
    "filters": [
      "/pagead."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://pagead.chinatimes.com"
  },
  {
    "filters": [
      "/ads/indexmarket."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.chinatimes.com/ads/indexmarket.js"
  },
  {
    "filters": [
      "/waterad2."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cache.chinatimes.com/scripts/waterad2.js"
  },
  {
    "filters": [
      "/idleAd."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cache.chinatimes.com/Scripts/idleAd.min.js"
  },
  {
    "filters": [
      "/zanox.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static.zanox.com/scripts/zanox.js"
  },
  {
    "filters": [
      "-main/ad."
    ],
    "sourceUrl": "https://",
    "type": "stylesheet",
    "url": "https://cache.chinatimes.com/css-main/ad.css"
  },
  {
    "check": true,
    "filters": [
      "/^https?:\\/\\/([0-9a-z\\-]+\\.)?(9anime|animeland|animenova|animeplus|animetoon|animewow|gamestorrent|goodanime|gogoanime|igg-games|kimcartoon|memecenter|readcomiconline|toonget|toonova|watchcartoononline)\\.[a-z]{2,4}\\/(?!([Ee]xternal|[Ii]mages|[Ss]cripts|[Uu]ploads|ac|ajax|assets|combined|content|cov|cover|(img\\/bg)|(img\\/icon)|inc|jwplayer|player|playlist-cat-rss|static|thumbs|wp-content|wp-includes)\\/)(.*)/$image,other,script,first-party,xmlhttprequest"
    ],
    "sourceUrl": "https://www1.9anime.to",
    "type": "xhr",
    "url": "https://www1.9anime.to/"
  },
  {
    "filters": [
      "/slot/dfp/*"
    ],
    "sourceUrl": "https://",
    "type": "stylesheet",
    "url": "https://pagead.chinatimes.com/slot/dfp/"
  },
  {
    "filters": [
      "/js-tag-manager/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://js.skyscnr.com/sttc/oc-registry/components/js-tag-manager/"
  },
  {
    "filters": [
      "||skyscnr.com/sttc/strevda-runtime/"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://js.skyscnr.com/sttc/strevda-runtime/"
  },
  {
    "filters": [
      "/videoad."
    ],
    "sourceUrl": "https://",
    "type": "stylesheet",
    "url": "https://pagead.chinatimes.com/Media/VideoAD1/css/videoad.css"
  },
  {
    "filters": [
      "/entry.count?"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://b.hatena.ne.jp/entry.count?"
  },
  {
    "filters": [
      "||skyscanner.*/slipstream/"
    ],
    "sourceUrl": "https://",
    "type": "fetch",
    "url": "https://www.skyscanner.net/slipstream/"
  },
  {
    "filters": [
      "||slipstream.skyscanner.net^"
    ],
    "sourceUrl": "https://",
    "type": "fetch",
    "url": "https://slipstream.skyscanner.net"
  },
  {
    "filters": [
      "/campaign_tracker."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static.chartbeat.com/js/campaign_tracker.js"
  },
  {
    "filters": [
      "/adcheck."
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://adcheck.about.co.kr"
  },
  {
    "filters": [
      "||vizury.com^$third-party",
      "||vizury.com/analyze/",
      "/pixel.php?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ssl.vizury.com/analyze/pixel.php?"
  },
  {
    "check": true,
    "filters": [
      "||woopra.com^$third-party",
      "||woopra.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static.woopra.com"
  },
  {
    "check": true,
    "filters": [
      "||hits-*.iubenda.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://hits-i.iubenda.com"
  },
  {
    "filters": [
      "/ads/forums/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.chinatimes.com/ads/forums/"
  },
  {
    "filters": [
      "/shared/ads."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://assets.247sports.com/Scripts/SkyNet/Shared/ads.js"
  },
  {
    "filters": [
      "/chartbeat.min.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://mobile.abc.net.au/homepage/mobile/scripts/chartbeat.min.js"
  },
  {
    "filters": [
      "||abc.net.au^*/stats/"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://res.abc.net.au/libraries/stats/"
  },
  {
    "filters": [
      "||ibmcloud.com/collector/"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://uscollector.tealeaf.ibmcloud.com/collector/"
  },
  {
    "filters": [
      "||platform.twitter.com/impressions.js$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://platform.twitter.com/impressions.js"
  },
  {
    "filters": [
      "||atdmt.com/action/"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://switch.atdmt.com/action/"
  },
  {
    "filters": [
      "||metaffiliation.com^",
      "/trk.php?",
      "||metaffiliation.com^*^taff="
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://action.metaffiliation.com/trk.php?taff=P4FACD513DF9111"
  },
  {
    "filters": [
      "/linktracking."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://res.abc.net.au/libraries/stats/webtrends-bundle/linkTracking.js"
  },
  {
    "filters": [
      "/adsi-j."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ads.ads-sys.com/adsi-j.php"
  },
  {
    "filters": [
      "/werbebanner_",
      "_728x90_"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://cdn.mediards.de/1yibc/Werbebanner_728x90_tippyt_t_2018.gif"
  },
  {
    "filters": [
      "||readserver.net^$third-party",
      "||readserver.net^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://tag.readserver.net"
  },
  {
    "filters": [
      ".org/ad.",
      "/ad.php?",
      "&adstype="
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "https://share.dmhy.org/ad.php?id=dmhy&adsType=950x80"
  },
  {
    "filters": [
      "||yldbt.com^$third-party",
      "||yldbt.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://i.yldbt.com"
  },
  {
    "filters": [
      "||17173.com/ping.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://js.17173.com/ping.js"
  },
  {
    "filters": [
      "||salecycle.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://s.salecycle.com"
  },
  {
    "filters": [
      "||webtrends.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s.webtrends.com"
  },
  {
    "check": true,
    "filters": [
      "/^https?:\\/\\/([0-9a-z\\-]+\\.)?(9anime|animeland|animenova|animeplus|animetoon|animewow|gamestorrent|goodanime|gogoanime|igg-games|kimcartoon|memecenter|readcomiconline|toonget|toonova|watchcartoononline)\\.[a-z]{2,4}\\/(?!([Ee]xternal|[Ii]mages|[Ss]cripts|[Uu]ploads|ac|ajax|assets|combined|content|cov|cover|(img\\/bg)|(img\\/icon)|inc|jwplayer|player|playlist-cat-rss|static|thumbs|wp-content|wp-includes)\\/)(.*)/$image,other,script,first-party,xmlhttprequest"
    ],
    "sourceUrl": "https://www1.9anime.to",
    "type": "xhr",
    "url": "https://www1.9anime.to/"
  },
  {
    "check": true,
    "filters": [
      "/^https?:\\/\\/([0-9a-z\\-]+\\.)?(9anime|animeland|animenova|animeplus|animetoon|animewow|gamestorrent|goodanime|gogoanime|igg-games|kimcartoon|memecenter|readcomiconline|toonget|toonova|watchcartoononline)\\.[a-z]{2,4}\\/(?!([Ee]xternal|[Ii]mages|[Ss]cripts|[Uu]ploads|ac|ajax|assets|combined|content|cov|cover|(img\\/bg)|(img\\/icon)|inc|jwplayer|player|playlist-cat-rss|static|thumbs|wp-content|wp-includes)\\/)(.*)/$image,other,script,first-party,xmlhttprequest"
    ],
    "sourceUrl": "https://www1.9anime.to",
    "type": "xhr",
    "url": "https://www1.9anime.to/"
  },
  {
    "filters": [
      "/adcall."
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://bw.scupio.com/adpinline/adcall.aspx"
  },
  {
    "filters": [
      "/openads/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://c.dcdn.es/openads/"
  },
  {
    "check": true,
    "filters": [
      "||adworx.at^$third-party",
      "||adworx.at^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ad.adworx.at"
  },
  {
    "filters": [
      "||iocnt.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://script-at.iocnt.net"
  },
  {
    "filters": [
      "/mpel/mpel.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://es.t-mobile.com/mpel/mpel.js"
  },
  {
    "check": true,
    "filters": [
      "/oasdefault/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ad.adworx.at/RealMedia/ads/Creatives/OasDefault/"
  },
  {
    "filters": [
      "||wywy.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://analyze.wywy.com"
  },
  {
    "filters": [
      "||smartclip.net^$third-party,script"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://ad.sxp.smartclip.net"
  },
  {
    "check": true,
    "filters": [
      "/^https?:\\/\\/([0-9a-z\\-]+\\.)?(9anime|animeland|animenova|animeplus|animetoon|animewow|gamestorrent|goodanime|gogoanime|igg-games|kimcartoon|memecenter|readcomiconline|toonget|toonova|watchcartoononline)\\.[a-z]{2,4}\\/(?!([Ee]xternal|[Ii]mages|[Ss]cripts|[Uu]ploads|ac|ajax|assets|combined|content|cov|cover|(img\\/bg)|(img\\/icon)|inc|jwplayer|player|playlist-cat-rss|static|thumbs|wp-content|wp-includes)\\/)(.*)/$image,other,script,first-party,xmlhttprequest"
    ],
    "sourceUrl": "https://www1.9anime.to",
    "type": "xhr",
    "url": "https://www1.9anime.to/"
  },
  {
    "filters": [
      "&admid=$~subdocument"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://sync.navdmp.com/sync?prtid=22&admid=8e40dfbf-fead-44ba-b4f6-129602a49157"
  },
  {
    "filters": [
      "||log1.17173.com^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://log1.17173.com"
  },
  {
    "check": true,
    "filters": [
      "/^https?:\\/\\/([0-9a-z\\-]+\\.)?(9anime|animeland|animenova|animeplus|animetoon|animewow|gamestorrent|goodanime|gogoanime|igg-games|kimcartoon|memecenter|readcomiconline|toonget|toonova|watchcartoononline)\\.[a-z]{2,4}\\/(?!([Ee]xternal|[Ii]mages|[Ss]cripts|[Uu]ploads|ac|ajax|assets|combined|content|cov|cover|(img\\/bg)|(img\\/icon)|inc|jwplayer|player|playlist-cat-rss|static|thumbs|wp-content|wp-includes)\\/)(.*)/$image,other,script,first-party,xmlhttprequest"
    ],
    "sourceUrl": "https://www1.9anime.to",
    "type": "xhr",
    "url": "https://www1.9anime.to/"
  },
  {
    "filters": [
      "|https://$script,subdocument,third-party,xmlhttprequest,domain=opensubtitles.org"
    ],
    "sourceUrl": "https://www.opensubtitles.org",
    "type": "script",
    "url": "https://"
  },
  {
    "filters": [
      "||opensubtitles.org^*.js|$script,domain=opensubtitles.org",
      "@@||static.opensubtitles.org/libs/js/$script,domain=opensubtitles.org"
    ],
    "sourceUrl": "https://www.opensubtitles.org",
    "type": "script",
    "url": "https://static.opensubtitles.org/libs/js/jquery/jquery.min.js"
  },
  {
    "filters": [
      "||dialogtech.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://st1.dialogtech.com"
  },
  {
    "filters": [
      "/content/ads/*"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://www.tamin.ir/content/ads/"
  },
  {
    "filters": [
      "&bannerid="
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://ad.bsmartad.net/adframe.php?zoneid=10957&bannerid=123&ref=OWFuaW1lLnRv"
  },
  {
    "filters": [
      "||adcell.de^$third-party",
      "||adcell.de^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.adcell.de"
  },
  {
    "filters": [
      "/adcell/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://storage.googleapis.com/adcell/"
  },
  {
    "filters": [
      "||1l-hit.mail.ru^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://1l-hit.mail.ru"
  },
  {
    "filters": [
      "||cbsimg.net/js/cbsi/dw.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://dws.cbsimg.net/js/cbsi/dw.js"
  },
  {
    "filters": [
      "||truex.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://get.truex.com"
  },
  {
    "filters": [
      "/containertag?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ap.lijit.com/containertag?"
  },
  {
    "filters": [
      "/addelivery/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://vap2ams1.lijit.com/addelivery/"
  },
  {
    "filters": [
      "||logentries.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://js.logentries.com"
  },
  {
    "filters": [
      "/minpagead/*"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://delivery-m.adtplatform.com/247/minpagead/"
  },
  {
    "filters": [
      "||ojrq.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.ojrq.net"
  },
  {
    "filters": [
      "/ads-config.",
      "@@||adsales.snidigital.com/*/ads-config.min.js$script"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://code.adsales.snidigital.com/conf/ads-config.min.js"
  },
  {
    "filters": [
      "||px.marchex.io^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://px.marchex.io"
  },
  {
    "filters": [
      "/piwik-$domain=~github.com|~matomo.org|~piwik.org"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn2.online-convert.com/js/piwik-9d035513.js"
  },
  {
    "filters": [
      "||runtnc.net^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.runtnc.net"
  },
  {
    "filters": [
      "@@||sascdn.com/video/$script"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://r.sascdn.com/video/"
  },
  {
    "filters": [
      "@@||sascdn.com/diff/video/$script"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://ced-ns.sascdn.com/diff/video/"
  },
  {
    "filters": [
      "/keen-tracker."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://d26b395fwzu5fz.cloudfront.net/3.2.6/keen-tracker.min.js"
  },
  {
    "filters": [
      "/cgi-bin/ivw/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://cnt.wetteronline.de/cgi-bin/ivw/"
  },
  {
    "filters": [
      "||pixel.1und1.de^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://pixel.1und1.de"
  },
  {
    "filters": [
      "||analytics.convertlanguage.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://analytics.convertlanguage.com"
  },
  {
    "filters": [
      ".admicro."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://lg1.logging.admicro.vn"
  },
  {
    "filters": [
      "/120x600.",
      "120x600.gif|"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://click.sabavision.com/public/public/images/loadings/120x600.gif"
  },
  {
    "filters": [
      "||macromill.com^$third-party",
      "||macromill.com/imp/"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://img.macromill.com/imp/"
  },
  {
    "filters": [
      "/hitcount/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://dyn.ithome.com/api/hitcount/"
  },
  {
    "filters": [
      "/comscore?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://pson.logging.admicro.vn/comscore?"
  },
  {
    "filters": [
      "/ads_codes/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://media1.admicro.vn/ads_codes/"
  },
  {
    "filters": [
      "||broaddoor.com^",
      "||broaddoor.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://broaddoor.com"
  },
  {
    "filters": [
      "||tagbucket.cc^",
      "||tagbucket.cc^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tagbucket.cc"
  },
  {
    "filters": [
      "||adsrv4k.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://adsrv4k.com"
  },
  {
    "filters": [
      "||nspmotion.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s-akfs.nspmotion.com"
  },
  {
    "filters": [
      "||logs.51cto.com^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://logs.51cto.com"
  },
  {
    "filters": [
      "||wzrkt.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://wzrkt.com"
  },
  {
    "filters": [
      ".net/ads?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://des.smartclip.net/ads?"
  },
  {
    "filters": [
      ".com/advs-",
      "/advs-instream."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://js.mtburn.com/advs-instream.js"
  },
  {
    "filters": [
      "@@||google.com/adsense/search/ads.js$domain=armstrongmywire.com|atlanticbb.net|bestbuy.com|bresnan.net|broadstripe.net|buckeyecablesystem.net|cableone.net|centurylink.net|charter.net|cincinnatibell.net|dish.net|forbbbs.org|gumtree.com.au|hargray.net|hawaiiantel.net|hickorytech.net|homeaway.co.uk|knology.net|livestrong.com|mediacomtoday.com|midco.net|mybendbroadband.com|mybrctv.com|mycenturylink.com|myconsolidated.net|myepb.net|mygrande.net|mygvtc.com|myhughesnet.com|myritter.com|northstate.net|nwcable.net|query.nytimes.com|rentals.com|search.rr.com|searchresults.verizon.com|suddenlink.net|surewest.com|synacor.net|tds.net|toshiba.com|trustedreviews.com|truvista.net|windstream.net|windstreambusiness.net|wowway.net|www.google.com|zoover.co.uk|zoover.com"
    ],
    "sourceUrl": "https://www.gumtree.com.au",
    "type": "other",
    "url": "https://www.google.com/adsense/search/ads.js"
  },
  {
    "filters": [
      "||1to1.bbva.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://1to1.bbva.com"
  },
  {
    "filters": [
      "||adpushup.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.adpushup.com"
  },
  {
    "filters": [
      "||sohu.com^*/cookie?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://changyan.sohu.com/debug/cookie?"
  },
  {
    "filters": [
      "/pvmax.js",
      "||pvmax.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://api.pvmax.net/v1.0/pvmax.js"
  },
  {
    "check": true,
    "filters": [
      "/^https?:\\/\\/([0-9a-z\\-]+\\.)?(9anime|animeland|animenova|animeplus|animetoon|animewow|gamestorrent|goodanime|gogoanime|igg-games|kimcartoon|memecenter|readcomiconline|toonget|toonova|watchcartoononline)\\.[a-z]{2,4}\\/(?!([Ee]xternal|[Ii]mages|[Ss]cripts|[Uu]ploads|ac|ajax|assets|combined|content|cov|cover|(img\\/bg)|(img\\/icon)|inc|jwplayer|player|playlist-cat-rss|static|thumbs|wp-content|wp-includes)\\/)(.*)/$image,other,script,first-party,xmlhttprequest"
    ],
    "sourceUrl": "https://www1.9anime.to",
    "type": "xhr",
    "url": "https://www1.9anime.to/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.asahi.com",
    "type": "script",
    "url": "https://www.asahi.com/ad/"
  },
  {
    "filters": [
      "/advert2."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://openload.co/advert2.js"
  },
  {
    "filters": [
      "||aaxads.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://c.aaxads.com"
  },
  {
    "filters": [
      "/iMAWebCookie."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.sc.pages07.net/lp/static/js/iMAWebCookie.js"
  },
  {
    "check": true,
    "filters": [
      "/^https?:\\/\\/([0-9a-z\\-]+\\.)?(9anime|animeland|animenova|animeplus|animetoon|animewow|gamestorrent|goodanime|gogoanime|igg-games|kimcartoon|memecenter|readcomiconline|toonget|toonova|watchcartoononline)\\.[a-z]{2,4}\\/(?!([Ee]xternal|[Ii]mages|[Ss]cripts|[Uu]ploads|ac|ajax|assets|combined|content|cov|cover|(img\\/bg)|(img\\/icon)|inc|jwplayer|player|playlist-cat-rss|static|thumbs|wp-content|wp-includes)\\/)(.*)/$image,other,script,first-party,xmlhttprequest"
    ],
    "sourceUrl": "https://www1.9anime.to",
    "type": "xhr",
    "url": "https://www1.9anime.to/"
  },
  {
    "filters": [
      "/impressions/log?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://pp.d2-apps.net/v1/impressions/log?"
  },
  {
    "filters": [
      "||analytics.brandcrumb.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://dharma.analytics.brandcrumb.com"
  },
  {
    "filters": [
      "||aaxdetect.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://aaxdetect.com"
  },
  {
    "filters": [
      "||belboon.de^$third-party",
      "/adtracking/*"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://www1.belboon.de/adtracking/"
  },
  {
    "filters": [
      "||sohu.com/stat/",
      "/stat/event?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://changyan.sohu.com/stat/event?"
  },
  {
    "filters": [
      "/stat/uvstat?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://changyan.sohu.com/stat/uvstat?"
  },
  {
    "filters": [
      "||da3uf5ucdz00u.cloudfront.net^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://da3uf5ucdz00u.cloudfront.net"
  },
  {
    "filters": [
      "||radchesruno.club^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://radchesruno.club"
  },
  {
    "filters": [
      "||zeusclicks.com^",
      "/view/banner/*"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://ads2.zeusclicks.com/servlet/view/banner/"
  },
  {
    "filters": [
      "||sancdn.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://m.sancdn.net"
  },
  {
    "filters": [
      "||sexad.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://as.sexad.net"
  },
  {
    "filters": [
      "||zampda.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.zampda.net"
  },
  {
    "filters": [
      "/imp?imgid="
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ww1510.smartadserver.com/imp?imgid=22187664&tmstp=1540303355921"
  },
  {
    "filters": [
      "||t.a3cloud.net^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://t.a3cloud.net"
  },
  {
    "filters": [
      "||anrdoezrs.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.anrdoezrs.net"
  },
  {
    "filters": [
      "||sl.pt/wa.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://wa.sl.pt/wa.gif?"
  },
  {
    "filters": [
      "||cloudfront.net/sso.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://d1v9u0bgi1uimx.cloudfront.net/sso.js"
  },
  {
    "filters": [
      "||djz9es32qen64.cloudfront.net^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://djz9es32qen64.cloudfront.net"
  },
  {
    "filters": [
      "||ebayclassifiedsgroup.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "fetch",
    "url": "https://treebay.ebayclassifiedsgroup.com"
  },
  {
    "filters": [
      "/adriver/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://an.yandex.ru/setud/adriver/"
  },
  {
    "filters": [
      "||celeritascdn.com^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.celeritascdn.com"
  },
  {
    "filters": [
      "@@/wp-content/plugins/akismet/*$script,first-party,domain=~gaytube.com|~pornhub.com|~redtube.com|~redtube.com.br|~tube8.com|~tube8.es|~tube8.fr|~xtube.com|~youjizz.com|~youporn.com|~youporngay.com"
    ],
    "sourceUrl": "https://www.makeuseof.com",
    "type": "script",
    "url": "https://static.makeuseof.com/wp-content/plugins/akismet/"
  },
  {
    "filters": [
      "/SAPOWebAnalytics/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://js.sapo.pt/SAPOWebAnalytics/"
  },
  {
    "filters": [
      "||adglare.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://bullionmedia.engine.adglare.net"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "https://www.asahi.com",
    "type": "script",
    "url": "https://www.asahi.com/ad/"
  },
  {
    "filters": [
      "||realytics.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://i.realytics.io"
  },
  {
    "filters": [
      "/realytics-"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://dcniko1cv0rz.cloudfront.net/realytics-1.2.min.js"
  },
  {
    "filters": [
      "||adsession.com^$third-party",
      "-adserver-"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://rev.adsession.com/revive-adserver-2015"
  },
  {
    "filters": [
      "/adsrv."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://adsrv.me"
  },
  {
    "filters": [
      "||audiencemanager.de^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://www.audiencemanager.de"
  },
  {
    "filters": [
      "/event/track?",
      "/track?cb="
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://m.realytics.io/event/track?cb=1540303366326"
  },
  {
    "filters": [
      "/roitrack."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://media.msg.dotomi.com/w/roitrack.cgi"
  },
  {
    "filters": [
      "||logger.snackly.co^"
    ],
    "sourceUrl": "https://",
    "type": "other",
    "url": "https://logger.snackly.co"
  },
  {
    "filters": [
      ".adserver01.",
      "||adserver01.de^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://r.adserver01.de"
  },
  {
    "filters": [
      "||adc-srv.net/retargeting.php"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://r.adc-srv.net/retargeting.php"
  },
  {
    "filters": [
      "||ad-srv.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://ad.ad-srv.net"
  },
  {
    "filters": [
      "||tagcommander.com^$third-party",
      "@@||tagcommander.com^*/tc_$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.tagcommander.com/2623/tc_LaBanquePostale_4.js"
  },
  {
    "filters": [
      "||hibids10.com^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.hibids10.com"
  },
  {
    "filters": [
      "||iadvize.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://halc.iadvize.com"
  },
  {
    "filters": [
      "||advombat.ru^$third-party",
      ".ru/0.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://advombat.ru/0.gif?"
  },
  {
    "filters": [
      "||am15.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://rtb.am15.net"
  },
  {
    "filters": [
      "||rareru.ru^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://tracker.rareru.ru"
  },
  {
    "filters": [
      "||denakop.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://v2.denakop.com"
  },
  {
    "filters": [
      "||heavy-r.com/a/"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://www.heavy-r.com/a/"
  },
  {
    "filters": [
      "||atdmt.com/iaction/"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://view.atdmt.com/iaction/"
  },
  {
    "filters": [
      "||flocktory.com^*/tracks/"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://api.flocktory.com/underworld/tracks/"
  },
  {
    "filters": [
      "||firstpost.com/promo/",
      "-popunder."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://images.firstpost.com/promo/js/mcfp-popunder.js"
  },
  {
    "check": true,
    "filters": [
      "/^https?:\\/\\/([0-9a-z\\-]+\\.)?(9anime|animeland|animenova|animeplus|animetoon|animewow|gamestorrent|goodanime|gogoanime|igg-games|kimcartoon|memecenter|readcomiconline|toonget|toonova|watchcartoononline)\\.[a-z]{2,4}\\/(?!([Ee]xternal|[Ii]mages|[Ss]cripts|[Uu]ploads|ac|ajax|assets|combined|content|cov|cover|(img\\/bg)|(img\\/icon)|inc|jwplayer|player|playlist-cat-rss|static|thumbs|wp-content|wp-includes)\\/)(.*)/$image,other,script,first-party,xmlhttprequest"
    ],
    "sourceUrl": "https://www1.9anime.to",
    "type": "xhr",
    "url": "https://www1.9anime.to/"
  },
  {
    "filters": [
      "_ads.php?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://click.sabavision.com/get_native_ads.php?"
  },
  {
    "filters": [
      "@@||nbcudigitaladops.com/hosted/$script"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.nbcudigitaladops.com/hosted/"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "http://www.asahi.com",
    "type": "script",
    "url": "http://www.asahi.com/ad/"
  },
  {
    "check": true,
    "filters": [
      "/^https?:\\/\\/([0-9a-z\\-]+\\.)?(9anime|animeland|animenova|animeplus|animetoon|animewow|gamestorrent|goodanime|gogoanime|igg-games|kimcartoon|memecenter|readcomiconline|toonget|toonova|watchcartoononline)\\.[a-z]{2,4}\\/(?!([Ee]xternal|[Ii]mages|[Ss]cripts|[Uu]ploads|ac|ajax|assets|combined|content|cov|cover|(img\\/bg)|(img\\/icon)|inc|jwplayer|player|playlist-cat-rss|static|thumbs|wp-content|wp-includes)\\/)(.*)/$image,other,script,first-party,xmlhttprequest"
    ],
    "sourceUrl": "https://www1.9anime.to",
    "type": "xhr",
    "url": "https://www1.9anime.to/"
  },
  {
    "filters": [
      "||nbcudigitaladops.com/hosted/housepix.gif"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://www.nbcudigitaladops.com/hosted/housepix.gif"
  },
  {
    "filters": [
      "||stats.sa-as.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://stats.sa-as.com"
  },
  {
    "filters": [
      "||waplog.net^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://c.waplog.net"
  },
  {
    "filters": [
      "||mobtop.ru^$third-party",
      "||mobtop.ru/c/$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://mobtop.ru/c/"
  },
  {
    "filters": [
      "||combotag.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://serve.combotag.com"
  },
  {
    "check": true,
    "filters": [
      "/^https?:\\/\\/([0-9a-z\\-]+\\.)?(9anime|animeland|animenova|animeplus|animetoon|animewow|gamestorrent|goodanime|gogoanime|igg-games|kimcartoon|memecenter|readcomiconline|toonget|toonova|watchcartoononline)\\.[a-z]{2,4}\\/(?!([Ee]xternal|[Ii]mages|[Ss]cripts|[Uu]ploads|ac|ajax|assets|combined|content|cov|cover|(img\\/bg)|(img\\/icon)|inc|jwplayer|player|playlist-cat-rss|static|thumbs|wp-content|wp-includes)\\/)(.*)/$image,other,script,first-party,xmlhttprequest"
    ],
    "sourceUrl": "https://www1.9anime.to",
    "type": "xhr",
    "url": "https://www1.9anime.to/"
  },
  {
    "filters": [
      "||cloud-iq.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://platform2.cloud-iq.com"
  },
  {
    "check": true,
    "filters": [
      "/^https?:\\/\\/([0-9a-z\\-]+\\.)?(9anime|animeland|animenova|animeplus|animetoon|animewow|gamestorrent|goodanime|gogoanime|igg-games|kimcartoon|memecenter|readcomiconline|toonget|toonova|watchcartoononline)\\.[a-z]{2,4}\\/(?!([Ee]xternal|[Ii]mages|[Ss]cripts|[Uu]ploads|ac|ajax|assets|combined|content|cov|cover|(img\\/bg)|(img\\/icon)|inc|jwplayer|player|playlist-cat-rss|static|thumbs|wp-content|wp-includes)\\/)(.*)/$image,other,script,first-party,xmlhttprequest"
    ],
    "sourceUrl": "https://www1.9anime.to",
    "type": "xhr",
    "url": "https://www1.9anime.to/"
  },
  {
    "filters": [
      "||r.mail.ru^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://r.mail.ru"
  },
  {
    "filters": [
      "_adtech_"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.finn.no/ec/REK/MFINN_bcounter/_adtech_adbutler_advertise_adform_"
  },
  {
    "filters": [
      "/showadv2."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ads.easy-ads.com/showadv2.php"
  },
  {
    "filters": [
      "@@||greasyfork.org/system/screenshots/screenshots/$domain=greasyfork.org"
    ],
    "sourceUrl": "https://greasyfork.org",
    "type": "image",
    "url": "https://greasyfork.org/system/screenshots/screenshots/"
  },
  {
    "filters": [
      "-ads/assets/"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://fivethirtyeight.com/wp-content/plugins/abc-ads/assets/"
  },
  {
    "filters": [
      "||supercounters.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://widget.supercounters.com"
  },
  {
    "filters": [
      "||econda-monitor.de^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.econda-monitor.de"
  },
  {
    "check": true,
    "filters": [
      ".com/ad/$first-party,domain=~blogs.technet.microsoft.com|~channel4.com|~cspace.com|~linkedin.com|~mediaplex.com|~online.wsj.com"
    ],
    "sourceUrl": "http://www.asahi.com",
    "type": "script",
    "url": "http://www.asahi.com/ad/"
  },
  {
    "filters": [
      "||schibsted.com/autoTracker"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://jssdk.pulse.schibsted.com/autoTrackerFinn.min.js"
  },
  {
    "filters": [
      "||dcmn.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://idealo-de.dcmn.com"
  },
  {
    "filters": [
      "||tns-cs.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ssl-finn.tns-cs.net"
  },
  {
    "filters": [
      "||da.netease.com^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://wr.da.netease.com"
  },
  {
    "filters": [
      "||everestjs.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.everestjs.net"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party",
      "@@||pixhost.to/js/vendor/jquery-*.js?",
      "||pixhost.to^$first-party,script"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to/js/vendor/jquery-1.11.1.min.js?"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party",
      "@@||pixhost.to/js/vendor/jquery.*.js"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to/js/vendor/jquery.cookie.js"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party",
      "@@||pixhost.to/js/main.js?"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to/js/main.js?"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party",
      "@@||pixhost.to/js/helpers.js?"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to/js/helpers.js?"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party",
      "@@||pixhost.to/lang.js.php?"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to/lang.js.php?"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party",
      "@@||pixhost.to/js/vendor/clipboard.min.js?"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to/js/vendor/clipboard.min.js?"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party",
      "@@||pixhost.to/js/clipboard-helpers.js?"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to/js/clipboard-helpers.js?"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party",
      "@@||pixhost.to/vendor/jquery-*.js?"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to/vendor/jquery-ui/jquery-ui.min.js?"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party",
      "@@||pixhost.to/plupload/plupload.*.js?"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to/plupload/plupload.full.min.js?"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party",
      "@@||pixhost.to/plupload/jquery.*.js?"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to/plupload/jquery.ui.plupload/jquery.ui.plupload.js?"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party",
      "@@||pixhost.to/plupload/i18n/en.js?"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to/plupload/i18n/en.js?"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party",
      "@@||pixhost.to/js/new-upload.js?"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to/js/new-upload.js?"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party",
      "@@||pixhost.to/js/vendor/rangeslider.min.js?"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to/js/vendor/rangeslider.min.js?"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party",
      "@@||pixhost.to/js/upload_functions.js?"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to/js/upload_functions.js?"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party",
      "@@||pixhost.to/js/vendor/nprogress.js|"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to/js/vendor/nprogress.js"
  },
  {
    "check": true,
    "filters": [
      "||bridgetrack.com^$third-party",
      "||bridgetrack.com^",
      "||bridgetrack.com/track/"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://rbc.bridgetrack.com/track/"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||navaxudoru.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://navaxudoru.com"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "@@||fwcdn.pl^$script,domain=filmweb.pl"
    ],
    "sourceUrl": "https://www.filmweb.pl",
    "type": "script",
    "url": "https://2.fwcdn.pl"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "/adbetween/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://gfx.filmweb.pl/adbetween/"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "||pixhost.to^$script,first-party"
    ],
    "sourceUrl": "https://pixhost.to",
    "type": "script",
    "url": "https://pixhost.to"
  },
  {
    "filters": [
      "-300x600."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://3.fwcdn.pl/adv/martyna/jwfk/Jurassic-Upadle-banner-300x600.jpg"
  },
  {
    "filters": [
      "||fixpass.net^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://cdn.fixpass.net"
  },
  {
    "filters": [
      "||bitrix.info^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://bitrix.info"
  },
  {
    "filters": [
      "||viglink.com/api/insert^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://api.viglink.com/api/insert"
  },
  {
    "filters": [
      "/keen-tracking-"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://d26b395fwzu5fz.cloudfront.net/keen-tracking-1.0.3.min.js"
  },
  {
    "filters": [
      "||postaffiliatepro.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://bml.postaffiliatepro.com"
  },
  {
    "check": true,
    "filters": [
      "/^https?:\\/\\/([0-9a-z\\-]+\\.)?(9anime|animeland|animenova|animeplus|animetoon|animewow|gamestorrent|goodanime|gogoanime|igg-games|kimcartoon|memecenter|readcomiconline|toonget|toonova|watchcartoononline)\\.[a-z]{2,4}\\/(?!([Ee]xternal|[Ii]mages|[Ss]cripts|[Uu]ploads|ac|ajax|assets|combined|content|cov|cover|(img\\/bg)|(img\\/icon)|inc|jwplayer|player|playlist-cat-rss|static|thumbs|wp-content|wp-includes)\\/)(.*)/$image,other,script,first-party,xmlhttprequest"
    ],
    "sourceUrl": "https://www.watchcartoononline.com",
    "type": "document",
    "url": "https://www.watchcartoononline.com/"
  },
  {
    "filters": [
      "/drawad."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://s2.dwnews.net/v5/js/ad/drawAd.js"
  },
  {
    "filters": [
      "||keen.io^$third-party,domain=~keen.github.io|~keen.io"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://api.keen.io"
  },
  {
    "check": true,
    "filters": [
      "/^https?:\\/\\/([0-9a-z\\-]+\\.)?(9anime|animeland|animenova|animeplus|animetoon|animewow|gamestorrent|goodanime|gogoanime|igg-games|kimcartoon|memecenter|readcomiconline|toonget|toonova|watchcartoononline)\\.[a-z]{2,4}\\/(?!([Ee]xternal|[Ii]mages|[Ss]cripts|[Uu]ploads|ac|ajax|assets|combined|content|cov|cover|(img\\/bg)|(img\\/icon)|inc|jwplayer|player|playlist-cat-rss|static|thumbs|wp-content|wp-includes)\\/)(.*)/$image,other,script,first-party,xmlhttprequest"
    ],
    "sourceUrl": "https://www.watchcartoononline.com",
    "type": "document",
    "url": "https://www.watchcartoononline.com/"
  },
  {
    "filters": [
      "/sitestat."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.tagesschau.de/resources/framework/js/sitestat.js"
  },
  {
    "filters": [
      "||sitestat.com^",
      "||sitestat.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://de.sitestat.com"
  },
  {
    "filters": [
      "||exelator.com^$domain=disqus.com"
    ],
    "sourceUrl": "https://blog.disqus.com",
    "type": "image",
    "url": "https://loadus.exelator.com"
  },
  {
    "filters": [
      "||crwdcntrl.net^$domain=disqus.com"
    ],
    "sourceUrl": "https://blog.disqus.com",
    "type": "image",
    "url": "https://bcp.crwdcntrl.net"
  },
  {
    "filters": [
      "/mms/get_loaders?"
    ],
    "sourceUrl": "http://",
    "type": "xhr",
    "url": "http://source.programme-tv.net/mms/get_loaders?"
  },
  {
    "filters": [
      ".com/js.ng/"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://qde.qunar.com/js.ng/"
  },
  {
    "filters": [
      "||ssl-images-amazon.com^*/dacx/"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://images-na.ssl-images-amazon.com/images/G/01/dacx/"
  },
  {
    "filters": [
      "/kissmetrics/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://xvp.akamaized.net/assets/kissmetrics/"
  },
  {
    "filters": [
      "||chameleon.ad^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://chameleon.ad"
  },
  {
    "filters": [
      "||pulpix.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://cdn.pulpix.com"
  },
  {
    "filters": [
      "||m-pathy.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.m-pathy.com"
  },
  {
    "filters": [
      "||freeskreen.com^$third-party",
      "||freeskreen.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static.freeskreen.com"
  },
  {
    "check": true,
    "filters": [
      "/^https?:\\/\\/([0-9a-z\\-]+\\.)?(9anime|animeland|animenova|animeplus|animetoon|animewow|gamestorrent|goodanime|gogoanime|igg-games|kimcartoon|memecenter|readcomiconline|toonget|toonova|watchcartoononline)\\.[a-z]{2,4}\\/(?!([Ee]xternal|[Ii]mages|[Ss]cripts|[Uu]ploads|ac|ajax|assets|combined|content|cov|cover|(img\\/bg)|(img\\/icon)|inc|jwplayer|player|playlist-cat-rss|static|thumbs|wp-content|wp-includes)\\/)(.*)/$image,other,script,first-party,xmlhttprequest"
    ],
    "sourceUrl": "https://www.watchcartoononline.com",
    "type": "document",
    "url": "https://www.watchcartoononline.com/"
  },
  {
    "filters": [
      "||rtmark.net^",
      "||rtmark.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://my.rtmark.net"
  },
  {
    "filters": [
      "||51yes.com^",
      "||51yes.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://count15.51yes.com"
  },
  {
    "filters": [
      "/ADNet/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://assets.gunosy.com/adnet/"
  },
  {
    "filters": [
      "||popmyads.com^$third-party",
      "||popmyads.com^"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.popmyads.com"
  },
  {
    "filters": [
      "||analytics.global.sky.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://analytics.global.sky.com"
  },
  {
    "filters": [
      "/elqcfg.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.adp.com/-/media/adp/Redesign2018/js/elqCfg.js"
  },
  {
    "filters": [
      "/trackconversion?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://api.adsymptotic.com/api/s/trackconversion?"
  },
  {
    "check": true,
    "filters": [
      "/oascentral.$~object-subrequest"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://oascentral.dwnews.com"
  },
  {
    "check": true,
    "filters": [
      "||adserver.pressboard.ca^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://adserver.pressboard.ca"
  },
  {
    "filters": [
      "/c.wrating.com/*"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://c.wrating.com/"
  },
  {
    "filters": [
      "||makemyvids.com^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://makemyvids.com"
  },
  {
    "check": true,
    "filters": [
      "/^https?:\\/\\/([0-9a-z\\-]+\\.)?(9anime|animeland|animenova|animeplus|animetoon|animewow|gamestorrent|goodanime|gogoanime|igg-games|kimcartoon|memecenter|readcomiconline|toonget|toonova|watchcartoononline)\\.[a-z]{2,4}\\/(?!([Ee]xternal|[Ii]mages|[Ss]cripts|[Uu]ploads|ac|ajax|assets|combined|content|cov|cover|(img\\/bg)|(img\\/icon)|inc|jwplayer|player|playlist-cat-rss|static|thumbs|wp-content|wp-includes)\\/)(.*)/$image,other,script,first-party,xmlhttprequest"
    ],
    "sourceUrl": "https://www.watchcartoononline.com",
    "type": "document",
    "url": "https://www.watchcartoononline.com/"
  },
  {
    "filters": [
      "||modulepush.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.modulepush.com"
  },
  {
    "filters": [
      "-ad-home.",
      "@@||hentaihaven.org/*-ad-home.js$script,first-party"
    ],
    "sourceUrl": "http://www.hentaihaven.org",
    "type": "script",
    "url": "http://www.hentaihaven.org/popexit-a3s-ad-home.js"
  },
  {
    "filters": [
      "/adssp."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://spad.i-mobile.co.jp/script/adssp.js"
  },
  {
    "filters": [
      "/160x600-"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://s0.2mdn.net/6785415/160x600-FK-herbst.gif"
  },
  {
    "filters": [
      "||pixel.anyclip.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://pixel.anyclip.com"
  },
  {
    "filters": [
      "||uptimecdn.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://uptimecdn.com"
  },
  {
    "filters": [
      "||analyse.weather.com.cn^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://analyse.weather.com.cn"
  },
  {
    "check": true,
    "filters": [
      "||tw.cx^$third-party",
      "@@||tw.cx/c?a=$xmlhttprequest,domain=justwatch.com"
    ],
    "sourceUrl": "https://www.justwatch.com",
    "type": "xhr",
    "url": "https://i.tw.cx/c?a=3&i="
  },
  {
    "filters": [
      "||dtscout.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://t.dtscout.com"
  },
  {
    "filters": [
      "||onclkds.com^$third-party",
      "||onclkds.com/apu.php$script,redirect=noopjs"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://onclkds.com/apu.php"
  },
  {
    "filters": [
      "@@||disqus.com/next/config.js$script,domain=hentaihaven.org"
    ],
    "sourceUrl": "http://hentaihaven.org",
    "type": "script",
    "url": "https://disqus.com/next/config.js"
  },
  {
    "filters": [
      "||go.pub2srv.com/apu.php$script,redirect=noopjs"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://go.pub2srv.com/apu.php"
  },
  {
    "filters": [
      "||track.cooster.ru^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://track.cooster.ru"
  },
  {
    "filters": [
      "/adwise/*"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://exchange.buzzoola.com/cookiesync/ssp/adwise/"
  },
  {
    "check": true,
    "filters": [
      "||e6916adeb7e46a883.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://e6916adeb7e46a883.com"
  },
  {
    "filters": [
      "||oconner.biz^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://oconner.biz"
  },
  {
    "filters": [
      "/whos.amung.us.classic."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://stream.moe/whos.amung.us.classic.js"
  },
  {
    "filters": [
      "||skroutz.gr/analytics/"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.skroutz.gr/analytics/"
  },
  {
    "filters": [
      "/bc/clk?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://qcommons.qunar.com/bc/clk?"
  },
  {
    "filters": [
      "/www/ad_",
      "/ad_screen."
    ],
    "sourceUrl": "http://",
    "type": "stylesheet",
    "url": "http://s.c.yinyuetai.com/201806131348/css/app/www/ad_screen.css"
  },
  {
    "filters": [
      "/collect/tracking.",
      "/tracking.png?"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://dzby9conl7tl.cloudfront.net/collect/tracking.png?"
  },
  {
    "filters": [
      "||doubleclick.net^$important,script,domain=wired.com"
    ],
    "sourceUrl": "https://www.wired.com",
    "type": "script",
    "url": "https://securepubads.g.doubleclick.net"
  },
  {
    "filters": [
      "||maropost.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://content.maropost.com"
  },
  {
    "filters": [
      "||hellobar.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://my.hellobar.com"
  },
  {
    "filters": [
      "||pixel.condenastdigital.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://pixel.condenastdigital.com"
  },
  {
    "filters": [
      "||infinityid.condenastdigital.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://infinityid.condenastdigital.com"
  },
  {
    "filters": [
      "||condenastdigital.com/content?$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://4d.condenastdigital.com/content?"
  },
  {
    "filters": [
      "||dw.cbsi.com^*/e.gif$image"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://dw.cbsi.com/levt/undefined/e.gif"
  },
  {
    "filters": [
      "||capture.condenastdigital.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://capture.condenastdigital.com"
  },
  {
    "filters": [
      "@@/wp-content/plugins/akismet/*$script,first-party,domain=~gaytube.com|~pornhub.com|~redtube.com|~redtube.com.br|~tube8.com|~tube8.es|~tube8.fr|~xtube.com|~youjizz.com|~youporn.com|~youporngay.com"
    ],
    "sourceUrl": "http://www.shadbase.com",
    "type": "script",
    "url": "http://www.shadbase.com/wp-content/plugins/akismet/"
  },
  {
    "filters": [
      "||collect.yinyuetai.com^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://t.collect.yinyuetai.com"
  },
  {
    "filters": [
      "||eco-tag.jp^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cf.eco-tag.jp"
  },
  {
    "filters": [
      "||d3qxef4rp70elm.cloudfront.net/m.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://d3qxef4rp70elm.cloudfront.net/m.js"
  },
  {
    "filters": [
      "||cbc.ca/g/stats/",
      "@@||cbc.ca/*/cbc-stats-$script,first-party"
    ],
    "sourceUrl": "https://www.cbc.ca",
    "type": "script",
    "url": "https://www.cbc.ca/g/stats/js/cbc-stats-top.js"
  },
  {
    "filters": [
      "||filecrypt.cc/js/$script",
      "@@||filecrypt.cc/js/prototype.js$script"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://www.filecrypt.cc/js/prototype.js"
  },
  {
    "filters": [
      "@@||filecrypt.cc/js/scriptaculous/scriptaculous.js$script"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://www.filecrypt.cc/js/scriptaculous/scriptaculous.js"
  },
  {
    "filters": [
      "@@||filecrypt.cc/js/indexV2.js$script"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://www.filecrypt.cc/js/indexV2.js"
  },
  {
    "filters": [
      "@@||filecrypt.cc/js/indexV2_Plugin.js$script"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://www.filecrypt.cc/js/indexV2_Plugin.js"
  },
  {
    "filters": [
      "@@||filecrypt.cc/js/fcwindow.js$script"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://www.filecrypt.cc/js/fcwindow.js"
  },
  {
    "filters": [
      "||webtradehub.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://ssp-nj.webtradehub.com"
  },
  {
    "filters": [
      "@@||filecrypt.cc/js/scriptaculous/effects.js$script"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://www.filecrypt.cc/js/scriptaculous/effects.js"
  },
  {
    "filters": [
      "@@||filecrypt.cc/js/scriptaculous/builder.js$script"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://www.filecrypt.cc/js/scriptaculous/builder.js"
  },
  {
    "filters": [
      "@@||filecrypt.cc/js/scriptaculous/dragdrop.js$script"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://www.filecrypt.cc/js/scriptaculous/dragdrop.js"
  },
  {
    "filters": [
      "@@||filecrypt.cc/js/scriptaculous/controls.js$script"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://www.filecrypt.cc/js/scriptaculous/controls.js"
  },
  {
    "filters": [
      "||ads-trk.vidible.tv^",
      ".tv/ads/"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ads-trk.vidible.tv/ads/"
  },
  {
    "filters": [
      "||advertur.ru^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://ddnk.advertur.ru"
  },
  {
    "filters": [
      "/showad_"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://cache.betweendigital.com/code/showad_full_sync.js"
  },
  {
    "filters": [
      "||gsspat.jp^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://rt.gsspat.jp"
  },
  {
    "filters": [
      "/textad_"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://cdn.cpmstar.com/cached/js/textad_async_v100.pack.js"
  },
  {
    "filters": [
      "/beacon/metrics"
    ],
    "sourceUrl": "https://",
    "type": "other",
    "url": "https://www.semanticscholar.org/beacon/metrics"
  },
  {
    "filters": [
      "_adtags."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.sify.com/analytics/fullstory_adtags.js"
  },
  {
    "filters": [
      "_chartbeat.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.sify.com/analytics/news_chartbeat.js"
  },
  {
    "filters": [
      "@@/wp-content/plugins/akismet/*$script,first-party,domain=~gaytube.com|~pornhub.com|~redtube.com|~redtube.com.br|~tube8.com|~tube8.es|~tube8.fr|~xtube.com|~youjizz.com|~youporn.com|~youporngay.com"
    ],
    "sourceUrl": "http://www.shadbase.com",
    "type": "script",
    "url": "http://www.shadbase.com/wp-content/plugins/akismet/"
  },
  {
    "filters": [
      "||adxxx.me^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://st.adxxx.me"
  },
  {
    "filters": [
      "||utrack.hexun.com^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://utrack.hexun.com"
  },
  {
    "filters": [
      "/GARecord^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://www.tripadvisor.co.uk/GARecord"
  },
  {
    "filters": [
      "||arsdev.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.accelerator.arsdev.net"
  },
  {
    "filters": [
      "||nuvidp.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://t.nuvidp.com"
  },
  {
    "filters": [
      "||cnt.nuvid.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://cnt.nuvid.com"
  },
  {
    "filters": [
      "||cloudfront.net^$image,script,subdocument,domain=171gifs.com|1proxy.de|2ddl.download|300mbfilms.co|300mbfilms.org|321jav.com|353online.com|4archive.org|4horlover.blogspot.com|4horlover2.blogspot.com|4proxy.de|61tube.com|69sugar.com|6jav.com|6teentube.am|786zx.com|7starhd.com|9xmovies.site|abcmalayalam.co|abgdianci.com|adbull.me|addic7ed.com|adultdouga.biz|aflamfree.net|aflamtorrent.com|agarios.org|ahlamtv.com|alivefoot.us|alivefootballstreaming.com|allpeliculas.com|amabitch.com|amateur.ug|ancensored.com|andrija-i-andjelka.com|anime-music.info|anime-shitai.tv|anime-sugoi.com|animeado.net|animeai2.net|animeflv.net|animehaven.to|animelek.com|animemusicdownload.info|animesenzalimiti.com|animesonline2hd.org|animesonlinetk.info|animesorion.org|animezone.pl|anitube.es|antenasport.eu|anyanime.com|apklover.net|aquariumgays.com|arab-moviez.org|arabp2p.com|archived.moe|artgifsocean.com|asianporndistrict.com|asianxv.com|assistirfilmeshd.org|assistirfilmesonline2.net|auroravid.to|avpockiehd.com|axxomovies.in|azkempire.com|aznude.com|baixarsomusica.com|bajarjuegospcgratis.com|bakacan.com|balkandownload.org|balkanje.com|bdmusicboss.net|bdsmporn.us|bdupload.info|beautiesbondage.com|becekin.net|beelink.in|beforeitsnews.com|behchala.com|beinsport-streaming.com|bestsongspk.com|big4umovies.net|bilasport.pw|biology-online.org|bittorrent.am|bitvid.sx|blackboxrepack.com|blacklionmusic.com|blogqpot.com|bludv.com|bmovies.to|bokep2017.com|bokepcewek.net|bokepseks.co|bolly2tolly.com|bouncebreak.com|brazzershd.co|btdb.in|bugiltelanjang17.com|calcioitalia.stream|camrouge.com|camwhores.co|cartoonhd.cc|cartoonth12.com|catosports.ml|centraldeanimes.biz|cholotubex.com|chronos.to|cinemamkv.xyz|cinetux.net|cliphayho.com|cloudtime.to|cloudyfiles.co|coastalhut.com|columbia-xxx.com|comicporno.org|cookiesnetfl1x.com|cooltamil.com|coreimg.net|coroas40.com|couchtuner.fr|couchtuner.nu|crackingpatching.com|cricbox.net|croco.site|cwtube.dj|czechmoneyteens.com|dailyuploads.net|dblatino.com|dbzsuper.tv|dclinks.info|dd-books.com|debrideco.com|demonoid.co|depedlps.blogspot.com|desixnxx.net|devil-torrents.pl|digitalmusicnews.com|discografiascompletas.net|djmazamp3.info|donlotfile.com|download-xyz.com|downloadgameps3.com|downloadgamepsp.com|downloadgamexbox.com|downloadming.io|downloadming.tv|drakorindo.com|drakorindofilms.com|drhmonegyi.net|dvdwap.com|dzrepackteam.com|e-hentai.me|e-jav.com|edmdl.com|ekasiwap.com|electro-torrent.pl|embedlink.info|embedsr.to|erodouga69.com|erostar.jp|estrenosdoramas.net|estrenosdoramas.org|etsmods.net|eurostreaming.video|exposure.pw|extremetech.com|eztv.ag|fagken.com|fastdrama.co|felipephtutoriais.com.br|file-upload.com|filerocks.us|filmaon.com|filmclub.tv|filmehd.net|filmeserialeonline.org|filmeseseriesonline.net|filmesonline1080p.com|filmesonline4.com|filmesonlineagora.com|filmesonlineplay.com|filmesonlinex.biz|filmetraduseonline.ro|filmi7.com|filminvazio.com|filmozu.net|filmuptobox.net|filsex.com|flashbd24.blogspot.com|flyordie.com|freeadultcomix.com|freeiptvlinks.net|freelivesports.co|freesoftwaredlul.com|frendz4m.com|fulldowngames.biz|fullmaza.net|fullpinoymovies.net|fullstuff.co|futebolps2.com|fxporn.net|gameofporn.net|gamepciso.com|gamestorrent.co|garotosbrasil.com|gaycock4u.com|gaysex69.net|gibanica.club|girlswithmuscle.com|gogoanime.ch|goodvideohost.com|gottateens.com|grantorrent.net|gravuregirlz.com|grcrt.net|guasavemp3.com|hacknetfl1x.net|halacima.net|happy-foxie.com|haylike.net|hdarkzone.com|hdencoders.com|hdmovie16.ws|hdmovie24.net|hdmusic23.net|hdmusic25.com|hdmusic90.co|hdporner720.com|hdpornfull.co|hdpornfull.net|hdshows.in|hdteenvids.com|hdtube.co|hdvid.life|hdvid.tv|hdvid.xyz|hdzex.net|healthsoul.info|hentai-for.me|hentai-id.tv|hentai.to|hentaicomicsbr.net|hentaiplay.net|hentaiplus.co|hentaistream.co|her69.net|herobo.com|hindimoviesonlines.net|hiper.cool|hkfree.co|homeporn.tv|hon3yhd.com|hyperdebrid.net|i-gay.org|icwutudidare.info|idolblog.org|igg-games.com|ightdl.xyz|iimgur.club|ilinks.ug|ilovefilmesonline.biz|image-bugs.com|imgsmile.com|incestoporno.org|insharee.com|iprojectfreetv.us|iptvsatlinks.blogspot.com|itastreaming.gratis|ivhunter.com|izporn.net|jav-for.me|javeu.com|javgay.com|javhd.pro|javhd4k.com|javkimochiii.com|javleak.com|javmobile.net|javmost.com|javonline.online|javpob.com|javrom.com|javstream.co|javus.net|jazztv.co|jdownloader2premium.com|jilhub.xyz|jizzman.com|jogostorrentgratis.net|jpfiles.eu|jpgayporn.net|jpidols.tv|k18.co|kannadamovies.biz|katcr.host|kimcartoon.me|kingstheme.com|kizzboy.com|kooora2day.com|koraspeak.com|koreansubindo.net|kreskowkazone.pl|kreskowki.tv|kshowes.net|lacajita.xyz|lambingan.su|layar-21.com|layarindo21.com|lecheanal.com|leech.ae|leosims.com|letsjav.com|letwatch.to|link2download.net|linksprotection.com|linx.cloud|livehd90m.info|livesoccertv.live|livestreaming24.net|loonertube.com|lyricsy.ir|macgames-download.com|macnwins.com|mactorrents.org|macupload.net|magesy.be|manatelugump3.net|mangacanblog.com|maniacosporcomics.com|marapcana.eu|marvin-vibez.to|masflowmusik.net|masterfilmesonlinegratis.info|maxinlive.com|media1fire.com|megafilmeshdplus.org|megafodabr.com|megahentaicomics.com|megaseriesonline.com|megatobox.net|meguminime.com|metaserie.com|milversite.me|minatosuki.com|minhaserie.me|mitemovie.com|mixhdporn.com|mkvtv.net|mmfilmes.com|mocnoi.com|modelblog.org|movie24k.ch|movieerotic.net|moviehd-free.com|moviehd-xxx.com|movierulz.ch|movierulz.cm|movierulz.xyz|movies24hd.co|movies5x.com|moviesak47.com|moviesgoldonline.net|moviesgoldonline.pro|movieshdgratis.com.mx|movietubenow.bz|movietv.ws|moviezplanet.org|movieztimes.com|mp3goo.com|mp3haat.com|mp3kart.co|mp3kart.com|mp3mydownload.com|mp3puu.com|mp3songdl.net|multiup.org|musculoduro.com.br|muvibg.com|mylucah.co|mymoviepot.xyz|mystream.la|mzansifun.com|mzansiporntube.com|mzansixxx.com|nachostime.net|namethatpornstar.com|naphi.lol|nasze-kino.online|nbafullhd.com|neko-miku.com|nekonime.com|newhdmovie24.biz|newhdmovie24.co|newhdmovies.net|newpct.com|newpct1.com|nflstream.net|ngentot.tv|ninfetasnovinhas.net|nitroflare.com|nontononlinedrama.com|noslocker.com|nosteam.com.ro|nowvideo.li|nowvideo.sx|nowvideo.to|nudeyoung.xyz|nulledcenter.com|nungg.com|nuttit.com|nxtcomicsclub.com|ocean0fgames.com|ocsstream.info|ohohd.com|ohyeah1080.com|okmovie-hd.com|olangal.pro|omberbagi.com|omghype.com|ondeeubaixo.com|one-series.cc|onhax.me|onlinefilmovisaprevodom.cc|onlinefilmsitesii.net|onlinemoviesgold.one|onlinemoviesprime.net|onvid.club|onvid.xyz|openload.co|openx.tv|opujem.com|otaku-animehd.com|otorrents.com|ottakae.com|ouo.io|peliculasgo.com|peliculasm.tv|peliculasmega1k.com|peliculastomas01.org|pelisplus.tv|pelisxporno.com|pentasex.com|perfecthdmovies.pw|perulareshd.pw|phimotv.net|picanteeproibido.com.br|pinaycute.com|pipocao.com|pirateaccess.xyz|piratebay.co.in|pirateiro.com|planetsport.pw|playbokep.me|playpornfree.net|pleermp3.net|pokemonlaserielatino.com|polskie-torrenty.com|popjav.com|porneq.com|pornfromcz.com|pornfromczech.com|pornhardx.com|pornhd5k.com|pornhubz.tumblr.com|pornleak.net|pornlibrary.net|pornobae.com|pornocomics.net|pornotorrent.com.br|pornotorrent.org|pornpassw0rds.com|pornsexonline.xxx|pornvibe.org|pornvxl.com|portalroms.com|portalultautv.com|primewire.io|programasvirtualespc.net|projectfreetvhd.co|projectfreetvi.info|psarips.com|pure-anime.tv|pussybook.xyz|putlockertv.se|q3sk-dizi.blogspot.com|querofilmehd.com|r34anim.com|rapcloud.co|reallifecamhd.com|reallifecamvd.com|reevown.com|rgmechanicsgames.com|ripvod.com|rosextube.com|runvideo.net|sadeempc.com|savvystreams.blogspot.co.uk|savvystreams.blogspot.com|scambiofile.info|sceper.ws|sdmoviespoint.in|serialed.blogspot.com|series-cravings.tv|seriesblanco.tv|seriescr.com|seriesfuture.com|seriesintorrent.com|serieslatino.tv|seriesparaassistironline.org|seriesparalatinoamerica.blogspot.com|serietvsubita.net|sexisfree.net|sexix.net|sexiz.net|sexloading.com|sexvui.net|sexxdesi.net|sexy-youtubers.com|sexyeroticgirls.com|shofonline.org|shush.se|sinevizyonda.org|singgah.in|sitpad.info|skidrowcrack.com|sklns.net|soccerembed.blogspot.com|solotorrent.net|soparagamestorrents.com|spacemov.tv|sparknotes.com|speedplay.pro|sports4u.net|stadium-live.biz|stream2watch.org|streamingok.com|streamlord.com|streamplay.to|suki48.web.id|superteenz.com|suprafiles.co|suprafiles.org|sweext.com|tamilmv.vc|tamilrasigan.net|teenboytwink.com|teentubeq.com|tele-wizja.com|telugudon.com|telugupalaka.com|teluguringtones.co|telugusexstorieskathalu.net|temp-mail.org|textsfromlastnight.com|theapricity.com|thebarchive.com|thebestofcafucus.com|thecoolersoftwares.net|thepiratebay.cd|thepiratebay.org|thepiratebay24.ga|thepiratebay3.org|theputlocker.net|thesimplebay.pro|thevideobee.to|thiruttuvcd.me|tinypaste.me|tlenovelas.net|todaypk.li|todoinmega.com|tokusatsuindo.com|torjackan.info|torlock.com|torrentcounter.cc|torrentfilmesbr.com|torrentfunk.com|torrentlocura.com|torrentool.com|torrentoon.com|torrentproject.se|torrentrapid.com|torrentscompletos.com|torrentsgroup.com|tousatu.biz|tr7music.me|tsumino.com|tubeoffline.com|tuhentaionline.com|tumejortorrent.com|tuportaldemusica.com|turkishseries.li|tuserie.com|tushyporn.net|tvlivenow.com|tvrex.net|twitchstats.net|ufreetv.com|unblocked.cam|unduhfilmrama.biz|upcomics.org|upload.so|uporniahd.com|usabit.com|usersfiles.com|utaseries.co|utaseries.com|uwatchfree.co|v100v.net|vdizpk.com|veekyforums.com|vercanalestv.com|verdirectotv.com|verpeliculasporno.gratis|vertusnovelas.net|veyqo.net|veziserialeonline.info|vibokep.info|video.az|videobokepgratis.me|videobokepincest.xyz|videoexa.com|videosexbokep.org|videosnudes.com|vidiobokeptop.com|vidlox.tv|vidshare.us|vidtome.co|vidz7.com|viralshow.info|vivatorrents.com|viveseries.com|vivetusnovelas.com|vixvids.to|vpondo.com|vpornex.com|vshare.eu|watchaha.com|watcharcheronline.com|watchcommunity.tv|watchers.to|watchfomny.tv|watchjavidol.com|watchjavonline.com|watchparksandrecreation.cc|watchpornfree.me|watchtheofficeonline.cc|wetblog.org|wholecloud.net|wibudesu.com|wolverdon-filmes.com|world4ufree.be|world4ufree.ws|worldvidz.com|wplocker.com|xdvideos.org|xfilmywap.com|xgatinhas.com|xkorean.net|xmovies1.com|xmovies247.com|xmovies8.org|xrares.com|xteenchan.com|xvideospanish.com|xxgasm.com|xxhdporn.com|xxx-comics.com|yahmaib3ai.com|yallakora-online.com|yedhit.com|yeucontrai.com|yify-torrent.xyz|yify.bz|yodrama.com|youpornzz.com|yourbittorrent.com|yourvideohost.com|youswear.com|ytsyify.com|yuptorrents.com|yuuk.net|zambianobserver.com|zfilmeonline.eu|zippymoviez.top|zippysharealbum.download|zonavideo.net|zone-series.cc|zone-telechargement.ws|zoocine.co|zw-net.com"
    ],
    "sourceUrl": "http://www.file-upload.com",
    "type": "script",
    "url": "https://d31qbv1cthcecs.cloudfront.net"
  },
  {
    "check": true,
    "filters": [
      "||amazonaws.com^$third-party,xmlhttprequest,domain=300mbdownload.net|300mbfilms.co|bdupload.info|bigfile.to|bittorrent.am|ddlvalley.cool|file-upload.com|frendz4m.com|fullstuff.co|hdvid.life|hdvid.tv|hdvid.xyz|katcr.host|macupload.net|nachostime.net|ocean0fgames.com|onhax.me|onvid.club|onvid.xyz|rgmechanicsgames.com|sadeempc.com|serietvsubita.net|suprafiles.org|thevideobee.to|tinypaste.me|tsumino.com|tvlivenow.com|vidlox.tv|vidshare.us|vshare.eu|watchers.to|wizhdsports.is|yourvideohost.com"
    ],
    "sourceUrl": "http://www.file-upload.com",
    "type": "xhr",
    "url": "http://s3-us-west-2.amazonaws.com"
  },
  {
    "filters": [
      "||ywxi.net/meter/"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://cdn.ywxi.net/meter/"
  },
  {
    "filters": [
      "||fsdvydpldxrbu.com^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.fsdvydpldxrbu.com"
  },
  {
    "filters": [
      "/log.collect.",
      "/view-log?",
      "-log?referUrl="
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://log.collect.yinyuetai.com/view-log?referUrl=&1540303448427"
  },
  {
    "filters": [
      "/uo-stat?"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://log.collect.yinyuetai.com/uo-stat?"
  },
  {
    "filters": [
      "||stats.yinyuetai.com^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://v.stats.yinyuetai.com"
  },
  {
    "filters": [
      "||vatrack.hinet.net^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "http://vatrack.hinet.net"
  },
  {
    "filters": [
      "&adbannerid="
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://s0.2mdn.net/1635909/1x1image.jpg?&adbannerid="
  },
  {
    "filters": [
      "/chartbeat/*"
    ],
    "sourceUrl": "https://",
    "type": "fetch",
    "url": "https://www.cbc.ca/chartbeat/"
  },
  {
    "filters": [
      "||pclick.yahoo.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://pclick.yahoo.com"
  },
  {
    "filters": [
      "||secureserver.net^*/event?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://img.secureserver.net/t/1/tl/event?"
  },
  {
    "filters": [
      "||eultech.fnac.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://eultech.fnac.com"
  },
  {
    "filters": [
      "@@||tags.bkrtx.com/js/bk-coretag.js$domain=tmz.com|zillow.com"
    ],
    "sourceUrl": "http://m.tmz.com",
    "type": "script",
    "url": "http://tags.bkrtx.com/js/bk-coretag.js"
  },
  {
    "filters": [
      "/na.ads."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://na.ads.yahoo.com"
  },
  {
    "filters": [
      "||qbox.me/vds.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://dn-growing.qbox.me/vds.js"
  },
  {
    "filters": [
      "||euleriancdn.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://eu.euleriancdn.net"
  },
  {
    "filters": [
      "||tr.cloud-media.fr^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://tr.cloud-media.fr"
  },
  {
    "filters": [
      ".jp/pv?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://collect.ptengine.jp/pv?"
  },
  {
    "filters": [
      "||pubnation.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://report-ads-to.pubnation.com"
  },
  {
    "filters": [
      "||amazonaws.com/js/reach.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://simple-cdn.s3.amazonaws.com/js/reach.js"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "script",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "||vpon.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://m.vpon.com"
  },
  {
    "filters": [
      "/footer_ads_"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://www.nuvid.com/footer_ads_tiz.php"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "||mail.ru/grstat?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://my.mail.ru/grstat?"
  },
  {
    "filters": [
      "/weizenbock/dist/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.clarin.com/weizenbock/dist/"
  },
  {
    "filters": [
      "||readthedocs.org*/sustainability/"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://readthedocs.org/api/v2/sustainability/"
  },
  {
    "check": true,
    "filters": [
      "||api.taboola.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://api.taboola.com"
  },
  {
    "filters": [
      "||ui-portal.com/1and1/mailcom/s?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://us.wa.ui-portal.com/1and1/mailcom/s?"
  },
  {
    "filters": [
      "/pixel.fingerprint."
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://www.clarin.com/weizenbock/pixel.fingerprint.gif"
  },
  {
    "filters": [
      "@@||cbc.ca/g/stats/videoheartbeat/*/cbc-videoheartbeat.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.cbc.ca/g/stats/videoheartbeat/v1/cbc-videoheartbeat.js"
  },
  {
    "filters": [
      "||sankei.co.jp/js/analytics/"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://smp.sankei.co.jp/js/analytics/"
  },
  {
    "filters": [
      "||mmi.bemobile.ua^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://source.mmi.bemobile.ua"
  },
  {
    "filters": [
      "||trmit.com^$third-party",
      "||trmit.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.trmit.com"
  },
  {
    "filters": [
      ".br/ads/"
    ],
    "sourceUrl": "https://",
    "type": "stylesheet",
    "url": "https://estudio.folha.uol.com.br/ads/"
  },
  {
    "check": true,
    "filters": [
      "||leadplace.fr^",
      "||tag.leadplace.fr^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tag.leadplace.fr"
  },
  {
    "check": true,
    "filters": [
      "||web.adblade.com^$third-party",
      "||adblade.com^",
      "||adblade.com^$third-party",
      "/ads/async/*"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://web.adblade.com/js/ads/async/"
  },
  {
    "filters": [
      ".net/ads-"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://c.smartclick.net/ads-async.js"
  },
  {
    "filters": [
      "/adclix."
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://orbitfour47.com/adclix.png"
  },
  {
    "filters": [
      "/services/ads/*"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "https://clinic.niniban.com/Services/Ads/"
  },
  {
    "filters": [
      "||smrk.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://b.smrk.io"
  },
  {
    "filters": [
      "||optad360.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://get.optad360.io"
  },
  {
    "filters": [
      "/impression.js?"
    ],
    "sourceUrl": "http://",
    "type": "xhr",
    "url": "http://www.ilbe.com/xea/impression.js?"
  },
  {
    "filters": [
      "/myads/*"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://www.ilbe.com/myads/"
  },
  {
    "filters": [
      "||tapfiliate.com^",
      "||tapfiliate.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static.tapfiliate.com"
  },
  {
    "filters": [
      "||fbcdn2.com^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.fbcdn2.com"
  },
  {
    "filters": [
      "||sajari.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.sajari.com"
  },
  {
    "filters": [
      "@@||sankakucomplex.com^$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.sankakucomplex.com"
  },
  {
    "filters": [
      "||otaserve.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://d.otaserve.net"
  },
  {
    "filters": [
      "||trafficsan.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://eki.trafficsan.com"
  },
  {
    "filters": [
      "||segmentify.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.segmentify.com"
  },
  {
    "filters": [
      "||onclasrv.com^$third-party",
      "||onclasrv.com^",
      "||go.onclasrv.com/apu.php$script,redirect=noopjs"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://go.onclasrv.com/apu.php"
  },
  {
    "filters": [
      "|http://$script,domain=perfectgirls.es|perfectgirls.net|perfektdamen.co"
    ],
    "sourceUrl": "http://m.perfectgirls.net",
    "type": "script",
    "url": "http://"
  },
  {
    "filters": [
      "@@/wp-content/plugins/akismet/*$script,first-party,domain=~gaytube.com|~pornhub.com|~redtube.com|~redtube.com.br|~tube8.com|~tube8.es|~tube8.fr|~xtube.com|~youjizz.com|~youporn.com|~youporngay.com"
    ],
    "sourceUrl": "https://www.sankakucomplex.com",
    "type": "script",
    "url": "https://www.sankakucomplex.com/wp-content/plugins/akismet/"
  },
  {
    "filters": [
      "||pvclouds.com^",
      "||pvclouds.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://pl2674.pvclouds.com"
  },
  {
    "filters": [
      "||log.flight.qunar.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://log.flight.qunar.com"
  },
  {
    "filters": [
      "||t.cfjump.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://t.cfjump.com"
  },
  {
    "filters": [
      "/popunder2."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://ads.exosrv.com/popunder2.js"
  },
  {
    "filters": [
      "||analights.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://backend2.analights.com"
  },
  {
    "filters": [
      "@@/wp-content/plugins/akismet/*$script,first-party,domain=~gaytube.com|~pornhub.com|~redtube.com|~redtube.com.br|~tube8.com|~tube8.es|~tube8.fr|~xtube.com|~youjizz.com|~youporn.com|~youporngay.com"
    ],
    "sourceUrl": "https://www.sankakucomplex.com",
    "type": "script",
    "url": "https://www.sankakucomplex.com/wp-content/plugins/akismet/"
  },
  {
    "filters": [
      "||squid.gazeta.pl/bdtrck/"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://squid.gazeta.pl/bdtrck/"
  },
  {
    "filters": [
      "||log.olark.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://log.olark.com"
  },
  {
    "filters": [
      "/ntpagetag."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://cisco-tags.cisco.com/tag/ntpagetag.gif"
  },
  {
    "filters": [
      "_advertising."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://c1hit.tut.by/stat/684/51448/img/154030349/6177_advertising.gif"
  },
  {
    "filters": [
      "||tm-awx.com/felix.min.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://felix.data.tm-awx.com/felix.min.js"
  },
  {
    "filters": [
      "||d3alqb8vzo7fun.cloudfront.net^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://d3alqb8vzo7fun.cloudfront.net"
  },
  {
    "filters": [
      "||web.tmearn.com^"
    ],
    "sourceUrl": "https://tmearn.com",
    "type": "image",
    "url": "https://web.tmearn.com"
  },
  {
    "filters": [
      "/rtoaster.js",
      "||rtoaster.jp^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://js.rtoaster.jp/Rtoaster.js"
  },
  {
    "filters": [
      "/ad/index."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.onlinedown.net/Public/js/newjs/ad/index.js"
  },
  {
    "filters": [
      "||watchmygf.to^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.watchmygf.to"
  },
  {
    "filters": [
      "||dotmetrics.net^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://script.dotmetrics.net"
  },
  {
    "filters": [
      "/adunit/*$domain=~propelmedia.com"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://hb.adtelligent.com/adunit/"
  },
  {
    "filters": [
      "/friendbuy.min.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://djnf6e5yyirys.cloudfront.net/js/friendbuy.min.js"
  },
  {
    "filters": [
      "@@||folha.uol.com.br/paywall/js/1/publicidade.ads.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static.folha.uol.com.br/paywall/js/1/publicidade.ads.js"
  },
  {
    "filters": [
      "||friendbuy.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://cdn1.friendbuy.com"
  },
  {
    "filters": [
      "/worldwide_analytics/*",
      "@@||akamaihd.net/worldwide_analytics/$script,domain=ubi.com|ubisoft.com"
    ],
    "sourceUrl": "https://www.ubisoft.com",
    "type": "script",
    "url": "https://ubistatic2-a.akamaihd.net/worldwide_analytics/"
  },
  {
    "filters": [
      "||zappos.com/karakoram/js/main."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.zappos.com/karakoram/js/main.f3394d9.js"
  },
  {
    "filters": [
      "||zedo.com^$script,important,domain=indiatoday.in|intoday.in"
    ],
    "sourceUrl": "https://www.indiatoday.in",
    "type": "script",
    "url": "https://saxp.zedo.com"
  },
  {
    "filters": [
      "/referrer_tracking."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://livestream.com/assets/plugins/referrer_tracking.js"
  },
  {
    "filters": [
      "/smetrics.*/id?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://smetrics.mcafee.com/id?"
  },
  {
    "filters": [
      "||uol.com.br/stats?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://stats1.folha.uol.com.br/stats?"
  },
  {
    "filters": [
      "||analytics.ziftsolutions.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://analytics.ziftsolutions.com"
  },
  {
    "filters": [
      "||filez.cutpaid.com/336v"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://filez.cutpaid.com/336v1.png"
  },
  {
    "filters": [
      "||go.toutapp.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://go.toutapp.com"
  },
  {
    "filters": [
      "/homepage/analytics."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.airtel.in/app/libs/edited/homepage/analytics.js"
  },
  {
    "filters": [
      "||zappos.com/*.cgi?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://m.zappos.com/event.cgi?"
  },
  {
    "filters": [
      "/track.cgi?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://m.zappos.com/track.cgi?"
  },
  {
    "filters": [
      "/prehead/ads_",
      "/ads_detect."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.theweathernetwork.com/js/en_ca/1377/prehead/ads_detect.js"
  },
  {
    "filters": [
      "||pagead2.googlesyndication.com^$script,important,domain=indiatoday.in|intoday.in"
    ],
    "sourceUrl": "https://www.indiatoday.in",
    "type": "script",
    "url": "https://pagead2.googlesyndication.com"
  },
  {
    "filters": [
      "||d169bbxks24g2u.cloudfront.net^"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://d169bbxks24g2u.cloudfront.net"
  },
  {
    "filters": [
      "/martypixel?"
    ],
    "sourceUrl": "https://",
    "type": "other",
    "url": "https://m.zappos.com/martypixel?"
  },
  {
    "filters": [
      "/dfpad/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.theweathernetwork.com/js/en_ca/r1377/mobile/modules/dfpad/"
  },
  {
    "filters": [
      "/analytic/count."
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://www.aksam.com.tr/analytic/count.asp"
  },
  {
    "filters": [
      "||userreplay.net^",
      "||userreplay.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.userreplay.net"
  },
  {
    "filters": [
      "||veinteractive.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://config1.veinteractive.com"
  },
  {
    "filters": [
      ".com/_.gif?"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://b.meituan.com/_.gif?"
  },
  {
    "filters": [
      "://affiliates.$third-party",
      "/ret_pixels/*"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://affiliates.rozetka.com.ua/ret_pixels/"
  },
  {
    "filters": [
      "||afterview.ru^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://afterview.ru"
  },
  {
    "filters": [
      "||analytics.livestream.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://analytics.livestream.com"
  },
  {
    "filters": [
      "||a.mobify.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://a.mobify.com"
  },
  {
    "filters": [
      "/ads.gif"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://zarpop.com/template/site/images/ads/ads.gif"
  },
  {
    "filters": [
      "||getblueshift.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.getblueshift.com"
  },
  {
    "filters": [
      "/videojs.ads-"
    ],
    "sourceUrl": "https://",
    "type": "stylesheet",
    "url": "https://static.vodgc.net/player/v2/videojs.ads-5.1.5.min.css"
  },
  {
    "filters": [
      "@@||scorecardresearch.com/c2/plugins/streamsense_plugin_html5.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://sb.scorecardresearch.com/c2/plugins/streamsense_plugin_html5.js"
  },
  {
    "filters": [
      "-event-tracking."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://api.vodgc.net/libs/player/v2/genoa-event-tracking.min.js"
  },
  {
    "filters": [
      "||ad.mangareader.net^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ad.mangareader.net"
  },
  {
    "filters": [
      ".bid^$script,third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://srv.aftv-serving.bid"
  },
  {
    "filters": [
      "||rkdms.com/sid.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://mct.rkdms.com/sid.gif?"
  },
  {
    "check": true,
    "filters": [
      "||piguiqproxy.com^$xmlhttprequest,redirect=nooptext,domain=baskino.me"
    ],
    "sourceUrl": "http://baskino.me",
    "type": "xhr",
    "url": "http://piguiqproxy.com"
  },
  {
    "filters": [
      "||gmads.net^$third-party",
      "||gmads.net^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://gmads.net"
  },
  {
    "filters": [
      "_popunder_"
    ],
    "sourceUrl": "http://",
    "type": "xhr",
    "url": "http://ampatcape.com/_popunder_"
  },
  {
    "filters": [
      "||123rf.com/tk/"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://bdt.123rf.com/tk/"
  },
  {
    "filters": [
      "||eoredi.com^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.eoredi.com"
  },
  {
    "filters": [
      "||convrse.media^$third-party",
      "||convrse.media^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://get.convrse.media"
  },
  {
    "filters": [
      "||shinystat.com^",
      "||shinystat.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://codicebusiness.shinystat.com"
  },
  {
    "filters": [
      "/webtracking/*$~subdocument"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://rns.matelso.de/webtracking/"
  },
  {
    "filters": [
      "/openxtargeting.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.panet.co.il/js/panet/openxTargeting.js"
  },
  {
    "filters": [
      "/cube_ads/*"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://pms.panet.co.il/online/images/cube_ads/"
  },
  {
    "filters": [
      "||technoratimedia.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://smartwrapper.technoratimedia.com"
  },
  {
    "filters": [
      "||adgebra.co.in^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://adgebra.co.in"
  },
  {
    "filters": [
      "/adserving/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://adgebra.co.in/AdServing/"
  },
  {
    "filters": [
      "||youramigo.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://jslog.youramigo.com"
  },
  {
    "filters": [
      "/fortvision-fb-web.",
      "||fortvision.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://resources.fortvision.com/staticfiles/fb-web/js/fortvision-fb-web.js"
  },
  {
    "filters": [
      "||hubvisor.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.hubvisor.io"
  },
  {
    "filters": [
      "||securite.01net.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://securite.01net.com"
  },
  {
    "filters": [
      "||cdnquality.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdnquality.com"
  },
  {
    "filters": [
      "||torrentdownloads.me/*.gif$image"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.torrentdownloads.me/templates/new/images/one3.gif"
  },
  {
    "filters": [
      "||shermore.info^",
      "||shermore.info^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://shermore.info"
  },
  {
    "filters": [
      "||geni.us^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://geni.us"
  },
  {
    "filters": [
      "/bluekai/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://b1sync.zemanta.com/usersync/bluekai/"
  },
  {
    "filters": [
      "||viralize.tv/track/"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ads.viralize.tv/track/"
  },
  {
    "filters": [
      "||quantum-advertising.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://wrappercdn.quantum-advertising.com"
  },
  {
    "filters": [
      "||ownpage.fr^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://script.ownpage.fr"
  },
  {
    "filters": [
      "||madadsmedia.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://ads-by.madadsmedia.com"
  },
  {
    "filters": [
      "/stats.php?type="
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://stats2.panet.co.il/stats.php?type=story&sID=2360110"
  },
  {
    "filters": [
      "@@||g.doubleclick.net/gpt/pubads_impl_$script,domain=mashable.com"
    ],
    "sourceUrl": "https://mashable.com",
    "type": "script",
    "url": "https://securepubads.g.doubleclick.net/gpt/pubads_impl_266.js"
  },
  {
    "filters": [
      "@@||amazon-adsystem.com/*/apstag.js$script,domain=mashable.com"
    ],
    "sourceUrl": "https://mashable.com",
    "type": "script",
    "url": "https://c.amazon-adsystem.com/aax2/apstag.js"
  },
  {
    "filters": [
      "||pages03.net/WTS/event.jpeg?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.pages03.net/WTS/event.jpeg?"
  },
  {
    "filters": [
      "@@||productads.hlserve.com^$script,domain=argos.co.uk"
    ],
    "sourceUrl": "https://www.argos.co.uk",
    "type": "script",
    "url": "https://retail-eu.productads.hlserve.com"
  },
  {
    "filters": [
      "||zvsuhljiha-a.akamaihd.net^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://zvsuhljiha-a.akamaihd.net"
  },
  {
    "filters": [
      "/viewad/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://s0.2mdn.net/viewad/"
  },
  {
    "filters": [
      "||vox-cdn.com/campaigns_images/"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://cdn.vox-cdn.com/campaigns_images/"
  },
  {
    "filters": [
      "_adsetup."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://pad.mymovies.it/v12/include/adv/manzoni/ver1/mnz_adsetup.js"
  },
  {
    "filters": [
      "/player/ads."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://pad.mymovies.it/v12/script/player/ads.js"
  },
  {
    "filters": [
      "||assoc-amazon.com^$third-party",
      "||assoc-amazon.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://wms.assoc-amazon.com"
  },
  {
    "filters": [
      "||rumble.com/l/$image"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://rumble.com/l/"
  },
  {
    "filters": [
      "||trafforsrv.com^",
      "||trafforsrv.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://trafforsrv.com"
  },
  {
    "filters": [
      "||mixadvert.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://m.mixadvert.com"
  },
  {
    "filters": [
      "||adv.wp.pl^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://adv.wp.pl"
  },
  {
    "filters": [
      "||audrte.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://a.audrte.com"
  },
  {
    "filters": [
      "||videoplaza.tv^$third-party,image"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ssp.videoplaza.tv"
  },
  {
    "filters": [
      "||dot.wp.pl^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://dot.wp.pl"
  },
  {
    "filters": [
      "/hyper-assets/*$script,domain=aftonbladet.se",
      "@@/hyper-assets/preload*$script,domain=aftonbladet.se"
    ],
    "sourceUrl": "https://www.aftonbladet.se",
    "type": "script",
    "url": "https://www.aftonbladet.se/hyper-assets/preload.f36b616f8f3bea0dc728.js"
  },
  {
    "filters": [
      "@@/hyper-assets/app*$script,domain=aftonbladet.se"
    ],
    "sourceUrl": "https://www.aftonbladet.se",
    "type": "script",
    "url": "https://www.aftonbladet.se/hyper-assets/app.f36b616f8f3bea0dc728.js"
  },
  {
    "filters": [
      "||session.timecommerce.net^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://session.timecommerce.net"
  },
  {
    "filters": [
      "||bizrate.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://chirp.bizrate.com"
  },
  {
    "filters": [
      "||javfor.me/*/banner/"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://javfor.me/static/banner/"
  },
  {
    "filters": [
      "||brandmetrics.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.brandmetrics.com"
  },
  {
    "filters": [
      "||analytics.codigo.se^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://analytics.codigo.se"
  },
  {
    "filters": [
      "||pixel.glimr.io^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://pixel.glimr.io"
  },
  {
    "filters": [
      "||research-int.se^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://trafficgateway.research-int.se"
  },
  {
    "filters": [
      "/aff_land?referrer"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.bluehost.com/hosting/aff_land?referrer=&rand=1540303560945"
  },
  {
    "filters": [
      "||rtb123.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.rtb123.com"
  },
  {
    "filters": [
      "||01net.com/track/"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://securite.01net.com/track/"
  },
  {
    "filters": [
      "||cnetcontent.com/log?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ws.cnetcontent.com/log?"
  },
  {
    "filters": [
      "||amp.services^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static.amp.services"
  },
  {
    "filters": [
      "||beacon.statful.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://beacon.statful.com"
  },
  {
    "filters": [
      "||cnzz.net^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://tui.cnzz.net"
  },
  {
    "filters": [
      "-native-ad."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://rss.oneindia.com/common/render-native-ad.js"
  },
  {
    "filters": [
      "-advertorial."
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://rss.oneindia.com/common/en-advertorial.json"
  },
  {
    "filters": [
      "||cquotient.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.cquotient.com"
  },
  {
    "filters": [
      "||tracking.unrealengine.com^",
      "@@||tracking.unrealengine.com/tracking.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tracking.unrealengine.com/tracking.js"
  },
  {
    "filters": [
      "||analytics.aasaam.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://analytics.aasaam.com"
  },
  {
    "filters": [
      "||os-data.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://t1.os-data.com"
  },
  {
    "filters": [
      "/adlink/*$domain=~adlinktech.com"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.liontravel.com/Scripts/ADLink/"
  },
  {
    "filters": [
      "@@||thesimsresource.com^$script,domain=thesimsresource.com"
    ],
    "sourceUrl": "https://www.thesimsresource.com",
    "type": "script",
    "url": "https://www.thesimsresource.com"
  },
  {
    "filters": [
      "/tsrHitCounter."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.thesimsresource.com/tsrHitCounter.php"
  },
  {
    "filters": [
      "|https://$script,stylesheet,third-party,xmlhttprequest,domain=fastpic.ru"
    ],
    "sourceUrl": "http://fastpic.ru",
    "type": "script",
    "url": "https://"
  },
  {
    "filters": [
      "|http://$script,stylesheet,third-party,xmlhttprequest,domain=fastpic.ru"
    ],
    "sourceUrl": "http://fastpic.ru",
    "type": "script",
    "url": "http://"
  },
  {
    "check": true,
    "filters": [
      "|ws://$other,third-party,domain=fastpic.ru"
    ],
    "sourceUrl": "http://fastpic.ru",
    "type": "fetch",
    "url": "https://"
  },
  {
    "filters": [
      "@@||amazonaws.com^$script,domain=cinemablend.com|thesimsresource.com"
    ],
    "sourceUrl": "https://www.thesimsresource.com",
    "type": "script",
    "url": "https://s3.amazonaws.com"
  },
  {
    "filters": [
      "||traffic-media.co^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://jsc.traffic-media.co"
  },
  {
    "filters": [
      "/img/adv/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://dict.leo.org/img/adv/"
  },
  {
    "filters": [
      "||turbotraff.com^"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://turbotraff.com"
  },
  {
    "filters": [
      "||musicatorrents.com^*/script."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.musicatorrents.com/wp-content/themes/Alexis/js/script.js"
  },
  {
    "filters": [
      "||musicatorrents.com^*/license."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.musicatorrents.com/wp-content/themes/Alexis/js/license.js"
  },
  {
    "filters": [
      "||17track.net^*/google."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://res.17track.net/about/js/google.min.js"
  },
  {
    "filters": [
      "/adspace."
    ],
    "sourceUrl": "https://",
    "type": "stylesheet",
    "url": "https://www.tver.jp/css/adspace.css"
  },
  {
    "check": true,
    "filters": [
      "||mopub.com^$third-party",
      "||mopub.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ads.mopub.com"
  },
  {
    "filters": [
      "||mb-srv.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://af.widget.mb-srv.com"
  },
  {
    "filters": [
      "||remarketingpixel.com^",
      "||remarketingpixel.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://r.remarketingpixel.com"
  },
  {
    "filters": [
      "||pv.xcar.com.cn^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://pv.xcar.com.cn"
  },
  {
    "filters": [
      "||marfeel.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://titania.marfeel.com"
  },
  {
    "filters": [
      "||clickfunnels.com/userevents/"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://app.clickfunnels.com/userevents/"
  },
  {
    "filters": [
      "||track.addevent.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://track.addevent.com"
  },
  {
    "filters": [
      "/pixel/visit?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://af.widget.mb-srv.com/pixel/visit?"
  },
  {
    "filters": [
      "/tags?session_id="
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://fpt.microsoft.com/tags?session_id=618fef82-b5a9-40b4-b297-b63d07fadd22"
  },
  {
    "filters": [
      "_social_tracking."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://media.wnyc.org/static/js/ga_social_tracking.js"
  },
  {
    "filters": [
      "/trackjs."
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://answers.unrealengine.com/static/trackJs.json"
  },
  {
    "filters": [
      "/no-impression.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://serving.ad.org.vn/no-impression.gif?"
  },
  {
    "filters": [
      "/ad-exchange."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://gamma.cachefly.net/js/ad-exchange.js"
  },
  {
    "filters": [
      ".adnetwork.$domain=~adnetwork.ie|~adnetwork.sk"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://delivery.adnetwork.vn"
  },
  {
    "filters": [
      "||srcsmrtgs.com^",
      "||srcsmrtgs.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://js.srcsmrtgs.com"
  },
  {
    "filters": [
      "/advertise-$domain=~advertise-solution.nl|~bingads.microsoft.com"
    ],
    "sourceUrl": "https://",
    "type": "stylesheet",
    "url": "https://www.termometropolitico.it/wp-content/plugins/advertise-me"
  },
  {
    "filters": [
      "||adbooth.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "xhr",
    "url": "http://engine.adbooth.com"
  },
  {
    "filters": [
      "||pipedream.wistia.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://pipedream.wistia.com"
  },
  {
    "filters": [
      "||pdn-1.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "https://xml.pdn-1.com"
  },
  {
    "filters": [
      "||popmonetizer.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "https://xml.popmonetizer.com"
  },
  {
    "filters": [
      "||mppapi.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://emeter-nam.mppapi.io"
  },
  {
    "filters": [
      "||adrunnr.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "https://adrunnr.com"
  },
  {
    "filters": [
      "/adcalloverride."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s.abcnews.com/assets/js/adCallOverride.js"
  },
  {
    "filters": [
      "||analytics.kaltura.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://analytics.kaltura.com"
  },
  {
    "filters": [
      "/adsiframe."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s4.eestatic.com/assets_js/dyn/adsiframe.js"
  },
  {
    "filters": [
      "||thefappeningblog.com/icloud9.html"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://thefappeningblog.com/icloud9.html"
  },
  {
    "filters": [
      "/pageviews/*$domain=~stats.wikimedia.org|~tools.wmflabs.org"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://elcomercio.pe/track/pageviews/"
  },
  {
    "filters": [
      "||pagead2.googlesyndication.com^$stylesheet"
    ],
    "sourceUrl": "https://",
    "type": "stylesheet",
    "url": "https://pagead2.googlesyndication.com"
  },
  {
    "filters": [
      "||linicom.co.uk^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://linicom.co.uk"
  },
  {
    "filters": [
      "||adap.tv^$third-party,script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://redir.adap.tv"
  },
  {
    "filters": [
      "||performance.typekit.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://performance.typekit.net"
  },
  {
    "filters": [
      "@@||ensighten.com/hearst/news/Bootstrap.js$script,domain=ctpost.com|houstonchronicle.com|mysanantonio.com|newstimes.com|seattlepi.com|sfchronicle.com|sfgate.com|timesunion.com"
    ],
    "sourceUrl": "https://m.sfgate.com",
    "type": "script",
    "url": "https://nexus.ensighten.com/hearst/news/Bootstrap.js"
  },
  {
    "filters": [
      "||oclaserver.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://go.oclaserver.com"
  },
  {
    "filters": [
      "/InsightTrk/*",
      "/tracker.do?"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://insight.danawa.com/InsightTrk/tracker.do?"
  },
  {
    "filters": [
      "||pymx5.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://pymx5.com"
  },
  {
    "filters": [
      "||easylist.club^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://easylist.club"
  },
  {
    "filters": [
      "/popunder1."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://easylist.club/popunder1.js"
  },
  {
    "filters": [
      "||tracking.adweb.co.kr^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://tracking.adweb.co.kr"
  },
  {
    "filters": [
      "/analytics-js/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://analytics.htmedia.in/analytics-js/"
  },
  {
    "filters": [
      "||actuallysnake.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://actuallysnake.com"
  },
  {
    "filters": [
      "728x90.html|"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://mangarock.com/iframe/adtrue_728x90.html"
  },
  {
    "filters": [
      "||adsrv.eacdn.com^$third-party",
      "||adsrv.eacdn.com^"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "https://wlstoiximan.adsrv.eacdn.com"
  },
  {
    "filters": [
      "/468_60.",
      "468_60.gif|"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://images.khabaronline.ir/system/menus/19/468_60.gif"
  },
  {
    "filters": [
      "||adf.ly^"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "stylesheet",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "stylesheet",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "stylesheet",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "stylesheet",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://www.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "|http://$third-party,domain=adf.ly|s1-adfly.com"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://www.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://www.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://www.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://www.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://www.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      ".weborama.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://s1.lprs1.fr/assets/js/lib/squid/squid.weborama.js"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "/ads.png",
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/ads.png"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "|https://$third-party,domain=adf.ly|s1-adfly.com"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "https://"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "xhr",
    "url": "http://www.adf.ly"
  },
  {
    "filters": [
      "/fbpixel."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://s1.lprs1.fr/assets/js/app/squid/fbpixel.js"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "stylesheet",
    "url": "https://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "stylesheet",
    "url": "https://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "stylesheet",
    "url": "https://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "script",
    "url": "https://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "script",
    "url": "https://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "script",
    "url": "https://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "script",
    "url": "https://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "script",
    "url": "https://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "script",
    "url": "https://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "script",
    "url": "https://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "script",
    "url": "https://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "script",
    "url": "https://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "script",
    "url": "https://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "script",
    "url": "https://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "script",
    "url": "https://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "script",
    "url": "https://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "script",
    "url": "https://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "stylesheet",
    "url": "https://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "image",
    "url": "https://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "||analytics.grupogodo.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://analytics.grupogodo.com"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "image",
    "url": "https://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "image",
    "url": "https://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "image",
    "url": "https://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "image",
    "url": "https://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "image",
    "url": "https://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "image",
    "url": "https://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "image",
    "url": "https://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "image",
    "url": "https://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "image",
    "url": "https://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "stylesheet",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "stylesheet",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "stylesheet",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "stylesheet",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://www.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://www.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://www.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://www.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://www.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://www.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "||investingchannel.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://abd.investingchannel.com"
  },
  {
    "filters": [
      "||log.sv.pandora.tv^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://log.sv.pandora.tv"
  },
  {
    "filters": [
      "||hyphenatedion.com^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.hyphenatedion.com"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "xhr",
    "url": "http://www.adf.ly"
  },
  {
    "filters": [
      "@@||rapidvideo.com/js/js.cookie.js$script"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://www.rapidvideo.com/js/js.cookie.js"
  },
  {
    "filters": [
      "@@||rapidvideo.com/js/videojs.hotkeys.min.js$script"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://www.rapidvideo.com/js/videojs.hotkeys.min.js"
  },
  {
    "filters": [
      "/v1/ads/*"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://linicom.co.uk/opp/api/v1/ads/"
  },
  {
    "filters": [
      "/stats/event.js?"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://static.lacentrale.fr/js/stats/event.js?"
  },
  {
    "filters": [
      "@@||player.ooyala.com^*/analytics-plugin/$script,domain=nintendo.com",
      "||player.ooyala.com/*/analytics-plugin/$script,redirect=noopjs,domain=nintendo.com"
    ],
    "sourceUrl": "https://careers.nintendo.com",
    "type": "script",
    "url": "https://player.ooyala.com/static/v4/production/analytics-plugin/"
  },
  {
    "filters": [
      "/tracking_partenaire."
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "https://www.lacentrale.fr/tracking_partenaire.php"
  },
  {
    "filters": [
      "||kxcdn.com/prj/"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://bp-1c51.kxcdn.com/prj/"
  },
  {
    "filters": [
      "/ViewCounter/*"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://people.onliner.by/viewcounter/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "stylesheet",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "stylesheet",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "stylesheet",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "stylesheet",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://www.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://www.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://www.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://www.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://www.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://www.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "/CBM.Tracking.js?"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://static.lacentrale.fr/js/class/CBM.Tracking.js?"
  },
  {
    "filters": [
      "||conde.io/beacon"
    ],
    "sourceUrl": "https://",
    "type": "other",
    "url": "https://rum.conde.io/beacon"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "xhr",
    "url": "http://www.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "stylesheet",
    "url": "https://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "stylesheet",
    "url": "https://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "stylesheet",
    "url": "https://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "script",
    "url": "https://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "script",
    "url": "https://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "script",
    "url": "https://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "script",
    "url": "https://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "script",
    "url": "https://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "script",
    "url": "https://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "script",
    "url": "https://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "script",
    "url": "https://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "script",
    "url": "https://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "script",
    "url": "https://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "script",
    "url": "https://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "script",
    "url": "https://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "script",
    "url": "https://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "script",
    "url": "https://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "stylesheet",
    "url": "https://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "image",
    "url": "https://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "image",
    "url": "https://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "image",
    "url": "https://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "image",
    "url": "https://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "image",
    "url": "https://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "image",
    "url": "https://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "image",
    "url": "https://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "image",
    "url": "https://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "image",
    "url": "https://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "https://adf.ly",
    "type": "image",
    "url": "https://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      ".me/ads/",
      "/ads/300."
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "https://castlive.me/ads/300.html"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "stylesheet",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "stylesheet",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "stylesheet",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "stylesheet",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://www.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://www.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://www.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://www.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "script",
    "url": "http://www.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://www.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party",
      "@@||adf.ly/static/image/$image,first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "image",
    "url": "http://cdn.adf.ly/static/image/"
  },
  {
    "filters": [
      "@@||adf.ly^$first-party"
    ],
    "sourceUrl": "http://www.adf.ly",
    "type": "xhr",
    "url": "http://www.adf.ly"
  },
  {
    "filters": [
      "/ads/load."
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "https://castlive.me/ads/load.html"
  },
  {
    "filters": [
      "/adsdk/*"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://gp.vrixon.com/adsdk/"
  },
  {
    "filters": [
      "||waust.at^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://waust.at"
  },
  {
    "filters": [
      "/feedads."
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://livesport4u.com/feedads.html"
  },
  {
    "filters": [
      "/adright."
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://vipcast.pw/adright.php"
  },
  {
    "filters": [
      "_show_ads_",
      "@@||naver.net/adpost/adpost_show_ads_min.js$domain=danawa.com"
    ],
    "sourceUrl": "http://m.danawa.com",
    "type": "script",
    "url": "http://adimg3.search.naver.net/adpost/adpost_show_ads_min.js"
  },
  {
    "filters": [
      "||witalfieldt.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://witalfieldt.com"
  },
  {
    "filters": [
      "/AdServlet?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://grupogodo.worldgravity.com/grrec-grupogodo-war/AdServlet?"
  },
  {
    "filters": [
      "||adright.co^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://xml.adright.co"
  },
  {
    "filters": [
      "||becanium.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://becanium.com"
  },
  {
    "filters": [
      "||traktrafficflow.com^$third-party",
      "||traktrafficflow.com^"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://www.traktrafficflow.com"
  },
  {
    "filters": [
      "/adpai.",
      "/adflag."
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://adpai.thepaper.cn/static/images/adflag.png"
  },
  {
    "filters": [
      "@@/wp-content/plugins/akismet/*$script,first-party,domain=~gaytube.com|~pornhub.com|~redtube.com|~redtube.com.br|~tube8.com|~tube8.es|~tube8.fr|~xtube.com|~youjizz.com|~youporn.com|~youporngay.com"
    ],
    "sourceUrl": "http://www.makeleio.gr",
    "type": "script",
    "url": "http://www.makeleio.gr/wp-content/plugins/akismet/"
  },
  {
    "filters": [
      "||alimama.com^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.alimama.com"
  },
  {
    "filters": [
      "||interworksmedia.co.kr^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://cdn.interworksmedia.co.kr"
  },
  {
    "filters": [
      "/adTagRequest."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://cm.interworksmedia.co.kr/adTagRequest.htm"
  },
  {
    "filters": [
      "/lib/analytics."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://s1.xmcdn.com/wap/js/lib/analytics.js"
  },
  {
    "filters": [
      "||maxmind.com/app/$third-party",
      "||maxmind.com^*/geoip.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://j.maxmind.com/app/geoip.js"
  },
  {
    "filters": [
      "||soujoobafoo.com^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://soujoobafoo.com"
  },
  {
    "filters": [
      "||rta2.metro.co.uk^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://rta2.metro.co.uk"
  },
  {
    "filters": [
      "||adcdnx.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://cdn1.adcdnx.com"
  },
  {
    "filters": [
      "/adbayimg/*"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://img.iacstatic.co.kr/adbayimg/"
  },
  {
    "filters": [
      "/audience.min.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://cdn.interworksmedia.co.kr/js/audience.min.js"
  },
  {
    "filters": [
      "||basilic.io^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://foglio.basilic.io"
  },
  {
    "filters": [
      "||dj.renren.com^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://dj.renren.com"
  },
  {
    "filters": [
      "/ads1."
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://www.soccerjumbotv1.me/ads1.htm"
  },
  {
    "filters": [
      "||holder.com.ua^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://h.holder.com.ua"
  },
  {
    "filters": [
      "|http://r.i.ua^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://r.i.ua"
  },
  {
    "check": true,
    "filters": [
      "||mediatraffic.com^$third-party",
      "||mediatraffic.com.ua^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://i.mediatraffic.com.ua"
  },
  {
    "filters": [
      "@@/wp-content/plugins/akismet/*$script,first-party,domain=~gaytube.com|~pornhub.com|~redtube.com|~redtube.com.br|~tube8.com|~tube8.es|~tube8.fr|~xtube.com|~youjizz.com|~youporn.com|~youporngay.com"
    ],
    "sourceUrl": "http://www.makeleio.gr",
    "type": "script",
    "url": "http://www.makeleio.gr/wp-content/plugins/akismet/"
  },
  {
    "filters": [
      "/googlead."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://streamango.com/googlead.js"
  },
  {
    "filters": [
      "||pub.network^$third-party",
      "/pubfig.min.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://a.pub.network/pixlr-com/pubfig.min.js"
  },
  {
    "filters": [
      "||streamango.com/log"
    ],
    "sourceUrl": "http://",
    "type": "xhr",
    "url": "https://t1.streamango.com/log"
  },
  {
    "filters": [
      "||quantserve.com^$third-party,other"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://qcx.quantserve.com:8443"
  },
  {
    "filters": [
      "||ekoatchooze.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "https://ekoatchooze.com"
  },
  {
    "filters": [
      "/pubmatic_"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s.isanook.com/sh/0/js/pubmatic_mobile.1.0.0.js"
  },
  {
    "filters": [
      "||truehits.in.th^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://lvs2.truehits.in.th"
  },
  {
    "filters": [
      "||sal.isanook.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://sal.isanook.com"
  },
  {
    "filters": [
      "||mellowads.com^$third-party",
      "||mellowads.com^"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.mellowads.com"
  },
  {
    "filters": [
      "||clickfunnels.com/cf.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://app.clickfunnels.com/cf.js"
  },
  {
    "filters": [
      "/mellowads."
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "https://mellowads.com"
  },
  {
    "filters": [
      "||clickfunnels.com^*/track?"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://app.clickfunnels.com/v1/track?"
  },
  {
    "check": true,
    "filters": [
      "/ads.htm"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://notify.medicalnewstoday.com/ads.html"
  },
  {
    "filters": [
      "|https://r.i.ua^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://r.i.ua"
  },
  {
    "filters": [
      "/adbanner/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://addons.books.com.tw/G/ADbanner/"
  },
  {
    "filters": [
      "/uploads/ads/*",
      "/ads/dfp/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://img-as.fsanook.com/files/uploads/ads/dfp/"
  },
  {
    "filters": [
      "/tracking/pixel."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://wisteria-js.excite.co.jp/tracking/pixel.gif"
  },
  {
    "filters": [
      ".com/counter?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://glogger.stuff.com/counter?"
  },
  {
    "filters": [
      "$script,subdocument,third-party,domain=efukt.com",
      "@@||ajax.googleapis.com/ajax/$script,domain=efukt.com"
    ],
    "sourceUrl": "https://www.efukt.com",
    "type": "script",
    "url": "https://ajax.googleapis.com/ajax/"
  },
  {
    "filters": [
      "@@||twitter.com^$script,subdocument,domain=efukt.com",
      "@@||twitter.com^$subdocument,domain=efukt.com"
    ],
    "sourceUrl": "https://www.efukt.com",
    "type": "script",
    "url": "https://platform.twitter.com"
  },
  {
    "filters": [
      "||jsrdn.com/i/1.gif?"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://i.jsrdn.com/i/1.gif?"
  },
  {
    "filters": [
      "||spox.com/pub/js/track.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.spox.com/pub/js/track.js"
  },
  {
    "filters": [
      "-tracking.js?"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.spox.com/pub/js/facebook-tracking.js?"
  },
  {
    "filters": [
      "/banners/468"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://mellowads.com/img/banners/468x60.gif"
  },
  {
    "filters": [
      "@@||cloudflare.com/ajax/libs/*$script,domain=androidcentral.com"
    ],
    "sourceUrl": "https://m.androidcentral.com",
    "type": "script",
    "url": "https://cdnjs.cloudflare.com/ajax/libs/"
  },
  {
    "filters": [
      "||doubleclick.net^$script,redirect=noopjs,domain=androidcentral.com|crackberry.com|imore.com|windowscentral.com"
    ],
    "sourceUrl": "https://m.androidcentral.com",
    "type": "script",
    "url": "https://securepubads.g.doubleclick.net"
  },
  {
    "filters": [
      "@@||zencdn.net^$script,domain=efukt.com"
    ],
    "sourceUrl": "https://efukt.com",
    "type": "script",
    "url": "https://vjs.zencdn.net"
  },
  {
    "filters": [
      "||tremorhub.com/pubsync?"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://qds0l.publishers.tremorhub.com/pubsync?"
  },
  {
    "filters": [
      "||alooma.com/track/"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://inputs.alooma.com/track/"
  },
  {
    "filters": [
      "||stats.pusher.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://stats.pusher.com"
  },
  {
    "filters": [
      "/optimizely/*$script"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.wetter.de/components/optimizely/"
  },
  {
    "filters": [
      "/gujAd."
    ],
    "sourceUrl": "https://",
    "type": "stylesheet",
    "url": "https://adalliance-a.akamaihd.net/live/wetter.de/gujAd.css"
  },
  {
    "filters": [
      "||technical-service.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://technical-service.net"
  },
  {
    "filters": [
      "||akamaized.net/?u="
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://bg-a.akamaized.net/?u=https://www.wetter.de/&ac=tak&as=wehome"
  },
  {
    "filters": [
      "||showheroes.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static.showheroes.com"
  },
  {
    "filters": [
      "||trck.spoteffects.net^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://trck.spoteffects.net"
  },
  {
    "filters": [
      "||track.uc.cn^",
      "||uc.cn/collect?"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://track.uc.cn/collect?"
  },
  {
    "filters": [
      "/adsearch.$domain=~adsearch.fr"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://adsearch.adkontekst.pl"
  },
  {
    "filters": [
      "/images/adv."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://im1.kommersant.ru/ContentFlex/images/adv.gif"
  },
  {
    "filters": [
      "/pubtag.js?"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static.showheroes.com/pubtag.js?"
  },
  {
    "filters": [
      "||vidible.tv/placement/vast/"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://delivery.vidible.tv/placement/vast/"
  },
  {
    "filters": [
      "||d3ezl4ajpp2zy8.cloudfront.net^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://d3ezl4ajpp2zy8.cloudfront.net"
  },
  {
    "filters": [
      "@@||providesupport.com^$script"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://image.providesupport.com"
  },
  {
    "filters": [
      "/readcounter.aspx?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.kommersant.ru/readcounter.aspx?"
  },
  {
    "filters": [
      "||apester.com/event^",
      "||events.apester.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://events.apester.com/event"
  },
  {
    "filters": [
      "||image.providesupport.com/cmd/"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://image.providesupport.com/cmd/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "script",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "-120x60."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://fmnetwork.nl/banners/footyshoes-ronaldo7-120x60.png"
  },
  {
    "filters": [
      "||nsstatic.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.nsstatic.net"
  },
  {
    "filters": [
      "/geocc."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://g.pcmag.com/geocc.js"
  },
  {
    "filters": [
      "||adziff.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://static.adziff.com"
  },
  {
    "filters": [
      "||sa.sky.it^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://sa.sky.it"
  },
  {
    "filters": [
      "||netshelter.net^$third-party",
      "||netshelter.net^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "http://track.netshelter.net"
  },
  {
    "filters": [
      "||exsigma.eu/mercurio/"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://cdn.exsigma.eu/mercurio/"
  },
  {
    "filters": [
      "/nav-ad-"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://s3.foolcdn.com/misc-assets/nav-ad-sa.png"
  },
  {
    "filters": [
      "-nav-ad."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://g.foolcdn.com/misc-assets/ryr-nav-ad.png"
  },
  {
    "filters": [
      "|https://$script,domain=rule34.xxx",
      "@@||rule34.xxx/script/awesomplete.min.js$script,first-party"
    ],
    "sourceUrl": "https://rule34.xxx",
    "type": "script",
    "url": "https://rule34.xxx/script/awesomplete.min.js"
  },
  {
    "filters": [
      "||ziffdavis.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static.ziffdavis.com"
  },
  {
    "filters": [
      "@@||rule34.xxx/css/sinni.js$script,first-party"
    ],
    "sourceUrl": "https://rule34.xxx",
    "type": "script",
    "url": "https://rule34.xxx/css/sinni.js"
  },
  {
    "filters": [
      "@@||rule34.xxx/script/application.js$script,first-party"
    ],
    "sourceUrl": "https://rule34.xxx",
    "type": "script",
    "url": "https://rule34.xxx/script/application.js"
  },
  {
    "filters": [
      "@@||rule34.xxx/script/application.js$script,first-party"
    ],
    "sourceUrl": "https://rule34.xxx",
    "type": "script",
    "url": "https://rule34.xxx/script/application.js"
  },
  {
    "filters": [
      "@@||rule34.xxx/script/awesomplete.min.js$script,first-party"
    ],
    "sourceUrl": "https://rule34.xxx",
    "type": "script",
    "url": "https://rule34.xxx/script/awesomplete.min.js"
  },
  {
    "filters": [
      "/aspenanalytics."
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://cvp1.cdn.turner.com/xslo/cvp/config/nba/aspenanalytics.json"
  },
  {
    "check": true,
    "filters": [
      "@@||track.adform.net/serving/scripts/trackpoint$script,domain=sky.it|ubibanca.com"
    ],
    "sourceUrl": "http://www.sky.it",
    "type": "script",
    "url": "https://track.adform.net/serving/scripts/trackpoint"
  },
  {
    "filters": [
      "||ninja.onap.io^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://ninja.onap.io"
  },
  {
    "filters": [
      "@@||rule34.xxx/css/sinni.js$script,first-party"
    ],
    "sourceUrl": "https://rule34.xxx",
    "type": "script",
    "url": "https://rule34.xxx/css/sinni.js"
  },
  {
    "filters": [
      "@@||rule34.xxx/script/application.js$script,first-party"
    ],
    "sourceUrl": "https://rule34.xxx",
    "type": "script",
    "url": "https://rule34.xxx/script/application.js"
  },
  {
    "filters": [
      "@@||rule34.xxx/script/application.js$script,first-party"
    ],
    "sourceUrl": "https://rule34.xxx",
    "type": "script",
    "url": "https://rule34.xxx/script/application.js"
  },
  {
    "filters": [
      "@@||rule34.xxx/script/awesomplete.min.js$script,first-party"
    ],
    "sourceUrl": "https://rule34.xxx",
    "type": "script",
    "url": "https://rule34.xxx/script/awesomplete.min.js"
  },
  {
    "filters": [
      "-ads-widget/"
    ],
    "sourceUrl": "http://",
    "type": "stylesheet",
    "url": "http://www.unamglobal.unam.mx/wp-content/plugins/meks-easy-ads-widget/"
  },
  {
    "filters": [
      "||turner.com^*/ads/",
      "/ads/freewheel/*",
      "@@||turner.com^*/ads/freewheel/*/AdManager.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cvp1.cdn.turner.com/xslo/cvp/ads/freewheel/js/0/AdManager.js"
  },
  {
    "filters": [
      "/Logs/discovery?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://inrecsys.popin.cc/PopinService/Logs/discovery?"
  },
  {
    "filters": [
      "||analytics.myfinance.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://analytics.myfinance.com"
  },
  {
    "filters": [
      "/ad_units?"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://www.myfinance.com/api/ad_units?"
  },
  {
    "filters": [
      "/coAnalytics."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://funds.gofundme.com/js/5.0/app/signup/coAnalytics.js"
  },
  {
    "filters": [
      "-160x600."
    ],
    "sourceUrl": "http://",
    "type": "xhr",
    "url": "http://static.javhd.com/h5/files/video/2069-670846-160x600.mpg"
  },
  {
    "filters": [
      "/advertmedia/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ais.wetter.de/masters/769x478/Jf6GZCFH/advertmedia/"
  },
  {
    "filters": [
      "@@||rule34.xxx/css/sinni.js$script,first-party"
    ],
    "sourceUrl": "https://rule34.xxx",
    "type": "script",
    "url": "https://rule34.xxx/css/sinni.js"
  },
  {
    "filters": [
      "@@||rule34.xxx/script/application.js$script,first-party"
    ],
    "sourceUrl": "https://rule34.xxx",
    "type": "script",
    "url": "https://rule34.xxx/script/application.js"
  },
  {
    "filters": [
      "@@||rule34.xxx/script/application.js$script,first-party"
    ],
    "sourceUrl": "https://rule34.xxx",
    "type": "script",
    "url": "https://rule34.xxx/script/application.js"
  },
  {
    "filters": [
      "@@||rule34.xxx/script/awesomplete.min.js$script,first-party"
    ],
    "sourceUrl": "https://rule34.xxx",
    "type": "script",
    "url": "https://rule34.xxx/script/awesomplete.min.js"
  },
  {
    "filters": [
      "@@/wp-content/plugins/google-analytics-for-wordpress/*$script,stylesheet,first-party"
    ],
    "sourceUrl": "https://www.celebjihad.com",
    "type": "script",
    "url": "https://www.celebjihad.com/wp-content/plugins/google-analytics-for-wordpress/"
  },
  {
    "filters": [
      "||tracking.rtl.de^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://tracking.rtl.de"
  },
  {
    "filters": [
      ".net/ad-",
      "-728-90."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.ronaldo7.net/ad-here-728-90.jpg"
  },
  {
    "filters": [
      "-advertise.$domain=~i-advertise.net|~mb-advertise.gr"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.ronaldo7.net/ronaldo7-advertise.jpg"
  },
  {
    "filters": [
      "-300-250."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.ronaldo7.net/ad-here-300-250.jpg"
  },
  {
    "filters": [
      "||fool.com/pitcher/"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://infotron.fool.com/pitcher/"
  },
  {
    "filters": [
      "@@||rule34.xxx/css/sinni.js$script,first-party"
    ],
    "sourceUrl": "https://rule34.xxx",
    "type": "script",
    "url": "https://rule34.xxx/css/sinni.js"
  },
  {
    "filters": [
      "@@||rule34.xxx/script/application.js$script,first-party"
    ],
    "sourceUrl": "https://rule34.xxx",
    "type": "script",
    "url": "https://rule34.xxx/script/application.js"
  },
  {
    "filters": [
      "@@||rule34.xxx/script/application.js$script,first-party"
    ],
    "sourceUrl": "https://rule34.xxx",
    "type": "script",
    "url": "https://rule34.xxx/script/application.js"
  },
  {
    "filters": [
      "@@||rule34.xxx/script/awesomplete.min.js$script,first-party"
    ],
    "sourceUrl": "https://rule34.xxx",
    "type": "script",
    "url": "https://rule34.xxx/script/awesomplete.min.js"
  },
  {
    "check": true,
    "filters": [
      "/popunder_"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.celebjihad.com/www.celebjihad.com/popunder_stc3.js"
  },
  {
    "filters": [
      "@@/wp-content/plugins/google-analytics-for-wordpress/*$script,stylesheet,first-party"
    ],
    "sourceUrl": "https://www.celebjihad.com",
    "type": "script",
    "url": "https://www.celebjihad.com/wp-content/plugins/google-analytics-for-wordpress/"
  },
  {
    "filters": [
      "@@||rule34.xxx/css/sinni.js$script,first-party"
    ],
    "sourceUrl": "https://rule34.xxx",
    "type": "script",
    "url": "https://rule34.xxx/css/sinni.js"
  },
  {
    "filters": [
      "@@||rule34.xxx/script/application.js$script,first-party"
    ],
    "sourceUrl": "https://rule34.xxx",
    "type": "script",
    "url": "https://rule34.xxx/script/application.js"
  },
  {
    "filters": [
      "@@||rule34.xxx/script/application.js$script,first-party"
    ],
    "sourceUrl": "https://rule34.xxx",
    "type": "script",
    "url": "https://rule34.xxx/script/application.js"
  },
  {
    "filters": [
      "@@||rule34.xxx/script/awesomplete.min.js$script,first-party"
    ],
    "sourceUrl": "https://rule34.xxx",
    "type": "script",
    "url": "https://rule34.xxx/script/awesomplete.min.js"
  },
  {
    "filters": [
      "||vivocha.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.vivocha.com"
  },
  {
    "filters": [
      "/ajax/ads/*"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://olx.com.eg/i2/ajax/ads/"
  },
  {
    "filters": [
      "@@/wp-content/plugins/google-analytics-for-wordpress/*$script,stylesheet,first-party"
    ],
    "sourceUrl": "https://www.celebjihad.com",
    "type": "script",
    "url": "https://www.celebjihad.com/wp-content/plugins/google-analytics-for-wordpress/"
  },
  {
    "filters": [
      "/ads12."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.celebjihad.com/video-js/ads12.js"
  },
  {
    "filters": [
      "||n2s.co.kr^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://deliverys.n2s.co.kr"
  },
  {
    "filters": [
      "||click.vgnett.no^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://click.vgnett.no"
  },
  {
    "filters": [
      "@@/wp-content/plugins/google-analytics-for-wordpress/*$script,stylesheet,first-party"
    ],
    "sourceUrl": "https://www.celebjihad.com",
    "type": "script",
    "url": "https://www.celebjihad.com/wp-content/plugins/google-analytics-for-wordpress/"
  },
  {
    "filters": [
      "||p-advg.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://c.p-advg.com"
  },
  {
    "filters": [
      "||stat.api.2gis.ru^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://stat.api.2gis.ru"
  },
  {
    "filters": [
      "/cgi-bin/count.cgi?"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://www.posgrado.unam.mx/cgi-bin/Count.cgi?"
  },
  {
    "filters": [
      "/analytics/track-"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://maps.api.2gis.ru/analytics/track-user.png"
  },
  {
    "filters": [
      "@@/wp-content/plugins/google-analytics-for-wordpress/*$script,stylesheet,first-party"
    ],
    "sourceUrl": "https://www.celebjihad.com",
    "type": "script",
    "url": "https://www.celebjihad.com/wp-content/plugins/google-analytics-for-wordpress/"
  },
  {
    "filters": [
      "/resxclsa."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.forever21.com/eu/shop/_common/2018101202/js/resxclsa.js"
  },
  {
    "filters": [
      "@@/wp-content/plugins/google-analytics-for-wordpress/*$script,stylesheet,first-party"
    ],
    "sourceUrl": "https://www.celebjihad.com",
    "type": "script",
    "url": "https://www.celebjihad.com/wp-content/plugins/google-analytics-for-wordpress/"
  },
  {
    "filters": [
      "/core/ad/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://redllama.ru/core/ad/"
  },
  {
    "filters": [
      "/ga.php?$image"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "http://m.azet.sk/sluzby/miesacka/ga.php?"
  },
  {
    "filters": [
      "/gemius/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s.aimg.sk/vendor/gemius/"
  },
  {
    "filters": [
      "/aztracker."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s.aimg.sk/livemonitor/js/aztracker.js"
  },
  {
    "filters": [
      "||tracker.azet.sk^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://tracker.azet.sk"
  },
  {
    "filters": [
      "/iframetracker."
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://tracker.azet.sk/livemonitor/iframeTracker.html"
  },
  {
    "filters": [
      "||esearchvision.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tracking.esearchvision.com"
  },
  {
    "filters": [
      "||dtmpub.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://secure.dtmpub.com"
  },
  {
    "filters": [
      "/clicktrack-*.gif?",
      "/activity.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://go.techtarget.com/clicktrack-r/activity/activity.gif?"
  },
  {
    "check": true,
    "filters": [
      "||mediaplex.com^*?mpt="
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://adfarm.mediaplex.com/ad/tr/550-229078-1801-0?mpt="
  },
  {
    "filters": [
      "||dpmsrv.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://s.dpmsrv.com"
  },
  {
    "filters": [
      "/makecrmpcookie."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://static.joins.com/common/makecrmpcookie.js"
  },
  {
    "filters": [
      "@@||8muses.com^$script,first-party",
      "@@||8muses.com^$first-party,script"
    ],
    "sourceUrl": "https://www.8muses.com",
    "type": "script",
    "url": "https://www.8muses.com"
  },
  {
    "filters": [
      "/rum.min."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://rum.perfops.net/rum.min.js"
  },
  {
    "filters": [
      "||google-analytics.com/batch^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://www.google-analytics.com/batch"
  },
  {
    "filters": [
      "@@||8muses.com^$script,first-party"
    ],
    "sourceUrl": "https://www.8muses.com",
    "type": "script",
    "url": "https://www.8muses.com"
  },
  {
    "filters": [
      "/hmapxy.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://ghmpl.hit.gemius.pl/hmapxy.js"
  },
  {
    "filters": [
      "||hudb.pl^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://alt.hudb.pl"
  },
  {
    "filters": [
      "@@||8muses.com^$script,first-party"
    ],
    "sourceUrl": "https://www.8muses.com",
    "type": "script",
    "url": "https://www.8muses.com"
  },
  {
    "filters": [
      "/iqadcontroller."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://scripts.zeit.de/iqd/cdn_zeit_mob/live/iqadcontroller.js"
  },
  {
    "filters": [
      "||iqcontentplatform.de^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://d.iqcontentplatform.de"
  },
  {
    "filters": [
      "||algovid.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://v.algovid.com"
  },
  {
    "filters": [
      "||dianomi.com^$third-party",
      "||dianomi.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.dianomi.com"
  },
  {
    "check": true,
    "filters": [
      "||userscloud.com/sw.js$script",
      "||userscloud.com/sw.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://userscloud.com/sw.js"
  },
  {
    "filters": [
      "|https://$image,script,subdocument,third-party,xmlhttprequest,domain=userscloud.com"
    ],
    "sourceUrl": "http://userscloud.com",
    "type": "image",
    "url": "https://"
  },
  {
    "filters": [
      "||userscloud.com/js/vendor/core/bootstrap.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://userscloud.com/js/vendor/core/bootstrap.js"
  },
  {
    "filters": [
      "|http://$image,script,subdocument,third-party,xmlhttprequest,domain=userscloud.com"
    ],
    "sourceUrl": "http://userscloud.com",
    "type": "script",
    "url": "http://"
  },
  {
    "filters": [
      "||rosemand.pro^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://rosemand.pro"
  },
  {
    "filters": [
      "||djtflbt20bdde.cloudfront.net^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://djtflbt20bdde.cloudfront.net"
  },
  {
    "filters": [
      "||uptolike.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://w.uptolike.com"
  },
  {
    "filters": [
      "@@||8muses.com^$script,first-party"
    ],
    "sourceUrl": "https://www.8muses.com",
    "type": "script",
    "url": "https://www.8muses.com"
  },
  {
    "filters": [
      "||cc.zeit.de^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://cc.zeit.de"
  },
  {
    "filters": [
      "/__utm.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.cmu.edu/__utm.js"
  },
  {
    "filters": [
      "||captora.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://cdn.captora.com"
  },
  {
    "filters": [
      "@@||8muses.com^$script,first-party"
    ],
    "sourceUrl": "https://www.8muses.com",
    "type": "script",
    "url": "https://www.8muses.com"
  },
  {
    "filters": [
      "@@||dianomi.com/partner/marketwatch/js/dianomi-marketwatch.js?$domain=marketwatch.com"
    ],
    "sourceUrl": "https://www.marketwatch.com",
    "type": "script",
    "url": "https://www.dianomi.com/partner/marketwatch/js/dianomi-marketwatch.js?"
  },
  {
    "filters": [
      "/adpic/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://img.scupio.com/ad//adpic/"
  },
  {
    "filters": [
      "?adtype="
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.startpage.com/js/abp.js?adType=1&advertiser=1&advertising=1"
  },
  {
    "filters": [
      "||startpage.*/pelp?"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://www.startpage.com/pelp?"
  },
  {
    "filters": [
      "@@||8muses.com^$script,first-party"
    ],
    "sourceUrl": "https://www.8muses.com",
    "type": "script",
    "url": "https://www.8muses.com"
  },
  {
    "filters": [
      "||uptolike.com/widgets/*/imp?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://w.uptolike.com/widgets/v1/imp?"
  },
  {
    "filters": [
      "||increaserev.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://increaserev.com"
  },
  {
    "filters": [
      "/clientdatacollector/*"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://www.walgreens.com/instartlogic/clientdatacollector/"
  },
  {
    "filters": [
      "/ads/video/*"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://vpaid.pubmatic.com/ads/video/"
  },
  {
    "filters": [
      "/adscbg/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://m.haberturk.com/adscbg/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "script",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://ads.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "||luxupcdna.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://s.luxupcdna.com"
  },
  {
    "filters": [
      "||luxupcdnc.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://s.luxupcdnc.com"
  },
  {
    "filters": [
      "||asqbwneriyvur.com^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.asqbwneriyvur.com"
  },
  {
    "filters": [
      "||2hanwriten.com^"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.2hanwriten.com"
  },
  {
    "filters": [
      "/adsfile."
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://adsfile.bssdlbig.kugou.com"
  },
  {
    "filters": [
      "/adsframe."
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://m.haberturk.com/adscbg/adsFrame.html"
  },
  {
    "filters": [
      "@@||www.google.*/ads/$first-party,domain=google.ca|google.co.in|google.co.nz|google.co.uk|google.co.za|google.com|google.com.au|google.com.eg|google.de|google.es|google.ie|google.it"
    ],
    "sourceUrl": "https://play.google.com",
    "type": "image",
    "url": "https://www.google.com/ads/"
  },
  {
    "filters": [
      "/advertpro/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://adsp.haberturk.com/advertpro/"
  },
  {
    "filters": [
      "/adchoicesicon."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://contextual.media.net/__media__/pics/800010042/AdChoicesIcon.png"
  },
  {
    "filters": [
      "||informer.yandex.ru^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://informer.yandex.ru"
  },
  {
    "filters": [
      "||hilariouszinc.com^",
      "||hilariouszinc.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://hilariouszinc.com"
  },
  {
    "filters": [
      "||logs.spilgames.com^"
    ],
    "sourceUrl": "http://",
    "type": "xhr",
    "url": "https://logs.spilgames.com"
  },
  {
    "filters": [
      "||gez.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://o.gez.io"
  },
  {
    "filters": [
      "@@/wp-content/plugins/akismet/*$script,first-party,domain=~gaytube.com|~pornhub.com|~redtube.com|~redtube.com.br|~tube8.com|~tube8.es|~tube8.fr|~xtube.com|~youjizz.com|~youporn.com|~youporngay.com"
    ],
    "sourceUrl": "http://celebrityinsider.org",
    "type": "script",
    "url": "http://celebrityinsider.org/wp-content/plugins/akismet/"
  },
  {
    "check": true,
    "filters": [
      "||4tube.com/assets/abExperiments-"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn1-ht-ui.4tube.com/assets/abExperiments-fba113e07a.js"
  },
  {
    "filters": [
      "/newrelicKpis-"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn1-ht-ui.4tube.com/assets/newrelicKpis-018b5db755.js"
  },
  {
    "filters": [
      "/newrelicKpisFooter-"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn1-ht-ui.4tube.com/assets/newrelicKpisFooter-a4a3d6ff76.js"
  },
  {
    "filters": [
      "||4tube.com/sw4tube.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://m.4tube.com/sw4tube.js"
  },
  {
    "filters": [
      ".html?ad="
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://m.4tube.com/ad_detail.html?ad=mobile-videolist-top"
  },
  {
    "filters": [
      "||baconaces.pro^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://baconaces.pro"
  },
  {
    "filters": [
      "||t.brand-server.com^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://t.brand-server.com"
  },
  {
    "filters": [
      "||4tube.com/*banner$image"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://cdn1-sites.4tube.com/tb/image/default-200x80-banner.jpg"
  },
  {
    "filters": [
      "||smartadtags.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://api.smartadtags.com"
  },
  {
    "filters": [
      "||clubic.com/editorial/publier_count.php?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.clubic.com/editorial/publier_count.php?"
  },
  {
    "filters": [
      "@@||playbuzz.com/widget/$script,third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.playbuzz.com/widget/"
  },
  {
    "filters": [
      "/banner_ad."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://gwk.adlibr.com/script/web/smart/banner_ad.js"
  },
  {
    "filters": [
      "||zarget.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.zarget.com"
  },
  {
    "filters": [
      "||clickcease.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.clickcease.com"
  },
  {
    "filters": [
      "/popad."
    ],
    "sourceUrl": "http://",
    "type": "stylesheet",
    "url": "http://specials.indiatoday.com/specials/popup/popad.css"
  },
  {
    "filters": [
      "/smartpixel.$domain=~smartpixel.tv"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://smartpixel.auditorius.ru"
  },
  {
    "filters": [
      "||sniperlog.ru^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://pix.sniperlog.ru"
  },
  {
    "filters": [
      "||mediatoday.ru^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://mediatoday.ru"
  },
  {
    "filters": [
      "/track/view/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://track.life.ru/track/view/"
  },
  {
    "filters": [
      "||tracking.i-vengo.com^"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://tracking.i-vengo.com"
  },
  {
    "filters": [
      "||beacon.sojern.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://beacon.sojern.com"
  },
  {
    "filters": [
      "||instana.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://eum.instana.io"
  },
  {
    "filters": [
      "||forter.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://4dc2aa82bc5e.cdn4.forter.com"
  },
  {
    "filters": [
      "-ad-manager/$~stylesheet"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.onlinekhabar.com/wp-content/plugins/ok-ad-manager/"
  },
  {
    "filters": [
      "||reople.co.kr^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://ad.reople.co.kr"
  },
  {
    "filters": [
      "||2beon.co.kr^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://plugin.2beon.co.kr"
  },
  {
    "filters": [
      "||usemaxserver.de^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.usemaxserver.de"
  },
  {
    "filters": [
      "||greystripe.com^$third-party",
      "||greystripe.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "http://c.greystripe.com"
  },
  {
    "filters": [
      "@@||veedi.com^*/ADS.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.veedi.com/player_mobile/js/ads/ADS.js"
  },
  {
    "filters": [
      "||usemax.de^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://www.usemax.de"
  },
  {
    "filters": [
      "@@/wp-content/plugins/akismet/*$script,first-party,domain=~gaytube.com|~pornhub.com|~redtube.com|~redtube.com.br|~tube8.com|~tube8.es|~tube8.fr|~xtube.com|~youjizz.com|~youporn.com|~youporngay.com"
    ],
    "sourceUrl": "http://celebrityinsider.org",
    "type": "script",
    "url": "http://celebrityinsider.org/wp-content/plugins/akismet/"
  },
  {
    "filters": [
      "-publicidad."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://est.sport.es/img/bg-publicidad.png"
  },
  {
    "filters": [
      "||ndg.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://fallsm.ndg.io"
  },
  {
    "filters": [
      "_pix.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://track.noddus.com/_pix.gif?"
  },
  {
    "filters": [
      "@@/wp-content/plugins/akismet/*$script,first-party,domain=~gaytube.com|~pornhub.com|~redtube.com|~redtube.com.br|~tube8.com|~tube8.es|~tube8.fr|~xtube.com|~youjizz.com|~youporn.com|~youporngay.com"
    ],
    "sourceUrl": "https://worldfree4u.club",
    "type": "script",
    "url": "https://worldfree4u.club/wp-content/cache/busting/1/wp-content/plugins/akismet/"
  },
  {
    "filters": [
      "||luckypushh.com^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://luckypushh.com"
  },
  {
    "check": true,
    "filters": [
      "/^https?:\\/\\/([0-9a-z\\-]+\\.)?(9anime|animeland|animenova|animeplus|animetoon|animewow|gamestorrent|goodanime|gogoanime|igg-games|kimcartoon|memecenter|readcomiconline|toonget|toonova|watchcartoononline)\\.[a-z]{2,4}\\/(?!([Ee]xternal|[Ii]mages|[Ss]cripts|[Uu]ploads|ac|ajax|assets|combined|content|cov|cover|(img\\/bg)|(img\\/icon)|inc|jwplayer|player|playlist-cat-rss|static|thumbs|wp-content|wp-includes)\\/)(.*)/$image,other,script,first-party,xmlhttprequest"
    ],
    "sourceUrl": "https://m.watchcartoononline.io",
    "type": "document",
    "url": "https://m.watchcartoononline.io/"
  },
  {
    "filters": [
      "@@/wp-content/plugins/akismet/*$script,first-party,domain=~gaytube.com|~pornhub.com|~redtube.com|~redtube.com.br|~tube8.com|~tube8.es|~tube8.fr|~xtube.com|~youjizz.com|~youporn.com|~youporngay.com"
    ],
    "sourceUrl": "https://worldfree4u.club",
    "type": "script",
    "url": "https://worldfree4u.club/wp-content/cache/busting/1/wp-content/plugins/akismet/"
  },
  {
    "filters": [
      "@@||watchcartoononline.io/tema/images/jwplayer.jpg$image,first-party"
    ],
    "sourceUrl": "https://m.watchcartoononline.io",
    "type": "image",
    "url": "https://m.watchcartoononline.io/tema/images/jwplayer.jpg"
  },
  {
    "check": true,
    "filters": [
      "/^https?:\\/\\/([0-9a-z\\-]+\\.)?(9anime|animeland|animenova|animeplus|animetoon|animewow|gamestorrent|goodanime|gogoanime|igg-games|kimcartoon|memecenter|readcomiconline|toonget|toonova|watchcartoononline)\\.[a-z]{2,4}\\/(?!([Ee]xternal|[Ii]mages|[Ss]cripts|[Uu]ploads|ac|ajax|assets|combined|content|cov|cover|(img\\/bg)|(img\\/icon)|inc|jwplayer|player|playlist-cat-rss|static|thumbs|wp-content|wp-includes)\\/)(.*)/$image,other,script,first-party,xmlhttprequest"
    ],
    "sourceUrl": "https://m.watchcartoononline.io",
    "type": "document",
    "url": "https://m.watchcartoononline.io/"
  },
  {
    "filters": [
      "@@||watchcartoononline.io/tema/images/jwplayer.jpg$image,first-party"
    ],
    "sourceUrl": "https://m.watchcartoononline.io",
    "type": "image",
    "url": "https://m.watchcartoononline.io/tema/images/jwplayer.jpg"
  },
  {
    "filters": [
      "/api.ad."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://api.ad.ad-stir.com"
  },
  {
    "check": true,
    "filters": [
      "/^https?:\\/\\/([0-9a-z\\-]+\\.)?(9anime|animeland|animenova|animeplus|animetoon|animewow|gamestorrent|goodanime|gogoanime|igg-games|kimcartoon|memecenter|readcomiconline|toonget|toonova|watchcartoononline)\\.[a-z]{2,4}\\/(?!([Ee]xternal|[Ii]mages|[Ss]cripts|[Uu]ploads|ac|ajax|assets|combined|content|cov|cover|(img\\/bg)|(img\\/icon)|inc|jwplayer|player|playlist-cat-rss|static|thumbs|wp-content|wp-includes)\\/)(.*)/$image,other,script,first-party,xmlhttprequest"
    ],
    "sourceUrl": "https://m.watchcartoononline.io",
    "type": "document",
    "url": "https://m.watchcartoononline.io/"
  },
  {
    "filters": [
      "/ezoic/*$script,first-party"
    ],
    "sourceUrl": "https://www.snopes.com",
    "type": "script",
    "url": "https://www.snopes.com/ezoic/"
  },
  {
    "filters": [
      "||index.ru^$third-party",
      "/tnc.js?h="
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://c.index.ru/tnc.js?h=m.vz.ru"
  },
  {
    "filters": [
      "||rd.rakuten.co.jp^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://rd.rakuten.co.jp"
  },
  {
    "filters": [
      "||keyade.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://k.keyade.com"
  },
  {
    "filters": [
      "/tr.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://tk.ilius.net/tr.gif?"
  },
  {
    "filters": [
      "/houseads/*"
    ],
    "sourceUrl": "https://",
    "type": "media",
    "url": "https://i.kapook.com/adskapook/2017/houseads/"
  },
  {
    "filters": [
      "/greenoaks.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.snopes.com/detroitchicago/greenoaks.gif?"
  },
  {
    "filters": [
      "@@||watchcartoononline.io/tema/images/jwplayer.jpg$image,first-party"
    ],
    "sourceUrl": "https://m.watchcartoononline.io",
    "type": "image",
    "url": "https://m.watchcartoononline.io/tema/images/jwplayer.jpg"
  },
  {
    "filters": [
      "://piwik.$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://piwik.1u1s.de"
  },
  {
    "check": true,
    "filters": [
      "/^https?:\\/\\/([0-9a-z\\-]+\\.)?(9anime|animeland|animenova|animeplus|animetoon|animewow|gamestorrent|goodanime|gogoanime|igg-games|kimcartoon|memecenter|readcomiconline|toonget|toonova|watchcartoononline)\\.[a-z]{2,4}\\/(?!([Ee]xternal|[Ii]mages|[Ss]cripts|[Uu]ploads|ac|ajax|assets|combined|content|cov|cover|(img\\/bg)|(img\\/icon)|inc|jwplayer|player|playlist-cat-rss|static|thumbs|wp-content|wp-includes)\\/)(.*)/$image,other,script,first-party,xmlhttprequest"
    ],
    "sourceUrl": "https://m.watchcartoononline.io",
    "type": "document",
    "url": "https://m.watchcartoononline.io/"
  },
  {
    "filters": [
      "@@/wp-content/plugins/akismet/*$script,first-party,domain=~gaytube.com|~pornhub.com|~redtube.com|~redtube.com.br|~tube8.com|~tube8.es|~tube8.fr|~xtube.com|~youjizz.com|~youporn.com|~youporngay.com"
    ],
    "sourceUrl": "http://celebrityinsider.org",
    "type": "script",
    "url": "http://celebrityinsider.org/wp-content/plugins/akismet/"
  },
  {
    "filters": [
      "||hitweb2.chosun.com^"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://hitweb2.chosun.com"
  },
  {
    "filters": [
      "@@/wp-content/plugins/akismet/*$script,first-party,domain=~gaytube.com|~pornhub.com|~redtube.com|~redtube.com.br|~tube8.com|~tube8.es|~tube8.fr|~xtube.com|~youjizz.com|~youporn.com|~youporngay.com"
    ],
    "sourceUrl": "https://worldfree4u.club",
    "type": "script",
    "url": "https://worldfree4u.club/wp-content/cache/busting/1/wp-content/plugins/akismet/"
  },
  {
    "filters": [
      "||paypalobjects.com^*/pixel.gif"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.paypalobjects.com/en_US/i/scr/pixel.gif"
  },
  {
    "check": true,
    "filters": [
      "/^https?:\\/\\/([0-9a-z\\-]+\\.)?(9anime|animeland|animenova|animeplus|animetoon|animewow|gamestorrent|goodanime|gogoanime|igg-games|kimcartoon|memecenter|readcomiconline|toonget|toonova|watchcartoononline)\\.[a-z]{2,4}\\/(?!([Ee]xternal|[Ii]mages|[Ss]cripts|[Uu]ploads|ac|ajax|assets|combined|content|cov|cover|(img\\/bg)|(img\\/icon)|inc|jwplayer|player|playlist-cat-rss|static|thumbs|wp-content|wp-includes)\\/)(.*)/$image,other,script,first-party,xmlhttprequest"
    ],
    "sourceUrl": "https://m.watchcartoononline.io",
    "type": "document",
    "url": "https://m.watchcartoononline.io/"
  },
  {
    "filters": [
      "/ezoic/*$script,first-party"
    ],
    "sourceUrl": "https://www.snopes.com",
    "type": "script",
    "url": "https://www.snopes.com/ezoic/"
  },
  {
    "filters": [
      "-sync2ad-",
      "/sync2ad."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://vw-sync2ad-delivery.s3.amazonaws.com/SDK-JS/1.0/release/1.0.3/sync2ad.js"
  },
  {
    "filters": [
      "@@||watchcartoononline.io/tema/images/jwplayer.jpg$image,first-party"
    ],
    "sourceUrl": "https://m.watchcartoononline.io",
    "type": "image",
    "url": "https://m.watchcartoononline.io/tema/images/jwplayer.jpg"
  },
  {
    "check": true,
    "filters": [
      "/^https?:\\/\\/([0-9a-z\\-]+\\.)?(9anime|animeland|animenova|animeplus|animetoon|animewow|gamestorrent|goodanime|gogoanime|igg-games|kimcartoon|memecenter|readcomiconline|toonget|toonova|watchcartoononline)\\.[a-z]{2,4}\\/(?!([Ee]xternal|[Ii]mages|[Ss]cripts|[Uu]ploads|ac|ajax|assets|combined|content|cov|cover|(img\\/bg)|(img\\/icon)|inc|jwplayer|player|playlist-cat-rss|static|thumbs|wp-content|wp-includes)\\/)(.*)/$image,other,script,first-party,xmlhttprequest"
    ],
    "sourceUrl": "https://m.watchcartoononline.io",
    "type": "document",
    "url": "https://m.watchcartoononline.io/"
  },
  {
    "filters": [
      "||pxf.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://fanduel.pxf.io"
  },
  {
    "filters": [
      "||ministedik.info^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ministedik.info"
  },
  {
    "filters": [
      "/ezoic/*$script,first-party"
    ],
    "sourceUrl": "https://www.snopes.com",
    "type": "script",
    "url": "https://www.snopes.com/ezoic/"
  },
  {
    "check": true,
    "filters": [
      "||rat.rakuten.co.jp^$other"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://rat.rakuten.co.jp"
  },
  {
    "filters": [
      "/adview_"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://ads1.issuepoll.co.kr/adview_old.php"
  },
  {
    "filters": [
      "/images/adv/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://m.vz.ru/images/adv/"
  },
  {
    "filters": [
      ".adserver.",
      "||adserver.yahoo.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://global.adserver.yahoo.com"
  },
  {
    "filters": [
      "/baynote_"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.jcrew.com/media/wro/js/baynote_v2_m56577569840418915.js"
  },
  {
    "filters": [
      "/dcs_tag."
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.ets.org/Media/Global/script/dcs_tag.js"
  },
  {
    "filters": [
      "/baynote."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://mobile.yoox.com/_js_/0/1/yoox/baynote/ObserverFiles/de/baynote.js"
  },
  {
    "filters": [
      "||moevideo.net^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://moevideo.net"
  },
  {
    "filters": [
      "/ezoic/*$script,first-party"
    ],
    "sourceUrl": "https://www.snopes.com",
    "type": "script",
    "url": "https://www.snopes.com/ezoic/"
  },
  {
    "filters": [
      "||amgdgt.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://lrcm.amgdgt.com"
  },
  {
    "filters": [
      "||youtube.com/api/stats/qoe?"
    ],
    "sourceUrl": "https://",
    "type": "other",
    "url": "https://www.youtube.com/api/stats/qoe?"
  },
  {
    "filters": [
      "/stats.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://stats.search.usa.gov/stats.gif?"
  },
  {
    "filters": [
      "||bnhtml.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.bnhtml.com"
  },
  {
    "filters": [
      "||foreseeresults.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://events.foreseeresults.com"
  },
  {
    "filters": [
      "||smarterhq.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://tr2.smarterhq.io"
  },
  {
    "filters": [
      "/ezoic/*$script,first-party"
    ],
    "sourceUrl": "https://www.snopes.com",
    "type": "script",
    "url": "https://www.snopes.com/ezoic/"
  },
  {
    "filters": [
      "||urldelivery.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://www.urldelivery.com"
  },
  {
    "filters": [
      "@@||collect.igodigital.com/collect.js$script,domain=cars.com"
    ],
    "sourceUrl": "https://www.cars.com",
    "type": "script",
    "url": "https://carscomconsumer.collect.igodigital.com/collect.js"
  },
  {
    "filters": [
      "/stats/impression"
    ],
    "sourceUrl": "http://",
    "type": "xhr",
    "url": "http://m.jogos360.com.br/stats/impressions"
  },
  {
    "filters": [
      ".com/ads_"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://wall.alphacoders.com/ads_after_adsense_top_center.html"
  },
  {
    "filters": [
      "?advertiser_id=$domain=~panel.rightflow.com"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://px.ladsp.com/pixel?advertiser_id=00004458&referer="
  },
  {
    "filters": [
      "||media01.eu^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://lidl.media01.eu"
  },
  {
    "filters": [
      "/ezoic/*$script,first-party"
    ],
    "sourceUrl": "https://www.snopes.com",
    "type": "script",
    "url": "https://www.snopes.com/ezoic/"
  },
  {
    "check": true,
    "filters": [
      "/trackpxl?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://traffic.outbrain.com/network/trackpxl?"
  },
  {
    "filters": [
      "||profitshare.ro^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://profitshare.ro"
  },
  {
    "filters": [
      "||yoochoose.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://event.yoochoose.net"
  },
  {
    "filters": [
      "_ads/js/"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.newsweek.com/sites/all/modules/modules-custom/fusion/fusion_ads/js/"
  },
  {
    "check": true,
    "filters": [
      "||traffic-media.co.uk^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://jsc.traffic-media.co.uk"
  },
  {
    "filters": [
      "/advertisment/*"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://cdn.hamgardi.com/Uploads/Advertisment/"
  },
  {
    "filters": [
      "/sensorsdata-"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://js.bibidev.com/3rd/sensorsdata-sdk"
  },
  {
    "filters": [
      "||xxlargepop.com/apu.php$script,redirect=noopjs"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://xxlargepop.com/apu.php"
  },
  {
    "filters": [
      ".to/ads/"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://advert.uloz.to/ads/"
  },
  {
    "filters": [
      "||bcloudhost.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.bcloudhost.com"
  },
  {
    "filters": [
      "/VideoAd/*"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://adx.adform.net/videoad/"
  },
  {
    "filters": [
      "/werbe-banner/*"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://js.chefkoch-cdn.de/js/default/userinfo/werbe-banner/"
  },
  {
    "filters": [
      "/aux/collect?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://tg.socdm.com/aux/collect?"
  },
  {
    "filters": [
      "||rfity.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://rfity.com"
  },
  {
    "filters": [
      "/wt_capi.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.lloydsbank.com/assets/js/webtrends/wt_capi.js"
  },
  {
    "filters": [
      "||puserving.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://pl14420782.puserving.com"
  },
  {
    "check": true,
    "filters": [
      "/ad-emea."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://ad-emea.doubleclick.net"
  },
  {
    "filters": [
      "||online-metrix.net^",
      "||online-metrix.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://h.online-metrix.net"
  },
  {
    "filters": [
      "||d2xgf76oeu9pbh.cloudfront.net^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://d2xgf76oeu9pbh.cloudfront.net"
  },
  {
    "filters": [
      "||d303e3cdddb4ded4b6ff495a7b496ed5.s3.amazonaws.com^"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://d303e3cdddb4ded4b6ff495a7b496ed5.s3.amazonaws.com"
  },
  {
    "filters": [
      "||ntvk1.ru^$third-party",
      "||ntvk1.ru^"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://p1.ntvk1.ru"
  },
  {
    "filters": [
      "||events.whisk.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://events.whisk.com"
  },
  {
    "filters": [
      "||r7ls.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://tl.r7ls.net"
  },
  {
    "filters": [
      "||dircont3.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://p1.dircont3.com"
  },
  {
    "filters": [
      "||7eer.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://mygiftcardsplus.7eer.net"
  },
  {
    "filters": [
      "/players/ads.",
      "/ads.jplayer."
    ],
    "sourceUrl": "https://",
    "type": "stylesheet",
    "url": "https://poovee.net/lib/players/ads.jplayer.css"
  },
  {
    "filters": [
      "||tracking.s24.com^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://tracking.s24.com"
  },
  {
    "filters": [
      "||consultant.ru/js/counter.js"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://www.consultant.ru/js/counter.js"
  },
  {
    "filters": [
      "/adds/counter.js"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://www.consultant.ru/adds/counter.js"
  },
  {
    "filters": [
      "/counter/collect?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://cnt0.www.uz/counter/collect?"
  },
  {
    "filters": [
      "/TeaLeaf.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.sprint.com/content/dam/sprint/util/tealeaf/tealeaf.js"
  },
  {
    "filters": [
      "/adperf_"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "http://cstatic.weborama.fr/js/adperf_publisher_api"
  },
  {
    "filters": [
      "||trck.bdi-services.de^"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://trck.bdi-services.de"
  },
  {
    "filters": [
      "/banners/ffadult/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://a.acdn12354732.com/banners/ffadult/"
  },
  {
    "filters": [
      "||ptawe.com^$third-party"
    ],
    "sourceUrl": "http://",
    "type": "script",
    "url": "https://pto.ptawe.com"
  },
  {
    "filters": [
      "||ulogin.ru/stats.html"
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "https://ulogin.ru/stats.html"
  },
  {
    "filters": [
      "/adsbycurse."
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.wowprogress.com/i/adsbycurse.png"
  },
  {
    "filters": [
      "/abdetect.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.wowprogress.com/js2/abdetect.js"
  },
  {
    "filters": [
      "@@||eurogamer.net^$script,domain=eurogamer.net|nintendolife.com|rockpapershotgun.com|usgamer.net|vg247.com"
    ],
    "sourceUrl": "https://www.eurogamer.net",
    "type": "script",
    "url": "https://www.eurogamer.net"
  },
  {
    "filters": [
      "||gamer-network.net/plugins/dfp/",
      "/dfp/async."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.gamer-network.net/plugins/dfp/async.dfp.1.1.21.js"
  },
  {
    "filters": [
      "/SidebarAds."
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://www.eurogamer.net/scripts/SidebarAds.js"
  },
  {
    "filters": [
      "/mormont.js"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://cdn.gamer-network.net/2018/scripts/mormont/v2.20.0/mormont.js"
  },
  {
    "filters": [
      "/iplookup.php"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://int.dpool.sina.com.cn/iplookup/iplookup.php"
  },
  {
    "filters": [
      "/css/adv."
    ],
    "sourceUrl": "http://",
    "type": "stylesheet",
    "url": "http://adv.zarabotki.ru/css/adv.css"
  },
  {
    "filters": [
      "||mormont.gamer-network.net^",
      "/register_pageview?"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://mormont.gamer-network.net/api/measurement/v2/register_pageview?"
  },
  {
    "filters": [
      "/acbeacon2."
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://cdn.tanx.com/t/acookie/acbeacon2.html"
  },
  {
    "filters": [
      "||qsoetgedlgyhyz.com^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.qsoetgedlgyhyz.com"
  },
  {
    "filters": [
      "||moneymakercdn.com^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.moneymakercdn.com"
  },
  {
    "filters": [
      "||apartments.com^*/al.gif?"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://www.apartments.com/clientvisit/al.gif?"
  },
  {
    "filters": [
      "/log?type=",
      "@@||csfd.cz/log?"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://www.csfd.cz/log?type=ads&id=5795&action=view&_=1540303835993"
  },
  {
    "filters": [
      "||shareasale.com^",
      "||shareasale.com^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.shareasale.com"
  },
  {
    "filters": [
      "||tracking.pacharge.com^"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://tracking.pacharge.com"
  },
  {
    "filters": [
      "||sensic.net^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://mbb2.sensic.net"
  },
  {
    "filters": [
      "||eazyleads.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://cdn.eazyleads.com"
  },
  {
    "check": true,
    "filters": [
      ";1x1inv="
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://track.adform.net/adfserve/?bn=25499905;1x1inv=1;srctype=3;ord=33250"
  },
  {
    "filters": [
      "||smartclip.net^$third-party,media"
    ],
    "sourceUrl": "https://",
    "type": "media",
    "url": "https://cdn.smartclip.net"
  },
  {
    "filters": [
      "||smartclip.net^$third-party,other"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://ad.sxp.smartclip.net"
  },
  {
    "filters": [
      "/footer_ad."
    ],
    "sourceUrl": "http://",
    "type": "document",
    "url": "http://fans.91p20.space/fans/footer_ad.html"
  },
  {
    "filters": [
      "||collector.sspinc.io^"
    ],
    "sourceUrl": "https://",
    "type": "xhr",
    "url": "https://collector.sspinc.io"
  },
  {
    "filters": [
      "||medleyads.com^$third-party",
      "||medleyads.com^"
    ],
    "sourceUrl": "https://",
    "type": "document",
    "url": "https://medleyads.com"
  },
  {
    "filters": [
      "||trackla.stackla.com^"
    ],
    "sourceUrl": "http://",
    "type": "xhr",
    "url": "https://trackla.stackla.com"
  },
  {
    "filters": [
      "||srvtrck.com^$third-party"
    ],
    "sourceUrl": "about:blank",
    "type": "document",
    "url": "http://www.srvtrck.com"
  },
  {
    "filters": [
      "||adacado.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://pixel.adacado.com"
  },
  {
    "filters": [
      "||extole.io^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://origin.extole.io"
  },
  {
    "filters": [
      "/pixel/conv/*"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://bm.adentifi.com/pixel/conv/"
  },
  {
    "filters": [
      "||vupulse.com^$third-party"
    ],
    "sourceUrl": "https://",
    "type": "script",
    "url": "https://vupulse.com"
  },
  {
    "filters": [
      "||wumii.com/images/pixel.png"
    ],
    "sourceUrl": "http://",
    "type": "image",
    "url": "http://static.wumii.com/images/pixel.png"
  },
  {
    "filters": [
      "||vesti.ru/counter/"
    ],
    "sourceUrl": "https://",
    "type": "image",
    "url": "https://pics.vesti.ru/counter/"
  }
];
