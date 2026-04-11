import React, { useState } from "react";
import RoleSelector from "../components/RoleSelector";
import Navbar from "../components/Navbar";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    role: "",
  });

  // handle change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle role change
  const handleRoleChange = (role) => {
    setFormData({ ...formData, role });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/register`,
        {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          role: formData.role,
        }
      );

      alert(res.data.message);
      console.log("✅ Registered user:", res.data);

      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        role: "",
      });
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </div>

      {/* Page Content */}
      <div className="pt-24 sm:pt-28 px-4 sm:px-6 lg:px-8 pb-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Section */}
            <div className="hidden lg:flex flex-col justify-center">
              <div className="max-w-xl">
                <span className="inline-block px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-5">
                  Smart Civic Complaint Platform
                </span>

                <h1 className="text-4xl xl:text-5xl font-bold text-slate-800 leading-tight mb-5">
                  Build a better city with{" "}
                  <span className="text-blue-600">CityAid</span>
                </h1>

                <p className="text-lg text-slate-600 leading-8 mb-8">
                  Join a modern platform where citizens can report local issues,
                  track complaint progress, and help authorities respond faster
                  with transparency and accountability.
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
                    <div className="text-2xl mb-2">📍</div>
                    <h3 className="text-base font-semibold text-slate-800 mb-1">
                      Easy Reporting
                    </h3>
                    <p className="text-sm text-slate-600">
                      Submit complaints with location, details, and supporting images.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
                    <div className="text-2xl mb-2">📊</div>
                    <h3 className="text-base font-semibold text-slate-800 mb-1">
                      Track Progress
                    </h3>
                    <p className="text-sm text-slate-600">
                      Stay updated with real-time complaint status changes.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
                    <div className="text-2xl mb-2">🤝</div>
                    <h3 className="text-base font-semibold text-slate-800 mb-1">
                      Citizen Collaboration
                    </h3>
                    <p className="text-sm text-slate-600">
                      Encourage responsible participation for a cleaner community.
                    </p>
                  </div>

                  <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
                    <div className="text-2xl mb-2">⚡</div>
                    <h3 className="text-base font-semibold text-slate-800 mb-1">
                      Faster Resolution
                    </h3>
                    <p className="text-sm text-slate-600">
                      Help officials identify, manage, and resolve problems efficiently.
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-6 text-white shadow-xl">
                  <div className="flex items-center gap-4">
                    <img
                      src="/registrationpage.png"
                      alt="Problem Reporting"
                      className="w-24 h-24 object-contain rounded-2xl bg-white/10 p-2"
                    />
                    <div>
                      <h3 className="text-xl font-semibold mb-1">
                        Smarter civic engagement starts here
                      </h3>
                      <p className="text-sm text-blue-100 leading-6">
                        Register now and become part of a system that makes issue
                        reporting simple, organized, and transparent.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

           {/* Right Section */}
<div className="flex justify-center">
  <div className="w-full max-w-lg">
    
    {/* Mobile Hero Section */}
    <div className="lg:hidden relative overflow-hidden rounded-[28px] bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-500 p-5 sm:p-6 mb-5 shadow-xl">
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
      <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-white/10 rounded-full blur-2xl"></div>

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1">
            <p className="inline-block text-[11px] font-semibold tracking-wide uppercase bg-white/15 text-white px-3 py-1 rounded-full mb-3">
              Smart Civic Platform
            </p>
            <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
              Join <span className="text-cyan-100">CityAid</span>
            </h1>
            <p className="text-sm text-blue-100 mt-2 leading-6">
              Register to report local issues, track updates, and contribute to a better city experience.
            </p>
          </div>

          <div className="shrink-0">
            <img
              src="/registrationpage.png"
              alt="Problem Reporting"
              className="w-20 h-20 sm:w-24 sm:h-24 object-contain drop-shadow-lg"
            />
          </div>
        </div>

        {/* Mobile trust/features pills */}
        <div className="flex flex-wrap gap-2 mt-4">
          <span className="text-xs bg-white/15 text-white px-3 py-1.5 rounded-full">
            Easy Reporting
          </span>
          <span className="text-xs bg-white/15 text-white px-3 py-1.5 rounded-full">
            Track Status
          </span>
          <span className="text-xs bg-white/15 text-white px-3 py-1.5 rounded-full">
            Fast Updates
          </span>
        </div>
      </div>
    </div>

    {/* Form Card */}
    <div className="relative bg-white/95 backdrop-blur-sm border border-slate-200 shadow-[0_20px_60px_rgba(15,23,42,0.08)] rounded-[28px] p-5 sm:p-7 md:p-8">
      <div className="mb-6">
        <div className="flex items-center justify-between gap-3 mb-3">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800">
              Create Account
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-1">
              Get started with your civic access
            </p>
          </div>

          <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-2xl bg-blue-50 text-2xl">
            🚦
          </div>
        </div>

        {/* small divider */}
        <div className="h-1 w-16 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 gap-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-700 placeholder:text-slate-400 transition"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="E-mail Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-700 placeholder:text-slate-400 transition"
            required
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-700 placeholder:text-slate-400 transition"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-700 placeholder:text-slate-400 transition"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3.5 rounded-2xl border border-slate-200 bg-slate-50/80 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-slate-700 placeholder:text-slate-400 transition"
            required
          />
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
          <div className="flex items-center justify-between gap-2 mb-3">
            <p className="text-sm font-semibold text-slate-700">
              Select your role
            </p>
            <span className="text-[11px] text-slate-400 uppercase tracking-wide">
              Required
            </span>
          </div>
          <RoleSelector role={formData.role} setRole={handleRoleChange} />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-3.5 rounded-2xl transition duration-300 shadow-lg shadow-blue-200"
        >
          Create My Account
        </button>
      </form>

      <div className="mt-5 rounded-2xl bg-slate-50 border border-slate-200 p-4">
        <p className="text-xs sm:text-sm text-slate-500 leading-6 text-center">
          Join CityAid and become part of a smarter, faster, and more transparent issue reporting system for your community.
        </p>
      </div>
    </div>

    {/* Mobile bottom mini cards */}
    <div className="lg:hidden grid grid-cols-2 gap-3 mt-5">
      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
        <div className="text-lg mb-2">📍</div>
        <h3 className="font-semibold text-slate-800 text-sm mb-1">
          Report Quickly
        </h3>
        <p className="text-xs text-slate-500 leading-5">
          Submit issues with a simple process.
        </p>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm">
        <div className="text-lg mb-2">📊</div>
        <h3 className="font-semibold text-slate-800 text-sm mb-1">
          Stay Updated
        </h3>
        <p className="text-xs text-slate-500 leading-5">
          Track complaint progress in real time.
        </p>
      </div>
    </div>

  </div>
</div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;