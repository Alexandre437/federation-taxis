import "./globals.css";
import Link from "next/link";
import SessionProvider from "@/components/SessionProvider";
import NavAuth from "@/components/NavAuth"; // if you added it earlier (optional)

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body style={{ backgroundColor: "#000", color: "#fff", margin: 0 }}>
        <header
          style={{
            position: "fixed", top: 0, left: 0, right: 0, height: "64px",
            borderBottom: "1px solid #27272a", background: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(6px)", zIndex: 50,
          }}
        >
          <div
            style={{
              maxWidth: "72rem", height: "100%", margin: "0 auto", padding: "0 24px",
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}
          >
            {/* Logo + title */}
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
              <img src="/images/logo-taxi.svg" alt="Logo taxis Genève" width={28} height={28} />
              <span style={{ color: "#facc15", fontWeight: 800, fontSize: 18, whiteSpace: "nowrap" }}>
                Fédération Taxis Genève
              </span>
            </Link>

            {/* Nav */}
            <nav style={{ display: "flex", gap: "2rem", fontSize: "14px", alignItems: "center" }}>
              <Link href="/courriers"  style={{ color: "white", textDecoration: "none" }}>Courriers</Link>
              <Link href="/federation" style={{ color: "white", textDecoration: "none" }}>Fédération</Link>
              <Link href="/dons"       style={{ color: "white", textDecoration: "none" }}>Dons</Link>
              {/* If you added NavAuth earlier, use <NavAuth />. Otherwise keep the link: */}
              <Link href="/login"      style={{ color: "white", textDecoration: "none", whiteSpace: "nowrap" }}>
                Espace Chauffeurs
              </Link>
            </nav>
          </div>
        </header>

        <div style={{ height: "64px" }} aria-hidden="true" />
        <SessionProvider>
          <main style={{ padding: "24px" }}>{children}</main>
        </SessionProvider>
      </body>
    </html>
  );
}
