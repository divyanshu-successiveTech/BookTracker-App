"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { getBooksByCategory } from "../../../lib/bookService";
import { getAllAuthors } from "../../../lib/authorService";
import { getAllCategories } from "../../../lib/categoryService";
import BookCard from "../../../components/BookCard";

export default function BooksByCategory() {
  const { id } = useParams();
  const [books, setBooks] = useState([]);
  const [authorMap, setAuthorMap] = useState({});
  const [categoryMap, setCategoryMap] = useState({});

  useEffect(() => {
    if (!id) return;
    getBooksByCategory(id).then(setBooks);
    getAllAuthors().then(list => setAuthorMap(Object.fromEntries(list.map(a => [a._id, a.authorName]))));
    getAllCategories().then(list => setCategoryMap(Object.fromEntries(list.map(c => [c._id, c.categoryName]))));
  }, [id]);

  return (
    <div>
      <h1 className="page-title">Books by Category</h1>
      <div className="grid">
        {books.map(b => (
          <BookCard
            key={b._id}
            book={b}
            authorName={authorMap[b.authorId] || "Unknown"}
            categoryName={categoryMap[b.categoryId] || "Unknown"}
          />
        ))}
      </div>
    </div>
  );
}
