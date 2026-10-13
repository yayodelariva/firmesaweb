# Pending items

## Station directory — parked, not lost

The previous site published a directory of **28 radio stations across 22 cities and 10 states**,
with frequency, call sign, programming, and a live-stream link for each. It was scraped from the
old WordPress site, parsed into structured JSON, and shipped with per-state filtering and
accent-insensitive search.

The brand presentation does not include it, so it was deliberately left out of this rebuild.

**It still exists**, on the `firmesa-alt` branch:

```sh
git show firmesa-alt:src/data/stations.json     # the data
git show firmesa-alt:src/pages/estaciones.astro # the filterable page
```

To bring it back, it would sit naturally under Medios Masivos — the deck's own line is
"nuestra base es el radio". The data would need a freshness check first: it was captured in
August 2026 and stations change frequency and branding.

## Contact details

- **Phone numbers** (`55 5250 7788`, `55 5254 5937`) and the two `@firmesa.com.mx` addresses are
  carried over from the site that is live today. The presentation leaves TELÉFONO blank, so
  confirm these are the numbers the new brand should publish.
- **WhatsApp** is a labelled field in the deck but was left blank there, and no number exists in
  any earlier material. `site.whatsapp` is empty and nothing renders. Provide a number and it can
  be added to the contact page.
- **Address:** only "Polanco, CDMX" appears in the deck. A street address would improve the
  local-SEO structured data in `Base.astro`.

## Media

- The deck shows **play buttons** over several cards (Territorio, and the digital service tiles),
  implying video. No video files were provided, so those render as still images. The markup is
  ready to take `<video>` or an embed when the files exist.
- **Client logos:** the home page now names the twelve brands the credentials deck lists, as
  text. Their logos are in that deck and would be stronger, but they are third-party trademarks:
  publishing them on firmesa.mx needs each brand's permission, and some contracts forbid it
  outright. Confirm before swapping names for marks — and confirm the names themselves are
  cleared for a public page, which is a lower bar than logos but not zero.
- Six extracted images went unused and were removed to keep the repo lean: the FIRMESA outline
  band, a control room, a neon-mic frame, the bus hero, and two brand mockups (parabús and
  building). All are recoverable from the PDF with `pdfimages`.

## Typography — settled by the identity manual

**Nunito Sans is Firmesa's typeface. It is not a stand-in for one.** The *Manual de identidad
FIRMESA* names it outright — "tipografía sans serif de carácter moderno, limpio y accesible",
shown in Light, Regular, Italic, Semibold, Bold, Extra Bold and Black — which is exactly the set
`Base.astro` loads from Google Fonts.

**Avenir Next Heavy is specified for the logotype only.** The manual is explicit that the face was
chosen for the word FIRMESA itself, for "su trazo geométrico, limpio y de gran peso visual". The
logotype ships as artwork (`public/img/logo-firmesa*.png`), so the site never needs the font, and
the webfont licence this section used to treat as an open question is **not** on the critical
path. It only matters if someone wants to typeset new headings in Avenir, which the manual does
not ask for.

`src/pages/medios-masivos.astro` places the logo file where it used to render the word "FIRMESA"
in Nunito Sans at weight 900, for that reason: a Nunito "FIRMESA" is a second wordmark, and the
manual's "usos incorrectos" page rules out that kind of substitution.

**The home hero is a deliberate exception.** It keeps the outlined Nunito wordmark
(`Wordmark.astro`), which the deck uses and the manual does not sanction — a chosen departure,
not an oversight. The manual-conformant version, which places the stacked logo artwork there
instead, is on `identidad/manual-2026`; swapping back is one element. Worth re-reading the
"usos correctos e incorrectos" page with Firmesa before this ships, since it is their rule being
set aside.

### What the brand presentation used, for the record

`pdffonts present\ página\ web.pdf` reports nine embedded (subset) TrueType faces:

| Face                  | Role in the deck                                        |
| :-------------------- | :------------------------------------------------------ |
| `Avenir-Light`        | Long body copy, the lighter half of alternating lists     |
| `Avenir-Book`         | Default body weight                                       |
| `Avenir-Roman`        | Body copy, second cut                                     |
| `Avenir-Medium`       | Subheads, card captions                                   |
| `Avenir-Heavy`        | Section statements, emphasis                              |
| `Avenir-Black`        | Display lines — "LA INTEGRAMOS", "FIRMESA"                |
| `Avenir-HeavyOblique` | The italic accents on the Enfoque slides                  |
| `AvenirNext-Heavy`    | A handful of headings (mixed in with Avenir proper)       |
| `Archivo-SemiBold`    | A minor role, a few labels                                |

