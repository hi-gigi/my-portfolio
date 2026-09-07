# my-portfolio

My personal design portfolio. Plain HTML + CSS, no build step.

## Files

| File | What it is |
|------|------------|
| `index.html` | All the content and text of the site |
| `styles.css` | All the colours, fonts, and layout |
| `assets/`    | Put images here (drag files into the folder) |

## Preview it locally

Double-click `index.html` in Finder — it opens in your browser.
After any edit, save the file and refresh the browser tab.

## The everyday loop with Claude Code

1. Ask Claude for a change ("make the intro bigger", "add a project card").
2. Look at it in the browser.
3. If you like it, tell Claude **"commit this"** with a short note.
4. If you don't, tell Claude **"undo that"** / **"revert to the last commit"**.

## Save a version to GitHub (commit + push)

```bash
git add -A
git commit -m "Describe what changed"
git push
```

## Go back to an older version

```bash
git log --oneline        # list past versions, newest first
git revert <commit-id>   # safely undo one specific commit
```

Ask Claude to do any of this for you — you don't have to memorise it.

## Publish the site (later)

On GitHub: **Settings → Pages → Source: `main` branch, `/root`**.
Your site goes live at `https://hi-gigi.github.io/my-portfolio/`
and updates automatically every time you push.
