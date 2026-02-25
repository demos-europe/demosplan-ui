# Changelog

Since v0.0.10, this Changelog is formatted according to the [Common Changelog][common-changelog] recommendations.

## UNRELEASED

### Added

- ([#1441](https://github.com/demos-europe/demosplan-ui/pull/1441)) DpConfirmDialog: Add props to customize confirm and decline button text ([@meissnerdemos](https://github.com/meissnerdemos))

### Fixed

- ([#1438](https://github.com/demos-europe/demosplan-ui/pull/1438)) Security: Bump qs to ^6.14.2 to fix DoS vulnerability ([@hwiem](https://github.com/hwiem))
- ([#1439](https://github.com/demos-europe/demosplan-ui/pull/1439)) Security: Add qs to resolutions to fix transitive DoS vulnerability ([@hwiem](https://github.com/hwiem))

## v0.11.0 - 2026-2-18

### Added
- ([#1437](https://github.com/demos-europe/demosplan-ui/pull/1437)) Add a new validation utility function ([@sakutademos](https://github.com/sakutademos))

## v0.10.0 - 2026-2-11

### Fixed
- ([#1436](https://github.com/demos-europe/demosplan-ui/pull/1436)) DpSlidebar: Add wrapper div for scrollable content to allow vertical scroll ([@rafelddemos](https://github.com/rafelddemos))

## v0.9.0 - 2026-2-9

### Added
- ([#1435](https://github.com/demos-europe/demosplan-ui/pull/1435)) DpSlidebar: Add slot for a resizing button ([@rafelddemos](https://github.com/rafelddemos))

## v0.8.0 - 2026-2-4

### Fixed
- ([#1432](https://github.com/demos-europe/demosplan-ui/pull/1432)) DpTextArea: Add missing tooltip prop ([@hwiem](https://github.com/hwiem))
- ([#1433](https://github.com/demos-europe/demosplan-ui/pull/1433)) Validation: Add missing exports ([@hwiem](https://github.com/hwiem))

## v0.7.1 - 2026-1-29

### Fixed

- ([#1431](https://github.com/demos-europe/demosplan-ui/pull/1431)) preventEditing.js: Allow keys to navigate with keyboard([@riechedemos](https://github.com/riechedemos))

## v0.7.0 - 2026-1-19

_This release includes changes previously released in v0.5.9-hotfix.1 through v0.5.9-hotfix.4._

### Added
- ([#1425](https://github.com/demos-europe/demosplan-ui/pull/1425)) Accessibility improvements: Add aria-label to DpDatepicker ([@riechedemos](https://github.com/riechedemos))
- ([#1424](https://github.com/demos-europe/demosplan-ui/pull/1424)) DpButton: Add the 'iconWeight' prop to DpButton component ([@sakutademos](https://github.com/sakutademos))
- ([#1415](https://github.com/demos-europe/demosplan-ui/pull/1415)) Accessibility improvements: Add aria-label attribute to the DpToggle component ([@sakutademos](https://github.com/sakutademos))
- ([#1413](https://github.com/demos-europe/demosplan-ui/pull/1413)) DpFlyout: Add new props ([@sakutademos](https://github.com/sakutademos))

### Fixed
- ([#1430](https://github.com/demos-europe/demosplan-ui/pull/1430)) Build: Fix tree-shaking issues, use ESM-only build ([@hwiem](https://github.com/hwiem))
- ([#1422](https://github.com/demos-europe/demosplan-ui/pull/1422)) DpMultiselect: Fix premature error styling by removing validation from update hook ([@meissnerdemos](https://github.com/meissnerdemos))
- ([#1421](https://github.com/demos-europe/demosplan-ui/pull/1421)) DpTabs & DpTab: Link import buttons in DpTabs to their DpTab children with aria-attributes (`id` and `aria-labelledby`)([@rafelddemos](https://github.com/rafelddemos))
- ([#1420](https://github.com/demos-europe/demosplan-ui/pull/1420)) DpDataTable & DpTableHeader: Fix caret icon state in expandable rows ([@rafelddemos](https://github.com/rafelddemos))
- ([#1419](https://github.com/demos-europe/demosplan-ui/pull/1419)) DpToggle: Rename the computed variable ([@sakutademos](https://github.com/sakutademos))
- ([#1418](https://github.com/demos-europe/demosplan-ui/pull/1418)) Accessibility improvements: Add aria-required attribute to vue multiselect ([@riechedemos](https://github.com/riechedemos))
- ([#1416](https://github.com/demos-europe/demosplan-ui/pull/1416)) Accessibility improvements: DpTabs and DpBulkEditHeader ([@sakutademos](https://github.com/sakutademos))
- ([#1414](https://github.com/demos-europe/demosplan-ui/pull/1412)) Accessibility improvements: Separate labels for DpDateRangePicker, internal label support for DpDatepicker, and aria-labels for table checkboxes ([@riechedemos](https://github.com/riechedemos))
- ([#1417](https://github.com/demos-europe/demosplan-ui/pull/1417)) Accessibility improvements: DpEditor gets aria-label in editorProps ([@riechedemos](https://github.com/riechedemos))
- ([#1412](https://github.com/demos-europe/demosplan-ui/pull/1412)) DpDatepicker & DpEditor: Fix label click focus ([@riechedemos](https://github.com/riechedemos))

## v0.6.0 - 2025-12-1

### Changed

- ([#1409](https://github.com/demos-europe/demosplan-ui/pull/1409)) Build: Make demosplan-ui tree-shakeable (requires node >= 20.19.0 in development), replace webpack with vite ([@hwiem](https://github.com/hwiem))

### Fixed
- ([#1407](https://github.com/demos-europe/demosplan-ui/pull/1407)) DpEditor: Prevent cursor jump after obscuring text ([@hwiem](https://github.com/hwiem))

## v0.5.9 - 2025-11-18

### Added
- ([#1401](https://github.com/demos-europe/demosplan-ui/pull/1401)) DpMultiselect: add new prop ([@sakutademos](https://github.com/sakutademos))

### Fixed
- ([#1400](https://github.com/demos-europe/demosplan-ui/pull/1400)) DpModal: Refactor to use native dialog element for improved accessibility and focus management ([@meissnerdemos](https://github.com/meissnerdemos))
- ([#1384](https://github.com/demos-europe/demosplan-ui/pull/1384)) DpNotification: Improve accessibility by enabling focus on close button and using appropriate ARIA roles ([@meissnerdemos](https://github.com/meissnerdemos))

### Changed
- ([#1399](https://github.com/demos-europe/demosplan-ui/pull/1399)) DpTabs: make it responsive ([@sakutademos](https://github.com/sakutademos))
- ([#1377](https://github.com/demos-europe/demosplan-ui/pull/1377)) BREAKING: DpInput: Remove support for vue 2 v-model pattern ([@hwiem](https://github.com/hwiem))

## v0.5.8 - 2025-10-15

### Fixed
- ([#1358](https://github.com/demos-europe/demosplan-ui/pull/1358)) DpAutocomplete: Fix several UX issues ([@hwiem](https://github.com/hwiem))

### Changed
- ([#1358](https://github.com/demos-europe/demosplan-ui/pull/1358)) BREAKING: DpInput/DpResettableInput: Pass only class attr to root element ([@hwiem](https://github.com/hwiem))
- Dependency updates:
  - vue from 3.5.17 to 3.5.22
  - @vue/server-renderer from 3.5.13 to 3.5.22
  - @vue/compat from 3.5.17 to 3.5.22
  - @vue/compiler-sfc from 3.5.17 to 3.5.22
  - uuid from 11.1.0 to 13.0.0
  - react from 18.2.0 to 19.1.0
  - react-dom from 18.2.0 to 19.1.0


## v0.5.7 - 2025-09-01

### Added
- ([#1344](https://github.com/demos-europe/demosplan-ui/pull/1344)) Add the de translations object to index.js, so it can be exported from demosplan-ui ([@sakutademos](https://github.com/sakutademos)

## v0.5.6 - 2025-08-11

### Fixed
- ([#1332](https://github.com/demos-europe/demosplan-ui/pull/1332)) DpButton: Fix focus style ([@hwiem](https://github.com/hwiem))

### Changed
- Dependency updates:
  - globals from 16.0.0 to 16.3.0
  - ts-loader from 9.5.1 to 9.5.2
  - typescript from 5.8.3 to 5.9.2

## v0.5.5 - 2025-08-08

### Added
- ([#1331](https://github.com/demos-europe/demosplan-ui/pull/1331)) DpIcon: Add warning-circle icon ([@rafelddemos](https://github.com/rafelddemos))

### Fixed
- ([#1328](https://github.com/demos-europe/demosplan-ui/pull/1328)) Add more prosemirror packages to resolutions to prevent dependency conflicts ([@meissnerdemos](https://github.com/meissnerdemos))

### Changed
- ([#1330](https://github.com/demos-europe/demosplan-ui/pull/1330)) DpNotification: Allow non-error notifications to persist ([@rafelddemos](https://github.com/rafelddemos))


## v0.5.4 - 2025-07-29

### Added
- ([#1324](https://github.com/demos-europe/demosplan-ui/pull/1324)) DpFlyout: add position prop to control flyout positioning ([@meissnerdemos](https://github.com/meissnerdemos))

### Fixed
- ([#1324](https://github.com/demos-europe/demosplan-ui/pull/1324)) DpResettableInput: fix slot detection logic for fragments and text nodes ([@meissnerdemos](https://github.com/meissnerdemos))

### Changed
- ([#1323](https://github.com/demos-europe/demosplan-ui/pull/1323)) DpAccordion: Remove default submit behaviour and adjust styles ([@rafelddemos](https://github.com/rafelddemos))
- ([#1321](https://github.com/demos-europe/demosplan-ui/pull/1321)) BREAKING: Remove DpFormRow ([@salisdemos](https://github.com/salisdemos))
- ([#1318](https://github.com/demos-europe/demosplan-ui/pull/1318)) DpEditableList: ensure Vue 3 v-model works correctly under compat mode ([@sakutademos](https://github.com/sakutademos)


## v0.5.3 - 2025-07-17

### Changed

- ([#4930](https://github.com/demos-europe/demosplan-core/pull/4930)) BREAKING: Use checkResponse in DpApi to check the response status code. ([@salisdemos](https://github.com/salisdemos))
  With this change, dpApi will now return `response` instead of `response.data`
- Various Dependency updates
- ([#1312](https://github.com/demos-europe/demosplan-ui/pull/1312)) Adjust tsConfig moduleResolution to bundler  ([@salisdemos](https://github.com/salisdemos))


## v0.5.2 - 2025-07-09

### Changed

- ([#1269](https://github.com/demos-europe/demosplan-ui/pull/1269) BREAKING: Update DpAccordion, DpBadge, DpBulkEditHeader, DpCard, DpFlyout to use Tailwind classes ([@spiess-demos](https://github.com/spiess-demos))
- merge changes from 0.4.x into 0.5.x


## v0.5.1 - 2025-05-19

### Changed

- ([#1274](https://github.com/demos-europe/demosplan-ui/pull/1274)) dpValidateMixin.js: adding topic names to field names in error messages([@riechedemos](https://github.com/riechedemos))

### Fixed

- ([#1278](https://github.com/demos-europe/demosplan-ui/pull/1278) Do not use css vars for Tailwind breakpoints config ([@spiess-demos](https://github.com/spiess-demos))


## v0.5.0 - 2025-05-15

### Changed

- ([#1275](https://github.com/demos-europe/demosplan-ui/pull/1275) BREAKING: Update Tailwind to v4, see PR description for details ([@spiess-demos](https://github.com/spiess-demos))


## v0.4.23 - 2025-07-16

### Fixed

- ([#1319](https://github.com/demos-europe/demosplan-ui/pull/1319)) DpEditableList: ensure Vue 3 v-model works correctly under compat mode ([@sakutademos](https://github.com/sakutademos)


## v0.4.22 - 2025-07-15

### Added

- ([#1311](https://github.com/demos-europe/demosplan-ui/pull/1311)) DpAutocomplete: Add optional search button ([@hwiem](https://github.com/hwiem))
- ([#1314](https://github.com/demos-europe/demosplan-ui/pull/1314)) DpProgressBar: Extend to allow alternative appearance ([@rafelddemos](https://github.com/rafelddemos)


## v0.4.21 - 2025-07-15

### Changed

- ([#1303](https://github.com/demos-europe/demosplan-ui/pull/1303)) ActionMenu.js: improve keyboard navigation ([@meissnerdemos](https://github.com/meissnerdemos)

## v0.4.20 - 2025-07-01

### Changed

- ([#1298](https://github.com/demos-europe/demosplan-ui/pull/1298)) DpEditableList: add a new prop to the component ([@sakutademos](https://github.com/sakutademos)


## v0.4.19 - 2025-06-30

### Fixed
- ([#1207](https://github.com/demos-europe/demosplan-ui/pull/1207)) Fix importing Mention Extiention in DpEditor ([@salisdemos](https://github.com/salisdemos))

### Changed
- ([#1295](https://github.com/demos-europe/demosplan-ui/pull/1295)) DpIcon/util/iconConfig.ts: Change the mapping for chevron icons from arrow to caret ([@huellnerdemos](https://github.com/huellnerdemos))
- ([#1294](https://github.com/demos-europe/demosplan-ui/pull/1294)) DpAnonymizeText: bump TipTap to 3.0.0-beta.8 and adjust syntax for BubbleMenu ([@meissnerdemos](https://github.com/meissnerdemos))

## v0.4.18 - 2025-06-18


### Fixed

- ([#1293](https://github.com/demos-europe/demosplan-ui/pull/1293)) DpSlidingPagination: add a check to emit the 'page-change' event when the page number does not exceed the total page count ([@sakutademos](https://github.com/sakutademos)
- ([#1278](https://github.com/demos-europe/demosplan-ui/pull/1287)) DpTreeList: Implement node selection without mutating vuex store state ([@hwiem](https://github.com/hwiem))


## v0.4.17 - 2025-06-11

### Changed

- ([#1274](https://github.com/demos-europe/demosplan-ui/pull/1274)) dpValidateMixin.js: Allow adding topic names to field names in error messages ([@riechedemos](https://github.com/riechedemos))
- ([#1289](https://github.com/demos-europe/demosplan-ui/pull/1289)) DpMultiselect: Adjust condition for button disabling / adjust custom event names in 6 files ([@rafelddemos](https://github.com/rafelddemos))


## v0.4.16 - 2025-05-12

### Added

- ([#1262](https://github.com/demos-europe/demosplan-ui/pull/1262)) DpUploadFiles: add new prop ([@sakutademos](https://github.com/sakutademos)

### Removed

- ([#1265](https://github.com/demos-europe/demosplan-ui/pull/1265) Remove DpTooltipIcon in favor of DpContextualHelp ([@spiess-demos](https://github.com/spiess-demos))

### Changed

- ([#1268](https://github.com/demos-europe/demosplan-ui/pull/1268)) DpAutocomplete: replace vue-omnibox with custom logic ([@salisdemos](https://github.com/salisdemos)
- ([#1267](https://github.com/demos-europe/demosplan-ui/pull/1267) Update Storybook to v8, enhance component documentation ([@spiess-demos](https://github.com/spiess-demos))
- ([#1272](https://github.com/demos-europe/demosplan-ui/pull/1246)) DpEditableList: Adjust margin between buttons ([@riechedemos](https://github.com/riechedemos))
- ([#1271](https://github.com/demos-europe/demosplan-ui/pull/1271)) DpTreeList: initialize the Stickier instances in nextTick and if the element’s height is greater than zero ([@sakutademos](https://github.com/sakutademos)

## v0.4.15 - 2025-05-07

### Fixed

- ([#1264](https://github.com/demos-europe/demosplan-ui/pull/1264) DpEditor: Adjust editor menu buttons ([@meissnerdemos](https://github.com/meissnerdemos))

## v0.4.14 - 2025-04-24

### Fixed

- ([#1266](https://github.com/demos-europe/demosplan-ui/pull/1266)) DpPager: add space between numbers and text in the pagination ([@rafelddemos](https://github.com/rafelddemos))

### Fixed

- ([#1246](https://github.com/demos-europe/demosplan-ui/pull/1246)) DpEditor: Adjust headingLevel function to expect an object with a level property ([@riechedemos](https://github.com/riechedemos))

### Added

- ([#1249](https://github.com/demos-europe/demosplan-ui/pull/1249)) DpMultiselect: add 'openDirection' prop ([@sakutademos](https://github.com/sakutademos)

## v0.4.13 - 2025-04-14

### Added

- ([#1243](https://github.com/demos-europe/demosplan-ui/pull/1243)) DpButton: emit blur, focus and mousedown events ([@hwiem](https://github.com/hwiem))

### Fixed

- ([#1239](https://github.com/demos-europe/demosplan-ui/pull/1239)) DpSearchField: Allow setting an input width for the search field ([@hwiem](https://github.com/hwiem))
- ([#1242](https://github.com/demos-europe/demosplan-ui/pull/1242)) DpDataTable: Set correct colCount for empty data table ([@hwiem](https://github.com/hwiem))

## v0.4.12 - 2025-04-08

### Fixed

- ([#1236](https://github.com/demos-europe/demosplan-ui/pull/1236)) DpResettableInput: update currentValue on input ([@sakutademos](https://github.com/sakutademos)


## v0.4.11 - 2025-04-07

### Fixed

- ([#1234](https://github.com/demos-europe/demosplan-ui/pull/1234)) Add padding to align DpFlyout button ([@riechedemos](https://github.com/riechedemos))
- ([#1235](https://github.com/demos-europe/demosplan-ui/pull/1235)) DpSlidingPagination: Make component vue3-compatible by updating vue-sliding-pagination  ([@hwiem](https://github.com/hwiem))

### Added
- ([#1228](https://github.com/demos-europe/demosplan-ui/pull/1228)) Create DpConfirmDialog component ([@sakutademos](https://github.com/sakutademos)


## v0.4.10 - 2025-04-07

Skipped due to publishing issues


## v0.4.9 - 2025-04-02

### Fixed
- ([#1224](https://github.com/demos-europe/demosplan-ui/pull/1224)) Changed DpTreeList to render toggle depending on content ([@riechedemos](https://github.com/riechedemos))

## v0.4.8 - 2025-03-24

### Fixed
- ([#1220](https://github.com/demos-europe/demosplan-ui/pull/1220)) DpEditor: Fix emitValue to pass obscure tag ([@riechedemos](https://github.com/riechedemos))


## v0.4.7 - 2025-03-20

### Fixed
- ([#1217](https://github.com/demos-europe/demosplan-ui/pull/1217)) DpEditor: Fix image upload ([@hwiem](https://github.com/hwiem))


## v0.4.6 - 2025-03-18

### Fixed
- ([#1208](https://github.com/demos-europe/demosplan-ui/pull/1208)) Remove useless wrapping div to make Multiselect Validation work again ([@salisdemos](https://github.com/salisdemos))
- ([#1214](https://github.com/demos-europe/demosplan-ui/pull/1214)) Properly emit checkboxGroup events ([@salisdemos](https://github.com/salisdemos))
- ([#1209](https://github.com/demos-europe/demosplan-ui/pull/1209)) Escape Multiline String Endings to avoid \n in classlist in DpButton ([@salisdemos](https://github.com/salisdemos))
- ([#1213](https://github.com/demos-europe/demosplan-ui/pull/1213)) Changed Icon to caret in DpWrapTrigger ([@riechedemos](https://github.com/riechedemos))

### Added
- ([#1215](https://github.com/demos-europe/demosplan-ui/pull/1215)) Reintroduce ClickOutside for some Components ([@salisdemos](https://github.com/salisdemos))
- ([#1216](https://github.com/demos-europe/demosplan-ui/pull/1216)) DpInput: Add prop for rounded input to allow full or only left or right rounded input ([@gruenbergerdemos](https://github.com/gruenbergerdemos))


## v0.4.5 - 2025-03-04

### Fixed
- ([#1202](https://github.com/demos-europe/demosplan-ui/pull/1202)) Catch full-width class in dpFormRow ([@salisdemos](https://github.com/salisdemos))
- ([#1203](https://github.com/demos-europe/demosplan-ui/pull/1203)) Fix typo in DpTreeListNode ([@salisdemos](https://github.com/salisdemos))
- ([#1204](https://github.com/demos-europe/demosplan-ui/pull/1204)) DpEditor: Fix imports for mention extension ([@hwiem](https://github.com/hwiem))


## v0.4.4 - 2025-02-26

### Added
- ([#1176](https://github.com/demos-europe/demosplan-ui/pull/1176), [#1182](https://github.com/demos-europe/demosplan-ui/pull/1182), [#1189](https://github.com/demos-europe/demosplan-ui/pull/1189)) DpIcon: Add new icons 'dots-three', 'map-pin', and 'faders' ([@hwiem](https://github.com/hwiem), [@spiess-demos](https://github.com/spiess-demos))
- ([#1193](https://github.com/demos-europe/demosplan-ui/pull/1193)) DpButtonRow: Add option for prop disabled to disable only primary or secondary button or both ([@gruenbergerdemos](https://github.com/gruenbergerdemos))

### Changed
- ([#1156](https://github.com/demos-europe/demosplan-ui/pull/1156)) DpSearchField: Introduce condensed search field with attached search button ([@hwiem](https://github.com/hwiem))
- ([#1074](https://github.com/demos-europe/demosplan-ui/pull/1080)) DpEditableList: Use DpButton instead of buttons and use new icons ([@gruenbergerdemos](https://github.com/gruenbergerdemos))
- ([#1191](https://github.com/demos-europe/demosplan-ui/pull/1191)) DpLabel: adjust position of the tooltip and hint ([@sakutademos](https://github.com/sakutademos)

### Fixed
- ([#1198](https://github.com/demos-europe/demosplan-ui/pull/1198)) Display Flyout in DpTableRow ([@salisdemos](https://github.com/salisdemos))
- ([#1157](https://github.com/demos-europe/demosplan-ui/pull/1157)) build: add missing dependency ([@hwiem](https://github.com/hwiem))


## v0.4.3 - 2024-12-11

### Fixed

- ([#1121](https://github.com/demos-europe/demosplan-ui/pull/1121)) DpDataTable: Add break words to columns to avoid overlapping content with resizable columns and make header truncatable ([@gruenbergerdemos](https://github.com/gruenbergerdemos))
- ([#1122](https://github.com/demos-europe/demosplan-ui/pull/1122)) DpDataTable: Remove overflow hidden from normal table rows and add a node type check for first children ([@gruenbergerdemos](https://github.com/gruenbergerdemos))
- ([#1093](https://github.com/demos-europe/demosplan-ui/pull/1096)) Fix jest tests ([@muellerdemos](https://github.com/muellerdemos))
- ([#1092](https://github.com/demos-europe/demosplan-ui/pull/1092)) DpUploadModal: Fix import of DpUploadFiles adjusted in [#1082](https://github.com/demos-europe/demosplan-ui/pull/1082) ([@hwiem](https://github.com/hwiem))
- ([#1093](https://github.com/demos-europe/demosplan-ui/pull/1093)) DpTableRow: Fix overlapping of columns ([@muellerdemos](https://github.com/muellerdemos))
- ([#1103](https://github.com/demos-europe/demosplan-ui/pull/1103)) Make TipTap Mention extension work ([@salisdemos](https://github.com/salisdemos))
- ([#1103](https://github.com/demos-europe/demosplan-ui/pull/1103)) Restore Reactivity for DpInput and refactor props ([@salisdemos](https://github.com/salisdemos))

### Added
- ([#1087](https://github.com/demos-europe/demosplan-ui/pull/1087)) DpButton: Add 'reset' to possible values for type prop ([@hwiem](https://github.com/hwiem))
- ([#1085](https://github.com/demos-europe/demosplan-ui/pull/1085)) DpContextualHelp: Allow passing v-tooltip options ([@hwiem](https://github.com/hwiem))

### Changed

- ([#1105](https://github.com/demos-europe/demosplan-ui/pull/1105)) BREAKING: Minimum required Node version: 20.18.1 ([@salisdemos](https://github.com/salisdemos))
- ([#1082](https://github.com/demos-europe/demosplan-ui/pull/1082)) DpUpload: Make component available for direct usage ([@hwiem](https://github.com/hwiem))
- ([#1053](https://github.com/demos-europe/demosplan-ui/pull/1053)) Make `rootDraggable` Option work for dp-draggable ([@salisdemos](https://github.com/salisdemos))
- ([#1069](https://github.com/demos-europe/demosplan-ui/pull/1069)) DpButtonRow: also disable secondary button if 'disabled' is set to true ([@hwiem](https://github.com/hwiem))


## v0.4.2 - 2024-10-28

### Fixed

- ([#1053](https://github.com/demos-europe/demosplan-ui/pull/1053)) Make `rootDraggable` Option work for dp-draggable ([@salisdemos](https://github.com/salisdemos))
- ([#1054](https://github.com/demos-europe/demosplan-ui/pull/1054)) Fix validating dpMultiselect ([@salisdemos](https://github.com/salisdemos))
- ([#1052](https://github.com/demos-europe/demosplan-ui/pull/1052)) Pass RowData from DpDataTableExtended to DpDataTable slots ([@salisdemos](https://github.com/salisdemos))


## v0.4.1 - 2024-10-07

### Added
- ([#1030](https://github.com/demos-europe/demosplan-ui/pull/1030)) Add new utility: capitalizeFirstLetter ([@sakutademos](https://github.com/sakutademos)
- ([#1019](https://github.com/demos-europe/demosplan-ui/pull/1019)) DpVideoPlayer: Extend player to support embedded videos ([@gruenbergerdemos](https://github.com/gruenbergerdemos))

### Fixed
- ([#1031](https://github.com/demos-europe/demosplan-ui/pull/1031)) remove max chunkSize on tus uploads ([@muellerdemos](https://github.com/muellerdemos)
- ([#1022](https://github.com/demos-europe/demosplan-ui/pull/1022)) DpEditor: Make EditorContent accessible to the screen readers by adding the 'role' attribute ([@sakutademos](https://github.com/sakutademos)
- ([#1012](https://github.com/demos-europe/demosplan-ui/pull/1012)) Fix breakpoint values in Tailwind config ([@spiess-demos](https://github.com/spiess-demos))

### Changed
- ([#1023](https://github.com/demos-europe/demosplan-ui/pull/1023)) BREAKING: Replace vueDraggable with vueSortable: The API for dpDraggable changed ([@salisdemos](https://github.com/salisdemos))

## v0.4.0 - 2024-08-21

**Upgrade to Vue 3**
This library now emits a Vue 3 build. While it still has some Vue 2 dependencies, this is a huge step towards
full Vue 3 compatibility. Please be cautioned that this release may therefore be a bit less stable than
previous ones.

If you still find yourself requiring the Vue 2 only version, you may want to upgrade the version requirement
to `~0.3.*` in your package.json.

### Fixed

- ([#995](https://github.com/demos-europe/demosplan-ui/pull/995)) Prevent cursor in editor to jump to the End of the file, when obscured text is present  ([@salisdemos](https://github.com/salisdemos))
- ([#983](https://github.com/demos-europe/demosplan-ui/pull/983)) Fix issue where the project is not correctly installable. ([@spiess-demos](https://github.com/spiess-demos))


## v0.3.41 - 2024-11-28

### Fixed

- ([#1101](https://github.com/demos-europe/demosplan-ui/pull/1101)) DpTableRow: Fix flyout menu not visible ([@muellerdemos](https://github.com/muellerdemos))

## v0.3.40 - 2024-11-28

### Fixed

- ([#1100](https://github.com/demos-europe/demosplan-ui/pull/1100)) DpTableRow: Fix styles of flyout menu ([@muellerdemos](https://github.com/muellerdemos))
- ([#1099](https://github.com/demos-europe/demosplan-ui/pull/1099)) DpTreeList: Fix translation keys displayed as tooltip ([@hwiem](https://github.com/hwiem))

### Added

- ([#1099](https://github.com/demos-europe/demosplan-ui/pull/1099)) DpTreeList: Add prop to vertically center the toggle for branches;
  display tooltips for the toggles ([@hwiem](https://github.com/hwiem))

## v0.3.39 - 2024-11-26

### Fixed

- ([#1094](https://github.com/demos-europe/demosplan-ui/pull/1094)) DpTableRow: Fix overlapping of columns ([@muellerdemos](https://github.com/muellerdemos))

## v0.3.38 - 2024-11-15

### Fixed

- ([#1091](https://github.com/demos-europe/demosplan-ui/pull/1091)) DpUploadModal: Fix import of DpUploadFiles adjusted in [#1081](https://github.com/demos-europe/demosplan-ui/pull/1081) ([@hwiem](https://github.com/hwiem))
- ([#1090](https://github.com/demos-europe/demosplan-ui/pull/1090)) build: Add yarnrc.yml to allow running tests in build command ([@hwiem](https://github.com/hwiem))
- ([#1088](https://github.com/demos-europe/demosplan-ui/pull/1088)) DpLabel: Fix hiding the label via `hide` prop ([@hwiem](https://github.com/hwiem))

### Added
- ([#1086](https://github.com/demos-europe/demosplan-ui/pull/1086)) DpButton: Add 'reset' to possible values for type prop ([@hwiem](https://github.com/hwiem))
- ([#1084](https://github.com/demos-europe/demosplan-ui/pull/1084)) DpContextualHelp: Allow passing v-tooltip options ([@hwiem](https://github.com/hwiem))

## v0.3.37 - 2024-11-15

### Changed
- ([#1081](https://github.com/demos-europe/demosplan-ui/pull/1081)) DpUpload: Make component available for direct usage ([@hwiem](https://github.com/hwiem))

## v0.3.36 - 2024-11-14

### Added
- ([#1074](https://github.com/demos-europe/demosplan-ui/pull/1074)) DpInput: Add additional type number for prop value ([@gruenbergerdemos](https://github.com/gruenbergerdemos))

### Changed

-([#1074](https://github.com/demos-europe/demosplan-ui/pull/1074)) DpEditableList: Use DpButton instead of buttons and use new icons ([@gruenbergerdemos](https://github.com/gruenbergerdemos))

## v0.3.35 - 2024-11-04

### Added
- ([#1050](https://github.com/demos-europe/demosplan-ui/pull/1050)) DpCheckbox: add additional type to 'selected' prop ([@sakutademos](https://github.com/sakutademos)

### Changed

-([#1068](https://github.com/demos-europe/demosplan-ui/pull/1068)) DpButtonRow: also disable secondary button if 'disabled' is set to true ([@hwiem](https://github.com/hwiem))

## v0.3.34 - 2024-10-09

### Added

- ([#1042](https://github.com/demos-europe/demosplan-ui/pull/1042)) DpModal: Add closeButton slot ([@hwiem](https://github.com/hwiem))
- ([#1043](https://github.com/demos-europe/demosplan-ui/pull/1043)) New Flag for DpEditor: "allowPasteFromWord" (default false) to prevent pasting "html" from msOffice ([@salisdemos](https://github.com/salisdemos))

## v0.3.33 - 2024-10-02

### Changed

- ([#1033](https://github.com/demos-europe/demosplan-ui/pull/1029)) Dependencies: move 'vue' from peerDep to devDep; add @tiptap/extension-text-style ([@sakutademos](https://github.com/sakutademos)
- ([#994](https://github.com/demos-europe/demosplan-ui/pull/994)) BREAKING: Bump Yarn to v4.2.2 (again) ([@salisdemos](https://github.com/salisdemos))

### Added
- ([#1029](https://github.com/demos-europe/demosplan-ui/pull/1029)) add new utility: capitalizeFirstLetter ([@sakutademos](https://github.com/sakutademos)

### Fixed
- ([#1032](https://github.com/demos-europe/demosplan-ui/pull/1032)) remove max chunkSize on tus uploads ([@muellerdemos](https://github.com/muellerdemos)

## v0.3.32 - 2024-09-23

### Fixed
- ([#1027](https://github.com/demos-europe/demosplan-ui/pull/1027)) DpEditor: transform obscure tag on update action ([@sakutademos](https://github.com/sakutademos)
- ([#1021](https://github.com/demos-europe/demosplan-ui/pull/1021)) DpEditor: Make EditorContent accessible to the screen readers by adding the 'role' attribute ([@sakutademos](https://github.com/sakutademos)

## v0.3.31 - 2024-09-09

### Fixed
- ([#1011](https://github.com/demos-europe/demosplan-ui/pull/1011)) Fix breakpoint values in Tailwind config ([@spiess-demos](https://github.com/spiess-demos))

## v0.3.30 - 2024-09-04

### Added
- ([#1005](https://github.com/demos-europe/demosplan-ui/pull/1005)) DpVideoPlayer: Extend player to support embedded videos ([@gruenbergerdemos](https://github.com/gruenbergerdemos))

## v0.3.29 - 2024-08-21

### Fixed
- ([#995](https://github.com/demos-europe/demosplan-ui/pull/995)) Prevent cursor in editor to jump to the End of the file, when obscured text is present  ([@salisdemos](https://github.com/salisdemos))
- ([#983](https://github.com/demos-europe/demosplan-ui/pull/983)) Fix issue where the project is not correctly installable. ([@spiess-demos](https://github.com/spiess-demos))

## v0.3.28 - 2024-08-08

### Added
- ([#976](https://github.com/demos-europe/demosplan-ui/pull/976)) DpIcon: Add new icons check-square and square ([@gruenbergerdemos](https://github.com/gruenbergerdemos))

## v0.3.27 - 2024-07-30

### Fixed

- ([#967](https://github.com/demos-europe/demosplan-ui/pull/967)) Rollback Yarn 4. It leads to conflicts with prosemirror ([@salisdemos](https://github.com/salisdemos))

## v0.3.26

- lost due to publishing hickups

## v0.3.25 - 2024-07-30

- update prosemirror dependencies to resolve version conflics with tiptap

## v0.3.24 - 2024-07-29

### Fixed
- ([#962](https://github.com/demos-europe/demosplan-ui/pull/962)) Make spacing tokens work with Tailwindcss 3.4.7. ([@spiess-demos](https://github.com/spiess-demos))

### Added
- ([#961](https://github.com/demos-europe/demosplan-ui/pull/961)) DpEditor: Allow class attribute in custom links ([@gruenbergerdemos](https://github.com/gruenbergerdemos))

### Changed
- ([#954](https://github.com/demos-europe/demosplan-ui/pull/953)) BREAKING: Bump Yarn to v4.2.2 ([@salisdemos](https://github.com/salisdemos))

## v0.3.23 - 2024-07-26

### Changed

- ([#954](https://github.com/demos-europe/demosplan-ui/pull/954)) Allow all 2xx and 3xx as response Codes in DpApi (not only 200). ([@salisdemos](https://github.com/salisdemos))

### Fixed

- ([#955](https://github.com/demos-europe/demosplan-ui/pull/955)) BREAKING: Pass headerFields-Data to tableHeader slot so the content gets rendered ([@salisdemos](https://github.com/salisdemos))

## v0.3.22

- lost due to publishing hickups

## v0.3.21 - 2024-07-22

### Added

- ([#947](https://github.com/demos-europe/demosplan-ui/pull/947)) DpButtonRow: add validator ([@sakutademos](https://github.com/sakutademos))
- ([#945](https://github.com/demos-europe/demosplan-ui/pull/945)) Add color tokens: text-status-[changed|progress|complete]-fill. ([@spiess-demos](https://github.com/spiess-demos))
- ([#919](https://github.com/demos-europe/demosplan-ui/pull/919)) Add enlarging images on click for DpEditor ([@gruenbergerdemos](https://github.com/gruenbergerdemos))
- ([#929](https://github.com/demos-europe/demosplan-ui/pull/929)) Add data attributes for E-2-E Test ([@ahmad-demos](https://github.com/ahmad-demos))

### Fixed

- ([#911](https://github.com/demos-europe/demosplan-ui/pull/911)) DpButtonRow: update class ([@sakutademos](https://github.com/sakutademos))

## v0.3.20 - 2024-07-17

### Added

- ([#932](https://github.com/demos-europe/demosplan-ui/pull/932)) BREAKING: Make color tokens available to Tailwind config, with that the default tokens are no longer available. ([@spiess-demos](https://github.com/spiess-demos))


## v0.3.19 - 2024-07-12

### Fixed

- ([#917](https://github.com/demos-europe/demosplan-ui/pull/917)) Fix cut methode for TipTap Editor. ([@ahmad-demos](https://github.com/ahmad-demos))

### Added

- ([#926](https://github.com/demos-europe/demosplan-ui/pull/926)) Add data attributes for E-2-E Test ([@ahmad-demos](https://github.com/ahmad-demos))
- ([#921](https://github.com/demos-europe/demosplan-ui/pull/921)) Add data attributes for E-2-E Test ([@ahmad-demos](https://github.com/ahmad-demos))
- ([#916](https://github.com/demos-europe/demosplan-ui/pull/916)) Add data attributes for E-2-E Test ([@ahmad-demos](https://github.com/ahmad-demos))
- ([#912](https://github.com/demos-europe/demosplan-ui/pull/912)) Add data attributes for E-2-E Test ([@ahmad-demos](https://github.com/ahmad-demos))
- ([#908](https://github.com/demos-europe/demosplan-ui/pull/908)) Add data attributes for E-2-E Test ([@ahmad-demos](https://github.com/ahmad-demos))
- ([#895](https://github.com/demos-europe/demosplan-ui/pull/895)) Add data attributes for E-2-E Test ([@ahmad-demos](https://github.com/ahmad-demos))

### Changed

- ([#918](https://github.com/demos-europe/demosplan-ui/pull/918)) Remove Translator usages ([@ahmad-demos](https://github.com/ahmad-demos))
- ([#900](https://github.com/demos-europe/demosplan-ui/pull/900)) Refactor: Use tailwind class for hiding elements visually instead of custom class ([@gruenbergerdemos](https://github.com/gruenbergerdemos))
- ([#902](https://github.com/demos-europe/demosplan-ui/pull/902)) Remove !important default setting in Tailwind config ([@spiess-demos](https://github.com/spiess-demos))

## v0.3.18 - 2024-06-12

### Fixed

- ([#891](https://github.com/demos-europe/demosplan-ui/pull/891)) DpDataTable: Escape whitespaces and plus signs for searching ([@gruenbergerdemos](https://github.com/gruenbergerdemos))

### Added

- ([#893](https://github.com/demos-europe/demosplan-ui/pull/893)) Add data attributes for E-2-E Test ([@ahmad-demos](https://github.com/ahmad-demos))
- ([#892](https://github.com/demos-europe/demosplan-ui/pull/892)) DpInput: Add hidden attribute for label ([@gruenbergerdemos](https://github.com/gruenbergerdemos))
- ([#894](https://github.com/demos-europe/demosplan-ui/pull/894)) DpLabel: Add hidden attribute for visually hiding the label ([@gruenbergerdemos](https://github.com/gruenbergerdemos))

## v0.3.17 - 2024-05-30

### Changed

- ([#878](https://github.com/demos-europe/demosplan-ui/pull/878)) BREAKING: Prevent "select all" in DpDataTable from selecting "locked" items. Before, all items per page were selected, independent of the lock state ([@salisdemos](https://github.com/salisdemos))

### Added

- ([#881](https://github.com/demos-europe/demosplan-ui/pull/881)) Add data attributes for E-2-E Test ([@ahmad-demos](https://github.com/ahmad-demos))
- ([#875](https://github.com/demos-europe/demosplan-ui/pull/875)) Utils: add resistFingerprintingDuckTest ([@spiess-demos](https://github.com/spiess-demos))
- ([#879](https://github.com/demos-europe/demosplan-ui/pull/879)) DpDataTableExtended: Add prop for translations to pass on to DpDataTable ([@gruenbergerdemos](https://github.com/gruenbergerdemos))

## v0.3.16 - 2024-05-24

### Changed

- ([#856](https://github.com/demos-europe/demosplan-ui/pull/856)) Bump @tiptap to 2.4.0 ([@spiess-demos](https://github.com/spiess-demos))

### Added

- ([#868](https://github.com/demos-europe/demosplan-ui/pull/868)) Add data attributes for E-2-E Test ([@ahmad-demos](https://github.com/ahmad-demos))

## v0.3.15 - 2024-05-22

### Added

- ([#859](https://github.com/demos-europe/demosplan-ui/pull/859)) Add data attributes for E-2-E Test ([@ahmad-demos](https://github.com/ahmad-demos))

### Fixed

- ([#848](https://github.com/demos-europe/demosplan-ui/pull/848)) Don't show Tooltips after mouseout (prevent Tooltips from created twice) ([@salisdemos](https://github.com/salisdemos))
- ([#850](https://github.com/demos-europe/demosplan-ui/pull/850)) Input validation: use form as validation container ([@sakutademos](https://github.com/sakutademos))
- ([#860](https://github.com/demos-europe/demosplan-ui/pull/860)) DpDatePicker: set attribute only if datePickerInput is defined ([@gruenbergerdemos](https://github.com/gruenbergerdemos))
- ([#865](https://github.com/demos-europe/demosplan-ui/pull/865)) DpApi: Don't set Content-Type header for FormData ([@gruenbergerdemos](https://github.com/gruenbergerdemos))

## v0.3.14 - 2024-05-16

### Changed

- ([#851](https://github.com/demos-europe/demosplan-ui/pull/851)) DpLabel: replace the tooltip directive with the DpContextualHelp component ([@sakutademos](https://github.com/sakutademos))

### Fixed

- ([#858](https://github.com/demos-europe/demosplan-ui/pull/858)) DpCheckbox: fix vue warning related to type checking ([@sakutademos](https://github.com/sakutademos))

## v0.3.13 - 2024-05-15

### Added

- ([#847](https://github.com/demos-europe/demosplan-ui/pull/847)) Tailwind: add "scrollbar-none" class ([@spiess-demos](https://github.com/spiess-demos))

## v0.3.12 - 2024-05-06

### Fixed

- ([#844](https://github.com/demos-europe/demosplan-ui/pull/844)) Prevent changing Width on following DataTable Element, while resizing ([@salisdemos](https://github.com/salisdemos))

## v0.3.11 - 2024-05-03

### Fixed

- ([#843](https://github.com/demos-europe/demosplan-ui/pull/843)) DpInput: fix "length" prop validation ([@spiess-demos](https://github.com/spiess-demos))
- ([#841](https://github.com/demos-europe/demosplan-ui/pull/841)) Fix the DpDatepicker error validation ([@sakutademos](https://github.com/sakutademos))

## v0.3.10 - 2024-04-26

### Changed
- ([#835](https://github.com/demos-europe/demosplan-ui/pull/835)) DpDataTable: enhance column resizing functionality; save the width to sessionStorage ([@sakutademos](https://github.com/sakutademos))

### Added
- ([#834](https://github.com/demos-europe/demosplan-ui/pull/834)) DpButton: add icon size class ([@sakutademos](https://github.com/sakutademos))

## v0.3.9 - 2024-04-12

### Changed

- ([#829](https://github.com/demos-europe/demosplan-ui/pull/829)) Adjust DpContextualHelp Styling ([@ahmad-demos](https://github.com/ahmad-demos))
- ([#803](https://github.com/demos-europe/demosplan-ui/pull/803)) dpApi: remove "option" argument ([@spiess-demos](https://github.com/spiess-demos))

### Added

- ([#815](https://github.com/demos-europe/demosplan-ui/pull/815)) Add data attr for E-2-E Test ([@ahmad-demos](https://github.com/ahmad-demos))
- ([#812](https://github.com/demos-europe/demosplan-ui/pull/812)) Add missing data attr for E-2-E Test ([@ahmad-demos](https://github.com/ahmad-demos))
- ([#798](https://github.com/demos-europe/demosplan-ui/pull/798)) Add missing data attr for E-2-E Test ([@ahmad-demos](https://github.com/ahmad-demos))
- ([#773](https://github.com/demos-europe/demosplan-ui/pull/773)) Add missing data attr for E-2-E Test ([@ahmad-demos](https://github.com/ahmad-demos))

## v0.3.8 - 2024-03-15

### Added

- ([#783](https://github.com/demos-europe/demosplan-ui/pull/783)) Improve error validation for DpMultiselect and DpSelect components ([@sakutademos](https://github.com/sakutademos))

### Changed

- ([#774](https://github.com/demos-europe/demosplan-ui/pull/774)) Improve render performance of the DpTreeList component ([@sakutademos](https://github.com/sakutademos))
- ([#784](https://github.com/demos-europe/demosplan-ui/pull/784)) dpApi.get: Always serialize request params ([@spiess-demos](https://github.com/spiess-demos))

### Removed

- ([#779](https://github.com/demos-europe/demosplan-ui/pull/779)) Remove `build:css` script ([@spiess-demos](https://github.com/spiess-demos))

### Fixed

- ([#777](https://github.com/demos-europe/demosplan-ui/pull/785)) DpVideoPlayer: fix plyr import ([@hwiem](https://github.com/hwiem))
- ([#777](https://github.com/demos-europe/demosplan-ui/pull/777)) DpEditor: fix condition for console.warn ([@hwiem](https://github.com/hwiem))
- ([#748](https://github.com/demos-europe/demosplan-ui/pull/748)) Fix required for multiselect ([@gruenbergerdemos](https://github.com/gruenbergerdemos))
- ([#747](https://github.com/demos-europe/demosplan-ui/pull/747)) Add missing prop clearOnSelect to DpMultiselect (hotfix from v0.3.5-1) ([@spiess-demos](https://github.com/spiess-demos))

## v0.3.7 - 2024-02-12

### Changed

- ([#742](https://github.com/demos-europe/demosplan-ui/pull/742)) Bump @tiptap to 2.2.2 ([@spiess-demos](https://github.com/spiess-demos))
- ([#737](https://github.com/demos-europe/demosplan-ui/pull/737)) Bump webpack to 5.90.1 ([@spiess-demos](https://github.com/spiess-demos))

## v0.3.6 - 2024-02-07

### Fixed

- ([#729](https://github.com/demos-europe/demosplan-ui/pull/729)) Fix DpAnonymizeText functionality ([@sakutademos](https://github.com/sakutademos))

### Added

- ([#739](https://github.com/demos-europe/demosplan-ui/pull/739)) Add missing data attr for E-2-E Test ([@ahmad-demos](https://github.com/ahmad-demos))
- ([#721](https://github.com/demos-europe/demosplan-ui/pull/721)) Pass the allowEmpty prop to vue-multiselect, which prevents the deselection of values ([@sakutademos](https://github.com/sakutademos))
- ([#718](https://github.com/demos-europe/demosplan-ui/pull/718)) Add missing data attr for E-2-E Test ([@ahmad-demos](https://github.com/ahmad-demos))
- ([#714](https://github.com/demos-europe/demosplan-ui/pull/714)) add csrf token to dpRpc to prevent missing csrf errors ([@muellerdemos](https://github.com/muellerdemos))
- ([#734](https://github.com/demos-europe/demosplan-ui/pull/734)) Allow mailto links in DpEditor link modal ([@spiess-demos](https://github.com/spiess-demos))

## v0.3.5-1 - 2024-02-13

### Fixed

- ([#747](https://github.com/demos-europe/demosplan-ui/pull/747)) Add missing prop clearOnSelect to DpMultiselect ([@spiess-demos](https://github.com/spiess-demos))

## v0.3.5 - 2024-01-09

### Fixed

- ([#703](https://github.com/demos-europe/demosplan-ui/pull/703)) Don't stringify form data for post requests ([@gruenbergerdemos](https://github.com/gruenbergerdemos))

### Changed

- ([#706](https://github.com/demos-europe/demosplan-ui/pull/706)) Send DpApi request headers in uppercase format ([@spiess-demos](https://github.com/spiess-demos))

## v0.3.4 - 2024-01-05

### Fixed

- ([#690](https://github.com/demos-europe/demosplan-ui/pull/690)) DpApi method: handles cases where the response does not contain content and cannot be parsed as JSON ([@sakutademos](https://github.com/sakutademos))
- ([#685](https://github.com/demos-europe/demosplan-ui/pull/685)) Adjust internal imports to resolve properly

### Changed

- ([#693](https://github.com/demos-europe/demosplan-ui/pull/693)) Use Tailwind utility classes for width and height


## v0.3.3 - 2023-12-11

### Changed

- ([#674](https://github.com/demos-europe/demosplan-ui/pull/674)) use Tailwind class instead of demosplan-core class

### Fixed

- ([#673](https://github.com/demos-europe/demosplan-ui/pull/673)) lock style-dictionary at 3.8.0

## v0.3.2 - 2023-12-08

### Changed

- ([#638](https://github.com/demos-europe/demosplan-ui/pull/638)) Bump @uppy/core to 3.7.0, @uppy/tus to 3.4.0, and @uppy/progress-bar to 3.0.4 ([@spiess-demos](https://github.com/spiess-demos))
- ([#638](https://github.com/demos-europe/demosplan-ui/pull/638)) Set engine for node to the same version used in demosplan-core development setup ([@spiess-demos](https://github.com/spiess-demos))
- ([#506](https://github.com/demos-europe/demosplan-ui/pull/506)) Replace internal from DpApi/DpRpc. Move from axios to native fetch ([@salisdemos](https://github.com/salisdemos))
- ([#668](https://github.com/demos-europe/demosplan-ui/pull/668)) Consolidate spacing tokens, add them to Tailwind config ([@spiess-demos](https://github.com/spiess-demos))

### Fixed

- ([#652](https://github.com/demos-europe/demosplan-ui/pull/652)) Fix slots for DpMultiselect ([@gruenbergerdemos](https://github.com/gruenbergerdemos))
- ([#640](https://github.com/demos-europe/demosplan-ui/pull/640)) Fix resetContent in DpEditor ([@salisdemos](https://github.com/salisdemos))
- ([#664](https://github.com/demos-europe/demosplan-ui/pull/664)) Fixes prod build due to typescript errors ([@muellerdemos](https://github.com/muellerdemos))

## v0.3.1 - 2023-11-09

### Changed

- ([#634](https://github.com/demos-europe/demosplan-ui/pull/634)) Use filter() function to show unique fields in the error messages instead of using Javascript Set ([@sakutademos](https://github.com/sakutademos))

## v0.3 - 2023-11-08

### Removed

- ([#603](https://github.com/demos-europe/demosplan-ui/pull/603)) Remove DpHeightLimit, DpSwitcher, and DpTextWrapper components. ([@ahmad-demos](https://github.com/@ahmad-demos))

### Changed
- ([#633](https://github.com/demos-europe/demosplan-ui/pull/633)) DpModal: Call the preventScroll function within the toggle method in cases where the @after-leave transition does not work correctly (AssignEntityModal) ([@sakutademos](https://github.com/sakutademos))
- ([#624](https://github.com/demos-europe/demosplan-ui/pull/624)) Use proper import for buildSuggestion ([@salis-demos](https://github.com/salis-demos))
- ([#622](https://github.com/demos-europe/demosplan-ui/pull/622)) Improve validation notifications in the DpValidation action by incorporating invalid fields and displaying unique fields only ([@sakutademos](https://github.com/sakutademos))
- ([#621](https://github.com/demos-europe/demosplan-ui/pull/621)) Bump Vue Peer dependency to 2.5.17 ([@spiess-demos](https://github.com/spiess-demos))
- ([#615](https://github.com/demos-europe/demosplan-ui/pull/615)) **Breaking:** Change DpBulkEditHeader Props ([@ahmad-demos](https://github.com/@ahmad-demos))
- ([#630](https://github.com/demos-europe/demosplan-ui/pull/630)) Stickier.js: Remove extra check for stickToDirection that has been added wherever the function _bindBottom is called, because otherwise the element has not enough space and the bottom of the element is not reachable ([@gruenbergerdemos](https://github.com/gruenbergerdemos))

### Added
- ([#629](https://github.com/demos-europe/demosplan-ui/pull/629)) Allow to use all available slots from vue-multiselect in DpMultiselect ([@salis-demos](https://github.com/salis-demos))
- ([#615](https://github.com/demos-europe/demosplan-ui/pull/615)) Add DpBulkEditHeader documentation to Storybook ([@ahmad-demos](https://github.com/@ahmad-demos))
- ([#605](https://github.com/demos-europe/demosplan-ui/pull/605)) Add DpEditableList documentation to Storybook ([@ahmad-demos](https://github.com/@ahmad-demos))
- ([#591](https://github.com/demos-europe/demosplan-ui/pull/591)) Add label tests for form components ([@hwiem](https://github.com/hwiem))

## v0.2.1 - 2023-10-18

### Changed
- ([585](https://github.com/demos-europe/demosplan-ui/pull/585), [586](https://github.com/demos-europe/demosplan-ui/pull/586)) Fix Bugs in DpEditor after Migrating to tiptap@v2 ([@salisdemos](https://github.com/salisdemos))

### Added
- ([#590](https://github.com/demos-europe/demosplan-ui/pull/590)) Add DpVideoPlayer documentation to Storybook ([@ahmad-demos](https://github.com/@ahmad-demos))
- ([#588](https://github.com/demos-europe/demosplan-ui/pull/588)) Add DpSwitcher documentation to Storybook ([@ahmad-demos](https://github.com/@ahmad-demos))
- ([#567](https://github.com/demos-europe/demosplan-ui/pull/567)) Add DpEditor documentation to Storybook ([@ahmad-demos](https://github.com/@ahmad-demos))
- ([#587](https://github.com/demos-europe/demosplan-ui/pull/587)) Add phone icon to DpIcon ([@spiess-demos](https://github.com/spiess-demos))

## v0.2.0 - 2023-10-05

### Removed
- ([#537](https://github.com/demos-europe/demosplan-ui/pull/537)) Remove DpNotifyContainer component ([@ahmad-demos](https://github.com/@ahmad-demos))
- ([#536](https://github.com/demos-europe/demosplan-ui/pull/536)) Remove DpToggleForm component ([@ahmad-demos](https://github.com/@ahmad-demos))

### Changed
- ([#537](https://github.com/demos-europe/demosplan-ui/pull/537)) Rename DpNotifyMessage to DpNotification ([@ahmad-demos](https://github.com/@ahmad-demos))
- ([#374](https://github.com/demos-europe/demosplan-ui/pull/374)) Bump Tiptap from v1 to v2 ([@salisdemos](https://github.com/salisdemos))

### Added
- ([#556](https://github.com/demos-europe/demosplan-ui/pull/556)) Add DpTreeList documentation to Storybook & Fix getComputedStyle error ([@ahmad-demos](https://github.com/@ahmad-demos))
- ([#538](https://github.com/demos-europe/demosplan-ui/pull/538)) Add DpModal documentation to Storybook & Fix getComputedStyle error ([@ahmad-demos](https://github.com/@ahmad-demos))
- ([#537](https://github.com/demos-europe/demosplan-ui/pull/537)) Add DpNotification documentation to Storybook ([@ahmad-demos](https://github.com/@ahmad-demos))
- ([#531](https://github.com/demos-europe/demosplan-ui/pull/531)) Add DpProgressBar documentation to Storybook ([@ahmad-demos](https://github.com/@ahmad-demos))
- ([#526](https://github.com/demos-europe/demosplan-ui/pull/526)) Add DpButtonIcon documentation to Storybook ([@ahmad-demos](https://github.com/@ahmad-demos))
- ([#523](https://github.com/demos-europe/demosplan-ui/pull/523)) Added a method that checks the z-index of the parent element and appends zIndex + 1 to the style of the tooltip ([@sakutademos](https://github.com/sakutademos))
- ([#521](https://github.com/demos-europe/demosplan-ui/pull/521)), ([#522](https://github.com/demos-europe/demosplan-ui/pull/522)), ([#524](https://github.com/demos-europe/demosplan-ui/pull/524)), ([#525](https://github.com/demos-europe/demosplan-ui/pull/525)) Add DpDatepicker, DpDatetimePicker, DpDateRangePicker & DpTimePicker documentation to Storybook ([@ahmad-demos](https://github.com/@ahmad-demos))
- ([#518](https://github.com/demos-europe/demosplan-ui/pull/518)) Add DpUpload documentation to Storybook ([@ahmad-demos](https://github.com/@ahmad-demos))
- ([#516](https://github.com/demos-europe/demosplan-ui/pull/516)) Add Props to DpUpload & DpUploadFiles ([@ahmad-demos](https://github.com/@ahmad-demos))
- ([#505](https://github.com/demos-europe/demosplan-ui/pull/505)) Add DpTooltip documentation to Storybook ([@ahmad-demos](https://github.com/@ahmad-demos))
- ([#504](https://github.com/demos-europe/demosplan-ui/pull/504)) Add DpSlidingPagination documentation to Storybook ([@ahmad-demos](https://github.com/@ahmad-demos))
- ([#503](https://github.com/demos-europe/demosplan-ui/pull/503)) Add DpFormRow documentation to Storybook ([@ahmad-demos](https://github.com/@ahmad-demos))
- ([#497](https://github.com/demos-europe/demosplan-ui/pull/497)) Add DpDraggable documentation to Storybook ([@ahmad-demos](https://github.com/@ahmad-demos))
- ([#492](https://github.com/demos-europe/demosplan-ui/pull/492)) Add DpSearchField documentation to Storybook ([@ahmad-demos](https://github.com/@ahmad-demos))
- ([#491](https://github.com/demos-europe/demosplan-ui/pull/491)) Add DpStickyElement documentation to Storybook ([@ahmad-demos](https://github.com/@ahmad-demos))
- ([#515](https://github.com/demos-europe/demosplan-ui/pull/515)) Add internal alias ([@spiess-demos](https://github.com/spiess-demos))
- ([#380](https://github.com/demos-europe/demosplan-ui/pull/380)) Add DpTextArea documentation to Storybook ([@ahmad-demos](https://github.com/ahmad-demos))

## v0.1.16 - 2023-09-25

### Added
- ([#542](https://github.com/demos-europe/demosplan-ui/pull/542)) Add update hook to tooltip directive for dynamic value updates ([@sakutademos](https://github.com/sakutademos))

## v0.1.15 - 2023-09-18

### Added
- ([#523](https://github.com/demos-europe/demosplan-ui/pull/523)) Add a method that checks the z-index of the parent element and appends zIndex + 1 to the style of the tooltip ([@sakutademos](https://github.com/sakutademos))

## v0.1.14 - 2023-09-07

Several minor bugfixes.

## v0.1.13 - 2023-08-30

### Added

- ([#473](https://github.com/demos-europe/demosplan-ui/pull/473)) Add DpBadge component with Storybook documentation ([@muellerdemos](https://github.com/muellerdemos))
- ([#472](https://github.com/demos-europe/demosplan-ui/pull/472)), ([#477](https://github.com/demos-europe/demosplan-ui/pull/477)), ([#479](https://github.com/demos-europe/demosplan-ui/pull/479)), ([#480](https://github.com/demos-europe/demosplan-ui/pull/480)), ([#481](https://github.com/demos-europe/demosplan-ui/pull/481)) Add DpCard, DpCheckboxGroup, DpInlineNotification, DpSkeletonBox & DpSplitButton documentation to Storybook7 ([@ahmad-demos](https://github.com/@ahmad-demos))
- ([#475](https://github.com/demos-europe/demosplan-ui/pull/475)) Add Tailwind Styles to Storybook7 ([@spiess-demos](https://github.com/spiess-demos))


### Removed

- ([#445](https://github.com/demos-europe/demosplan-ui/pull/445)) **Breaking:** Remove DpDashboardTaskCard component ([@hwiem](https://github.com/hwiem))

### Changed
- ([#379](https://github.com/demos-europe/demosplan-ui/pull/379)) Upgrade Storybook v7, Migrate stories to v7 ([@salisdemos](https://github.com/salisdemos)), ([@ahmad-demos](https://github.com/@ahmad-demos))
- ([#383](https://github.com/demos-europe/demosplan-ui/pull/383)) Rework Tooltip Directive and Component ([@salisdemos](https://github.com/salisdemos))
  - Introduced DpTooltip. Please replace VPopover (now deprecated) with DpTooltip
- ([#462](https://github.com/demos-europe/demosplan-ui/pull/462) Deprecate DpTooltipIcon in favor of DpContextualHelp ([@spiess-demos](https://github.com/spiess-demos))

## v0.1.12 - 2023-08-18

### Added

- ([#444](https://github.com/demos-europe/demosplan-ui/pull/444)), ([#443](https://github.com/demos-europe/demosplan-ui/pull/443)), ([#437](https://github.com/demos-europe/demosplan-ui/pull/437)) Add E2E Props ([@ahmad-demos](https://github.com/@ahmad-demos))

### Changed

- ([#438](https://github.com/demos-europe/demosplan-ui/pull/438)) Stickier.js: An extra check has been added wherever the function _bindBottom is called: when the value of the stickToDirection is 'top' the funciton _bindBottom will not be performed.([@sakutademos](https://github.com/sakutademos))

## v0.1.11 - 2023-08-11

### Fixed

- ([#412](https://github.com/demos-europe/demosplan-ui/pull/412)) Import missing directive in DpMultiselect ([@ahmad-demos](https://github.com/@ahmad-demos))

### Changed

- ([#409](https://github.com/demos-europe/demosplan-ui/pull/409)) Change the way to show/hide the dropdown menu in DpTimePicker by using the 'hidden' class instead of the 'v-show' directive ([@sakutademos](https://github.com/sakutademos))
- ([#381](https://github.com/demos-europe/demosplan-ui/pull/381)) Change z-index values and var names to match Tailwind convention ([@spiess-demos](https://github.com/spiess-demos))

### Added

- ([#291](https://github.com/demos-europe/demosplan-ui/pull/291)) Add Typescript Config ([@ahmad-demos](https://github.com/ahmad-demos))

## v0.1.10 - 2023-07-17

### Added

- ([#359](https://github.com/demos-europe/demosplan-ui/pull/359)) Add field names for incorrect fields to the error messages during the validation process (dpValidateMixin) ([@sakutademos](https://github.com/sakutademos))
- ([#370](https://github.com/demos-europe/demosplan-ui/pull/370)) Add documentation for DpRadio ([@ahmad-demos](https://github.com/@ahmad-demos))
- ([#350](https://github.com/demos-europe/demosplan-ui/pull/350)) Add documentation for DpSelect ([@ahmad-demos](https://github.com/@ahmad-demos))
- ([#372](https://github.com/demos-europe/demosplan-ui/pull/372)) Add "question", "severe", and "warning" icons to DpIcon ([@spiess-demos](https://github.com/spiess-demos))

## v0.1.9 - 2023-07-13

### Removed

- ([#357](https://github.com/demos-europe/demosplan-ui/pull/357)) Remove Translator from DpSelect ([@ahmad-demos](https://github.com/ahmad-demos))

### Changed

- ([#314](https://github.com/demos-europe/demosplan-ui/pull/314), [#363](https://github.com/demos-europe/demosplan-ui/pull/363)) Use Barrel Export ([@salisdemos](https://github.com/@salisdemos))
- ([#361](https://github.com/demos-europe/demosplan-ui/pull/361)) **Breaking:** Move compiled token files to "tokens/dist" folder", add borderRadius, boxShadow, breakpoints and z-index tokens to Tailwind config, deprecate old box-shadow and rounded Scss tokens ([@spiess-demos](https://github.com/spiess-demos))

### Added

- ([#364](https://github.com/demos-europe/demosplan-ui/pull/364)) Add Prop IconSize to DpButton ([@salisdemos](https://github.com/@salisdemos))
- ([#344](https://github.com/demos-europe/demosplan-ui/pull/344)) Add documentation for DpTabs ([@ahmad-demos](https://github.com/@ahmad-demos))
- ([#333](https://github.com/demos-europe/demosplan-ui/pull/333)) Add "rounded" prop to DpButton, add "arrow-up" and "arrow-down" icons to DpIcon ([@spiess-demos](https://github.com/spiess-demos))

## v0.1.8 - 2023-07-07

### Added

- ([#356](https://github.com/demos-europe/demosplan-ui/pull/356)) Add "blur" event in DpInput ([@salisdemos](https://github.com/@salisdemos))

## v0.1.7 - 2023-06-27

### Changed
- ([#325](https://github.com/demos-europe/demosplan-ui/pull/325)) **Breaking:** Remove spacing classes from DpAnonymizeText ([@ahmad-demos](https://github.com/ahmad-demos))

### Added

- ([#356](https://github.com/demos-europe/demosplan-ui/pull/356)) Add "blur" event in DpInput ([@salisdemos](https://github.com/@salisdemos))
- ([#344](https://github.com/demos-europe/demosplan-ui/pull/344)) Add documentation for DpTabs ([@ahmad-demos](https://github.com/@ahmad-demos))
- ([#333](https://github.com/demos-europe/demosplan-ui/pull/333)) Add "rounded" prop to DpButton, add "arrow-up" and "arrow-down" icons to DpIcon ([@spiess-demos](https://github.com/spiess-demos))

## v0.1.7 - 2023-06-27

### Changed

- ([#325](https://github.com/demos-europe/demosplan-ui/pull/325), [#327](https://github.com/demos-europe/demosplan-ui/pull/327)), [#334](https://github.com/demos-europe/demosplan-ui/pull/334)), [#335](https://github.com/demos-europe/demosplan-ui/pull/335)) **Breaking:** Remove spacing classes from DpAnonymizeText, DpBulkEditHeader, DpFormRow and DpDataTableExtended ([@ahmad-demos](https://github.com/ahmad-demos))

### Added

- ([#318](https://github.com/demos-europe/demosplan-ui/pull/318)) Add a method called externalApi to make external API calls without including default headers ([@sakutademos](https://github.com/sakutademos))

## v0.1.6 - 2023-06-22

### Changed

- ([#306](https://github.com/demos-europe/demosplan-ui/pull/306)) Adapt some utility classes to use tailwind ([@spiess-demos](https://github.com/spiess-demos))

### Removed

- ([#303](https://github.com/demos-europe/demosplan-ui/pull/303)) **Breaking**: Remove DpChangeStateAtDate ([@hwiem](https://github.com/hwiem))
- ([#256](https://github.com/demos-europe/demosplan-ui/pull/256)) **Breaking**: Remove DpCopyPasteButton ([@hwiem](https://github.com/hwiem))

### Fixed

- ([#304](https://github.com/demos-europe/demosplan-ui/pull/304)) Fix invalid empty string for DpButtonRow ([@spiess-demos](https://github.com/spiess-demos))
- ([#319](https://github.com/demos-europe/demosplan-ui/pull/319)) Fix data-cy prop on multiselect ([@gruenbergerdemos](https://github.com/gruenbergerdemos))

## v0.1.5 - 2023-06-16

_Historic note: v0.1.4 was a bugfix release that contained picked changes from v0.1.5 at a state
where this release was not fully ready yet and has therefore not been merged back to main. It can
still be accessed via its release tag._

### Added

- ([#268](https://github.com/demos-europe/demosplan-ui/pull/268)) Tests: Add Test setup for Vue Files and some Tests ([@salis-demos](https://github.com/salis-demos))
- ([#294](https://github.com/demos-europe/demosplan-ui/pull/294)) Css: A Tailwind Css file is included in the module to be used by projects ([@spiess-demos](https://github.com/spiess-demos))
- ([#269](https://github.com/demos-europe/demosplan-ui/pull/269)) DpIcon: new selector `landscape`, `portrait`, or `square`, based on icon proportions ([@spiess-demos](https://github.com/spiess-demos))
- ([#270](https://github.com/demos-europe/demosplan-ui/pull/270)) DpIcon: new icons (ai, copy) ([@spiess-demos](https://github.com/spiess-demos))

### Changed

- ([#294](https://github.com/demos-europe/demosplan-ui/pull/294)) **Breaking**: All script names use the colon instead of the dash as separator (e.g. "build:tokens") ([@spiess-demos](https://github.com/spiess-demos))
- ([#292](https://github.com/demos-europe/demosplan-ui/pull/292)) DpDataTable: Clean V-if/v-for in Preparation for Vue3 ([@salis-demos](https://github.com/salis-demos))
- ([#230](https://github.com/demos-europe/demosplan-ui/pull/230)) Move from Functional Component to Template in DpDataTable ([@sakutademos](https://github.com/sakutademos))
- ([#233](https://github.com/demos-europe/demosplan-ui/pull/233)) Move from Functional Component to Template in DpTableRow ([@sakutademos](https://github.com/sakutademos))
- ([#280](https://github.com/demos-europe/demosplan-ui/pull/280)) Adjust DpTableHeader to work with DpDataTable template-based component ([@sakutademos](https://github.com/sakutademos))

### Fixed

- ([#290](https://github.com/demos-europe/demosplan-ui/pull/290)) Add missing props to DpMultiselect ([@gruenbergerdemos](https://github.com/gruenbergerdemos))

## v0.1.3 - 2023-05-31

### Removed

- ([#255](https://github.com/demos-europe/demosplan-ui/pull/255)) **Breaking**: Remove DpRegisterFlyout ([@hwiem](https://github.com/hwiem))
- ([#259](https://github.com/demos-europe/demosplan-ui/pull/259)) **Breaking**: DpButton does not support slots anymore. Use the `icon` prop instead. ([@spiess-demos](https://github.com/spiess-demos))


### Added

- ([#259](https://github.com/demos-europe/demosplan-ui/pull/259)) DpButton: New button variant "subtle" 👻, new props "icon", "iconAfter", "hideText" ([@spiess-demos](https://github.com/spiess-demos))
- ([#259](https://github.com/demos-europe/demosplan-ui/pull/259)) DpIcon: New icons (chevron-left, chevron-right, edit) ([@spiess-demos](https://github.com/spiess-demos))

## v0.1.2 - 2023-05-24

### Fixed
- ([#249](https://github.com/demos-europe/demosplan-ui/pull/249)) Fix console errors, use correct lifecycle hook and remove `this` from template  ([@muellerdemos](https://github.com/muellerdemos))
- ([#237](https://github.com/demos-europe/demosplan-ui/pull/237)) Allow number, array and object as value for DpMultiselect ([@gruenbergerdemos](https://github.com/gruenbergerdemos))
- ([#234](https://github.com/demos-europe/demosplan-ui/pull/237)) Add event listener for all events in DpMultiselect ([@gruenbergerdemos](https://github.com/gruenbergerdemos))
- ([#234](https://github.com/demos-europe/demosplan-ui/pull/234)) Add prop for searchable for DpMultiselect ([@gruenbergerdemos](https://github.com/gruenbergerdemos))
- ([#237](https://github.com/demos-europe/demosplan-ui/pull/237)) Show buttons for select all and unselect all only if selectionControls is true in DpMultiselect ([@gruenbergerdemos](https://github.com/gruenbergerdemos))
- ([#237](https://github.com/demos-europe/demosplan-ui/pull/237)) Bind props to slots, so they are available for parent ([@gruenbergerdemos](https://github.com/gruenbergerdemos))

## v0.1.1 - 2023-05-22

**NOTE:** This release contains a slightly different changelog for v0.1. than the one that was published before.
Unfortunately, we had a minor log-entry merge mishap and that wasn't noticed until after the release.

### Fixed

- Remove duplicated prefix from space tokens ([@spiess-demos](https://github.com/spiess-demos))

## v0.1 - 2023-05-16

### Changed

- ([#108](https://github.com/demos-europe/demosplan-ui/pull/108)) **Breaking**: Add design tokens, split generated Scss into multiple files ([@ahmad-demos](https://github.com/ahmad-demos), [@spiess-demos](https://github.com/spiess-demos))
- ([#211](https://github.com/demos-europe/demosplan-ui/pull/211)) **Breaking**: Replace Font Awesome with Phosphor Icons ([@spiess-demos](https://github.com/spiess-demos))
- ([#205](https://github.com/demos-europe/demosplan-ui/pull/205)) Move from Functional Component to Template in DpTableHeader ([@elmasdemos](https://github.com/elmasdemos))
- ([#203](https://github.com/demos-europe/demosplan-ui/pull/203)) Move from Functional Component to Template in DpContextualHelp ([@salisdemos](https://github.com/salisdemos))
- ([#202](https://github.com/demos-europe/demosplan-ui/pull/202)) Move from Functional Component to Template in DpSlidingPagination ([@salisdemos](https://github.com/salisdemos))
- ([#195](https://github.com/demos-europe/demosplan-ui/pull/195)) Move from Functional Component to Template in dpSelectPageItemCount ([@salisdemos](https://github.com/salisdemos))
- ([#181](https://github.com/demos-europe/demosplan-ui/pull/181)) Move from Functional Component to Template in dpMultiselect ([@salisdemos](https://github.com/salisdemos))
- ([#51](https://github.com/demos-europe/demosplan-ui/pull/51)) Configuration for jest tests for js files ([@elmasdemos](https://github.com/elmasdemos))
- ([#212](https://github.com/demos-europe/demosplan-ui/pull/212)) Component: Expose `isExpanded` in DpFlyout trigger slot ([@spiess-demos](https://github.com/spiess-demos))

## v0.0.21 - 2023-05-02

### Changed

- ([#175](https://github.com/demos-europe/demosplan-ui/pull/175)) adjust layout of DpPager ([@muellerdemos](https://github.com/muellerdemos))

## v0.0.20 - 2023-04-18

### Changed

- ([#159](https://github.com/demos-europe/demosplan-ui/pull/159)) Add tooltip offset to fix positioning bug with tooltip arrow ([@spiess-demos](https://github.com/spiess-demos))

## v0.0.19 - 2023-04-06

### Changed

- ([#146](https://github.com/demos-europe/demosplan-ui/pull/146)) Expose DpNotifyMessage and deprecate DpNotifyContainer

### Fixed

- ([#148](https://github.com/demos-europe/demosplan-ui/pull/148)) Replace dynamic imports with static imports to avoid race conditional bugs ([@muellerdemos](https://github.com/muellerdemos))

## v0.0.18 - 2023-03-29

- ([#139](https://github.com/demos-europe/demosplan-ui/pull/139)) REVERT: ([#133](https://github.com/demos-europe/demosplan-ui/pull/133)) Import `a11y-datepicker` not as es Module anymore, to make it resolvable

### Fixed

- ([#138](https://github.com/demos-europe/demosplan-ui/pull/138)) Uploading files whose names contained reserved characters no longer break certain endpoints. ([@spiess-demos](https://github.com/spiess-demos))

## v0.0.17 - 2023-03-23

- ([#133](https://github.com/demos-europe/demosplan-ui/pull/133)) Import `a11y-datepicker` not as es Module anymore, to make it resolvable

## v0.0.16 - 2023-03-15

### Changed

- ([#114](https://github.com/demos-europe/demosplan-ui/pull/114)) Adjust webpack config to enable the usage of demosplan-ui in addons ([@muellerdemos](https://github.com/muellerdemos))

## v0.0.15 - 2023-03-01

### Changed

- ([#104](https://github.com/demos-europe/demosplan-ui/pull/104)) Add slots for modal and button in DpEditor ([@gruenbergerdemos](https://github.com/gruenbergerdemos))
- ([#104](https://github.com/demos-europe/demosplan-ui/pull/104)) Remove deprecated props in DpEditor ([@gruenbergerdemos](https://github.com/gruenbergerdemos))
- ([#104](https://github.com/demos-europe/demosplan-ui/pull/104)) Remove unnecessary routes in DpEditor ([@gruenbergerdemos](https://github.com/gruenbergerdemos))

### Fixed

- ([#111](https://github.com/demos-europe/demosplan-ui/pull/111)) Fix checkbox positioning in DpTableCardListHeader ([@muellerdemos](https://github.com/muellerdemos))

## v0.0.14 - 2023-02-28

Same as v0.0.13, but with up-to-date build dependencies this time around.

## v0.0.13 - 2023-02-28

### Changed

- ([#91](https://github.com/demos-europe/demosplan-ui/pull/91)) Pass routes as props ([@ahmad-demos](https://github.com/ahmad-demos))
- ([#107](https://github.com/demos-europe/demosplan-ui/pull/107)) Make `color-palette-black` and `color-palette-white` themeable ([@spiess-demos](https://github.com/spiess-demos))

### Fixed

- ([#100](https://github.com/demos-europe/demosplan-ui/pull/100)) Set correct value for `aria-live` in DpNotifyContainer when document becomes visible ([@spiess-demos](https://github.com/spiess-demos))
- ([#109](https://github.com/demos-europe/demosplan-ui/pull/109)) Remove @demos-europe/demosplan-utils as dependency ([@spiess-demos](https://github.com/spiess-demos))

## v0.0.12 - 2023-02-13

### Fixed

- ([#96](https://github.com/demos-europe/demosplan-ui/pull/96)) Don't load DpDraggable async in DpDataTable ([@salis-demos](https://github.com/salis-demos))

## v0.0.11 - 2023-02-10

### Fixed

- ([#95](https://github.com/demos-europe/demosplan-ui/pull/95)) Do not unregister boilerplates store module beforeDestroy ([@spiess-demos](https://github.com/spiess-demos))

## v0.0.10 - 2023-02-07

### Fixed

- ([#93](https://github.com/demos-europe/demosplan-ui/pull/93)) Keep empty spaces after copy/pasting from MS Word ([@hwiem](https://github.com/hwiem))
- ([#93](https://github.com/demos-europe/demosplan-ui/pull/93)) Ensure EditorObscure is imported before using it ([@hwiem](https://github.com/hwiem))

## v0.0.9 - 2023-01-23

### Fixed

- ([#73](https://github.com/demos-europe/demosplan-ui/pull/73)) DpTreeList bulk edit: emit correct selection ([@muellerdemos](https://github.com/muellerdemos))

## v0.0.8 - 2023-01-19

- docs: add documentation for DpCheckbox
- Fix: `undefined` Translator error in DpResizableImage (#66)
- chore: Bump Dependenices (#63)

## v0.0.7 - 2023-01-09

- Make sure the built package contains the correct content

## v0.0.6 - 2023-01-06

- **Breaking:** Refactor DpRadio props: bundle label related props in a single object
- Fix DpEditor "TypeError: Class constructor cannot be invoked without 'new'"

## v0.0.5 - 2023-01-05

- Move modules that are also present within demosplan to externals to reduce compiled filesize
- Fix `start-storybook` script by configuring Storybook to use **Webpack 5**

## v0.0.4 - 2022-12-16

- Change token build hook from `postinstall` to `prepublish`

## v0.0.3 - 2022-12-16

- Rewrite large parts of the build process
- Code was moved between `@demos-europe/demosplan-utils` and here for more consistency

## v0.0.2 - 2022-11-16

### Bug Fixes
- Fix path declarations to have a buildable package

### Features
- Deprecate prefixClass and prefixClassMixin

## v0.0.1 - 2022-11-15

- This is unfinished and broken. We just need a starting point

---

[common-changelog]: https://common-changelog.org
