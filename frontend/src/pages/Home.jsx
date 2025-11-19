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

export default function Home() {
  const [hostedEvents, setHostedEvents] = useState([]);
  const [eventsToGo, setEventsToGo] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  // Get current user
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    if (!user.id) {
      navigate("/login");
    } else {
      fetchDashboardData();
    }
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // 1. Run both API calls in parallel
      const [allEventsRes, myJoinsRes] = await Promise.all([
        api.get("/events"),                    // For Hosted Events
        api.get(`/event-joins/user/${user.id}`) // For Events To Go
      ]);

      // 2. Process Hosted Events (Filter all events by creator)
      if (Array.isArray(allEventsRes.data)) {
        const hosted = allEventsRes.data.filter((e) => e.createdBy?.id === user.id);
        setHostedEvents(hosted);
      }

      // 3. Process "Events To Go" (Extract event from the Join object)
      if (Array.isArray(myJoinsRes.data)) {
        const myEvents = myJoinsRes.data.map((join) => ({
          ...join.event,           // Spread the event details (title, date, etc.)
          user_rsvp_status: "going" // Manually tag it so the UI shows "GO"
        }));
        setEventsToGo(myEvents);
      }

    } catch (err) {
      console.error("Failed to load dashboard data", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: "40px", color: "#FFF", fontSize: "24px", textAlign: "center" }}>
        Loading dashboard...
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
          textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
        }}
      >
        WELCOME, {user.firstName?.toUpperCase() || "WILDCAT"}!
      </h2>

      {/* HOSTED EVENTS */}
      <section style={{ marginBottom: "50px" }}>
        <h3 style={sectionHeaderStyle}>HOSTED EVENTS</h3>
        {hostedEvents.length === 0 ? (
          <EmptyBox text="You haven't hosted any events yet. Click 'Host an Event' to create one!" />
        ) : (
          <EventGrid events={hostedEvents} />
        )}
      </section>

      {/* EVENTS TO GO */}
      <section>
        <h3 style={sectionHeaderStyle}>EVENTS TO GO</h3>
        {eventsToGo.length === 0 ? (
          <EmptyBox text='No events yet! Visit the Events page and click "Join Event".' />
        ) : (
          <EventGrid events={eventsToGo} showRSVPStatus />
        )}
      </section>
    </div>
  );
}

// --- Reusable Components ---

const sectionHeaderStyle = {
  color: "#FFF",
  fontSize: "36px",
  marginBottom: "25px",
  fontWeight: "bold",
  fontStyle: "italic",
  borderBottom: "2px solid rgba(226, 180, 47, 0.5)",
  paddingBottom: "10px",
  display: "inline-block"
};

function EmptyBox({ text }) {
  return (
    <div
      style={{
        background: "rgba(107, 44, 44, 0.6)",
        border: "2px dashed #E2B42F",
        borderRadius: "12px",
        padding: "40px",
        textAlign: "center",
      }}
    >
      <p style={{ color: "#E2B42F", fontSize: "18px", margin: 0, fontWeight: "500" }}>{text}</p>
    </div>
  );
}

function EventGrid({ events, showRSVPStatus }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))",
        gap: "25px",
      }}
    >
      {events.map((event) => (
        <EventCard key={event.id} event={event} showRSVPStatus={showRSVPStatus} />
      ))}
    </div>
  );
}

function EventCard({ event, showRSVPStatus }) {
  // Use emoji as fallback since no image upload yet
  const imageUrl = event.coverImage 
    ? `${import.meta.env.VITE_API_BASE_URL}${event.coverImage}` 
    : null;
  
  // Add navigate hook inside card for proper routing from Home
  const navigate = useNavigate();

  return (
    <div
      // ✅ ADDED: CLICK TO GO TO DETAILS
      onClick={() => navigate(`/home/events/${event.id}`)}
      style={{
        background: "#6B2C2C",
        border: "2px solid #E2B42F",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: "0 6px 12px rgba(0,0,0,0.2)",
        display: "flex",
        height: "180px",
        transition: "transform 0.2s",
        cursor: "pointer"
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-5px)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
    >
      {/* Left Content */}
      <div
        style={{
          flex: "1.5",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h3
            style={{
              color: "#FFF",
              fontSize: "20px",
              margin: "0 0 10px 0",
              fontWeight: "bold",
              lineHeight: "1.2"
            }}
          >
            {event.title}
          </h3>

          <p style={{ color: "#E2B42F", fontSize: "13px", margin: "0 0 5px 0" }}>📍 {event.location}</p>
          
          {/* ✅ FIXED DATE/TIME DISPLAY WITH 12H FORMAT */}
          <p style={{ color: "#DDD", fontSize: "12px", margin: 0 }}>
             📅 {event.date} &nbsp;|&nbsp; 🕒 {formatTime(event.time)}
          </p>
        </div>

        {/* The Badge for "Events To Go" */}
        {showRSVPStatus && event.user_rsvp_status && (
          <div
            style={{
              marginTop: "10px",
              padding: "4px 10px",
              background: "#4CAF50", // Green for Going
              borderRadius: "4px",
              width: "fit-content",
            }}
          >
            <p style={{ color: "#FFF", fontWeight: "bold", fontSize: "10px", margin: 0 }}>
              GO
            </p>
          </div>
        )}
      </div>

      {/* Right Image Placeholder */}
      <div
        style={{
          flex: "1",
          background: imageUrl
            ? `url(${imageUrl}) center/cover no-repeat`
            : "linear-gradient(135deg, #E2B42F 0%, #D4A028 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "40px",
        }}
      >
        {!imageUrl && "🐾"}
      </div>
    </div>
  );
}