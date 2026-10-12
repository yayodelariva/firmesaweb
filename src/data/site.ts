/**
 * Who Firmesa is, and how to reach them. Page copy lives in `content.ts`;
 * href formatting lives in `../lib/links`.
 */

export const FOUNDED = 1972;

export const site = {
  name: 'Firmesa',
  legalName: 'Funcionamiento Íntegro de Radiodifusoras Mexicanas Enlazadas, S.A.',
  domain: 'https://firmesa.mx',
  tagline: 'Central de medios y partner estratégico',
  description:
    'Firmesa es la central de medios y partner estratégico que posiciona marcas con precisión. Más de 50 años integrando medios masivos y digitales en un solo sistema.',
  /**
   * Pendientes de confirmar: los números y correos que debe publicar la nueva
   * marca. Vacíos a propósito — las páginas conservan el hueco y los enlaces
   * reaparecen solos en cuanto se llenen estas dos listas. El tipo se declara
   * explícitamente para que los consumidores sigan compilando mientras están
   * vacías.
   */
  phones: [] as readonly string[],
  emails: [] as readonly string[],
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
