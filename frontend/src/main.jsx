import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App"; // Import the App we just fixed
import "./index.css";    // Keep your CSS import if you have one (usually index.css or App.css)

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);