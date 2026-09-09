# ToolNest

**Simple tools for everyday tasks.**

ToolNest is a fast, mobile-first, ₹0-cost web app of everyday utilities — calculators,
image tools, PDF tools and text tools. It's a static React app: no backend, no
database, no paid APIs, no login. Image and PDF processing happens locally in the
browser (Canvas API and [pdf-lib](https://github.com/Hopding/pdf-lib)) — files are
never uploaded anywhere.

## Features

- **5 Calculators** — Percentage, Age, Discount, Average, Ratio
- **5 Image Tools** — Compress Image, Compress to 100KB, Resize, JPG→PNG, JPG→WebP
- **3 PDF Tools** — JPG to PDF, Merge PDF, Compress PDF
- **3 Text Tools** — Word Counter, Character Counter, Case Converter
- Instant client-side tool search
- Light/dark mode (saved to `localStorage`)
- Fully responsive, mobile-first layout
- Per-tool SEO metadata (title, description, canonical URL, Open Graph)
- Related tools, FAQ and "how to use" sections on every tool page
- Reusable, accessible `FileDropzone` with validation and clear error states
- PWA-ready (`manifest.json`, favicon, installable structure)

## Technology

- React 18 + Vite
- React Router
- Tailwind CSS
- [pdf-lib](https://github.com/Hopding/pdf-lib) (MIT license) for PDF merge/create/optimize
- No other runtime dependencies

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Visit the printed local URL (usually `http://localhost:5173`).

## Production build

```bash
npm run build
```

This outputs a static site to `dist/`. Verify it locally with:

```bash
npm run preview
```

The build must complete with zero errors before deploying.

## Free deployment

Any static host works. Two popular ₹0 options:

### Vercel (recommended)
1. Push this project to a GitHub repo.
2. Go to [vercel.com](https://vercel.com), "Add New Project", import the repo.
3. Framework preset: **Vite**. Build command: `npm run build`. Output directory: `dist`.
4. Deploy — you'll get a free `*.vercel.app` URL.

### Netlify
1. Push this project to a GitHub repo.
2. Go to [netlify.com](https://netlify.com), "Add new site" → "Import an existing project".
3. Build command: `npm run build`. Publish directory: `dist`.
4. Deploy — you'll get a free `*.netlify.app` URL.

### GitHub Pages
1. `npm run build`
2. Deploy the `dist/` folder using an action like `peaceiris/actions-gh-pages`, or
   the `gh-pages` npm package pointed at `dist`.
3. Because this is a single-page app with client-side routing, configure your host
   to redirect unknown paths to `index.html` (Vercel and Netlify do this
   automatically; for GitHub Pages, add a `404.html` that redirects to `index.html`,
   or use hash routing if you prefer to avoid that step).

No environment variables or secrets are required for the MVP.

## Project structure

```
src/
  components/     Reusable UI: Header, Footer, SearchBox, FileDropzone,
                  ToolCard, ToolPageShell, SEO, FAQ, HowToUse, RelatedTools, etc.
  hooks/          useTheme (dark mode), useObjectUrl
  utils/          imageUtils, textUtils, numberUtils, pdfUtils
  data/           tools.js — the single source of truth for every tool
                  (name, description, category, keywords, route)
  pages/          Home, ToolsIndex, Categories, CategoryPage, About, Privacy,
                  Contact, NotFound
  tools/
    calculators/  PercentageCalculator, AgeCalculator, DiscountCalculator,
                  AverageCalculator, RatioCalculator
    image/        CompressImage, CompressImageTo100KB, ResizeImage,
                  JpgToPng, JpgToWebp (+ shared ImageFormatConverter)
    pdf/          JpgToPdf, MergePdf, CompressPdf
    text/         WordCounter, CharacterCounter, CaseConverter
  App.jsx         Route table (lazy-loaded)
  main.jsx        App entry point
```

## How to add a new tool

1. **Register it** in `src/data/tools.js`: add an object with `slug`, `name`,
   `shortDescription`, `category`, `keywords`, and optionally `popular: true`.
   This automatically makes it appear in search, its category page, and related
   tools.
2. **Build the page** in the matching `src/tools/<category>/` folder. Wrap it in
   `<ToolPageShell>` (see any existing tool for the pattern) to get the standard
   breadcrumb, title, privacy note, "how to use", FAQ and related-tools sections
   for free.
3. **Add the route** in `src/App.jsx`: a `lazy(() => import(...))` line plus a
   `<Route path="/your-slug" element={<YourTool />} />`.
4. If it's a new category, also add it to the `CATEGORIES` array in
   `src/data/tools.js` and give it an icon in `src/components/CategoryIcon.jsx`.

## How to change branding

- **Name/logo**: edit the "ToolNest" text and the `T` logo mark in
  `src/components/Header.jsx` and `src/components/Footer.jsx`.
- **Tagline**: search for `"Simple tools for everyday tasks."` (Footer, Home FAQ).
- **Colors**: edit the `brand` color scale in `tailwind.config.js`.
- **Favicon/app icon**: replace `public/favicon.svg` and update `public/manifest.json`.
- **Page title/meta**: edit the defaults in `index.html` and per-page values passed
  to the `<SEO>` component.

## How to add SEO metadata

Every page renders `<SEO title="..." description="..." path="/route" />`
(see `src/components/SEO.jsx`). It sets `document.title`, the meta description,
canonical link and basic Open Graph tags at runtime — no extra dependency needed.
For a new tool page, pass a unique `seoTitle` and `description` to
`<ToolPageShell>` (these are forwarded to `<SEO>` automatically).

If you later need pre-rendered (not just client-side) meta tags for search engine
crawlers, consider migrating to a static-site generator or adding a prerendering
step (e.g. `vite-plugin-ssr`, `react-snap`) — not required for the MVP.

## How to add future monetization

The MVP intentionally ships with **no ads, no premium plan, and no payments**, but
the architecture leaves room to add them later without a redesign:

- **Ads**: `src/components/AdPlaceholder.jsx` is already wired into the home page
  and every tool page. It renders nothing while `VITE_ADS_ENABLED` is unset/false.
  To turn ads on, set `VITE_ADS_ENABLED=true` in your environment and fill in the
  actual ad script/component inside `AdPlaceholder`.
- **Premium plan / batch processing / larger files / API access**: these are
  natural extensions of the current tool components (e.g. a `maxSizeMB` prop
  already exists on `FileDropzone`) — introduce a plan/tier check where relevant
  once you have a backend and auth in place. None of this is required for the MVP.

## Testing checklist

Before shipping changes, verify:

- [ ] `npm install` completes without errors
- [ ] `npm run dev` starts and the homepage loads
- [ ] Header navigation (Tools, Categories, About, Privacy) works
- [ ] Search returns relevant results and shows "No tools found." when appropriate
- [ ] Mobile layout (hamburger menu, one/two-column grids) works at 320–430px
- [ ] Dark mode toggle works and persists on reload
- [ ] Each calculator produces correct results and clears properly
- [ ] Image tools: upload, preview, process and download all work; invalid files
      show a friendly error instead of crashing
- [ ] PDF tools: upload, reorder, merge/generate/compress and download all work
- [ ] Text tools update live and copy/clear buttons work
- [ ] All download buttons produce a real, openable file
- [ ] `npm run build` completes with zero errors
- [ ] `npm run preview` serves the production build correctly

## License

You own this codebase — use, modify and deploy it as you see fit.
