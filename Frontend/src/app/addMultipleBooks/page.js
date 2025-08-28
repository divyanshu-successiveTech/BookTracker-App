"use client";
import { useEffect, useState } from "react";
import { getAllAuthors } from "../../lib/authorService";
import { getAllCategories } from "../../lib/categoryService";

export default function AddBooksBulkPage() {
  const [books, setBooks] = useState([
    {
      name: "",
      shortDescription: "",
      readingTime: "",
      pages: "",
      likes: "",
      authorId: "",
      categoryId: "",
      coverImage: "",
      content: "",
    },
  ]);
  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getAllAuthors().then(setAuthors);
    getAllCategories().then(setCategories);
  }, []);

  const handleChange = (index, field, value) => {
    const updated = [...books];
    updated[index][field] = value;
    setBooks(updated);
  };

  const addBookForm = () => {
    if (books.length >= 10) {
      alert("You can only add up to 10 books at once.");
      return;
    }
    setBooks([
      ...books,
      {
        name: "",
        shortDescription: "",
        readingTime: "",
        pages: "",
        likes: "",
        authorId: "",
        categoryId: "",
        coverImage: "",
        content: "",
      },
    ]);
  };

  const removeBookForm = (index) => {
    if (books.length === 1) {
      alert("At least one book form is required.");
      return;
    }
    setBooks(books.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authData = JSON.parse(localStorage.getItem("auth"));
      const token = authData?.token;

      const payload = {
        books: books.map((book) => ({
          name: book.name,
          shortDescription: book.shortDescription,
          readingTime: book.readingTime,
          pages: Number(book.pages),
          likes: Number(book.likes),
          authorId: book.authorId,
          categoryId: book.categoryId,
          coverImage: book.coverImage,
          content: book.content,
        })),
      };

      const res = await fetch("http://localhost:5000/addMultipleBook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data?.statusCode === 200) {
        alert("All books added successfully!");
        setBooks([
          {
            name: "",
            shortDescription: "",
            readingTime: "",
            pages: "",
            likes: "",
            authorId: "",
            categoryId: "",
            coverImage: "",
            content: "",
          },
        ]);
      } else {
        alert(data?.message || "Failed to add books.");
      }
    } catch (err) {
      console.error("Error adding books:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <h1 style={{ marginBottom: "20px", textAlign: "center" }}>
        Add Multiple Books
      </h1>

      <form onSubmit={handleSubmit}>
        {books.map((book, index) => (
          <div
            key={index}
            style={{
              marginBottom: "25px",
              padding: "20px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              background: "#f9fafb",
              boxShadow: "0 2px 6px rgba(0,0,0,0.05)",
              position: "relative",
            }}
          >
            <h2 style={{ marginBottom: "15px" }}>Book {index + 1}</h2>

            <Field label="Name" value={book.name} onChange={(e) => handleChange(index, "name", e.target.value)} />
            <Field label="Short Description" value={book.shortDescription} onChange={(e) => handleChange(index, "shortDescription", e.target.value)} />
            <Field label="Reading Time" value={book.readingTime} onChange={(e) => handleChange(index, "readingTime", e.target.value)} />
            <Field label="Pages" type="number" value={book.pages} onChange={(e) => handleChange(index, "pages", e.target.value)} />
            <Field label="Likes" type="number" value={book.likes} onChange={(e) => handleChange(index, "likes", e.target.value)} />
            <Field label="Cover Image URL" value={book.coverImage} onChange={(e) => handleChange(index, "coverImage", e.target.value)} />
            <Field label="Content" type="textarea" value={book.content} onChange={(e) => handleChange(index, "content", e.target.value)} />

            <div style={fieldStyle}>
              <label style={labelStyle}>Author</label>
              <select value={book.authorId} onChange={(e) => handleChange(index, "authorId", e.target.value)} style={inputStyle} required>
                <option value="">Select Author</option>
                {authors.map((a) => (
                  <option key={a._id} value={a._id}>{a.authorName}</option>
                ))}
              </select>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Category</label>
              <select value={book.categoryId} onChange={(e) => handleChange(index, "categoryId", e.target.value)} style={inputStyle} required>
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c._id}>{c.categoryName}</option>
                ))}
              </select>
            </div>

            <button type="button" onClick={() => removeBookForm(index)} style={removeButton}>
              Remove
            </button>
          </div>
        ))}

        <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
          <button type="button" onClick={addBookForm} style={secondaryButton}>
            + Add Another Book
          </button>
          <button type="submit" style={primaryButton}>
            Add to DB
          </button>
        </div>
      </form>
    </div>
  );
}

// Reusable input field component
function Field({ label, type = "text", value, onChange }) {
  return (
    <div style={fieldStyle}>
      <label style={labelStyle}>{label}</label>
      {type === "textarea" ? (
        <textarea value={value} onChange={onChange} style={{ ...inputStyle, height: "80px" }} required />
      ) : (
        <input type={type} value={value} onChange={onChange} style={inputStyle} required />
      )}
    </div>
  );
}

// Styles
const fieldStyle = { marginBottom: "15px" };
const labelStyle = { display: "block", marginBottom: "5px", fontWeight: "bold" };
const inputStyle = { width: "100%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", fontSize: "14px" };
const primaryButton = { background: "#2563eb", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" };
const secondaryButton = { background: "#6b7280", color: "#fff", border: "none", padding: "10px 20px", borderRadius: "6px", cursor: "pointer", fontWeight: "bold" };
const removeButton = { position: "absolute", top: "15px", right: "15px", background: "#dc2626", color: "#fff", border: "none", padding: "5px 10px", borderRadius: "4px", cursor: "pointer", fontSize: "12px" };
