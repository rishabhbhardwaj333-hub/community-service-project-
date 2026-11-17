import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/home.jsx";
import Complaints from "./pages/Complaints.jsx";
import MapView from "./pages/MapView.jsx";
import Analytics from "./pages/Analytics.jsx";
import {
  loadComplaints,
  addComplaint as apiAdd,
  updateComplaint as apiUpdate,
  deleteComplaint as apiDelete,
} from "./storage.js";

export default function App() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load all complaints from the server once, when the app starts
  useEffect(() => {
    loadComplaints()
      .then(setComplaints)
      .finally(() => setLoading(false));
  }, []);

  // Throws on failure so ComplaintForm can show the error message
  const addComplaint = async (data) => {
    const saved = await apiAdd({ ...data, status: "Pending" });
    setComplaints((prev) => [saved, ...prev]);
  };

  const resolveComplaint = async (id) => {
    try {
      const updated = await apiUpdate(id, { status: "Resolved" });
      setComplaints((prev) => prev.map((c) => (c.id === id ? updated : c)));
    } catch (err) {
      alert("Could not update complaint: " + err.message);
    }
  };

  const deleteComplaint = async (id) => {
    try {
      await apiDelete(id);
      setComplaints((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      alert("Could not delete complaint: " + err.message);
    }
  };

  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main className="main">
          {loading ? (
            <p style={{ textAlign: "center", padding: "2rem" }}>
              Loading complaints...
            </p>
          ) : (
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
          )}
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}