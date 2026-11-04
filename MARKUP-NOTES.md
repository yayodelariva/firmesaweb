# Markup notes

Why the markup is the way it is, page by page. The comments that used to carry these notes
have been lifted out of the templates: an HTML comment in an `.astro` template ships to the
browser, so every one of them was a few hundred bytes of reasoning sitting in the page source
for anyone who opens the inspector.

**The rule, from here on: no comments inside the markup.** Neither `<!-- … -->`, which is
served, nor `{/* … */}`, which is not — both belong here, where they can be read together
instead of hunted file by file. Comments in a component's frontmatter (`---`) stay where they
are: they document props and data for the editor and the typechecker, and they never reach
the browser.

Each entry names the section and the opening tag it belongs to, so it can be found by
searching the file for that tag. Classes drift; if an anchor no longer matches, the tag name
and the section still place it.

## `src/pages/index.astro`

**Sections, in order:** Hero · Positioning statement · Lo mejor de dos mundos · Clientes · Cierre

### Hero — `<Wordmark class="mt-10 select-none text-[3.5rem] font-black tracking-[0.02em]…`

Outlined wordmark, as in the deck

### Clientes — `<ul class="mt-10 flex flex-wrap justify-center gap-3">`

Nombres, no logotipos: las marcas de terceros necesitan su permiso.


## `src/pages/quienes-somos.astro`

**Sections, in order:** Nuestra historia · Evolución · Qué nos define

### Nuestra historia — `<div class="relative overflow-hidden bg-brand-800">`

Heading band: the page's dark entry point, carried over from the old intro.

### Nuestra historia — `<img src={url('/img/historia.jpg')}`

The only in-flow image without a fixed height: the intrinsic size reserves its space so the
column does not jump on load.


## `src/pages/firmesa-digital.astro`

**Sections, in order:** Hero · ¿Qué hacemos? · Best sellers · Espacios de producción · Cierre

### Espacios de producción — `<ul class="reveal mt-10 flex flex-wrap gap-3">`

The capabilities arrive one after another, as the radio steps and the moving-media formats
do. Reading order here is left to right and then down, which is the order the stagger
follows.


## `src/pages/medios-masivos.astro`

**Sections, in order:** Hero · Nuestros medios · Radio · Medios en movimiento · Formatos · Best sellers masivos · Servicios · Cierre

### Nuestros medios — `<p class="pill w-fit text-brand-500">Nuestros medios</p>`

The Servicios list at the foot of the page, inverted: the same rule, rhythm and alternating
weights, in crimson on white. `.pill` borders in currentColor, so the one colour class sets
both.

### Nuestros medios — `<ul class="reveal mt-10 max-w-3xl space-y-3">`

Every medium jumps to the section that develops it, all of them further down this page —
hence an arrow that points down rather than along. The weight alternates on the title alone,
so the arrow keeps one weight down the column.

### Radio — `<div class="mt-10 flex flex-wrap gap-4">`

Las dos cosas que pide quien llega aquí: dónde se oye y cuánto cuesta. La tarifa se
descarga; el navegador que no respete `download` la abrirá en una pestaña, que tampoco está
mal.

### Radio — `<ol class="reveal grid gap-3 sm:grid-cols-2">`

How a radio buy is run, in the order the deck lists it. The sequence is carried by the
staggered reveal instead of printed numerals, and by the <ol> itself for anyone who never
sees it run.

### Medios en movimiento — `<h2 class="text-[2.5rem] font-black uppercase tracking-tight text-brand-500 s…`

Same outlined display heading as Radio, in crimson: the white outline of the Radio version
would vanish on this light field.

Two lines at every width: one line of this length would run past the gutter from md down.
The extra step below sm keeps the longer of the two inside the narrowest phones, where SVG
text would overflow rather than wrap.

### Medios en movimiento — `<div class="mt-12 grid gap-6 md:grid-cols-2">`

Each medium carries its own photograph. Both are bright and busy, so the card goes dark and
the type turns over it: the flat tint carries the luminance contrast, and `on-photo` below
carries the edges, which is the half a photograph's own texture takes away.

Each list reveals its own formats in turn, at the same pace as the radio steps. The two are
separate groups, so each starts when its own card is reached rather than both firing off the
first one.

### Cierre — `<img src={url('/img/logo-firmesa.png')}`

El logotipo va en su archivo de marca: el manual lo fija en Avenir Next Heavy, no en la
tipografía del sitio.


## `src/pages/estaciones.astro`

**Sections, in order:** Cobertura · Filtros · Directorio · Cierre

### Cobertura — `<Loops class="text-white" opacity={0.12} tilt={-34} zoom={0.82} offset="110px" />`

