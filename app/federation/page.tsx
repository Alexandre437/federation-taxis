// app/federation/page.tsx
export default function Federation() {
  const committee: Member[] = [
    { name: "Jean Dupont", role: "Président",  email: "president@federation-taxis-ge.ch" },
    { name: "Marie Martin", role: "Vice-présidente" },
    { name: "Ali Ahmed",    role: "Trésorier", email: "tresorier@federation-taxis-ge.ch" },
    { name: "Sophie Laurent", role: "Secrétaire" },
    { name: "—", role: "Membre du comité" },
  ];

  return (
    <div style={{ display: "grid", gap: 24 }}>
      {/* Intro */}
      <section style={styles.block}>
        <h1 style={styles.h1}>La Fédération</h1>
        <p style={styles.p}>
          La Fédération des Taxis de Genève représente les chauffeurs
          auprès des autorités et des partenaires, défend la profession et
          promeut un service de qualité pour le public.
        </p>
      </section>

      {/* Missions */}
      <section style={styles.block}>
        <h2 style={styles.h2Red}>Nos missions</h2>
        <ul style={styles.list}>
          <li>Dialogue avec les autorités, l’aéroport et les partenaires.</li>
          <li>Publication des courriers officiels et informations publiques.</li>
          <li>Accompagnement des chauffeurs (adhésions, formations).</li>
          <li>Promotion d’un service sûr, équitable et transparent.</li>
        </ul>
      </section>

      {/* Committee */}
      <section style={styles.block}>
        <h2 style={styles.h2Yellow}>Comité & Bureau</h2>
        <div style={styles.grid}>
          {committee.map((m, i) => (
            <article key={i} style={styles.card}>
              <div style={styles.cardName}>{m.name}</div>
              <div style={styles.cardRole}>{m.role}</div>
              {m.email && <div style={styles.cardMeta}>{m.email}</div>}
              {m.phone && <div style={styles.cardMeta}>{m.phone}</div>}
            </article>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section style={styles.block}>
        <h2 style={styles.h2Red}>Contact</h2>
        <p style={styles.p}>
          📍 Rue du Rhône 15, 1204 Genève<br />
          📞 +41 22 123 45 67<br />
          ✉️ <a href="mailto:contact@federation-taxis-ge.ch" style={styles.link}>
            contact@federation-taxis-ge.ch
          </a>
        </p>
      </section>
    </div>
  );
}

type Member = { name: string; role: string; email?: string; phone?: string };

const styles: Record<string, React.CSSProperties> = {
  block: {
    border: "1px solid #27272a",
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#0b0b0b",
  },
  h1: { fontSize: 28, fontWeight: 900, margin: 0, color: "#fff" },
  h2Red: { fontSize: 18, fontWeight: 800, margin: "0 0 10px", color: "#fca5a5" },
  h2Yellow: { fontSize: 18, fontWeight: 800, margin: "0 0 10px", color: "#facc15" },
  p: { color: "#d4d4d8", lineHeight: 1.6, margin: "8px 0 0" },
  list: { color: "#d4d4d8", lineHeight: 1.8, margin: 0, paddingLeft: 18 },
  grid: {
    display: "grid",
    gap: 12,
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
  },
  card: {
    border: "1px solid #27272a",
    borderRadius: 12,
    padding: 14,
    backgroundColor: "#0f0f10",
  },
  cardName: { color: "#fff", fontWeight: 700, marginBottom: 4 },
  cardRole: { color: "#facc15", fontWeight: 700, marginBottom: 6 },
  cardMeta: { color: "#a1a1aa", fontSize: 14 },
  link: { color: "#facc15", textDecoration: "none", fontWeight: 700 },
};
