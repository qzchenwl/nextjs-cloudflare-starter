import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    message: "Hello from Cloudflare Pages!",
    docs: {
      next: "https://nextjs.org/docs",
      tailwind: "https://tailwindcss.com/docs",
      shadcn: "https://ui.shadcn.com",
      cloudflare: "https://developers.cloudflare.com/pages/",
    },
  });
}
