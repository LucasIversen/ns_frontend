import React, { useEffect, useState } from "react";
import StockImage from "../../assets/stock_image.jpg";
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

  // const news = [
  //   {
  //     id: "1",
  //     title: "Denmark wins Flag Worlds!",
  //     description: "Denmark surprises the world as rookie QB Lucas",
  //     newsDate: "13 september 2023",
  //     articleImage: StockImage,
  //   },
  //   {
  //     id: "2",
  //     title: "Denmark wins Flag Worlds!",
  //     description: "Denmark surprises the world as rookie QB Lucas",
  //     newsDate: "13 september 2023",
  //     articleImage: StockImage,
  //   },
  //   {
  //     id: "3",
  //     title: "Denmark wins Flag Worlds!",
  //     description: "Denmark surprises the world as rookie QB Lucas",
  //     newsDate: "13 september 2023",
  //     articleImage: StockImage,
  //   },
  //   {
  //     id: "4",
  //     title: "Denmark wins Flag Worlds!",
  //     description: "Denmark surprises the world as rookie QB Lucas",
  //     newsDate: "13 september 2023",
  //     articleImage: StockImage,
  //   },
  //   {
  //     id: "5",
  //     title: "Denmark wins Flag Worlds!",
  //     description: "Denmark surprises the world as rookie QB Lucas",
  //     newsDate: "13 september 2023",
  //     articleImage: StockImage,
  //   },
  //   {
  //     id: "6",
  //     title: "Denmark wins Flag Worlds!",
  //     description: "Denmark surprises the world as rookie QB Lucas",
  //     newsDate: "13 september 2023",
  //     articleImage: StockImage,
  //   },
  //   {
  //     id: "7",
  //     title: "Denmark wins Flag Worlds!",
  //     description: "Denmark surprises the world as rookie QB Lucas",
  //     newsDate: "13 september 2023",
  //     articleImage: StockImage,
  //   },
  //   {
  //     id: "8",
  //     title: "Denmark wins Flag Worlds!",
  //     description: "Denmark surprises the world as rookie QB Lucas",
  //     newsDate: "13 september 2023",
  //     articleImage: StockImage,
  //   },
  //   {
  //     id: "9",
  //     title: "Denmark wins Flag Worlds!",
  //     description: "Denmark surprises the world as rookie QB Lucas",
  //     newsDate: "13 september 2023",
  //     articleImage: StockImage,
  //   },
  // ];

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
