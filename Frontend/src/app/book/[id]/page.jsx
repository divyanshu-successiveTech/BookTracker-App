"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "../../../hooks/useAuth";
import { getBookById } from "../../../lib/bookService";
import { getAllAuthors } from "../../../lib/authorService";
import { getAllCategories } from "../../../lib/categoryService";
import { updateUserReadlist } from "../../../lib/userBookService";
import RecommendedBooks from "@/components/RecommendedBooks";

export default function BookDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const { user } = useAuth();

  const [book, setBook] = useState(null);
  const [authorMap, setAuthorMap] = useState({});
  const [categoryMap, setCategoryMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [inReadlist, setInReadlist] = useState(false);
  const [currentStatus, setCurrentStatus] = useState("");
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [inFavourites, setInFavourites] = useState(false); // State to check if the book is in favourites

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

    getBookById(id).then((data) => {
      setBook(data);
      setLikes(data.likes || 0);
    });

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
          credentials: "include",
        });
        const data = await res.json();
        const userList = data?.data?.result?.[0]?.userList || [];

        const entry = userList.find((item) => {
          if (!item.bookId) return false;
          if (typeof item.bookId === "object" && item.bookId._id) {
            return item.bookId._id === id;
          }
          return item.bookId === id;
        });

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

  useEffect(() => {
    if (user && book?._id) {
      const fetchLiked = async () => {
        try {
          const res = await fetch(`http://localhost:5000/likedBooks/${user._id}`, {
            credentials: "include",
          });
          const data = await res.json();
          const likedBooks = data?.data?.result || [];
          const isLiked = likedBooks.some((b) => b?.bookId?._id === book._id);
          setLiked(isLiked);
        } catch (err) {
          console.error("Error checking liked status:", err);
        }
      };
      fetchLiked();
    }
  }, [user, book]);

  // Fetch favourite status
  useEffect(() => {
  if (user && book?._id) {
    const fetchFavourites = async () => {
      
      try {
        const res = await fetch(`http://localhost:5000/favouriteBooks/${user._id}`, {
          credentials: "include",
        });
        const data = await res.json();

        // Ensure we safely access the 'result' array inside 'data'
        const favouriteBooks = data?.data?.result || [];
        const isInFavourites = favouriteBooks.some((b) => b?.bookId?._id === book._id);
        setInFavourites(isInFavourites);
      } catch (err) {
        console.error("Error checking favourite status:", err);
      }
    };
    fetchFavourites();
  }
}, [user, book]);

  // Handle Add/Remove from Favourites
  const handleToggleFavourite = async () => {
    if (!user) {
      alert("Please log in first.");
      return;
    }

    try {
      setLoading(true);
      const status = inFavourites ? "remove" : "add"; // Add or remove based on current state
      await fetch(`http://localhost:5000/favouriteBooks`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          userId: user._id,
          bookId: book._id,
          status,
        }),
      });

      setInFavourites((prev) => !prev);
    } catch (err) {
      console.error("Error updating favourite status:", err);
    } finally {
      setLoading(false);
    }
  };

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

  const handleToggleLike = async () => {
    if (!user) {
      alert("Please log in first.");
      return;
    }

    try {
      await fetch(`http://localhost:5000/liked`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          userId: user._id,
          bookId: book._id,
          status: liked ? "unlike" : "like",
        }),
      });

      await fetch("http://localhost:5000/likechange", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id: book._id, likeChange: liked ? -1 : +1 }),
      });

      setLiked((prev) => !prev);
      setLikes((prev) => (liked ? prev - 1 : prev + 1));
    } catch (err) {
      console.error("Error updating like:", err);
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
            onClick={() => handleAddToReadlist("to read")}
          >
            Read Later
          </button>
        </>
      );
    }

    switch (currentStatus) {
      case "to read":
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
      default:
        return null;
    }
  };

  if (!book) return <p>Loading...</p>;

  const authorName = authorMap[book.authorId] || "Unknown";
  const categoryName = categoryMap[book.categoryId] || "Unknown";

  return (
    <div className="container">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "4rem",
          borderRadius: "3rem",
          alignItems: "flex-start",
          gap: "20px",
          background: "#f0f0f0",
          position: "relative", // To ensure the button is on top of the image
        }}
      >
        <div style={{ flex: "1 1 auto", minWidth: "200px", maxWidth: "600px" }}>
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
                <button
                  style={loading ? disabledButtonStyle : buttonStyle}
                  disabled={loading}
                  onClick={async () => {
                    await handleAddToReadlist("reading");
                    router.push(`/book/${book._id}/content`);
                  }}
                >
                  Read Now
                </button>

                <button
                  onClick={handleToggleLike}
                  style={{
                    fontSize: "1.5rem",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    marginLeft: "10px",
                  }}
                >
                  {liked ? "❤️" : "🤍"} {likes}
                </button>
              </div>
            </div>
          )}
        </div>

        {book.coverImage && (
          <div style={{ flexShrink: 0, width: "200px", marginLeft: "20px" }}>
            {/* Add Favourite button on top of the image */}
            <button
              onClick={handleToggleFavourite}
              style={{
                position: "absolute",
                top: "20px",
                right: "20px", // Adjusted position
                background: inFavourites ? "#ff4040" : "#00c851", // Green for Add, Red for Remove
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                padding: "10px",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              {inFavourites ? "Remove from Favourite" : "Add to Favourite"}
            </button>
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

      {/* Recommended Books Section */}

      {user?<RecommendedBooks categoryId={book.categoryId} currentBookId={book._id} />:""}
      
    </div>
  );
}
