import { headers } from "next/headers";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export const runtime = "edge";
export const dynamic = "force-dynamic";

type IntegrationResult = {
  configured: boolean;
  message?: string;
  error?: string;
  results?: Array<{
    currentTime: string;
    message: string;
  }>;
  sampleKeys?: string[];
};

type DiagnosticEntry = {
  scope: "env" | "d1" | "r2" | "runtime";
  message: string;
  stack?: string;
};

type Diagnostics = {
  timestamp: string;
  envDetected: boolean;
  bindings: {
    d1: boolean;
    r2: boolean;
  };
  errors: DiagnosticEntry[];
};

type HelloResponse = {
  message: string;
  integrations: {
    d1: IntegrationResult;
    r2: IntegrationResult;
  };
  diagnostics?: Diagnostics;
};

const highlights = [
  {
    title: "Cloudflare-native",
    description:
      "Preconfigured build commands and wrangler tooling tailored for Cloudflare Pages deployments.",
  },
  {
    title: "D1 + R2 ready",
    description:
      "Edge API routes demonstrate how to run database queries and list objects using Cloudflare D1 and R2 bindings.",
  },
  {
    title: "Modern UI",
    description:
      "Tailwind CSS 3 with shadcn/ui primitives let you craft accessible interfaces quickly.",
  },
  {
    title: "Type-safe foundations",
    description:
      "TypeScript and strict linting keep your team productive and your codebase maintainable.",
  },
];

type HelloError = {
  error: string;
  diagnostics?: Diagnostics;
};

async function getIntegrationStatus(): Promise<HelloResponse | HelloError> {
  try {
    const headersList = headers();
    const host = headersList.get("x-forwarded-host") ?? headersList.get("host");
    const protocol = headersList.get("x-forwarded-proto") ?? (host?.includes("localhost") ? "http" : "https");
    const baseUrl = host
      ? `${protocol}://${host}`
      : process.env.NEXT_PUBLIC_SITE_URL ?? "http://127.0.0.1:3000";

    const response = await fetch(`${baseUrl}/api/hello`, {
      cache: "no-store",
    });

    let parsed: unknown = null;

    try {
      parsed = await response.json();
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.warn("Failed to parse /api/hello JSON response", error);
      }
    }

    if (response.ok && parsed && typeof parsed === "object") {
      return parsed as HelloResponse;
    }

    const diagnostics =
      parsed && typeof parsed === "object" && "diagnostics" in parsed
        ? (parsed as { diagnostics?: Diagnostics }).diagnostics
        : undefined;

    const message =
      parsed && typeof parsed === "object" && "message" in parsed && typeof (parsed as { message?: unknown }).message === "string"
        ? ((parsed as { message?: string }).message as string)
        : `Request failed with status ${response.status}`;

    return {
      error: message,
      diagnostics,
    } satisfies HelloError;
  } catch (error) {
    return {
      error:
        error instanceof Error
          ? error.message
          : "Unable to reach the /api/hello endpoint.",
    };
  }
}

