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
      <h1 className="text-2xl font-bold mb-6">📚 My Readlist</h1>

      {!hasAnyBooks && <p>No books in your list yet.</p>}

      {toRead.length > 0 && (
        <div className="grid mb-6">
          <h2 className="text-xl font-semibold mb-4">📖 Read Later</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {toRead.map(renderBookCard)}
          </div>
        </div>
      )}

      {reading.length > 0 && (
        <div className="grid mb-6">
          <h2 className="text-xl font-semibold mb-4">📚 Reading Now</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {reading.map(renderBookCard)}
          </div>
        </div>
      )}

      {read.length > 0 && (
        <div className="grid mb-6">
          <h2 className="text-xl font-semibold mb-4">✅ Completed</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {read.map(renderBookCard)}
          </div>
        </div>
      )}
    </div>
  );
}
