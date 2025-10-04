"use server";

import { revalidatePath } from "next/cache";

import { createNote } from "@/lib/db";

export async function addNote(formData: FormData) {
  const body = String(formData.get("body") ?? "").trim();
  if (!body) {
    throw new Error("Note body is required");
  }
  try {
    await createNote(body);
  } catch (error) {
    console.error("Failed to persist note:", error);
    throw new Error(
      "Unable to save note. Confirm your D1 binding is configured in wrangler.toml."
    );
  }
  revalidatePath("/");
}
