# Changelog

## UNRELEASED

### Changed

- ([#91](https://github.com/demos-europe/demosplan-ui/pull/91)) Pass routes as props ([@ahmad-demos](https://github.com/ahmad-demos))
- Make `color-palette-black` and `color-palette-white` themeable ([@spiess-demos](https://github.com/spiess-demos))

### Fixed

- ([#100](https://github.com/demos-europe/demosplan-ui/pull/100)) Set correct value for `aria-live` in DpNotifyContainer when document becomes visible ([@spiess-demos](https://github.com/spiess-demos))

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