It is moved with `offset`, not with `position`, and the two are not interchangeable. `position`
slides the drawing inside its own box, and the box is what paints it: with `mask-size: contain`
the drawing comes out exactly as wide as the band, so sliding it sideways by *n* loses *n* of it
off one edge and leaves *n* blank on the other. At `650px` less than half the trace survived.
`offset` moves the box and the drawing together, so the whole trace arrives at its new place —
as far as the section, which does clip, allows.

A sliver still runs off the top, about 25 px of the drawing's corner. `offset="110px 25px"`
would clear it; the bottom has 80 px to spare.

### Cobertura — `<div class="mt-14 max-w-4xl max-md:hidden">`

El mapa no crece con la página: pasado cierto ancho deja de leerse mejor y sólo empuja el
directorio fuera de la pantalla.

Y por debajo de 768 px no se dibuja. El trazado mide 40 rem, y con el margen de la página
eso no cabe entero hasta los 680 px; más estrecho habría que encogerlo —y las plazas del
centro se amontonan hasta volverse intocables— o dejarlo correr de lado. El directorio de
abajo dice lo mismo y se lee mejor en un teléfono.

### Directorio — `<ul class="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">`

Un solo tablero por estado, con la ciudad en cada ficha. Veintidós de las veintiocho
ciudades tienen una sola emisora: encabezarlas por separado dejaba una tarjeta sola por
renglón y estiraba la página tres veces de más.

### Directorio — `{station.audio ? (`

Diecisiete de las treinta y cinco tienen un flujo en HTTPS y suenan aquí mismo; las demás
abren el sitio de la estación, que es todo lo que publican, y dos no publican ninguno: esas
lo dicen en lugar de ofrecer un botón que no lleva a nada. Sin JavaScript, todas abren su
sitio.

### Reproductor — `<div id="reproductor"`

Barra de reproducción. Aparece sólo mientras algo suena: la señal sigue al visitante por la
página, que es como se oye el radio.


## `src/pages/contacto.astro`

**Sections, in order:** Hero · Atención directa · Formulario · Hablemos

### Atención directa — `<div class="self-start rounded-3xl border border-ink-200 bg-field/50 p-8 md:p…`

Datos directos. Misma caja que el formulario de al lado: el mismo borde, el mismo fondo y el
mismo acolchado. Así los dos títulos arrancan a la misma altura por construcción y no por un
número puesto a mano, que se desalinearía en cuanto cambie el acolchado de uno de los dos.

`self-start` para que no se estire hasta el alto del formulario: tres datos no llenan ocho
campos, y la rejilla dejaría media tarjeta vacía.

### Atención directa — `<dl class="mt-8 space-y-9">`

Los tres datos pesan lo mismo: `text-xs` en la etiqueta y `text-xl font-bold` en el valor.
Un teléfono más grande que un correo sugiere que uno importa más que el otro, y aquí los
tres son la misma invitación.

### Formulario — `<div class="rounded-3xl border border-ink-200 bg-field/50 p-8 md:p-10">`

Form. Field names stay in Spanish: they label the submissions Firmesa staff read.

### Hablemos — `<div class="band absolute inset-x-0 top-0 h-1.5"></div>`

El mismo filete de la cabecera, arriba y abajo, para cerrar la página con la marca.


## `src/layouts/Base.astro`

### `<link rel="icon" href={url('/favicon.ico')} sizes="16x16 32x32 48x48" />`

El .ico lo pide el navegador por su cuenta, pero en un subdirectorio lo buscaría en la raíz
del dominio, así que se declara con `base`.


## `src/components/Header.astro`

### `<div class="band h-1.5"></div>`

Thin brand rule, as in the deck


## `src/components/Outline.astro`

### `<mask id={maskId}>`

White shows the stroke, black hides it: the filled glyphs knock out the inner half, taking
the crossing artefacts with them.


## `src/components/CoverageMap.astro`

### `<div class="overflow-x-auto">`

El mapa no se encoge: se desplaza. Un contorno de México a lo ancho de un teléfono deja las
plazas del centro una encima de otra, y son justo las que hay que poder tocar. La página
sólo lo dibuja donde cabe entero, así que este desplazamiento es una red por si acaso.

### `<g fill="none" class="stroke-white/15" stroke-width="1" stroke-linejoin="roun…`

El resto del país, como referencia de la forma.

### `<circle cx={city.x}`

Un disco translúcido amplía el blanco de 7 px a un objetivo que un dedo acierta, sin
agrandar el punto que se ve. Arcelia y Ciudad Altamirano están a 12.9 px una de otra: pasado
ese radio, el disco de una taparía el centro de la otra y la dejaría fuera de alcance.

El halo responde al enlace entero, no al disco: el punto blanco va encima, y con `hover:`
propio el halo se apagaba justo al llegar al centro, que es donde se apunta.

### `<p class="mt-6 text-xs leading-relaxed text-white/45">`

Natural Earth es de dominio público; GeoNames pide atribución (CC BY).
