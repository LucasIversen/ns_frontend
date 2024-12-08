import React, { useEffect, useState } from "react";
import "./Header.css"; // Import the CSS file
import FloatingHeader from "../../assets/floating_logo.png";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

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

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng); // Switch the language
  };

  const currentRoute = window.location.pathname;

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
          <li
            className="nav-item"
            onMouseEnter={() => handleMouseEnter("team")}
            onMouseLeave={handleMouseLeave}
          >
            {t("team")}
            {activeDropdown === "team" && (
              <ul className="dropdown">
                <li
                  className={`dropdown-item ${
                    currentRoute.includes("roster") ? "active" : ""
                  }`}
                  onClick={() => {
                    navigate("/roster");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  {t("roster")}
                </li>
                <li
                  className={`dropdown-item ${
                    currentRoute.includes("schedule") ? "active" : ""
                  }`}
                  onClick={() => {
                    navigate("/schedule");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  {t("schedule")}
                </li>
              </ul>
            )}
          </li>
          <li
            className="nav-item"
            onMouseEnter={() => handleMouseEnter("news")}
            onMouseLeave={handleMouseLeave}
          >
            {t("updates")}
            {activeDropdown === "news" && (
              <ul className="dropdown">
                <li
                  className={`dropdown-item ${
                    currentRoute.includes("news") ? "active" : ""
                  }`}
                  onClick={() => {
                    navigate("/news");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  {t("news")}
                </li>
                <li
                  className={`dropdown-item ${
                    currentRoute.includes("media") ? "active" : ""
                  }`}
                  onClick={() => {
                    navigate("/media");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  {t("media")}
                </li>
              </ul>
            )}
          </li>
          <li
            className="nav-item"
            onMouseEnter={() => handleMouseEnter("contact")}
            onMouseLeave={handleMouseLeave}
          >
            {t("info")}
            {activeDropdown === "contact" && (
              <ul className="dropdown">
                <li
                  className={`dropdown-item ${
                    currentRoute.includes("faq") ? "active" : ""
                  }`}
                  onClick={() => {
                    navigate("/faq");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  {t("faq")}
                </li>
                <li
                  className={`dropdown-item ${
                    currentRoute.includes("investor") ? "active" : ""
                  }`}
                  onClick={() => {
                    navigate("/investor");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  {t("investor")}
                </li>
                <li
                  className={`dropdown-item ${
                    currentRoute.includes("about_us") ? "active" : ""
                  }`}
                  onClick={() => {
                    navigate("/about_us");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                >
                  {t("aboutUs")}
                </li>
              </ul>
            )}
          </li>
        </ul>
        <ul className="nav-list right">
          <li
            className="nav-item tickets"
            onClick={() =>
              window.open(
                "https://www.ticketmaster.dk/artist/nordic-storm-billetter/1346323"
              )
            }
          >
            {t("tickets")}
          </li>
          <li
            className="nav-item"
            onMouseEnter={() => handleMouseEnter("language")}
            onMouseLeave={handleMouseLeave}
          >
            {i18n.language.includes("en") ? "EN" : "DK"}
            {activeDropdown === "language" && (
              <ul className="dropdown left">
                <li
                  className="dropdown-item"
                  onClick={() => changeLanguage("da")}
                >
                  {t("danish")}
                </li>
                <li
                  className="dropdown-item"
                  onClick={() => changeLanguage("en")}
                >
                  {t("english")}
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
