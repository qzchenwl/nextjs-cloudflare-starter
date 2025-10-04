import { NextResponse } from "next/server";

import { getOptionalEnv } from "@/lib/cloudflare";

type DiagnosticEntry = {
  scope: "env" | "d1" | "r2" | "runtime";
  message: string;
  stack?: string;
};

function formatUnknownError(error: unknown) {
  if (error instanceof Error) {
    return {
      message: error.message,
      stack: error.stack,
    };
  }

  if (typeof error === "string") {
    return { message: error };
  }

  try {
    return { message: JSON.stringify(error) };
  } catch {
    return { message: "Unknown error" };
  }
}

export const runtime = "edge";

export async function GET() {
  const diagnostics: DiagnosticEntry[] = [];

  const env = (() => {
    try {
      const contextEnv = getOptionalEnv();

      if (!contextEnv) {
        diagnostics.push({
          scope: "env",
          message:
            "Cloudflare request context was not detected. Confirm this route is running on Pages Functions.",
        });
      }

      return contextEnv;
    } catch (error) {
      const formatted = formatUnknownError(error);
      diagnostics.push({
        scope: "runtime",
        message: `getOptionalEnv() threw: ${formatted.message}`,
        stack: formatted.stack,
      });

      return null;
    }
  })();

  const d1 = await (async () => {
    if (!env?.DB) {
      diagnostics.push({
        scope: "d1",
        message: "No D1 binding named `DB` was present on the Cloudflare environment for this request.",
      });

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
      const formatted = formatUnknownError(error);

      diagnostics.push({
        scope: "d1",
        message: `D1 query failed: ${formatted.message}`,
        stack: formatted.stack,
      });

      return {
        configured: false,
        message: "The D1 binding is defined but the query failed.",
        error: formatted.message,
      } as const;
    }
  })();

  const r2 = await (async () => {
    if (!env?.R2) {
      diagnostics.push({
        scope: "r2",
        message: "No R2 binding named `R2` was present on the Cloudflare environment for this request.",
      });

      return {
        configured: false,
        message:
          "Add an R2 binding named `R2` in wrangler.toml to access your bucket from the Edge runtime.",
      } as const;
    }

    try {
      const { objects } = await env.R2.list({ limit: 5 });

      return {
        configured: true,
        sampleKeys: objects.map((object) => object.key),
      } as const;
    } catch (error) {
      const formatted = formatUnknownError(error);

      diagnostics.push({
        scope: "r2",
        message: `R2 list operation failed: ${formatted.message}`,
        stack: formatted.stack,
      });

      return {
        configured: false,
        message: "The R2 binding is defined but listing objects failed.",
        error: formatted.message,
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
    diagnostics:
      diagnostics.length > 0
        ? {
            timestamp: new Date().toISOString(),
            envDetected: Boolean(env),
            bindings: {
              d1: Boolean(env?.DB),
              r2: Boolean(env?.R2),
            },
            errors: diagnostics,
          }
        : undefined,
  });
}
