import Link from "next/link";

export default function AuthorCard({ author }) {
  return (
    <div className="card">
      <h3 className="card-title">{author.authorName}</h3>
      <Link className="btn" href={`/author/${author._id}`}>View Books</Link>
    </div>
  );
}
