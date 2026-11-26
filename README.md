# vidatu.com source (Astro)

The full content site. `main` holds the built site that GitHub Pages serves; this branch holds the source.

- Content lives in `src/data/site.js` (shows and reports). Pages are in `src/pages`, the shared layout and all CSS in `src/layouts/Base.astro`.
- Build: `npm install && npx astro build`. The output in `dist/` is copied to `preview/` on `main` while the site is under review (`BASE=/preview`). At launch build with `BASE=/` and publish `dist/` as the site root.
- Plan: see "Vidatu website plan" in the Claude project "Viral video".
