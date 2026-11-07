import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { DEFAULT_CENTER, getCategory } from "../constants.js";

const makeIcon = (emoji) =>
  L.divIcon({
    html: `<div class="pin">${emoji}</div>`,
    className: "",
    iconSize: [34, 34],
    iconAnchor: [17, 17],
  });

export default function MapView({ complaints }) {
  const located = complaints.filter((c) => c.location);

  return (
    <section className="card">
      <h2>Complaints Map</h2>
      <p>{located.length} complaint(s) with a pinned location.</p>

      <div className="map-box big-map">
        <MapContainer
          center={DEFAULT_CENTER}
          zoom={11}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {located.map((c) => {
            const cat = getCategory(c.category);
            return (
              <Marker
                key={c.id}
                position={[c.location.lat, c.location.lng]}
                icon={makeIcon(cat?.icon || "📍")}
              >
                <Popup>
                  <div style={{ maxWidth: 200 }}>
                    {c.photo && (
                      <img
                        src={c.photo}
                        alt={c.title}
                        style={{
                          width: "100%",
                          height: 120,
                          objectFit: "cover",
                          borderRadius: 6,
                          marginBottom: 6,
                        }}
                      />
                    )}
                    <strong>{c.title}</strong>
                    <br />
                    {cat?.icon} {cat?.label} · {c.status}
                    <br />
                    <span>{c.description}</span>
                  </div>
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </div>
    </section>
  );
}