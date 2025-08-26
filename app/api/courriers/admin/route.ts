import { NextResponse } from "next/server";
import { put, list } from "@vercel/blob";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import type { Letter, LettersManifest } from "@/types/letters";

// simple slugify
function slugify(s: string) {
  return s
    .normalize("NFKD")
    .replace(/[\u0300-\u036F]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const role = session?.user?.role;
  if (!session || role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return new NextResponse("BLOB token missing", { status: 500 });
  }
  if (!process.env.LETTERS_MANIFEST_KEY) {
    return new NextResponse("LETTERS_MANIFEST_KEY missing", { status: 500 });
  }

  const form = await req.formData();
  const title = String(form.get("title") || "").trim();
  const date = String(form.get("date") || "").trim(); // YYYY-MM-DD
  const file = form.get("file") as File | null;

  if (!title || !date || !file) {
    return new NextResponse("title, date, file are required", { status: 400 });
  }
  if (file.type !== "application/pdf") {
    return new NextResponse("file must be a PDF", { status: 400 });
  }

  // Read current manifest (if any)
  const key = process.env.LETTERS_MANIFEST_KEY!;
  let manifest: LettersManifest = { items: [], updatedAt: new Date().toISOString() };

  try {
    const { blobs } = await list({ prefix: key });
    const existing = blobs.find((b) => b.pathname === key);
    if (existing) {
      const r = await fetch(existing.url, { cache: "no-store" });
      manifest = (await r.json()) as LettersManifest;
    }
  } catch {
    // keep empty manifest
  }

  // Create slug (dedupe by date+title)
  const base = slugify(`${title}-${date}`);
  let slug = base;
  let counter = 1;
  while (manifest.items.some((l) => l.slug === slug)) {
    slug = `${base}-${counter++}`;
  }

  // Upload PDF into Blob (public)
  const pdfKey = `letters/${slug}/${file.name.replace(/\s+/g, "-")}`;
  const pdfArrayBuf = await file.arrayBuffer();
  const pdfBuffer = Buffer.from(pdfArrayBuf);

  const uploaded = await put(pdfKey, pdfBuffer, {
    access: "public",
    contentType: "application/pdf",
    addRandomSuffix: true,          // avoid collisions
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  const newItem: Letter = {
    slug,
    title,
    date,          // assume valid YYYY-MM-DD
    pdfUrl: uploaded.url,
  };

  // Prepend newest first
  manifest.items = [newItem, ...manifest.items];
  manifest.updatedAt = new Date().toISOString();

  // Write manifest back
  await put(key, JSON.stringify(manifest, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  return NextResponse.json({ ok: true, item: newItem });
}
