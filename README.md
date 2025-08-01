# Project: Test Website

## A brief explanation of the code and design choices made

- Used Nunjucks templating for reusable components (`header.njk`, `hero.njk`, etc.)
- Gulp for asset processing and development workflow

### Design improvements

- Improved accessibility by making the text of inactive headings in featured-works lighter on a dark background to improve contrast.
- Increased the font-size inside featured-works elements on mobile for better readability.

### CSS Architecture

- BEM methodology for maintainable class naming
- Modular partials for component-specific styles
- Custom media query mixins for consistent breakpoints

### Animations

- GSAP Timeline for complex animation sequences
- ScrollTrigger for scroll-based animations
- Stagger effects for sequential element animations
- Implemented `requestAnimationFrame` for smooth cursor tracking

### Performance Optimizations

- Inlined critical styles in `<head>` for immediate rendering
- Async loading of non-critical CSS to prevent render blocking
- Preload fonts and critical resources for faster loading

## Project Structure

```
fr/
├── src/
│   ├── components/     # Nunjucks components (hero, integrations, featured-work, etc.)
│   ├── layouts/        # Layout (layout.njk)
│   ├── pages/          # Pages (index.njk)
│   ├── styles/         # SASS/SCSS files
│   └── scripts/        # JS files (all modules imported in main.js)
├── public/             # Compiled code (HTML, CSS, JS)
```

## Build and Run

- `npm run start` — start dev server with hot reload (http://localhost:3000)
- `npm run build` — production build to public folder

## How Components Work

- Each major block is a separate file in `src/components/` (e.g., `header.njk`, `hero.njk`, etc.)
- Main page (`src/pages/index.njk`) assembles them via `{% include %}`.
- To change the order of blocks, simply change the include order in `index.njk`.

## AI Tools Usage

- Cursor AI and Copilot (AI autocomplete) were used to speed up development.
- Cursor AI was used for quick file search, efficient error debugging, and automation of routine tasks.
- Verified with Cursor AI that CSS variables were applied everywhere necessary.
- Cursor AI identified content security policy violations (recommended proper CSP configuration).
- AI autocomplete (Cursor AI and Github Copilot) was used to speed up writing template data.
