/*!
 * Copyright (c) 2017-2019 Cliqz GmbH. All rights reserved.
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { swallowOwnErrors } from './generic';
import { bundle, getWindowHostname, magic as contentScriptMagic } from './helpers';

/**
 * This module contains custom logic to defuse InstartLogic. It was heavily
 * inspired by work done by uBlockOrigin's and AdGuard's developers.
 */

function isCurrentScriptInstart(thisScript: HTMLScriptElement | SVGScriptElement | null): boolean {
  const script = document.currentScript;

  if (script === thisScript) {
    return false;
  }

  if (script instanceof HTMLScriptElement) {
    const src = script.src;
    if (src.indexOf('instart.js') !== -1 || src.indexOf('?:i10c.') !== -1) {
      return true;
    }

    const scriptContent: string | null = script.textContent;
    if (
      scriptContent !== null &&
      (scriptContent.indexOf(':Instart-') !== -1 ||
        scriptContent.indexOf('I10C') !== -1 ||
        scriptContent.indexOf('IXC') !== -1 ||
        scriptContent.indexOf('INSTART') !== -1)
    ) {
      return true;
    }
  }

  return false;
}

/**
 * Protect a few global objects from being accessed or set by a script from IL.
 */
const shieldPropertiesFromInstart = bundle(
  (magic) => {
    const thisScript = document.currentScript;
    [
      'atob',
      'console.error',
      'INSTART_TARGET_NAME',
      'navigator.userAgent',
      'performance',
      'require',
    ].forEach((target: string) => {
      // Handle nested targets
      let obj: any = window;
      const chain = target.split('.');
      const prop = chain.pop();
      chain.forEach((part: string) => {
        obj = obj[part];
      });

      if (prop === undefined || obj === undefined) {
        return;
      }

      // Protect obj[prop] by preventing access to InstartLogic
      Object.defineProperty(
        obj,
        prop,
        (() => {
          let value = obj[prop];
          return {
            get: () => {
              if (isCurrentScriptInstart(thisScript)) {
                throw new ReferenceError(magic);
              }
              return value;
            },
            set(a: any) {
              if (isCurrentScriptInstart(thisScript)) {
                throw new ReferenceError(magic);
              }
              value = a;
            },
          };
        })(),
      );
    });
  },
  [isCurrentScriptInstart],
);

/**
 * Mock global objects from IL.
 */
const monkeyPatchNanoVisor = bundle((magic) => {
  const HtmlStreamingMock = {
    InsertTags(_: any, b: any) {
      document.write(b);
    },
    MoveTagAndCleanUp() {
      /* noop */
    },
    MoveTag() {
      /* noop */
    },
    RemoveTags() {
      /* noop */
    },
    InterceptNode() {
      /* noop */
    },
    PatchBegin() {
      /* noop */
    },
    PatchEnd() {
      /* noop */
    },
    PatchInit() {
      /* noop */
    },
    PatchK() {
      /* noop */
    },
    ReloadWithNoHtmlStreaming() {
      window.location.reload(true);
    },
    RemoveAttributes() {
      /* noop */
    },
    UpdateAttributes() {
      /* noop */
    },
    SendR() {
      /* noop */
    },
    RemoveCurrentScript() {
      /* noop */
    },
  };

  const nanoVisorProxy = new Proxy(
    {},
    {
      get(target, name) {
        switch (name) {
          case 'HtmlStreaming':
            return HtmlStreamingMock;
          default: {
            // @ts-ignore
            return target[name];
          }
        }
      },
      set(target, name, value) {
        switch (name) {
          case 'CanRun':
            // @ts-ignore
            target.CanRun = () => false;
            break;
          default:
            // @ts-ignore
            target[name] = value;
        }
        return true;
      },
    },
  );

  let instartInit: any;
  Object.defineProperty(window, '_bcm_il', { value: true });
  Object.defineProperty(window, 'I10C', { value: nanoVisorProxy });
  Object.defineProperty(window, 'I11C', { value: nanoVisorProxy });
  Object.defineProperty(window, 'INSTART', {
    value: new Proxy(
      {},
      {
        get(target, name) {
          switch (name) {
            case 'Init':
              return (a: any) => {
                if (
                  a instanceof Object &&
                  typeof a.nanovisorGlobalNameSpace === 'string' &&
                  a.nanovisorGlobalNameSpace !== ''
                ) {
                  // @ts-ignore
                  window[a.nanovisorGlobalNameSpace] = nanoVisorProxy;
                }

                a.disableInjectionXhr = true;
                a.enableHtmlStreaming = false;
                a.enableQSCallDiffComputationConfig = false;
                a.enableQuerySelectorMonitoring = false;
                a.partialImage = false;
                a.rum = false;
                a.serveNanovisorSameDomain = false;
                a.useWrapper = false;
                a.virtualDomains = 0;
                a.virtualizeDomains = [];

                if (instartInit !== undefined) {
                  instartInit(a);
                }
              };
            default:
              // @ts-ignore
              if (target[name] === undefined) {
                throw new Error(magic);
              }
              // @ts-ignore
              return target[name];
          }
        },
        set(target, name, value) {
          switch (name) {
            case 'Init':
              instartInit = value;
              break;
            default:
              // @ts-ignore
              target[name] = value;
          }
          return true;
        },
      },
    ),
  });
});

