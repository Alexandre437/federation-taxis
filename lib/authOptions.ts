// lib/authOptions.ts
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";

// ---- Roles ----
export type UserRole = "ADMIN" | "DRIVER";

// ---- Demo users (replace with real auth later) ----
const users = [
  { id: "1", email: "driver@example.com", password: "driver123", role: "DRIVER" as UserRole },
  { id: "2", email: "admin@example.com",  password: "admin123",  role: "ADMIN"  as UserRole },
];

// ---- NextAuth options ----
export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Email & Password",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(creds) {
        if (!creds?.email || !creds?.password) return null;
        const u = users.find((x) => x.email === creds.email);
        if (!u || u.password !== creds.password) return null;

        // Return fields that become `user` in callbacks
        return { id: u.id, email: u.email, role: u.role } as {
          id: string;
          email: string;
          role: UserRole;
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }): Promise<JWT> {
      // On login, copy role from `user` to the token
      if (user && "role" in user) {
        token.role = (user as { role?: UserRole }).role;
      }
      return token;
    },
    async session({ session, token }) {
      // Expose role on session.user
      if (session.user) {
        (session.user as { role?: UserRole }).role = token.role as UserRole | undefined;
      }
      return session;
    },
  },
  // Use your custom login page
  pages: { signIn: "/login" },
};
