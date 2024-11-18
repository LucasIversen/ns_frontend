import { useTranslation } from "react-i18next";
import { Props } from "./interfaces";
import "./styles.css";

const PlayerCard = (props: Props) => {
  const { player } = props;

  const { i18n } = useTranslation();
  const languageIsEnglish = i18n.language === "en";

  return (
    <div key={player.id} className="player-card">
      <div className="card-content">
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
        </div>
      </div>
    </div>
  );
};

export default PlayerCard;
