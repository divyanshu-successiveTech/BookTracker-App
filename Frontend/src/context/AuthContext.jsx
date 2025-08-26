"use client";
import { createContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../lib/userService";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // { userName, token }
  const [token, setToken] = useState("");

  // Load auth state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("auth");
    if (saved) {
      const obj = JSON.parse(saved);
      setUser(obj.user || null);
      setToken(obj.token || "");
    }
  }, []);

  // Save auth state to localStorage
  function saveAuth(u, t) {
    setUser(u);
    setToken(t);
    localStorage.setItem("auth", JSON.stringify({ user: u, token: t }));
  }

  async function login(userName, password) {
  try {
    const res = await loginUser({ userName, password });

    // res is already unwrapped → { message, token, user }
    const token = res?.token;
    const userObj = res?.user;

    if (!token) {
      alert(res?.message || "Login failed");
      return false;
    }

    saveAuth(userObj, token);
    return true;
  } catch (e) {
    console.error("Login error:", e);
    alert("Login error");
    return false;
  }
}


  // Register
  async function register({ userName, password, preference, phone }) {
    try {
      const res = await registerUser({ userName, password, preference, phone });

      // unwrap returns { message, result }
      if (res?.result) {
        console.log("Registration successful", res.result);
        return true; // registration succeeded
      } else {
        console.error("Registration failed:", res);
        return false;
      }
    } catch (e) {
      console.error("Registration error:", e);
      return false;
    }
  }


  // Logout
  function logout() {
    setUser(null);
    setToken("");
    localStorage.removeItem("auth");
    window.location.href = "/";
  }

  const value = { user, token, login, register, logout };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
