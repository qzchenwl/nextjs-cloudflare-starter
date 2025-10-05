# Next.js Cloudflare Workers starter

This project scaffolds a modern Next.js 15 application ready to run on Cloudflare Workers using the official OpenNext adapter. It ships with Tailwind CSS 3, shadcn/ui primitives, TypeScript, and storage bindings for both D1 and R2 so you can persist rich notes that contain either text or uploaded images.

## Features

- ⚡️ Next.js 15 with the App Router and React 19, adapted for Workers via [`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare).
- 🎨 Tailwind CSS 3 and shadcn/ui components for rapid, composable styling.
- 💾 Cloudflare D1 database (`nextjs-cloudflare-starter-db`) for structured note storage.
- 🗂️ Cloudflare R2 bucket (`nextjs-cloudflare-starter-assets`) for user-uploaded note images.
- ✅ TypeScript-first setup with ESLint, type checking, and `wrangler` helpers.

The starter follows the [Deploying Next.js apps to Cloudflare Workers with the OpenNext adapter](https://blog.cloudflare.com/deploying-nextjs-apps-to-cloudflare-workers-with-the-opennext-adapter/) guide so local development mirrors the production environment as closely as possible.

## Getting started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Generate Cloudflare type definitions whenever bindings change:

   ```bash
   npm run cf-typegen
   ```

3. Start the Next.js development server:

   ```bash
   npm run dev
   ```

   The dev server runs with the OpenNext adapter hooks enabled, so server actions and API routes can access Cloudflare bindings through `getCloudflareContext()`.

4. Build the production bundle and package the Worker output (this generates `.open-next/worker.js` for Wrangler deploys):

   ```bash
   npm run build
   ```

5. To preview the Worker locally (using Miniflare + Wrangler):

   ```bash
   npm run preview
   ```

6. Deploy to Cloudflare:

   ```bash
   npm run deploy
   ```

## D1 & R2 bindings

The project expects the following resources, already declared in `wrangler.jsonc`:

- **D1 database**: `nextjs-cloudflare-starter-db` (ID `057a06ef-544d-4ab3-b464-9288c72c0831`) bound as `DB`.
- **R2 bucket**: `nextjs-cloudflare-starter-assets` bound as `NOTE_IMAGES`.

The application lazily creates the `notes` table and index if they are missing, but you can also apply the schema ahead of time:

```bash
wrangler d1 execute nextjs-cloudflare-starter-db --local --file=database/schema.sql
```

When running against a remote environment, omit `--local`.

## Project structure

```
├── cloudflare-env.d.ts     # Cloudflare binding types for type-safe env access
├── database/schema.sql     # SQL migrations for the D1 database
├── src/
│   ├── app/                # App Router routes, API handlers, and server actions
│   ├── components/         # shadcn-inspired UI primitives and features
│   └── lib/                # Shared helpers and database queries
└── wrangler.jsonc          # Cloudflare bindings and Worker configuration
```

## Notes demo

The home page provides a simple note-taking experience:

- **Text notes** are written to D1.
- **Image notes** stream uploads to R2, while metadata is stored alongside other note fields in D1.
- Notes are displayed in a responsive grid powered by shadcn/ui cards and Tailwind CSS.

This scaffold gives you an opinionated baseline for building richer Workers-native products with Next.js and the OpenNext adapter. Customize, extend, and deploy! 🚀
