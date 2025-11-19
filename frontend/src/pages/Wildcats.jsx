import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/api";

export default function Wildcats() {
  const [wildcats, setWildcats] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWildcats();
  }, []);

  const fetchWildcats = async () => {
    try {
      const res = await api.get("/users");
      setWildcats(res.data);
    } catch (err) {
      console.error("Failed to load wildcats", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredWildcats = wildcats.filter(
    (w) =>
      w.first_name?.toLowerCase().includes(search.toLowerCase()) ||
      w.last_name?.toLowerCase().includes(search.toLowerCase()) ||
      w.student_id?.includes(search)
  );

  if (loading) {
    return (
      <div style={{ padding: "40px", color: "#FFF", fontSize: "24px", textAlign: "center" }}>
        Loading wildcats...
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 60px" }}>
      <h2
        style={{
          color: "#FFF",
          fontSize: "48px",
          marginBottom: "40px",
          fontWeight: "bold",
          fontStyle: "italic",
          textAlign: "center",
          textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
        }}
      >
        LOOK FOR A FELLOW WILDCAT
      </h2>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "50px",
        }}
      >
        <div style={{ position: "relative", width: "100%", maxWidth: "700px" }}>
          <input
            type="text"
            placeholder="NAME OR STUDENT #"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "100%",
              padding: "20px 20px 20px 60px",
              borderRadius: "50px",
              border: "none",
              fontSize: "18px",
              background: "#D4C4B0",
              color: "#4A1F1F",
              fontWeight: "500",
              boxSizing: "border-box",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: "25px",
              top: "50%",
              transform: "translateY(-50%)",
              fontSize: "24px",
            }}
          >
            🔍
          </span>
        </div>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "30px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {filteredWildcats.length === 0 ? (
          <p style={{ color: "#FFF", textAlign: "center", fontSize: "18px" }}>
            No wildcats found.
          </p>
        ) : (
          filteredWildcats.map((wildcat) => (
            <div
              key={wildcat.id}
              style={{
                background: "#E2B42F",
                borderRadius: "20px",
                padding: "30px",
                display: "flex",
                gap: "30px",
                alignItems: "center",
                cursor: "pointer",
                transition: "transform 0.2s, box-shadow 0.2s",
                boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.3)";
              }}
              onClick={() => navigate(`/home/wildcats/${wildcat.id}`)}
            >
              {/* Left side - Info */}
              <div
                style={{
                  flex: 1,
                  background: "#6B1F1F",
                  borderRadius: "15px",
                  padding: "30px",
                  color: "#FFF",
                }}
              >
                <h3
                  style={{
                    fontSize: "36px",
                    fontWeight: "bold",
                    fontStyle: "italic",
                    margin: "0 0 10px 0",
                    textTransform: "uppercase",
                  }}
                >
                  {wildcat.first_name || wildcat.firstName} {wildcat.last_name || wildcat.lastName}
                </h3>
                <p
                  style={{
                    color: "#E2B42F",
                    fontSize: "18px",
                    margin: "0 0 5px 0",
                    fontWeight: "bold",
                  }}
                >
                  {wildcat.student_id || wildcat.studentNumber}
                </p>
                <p
                  style={{
                    fontSize: "16px",
                    margin: "0 0 20px 0",
                  }}
                >
                  {wildcat.course || wildcat.department || "STUDENT"}
                </p>
              </div>

              {/* Right side - Photo */}
              <div
                style={{
                  width: "250px",
                  height: "250px",
                  borderRadius: "15px",
                  overflow: "hidden",
                  background: "#D4C4B0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <div style={{ fontSize: "80px" }}>👤</div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}