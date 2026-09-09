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
