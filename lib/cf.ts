import { getCloudflareContext } from "@opennextjs/cloudflare";

import type { CloudflareBindings } from "@/types/bindings";

type Bindings = CloudflareBindings;

export function getBindings(): Bindings {
  const { env } = getCloudflareContext({ async: false });
  if (!env) {
    throw new Error("Cloudflare bindings are not available in this context.");
  }
  return env as Bindings;
}
