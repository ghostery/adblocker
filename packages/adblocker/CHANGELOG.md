# v1.18.3 (Tue Sep 15 2020)

#### :bug: Bug Fix

- Disable fanboy annoyances for now [#1274](https://github.com/cliqz-oss/adblocker/pull/1274) ([@remusao](https://github.com/remusao))
- build(deps): bump @types/chrome from 0.0.122 to 0.0.123 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### :house: Internal

- Update local assets [#1272](https://github.com/cliqz-oss/adblocker/pull/1272) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1271](https://github.com/cliqz-oss/adblocker/pull/1271) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1266](https://github.com/cliqz-oss/adblocker/pull/1266) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1262](https://github.com/cliqz-oss/adblocker/pull/1262) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1260](https://github.com/cliqz-oss/adblocker/pull/1260) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1257](https://github.com/cliqz-oss/adblocker/pull/1257) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1254](https://github.com/cliqz-oss/adblocker/pull/1254) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1252](https://github.com/cliqz-oss/adblocker/pull/1252) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1250](https://github.com/cliqz-oss/adblocker/pull/1250) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1248](https://github.com/cliqz-oss/adblocker/pull/1248) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1246](https://github.com/cliqz-oss/adblocker/pull/1246) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1243](https://github.com/cliqz-oss/adblocker/pull/1243) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1238](https://github.com/cliqz-oss/adblocker/pull/1238) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1237](https://github.com/cliqz-oss/adblocker/pull/1237) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1236](https://github.com/cliqz-oss/adblocker/pull/1236) ([@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- build(deps): bump puppeteer from 5.2.1 to 5.3.0 [#1269](https://github.com/cliqz-oss/adblocker/pull/1269) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @types/node from 14.10.0 to 14.10.1 [#1268](https://github.com/cliqz-oss/adblocker/pull/1268) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @types/chrome from 0.0.122 to 0.0.123 [#1267](https://github.com/cliqz-oss/adblocker/pull/1267) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# vnull (Sat Aug 29 2020)

#### ⚠️ Pushed to `master`

- Annoyances and Easylist Germany are now enabled in full and ads-only presets ([@remusao](https://github.com/remusao))

#### :house: Internal

- Update local assets [#1235](https://github.com/cliqz-oss/adblocker/pull/1235) ([@adblocker-bot](https://github.com/adblocker-bot))
- Add back easylist Germany by default [#1230](https://github.com/cliqz-oss/adblocker/pull/1230) ([@remusao](https://github.com/remusao))
- Remove line numbers from commented out filters [#1228](https://github.com/cliqz-oss/adblocker/pull/1228) ([@remusao](https://github.com/remusao))
- Update local assets [#1227](https://github.com/cliqz-oss/adblocker/pull/1227) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1222](https://github.com/cliqz-oss/adblocker/pull/1222) ([@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- build(deps): bump tldts-experimental from 5.6.51 to 5.6.52 [#1233](https://github.com/cliqz-oss/adblocker/pull/1233) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump rollup from 2.26.6 to 2.26.7 [#1231](https://github.com/cliqz-oss/adblocker/pull/1231) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump mocha from 8.1.2 to 8.1.3 [#1232](https://github.com/cliqz-oss/adblocker/pull/1232) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.18.0 (Mon Aug 24 2020)

### Release Notes

_From #1215_

Local assets uploading is now smarter and can automatically detect duplicate filters as well as disabled filters, resulting in slimmer lists (resulting in 15218 duplicates filters removed and 113 badfilters disabled). This results in a lower memory usage as well as faster matching performance. Moreover, the Fanboy annoyances list has been added in the "full" preset.

---

#### :rocket: New Feature

- Smarter updates [#1215](https://github.com/cliqz-oss/adblocker/pull/1215) ([@remusao](https://github.com/remusao))

#### :bug: Bug Fix

- build(deps): bump ts-node from 8.10.2 to 9.0.0 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump axios from 0.19.2 to 0.20.0 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump typescript from 3.9.7 to 4.0.2 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @rollup/plugin-node-resolve from 8.4.0 to 9.0.0 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @types/chrome from 0.0.121 to 0.0.122 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### :house: Internal

- Update local assets [#1214](https://github.com/cliqz-oss/adblocker/pull/1214) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1213](https://github.com/cliqz-oss/adblocker/pull/1213) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1207](https://github.com/cliqz-oss/adblocker/pull/1207) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1205](https://github.com/cliqz-oss/adblocker/pull/1205) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1201](https://github.com/cliqz-oss/adblocker/pull/1201) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1199](https://github.com/cliqz-oss/adblocker/pull/1199) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1194](https://github.com/cliqz-oss/adblocker/pull/1194) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1189](https://github.com/cliqz-oss/adblocker/pull/1189) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1184](https://github.com/cliqz-oss/adblocker/pull/1184) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1178](https://github.com/cliqz-oss/adblocker/pull/1178) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1177](https://github.com/cliqz-oss/adblocker/pull/1177) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1174](https://github.com/cliqz-oss/adblocker/pull/1174) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1169](https://github.com/cliqz-oss/adblocker/pull/1169) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1168](https://github.com/cliqz-oss/adblocker/pull/1168) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1166](https://github.com/cliqz-oss/adblocker/pull/1166) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1163](https://github.com/cliqz-oss/adblocker/pull/1163) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1157](https://github.com/cliqz-oss/adblocker/pull/1157) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1156](https://github.com/cliqz-oss/adblocker/pull/1156) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1152](https://github.com/cliqz-oss/adblocker/pull/1152) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1150](https://github.com/cliqz-oss/adblocker/pull/1150) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1149](https://github.com/cliqz-oss/adblocker/pull/1149) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1148](https://github.com/cliqz-oss/adblocker/pull/1148) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1144](https://github.com/cliqz-oss/adblocker/pull/1144) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1142](https://github.com/cliqz-oss/adblocker/pull/1142) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1137](https://github.com/cliqz-oss/adblocker/pull/1137) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1131](https://github.com/cliqz-oss/adblocker/pull/1131) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1129](https://github.com/cliqz-oss/adblocker/pull/1129) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1128](https://github.com/cliqz-oss/adblocker/pull/1128) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1127](https://github.com/cliqz-oss/adblocker/pull/1127) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1126](https://github.com/cliqz-oss/adblocker/pull/1126) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1120](https://github.com/cliqz-oss/adblocker/pull/1120) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1117](https://github.com/cliqz-oss/adblocker/pull/1117) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1114](https://github.com/cliqz-oss/adblocker/pull/1114) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1109](https://github.com/cliqz-oss/adblocker/pull/1109) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1108](https://github.com/cliqz-oss/adblocker/pull/1108) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1105](https://github.com/cliqz-oss/adblocker/pull/1105) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1100](https://github.com/cliqz-oss/adblocker/pull/1100) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1096](https://github.com/cliqz-oss/adblocker/pull/1096) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1093](https://github.com/cliqz-oss/adblocker/pull/1093) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1091](https://github.com/cliqz-oss/adblocker/pull/1091) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1085](https://github.com/cliqz-oss/adblocker/pull/1085) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1081](https://github.com/cliqz-oss/adblocker/pull/1081) ([@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- build(deps): bump ts-node from 8.10.2 to 9.0.0 [#1208](https://github.com/cliqz-oss/adblocker/pull/1208) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump axios from 0.19.2 to 0.20.0 [#1206](https://github.com/cliqz-oss/adblocker/pull/1206) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump typescript from 3.9.7 to 4.0.2 [#1202](https://github.com/cliqz-oss/adblocker/pull/1202) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @rollup/plugin-node-resolve from 8.4.0 to 9.0.0 [#1181](https://github.com/cliqz-oss/adblocker/pull/1181) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @types/chrome from 0.0.121 to 0.0.122 [#1118](https://github.com/cliqz-oss/adblocker/pull/1118) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump auto from 9.47.1 to 9.47.2 [#1116](https://github.com/cliqz-oss/adblocker/pull/1116) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- Update deps [#1107](https://github.com/cliqz-oss/adblocker/pull/1107) ([@remusao](https://github.com/remusao))
- build(deps): bump @types/chrome from 0.0.120 to 0.0.121 [#1103](https://github.com/cliqz-oss/adblocker/pull/1103) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.17.0 (Sun Jul 12 2020)

### Release Notes

_From #1080_

Add support for two new features to make network filtering more flexible and powerful. The new [`denyallow` option](https://github.com/uBlockOrigin/uBlock-issues/wiki/Static-filter-syntax#denyallow) is now fully supported. Moreover, both the new `denyallow` and existing `domain` options can contain [entities](https://github.com/uBlockOrigin/uBlock-issues/wiki/Static-filter-syntax#entity), allowing the use of trailing wildcards to match against all public suffixes (e.g. `evil.*` will match `evil` followed by any valid public suffix like `evil.com` or `evil.co.uk`).

---

#### :rocket: New Feature

- feat: support denyallow option and entities for network filters [#1080](https://github.com/cliqz-oss/adblocker/pull/1080) ([@remusao](https://github.com/remusao))

#### :bug: Bug Fix

- build(deps-dev): bump @types/mocha from 7.0.2 to 8.0.0 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @types/chrome from 0.0.119 to 0.0.120 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### :house: Internal

- Update local assets [#1076](https://github.com/cliqz-oss/adblocker/pull/1076) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1075](https://github.com/cliqz-oss/adblocker/pull/1075) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1071](https://github.com/cliqz-oss/adblocker/pull/1071) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1070](https://github.com/cliqz-oss/adblocker/pull/1070) ([@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- build(deps-dev): bump @types/mocha from 7.0.2 to 8.0.0 [#1079](https://github.com/cliqz-oss/adblocker/pull/1079) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @types/firefox-webext-browser from 70.0.1 to 78.0.0 [#1026](https://github.com/cliqz-oss/adblocker/pull/1026) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @types/chrome from 0.0.119 to 0.0.120 [#1074](https://github.com/cliqz-oss/adblocker/pull/1074) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.16.1 (Wed Jul 08 2020)

#### :bug: Bug Fix

- build(deps): bump @types/chrome from 0.0.118 to 0.0.119 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @types/chrome from 0.0.117 to 0.0.118 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @types/chrome from 0.0.116 to 0.0.117 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @types/chrome from 0.0.115 to 0.0.116 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @types/chrome from 0.0.114 to 0.0.115 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump mocha from 7.2.0 to 8.0.1 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### :house: Internal

- Update local assets [#1061](https://github.com/cliqz-oss/adblocker/pull/1061) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1053](https://github.com/cliqz-oss/adblocker/pull/1053) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1051](https://github.com/cliqz-oss/adblocker/pull/1051) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1049](https://github.com/cliqz-oss/adblocker/pull/1049) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1048](https://github.com/cliqz-oss/adblocker/pull/1048) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1046](https://github.com/cliqz-oss/adblocker/pull/1046) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1042](https://github.com/cliqz-oss/adblocker/pull/1042) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1040](https://github.com/cliqz-oss/adblocker/pull/1040) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1039](https://github.com/cliqz-oss/adblocker/pull/1039) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1038](https://github.com/cliqz-oss/adblocker/pull/1038) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1034](https://github.com/cliqz-oss/adblocker/pull/1034) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1030](https://github.com/cliqz-oss/adblocker/pull/1030) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1023](https://github.com/cliqz-oss/adblocker/pull/1023) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1020](https://github.com/cliqz-oss/adblocker/pull/1020) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1018](https://github.com/cliqz-oss/adblocker/pull/1018) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1015](https://github.com/cliqz-oss/adblocker/pull/1015) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1014](https://github.com/cliqz-oss/adblocker/pull/1014) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1013](https://github.com/cliqz-oss/adblocker/pull/1013) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1010](https://github.com/cliqz-oss/adblocker/pull/1010) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1007](https://github.com/cliqz-oss/adblocker/pull/1007) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1005](https://github.com/cliqz-oss/adblocker/pull/1005) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#1002](https://github.com/cliqz-oss/adblocker/pull/1002) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#993](https://github.com/cliqz-oss/adblocker/pull/993) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#992](https://github.com/cliqz-oss/adblocker/pull/992) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#990](https://github.com/cliqz-oss/adblocker/pull/990) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#988](https://github.com/cliqz-oss/adblocker/pull/988) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#985](https://github.com/cliqz-oss/adblocker/pull/985) ([@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- build(deps): bump @types/chrome from 0.0.118 to 0.0.119 [#1063](https://github.com/cliqz-oss/adblocker/pull/1063) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @types/chrome from 0.0.117 to 0.0.118 [#1057](https://github.com/cliqz-oss/adblocker/pull/1057) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump tldts-experimental from 5.6.36 to 5.6.37 [#1033](https://github.com/cliqz-oss/adblocker/pull/1033) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @types/chrome from 0.0.116 to 0.0.117 [#1021](https://github.com/cliqz-oss/adblocker/pull/1021) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @types/chrome from 0.0.115 to 0.0.116 [#1009](https://github.com/cliqz-oss/adblocker/pull/1009) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @remusao/smaz-generate from 1.8.0 to 1.9.0 [#997](https://github.com/cliqz-oss/adblocker/pull/997) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @types/chrome from 0.0.114 to 0.0.115 [#995](https://github.com/cliqz-oss/adblocker/pull/995) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump mocha from 7.2.0 to 8.0.1 [#986](https://github.com/cliqz-oss/adblocker/pull/986) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 2

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))

---

# v1.16.0 (Wed Jun 10 2020)

#### :rocket: New Feature

- feature: add support for Playwright blocking [#417](https://github.com/cliqz-oss/adblocker/pull/417) ([@remusao](https://github.com/remusao))

#### :bug: Bug Fix

- build(deps-dev): bump @ampproject/rollup-plugin-closure-compiler ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### :house: Internal

- Update local assets [#982](https://github.com/cliqz-oss/adblocker/pull/982) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#978](https://github.com/cliqz-oss/adblocker/pull/978) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#972](https://github.com/cliqz-oss/adblocker/pull/972) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#971](https://github.com/cliqz-oss/adblocker/pull/971) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#970](https://github.com/cliqz-oss/adblocker/pull/970) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#966](https://github.com/cliqz-oss/adblocker/pull/966) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#960](https://github.com/cliqz-oss/adblocker/pull/960) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#958](https://github.com/cliqz-oss/adblocker/pull/958) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#953](https://github.com/cliqz-oss/adblocker/pull/953) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#950](https://github.com/cliqz-oss/adblocker/pull/950) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#948](https://github.com/cliqz-oss/adblocker/pull/948) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#946](https://github.com/cliqz-oss/adblocker/pull/946) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#940](https://github.com/cliqz-oss/adblocker/pull/940) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#935](https://github.com/cliqz-oss/adblocker/pull/935) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#933](https://github.com/cliqz-oss/adblocker/pull/933) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#932](https://github.com/cliqz-oss/adblocker/pull/932) ([@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- build(deps-dev): bump @ampproject/rollup-plugin-closure-compiler from 0.25.2 to 0.26.0 [#956](https://github.com/cliqz-oss/adblocker/pull/956) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.15.1 (Mon May 25 2020)

#### :bug: Bug Fix

- Make fast hash outputs consistent and fix use of globals [#931](https://github.com/cliqz-oss/adblocker/pull/931) ([@remusao](https://github.com/remusao))

#### :house: Internal

- Update local assets [#929](https://github.com/cliqz-oss/adblocker/pull/929) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#926](https://github.com/cliqz-oss/adblocker/pull/926) ([@adblocker-bot](https://github.com/adblocker-bot))

#### Authors: 2

- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.15.0 (Sat May 23 2020)

#### :running_woman: Performance

- Speed-up index creation by using a typed array as histogram. [#924](https://github.com/cliqz-oss/adblocker/pull/924) ([@remusao](https://github.com/remusao))

#### :bug: Bug Fix

- build(deps): bump @types/chrome from 0.0.113 to 0.0.114 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @rollup/plugin-node-resolve from 7.1.3 to 8.0.0 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @types/chrome from 0.0.112 to 0.0.113 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @types/chrome from 0.0.111 to 0.0.112 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @types/chrome from 0.0.110 to 0.0.111 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @types/chrome from 0.0.109 to 0.0.110 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @types/chrome from 0.0.108 to 0.0.109 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @types/chrome from 0.0.107 to 0.0.108 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### :house: Internal

- Extension engine size script [#921](https://github.com/cliqz-oss/adblocker/pull/921) ([@remusao](https://github.com/remusao))
- Update local assets [#917](https://github.com/cliqz-oss/adblocker/pull/917) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#908](https://github.com/cliqz-oss/adblocker/pull/908) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#900](https://github.com/cliqz-oss/adblocker/pull/900) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#892](https://github.com/cliqz-oss/adblocker/pull/892) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#890](https://github.com/cliqz-oss/adblocker/pull/890) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#886](https://github.com/cliqz-oss/adblocker/pull/886) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#876](https://github.com/cliqz-oss/adblocker/pull/876) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#874](https://github.com/cliqz-oss/adblocker/pull/874) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#867](https://github.com/cliqz-oss/adblocker/pull/867) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#861](https://github.com/cliqz-oss/adblocker/pull/861) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#859](https://github.com/cliqz-oss/adblocker/pull/859) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#857](https://github.com/cliqz-oss/adblocker/pull/857) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#856](https://github.com/cliqz-oss/adblocker/pull/856) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#854](https://github.com/cliqz-oss/adblocker/pull/854) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#849](https://github.com/cliqz-oss/adblocker/pull/849) ([@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- build(deps): bump @types/chrome from 0.0.113 to 0.0.114 [#909](https://github.com/cliqz-oss/adblocker/pull/909) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @rollup/plugin-node-resolve from 7.1.3 to 8.0.0 [#907](https://github.com/cliqz-oss/adblocker/pull/907) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @types/puppeteer from 2.1.0 to 3.0.0 [#899](https://github.com/cliqz-oss/adblocker/pull/899) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @types/chrome from 0.0.112 to 0.0.113 [#898](https://github.com/cliqz-oss/adblocker/pull/898) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @types/chrome from 0.0.111 to 0.0.112 [#881](https://github.com/cliqz-oss/adblocker/pull/881) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @types/chrome from 0.0.110 to 0.0.111 [#877](https://github.com/cliqz-oss/adblocker/pull/877) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @types/chrome from 0.0.109 to 0.0.110 [#875](https://github.com/cliqz-oss/adblocker/pull/875) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @types/chrome from 0.0.108 to 0.0.109 [#873](https://github.com/cliqz-oss/adblocker/pull/873) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @types/chrome from 0.0.107 to 0.0.108 [#865](https://github.com/cliqz-oss/adblocker/pull/865) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.14.4 (Wed May 06 2020)

#### :bug: Bug Fix

- build(deps): bump @types/chrome from 0.0.106 to 0.0.107 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### :nail_care: Polish

- Update local assets with new list [#847](https://github.com/cliqz-oss/adblocker/pull/847) ([@remusao](https://github.com/remusao))

#### :house: Internal

- Update local assets [#845](https://github.com/cliqz-oss/adblocker/pull/845) ([@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- build(deps): bump @types/chrome from 0.0.106 to 0.0.107 [#843](https://github.com/cliqz-oss/adblocker/pull/843) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.14.3 (Mon May 04 2020)

#### :bug: Bug Fix

- build(deps-dev): bump rollup-plugin-sourcemaps from 0.5.0 to 0.6.1 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @types/chrome from 0.0.104 to 0.0.106 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### :house: Internal

- Update local assets [#840](https://github.com/cliqz-oss/adblocker/pull/840) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#839](https://github.com/cliqz-oss/adblocker/pull/839) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#834](https://github.com/cliqz-oss/adblocker/pull/834) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#831](https://github.com/cliqz-oss/adblocker/pull/831) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#822](https://github.com/cliqz-oss/adblocker/pull/822) ([@adblocker-bot](https://github.com/adblocker-bot) [@remusao](https://github.com/remusao))
- Update local assets [#817](https://github.com/cliqz-oss/adblocker/pull/817) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#815](https://github.com/cliqz-oss/adblocker/pull/815) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#807](https://github.com/cliqz-oss/adblocker/pull/807) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#804](https://github.com/cliqz-oss/adblocker/pull/804) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#803](https://github.com/cliqz-oss/adblocker/pull/803) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#801](https://github.com/cliqz-oss/adblocker/pull/801) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#794](https://github.com/cliqz-oss/adblocker/pull/794) ([@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- build(deps-dev): bump rollup-plugin-sourcemaps from 0.5.0 to 0.6.1 [#830](https://github.com/cliqz-oss/adblocker/pull/830) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @types/chrome from 0.0.104 to 0.0.106 [#813](https://github.com/cliqz-oss/adblocker/pull/813) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.14.2 (Tue Apr 21 2020)

#### :bug: Bug Fix

- build(deps-dev): bump @ampproject/rollup-plugin-closure-compiler ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @types/chrome from 0.0.103 to 0.0.104 ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### :nail_care: Polish

- Make third-party detection more robust [#790](https://github.com/cliqz-oss/adblocker/pull/790) ([@remusao](https://github.com/remusao))

#### :house: Internal

- Update local assets [#788](https://github.com/cliqz-oss/adblocker/pull/788) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#785](https://github.com/cliqz-oss/adblocker/pull/785) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#784](https://github.com/cliqz-oss/adblocker/pull/784) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#782](https://github.com/cliqz-oss/adblocker/pull/782) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#778](https://github.com/cliqz-oss/adblocker/pull/778) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#775](https://github.com/cliqz-oss/adblocker/pull/775) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#773](https://github.com/cliqz-oss/adblocker/pull/773) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#769](https://github.com/cliqz-oss/adblocker/pull/769) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#764](https://github.com/cliqz-oss/adblocker/pull/764) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#760](https://github.com/cliqz-oss/adblocker/pull/760) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#755](https://github.com/cliqz-oss/adblocker/pull/755) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#750](https://github.com/cliqz-oss/adblocker/pull/750) ([@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

- build(deps-dev): bump @ampproject/rollup-plugin-closure-compiler from 0.24.0 to 0.25.0 [#766](https://github.com/cliqz-oss/adblocker/pull/766) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps): bump @types/chrome from 0.0.103 to 0.0.104 [#751](https://github.com/cliqz-oss/adblocker/pull/751) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.14.1 (Thu Apr 09 2020)

### Release Notes

_From #746_

* Make sure that all unsupported procedural selectors from cosmetic filters are dropped to ensure that we only inject valid CSS selectors.
* Fix matching of `domain=` option for domain filters in cases where specified domain is a subdomain instead of full hostname or full domain.
* Fix partyness detection for requests without a valid domain (but having a valid hostname). This fixes matching against localhost request (for instance).
* Fix engine updates stress test which allows to replay all day-to-day diffs since the beginning of times... (currently about a year) and make sure that all updates work and resulting engine is byte-identical with diff-update or full initialization.
* Fix script to analyze size of serialized engines for all presets as well as all kinds of compression (i.e. none, gzip and brotli). This allows to keep track of final size after small-strings compression was applied.

---

#### :nail_care: Polish

- Fix domain options with subdomains and more... [#746](https://github.com/cliqz-oss/adblocker/pull/746) ([@remusao](https://github.com/remusao))

#### :house: Internal

- Update local assets [#749](https://github.com/cliqz-oss/adblocker/pull/749) ([@adblocker-bot](https://github.com/adblocker-bot))

#### Authors: 2

- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.14.0 (Wed Apr 08 2020)

### Release Notes

_From #738_

* Add `guessRequestTypeFromUrl` config option to all blocker classes which allows to automatically guess the type of network requests based on their URLs. This can be useful for cases where the type is either not available or not accurately inferred (e.g. when requests have time 'other').
* Fix a case where `PuppeteerBlocker` could show an async unhandled exception in console when trying to remove blocked iframes in pages.
* Fix redirection to binary resources (i.e. base64 encoded). An issue caused these resources to be corrupted which means that redirected resources were not valid (e.g. invalid PNG image).
* Redirection to local resources has been improved and will now always succeed thanks to a system of fallback. More types are also available for redirection.
* Improve API of blocker classes (i.e. PuppeteerBlocker, ElectronBlocker and WebExtensionBlocker) to allow creating custom blocking logic of resources using: `blockScripts`, `blockImages`, `blockMedias`, `blockFrames`, `blockFonts`, and `blockStyles`. These helpers can be called on any existing blocker instance, or on a new one created with the `empty()` static method.
* Add initial DSL (Domain Specific Language) to create blocking rules with a high-level API. This is used behind the scene to implement the new blocking methods now exposed by blocker instances. This new DSL should be considered alpha-quality and the API will likely change (and break) in the future. It might also be extended to handle hiding rules (a.k.a cosmetic filters).
* Fix behavior of `NetworkFilter#toString` which should now return a better pretty-printed version of the original filters whenever the `debug` option was false (in which case some information about the original raw string is lost and the string version needs to be inferred back).
* Implement handling of data: URLs. This means that the Request abstraction will now treat them as valid requests and that their type should always be inferred correctly. Moreover, the matching of data: URLs will now only take into account the prefix and ignore anything following the ',' separator.
* Requests with empty domain will not be treated as third-party anymore (this should not happen in the wild and was mostly impacting our unit tests).

---

#### :rocket: New Feature

- Various improvements [#738](https://github.com/cliqz-oss/adblocker/pull/738) ([@remusao](https://github.com/remusao))

#### :house: Internal

- Update local assets [#740](https://github.com/cliqz-oss/adblocker/pull/740) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#734](https://github.com/cliqz-oss/adblocker/pull/734) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#727](https://github.com/cliqz-oss/adblocker/pull/727) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#721](https://github.com/cliqz-oss/adblocker/pull/721) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#719](https://github.com/cliqz-oss/adblocker/pull/719) ([@adblocker-bot](https://github.com/adblocker-bot))

#### Authors: 2

- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.13.1 (Fri Apr 03 2020)

#### :house: Internal

- Update local assets [#711](https://github.com/cliqz-oss/adblocker/pull/711) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#704](https://github.com/cliqz-oss/adblocker/pull/704) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#699](https://github.com/cliqz-oss/adblocker/pull/699) ([@adblocker-bot](https://github.com/adblocker-bot))
- Move from jest to mocha + chai [#682](https://github.com/cliqz-oss/adblocker/pull/682) ([@remusao](https://github.com/remusao))
- Update local assets [#693](https://github.com/cliqz-oss/adblocker/pull/693) ([@adblocker-bot](https://github.com/adblocker-bot))

#### Authors: 2

- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.13.0 (Mon Mar 30 2020)

#### :house: Internal

- Update local assets [#685](https://github.com/cliqz-oss/adblocker/pull/685) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets [#681](https://github.com/cliqz-oss/adblocker/pull/681) ([@adblocker-bot](https://github.com/adblocker-bot))

#### Authors: 1

- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))

---

# v1.12.3 (Sat Mar 28 2020)

#### :nail_care: Polish

- Do not try to get resources from CDN [#680](https://github.com/cliqz-oss/adblocker/pull/680) ([@remusao](https://github.com/remusao))

#### :house: Internal

- Make sure updater always gets latest version of resources [#679](https://github.com/cliqz-oss/adblocker/pull/679) ([@remusao](https://github.com/remusao))
- Update local assets [#676](https://github.com/cliqz-oss/adblocker/pull/676) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update README.md [#670](https://github.com/cliqz-oss/adblocker/pull/670) ([@remusao](https://github.com/remusao))

#### :nut_and_bolt: Dependencies

- build(deps): bump @types/chrome from 0.0.102 to 0.0.103 [#671](https://github.com/cliqz-oss/adblocker/pull/671) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.12.2 (Fri Mar 27 2020)

#### :house: Internal

- Update local assets and compression codebooks [#667](https://github.com/cliqz-oss/adblocker/pull/667) ([@adblocker-bot](https://github.com/adblocker-bot))

#### Authors: 1

- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))

---

# v1.12.1 (Thu Mar 26 2020)

#### :nail_care: Polish

- Make id of fuzzy filter invariant under permutations [#666](https://github.com/cliqz-oss/adblocker/pull/666) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

---

# v1.12.0 (Thu Mar 26 2020)

#### :running_woman: Performance

- Fine-tune tokenization by preventing buffer overflows in main loop. [#665](https://github.com/cliqz-oss/adblocker/pull/665) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

---

# v1.11.0 (Thu Mar 26 2020)

#### :rocket: New Feature

- Add support for multi-lines filters (i.e. line continuation) [#663](https://github.com/cliqz-oss/adblocker/pull/663) ([@remusao](https://github.com/remusao))

#### :house: Internal

- Fix compression codebooks generation [#660](https://github.com/cliqz-oss/adblocker/pull/660) ([@remusao](https://github.com/remusao))
- Update local assets and compression codebooks [#659](https://github.com/cliqz-oss/adblocker/pull/659) ([@adblocker-bot](https://github.com/adblocker-bot))

#### Authors: 2

- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.10.0 (Wed Mar 25 2020)

#### :running_woman: Performance

- Various optimizations. [#655](https://github.com/cliqz-oss/adblocker/pull/655) ([@remusao](https://github.com/remusao))

#### :house: Internal

- Update local assets and compression codebooks [#652](https://github.com/cliqz-oss/adblocker/pull/652) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#648](https://github.com/cliqz-oss/adblocker/pull/648) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#645](https://github.com/cliqz-oss/adblocker/pull/645) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#637](https://github.com/cliqz-oss/adblocker/pull/637) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#636](https://github.com/cliqz-oss/adblocker/pull/636) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#633](https://github.com/cliqz-oss/adblocker/pull/633) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#628](https://github.com/cliqz-oss/adblocker/pull/628) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#626](https://github.com/cliqz-oss/adblocker/pull/626) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#625](https://github.com/cliqz-oss/adblocker/pull/625) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#623](https://github.com/cliqz-oss/adblocker/pull/623) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#622](https://github.com/cliqz-oss/adblocker/pull/622) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#620](https://github.com/cliqz-oss/adblocker/pull/620) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#616](https://github.com/cliqz-oss/adblocker/pull/616) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#613](https://github.com/cliqz-oss/adblocker/pull/613) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#608](https://github.com/cliqz-oss/adblocker/pull/608) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#604](https://github.com/cliqz-oss/adblocker/pull/604) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#601](https://github.com/cliqz-oss/adblocker/pull/601) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#597](https://github.com/cliqz-oss/adblocker/pull/597) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#590](https://github.com/cliqz-oss/adblocker/pull/590) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#572](https://github.com/cliqz-oss/adblocker/pull/572) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#568](https://github.com/cliqz-oss/adblocker/pull/568) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#562](https://github.com/cliqz-oss/adblocker/pull/562) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#557](https://github.com/cliqz-oss/adblocker/pull/557) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#556](https://github.com/cliqz-oss/adblocker/pull/556) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#554](https://github.com/cliqz-oss/adblocker/pull/554) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#549](https://github.com/cliqz-oss/adblocker/pull/549) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#548](https://github.com/cliqz-oss/adblocker/pull/548) ([@adblocker-bot](https://github.com/adblocker-bot))

#### :nut_and_bolt: Dependencies

-  [#653](https://github.com/cliqz-oss/adblocker/pull/653) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#629](https://github.com/cliqz-oss/adblocker/pull/629) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#617](https://github.com/cliqz-oss/adblocker/pull/617) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#587](https://github.com/cliqz-oss/adblocker/pull/587) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#586](https://github.com/cliqz-oss/adblocker/pull/586) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#560](https://github.com/cliqz-oss/adblocker/pull/560) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#577](https://github.com/cliqz-oss/adblocker/pull/577) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
-  [#552](https://github.com/cliqz-oss/adblocker/pull/552) ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.9.2 (Wed Feb 26 2020)

#### :bug: Bug Fix

- build(deps): bump @types/chrome from 0.0.96 to 0.0.97

Bumps [@types/chrome](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/HEAD/types/chrome) from 0.0.96 to 0.0.97.
- [Release notes](https://github.com/DefinitelyTyped/DefinitelyTyped/releases)
- [Commits](https://github.com/DefinitelyTyped/DefinitelyTyped/commits/HEAD/types/chrome)

Signed-off-by: dependabot-preview[bot] <support@dependabot.com>  ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### :house: Internal

- Update local assets and compression codebooks [#544](https://github.com/cliqz-oss/adblocker/pull/544) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#537](https://github.com/cliqz-oss/adblocker/pull/537) ([@adblocker-bot](https://github.com/adblocker-bot))
- Automatically bump internal engine version on codebooks update [#536](https://github.com/cliqz-oss/adblocker/pull/536) ([@remusao](https://github.com/remusao))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.9.1 (Sun Feb 23 2020)

#### :bug: Bug Fix

- Bump internal engine representation [#534](https://github.com/cliqz-oss/adblocker/pull/534) ([@remusao](https://github.com/remusao))
- Bump internal engine representation  ([@remusao](https://github.com/remusao))

#### :house: Internal

- Update local assets and compression codebooks [#532](https://github.com/cliqz-oss/adblocker/pull/532) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#529](https://github.com/cliqz-oss/adblocker/pull/529) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#525](https://github.com/cliqz-oss/adblocker/pull/525) ([@adblocker-bot](https://github.com/adblocker-bot))
- Improve tool to list unsupported filter syntax [#524](https://github.com/cliqz-oss/adblocker/pull/524) ([@remusao](https://github.com/remusao))

#### Authors: 2

- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.9.0 (Thu Feb 20 2020)

#### :running_woman: Performance

- Replace use of setTimeout to delay event by more efficient queueMicrotask. [#523](https://github.com/cliqz-oss/adblocker/pull/523) ([@remusao](https://github.com/remusao))

#### :bug: Bug Fix

- build(deps): bump @types/chrome from 0.0.95 to 0.0.96

Bumps [@types/chrome](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/HEAD/types/chrome) from 0.0.95 to 0.0.96.
- [Release notes](https://github.com/DefinitelyTyped/DefinitelyTyped/releases)
- [Commits](https://github.com/DefinitelyTyped/DefinitelyTyped/commits/HEAD/types/chrome)

Signed-off-by: dependabot-preview[bot] <support@dependabot.com>  ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))
- build(deps-dev): bump @ampproject/rollup-plugin-closure-compiler

Bumps [@ampproject/rollup-plugin-closure-compiler](https://github.com/ampproject/rollup-plugin-closure-compiler) from 0.21.0 to 0.22.2.
- [Release notes](https://github.com/ampproject/rollup-plugin-closure-compiler/releases)
- [Commits](https://github.com/ampproject/rollup-plugin-closure-compiler/compare/v0.21.0...v0.22.2)

Signed-off-by: dependabot-preview[bot] <support@dependabot.com>  ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### :house: Internal

- Update local assets and compression codebooks [#520](https://github.com/cliqz-oss/adblocker/pull/520) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#515](https://github.com/cliqz-oss/adblocker/pull/515) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#510](https://github.com/cliqz-oss/adblocker/pull/510) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#508](https://github.com/cliqz-oss/adblocker/pull/508) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#503](https://github.com/cliqz-oss/adblocker/pull/503) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#502](https://github.com/cliqz-oss/adblocker/pull/502) ([@adblocker-bot](https://github.com/adblocker-bot))
- Update local assets and compression codebooks [#497](https://github.com/cliqz-oss/adblocker/pull/497) ([@adblocker-bot](https://github.com/adblocker-bot))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))

---

# v1.8.5 (Thu Feb 13 2020)

#### :nail_care: Polish

- Fetch resources from GitHub repository [#495](https://github.com/cliqz-oss/adblocker/pull/495) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

---

# v1.8.4 (Thu Feb 13 2020)

#### :bug: Bug Fix

- Fix implicit tslib dependency [#494](https://github.com/cliqz-oss/adblocker/pull/494) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

---

# v1.8.3 (Thu Feb 13 2020)

#### :bug: Bug Fix

- Bump internal engine representation  ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

---

# v1.8.2 (Wed Feb 12 2020)

#### :bug: Bug Fix

- chore: update local assets [#491](https://github.com/cliqz-oss/adblocker/pull/491) ([@adblocker-bot](https://github.com/adblocker-bot))

#### Authors: 1

- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))

---

# v1.8.1 (Wed Feb 12 2020)

#### :nail_care: Polish

- Expose original request details through Request class [#490](https://github.com/cliqz-oss/adblocker/pull/490) ([@remusao](https://github.com/remusao))

#### Authors: 1

- Rémi ([@remusao](https://github.com/remusao))

---

# v1.8.0 (Wed Feb 12 2020)

#### :running_woman: Performance

- Target ES6 instead of ES3 [#489](https://github.com/cliqz-oss/adblocker/pull/489) ([@remusao](https://github.com/remusao))

#### :bug: Bug Fix

- chore: update local assets [#485](https://github.com/cliqz-oss/adblocker/pull/485) ([@adblocker-bot](https://github.com/adblocker-bot))
- build(deps): bump @types/chrome from 0.0.94 to 0.0.95

Bumps [@types/chrome](https://github.com/DefinitelyTyped/DefinitelyTyped/tree/HEAD/types/chrome) from 0.0.94 to 0.0.95.
- [Release notes](https://github.com/DefinitelyTyped/DefinitelyTyped/releases)
- [Commits](https://github.com/DefinitelyTyped/DefinitelyTyped/commits/HEAD/types/chrome)

Signed-off-by: dependabot-preview[bot] <support@dependabot.com>  ([@dependabot-preview[bot]](https://github.com/dependabot-preview[bot]))

#### Authors: 3

- [@dependabot-preview[bot]](https://github.com/dependabot-preview[bot])
- Adblocker Bot ([@adblocker-bot](https://github.com/adblocker-bot))
- Rémi ([@remusao](https://github.com/remusao))