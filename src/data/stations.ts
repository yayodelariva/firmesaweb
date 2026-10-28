/**
 * El directorio de emisoras, con forma declarada.
 *
 * El JSON por sí solo le da a TypeScript un tipo por cada variante de ficha
 * que encuentra, y las fichas no son todas iguales: `audio` y `gain` sólo
 * están donde hay un flujo en HTTPS, y `stream` falta en las dos emisoras que
 * no publican sitio. Declarar la forma una vez evita que añadir una emisora
 * incompleta rompa la página que la pinta.
 */
import data from './stations.json';

export interface Station {
  name: string;
  frequency: string;
  callSign: string;
  programming: string;
  /** Sitio de la emisora. Falta cuando no tiene. */
  stream?: string;
  /** Flujo directo en HTTPS, el que suena en la página. */
  audio?: string;
  /** Atenuación que la nivela con las demás; la mide `scripts/measure-loudness.py`. */
  gain?: number;
}

export interface City {
  city: string;
  /** Coordenadas de GeoNames y su proyección en el mapa; las pone `scripts/make-map.py`. */
  lat: number;
  lon: number;
  x: number;
  y: number;
  stations: Station[];
}

export interface State {
  state: string;
  cities: City[];
}

export const stations: State[] = data;
