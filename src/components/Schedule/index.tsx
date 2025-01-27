import { useEffect, useState } from "react";
import "./styles.css";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import { useTranslation } from "react-i18next";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { colors } from "../../assets/colors";

type matchup = {
  id: string;
  date: string | null;
  dateEn: string | null;
  week: number;
  teamName: string;
  ticketsLink: string | null;
  result: string | null;
  win: boolean | null;
  location: string | null;
  home: boolean;
  teamLogo: string;
  bye: boolean | null;
  time: string | null;
};

const Schedule = () => {
  const [matchups, setMatchups] = useState<matchup[]>([]);
  const { i18n, t } = useTranslation();

  const fetchMatchups = async () => {
    try {
      const matchupQuery = query(collection(db, "schedule"));

      const querySnapshot = await getDocs(matchupQuery);

      const schedule = querySnapshot.docs.map(
        (doc) =>
          ({
            ...doc.data(),
            id: doc.id,
          } as matchup)
      );

      setMatchups(schedule.sort((a, b) => a.week - b.week));
    } catch (error) {
      console.error("Error loading schedule: ", error);
    }
  };

  useEffect(() => {
    fetchMatchups();
  }, []);

  return (
    <div className="schedule_container">
      <div className="header_container">
        <h1 className="schedule_title">{t("2025_schedule")}</h1>
      </div>
      {matchups.map((matchup) => (
        <div key={matchup.id} className="matchup">
          <div className="matchup_header">
            <div className="week">
              <div className="week_text">{t("week") + " " + matchup.week}</div>
              {!!matchup.date && matchup.date !== "" ? (
                <div className="dot">•</div>
              ) : null}
              <div className="date">
                {i18n.language === "en" ? matchup.dateEn : matchup.date}
              </div>
              {!!matchup.time && matchup.time !== "" ? (
                <div className="dot">•</div>
              ) : null}
              <div className="date">{matchup.time}</div>
            </div>
            {matchup.result !== null ? (
              <div className="result">
                <div className="win">{matchup.win ? "W" : "L"}</div>
                <div className="result_text">{matchup.result}</div>
              </div>
            ) : null}
          </div>
          {matchup.bye ? (
            <div className="bye">BYE</div>
          ) : (
            <div className="matchup_body">
              <div className="game_info">
                <div className="at">{!matchup.home ? "At" : ""}</div>
                <img src={matchup.teamLogo} alt="Team Logo" />
                <div className="team_name">{matchup.teamName}</div>
              </div>
              <div className="ticket_info_conatiner">
                <div className="ticket_info">
                  {matchup.home ? (
                    <div
                      className={
                        "tickets" + (matchup.ticketsLink ? "" : " disabled")
                      }
                    >
                      <a
                        href={matchup.ticketsLink || ""}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {t("tickets")}
                      </a>
                    </div>
                  ) : (
                    <div className="location">
                      <FontAwesomeIcon
                        icon={faLocationDot}
                        className="icon"
                        color={colors.darkBlue}
                      />
                      <div className="location_name">{matchup.location}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Schedule;
