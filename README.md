# Next.js Cloudflare Starter

Edge-first starter kit powered by Next.js 15, Tailwind CSS v4, shadcn/ui, and the OpenNext Cloudflare adapter. It bundles the latest Tailwind CSS pipeline, theme tokens, and reusable components so you can deploy to Cloudflare Pages with confidence.

## Features

- **Next.js 15 App Router** with TypeScript and Turbopack-ready scripts.
- **Tailwind CSS v4** configured through `@tailwindcss/postcss` and CSS cascade layers.
- **shadcn/ui** primitives (buttons, forms, cards, badges) preinstalled and themed via CSS variables.
- **Cloudflare Pages deployment** using `@opennextjs/cloudflare` with R2 incremental cache wiring and a ready-to-edit `wrangler.jsonc`.

## Getting started

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to view the app. Update `src/app/page.tsx` or add components under `src/components/ui` to customize the UI.

## Cloudflare workflows

The starter ships with convenience scripts for adapting and previewing the app with OpenNext:

```bash
# Produce the Cloudflare build output inside .open-next
npm run cloudflare:build
# (This also generates the `_worker.js` shim and `_routes.json` required by
# Cloudflare Pages deployments.)

# Preview the production worker locally with Wrangler
npm run cloudflare:preview

# Build and deploy with the OpenNext CLI
npm run cloudflare:deploy
```

Before deploying, create the referenced R2 bucket (default: `cache`) and authenticate Wrangler with your Cloudflare account.

## Tailwind CSS v4 notes

- Global styles live in `src/app/globals.css` and begin with `@import "tailwindcss";` followed by cascade layers and CSS variables.
- Theme tokens are defined via CSS variables (e.g. `--background`, `--ring`) and mirrored into Tailwind utilities with `@theme inline` declarations.
- Add additional utilities or components with the `@layer` directive or by extending the provided shadcn/ui components.

## Additional resources

- [Next.js documentation](https://nextjs.org/docs)
- [Tailwind CSS v4 documentation](https://tailwindcss.com)
- [shadcn/ui docs](https://ui.shadcn.com)
- [OpenNext Cloudflare guide](https://opennext.js.org/cloudflare)
- [Wrangler CLI reference](https://developers.cloudflare.com/workers/wrangler/)
