import { NoteForm } from "@/components/notes/note-form";
import { NoteList } from "@/components/notes/note-list";
import { fetchNotes } from "@/lib/notes";

export default async function Home() {
  const notes = await fetchNotes();

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <h2 className="text-xl font-semibold tracking-tight">Add a new note</h2>
        <p className="text-sm text-muted-foreground">
          Text notes are persisted inside Cloudflare D1, while images are uploaded to R2 and referenced from the database.
        </p>
        <NoteForm />
      </section>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Recent notes</h2>
          <p className="text-sm text-muted-foreground">
            Data loads directly from Cloudflare resources at request-time using the OpenNext adapter.
          </p>
        </div>
        <NoteList notes={notes} />
      </section>
    </div>
  );
}
