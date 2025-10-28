# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.5.1] - 2025-10-21

### Fixed

- convert deprecated `unstable_config_lookup_from_file` eslint flag to `v10_config_lookup_from_file` now that [its stable](https://eslint.org/docs/latest/flags/#active-flags) awaiting next major version

## [0.5.0] - 2025-10-20

### Changed

- added a `FeaturesStoreFactory` interface that insists on a `toggleType` input to all features store factories
  - for the `nodeRequestScopedFeaturesStoreFactory`, this becomes a unique key against [a realm-wide Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol#shared_symbols_in_the_global_symbol_registry), to ensure the store is shared in multi-runtime realms (e.g. NextJS compiled applications)

### Fixed

- renamed `nodeRequestScopedFeaturesStoreFactory` from `nodeRequestScopedStoreFactory` for consistency
- ensured interfaces in JSDoc output properly
  - concede to a [`@callback`](https://jsdoc.app/tags-callback) to represent the `FeaturesStoreFactory` interface.
- descriptions in test files properly matching factories
- some line-breaks in this CHANGELOG
- more accurate [`valtio`](https://github.com/pmndrs/valtio) examples in the README

## [0.4.2] - 2025-09-30

### Fixed

- Used the `prepare-publish.mjs` script provided by repo root version [0.12.0](../../../docs/CHANGELOG.md#0120---2025-09-30) to fix relative links in `README.md` on [npmjs.com](https://www.npmjs.com/) that were moved as part of [0.4.1](#041---2025-09-29)

## [0.4.1] - 2025-09-29

### Fixed

- ensured that `README.md` is included in the root of the npm package, to conform to [npmjs.org requirement](https://docs.npmjs.com/about-package-readme-files):
> An npm package `README.md` file **must** be in the root-level directory of the package
- ensured that `LICENSE` is included in the npm package
- improved package description

### Added

- [keywords](https://docs.npmjs.com/cli/v11/configuring-npm/package-json#keywords) added to the `package.json` to aid npm search

## [0.4.0] - 2025-07-15

### Fixed

- Moved to named exports, to ensure that the "ssr" package is not a dependency, unless importing the `ssrBackedReactContextFeaturesStoreFactory`
  - This reverts to the intent of version [version 0.3.0](#030---2024-11-28), but not capitulating to ESLint's issues
- Support firefox by not using a `Symbol` as a `WeakMap` key (https://github.com/ASOS/web-toggle-point/issues/57)

### Changed

- renamed `useValue` from `SingletonFeaturesStore` interface to `setValue`, to avoid React [rules-of-hooks](https://react.dev/warnings/invalid-hook-call-warning) errors
- added a backfill main entry to `package.json` to support [missing exports / ESM support in `eslint-plugin-import`](https://github.com/import-js/eslint-plugin-import/issues/1810), for users of this
  
## [0.3.4] - 2025-07-14

### Fixed

- remove redundant `@reduxjs/toolkit` and `react-dom` peer dependencies

## [0.3.3] - 2025-03-06

### Changed

- added `package.json` [homepage](https://docs.npmjs.com/cli/v11/configuring-npm/package-json#homepage), for clarity once on https://www.npmjs.com/
- move the React 17 note to the end, in the `README.md`, since only relevant to the last two store factories & added companion note regarding `react-dom/server`

### Fixed

- include the `README.md` in the NPM package

## [0.3.2] - 2025-03-03

### Changed

- added `package.json` [repository](https://docs.npmjs.com/cli/v11/configuring-npm/package-json#repository), [bugs](https://docs.npmjs.com/cli/v11/configuring-npm/package-json#bugs), and [`directories/doc`](https://docs.npmjs.com/cli/v11/configuring-npm/package-json#directories) fields, for clarity once on NPM

## [0.3.1] - 2024-12-26

### Fixed

- updated some errant JSDoc namespaces

## [0.3.0] - 2024-11-28

### Changed

- extracted optimizely-specific functionality into separate `optimizely` package, preparing this package to be agnostic of experimentation & context-based decisions.
- added `prebuild` script to ensure dependent workspace packages are built, needed for some un-mockable imports & next example linting...  may replace with WireIt.

### Added

- `globalFeaturesStoreFactory` export, a "feature store" factory function, used to store a global features state available throughout an application
- `nodeRequestScopedStoreFactory` export, a "feature store" factory function designed for use within a request-scoped server runtime, e.g. primed within Express middleware
- `reactContextFeaturesStoreFactory` export, a "feature store" factory function, designed to wrap a proportion of a react application with a contextual features state 
- `ssrBackedReactContextFeaturesStoreFactory` export, a "feature store" factory function, designed to wrap a proportion of a react application with a contextual features state, backed by the [`ssr` package](../../ssr/docs/README.md) for use without an SSR-compatible React framework.

...after spending _far too long_ trying to get node `"exports"` with paths working, so that could better create specific node/browser import paths, before giving up (it works, but ESLint doesn't play ball...)

## [0.2.4] - 2024-11-27

### Changed

- fixed some typos in docs

## [0.2.3] - 2024-11-27

### Changed

- updated to latest `@testing-library/react` to remove errant warning about import of `act`
- updated to `react@18.3.1`, set minimum required react to `17`
  - technically a breaking change, but `jsx-runtime` already introduced in [version 0.1.0](#010---2023-09-12)... so was already broken, oops.
- renamed commonJs exports to have `.cjs` extension to prevent `[ERR_REQUIRE_ESM]` errors in consumers that aren't `"type": "module"`

## [0.2.2] - 2024-12-26

### Changed

- used latest `ssr` package

## [0.2.1] - 2024-11-25

### Changed

- updates to import attributes from import assertions (Node 22 change in monorepo root)

## [0.2.0] - 2024-10-02

### Removed

- `useActivation` is no longer exported, replaced with a plugin for the point cuts package

### Added

- `pointCutPluginFactory` returns a plugin suitable for the point cuts package, that activates experiments

## [0.1.2] - 2024-01-11

### Fixed

- Fixup documentation left fallow from package split ([version 0.1.0](#010---2023-09-12))

## [0.1.1] - 2023-11-16

### Fixed

- Make the fallback "main" entry in package.json be commonJs, since in-case used, this will be old Node

## [0.1.0] - 2023-09-12

### Changed

- Re-factored package from `asos-web-toggle-point-app` v1.1.1
- Move to [exports](https://nodejs.org/api/packages.html#exports) in `package.json` (but still fallback to `"main"`, despite not being necessary after Node 12+, due to [this issue](https://github.com/import-js/eslint-plugin-import/issues/1810))
- No longer include corejs in bundle

## [Unreleased] - 2023-09-12

### Added

- A `lint:fix` script

## [Unreleased] - 2022-01-05

### Fixed

- Fixed up race condition with multiple features activating: ensure singleton is set atomically after both asynchronous actions with the features SDK are complete, and let others hang off the same combined promise.

## [Unreleased] - 2022-10-26

### Added

- Initial commit.
