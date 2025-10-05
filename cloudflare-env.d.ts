import type { D1Database, R2Bucket } from "@cloudflare/workers-types";

declare global {
  interface CloudflareEnv {
    DB: D1Database;
    NOTE_IMAGES: R2Bucket;
  }
}

export {};
