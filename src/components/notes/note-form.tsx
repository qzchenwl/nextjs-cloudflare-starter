"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import type { ChangeEvent } from "react";

import { createNote, type NoteActionState } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const initialState: NoteActionState = { success: false };

type NoteType = "text" | "image";

export function NoteForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(createNote, initialState);
  const [noteType, setNoteType] = useState<NoteType>("text");

  useEffect(() => {
    if (state.success && formRef.current) {
      formRef.current.reset();
      setNoteType("text");
    }
  }, [state.success]);

  return (
    <form
      ref={formRef}
      action={formAction}
      className="space-y-6 rounded-xl border bg-card/70 p-6 shadow-sm"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="type">Note type</Label>
          <Select
            id="type"
            name="type"
            value={noteType}
            onChange={(event: ChangeEvent<HTMLSelectElement>) =>
              setNoteType(event.target.value as NoteType)
            }
            disabled={isPending}
          >
            <option value="text">Text note</option>
            <option value="image">Image upload</option>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="caption">Optional caption</Label>
          <Input
            id="caption"
            name="caption"
            placeholder="Add a short description"
            maxLength={200}
            disabled={isPending}
          />
        </div>
      </div>

      {noteType === "text" ? (
        <div className="space-y-2">
          <Label htmlFor="content">Text note</Label>
          <Textarea
            id="content"
            name="content"
            placeholder="Capture an idea, reminder, or snippet"
            minLength={3}
            rows={6}
            disabled={isPending}
          />
        </div>
      ) : (
        <div className="space-y-2">
          <Label htmlFor="image">Upload image</Label>
          <Input id="image" name="image" type="file" accept="image/*" disabled={isPending} />
          <p className="text-xs text-muted-foreground">
            Supported formats depend on your Cloudflare R2 bucket configuration. Images are limited to 5MB for this demo.
          </p>
        </div>
      )}

      {state.error ? (
        <p className="text-sm font-medium text-destructive">{state.error}</p>
      ) : state.success ? (
        <p className="text-sm font-medium text-primary">Note saved successfully.</p>
      ) : null}

      <Button type="submit" disabled={isPending} className="w-full md:w-auto">
        {isPending ? "Saving…" : "Save note"}
      </Button>
    </form>
  );
}
