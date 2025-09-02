// src/pages/CitizenLogin.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const CitizenLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // For error messages

  const handleSubmit = async (e) => {
  e.preventDefault();
  setError(""); // reset error

  try {
    const res = await axios.post("http://localhost:5000/api/auth/login", {
      email,
      password,
      role: "citizen"
    });

    // Save JWT token in localStorage
    localStorage.setItem("token", res.data.token);       // JWT token
    localStorage.setItem("role", res.data.user.role);    // user role
    localStorage.setItem("userId", res.data.user.id);   // <-- ADD THIS

    // Redirect based on role
    if (res.data.user.role === "citizen") {
      navigate("/citizen-dashboard");
    } else if (res.data.user.role === "official") {
      navigate("/official-dashboard");
    }
  } catch (err) {
    console.error(err);
    setError(err.response?.data?.error || "Login failed");
  }
};


  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: "url('/citizenlogin.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="bg-white bg-opacity-20 shadow-lg rounded-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Citizen Login
        </h2>

        {error && (
          <p className="text-red-500 text-center mb-4 font-medium">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-white font-medium mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-white font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
              placeholder="Enter your password"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>
        </form>

        <Link to="/">
          <p className="text-center text-white text-sm mt-4">
            Don’t have an account?{" "}
            <span className="text-black font-medium hover:underline">
              Register here
            </span>
          </p>
        </Link>
      </div>
    </div>
  );
};

export default CitizenLogin;
