import Link from "next/link";

export default function CategoryCard({ category }) {
  return (
    <div className="card">
      <h3 className="card-title">{category.categoryName}</h3>
      <Link className="btn" href={`/category/${category._id}`}>View Books</Link>
    </div>
  );
}
