import Link from "next/link";

import { addNote } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { getNotes } from "@/lib/db";
import { ArrowUpRight } from "lucide-react";

export default async function HomePage() {
  const notes = await getNotes();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-10 px-6 py-16">
      <section className="space-y-4">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">
          Cloudflare Workers + OpenNext
        </p>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Full-stack Next.js starter for Workers, D1, and R2
        </h1>
        <p className="text-lg text-muted-foreground">
          This template wires up Tailwind CSS, shadcn/ui, and typed bindings for
          D1 and R2 so you can focus on building your application.
        </p>
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link
              href="https://opennext.js.org/cloudflare"
              className="flex items-center gap-1"
              target="_blank"
              rel="noreferrer"
            >
              OpenNext docs
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link
              href="https://developers.cloudflare.com/workers/platform/bindings/d1/"
              className="flex items-center gap-1"
              target="_blank"
              rel="noreferrer"
            >
              D1 quickstart
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
          <Button asChild variant="ghost">
            <Link
              href="https://developers.cloudflare.com/r2/"
              className="flex items-center gap-1"
              target="_blank"
              rel="noreferrer"
            >
              Learn about R2 storage
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-6 rounded-lg border bg-card p-6 shadow-sm">
        <header className="space-y-1">
          <h2 className="text-2xl font-semibold tracking-tight">D1 notes</h2>
          <p className="text-sm text-muted-foreground">
            Notes are stored in your Cloudflare D1 database. Update your
            <code className="mx-1 rounded bg-muted px-1 py-0.5">wrangler.toml</code>
            bindings and run the migration script to try it locally.
          </p>
        </header>
        <form action={addNote} className="flex flex-col gap-3 md:flex-row">
          <label className="sr-only" htmlFor="body">
            Add note
          </label>
          <input
            id="body"
            name="body"
            type="text"
            className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            placeholder="Share what you're building..."
          />
          <Button type="submit">Add note</Button>
        </form>
        <ul className="space-y-2 text-sm">
          {notes.length === 0 ? (
            <li className="text-muted-foreground">
              No notes yet. Populate the database with
              <code className="mx-1 rounded bg-muted px-1 py-0.5">
                npm run preview
              </code>
              after you configure D1.
            </li>
          ) : (
            notes.map((note) => (
              <li
                key={note.id}
                className="flex flex-col gap-1 rounded-md border border-border bg-background/60 p-3 shadow-sm"
              >
                <p>{note.body}</p>
                <time className="text-xs text-muted-foreground">
                  {new Date(note.created_at).toLocaleString()}
                </time>
              </li>
            ))
          )}
        </ul>
      </section>

      <section className="grid gap-4 rounded-lg border bg-card p-6 shadow-sm">
        <h2 className="text-2xl font-semibold tracking-tight">R2 storage</h2>
        <p className="text-sm text-muted-foreground">
          Use the R2 binding to store blobs close to your users. Check out the
          sample helper in <code className="mx-1 rounded bg-muted px-1 py-0.5">lib/r2.ts</code>
          for how to read and write objects.
        </p>
      </section>
    </main>
  );
}
