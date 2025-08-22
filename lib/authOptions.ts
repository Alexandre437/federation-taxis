// lib/authOptions.ts
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import type { JWT } from "next-auth/jwt";

type UserRole = "ADMIN" | "DRIVER";

const users = [
  { id: "1", email: "driver@example.com", password: "driver123", role: "DRIVER" as UserRole },
  { id: "2", email: "admin@example.com",  password: "admin123",  role: "ADMIN"  as UserRole },
];

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Email and Password",
      credentials: { email: { label: "Email" }, password: { label: "Password" } },
      async authorize(creds) {
        if (!creds?.email || !creds?.password) return null;
        const u = users.find((x) => x.email === creds.email);
        if (!u || u.password !== creds.password) return null;
        // Return only the fields NextAuth needs; role is carried via callbacks
        return { id: u.id, email: u.email, role: u.role } as { id: string; email: string; role: UserRole };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }): Promise<JWT> {
      if (user) {
        // user includes role from authorize
        token.role = (user as { role?: UserRole }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as UserRole | undefined;
      }
      return session;
    }
  },
  pages: { signIn: "/login" }
};

