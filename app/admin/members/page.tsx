// app/admin/members/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";

type Member = {
  email: string;
  name?: string;
  memberId: string;
  paidUntil: string; // YYYY-MM-DD
};
type MembersManifest = { items: Member[]; updatedAt: string };

export default function AdminMembers() {
  const { data: session, status } = useSession();
  const role = (session?.user as { role?: "ADMIN" | "DRIVER" } | undefined)?.role;

  const [items, setItems] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Partial<Member>>({
    email: "",
    name: "",
    memberId: "",
    paidUntil: new Date().toISOString().slice(0, 10),
  });
  const [msg, setMsg] = useState<string | null>(null);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetch("/api/members", { cache: "no-store" });
      const data = (await res.json()) as MembersManifest;
      setItems(data.items || []);
      setLoading(false);
    }
    load();
  }, []);

  const filtered = useMemo(() => {
    const f = filter.trim().toLowerCase();
    if (!f) return items;
    return items.filter(
      (m) =>
        m.email.toLowerCase().includes(f) ||
        (m.name ?? "").toLowerCase().includes(f) ||
        m.memberId.toLowerCase().includes(f)
    );
  }, [items, filter]);

  if (status === "loading") return <div style={{ minHeight: "60vh" }}>Chargement…</div>;
  if (!session) return <div>Veuillez vous connecter…</div>;
  if (role !== "ADMIN") return <div>Accès refusé (ADMIN requis)</div>;

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (!form.email || !form.memberId || !form.paidUntil) {
      setMsg("email, n° membre et date sont requis");
      return;
    }
    const res = await fetch("/api/members/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (!res.ok) {
      setMsg("Erreur lors de l’enregistrement");
      return;
    }
    setMsg("Enregistré ✅");
    // Reload list
    const rel = await fetch("/api/members", { cache: "no-store" });
    const data = (await rel.json()) as MembersManifest;
    setItems(data.items || []);
  }

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <section style={styles.block}>
        <h1 style={styles.h1}>Admin · Adhésions</h1>
        <p style={styles.p}>Ajouter ou mettre à jour le statut d’un chauffeur (par email).</p>
      </section>

      <section style={styles.block}>
        <h2 style={styles.h2Yellow}>Ajouter / Mettre à jour</h2>
        <form onSubmit={handleSave} style={{ display: "grid", gap: 10, maxWidth: 560 }}>
          <input
            placeholder="Email"
            value={form.email ?? ""}
            onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
            style={styles.input}
          />
          <input
            placeholder="Nom (optionnel)"
            value={form.name ?? ""}
            onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
            style={styles.input}
          />
          <input
            placeholder="N° Membre (ex: FGTO-001)"
            value={form.memberId ?? ""}
            onChange={(e) => setForm((s) => ({ ...s, memberId: e.target.value }))}
            style={styles.input}
          />
          <input
            type="date"
            value={form.paidUntil ?? ""}
            onChange={(e) => setForm((s) => ({ ...s, paidUntil: e.target.value }))}
            style={styles.input}
          />
          <button type="submit" style={{ ...styles.button, ...styles.buttonPrimary }}>
            Enregistrer
          </button>
          {msg && <div style={{ color: "#facc15" }}>{msg}</div>}
        </form>
      </section>

      <section style={styles.block}>
        <h2 style={styles.h2Red}>Membres ({items.length})</h2>
        <input
          placeholder="Recherche: email, nom, n° membre…"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          style={{ ...styles.input, marginBottom: 10 }}
        />
        {loading ? (
          <div style={styles.p}>Chargement…</div>
        ) : filtered.length === 0 ? (
          <div style={styles.p}>Aucun résultat.</div>
        ) : (
          <div style={{ overflowX: "auto" }}>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Nom</th>
                  <th>N°</th>
                  <th>Valide jusqu’au</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((m) => (
                  <tr key={m.email} onClick={() => setForm(m)} style={{ cursor: "pointer" }}>
                    <td>{m.email}</td>
                    <td>{m.name ?? "—"}</td>
                    <td>{m.memberId}</td>
                    <td>{m.paidUntil}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ color: "#a1a1aa", fontSize: 12, marginTop: 8 }}>
              Cliquez une ligne pour pré-remplir le formulaire au-dessus.
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  block: { border: "1px solid #27272a", borderRadius: 16, padding: 16, backgroundColor: "#0b0b0b" },
  h1: { fontSize: 28, fontWeight: 900, margin: 0, color: "#fff" },
  h2Yellow: { fontSize: 18, fontWeight: 800, margin: "0 0 10px", color: "#facc15" },
  h2Red: { fontSize: 18, fontWeight: 800, margin: "0 0 10px", color: "#fca5a5" },
  p: { color: "#d4d4d8", lineHeight: 1.6, margin: "8px 0 0" },
  input: { padding: 10, borderRadius: 8, border: "1px solid #333", background: "#0f0f10", color: "#fff" },
  button: { display: "inline-block", padding: "10px 14px", borderRadius: 10, fontWeight: 800, fontSize: 14, cursor: "pointer" },
  buttonPrimary: { backgroundColor: "#facc15", color: "#000", border: "1px solid #facc15" },
  table: { width: "100%", borderCollapse: "collapse", color: "#e4e4e7" },
};