The deck predates the manual and set everything in Avenir. Avenir is an Adrian Frutiger design
owned by Monotype; it is not on Google Fonts and has no free webfont licence, so shipping it would
mean buying one. The manual settles the question in Nunito Sans's favour, so that purchase is no
longer implied by the design.

### If Avenir is licensed anyway

Still a contained change: drop `.woff2` files into `public/fonts/`, add one `@font-face` per
weight in `src/styles/global.css`, repoint `--font-sans`, and delete the Google Fonts `<link>`
and its two `preconnect` hints in `src/layouts/Base.astro`. Nothing else in the codebase names a
typeface. Re-check `.statement` and `.pill` tracking afterwards: Avenir's metrics differ from
Nunito Sans's. Before any of that, confirm with Monotype that the licence covers **web** use at
Firmesa's pageview volume — it is priced separately from the desktop licence the designers hold.

Doing it would now be a deliberate departure from the manual, not a correction of one.

## Form endpoint

`site.formEndpoint` is empty, so the contact form falls back to opening the visitor's mail client.
That works, but it loses submissions from anyone without a configured mail client. A Formspree or
Web3Forms endpoint is a one-line change.

## Analytics — not wired, but a contained change

There is no analytics on the site. Adding Google Analytics 4 is roughly a fifteen-minute change,
because every page (the five in `nav`, plus the 404) renders through `src/layouts/Base.astro` —
one snippet in that `<head>` covers the whole site. GA4 is entirely client-side, so nothing about
static hosting on GitHub Pages gets in the way.

### How it would be wired

Add the measurement ID to `src/data/site.ts`, following the empty-means-off convention already
used by `formEndpoint`:

```ts
/** GA4 measurement ID ("G-XXXXXXXXXX"). Empty => analytics off. */
analyticsId: '',
```

Then in `Base.astro`, above the JSON-LD block:

```astro
{site.analyticsId && (
  <>
    <script is:inline async src={`https://www.googletagmanager.com/gtag/js?id=${site.analyticsId}`}></script>
    <script is:inline define:vars={{ id: site.analyticsId }}>
      window.dataLayer = window.dataLayer || [];
      function gtag(){ dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', id);
    </script>
  </>
)}
```

`is:inline` matters — it tells Astro to leave the tag alone rather than bundling it. The
empty-string guard means the tag never fires in `astro dev`, so local browsing does not pollute
the property.

### Three things to settle first

- **Whose property it is.** Firmesa should create the GA4 property in **their own** Google account
  and hand over the ID — the same reasoning that applies to the domain and the repository. A
  property created under the developer's account makes the developer a permanent dependency for
  the one thing a client most wants to keep looking at afterwards.
- **What is actually measured.** GA4 enhanced measurement gives pageviews and scroll depth for
  free, but the signals that matter here are conversions: clicks on the `tel:` links, the two
  `mailto:` addresses, and contact-form submissions. Those need explicit `gtag('event', …)` calls
  on the relevant elements. It is the difference between a decorative dashboard and one that
  answers whether the site brought in business.
- **The privacy notice.** GA sets cookies, which under the LFPDPPP means the site needs an aviso
  de privacidad. There is none today and no page for it in `nav`. The legal text is Firmesa's to
  supply, not the developer's to write.

A cookieless alternative (Plausible, Umami) sidesteps the third point but is paid or self-hosted;
GA4 is free and is what a client is most likely to already know how to read.

## Identity manual — the rules this build follows

Reference, not a pending item. Source: *Manual de identidad FIRMESA* (24 pp., September 2026),
kept outside the repo in `Manual y Credenciales/`.

**Palette.** The manual publishes eight swatches in two rows. Six are brand tones and are in
`src/styles/global.css` unaltered, ordered by luminosity, with the manual's *principal* at the
500 step — which is why the workhorse token is `brand-500` and not `brand-600`:

| Token       | Hex       | Manual's own label      |
| :---------- | :-------- | :---------------------- |
| `brand-400` | `#c12f56` | degradado, extremo claro |
| `brand-500` | `#951936` | **principal**            |
| `brand-600` | `#820035` | paleta principal          |
| `brand-700` | `#610b1a` | paleta principal          |
| `brand-800` | `#4c0a1b` | degradado                 |
| `brand-900` | `#380712` | degradado                 |

The eighth swatch, `#f4f4f5`, is the light neutral and is `--color-field`. Tones 50–300 are **not**
in the manual: they are mixes of the principal with that neutral, added for light surfaces and for
accent text on dark, which the manual does not cover.

`--color-ink-*` stays a neutral grey ramp for body text and borders, but no section is laid on it
any more: dark surfaces are `brand-900`, as every dark page in the manual and in the credentials
deck is. **The ramp is kept whole on purpose, `ink-900` included.** Going back is a prefix swap,
not a colour decision: every dark section was `bg-ink-900` and every tint over a photograph was
`bg-ink-900/NN`, so `grep -rn 'brand-900' src` finds all of them and nothing else changed.

