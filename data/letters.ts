// data/letters.ts
export type Letter = {
  slug: string;
  title: string;
  date: string;      // ISO date like "2025-01-15"
  summary?: string;
  pdfUrl?: string;   // optional for now; add later when you have the PDF
  published?: boolean;
};

export const letters: Letter[] = [
  {
    slug: "courrier-janvier-2025",
    title: "Courrier de Janvier 2025",
    date: "2025-01-15",
    summary: "Point sur les actions de début d’année et coordination aéroport.",
    published: true,
    // pdfUrl: "/docs/courrier-janvier-2025.pdf", // à ajouter plus tard
  },
  {
    slug: "courrier-fevrier-2025",
    title: "Courrier de Février 2025",
    date: "2025-02-10",
    summary: "Échanges avec les autorités, statut des adhésions, informations publiques.",
    published: true,
    // pdfUrl: "/docs/courrier-fevrier-2025.pdf", // à ajouter plus tard
  },
];
