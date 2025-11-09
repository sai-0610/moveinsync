import { useState } from "react";
import api from "../api/apiClient";
import { isEmpty, isValidEmail } from "../utils/validators";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleLogin(e) {
    e.preventDefault();
    setErrorMsg("");

    if (isEmpty(email) || isEmpty(password)) {
      setErrorMsg("All fields are required.");
      return;
    }

    if (!isValidEmail(email)) {
      setErrorMsg("Enter a valid email address.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/auth/login", { email, password });

      localStorage.setItem("token", res.data.token);
      window.location.href = "/admin";
    } catch (err) {
      setErrorMsg("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h2>Admin Login</h2>

        {errorMsg && (
          <div style={{ color: "red", marginBottom: "10px" }}>{errorMsg}</div>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
