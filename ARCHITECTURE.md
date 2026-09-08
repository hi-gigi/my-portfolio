# Architecture

Stack: **React 18 + TypeScript + Vite**, styling in **LESS**.

## MVP (Model – View – Presenter)

| Layer | Lives in | Rule |
|---|---|---|
| **Model** | `src/model/` | Plain data + types. `content.ts` is all the site's copy; `types.ts` is the domain shape. No React, no side effects. |
| **Presenter** | `src/presenters/` (shared) and `*.presenter.ts` next to a component | Hooks that hold state, run side effects (`localStorage`, `matchMedia`, `document` listeners, `resize`), and return a **view-model** — plain values + callbacks. |
| **View** | `*.tsx` components | Presentational. Receive props / a view-model and render markup. **A view never calls `localStorage`, `matchMedia`, `window.*` or `document.*` directly** — it asks a presenter. |

Composition:

```
App.tsx                         // pulls Model, hands slices to views
└─ Header.tsx (view)
   └─ useHeaderPresenter()       // composes the two shared presenters
      ├─ useTheme()              // src/presenters — light/dark model + persistence
      └─ useNavMenu()            // src/presenters — dropdown open state + dismissal
```

Add logic to a component by creating `X/X.presenter.ts` and consuming it from `X/X.tsx`. Keep the `.tsx` about *what it looks like*, the `.presenter.ts` about *how it behaves*.

## Styling — LESS with a single token source

`src/styles/tokens.less` is the **only** place raw values live.

- **Compile-time** values — spacing, radius, fonts, weights, breakpoints, z-index, motion, `@measure`, `@header-height` — are LESS `@variables`. Components get them via `@import (reference) "…/tokens.less";` and use them directly: `padding: @space-5;`
- **Runtime / themeable** values — the seven colours that flip between light and dark — are CSS custom properties (`--bg`, `--text`, `--muted`, `--tonal`, `--accent`, `--accent-alt`, `--accent-text`). `tokens.less` emits them from the raw palette once (through `global.less`), with `prefers-color-scheme` + `[data-theme]` overrides. Components use `color: var(--text);`

**No component `.less` file should contain a hex/px/rem literal for anything a token covers.** One-offs that genuinely belong to a single component (e.g. the hero type scale) are declared as scoped custom properties on that component's root class — see `Hero.less`'s `--hero-*` block.

`(reference)` imports mean the token rules are pulled in for their variables but not re-emitted, so there's no CSS duplication across components.

## Ready for more

`package.json` already carries:

- **lodash** — installed, not currently imported anywhere in `src/` (the old `useNavMenu` `debounce` was dropped for a `matchMedia` listener). If you need it, import per-method (`lodash/debounce`) to keep the bundle small.
- **lottie-react** — installed, not yet used. Drop a Lottie JSON in `src/assets/` and render `<Lottie animationData={…} />` inside a view (keep the "should it play?" logic in a presenter).

## Deploy

`npm run build` → `dist/`. `.github/workflows/deploy.yml` builds on push to `main` and publishes `dist/` to GitHub Pages. In the repo settings set **Pages → Source → GitHub Actions**. `vite.config.ts` `base` is `/my-portfolio/`; change it if the repo is renamed.
