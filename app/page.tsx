// app/page.tsx
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div style={styles.page}>
      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroInner}>
          <div style={styles.badge}>🚖 Fédération des Taxis de Genève</div>

          {/* Logo officiel FGTO */}
          <Image
            src="/images/taxi-logo.jpeg"
            alt="Logo FGTO"
            width={100}
            height={100}
            priority
            style={{ margin: "0 auto 16px", display: "block" }}
          />

          <h1 style={styles.title}>
            Le point de contact officiel des taxis à Genève
          </h1>
          <p style={styles.subtitle}>
            Nous représentons les chauffeurs licenciés, défendons la profession et
            informons le public. Accédez aux courriers officiels, découvrez le comité
            et soutenez nos actions.
          </p>

          <div style={styles.ctaRow}>
            <Link href="/courriers" style={{ ...styles.button, ...styles.buttonPrimary }}>
              Voir les courriers
            </Link>
            <Link href="/federation" style={{ ...styles.button, ...styles.buttonGhost }}>
              La Fédération
            </Link>
            <Link href="/login" style={{ ...styles.button, ...styles.buttonOutline }}>
              Espace Chauffeurs
            </Link>
          </div>
        </div>

        {/* Decorative gradient line */}
        <div style={styles.gradientLine} aria-hidden="true" />
      </section>

      {/* FEATURE CARDS */}
      <section style={styles.cardsSection}>
        <Card
          title="Courriers officiels"
          text="Nous publions ici les lettres adressées aux autorités et partenaires pour plus de transparence."
          href="/courriers"
          linkText="Accéder aux courriers"
        />
        <Card
          title="Comité & Bureau"
          text="Qui fait quoi ? Découvrez la composition du comité, nos missions et nos actions prioritaires."
          href="/federation"
          linkText="Voir l’organisation"
        />
        <Card
          title="Soutenir la Fédération"
          text="Aidez-nous à défendre la profession. Vos dons renforcent la représentation et la qualité du service."
          href="/dons"
          linkText="Faire un don"
        />
      </section>

      {/* CONTACT / INFO */}
      <section style={styles.infoSection}>
        <div style={styles.infoGrid}>
          <div style={styles.infoBlock}>
            <h2 style={styles.infoTitle}>Contact</h2>
            <p style={styles.infoText}>
              📍 Rue du Rhône 15, 1204 Genève<br />
              📞 +41 22 123 45 67<br />
              ✉️{" "}
              <a
                href="mailto:contact@federation-taxis-ge.ch"
                style={styles.link}
              >
                contact@federation-taxis-ge.ch
              </a>
            </p>
          </div>
          <div style={styles.infoBlock}>
            <h2 style={styles.infoTitle}>Horaires</h2>
            <p style={styles.infoText}>
              Lundi – Vendredi: 09:00–17:00<br />
              Assistance chauffeurs: 24/7 (membres)
            </p>
          </div>
          <div style={styles.infoBlock}>
            <h2 style={styles.infoTitle}>Réseaux</h2>
            <p style={styles.infoText}>
              Suivez nos annonces et communiqués.<br />
              (Icônes et liens à venir)
            </p>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <div style={styles.footerInner}>
          <div>© {new Date().getFullYear()} Fédération des Taxis de Genève</div>
          <div style={{ opacity: 0.7 }}>Qualité • Sécurité • Service</div>
        </div>
      </footer>
    </div>
  );
}

/* ---------- Small presentational components ---------- */

function Card(props: { title: string; text: string; href: string; linkText: string }) {
  return (
    <article style={styles.card}>
      <h3 style={styles.cardTitle}>{props.title}</h3>
      <p style={styles.cardText}>{props.text}</p>
      <Link href={props.href} style={{ ...styles.button, ...styles.cardButton }}>
        {props.linkText} →
      </Link>
    </article>
  );
}

/* ---------- Inline styles ---------- */

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "60vh",
  },
  hero: {
    position: "relative",
    padding: "24px",
    border: "1px solid #27272a",
    borderRadius: 16,
    background:
      "linear-gradient(180deg, rgba(250,204,21,0.06) 0%, rgba(153,27,27,0.06) 100%)",
    overflow: "hidden",
  },
  heroInner: {
    maxWidth: 960,
    margin: "0 auto",
    textAlign: "center" as const,
  },
  badge: {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: 999,
    background: "rgba(250,204,21,0.12)",
    color: "#facc15",
    fontWeight: 700,
    marginBottom: 12,
  },
  title: {
    fontSize: 38,
    lineHeight: 1.15,
    fontWeight: 900,
    margin: "8px 0 10px 0",
    color: "#fff",
  },
  subtitle: {
    color: "#d4d4d8",
    maxWidth: 820,
    margin: "0 auto",
    fontSize: 16,
  },
  ctaRow: {
    display: "flex",
    gap: 12,
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 18,
  },
  button: {
    display: "inline-block",
    textDecoration: "none",
    padding: "10px 14px",
    borderRadius: 10,
    fontWeight: 800,
    fontSize: 14,
    cursor: "pointer",
  },
  buttonPrimary: {
    backgroundColor: "#facc15",
    color: "#000",
  },
  buttonGhost: {
    backgroundColor: "rgba(255,255,255,0.06)",
    color: "#fff",
    border: "1px solid #3f3f46",
  },
  buttonOutline: {
    backgroundColor: "transparent",
    color: "#facc15",
    border: "1px solid #facc15",
  },
  gradientLine: {
    position: "absolute",
    inset: 0,
    pointerEvents: "none",
    background:
      "radial-gradient(1200px 300px at 50% 0%, rgba(250,204,21,0.1), transparent 60%)",
  },

  cardsSection: {
    display: "grid",
    gap: 16,
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    marginTop: 24,
  },
  card: {
    border: "1px solid #27272a",
    borderRadius: 14,
    padding: 16,
    backgroundColor: "#0b0b0b",
  },
  cardTitle: {
    color: "#facc15",
    fontSize: 18,
    fontWeight: 800,
    marginBottom: 8,
  },
  cardText: {
    color: "#e4e4e7",
    minHeight: 60,
    marginBottom: 12,
    lineHeight: 1.5,
  },
  cardButton: {
    backgroundColor: "rgba(255,255,255,0.08)",
    color: "#fff",
    border: "1px solid #3f3f46",
  },

  infoSection: {
    marginTop: 28,
    border: "1px solid #27272a",
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#0b0b0b",
  },
  infoGrid: {
    display: "grid",
    gap: 16,
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
  },
  infoBlock: {
    border: "1px solid #27272a",
    borderRadius: 12,
    padding: 14,
    backgroundColor: "#0f0f10",
  },
  infoTitle: {
    color: "#fca5a5",
    fontWeight: 800,
    fontSize: 16,
    marginBottom: 8,
  },
  infoText: {
    color: "#d4d4d8",
    lineHeight: 1.6,
  },
  link: {
    color: "#facc15",
    textDecoration: "none",
    fontWeight: 700,
  },

  footer: {
    marginTop: 28,
    borderTop: "1px solid #27272a",
    paddingTop: 18,
    paddingBottom: 8,
  },
  footerInner: {
    maxWidth: 960,
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    gap: 12,
    color: "#a1a1aa",
    fontSize: 14,
    flexWrap: "wrap",
  },
};
