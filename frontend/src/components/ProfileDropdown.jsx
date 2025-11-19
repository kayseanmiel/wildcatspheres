import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function ProfileDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleSignOut = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div style={{ position: "relative" }} ref={dropdownRef}>
      {/* Profile Button */}
      <button
        style={{
          background: "#E2B42F",
          border: "3px solid #4A1F1F",
          borderRadius: "50%",
          width: "50px",
          height: "50px",
          fontSize: "24px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transition: "transform 0.2s, box-shadow 0.2s",
          boxShadow: isOpen ? "0 0 0 3px rgba(226, 180, 47, 0.3)" : "none",
        }}
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={(e) => (e.target.style.transform = "scale(1.1)")}
        onMouseLeave={(e) => (e.target.style.transform = "scale(1)")}
      >
        👤
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          style={{
            position: "absolute",
            top: "60px",
            right: "0",
            width: "220px",
            background: "#4A1F1F",
            border: "3px solid #E2B42F",
            borderRadius: "12px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
            zIndex: 1000,
            overflow: "hidden",
            animation: "slideDown 0.2s ease-out",
          }}
        >
          {/* Menu Items */}
          <button
            onClick={() => {
              setIsOpen(false);
              alert("View Profile page coming soon!");
            }}
            style={menuItemStyle}
            onMouseEnter={(e) => {
              e.target.style.background = "#6B2C2C";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
            }}
          >
            <span style={{ fontSize: "20px", marginRight: "12px" }}>👁️</span>
            <span>VIEW PROFILE</span>
          </button>

          <button
            onClick={() => {
              setIsOpen(false);
              alert("Edit Profile page coming soon!");
            }}
            style={menuItemStyle}
            onMouseEnter={(e) => {
              e.target.style.background = "#6B2C2C";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
            }}
          >
            <span style={{ fontSize: "20px", marginRight: "12px" }}>✏️</span>
            <span>EDIT PROFILE</span>
          </button>

          {/* Divider */}
          <div
            style={{
              height: "2px",
              background: "#E2B42F",
              margin: "8px 0",
            }}
          ></div>

          {/* Sign Out */}
          <button
            onClick={handleSignOut}
            style={{
              ...menuItemStyle,
              color: "#ff6b6b",
              fontWeight: "bold",
            }}
            onMouseEnter={(e) => {
              e.target.style.background = "#6B2C2C";
            }}
            onMouseLeave={(e) => {
              e.target.style.background = "transparent";
            }}
          >
            <span style={{ fontSize: "20px", marginRight: "12px" }}>🚪</span>
            <span>SIGN OUT</span>
          </button>
        </div>
      )}

      {/* CSS Animation */}
      <style>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

const menuItemStyle = {
  width: "100%",
  padding: "14px 20px",
  background: "transparent",
  border: "none",
  color: "#FFF",
  fontSize: "15px",
  fontWeight: "600",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  textAlign: "left",
  transition: "background 0.2s",
};