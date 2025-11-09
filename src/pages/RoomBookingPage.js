import { useState } from "react";
import api from "../api/apiClient";
import RoomSuggestionBox from "../components/RoomSuggestionBox";

export default function RoomBookingPage() {
  const [participants, setParticipants] = useState("");
  const [room, setRoom] = useState(null);
  const [message, setMessage] = useState("");

  async function getSuggestion() {
    if (!participants || participants <= 0) {
      setMessage("Enter a valid number");
      return;
    }

    try {
      const res = await api.get(
        `/meeting/suggest?participants=${participants}`
      );
      setRoom(res.data.room);
      setMessage("");
    } catch {
      setMessage("No rooms available");
      setRoom(null);
    }
  }

  return (
    <div className="container">
      <h2>Meeting Room Booking</h2>

      {/* Suggestion Input + Button */}
      <div className="card">
        <input
          type="number"
          placeholder="Number of participants"
          value={participants}
          onChange={(e) => setParticipants(e.target.value)}
        />
        <br />
        <button onClick={getSuggestion}>Suggest Room</button>
      </div>

      {message && <p>{message}</p>}

      {/* ✅ Only one suggestion output */}
      {room && <RoomSuggestionBox room={room} />}
    </div>
  );
}
