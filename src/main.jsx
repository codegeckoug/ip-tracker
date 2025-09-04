import "leaflet/dist/leaflet.css";

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css"; // our new clean stylesheet

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
