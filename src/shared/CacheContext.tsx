import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import React, { createContext, useState } from "react";
import { db } from "../firebase";
import { Player } from "../components/Roster/interfaces";
import { matchup } from "../components/Schedule/interfaces";
import { article } from "./types";

// Define the type for our context data
interface CacheContextType {
  news: article[] | null;
  fetchNews: () => Promise<void>;
  media: any[] | null;
  fetchMedia: () => Promise<void>;
  roster: Player[] | null;
  fetchRoster: () => Promise<void>;
  schedule: any[] | null;
  fetchSchedule: () => Promise<void>;
  faqs: any[] | null;
  fetchFaqs: () => Promise<void>;
}

// Create the context with a default value
const CacheContext = createContext<CacheContextType | undefined>(undefined);

export const CacheProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [news, setNews] = useState<any[] | null>(() => {
    const cachedNews = sessionStorage.getItem("newsCache");
    return cachedNews ? JSON.parse(cachedNews) : null;
  });

  const [media, setMedia] = useState<any[] | null>(() => {
    const cachedMedia = sessionStorage.getItem("mediaCache");
    return cachedMedia ? JSON.parse(cachedMedia) : null;
  });

  const [roster, setRoster] = useState<Player[] | null>(() => {
    const cachedRoster = sessionStorage.getItem("rosterCache");
    return cachedRoster ? JSON.parse(cachedRoster) : null;
  });

  const [schedule, setSchedule] = useState<any[] | null>(() => {
    const cachedSchedule = sessionStorage.getItem("scheduleCache");
    return cachedSchedule ? JSON.parse(cachedSchedule) : null;
  });

  const [faqs, setFaqs] = useState<any[] | null>(() => {
    const cachedFaq = sessionStorage.getItem("faqCache");
    return cachedFaq ? JSON.parse(cachedFaq) : null;
  });

  const fetchNews = async () => {
    if (typeof window === "undefined") return; // Don't fetch on the server
    if (news) return; // Already cached, no need to fetch

    const newsQuery = query(
      collection(db, "news"),
      where("published", "==", true),
      orderBy("newsDate", "desc")
    );

    await getDocs(newsQuery)
      .then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setNews(newData);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  const fetchMedia = async () => {
    if (typeof window === "undefined") return; // Don't fetch on the server
    if (media) return; // Already cached, no need to fetch

    const mediaQuery = query(collection(db, "media"), orderBy("date", "desc"));

    await getDocs(mediaQuery)
      .then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMedia(newData);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  const fetchRoster = async () => {
    if (typeof window === "undefined") return; // Don't fetch on the server
    if (roster) return; // Already cached, no need to fetch

    const playerQuery = query(collection(db, "players"));

    const querySnapshot = await getDocs(playerQuery);

    const playerDocs = querySnapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as Player[];

    const positionOrder = [
      "Quarterback",
      "Running Back",
      "Wide Receiver",
      "Tight End",
      "Tackle",
      "Tackle/Guard",
      "Guard",
      "Center",
      "Linebacker",
      "Defensive End",
      "Cornerback",
      "Defensive Back",
      "Defensive Back/Return Specialist",
      "Defensive Tackle",
      "Defensive Lineman",
      "Safety",
      "Safety/Return Specialist",
      "Athlete",
      "Kicker",
      "Punter",
      "Kicker/Punter",
      "Long Snapper",
      "Head Coach",
      "Offensive Coordinator",
      "Defensive Coordinator",
      "Special Teams Coordinator",
      "Assistant Coach",
      "Secondary coach",
      "Defensive Line coach",
      "Offensive Line coach",
      "Quarterbacks coach",
      "Wide Receivers coach",
      "Runningbacks coach",
      "Tight Ends coach",
      "Inside Linebackers coach",
      "Outside Linebackers coach",
      "Special Teams coach",
      "Defensive Assistant coach",
      "Offensive Assistant coach",
      "General Manager",
      "Board Member",
    ];

    const playersSorted = playerDocs.sort((a, b) =>
      positionOrder.indexOf(a.position) > positionOrder.indexOf(b.position)
        ? 1
        : -1
    );

    setRoster(playersSorted);
  };

  const fetchSchedule = async () => {
    if (typeof window === "undefined") return; // Don't fetch on the server
    if (schedule) return; // Already cached, no need to fetch

    const matchupQuery = query(collection(db, "schedule"));

    const querySnapshot = await getDocs(matchupQuery);

    const scheduleFetch = querySnapshot.docs.map(
      (doc) =>
        ({
          ...doc.data(),
          id: doc.id,
        } as matchup)
    );

    setSchedule(scheduleFetch.sort((a, b) => a.week - b.week));
  };

  const fetchFaqs = async () => {
    await getDocs(collection(db, "faq"))
      .then((querySnapshot) => {
        console.log("querySnapshot", querySnapshot);
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setFaqs(newData);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  return (
    <CacheContext.Provider
      value={{
        news,
        fetchNews,
        media,
        fetchMedia,
        roster,
        fetchRoster,
        schedule,
        fetchSchedule,
        faqs,
        fetchFaqs,
      }}
    >
      {children}
    </CacheContext.Provider>
  );
};

export default CacheContext;
