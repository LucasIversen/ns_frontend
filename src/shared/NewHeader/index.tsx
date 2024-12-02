import React, { useEffect, useState } from "react";
import "./Header.css"; // Import the CSS file
import FloatingHeader from "../../assets/floating_logo.png";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTiktok,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { colors } from "../../assets/colors";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMouseEnter = (menu: string) => {
    if (hideTimeout) {
      clearTimeout(hideTimeout); // Clear any existing hide timeout
    }
    setActiveDropdown(menu);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null); // Hide the submenu after a delay
    }, 300); // Delay in milliseconds
    setHideTimeout(timeout);
  };

  return (
    <header className={`header ${isScrolled ? "scrolled" : ""}`}>
      <div
        className={`logo ${isScrolled ? "shrunk" : ""}`}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          navigate("/");
        }}
      >
        <img src={FloatingHeader} alt="Logo" />
      </div>
      <nav className="nav">
        <ul className="nav-list">
          <li
            className="nav-item"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
              navigate("/");
            }}
          >
            {t("home")}
          </li>
          <li className="nav-item" onClick={() => navigate("/news")}>
            {t("news")}
          </li>
          <li className="nav-item" onClick={() => navigate("/media")}>
            {t("media")}
          </li>
          <li
            className="nav-item"
            onMouseEnter={() => handleMouseEnter("contact")}
            onMouseLeave={handleMouseLeave}
          >
            {t("info")}
            {activeDropdown === "contact" && (
              <ul className="dropdown">
                <li className="dropdown-item">{t("tickets")}</li>
                <li className="dropdown-item">{t("faq")}</li>
                <li className="dropdown-item">{t("investor")}</li>
                <li className="dropdown-item">{t("aboutUs")}</li>
              </ul>
            )}
          </li>
        </ul>
        <div>
          <div>
            <FontAwesomeIcon
              icon={faFacebookF}
              size="1x"
              color={colors.offWhite}
              onClick={() => {
                window.open(
                  "https://www.facebook.com/profile.php?id=61563584339767&locale=da_DK"
                );
              }}
            />
            <FontAwesomeIcon
              icon={faInstagram}
              size="1x"
              color={colors.offWhite}
              onClick={() => {
                window.open("https://www.instagram.com/nordicstormfootball/");
              }}
            />
            <FontAwesomeIcon
              icon={faXTwitter}
              size="1x"
              color={colors.offWhite}
              onClick={() => {
                window.open("https://x.com/NordicStormFTB");
              }}
            />
            <FontAwesomeIcon
              icon={faTiktok}
              size="1x"
              color={colors.offWhite}
              onClick={() => {
                window.open("https://www.tiktok.com/@nordic_storm");
              }}
            />
          </div>
          <div>
            <div>{i18n.language.includes("en") ? "EN" : "DK"}</div>
            <FontAwesomeIcon icon={faGlobe} size="1x" color={colors.offWhite} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
