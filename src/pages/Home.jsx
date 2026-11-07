import StatsCards from "../components/StatsCards.jsx";
import ComplaintForm from "../components/ComplaintForm.jsx";
import ComplaintCard from "../components/ComplaintCard.jsx";

export default function Home({ complaints, onAdd }) {
  const recent = complaints.slice(0, 3);

  return (
    <>
      <StatsCards complaints={complaints} />
      <ComplaintForm onAdd={onAdd} />

      <section className="card">
        <h2>Recent Complaints</h2>
        {recent.length === 0 ? (
          <p>No complaints registered yet.</p>
        ) : (
          <div className="complaint-grid">
            {recent.map((c) => (
              <ComplaintCard key={c.id} complaint={c} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}