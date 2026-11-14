import { CheckCircle2, Trash2, MapPin } from "lucide-react";
import { getCategory, getPriority } from "../constants.js";

export default function ComplaintCard({ complaint, onResolve, onDelete }) {
  const cat = getCategory(complaint.category);
  const priority = getPriority(complaint.priority);
  const isPending = complaint.status === "Pending";

  return (
    <div
      className={`complaint-card ${isPending ? "pending" : "resolved"}`}
      style={{ borderLeftColor: cat?.color }}
    >
      <div className="complaint-head">
        <div className="badge-group">
          <span className="badge">
            {cat?.icon} {cat?.label}
          </span>
          <span className={`priority-badge ${priority.id}`}>
            {priority.label} Priority
          </span>
        </div>
        <span className={`status ${isPending ? "pending" : "resolved"}`}>
          {complaint.status}
        </span>
      </div>

      {complaint.photo && (
        <img className="complaint-photo" src={complaint.photo} alt={complaint.title} />
      )}

      <h3>{complaint.title}</h3>
      <p>{complaint.description}</p>

      {complaint.location && (
        <small className="loc">
          <MapPin size={12} /> {complaint.location.lat.toFixed(3)},{" "}
          {complaint.location.lng.toFixed(3)}
        </small>
      )}
      <small className="date">{new Date(complaint.date).toLocaleString()}</small>

      <div className="card-actions">
        {isPending && onResolve && (
          <button className="btn-3d small green" onClick={() => onResolve(complaint.id)}>
            <CheckCircle2 size={14} /> Mark Resolved
          </button>
        )}
        {onDelete && (
          <button className="btn-3d small red" onClick={() => onDelete(complaint.id)}>
            <Trash2 size={14} /> Delete
          </button>
        )}
      </div>
    </div>
  );
}