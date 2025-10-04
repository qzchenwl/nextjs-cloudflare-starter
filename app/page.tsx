import Link from "next/link";

import { Button } from "@/components/ui/button";

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

export default function HomePage() {
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
      </section>
    </main>
  );
}
