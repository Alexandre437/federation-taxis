import { NextResponse } from "next/server";
import { list } from "@vercel/blob";
import type { LettersManifest } from "@/types/letters";

export async function GET() {
  const key = process.env.LETTERS_MANIFEST_KEY;
  if (!key) return new NextResponse("LETTERS_MANIFEST_KEY missing", { status: 500 });

  let manifest: LettersManifest = { items: [], updatedAt: new Date().toISOString() };

  try {
    const { blobs } = await list({ prefix: key });
    const file = blobs.find((b) => b.pathname === key);
    if (file) {
      const r = await fetch(file.url, { cache: "no-store" });
      manifest = (await r.json()) as LettersManifest;
    }
  } catch {
    
  }
    // keep empty
   

  return NextResponse.json(manifest);
}


