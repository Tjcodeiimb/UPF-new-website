# UpForge Consulting Website

## Project Overview
Static HTML website for UpForge Consulting with modern design, responsive layouts, and integrated questionnaire functionality.

## Project Structure
```
/
├── index.html                    # Main homepage
├── loading-screen-v2.html        # Loading screen
├── questionnaire.json            # Questionnaire data
├── assets/                       # Images and media files
├── case-studies/                 # Case study pages
├── partners/                     # Partner pages
├── legal/                        # Legal pages (privacy, terms)
└── mobile/                       # Mobile-specific pages (deprecated in favor of responsive)
```

## Development Workflow

### 1. Running Locally
Start the development server to preview changes:
```bash
python3 -m http.server 8000
# OR
python -m http.server 8000
```
Then open: http://localhost:8000

The server auto-serves `index.html` for directory requests, making navigation seamless.

### 2. Making Changes
- Edit HTML files directly in the project
- CSS is inline in `<style>` tags - edit within HTML files
- JavaScript is inline in `<script>` tags
- Images: add to `assets/` directory
- Forms: modify questionnaire logic in embedded scripts

### 3. Git Workflow
Always commit changes before and after editing:
```bash
git add .
git commit -m "Description of changes"
git push -u origin claude/gracious-sagan-art5bc
```

### 4. Deployment
This repository is connected to your live domain. Changes pushed to the main branch are automatically deployed.

**Current workflow:**
1. Make changes on `claude/gracious-sagan-art5bc` branch
2. Test locally with dev server (see step 1)
3. Commit changes
4. Push to branch
5. Create PR or merge to main for live deployment

## Key Features to Be Aware Of

### Forms & Questionnaire
- Form validation happens in embedded JavaScript
- Form data is in `questionnaire.json` structure
- Add form protection: never break form submission on validation errors

### Responsive Design
- Mobile breakpoint: 768px
- `.mobile-br` / `.desktop-br` classes control display
- Test on multiple screen sizes before committing

### Performance
- All CSS is inline (single HTTP request)
- Font preconnects are optimized (Google Fonts)
- Asset images should be optimized (consider compression)

### Accessibility
- Focus states defined with outlines and shadows
- All interactive elements have focus-visible styles
- Maintain semantic HTML structure

## Available Commands

### Start Dev Server
```bash
python3 -m http.server 8000
```

### Check Git Status
```bash
git status
git log --oneline -5
```

### Preview Before Committing
```bash
# Start server, open http://localhost:8000, make edits, refresh browser
```

## Tips for Editing

1. **CSS Changes**: Edit the `<style>` tag in index.html
2. **Add Sections**: Copy existing section patterns for consistency
3. **Typography**: Modify font-family, font-size in CSS classes
4. **Colors**: Update CSS variables in `:root { }`
5. **Images**: Place in assets/ and reference with `<img src="assets/image-name.ext">`
6. **Forms**: Modify embedded JavaScript form handlers
7. **Mobile**: Test changes at 768px viewport width

## Deployment Notes

- No build step needed (static site)
- No node_modules or npm required
- All changes are live once pushed to main
- Test thoroughly locally before pushing to main

## Next Steps

1. Start dev server: `python3 -m http.server 8000`
2. Open http://localhost:8000
3. Make edits as needed
4. Refresh browser to see changes
5. Commit changes when satisfied
6. Push to branch
