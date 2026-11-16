# Fonts

Self-hosted WOFF2 files, latin subset, downloaded from the Fontsource CDN
(`cdn.jsdelivr.net/fontsource/fonts/…`) on 2026-11-16. Both are licensed under
the SIL Open Font License 1.1 (https://openfontlicense.org), which permits
bundling and redistribution with the site.

| File | Family | Used for | Version | Copyright |
|---|---|---|---|---|
| `bricolage-grotesque-latin-wght.woff2` | Bricolage Grotesque (variable, wght 200–800) | Display type and headings | Fontsource 5.3.0 | The Bricolage Grotesque Project Authors |
| `figtree-latin-wght.woff2` | Figtree (variable, wght 300–900) | Body text and labels | Fontsource 5.3.0 | The Figtree Project Authors |

To swap a font: add the WOFF2 here, add its `@font-face` in
`src/styles/global.css`, change `--ff-display` or `--ff-body` in
`src/styles/tokens.css` (one line each), and update the preload in
`src/layouts/BaseLayout.astro`.
