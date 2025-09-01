import Link from "next/link";

export default function BookCard({ book, authorName, categoryName }) {
  const customDesc=book.shortDescription.substring(0,63)+"...";
  return (
    <div className="card">
      {book.coverImage ? (
        <img src={book.coverImage} alt={book.name} className="cover" />
      ) : null}

      <h3 className="card-title">{book.name}</h3>
      <p className="muted">Author: {authorName || book.authorId}</p>
      <p className="muted">Category: {categoryName || book.categoryId}</p>

      <p className="desc">{customDesc}</p>

      <Link className="btn" href={`/book/${book._id}`}>Read More</Link>
    </div>
  );
}
