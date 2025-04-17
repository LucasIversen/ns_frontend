import { useContext, useEffect } from "react";
import styles from "./styles";
import "./htmlStyles.css";
import { useTranslation } from "react-i18next";
import { article } from "../../shared/types";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { InstagramEmbed } from "react-social-media-embed";
import CacheContext from "../../shared/CacheContext";

const News = () => {
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

  const id = window.location.pathname.split("/")[2];
  const { i18n } = useTranslation();
  const article = news?.find((article: article) => article.id === id);

  if (!article) return <p>Loading...</p>;
  else if (article.elfLink) {
    window.open(article.elfLink, "_self");
    return null;
  }

  const languageIsEnglish = i18n.language.includes("en");
  const parts = !article
    ? []
    : languageIsEnglish
    ? article.partsEn
    : article.parts;

  return (
    <HelmetProvider>
      <Helmet>
        <title>{article.title}</title>
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.description} />
        <meta property="og:image" content={article.articleImage || ""} />
        <meta
          property="og:url"
          content={`https://nordicstorm.net/news/${article.id}`}
        />
        <meta property="og:type" content="article" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.description} />
        <meta name="twitter:image" content={article.articleImage || ""} />
      </Helmet>
      <div style={styles.newsOuterContainer}>
        {news ? (
          <div style={styles.newsContainer}>
            <div style={styles.newsTitleContainer}>
              <div style={styles.newsTitle}>
                {languageIsEnglish ? article.titleEn : article.title}
              </div>
              <div style={styles.newsDate}>{article.newsDate}</div>
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
