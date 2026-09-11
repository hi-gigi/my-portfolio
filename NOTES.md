# Working notes

Running log of where things stand and what's next. Grouped by date,
newest date first; within a date, newest entry first.

---

## Environment & conventions (evergreen — keep at top)

- **node** is at `/opt/homebrew/bin` and is NOT on the Bash tool's default
  PATH — prefix commands with `export PATH="/opt/homebrew/bin:$PATH";`.
- **Content model** lives in `src/model/` + `types.ts`; every view is
  presentational. Site copy = `content.ts`; each case study is its own
  file under `src/model/caseStudies/` (too long to keep in `content.ts`),
  indexed by `src/model/caseStudies/index.ts`.
- **Design tokens** are the single source of truth in `src/styles/tokens.less`
  (colour, type scale, spacing, motion). Component `.less` files must not
  hardcode hex/px/rem for anything a token covers.
- **Dev server** binds a PORT from the environment (`vite.config.ts`) and
  `.claude/launch.json` has `autoPort: true` — don't re-add a hardcoded
  `--port 5173`.
- **Deploy**: push to `main` → GitHub Actions builds `dist/` and publishes
  to Pages. Repo setting: Pages → Source must be "GitHub Actions".

---

## 2026-09-11

### Case study header, take two: its own component, not a `Header` variant

Immediate follow-up to the entry below — the "swap `Header`'s nav
contextually" approach was replaced with a **separate `CaseStudyHeader`
component** per explicit direction: no wordmark, no Résumé CTA on a
case study page; layout is back-link + theme toggle left, section
links right.

- `Header.presenter.ts` / `Header.tsx` reverted to their pre-case-study
  form — no more `useMatch`, no more nav-swapping. `NavMenu` reverted
  to plain `<a href="#work">` too (it's only ever rendered on `/` now,
  so the `Link`/`useLocation` generalization from the last entry was
  dead complexity — removed rather than left unused).
- New `src/components/CaseStudy/CaseStudyHeader.tsx` + `.less`: its
  own sticky full-bleed bar (same pattern as `.site-header`, separate
  rule set — not shared/extended). Left group: `← Back to work` (→
  `/#work`) + `ThemeToggle` (reuses the existing `useTheme` presenter
  directly, no `Header` involved). Right: this case study's section
  links from `getCaseStudySections(id)`, each `Link`ing to
  `${pathname}#${sectionId}` — same-page jump on whichever case study
  is actually open.
- `App.tsx`'s `Layout` now picks the header component itself:
  `useMatch("/work/:id")` decides `<CaseStudyHeader>` vs. `<Header>`.
  Both are siblings under `Layout`, not a shared component with
  branching internals.

Verified: `tsc -b --noEmit` + `npm run build` clean; browser check —
case study header shows exactly back+toggle left / 4 section links
right (no wordmark/Résumé), toggle flips theme, a section link jumps
to that heading, "Back to work" returns to `/#work` with the full
site header (wordmark/Work/About/Contact/Résumé) restored and the
dark-mode choice carried over.

---

### Case study header: back button + in-page section nav (superseded above)

Follow-up to the case study page below, same day. Moved "← Back to
work" out of the article body and into the header's nav row, and
added jump links to each case study section (Overview / Problem space
/ Key considerations / Solution) alongside it — same treatment the
Webflow page had as a sticky TOC.

- `Header.presenter.ts` now takes `siteNav` and returns a resolved
  `nav`: on a `/work/:id` route (`useMatch("/work/:id")`) it swaps in
  `[Back to work, ...section links]`; everywhere else it's the normal
  Work/About/Contact from `content.ts`. Header/NavMenu stay dumb —
  they just render whatever `nav` array they're given.
- New `CaseStudyBlock` field: `heading` blocks can carry an optional
  `navLabel` (short form for the nav pill, e.g. "Overview" vs. the
  on-page "Project Overview"); `getCaseStudySections(id)` in
  `model/caseStudies/index.ts` pulls the `{id, label}` list straight
  from a case study's own heading blocks — no separate TOC data to
  keep in sync.
- **`NavMenu` link resolution generalized**: a `#foo` href now
  resolves relative to *whatever page it's rendered on*
  (`${pathname}${href}` via `useLocation`), not hardcoded to home. An
  absolute `/#work` href still forces a cross-page jump (that's what
  "Back to work" uses from a case study page). This one rule now
  correctly serves both home's own `#work`/`#about` links and each
  case study's in-page section links with no special-casing per page.
