# UpForge Consulting Website

Modern, responsive website for UpForge Consulting built with static HTML.

## 🚀 Quick Start

### 1. Start Development Server
```bash
python3 -m http.server 8000
# or use the helper script:
./dev-server.sh
```

### 2. Open in Browser
Visit: **http://localhost:8000**

### 3. Edit & Refresh
- Edit any `.html` file
- Refresh browser (Cmd+R / Ctrl+R) to see changes
- No build step needed!

## 📝 Making Changes

### Edit Content
1. Open `index.html` in your text editor
2. Find the section you want to edit
3. Make your changes
4. Save the file
5. Refresh browser to preview

### Edit Styles (CSS)
All CSS is in the `<style>` tag in `index.html`:
- Colors: Update `:root` CSS variables
- Fonts: Modify `font-family` in relevant selectors
- Spacing: Adjust `padding`, `margin` values
- Layout: Modify `grid`, `flexbox` properties

### Add Images
1. Place image in `assets/` folder
2. Reference in HTML: `<img src="assets/image-name.jpg" alt="description">`

### Add New Sections
1. Copy an existing section structure
2. Paste and modify the content
3. Adjust CSS classes as needed

## 💾 Saving Your Work

### Commit Changes
```bash
git add .
git commit -m "Description of changes"
```

### Push to Repository
```bash
git push -u origin claude/gracious-sagan-art5bc
```

### View Recent Changes
```bash
git log --oneline -10
```

## 📱 Responsive Testing

Test your changes at different screen sizes:
- **Desktop**: 1200px and up
- **Tablet**: 768px - 1199px  
- **Mobile**: Below 768px

Use browser dev tools (F12) to test responsive design.

## 🎨 Design System

### Colors
- **Primary Blue**: `#3462fc`
- **Dark Background**: `#092d53`
- **White Text**: `#ffffff`

Edit these in the `:root` section of the CSS.

### Typography
- **Headings**: Bebas Neue, Anton
- **Body**: Plus Jakarta Sans (weights: 300, 400, 600, 700, 800)

### Spacing Scale
Use consistent spacing: 8px, 16px, 24px, 32px, 48px units

## 🔧 Project Files

- **index.html** - Main homepage
- **loading-screen-v2.html** - Loading screen
- **questionnaire.json** - Form data
- **assets/** - Images and media
- **case-studies/** - Case study pages
- **partners/** - Partner pages
- **legal/** - Privacy and terms pages

## 📋 Form Optimization Notes

When editing forms:
- Keep form validation inline (don't break submissions)
- Test on mobile devices (768px and below)
- Ensure all input fields are accessible
- Add focus states for keyboard navigation

## 🚀 Deployment

This repository is connected to your live domain.

**To deploy changes:**
1. Make and test changes locally
2. Commit changes
3. Push to `claude/gracious-sagan-art5bc` branch
4. Create PR or merge to main branch
5. Changes go live automatically ✨

## 📚 More Info

See **CLAUDE.md** for detailed development documentation.

## ⚡ Tips

- Keep dev server running while editing
- Use browser DevTools to inspect elements (F12)
- Test forms before committing
- Keep asset file sizes optimized
- Commit frequently with clear messages

---

**Happy editing! 🎉**
