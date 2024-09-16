import React from "react";
import { Props } from "./interfaces";
import styles from "./styles";
import { useNavigate } from "react-router-dom";
import PrimaryLogo from "../../assets/primary_logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTiktok,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { colors } from "../../assets/colors";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

const Header = (props: Props) => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng); // Switch the language
  };

  return (
    <div style={styles.header}>
      <div style={styles.mainContent}>
        <div style={styles.navButtons}>
          <div
            style={styles.navButton}
            onClick={() => {
              navigate("/");
            }}
          >
            {t("home")}
          </div>
          <div
            style={styles.navButton}
            onClick={() => {
              navigate("/news");
            }}
          >
            {t("news")}
          </div>
          <div
            style={styles.navButton}
            onClick={() => {
              navigate("/media");
            }}
          >
            {t("media")}
          </div>
          <div
            style={styles.navButton}
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
      <div style={styles.borderBottom}></div>
    </div>
  );
};

export default Header;
