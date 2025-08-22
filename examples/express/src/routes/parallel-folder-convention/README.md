# Express "parallel folder convention" example

This example shows the use of the [`react-pointcuts`](../../../../../packages/react-pointcuts/docs/README.md), [`features`](../../../../../packages/features/docs/README.md), [`ssr`](../../../../../packages/ssr/docs/README.md) and [`webpack`](../../../../../packages/webpack/docs/README.md) packages, as part of an [express](https://expressjs.com/) application.

An inbound header named "feature" can take the following values:

- baseline (or omitted)
- feature1
- feature2
- feature3
- feature4

...which is used server side (via a ["node request scoped features store"](../../../../../packages/features/docs/README.md#noderequestscopedfeaturesstorefactory)) to generate appropriate server-rendered content.

The chosen feature state is serialized to the browser using the `ssr` package, and loaded into a ["global features store"](../../../../../packages/features/docs/README.md#globalfeaturesstorefactory), using [`valtio`](https://github.com/pmndrs/valtio), for reactivity.

To demonstrate the reactivity, a drop-down allows changing of the selected feature state.

## Filesystem structure

The base / control folder structure is thus:

```bash
├── components
│   ├── Animal
│   │   └── index.tsx
│   ├── BottomBox
│   │   ├── index.tsx
│   │   └── useAnimals.ts
│   └── TopBox
│       ├── TopBoxChild
│       │   ├── TopBoxButton
│       │   │   ├── index.module.css
│       │   │   ├── index.tsx
│       │   │   └── useAddAnimal.ts
│       │   └── index.tsx
│       └── index.tsx
├── constants
│   └── index.ts
└── state
    ├── modules
    │   ├── animals
    │   │   └── slice.ts
    │   └── index.ts
    └── store.ts
```

## Variations

The features comprise the following:

### _baseline_

The base experience. Clicking the dog dispatches a redux action adding a dog to the bottom box

### _feature1_

Varied react components (`TopBox` & `BottomBox`), at various depths in the folder structure. A varied constant for the animal emoji (`constants/index.ts`) and varied css (background colour of the button) (`TopBoxButton/index.module.css`).

```bash
├── components
│   ├── BottomBox
│   │   └── index.tsx
│   └── TopBox
│       ├── TopBoxChild
│       │   └── TopBoxButton
│       │       └── index.module.css
│       └── index.tsx
└── constants
    └── index.ts
```

### _feature2_

Varied constant (`constants/index.ts`), react component (`TopBoxChild`) and redux slice (`slice.ts`) connecting an additional  action creator (`useFreeAnimal.ts`) to "free" added animals (clears the state collection) 

```bash
├── components
│   └── TopBox
│       └── TopBoxChild
│           ├── index.tsx
│           └── useFreeAnimals.ts
└── constants
    └── index.ts
```

### _feature3_

Varied constant (`constants/index.ts`) & redux slice (`slice.ts`) with modified reducer action that multiplies rabbits, when added

```bash
├── constants
│   └── index.ts
└── state
    └── modules
        └── animals
            └── slice.ts
```

### _feature4_

Varied constant (`constants/index.ts`) & redux slice (`slice.ts`) with replaced redux selector that carcinizes previously added animals

```bash
├── constants
│   └── index.ts
└── state
    └── modules
        └── animals
            └── slice.ts
```

## Explanation

The webpack plugin is configured with a toggle handler that maps variants to controls based on a parallel root folder.  This allows for any file to be replaced at any depth.  The example shows both complete replacements, and augmentations (importing of the base, then modifying).

To vary react components, the toggle point from the `react-pointcuts` package is used.

To vary CSS files and constants, a toggle point is used that utilises an [object proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy), to intercept property access.  Despite css and constants not being innately reactive, as long as they are accessed from something that does update with change of state (i.e. react components), their properties will also update based on the new feature.

To vary [`redux` "slices"](https://redux.js.org/tutorials/essentials/part-2-app-structure#redux-slices), the same proxy-based toggle point is used, but to ensure the store root reducer is re-initialised with change of state, it includes a subscribed side effect that calls [replaceReducer](https://redux.js.org/usage/code-splitting#using-replacereducer) from the [`@reduxjs/toolkit`](https://github.com/reduxjs/redux-toolkit) package.  Since individual slices are statically imported (non-reactive), the side effect first flushes the [require cache](https://webpack.js.org/api/module-methods/#requirecache), to ensure a freshly-toggled slice is provided to the toggle point.