/**
 * Turning Spanish copy into something a machine can match or address:
 * search keys and URL fragments. Both drop the accents, because neither a
 * visitor typing "michoacan" nor a URL fragment should depend on them.
 */

/** Lowercased and stripped of accents, for substring search. */
export const normalize = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase();

/** `normalize`, reduced further to the characters an id may carry. */
export const slug = (value: string) =>
  normalize(value)
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
