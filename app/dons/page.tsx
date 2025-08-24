// app/dons/page.tsx
export default function Dons() {
  return (
    <div style={{ display: "grid", gap: 24 }}>
      {/* Intro */}
      <section style={styles.block}>
        <h1 style={styles.h1}>Soutenir la Fédération</h1>
        <p style={styles.p}>
          Vos dons nous aident à représenter la profession, informer le public et
          améliorer la qualité du service taxi à Genève. Merci pour votre soutien 🙏
        </p>
      </section>

      {/* Bank info */}
      <section style={styles.block}>
        <h2 style={styles.h2Yellow}>Coordonnées bancaires</h2>
        <div style={styles.kv}>
          <div>IBAN</div>
          <div style={styles.kvVal}><strong>CH00 1234 5678 9012 3456 7</strong></div>

          <div>Bénéficiaire</div>
          <div style={styles.kvVal}>Fédération des Taxis de Genève</div>

          <div>Adresse</div>
          <div style={styles.kvVal}>Rue du Rhône 15, 1204 Genève</div>

          <div>Communication</div>
          <div style={styles.kvVal}>Don de soutien</div>
        </div>
      </section>

      {/* CTA (placeholder for QR) */}
      <section style={styles.block}>
        <h2 style={styles.h2Red}>Autres moyens</h2>
        <p style={styles.p}>
          Prochainement: QR-facture et options de paiement en ligne.
          Pour toute question:{" "}
          <a href="mailto:dons@federation-taxis-ge.ch" style={styles.link}>
            dons@federation-taxis-ge.ch
          </a>
        </p>
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
  h2Yellow: { fontSize: 18, fontWeight: 800, margin: "0 0 10px", color: "#facc15" },
  h2Red: { fontSize: 18, fontWeight: 800, margin: "0 0 10px", color: "#fca5a5" },
  p: { color: "#d4d4d8", lineHeight: 1.6, margin: "8px 0 0" },
  link: { color: "#facc15", textDecoration: "none", fontWeight: 700 },
  kv: {
    display: "grid",
    gridTemplateColumns: "130px 1fr",
    gap: 8,
    color: "#d4d4d8",
    alignItems: "center",
  },
  kvVal: { color: "#fff" },
};


