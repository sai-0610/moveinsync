import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Admin Dashboard</h2>

        <div style={styles.buttonGroup}>
          <button style={styles.btn} onClick={() => navigate("/floor-plan")}>
            Manage Floor Plan
          </button>

          <button style={styles.btn} onClick={() => navigate("/versions")}>
            Version History
          </button>

          <button style={styles.btn} onClick={() => navigate("/book-room")}>
            Book Meeting Room
          </button>

          <button
            style={{ ...styles.btn, backgroundColor: "#e63946" }}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    paddingTop: "50px",
    background: "#f5f7fa",
    height: "100vh",
  },
  card: {
    background: "white",
    padding: "40px",
    borderRadius: "10px",
    minWidth: "400px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
  },
  title: {
    marginBottom: "20px",
    fontSize: "26px",
  },
  buttonGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  btn: {
    padding: "12px 16px",
    fontSize: "16px",
    backgroundColor: "#1d72b8",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};
