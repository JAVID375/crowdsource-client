import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "../components/Footer";
import NavbarPublic from "../components/NavbarPublic";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("❌ Please enter your email");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
  `${process.env.REACT_APP_API_URL}/api/auth/forgot-password`,
  {
    email,
  }
);

      toast.success("✅ Reset link sent to your email");
      setEmail("");
    } catch (err) {
      console.error(err);
      toast.error("❌ Failed to send reset link");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <NavbarPublic />
      </div>

      {/* Toast Notifications */}
      <ToastContainer
        position="bottom-center"
        autoClose={4000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        theme="light"
      />

      {/* Main Content */}
      <div className="flex flex-grow items-center justify-center pt-40 pb-10 px-4">
        <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-lg">
          
          <h2 className="text-2xl font-bold text-center mb-4">
            Forgot Password
          </h2>

          <p className="text-gray-600 text-sm text-center mb-6">
            Enter your registered email to receive a reset link
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              type="submit"
              disabled={loading}
              className={`w-full p-3 rounded-lg text-white font-semibold transition ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>
          </form>
              
         
        </div>
      </div>
              <p className="text-center text-sm mt-4">
  Remember your password?{" "}
  <Link to="/" className="text-blue-600 hover:underline">
    Login here
  </Link>
</p>
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ForgotPassword;