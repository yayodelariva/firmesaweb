/**
 * Every content list on the site, in the order the pages read them.
 * The pages lay these out; they do not hold copy of their own.
 */

/* ── Inicio ─────────────────────────────────────────────────────────────── */

/** Hero headline: "Creamos …", one word at a time. */
export const rotating = ['campañas', 'marcas', 'posicionamiento'] as const;

/** The two halves of the offering. */
export const worlds = [
  {
    label: 'Medios Masivos',
    href: '/medios-masivos/',
    image: '/img/card-medios-masivos.jpg',
    text: 'Alcance real a gran escala, con estrategia y control.',
  },
  {
    label: 'Firmesa Digital',
    href: '/firmesa-digital/',
    image: '/img/card-firmesa-digital.jpg',
    text: 'Creatividad, contenido y distribución para posicionar y convertir.',
  },
] as const;

/* ── ¿Quiénes somos? ────────────────────────────────────────────────────── */

export const historyPoints = [
  'Necesitan posicionamiento.',
  'Nuestra historia comienza en el radio.',
  'Un medio que no interrumpe, acompaña.',
  'Que no se ve, pero se queda.',
] as const;

export const learnings = [
  'El valor del mensaje, el poder del timing y la importancia de estar en el lugar correcto.',
  'El radio no solo fue nuestro origen.',
  'Fue la escuela que definió nuestro estándar.',
] as const;

/** What defines the house. */
export const traits = [
  'Experiencia que respalda decisiones.',
  'Negociación que optimiza inversión.',
  'Estrategia que da dirección.',
  'Creatividad que construye valor.',
  'Ejecución que asegura resultados.',
  'No solo hacemos campañas: construimos posicionamiento.',
] as const;

/* ── Firmesa Digital ────────────────────────────────────────────────────── */

export const digitalServices = [
  { title: 'Estrategia digital', image: '/img/sv-estrategia-digital.jpg' },
  { title: 'Producción audiovisual', image: '/img/sv-produccion-audiovisual.jpg' },
  { title: 'Contenido para redes', image: '/img/sv-contenido-redes.jpg' },
  { title: 'Podcast', image: '/img/sv-podcast.jpg' },
  { title: 'Branding', image: '/img/sv-branding.jpg' },
  { title: 'Pauta y performance', image: '/img/sv-pauta-performance.jpg' },
] as const;

export const digitalBestSellers = [
  {
    title: 'Podcast',
    text: 'Construye autoridad y cercanía de forma constante.',
    image: '/img/bs-podcast.jpg',
  },
  {
    title: 'Videos de venta',
    text: 'Mensajes diseñados para explicar, convencer y generar acción.',
    image: '/img/bs-videos-venta.jpg',
  },
  {
    title: 'Jingles e identidad sonora',
    text: 'Recordación que permanece más allá de la pantalla.',
    image: '/img/bs-jingles.jpg',
  },
  {
    title: 'Cobertura de eventos',
    text: 'Contenido en tiempo real que convierte momentos en activos de marca.',
    image: '/img/bs-eventos.jpg',
  },
  {
    title: 'Campañas de reels',
    text: 'Creatividad pensada para captar atención y mantenerse en la conversación.',
    image: '/img/bs-reels.jpg',
  },
] as const;

/* ── Medios Masivos ─────────────────────────────────────────────────────── */

export const formats = [
  { title: 'Exterior', image: '/img/exterior-billboard.jpg' },
  { title: 'Impresos', image: '/img/impresos.jpg' },
] as const;

export const massBestSellers = [
  {
    title: 'Campañas en radio',
    subtitle: 'Presencia nacional',
    text: 'El medio más íntimo con alcance masivo y alto nivel de recordación.',
    image: '/img/bs-radio.jpg',
  },
  {
    title: 'Parabuses y exterior',
    subtitle: 'Puntos clave',
    text: 'Impacto constante en puntos clave.',
    image: '/img/bs-parabuses.jpg',
  },
  {
    title: 'Publicidad en aviones',
    subtitle: 'Audiencias de alto valor',
    text: 'Audiencias de alto valor en momentos de máxima atención.',
    image: '/img/bs-aviones.jpg',
  },
  {
    title: 'Publicidad en autobuses',
    subtitle: 'Cobertura en movimiento',
    text: 'Cobertura amplia con presencia continua en movimiento.',
    image: '/img/bs-autobuses.jpg',
  },
] as const;

