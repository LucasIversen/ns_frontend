import { useEffect, useState } from "react";
import styles from "./styles";
import MediaOverviewItem from "./MediaOverviewItem";
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  startAfter,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const MediaOverview = () => {
  const [media, setMedia] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [lastVisible, setLastVisible] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { t, i18n } = useTranslation();

  const articlesPerPage = 12;

  const fetchMedia = async (page = 1) => {
    setLoading(true);
    try {
      // Create a query with sorting, limiting, and pagination
      let media = query(
        collection(db, "media"),
        orderBy("date", "desc"),
        limit(articlesPerPage)
      );

      // If not the first page, use the last visible document to start after
      if (page > 1 && lastVisible) {
        media = query(
          collection(db, "media"),
          orderBy("date", "desc"),
          startAfter(lastVisible),
          limit(articlesPerPage)
        );
      }

      const querySnapshot = await getDocs(media);

      // Get the last visible document for pagination
      const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      setLastVisible(lastVisibleDoc);

      // Map the documents to articles and add them to the news array
      const newMedia = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));

      setMedia(newMedia);
    } catch (error) {
      console.log("Error getting documents: ", error);
    } finally {
      setLoading(false);
      console.log(loading);
    }
  };

  useEffect(() => {
    fetchMedia(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const languageIsEnglish = i18n.language.includes("en");

  return (
    <div style={styles.container}>
      <div style={styles.mediaPage}>
        {media.map((mediaItem, index) => (
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

      {media.length >= articlesPerPage || currentPage > 1 ? (
        <div style={styles.pagination}>
          {currentPage > 1 ? (
            <div onClick={handlePrevPage} style={styles.paginationButton}>
              <FontAwesomeIcon icon={faArrowLeft} />
            </div>
          ) : null}
          <div style={styles.pageNumber}>{`${t("page")} ${currentPage}`}</div>
          {media.length >= articlesPerPage ? (
            <div onClick={handleNextPage} style={styles.paginationButton}>
              <FontAwesomeIcon icon={faArrowRight} />
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default MediaOverview;