export default async function HomePage() {
  const helloData = await getIntegrationStatus();
  const integrations = "integrations" in helloData ? helloData.integrations : null;
  const diagnostics = "diagnostics" in helloData ? helloData.diagnostics : null;

  return (
    <main className="flex min-h-screen flex-col bg-gradient-to-b from-background via-background to-muted">
      <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-10 px-6 py-24 text-center">
        <div className="space-y-4">
          <span className="inline-flex items-center rounded-full border border-border bg-card px-4 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground shadow-sm">
            Next.js · Cloudflare Pages · Tailwind CSS · shadcn/ui
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Launch faster with a Cloudflare Pages ready starter
          </h1>
          <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
            This scaffold bundles modern tooling and component primitives so you can deploy to Cloudflare Pages with confidence.
          </p>
        </div>
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="https://developers.cloudflare.com/pages/framework-guides/nextjs/">
              View Cloudflare Pages guide
            </Link>
          </Button>
          <Button variant="outline" asChild size="lg">
            <Link href="https://ui.shadcn.com/" target="_blank" rel="noreferrer">
              Explore shadcn/ui components
            </Link>
          </Button>
        </div>
        <dl className="grid w-full gap-6 rounded-2xl border border-border bg-card/80 p-8 shadow-lg backdrop-blur sm:grid-cols-3">
          {highlights.map((item) => (
            <div key={item.title} className="space-y-2">
              <dt className="text-sm font-semibold text-primary uppercase tracking-wide">
                {item.title}
              </dt>
              <dd className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </dd>
            </div>
          ))}
        </dl>
        <div className="w-full max-w-4xl space-y-6 rounded-2xl border border-border bg-card/90 p-8 text-left shadow-lg backdrop-blur">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-foreground">D1 + R2 demo endpoint</h2>
            <p className="text-sm text-muted-foreground">
              The <code className="rounded bg-muted px-1 py-0.5">/api/hello</code> API route runs on the Edge runtime. It executes a sample D1 query and lists the first five keys in your R2 bucket when bindings are configured.
            </p>
          </div>
          {"error" in helloData ? (
            <div className="space-y-3">
              <div className="rounded-lg border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive">
                {helloData.error}
              </div>
              {diagnostics && diagnostics.errors.length > 0 && (
                <DiagnosticPanel diagnostics={diagnostics} />
              )}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {(["d1", "r2"] as const).map((service) => {
                const integration = integrations?.[service];
                const isConfigured = integration?.configured ?? false;
                const title = service === "d1" ? "Cloudflare D1" : "Cloudflare R2";

                return (
                  <div key={service} className="space-y-3 rounded-xl border border-border bg-background/60 p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-semibold text-foreground">{title}</h3>
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          isConfigured
                            ? "bg-emerald-500/10 text-emerald-600"
                            : "bg-amber-500/10 text-amber-600"
                        }`}
                      >
                        {isConfigured ? "Configured" : "Pending setup"}
                      </span>
                    </div>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      {integration?.message && <p>{integration.message}</p>}
                      {integration?.error && (
                        <p className="rounded-md border border-destructive/40 bg-destructive/10 p-2 text-destructive">
                          {integration.error}
                        </p>
                      )}
                      {service === "d1" && integration?.results && integration.results.length > 0 && (
                        <div className="space-y-1 rounded-md border border-border/60 bg-muted/40 p-3 text-xs text-muted-foreground">
                          <p className="font-semibold text-foreground">Sample query results</p>
                          {integration.results.map((row) => (
                            <div key={row.currentTime} className="space-y-1">
                              <p>Current time: {row.currentTime}</p>
                              <p>{row.message}</p>
                            </div>
                          ))}
                        </div>
                      )}
                      {service === "r2" && integration?.sampleKeys && (
                        <div className="space-y-1 rounded-md border border-border/60 bg-muted/40 p-3 text-xs text-muted-foreground">
                          <p className="font-semibold text-foreground">Sample object keys</p>
                          {integration.sampleKeys.length > 0 ? (
                            <ul className="list-inside list-disc">
                              {integration.sampleKeys.map((key) => (
                                <li key={key}>{key}</li>
                              ))}
                            </ul>
                          ) : (
                            <p>No objects found in the bucket.</p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {diagnostics && diagnostics.errors.length > 0 && "integrations" in helloData && (
          <div className="w-full max-w-4xl">
            <DiagnosticPanel diagnostics={diagnostics} />
          </div>
        )}
      </section>
    </main>
  );
}

function DiagnosticPanel({ diagnostics }: { diagnostics: Diagnostics }) {
  return (
    <div className="space-y-4 rounded-2xl border border-border bg-background/70 p-6 text-left shadow-sm">
      <div className="space-y-1">
        <h3 className="text-lg font-semibold text-foreground">Runtime diagnostics</h3>
        <p className="text-sm text-muted-foreground">
          Timestamp: <code className="rounded bg-muted px-1 py-0.5 text-xs">{diagnostics.timestamp}</code>
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1 text-sm text-muted-foreground">
          <p>
            Cloudflare context detected: <span className="font-medium text-foreground">{diagnostics.envDetected ? "Yes" : "No"}</span>
          </p>
          <p>
            D1 binding available: <span className="font-medium text-foreground">{diagnostics.bindings.d1 ? "Yes" : "No"}</span>
          </p>
          <p>
            R2 binding available: <span className="font-medium text-foreground">{diagnostics.bindings.r2 ? "Yes" : "No"}</span>
          </p>
        </div>
        <div className="rounded-lg border border-border/60 bg-muted/40 p-3 text-xs text-muted-foreground">
          <p className="font-semibold text-foreground">Errors captured</p>
          <ul className="mt-2 space-y-2">
            {diagnostics.errors.map((entry, index) => (
              <li key={`${entry.scope}-${index}`} className="space-y-1">
                <p className="font-medium text-foreground">
                  [{entry.scope.toUpperCase()}] {entry.message}
                </p>
                {entry.stack && (
                  <details className="rounded-md border border-border/60 bg-background/70 p-2">
                    <summary className="cursor-pointer text-foreground">Stack trace</summary>
                    <pre className="mt-2 whitespace-pre-wrap text-xs leading-relaxed">{entry.stack}</pre>
                  </details>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