- Removed the standalone `.case-study-back` link + styles from
  `CaseStudy.tsx`/`.less` — superseded by the header version.

**Hit again**: mid-edit HMR briefly threw `Invalid hook call` /
`Link is not defined` in the console — same class of issue as the
`.vite` cache problem noted below, this time just a stale module in
an already-open tab. A hard reload (or a fresh tab) showed it was never
broken; the DOM/rendered content was correct the whole time. Lesson:
don't trust console errors from a tab that's been open through several
edits — open a fresh tab (or reload) before concluding something's
actually broken.

**Also noted, not fixed**: the mobile hamburger button
(`.nav-toggle`) hangs the browser-automation tool's click action
(30s timeout) — reproduces identically on the untouched homepage nav,
so it's a pre-existing quirk in the tool/click-handling combo, not a
regression from this change. Real-user click behavior unverified by
automation here; spot check manually if it matters.

Verified: `tsc -b --noEmit` + `npm run build` clean; desktop
walkthrough on `/work/ai-search` — header shows Back + 4 section
links + Résumé, each section link scrolls to the right heading, Back
returns to `/#work`, and the normal Work/About/Contact nav is back on
`/`.

---

### First case study page — AI-powered search (`/work/ai-search`)

Added client-side routing and built out the first real case study page,
sourced from the copy on the live Webflow site
(jiaqizhuo.com/ai-answer-in-search). Deliberately plain layout per
request — one column, text and images, no sidebar/TOC/sticky nav yet;
that's a later pass.

**Routing** — added `react-router-dom` (`BrowserRouter`, basename
`import.meta.env.BASE_URL` so it works at both dev `/` and prod
`/my-portfolio/`).
- `App.tsx` now composes a `Layout` (Cursor + Header + `<Routes>` +
  Footer) instead of one flat page. Home (`/`) renders the old
  Hero/Work/About stack unchanged; `/work/:id` renders `CaseStudyPage`.
- `CaseStudyPage` (`src/components/CaseStudy/CaseStudyPage.tsx`) looks
  up the project + case study by id and redirects home (`<Navigate>`)
  if either is missing — so linking a project without a written case
  study just fails safe instead of 404ing.
- **GH Pages deep-link fix**: static hosting 404s on a direct hit to
  `/my-portfolio/work/ai-search` (no server-side router). Added the
  standard rafgraph `public/404.html` ⇄ `index.html` redirect-and-decode
  pair (`?p=` query trick + `history.replaceState`) — untested against
  the live deploy yet, verify after the next push.
- **Nav had to become route-aware**: `NavMenu`'s `#work`/`#about` links
  and the header wordmark (`#top`) are now `react-router-dom` `Link`s
  (`to="/#work"` etc.) instead of plain `<a>` — a plain anchor from
  `/work/ai-search` would never navigate home. New
  `presenters/useScrollToHash.ts` replicates the browser's native
  hash-scroll on every route/hash change (SPA nav doesn't get it for
  free); reuses the existing global `scroll-behavior: smooth`, so it's
  already reduced-motion-safe.

**Content model** — new block-based `CaseStudyContent` type
(`types.ts`): `heading` (id-bearing, for future anchor nav) /
`subheading` / `paragraph` / `list` (plain strings or `{label, text}` —
rendered `**label** — text`) / `image`. `findProject(id)` added to
`content.ts` so the page header (title/blurb/labels) stays sourced from
the existing `Project`, not duplicated into the case study file.

**Images are placeholders, on purpose** — first pass pulled the real
screenshots from the Webflow CDN, but was told to back that out; every
`image` block currently omits `src` and renders a dashed-border
`.case-study-image-placeholder` panel showing its `alt` text instead.
**Next**: swap in real screenshots (user will upload) — just add `src`
pointing at a file under `public/case-studies/ai-search/` to each block
in `src/model/caseStudies/ai-search.ts`.

**`ProjectCard` now links conditionally** — `getCaseStudy(id)` decides
whether a tile renders as a `<Link to="/work/:id">` (case study exists)
or an inert `<article>` (doesn't yet — "Coming soon" and the four other
projects). Only linked cards get `data-cursor-label="View case study"`
now; previously every card claimed it regardless of whether a page
existed. **Non-obvious CSS fix**: the linked `<a class="card">` picked
up the global `a { text-decoration: underline }` rule on its nested
`h4`/`p` text (decoration paints through descendants even though it's
not an inherited property) — added `color: inherit; text-decoration:
none` to `.card` in `ProjectCard.less` to cancel it.

