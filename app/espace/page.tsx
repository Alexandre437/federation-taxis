"use client";

import { useEffect, useMemo } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { findMemberByEmail } from "@/data/members";

export default function Espace() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (status === "loading") return <div style={{ minHeight: "60vh" }}>Chargement…</div>;
  if (!session) return null;

  const userEmail = session.user?.email ?? "";
  const member = useMemo(() => findMemberByEmail(userEmail), [userEmail]);

  const today = new Date();
  const paidUntil = member?.paidUntil ? new Date(member.paidUntil) : null;
  const isActive = paidUntil ? paidUntil >= new Date(today.toDateString()) : false;
  const daysLeft = paidUntil ? Math.ceil((paidUntil.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)) : 0;

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <section style={styles.block}>
        <h1 style={styles.h1}>Espace Chauffeurs</h1>
        <p style={styles.muted}>Bonjour <strong>{userEmail}</strong></p>
      </section>

      <section style={styles.block}>
        <h2 style={styles.h2Yellow}>Adhésion</h2>

        {member ? (
          <>
            <div style={styles.kv}>
              <div>Nom</div>
              <div style={styles.kvVal}>{member.name ?? "—"}</div>

              <div>N° Membre</div>
              <div style={styles.kvVal}>{member.memberId}</div>

              <div>Valide jusqu’au</div>
              <div style={styles.kvVal}>{paidUntil ? paidUntil.toLocaleDateString() : "—"}</div>
            </div>

            <div style={{ marginTop: 12 }}>
              {isActive ? (
                <span style={styles.badgeOk}>
                  ✅ En ordre — {daysLeft} jour{Math.abs(daysLeft) > 1 ? "s" : ""} restants
                </span>
              ) : (
                <span style={styles.badgeWarn}>❌ Adhésion expirée</span>
              )}
            </div>

            <div style={{ marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button
                disabled
                title="Bientôt disponible"
                style={{ ...styles.button, ...styles.buttonGhost, opacity: 0.7, cursor: "not-allowed" }}
              >
                📄 Télécharger bulletin de versement (bientôt)
              </button>
              <a
                href="mailto:contact@federation-taxis-ge.ch?subject=Adh%C3%A9sion"
                style={{ ...styles.button, ...styles.buttonPrimary, textDecoration: "none" }}
              >
                Contacter le secrétariat
              </a>
            </div>
          </>
        ) : (
          <>
            <p style={styles.p}>
              Aucun profil d’adhésion associé à <strong>{userEmail}</strong> pour le moment.
            </p>
            <a
              href="mailto:contact@federation-taxis-ge.ch?subject=Demande%20de%20profil%20adh%C3%A9rent"
              style={{ ...styles.button, ...styles.buttonPrimary, textDecoration: "none" }}
            >
              Demander la création de mon profil
            </a>
          </>
        )}
      </section>

      <section style={styles.block}>
        <h2 style={styles.h2Red}>Mes documents</h2>
        <p style={styles.p}>Aucun document disponible pour l’instant.</p>
      </section>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          style={{ ...styles.button, backgroundColor: "#fff", color: "#000", border: "none" }}
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  block: { border: "1px solid #27272a", borderRadius: 16, padding: 16, backgroundColor: "#0b0b0b" },
  h1: { fontSize: 28, fontWeight: 900, margin: 0, color: "#fff" },
  h2Yellow: { fontSize: 18, fontWeight: 800, margin: "0 0 10px", color: "#facc15" },
  h2Red: { fontSize: 18, fontWeight: 800, margin: "0 0 10px", color: "#fca5a5" },
  p: { color: "#d4d4d8", lineHeight: 1.6, margin: "8px 0 0" },
  muted: { color: "#a1a1aa", marginTop: 6 },

  kv: { display: "grid", gridTemplateColumns: "150px 1fr", gap: 8, color: "#d4d4d8", alignItems: "center" },
  kvVal: { color: "#fff" },

  badgeOk: {
    display: "inline-block", padding: "6px 10px", borderRadius: 999,
    background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.35)",
    color: "#a7f3d0", fontWeight: 700, fontSize: 14,
  },
  badgeWarn: {
    display: "inline-block", padding: "6px 10px", borderRadius: 999,
    background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.35)",
    color: "#fecaca", fontWeight: 700, fontSize: 14,
  },

  button: { display: "inline-block", padding: "10px 14px", borderRadius: 10, fontWeight: 800, fontSize: 14, cursor: "pointer" },
  buttonPrimary: { backgroundColor: "#facc15", color: "#000", border: "1px solid #facc15" },
  buttonGhost: { backgroundColor: "rgba(255,255,255,0.06)", color: "#fff", border: "1px solid #3f3f46" },
};
