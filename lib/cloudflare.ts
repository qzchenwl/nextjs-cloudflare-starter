import { getRequestContext } from "@cloudflare/next-on-pages";

export type CloudflareBindings = {
  DB?: D1Database;
  R2?: R2Bucket;
};

declare global {
  interface CloudflareEnv extends CloudflareBindings {}
}

export function getOptionalRequestContext() {
  try {
    return getRequestContext();
  } catch (error) {
    return null;
  }
}

export function getOptionalEnv(): CloudflareEnv | null {
  return getOptionalRequestContext()?.env ?? null;
}
