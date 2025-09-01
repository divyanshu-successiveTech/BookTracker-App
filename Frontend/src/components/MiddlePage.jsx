import React from "react";
import "./MiddlePage.css";

const cardData = [
  {
    title: "Books Are Windows",
    quote: "“Books are a uniquely portable magic.”",
    author: "— Stephen King",
    content:
      "Books let us travel through time, space, and imagination. They are windows into the minds of others and the worlds they create.",
  },
  {
    title: "Power of Reading",
    quote: "“A reader lives a thousand lives before he dies.”",
    author: "— George R.R. Martin",
    content:
      "Reading is the key to understanding people, cultures, and ideas. A good book can change the way you see the world.",
  },
  {
    title: "Fuel for the Mind",
    quote: "“Until I feared I would lose it, I never loved to read. One does not love breathing.”",
    author: "— Harper Lee",
    content:
      "Books nourish our minds just like food nourishes our bodies. Reading is essential to growth, empathy, and critical thinking.",
  },
];

export default function MiddlePage() {
  return (
    <div className="middle-page-container">
      <h2 className="middle-page-title">Why Books Matter</h2>
      <div className="quote-card-grid">
        {cardData.map((card, idx) => (
          <div key={idx} className="quote-card">
            <h3>{card.title}</h3>
            <p className="quote">"{card.quote}"</p>
            <p className="author">{card.author}</p>
            <p className="content">{card.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
