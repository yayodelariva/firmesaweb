# firmesa.mx

Website for **Firmesa** — *Funcionamiento Íntegro de Radiodifusoras Mexicanas Enlazadas, S.A.*,
a radio station representation firm founded on 19 July 1972.

Built with [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com).
Fully static output: deployable to Vercel, Netlify, Cloudflare Pages, GitHub Pages, or any
plain file host.

**Language convention:** the code is English — identifiers, comments, commit messages, this file.
Everything a visitor or a Firmesa staff member reads is Spanish — page copy, `alt` text,
`aria-label`s, form field names (they label the submissions staff receive), and the page
filenames, since those are the public URLs (`/estaciones/`, `/servicios/`).

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
├── components/   Header, Footer, PageHeader
├── data/
│   ├── site.ts         Contact details, nav, and the service catalogue
│   └── stations.json   Station directory (state → city → station)
├── layouts/Base.astro  HTML shell, SEO, Open Graph, and JSON-LD
├── pages/        index, nosotros, servicios, estaciones, contacto, 404, robots.txt
└── styles/global.css   Brand tokens and base styles
public/img/       Logo and photography
```

## Editing the content

- **Phones, emails, social links, coverage map:** `src/data/site.ts`.
- **Services:** the `services` array in `src/data/site.ts`. Each `slug` becomes the anchor
  `/servicios/#slug`.
- **Stations:** `src/data/stations.json`. Every station needs `name`, `frequency`, `callSign`,
  `stream`, and `programming`. The homepage figures (stations, cities, states) are derived from
  this file, so adding a station updates them automatically.
- **Years in business:** computed by `years()` from `FOUNDED = 1972` — nothing to bump annually.

## Contact form

The site is static, so there is no backend. While `site.formEndpoint` is empty, submitting opens
the visitor's mail client with the message pre-filled. To collect submissions by email or in a
dashboard instead, set `formEndpoint` to a Formspree, Netlify Forms, or Web3Forms URL — the form
will `POST` there automatically.

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds and publishes to GitHub
Pages at https://yayodelariva.github.io/firmesaweb/.

`site` and `base` come from the `SITE_URL` and `BASE_PATH` environment variables, defaulting to
the GitHub Pages values. To serve from the real domain, build with:

```sh
SITE_URL=https://firmesa.mx BASE_PATH=/ npm run build
```

DNS also has to move: `A` records for the apex to `185.199.108–111.153`, a `CNAME` for `www` to
`yayodelariva.github.io`, and the custom domain set under Settings → Pages. That switch takes the
current WordPress.com site offline.

## Open items

- Rate cards (Radio and Autobuses) as downloadable PDFs.
- Client logos for the "Algunos de nuestros clientes" section.
- Office address, if it should appear on the contact page.
- A form endpoint, to replace the mail-client fallback.
