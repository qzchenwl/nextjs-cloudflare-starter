import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const features = [
  {
    title: "Tailwind CSS v4",
    description:
      "Configured with the @tailwindcss/postcss pipeline and modern CSS-first theming so you can design with tokens instantly.",
  },
  {
    title: "shadcn/ui essentials",
    description:
      "Composable primitives such as buttons, cards, inputs, and badges are ready to use with sensible defaults.",
  },
  {
    title: "Cloudflare optimized",
    description:
      "OpenNext handles the Pages build output, edge runtime, and incremental cache wiring for Cloudflare Workers.",
  },
];

const commands = [
  {
    label: "Install dependencies",
    command: "npm install",
  },
  {
    label: "Start local dev server",
    command: "npm run dev",
  },
  {
    label: "Adapt for Cloudflare",
    command: "npm run cloudflare:build",
  },
];

export default function Home() {
  return (
    <main className="relative overflow-hidden pb-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 flex justify-center">
        <div className="h-[28rem] w-[56rem] rounded-full bg-primary/20 blur-3xl" aria-hidden />
      </div>
      <div className="relative mx-auto flex max-w-6xl flex-col gap-16 px-6 pt-24 lg:flex-row lg:items-start lg:pt-32">
        <div className="flex-1 space-y-8">
          <Badge variant="outline" className="w-fit bg-muted/60 text-muted-foreground">
            Cloudflare Pages ready
          </Badge>
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Ship edge-first apps with Next.js 15 in minutes
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground">
              This starter kit combines the Next.js App Router, Tailwind CSS v4, shadcn/ui components, and an OpenNext
              Cloudflare deployment pipeline so you can focus on product, not plumbing.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button size="lg">Start development</Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="https://opennext.js.org/cloudflare" target="_blank" rel="noreferrer">
                View Cloudflare docs
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 pt-8 sm:grid-cols-2">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="border-dashed border-border/60 bg-card/70 backdrop-blur transition hover:border-border"
              >
                <CardHeader className="space-y-2">
                  <CardTitle className="text-lg font-semibold">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
        <Card className="w-full max-w-md border border-border/70 bg-card/80 shadow-xl shadow-border/40 backdrop-blur">
          <CardHeader>
            <CardTitle>Edge preview request</CardTitle>
            <CardDescription>
              Mock the worker-bound API call this starter produces once you run the OpenNext adapter.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground" htmlFor="endpoint">
                Endpoint
              </label>
              <Input
                id="endpoint"
                readOnly
                defaultValue="https://nextjs-cloudflare-starter.pages.dev/api/hello"
                className="cursor-text bg-background/60"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground" htmlFor="payload">
                JSON payload
              </label>
              <Textarea
                id="payload"
                rows={4}
                className="bg-background/60"
                defaultValue='{"greeting":"Hello from the edge"}'
              />
            </div>
            <Button className="w-full">Send request</Button>
            <p className="text-xs leading-relaxed text-muted-foreground">
              The form is intentionally static and demonstrates how shadcn/ui controls inherit Tailwind CSS v4 tokens.
            </p>
          </CardContent>
        </Card>
      </div>
      <section className="relative mx-auto mt-24 max-w-5xl px-6">
        <div className="flex flex-wrap items-center gap-3">
          <Badge>Quick start</Badge>
          <span className="text-sm text-muted-foreground">
            Spin up a production-ready pipeline with just a few commands.
          </span>
        </div>
        <Card className="mt-6 border-border/70 bg-card/70 backdrop-blur">
          <CardContent className="grid gap-6 p-6 sm:grid-cols-3">
            {commands.map((command) => (
              <div key={command.label} className="space-y-3">
                <h3 className="text-sm font-semibold text-foreground/80">{command.label}</h3>
                <code className="block rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground shadow-sm">
                  {command.command}
                </code>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
