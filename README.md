# UpForge Consulting Website

- **Staging:** https://staging.upforgeconsulting.com — updates automatically on every change
- **Live:** https://upforgeconsulting.com — updates only when you approve ("publish")

## How it works
1. Ask Claude for a change. Claude pushes it to the `claude/gracious-sagan-art5bc` branch.
2. About a minute later, refresh staging to review it.
3. Happy? Tell Claude "publish". Claude merges into `main`, and the live site updates.

Deploys run from `.github/workflows/deploy.yml`. Progress is under the **Actions** tab on GitHub.
