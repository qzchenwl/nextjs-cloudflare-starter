import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export type NoteRecord = {
  id: string;
  type: "text" | "image";
  content: string | null;
  imageKey: string | null;
  createdAt: string;
};
