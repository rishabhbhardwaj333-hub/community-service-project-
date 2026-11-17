const BASE = "/api/complaints";

// Convert a complaint from the server into the shape the React components expect:
// - MongoDB's `_id` is copied to `id`
// - `createdAt` is copied to `date`
// - a complaint with no pinned location gets `location: null`
function normalize(c) {
  const hasLocation =
    c.location &&
    typeof c.location.lat === "number" &&
    typeof c.location.lng === "number";

  return {
    ...c,
    id: c._id,
    date: c.createdAt,
    location: hasLocation ? c.location : null,
  };
}

// Convert form data into what the server expects.
// Accepts location as { lat, lng }, [lat, lng], or flat lat/lng fields.
function toServer(data) {
  const out = { ...data };
  delete out.id;
  delete out._id;
  delete out.date;

  if (!out.location) {
    if (out.lat !== undefined && out.lng !== undefined) {
      out.location = { lat: Number(out.lat), lng: Number(out.lng) };
    } else {
      delete out.location; // no pin chosen: don't send null
    }
  } else if (Array.isArray(out.location)) {
    out.location = {
      lat: Number(out.location[0]),
      lng: Number(out.location[1]),
    };
  }

  delete out.lat;
  delete out.lng;
  return out;
}

// Shared fetch helper: throws an Error with the server's message on failure
async function request(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    let message = "Request failed";
    try {
      message = (await res.json()).message || message;
    } catch {
      /* response had no JSON body */
    }
    throw new Error(message);
  }
  return res.json();
}

// READ: get all complaints
export async function loadComplaints() {
  try {
    const data = await request(BASE);
    return data.map(normalize);
  } catch (err) {
    console.error("Failed to load complaints:", err.message);
    return [];
  }
}

// CREATE: add a new complaint
export async function addComplaint(data) {
  const saved = await request(BASE, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toServer(data)),
  });
  return normalize(saved);
}

// UPDATE: change fields of one complaint (e.g. status)
export async function updateComplaint(id, changes) {
  const saved = await request(`${BASE}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toServer(changes)),
  });
  return normalize(saved);
}

// DELETE: remove one complaint
export async function deleteComplaint(id) {
  await request(`${BASE}/${id}`, { method: "DELETE" });
}