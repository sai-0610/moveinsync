export default function ConflictPopup({ conflict, onResolve }) {
  if (!conflict) return null;

  const { serverData, localData } = conflict;

  return (
    <div
      style={{
        position: "fixed",
        top: "20%",
        left: "30%",
        width: "40%",
        background: "white",
        padding: 20,
        border: "2px solid black",
        zIndex: 1000,
      }}
    >
      <h3>Conflict Detected</h3>

      <p>
        Your changes conflict with another admin’s update. Choose what to keep.
      </p>

      <div style={{ marginTop: 15 }}>
        <button onClick={() => onResolve("local")} style={{ marginRight: 10 }}>
          Keep My Changes
        </button>

        <button onClick={() => onResolve("server")}>Keep Server Version</button>
      </div>
    </div>
  );
}