**Logo.** Two lockups, both in `public/img/`: the primary stacked one
(`logo-firmesa-vertical*.png`, mark over wordmark, equal widths) and the secondary horizontal one
(`logo-firmesa*.png`). Both were derived from the artwork already in the repo, separated by
connected component because the mark and the wordmark overlap horizontally. The manual's "usos
correctos" allows full crimson on light and solid white on dark, and rules out recolouring,
lighter pink gradients, and any substitute wordmark.

**Texture — not adopted.** The manual's "cadena para textura" page shows the mark's own
silhouette, stroked thin. It was built: `Cadena.astro` plus two traced SVGs, on the
`identidad/manual-2026` branch. This branch keeps `Loops.astro`, the looser arc motif, which is
what the credentials deck's own cover uses. To look at the chain version again:

```sh
git checkout identidad/manual-2026 -- src/components/Cadena.astro public/img/cadena-*.svg
```

**Gradient.** `.band` follows the manual's *degradado* strip: dark at both ends, the principal
through the middle, and a brief rise into `brand-400` before it closes.

## Credentials deck — what came across, and what needs confirming

Source: *CREDENCIALES FIRMESA 2026* (12 slides, October 2026), kept outside the repo in
`Manual y Credenciales/`. What it adds to the site, slide by slide:

| Slide                      | Where it landed                                              |
| :------------------------- | :----------------------------------------------------------- |
| Claim de portada           | `site.slogan`, under the logo in the home hero                 |
| ¿De dónde venimos?         | The 54-years line in the ¿Quiénes somos? heading band          |
| No somos una agencia       | Opens the home page's positioning section                      |
| Nuestros medios            | The six-tile grid on Medios Masivos                            |
| Radio                      | The +35 emisoras section, with the five-step buying process    |
| Medios en movimiento       | Aerolíneas and autobuses formats, on Medios Masivos            |
| Producimos                 | "De la idea a la pantalla", on Firmesa Digital                 |
| Espacios de producción     | The three studio photos and four capabilities, on Firmesa Digital |
| Una sola visión            | Built, then cut from Inicio — see below                         |
| Experiencia                | The twelve client names, replacing the generic sector pills    |

**Cut on this branch.** From Inicio: the "una sola visión" four-column section (estrategia,
creatividad, producción, medios) with its "de una idea, a un mayor impacto" band, the `territory`
cards that predate the deck, and the "la integramos" band. From ¿Quiénes somos?: the Modelo 360°
section — and with it the `model360` list, since Inicio's "la integramos" was its other consumer
and nothing reads it any more — plus the "es experiencia con dirección" closing band, which leaves
the page ending on "construimos posicionamiento". From Firmesa Digital: the "cómo trabajamos"
five-pill flow and its `process` list — the deck's "de la idea a la pantalla" pipeline, added on
`credenciales/contenido-2026`, now carries the how-we-work story on that page alone. Every one of
them is intact on `credenciales/contenido-2026` with its data export, so any can come back whole:

```sh
git checkout credenciales/contenido-2026 -- src/pages/index.astro src/pages/quienes-somos.astro \
  src/pages/firmesa-digital.astro src/data/content.ts
```

That checkout restores the whole file, so take it as a starting point and cut back to the one
section you want. The photographs stay on disk either way: `territorio-*.jpg`, `integramos.jpg`
and `modelo-360.jpg` are now unreferenced but not deleted.

The four columns are the deck's clearest statement of what Firmesa sells end to end, so if any
page wants them later, ¿Quiénes somos? is the natural home — the 360° list they overlapped with
is no longer there to compete with them.

**Needs confirming before this goes live:**

- **"+35 emisoras a nivel nacional."** The deck's figure. The station directory parked on
  `firmesa-alt` lists 28 stations captured in August 2026. Both can be true — the directory is
  what the old site published, not necessarily what Firmesa represents today — but the site should
  not publish a number nobody has re-counted.
- **The twelve client names.** See *Media* above: naming clients publicly is a commercial decision,
  not a design one.
- **Six media-tile images and three studio photos** were cut out of the deck's own slides
  (`medio-*.jpg`, `espacio-*.jpg`). The studio photos are Firmesa's own rooms and carry a faint
  red thread from the slide's decoration that could not be removed; the media tiles look
  AI-generated, which is fine for a deck but worth a second look on a public site. Replace any of
  them with real photography when it exists.
- **Suplementos and Digital radio** now appear as media Firmesa sells. Neither had a page section
  before. If either has formats or rates worth spelling out, Medios Masivos is where they go.
