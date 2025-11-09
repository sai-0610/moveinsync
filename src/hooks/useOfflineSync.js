import { useEffect } from "react";
import api from "../api/apiClient";

export default function useOfflineSync() {
  async function syncChanges() {
    const pending = JSON.parse(localStorage.getItem("pendingChanges") || "[]");

    if (pending.length === 0) return;

    try {
      await api.post("/offline/sync", { changes: pending });

      localStorage.removeItem("pendingChanges");
      console.log("Offline changes synced successfully");
    } catch (err) {
      console.log("Sync failed, will retry later");
    }
  }

  useEffect(() => {
    window.addEventListener("online", syncChanges);

    return () => {
      window.removeEventListener("online", syncChanges);
    };
  }, []);
}
