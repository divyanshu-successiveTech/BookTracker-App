export async function updateUserReadlist({ userId, bookId, status }) {
  const res = await fetch("http://localhost:5000/user", {  // adjust URL if needed
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ userId, bookId, status }),
  });

  if (!res.ok) {
    throw new Error("Failed to update readlist");
  }

  return res.json();
}