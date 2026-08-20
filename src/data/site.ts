export const FOUNDED = 1972;

export const site = {
  name: 'Firmesa',
  legalName: 'Funcionamiento Íntegro de Radiodifusoras Mexicanas Enlazadas, S.A.',
  domain: 'https://firmesa.mx',
  description:
    'Representación de radiodifusoras en México. Creamos, ejecutamos y distribuimos campañas publicitarias en radio con cobertura nacional.',
  phones: ['55 5250 7788', '55 5254 5937'],
  emails: ['radiodifusion@firmesa.com.mx', 'nacho@firmesa.com.mx'],
  facebook: 'https://www.facebook.com/firmesaoficial/',
  coverageMap:
    'https://www.google.com/maps/d/embed?mid=1CkBrGi5yxEhOgwuGwXVACxp12g9tQo8&ehbc=2E312F',
  /** Form endpoint (Formspree, Netlify, etc.). Empty => falls back to the visitor's mail client. */
  formEndpoint: '',
} as const;

export const years = () => new Date().getFullYear() - FOUNDED;

/** Paths stay in Spanish: they are the site's public URLs. */
export const nav = [
  { href: '/', label: 'Inicio' },
  { href: '/nosotros/', label: 'Nosotros' },
  { href: '/servicios/', label: 'Servicios' },
  { href: '/estaciones/', label: 'Estaciones' },
  { href: '/contacto/', label: 'Contacto' },
] as const;

export const services = [
  {
    slug: 'representacion',
    title: 'Representación de radiodifusoras',
    summary:
      'Comercializamos los espacios publicitarios de estaciones ubicadas a lo largo y ancho del territorio nacional.',
    detail:
      'El anunciante selecciona el área adecuada para la difusión de su campaña con la seguridad de que su mensaje logrará la penetración e impacto de mayor efectividad en el público radioescucha.',
    points: [
      'Estaciones únicas o líderes en cada plaza',
      'Selección de plaza, horario y frecuencia',
      'Cobertura AM, FM y streaming',
    ],
  },
  {
    slug: 'agencia',
    title: 'Agencia de publicidad y contratación de medios',
    summary:
      'Creación, ejecución y distribución de campañas publicitarias con estrategias y tácticas novedosas que incrementan ventas.',
    detail:
      'Planeamos la campaña de principio a fin: definición de objetivos, selección de medios, negociación de tarifas, distribución de materiales y seguimiento de la pauta.',
    points: [
      'Planeación y compra de medios',
      'Distribución de materiales a estaciones',
      'Seguimiento y reporte de campaña',
    ],
  },
  {
    slug: 'estudio',
    title: 'Estudio de grabación digital',
    summary:
      'Producción de spots, podcast, audiovisuales y cualquier idea en audio que pueda imaginar, con la mejor calidad.',
    detail:
      'Contamos con un equipo de profesionales, acceso a librerías de música y efectos especiales, y los mejores músicos para convertir sus ideas en jingles, audio firmas o producciones musicales completas.',
    points: [
      'Spots comerciales, guiones y creatividad',
      'Cápsulas, programas en vivo o grabados y conceptos radiales',
      'Jingles, audio firmas y producciones musicales',
      'Casting de talentos y locutores',
      'Podcast y audiovisuales',
    ],
  },
  {
    slug: 'streaming',
    title: 'Cobertura global y audio para marcas',
    summary:
      'Radio en streaming a través de internet y canales de audio personalizado para empresas o marcas.',
    detail:
      'La señal de nuestras emisoras viaja por internet, lo que extiende el alcance de su campaña más allá de la cobertura de la antena.',
    points: [
      'Transmisión en vivo por internet',
      'Canales de audio personalizado para punto de venta',
      'Alcance nacional e internacional',
    ],
  },
] as const;

/**
 * Prefixes an internal path with Astro's `base`.
 * Returns the path untouched when the site is served from the root
 * (e.g. firmesa.mx) and prefixes it when it lives in a subdirectory
 * (e.g. GitHub Pages: /firmesaweb/).
 */
export const url = (path: string) =>
  `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;
