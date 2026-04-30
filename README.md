# 🌿 mentholove

A bilingual (Polish / English) catalog of mint herb varieties — built with **React + Vite + Tailwind CSS + i18next**.

## Quick start

```bash
npm install
npm run dev
```

Then open http://localhost:5173.

## Deploying to GitHub Pages

The repo includes a workflow at `.github/workflows/deploy.yml` that builds the site and publishes it to Pages on every push to `main`.

**One-time setup in GitHub:**

1. Go to **Settings → Pages**.
2. Under **Build and deployment → Source**, select **GitHub Actions**.
3. Push to `main` (or run the workflow manually). The site will be served from
   `https://<owner>.github.io/<repo>/`.

**About the base path** — `vite.config.js` defaults to `base: '/Mentholove/'`. The workflow overrides it at build time via the `VITE_BASE` env var so it always matches the actual repo name. If you fork/rename the repo, no code changes are needed.

**Why HashRouter?** GitHub Pages doesn't support SPA URL rewriting, so the app uses `HashRouter` (URLs look like `/#/2`). This avoids 404s on refresh and on direct deep links.

**Common pitfall** — the original "Failed to load module script... MIME type text/jsx" error happens when GitHub Pages serves the raw `src/` files instead of the Vite build output (`dist/`). The included workflow fixes this by uploading only `dist/` as the Pages artifact.

## Tech stack

- React 18 + Vite
- React Router v6
- Tailwind CSS v3
- Framer Motion
- Lucide React (icons)
- Swiper.js (image gallery)
- i18next + react-i18next

## Project layout

```
public/data/
  index.json        # array of available mint IDs, e.g. [1, 2, 3]
  1.json            # one bilingual mint definition per file
  2.json
  images/<id>/...   # (optional) local images per mint

src/
  components/       # MintCard, MintBadge, ImageGallery, SearchBar, Navbar, LanguageSwitcher
  pages/            # CatalogPage, DetailPage
  hooks/useMint.js  # fetches index.json and individual mint files
  config/badges.js  # badge & "uses" icon mapping
  locales/          # pl.json, en.json — UI string translations
  i18n.js           # i18next configuration
  App.jsx, main.jsx
```

## Adding a new mint

1. Create a new JSON file in `public/data/`, e.g. `public/data/3.json`.
2. Add the new ID to `public/data/index.json`:

   ```json
   [1, 2, 3]
   ```

3. (Optional) drop images into `public/data/images/3/` and reference them in the JSON.

No code changes needed — the catalog reads `index.json` on load to discover all mints.

## Bilingual mint JSON shape

Each mint file looks like this:

```jsonc
{
  "id": 1,
  "images": ["/data/images/1/1.jpg"],
  "badges": {
    "frostResistance": "-20°C",        // language-neutral string
    "perennial": true,                  // boolean — label translated via locales
    "position":  { "pl": "Półcień",     "en": "Partial shade" },
    "height":    { "pl": "do 70 cm",    "en": "up to 70 cm"   },
    "watering":  { "pl": "Obfite",      "en": "Abundant"      },
    "uses": {
      "pl": ["Napary", "Aromaterapia"],
      "en": ["Infusions", "Aromatherapy"]
    }
  },
  "translations": {
    "pl": {
      "name": "...",
      "latinName": "...",
      "shortDescription": "...",
      "sections": {
        "appearance": "...",
        "origin": "...",
        "benefits": "...",
        "foodPairing": "...",
        "planting": "..."
      }
    },
    "en": { /* same shape, English values */ }
  }
}
```

Rules:

- `frostResistance` is a single string used in both languages.
- `perennial` is a boolean; the **label** ("Wieloletniość" / "Perennial") and the value ("Tak"/"Yes") are pulled from `src/locales/*.json`.
- All other badge values that differ per language use `{ "pl": "...", "en": "..." }`.
- `uses` is always an array per language.
- All textual content lives under `translations[lang]`.

## Switching languages

A `PL | EN` toggle lives in the navbar. The selected language is stored in `localStorage` under the `lang` key. The default is `pl`. Switching is instant — no reload, no URL change.

## Adding a new language (e.g. German)

1. Create `src/locales/de.json` with the same shape as `pl.json` / `en.json`.
2. Register it in `src/i18n.js`:

   ```js
   import de from './locales/de.json';

   i18n.use(initReactI18next).init({
     resources: {
       pl: { translation: pl },
       en: { translation: en },
       de: { translation: de },
     },
     // ...
   });
   ```

3. Add a `de` key to every mint JSON file under `translations` and to every localized badge object (`position`, `height`, `watering`, `uses`).
4. Extend `LanguageSwitcher.jsx` to expose the new language button.
5. (Optional) Extend `USE_ICONS` in `src/config/badges.js` so German "uses" labels get matching icons.
