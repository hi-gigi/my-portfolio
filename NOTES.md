# Working notes

Running log of where things stand and what's next. Newest entry on top.

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
