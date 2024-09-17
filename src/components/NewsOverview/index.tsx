import React from "react";
import StockImage from "../../assets/stock_image.jpg";
import styles from "./styles";
import NewsOverviewItem from "./NewsOverviewItem";

const NewsOverview = () => {
  const news = [
    {
      id: "1",
      title: "Denmark wins Flag Worlds!",
      description: "Denmark surprises the world as rookie QB Lucas",
      newsDate: "13 september 2023",
      articleImage: StockImage,
    },
    {
      id: "2",
      title: "Denmark wins Flag Worlds!",
      description: "Denmark surprises the world as rookie QB Lucas",
      newsDate: "13 september 2023",
      articleImage: StockImage,
    },
    {
      id: "3",
      title: "Denmark wins Flag Worlds!",
      description: "Denmark surprises the world as rookie QB Lucas",
      newsDate: "13 september 2023",
      articleImage: StockImage,
    },
    {
      id: "4",
      title: "Denmark wins Flag Worlds!",
      description: "Denmark surprises the world as rookie QB Lucas",
      newsDate: "13 september 2023",
      articleImage: StockImage,
    },
    {
      id: "5",
      title: "Denmark wins Flag Worlds!",
      description: "Denmark surprises the world as rookie QB Lucas",
      newsDate: "13 september 2023",
      articleImage: StockImage,
    },
    {
      id: "6",
      title: "Denmark wins Flag Worlds!",
      description: "Denmark surprises the world as rookie QB Lucas",
      newsDate: "13 september 2023",
      articleImage: StockImage,
    },
    {
      id: "7",
      title: "Denmark wins Flag Worlds!",
      description: "Denmark surprises the world as rookie QB Lucas",
      newsDate: "13 september 2023",
      articleImage: StockImage,
    },
    {
      id: "8",
      title: "Denmark wins Flag Worlds!",
      description: "Denmark surprises the world as rookie QB Lucas",
      newsDate: "13 september 2023",
      articleImage: StockImage,
    },
    {
      id: "9",
      title: "Denmark wins Flag Worlds!",
      description: "Denmark surprises the world as rookie QB Lucas",
      newsDate: "13 september 2023",
      articleImage: StockImage,
    },
  ];

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
