import { useState } from "react";
import api from "../api/apiClient";

export default function RoomSuggestionBox() {
  const [participants, setParticipants] = useState("");
  const [suggested, setSuggested] = useState(null);

  async function getSuggestion() {
    try {
      const res = await api.get(
        `/meeting/suggest?participants=${participants}`
      );
      setSuggested(res.data.room);
    } catch {
      alert("Error fetching suggestion");
    }
  }

  return (
    <div>
      <h3>Room Suggestion</h3>

      <input
        type="number"
        placeholder="Number of participants"
        onChange={(e) => setParticipants(e.target.value)}
      />

      <button onClick={getSuggestion}>Suggest</button>

      {suggested && (
        <div style={{ marginTop: 15 }}>
          <h4>Recommended Room:</h4>
          <p>Name: {suggested.name}</p>
          <p>Capacity: {suggested.capacity}</p>
          <p>Floor: {suggested.floor}</p>
        </div>
      )}
    </div>
  );
}
