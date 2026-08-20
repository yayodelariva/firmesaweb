# firmesa.mx

Sitio web de **Firmesa** — *Funcionamiento Íntegro de Radiodifusoras Mexicanas Enlazadas, S.A.*,
casa de representación de radiodifusoras fundada el 19 de julio de 1972.

Construido con [Astro](https://astro.build) + [Tailwind CSS](https://tailwindcss.com).
Salida 100 % estática: se puede publicar en Vercel, Netlify, Cloudflare Pages o cualquier hosting
que sirva archivos.

## Comandos

| Comando           | Acción                                            |
| :---------------- | :------------------------------------------------ |
| `npm install`     | Instala dependencias                               |
| `npm run dev`     | Servidor de desarrollo en `localhost:4321`         |
| `npm run build`   | Compila el sitio a `./dist/`                       |
| `npm run preview` | Previsualiza la compilación de producción          |
| `npx astro check` | Verifica tipos y diagnósticos de los archivos Astro |

## Estructura

```
src/
├── components/   Header, Footer, EncabezadoPagina
├── data/
│   ├── site.ts          Contacto, navegación y catálogo de servicios
│   └── estaciones.json   Directorio de estaciones (estado → ciudad → estación)
├── layouts/Base.astro    Shell HTML, SEO, Open Graph y JSON-LD
├── pages/        index, nosotros, servicios, estaciones, contacto, 404
└── styles/global.css     Tokens de marca y estilos base
public/img/       Logotipo e imágenes
```

## Cómo editar el contenido

- **Teléfonos, correos, redes y mapa:** `src/data/site.ts`.
- **Servicios:** arreglo `servicios` en `src/data/site.ts` (el `slug` genera el ancla `/servicios/#slug`).
- **Estaciones:** `src/data/estaciones.json`. Cada estación requiere
  `nombre`, `frecuencia`, `siglas`, `stream` y `programacion`. Las cifras de la portada
  (estaciones, ciudades, estados) se calculan solas a partir de este archivo.
- **Años de trayectoria:** se calculan con `anios()` a partir de `FUNDACION = 1972`; no hay que
  actualizarlos cada año.

## Formulario de contacto

Al ser un sitio estático no hay backend. Mientras `site.formEndpoint` esté vacío, el formulario
abre el cliente de correo del visitante con los datos ya redactados. Para recibir los envíos por
correo o en un panel, coloque en `formEndpoint` la URL de un servicio como Formspree, Netlify Forms
o Web3Forms; el formulario hará `POST` a ese endpoint automáticamente.

## Pendientes

- Tarifarios en PDF (Radio y Autobuses) para publicarlos como descarga.
- Logotipos de clientes para la sección "Algunos de nuestros clientes".
- Domicilio fiscal / de oficinas, si se desea mostrarlo en Contacto.
