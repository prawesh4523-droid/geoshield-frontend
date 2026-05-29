import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

const API_URL = "http://localhost:8001";

function App() {
  const [districts, setDistricts]   = useState(null);
  const [shelters, setShelters]     = useState([]);
  const [hospitals, setHospitals]   = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading]       = useState(false);
  const [form, setForm] = useState({
    rainfall: "", slope: "", soil_moisture: "", temperature: ""
  });

  useEffect(() => {
    fetch("/data/nepal-districts.geojson")
      .then(r => r.json()).then(setDistricts);
    fetch(`${API_URL}/api/shelters`)
      .then(r => r.json()).then(setShelters);
    fetch(`${API_URL}/api/hospitals`)
      .then(r => r.json()).then(setHospitals);
  }, []);

  const handlePredict = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          rainfall:      parseFloat(form.rainfall),
          slope:         parseFloat(form.slope),
          soil_moisture: parseFloat(form.soil_moisture),
          temperature:   parseFloat(form.temperature)
        })
      });
      setPrediction(await res.json());
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-950 text-white overflow-hidden">

      <Navbar />

      <div className="flex flex-1 pt-14 overflow-hidden">

        <Sidebar
          shelters={shelters}
          hospitals={hospitals}
          prediction={prediction}
          form={form}
          setForm={setForm}
          onPredict={handlePredict}
          loading={loading}
        />

        {/* MAP */}
        <div className="flex-1 relative">
          <MapContainer
            center={[27.7172, 85.3240]}
            zoom={8}
            className="h-full w-full"
            style={{ background: "#0a0f1a" }}
          >
            <TileLayer
              attribution="&copy; OpenStreetMap"
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />

            {districts && (
              <GeoJSON
                data={districts}
                style={{ color: "#22d3ee", weight: 1, fillOpacity: 0.05 }}
              />
            )}

            <Marker position={[27.7172, 85.3240]}>
              <Popup>📡 Kathmandu Monitoring Center</Popup>
            </Marker>

            {shelters.map(s => (
              <Marker key={s.id} position={[s.latitude, s.longitude]}>
                <Popup>🏕 <strong>{s.name}</strong><br />Capacity: {s.capacity}</Popup>
              </Marker>
            ))}

            {hospitals.map(h => (
              <Marker key={h.id} position={[h.latitude, h.longitude]}>
                <Popup>🏥 <strong>{h.name}</strong><br />📞 {h.contact}</Popup>
              </Marker>
            ))}

          </MapContainer>
        </div>

      </div>
    </div>
  );
}

export default App;