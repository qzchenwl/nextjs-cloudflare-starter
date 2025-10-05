import { NextResponse } from "next/server";

import { fetchNotes } from "@/lib/notes";

export async function GET() {
  const notes = await fetchNotes();
  return NextResponse.json({ notes });
}
