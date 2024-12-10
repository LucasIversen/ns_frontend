import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FloatingHeader from "../../assets/floating_logo.png";
import { useTranslation } from "react-i18next";
import "./mobileHeader.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faChevronDown,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../assets/colors";

const MobileHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

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

  const toggleSubmenu = (menuName: string) => {
    setActiveSubmenu(activeSubmenu === menuName ? null : menuName);
  };

  const performNavigate = (url: string) => {
    navigate(url);
    setIsMenuOpen(false);
    setActiveSubmenu(null);
  };

  return (
    <header className={`mobile-header ${isScrolled ? "scrolled" : ""}`}>
      <div
        className={`mobile-logo ${isScrolled ? "shrunk" : ""}`}
        onClick={() => {
          window.scrollTo({ top: 0, behavior: "smooth" });
          performNavigate("/");
        }}
      >
        <img src={FloatingHeader} alt="Logo" />
      </div>
      <nav className="mobile-nav">
        <div className="mobile-nav-item">
          <FontAwesomeIcon
            icon={isMenuOpen ? faTimes : faBars}
            size="2x"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`burger-icon ${isMenuOpen ? "open" : ""}`}
            color={colors.offWhite}
          />
        </div>
        <div
          className="mobile-nav-item tickets"
          onClick={() =>
            window.open(
              "https://www.ticketmaster.dk/artist/nordic-storm-billetter/1346323"
            )
          }
        >
          {t("tickets")}
        </div>
      </nav>

      {/* Slide-Out Menu */}
      <div className={`slide-menu ${isMenuOpen ? "open" : ""}`}>
        <ul>
          <li>
            <div className="submenu-header" onClick={() => navigate("/")}>
              {t("home")}
            </div>
          </li>

          {/* Team Menu */}
          <li>
            <div
              className="submenu-header"
              onClick={() => toggleSubmenu("team")}
            >
              {t("team")}
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`chevron ${
                  activeSubmenu === "team" ? "rotated" : ""
                }`}
              />
            </div>
            {activeSubmenu === "team" && (
              <ul className="submenu">
                <li onClick={() => performNavigate("/roster")}>
                  {t("roster")}
                </li>
                <li onClick={() => performNavigate("/schedule")}>
                  {t("schedule")}
                </li>
              </ul>
            )}
          </li>

          {/* Updates Menu */}
          <li>
            <div
              className="submenu-header"
              onClick={() => toggleSubmenu("news")}
            >
              {t("updates")}
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`chevron ${
                  activeSubmenu === "news" ? "rotated" : ""
                }`}
              />
            </div>
            {activeSubmenu === "news" && (
              <ul className="submenu">
                <li onClick={() => performNavigate("/news")}>{t("news")}</li>
                <li onClick={() => performNavigate("/media")}>{t("media")}</li>
              </ul>
            )}
          </li>

          {/* Info Menu */}
          <li>
            <div
              className="submenu-header"
              onClick={() => toggleSubmenu("info")}
            >
              {t("info")}
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`chevron ${
                  activeSubmenu === "info" ? "rotated" : ""
                }`}
              />
            </div>
            {activeSubmenu === "info" && (
              <ul className="submenu">
                <li onClick={() => performNavigate("/faq")}>{t("faq")}</li>
                <li onClick={() => performNavigate("/investor")}>
                  {t("investor")}
                </li>
                <li onClick={() => performNavigate("/about_us")}>
                  {t("aboutUs")}
                </li>
              </ul>
            )}
          </li>

          <li>
            <div
              className="submenu-header"
              onClick={() =>
                window.open(
                  "https://www.ticketmaster.dk/artist/nordic-storm-billetter/1346323"
                )
              }
            >
              {t("tickets")}
            </div>
          </li>

          {/* Language Menu */}
          <li>
            <div
              className="submenu-header"
              onClick={() => toggleSubmenu("language")}
            >
              {t("language")}
              <FontAwesomeIcon
                icon={faChevronDown}
                className={`chevron ${
                  activeSubmenu === "language" ? "rotated" : ""
                }`}
              />
            </div>
            {activeSubmenu === "language" && (
              <ul className="submenu">
                <li onClick={() => i18n.changeLanguage("da")}>{t("danish")}</li>
                <li onClick={() => i18n.changeLanguage("en")}>
                  {t("english")}
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default MobileHeader;
