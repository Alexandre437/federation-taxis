export type Letter = {
  slug: string;           // e.g. "greve-2025-03-14"
  title: string;          // e.g. "Grève du 14 mars 2025"
  date: string;           // ISO date (YYYY-MM-DD)
  pdfUrl: string;         // public URL in Blob
};

export type LettersManifest = {
  items: Letter[];
  updatedAt: string;      // ISO timestamp
};
