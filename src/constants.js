export const CATEGORIES = [
  { id: "pothole", label: "Pothole", icon: "🕳️", color: "#ff9f43" },
  { id: "junkyard", label: "Junkyard", icon: "🗑️", color: "#8e9aaf" },
  { id: "light", label: "Light Faultage", icon: "💡", color: "#feca57" },
  { id: "water", label: "Water Logging", icon: "🌧️", color: "#48dbfb" },
];

export const getCategory = (id) => CATEGORIES.find((c) => c.id === id);

// ---------- priority levels (rank is used for sorting) ----------
export const PRIORITIES = [
  { id: "low", label: "Low", rank: 1 },
  { id: "medium", label: "Medium", rank: 2 },
  { id: "high", label: "High", rank: 3 },
];

// Old complaints saved without a priority are treated as "medium"
export const getPriority = (id) =>
  PRIORITIES.find((p) => p.id === id) || PRIORITIES[1];

export const DEFAULT_CENTER = [28.6139, 77.209]; // Delhi