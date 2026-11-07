export const CATEGORIES = [
  { id: "pothole", label: "Pothole", icon: "🕳️", color: "#ff9f43" },
  { id: "junkyard", label: "Junkyard", icon: "🗑️", color: "#8e9aaf" },
  { id: "light", label: "Light Faultage", icon: "💡", color: "#feca57" },
  { id: "water", label: "Water Logging", icon: "🌧️", color: "#48dbfb" },
];

export const getCategory = (id) => CATEGORIES.find((c) => c.id === id);

export const DEFAULT_CENTER = [28.6139, 77.209]; // Delhi