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
- Hostinger Git auto-deploy publishes that branch to https://staging.upforgeconsulting.com
  (folder `public_html/staging` on account `u672450563`).
- The live site `upforgeconsulting.com` is NOT auto-deployed. Only publish to live when the user explicitly asks.

## Rules for edits
- Don't break the questionnaire/contact form: test submit, validation, and mobile (<=768px) after any change near it.
- Keep existing fonts (Bebas Neue, Anton, Plus Jakarta Sans) unless asked to change typography.
