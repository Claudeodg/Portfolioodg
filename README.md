# Claude Sonafouo — Portfolio

Personal portfolio site, built as a single-page bilingual (DE/EN) site with a dark/light theme, animated starfield background, and scroll-triggered animations.

Live sections: intro, skills, projects, education, and contact — with a downloadable CV.

## Features

-  German / English toggle, auto-detected from the browser locale and remembered across visits
- Dark / light mode toggle (persisted, no flash on load)
-  Canvas starfield background with twinkling stars and occasional shooting stars
- Scroll-triggered entrance animations ([GSAP](https://gsap.com/) + ScrollTrigger)
- One-click CV download
- Project cards linking straight to their GitHub repos

## Tech stack

- [Vite](https://vite.dev/) + TypeScript (no framework — plain DOM rendering)
- Vanilla CSS with custom properties for theming
- [GSAP](https://gsap.com/) for animation

## Getting started

```bash
npm install
npm run dev       # start the dev server
npm run build     # type-check and build for production
npm run preview   # preview the production build locally
```

## Project structure

```
public/
  icons.svg        # SVG sprite (social/contact icons)
  favicon.svg
  CV_*.pdf          # downloadable CV
src/
  main.ts           # renders the page and wires up interactions
  i18n.ts            # DE/EN copy and content data (skills, projects, etc.)
  theme.ts           # dark/light theme persistence
  starfield.ts        # canvas starfield background
  style.css
index.html
```

## Content

Site copy, skills, and project details live in [`src/i18n.ts`](src/i18n.ts) — update that file to change what's shown on the page.

## Contact

- Email: sonafouobonte@gmail.com
- GitHub: [github.com/Claudeodg](https://github.com/Claudeodg)
- LinkedIn: [linkedin.com/in/claudeodg](https://linkedin.com/in/claudeodg)
