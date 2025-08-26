export type Letter = {
  slug: string;        // e.g. "greve-2025-09-01"
  title: string;       // display title
  date: string;        // YYYY-MM-DD
  pdfUrl: string;      // public Blob URL
};

export type LettersManifest = {
  items: Letter[];
  updatedAt: string;   // ISO timestamp
};
