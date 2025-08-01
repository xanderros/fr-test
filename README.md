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

## Структура папок

```
fr/
├── src/
│   ├── components/     # Nunjucks-компоненты (hero, integrations,featured-work, ... )
│   ├── layouts/        # Лэйаут (layout.njk)
│   ├── pages/          # Страницы (index.njk)
│   ├── styles/         # SASS/SCSS-файлы
│   └── scripts/        # JS-файлы (в main.js импортированы все модули)
├── public/             # Скомпилированный код (HTML, CSS, JS)
```

## Сборка и запуск

- `npm run start` — запуск dev-сервера с hot reload (http://localhost:3000)
- `npm run build` — production-сборка в папку public

## Как устроены компоненты

- Каждый крупный блок — отдельный файл в `src/components/` (например, `header.njk`, `hero.njk` и т.д.)
- Главная страница (`src/pages/index.njk`) собирает их через `{% include %}`.
- Чтобы поменять порядок блоков, просто поменяйте порядок include в `index.njk`.

## Использование AI-инструментов

- Для ускорения работы использовались Cursor AI и Copilot (AI autocomplete).
- Cursor AI использовался для быстрого поиска релевантных файлов, эффективного дебага ошибок, автоматизации рутинных задач.
- Проверял с помощью Cursor AI не забыл ли применить css-переменные везде, где необходимо.
- Cursor AI выявлял нарушения политики безопасности контента (рекомендовал правильную конфигурацию CSP).
- AI autocomplete (Cursor AI и Github Copilot) использовался для ускорения написания шаблонных данных.
