# Changelog

Since v0.0.10, this Changelog is formatted according to the [Common Changelog][common-changelog] recommendations.

## UNRELEASED

### Added

- ([#370](https://github.com/demos-europe/demosplan-ui/pull/370)) Add documentation for DpRadio ([@ahmad-demos](https://github.com/@ahmad-demos))
- ([#350](https://github.com/demos-europe/demosplan-ui/pull/350)) Add documentation for DpSelect ([@ahmad-demos](https://github.com/@ahmad-demos))


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

- ([#294](https://github.com/demos-europe/demosplan-ui/pull/294)) **Breaking**: All script names use the colon instead of the dash as separator (eg. "build:tokens") ([@spiess-demos](https://github.com/spiess-demos))
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
