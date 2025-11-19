import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../config/api";

// Helper function to convert "HH:mm" (24h) to "h:mm AM/PM" (12h)
const formatTime = (timeString) => {
  if (!timeString) return "";
  const [hours, minutes] = timeString.split(':');
  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  return date.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
};

export default function Events() {
  const [events, setEvents] = useState([]);
  const [joinedEventIds, setJoinedEventIds] = useState(new Set()); // Store IDs of events I joined
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // 1. GET CURRENT USER
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (!user.id) {
      navigate("/login");
    } else {
      fetchData();
    }
  }, []);

  // 2. FETCH BOTH EVENTS AND MY JOINS
  const fetchData = async () => {
    try {
      setLoading(true);
      
      // Run both API calls in parallel for speed
      const [eventsRes, joinsRes] = await Promise.all([
        api.get("/events"),                    // Get all events
        api.get(`/event-joins/user/${user.id}`) // Get events I joined
      ]);

      setEvents(eventsRes.data);

      // Create a Set of Event IDs that I have joined for easy checking
      const myJoinedIds = new Set(joinsRes.data.map(join => join.event.id));
      setJoinedEventIds(myJoinedIds);

    } catch (err) {
      console.error("Failed to load data", err);
    } finally {
      setLoading(false);
    }
  };

  // 3. HANDLE JOIN / LEAVE LOGIC
  const handleJoinToggle = async (e, eventId, isJoined) => {
    e.stopPropagation(); // PREVENT NAVIGATING TO DETAILS PAGE
    try {
      if (isJoined) {
        // LEAVE LOGIC
        await api.delete(`/event-joins/leave?userId=${user.id}&eventId=${eventId}`);
        
        // Update local state instantly (Optimistic UI)
        const newJoins = new Set(joinedEventIds);
        newJoins.delete(eventId);
        setJoinedEventIds(newJoins);
        alert("You left the event.");
      } else {
        // JOIN LOGIC
        await api.post("/event-joins", {
          userId: user.id,
          eventId: eventId
        });

        // Update local state instantly
        const newJoins = new Set(joinedEventIds);
        newJoins.add(eventId);
        setJoinedEventIds(newJoins);
        alert("You are now going!");
      }
    } catch (err) {
      console.error(err);
      alert("Action failed. Please try again.");
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "40px", color: "#FFF", fontSize: "24px", textAlign: "center" }}>
        Loading events...
      </div>
    );
  }

  return (
    <div style={{ padding: "40px 60px" }}>
      {/* HEADER */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "40px" }}>
        <h2 style={{ color: "#FFF", fontSize: "48px", fontWeight: "bold", fontStyle: "italic", margin: 0, textShadow: "2px 2px 4px rgba(0,0,0,0.3)" }}>
          FIND AN EVENT!
        </h2>
        <button
          onClick={() => navigate("/home/host-event")}
          style={{ padding: "15px 40px", background: "#E2B42F", color: "#4A1F1F", border: "none", borderRadius: "50px", fontSize: "18px", fontWeight: "bold", cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}
        >
          + HOST AN EVENT
        </button>
      </div>

      {/* EVENTS GRID */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "25px" }}>
        {events.length === 0 ? (
          <p style={{ color: "#FFF", fontSize: "18px" }}>No events available yet.</p>
        ) : (
          events.map((event) => {
            const isHost = event.createdBy?.id === user.id;
            const isJoined = joinedEventIds.has(event.id);

            return (
              <div
                key={event.id}
                // CLICK TO GO TO DETAILS
                onClick={() => navigate(`/home/events/${event.id}`)}
                style={{
                  background: "#6B2C2C",
                  border: isHost ? "4px solid #FFD700" : "3px solid #E2B42F", // Gold border for host
                  borderRadius: "12px",
                  overflow: "hidden",
                  boxShadow: "0 6px 12px rgba(0,0,0,0.4)",
                  position: "relative",
                  cursor: "pointer"
                }}
              >
                {/* HOST BADGE */}
                {isHost && (
                  <div style={{ position: "absolute", top: "10px", right: "10px", background: "#FFD700", color: "#4A1F1F", padding: "5px 12px", borderRadius: "20px", fontWeight: "bold", fontSize: "12px", boxShadow: "0 2px 5px rgba(0,0,0,0.3)", zIndex: 10 }}>
                    👑 YOUR EVENT
                  </div>
                )}

                {/* IMAGE PLACEHOLDER */}
                <div style={{ height: "180px", background: "linear-gradient(135deg, #E2B42F 0%, #D4A028 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "72px" }}>
                  🎉
                </div>

                {/* DETAILS */}
                <div style={{ padding: "20px" }}>
                  <h3 style={{ color: "#FFF", fontSize: "22px", margin: "0 0 10px 0", fontWeight: "bold", fontStyle: "italic" }}>{event.title}</h3>
                  <p style={{ color: "#E2B42F", margin: "5px 0", fontSize: "14px" }}>📍 {event.location}</p>
                  
                  {/* ✅ FIXED DATE/TIME DISPLAY WITH 12H FORMAT */}
                  <p style={{ color: "#DDD", margin: "5px 0", fontSize: "14px" }}>
                    📅 {event.date} &nbsp;|&nbsp; 🕒 {formatTime(event.time)}
                  </p>
                  
                  {/* ACTION BUTTON */}
                  <div style={{ marginTop: "20px" }}>
                    {isHost ? (
                      <button disabled style={{ width: "100%", padding: "12px", background: "#4A1F1F", border: "2px solid #E2B42F", color: "#E2B42F", borderRadius: "8px", fontWeight: "bold", opacity: 0.7, cursor: "not-allowed" }}>
                        YOU ARE HOSTING
                      </button>
                    ) : (
                      <button
                        onClick={(e) => handleJoinToggle(e, event.id, isJoined)}
                        style={{
                          width: "100%",
                          padding: "12px",
                          background: isJoined ? "#4CAF50" : "#E2B42F", // Green if joined, Gold if not
                          color: isJoined ? "#FFF" : "#4A1F1F",
                          border: "none",
                          borderRadius: "8px",
                          fontWeight: "bold",
                          cursor: "pointer",
                          transition: "background 0.3s"
                        }}
                      >
                        {isJoined ? "✅ GOING (LEAVE)" : "JOIN EVENT"}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}