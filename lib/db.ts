import { getBindings } from "@/lib/cf";

export type Note = {
  id: number;
  body: string;
  created_at: string;
};

export async function getNotes(): Promise<Note[]> {
  try {
    const { DB } = getBindings();
    const { results } = await DB.prepare(
      "SELECT id, body, created_at FROM notes ORDER BY created_at DESC LIMIT 10"
    ).all<Note>();
    return results ?? [];
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Falling back to empty notes because D1 is not configured:", error);
      return [];
    }
    throw error;
  }
}

export async function createNote(body: string): Promise<Note> {
  const { DB } = getBindings();
  const now = new Date().toISOString();
  const { meta } = await DB.prepare(
    "INSERT INTO notes (body, created_at) VALUES (?1, ?2)"
  )
    .bind(body, now)
    .run();

  const id = Number(meta?.last_row_id ?? 0);
  return { id, body, created_at: now };
}
