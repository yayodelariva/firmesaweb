## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Markup

Templates carry no comments. The reasoning behind the markup lives in
[MARKUP-NOTES.md](MARKUP-NOTES.md), filed by page and by element — read it before changing a
layout, and add to it rather than to the template. An `<!-- … -->` in an `.astro` template is
served to the browser, which is why none are left in `src/`.

Frontmatter comments (inside `---`, and the JSDoc on props and data) stay in the files: they
never reach the browser and the typechecker uses them.
