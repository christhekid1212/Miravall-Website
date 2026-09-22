# Miravall

A Greek-first wedding venue website with React, TypeScript and Vite. Open `?lang=en` for English. The language switch preserves the current section.

## Development

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Edit bilingual copy and photo descriptions in `src/content.ts`, layout in `src/App.tsx`, and styles in `src/style.css`. Photographs in `photos/` are bundled by Vite with hashed URLs.

## Production

```bash
npm run build
npm run preview
```

The build runs TypeScript checks and writes the production site to `dist/`.

## Enquiries and galleries

The enquiry form opens the visitor's email app with a prepared message to `ktima.miravall@hotmail.com`. It does not send or store enquiries. Direct email, telephone and Maps links are available. Direct form delivery would require a backend email service.

Galleries support touch swipes, navigation buttons and enlarged viewing. The enlarged viewer supports arrow keys and Escape. Scroll effects respect reduced-motion settings. Fonts load from Google Fonts with local fallbacks.

## Before publishing

Review both languages and photographs, confirm the contact number and menu details, and configure hosting and the production domain. The site has not been deployed.
