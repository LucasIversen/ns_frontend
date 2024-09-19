import React, { useEffect, useState } from "react";
import Props from "./interfaces";
import styles from "./styles";
import Stadium from "../../assets/stadium.png";
import StockImage from "../../assets/stock_image.jpg";
import NewsItem from "./NewsItem";
import { useTranslation } from "react-i18next";
import { addDoc, collection, getDocs } from "firebase/firestore";
import MediaItem from "./MediaItem";
import { db } from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../assets/colors";

const Home = (props: Props) => {
  const { t, i18n } = useTranslation();
  const [news, setNews] = useState<any[]>([]);
  const [media, setMedia] = useState<any[]>([]);

  const [email, setEmail] = useState<string>("");

  const fetchNews = async () => {
    console.log("fetching news");
    await getDocs(collection(db, "news"))
      .then((querySnapshot) => {
        console.log("querySnapshot", querySnapshot);
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setNews(newData);
        console.log(news, newData);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  const fetchMedia = async () => {
    console.log("fetching");
    await getDocs(collection(db, "media"))
      .then((querySnapshot) => {
        console.log("querySnapshot", querySnapshot);
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMedia(newData);
        console.log(media, newData);
      })
      .catch((error) => {
        console.log("Error getting documents: ", error);
      });
  };

  useEffect(() => {
    fetchNews();
    fetchMedia();
  }, []);

  const newsletterSignUp = async () => {
    try {
      const isEmailValid = email.includes("@") && email.includes(".");
      if (!isEmailValid) {
        alert(t("enterValidEmail"));
      } else {
        // add to database
        const docRef = await addDoc(collection(db, "newsletterSignups"), {
          email,
        });
        console.log("Document written with ID: ", docRef.id);

        console.log(email);
        setEmail("");
        alert(t("newsletterSignUpSuccess"));
      }
    } catch (error) {
      alert(t("newsletterSignUpError"));
    }
  };

  return (
    <div style={styles.homepage}>
      <div style={styles.bannerImage}>
        <img src={Stadium} style={styles.image} alt="Stadium" />
        <div style={styles.imageText}>WE ARE NORDIC STORM</div>
      </div>

      {news.length > 0 ? (
        <div style={styles.newsBar}>
          <div style={styles.newsTitle}>{t("news")}</div>
          <div style={styles.newsItems}>
            {news.map((article, index) => {
              return (
                <div
                  style={index == 0 ? styles.firstItem : styles.item}
                  key={index}
                >
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
      ) : null}

      {news.length > 0 ? (
        <div style={styles.mediaBar}>
          <div style={styles.mediaTitle}>{t("media")}</div>
          <div style={styles.mediaItems}>
            {media.map((media, index) => {
              return (
                <div
                  style={index == 0 ? styles.firstItem : styles.item}
                  key={index}
                >
                  <MediaItem
                    title={media.mediaName}
                    date={media.date}
                    image={media.images[0]}
                    id={media.id}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : null}

      <div style={styles.newsletterBar}>
        <div style={styles.newsletterTitle}>{t("newsletterSignUp")}</div>
        <div style={styles.newsletterInputContatiner}>
          <input
            style={styles.newsletterInput}
            type="email"
            placeholder={t("email")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div style={styles.newsletterButton} onClick={newsletterSignUp}>
            <FontAwesomeIcon
              icon={faPaperPlane}
              color={colors.offWhite}
              size="2x"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
