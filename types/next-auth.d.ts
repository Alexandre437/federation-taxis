// types/next-auth.d.ts
import "next-auth";
import { DefaultSession } from "next-auth";

declare module "next-auth" {
  type UserRole = "ADMIN" | "DRIVER";

  interface Session {
    user: DefaultSession["user"] & {
      role?: UserRole;
    };
  }

  interface User {
    role?: UserRole;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: "ADMIN" | "DRIVER";
  }
}
