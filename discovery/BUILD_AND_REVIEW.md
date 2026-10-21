# Current build and review procedure

## Homepage hero refresh — 2026-10-21

The current hero combines the cream/aurora interface with the repository's existing world-hall scene, a real Bunny product screenshot and six existing product destinations. It is a new reconciliation of two historical design directions, not a claim that the original concept board was the final approved interface. See [the comparison and validation record](../docs/hero-review-2026-10-21/README.md).

The current social preview is `assets/saga1001-search-preview-20261021.jpg`, captured from the actual 1200×630 homepage. The original scene remains `assets/world-hall-hero.jpg`; it is used inside the interface, not as the standalone share image. Run the existing build and test commands below; regenerate the preview after visible hero changes. The 2026-10-21 checks are recorded separately from the older, broader 2026-10-14 validation below.

## Existing generation workflow

Use the following sequence (this supersedes the earlier abbreviated README commands):

```sh
npm run build:discovery
npm install --no-save --package-lock=false --no-audit --no-fund playwright@1.64.0
npx playwright install chromium
node discovery/render-preview.mjs
npm run test:discovery
```

A system CJK font is needed for the Chinese homepage social preview. The branch workflow installs it on its ephemeral runner. No font files are distributed. The generated 1200×630 JPEG is a screenshot of the actual homepage. Existing original artwork is not deleted.

The root and27 companion pages contain ordinary visible HTML for all visitors, including browsers with scripting disabled. The search-ready pages are not served selectively by user agent. Product pages have their own intent, official product destination, context and questions, not a copied keyword block.

The initial generation workflow failed its minimum-content smoke check on the Chinese collaboration page. Meaningful proposal and decision-process guidance was added, not a weakened threshold. PR filtering was retained as progressive enhancement: all records visible without JavaScript; filtering controls appear when the script is available. Explicit hidden styles prevent flex CSS from defeating the filtered state.

Local independent checks on generated source d1d13f6a9ccee1b91fb18908c7bfc2294b11863a passed224/224 layout cases (28 actual pages ×4 widths ×JavaScript on/off),52/52 flows, and no unhandled page errors. Metadata tests passed for all28 URLs and both language counterparts. These checks do not prove indexing or AI citation. Later social-image changes require source comparison and metadata/image retesting before merge.

ASO drafts are stored separately in aso-drafts.json. Four product/locale drafts passed name/subtitle/keyword/Play-short length limits, conservatively checking Apple keyword UTF-8 bytes as well as characters. No App Store Connect or Play Console metadata was submitted. Actual binary features, product IDs, privacy/support URLs and store permissions remain release gates.

Before main merge: check public source for private data, compare approved appearance, verify all generated files, preserve original app.js/press.mjs/style.css/press.css/assets/CNAME, inspect current main head and reject concurrent conflicts. The workflow writes generated files only to the review branch. After a user-authorized merge, the existing Pages deployment must succeed and its actual custom-domain HTML/assets must match the reviewed source.

After live verification, submit the published canonical URL list through IndexNow with the hosted indexnow-key.txt. A200/202 response is submission acceptance/validation status, not indexing. Google Search Console verification/URL inspection and actual AI visibility reporting require the appropriate connected property. Do not misuse Google's restricted Indexing API for generic product pages.
