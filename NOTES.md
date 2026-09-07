# Working notes

Running log of where things stand and what's next. Newest entry on top.

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
