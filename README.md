# Next.js + Cloudflare Pages Starter

A modern Next.js scaffold that runs natively on [Cloudflare Pages](https://developers.cloudflare.com/pages/). It bundles Tailwind CSS 3, shadcn/ui, and TypeScript so you can move from idea to production quickly.

## Features

- **Next.js App Router** configured for TypeScript
- **Tailwind CSS 3** with shadcn/ui primitives and helper utilities
- **Cloudflare Pages ready** via [`@cloudflare/next-on-pages`](https://github.com/cloudflare/next-on-pages) and Wrangler scripts
- **Strict linting** using `eslint-config-next`
- Example API route and UI components to kickstart development

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or later
- [pnpm](https://pnpm.io/) (Corepack is enabled in this project)

## Getting started

```bash
pnpm install
pnpm dev
```

Open <http://localhost:3000> to view the application.

## Available scripts

- `pnpm dev` – start the Next.js development server
- `pnpm lint` – run ESLint with the project configuration
- `pnpm build` – create a production build
- `pnpm start` – run the production server locally
- `pnpm cf:build` – generate the Cloudflare Pages build output using `next-on-pages`
- `pnpm cf:preview` – preview the Cloudflare Pages build locally with Wrangler

## Deploying to Cloudflare Pages

1. Create a new Cloudflare Pages project and connect it to this repository.
2. Set the build command to `pnpm cf:build`.
3. Set the build output directory to `.vercel/output/static`.
4. Set the functions directory to `.vercel/output/functions` (Pages -> Functions).
5. Deploy. Wrangler configuration is provided in `wrangler.toml` for local previews.

## Adding shadcn/ui components

Run the shadcn/ui CLI to scaffold additional components:

```bash
pnpm dlx shadcn-ui@latest add <component>
```

This repository already includes the `Button` component and the `cn` utility from shadcn/ui.

## Project structure

```
app/            # App Router pages and API routes
components/     # Reusable UI components (shadcn/ui)
lib/            # Shared utilities
public/         # Static assets
```

Happy shipping! 🚀
