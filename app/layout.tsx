import type { Metadata } from "next";
import { Inter } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js + Cloudflare Pages Starter",
  description:
    "A ready-to-use Next.js scaffold optimized for Cloudflare Pages with Tailwind CSS and shadcn/ui.",
  metadataBase: new URL("https://example.com"),
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
