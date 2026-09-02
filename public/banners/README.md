# Hero banner creatives

`src/modules/homepage/content.ts` → `HERO_BANNERS` references these. The hero
carousel uses the **desktop 8:3** file above `640px` and the **mobile 16:10**
file below it (`<picture>` element); the intro-section carousel uses the mobile
16:10 crop. Missing files fall back to a branded gradient (HP-020).

| Desktop (8:3, ~2400×900) | Mobile (16:10, ~1200×750)     | Banner                           | Click-through (`studio.parikshe.in/details?nid=`) |
| ------------------------ | ----------------------------- | -------------------------------- | ------------------------------------------------- |
| `aarambha-kcet.png`      | `aarambha-kcet-mobile.png`    | 1st PUC Aarambha KCET            | `3626753`                                         |
| `aarambha-neet.png`      | `aarambha-neet-mobile.png`    | 1st PUC Aarambha NEET            | `3626939`                                         |
| `nischaya-2-tires.png`   | `nischaya-2-tires-mobile.png` | CA Foundation Nischaya           | `4131156`                                         |
| `prathama-plus.png`      | `prathama-plus-mobile.png`    | Prathama Core Plus (SSLC)        | `3397261`                                         |
| `prathama.png`           | `prathama-mobile.png`         | Prathama Core (SSLC)             | `3396397`                                         |
| `sadhaka.png`            | `sadhaka-mobile.png`          | Sadhaka Pro — 2nd PUC Commerce   | `3585596`                                         |
| `sankalpa-core.png`      | `sankalpa-core-mobile.png`    | Sankalpa Core — 1st PUC Commerce | `4571049`                                         |
| `vijeta.png`             | `vijeta-mobile.png`           | Vijeta 360 — KCET                | `4316473`                                         |

Keep each file optimised (< ~400 KB ideally) for Core Web Vitals (HP-502). These
are campaign creatives, not brand assets — they move behind the admin/CMS banner
config (HP-4xx) in a later block.
