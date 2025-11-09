import { useEffect, useState } from "react";
import api from "../api/apiClient";

export default function VersionHistory() {
  const [versions, setVersions] = useState([]);

  async function loadVersions() {
    const res = await api.get("/versions/all");
    setVersions(res.data);
  }

  async function restoreVersion(id) {
    await api.post(`/versions/restore/${id}`);
    alert("Version restored!");
  }

  useEffect(() => {
    loadVersions();
  }, []);

  return (
    <div>
      <h3>Version History</h3>
      {versions.map((v) => (
        <div key={v._id} className="version-item">
          <p>Version: {v.version}</p>
          <button onClick={() => restoreVersion(v._id)}>Restore</button>
        </div>
      ))}
    </div>
  );
}
