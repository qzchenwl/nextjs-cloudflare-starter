import { getRequestContext } from "@cloudflare/next-on-pages";

export type CloudflareEnv = {
  DB?: D1Database;
  R2?: R2Bucket;
};

export function getOptionalRequestContext() {
  try {
    return getRequestContext<CloudflareEnv>();
  } catch (error) {
    return null;
  }
}

export function getOptionalEnv() {
  return getOptionalRequestContext()?.env ?? null;
}
