"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAuth } from "../../../hooks/useAuth";
import { getBookById } from "../../../lib/bookService";
import { getAllAuthors } from "../../../lib/authorService";
import { getAllCategories } from "../../../lib/categoryService";
import { updateUserReadlist } from "../../../lib/userBookService";
import LikeButton from "../../../components/LikeButton"; // import LikeButton

export default function BookDetailPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [book, setBook] = useState(null);
  const [authorMap, setAuthorMap] = useState({});
  const [categoryMap, setCategoryMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [inReadlist, setInReadlist] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("");

  const buttonStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    padding: "8px 16px",
    marginRight: "8px",
    marginTop: "5px",
    cursor: "pointer",
  };

  const disabledButtonStyle = {
    ...buttonStyle,
    backgroundColor: "#a0c4ff",
    cursor: "not-allowed",
  };

  useEffect(() => {
    if (!id) return;

    getBookById(id).then(setBook);
    getAllAuthors().then((list) =>
      setAuthorMap(Object.fromEntries(list.map((a) => [a._id, a.authorName])))
    );
    getAllCategories().then((list) =>
      setCategoryMap(Object.fromEntries(list.map((c) => [c._id, c.categoryName])))
    );
  }, [id]);

  useEffect(() => {
    if (!user || !id) return;

    const fetchReadlist = async () => {
      try {
        const res = await fetch(`http://localhost:5000/userBooks/${user._id}`, {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        });
        if (!res.ok) throw new Error("Failed to fetch user readlist");
        const data = await res.json();

        const userList = data?.data?.result?.[0]?.userList || [];
        const entry = userList.find((item) => item.bookId._id === id);
        if (entry) {
          setInReadlist(true);
          setCurrentStatus(entry.status);
        } else {
          setInReadlist(false);
          setCurrentStatus("");
        }
      } catch (err) {
        console.error("Error fetching readlist:", err);
      }
    };

    fetchReadlist();
  }, [user, id]);

  if (!book) return <p>Loading...</p>;

  const authorName = authorMap[book.authorId] || "Unknown";
  const categoryName = categoryMap[book.categoryId] || "Unknown";

  const handleAddToReadlist = async (status) => {
    if (!user) {
      setMessage("Please log in first.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");
      const response = await updateUserReadlist({
        userId: user._id,
        bookId: book._id,
        status,
      });
      setMessage(response.data?.message || "Updated successfully!");
      setInReadlist(true);
      setCurrentStatus(status);
    } catch (err) {
      setMessage("Error updating readlist");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFromReadlist = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setMessage("");
      const response = await updateUserReadlist({
        userId: user._id,
        bookId: book._id,
        status: "remove",
      });
      setMessage(response.data?.message || "Removed from list!");
      setInReadlist(false);
      setCurrentStatus("");
    } catch (err) {
      setMessage("Error removing from readlist");
    } finally {
      setLoading(false);
    }
  };

  const renderActionButtons = () => {
    if (!inReadlist) {
      return (
        <>
          <p><b>Add to Readlist?</b></p>
          <button
            style={loading ? disabledButtonStyle : buttonStyle}
            disabled={loading}
            onClick={() => handleAddToReadlist("read")}
          >
            Completed
          </button>
          <button
            style={loading ? disabledButtonStyle : buttonStyle}
            disabled={loading}
            onClick={() => handleAddToReadlist("reading")}
          >
            Read Now
          </button>
          <button
            style={loading ? disabledButtonStyle : buttonStyle}
            disabled={loading}
            onClick={() => handleAddToReadlist("to read")}
          >
            Read Later
          </button>
        </>
      );
    }

    switch (currentStatus) {
      case "to read":
        return (
          <>
            <p><b>Status:</b> {currentStatus}</p>
            <button
              style={loading ? disabledButtonStyle : buttonStyle}
              disabled={loading}
              onClick={() => handleAddToReadlist("reading")}
            >
              Read Now
            </button>
            <button
              style={loading ? disabledButtonStyle : buttonStyle}
              disabled={loading}
              onClick={handleRemoveFromReadlist}
            >
              Remove
            </button>
          </>
        );
      case "reading":
        return (
          <>
            <p><b>Status:</b> {currentStatus}</p>
            <button
              style={loading ? disabledButtonStyle : buttonStyle}
              disabled={loading}
              onClick={() => handleAddToReadlist("read")}
            >
              Mark as Completed
            </button>
            <button
              style={loading ? disabledButtonStyle : buttonStyle}
              disabled={loading}
              onClick={handleRemoveFromReadlist}
            >
              Remove
            </button>
          </>
        );
      case "read":
        return (
          <>
            <p><b>Status:</b> {currentStatus}</p>
            <button
              style={loading ? disabledButtonStyle : buttonStyle}
              disabled={loading}
              onClick={handleRemoveFromReadlist}
            >
              Remove
            </button>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding:"4rem",
        borderRadius:"3rem",
        alignItems: "flex-start",
        position:"absolute",
        transform:"translate(-50%,-50%)",
        left:"50%",
        top:"50%",
        gap: "20px",
        boxSizing: "border-box",
        background:"#f0f0f0"
      }}
    >
      {/* Left: Book Details */}
      <div style={{ flex: "1 1 auto", minWidth: "200px", maxWidth:"600px" }}>
        <h1>{book.name}</h1>
        <p><b>Author:</b> {authorName}</p>
        <p><b>Category:</b> {categoryName}</p>
        <hr />
        {!user ? (
          <p>Please log in to read this book.</p>
        ) : (
          <div>
            <p><b>Pages:</b> {book.pages}</p>
            <p><b>Reading Time:</b> {book.readingTime}</p>
            <p style={{ marginTop: 10 }}>{book.shortDescription}</p>

            <div style={{ marginTop: 20 }}>
              {renderActionButtons()}

              {/* Like Button */}
              <LikeButton
                bookId={book._id}
                initialLikes={book.likes}
                initialLiked={false} // optionally, fetch if user has liked
              />
            </div>
          </div>
        )}
      </div>

      {/* Right: Cover Image */}
      {book.coverImage && (
        <div style={{ flexShrink: 0, width: "200px", marginLeft: "20px" }}>
          <img
            src={book.coverImage}
            alt={book.name}
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              borderRadius: "8px",
            }}
          />
        </div>
      )}
    </div>
  );
}
