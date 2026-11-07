export default function StatsCards({ complaints }) {
  const total = complaints.length;
  const pending = complaints.filter((c) => c.status === "Pending").length;
  const resolved = total - pending;

  const items = [
    { label: "Total Complaints", value: total, cls: "blue" },
    { label: "Pending", value: pending, cls: "orange" },
    { label: "Resolved", value: resolved, cls: "green" },
  ];

  return (
    <div className="stats">
      {items.map((s) => (
        <div key={s.label} className={`stat-card ${s.cls}`}>
          <span className="stat-value">{s.value}</span>
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}