// data/members.ts
export type Member = {
  email: string;
  name?: string;
  memberId: string;
  paidUntil: string; // YYYY-MM-DD
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
    paidUntil: "2024-12-31", // expiré pour démo
  },
];

export function findMemberByEmail(email?: string | null): Member | null {
  if (!email) return null;
  return members.find(m => m.email.toLowerCase() === email.toLowerCase()) ?? null;
}
