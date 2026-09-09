# Working notes

Running log of where things stand and what's next. Newest entry on top.

---

## Environment & conventions (evergreen — keep at top)

- **node** is at `/opt/homebrew/bin` and is NOT on the Bash tool's default
  PATH — prefix commands with `export PATH="/opt/homebrew/bin:$PATH";`.
- **Content model** lives entirely in `src/model/content.ts` + `types.ts`;
  every view is presentational. Editing the site = editing `content.ts`.
- **Design tokens** are the single source of truth in `src/styles/tokens.less`
  (colour, type scale, spacing, motion). Component `.less` files must not
  hardcode hex/px/rem for anything a token covers.
- **Dev server** binds a PORT from the environment (`vite.config.ts`) and
  `.claude/launch.json` has `autoPort: true` — don't re-add a hardcoded
  `--port 5173`.
- **Deploy**: push to `main` → GitHub Actions builds `dist/` and publishes
  to Pages. Repo setting: Pages → Source must be "GitHub Actions".

---

## 2026-09-07 — Fix: mobile hamburger opened then instantly closed

**Bug** — tapping the hamburger did nothing. The header rendered the
hamburger and the close button as *two separate elements*, swapped on
`menu.isOpen`. Opening unmounted the hamburger, so `menu.triggerRef.current`
went `null`. The same native click kept bubbling to the `document`
outside-click listener that had just been attached; its guard
`triggerRef.current?.contains(target)` was now `null`, so it treated the
opening click as an outside click and called `close()`.

**Fix (part 1)** — one persistent `.nav-toggle` button that only swaps its
icon / `aria-label` and uses `menu.toggle`. The node stays mounted, so
`triggerRef` stays live and the guard works. Dropped the `.nav-close` class +
its CSS. `menu.open` is now unused but kept on the view-model (generic
presenter API).

**Fix (part 2) — the "2nd open shows nothing" bug.** `.nav` animated
`visibility` in the same `transition` as `opacity`/`transform`
(`transition: … visibility 0.2s ease`). On repeat open/close cycles the
computed style got stuck: `.nav.is-open` resolved to `opacity: 0;
visibility: hidden` even with the class applied and the CSSOM rule correct —
the classic smooth-`visibility` transition trap. Now `visibility` is a `0s`
step: instant on open (`… visibility 0s linear 0s`), delayed to after the
fade on close (`… visibility 0s linear 0.28s`); only `opacity` + `transform`
actually animate. Reduced-motion block also neutralises `.nav.is-open`.

**Fix (part 3) — `useNavMenu` was fighting its own open.** Console logging
caught `close()` being fired from the debounced `resize` handler right after
each open: it ran on *every* `resize` event and re-checked
`window.innerWidth >= 561`, so any stray resize (mobile URL-bar show/hide,
devtools docking, zoom) slammed the menu shut. Also the outside-dismiss
listener was on `document` `click`, which is prone to catching the very
interaction that opened the menu.

Rewrote the hook:
- outside dismiss → `pointerdown`, and the listener is attached on a `0ms`
  `setTimeout` so the opening tap can't be read back as an outside click
- grow-to-desktop → `window.matchMedia("(min-width: 561px)")` `change`
  event; only fires when the viewport *crosses* the breakpoint, never on
  incidental resizes. Removed the `lodash/debounce` resize handler
  (lodash is still a dep; nothing in `src/` imports it now).

Verified: 8 consecutive toggle cycles at a 400px viewport all open cleanly
(`opacity 1 / visible`); a plain `resize` event no longer closes it; outside
`pointerdown` still dismisses.

---

## 2026-09-07 — Project tile iteration

Reworked `ProjectCard` around a fixed element order: **thumbnail → title →
description → labels**.

- **Thumbnail is now inset**, not full-bleed. `.card` has `padding: @space-3`;
  `.card-media` sits inside it with `calc(@radius - 2px)` corners (concentric
  with the card) and `margin-bottom: @space-4`. Dropped the old
  `border-bottom` + `overflow: hidden` on the card.
- **Two media modes**, both optional per project:
  - `image` — static; gets a `scale(1.04)` hover-zoom (gated behind
    `prefers-reduced-motion: no-preference`)
  - `video` — muted/loop/playsInline `<video>`; plays on card hover, resets on
    leave, stays paused under reduced motion. `image` doubles as its poster.
    Hover logic lives in `ProjectCard.presenter.ts` (`useCardVideo`).
  - neither set → empty `--bg` panel (as before)
- **Labels** replace the old `Role: X · year` line. `Project.labels: string[]`,
  rendered as a `<ul class="card-labels">` of small mono pills (`--bg` fill on
  the `--tonal` card). `content.ts` migrated: `role`/`year` → `labels` array.
- Type change: `Project` drops `role`, `year`, `imageUrl`; adds `labels`,
  `image`, `video`.

