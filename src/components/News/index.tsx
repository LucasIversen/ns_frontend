import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import styles from "./styles";
import "./htmlStyles.css";
import { useTranslation } from "react-i18next";
import { article } from "../../shared/types";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { InstagramEmbed } from "react-social-media-embed";

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

  if (!news) return <p>Loading...</p>;

  const languageIsEnglish = i18n.language.includes("en");
  const parts = !news ? [] : languageIsEnglish ? news.partsEn : news.parts;

  return (
    <HelmetProvider>
      <Helmet>
        <title>{news.title}</title>
        <meta property="og:title" content={news.title} />
        <meta property="og:description" content={news.description} />
        <meta property="og:image" content={news.articleImage || ""} />
        <meta
          property="og:url"
          content={`https://nordicstorm.net/news/${news.id}`}
        />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={news.title} />
        <meta name="twitter:description" content={news.description} />
        <meta name="twitter:image" content={news.articleImage || ""} />
      </Helmet>
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
                        <div style={styles.innerImageContainer}>
                          <img
                            style={styles.image}
                            key={part.id}
                            src={part.imageUrl}
                            alt={part.alt}
                          />
                        </div>
                        {part.imageText ? (
                          <div style={styles.imageCaption}>
                            {part.imageText}
                          </div>
                        ) : null}
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
                  case "instagram_post":
                    return (
                      <div style={styles.instagramContainer} key={index}>
                        <div style={styles.instagramInnerContainer}>
                          <InstagramEmbed url={part.link} />
                        </div>
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
    </HelmetProvider>
  );
};

export default News;
