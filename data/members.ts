// data/members.ts
export type Member = {
  email: string;
  name?: string;
  memberId: string;
  paidUntil: string; // ISO date, e.g. "2025-12-31"
};

export const members: Member[] = [
  {
    email: "driver@example.com",
    name: "Chauffeur Démo",
    memberId: "FGTO-001",
    paidUntil: "2026-12-31",
  },
  {
    email: "admin@example.com",
    name: "Admin Démo",
    memberId: "FGTO-ADMIN",
    paidUntil: "2024-12-31", // expiré pour la démo
  },
];

// Helper: find the member by email
export function findMemberByEmail(email?: string | null): Member | null {
  if (!email) return null;
  const m = members.find((x) => x.email.toLowerCase() === email.toLowerCase());
  return m ?? null;
}