No real thumbnails yet — drop files in `public/` (or `src/assets/`) and set
`image` / `video` on each project in `content.ts`.

Verified: `tsc -b --noEmit` clean, dev server renders both themes, hover border
+ grid stacking unchanged.

---

## 2026-09-07 — Rebuilt as React + TypeScript + LESS

Static HTML/CSS → **Vite + React 18 + TS**, styling in **LESS**. Same visual
design and behaviour, ported component by component.

**Architecture** (see `ARCHITECTURE.md`)
- MVP: `src/model/` (data + types), `src/presenters/` + `*.presenter.ts`
  (logic hooks), `*.tsx` (views — no direct `window`/`document`/`localStorage`)
- Presenters: `useTheme` (light/dark + persistence, replaces the old inline
  scripts — pre-paint theme script still in `index.html`), `useNavMenu`
  (dropdown open state + outside-click/Esc/resize dismissal, uses
  `lodash/debounce`)
- All copy now in `src/model/content.ts`

**LESS tokens**
- `src/styles/tokens.less` = single source. `@`-vars for compile-time values
  (spacing/radius/fonts/breakpoints/z/motion), `var(--*)` custom properties
  for the 7 themeable colours (emitted once via `global.less`)
- Each component `.less` does `@import (reference) "…/tokens.less"` and uses
  tokens only — no raw hex/px/rem for anything a token covers
- Hero one-off type scale kept as scoped `--hero-*` props on `.intro`

**Deploy model changed**
- Was: Pages serving `index.html` from `main` root
- Now: `.github/workflows/deploy.yml` builds `dist/` and deploys via Actions
  (`npm ci` + `npm run build` → upload `dist` → deploy-pages)
- **TODO in repo settings: Pages → Source → GitHub Actions**
- `package-lock.json` committed; `vite.config.ts` `base: "/my-portfolio/"`

**Verified locally** — `npm install`, `npm run build` (tsc + vite, clean),
`npm run dev`: renders identically to the old static site, theme toggle +
mobile dropdown + resize/Esc/outside-click dismissal all work.

**Résumé** still expects `public/jiaqi-zhuo-resume.pdf` (not added).

---

## 2026-09-07 — Hero h1 weight 700 → 600

- Added Raleway 600 to the Google Fonts load (was 500;700 → 500;600;700)
- New `--hero-title-weight: 600` knob in the `.intro` hero block
- Deviates from the design brief ("headings: 500 / 700") — one-off for the
  hero only; nothing else uses 600. Revisit if it should be systematised.

---

## 2026-09-07 — Hero copy is real now

- eyebrow → "Product Designer & Generalist"
- h1 → "8+ years in Enterprise B2B. Sharp in ambiguous, technical spaces —
  move fast, think strategically, and build with AI."
- lede → two lines: "Currently Senior UX Designer II @ Lucid Software" /
  "M.S. Human-Computer Interaction, Indiana University Bloomington"
- `.intro h1` retuned for the longer statement: font clamp max 3.2 → 2.75rem,
  `max-width` 20 → 26ch (was wrapping to 5 tall lines)
- Intro buttons unchanged (still See selected work / Email me)

---

## 2026-09-07 — Wordmark set to lowercase

- Header wordmark changed from "Jiaqi Zhuo" to lowercase "jiaqi zhuo" (calmer,
  reads better than run-together "jiaqizhuo", less loud than all-caps)
- `<title>`, meta description and footer copyright still use proper-case
  "Jiaqi Zhuo" — that's the name, not the wordmark treatment

---

## 2026-09-07 — Mobile nav (collapsed dropdown)

**Done**
- At ≤560px the nav collapses to a hamburger icon button (☰) in the header;
  it opens a full-width dropdown that hangs under the sticky header
- Dropdown height wraps its content — the page stays visible below it, with a
  drop shadow + `--tonal` bottom border to separate the layers
- Closed dropdown is `pointer-events: none`, so the page below stays usable
- "X" icon button sits in the exact header slot the hamburger used (same
  32×32 spot); the two swap via `body.nav-open`, only one shows at a time
- Drop shadow kept subtle: `0 8px 18px -8px rgba(0,0,0,.16)` + `--tonal` border
- Links (Work / About / Contact) dropped from 1.9rem to 1.15rem, right-aligned,
  Résumé CTA below
- Desktop unchanged — `.nav-links` uses `display: contents` so the anchors
  still flow into the inline flex row above the breakpoint
- JS: `aria-expanded` + `aria-label` swap, click-outside to close, Esc to
  close, tap-a-link to close, auto-close when resized to desktop
- Removed the earlier body scroll-lock / `inert` (dropdown, not full overlay)
- Reduced-motion: dropdown transition disabled
- Reference also had a LinkedIn/Resume/Email row + a decorative ring — still
  not built; Résumé is the single CTA for now

