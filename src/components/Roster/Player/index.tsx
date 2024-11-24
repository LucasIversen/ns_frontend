import { useTranslation } from "react-i18next";
import { Props } from "./interfaces";
import "./styles.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { colors } from "../../../assets/colors";
import { useEffect, useState } from "react";

const PlayerCard = (props: Props) => {
  const { player } = props;
  const [isFlipped, setIsFlipped] = useState(false);

  const { i18n } = useTranslation();
  const languageIsEnglish = i18n.language === "en";

  const handleCardClick = () => {
    console.log("Hello");
    console.log(window.innerWidth);
    if (window.innerWidth <= 600) {
      setIsFlipped(!isFlipped);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 600) {
        setIsFlipped(false);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener when the component is unmounted
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div key={player.id} className="player-card" onClick={handleCardClick}>
      <div className={`card-content ${isFlipped ? "flip" : ""}`}>
        <div className="front">
          <img src={player.image} alt={player.name} className="player-image" />
          <div className="overlay">
            <h3>{player.name}</h3>
            {player.number ? (
              <p>
                #{player.number} - {player.position}
              </p>
            ) : (
              <p>{player.position}</p>
            )}
          </div>
        </div>
        <div className="back">
          <h3>{player.name}</h3>
          {player.position ? <p>Position: {player.position}</p> : null}
          {player.nationality ? (
            <p>
              Nationality:{" "}
              {languageIsEnglish ? player.nationalityEn : player.nationality}
            </p>
          ) : null}
          {player.age ? <p>Age: {player.age}</p> : null}
          {player.height ? <p>Height: {player.height}</p> : null}
          {player.number ? <p>Number: {player.number}</p> : null}
          {player.instagram ? (
            <div className="social-icon-container">
              <FontAwesomeIcon
                className="social-icon"
                icon={faInstagram}
                size="1x"
                color={colors.darkBlue}
                onClick={() => {
                  window.open(player.instagram, "_blank");
                }}
              />
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
