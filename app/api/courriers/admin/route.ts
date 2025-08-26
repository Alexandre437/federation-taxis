import { NextResponse } from "next/server";
import { put, list } from "@vercel/blob";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import type { Letter, LettersManifest } from "@/types/letters";

export const runtime = "nodejs"; // Buffer support

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
  if (!session || session.user?.role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  if (!process.env.BLOB_READ_WRITE_TOKEN) return new NextResponse("BLOB token missing", { status: 500 });
  if (!process.env.LETTERS_MANIFEST_KEY) return new NextResponse("LETTERS_MANIFEST_KEY missing", { status: 500 });

  const form = await req.formData();
  const title = String(form.get("title") || "").trim();
  const date = String(form.get("date") || "").trim(); // YYYY-MM-DD
  const file = form.get("file") as File | null;

  if (!title || !date || !file) return new NextResponse("title, date, file are required", { status: 400 });
  if (file.type !== "application/pdf") return new NextResponse("file must be a PDF", { status: 400 });

  // read manifest
  const key = process.env.LETTERS_MANIFEST_KEY!;
  let manifest: LettersManifest = { items: [], updatedAt: new Date().toISOString() };
  try {
    const { blobs } = await list({ prefix: key });
    const existing = blobs.find((b) => b.pathname === key);
    if (existing) {
      const r = await fetch(existing.url, { cache: "no-store" });
      manifest = (await r.json()) as LettersManifest;
    }
  } catch {}

  // unique slug
  const base = slugify(`${title}-${date}`);
  let slug = base, i = 1;
  while (manifest.items.some((l) => l.slug === slug)) slug = `${base}-${i++}`;

  // upload PDF
  const pdfKey = `letters/${slug}/${file.name.replace(/\s+/g, "-")}`;
  const buf = Buffer.from(await file.arrayBuffer());
  const uploaded = await put(pdfKey, buf, {
    access: "public",
    contentType: "application/pdf",
    addRandomSuffix: true,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  // update manifest
  const newItem: Letter = { slug, title, date, pdfUrl: uploaded.url };
  manifest.items = [newItem, ...manifest.items];
  manifest.updatedAt = new Date().toISOString();

  await put(key, JSON.stringify(manifest, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  return NextResponse.json({ ok: true, item: newItem });
}