---

## 2026-09-07 — Layout tweaks + résumé CTA

**Done**
- `--measure` 1080 → 1280px (wider centre container, 80rem)
- Button radius 8 → 4px (`--radius-btn`); cards stay at 8px
- Project grid: fixed 2 columns max, collapses to 1 under 600px
- Sticky top nav — `position: sticky`, solid `--bg`, hairline bottom border,
  `scroll-padding-top` so anchor links clear it; header padding trimmed to 24px
- Primary "Résumé" CTA in the nav (after Contact), opens in a new tab
  → **needs the file at `assets/jiaqi-zhuo-resume.pdf`** (not added yet), or
    repoint the href at a hosted URL
  → has a trailing ↗ icon + sr-only "(opens in a new tab)" text

---

## 2026-09-07 — Dark / light toggle in the nav

**Done**
- Added a theme toggle button to the top nav (`.theme-toggle`) — sun/moon inline SVG,
  shows the icon for the mode you'd switch to
- Head script sets `data-theme` from `localStorage` before first paint (no flash)
- Body script wires the click: flips `data-theme` on `<html>`, saves the choice,
  keeps `aria-label` / `aria-pressed` in sync; follows the OS setting until the
  visitor picks one explicitly
- `:focus-visible` outline added for `.btn` and `.theme-toggle`
- Verified: toggles both ways, persists across reload, dark bg = `#1A1815`, no FOUC

---

## 2026-09-07 — Warm Stone design system applied

**Done**
- Applied the design system from `portfolio-design-system.md` to `styles.css` + `index.html`:
  - Fonts loaded via Google Fonts — Raleway (headings), Inter (body), IBM Plex Mono (labels/nav/meta)
  - Warm Stone colour tokens (light) + dark-mode overrides via `prefers-color-scheme`,
    with `[data-theme="light"|"dark"]` hooks left in for a future manual toggle
  - Spacing scale as `--space-1..9` tokens; `--radius: 8px` on cards + buttons
  - Accent rules honoured: links stay `--text` with a coral underline (coral-as-text
    fails contrast in light mode); `.btn-primary` monochrome, `.btn-secondary` tonal,
    `.badge` = coral fill + dark text
  - Removed AI-design tells: no all-caps eyebrow/section labels, dropped the `01/02/03`
    numbered markers on the (non-sequential) project cards, replaced lift+shadow card
    hover with a restrained border-colour shift
  - Added intro CTAs ("See selected work" / "Email me") so the button system is used
  - `scroll-behavior: smooth` now gated behind `prefers-reduced-motion`
- Verified both light + dark in a local server preview (the in-app file preview inlines
  HTML and drops the linked stylesheet, so use a real browser / `python3 -m http.server`)

**Not committed yet** — preview, then "commit this" / "push" when happy.

**Next steps**
1. Real content — swap placeholder intro / projects / about, add real project images to `assets/`
2. Share the Webflow portfolio URL to map its pages/content across
3. Motion pass (only after content is locked): Lenis first, then GSAP/ScrollTrigger,
   one deliberate reveal moment — build options in a throwaway `playground.html` first

---

## 2026-09-07 — Setup done, site is live

**Done so far**
- Project scaffolded: `index.html`, `styles.css`, `.gitignore`, `assets/`, `README.md`
- Git + GitHub connected (`origin` = https://github.com/hi-gigi/my-portfolio.git)
- Repo made **public**
- **GitHub Pages live:** https://hi-gigi.github.io/my-portfolio/ (deploys from `main` / root on every push)
- Auth: HTTPS + fine-grained PAT, saved in macOS keychain

**Context / goals**
- This coded site is meant to eventually **replace the existing Webflow portfolio**
- Domain stays on Webflow for now — the switch later is a DNS change, not a code change
- Content is still placeholder — real intro / projects / about not written yet

**Next steps**
1. Share the live **Webflow portfolio URL** → map its pages and content, rebuild here piece by piece
2. Swap placeholder text in `index.html` for real name, bio, projects
3. **Fun interactions / motion** — undecided. Plan: gather 2–4 reference sites (godly.website, Codrops,
   Awwwards), then build a throwaway `playground.html` with a few options side by side on the live site
   before committing anything to the real portfolio. Vocabulary to pick from: magnetic buttons,
   cursor spotlight/trail, custom cursor, parallax, scroll-triggered reveals, sticky sections,
   gradient-mesh background, interactive dot grid, marquee, text scramble, hover image reveal.
   Keep it fast + respect `prefers-reduced-motion`.
4. Later: point custom domain at GitHub Pages (add `CNAME` file + update DNS), enable HTTPS

**Workflow reminder**
ask for a change → preview in browser → "commit this" → "push" → live site updates.
"undo that" / "revert to last commit" to roll back.
