import { useEffect, useState } from "react";
import styles from "./styles";
import NewsOverviewItem from "./NewsOverviewItem";
import {
  collection,
  getDocs,
  query,
  orderBy,
  limit,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useTranslation } from "react-i18next";
import { article } from "../../shared/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Helmet, HelmetProvider } from "react-helmet-async";

const NewsOverview = () => {
  const [news, setNews] = useState<article[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastVisible, setLastVisible] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { t, i18n } = useTranslation();

  const articlesPerPage = 12;

  const fetchNews = async (page = 1) => {
    setLoading(true);
    try {
      // Create a query with sorting, limiting, and pagination
      let newsQuery = query(
        collection(db, "news"),
        where("published", "==", true),
        orderBy("newsDate", "desc"),
        limit(articlesPerPage)
      );

      // If not the first page, use the last visible document to start after
      if (page > 1 && lastVisible) {
        newsQuery = query(
          collection(db, "news"),
          where("published", "==", true),
          orderBy("newsDate", "desc"),
          startAfter(lastVisible),
          limit(articlesPerPage)
        );
      }

      const querySnapshot = await getDocs(newsQuery);

      // Get the last visible document for pagination
      const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastVisible(lastVisibleDoc);

      // Map the documents to articles and add them to the news array
      const newArticles = querySnapshot.docs.map(
        (doc) =>
          ({
            ...doc.data(),
            id: doc.id,
          } as article)
      );

      setNews(newArticles);
    } catch (error) {
      console.log("Error getting documents: ", error);
    } finally {
      setLoading(false);
      console.log(loading);
    }
  };

  useEffect(() => {
    fetchNews(currentPage);
  }, [currentPage]);

  const languageIsEnglish = i18n.language.includes("en");

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
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
          {news.map((newsItem, index) => (
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
        {news.length >= articlesPerPage || currentPage > 1 ? (
          <div style={styles.pagination}>
            {currentPage > 1 ? (
              <div onClick={handlePrevPage} style={styles.paginationButton}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </div>
            ) : null}
            <div style={styles.pageNumber}>{`${t("page")} ${currentPage}`}</div>
            {news.length >= articlesPerPage ? (
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
