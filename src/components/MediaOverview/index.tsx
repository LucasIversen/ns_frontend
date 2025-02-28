import { useContext, useEffect, useState } from "react";
import styles from "./styles";
import MediaOverviewItem from "./MediaOverviewItem";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Helmet, HelmetProvider } from "react-helmet-async";
import CacheContext from "../../shared/CacheContext";

const MediaOverview = () => {
  const cacheContext = useContext(CacheContext);
  if (!cacheContext) {
    throw new Error("MediaPage must be used within a CacheProvider");
  }
  const { media, fetchMedia } = cacheContext;
  useEffect(() => {
    if (!media) {
      fetchMedia();
    }
  }, [media, fetchMedia]);

  const [currentPage, setCurrentPage] = useState(1);
  const { t, i18n } = useTranslation();

  const articlesPerPage = 12;

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const getMediaSlice = () => {
    const start = (currentPage - 1) * articlesPerPage;
    const end = start + articlesPerPage;
    return media ? media.slice(start, end) : [];
  };

  const languageIsEnglish = i18n.language.includes("en");

  return (
    <HelmetProvider>
      <Helmet>
        <title>Nordic Storm Media - Photos, Videos, and Highlights</title>
        <meta
          name="description"
          content="Explore photos, videos, and highlights from the Nordic Storm American football team. Check out the action from our latest games and events."
        />
        <meta
          name="keywords"
          content="Nordic Storm Media, American Football Photos, American Football Videos, Copenhagen Football Highlights, Denmark Football Media, ELF Team Media, Nordic Storm Highlights, Football Action Videos"
        />
        <meta
          property="og:title"
          content="Nordic Storm Media - Photos, Videos, and Highlights"
        />
        <meta
          property="og:description"
          content="Explore photos, videos, and highlights from the Nordic Storm American football team. Check out the action from our latest games and events."
        />
        <meta
          property="og:image"
          content="/path/to/your/media-page-image.jpg"
        />
      </Helmet>
      <div style={styles.container}>
        <div style={styles.mediaPage}>
          {getMediaSlice().map((mediaItem, index) => (
            <MediaOverviewItem
              key={index}
              title={
                languageIsEnglish ? mediaItem.mediaNameEn : mediaItem.mediaName
              }
              mediaDate={mediaItem.date}
              mediaImage={mediaItem.images[0]}
              id={mediaItem.id}
            />
          ))}
        </div>

        {getMediaSlice().length >= articlesPerPage || currentPage > 1 ? (
          <div style={styles.pagination}>
            {currentPage > 1 ? (
              <div onClick={handlePrevPage} style={styles.paginationButton}>
                <FontAwesomeIcon icon={faArrowLeft} />
              </div>
            ) : null}
            <div style={styles.pageNumber}>{`${t("page")} ${currentPage}`}</div>
            {getMediaSlice().length >= articlesPerPage ? (
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

export default MediaOverview;
