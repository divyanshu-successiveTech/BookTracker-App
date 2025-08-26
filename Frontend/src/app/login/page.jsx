"use client";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const { login } = useAuth();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    
    const router = useRouter();
  async function handleLogin() {
    if (!userName || !password) {
      alert("Please enter username and password");
      return;
    }
    const ok = await login(userName, password);
    if (ok) {
      router.push("/");
    }
  }

  return (
  <div className="full-center">
    <div className="login-card">
      <h1>Login</h1>
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
      <button className="btn" onClick={handleLogin}>
        Login
      </button>
      <p>
        Don’t have an account?{" "}
        <a href="/register" style={{ color: "blue" }}>
          Register here
        </a>
      </p>
    </div>
  </div>
);

}
