# UpForge Consulting Website

Static HTML site (no build step). CSS and JS are inline in each page.

## Structure
- `index.html` — homepage (most edits happen here; styles in its `<style>` block, colors in `:root`)
- `assets/` — images, logos, `main-*.js`
- `case-studies/`, `partners/`, `legal/` — sub-pages
- `questionnaire.json` — data for the homepage questionnaire/form
- `mobile/` — old mobile site, not linked from the main site

## Workflow
- Work on branch `claude/gracious-sagan-art5bc`. Commit and push after every change.
- `.github/workflows/deploy.yml` uploads over FTP:
  - push to `claude/gracious-sagan-art5bc` → `public_html/staging/` → https://staging.upforgeconsulting.com
  - push to `main` → `public_html/` → https://upforgeconsulting.com (LIVE)
- Never push or merge to `main` unless the user explicitly approves publishing. To publish: open a PR
  from the working branch to `main` and merge it.
- Do NOT use Hostinger's Git auto-deploy: it ignored the target directory and wrote into the live root.

## Rules for edits
- Don't break the questionnaire/contact form: test submit, validation, and mobile (<=768px) after any change near it.
- Keep existing fonts (Bebas Neue, Anton, Plus Jakarta Sans) unless asked to change typography.
