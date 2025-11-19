import jaguarImg from "../assets/jaguar.png";
import ProfileDropdown from "./ProfileDropdown";

export default function Header() {
  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        background: "rgba(0,0,0,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 10,
        backdropFilter: "blur(6px)",
      }}
    >
      {/* Left: Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
        <img
          src={jaguarImg}
          alt="Jaguar Logo"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
        <h1
          style={{
            color: "#E2B42F",
            fontSize: "22px",
            fontWeight: "bold",
            fontStyle: "italic",
            margin: 0,
          }}
        >
          WILDCAT<span style={{ color: "#FFF" }}>SPHERE</span>
        </h1>
      </div>

      {/* Right: Icons */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        {/* Notification Bell */}
        <button
          style={{
            background: "transparent",
            border: "none",
            fontSize: "26px",
            cursor: "pointer",
            position: "relative",
            padding: "8px",
            transition: "transform 0.2s",
          }}
          onClick={() => alert("Notifications coming soon!")}
          onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
          onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
        >
          🔔
          <span
            style={{
              position: "absolute",
              top: "5px",
              right: "5px",
              background: "#E2B42F",
              color: "#4A1F1F",
              borderRadius: "50%",
              width: "18px",
              height: "18px",
              fontSize: "11px",
              fontWeight: "bold",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            3
          </span>
        </button>

        {/* Profile Dropdown */}
        <ProfileDropdown />
      </div>
    </header>
  );
}
