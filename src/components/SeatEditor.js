import { useState } from "react";
import api from "../api/apiClient";

export default function SeatEditor({ planId }) {
  const [seatId, setSeatId] = useState("");
  const [assignee, setAssignee] = useState("");
  const [status, setStatus] = useState("available"); // available | reserved | blocked

  async function saveSeat() {
    if (!planId) return alert("No plan selected");
    if (!seatId) return alert("Pick a seat");

    try {
      const payload = { planId, seatId, updates: { assignee, status } };
      await api.patch("/floor/seat/update", payload);
      alert("Seat updated");
    } catch (e) {
      console.error(e);
      alert("Update failed");
    }
  }

  return (
    <div>
      <input
        placeholder="Seat ID"
        value={seatId}
        onChange={(e) => setSeatId(e.target.value)}
      />
      <input
        placeholder="Assignee Email (optional)"
        value={assignee}
        onChange={(e) => setAssignee(e.target.value)}
      />
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option>available</option>
        <option>reserved</option>
        <option>blocked</option>
      </select>
      <button onClick={saveSeat}>Save</button>
    </div>
  );
}
