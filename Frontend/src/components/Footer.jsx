export default function Footer() {
  return (
    <footer className="footer" 
      style={{backgroundColor: "#1e293b",}}
    >
      <p style={{ textDecoration: "none", fontWeight: "bold", fontSize: "20px", color: "#fff" }}>Book App © {new Date().getFullYear()}</p>
    </footer>
  );
}
