"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAllAuthors } from "../../lib/authorService";
import { getAllCategories } from "../../lib/categoryService";

export default function AddBookPage() {
  const [name, setName] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [readingTime, setReadingTime] = useState("");
  const [pages, setPages] = useState("");
  const [likes, setLikes] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [content, setContent] = useState("");

  const [authors, setAuthors] = useState([]);
  const [categories, setCategories] = useState([]);

  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        getAllAuthors().then(setAuthors);
        getAllCategories().then(setCategories);
      } catch (err) {
        console.error("Failed to fetch authors/categories", err);
      }
    }
    fetchData();
  }, []);

  async function handleAddBook() {
    if (!name || !shortDescription || !authorId || !categoryId) {
      alert("Please fill all required fields");
      return;
    }

    const bookData = {
      name,
      shortDescription,
      readingTime,
      pages: Number(pages),
      likes: Number(likes),
      authorId,
      categoryId,
      coverImage,
      content,
    };

    try {
      const res = await fetch("http://localhost:5000/addBook", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookData),
      });

      if (res.ok) {
        alert("Book added successfully!");
        router.push("/"); // redirect to homepage
      } else {
        const err = await res.json();
        alert("Failed to add book: " + (err.message || res.statusText));
      }
    } catch (error) {
      console.error(error);
      alert("Something went wrong while adding the book.");
    }
  }

  return (
    <div className="full-center">
      <div className="login-card">
        <h1>Add Book</h1>

        <input
          className="input"
          placeholder="Book Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="input"
          placeholder="Reading Time (e.g. 4 hours)"
          value={readingTime}
          onChange={(e) => setReadingTime(e.target.value)}
        />

        <input
          className="input"
          type="number"
          placeholder="Pages"
          value={pages}
          onChange={(e) => setPages(e.target.value)}
        />

        <input
          className="input"
          type="number"
          placeholder="Likes"
          value={likes}
          onChange={(e) => setLikes(e.target.value)}
        />

        <select
          className="input"
          value={authorId}
          onChange={(e) => setAuthorId(e.target.value)}
        >
          <option value="">-- Select Author --</option>
          {authors.map((author) => (
            <option key={author._id} value={author._id}>
              {author.authorName}
            </option>
          ))}
        </select>

        <select
          className="input"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <option value="">-- Select Category --</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.categoryName}
            </option>
          ))}
        </select>

        <input
          className="input"
          placeholder="Cover Image URL"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
        />

        <textarea
          className="input"
          placeholder="Short Description"
          value={shortDescription}
          onChange={(e) => setShortDescription(e.target.value)}
        />

        <textarea
          className="input"
          placeholder="Book Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button className="btn" onClick={handleAddBook}>
          Add Book
        </button>
      </div>
    </div>
  );
}
