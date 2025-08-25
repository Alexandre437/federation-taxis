// types/members.ts
export type Member = {
  email: string;
  name?: string;
  memberId: string;
  paidUntil: string; // YYYY-MM-DD
};

export type MembersManifest = {
  items: Member[];
  updatedAt: string; // ISO
};
