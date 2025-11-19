import { useNavigate } from "react-router-dom";
import jaguarImg from "../assets/jaguar.png"; // 🐆 Import your jaguar image

export default function Sidebar({ activePage }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <aside
      style={{
        width: "280px",
        background: "#4A1F1F",
        display: "flex",
        flexDirection: "column",
        padding: "40px 30px",
        position: "fixed",
        height: "100vh",
        boxSizing: "border-box",
      }}
    >
      <div style={{ flex: 1 }}>
        {/* Logo - Top Left */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "15px",
            marginBottom: "60px",
          }}
        >
          <img
            src={jaguarImg}
            alt="Jaguar Logo"
            style={{
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              objectFit: "cover",
            }}
          />
          <h1
            style={{
              color: "#E2B42F",
              fontSize: "24px",
              fontWeight: "bold",
              fontStyle: "italic",
              margin: 0,
            }}
          >
            WILDCAT<span style={{ color: "#FFF" }}>SPHERE</span>
          </h1>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={() => navigate("/home")}
          style={activePage === "home" ? activeNavStyle : navButtonStyle}
        >
          HOME
        </button>

        <button
          onClick={() => navigate("/wildcats")}
          style={activePage === "wildcats" ? activeNavStyle : navButtonStyle}
        >
          WILDCATS
        </button>

        <button
          onClick={() => navigate("/events")}
          style={activePage === "events" ? activeNavStyle : navButtonStyle}
        >
          EVENTS
        </button>
      </div>
    </aside>
  );
}

const navButtonStyle = {
  display: "block",
  width: "100%",
  padding: "18px 0",
  margin: "15px 0",
  background: "transparent",
  color: "#FFF",
  border: "none",
  borderRadius: "0",
  fontWeight: "bold",
  fontSize: "24px",
  cursor: "pointer",
  textAlign: "left",
  fontStyle: "italic",
  transition: "color 0.3s",
};

const activeNavStyle = {
  ...navButtonStyle,
  color: "#E2B42F",
};
