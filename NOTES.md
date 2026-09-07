# Working notes

Running log of where things stand and what's next. Newest entry on top.

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
