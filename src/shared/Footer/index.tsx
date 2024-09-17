import React, { useEffect } from "react";
import Props from "./interfaces";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTiktok,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import styles from "./styles";
import SecondaryLogo from "../../assets/secondary_logo.png";
import { useTranslation } from "react-i18next";

const Footer = (props: Props) => {
  const { t } = useTranslation();
  const [windowWidth, setWindowWidth] = React.useState(window.innerWidth);

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
          <a href="mailto:contact@email.com" style={styles.email}>
            contact@email.com
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
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faFacebookF} style={styles.icon} />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faInstagram} style={styles.icon} />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faTiktok} style={styles.icon} />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={faXTwitter} style={styles.icon} />
            </a>
          </div>
        </div>
      </div>

      <div style={styles.copyright}>
        <p>© Nordic Storm 2024</p>
      </div>
    </div>
  );
};

export default Footer;
