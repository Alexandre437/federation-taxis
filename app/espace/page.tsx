"use client";

import { useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Espace() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // If not logged in, go to /login
  useEffect(() => {
    if (status === "unauthenticated") router.push("/login");
  }, [status, router]);

  if (status === "loading") {
    return <div style={{ minHeight: "60vh" }}>Chargement…</div>;
  }

  // While redirecting, render nothing
  if (!session) return null;

  const user = session.user as any;

  return (
    <div style={{ minHeight: "60vh" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>
        Espace Chauffeurs
      </h1>
      <p style={{ marginBottom: "12px" }}>
        Bonjour <strong>{user?.email}</strong> — rôle : <strong>{user?.role}</strong>
      </p>

      <div style={{ border: "1px solid #333", borderRadius: "8px", padding: "16px", marginTop: "12px" }}>
        <h2 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "8px" }}>Statut d’adhésion</h2>
        <p>En ordre ✅ (exemple statique — on branchera la vraie base plus tard)</p>
      </div>

      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        style={{
          marginTop: "20px",
          backgroundColor: "#fff",
          color: "#000",
          fontWeight: "bold",
          padding: "10px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
        }}
      >
        Se déconnecter
      </button>
    </div>
  );
}
