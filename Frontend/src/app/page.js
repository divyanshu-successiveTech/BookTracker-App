"use client";
import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";
import { getAllBooks, getBooksByAuthor, getBooksByCategory } from "../lib/bookService";
import { getAllAuthors } from "../lib/authorService";
import { getAllCategories } from "../lib/categoryService";
import "@/styles/components.css";
import HeroSection from "@/components/HeroSection";
import MiddlePage from "@/components/MiddlePage";

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [authorId, setAuthorId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 8;

  const authorMap = Object.fromEntries(authors.map(a => [a._id, a.authorName]));
  const categoryMap = Object.fromEntries(categories.map(c => [c._id, c.categoryName]));

  function loadAll() {
    getAllBooks().then(setBooks);
  }

  useEffect(() => {
    loadAll();
    getAllAuthors().then(setAuthors);
    getAllCategories().then(setCategories);
  }, []);

  useEffect(() => {
    async function run() {
      let filtered = [];

      if (authorId && categoryId) {
        const all = await getAllBooks();
        filtered = all.filter(
          b => String(b.authorId) === String(authorId) && String(b.categoryId) === String(categoryId)
        );
      } else if (authorId) {
        filtered = await getBooksByAuthor(authorId);
      } else if (categoryId) {
        filtered = await getBooksByCategory(categoryId);
      } else {
        filtered = await getAllBooks();
      }

      setBooks(filtered);
      setCurrentPage(1); // Reset to page 1 on filter change
    }

    run();
  }, [authorId, categoryId]);

  const totalPages = Math.ceil(books.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const currentBooks = books.slice(startIndex, startIndex + booksPerPage);

  return (
    <>
      <HeroSection />
      <MiddlePage />

      <div className="container" id="books">
        <h1 className="page-title">All Books</h1>

        <div className="filters">
          <select
            value={authorId}
            onChange={(e) => setAuthorId(e.target.value)}
            className="select"
          >
            <option value="">All Authors</option>
            {authors.map((a) => (
              <option key={a._id} value={a._id}>
                {a.authorName}
              </option>
            ))}
          </select>

          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="select"
          >
            <option value="">All Categories</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>
                {c.categoryName}
              </option>
            ))}
          </select>

          {(authorId || categoryId) && (
            <button
              className="btn"
              onClick={() => {
                setAuthorId("");
                setCategoryId("");
              }}
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* BOOK LISTING */}
        {currentBooks.length > 0 ? (
          <div
            className="grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
              padding: "20px 0",
              width: "100%",
              boxSizing: "border-box",
            }}
          >
            {currentBooks.map((b) => (
              <BookCard
                key={b._id}
                book={b}
                authorName={authorMap[b.authorId] || "Unknown"}
                categoryName={categoryMap[b.categoryId] || "Unknown"}
              />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "2rem", color: "#555" }}>
            <p style={{ fontSize: "1.25rem", fontWeight: "500" }}>
              📚 No books found for the selected filters.
            </p>
          </div>
        )}

        {/* PAGINATION */}
        {totalPages > 1 && currentBooks.length > 0 && (
          <div style={{ marginTop: "20px", textAlign: "center" }}>
            <button
              className="btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Previous
            </button>

            {[...Array(totalPages)].map((_, idx) => {
              const page = idx + 1;
              return (
                <button
                  key={page}
                  className={`btn ${currentPage === page ? "active-page" : ""}`}
                  onClick={() => setCurrentPage(page)}
                  style={{ margin: "0 5px" }}
                >
                  {page}
                </button>
              );
            })}

            <button
              className="btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
}
