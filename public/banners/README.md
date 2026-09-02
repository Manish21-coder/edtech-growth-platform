# Banners — one folder per section

Swappable campaign creatives, grouped by the homepage section that uses them.
To change a banner: replace the file, keep the same name. To add a slide: add
the file here and a row in the matching array in
`src/modules/homepage/content.ts`.

> A later admin/CMS block (roadmap stage 5) takes this over — these folders map
> 1:1 to what will become the admin "Banners" config per surface.

| Folder                          | Section                                   | Array in `content.ts` |
| ------------------------------- | ----------------------------------------- | --------------------- |
| `hero/desktop/`, `hero/mobile/` | Hero carousel                             | `HERO_BANNERS`        |
| `intro/`                        | "Learn · Prepare · Achieve" side carousel | `INTRO_BANNERS`       |
| `popup/`                        | Promotional pop-up                        | `PROMO_POPUP`         |

## `hero/` — 8 slides, one file per slide in each of `desktop/` + `mobile/`

Desktop is **8:3** (2400×900), mobile is **16:10** (1200×750); the `<picture>`
tag picks the right one. Same filename (slug) in both folders. Missing file →
branded gradient fallback for that slide.

| Slug (`hero/desktop/<slug>.png` + `hero/mobile/<slug>.png`) | Slide · click-through (`studio.parikshe.in/details?nid=`) |
| ----------------------------------------------------------- | --------------------------------------------------------- |
| `aarambha-kcet`                                             | 1st PUC Aarambha KCET · `3626753`                         |
| `aarambha-neet`                                             | 1st PUC Aarambha NEET · `3626939`                         |
| `nischaya`                                                  | CA Foundation Nischaya · `4131156`                        |
| `prathama-core-plus`                                        | Prathama Core Plus (SSLC) · `3397261`                     |
| `prathama-core`                                             | Prathama Core (SSLC) · `3396397`                          |
| `sadhaka-pro`                                               | Sadhaka Pro — 2nd PUC Commerce · `3585596`                |
| `sankalpa-core`                                             | Sankalpa Core — 1st PUC Commerce · `4571049`              |
| `vijeta-360`                                                | Vijeta 360 — KCET · `4316473`                             |

## `intro/` — 4 slides (16:10, ~1200×750)

`slide-1.png` … `slide-4.png`, click-throughs set in `INTRO_BANNERS`.

## `popup/` — 1 image

`sslc-power-guides.png` — landscape (~16:9). Shown alone; the whole image is the
click target → `studio.parikshe.in/details?nid=4785371`.

Keep every file optimised (< ~400 KB) for Core Web Vitals (HP-502).
