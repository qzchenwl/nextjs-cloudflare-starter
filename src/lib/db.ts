import type { D1Database } from "@cloudflare/workers-types";

const CREATE_NOTES_TABLE_SQL =
  "CREATE TABLE IF NOT EXISTS notes (" +
  " id TEXT PRIMARY KEY," +
  " type TEXT NOT NULL CHECK (type IN ('text', 'image'))," +
  " content TEXT," +
  " image_key TEXT," +
  " created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))" +
  ");";

const CREATE_NOTES_INDEX_SQL =
  "CREATE INDEX IF NOT EXISTS idx_notes_created_at ON notes(created_at DESC);";

let schemaInitialized: Promise<void> | undefined;

export async function ensureNotesSchema(db: D1Database): Promise<void> {
  if (!schemaInitialized) {
    schemaInitialized = (async () => {
      await db.exec(CREATE_NOTES_TABLE_SQL);
      await db.exec(CREATE_NOTES_INDEX_SQL);
    })()
      .catch((error) => {
        schemaInitialized = undefined;
        throw error;
      });
  }

  await schemaInitialized;
}
