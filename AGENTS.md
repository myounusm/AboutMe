# AGENTS.md

## Cursor Cloud specific instructions

This repo is a single static **Vite** site (Mohammed Younus Mohiuddin's CV/portfolio). It is a client-rendered SPA: `index.html` mounts an empty `#app` div and `src/main.js` renders all content from `src/content.js`. Editing site copy/data means editing `src/content.js`.

### Services & commands
There is one service (the Vite frontend). Standard commands are in `package.json` and `README.md`:
- Dev server: `npm run dev` (Vite, serves on `http://localhost:5173/`).
- Build: `npm run build` (output to `dist/`).
- Preview built output: `npm run preview`.

There are **no lint or test scripts** defined in this project (`package.json` only has `dev`, `build`, `preview`). Do not assume `npm run lint`/`npm test` exist.

### Gotchas
- Requires Node 20.19+ or 22.12+ (Vite 8). The VM's default Node (v22.x) satisfies this.
- Because it is client-rendered, `curl http://localhost:5173/` returns an `#app` div with no content — the DOM is populated by JS. Verify rendering in a real browser, not with curl.
