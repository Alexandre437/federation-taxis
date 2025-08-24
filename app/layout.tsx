import "./globals.css";
import Link from "next/link";
import SessionProvider from "@/components/SessionProvider";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ backgroundColor: "#000", color: "#fff", margin: 0 }}>
        <header
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            height: "64px",
            borderBottom: "1px solid #27272a",
            background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(6px)",
            zIndex: 50,
          }}
        >
          <div
            style={{
              maxWidth: "72rem",
              height: "100%",
              margin: "0 auto",
              padding: "0 24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* Logo + titre */}
            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                textDecoration: "none",
              }}
            >
              <img
                src="/images/taxi-logo.jpeg"
                alt="Logo Fédération Genevoise des Taxis Officiels"
                width={40}
                height={40}
                style={{ borderRadius: "50%" }}
              />
              <span
                style={{
                  color: "#facc15",
                  fontWeight: 800,
                  fontSize: 18,
                  whiteSpace: "nowrap",
                }}
              >
                Fédération Taxis Genève
              </span>
            </Link>

            {/* Liens de navigation */}
            <nav
              style={{
                display: "flex",
                gap: "2rem",
                fontSize: "14px",
                alignItems: "center",
              }}
            >
              <Link href="/courriers" style={{ color: "white", textDecoration: "none" }}>
                Courriers
              </Link>
              <Link href="/federation" style={{ color: "white", textDecoration: "none" }}>
                Fédération
              </Link>
              <Link href="/dons" style={{ color: "white", textDecoration: "none" }}>
                Dons
              </Link>
              <Link
                href="/login"
                style={{
                  color: "white",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                }}
              >
                Espace Chauffeurs
              </Link>
            </nav>
          </div>
        </header>

        {/* Décalage pour ne pas masquer le contenu */}
        <div style={{ height: "64px" }} aria-hidden="true" />
        <SessionProvider>
          <main style={{ padding: "24px" }}>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
