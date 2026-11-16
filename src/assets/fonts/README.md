# Fonts

Self-hosted WOFF2 files, latin subset, downloaded from the Fontsource CDN
(`cdn.jsdelivr.net/fontsource/fonts/…`) on 2026-11-16. All are licensed under the
SIL Open Font License 1.1 (https://openfontlicense.org), which permits bundling
and redistribution with the site.

| File | Family | Version | Copyright |
|---|---|---|---|
| `fraunces-latin-wght.woff2` | Fraunces (variable, wght 100–900) | Fontsource v38 | The Fraunces Project Authors |
| `inter-latin-wght.woff2` | Inter (variable, wght 100–900) | Fontsource v20 | The Inter Project Authors |
| `ibm-plex-sans-latin-wght.woff2` | IBM Plex Sans (variable, wght 100–700) | Fontsource v23 | IBM Corp. |
| `ibm-plex-mono-latin-400.woff2`, `…-500.woff2` | IBM Plex Mono | Fontsource v20 | IBM Corp. |

Direction A uses Fraunces + Inter. Direction B uses IBM Plex Sans + IBM Plex Mono.
Delete the files of the direction that is not chosen.

## Direction C (added 2026-11-16)

| File | Family | Version | Copyright |
|---|---|---|---|
| `bricolage-grotesque-latin-wght.woff2` | Bricolage Grotesque (variable, wght 200–800) | Fontsource 5.3.0 | The Bricolage Grotesque Project Authors |
| `figtree-latin-wght.woff2` | Figtree (variable, wght 300–900) | Fontsource 5.3.0 | The Figtree Project Authors |

Both SIL Open Font License 1.1. Direction C uses Bricolage Grotesque for display
type and Figtree for body text. To swap a font: add the WOFF2 here, add its
`@font-face` in `src/styles/global.css`, and change `--ff-display` or `--ff-body`
in the Direction C block of `src/styles/tokens.css` (one line each).
