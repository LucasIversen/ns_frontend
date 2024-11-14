import React, { useState } from "react";
import "./styles.css"; // Include this CSS file for styling and animations

const players = [
  // Sample data - replace with actual data
  {
    id: 1,
    name: "John Doe",
    position: "Quarterback",
    team: "offence",
    image: "imageURL",
    info: "More about John",
  },
  {
    id: 2,
    name: "Jane Smith",
    position: "Linebacker",
    team: "defence",
    image: "imageURL",
    info: "More about Jane",
  },
  {
    id: 3,
    name: "Sam Coach",
    position: "Head Coach",
    team: "coaches",
    image: "imageURL",
    info: "More about Sam",
  },
  // Add more players/coaches as needed
];

const Roster = () => {
  const [activeTab, setActiveTab] = useState("offence");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const filteredPlayers = players.filter((player) => player.team === activeTab);

  return (
    <div className="roster-page">
      <div className="tabs">
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
          onClick={() => handleTabChange("specialteams")}
          className={activeTab === "specialteams" ? "active" : ""}
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

      <div className="grid">
        {filteredPlayers.map((player) => (
          <div key={player.id} className="player-card">
            <div className="card-content">
              <div className="front">
                <img
                  src={player.image}
                  alt={player.name}
                  className="player-image"
                />
                <h3>{player.name}</h3>
                <p>{player.position}</p>
              </div>
              <div className="back">
                <p>{player.info}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Roster;
