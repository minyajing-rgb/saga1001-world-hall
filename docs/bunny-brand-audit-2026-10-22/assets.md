# Official Miss Bunny asset audit

Verified: 2026-10-22. Source website: https://bunny.saga1001.com/

These deployment assets use the existing official Miss Bunny character: a white-haired female character with rabbit ears, purple clothing and crystal motifs. They replace the unrelated generic white-rabbit artwork.

## Processing

The app icon is an unchanged byte-for-byte PNG copy of the current official PWA manifest icon. The three landscape PNG images were encoded as WebP at quality 90, retaining their original dimensions and composition. No image was generated, redrawn, cropped, resized, recolored or composited. WebP compression is lossy; the original source SHA-256 is retained below.

## Deployment files

| File | Format | Dimensions | Bytes | Source bytes | Use |
| --- | --- | --- | ---: | ---: | --- |
| `assets/bunny-official-icon.png` | PNG | 512 × 512 | 662,764 | 662,764 | Bunny portal / app icon |
| `assets/bunny-official-hero.webp` | WEBP | 1672 × 941 | 495,638 | 2,961,388 | Bunny feature / product hero |
| `assets/bunny-official-reading.webp` | WEBP | 1672 × 941 | 348,174 | 2,602,885 | QuickReading supporting artwork |
| `assets/bunny-official-daily.webp` | WEBP | 1672 × 941 | 344,824 | 2,610,253 | DailySign supporting artwork |

## Source provenance

### assets/bunny-official-icon.png

- Official URL: https://media.base44.com/images/public/69a38a72a73a054fb1239165/5b7fb560c_ChatGPT202610916_03_15-1.png/v1/fit/w_512,h_512/5b7fb560c_ChatGPT202610916_03_15-1.png
- Evidence: Official /manifest.json icons entry, sizes=512x512.
- Original SHA-256: `1f7932b1548d4c7d4e27784652c7d3d7bb2874036b253edb00db587e37818845`
- Deployment SHA-256: `1f7932b1548d4c7d4e27784652c7d3d7bb2874036b253edb00db587e37818845`
- Processing: Copy original PNG bytes unchanged.

### assets/bunny-official-hero.webp

- Official URL: https://media.base44.com/images/public/69a38a72a73a054fb1239165/d8712aabd_01e32e79-d2ed-4c4b-ae50-128b292da01c.png
- Evidence: Official rendered homepage image and app-bundle cinema-hero-art src.
- Original SHA-256: `28e8e99be3dda93aa2b3da9a7cdca68d7f024b489fc0db51ac1296b6a3bfca44`
- Deployment SHA-256: `6e392d235cff17483134ce563ebf1e44a32d6722a28417f3409fa2d274ec68d1`
- Processing: WebP quality 90, original dimensions.

### assets/bunny-official-reading.webp

- Official URL: https://media.base44.com/images/public/69a38a72a73a054fb1239165/7b080428c_072b125e-f52d-41c6-a5ae-fba8537ca9c5.png
- Evidence: Official app-bundle r5 entry path=/QuickReading.
- Original SHA-256: `c6d5e35b2b9204ed27f5f5182da04d081bfe9f2771257dc7a38302e2d36473a9`
- Deployment SHA-256: `72588e78283c3a35b3682423df600e66097733c770497ca6fe4d57285d7085a2`
- Processing: WebP quality 90, original dimensions.

### assets/bunny-official-daily.webp

- Official URL: https://media.base44.com/images/public/69a38a72a73a054fb1239165/bc9034f00_7c37dc1b-11a8-4616-9a93-0af17d686c97_.png
- Evidence: Official app-bundle r5 entry path=/DailySign and cinema-stage-art.
- Original SHA-256: `3aa50fd40c854ef942b39472f2f69a211b87d273fbff5a9f3e62c9bf86efe80b`
- Deployment SHA-256: `955cbc6df88831129a726f7258f63a8aaeb7bbc4c5c99148b6094c80a422c20f`
- Processing: WebP quality 90, original dimensions.

## Icon revision

The current PWA manifest icon uses the purple costume that matches the live homepage artwork. The official HTML favicon/OG metadata also retains an older pink-costume logo; that legacy image is not used by this deployment asset set.
