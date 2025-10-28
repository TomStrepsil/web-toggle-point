# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.1] - 2025-10-21

### Changed

- update to take supply static `webpackNormalModule` corresponding to webpack plugin [version 0.9.0](../../../packages/webpack/docs/CHANGELOG.md#090---2025-07-29)
- update [`Next.js`](https://nextjs.org/) to version 15.5.6
- update [`@playwright/test`](https://github.com/microsoft/playwright/tree/main/packages/playwright-test) to 1.56.0

### Fixed

- remove note regarding [issue #50](https://github.com/ASOS/web-toggle-point/issues/50) after release of features [version 0.5.0](../../../packages/features/docs/CHANGELOG.md#050---2025-10-20)

## [0.4.0] - 2025-10-20

### Changed

- updated to features [version 0.5.0](../../../packages/features/docs/CHANGELOG.md#050---2025-10-20)

## [0.3.1] - 2025-09-30

### Changed

- move to use new `onVariantError` plugin hook over `logError` to consume [0.5.0](../../../packages/react-pointcuts/docs/CHANGELOG.md#040---2025-07-06) of `react-pointcuts` package.

## [0.3.0] - 2025-09-29

### Added

- added a "content management" example, demonstrating use of `withToggledHookFactory` from the `react-pointcuts` package

### Changed

- colocate documentation for "experiments" example to sit with its own `README.mdx`
- update to static `webpackNormalModule` option of webpack package [version 0.8.1](../../../packages/webpack/docs/CHANGELOG.md#081---2025-07-27)
- Updated to named exports version of "features" package ([0.4.0](../../../packages/features/docs/CHANGELOG.md#040---2025-07-15))

### Fixed

- consistent "Explanation" and "Activation" sections in example `README.mdx` files
- removed errant `toggle-point.d.ts` in `tsconfig.json`
- moved type packages to devDependencies

## [0.2.5] - 2025-07-15

### Changed

- Updated to named exports version of "features" package ([0.4.0](../../../packages/features/docs/CHANGELOG.md#040---2025-07-15))

### Fixed

- import types explicitly from `@playwright/test` & internally, after unexpected pipeline failure

## [0.2.4] - 2025-05-27

### Changed

- updated to use `variantGlobs` array, with updated webpack plugin [version 0.8.0](../../../packages/webpack/docs/CHANGELOG.md#080---2025-05-27)

## [0.2.3] - 2025-02-07

### Fixed

- fixed a regression in the ability to use `?showExperiments` query in the experiments fixtures, regressed in [version 0.2.0](#020---2024-12-06).

## [0.2.2] - 2024-12-24

### Fixed

- links to folders, not `README.mdx`, in the experiments examples
- create `FeaturesProvider` via factory in outermost scope, rather than on each render of an example

## [0.2.1] - 2024-12-18

### Fixed

- support windows

## [0.2.0] - 2024-12-06

### Changed

- moved project to `"type": "module"`
- used updated `react-pointcuts` package
  - now passing `getActiveFeatures` to `withTogglePointFactory`
- used updated `features` package
  - removing import of contexts and instead using the `reactContextFeaturesStoreFactory`

## [0.1.1] - 2024-11-28

### Added

- added `prebuild` script to ensure dependent workspace packages are built...  may replace with WireIt.

## [0.1.0] - 2024-11-25

### Added

- experiments example, used as fixtures for playwright tests:
  - 1. [Varying a Module](./src/app/fixtures/experiments/1-varied-component/README.mdx)
  - 2. [Varying a Module And It's Dependency](./src/app/fixtures/experiments/2-variant-with-name-matched-dependency/README.mdx)
  - 3. [Extending / Composing a Module in Variation](./src/app/fixtures/experiments/3-varied-component-extending-control/README.mdx)
  - 4. [Varying a Variation](./src/app/fixtures/experiments/4-varied-variant/README.mdx)
  - 5. [Opting Out of Join Points using a local Toggle Config](./src/app/fixtures/experiments/5-toggle-config-opt-out/README.mdx)
  - 6. [Filtering Join Points using a Toggle Config](./src/app/fixtures/experiments/6-toggle-config-variant-filter-same-directory/README.mdx)
  - 7. [Using Varied Code without Toggling its Directory](./src/app/fixtures/experiments/7-toggle-config-variant-filter-alternate-directory/README.mdx)
