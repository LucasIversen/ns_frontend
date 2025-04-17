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
  elfLink?: string | null;
};

export type parts = {
  sortValue: number;
  html: string | null;
  imageText: string | null;
  imageUrl: string | null;
  link: string | null;
  type: string;
};
