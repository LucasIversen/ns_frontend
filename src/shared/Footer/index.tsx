import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faLinkedin,
  faTiktok,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import styles from "./styles";
import SecondaryLogo from "../../assets/secondary_logo.png";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const { t } = useTranslation();
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component is unmounted
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const isMobile = windowWidth <= 920;

  return (
    <div style={isMobile ? styles.footerMobile : styles.footer}>
      <div style={isMobile ? styles.mainContentMobile : styles.mainContent}>
        <div style={styles.contact}>
          <h3 style={styles.title}>{t("contact")}</h3>
          <a href="mailto:info@nordicstorm.net" style={styles.email}>
            info@nordicstorm.net
          </a>
        </div>

        <div style={styles.logoContainer}>
          <img
            src={SecondaryLogo}
            alt="Nordic Storm Logo"
            style={styles.logo}
          />
        </div>

        <div style={styles.socials}>
          <h3 style={styles.title}>SOCIALS</h3>
          <div style={styles.socialIcons}>
            <a
              href="https://www.facebook.com/profile.php?id=61563584339767&locale=da_DK"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faFacebookF} style={styles.icon} />
            </a>
            <a
              href="https://www.instagram.com/nordicstormfootball/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} style={styles.icon} />
            </a>
            <a
              href="https://x.com/NordicStormFTB"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faXTwitter} style={styles.icon} />
            </a>
            <a
              href="https://www.tiktok.com/@nordic_storm"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTiktok} style={styles.icon} />
            </a>
            <a
              href="https://www.linkedin.com/company/nordic-storm/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faLinkedin} style={styles.icon} />
            </a>
          </div>
        </div>
      </div>

      <div style={styles.copyright} onClick={() => navigate("login")}>
        © Nordic Storm 2024
      </div>
    </div>
  );
};

export default Footer;
