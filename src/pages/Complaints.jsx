import { useState } from "react";
import ComplaintCard from "../components/ComplaintCard.jsx";
import { CATEGORIES } from "../constants.js";

export default function Complaints({ complaints, onResolve, onDelete }) {
  const [cat, setCat] = useState("all");
  const [status, setStatus] = useState("all");

  const filtered = complaints.filter(
    (c) =>
      (cat === "all" || c.category === cat) &&
      (status === "all" || c.status === status)
  );

  return (
    <section className="card">
      <h2>All Complaints</h2>

      <div className="filters">
        <select value={cat} onChange={(e) => setCat(e.target.value)}>
          <option value="all">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>
              {c.label}
            </option>
          ))}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="all">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Resolved">Resolved</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p>No complaints found.</p>
      ) : (
        <div className="complaint-grid">
          {filtered.map((c) => (
            <ComplaintCard
              key={c.id}
              complaint={c}
              onResolve={onResolve}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
}