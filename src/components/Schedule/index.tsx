import { useContext, useEffect } from "react";
import "./styles.css";
import { useTranslation } from "react-i18next";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { colors } from "../../assets/colors";
import CacheContext from "../../shared/CacheContext";

const Schedule = () => {
  const cacheContext = useContext(CacheContext);
  if (!cacheContext) {
    throw new Error("MediaPage must be used within a CacheProvider");
  }
  const { schedule, fetchSchedule } = cacheContext;

  useEffect(() => {
    if (!schedule) {
      fetchSchedule();
    }
  }, [schedule, fetchSchedule]);

  const { i18n, t } = useTranslation();

  return (
    <div className="schedule_container">
      <div className="header_container">
        <h1 className="schedule_title">{t("2025_schedule")}</h1>
      </div>
      {schedule?.map((matchup) => (
        <div key={matchup.id} className="matchup">
          <div className="matchup_header">
            <div className="week">
              <div className="week_text">
                {matchup.playoff
                  ? matchup.playoffRound
                  : t("week") + " " + matchup.week}
              </div>
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
              {matchup.home ? (
                <div className="ticket_info_conatiner">
                  <div className="ticket_info">
                    <div
                      className={
                        "tickets" +
                        (matchup.ticketsLink && matchup.result === null
                          ? ""
                          : " disabled")
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
                  </div>
                </div>
              ) : (
                <div className="away_container">
                  <div className="location">
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="icon"
                      color={colors.darkBlue}
                    />
                    <div className="location_name">{matchup.location}</div>
                  </div>
                  <div
                    className={
                      "tickets" +
                      (matchup.ticketsLink && matchup.result === null
                        ? ""
                        : " disabled")
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
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Schedule;
