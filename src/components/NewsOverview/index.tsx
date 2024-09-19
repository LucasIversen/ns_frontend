import { useEffect, useState } from "react";
import styles from "./styles";
import NewsOverviewItem from "./NewsOverviewItem";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

const NewsOverview = () => {
  const [news, setNews] = useState<any[]>([]);

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
        console.log(news, newData);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  useEffect(() => {
    fetchNews();
  }, []);

  return (
    <div style={styles.container}>
      <div style={styles.newsPage}>
        {news.map((newsItem, index) => (
          <NewsOverviewItem
            key={index}
            title={newsItem.title}
            description={newsItem.description}
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
