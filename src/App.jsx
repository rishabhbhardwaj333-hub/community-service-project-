import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Complaints from "./pages/Complaints.jsx";
import MapView from "./pages/MapView.jsx";
import Analytics from "./pages/Analytics.jsx";
import { loadComplaints, saveComplaints } from "./storage.js";

export default function App() {
  const [complaints, setComplaints] = useState(loadComplaints);

  useEffect(() => {
    saveComplaints(complaints);
  }, [complaints]);

  const addComplaint = (data) => {
    const complaint = {
      ...data,
      id: Date.now(),
      status: "Pending",
      date: new Date().toISOString(),
    };
    setComplaints((prev) => [complaint, ...prev]);
  };

  const resolveComplaint = (id) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: "Resolved" } : c))
    );
  };

  const deleteComplaint = (id) => {
    setComplaints((prev) => prev.filter((c) => c.id !== id));
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="main">
          <Routes>
            <Route
              path="/"
              element={<Home complaints={complaints} onAdd={addComplaint} />}
            />
            <Route
              path="/complaints"
              element={
                <Complaints
                  complaints={complaints}
                  onResolve={resolveComplaint}
                  onDelete={deleteComplaint}
                />
              }
            />
            <Route path="/map" element={<MapView complaints={complaints} />} />
            <Route
              path="/analytics"
              element={<Analytics complaints={complaints} />}
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}