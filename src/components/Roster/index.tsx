import { useEffect, useState } from "react";
import "./styles.css"; // Include this CSS file for styling and animations
import { Player } from "./interfaces";
import PlayerCard from "./Player";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";

const Roster = () => {
  const [activeTab, setActiveTab] = useState("offence");
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    const fetchPlayers = async () => {
      const playerQuery = query(collection(db, "players"));

      const querySnapshot = await getDocs(playerQuery);

      const playerDocs = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as Player[];

      const positionOrder = [
        "Quarterback",
        "Running Back",
        "Wide Receiver",
        "Tight End",
        "Tackle",
        "Tackle/Guard",
        "Guard",
        "Center",
        "Linebacker",
        "Cornerback",
        "Defensive End",
        "Defensive Back",
        "Defensive Tackle",
        "Safety",
        "Safety/Return Specialist",
        "Kicker",
        "Punter",
        "Long Snapper",
        "Head Coach",
        "Offensive Coordinator",
        "Defensive Coordinator",
        "Special Teams Coordinator",
        "Assistant Coach",
        "Secondary coach",
        "Defensive Line coach",
        "Offensive Line coach",
        "Quarterbacks coach",
        "Wide Receivers coach",
      ];

      const playersSorted = playerDocs.sort((a, b) =>
        positionOrder.indexOf(a.position) > positionOrder.indexOf(b.position)
          ? 1
          : -1
      );

      setPlayers(playersSorted);
    };

    fetchPlayers();
  });

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const filteredPlayers = players.filter((player) =>
    player.team.includes(activeTab)
  );

  return (
    <div className="roster-page">
      <div className="tabs">
        <div className="tab-container">
          <div
            className="tab-indicator"
            style={{
              transform: `translateX(${
                activeTab === "offence"
                  ? 0
                  : activeTab === "defence"
                  ? 100
                  : activeTab === "special"
                  ? 200
                  : 300
              }%)`,
            }}
          ></div>
          <button
            onClick={() => handleTabChange("offence")}
            className={activeTab === "offence" ? "active" : ""}
          >
            Offense
          </button>
          <button
            onClick={() => handleTabChange("defence")}
            className={activeTab === "defence" ? "active" : ""}
          >
            Defense
          </button>
          <button
            onClick={() => handleTabChange("special")}
            className={activeTab === "special" ? "active" : ""}
          >
            Special Teams
          </button>
          <button
            onClick={() => handleTabChange("coaches")}
            className={activeTab === "coaches" ? "active" : ""}
          >
            Coaches
          </button>
        </div>
      </div>

      <div className="grid-container">
        <div className="grid">
          {filteredPlayers.map((player) => (
            <PlayerCard key={player.id} player={player} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roster;
