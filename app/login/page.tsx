"use client";

import { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";

export default function LoginPage() {
  const { data: session } = useSession();
  const [email, setEmail] = useState("admin@example.com");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  if (session?.user) {
    return (
      <div className="mx-auto max-w-md border rounded-xl p-6">
        <p className="mb-2">
          Connecté comme <b>{session.user.email}</b>{" "}
          {session.user.role ? `(role: ${session.user.role})` : ""}
        </p>
        <div className="flex gap-3">
          <Link href="/espace" className="underline text-blue-400">
            Aller à l’Espace Chauffeurs
          </Link>
          <Link href="/admin/members" className="underline text-blue-400">
            Ouvrir l’Admin (membres)
          </Link>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="mt-4 rounded-md bg-black text-white px-4 py-2 border border-zinc-700"
        >
          Se déconnecter
        </button>
      </div>
    );
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setMsg(null);
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    setLoading(false);
    if (res?.ok) {
      window.location.href = "/"; // or keep on /login; session will show
    } else {
      setMsg("Identifiants invalides");
    }
  }

  return (
    <div className="mx-auto max-w-md border rounded-xl p-6">
      <h1 className="text-xl font-semibold mb-4">Connexion</h1>
      <form onSubmit={onSubmit} className="space-y-3">
        <div>
          <label className="block text-sm mb-1">Email</label>
          <input
            className="w-full rounded-md border px-3 py-2 bg-transparent"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="admin@example.com"
          />
        </div>
        <div>
          <label className="block text-sm mb-1">Mot de passe</label>
          <input
            type="password"
            className="w-full rounded-md border px-3 py-2 bg-transparent"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="admin123"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-black text-white px-4 py-2 border border-zinc-700 disabled:opacity-50"
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
        {msg && <p className="text-sm text-red-400">{msg}</p>}
      </form>

      <div className="mt-6 text-sm text-zinc-400">
        Comptes de démo :<br />
        admin@example.com / admin123 (ADMIN)<br />
        driver@example.com / driver123 (DRIVER)
      </div>
    </div>
  );
}

