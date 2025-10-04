import { NextResponse } from "next/server";

import { getOptionalEnv } from "@/lib/cloudflare";

export const runtime = "edge";

export async function GET() {
  const env = getOptionalEnv();

  const d1 = await (async () => {
    if (!env?.DB) {
      return {
        configured: false,
        message:
          "Add a D1 binding named `DB` in wrangler.toml to query your database from the Edge runtime.",
      } as const;
    }

    try {
      const { results } = await env.DB.prepare(
        "SELECT datetime('now') AS currentTime, 'D1 is ready to use 🚀' AS message"
      ).all();

      return {
        configured: true,
        results,
      } as const;
    } catch (error) {
      return {
        configured: false,
        message: "The D1 binding is defined but the query failed.",
        error: error instanceof Error ? error.message : String(error),
      } as const;
    }
  })();

  const r2 = await (async () => {
    if (!env?.ASSETS) {
      return {
        configured: false,
        message:
          "Add an R2 binding named `ASSETS` in wrangler.toml to access your bucket from the Edge runtime.",
      } as const;
    }

    try {
      const { objects } = await env.ASSETS.list({ limit: 5 });

      return {
        configured: true,
        sampleKeys: objects.map((object) => object.key),
      } as const;
    } catch (error) {
      return {
        configured: false,
        message: "The R2 binding is defined but listing objects failed.",
        error: error instanceof Error ? error.message : String(error),
      } as const;
    }
  })();

  return NextResponse.json({
    message: "Hello from Cloudflare Pages!",
    docs: {
      next: "https://nextjs.org/docs",
      tailwind: "https://tailwindcss.com/docs",
      shadcn: "https://ui.shadcn.com",
      cloudflare: "https://developers.cloudflare.com/pages/",
      d1: "https://developers.cloudflare.com/d1/",
      r2: "https://developers.cloudflare.com/r2/",
    },
    integrations: {
      d1,
      r2,
    },
  });
}
