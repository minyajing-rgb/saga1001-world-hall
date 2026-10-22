# SAGA1001 — Bunny brand and page audit

Reviewed on 2026-10-22 following the user's correction of the generic white rabbit.

## Findings and changes

| Area | Finding | Correction |
| --- | --- | --- |
| Brand identity | The blueprint's generic white rabbit was incorrectly used as the Bunny product character. | Use the official Miss Bunny PWA icon and the official purple-costume character scenes. Exact source URLs and hashes are in [assets.md](assets.md). |
| World entrances | White-rabbit artwork was magnified to 235% and shifted inside circles. | Use the official square icon at 100%, shared by home, Worlds and search. |
| Homepage feature | `height="887"` was not overridden; the source art also contained a large white fade. | Replace the art, set automatic height and a 16:9 frame, and show the complete official scene. |
| Page rhythm | The feature's height and subsequent section spacing left a large empty transition. | The visible feature-to-products gap is 64px on desktop and 40px on mobile. |
| Bunny detail | Text and a white gradient covered the character; the gallery used fixed intrinsic heights and portrait crops. | Put text below the 16:9 hero; use two landscape gallery columns on desktop and one on mobile. |
| Naming | “Companion” and generic Bunny copy obscured the actual Crystal Oracle identity. | Identify the character as 兔小姐 / Miss Bunny and the product as Bunny Crystal Oracle. Update Chinese/English product data and search. |
| Navigation | Realm titles exposed `Realm/bunny`; the About tab stayed selected after another section was chosen. | Use product/world names for titles and synchronize section selection on navigation. |
| Content types | Official scene art and real product interfaces could be confused. | Mark gallery art as official scene artwork. Keep actual product screenshots as website previews. |
| Sharing and cache | The existing social screenshot retained the generic white rabbit. | Capture a new actual-page screenshot and update OG/Twitter URLs and CSS/JS asset versions. |

## Structure and scope

The homepage remains: panoramic world hall → project update → eight world themes → Miss Bunny feature → six featured product cards → closing invitation → product/source guide → footer.

World themes are discovery routes, not a one-to-one count of products. Portal points to PLOT and DreamPlot; Bunny points to Bunny Crystal Oracle; Buddhism to Dharma Atlas; Bible to From John to Jesus; Tarot explains the distinction between original oracle cards and traditional tarot; Astrology links to its independent site; Healing links to Earth Healing and the breathing app; Garden links to nature content in Earth Healing. The product section is now explicitly described as a featured selection.

Chat still identifies its scripted preview, and Community/Me retain their stated preparation status. This visual correction does not claim new AI, account or community backends. The original multi-panel blueprint has not been redrawn; its generic rabbit is superseded by the official brand sources and the corrected rendered website.

## Verification

- `npm run build:discovery`: regenerated 28 static pages in two languages.
- `npm run test:discovery`: 392 metadata assertions, 14 language pairs, 28 sitemap URLs and local image/file resolution passed. Existing ASO draft checks also passed; no store listing was edited.
- `node --check` and `git diff --check` passed.
- Managed browser checks covered 360, 390, 720 and 1440px harness widths, plus the direct desktop viewport. No horizontal overflow was found in the checked home and Bunny views.
- The 1440px harness rendered the homepage Bunny art at approximately 610×343px. The 390px harness rendered it at 335×188px. Both use 16:9; neither retains the previous 887px height.
- Search for “兔小姐” returned one world and one product. The Bunny destination title is “Bunny Crystal Oracle · 兔小姐 · SAGA1001”. Gallery navigation selects the correct section.
- The new sharing file is `assets/saga1001-worldhall-v2-preview-20261022.jpg`, captured as a 1348×926 JPEG from the rendered page.

These checks validate the corrected brand assets, layout and existing navigation. They are not a claim that every planned feature in the original product blueprint has been implemented.
