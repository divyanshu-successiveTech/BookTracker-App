"use client";
import { useState } from "react";

export default function LikeButton({ bookId, initialLikes, initialLiked }) {
  const [likes, setLikes] = useState(initialLikes || 0);
  const [liked, setLiked] = useState(initialLiked || false);
  const [loading, setLoading] = useState(false);

  const handleToggleLike = async () => {
    setLoading(true);
    try {
      // +1 if liking, -1 if unliking
      const change = liked ? -1 : 1;

      const res = await fetch("http://localhost:5000/likechange", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: bookId, likeChange: change }),
      });

      if (!res.ok) throw new Error("Failed to update likes");

      const data = await res.json();
      setLikes(data.data.likes); // update likes count from backend
      setLiked(!liked); // toggle heart color
    } catch (err) {
      console.error(err);
      alert("Error updating likes");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ marginTop: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
      <button
        onClick={handleToggleLike}
        disabled={loading}
        style={{
          fontSize: "24px",
          cursor: "pointer",
          border: "none",
          background: "none",
          color: liked ? "red" : "grey",
        }}
      >
        {liked ? "❤️" : "🤍"}
      </button>
      <span style={{ fontSize: "18px" }}>{likes}</span>
    </div>
  );
}
