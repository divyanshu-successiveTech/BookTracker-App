export default function Footer() {
  return (
    <footer className="footer" 
      style={{ backgroundColor: "#f0f0f0"}}
    >
      <p>Book App © {new Date().getFullYear()}</p>
    </footer>
  );
}
