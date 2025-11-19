import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/api"; // Ensure this path is correct based on your project structure

export default function HostEvent() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    time: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // The backend will automatically set 'createdBy' using your Token!
      const res = await api.post("/events", form);
      console.log("Event created:", res.data);
      navigate("/home"); // Redirect to dashboard to see it
    } catch (err) {
      console.error(err);
      alert("❌ Failed to host event. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "40px 60px" }}>
      <h2
        style={{
          color: "#E2B42F",
          fontSize: "36px",
          marginBottom: "30px",
          fontWeight: "bold",
          fontStyle: "italic",
          borderBottom: "2px solid rgba(226, 180, 47, 0.3)",
          paddingBottom: "15px",
        }}
      >
        HOST AN EVENT
      </h2>

      <div
        style={{
          background: "rgba(107, 44, 44, 0.6)",
          padding: "40px",
          borderRadius: "16px",
          border: "2px solid rgba(226, 180, 47, 0.5)",
          maxWidth: "800px",
        }}
      >
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          
          {/* Title */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Event Title</label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Wildcat Welcome Party"
              value={form.title}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          {/* Description */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Description</label>
            <textarea
              name="description"
              placeholder="Tell us what's happening..."
              value={form.description}
              onChange={handleChange}
              required
              rows="4"
              style={{ ...inputStyle, resize: "vertical" }}
            />
          </div>

          {/* Location */}
          <div style={inputGroupStyle}>
            <label style={labelStyle}>Location</label>
            <input
              type="text"
              name="location"
              placeholder="e.g. Main Gym / Zoom Link"
              value={form.location}
              onChange={handleChange}
              required
              style={inputStyle}
            />
          </div>

          {/* Date & Time Row */}
          <div style={{ display: "flex", gap: "20px" }}>
            <div style={{ ...inputGroupStyle, flex: 1 }}>
              <label style={labelStyle}>Date</label>
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>
            <div style={{ ...inputGroupStyle, flex: 1 }}>
              <label style={labelStyle}>Time</label>
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleChange}
                required
                style={inputStyle}
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "20px",
              padding: "15px",
              background: loading ? "#888" : "#E2B42F",
              color: "#4A1F1F",
              border: "none",
              borderRadius: "8px",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "transform 0.2s",
              boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
            }}
            onMouseEnter={(e) => !loading && (e.target.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => !loading && (e.target.style.transform = "scale(1)")}
          >
            {loading ? "CREATING EVENT..." : "🚀 LAUNCH EVENT"}
          </button>
        </form>
      </div>
    </div>
  );
}

// --- Styles ---
const inputGroupStyle = {
  display: "flex",
  flexDirection: "column",
  gap: "8px",
};

const labelStyle = {
  color: "#E2B42F",
  fontSize: "14px",
  fontWeight: "600",
  textTransform: "uppercase",
  letterSpacing: "1px",
};

const inputStyle = {
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid rgba(255, 255, 255, 0.3)",
  background: "rgba(255, 255, 255, 0.1)",
  color: "#FFF",
  fontSize: "16px",
  outline: "none",
};