"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("driver@example.com");
  const [password, setPassword] = useState("driver123");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const res = await signIn("credentials", { email, password, redirect: false });
    if (res?.error) setError("Identifiants incorrects");
    else router.push("/espace");
  }

  return (
    <div style={{ minHeight: "60vh", maxWidth: "400px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "16px" }}>Connexion Chauffeurs</h1>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        <input type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}
               style={{ padding: "10px", borderRadius: "6px", border: "1px solid #333" }} />
        <input type="password" placeholder="Mot de passe" value={password} onChange={e=>setPassword(e.target.value)}
               style={{ padding: "10px", borderRadius: "6px", border: "1px solid #333" }} />
        <button type="submit" style={{ backgroundColor: "#facc15", color:"#000", fontWeight:"bold", padding:"10px",
                 borderRadius:"6px", border:"none", cursor:"pointer" }}>
          Se connecter
        </button>
        {error && <p style={{ color: "#f87171" }}>{error}</p>}
      </form>
      <p style={{ marginTop: "12px", color: "#aaa", fontSize: "14px" }}>
        Démo : <code>driver@example.com</code> / <code>driver123</code>
      </p>
    </div>
  );
}