/** Full service list, from the billboard slide. */
export const services = [
  'Estrategia y planeación',
  'Compra de medios',
  'Data e inteligencia',
  'Producción audiovisual',
  'Desarrollo de contenido',
  'Campañas 360°',
  'Eventos y activaciones',
] as const;

/* ── Contacto ───────────────────────────────────────────────────────────── */

/** "Me interesa" options. These reach Firmesa's inbox verbatim. */
export const interests = [
  'Estrategia y planeación',
  'Medios masivos',
  'Firmesa Digital',
  'Producción audiovisual',
  'Podcast',
  'Campaña 360°',
  'Otro',
] as const;

/* ── Credenciales 2026 ──────────────────────────────────────────────────── */

/** "Nuestros medios": lo que Firmesa opera, en el orden de la presentación. */
export const media = [
  { title: 'Radio', image: '/img/medio-radio.jpg' },
  { title: 'Aerolíneas', image: '/img/medio-aerolineas.jpg' },
  { title: 'Autobuses', image: '/img/medio-autobuses.jpg' },
  { title: 'Suplementos', image: '/img/medio-suplementos.jpg' },
  { title: 'Digital radio', image: '/img/medio-digital-radio.jpg' },
  { title: 'Impresos', image: '/img/medio-impresos.jpg' },
] as const;

/** Radio: el dato de cobertura y el proceso con que se compra. */
export const radio = {
  text: 'Un medio que ha sido parte de nuestra historia y que sigue siendo parte del presente.',
  figure: '+35',
  figureLabel: 'Emisoras a nivel nacional',
  steps: ['Planeación', 'Negociación', 'Compra', 'Ejecución', 'Seguimiento'],
} as const;

/** Medios en movimiento, con los formatos que ofrece cada uno. */
export const movingMedia = [
  {
    title: 'Aerolíneas',
    formats: [
      'Mesas de servicio',
      'Fuselaje',
      'Portaequipajes',
      'Revista impresa y web',
      'Dípticos',
    ],
  },
  {
    title: 'Autobuses',
    formats: [
      'Pantallas abordo',
      'Mega pantalla',
      'Pantallas en taquillas',
      'Columnas andenes',
      'Muro pasillo',
      'Mupi digital',
    ],
  },
] as const;

export const movingMediaTraits = [
  'Gran alcance',
  'Audiencias en movimiento',
  'Presencia estratégica',
] as const;

/** Espacios propios, fotografiados en la presentación de credenciales. */
export const studioSpaces = [
  'Foro audiovisual',
  'Estudio de audio',
  'Sets adaptables',
  'Producción multicámara',
] as const;

export const studioImages = [
  { image: '/img/espacio-foro.jpg', text: 'Foro audiovisual con iluminación y set armado.' },
  { image: '/img/espacio-audio.jpg', text: 'Cabina de audio para locución y podcast.' },
  { image: '/img/espacio-sets.jpg', text: 'Sets adaptables para grabación musical y multicámara.' },
] as const;

/**
 * Marcas que han confiado en Firmesa, tal como las nombra la presentación de
 * credenciales 2026. Son nombres, no logotipos: usar las marcas registradas de
 * terceros en el sitio público requiere su autorización.
 */
export const clients = [
  'Koltin',
  'Afore XXI Banorte',
  'Comex',
  'SC Johnson',
  'Hoteles Emporio',
  'Barcel',
  'Martí',
  'Steren',
  'Fonacot',
  'IMSS',
  'Corazón Films',
  'Sonora Grill',
] as const;
