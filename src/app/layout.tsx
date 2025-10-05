import type { Metadata } from "next";
import "./globals.css";
import type { ReactNode } from "react";
import { Inter, Roboto_Mono } from "next/font/google";

import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Cloudflare Notes",
  description: "Next.js + Cloudflare Workers starter with D1 and R2 storage",
};

const geistSans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const geistMono = Roboto_Mono({ subsets: ["latin"], variable: "--font-mono" });

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          geistSans.variable,
          geistMono.variable,
        )}
      >
        <div className="flex min-h-screen flex-col">
          <header className="border-b bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/80">
            <div className="container flex items-center justify-between py-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Next.js on Cloudflare Workers</p>
                <h1 className="text-2xl font-semibold tracking-tight">Notes workspace</h1>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                D1 + R2 demo
              </span>
            </div>
          </header>
          <main className="container flex-1 py-10">{children}</main>
          <footer className="border-t bg-card/60 py-4 text-center text-sm text-muted-foreground">
            Built with Next.js 15, Tailwind CSS, and shadcn/ui for Cloudflare Workers
          </footer>
        </div>
      </body>
    </html>
  );
}
