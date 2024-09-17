import React, { useEffect, useState } from "react";
import { Props } from "./interfaces";
import styles from "./styles";
import { useNavigate } from "react-router-dom";
import PrimaryLogo from "../../assets/primary_logo.png";
import SimpleLogo from "../../assets/simple_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTiktok,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { colors } from "../../assets/colors";
import { faGlobe, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const Header = (props: Props) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
                navigate("/media");
              }}
            >
              {t("media")}
            </div>
            <div
              style={
                currentRoute.includes("faq")
                  ? styles.navButtonPicked
                  : styles.navButton
              }
              onClick={() => {
                navigate("/faq");
              }}
            >
              {t("faq")}
            </div>
          </div>
          <div style={styles.logo}>
            <img style={styles.logoImage} src={PrimaryLogo} alt="Logo" />
          </div>
          <div style={styles.socialsAndLanguage}>
            <div style={styles.socials}>
              <FontAwesomeIcon
                style={styles.socialIcon}
                icon={faFacebookF}
                size="1x"
                color={colors.darkBlue}
              />
              <FontAwesomeIcon
                style={styles.socialIcon}
                icon={faInstagram}
                size="1x"
                color={colors.darkBlue}
              />
              <FontAwesomeIcon
                style={styles.socialIcon}
                icon={faTwitter}
                size="1x"
                color={colors.darkBlue}
              />
              <FontAwesomeIcon
                style={styles.socialIcon}
                icon={faTiktok}
                size="1x"
                color={colors.darkBlue}
              />
            </div>
            <div
              style={styles.language}
              onClick={() => {
                i18n.language.includes("en")
                  ? changeLanguage("da")
                  : changeLanguage("en");
              }}
            >
              <div style={styles.languageText}>
                {i18n.language.includes("en") ? "DK" : "EN"}
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
            <img style={styles.simpleLogoImage} src={SimpleLogo} alt="Logo" />
          </div>

          <div style={styles.burgerMenu}>
            <FontAwesomeIcon
              icon={isMenuOpen ? faTimes : faBars}
              size="2x"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              style={styles.burgerIcon}
              color={colors.darkBlue}
            />
          </div>
        </div>
      )}
      <div style={styles.borderBottom}></div>

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
              currentRoute.includes("faq")
                ? styles.mobileNavButtonPicked
                : styles.mobileNavButton
            }
            onClick={() => {
              navigate("/faq");
              setIsMenuOpen(false);
            }}
          >
            {t("faq")}
          </div>

          <div style={styles.mobileSocials}>
            <FontAwesomeIcon
              style={styles.socialIcon}
              icon={faFacebookF}
              size="1x"
              color={colors.darkBlue}
            />
            <FontAwesomeIcon
              style={styles.socialIcon}
              icon={faInstagram}
              size="1x"
              color={colors.darkBlue}
            />
            <FontAwesomeIcon
              style={styles.socialIcon}
              icon={faTwitter}
              size="1x"
              color={colors.darkBlue}
            />
            <FontAwesomeIcon
              style={styles.socialIcon}
              icon={faTiktok}
              size="1x"
              color={colors.darkBlue}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
