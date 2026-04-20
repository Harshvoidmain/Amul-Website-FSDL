import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        // Save JWT token in localStorage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data));
        router.push("/"); // Go to homepage
      } else {
        setError(data.message);
      }
    } catch {
      setError("Server not running. Start backend first.");
    }
    setLoading(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>🔐</div>
        <h1 style={styles.title}>Welcome Back</h1>
        <p style={styles.sub}>Login to continue to Amul Website</p>

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Email</label>
          <input
            style={styles.input}
            type="email"
            name="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
          <label style={styles.label}>Password</label>
          <input
            style={styles.input}
            type="password"
            name="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
            required
          />

          {error && <p style={styles.error}>{error}</p>}

          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p style={styles.link}>
          No account?{" "}
          <span style={styles.linkText} onClick={() => router.push("/register")}>
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'Segoe UI', sans-serif",
  },
  card: {
    background: "white",
    padding: "44px 40px",
    borderRadius: "20px",
    width: "100%",
    maxWidth: "420px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
  },
  logo: { fontSize: "40px", textAlign: "center", marginBottom: "10px" },
  title: { fontSize: "26px", color: "#1a1a2e", textAlign: "center", marginBottom: "6px" },
  sub: { color: "#888", fontSize: "14px", textAlign: "center", marginBottom: "28px" },
  label: { fontSize: "13px", color: "#555", fontWeight: "600", display: "block", marginBottom: "6px" },
  input: {
    width: "100%",
    padding: "12px 14px",
    marginBottom: "16px",
    border: "1.5px solid #ddd",
    borderRadius: "8px",
    fontSize: "14px",
    outline: "none",
    display: "block",
  },
  button: {
    width: "100%",
    padding: "13px",
    background: "linear-gradient(135deg, #667eea, #764ba2)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "4px",
  },
  error: {
    color: "#d00",
    fontSize: "13px",
    marginBottom: "12px",
    background: "#fff0f0",
    padding: "10px",
    borderRadius: "6px",
    textAlign: "center",
  },
  link: { textAlign: "center", marginTop: "20px", fontSize: "14px", color: "#555" },
  linkText: { color: "#667eea", cursor: "pointer", fontWeight: "600" },
};