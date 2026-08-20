# firmesa.mx

Website for **Firmesa** — central de medios y partner estratégico, founded 19 July 1972.
Built from the brand presentation `present página web.pdf` (34 slides, Adobe Illustrator).

Astro + Tailwind, fully static.

**Language convention:** the code is English — identifiers, comments, commit messages, this file.
Everything a visitor or a Firmesa staff member reads is Spanish — page copy, `alt` text,
`aria-label`s, form field names (they label the submissions staff receive), and the page
filenames, since those are the public URLs (`/quienes-somos/`, `/medios-masivos/`).

## Commands

| Command           | Action                                       |
| :---------------- | :------------------------------------------- |
| `npm install`     | Install dependencies                          |
| `npm run dev`     | Dev server at `localhost:4321`                |
| `npm run build`   | Build the site to `./dist/`                   |
| `npm run preview` | Preview the production build                  |
| `npx astro check` | Type-check and diagnose the Astro files       |

## Structure

```
src/
├── components/   Header, Footer, Loops (the brand's interlocking-curve motif)
├── data/site.ts  Contact details, nav, and every content list on the site
├── layouts/Base.astro  HTML shell, SEO, Open Graph, JSON-LD
├── pages/        index, quienes-somos, firmesa-digital, medios-masivos,
│                 contacto, 404, robots.txt
└── styles/global.css   Brand tokens, .wrapper, .pill, .band, .statement
public/img/       Logo and the 40 photographs lifted from the presentation
```

## Brand

- **Crimson** sampled from the logotype: `#901830`, gradient `#5e0d1e → #a11838`
  (`--color-brand-*`, and the `.band` gradient).
- **Logo** extracted from page 1 of the PDF, which holds it as vector art.
  `logo-firmesa.png` (colour), `logo-firmesa-blanco.png` (white, for dark sections),
  `marca.png` (the mark alone, used as favicon).
- **Type:** the deck uses **Avenir** (Light→Black) plus Archivo SemiBold. Avenir is a licensed
  Linotype family and is not on Google Fonts, so the site ships **Nunito Sans**, the closest free
  equivalent. Licensing real Avenir and swapping `--font-sans` is a drop-in change.
- **Photography** comes from the PDF's embedded JPEGs at native resolution, resized to 1600 px
  and re-encoded at quality 82.

## Editing the content

Everything lives in `src/data/site.ts`: contact details, nav, `worlds`, `territory`, `traits`,
`model360`, `digitalServices`, `digitalBestSellers`, `process`, `massBestSellers`, `services`,
and `sectors`. The pages only lay these out.

Years in business are computed from `FOUNDED = 1972`: `years()` gives the exact figure and
`decades()` rounds down to the decade, which is what the deck's approved copy uses
("más de 50 años").

## Contact form

The site is static, so there is no backend. While `site.formEndpoint` is empty, submitting opens
the visitor's mail client with the message pre-filled. Set `formEndpoint` to a Formspree, Netlify
Forms, or Web3Forms URL and the form will `POST` there instead.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes to GitHub
Pages at https://yayodelariva.github.io/firmesaweb/.

`site` and `base` come from `SITE_URL` and `BASE_PATH`, defaulting to the GitHub Pages values.
To serve from the real domain:

```sh
SITE_URL=https://firmesa.mx BASE_PATH=/ npm run build
```

DNS also has to move: `A` records for the apex to `185.199.108–111.153`, a `CNAME` for `www` to
`yayodelariva.github.io`, and the custom domain set under Settings → Pages. That switch takes the
current WordPress.com site offline.

## Open items

See `NOTES.md`.
