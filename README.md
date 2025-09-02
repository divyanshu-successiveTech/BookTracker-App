# 📚 BookTracker-App

A simple Book Library Application where users can explore books, filter by author or category, and read details. Authentication is handled via JWT Auth, and book data is served by a Node.js + Express + MongoDB backend.

## 🔹 Tech Stack

- **Frontend:** Next.js (App Router), React, Tailwind CSS
- **Backend:** Node.js, Express.js, GraphQL
- **Database:** MongoDB
- **Auth:** JWT Authentication

## ✨ Features

### 🏠 Landing Page (/)

- **Navbar:**
  - Left: Home link
  - Right: Login/Logout (depending on auth state)
- List/grid of all books (GET /books).
- Each book card shows:
  - Title
  - Author
  - Category

### 🔍 Book Filters

- Dropdowns for Filter by Author (GET /authors) and Filter by Category (GET /categories).
- Selecting a filter fetches filtered books (/books?author=XYZ or /books?category=XYZ).

### 📖 Book Detail Page (/books/[id])

- Shows selected book details (GET /books/:id).
- If user not logged in → message: "Please log in to read this book."
- If user logged in → show full book details & content.
- Recommended section shows other books from the same category.

### 👤 Authentication

- Firebase Authentication (Email/Password + Google Sign-In).
- User session handled via Firebase context.
- Book detail content protected for logged-in users only.

## 🚀 Getting Started

### 1. Prerequisites

Make sure you have installed:

- Node.js (v16+)
- npm or yarn
- MongoDB (local or Atlas cloud)
- JWT Project for authentication

### 2. Installation

Clone Repository

```bash
git clone https://github.com/divyanshu-successiveTech/BookTracker-App.git
cd book-library
```

Install Backend

```bash
cd backend
npm install
```

Install Frontend

```bash
cd frontend
npm install
```

### ⚙️ Configuration

Backend (/backend/.env)

```env
JWT_SECRET="YOUR SECRET KEY"
```


### 🏃 Running the Application

Start Backend

```bash
cd Backend
npm run dev
```

Backend runs at: http://localhost:5000

GraphQL Playground: http://localhost:5000/graphql

Start Frontend

```bash
cd Frontend
npm run dev
```

Frontend runs at: http://localhost:3000


---
