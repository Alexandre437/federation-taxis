// app/api/members/route.ts
import { NextResponse } from "next/server";
import type { MembersManifest } from "@/types/members";
import { list } from "@vercel/blob";

export async function GET() {
  const key = process.env.MEMBERS_MANIFEST_KEY!;
  try {
    const { blobs } = await list({ prefix: key });
    const file = blobs.find((b) => b.pathname === key);

    if (!file) {
      const empty: MembersManifest = { items: [], updatedAt: new Date().toISOString() };
      return NextResponse.json(empty);
    }

    const res = await fetch(file.url, { cache: "no-store" });
    const data = (await res.json()) as MembersManifest;
    return NextResponse.json(data);
  } catch {
    const empty: MembersManifest = { items: [], updatedAt: new Date().toISOString() };
    return NextResponse.json(empty);
  }
}

