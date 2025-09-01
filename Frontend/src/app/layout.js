import "./globals.css";
import "../styles/components.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthProvider } from "../context/AuthContext";

export const metadata = {
  title: "Book App",
  description: "Simple Book Store frontend",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="page-body">
        
        <AuthProvider>
          <Navbar />
          <main className="main-content">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
