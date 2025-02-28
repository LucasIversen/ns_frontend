import { useCallback, useContext, useEffect, useState } from "react";
import styles from "./styles";
import Video from "../../assets/video.mp4";
import NewsItem from "./NewsItem";
import { useTranslation } from "react-i18next";
import MediaItem from "./MediaItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../assets/colors";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { matchup } from "../Schedule/interfaces";
import "./home.css";
import CacheContext from "../../shared/CacheContext";

const Home = () => {
  const cacheContext = useContext(CacheContext);
  if (!cacheContext) {
    throw new Error("MediaPage must be used within a CacheProvider");
  }

  const { t, i18n } = useTranslation();
  const { media, fetchMedia } = cacheContext;
  const { news, fetchNews } = cacheContext;
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [email, setEmail] = useState<string>("");
  const [firstName, setFirstName] = useState<string>("");
  const { schedule, fetchSchedule } = cacheContext;

  const nextHomeGame = useCallback(() => {
    if (!schedule) {
      return null;
    }
    return schedule
      .filter((matchup: matchup) => matchup.home && !matchup.result)
      .sort((a: matchup, b: matchup) => a.week - b.week)[0];
  }, [schedule]);

  const calculateTimeLeft = useCallback(() => {
    if (!nextHomeGame()?.isoTime) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    const now = new Date();
    const target = new Date(nextHomeGame().isoTime);
    const difference = target.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((difference / (1000 * 60)) % 60);
    const seconds = Math.floor((difference / 1000) % 60);

    return { days, hours, minutes, seconds };
  }, [nextHomeGame]);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    if (!schedule) {
      fetchSchedule();
    }
  }, [schedule, fetchSchedule]);

  useEffect(() => {
    if (!media) fetchMedia();
  }, [media, fetchMedia]);

  useEffect(() => {
    if (!news) fetchNews();
  }, [news, fetchNews]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component is unmounted
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const newsletterSignUp = async () => {
    const isEmailValid = email.includes("@") && email.includes(".");
    if (!isEmailValid || firstName === "") {
      alert(t("enterValidEmail"));
    } else {
      const mailchimpUrl =
        "https://nordicstorm.us14.list-manage.com/subscribe/post?u=4733b77aff832ee71ea28fe20&id=2afc549ac1&f_id=00bcc2e1f0";
      const formData = new FormData();
      formData.append("EMAIL", email);
      formData.append("FNAME", firstName);
      formData.append("tags", "271");

      fetch(mailchimpUrl, {
        method: "POST",
        body: formData,
        mode: "no-cors", // This avoids CORS issues, but limits response handling
      })
        .then(() => {
          alert(t("newsletterSignUpSuccess"));
          setEmail("");
          setFirstName("");
        })
        .catch(() => alert(t("newsletterSignUpError")));
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [nextHomeGame, calculateTimeLeft]);

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
          <video
            style={isMobile ? styles.mobileVideo : styles.video}
            src={Video}
            autoPlay
            loop
            muted
            playsInline
          />

          {nextHomeGame() && !isMobile ? (
            <div style={styles.nextGameBar}>
              <div style={styles.nextGameInfo}>
                <div style={styles.timeAndDate}>
                  <div style={styles.nextGameDate}>
                    {i18n.language === "en"
                      ? nextHomeGame().dateEn
                      : nextHomeGame().date}
                  </div>
                  <div style={styles.nextGameTime}>{nextHomeGame().time}</div>
                </div>
                <div style={styles.nextGameTeam}>
                  <img
                    style={styles.nextGameLogo}
                    src={nextHomeGame().teamLogo}
                    alt="Team Logo"
                  />
                </div>
                <div style={styles.nextGameName}>{nextHomeGame().teamName}</div>
                {nextHomeGame().isoTime && (
                  <div style={styles.nextGameCountdown}>
                    {languageIsEnglish ? (
                      <div style={styles.nextGameCountdownTime}>
                        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
                        {timeLeft.seconds}s
                      </div>
                    ) : (
                      <div style={styles.nextGameCountdownTime}>
                        {timeLeft.days}d {timeLeft.hours}t {timeLeft.minutes}m{" "}
                        {timeLeft.seconds}s
                      </div>
                    )}
                  </div>
                )}
                <div style={styles.ticketsContainer}>
                  <div className="next_game_tickets">
                    <a
                      href={nextHomeGame().ticketsLink || ""}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {t("tickets")}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : nextHomeGame() && isMobile ? (
            <div style={styles.nextGameBar}>
              <div style={styles.nextGameInfoMobile}>
                <div style={styles.nextGameTopInfoMobile}>
                  <div style={styles.nextGameTeam}>
                    <img
                      style={styles.nextGameLogo}
                      src={nextHomeGame().teamLogo}
                      alt="Team Logo"
                    />
                  </div>
                  <div style={styles.nextGameName}>
                    {nextHomeGame().teamName}
                  </div>
                  <div style={styles.timeAndDate}>
                    <div style={styles.nextGameDate}>
                      {i18n.language === "en"
                        ? nextHomeGame().dateEn
                        : nextHomeGame().date}
                    </div>
                    <div style={styles.nextGameTime}>{nextHomeGame().time}</div>
                  </div>
                  <div style={styles.ticketsContainer}>
                    <div className="next_game_tickets_mobile">
                      <a
                        href={nextHomeGame().ticketsLink || ""}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {t("tickets")}
                      </a>
                    </div>
                  </div>
                </div>
                {nextHomeGame().isoTime && (
                  <div style={styles.nextGameCountdownMobile}>
                    {languageIsEnglish ? (
                      <div style={styles.nextGameCountdownTime}>
                        {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{" "}
                        {timeLeft.seconds}s
                      </div>
                    ) : (
                      <div style={styles.nextGameCountdownTime}>
                        {timeLeft.days}d {timeLeft.hours}t {timeLeft.minutes}m{" "}
                        {timeLeft.seconds}s
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ) : null}
        </div>

        {news?.length ?? 0 > 0 ? (
          <div style={styles.newsBar}>
            <div style={styles.newsTitle}>{t("news")}</div>
            <div style={styles.newsItems}>
              {news?.slice(0, 5).map((article, index) => {
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

        {media?.length ?? 0 > 0 ? (
          <div style={styles.mediaBar}>
            <div style={styles.mediaTitle}>{t("media")}</div>
            <div style={styles.mediaItems}>
              {media?.slice(0, 5).map((media, index) => {
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
          <div
            style={
              isMobile
                ? styles.newsletterInputMobileContatiner
                : styles.newsletterInputContatiner
            }
          >
            <input
              style={styles.newsletterInput}
              type="email"
              placeholder={t("email")}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              style={styles.newsletterInput}
              type="text"
              placeholder={t("name")}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
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
