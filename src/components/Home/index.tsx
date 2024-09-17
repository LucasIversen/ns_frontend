import React from "react";
import Props from "./interfaces";
import styles from "./styles";
import Stadium from "../../assets/stadium.png";
import StockImage from "../../assets/stock_image.jpg";
import NewsItem from "./NewsItem";
import { useTranslation } from "react-i18next";
import SponsorCarousel from "./SponsorCarousel";
import MediaItem from "./MediaItem";

const Home = (props: Props) => {
  const { t, i18n } = useTranslation();

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

  const sponsors = [
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFIaN0zKCyKlEA_yuXBVNcxAUwfO3ORmjEKA&s",
      link: "https://www.fillmurray.com/",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFIaN0zKCyKlEA_yuXBVNcxAUwfO3ORmjEKA&s",
      link: "https://www.fillmurray.com/",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFIaN0zKCyKlEA_yuXBVNcxAUwfO3ORmjEKA&s",
      link: "https://www.fillmurray.com/",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFIaN0zKCyKlEA_yuXBVNcxAUwfO3ORmjEKA&s",
      link: "https://www.fillmurray.com/",
    },
    {
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFIaN0zKCyKlEA_yuXBVNcxAUwfO3ORmjEKA&s",
      link: "https://www.fillmurray.com/",
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
                  id={article.id}
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
              <div
                style={index == 0 ? styles.firstItem : styles.item}
                key={index}
              >
                <MediaItem
                  title={article.title}
                  date={article.newsDate}
                  image={article.articleImage}
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
