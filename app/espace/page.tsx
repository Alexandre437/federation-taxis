"use client";

import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Espace() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (status === "loading") return <div style={{ minHeight: "60vh" }}>Chargement…</div>;
  if (!session) return null;

  const email = session.user?.email ?? "";
  const role = session.user?.role ?? "DRIVER";

  return (
    <div style={{ minHeight: "60vh" }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>Espace Chauffeurs</h1>
      <p style={{ marginBottom: 12 }}>
        Bonjour <strong>{email}</strong> — rôle : <strong>{role}</strong>
      </p>

      <div style={{ border: "1px solid #333", borderRadius: 8, padding: 16, marginTop: 12 }}>
        <h2 style={{ fontSize: 18, fontWeight: "bold", marginBottom: 8 }}>Statut d’adhésion</h2>
        <p>En ordre ✅ (exemple statique — on branchera la vraie base plus tard)</p>
      </div>

      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        style={{
          marginTop: 20,
          backgroundColor: "#fff",
          color: "#000",
          fontWeight: "bold",
          padding: 10,
          borderRadius: 6,
          border: "none",
          cursor: "pointer",
        }}
      >
        Se déconnecter
      </button>
    </div>
  );
}
