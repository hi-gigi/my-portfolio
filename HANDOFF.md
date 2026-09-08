# Session handoff — 2026-09-08

Picking up work on the portfolio homepage content + polish. Prior session
filled the project tiles and reworked the hero, then iterated on the Work
and About sections.

## Git state

- Branch: `main` (working directly on main — matches this repo's history).
  `main` is **5 commits ahead of `origin/main`**, not pushed.
- Last commit: `af5d85c` "Fill in project tiles; rework hero actions and spacing"
- **Everything below "Uncommitted work" is in the working tree, not committed.**
  Type-check passes (`node_modules/.bin/tsc -p tsconfig.app.json --noEmit`),
  all changes verified in the browser.

## Committed this session (af5d85c)

- All 6 project tiles filled with real content.
- Hero primary button: "See selected work" → **"View work"**.
- Hero secondary "Email me" → **three solid icon links**: LinkedIn
  (`https://www.linkedin.com/in/jiaqizhuo/`), GitHub
  (`https://github.com/hi-gigi`), Email (`mailto:hizhuojiaqi@gmail.com`).
  `.btn-icon` style added; `HeroSocial` type + brand icons.
- Hero padding: **96px top / 144px bottom** (`@space-9` / `@space-9 + @space-7`).

## Uncommitted work (working tree)

1. **Icon style** — landed on **all-solid** for the 3 hero icons (tried
   outline, reverted). `MailIcon` rebuilt as a full-bleed solid envelope,
   one `evenodd` path with a thin chevron knockout for the fold seam
   (`src/components/icons.tsx`).
2. **Button label weight** — `.btn` font-weight `@weight-body` (400) →
   `@weight-medium` (500) in `src/styles/global.less`. NOTE: also affects
   the header **Résumé** button (shares `.btn btn-primary`).
3. **Section-title divider removed** — dropped `border-bottom` +
   `padding-bottom` from `.section-title` (affects both "Selected work"
   and "About").
4. **Work section grouped** — `WorkContent.projects` → `WorkContent.groups[]`,
   each `{ label, projects }`. `WorkGroup.label === ""` renders no `<h3>`.
   Current layout:
   - Section `title`: **"Selected work · 2020–present"** — 4 Lucid tiles
     directly under it (first group has an empty label).
   - **"Internships · 2018–2019"** — 2 intern tiles (Hasbro, IBM).
   Styles: `.work-group`, `.work-group-title` in `Work.less`.
5. **ProjectCard title** — `<h3>` → `<h4>` (+ `.card-body h4` selector) for
   correct heading nesting under the new group `<h3>`; weight bumped to
   `@weight-semibold` (600).
6. **About section rewrite** (`src/components/About/*`, `content.ts`, `types.ts`):
   - `AboutContent.body`: `string` → `string[]` (one `<p>` per entry).
   - Added `name` (required) + `pronunciation` (optional) to `AboutContent`.
   - New heading **"I'm Jiaqi  /JYAH-chee/"** (`.about-name` +
     `.about-pronunciation`); "About" eyebrow tightened to a 12px gap.
   - New copy — 4 paragraphs: ambiguity + technical domains → design as
     problem-solving / complexity-to-clarity → AI as thinking partner
     ("a designer who also builds with AI") → outdoors + photography.
   - Dropped the old résumé-recap intro paragraph.

## Open items / decisions not made

- **Commit the working tree.** It's a coherent batch ("Group work tiles,
  rewrite About, solid hero icons, remove section dividers" or similar).
- **Button weight 500** also hit the header Résumé button. User was asked
  whether to scope it to `.intro-actions .btn` or bump to 600 — no answer.
- **"Lucid Software" label** no longer shown in the Work section (only in
  tile blurbs + hero). Alternative offered: section title
  "Selected work · Lucid Software, 2020–present". Not taken.
- **IBM internship dates** — tile blurb says "June 2018 to October 2018";
  résumé says June–December 2018. Confirm which is right.
- **Document Discovery tile** — blurb says "multi-million dollar add-on";
  the real ARR figure was redacted in the résumé. Add a number if wanted.
- **Project thumbnails** — all 6 tiles render empty media panels. Add
  `image: "..."` (or `video: "..."` for a hover loop) per project in
  `content.ts`; drop assets in `public/` or `src/assets/`.
- **About — full Webflow layout deferred.** User chose "keep it simple":
  no photo, no "How I Work" / "Outside of Work" sub-headings. Revisit if
  they want the richer layout.
- **`public/jiaqi-zhuo-resume.pdf`** is referenced by the Résumé link but
  may not exist yet.

## Environment notes

- **node** is at `/opt/homebrew/bin` and is NOT on the Bash tool's default
  PATH — prefix commands with `export PATH="/opt/homebrew/bin:$PATH";`.
- A **dev server from another chat** runs on `:5173` in this folder.
  `preview_start {name:"dev"}` conflicts on the port; instead
  `navigate` to `http://localhost:5173/` (same folder, Vite HMR picks up
  edits). Transient `undefined ... 'map'` console errors can appear mid-HMR
  while `content.ts` and a component update out of sync — they clear on
  reload.
- Content model lives entirely in `src/model/content.ts` + `types.ts`;
  views are presentational.
