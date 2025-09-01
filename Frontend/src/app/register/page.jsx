"use client";
import { useState, useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { getAllCategories } from "../../lib/categoryService";
import { useRouter } from "next/navigation";
import Joi from "joi";

export default function RegisterPage() {
  const { register } = useAuth();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [preference, setPreference] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRoleAuthenticate] = useState("");

  const [categories, setCategories] = useState([]);
  const [errors, setErrors] = useState({});

  const router = useRouter();

  const registerSchema = Joi.object({
    userName: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required()
      .messages({
        "string.empty": "Username is required",
        "string.min": "Username must be at least 3 characters",
        "string.max": "Username must be at most 30 characters",
      }),

    password: Joi.string()
      .pattern(
        new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?#&])[A-Za-z\\d@$!%*?#&]{8,}$")
      )
      .required()
      .messages({
        "string.pattern.base":
          "Password must be 8+ chars, include uppercase, lowercase, number & special character",
        "string.empty": "Password is required",
      }),

    preference: Joi.string().required().messages({
      "string.empty": "Preference is required",
    }),

    phone: Joi.string().required().messages({
      "string.empty": "Phone number is required",
    }),

    role: Joi.string().allow("").optional(),
  });

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
    const formData = { userName, password, preference, phone, role };

    const { error } = registerSchema.validate(formData, { abortEarly: false });

    if (error) {
      const validationErrors = {};
      error.details.forEach((err) => {
        validationErrors[err.path[0]] = err.message;
      });
      setErrors(validationErrors);
      return;
    }

    setErrors({}); // Clear errors if validation passes

    const ok = await register(formData);
    if (ok) {
      router.push("/login");
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
        {errors.userName && <p className="error-msg">{errors.userName}</p>}

        
        <input
          className="input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="error-msg">{errors.password}</p>}

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
        {errors.preference && <p className="error-msg">{errors.preference}</p>}

        <input
          className="input"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        {errors.phone && <p className="error-msg">{errors.phone}</p>}

        <input
          className="input"
          type="password"
          placeholder="Only enter this to register as admin"
          value={role}
          onChange={(e) => setRoleAuthenticate(e.target.value)}
        />
        {errors.role && <p className="error-msg">{errors.role}</p>}

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
