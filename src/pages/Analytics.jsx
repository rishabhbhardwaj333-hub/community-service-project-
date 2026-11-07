import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { CATEGORIES } from "../constants.js";

export default function Analytics({ complaints }) {
  const byCategory = CATEGORIES.map((c) => ({
    name: c.label,
    count: complaints.filter((x) => x.category === c.id).length,
    color: c.color,
  }));

  const pending = complaints.filter((c) => c.status === "Pending").length;
  const byStatus = [
    { name: "Pending", value: pending },
    { name: "Resolved", value: complaints.length - pending },
  ];

  if (complaints.length === 0) {
    return (
      <section className="card">
        <h2>Analytics</h2>
        <p>No data yet. Register some complaints to see charts.</p>
      </section>
    );
  }

  return (
    <>
      <section className="card">
        <h2>Complaints by Category</h2>
        <div className="chart-box">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={byCategory}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis dataKey="name" stroke="#ccc" />
              <YAxis allowDecimals={false} stroke="#ccc" />
              <Tooltip />
              <Bar dataKey="count" radius={[6, 6, 0, 0]}>
                {byCategory.map((d) => (
                  <Cell key={d.name} fill={d.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="card">
        <h2>Pending vs Resolved</h2>
        <div className="chart-box">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={byStatus} dataKey="value" nameKey="name" outerRadius={100} label>
                <Cell fill="#ff9f43" />
                <Cell fill="#3cb043" />
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>
    </>
  );
}