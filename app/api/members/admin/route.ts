// app/api/members/admin/route.ts
import { NextResponse } from "next/server";
import { get, put } from "@vercel/blob";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import type { Member, MembersManifest } from "@/types/members";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions as any);
  const role = (session?.user as any)?.role;
  if (!session || role !== "ADMIN") {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return new NextResponse("BLOB token missing", { status: 500 });
  }

  const body = (await req.json()) as Partial<Member>;
  const { email, name, memberId, paidUntil } = body;

  if (!email || !memberId || !paidUntil) {
    return new NextResponse("email, memberId, paidUntil are required", { status: 400 });
  }

  const key = process.env.MEMBERS_MANIFEST_KEY!;
  let manifest: MembersManifest = { items: [], updatedAt: new Date().toISOString() };

  try {
    const file = await get(key);
    const res = await fetch(file.url, { cache: "no-store" });
    manifest = (await res.json()) as MembersManifest;
  } catch {
    // no manifest yet, keep empty
  }

  const normalizedEmail = email.toLowerCase();
  const idx = manifest.items.findIndex((m) => m.email.toLowerCase() === normalizedEmail);
  const newItem: Member = {
    email: normalizedEmail,
    name: name?.trim() || manifest.items[idx]?.name || "",
    memberId: memberId.trim(),
    paidUntil: paidUntil.trim(),
  };

  if (idx >= 0) manifest.items[idx] = newItem;
  else manifest.items.unshift(newItem);

  manifest.updatedAt = new Date().toISOString();

  await put(key, JSON.stringify(manifest, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  return NextResponse.json({ ok: true, item: newItem });
}
