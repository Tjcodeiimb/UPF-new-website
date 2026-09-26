# UpForge Consulting Website

- **Staging:** https://staging.upforgeconsulting.com — updates automatically on every change
- **Live:** https://upforgeconsulting.com — updates only when you approve ("publish")

## How it works
1. Ask Claude for a change. Claude pushes it to the `claude/gracious-sagan-art5bc` branch.
2. About a minute later, refresh staging to review it.
3. Happy? Tell Claude "publish". Claude merges into `main`, and the live site updates.

Deploys run from `.github/workflows/deploy.yml`. Progress is under the **Actions** tab on GitHub.

## Replacing an image
1. Easiest: send the new image to Claude and say which one it replaces. Claude compresses it and pushes to staging.
2. Yourself on GitHub: open the repo → switch to branch `claude/gracious-sagan-art5bc` → `assets/` → **Add file → Upload files**,
   upload the new image **with a new file name** (e.g. `shardul-2027.jpg`), commit, then ask Claude to point the page at it.
   A new name avoids browsers showing the old cached image (images are cached for 30 days).
3. Staging updates ~1 minute after the commit. The live site updates only when you say "publish".