**Also hit**: after `npm install react-router-dom` mid-session, the
already-running Vite dev server threw `Invalid hook call` / duplicate-
React errors — stale `node_modules/.vite` dep-optimizer cache from
before the install. Fixed by `rm -rf node_modules/.vite` + restarting
the dev server. Expect this any time a dependency is added while a dev
server is already up.

Verified: `tsc -b --noEmit` + `npm run build` clean; dev-server
walkthrough — direct load of `/work/ai-search`, card click-through from
`/`, "← Back to work" back to `/#work`, dark mode, mobile (375px)
reflow, "Coming soon" card confirmed non-interactive. **Not yet
verified**: the actual GH Pages deploy (404.html redirect round-trip
only really provable after a live push).

---

## 2026-09-10

### Button hover / click exploration — first two picks shipped

Second slice of the motion pass. Built a throwaway
`button-effects.html` catalog (same pattern as the others: token
subset, `pg-theme` toggle, reduced-motion banner, a pick-per-group
tracker that drives a live preview row). Four groups: primary hover
(`hp-*`), secondary / icon hover (`hs-*`), text-button / link hover
(`tb-*`), press (`pr-*`). It also mounts a **compact port of the real
`src/components/Cursor`** with an on/off toggle, so each treatment can
be judged under the difference-blend disc + the click ping.

How the options read against the custom cursor (the reason some are
tagged "avoid"):

- The 48px disc already carries the hover affordance (native cursor is
  hidden), so a hover treatment only needs to add a little.
- `mix-blend-mode: difference` fights any hover that **repaints the
  whole fill** (the current coral flip, wipes, washes) — the disc
  inverts against the new colour and its tint swims. Treatments that
  leave the fill alone (lift, ring, sheen, underbar, label tint) stay
  clean.
- The cursor **ping is already the click effect**. An on-button shape
  that expands from the click point (ink ripple) just doubles it;
  surface-level presses (squash, keycap, dim) layer under it fine.

#### Shipped (`60b3f7a`)

- **`pr-1` press squash** — `.btn:active { transform: scale(0.96) }`
  in `global.less`, gated behind `prefers-reduced-motion:
  no-preference`; `transform` added to the `.btn` transition. First
  press feedback the buttons have had. Applies to every `.btn`
  (Hero actions + socials, Résumé CTA). The chrome toggles
  (`.nav-toggle`, `ThemeToggle`) are **not** `.btn` and were left
  out — easy to add later if wanted.
- **`tb-1` draw-in underline** — header nav (`NavMenu.less`) and
  footer (`Footer.less`) links grow a coral (`--accent-alt`)
  underline from the left on `:hover` / `:focus-visible`, retract it
  right on leave (transform-origin swap, `@ease-slow`, snaps under
  reduced motion). Résumé CTA excluded via `a:not(.nav-cta)`.
  - The site has **no inline prose links** — every `<a>` is a nav
    link, footer link, or a `.btn` — so this is the whole surface.
    The dormant global `a` rule in `global.less` (static underline,
    accent → accent-alt on hover) is left untouched for future body
    copy.

#### Still open

- **Primary + secondary hover kept as-is** (`hp-0` / `hs-0`) for now.
  The original gripe — the primary's full flip to saturated
  `--accent-alt` — is unresolved; `button-effects.html` has the
  alternatives staged (lift, warm-shift, label-tint, ring, underbar,
  border-draw, …) if we come back to it.

#### Throwaway files at the repo root (still not committed)

`playground.html`, `motion-catalog.html`, `cursor-bg-options.html`,
`cursor-label-contrast.html`, `theme-toggle-playground.html`,
`button-effects.html`. `rm` the lot when the motion pass is done.

---

## 2026-09-09

### Custom cursor + a motion-options exploration

First piece of the long-deferred "motion pass". Committed the custom
cursor (`b356d8b`); the exploration scaffolding is deliberately **not**
committed.

#### Custom cursor — shipped (`src/components/Cursor/`)

Document-level, mounted in `App.tsx`, three layered nodes:

- **disc** — a white circle in `mix-blend-mode: difference`, lags the
  pointer (0.18 lerp in a rAF loop) and swells 22 → 48px over
  `a, button, .btn, [role=button], label, summary`.
- **dot** — small `--accent` dot, tracks the pointer exactly (no lag).
- **label** — a mono pill that fades in over any `[data-cursor-label]`
  element and shows its text. `ProjectCard`'s `<article class="card">`
  carries `data-cursor-label="View case study"`. The pill measures
  itself and **flips left / below the pointer** near the right and top
  viewport edges so it's never clipped (was clipping in the rightmost
  tile column).
