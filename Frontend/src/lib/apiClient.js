const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

// unwrap pattern: many of your endpoints return { statuscode, status, data }
function unwrap(json) {
  if (json && typeof json === "object" && "data" in json) return json.data;
  return json;
}

export async function apiGet(path) {
  const res = await fetch(API_URL + path, { credentials: "include" });
  const json = await res.json();
  return unwrap(json);
}

export async function apiPost(path, body) {
  const res = await fetch(API_URL + path, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(body || {}),
  });
  const json = await res.json();
  return unwrap(json);
}
