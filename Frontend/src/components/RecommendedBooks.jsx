"use client";

import { useEffect, useState } from "react";
import BookCard from "@/components/BookCard";
import { getAllAuthors } from "@/lib/authorService";
import { getAllCategories } from "@/lib/categoryService";

export default function RecommendedBooks({ categoryId, currentBookId }) {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    if (!categoryId) return;

    const fetchRecommended = async () => {
      try {
        const res = await fetch(`http://localhost:5000/category/${categoryId}`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error("Failed to fetch recommended books");
        const data = await res.json();
        const allBooks = data?.data || [];

        // Filter out current book and limit to 4
        const filtered = allBooks.filter((b) => b._id !== currentBookId).slice(0, 4);
        setBooks(filtered);
      } catch (error) {
        console.error("Error fetching recommended books:", error);
      }
    };

    fetchRecommended();
    getAllAuthors().then(setAuthors);
    getAllCategories().then(setCategories);
  }, [categoryId, currentBookId]);

  const authorMap = Object.fromEntries(authors.map((a) => [a._id, a.authorName]));
  const categoryMap = Object.fromEntries(categories.map((c) => [c._id, c.categoryName]));

  if (!books.length) return null;

  return (
    <>
      <h2 className="page-title" style={{ marginTop: "3rem" }}>📚 Recommended Books</h2>
      <div className="grid">
        {books.map((book) => (
          <BookCard
            key={book._id}
            book={book}
            authorName={authorMap[book.authorId] || "Unknown"}
            categoryName={categoryMap[book.categoryId] || "Unknown"}
          />
        ))}
      </div>
    </>
  );
}
