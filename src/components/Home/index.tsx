import React from "react";
import Props from "./interfaces";
import styles from "./styles";
import Stadium from "../../assets/stadium.png";
import StockImage from "../../assets/stock_image.jpg";
import NewsItem from "./NewsItem";
import { useTranslation } from "react-i18next";

const Home = (props: Props) => {
  const { t, i18n } = useTranslation();

  const news = [
    {
      title: "Denmark wins Flag Worlds!",
      description: "Denmark surprises the world as rookie QB Lucas",
      newsDate: "13 september 2023",
      articleImage: StockImage,
    },
    {
      title: "Denmark wins Flag Worlds!",
      description: "Denmark surprises the world as rookie QB Lucas",
      newsDate: "13 september 2023",
      articleImage: StockImage,
    },
    {
      title: "Denmark wins Flag Worlds!",
      description: "Denmark surprises the world as rookie QB Lucas",
      newsDate: "13 september 2023",
      articleImage: StockImage,
    },
    {
      title: "Denmark wins Flag Worlds!",
      description: "Denmark surprises the world as rookie QB Lucas",
      newsDate: "13 september 2023",
      articleImage: StockImage,
    },
    {
      title: "Denmark wins Flag Worlds!",
      description: "Denmark surprises the world as rookie QB Lucas",
      newsDate: "13 september 2023",
      articleImage: StockImage,
    },
    {
      title: "Denmark wins Flag Worlds!",
      description: "Denmark surprises the world as rookie QB Lucas",
      newsDate: "13 september 2023",
      articleImage: StockImage,
    },
    {
      title: "Denmark wins Flag Worlds!",
      description: "Denmark surprises the world as rookie QB Lucas",
      newsDate: "13 september 2023",
      articleImage: StockImage,
    },
    {
      title: "Denmark wins Flag Worlds!",
      description: "Denmark surprises the world as rookie QB Lucas",
      newsDate: "13 september 2023",
      articleImage: StockImage,
    },
    {
      title: "Denmark wins Flag Worlds!",
      description: "Denmark surprises the world as rookie QB Lucas",
      newsDate: "13 september 2023",
      articleImage: StockImage,
    },
  ];

  return (
    <div style={styles.homepage}>
      <div style={styles.bannerImage}>
        <img src={Stadium} style={styles.image} alt="Stadium" />
        <div style={styles.imageText}>WE ARE NORDIC STORM</div>
      </div>

      <div style={styles.newsBar}>
        <div style={styles.newsTitle}>{t("news")}</div>
        <div style={styles.newsItems}>
          {news.map((article, index) => {
            return (
              <div style={index == 0 ? styles.firstItem : styles.item}>
                <NewsItem
                  title={article.title}
                  description={article.description}
                  newsDate={article.newsDate}
                  articleImage={article.articleImage}
                />
              </div>
            );
          })}
        </div>
      </div>

      <div style={styles.mediaBar}>
        <div style={styles.mediaTitle}>{t("media")}</div>
        <div style={styles.mediaItems}>
          {news.map((article, index) => {
            return (
              <div style={index == 0 ? styles.firstItem : styles.item}>
                <NewsItem
                  title={article.title}
                  description={article.description}
                  newsDate={article.newsDate}
                  articleImage={article.articleImage}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Home;
