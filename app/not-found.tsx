import Link from "next/link";

export default function NotFound() {
  return (
    <div style={{
      minHeight: "60vh", display: "grid", placeItems: "center",
      textAlign: "center", border: "1px solid #27272a", borderRadius: 16, padding: 24, background: "#0b0b0b"
    }}>
      <div>
        <div style={{ color: "#fca5a5", fontWeight: 800, marginBottom: 8 }}>404</div>
        <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 8 }}>Page introuvable</h1>
        <p style={{ color: "#d4d4d8", marginBottom: 16 }}>
          La page demandée n’existe pas ou a été déplacée.
        </p>
        <Link href="/" style={{
          display: "inline-block", background: "#facc15", color: "#000", fontWeight: 800,
          padding: "10px 14px", borderRadius: 10, textDecoration: "none"
        }}>
          Retour à l’accueil
        </Link>
      </div>
    </div>
  );
}
