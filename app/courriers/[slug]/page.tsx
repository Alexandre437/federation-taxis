// app/courriers/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import type { LettersManifest } from "@/types/letters";

async function getData() {
  // Fetch live manifest from the API (no cache)
  const r = await fetch("/api/courriers", { cache: "no-store" });
  if (!r.ok) throw new Error("Impossible de charger les courriers");
  return (await r.json()) as LettersManifest;
}

export default async function CourrierDetail({ params }: { params: { slug: string } }) {
  const { items } = await getData();
  const letter = items.find((l) => l.slug === params.slug);
  if (!letter) notFound();

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <section style={styles.block}>
        <Link href="/courriers" style={{ color: "#60a5fa", textDecoration: "underline" }}>
          ← Retour
        </Link>

        <h1 style={styles.h1}>{letter.title}</h1>
        <div style={styles.meta}>
          Publié le {new Date(letter.date).toLocaleDateString()}
        </div>

        {/* If you later store a summary in the manifest, you can show it here */}
        {/* {letter.summary && <p style={styles.p}>{letter.summary}</p>} */}

        <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
          {letter.pdfUrl ? (
            <a
              href={letter.pdfUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                ...styles.button,
                background: "#facc15",
                color: "#000",
                textDecoration: "none",
              }}
            >
              📄 Télécharger le PDF
            </a>
          ) : (
            <span style={styles.badgeMuted}>PDF à venir</span>
          )}
        </div>
      </section>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  block: {
    border: "1px solid #27272a",
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#0b0b0b",
  },
  h1: { fontSize: 24, fontWeight: 900, margin: "8px 0 0", color: "#fff" },
  p: { color: "#d4d4d8", lineHeight: 1.6, margin: "8px 0 0" },
  meta: { color: "#a1a1aa", fontSize: 12, marginTop: 6 },
  button: {
    display: "inline-block",
    padding: "10px 14px",
    borderRadius: 10,
    fontWeight: 800,
    fontSize: 14,
    cursor: "pointer",
  },
  badgeMuted: {
    color: "#a1a1aa",
    fontSize: 12,
    padding: "4px 8px",
    border: "1px dashed #3f3f46",
    borderRadius: 8,
  },
};

