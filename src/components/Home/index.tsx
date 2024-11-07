import { useEffect, useState } from "react";
import styles from "./styles";
import Video from "../../assets/video.mp4";
import NewsItem from "./NewsItem";
import { useTranslation } from "react-i18next";
import {
  addDoc,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
} from "firebase/firestore";
import MediaItem from "./MediaItem";
import { db } from "../../firebase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../assets/colors";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Home = () => {
  const { t, i18n } = useTranslation();
  const [news, setNews] = useState<any[]>([]);
  const [media, setMedia] = useState<any[]>([]);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component is unmounted
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchNews = async () => {
    const newsQuery = query(
      collection(db, "news"),
      orderBy("newsDate", "desc"),
      limit(5)
    );

    await getDocs(newsQuery)
      .then((querySnapshot) => {
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
    const mediaQuery = query(
      collection(db, "media"),
      orderBy("date", "desc"),
      limit(5)
    );

    await getDocs(mediaQuery)
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

  const isMobile = windowWidth <= 920;
  const languageIsEnglish = i18n.language.includes("en");

  return (
    <HelmetProvider>
      <Helmet>
        <title>Nordic Storm - American Football Team</title>
        <meta
          name="description"
          content="Welcome to Nordic Storm, the premier American football team in Copenhagen, Denmark. Get the latest news, events, and updates."
        />
        <meta
          name="keywords"
          content="Nordic Storm, American Football Copenhagen, American Football Denmark, American Football Sweden, Football Copenhagen, Football Denmark, Football Sweden, Copenhagen Football Team, ELF Team Denmark, ELF Team Sweden, ELF Team Nordic, ELF Team Copenhagen"
        />
        <meta
          property="og:title"
          content="Nordic Storm - American Football Team"
        />
        <meta
          property="og:description"
          content="Welcome to Nordic Storm, the premier American football team in Copenhagen, Denmark. Get the latest news, events, and updates."
        />
        <meta property="og:image" content="/assets/primary_logo-oczmX7WM.png" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div style={styles.homepage}>
        <div style={styles.bannerImage}>
          {/* <img src={Stadium} style={styles.image} alt="Stadium" />
        <div style={isMobile ? styles.imageTextMobile : styles.imageText}>
          WE ARE NORDIC STORM
        </div> */}
          <video
            style={isMobile ? styles.mobileVideo : styles.video}
            src={Video}
            autoPlay
            loop
            muted
            playsInline
          />
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
                      title={
                        languageIsEnglish ? article.titleEn : article.title
                      }
                      description={
                        languageIsEnglish
                          ? article.descriptionEn
                          : article.description
                      }
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
                      title={
                        languageIsEnglish ? media.mediaNameEn : media.mediaName
                      }
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

        <div
          style={isMobile ? styles.newsletterBarMobile : styles.newsletterBar}
        >
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
    </HelmetProvider>
  );
};

export default Home;
