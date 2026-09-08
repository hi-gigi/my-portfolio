# my-portfolio

Personal design portfolio — **React + TypeScript + Vite**, styled with **LESS**.

See [ARCHITECTURE.md](ARCHITECTURE.md) for the MVP layering and the design-token setup.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173/my-portfolio/
```

| Script | Does |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Type-check (`tsc -b`) then build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run typecheck` | Types only, no emit |

## Where things are

| Path | What |
|---|---|
| `src/model/content.ts` | **All site copy.** Editing the portfolio = editing this file. |
| `src/model/types.ts` | Domain types |
| `src/presenters/` | Shared logic hooks (`useTheme`, `useNavMenu`) |
| `src/components/<Name>/` | `Name.tsx` (view) · `Name.presenter.ts` (logic, if any) · `Name.less` · `index.ts` |
| `src/styles/tokens.less` | **Single source of design tokens.** Change values here. |
| `src/styles/global.less` | Reset + base element styles + shared utility classes |
| `public/` | Copied as-is to the site root. Put `jiaqi-zhuo-resume.pdf` here. |

## Images

- Content images that get optimised/hashed: `src/assets/…` and `import` them.
- Files that must keep a stable URL (the résumé PDF, `favicon`): `public/…`.

## Deploy

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds and publishes `dist/` to GitHub Pages. One-time repo setup: **Settings → Pages → Source → GitHub Actions**.

Live at `https://hi-gigi.github.io/my-portfolio/`. If the repo is renamed, update `base` in `vite.config.ts`.

## The everyday loop with Claude Code

1. Ask for a change → preview in the browser.
2. `commit this` with a short note → `push`.
3. `undo that` / `revert to the last commit` to roll back.
