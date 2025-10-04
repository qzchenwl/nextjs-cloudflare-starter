import type { D1Database, R2Bucket } from "@cloudflare/workers-types";

export {};

declare global {
  interface CloudflareEnv {
    DB?: D1Database;
    R2?: R2Bucket;
  }
}
