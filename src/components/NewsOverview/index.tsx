import { useContext, useEffect, useState } from "react";
import styles from "./styles";
import NewsOverviewItem from "./NewsOverviewItem";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Helmet, HelmetProvider } from "react-helmet-async";
import CacheContext from "../../shared/CacheContext";

const NewsOverview = () => {
  const cacheContext = useContext(CacheContext);
  if (!cacheContext) {
    throw new Error("MediaPage must be used within a CacheProvider");
  }
  const { news, fetchNews } = cacheContext;
  useEffect(() => {
    if (!news) {
      fetchNews();
    }
  }, [news, fetchNews]);

  const [currentPage, setCurrentPage] = useState(1);
  const { t, i18n } = useTranslation();

  const articlesPerPage = 12;

  const languageIsEnglish = i18n.language.includes("en");

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const getPageSlice = () => {
    const start = (currentPage - 1) * articlesPerPage;
    const end = start + articlesPerPage;
    return news ? news.slice(start, end) : [];
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Nordic Storm News - Latest Updates on American Football</title>
        <meta
          name="description"
          content="Stay updated with the latest news, events, and highlights from the Nordic Storm American football team."
        />
        <meta
          name="keywords"
          content="Nordic Storm News, American Football News, Copenhagen Football News, Denmark Football Updates, ELF Team News, Nordic Storm Events, American Football Copenhagen, American Football Denmark"
        />
        <meta
          property="og:title"
          content="Nordic Storm News - Latest Updates on American Football"
        />
        <meta
          property="og:description"
          content="Stay updated with the latest news, events, and highlights from the Nordic Storm American football team."
        />
        <meta property="og:image" content="/path/to/your/news-page-image.jpg" />
      </Helmet>
      <div style={styles.container}>
        {/* {loading && <Spinner />} */}
        <div style={styles.newsPage}>
          {getPageSlice().map((newsItem, index) => (
            <NewsOverviewItem
              key={index}
              title={languageIsEnglish ? newsItem.titleEn : newsItem.title}
              description={
                languageIsEnglish
                  ? newsItem.descriptionEn
                  : newsItem.description
              }
              newsDate={newsItem.newsDate}
              articleImage={newsItem.articleImage}
              id={newsItem.id}
            />
          ))}
        </div>
        {(news?.length ?? 0) >= articlesPerPage || currentPage > 1 ? (
          <div style={styles.pagination}>
            {currentPage > 1 ? (
              <div onClick={handlePrevPage} style={styles.paginationButton}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </div>
            ) : null}
            <div style={styles.pageNumber}>{`${t("page")} ${currentPage}`}</div>
            {(news?.length ?? 0) >= articlesPerPage ? (
              <div onClick={handleNextPage} style={styles.paginationButton}>
                <FontAwesomeIcon icon={faArrowRight} />
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </HelmetProvider>
  );
};

export default NewsOverview;
