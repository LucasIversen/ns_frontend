import React, { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase";
import styles from "./styles";

type Matchup = {
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
  isoTime?: string;
};

const UpdateScheduleResults = () => {
  const [matchups, setMatchups] = useState<(Matchup & { done: boolean })[]>([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      const snapshot = await getDocs(collection(db, "schedule"));
      const data = snapshot.docs.map((docSnap) => {
        const matchup = docSnap.data() as Matchup;
        return {
          ...matchup,
          id: docSnap.id,
          done: matchup.win !== null,
        };
      });
      setMatchups(data);
    };

    fetchSchedule();
  }, []);

  const handleToggleDone = (index: number) => {
    const updated = [...matchups];
    updated[index].done = !updated[index].done;
    if (!updated[index].done) {
      // Clear result and win when marked not done
      updated[index].result = null;
      updated[index].win = null;
    }
    setMatchups(updated);
  };

  const handleChange = (
    index: number,
    field: "result" | "win",
    value: string | boolean
  ) => {
    const updated = [...matchups];
    if (field === "result") {
      updated[index].result = value as string;
    } else if (field === "win") {
      updated[index].win = value as boolean;
    }

    setMatchups(updated);
  };

  const handleSave = async (index: number) => {
    const m = matchups[index];
    const ref = doc(db, "schedule", m.id);
    try {
      await updateDoc(ref, {
        result: m.result,
        win: m.win,
      });
      alert("Opdateret!");
    } catch (err) {
      console.error("Fejl ved opdatering:", err);
      alert("Fejl ved opdatering af kampen.");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Opdater Kampresultater</h2>
      {matchups
        .sort(
          (a, b) => a.week - b.week || (a.home ? -1 : 1) - (b.home ? -1 : 1)
        )
        .map((m, i) => (
          <div
            key={m.id}
            style={{ border: "1px solid #ccc", padding: 10, marginBottom: 10 }}
          >
            <div>
              <strong>Uge {m.week}</strong>: {m.teamName} (
              {m.home ? "Hjemme" : "Ude"})
            </div>

            <label>
              <input
                type="checkbox"
                checked={m.done}
                onChange={() => handleToggleDone(i)}
              />
              Kamp færdig
            </label>

            {m.done && (
              <>
                <div>
                  <label>Resultat: </label>
                  <input
                    type="text"
                    value={m.result || ""}
                    onChange={(e) => handleChange(i, "result", e.target.value)}
                  />
                </div>
                <div>
                  <label>Vundet?: </label>
                  <select
                    value={m.win === null ? "" : m.win ? "true" : "false"}
                    onChange={(e) =>
                      handleChange(i, "win", e.target.value === "true")
                    }
                  >
                    <option value="">-- Vælg --</option>
                    <option value="true">Ja</option>
                    <option value="false">Nej</option>
                  </select>
                </div>
                <button onClick={() => handleSave(i)}>Gem</button>
              </>
            )}
          </div>
        ))}
    </div>
  );
};

export default UpdateScheduleResults;
