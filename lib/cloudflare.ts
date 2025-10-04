import { getOptionalRequestContext, getRequestContext } from "@cloudflare/next-on-pages";

export type CloudflareBindings = CloudflareEnv;

export function getSafeRequestContext():
  | ReturnType<typeof getRequestContext>
  | null {
  try {
    return getRequestContext();
  } catch (error) {
    return null;
  }
}

export function getOptionalEnv(): CloudflareEnv | null {
  return getOptionalRequestContext()?.env ?? getSafeRequestContext()?.env ?? null;
}
