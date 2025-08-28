"use client";
import { useEffect, useState } from "react";
import { getAllAuthors } from "../../lib/authorService";
import { getAllCategories } from "../../lib/categoryService";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);
  const router = useRouter();

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 5;

  // Fetch books
  const fetchBooks = async () => {
    try {
      const res = await fetch("http://localhost:5000/allbooks");
      const data = await res.json();
      if (data?.statuscode === 200) {
        setBooks(data.data);
      }
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  // On mount, load books + authors + categories
  useEffect(() => {
    fetchBooks();
    getAllAuthors().then(setAuthors);
    getAllCategories().then(setCategories);
  }, []);

  // Delete book
  const handleDelete = async (bookId) => {
    const confirmDelete = confirm("Are you sure you want to delete this book?");
    if (!confirmDelete) return;

    try {
      const authData = JSON.parse(localStorage.getItem("auth"));
      const token = authData?.token;

      const res = await fetch(`http://localhost:5000/deleteBook/${bookId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (data?.statusCode === 200) {
        alert("Book deleted successfully");
        setBooks((prev) => prev.filter((b) => b._id !== bookId));
      } else {
        alert(data?.message || "Failed to delete book");
      }
    } catch (err) {
      console.error("Error deleting book:", err);
      alert("Something went wrong");
    }
  };

  const authorMap = Object.fromEntries(
    authors.map((a) => [a._id, a.authorName])
  );
  const categoryMap = Object.fromEntries(
    categories.map((c) => [c._id, c.categoryName])
  );

  const totalPages = Math.ceil(books.length / booksPerPage);
  const startIdx = (currentPage - 1) * booksPerPage;
  const paginatedBooks = books.slice(startIdx, startIdx + booksPerPage);

  return (
    <div style={{ padding: "20px" }}>
      {/* Header with Add Book button */}
      {/* Header with Add Book & Add Multiple Books button */}
<div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
  <h1 style={{ marginBottom: "20px" }}>Admin - Manage Books</h1>
  <div style={{ display: "flex", gap: "10px" }}>
    <button
      onClick={() => router.push("/addBook")}
      style={{
        background: "#2563eb",
        color: "#fff",
        border: "none",
        padding: "8px 16px",
        borderRadius: "5px",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      + Add One Book
    </button>

    <button
      onClick={() => router.push("/addMultipleBooks")}
      style={{
        background: "#2563eb",
        color: "#fff",
        border: "none",
        padding: "8px 16px",
        borderRadius: "5px",
        cursor: "pointer",
        fontWeight: "bold",
      }}
    >
      + Add Multiple Books
    </button>
  </div>
</div>


      {books.length === 0 ? (
        <p>No books available.</p>
      ) : (
        <>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              background: "#fff",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <thead style={{ background: "#1e293b", color: "#fff" }}>
              <tr>
                <th style={thStyle}>Cover</th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Author</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBooks.map((b) => (
                <tr key={b._id} style={{ textAlign: "center" }}>
                  <td style={tdStyle}>
                    <img
                      src={b.coverImage}
                      alt={b.name}
                      style={{ width: "50px", height: "70px", objectFit: "cover" }}
                    />
                  </td>
                  <td style={tdStyle}>{b.name}</td>
                  <td style={tdStyle}>{authorMap[b.authorId] || "Unknown"}</td>
                  <td style={tdStyle}>{categoryMap[b.categoryId] || "Unknown"}</td>
                  <td style={tdStyle}>
                    <button
                      onClick={() => handleDelete(b._id)}
                      style={{
                        background: "#ef4444",
                        color: "#fff",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "5px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination Controls */}
          {totalPages > 1 && (
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
                    style={{
                      margin: "0 5px",
                      fontWeight: currentPage === page ? "bold" : "normal",
                    }}
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
        </>
      )}
    </div>
  );
}

// Styles
const thStyle = {
  padding: "12px",
  textAlign: "center",
};

const tdStyle = {
  padding: "10px",
  borderBottom: "1px solid #e2e8f0",
};
