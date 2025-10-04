# Next.js + Cloudflare Workers starter

A batteries-included scaffold for building full-stack applications with:

- [Next.js 15](https://nextjs.org/) running on Cloudflare Workers via the [OpenNext Cloudflare adapter](https://blog.cloudflare.com/deploying-nextjs-apps-to-cloudflare-workers-with-the-opennext-adapter/)
- TypeScript, Tailwind CSS 3, and [shadcn/ui](https://ui.shadcn.com)
- Cloudflare [D1](https://developers.cloudflare.com/d1/) for relational data and [R2 object storage](https://developers.cloudflare.com/r2/)

## Getting started

```bash
npm install
npm run dev
```

The development server runs locally using the Next.js dev server.

## Configure Cloudflare bindings

> These steps assume you have the [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/install-and-update/) installed and that you have run `wrangler login` to authenticate.

1. **Create the resources** (run once per account):

   ```bash
   wrangler d1 create nextjs-cloudflare-starter
   wrangler r2 bucket create nextjs-cloudflare-starter-assets
   ```

   Copy the resulting `database_id` and `bucket_name` into `wrangler.toml`. If you prefer the Cloudflare dashboard, the same resources can be created from Workers & Pages → D1 and R2.

2. **Wire the bindings for the Worker**: update the placeholders in `wrangler.toml`:

   ```toml
   [[d1_databases]]
   binding = "DB"
   database_name = "nextjs-cloudflare-starter"
   database_id = "<your-d1-database-id>"

   [[r2_buckets]]
   binding = "BUCKET"
   bucket_name = "<your-r2-bucket-name>"
   ```

   Additional environment variables can be added under the `[vars]` section or through `wrangler secret put <NAME>` if they should be hidden.

3. **Apply the initial database migration** locally or against production once the `DB` binding is configured:

   ```bash
   npm run db:migrate
   ```

4. **Run a local Workers preview** (uses the same bindings as production and executes in the Workers runtime):

   ```bash
   npm run preview
   ```

5. **Deploy to Cloudflare Workers** (this publishes the bundle produced by OpenNext):

   ```bash
   npm run deploy
   ```

### Optional: multiple environments

Add environments in `wrangler.toml` to target staging/production separately:

```toml
[env.staging]
name = "nextjs-cloudflare-starter-staging"

  [[env.staging.d1_databases]]
  binding = "DB"
  database_name = "nextjs-cloudflare-starter-staging"
  database_id = "<staging-d1-id>"

  [[env.staging.r2_buckets]]
  binding = "BUCKET"
  bucket_name = "<staging-r2-bucket>"
```

Deploy with `wrangler deploy --env staging` or preview with `wrangler dev --env staging`.

## Project structure

- `app/` – Next.js App Router pages and server actions
- `components/` – shadcn/ui primitives
- `lib/` – Utility helpers, including typed accessors for D1 and R2
- `migrations/` – SQL migrations for the D1 database

## Helpful resources

- [OpenNext Cloudflare adapter documentation](https://opennext.js.org/cloudflare)
- [Cloudflare Workers + Next.js guide](https://developers.cloudflare.com/workers/frameworks/framework-guides/nextjs/)
- [Tailwind CSS documentation](https://tailwindcss.com/)

