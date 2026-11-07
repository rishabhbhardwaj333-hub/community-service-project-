const KEY = "civic_complaints_v1";

export function loadComplaints() {
  try {
    const data = localStorage.getItem(KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function saveComplaints(complaints) {
  try {
    localStorage.setItem(KEY, JSON.stringify(complaints));
  } catch {
    /* storage full or blocked: ignore */
  }
}