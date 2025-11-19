import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/api"; // Ensure this points to http://localhost:8080/api
import jaguarImg from "../assets/jaguar.png"; 

export default function Register() {
  const navigate = useNavigate();

  // 1. UPDATED STATE TO MATCH BACKEND DTO
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    course: "",        // Was "department"
    studentNumber: "", // Was "student_id"
    section: "",       // ADDED: Required by backend
    password: "",
    confirmPassword: "" // Was "confirm_password"
  });
  
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // Updated check for camelCase keys
    if (form.password !== form.confirmPassword) {
      setMessage("❌ Passwords do not match.");
      return;
    }

    try {
      // Ensure your API path matches @RequestMapping("/api/auth") in controller
      const res = await api.post("/auth/register", form);
      console.log("✅ Registered:", res.data);
      setMessage("✅ Registration successful! Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error("❌ Registration failed:", err.response?.data || err.message);
      // Show specific error from backend if available
      setMessage(typeof err.response?.data === 'string' 
        ? `❌ ${err.response.data}` 
        : "❌ Registration failed. Please check your inputs.");
    }
  };

  // Define fields with correct names for the loop
  const formFields = [
    { name: "firstName", placeholder: "First Name" },
    { name: "lastName", placeholder: "Last Name" },
    { name: "email", placeholder: "Email", type: "email" },
    { name: "course", placeholder: "Course (formerly Department)" },
    { name: "studentNumber", placeholder: "Student ID (e.g. 23-5137-323)" },
    { name: "section", placeholder: "Section (e.g. G1)" }, // Added Section
    // Removed "username" because User.java does not have a username field, it uses email.
    { name: "password", placeholder: "Password", type: "password" },
    { name: "confirmPassword", placeholder: "Confirm Password", type: "password" },
  ];

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
          bottom: "0",
          left: "0",
          width: "45%",
          opacity: "0.15",
          objectFit: "contain",
          zIndex: 1,
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
        onClick={() => navigate("/login")}
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
        SIGN IN
      </button>

      <div
        style={{
          width: "400px",
          padding: "35px",
          background: "rgba(255, 255, 255, 0.15)",
          borderRadius: "20px",
          border: "2px solid rgba(226, 180, 47, 0.4)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 8px 16px rgba(0,0,0,0.3)",
          textAlign: "center",
          zIndex: 2,
          maxHeight: "80vh", // Added scroll handling for smaller screens
          overflowY: "auto"
        }}
      >
        <h2
          style={{
            color: "#E2B42F",
            marginBottom: "20px",
            fontSize: "28px",
            fontWeight: "bold",
          }}
        >
          Sign Up
        </h2>

        <form onSubmit={handleSubmit}>
          {formFields.map((field) => (
            <input
              key={field.name}
              type={field.type || "text"}
              name={field.name}
              placeholder={field.placeholder}
              value={form[field.name]}
              onChange={handleChange}
              required
              style={{
                width: "100%",
                padding: "12px",
                marginBottom: "15px",
                border: "1px solid #ccc",
                borderRadius: "6px",
                fontSize: "14px",
              }}
            />
          ))}

          <button
            type="submit"
            style={{
              width: "100%",
              backgroundColor: "#E2B42F",
              color: "#4A1F1F",
              padding: "12px",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px",
              transition: "all 0.3s",
            }}
          >
            Register
          </button>
        </form>

        {message && (
          <p
            style={{
              marginTop: "15px",
              color: message.includes("✅") ? "#00FF7F" : "red",
              fontWeight: "500",
            }}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
}