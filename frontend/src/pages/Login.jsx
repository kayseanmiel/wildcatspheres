import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api, { setAuthToken } from "../config/api"; // Ensure this points to your config folder
import jaguarImg from "../assets/jaguar.png";

export default function Login() {
  // 1. CHANGED: State now uses 'email' instead of 'username'
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", form);
      
      // 1. Extract Token AND User from the response
      // (Your backend now sends { token: "...", user: { ... } })
      const token = res.data.token || res.data.access;
      const userData = res.data.user; 

      if (token) {
          localStorage.setItem("token", token);
          setAuthToken(token);
          
          // 2. CRITICAL STEP: Save the user details so Home.jsx can read them!
          if (userData) {
            localStorage.setItem("user", JSON.stringify(userData));
          }

          navigate("/home"); 
      } else {
          throw new Error("No token received");
      }

    } catch (err) {
      console.error(err);
      setError("❌ Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: "100vh",
        width: "100vw",
        backgroundColor: "#934B4B",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <img
        src={jaguarImg}
        alt="Jaguar"
        style={{
          position: "absolute",
          bottom: "-60px",
          left: "-80px",
          width: "60%",
          opacity: "0.15",
          objectFit: "contain",
          zIndex: 1,
          userSelect: "none",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          position: "absolute",
          top: "30px",
          left: "50px",
          display: "flex",
          alignItems: "center",
          gap: "15px",
          zIndex: 2,
        }}
      >
        <h1
          style={{
            color: "#E2B42F",
            fontSize: "32px",
            fontWeight: "bold",
            fontStyle: "italic",
            margin: 0,
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            letterSpacing: "1px",
          }}
        >
          WILDCAT<span style={{ color: "#FFF" }}>SPHERE</span>
        </h1>
      </div>

      <button
        onClick={() => navigate("/register")}
        style={{
          position: "absolute",
          top: "30px",
          right: "50px",
          padding: "12px 35px",
          fontSize: "16px",
          fontWeight: "bold",
          color: "#4A1F1F",
          background: "#E2B42F",
          border: "none",
          borderRadius: "50px",
          cursor: "pointer",
          boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          transition: "all 0.3s",
          textTransform: "uppercase",
          zIndex: 2,
        }}
      >
        SIGN UP
      </button>

      <div
        style={{
          width: "400px",
          padding: "40px 35px",
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: "20px",
          border: "2px solid rgba(226, 180, 47, 0.5)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
          textAlign: "center",
          zIndex: 2,
        }}
      >
        <h2
          style={{
            color: "#E2B42F",
            marginBottom: "25px",
            fontSize: "28px",
            fontWeight: "bold",
          }}
        >
          Sign In
        </h2>

        <form onSubmit={handleSubmit}>
          {/* 3. CHANGED: Input type, name, and placeholder to Email */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "14px",
              outline: "none",
            }}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            disabled={loading}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              border: "1px solid #ccc",
              borderRadius: "6px",
              fontSize: "14px",
              outline: "none",
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              backgroundColor: loading ? "#999" : "#E2B42F",
              color: "#4A1F1F",
              padding: "12px",
              border: "none",
              borderRadius: "6px",
              cursor: loading ? "not-allowed" : "pointer",
              fontWeight: "bold",
              fontSize: "16px",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              if (!loading) e.target.style.backgroundColor = "#F4C94B";
            }}
            onMouseLeave={(e) => {
              if (!loading) e.target.style.backgroundColor = "#E2B42F";
            }}
          >
            {loading ? "LOGGING IN..." : "LOGIN"}
          </button>
        </form>

        {error && (
          <p
            style={{
              marginTop: "15px",
              color: "red",
              fontWeight: "500",
            }}
          >
            {error}
          </p>
        )}

        <p style={{ marginTop: "20px", color: "#FFF" }}>
          Don't have an account?{" "}
          <Link
            to="/register"
            style={{
              color: "#E2B42F",
              fontWeight: "bold",
              textDecoration: "none",
            }}
          >
            Sign up here
          </Link>
        </p>
      </div>
    </div>
  );
}