import React, { FormEvent, useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import "./styles.css"; // Import CSS file
import { db } from "../../../firebase";

interface Player {
  name: string;
  position: string;
  team: string[];
  image: string;
  age: string;
  height: string;
  nationality: string;
  nationalityEn: string;
  number: string;
  instagram: string;
}

const CreatePlayerForm = () => {
  const [player, setPlayer] = useState<Player>({
    name: "",
    position: "",
    team: [] as string[],
    image: "",
    age: "",
    height: "",
    nationality: "",
    nationalityEn: "",
    number: "",
    instagram: "",
  });

  const teams = ["offence", "defence", "coaches"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPlayer((prev) => ({ ...prev, [name]: value }));
  };

  const handleTeamChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setPlayer((prev) => {
      const newTeams = checked
        ? [...prev.team, value]
        : prev.team.filter((team) => team !== value);
      return { ...prev, team: newTeams };
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "players"), {
        ...player,
        age: Number(player.age),
        number: Number(player.number),
      });
      alert("Player added successfully!");
      setPlayer({
        name: "",
        position: "",
        team: [],
        image: "",
        age: "",
        height: "",
        nationality: "",
        nationalityEn: "",
        number: "",
        instagram: "",
      });
    } catch (error) {
      console.error("Error adding player: ", error);
      alert("Failed to add player.");
    }
  };

  return (
    <form className="player-form" onSubmit={handleSubmit}>
      <input
        className="input-field"
        name="name"
        placeholder="Name"
        value={player.name}
        onChange={handleChange}
        required
      />
      <input
        className="input-field"
        name="position"
        placeholder="Position"
        value={player.position}
        onChange={handleChange}
        required
      />
      <input
        className="input-field"
        name="image"
        placeholder="Image URL"
        value={player.image}
        onChange={handleChange}
        required
      />
      <input
        className="input-field"
        name="age"
        type="number"
        placeholder="Age"
        value={player.age}
        onChange={handleChange}
      />
      <input
        className="input-field"
        name="height"
        placeholder="Height"
        value={player.height}
        onChange={handleChange}
      />
      <input
        className="input-field"
        name="nationality"
        placeholder="Nationality"
        value={player.nationality}
        onChange={handleChange}
        required
      />
      <input
        className="input-field"
        name="nationalityEn"
        placeholder="Nationality (English)"
        value={player.nationalityEn}
        onChange={handleChange}
        required
      />
      <input
        className="input-field"
        name="number"
        type="number"
        placeholder="Jersey Number"
        value={player.number}
        onChange={handleChange}
      />
      <input
        className="input-field"
        name="instagram"
        placeholder="Instagram Handle"
        value={player.instagram}
        onChange={handleChange}
      />

      <div className="team-selection">
        <label>Team:</label>
        {teams.map((team) => (
          <label key={team} className="team-checkbox">
            <input
              type="checkbox"
              value={team}
              checked={player.team.includes(team)}
              onChange={handleTeamChange}
            />
            {team}
          </label>
        ))}
      </div>

      <button className="submit-button" type="submit">
        Add Player
      </button>
    </form>
  );
};

export default CreatePlayerForm;
