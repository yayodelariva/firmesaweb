/**
 * Every rule for turning site data into an href lives here, so a deployment
 * change (the `base` prefix) or a formatting change (phone numbers) is made
 * once rather than in each component that happens to render a link.
 */

/** Astro's `base`, without its trailing slash: '' at the root, '/firmesaweb' in a subdirectory. */
const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/**
 * Prefixes an internal path with Astro's `base`.
 * Returns the path untouched when the site is served from the root
 * (e.g. firmesa.mx) and prefixes it when it lives in a subdirectory
 * (e.g. GitHub Pages: /firmesaweb/).
 */
export const url = (path: string) => `${BASE}${path}`;

/**
 * The inverse of `url`: a live pathname reduced to the site-relative path.
 * `Astro.url.pathname` carries the `base` prefix, so anything comparing it
 * against a declared route — the nav's active state, a canonical URL — has to
 * strip it first or the prefix is applied twice.
 */
export const sitePath = (pathname: string) => pathname.slice(BASE.length) || '/';

/** E.164 `tel:` href for a Mexican number written with spaces, e.g. '55 5250 7788'. */
export const telHref = (phone: string) => `tel:${telE164(phone)}`;

/** The same number as bare E.164, which is what schema.org and analytics want. */
export const telE164 = (phone: string) => `+52${phone.replace(/\D/g, '')}`;

export const mailtoHref = (email: string) => `mailto:${email}`;
