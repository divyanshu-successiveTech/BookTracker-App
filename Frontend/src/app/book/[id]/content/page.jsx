"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBookById } from "@/lib/bookService";

export default function BookContentPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const fetchBook = async () => {
      try {
        setLoading(true);
        setError("");

        const bookData = await getBookById(id);
        setBook(bookData);

        if (bookData?.content) {
          if (bookData.content.startsWith("http")) {
            // case: content is a URL → fetch from URL
            const contentRes = await fetch(bookData.content);
            if (!contentRes.ok) throw new Error("Failed to fetch book content");

            const text = await contentRes.text();
            setContent(text);
          } else {
            // case: content is plain text → use directly
            setContent(bookData.content);
          }
        } else {
          setContent("No content available for this book.");
        }
      } catch (err) {
        setError(err.message || "Error fetching book content");
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "2rem",
        borderRadius: "1rem",
        alignItems: "flex-start",
        margin: "2rem auto",
        maxWidth: "800px",
        gap: "1rem",
        boxSizing: "border-box",
        background: "#f0f0f0",
      }}
    >
      <h2>{book ? `${book.name}` : "Loading book..."}</h2>

      {loading && <p>Loading content...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && content && (
        <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.5" }}>
          {content}
        </div>
      )}
    </div>
  );
}
