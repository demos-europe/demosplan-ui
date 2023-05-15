# Changelog

## UNRELEASED

### Changed
- ([#211](https://github.com/demos-europe/demosplan-ui/pull/211)) **Breaking:** Replace Font Awesome with Phosphor Icons ([@spiess-demos](https://github.com/spiess-demos))
- ([#205](https://github.com/demos-europe/demosplan-ui/pull/205)) Move from Functional Component to Template in DpTableHeader ([@elmasdemos](https://github.com/elmasdemos))
- ([#203](https://github.com/demos-europe/demosplan-ui/pull/203)) Move from Functional Component to Template in DpContextualHelp ([@salisdemos](https://github.com/salisdemos))
- ([#202](https://github.com/demos-europe/demosplan-ui/pull/202)) Move from Functional Component to Template in DpSlidingPagination ([@salisdemos](https://github.com/salisdemos))
- ([#195](https://github.com/demos-europe/demosplan-ui/pull/195)) Move from Functional Component to Template in dpSelectPageItemCount ([@salisdemos](https://github.com/salisdemos))
- ([#181](https://github.com/demos-europe/demosplan-ui/pull/181)) Move from Functional Component to Template in dpMultiselect ([@salisdemos](https://github.com/salisdemos))

### Added
- ([#212](https://github.com/demos-europe/demosplan-ui/pull/212)) Component: Expose `isExpanded` in DpFlyout trigger slot ([@spiess-demos](https://github.com/spiess-demos))

## v0.0.21 - 2023-05-02

### Changed

- ([#175](https://github.com/demos-europe/demosplan-ui/pull/175)) adjust layout of DpPager ([@muellerdemos](https://github.com/muellerdemos))

### Changed

- **Breaking**: ([#108](https://github.com/demos-europe/demosplan-ui/pull/108)) Add color design tokens, split generated Scss into multiple files ([@ahmad-demos](https://github.com/ahmad-demos), [@spiess-demos](https://github.com/spiess-demos))

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
