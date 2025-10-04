import type { CloudflareBindings as Bindings } from "@/types/bindings";

declare global {
  interface CloudflareBindings extends Bindings {}
}

export type { CloudflareBindings };
