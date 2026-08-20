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
- **Client logos:** the deck names sectors (Retail, Financiero, Inmobiliario, Consumo,
  Institucional) but shows no client marks. Real logos would strengthen that section.
- Six extracted images went unused and were removed to keep the repo lean: the FIRMESA outline
  band, a control room, a neon-mic frame, the bus hero, and two brand mockups (parabús and
  building). All are recoverable from the PDF with `pdfimages`.

## Type licensing — Avenir

**The site does not use the deck's typeface.** This is the one place where the build knowingly
departs from the presentation, so it is worth understanding before signing off on the design.

### What the presentation actually uses

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

So the deck is **Avenir throughout**, in six weights plus one oblique, with a little Archivo.

(`pdffonts` reports the face names and that all nine are embedded as subsets; the roles in the
right-hand column are read off the slides, not extracted from the file.)

### Why it is not on the site

Avenir is an Adrian Frutiger design owned by Monotype (via the Linotype library). It is **not on
Google Fonts and has no free webfont licence.** Embedding it in a public site requires a paid
webfont licence — separate from any desktop licence Firmesa's designers already hold for
Illustrator. Shipping the font files without that licence would be a licence violation, so the
build does not do it.

Note that this is a *webfont* question only. The PDF legitimately embeds subsets for display;
that is a different permission from serving the font to every visitor.

### What ships instead

**Nunito Sans**, from Google Fonts, in weights 300/400/600/700/800/900 — matching the six Avenir
weights the deck uses. It is the closest freely licensable match: a geometric sans with humanist
warmth, a tall x-height, and a double-storey `a`, which is the combination that makes Avenir read
the way it does. Other candidates considered were Mulish and Figtree (both close, slightly
narrower), and Montserrat, Poppins and Jost — all rejected as too geometric, which flattens the
warmth Avenir carries in the body copy.

The difference is visible if you compare side by side, particularly in the wide letter-spaced
uppercase statements. It is not visible to someone who has not seen the deck.

### Swapping in the real Avenir

If Firmesa licenses Avenir (or Avenir Next) for web, it is a contained change:

1. Confirm the licence covers **web use** at Firmesa's traffic volume — Monotype prices webfonts
   separately, historically by pageview tier. Verify current terms directly with Monotype rather
   than relying on this note.
2. Drop the `.woff2` files into `public/fonts/`.
3. Add `@font-face` blocks in `src/styles/global.css`, one per weight, with `font-display: swap`.
4. Point the token at the new family — this is the only line that decides what the site renders:

   ```css
   --font-sans: "Avenir", "Avenir Next", ui-sans-serif, system-ui, sans-serif;
   ```

5. Delete the Google Fonts `<link>` and the two `preconnect` hints in `src/layouts/Base.astro`.
   Leaving them costs two DNS lookups and a stylesheet fetch for a font nothing references.
6. Rebuild and re-check the wide letter-spaced lines: Avenir's metrics differ from Nunito Sans's,
   so `.statement` and `.pill` tracking in `global.css` may want a small adjustment.

Nothing else in the codebase names a typeface — every rule inherits `--font-sans`.

### If Avenir is never licensed

`Archivo-SemiBold`, the deck's secondary face, **is** on Google Fonts and could be matched exactly
at no cost. It plays only a minor role in the presentation, so the site currently uses one family
throughout for coherence; introducing Archivo for labels and pills would move a small part of the
design closer to the source without any licensing question.

## Form endpoint

`site.formEndpoint` is empty, so the contact form falls back to opening the visitor's mail client.
That works, but it loses submissions from anyone without a configured mail client. A Formspree or
Web3Forms endpoint is a one-line change.
