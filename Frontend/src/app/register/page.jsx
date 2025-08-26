"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getAllCategories } from "../../lib/categoryService";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const { register } = useAuth();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [preference, setPreference] = useState("");
  const [phone, setPhone] = useState("");
  const [categories, setCategories] = useState([]);
  
  const router = useRouter();

  useEffect(() => {
    async function fetchCategories() {
      try {
        getAllCategories().then(setCategories);
      } catch (e) {
        console.error("Failed to fetch categories", e);
      }
    }
    fetchCategories();
  }, []);

  async function handleRegister() {
    if (!userName || !password || !preference || !phone) {
      alert("Please fill all fields");
      return;
    }

    const ok = await register({ userName, password, preference, phone });

    if (ok) {
      router.push("/login"); // navigate after successful registration
    } else {
      alert("Registration failed, please try again.");
    }
  }

  return (
    <div className="full-center">
      <div className="login-card">
        <h1>Register</h1>

        <input
          className="input"
          placeholder="Username"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />

        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select
          className="input"
          value={preference}
          onChange={(e) => setPreference(e.target.value)}
        >
          <option value="">-- Select Preference --</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.categoryName}
            </option>
          ))}
        </select>

        <input
          className="input"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <button className="btn" onClick={handleRegister}>
          Register
        </button>

        <p style={{ marginTop: "10px" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "blue" }}>
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
