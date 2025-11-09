import { useState, useEffect } from "react";
import api from "../api/apiClient";

import FloorUploader from "../components/FloorUploader";
import SeatEditor from "../components/SeatEditor";
import VersionHistory from "../components/VersionHistory";
import ConflictPopup from "../components/ConflictPopup";

import { loadFromLocal, saveToLocal } from "../utils/localStore";
import { validateSeatData } from "../utils/validators";

export default function FloorPlanPage() {
  const [conflict, setConflict] = useState(null);
  const [planId, setPlanId] = useState(null);
  const [plan, setPlan] = useState(null);

  // ------------------------------------------------------------
  // ✅ Load latest floor plan from backend
  // ------------------------------------------------------------
  async function loadActivePlan() {
    try {
      const res = await api.get("/floor/current");
      setPlanId(res.data._id);
      setPlan(res.data);
    } catch (err) {
      console.log("No plan found");
      setPlanId(null);
    }
  }

  useEffect(() => {
    loadActivePlan();
  }, []);

  // ------------------------------------------------------------
  // ✅ Called after uploading a new floor plan → reload active plan
  // ------------------------------------------------------------
  function handleUploadSuccess() {
    loadActivePlan();
  }

  // ------------------------------------------------------------
  // ✅ Save seat updates offline
  // ------------------------------------------------------------
  function handleSeatSave(seat) {
    if (!validateSeatData(seat)) {
      alert("Invalid seat data");
      return;
    }

    if (!planId) {
      alert("No plan selected");
      return;
    }

    const pending = loadFromLocal("pendingChanges", []);
    pending.push({ ...seat, planId });
    saveToLocal("pendingChanges", pending);

    alert("Seat saved locally (offline support)");
  }

  // ------------------------------------------------------------
  // ✅ Conflict handling when syncing
  // ------------------------------------------------------------
  function resolveConflict(choice) {
    if (choice === "local") {
      alert("Your version will be applied");
    } else {
      alert("Server version kept");
    }
    setConflict(null);
  }

  return (
    <div className="container">
      <ConflictPopup conflict={conflict} onResolve={resolveConflict} />

      <h2>Floor Plan Management</h2>

      {/* ✅ FLOOR UPLOADER */}
      <div className="card">
        <FloorUploader onUploadSuccess={handleUploadSuccess} />
      </div>

      {/* ✅ SEAT EDITOR — Only show when a plan exists */}
      {planId ? (
        <div className="card">
          <SeatEditor planId={planId} onSave={handleSeatSave} plan={plan} />
        </div>
      ) : (
        <p style={{ color: "gray" }}>
          No floor plan found. Upload a plan to start editing seats.
        </p>
      )}

      {/* ✅ VERSION HISTORY */}
      {planId && (
        <div className="card">
          <VersionHistory planId={planId} />
        </div>
      )}
    </div>
  );
}
