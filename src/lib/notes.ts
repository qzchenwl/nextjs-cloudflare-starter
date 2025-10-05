import { getCloudflareContext } from "@opennextjs/cloudflare";

import { ensureNotesSchema } from "@/lib/db";
import type { NoteRecord } from "@/lib/utils";

export async function fetchNotes(): Promise<NoteRecord[]> {
  const { env } = await getCloudflareContext({ async: true });

  try {
    await ensureNotesSchema(env.DB);

    const results = await env.DB.prepare(
      `SELECT id, type, content, image_key as imageKey, created_at as createdAt
       FROM notes
       ORDER BY datetime(created_at) DESC`
    ).all<NoteRecord>();

    if (!results || !results.results) {
      return [];
    }

    return results.results.map((row) => ({
      ...row,
      content: row.content ?? null,
      imageKey: row.imageKey ?? null,
    }));
  } catch (error) {
    console.warn("Unable to fetch notes from D1", error);
    return [];
  }
}
