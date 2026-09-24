# ✅ UpForge Website - Development Setup Complete

## What's Been Set Up

Your website is now ready for local development and editing. Here's what was configured:

### ✨ Files Created
- **CLAUDE.md** - Detailed development documentation
- **README.md** - Quick start guide
- **.gitignore** - Excludes unnecessary files from git
- **dev-server.sh** - Helper script to start dev server

### 📦 Project Structure Ready
All your website files are organized:
- `index.html` - Main homepage (edit this to add/modify sections)
- `assets/` - All images and media
- `case-studies/` - Case study pages
- `partners/` - Partner pages
- `legal/` - Legal pages (privacy, terms)
- `questionnaire.json` - Form data

---

## 🚀 How to Start Editing

### Step 1: Start Development Server
```bash
cd /home/user/UPF-new-website
python3 -m http.server 8000
```

Or use the helper script:
```bash
./dev-server.sh
```

### Step 2: View in Browser
Open: **http://localhost:8000**

You'll see your live website!

### Step 3: Make Changes
1. Edit files in your text editor
2. Save changes
3. Refresh browser (Cmd+R or Ctrl+R)
4. See changes instantly! ⚡

### Step 4: Commit When Ready
```bash
git add .
git commit -m "Your description of changes"
```

---

## 📝 Common Editing Tasks

### Add a New Section
1. Open `index.html`
2. Find a similar section to copy
3. Paste and modify content
4. Refresh browser to preview
5. Commit when happy

### Change Colors
1. Open `index.html`
2. Find `:root` in the `<style>` section
3. Update color values (e.g., `--primary: #3462fc`)
4. Refresh browser
5. Done!

### Add New Images
1. Place images in `assets/` folder
2. In HTML, reference: `<img src="assets/image-name.jpg" alt="description">`
3. Refresh browser
4. Commit

### Edit Typography
1. Find the element's CSS class in `<style>`
2. Modify `font-size`, `font-weight`, `font-family`
3. Refresh browser
4. Commit

---

## 🔑 Key Features Ready

✅ **Inline CSS** - Single file, no build needed
✅ **Responsive Design** - Mobile, tablet, desktop
✅ **Forms** - Questionnaire ready to customize
✅ **Images** - Optimized asset pipeline
✅ **Git Tracking** - Version control set up
✅ **Local Dev Server** - Instant preview of changes

---

## 📋 Next: Push to GitHub

Your changes are committed locally. To push to GitHub:

### Option 1: Use GitHub CLI (if available)
```bash
gh auth login
git push -u origin claude/gracious-sagan-art5bc
```

### Option 2: Fix GitHub Access
The error suggests Claude needs access to your repository. You have two options:

**A) Install Claude App on GitHub (Recommended)**
1. Go to: https://github.com/apps/claude/installations/select_target
2. Select your organization: `Tjcodeiimb`
3. Select the repository: `UPF-new-website`
4. Install the app
5. Then try pushing again

**B) Reconnect GitHub in Claude Settings**
1. Go to: https://claude.ai/customize/connectors?auth_start=github
2. Follow the reconnection flow
3. Try pushing again

---

## 💡 Development Tips

### Keep Dev Server Running
Leave the dev server running in a terminal while you edit. It's much faster than restarting it.

### Test Responsive Design
- Press F12 in browser to open DevTools
- Click device toolbar icon (top left of DevTools)
- Test at different screen sizes
- Min breakpoint: 768px

### Branch Strategy
- You're on `claude/gracious-sagan-art5bc` branch ✅
- Make all changes here
- Test locally first
- Commit frequently with clear messages
- Push when ready for deployment

### Form Optimization
The questionnaire form is in the HTML with embedded JavaScript:
- All validation is inline
- No external dependencies
- Forms work on all devices
- Modify scripts carefully to keep functionality

---

## 📚 File Reference

| File | Purpose |
|------|---------|
| `index.html` | Main homepage - edit here for content/design |
| `questionnaire.json` | Form data structure |
| `assets/` | All images and media |
| `case-studies/index.html` | Case studies page |
| `legal/privacy-policy.html` | Privacy policy |
| `legal/terms-conditions.html` | Terms of service |
| `CLAUDE.md` | Detailed dev documentation |
| `README.md` | Quick reference guide |

---

## ⚡ Quick Commands

```bash
# Start dev server
python3 -m http.server 8000

# Check what's changed
git status

# See recent changes
git log --oneline -5

# Commit changes
git add .
git commit -m "description"

# Push to branch
git push -u origin claude/gracious-sagan-art5bc

# View current branch
git branch

# Switch to main (if needed)
git checkout main
```

---

## 🎯 Next Actions

1. **Start the dev server** → `python3 -m http.server 8000`
2. **Open in browser** → http://localhost:8000
3. **Make your first edit** → Change title, add section, etc.
4. **Refresh and preview** → See changes instantly
5. **Commit when happy** → `git commit -m "your message"`
6. **Fix GitHub access** → Install Claude App or reconnect
7. **Push changes** → `git push -u origin claude/gracious-sagan-art5bc`

---

## ✅ You're All Set!

Your development environment is ready. You can now:
- ✅ Edit content locally
- ✅ Preview changes instantly
- ✅ Commit changes to git
- ✅ Push to GitHub (once access is fixed)
- ✅ Deploy to live domain

**Happy editing!** 🎉

For detailed documentation, see CLAUDE.md or README.md
