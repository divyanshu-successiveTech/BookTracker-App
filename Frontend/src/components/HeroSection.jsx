"use client";
import { useEffect, useState } from "react";
import "./HeroSection.css";

const images = [
  {
    url: "https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=1600&q=80",
    caption: "Find Your Next Favorite Book",
  },
  {
    url: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=1600&q=80",
    caption: "Escape Into Worlds of Imagination",
  },
  {
    url: "https://images.unsplash.com/photo-1553729784-e91953dec042?auto=format&fit=crop&w=1600&q=80",
    caption: "Discover Stories That Matter",
  },
  {
    url: "https://images.unsplash.com/photo-1495446815901-a7297e633e8d?auto=format&fit=crop&w=1600&q=80",
    caption: "Fuel Your Passion for Reading",
  },
];

export default function HeroSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="hero">
      
      <div
        className="hero-bg"
        style={{
          backgroundImage: `url(${images[currentIndex].url})`,
        }}
      />

      <div className="hero-overlay">
        <h1>{images[currentIndex].caption}</h1>
        <p>Your cozy corner for every book lover</p>
        <a href="#books" className="hero-btn">Browse Books</a>
      </div>

      <div className="hero-dots">
        {images.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(i)}
          ></span>
        ))}
      </div>
    </section>
  );
}
