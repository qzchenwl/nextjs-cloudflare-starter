import { format } from "date-fns";

import type { NoteRecord } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type NoteListProps = {
  notes: NoteRecord[];
};

export function NoteList({ notes }: NoteListProps) {
  if (!notes.length) {
    return (
      <div className="rounded-xl border border-dashed bg-muted/30 p-12 text-center text-muted-foreground">
        No notes yet. Add your first text snippet or drop an image above.
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}

type NoteCardProps = {
  note: NoteRecord;
};

function NoteCard({ note }: NoteCardProps) {
  const isImage = note.type === "image";
  const readableDate = format(new Date(note.createdAt), "PPpp");
  const imageSrc = isImage && note.imageKey
    ? `/api/images/${note.imageKey.split("/").map(encodeURIComponent).join("/")}`
    : undefined;

  return (
    <Card className="flex h-full flex-col">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div className="space-y-2">
          <Badge variant={isImage ? "secondary" : "default"}>
            {isImage ? "Image" : "Text"}
          </Badge>
          <p className="text-sm text-muted-foreground">{readableDate}</p>
        </div>
        {note.content ? (
          <span className="max-w-[200px] truncate text-right text-sm font-medium text-muted-foreground">
            {note.content}
          </span>
        ) : null}
      </CardHeader>
      <CardContent className="space-y-4">
        {isImage && imageSrc ? (
          <div className="overflow-hidden rounded-lg border bg-muted/20">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={imageSrc}
              alt={note.content ?? "Uploaded note image"}
              className="h-64 w-full object-cover"
            />
          </div>
        ) : (
          <p className="whitespace-pre-wrap text-sm leading-6 text-foreground">
            {note.content}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
