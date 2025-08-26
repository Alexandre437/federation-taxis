"use client";

import { useEffect, useMemo, useState } from "react";
import type { LettersManifest, Letter } from "@/types/letters";

export default function AdminCourriersPage() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(""); // YYYY-MM-DD
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [letters, setLetters] = useState<Letter[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const r = await fetch("/api/courriers", { cache: "no-store" });
        const data = (await r.json()) as LettersManifest;
        setLetters(data.items || []);
      } catch {
        // ignore
      }
    })();
  }, []);

  const canSubmit = useMemo(() => !!title && !!date && !!file && !loading, [title, date, file, loading]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  if (!file) return;
  setLoading(true);
  setMessage(null);

  try {
    const fd = new FormData();
    fd.set("title", title);
    fd.set("date", date);
    fd.set("file", file);

    const r = await fetch("/api/courriers/admin", {
      method: "POST",
      body: fd,
    });

    if (!r.ok) {
      const txt = await r.text();
      throw new Error(txt || "Upload failed");
    }

    const data: unknown = await r.json();
    const item = (data as { item: Letter }).item;

    setLetters((prev) => [item, ...prev]);
    setTitle("");
    setDate("");
    setFile(null);
    setMessage("Courrier enregistré ✅");
  } catch (err: unknown) {              // ✅ use unknown instead of any
    setMessage(err instanceof Error ? err.message : "Erreur");
  } finally {
    setLoading(false);
  }
}


  return (
    <div className="mx-auto max-w-2xl p-6">
      <h1 className="text-2xl font-semibold mb-4">Admin · Courriers</h1>

      <form onSubmit={onSubmit} className="space-y-4 rounded-xl border p-4">
        <div>
          <label className="block text-sm font-medium mb-1">Titre</label>
          <input
            className="w-full rounded-md border px-3 py-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Grève du 14 mars 2025"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            className="w-full rounded-md border px-3 py-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">PDF</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="w-full"
            required
          />
        </div>

        <button
          type="submit"
          disabled={!canSubmit}
          className="rounded-md bg-black px-4 py-2 text-white disabled:opacity-50"
        >
          {loading ? "Enregistrement..." : "Enregistrer"}
        </button>

        {message && <p className="text-sm text-gray-700">{message}</p>}
      </form>

      <h2 className="mt-8 mb-2 text-lg font-medium">Courriers existants</h2>
      <ul className="space-y-2">
        {letters.map((l) => (
          <li key={l.slug} className="rounded-md border p-3">
            <div className="font-medium">{l.title}</div>
            <div className="text-sm text-gray-600">{l.date}</div>
            <a href={l.pdfUrl} target="_blank" rel="noreferrer" className="text-sm text-blue-600 underline">
              Ouvrir le PDF
            </a>
          </li>
        ))}
        {letters.length === 0 && <li className="text-sm text-gray-600">Aucun courrier pour le moment.</li>}
      </ul>
    </div>
  );
}