- **click** — `.cursor__ping`, an `--accent` ring that expands + fades
  from every `pointerdown`.

Why this shape (picked from the `cursor-bg-options.html` catalog, "C5c"):
the difference-blend disc stays legible on both the dark hero and the
light body without a per-section swap, and the orange dot is the one
element that's *always* the brand colour.

MVP split kept: `Cursor.presenter.ts` owns the enable decision
(`(hover: hover) and (pointer: fine)` **and** not
`prefers-reduced-motion`, both reactive via `matchMedia` change events)
and every pointer listener; `Cursor.tsx` only renders nodes + refs.

Non-obvious bits worth keeping:
- **The label arrow is an inline SVG, not a glyph.** `↗` / `→` aren't in
  the loaded IBM Plex Mono subset — they fall back to a system font with
  different metrics, which is why the glyph never sat right.
- The disc's `#fff` fill is a **blend operand**, not a theme colour —
  intentionally not tokenised.
- Cursor geometry (`--cursor-dot-size`, `--cursor-disc-size*`) lives as
  scoped custom props on the `.cursor` wrapper — the `Hero` `--hero-*`
  pattern. New `@z-cursor: 1000` token, above `@z-header`.
- Native cursor hidden via `body.has-custom-cursor` + an explicit
  interactive-element list in `Cursor.less` that mirrors `INTERACTIVE`
  in the presenter — extend both together if real form controls appear.

Verified: `tsc -b --noEmit` + `npm run build` clean; disc/dot/label +
edge-flip + ping all checked in the browser.

#### Exploration scaffolding — throwaway, NOT committed

Three self-contained option catalogs at the repo root, each with live
mini-demos + a pick tracker. `rm` them when the motion pass is done:

- `playground.html` — the original: scroll reveals, magnetic buttons +
  cursor spotlight, gradient mesh / dot grid, text (scramble · per-word
  stagger · shine), then duotone image, link underline-draw, marquee,
  click ripple.
- `motion-catalog.html` — a wider menu (custom cursor, cursor trail,
  page spotlight, hover-image reveal, parallax, sticky scrub, horizontal
  gallery, velocity skew, progress bar, 3D tilt, …).
- `cursor-bg-options.html` — deep-dive on cursor *shapes* (8) and calmer
  *ambient backgrounds* (7: spotlight-follow, dot-grid parallax, line
  grid, column glow, contour lines, constellation, aurora), plus a
  three-way "C5 orange" comparison stage.

Still open from the picks: catalog **13** duotone thumbnails, **14** link
underline-draw + arrow, **15** marquee divider, **22** click ripple —
demoed in `playground.html`, not yet built into `src/`.

---

## 2026-09-08

### Content fill-in, palette re-tone, type scale (backfilled)

Several small commits over 2026-09-07 evening → 09-08 plus one long polish
session. Recorded here after the fact; the per-commit messages have the
fine detail.

#### Content + structure

- **All six project tiles** now carry real copy (`content.ts`).
- **Work section grouped**: `WorkContent.projects` → `groups[]`, each
  `{ label, projects }`. `label === ""` renders no `<h3>`. Current layout:
  "Selected work · 2020–present" (4 Lucid tiles, empty label) + "Internships
  · 2018–2019" (Hasbro, IBM).
- **About rewritten**: `body` is now `string[]` (one `<p>` each); added
  `name` + optional `pronunciation`; heading "I'm Jiaqi /JYAH-chee/". Four
  paragraphs — ambiguity/technical domains → complexity-to-clarity → AI as a
  thinking partner → outdoors + photography.
- **Hero actions**: primary "View work"; secondary = three solid icon links
  (LinkedIn / GitHub / email). Section-title bottom dividers dropped.
- **Thumbnails + résumé wired**: `public/thumbs/<id>.{png,jpg}` via a
  `thumb()` helper (resolves against `BASE_URL` like the résumé link);
  `public/jiaqi-zhuo-resume.pdf` added; card `<img>` is `loading="lazy"`.
  Swapping a thumbnail = drop a same-named file in `public/thumbs/`.

#### Build / dev

- Dev serves from `/`; the build keeps `base: "/my-portfolio/"` for Pages.
- LESS `math: "parens"` so authored `clamp(1rem, 1rem + 3vw, …)` survives
  the build instead of collapsing.
- `vite.config.ts` reads `process.env.PORT`; `.claude/launch.json`
  `autoPort: true` (dev server no longer pins 5173).

