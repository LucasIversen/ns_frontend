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
  published: boolean;
};

export type parts = {
  sortValue: number;
  html: string | null;
  htmlEn: string | null;
  imageText: string | null;
  imageTextEn: string | null;
  imageUrl: string | null;
  type: string;
  imageFile?: File | null; // Tilføjet for at gemme billedfilen midlertidigt
};

export interface Props {
  article: article;
  setTabContent: (content: string) => void;
}
