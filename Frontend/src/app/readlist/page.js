"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import BookCard from "../../components/BookCard";

export default function ReadlistPage() {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function fetchReadlist() {
      try {
        const res = await fetch(`http://localhost:5000/userBooks/${user._id}`);
        const data = await res.json();

        if (data?.data?.result?.length > 0) {
          const userList = data.data.result[0].userList || [];
          setBooks(userList);
        } else {
          setBooks([]);
        }
      } catch (err) {
        console.error("Error fetching readlist:", err);
        setBooks([]);
      } finally {
        setLoading(false);
      }
    }

    fetchReadlist();
  }, [user]);

  if (!user) {
    return <p className="p-4">Please login to view your readlist.</p>;
  }

  if (loading) {
    return <p className="p-4">Loading readlist...</p>;
  }

  // Group books by status
  const toRead = books.filter((b) => b.status === "to read");
  const reading = books.filter((b) => b.status === "reading");
  const read = books.filter((b) => b.status === "read");

  // Helper to safely render BookCard
  const renderBookCard = (item) => {
    const book = item.bookId;
    if (!book) return null;

    return (
      <BookCard
        key={item._id}
        book={book}
        status={item.status}
        authorName={book.authorId?.authorName || "Unknown"}
        categoryName={book.categoryId?.categoryName || "Unknown"}
      />
    );
  };

  const hasAnyBooks = toRead.length > 0 || reading.length > 0 || read.length > 0;


  return (
    <div className="container">
      <h1 className="page-title">📚 My Readlist</h1>

      {!hasAnyBooks && (
        <p 
          style={{
            background: "linear-gradient(45deg, #ff6f61, #ff8c00)", // Gradient background
            color: "white", // White text for contrast
            fontSize: "1.5rem", // Slightly larger text
            fontWeight: "bold", // Make the text bold
            padding: "20px", // Padding around the text
            borderRadius: "8px", // Rounded corners
            textAlign: "center", // Center align the text
            margin: "20px auto", // Center the message with margin
            maxWidth: "500px", // Max width for the box
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Shadow for depth
            letterSpacing: "1px", // Add some letter spacing for a cleaner look
          }}
        >
          No books in your list yet.
        </p>
      )}
{toRead.length > 0 && (
  <div className="grid mb-6">
    <h2 style={{
      fontSize: "1.5rem",  // Equivalent to text-xl
      fontWeight: 600,     // Equivalent to font-semibold
      marginBottom: "16px", // Equivalent to mb-4
      color: "#333",       // Dark color for text
      background: "linear-gradient(45deg, #f5a623, #f7b731)", // Gradient effect on text
      WebkitBackgroundClip: "text", // Ensures the gradient is clipped to the text
      color: "transparent",  // Makes the text itself transparent to show the gradient
      textAlign: "center",  // Center the text
      padding: "10px 0",    // Adds some padding for space around the text
      borderRadius: "8px",  // Optional: rounded corners for a soft look
    }}>
      📖 Read Later
    </h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {toRead.map(renderBookCard)}
    </div>
  </div>
)}

{reading.length > 0 && (
  <div className="grid mb-6">
    <h2 style={{
      fontSize: "1.5rem",  // Equivalent to text-xl
      fontWeight: 600,     // Equivalent to font-semibold
      marginBottom: "16px", // Equivalent to mb-4
      color: "#333",       // Dark color for text
      background: "linear-gradient(45deg, #f5a623, #f7b731)", // Gradient effect on text
      WebkitBackgroundClip: "text", // Ensures the gradient is clipped to the text
      color: "transparent",  // Makes the text itself transparent to show the gradient
      textAlign: "center",  // Center the text
      padding: "10px 0",    // Adds some padding for space around the text
      borderRadius: "8px",  // Optional: rounded corners for a soft look
    }}>📚 Reading Now</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {reading.map(renderBookCard)}
    </div>
  </div>
)}

{read.length > 0 && (
  <div className="grid mb-6">
    <h2 style={{
      fontSize: "1.5rem",  // Equivalent to text-xl
      fontWeight: 600,     // Equivalent to font-semibold
      marginBottom: "16px", // Equivalent to mb-4
      color: "#333",       // Dark color for text
      background: "linear-gradient(45deg, #f5a623, #f7b731)", // Gradient effect on text
      WebkitBackgroundClip: "text", // Ensures the gradient is clipped to the text
      color: "transparent",  // Makes the text itself transparent to show the gradient
      textAlign: "center",  // Center the text
      padding: "10px 0",    // Adds some padding for space around the text
      borderRadius: "8px",  // Optional: rounded corners for a soft look
    }}>✅ Completed</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {read.map(renderBookCard)}
    </div>
  </div>
)}

    </div>
  );
}
