import { NavLink } from "react-router-dom";
import { LayoutDashboard, ListChecks, Map, BarChart3 } from "lucide-react";

const links = [
  { to: "/", label: "Home", icon: <LayoutDashboard size={18} /> },
  { to: "/complaints", label: "Complaints", icon: <ListChecks size={18} /> },
  { to: "/map", label: "Map", icon: <Map size={18} /> },
  { to: "/analytics", label: "Analytics", icon: <BarChart3 size={18} /> },
];

export default function Navbar() {
  return (
    <header className="navbar">
      <h1 className="logo">🏙️ Civic Complaint Management System</h1>
      <nav>
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.to === "/"}
            className={({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
          >
            {l.icon} {l.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}