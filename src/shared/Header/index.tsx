import { useEffect, useState } from "react";
import styles from "./styles";
import { useNavigate } from "react-router-dom";
import PrimaryLogo from "../../assets/primary_logo.png";
import SimpleLogo from "../../assets/simple_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTiktok,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { colors } from "../../assets/colors";
import { faGlobe, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const Header = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [aboutUsMenuOpen, setAboutUsMenuOpen] = useState(false);
  const [mobileSubMenuOpen, setMobileSubMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [mobileLanguageMenuOpen, setMobileLanguageMenuOpen] = useState(false);
  const [languageModalOpen, setLanguageModalOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component is unmounted
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentRoute = window.location.pathname;

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng); // Switch the language
  };

  const isMobile = windowWidth <= 920;

  return (
    <div style={styles.header}>
      {!isMobile ? (
        <div style={styles.mainContent}>
          <div style={styles.navButtons}>
            <div
              style={
                currentRoute === "/" ? styles.navButtonPicked : styles.navButton
              }
              onClick={() => {
                setAboutUsMenuOpen(false);
                navigate("/");
              }}
            >
              {t("home")}
            </div>
            <div
              style={
                currentRoute.includes("news")
                  ? styles.navButtonPicked
                  : styles.navButton
              }
              onClick={() => {
                setAboutUsMenuOpen(false);
                navigate("/news");
              }}
            >
              {t("news")}
            </div>
            <div
              style={
                currentRoute.includes("media")
                  ? styles.navButtonPicked
                  : styles.navButton
              }
              onClick={() => {
                setAboutUsMenuOpen(false);
                navigate("/media");
              }}
            >
              {t("media")}
            </div>
            <div
              style={
                currentRoute.includes("faq") ||
                currentRoute.includes("investor") ||
                currentRoute.includes("about_us")
                  ? styles.navButtonPicked
                  : styles.navButton
              }
              onClick={() => {
                //navigate("/faq");
                setAboutUsMenuOpen(!aboutUsMenuOpen);
              }}
            >
              {t("info")}
            </div>
          </div>
          <div style={styles.logo}>
            <img
              style={styles.logoImage}
              src={PrimaryLogo}
              alt="Logo"
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
          <div style={styles.socialsAndLanguage}>
            <div style={styles.socials}>
              <FontAwesomeIcon
                style={styles.socialIcon}
                icon={faFacebookF}
                size="1x"
                color={colors.darkBlue}
                onClick={() => {
                  window.open(
                    "https://www.facebook.com/profile.php?id=61563584339767&locale=da_DK"
                  );
                }}
              />
              <FontAwesomeIcon
                style={styles.socialIcon}
                icon={faInstagram}
                size="1x"
                color={colors.darkBlue}
                onClick={() => {
                  window.open("https://www.instagram.com/nordicstormfootball/");
                }}
              />
              <FontAwesomeIcon
                style={styles.socialIcon}
                icon={faXTwitter}
                size="1x"
                color={colors.darkBlue}
                onClick={() => {
                  window.open("https://x.com/NordicStormFTB");
                }}
              />
              <FontAwesomeIcon
                style={styles.socialIcon}
                icon={faTiktok}
                size="1x"
                color={colors.darkBlue}
                onClick={() => {
                  window.open("https://www.tiktok.com/@nordic_storm");
                }}
              />
            </div>
            <div
              style={styles.language}
              onClick={() => setLanguageModalOpen(!languageModalOpen)}
            >
              <div style={styles.languageText}>
                {i18n.language.includes("en") ? "EN" : "DK"}
              </div>
              <FontAwesomeIcon
                style={styles.socialIcon}
                icon={faGlobe}
                size="1x"
                color={colors.darkBlue}
              />
            </div>
          </div>
        </div>
      ) : (
        <div style={styles.mainContentMobile}>
          <div style={styles.simpleLogo}>
            <img
              style={styles.simpleLogoImage}
              src={SimpleLogo}
              alt="Logo"
              onClick={() => {
                navigate("/");
              }}
            />
          </div>

          <div style={styles.burgerMenu}>
            <FontAwesomeIcon
              icon={isMenuOpen ? faTimes : faBars}
              size="2x"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={{
                ...styles.burgerIcon,
                transition: "transform 0.3s ease-in-out",
                transform: isMenuOpen ? "rotate(90deg)" : "rotate(0deg)",
              }}
              color={colors.darkBlue}
            />
          </div>
        </div>
      )}
      <div style={styles.borderBottom}></div>

      {!isMobile && aboutUsMenuOpen ? (
        <div style={styles.mobileMenu}>
          <div
            style={
              currentRoute.includes("faq")
                ? styles.mobileNavButtonPicked
                : styles.mobileNavButton
            }
            onClick={() => {
              navigate("faq");
              setAboutUsMenuOpen(false);
            }}
          >
            {t("faq")}
          </div>

          <div
            style={
              currentRoute.includes("investor")
                ? styles.mobileNavButtonPicked
                : styles.mobileNavButton
            }
            onClick={() => {
              navigate("investor");
              setAboutUsMenuOpen(false);
            }}
          >
            {t("investor")}
          </div>

          <div
            style={
              currentRoute.includes("about_us")
                ? styles.mobileNavButtonPicked
                : styles.mobileNavButton
            }
            onClick={() => {
              navigate("about_us");
              setAboutUsMenuOpen(false);
            }}
          >
            {t("aboutUs")}
          </div>
        </div>
      ) : null}

      {isMobile && isMenuOpen && (
        <div style={styles.mobileMenu}>
          <div
            style={
              currentRoute === "/"
                ? styles.mobileNavButtonPicked
                : styles.mobileNavButton
            }
            onClick={() => {
              navigate("/");
              setIsMenuOpen(false);
            }}
          >
            {t("home")}
          </div>
          <div
            style={
              currentRoute.includes("news")
                ? styles.mobileNavButtonPicked
                : styles.mobileNavButton
            }
            onClick={() => {
              navigate("/news");
              setIsMenuOpen(false);
            }}
          >
            {t("news")}
          </div>
          <div
            style={
              currentRoute.includes("media")
                ? styles.mobileNavButtonPicked
                : styles.mobileNavButton
            }
            onClick={() => {
              navigate("/media");
              setIsMenuOpen(false);
            }}
          >
            {t("media")}
          </div>
          <div
            style={
              currentRoute.includes("faq") ||
              currentRoute.includes("investor") ||
              currentRoute.includes("about_us") ||
              mobileSubMenuOpen
                ? styles.mobileNavButtonPicked
                : styles.mobileNavButton
            }
            onClick={() => {
              setMobileSubMenuOpen(!mobileSubMenuOpen);
            }}
          >
            {t("info")}
          </div>

          {mobileSubMenuOpen ? (
            <div style={styles.mobileSubMenu}>
              <div
                style={
                  currentRoute.includes("faq")
                    ? styles.mobileSubNavButtonPicked
                    : styles.mobileSubNavButton
                }
                onClick={() => {
                  navigate("faq");
                  setMobileSubMenuOpen(false);
                  setIsMenuOpen(false);
                }}
              >
                {t("faq")}
              </div>

              <div
                style={
                  currentRoute.includes("investor")
                    ? styles.mobileSubNavButtonPicked
                    : styles.mobileSubNavButton
                }
                onClick={() => {
                  navigate("investor");
                  setMobileSubMenuOpen(false);
                  setIsMenuOpen(false);
                }}
              >
                {t("investor")}
              </div>

              <div
                style={
                  currentRoute.includes("about_us")
                    ? styles.mobileSubNavButtonPicked
                    : styles.mobileSubNavButton
                }
                onClick={() => {
                  navigate("about_us");
                  setMobileSubMenuOpen(false);
                  setIsMenuOpen(false);
                }}
              >
                {t("aboutUs")}
              </div>
            </div>
          ) : null}

          <div
            style={styles.mobileNavButton}
            onClick={() => setMobileLanguageMenuOpen(!mobileLanguageMenuOpen)}
          >
            {"Language"}
          </div>

          {mobileLanguageMenuOpen ? (
            <div style={styles.mobileLanguageSubMenu}>
              <div
                style={styles.mobileSubNavButton}
                onClick={() => {
                  changeLanguage("da");
                  setMobileLanguageMenuOpen(false);
                  setIsMenuOpen(false);
                }}
              >
                DA
              </div>

              <div
                style={styles.mobileSubNavButton}
                onClick={() => {
                  changeLanguage("en");
                  setMobileLanguageMenuOpen(false);
                  setIsMenuOpen(false);
                }}
              >
                EN
              </div>
            </div>
          ) : null}

          <div style={styles.mobileSocials}>
            <FontAwesomeIcon
              style={styles.socialIcon}
              icon={faFacebookF}
              size="1x"
              color={colors.darkBlue}
              onClick={() => {
                window.open(
                  "https://www.facebook.com/profile.php?id=61563584339767&locale=da_DK"
                );
              }}
            />
            <FontAwesomeIcon
              style={styles.socialIcon}
              icon={faInstagram}
              size="1x"
              color={colors.darkBlue}
              onClick={() => {
                window.open("https://www.instagram.com/nordicstormfootball/");
              }}
            />
            <FontAwesomeIcon
              style={styles.socialIcon}
              icon={faXTwitter}
              size="1x"
              color={colors.darkBlue}
              onClick={() => {
                window.open("https://x.com/NordicStormFTB");
              }}
            />
            <FontAwesomeIcon
              style={styles.socialIcon}
              icon={faTiktok}
              size="1x"
              color={colors.darkBlue}
              onClick={() => {
                window.open("https://www.tiktok.com/@nordic_storm");
              }}
            />
          </div>
        </div>
      )}

      {languageModalOpen ? (
        <div style={styles.languageSelector}>
          <div style={styles.languageSelectorContent}>
            <div
              style={
                i18n.language.includes("en")
                  ? styles.languageSelectorButton
                  : styles.languageSelectorButtonPicked
              }
              onClick={() => {
                changeLanguage("da");
                setLanguageModalOpen(false);
              }}
            >
              Dansk
            </div>
            <div
              style={
                i18n.language.includes("en")
                  ? styles.languageSelectorButtonPicked
                  : styles.languageSelectorButton
              }
              onClick={() => {
                changeLanguage("en");
                setLanguageModalOpen(false);
              }}
            >
              English
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Header;
