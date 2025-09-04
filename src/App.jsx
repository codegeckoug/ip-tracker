import { useEffect, useState } from "react";
import MapView from "./MapView";
import "./App.css";

function App() {
  const [ipData, setIpData] = useState({
    ip: "",
    location: "",
    timezone: "",
    isp: "",
    lat: 51.505,
    lng: -0.09,
  });

  const [query, setQuery] = useState("");

  // ✅ Keep your API key safe (better in .env, but works here for now)
  const API_KEY = "at_qhWEcsqL3I9acYwW8Y8kc6BVbpRTy";

  // Fetch IP info (current user or searched)
  const fetchIpInfo = async (ipOrDomain = "") => {
    try {
      const res = await fetch(
        `https://geo.ipify.org/api/v2/country,city?apiKey=${API_KEY}${
          ipOrDomain ? `&ipAddress=${ipOrDomain}&domain=${ipOrDomain}` : ""
        }`
      );

      if (!res.ok) throw new Error("Failed to fetch IP data");

      const data = await res.json();

      setIpData({
        ip: data.ip || "",
        location: data.location
          ? `${data.location.city || ""}, ${data.location.region || ""}, ${
              data.location.country || ""
            }`
          : "—",
        timezone: data.location ? `UTC ${data.location.timezone}` : "—",
        isp: data.isp || "—",
        lat: data.location?.lat || 51.505,
        lng: data.location?.lng || -0.09,
      });
    } catch (error) {
      console.error("Error fetching IP data:", error);
    }
  };

  // Fetch user's own IP on first load
  useEffect(() => {
    fetchIpInfo();
  }, []);

  // Handle search
  const handleSearch = () => {
    if (query.trim() !== "") {
      fetchIpInfo(query.trim());
      setQuery("");
    }
  };

  return (
    <div className="app">
      {/* Header with background image */}
      <header className="header">
        <h1>IP Address Tracker</h1>

        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for any IP address or domain"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch}>➤</button>
        </div>

        {/* Info Card */}
        <div className="info-card">
          <div>
            <h4>IP Address</h4>
            <p>{ipData.ip || "—"}</p>
          </div>
          <div>
            <h4>Location</h4>
            <p>{ipData.location || "—"}</p>
          </div>
          <div>
            <h4>Timezone</h4>
            <p>{ipData.timezone || "—"}</p>
          </div>
          <div>
            <h4>ISP</h4>
            <p>{ipData.isp || "—"}</p>
          </div>
        </div>
      </header>

      {/* Map Section */}
      <MapView position={[ipData.lat, ipData.lng]} />
    </div>
  );
}

export default App;
