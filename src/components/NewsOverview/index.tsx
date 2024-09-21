import { useEffect, useState } from "react";
import styles from "./styles";
import NewsOverviewItem from "./NewsOverviewItem";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { useTranslation } from "react-i18next";

const NewsOverview = () => {
  const [news, setNews] = useState<any[]>([]);
  const { i18n } = useTranslation();

  const fetchNews = async () => {
    console.log("fetching news");
    await getDocs(collection(db, "news"))
      .then((querySnapshot) => {
        console.log("querySnapshot", querySnapshot);
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

  useEffect(() => {
    fetchNews();
  }, []);

  const languageIsEnglish = i18n.language.includes("en");

  return (
    <div style={styles.container}>
      <div style={styles.newsPage}>
        {news.map((newsItem, index) => (
          <NewsOverviewItem
            key={index}
            title={languageIsEnglish ? newsItem.titleEn : newsItem.title}
            description={
              languageIsEnglish ? newsItem.descriptionEn : newsItem.description
            }
            newsDate={newsItem.newsDate}
            articleImage={newsItem.articleImage}
            id={newsItem.id}
          />
        ))}
      </div>
    </div>
  );
};

export default NewsOverview;