export default function instart(window: Window): void {
  // NOTE: this list was partially borrowed from uBlockExtra and AdGuard
  if (
    [
      'afterellen.com',
      'allakhazam.com',
      'americanphotomag.com',
      'atvrider.com',
      'baggersmag.com',
      'baltimoresun.com',
      'boatingmag.com',
      'boston.com',
      'cafemom.com',
      'calgaryherald.com',
      'calgarysun.com',
      'capitalgazette.com',
      'carrollcountytimes.com',
      'cattime.com',
      'cbssports.com',
      'celebslam.com',
      'celebuzz.com',
      'chicagotribune.com',
      'chowhound.com',
      'chron.com',
      'chroniclelive.co.uk',
      'citypaper.com',
      'cnet.com',
      'comingsoon.net',
      'computershopper.com',
      'courant.com',
      'craveonline.com',
      'cruisingworld.com',
      'csgoutpost.com',
      'ctnow.com',
      'cycleworld.com',
      'dailydot.com',
      'dailypress.com',
      'dayzdb.com',
      'deathandtaxesmag.com',
      'delmartimes.net',
      'destinationweddingmag.com',
      'dirtrider.com',
      'diversitybestpractices.com',
      'dogtime.com',
      'dotaoutpost.com',
      'download.cnet.com',
      'edmontonjournal.com',
      'edmontonsun.com',
      'edmunds.com',
      'emedicinehealth.com',
      'esohead.com',
      'everquest.allakhazam.com',
      'everydayhealth.com',
      'extremetech.com',
      'fieldandstream.com',
      'financialpost.com',
      'floridatravellife.com',
      'flyingmag.com',
      'focus.de',
      'gamepedia.com',
      'gamerevolution.com',
      'gamespot.com',
      'geek.com',
      'gofugyourself.com',
      'growthspotter.com',
      'hearthhead.com',
      'hockeysfuture.com',
      'hotbikeweb.com',
      'hoylosangeles.com',
      'ibtimes.com',
      'idigitaltimes.com',
      'ign.com',
      'infinitiev.com',
      'islands.com',
      'lajollalight.com',
      'laptopmag.com',
      'latintimes.com',
      'leaderpost.com',
      'legacy.com',
      'lifewire.com',
      'livescience.com',
      'lolking.net',
      'mamaslatinas.com',
      'marlinmag.com',
      'mcall.com',
      'medicaldaily.com',
      'medicinenet.com',
      'metacritic.com',
      'metrolyrics.com',
      'mmo-champion.com',
      'momtastic.com',
      'montrealgazette.com',
      'motorcyclecruiser.com',
      'motorcyclistonline.com',
      'motortrend.com',
      'msn.com',
      'musicfeeds.com.au',
      'mustangandfords.com',
      'mysanantonio.com',
      'nasdaq.com',
      'nationalpost.com',
      'newsarama.com',
      'newsweek.com',
      'opshead.com',
      'orlandosentinel.com',
      'ottawacitizen.com',
      'ottawasun.com',
      'outdoorlife.com',
      'pcmag.com',
      'playstationlifestyle.net',
      'popphoto.com',
      'popsci.com',
      'ranchosantafereview.com',
      'range365.com',
      'ranker.com',
      'realclearpolitics.com',
      'realitytea.com',
      'redeyechicago.com',
      'salon.com',
      'saltwatersportsman.com',
      'sandiegouniontribune.com',
      'saveur.com',
      'scubadiving.com',
      'scubadivingintro.com',
      'seattlepi.com',
      'sfgate.com',
      'sherdog.com',
      'slate.com',
      'slickdeals.net',
      'southflorida.com',
      'space.com',
      'spin.com',
      'sporcle.com',
      'sportdiver.com',
      'sportfishingmag.com',
      'sportingnews.com',
      'sportrider.com',
      'spox.com',
      'stereogum.com',
      'streetchopperweb.com',
      'sun-sentinel.com',
      'superherohype.com',
      'superstreetbike.com',
      'tenplay.com.au',
      'tf2outpost.com',
      'thebalance.com',
      'thefashionspot.com',
      'thefrisky.com',
      'theprovince.com',
      'thespruce.com',
      'thestarphoenix.com',
      'thesuperficial.com',
      'thoughtcatalog.com',
      'thoughtco.com',
      'timeanddate.com',
      'timesunion.com',
      'tmn.today',
      'tomsguide.com',
      'tomsguide.fr',
      'tomshardware.co.uk',
      'tomshardware.com',
      'tomshardware.de',
      'tomshardware.fr',
      'torontosun.com',
      'totalbeauty.com',
      'trustedreviews.com',
      'tv.com',
      'tvguide.com',
      'tvtropes.org',
      'twincities.com',
      'utvdriver.com',
      'vancouversun.com',
      'vg.no',
      'vibe.com',
      'wakeboardingmag.com',
      'washingtonpost.com',
      'waterskimag.com',
      'webmd.com',
      'wikia.com',
      'windowscentral.com',
      'windsorstar.com',
      'winnipegsun.com',
      'workingmother.com',
      'wowhead.com',
      'wrestlezone.com',
      'xda-developers.com',
      'yachtingmagazine.com',
      'zam.com',
    ].indexOf(getWindowHostname(window)) !== -1
  ) {
    // Un-comment to debug InstartLogic
    // protectConsole(window);

    swallowOwnErrors(window, [contentScriptMagic]);
    monkeyPatchNanoVisor(window, [contentScriptMagic]);
    shieldPropertiesFromInstart(window, [contentScriptMagic]);
  }
}
