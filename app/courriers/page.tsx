// app/courriers/page.tsx
import Link from "next/link";
import { letters } from "@/data/letters";

export default function Courriers() {
  const published = letters
    .filter((l) => l.published !== false)
    .sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <div style={{ display: "grid", gap: 24 }}>
      {/* Intro */}
      <section style={styles.block}>
        <h1 style={styles.h1}>Courriers</h1>
        <p style={styles.p}>
          Ici seront publiés les courriers officiels de la Fédération des Taxis de Genève.
          Vous pourrez les consulter en ligne et télécharger les PDF dès leur disponibilité.
        </p>
      </section>

      {/* List */}
      <section style={styles.block}>
        {published.length === 0 ? (
          <p style={styles.p}>Aucun courrier publié pour le moment.</p>
        ) : (
          <ul style={styles.list}>
            {published.map((l) => (
              <li key={l.slug} style={styles.card}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>{l.title}</h3>
                  <div style={styles.cardDate}>
                    {new Date(l.date).toLocaleDateString()}
                  </div>
                </div>
                {l.summary && <p style={styles.cardText}>{l.summary}</p>}

                <div style={styles.cardActions}>
                  <Link
                    href={`/courriers/${l.slug}`}
                    style={{
                      ...styles.button,
                      ...styles.buttonPrimary,
                      textDecoration: "none",
                    }}
                  >
                    Voir la fiche →
                  </Link>

                  {l.pdfUrl ? (
                    <a
                      href={l.pdfUrl}
                      target="_blank"
                      style={{ ...styles.button, ...styles.buttonGhost }}
                    >
                      📄 Télécharger le PDF
                    </a>
                  ) : (
                    <span style={styles.badgeMuted}>PDF à venir</span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        )}
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
  h1: { fontSize: 28, fontWeight: 900, margin: 0, color: "#fff" },
  p: { color: "#d4d4d8", lineHeight: 1.6, margin: "8px 0 0" },

  list: {
    listStyle: "none",
    margin: 0,
    padding: 0,
    display: "grid",
    gap: 12,
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
  },
  card: {
    border: "1px solid #27272a",
    borderRadius: 12,
    padding: 14,
    backgroundColor: "#0f0f10",
    display: "grid",
    gap: 10,
  },
  cardHeader: { display: "flex", justifyContent: "space-between", gap: 8 },
  cardTitle: { color: "#facc15", fontWeight: 800, margin: 0, fontSize: 18 },
  cardDate: { color: "#a1a1aa", fontSize: 12, whiteSpace: "nowrap" },
  cardText: { color: "#e4e4e7", margin: 0, lineHeight: 1.5 },

  cardActions: { display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" },
  button: {
    display: "inline-block",
    padding: "8px 12px",
    borderRadius: 10,
    fontWeight: 800,
    fontSize: 14,
    cursor: "pointer",
  },
  buttonPrimary: { backgroundColor: "#facc15", color: "#000" },
  buttonGhost: {
    backgroundColor: "rgba(255,255,255,0.06)",
    color: "#fff",
    border: "1px solid #3f3f46",
    textDecoration: "none",
  },
  badgeMuted: {
    color: "#a1a1aa",
    fontSize: 12,
    padding: "4px 8px",
    border: "1px dashed #3f3f46",
    borderRadius: 8,
  },
};
