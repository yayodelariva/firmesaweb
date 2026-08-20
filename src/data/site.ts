export const FUNDACION = 1972;

export const site = {
  nombre: 'Firmesa',
  razonSocial: 'Funcionamiento Íntegro de Radiodifusoras Mexicanas Enlazadas, S.A.',
  dominio: 'https://firmesa.mx',
  descripcion:
    'Representación de radiodifusoras en México. Creamos, ejecutamos y distribuimos campañas publicitarias en radio con cobertura nacional.',
  telefonos: ['55 5250 7788', '55 5254 5937'],
  correos: ['radiodifusion@firmesa.com.mx', 'nacho@firmesa.com.mx'],
  facebook: 'https://www.facebook.com/firmesaoficial/',
  mapaCobertura:
    'https://www.google.com/maps/d/embed?mid=1CkBrGi5yxEhOgwuGwXVACxp12g9tQo8&ehbc=2E312F',
  /** Endpoint del formulario (Formspree, Netlify, etc.). Vacío => se abre el correo del usuario. */
  formEndpoint: '',
} as const;

export const anios = () => new Date().getFullYear() - FUNDACION;

export const nav = [
  { href: '/', label: 'Inicio' },
  { href: '/nosotros/', label: 'Nosotros' },
  { href: '/servicios/', label: 'Servicios' },
  { href: '/estaciones/', label: 'Estaciones' },
  { href: '/contacto/', label: 'Contacto' },
] as const;

export const servicios = [
  {
    slug: 'representacion',
    titulo: 'Representación de radiodifusoras',
    resumen:
      'Comercializamos los espacios publicitarios de estaciones ubicadas a lo largo y ancho del territorio nacional.',
    detalle:
      'El anunciante selecciona el área adecuada para la difusión de su campaña con la seguridad de que su mensaje logrará la penetración e impacto de mayor efectividad en el público radioescucha.',
    puntos: [
      'Estaciones únicas o líderes en cada plaza',
      'Selección de plaza, horario y frecuencia',
      'Cobertura AM, FM y streaming',
    ],
  },
  {
    slug: 'agencia',
    titulo: 'Agencia de publicidad y contratación de medios',
    resumen:
      'Creación, ejecución y distribución de campañas publicitarias con estrategias y tácticas novedosas que incrementan ventas.',
    detalle:
      'Planeamos la campaña de principio a fin: definición de objetivos, selección de medios, negociación de tarifas, distribución de materiales y seguimiento de la pauta.',
    puntos: [
      'Planeación y compra de medios',
      'Distribución de materiales a estaciones',
      'Seguimiento y reporte de campaña',
    ],
  },
  {
    slug: 'estudio',
    titulo: 'Estudio de grabación digital',
    resumen:
      'Producción de spots, podcast, audiovisuales y cualquier idea en audio que pueda imaginar, con la mejor calidad.',
    detalle:
      'Contamos con un equipo de profesionales, acceso a librerías de música y efectos especiales, y los mejores músicos para convertir sus ideas en jingles, audio firmas o producciones musicales completas.',
    puntos: [
      'Spots comerciales, guiones y creatividad',
      'Cápsulas, programas en vivo o grabados y conceptos radiales',
      'Jingles, audio firmas y producciones musicales',
      'Casting de talentos y locutores',
      'Podcast y audiovisuales',
    ],
  },
  {
    slug: 'streaming',
    titulo: 'Cobertura global y audio para marcas',
    resumen:
      'Radio en streaming a través de internet y canales de audio personalizado para empresas o marcas.',
    detalle:
      'La señal de nuestras emisoras viaja por internet, lo que extiende el alcance de su campaña más allá de la cobertura de la antena.',
    puntos: [
      'Transmisión en vivo por internet',
      'Canales de audio personalizado para punto de venta',
      'Alcance nacional e internacional',
    ],
  },
] as const;

/**
 * Antepone el `base` de Astro a una ruta interna.
 * Devuelve la ruta tal cual cuando el sitio se sirve desde la raíz
 * (por ejemplo en firmesa.mx) y la prefija cuando vive en un subdirectorio
 * (por ejemplo en GitHub Pages: /firmesaweb/).
 */
export const url = (ruta: string) =>
  `${import.meta.env.BASE_URL.replace(/\/$/, '')}${ruta}`;
