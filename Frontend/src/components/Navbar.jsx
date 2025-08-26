"use client";
import Link from "next/link";
import { useAuth } from "../hooks/useAuth";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav
          className="nav"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 20px",
            borderBottom: "1px solid #ccc",
            backgroundColor: "#f0f0f0", // light grey
          }}
    >      
      {/* Left side: Logo + Home */}
      <div className="nav-left" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Link href="/">
          <img 
            src="/Logo.jpg" // Replace with your image path
            alt="Logo" 
            style={{ width: "40px", height: "40px", cursor: "pointer", borderRadius: "50%" }} 
          />
        </Link>
        <Link href="/" className="brand" style={{ textDecoration: "none", fontWeight: "bold", fontSize: "20px", color: "#333" }}>
          Home
        </Link>
      </div>

      {/* Right side: User actions */}
      <div className="nav-right" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {user ? (
          <>
            <Link href="/readlist" className="btn-secondary" style={{ padding: "6px 12px", border: "1px solid #007bff", borderRadius: "5px", backgroundColor: "#007bff", color: "#fff", textDecoration: "none" }}>
              Show Readlist
            </Link>
            <span className="user" style={{ fontWeight: "bold" }}>Hi, {user.userName}</span>
            <button
              className="btn-secondary"
              onClick={logout}
              style={{ padding: "6px 12px", border: "1px solid #007bff", borderRadius: "5px", backgroundColor: "#007bff", color: "#fff", cursor: "pointer" }}
            >
              Logout
            </button>
          </>
        ) : (
          <Link 
            href="/login" 
            className="btn"
            style={{ padding: "6px 12px", border: "1px solid #007bff", borderRadius: "5px", backgroundColor: "#007bff", color: "#fff", textDecoration: "none" }}
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
