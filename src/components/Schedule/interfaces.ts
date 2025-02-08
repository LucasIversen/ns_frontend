export type matchup = {
  id: string;
  date: string | null;
  dateEn: string | null;
  week: number;
  teamName: string;
  ticketsLink: string | null;
  result: string | null;
  win: boolean | null;
  location: string | null;
  home: boolean;
  teamLogo: string;
  bye: boolean | null;
  time: string | null;
  isoTime?: string;
};
