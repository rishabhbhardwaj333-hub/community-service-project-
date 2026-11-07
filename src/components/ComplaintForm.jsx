import { useRef, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { Send, ImagePlus, X } from "lucide-react";
import { CATEGORIES, DEFAULT_CENTER } from "../constants.js";

const pinIcon = L.divIcon({
  html: '<div class="pin">📍</div>',
  className: "",
  iconSize: [34, 34],
  iconAnchor: [17, 30],
});

function ClickHandler({ onPick }) {
  useMapEvents({
    click(e) {
      onPick({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

// Resize and compress the image so it fits in localStorage
function compressImage(file, maxWidth = 800, quality = 0.7) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const img = new Image();
      img.onerror = reject;
      img.onload = () => {
        const scale = Math.min(1, maxWidth / img.width);
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL("image/jpeg", quality));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

export default function ComplaintForm({ onAdd }) {
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const fileRef = useRef(null);

  const handlePhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file (JPG, PNG, etc.).");
      e.target.value = "";
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      setError("Image is too large. Please choose one under 5 MB.");
      e.target.value = "";
      return;
    }

    try {
      const compressed = await compressImage(file);
      setPhoto(compressed);
      setError("");
    } catch {
      setError("Could not read that image. Try another one.");
    }
  };

  const removePhoto = () => {
    setPhoto(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(false);

    if (!category) return setError("Please select an issue type.");
    if (!title.trim()) return setError("Please enter a complaint title.");
    if (description.trim().length < 10)
      return setError("Please explain the issue (at least 10 characters).");

    onAdd({
      category,
      title: title.trim(),
      description: description.trim(),
      location,
      photo,
    });

    setCategory("");
    setTitle("");
    setDescription("");
    setLocation(null);
    removePhoto();
    setError("");
    setSuccess(true);
  };

  return (
    <form className="card" onSubmit={handleSubmit}>
      <h2>Register a Complaint</h2>

      <p className="label">1. Select Issue Type</p>
      <div className="category-grid">
        {CATEGORIES.map((c) => (
          <div
            key={c.id}
            role="button"
            tabIndex={0}
            className={`category-card ${category === c.id ? "selected" : ""}`}
            onClick={() => setCategory(c.id)}
            onKeyDown={(e) => e.key === "Enter" && setCategory(c.id)}
          >
            <span className="category-icon">{c.icon}</span>
            <span className="category-label">{c.label}</span>
          </div>
        ))}
      </div>

      <p className="label">2. Complaint Title</p>
      <input
        type="text"
        placeholder="e.g. Large pothole near the main market"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <p className="label">3. Explain the Issue</p>
      <textarea
        rows="5"
        placeholder="Describe the problem: exact place, how long it has existed, how it affects people..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <small className="counter">{description.length} characters</small>

      <p className="label">4. Attach a Photo (optional)</p>
      <input
        ref={fileRef}
        id="photo-input"
        className="file-input"
        type="file"
        accept="image/*"
        onChange={handlePhoto}
      />
      {photo ? (
        <div className="photo-preview">
          <img src={photo} alt="Complaint preview" />
          <button type="button" className="remove-photo" onClick={removePhoto}>
            <X size={16} /> Remove
          </button>
        </div>
      ) : (
        <label htmlFor="photo-input" className="upload-box">
          <ImagePlus size={32} />
          <span>Click to upload a photo of the issue</span>
          <small>JPG or PNG, up to 5 MB</small>
        </label>
      )}

      <p className="label">5. Pin the Location (optional, click on the map)</p>
      <div className="map-box small-map">
        <MapContainer center={DEFAULT_CENTER} zoom={12} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution="&copy; OpenStreetMap contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <ClickHandler onPick={setLocation} />
          {location && <Marker position={[location.lat, location.lng]} icon={pinIcon} />}
        </MapContainer>
      </div>
      {location && (
        <small className="counter">
          Selected: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
        </small>
      )}

      {error && <p className="error">{error}</p>}
      {success && <p className="success">Complaint registered successfully.</p>}

      <button type="submit" className="btn-3d">
        <Send size={16} /> Submit
      </button>
    </form>
  );
}