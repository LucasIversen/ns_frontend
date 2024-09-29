export type article = {
  id: string;
  articleImage: string | null;
  description: string;
  descriptionEn: string;
  newsDate: string;
  title: string;
  titleEn: string;
  parts: parts[];
  partsEn: parts[];
};

export type parts = {
  sortValue: number;
  html: string | null;
  imageText: string | null;
  imageUrl: string | null;
  linkText: string | null;
  linkUrl: string | null;
  type: string;
  imageFile?: File | null; // Tilføjet for at gemme billedfilen midlertidigt
};

export interface Props {
  article: article;
  setTabContent: (content: string) => void;
}
