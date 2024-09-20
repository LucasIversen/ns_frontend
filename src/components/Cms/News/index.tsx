import { collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { useEffect, useState } from "react";
import styles from "./styles";

const News = () => {
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
    <div style={styles.newsList}>
      <div style={styles.newNews}>
        <div style={styles.newNewsButton}>Opret</div>
      </div>
      {news.map((newsItem) => (
        <div key={newsItem.id} style={styles.newsItem}>
          <div style={styles.newsTitle}>
            {newsItem.title} - {newsItem.newsDate}
          </div>
          <div style={styles.buttons}>
            <div style={styles.editButton}>Rediger</div>
            <div style={styles.deleteButton}>Slet</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default News;
