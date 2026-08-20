export const FOUNDED = 1972;

export const site = {
  name: 'Firmesa',
  legalName: 'Funcionamiento Íntegro de Radiodifusoras Mexicanas Enlazadas, S.A.',
  domain: 'https://firmesa.mx',
  tagline: 'Central de medios y partner estratégico',
  description:
    'Firmesa es la central de medios y partner estratégico que posiciona marcas con precisión. Más de 50 años integrando medios masivos y digitales en un solo sistema.',
  phones: ['55 5250 7788', '55 5254 5937'],
  emails: ['radiodifusion@firmesa.com.mx', 'nacho@firmesa.com.mx'],
  /** Pendiente: la presentación deja el campo de WhatsApp en blanco. */
  whatsapp: '',
  location: 'Polanco, CDMX',
  facebook: 'https://www.facebook.com/firmesaoficial/',
  /** Form endpoint (Formspree, Netlify, etc.). Empty => falls back to the visitor's mail client. */
  formEndpoint: '',
} as const;

export const years = () => new Date().getFullYear() - FOUNDED;

/** Trayectoria redondeada a la década, como en la presentación ("más de 50 años"). */
export const decades = () => Math.floor(years() / 10) * 10;

/** Paths stay in Spanish: they are the site's public URLs. */
export const nav = [
  { href: '/', label: 'Inicio' },
  { href: '/quienes-somos/', label: '¿Quiénes somos?' },
  { href: '/firmesa-digital/', label: 'Firmesa Digital' },
  { href: '/medios-masivos/', label: 'Medios Masivos' },
  { href: '/contacto/', label: 'Contacto' },
] as const;

/** Home: the two halves of the offering. */
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

export const territory = [
  { title: 'Estrategia que se ejecuta', image: '/img/territorio-estrategia.jpg' },
  { title: 'Creatividad que posiciona', image: '/img/territorio-creatividad.jpg' },
  { title: 'Medios que funcionan', image: '/img/territorio-medios.jpg' },
] as const;

/** ¿Quiénes somos?: what defines the house. */
export const traits = [
  'Experiencia que respalda decisiones.',
  'Negociación que optimiza inversión.',
  'Estrategia que da dirección.',
  'Creatividad que construye valor.',
  'Ejecución que asegura resultados.',
  'No solo hacemos campañas: construimos posicionamiento.',
] as const;

export const model360 = [
  'Estrategia',
  'Data',
  'Creatividad',
  'Producción',
  'Distribución',
] as const;

/** Firmesa Digital: ¿qué hacemos? */
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

export const process = [
  'Diagnóstico',
  'Estrategia',
  'Producción',
  'Distribución',
  'Optimización',
] as const;

/** Medios Masivos: best sellers. */
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

export const sectors = [
  'Retail',
  'Financiero',
  'Inmobiliario',
  'Consumo',
  'Institucional',
] as const;

/**
 * Prefixes an internal path with Astro's `base`.
 * Returns the path untouched when the site is served from the root
 * (e.g. firmesa.mx) and prefixes it when it lives in a subdirectory
 * (e.g. GitHub Pages: /firmesaweb/).
 */
export const url = (path: string) =>
  `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;
