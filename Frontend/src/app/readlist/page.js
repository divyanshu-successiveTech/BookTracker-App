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
            background: "linear-gradient(45deg, #ff6f61, #ff8c00)", 
            color: "white", 
            fontSize: "1.5rem",
            fontWeight: "bold",
            padding: "20px", 
            borderRadius: "8px",
            textAlign: "center",
            margin: "20px auto",
            maxWidth: "500px", 
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", 
            letterSpacing: "1px", 
          }}
        >
          No books in your list yet.
        </p>
      )}
{toRead.length > 0 && (
  <div className="grid mb-6">
    <h2 style={{
      fontSize: "1.5rem",  
      fontWeight: 600,     
      marginBottom: "16px", 
      color: "#333",       
      background: "linear-gradient(45deg, #f5a623, #f7b731)",
      WebkitBackgroundClip: "text",
      color: "transparent", 
      textAlign: "center",  
      padding: "10px 0",    
      borderRadius: "8px",  
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
      fontSize: "1.5rem",  
      fontWeight: 600,     
      marginBottom: "16px",
      color: "#333",       
      background: "linear-gradient(45deg, #f5a623, #f7b731)",
      WebkitBackgroundClip: "text", 
      color: "transparent",  
      textAlign: "center",  
      padding: "10px 0",    
      borderRadius: "8px",  
    }}>📚 Reading Now</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {reading.map(renderBookCard)}
    </div>
  </div>
)}

{read.length > 0 && (
  <div className="grid mb-6">
    <h2 style={{
      fontSize: "1.5rem",  
      fontWeight: 600,     
      marginBottom: "16px",
      color: "#333",       
      background: "linear-gradient(45deg, #f5a623, #f7b731)", 
      WebkitBackgroundClip: "text", 
      color: "transparent",  
      textAlign: "center",  
      padding: "10px 0",    
      borderRadius: "8px",  
    }}>✅ Completed</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {read.map(renderBookCard)}
    </div>
  </div>
)}

    </div>
  );
}
