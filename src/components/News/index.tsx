import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import styles from "./styles";
import "./htmlStyles.css";
import { useTranslation } from "react-i18next";
import { article } from "../../shared/types";

const News = () => {
  const [news, setNews] = useState<article | undefined>(undefined);
  const id = window.location.pathname.split("/")[2];
  const { i18n } = useTranslation();

  const fetchSingleNews = async () => {
    console.log("Fetching news item with ID:", id);
    const docRef = doc(db, "news", id); // Reference to the specific document with the given ID

    try {
      const docSnap = await getDoc(docRef); // Fetch the document snapshot
      if (docSnap.exists()) {
        const newsItem = { ...docSnap.data(), id: docSnap.id } as article;
        setNews(newsItem); // Set the fetched news item to state
        console.log("Fetched news item:", newsItem);
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.log("Error getting document: ", error);
    }
  };

  useEffect(() => {
    fetchSingleNews();
  }, []);

  const languageIsEnglish = i18n.language.includes("en");
  const parts = !news ? [] : languageIsEnglish ? news.partsEn : news.parts;

  return (
    <div style={styles.newsOuterContainer}>
      {news ? (
        <div style={styles.newsContainer}>
          <div style={styles.newsTitleContainer}>
            <div style={styles.newsTitle}>
              {languageIsEnglish ? news.titleEn : news.title}
            </div>
            <div style={styles.newsDate}>{news.newsDate}</div>
          </div>
          <div style={styles.parts}>
            {parts.map((part: any, index: number) => {
              switch (part.type) {
                case "htmlBlock":
                  return (
                    <div style={styles.htmlContainer} key={index}>
                      <div
                        key={part.id}
                        dangerouslySetInnerHTML={{ __html: part.html }}
                      />
                    </div>
                  );
                case "imageBlock":
                  return (
                    <div style={styles.imageContainer} key={index}>
                      <img key={part.id} src={part.imageUrl} alt={part.alt} />
                    </div>
                  );
                case "imageHtmlBlock":
                  return (
                    <div style={styles.imageHtmlContainer} key={index}>
                      <div style={styles.imageContainer}>
                        <img
                          style={styles.halfImage}
                          key={part.id}
                          src={part.imageUrl}
                          alt={part.alt}
                        />
                      </div>
                      <div
                        key={part.id}
                        dangerouslySetInnerHTML={{ __html: part.html }}
                      />
                    </div>
                  );
                case "htmlImageBlock":
                  return (
                    <div style={styles.htmlImageContainer} key={index}>
                      <div
                        key={part.id}
                        dangerouslySetInnerHTML={{ __html: part.html }}
                      />
                      <div style={styles.imageContainer}>
                        <img
                          style={styles.halfImage}
                          key={part.id}
                          src={part.imageUrl}
                          alt={part.alt}
                        />
                      </div>
                    </div>
                  );
                case "linkBlock":
                  return (
                    <div style={styles.linkContainer} key={index}>
                      <a key={part.id} href={part.linkUrl}>
                        {part.linkText}
                      </a>
                    </div>
                  );
                default:
                  return null;
              }
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default News;
