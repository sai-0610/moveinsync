import { useState } from "react";
import api from "../api/apiClient";

export default function FloorUploader() {
  const [file, setFile] = useState(null);
  const [label, setLabel] = useState("");
  const [uploading, setUploading] = useState(false);

  async function handleUpload(e) {
    e.preventDefault();
    if (!file) return alert("Choose a file first");

    try {
      setUploading(true);
      const form = new FormData();
      form.append("floorPlan", file); // must match upload.single("floorPlan")
      // backend field name: "file"
      form.append("label", label || "v1"); // optional tag/version label

      await api.post("/floor/upload", form, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Uploaded!");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form onSubmit={handleUpload}>
      <input
        type="file"
        accept="image/*,.svg,.json"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
      />
      <input
        placeholder="Version label (optional)"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />
      <button disabled={uploading} type="submit">
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </form>
  );
}
