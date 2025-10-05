"use server";

import { revalidatePath } from "next/cache";

import { getCloudflareContext } from "@opennextjs/cloudflare";

export type NoteActionState = {
  success: boolean;
  error?: string;
};

const INSERT_NOTE_SQL = `
  INSERT INTO notes (id, type, content, image_key, created_at)
  VALUES (?1, ?2, ?3, ?4, ?5)
`;

export async function createNote(
  _prevState: NoteActionState,
  formData: FormData,
): Promise<NoteActionState> {
  const type = formData.get("type");
  if (type !== "text" && type !== "image") {
    return { success: false, error: "Please choose a valid note type." };
  }

  const { env } = await getCloudflareContext({ async: true });
  const db = env.DB;

  const id = crypto.randomUUID();
  const createdAt = new Date().toISOString();

  try {
    if (type === "text") {
      const content = (formData.get("content") ?? "").toString().trim();
      if (!content) {
        return { success: false, error: "Text notes cannot be empty." };
      }

      await db.prepare(INSERT_NOTE_SQL).bind(id, type, content, null, createdAt).run();
      revalidatePath("/");
      return { success: true };
    }

    const file = formData.get("image");
    if (!(file instanceof File)) {
      return { success: false, error: "Please attach an image to upload." };
    }

    if (!file.size) {
      return { success: false, error: "The selected image appears to be empty." };
    }

    const maxBytes = 5 * 1024 * 1024; // 5MB guardrail for demo purposes
    if (file.size > maxBytes) {
      return { success: false, error: "Images must be smaller than 5MB for this demo." };
    }

    const contentType = file.type || "application/octet-stream";
    const originalName = file.name || "upload";
    const sanitizedName = originalName.replace(/[^a-zA-Z0-9.\-_]/g, "_");
    const key = `notes/${createdAt.replace(/[:.]/g, "-")}-${id}-${sanitizedName}`;

    const arrayBuffer = await file.arrayBuffer();

    await env.NOTE_IMAGES.put(key, arrayBuffer, {
      httpMetadata: { contentType },
    });

    const captionValue = (formData.get("caption") ?? "").toString().trim() || null;

    await db.prepare(INSERT_NOTE_SQL).bind(id, type, captionValue, key, createdAt).run();
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to create note", error);
    return {
      success: false,
      error: "Something went wrong while saving the note. Please try again.",
    };
  }
}
