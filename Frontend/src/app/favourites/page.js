"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import BookCard from "../../components/BookCard";

export default function FavouritePage() {
  const { user } = useAuth();
  const [favouriteBooks, setFavouriteBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    async function fetchFavouriteBooks() {
      try {
        const res = await fetch(`http://localhost:5000/favouriteBooks/${user._id}`);
        const data = await res.json();

        if (data?.data?.result?.length > 0) {
          setFavouriteBooks(data.data.result);
        } else {
          setFavouriteBooks([]);
        }
      } catch (err) {
        console.error("Error fetching favourite books:", err);
        setFavouriteBooks([]);
      } finally {
        setLoading(false);
      }
    }

    fetchFavouriteBooks();
  }, [user]);

  if (!user) {
    return <p className="p-4">Please login to view your favourite books.</p>;
  }

  if (loading) {
    return <p className="p-4">Loading favourite books...</p>;
  }

  // Helper to safely render BookCard
  const renderBookCard = (favourite) => {
    const book = favourite.bookId;
    if (!book) return null;

    return (
      <BookCard
        key={favourite._id}
        book={book}
        authorName={book.authorId?.authorName || "Unknown"}
        categoryName={book.categoryId?.categoryName || "Unknown"}
      />
    );
  };

  const hasAnyBooks = favouriteBooks.length > 0;

  return (
    <div className="container">
      <h1 className="page-title">My Favourite Books</h1>

      {!hasAnyBooks && <p 
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
        </p>}

      {hasAnyBooks && (
        <div className="grid mb-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {favouriteBooks.map(renderBookCard)}
          </div>
        </div>
      )}
    </div>
  );
}
