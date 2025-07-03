export type article = {
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
  link: string | null;
  type: string;
  imageFile?: File | null; // Tilføjet for at gemme billedfilen midlertidigt
};

export type CleanPart = Omit<parts, "imageFile">;

export interface Props {
  setTabContent: (tab: string) => void;
}