#### Layout

- **Full-bleed header & footer**: split each into a full-width outer element
  (sticky background + divider) and an inner wrapper capped at `@measure`,
  so the divider lines reach the screen edge. `.site-header-inner` is
  `position: relative` so the collapsed nav dropdown still anchors to it.
- Footer: even `24px` block padding (was 32/64), ~117px → ~69px; link gap
  16 → 32px; LinkedIn added ahead of GitHub / Email.
- `@header-height` 72 → 64px.

#### Palette re-tone → "Warm Stone" on the coral hue

The neutrals used to sit around hue 36° (yellow-taupe) and never agreed with
the coral accent. Moved every neutral onto the accent's hue (~14°) at low
saturation — warm, not pink:

- light: `--bg #f8f3f1` · `--tonal #f2e7e5` · `--text #201a18` · `--muted #7a635c`
- dark ("Onyx"): `--bg #110e0e` · `--tonal #1f1b1a` · `--text #f2ede9` · `--muted #a5938d`
- accent trio unchanged (`#fb9280` / `#f76a6a` / `#201f1c`).

Why: coral underline / badge / hover states now read native; dark bg keeps
green ≥ blue so it leans warm, never magenta; `--muted` on `--tonal` in
light clears AA (~4.6:1, was 3.9). Dark ground picked from B/C/D options
(near-black / charcoal / espresso) via a temporary in-page tone switcher
that was then removed.

#### Type scale

- New tokens in `tokens.less`: `@text-2xs … @text-xl`, `@leading-*`,
  `@tracking-*`. Every component now sizes text from the ladder — no raw
  rem/px.
- **Body 18 → 16px** (`@text-base`). `h1`–`h4` gained real default sizes so
  a classless heading still looks like a heading.
- `.eyebrow-label()` mixin (`mixins.less`) is the one mono meta-label role;
  `.section-title` and `.work-group-title` both use it and render identical.
- Mono meta-labels moved to `+0.02em` tracking (`@tracking-wide`) — mono
  needs air. `.wordmark` left at `1.05rem`, off-scale on purpose (brand).

#### Font loading + smaller polish

- Google Fonts request trimmed to weights actually used (dropped Inter 600,
  Mono 500). Raleway 600 (latin) is `<link rel="preload">`ed for the hero
  LCP text.
- `text-wrap: balance` on headings, `text-wrap: pretty` on body; dropped
  `text-rendering: optimizeLegibility` (can jank long-page scroll).
- Project-card description `--text` → `--muted` so the title leads.
- Hero lede shrunk but still fluid:
  `clamp(@text-sm, 0.9rem + 0.2vw, @text-base)` (15.2–16px, was 16–18.4).

#### Docs

- Deleted `HANDOFF.md` (a stale 2026-09-08 snapshot); its evergreen bits
  are the pinned section at the top of this file.

---

## 2026-09-07

### Fix: mobile hamburger opened then instantly closed

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

### Project tile iteration

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

### Rebuilt as React + TypeScript + LESS

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

### Hero h1 weight 700 → 600

- Added Raleway 600 to the Google Fonts load (was 500;700 → 500;600;700)
- New `--hero-title-weight: 600` knob in the `.intro` hero block
- Deviates from the design brief ("headings: 500 / 700") — one-off for the
  hero only; nothing else uses 600. Revisit if it should be systematised.

---

### Hero copy is real now

- eyebrow → "Product Designer & Generalist"
- h1 → "8+ years in Enterprise B2B. Sharp in ambiguous, technical spaces —
  move fast, think strategically, and build with AI."
- lede → two lines: "Currently Senior UX Designer II @ Lucid Software" /
  "M.S. Human-Computer Interaction, Indiana University Bloomington"
- `.intro h1` retuned for the longer statement: font clamp max 3.2 → 2.75rem,
  `max-width` 20 → 26ch (was wrapping to 5 tall lines)
- Intro buttons unchanged (still See selected work / Email me)

---

### Wordmark set to lowercase

- Header wordmark changed from "Jiaqi Zhuo" to lowercase "jiaqi zhuo" (calmer,
  reads better than run-together "jiaqizhuo", less loud than all-caps)
- `<title>`, meta description and footer copyright still use proper-case
  "Jiaqi Zhuo" — that's the name, not the wordmark treatment

---

### Mobile nav (collapsed dropdown)

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

### Layout tweaks + résumé CTA

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

### Dark / light toggle in the nav

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

### Warm Stone design system applied

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

### Setup done, site is live

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
