# Current build and review procedure

## Current implementation: official Miss Bunny correction — 2026-10-22

The Bunny character in the supplied blueprint was not the official product IP. All active Bunny visuals now use the current purple-costume Miss Bunny assets from `bunny.saga1001.com`: the PWA icon for circular entrances and official landscape art for the feature, detail hero and gallery. Asset URLs and hashes are recorded in [the asset audit](../docs/bunny-brand-audit-2026-10-22/assets.md). Existing product screenshots remain labelled as website previews.

The homepage feature and detail gallery previously retained their HTML image heights instead of resizing with their widths. Explicit `height:auto`, landscape ratios and complete-image fitting fix the oversized image blocks. The Bunny detail now uses normal document flow, with text below the image. The feature-to-products gap is 64px on desktop and 40px on mobile. The eight world themes and six featured product cards remain distinct.

Brand copy, Chinese/English product introductions, the “兔小姐 / Miss Bunny” search terms, realm page titles and Bunny section-navigation state were corrected together. Active CSS no longer falls back to the unrelated white-rabbit image. Asset versions were bumped to avoid retaining the old visual bundle.

The current sharing preview is `assets/saga1001-worldhall-v2-preview-20261022.jpg`, a 1348×926 JPEG captured from the actual managed-browser page. Open Graph and Twitter metadata point to this versioned file; historical previews remain only as history. The complete audit and validation record is in [the 2026-10-22 review](../docs/bunny-brand-audit-2026-10-22/README.md).

## Historical implementation: World Hall V2 — 2026-10-21

This revision follows the user's supplied World Hall blueprint. The original `assets/world-hall-hero.jpg` now fills the panoramic hero, with overlaid navigation, the two-line “A Kinder World / A Brighter You” heading, two primary actions and eight circular world entrances. Mobile shows four quick entrances, a link to all eight worlds, a Daily Inspiration card and the five-item bottom navigation. The six existing product identities and destinations remain available below the world directory.

The eight themes are Portal, Bunny, Buddhism, Bible, Tarot, Astrology, Healing and Garden. New `#/realm/*` routes connect them to existing experiences; Astrology opens the verified `https://astro.saga1001.com/` destination. The old Discovery redirect for `#/worlds` was removed. Chat, Bunny, Community, Me and Search now use the matching interface. Chat retains clearly labelled scripted preview responses. Community provides content and project-update browsing while interaction features are being prepared; Me provides exploration links while a shared account remains in preparation.

### Validation for this revision

- Static SEO checks passed for 28 pages, 392 metadata assertions, 14 language pairs and 28 sitemap URLs. Existing ASO draft-field checks also passed. The generated homepage hero matches the runtime source after the same link conversion.
- A read-only VM check rendered 15 routes without errors, missing image assets or missing section anchors: home, Worlds, eight realms, Me, Search, Chat, Community and Library.
- Three mobile issues were corrected: Search was added to the menu; bottom-navigation links explicitly use a centered vertical layout through 767px; companion-page mobile styling was extended to 767px with explicit header alignment and bottom-navigation clearance.
- Browser checks covered widths of 360, 390, 720 and 768px. Searching for “Bunny” returned one world and one product; a Chat starter button produced its scripted reply; selecting Community “Latest” changed the displayed content. These are the checks for this revision; the larger historical matrix below belongs to the earlier source.

The sharing preview for that revision was `assets/saga1001-worldhall-v2-preview-20261021.jpg`, captured at 1200×800 from the actual rendered page in the managed browser preview. It retains the previous, incorrect Bunny entrance and must not be reused for current sharing metadata. The earlier `assets/saga1001-search-preview-20261021.jpg` is also historical artwork.

## Historical homepage hero refresh — earlier on 2026-10-21

The earlier hero combined the cream/aurora interface with the repository's existing world-hall scene, a real Bunny product screenshot and six existing product destinations. It reconciled two historical design directions. The user's subsequent blueprint instruction is implemented in the current revision above. The earlier [comparison and validation record](../docs/hero-review-2026-10-21/README.md) is retained as history.

The sharing preview recorded for that earlier pass is `assets/saga1001-search-preview-20261021.jpg`, captured from its actual 1200×630 homepage. The original scene remains `assets/world-hall-hero.jpg`. Run the existing build and test commands below when regenerating pages and the preview. The 2026-10-21 checks are separate from the older, broader 2026-10-14 validation below.

## Existing generation workflow

Use the following sequence (this supersedes the earlier abbreviated README commands):

```sh
npm run build:discovery
npm install --no-save --package-lock=false --no-audit --no-fund playwright@1.64.0
npx playwright install chromium
node discovery/render-preview.mjs
npm run test:discovery
```

A system CJK font is needed for the Chinese homepage social preview. The branch workflow installs it on its ephemeral runner. No font files are distributed. The generated 1200×800 JPEG is a screenshot of the actual homepage. Existing original artwork is not deleted.

The root and27 companion pages contain ordinary visible HTML for all visitors, including browsers with scripting disabled. The search-ready pages are not served selectively by user agent. Product pages have their own intent, official product destination, context and questions, not a copied keyword block.

The initial generation workflow failed its minimum-content smoke check on the Chinese collaboration page. Meaningful proposal and decision-process guidance was added, not a weakened threshold. PR filtering was retained as progressive enhancement: all records visible without JavaScript; filtering controls appear when the script is available. Explicit hidden styles prevent flex CSS from defeating the filtered state.

Local independent checks on generated source d1d13f6a9ccee1b91fb18908c7bfc2294b11863a passed224/224 layout cases (28 actual pages ×4 widths ×JavaScript on/off),52/52 flows, and no unhandled page errors. Metadata tests passed for all28 URLs and both language counterparts. These checks do not prove indexing or AI citation. Later social-image changes require source comparison and metadata/image retesting before merge.

ASO drafts are stored separately in aso-drafts.json. Four product/locale drafts passed name/subtitle/keyword/Play-short length limits, conservatively checking Apple keyword UTF-8 bytes as well as characters. No App Store Connect or Play Console metadata was submitted. Actual binary features, product IDs, privacy/support URLs and store permissions remain release gates.

Before main merge: check public source for private data, compare approved appearance, verify all generated files, preserve original app.js/press.mjs/style.css/press.css/assets/CNAME, inspect current main head and reject concurrent conflicts. The workflow writes generated files only to the review branch. After a user-authorized merge, the existing Pages deployment must succeed and its actual custom-domain HTML/assets must match the reviewed source.

After live verification, submit the published canonical URL list through IndexNow with the hosted indexnow-key.txt. A200/202 response is submission acceptance/validation status, not indexing. Google Search Console verification/URL inspection and actual AI visibility reporting require the appropriate connected property. Do not misuse Google's restricted Indexing API for generic product pages.
