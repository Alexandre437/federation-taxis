// lib/authOptions.ts
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Demo users (replace with DB later)
const users = [
  { id: "1", email: "driver@example.com", password: "driver123", role: "DRIVER" },
  { id: "2", email: "admin@example.com",  password: "admin123",  role: "ADMIN"  },
];

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Email and Password",
      credentials: { email: {}, password: {} },
      async authorize(creds) {
        if (!creds?.email || !creds?.password) return null;
        const user = users.find(u => u.email === creds.email);
        if (!user) return null;
        if (user.password !== creds.password) return null;
        return { id: user.id, email: user.email, role: user.role } as any;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) { if (user) token.role = (user as any).role; return token; },
    async session({ session, token }) { if (session.user) (session.user as any).role = token.role; return session; },
  },
  pages: { signIn: "/login" }
};
