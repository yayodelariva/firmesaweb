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

## Type licensing

The site uses **Nunito Sans** as a stand-in for **Avenir**, which the deck uses and which is not
freely licensable for web. If Firmesa licenses Avenir (or Avenir Next) for web use, swap
`--font-sans` in `src/styles/global.css` and drop the Google Fonts link in `Base.astro`.

## Form endpoint

`site.formEndpoint` is empty, so the contact form falls back to opening the visitor's mail client.
That works, but it loses submissions from anyone without a configured mail client. A Formspree or
Web3Forms endpoint is a one-line change.
