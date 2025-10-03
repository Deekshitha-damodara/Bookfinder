# Book Finder — Notes & Project Flow

This file explains the project flow, component responsibilities, data flow, how to run/build the project, and common troubleshooting tips.

## Overview
Book Finder is a small React application that uses the Open Library Search API to fetch books by title and display basic details (cover, title, authors, first published year).

Tech stack
- React
- Webpack (dev server + bundling)
- Babel (JSX)
- Tailwind CSS (via PostCSS)

## File structure
- `public/index.html` — HTML template used by HtmlWebpackPlugin.
- `src/index.js` — React entry point, imports `index.css` (tailwind) and renders `App`.
- `src/index.css` — Tailwind directives (base/components/utilities).
- `src/App.js` — Main App component with search UI and fetch logic.
- `webpack.config.js` — Build and dev server config.
- `postcss.config.js` & `tailwind.config.js` — Tailwind/PostCSS setup.
- `.babelrc` — Babel presets.

## Project flow (high level)
1. User opens the app (served by webpack-dev-server at `http://localhost:3000/`).
2. `public/index.html` is used as the HTML template. Webpack injects the compiled `bundle.js` into the page.
3. `src/index.js` bootstraps React and imports `index.css`. Importing the CSS triggers the CSS loaders and injects styles into the page.
4. `App` renders the search input and button.
5. When the user submits a search:
   - `handleSearch` builds the request URL: `https://openlibrary.org/search.json?title={query}`
   - Fetches the JSON response.
   - Takes `data.docs` (array), slices first 20 items, and stores in local state via `setBooks`.
6. `App` maps over `books` and renders a card for each book with cover (if `cover_i`), title, authors, and first publish year.

## Component responsibilities
- `index.js`: mount point and global imports (styles).
- `App.js`: UI, state management (useState), data fetching, error handling, display logic.

## Data flow
- Input `query` (controlled input) -> `handleSearch` -> fetch -> response `data.docs` -> `setBooks` -> UI updates.

## Running locally
1. Install dependencies:
```bash
npm install
```
2. Start dev server:
```bash
npm start
```
Notes:
- If port 3000 is busy, either kill the process using it or change `devServer.port` in `webpack.config.js`.
- If CSS appears missing, ensure `public/index.html` does NOT link `src/index.css` directly (styles must be imported in `src/index.js`).

## Building for production
- Add a `build` script that runs webpack in production mode and outputs `dist/`.
- Then upload `dist/` to any static host.

## Troubleshooting
- Webpack command not found: ensure dev dependencies are installed (`webpack`, `webpack-cli`, `webpack-dev-server`).
- CSS MIME type (text/html) error: remove direct `<link>` to `src/index.css` from `index.html`.
- API returning empty results: check Network tab for the request URL and response. Try searching a common title like `harry potter`.
- CORS errors: unlikely for Open Library, but inspect console/network for details.
- Favicon 404: add `public/favicon.ico` if desired.

## Next improvements
- Pagination (load more, or server-side pagination using `page` param).
- Search by author, subject, ISBN.
- Book detail modal with richer metadata (use Open Library `works` or `books` endpoints).
- Accessibility improvements and keyboard support.

---

Created to document project flow and help future contributors pick up the code quickly.
