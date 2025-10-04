import type { Metadata } from "next";
import "./globals.css";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Next.js Cloudflare Starter",
  description:
    "Opinionated starter kit with Next.js 15, Tailwind CSS v4, shadcn/ui, and Cloudflare Pages deployment via OpenNext.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("min-h-screen bg-background font-sans text-foreground antialiased")}>{children}</body>
    </html>
  );
}
