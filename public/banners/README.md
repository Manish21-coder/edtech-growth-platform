# Banners — one folder per section

Swappable campaign creatives, grouped by the homepage section that uses them.
To change a banner: replace the file, keep the same name. To add a slide: add
the file here and a row in the matching array in
`src/modules/homepage/content.ts`.

> A later admin/CMS block (roadmap stage 5) takes this over — these folders map
> 1:1 to what will become the admin "Banners" config per surface.

| Folder   | Section                                   | Array in `content.ts` |
| -------- | ----------------------------------------- | --------------------- |
| `hero/`  | Hero carousel                             | `HERO_BANNERS`        |
| `intro/` | "Learn · Prepare · Achieve" side carousel | `INTRO_BANNERS`       |
| `popup/` | Promotional pop-up                        | `PROMO_POPUP`         |

## `hero/` — 8 slides, desktop + mobile crop each

Hero container is **8:3 on desktop**, **16:10 on mobile** (`<picture>` picks the
right one). Missing file → branded gradient fallback for that slide.

| Desktop (8:3, ~2400×900) | Mobile (16:10, ~1200×750)     | Slide / click-through (`studio.parikshe.in/details?nid=`) |
| ------------------------ | ----------------------------- | --------------------------------------------------------- |
| `aarambha-kcet.png`      | `aarambha-kcet-mobile.png`    | 1st PUC Aarambha KCET · `3626753`                         |
| `aarambha-neet.png`      | `aarambha-neet-mobile.png`    | 1st PUC Aarambha NEET · `3626939`                         |
| `nischaya-2-tires.png`   | `nischaya-2-tires-mobile.png` | CA Foundation Nischaya · `4131156`                        |
| `prathama-plus.png`      | `prathama-plus-mobile.png`    | Prathama Core Plus (SSLC) · `3397261`                     |
| `prathama.png`           | `prathama-mobile.png`         | Prathama Core (SSLC) · `3396397`                          |
| `sadhaka.png`            | `sadhaka-mobile.png`          | Sadhaka Pro — 2nd PUC Commerce · `3585596`                |
| `sankalpa-core.png`      | `sankalpa-core-mobile.png`    | Sankalpa Core — 1st PUC Commerce · `4571049`              |
| `vijeta.png`             | `vijeta-mobile.png`           | Vijeta 360 — KCET · `4316473`                             |

## `intro/` — 4 slides (16:10, ~1200×750)

`slide-1.png` … `slide-4.png`, click-throughs set in `INTRO_BANNERS`. These are
starter copies of hero crops — replace with intro-specific creatives.

## `popup/` — 1 image

`sslc-power-guides.png` — landscape (~16:9). Shown alone; the whole image is the
click target → `studio.parikshe.in/details?nid=4785371`.

Keep every file optimised (< ~400 KB) for Core Web Vitals (HP-502).
