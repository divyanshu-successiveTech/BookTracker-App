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
        {/* Background video */}
        {/* <video autoPlay muted loop playsInline className="background-video">
          <source src="/bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}

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
