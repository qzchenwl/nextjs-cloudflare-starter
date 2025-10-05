import { NextResponse } from "next/server";

import { getCloudflareContext } from "@opennextjs/cloudflare";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ key: string[] }> },
) {
  const resolvedParams = await params;
  const joinedKey = resolvedParams.key?.join("/") ?? "";
  const key = decodeURIComponent(joinedKey);

  if (!key) {
    return new NextResponse("Missing key", { status: 400 });
  }

  const { env } = await getCloudflareContext({ async: true });
  const object = await env.NOTE_IMAGES.get(key);

  if (!object) {
    return new NextResponse("Not found", { status: 404 });
  }

  const headers = new Headers();
  const contentType = object.httpMetadata?.contentType ?? "application/octet-stream";
  headers.set("Content-Type", contentType);
  headers.set("Cache-Control", "public, max-age=3600");
  if (object.httpEtag) {
    headers.set("ETag", object.httpEtag);
  }

  const body = object.body as unknown as ReadableStream;

  return new NextResponse(body, {
    status: 200,
    headers,
  });
}
