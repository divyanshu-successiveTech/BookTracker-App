"use client";
import { useEffect, useState } from "react";

export default function BookContent({ book }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!book?.content) {
      setLoading(false);
      setError("No content available");
      return;
    }

    const fetchContent = async () => {
      try {
        setLoading(true);
        setError("");

        // If content looks like a URL → fetch it
        if (book.content.startsWith("http")) {
          const response = await fetch(book.content);
          if (!response.ok) throw new Error("Failed to fetch content");

          const data = await response.text(); // or .json() depending on API
          setContent(data);
        } else {
          // If it's plain text → show directly
          setContent(book.content);
        }
      } catch (err) {
        setError(err.message || "Error fetching content");
      } finally {
        setLoading(false);
      }
    };

    fetchContent();
  }, [book]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "2rem",
        borderRadius: "1rem",
        alignItems: "flex-start",
        position: "relative",
        margin: "2rem auto",
        maxWidth: "800px",
        gap: "1rem",
        boxSizing: "border-box",
        background: "#f0f0f0",
      }}
    >
      <h2>Content for: {book.name}</h2>
      {loading && <p>Loading content...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {!loading && !error && (
        <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.5" }}>
          {content}
        </div>
      )}
    </div>
  );
}
