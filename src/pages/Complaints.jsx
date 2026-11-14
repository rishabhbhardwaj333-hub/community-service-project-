import { useState } from "react";
import ComplaintCard from "../components/ComplaintCard.jsx";
import { CATEGORIES, PRIORITIES, getPriority } from "../constants.js";

export default function Complaints({ complaints, onResolve, onDelete }) {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("all");
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");
  const [sort, setSort] = useState("newest");

  const q = search.trim().toLowerCase();
  const time = (c) => new Date(c.date).getTime() || 0;

  // 1. FILTER (search + category + status + priority)
  // 2. SORT (newest / oldest / priority)
  const filtered = complaints
    .filter(
      (c) =>
        (!q ||
          (c.title || "").toLowerCase().includes(q) ||
          (c.description || "").toLowerCase().includes(q)) &&
        (cat === "all" || c.category === cat) &&
        (status === "all" || c.status === status) &&
        (priority === "all" || getPriority(c.priority).id === priority)
    )
    .sort((a, b) => {
      const pa = getPriority(a.priority).rank;
      const pb = getPriority(b.priority).rank;
      if (sort === "oldest") return time(a) - time(b);
      if (sort === "priority-high") return pb - pa || time(b) - time(a);
      if (sort === "priority-low") return pa - pb || time(b) - time(a);
      return time(b) - time(a); // newest
    });

  const resetFilters = () => {
    setSearch("");
    setCat("all");
    setStatus("all");
    setPriority("all");
    setSort("newest");
  };

  return (
    <section className="card">
      <h2>All Complaints</h2>

      <div className="filters">
        <input
          type="text"
          className="search-input"
          placeholder="🔍 Search by title or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

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

        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="all">All Priorities</option>
          {PRIORITIES.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>

        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="newest">Newest first</option>
          <option value="oldest">Oldest first</option>
          <option value="priority-high">Priority: High → Low</option>
          <option value="priority-low">Priority: Low → High</option>
        </select>

        <button type="button" className="btn-3d small" onClick={resetFilters}>
          Reset
        </button>
      </div>

      <p className="result-count">
        Showing {filtered.length} of {complaints.length} complaints
      </p>

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