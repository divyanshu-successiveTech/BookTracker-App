"use client";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";
import { useState, useEffect, useRef } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Fetch books dynamically based on search term
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSearchResults([]);
      return;
    }

    const fetchBooks = async () => {
      try {
        const res = await fetch(`http://localhost:5000/bookByName/${searchTerm}`);
        const data = await res.json();
        if (data?.statuscode === 200 && data.data.length > 0) {
          setSearchResults(data.data);
        } else {
          setSearchResults([]);
        }
      } catch (err) {
        console.error("Error fetching books:", err);
        setSearchResults([]);
      }
    };

    const timeoutId = setTimeout(fetchBooks, 300);
    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  const handleSelectBook = () => {
    setShowDropdown(false);
    setSearchTerm("");
  };

  return (
    <nav
      className="nav"
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        borderBottom: "1px solid #ccc",
        backgroundColor: "#1e293b", // dark navbar
        color: "#fff",
        position: "relative"
      }}
    >
      {/* Left side: Logo + Home */}
      <div className="nav-left" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Link href="/">
          <img
            src="/Logo.jpg"
            alt="Logo"
            style={{ width: "40px", height: "40px", cursor: "pointer", borderRadius: "50%" }}
          />
        </Link>
        <Link
          href="/"
          className="brand"
          style={{ textDecoration: "none", fontWeight: "bold", fontSize: "20px", color: "#fff" }}
        >
          Home
        </Link>
      </div>

      {/* Middle: Search bar */}
      <div style={{ position: "relative", flex: 1, maxWidth: "400px", margin: "0 20px" }} ref={dropdownRef}>
        <input
          type="text"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowDropdown(true);
          }}
          style={{
            width: "100%",
            padding: "10px 14px",
            borderRadius: "999px",
            border: "none",
            outline: "none",
            boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
            fontSize: "14px"
          }}
        />
        {showDropdown && searchResults.length > 0 && (
          <ul
            style={{
              position: "absolute",
              top: "120%",
              left: 0,
              right: 0,
              background: "#fff",
              borderRadius: "10px",
              listStyle: "none",
              margin: 0,
              padding: "8px 0",
              maxHeight: "250px",
              overflowY: "auto",
              zIndex: 50,
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
            }}
          >
            {searchResults.map((book) => (
              <li key={book._id}>
                <Link
                  href={`/book/${book._id}`}
                  onClick={handleSelectBook}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    padding: "8px 12px",
                    textDecoration: "none",
                    color: "#1e293b",
                    transition: "background 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <img
                    src={book.coverImage}
                    alt={book.name}
                    style={{ width: "40px", height: "50px", objectFit: "cover", borderRadius: "5px" }}
                  />
                  <div>
                    <p style={{ margin: 0, fontWeight: "bold" }}>{book.name}</p>
                    <p style={{ margin: 0, fontSize: "12px", color: "#64748b" }}>{book.shortDescription}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Right side: User actions */}
      <div className="nav-right" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {user ? (
          <>
            {/* Favourite Button (only when logged in) */}
            <Link
              href="/favourites"
              style={{
                padding: "6px 12px",
                borderRadius: "5px",
                backgroundColor: "#3b82f6", // Blue button
                color: "#fff",
                textDecoration: "none"
              }}
            >
              Favourites
            </Link>

            {/* Admin link (only for admins) */}
            {user?.role === "admin" && (
              <Link
                href="/admin"
                style={{
                  padding: "6px 12px",
                  borderRadius: "5px",
                  backgroundColor: "#f59e0b", // amber
                  color: "#fff",
                  textDecoration: "none"
                }}
              >
                Admin Panel
              </Link>
            )}

            <Link
              href="/readlist"
              style={{
                padding: "6px 12px",
                borderRadius: "5px",
                backgroundColor: "#3b82f6",
                color: "#fff",
                textDecoration: "none"
              }}
            >
              Readlist
            </Link>
            <span style={{ fontWeight: "bold" }}>Hi, {user.userName}</span>
            <button
              onClick={logout}
              style={{
                padding: "6px 12px",
                borderRadius: "5px",
                backgroundColor: "#ef4444",
                color: "#fff",
                cursor: "pointer",
                border: "none"
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/login"
            style={{
              padding: "6px 12px",
              borderRadius: "5px",
              backgroundColor: "#3b82f6",
              color: "#fff",
              textDecoration: "none"
            }}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
