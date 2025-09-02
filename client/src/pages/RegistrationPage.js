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
    role: "", // default role
  });

  // handle change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle role change (from RoleSelector)
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
    const res = await axios.post("http://localhost:5000/api/auth/register", {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
      role: formData.role
    });

    alert(res.data.message); // Success message from backend
    console.log("✅ Registered user:", res.data);

    // Optionally clear form
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
     
    <div className="flex min-h-screen bg-blue-50 items-center justify-center">
      <div className="fixed top-0 left-0 w-full z-50">
      <Navbar />
</div>
      <div className="pt-20"> {/* Add padding to avoid overlap with navbar */}
      <div className="flex w-11/12 max-w-6xl bg-blue-50">
        
        {/* Left - Image */}
        <div className="flex-1 flex justify-center items-center p-6">
          <img
            src="/registrationpage.png"
            alt="Problem Reporting"
            className="w-3/4 max-w-lg h-auto rounded-xl shadow-md"
          />
        </div>
        {/* Right - Form */}

        <div className="flex-1 flex justify-center items-center p-6">
          <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
            <h2 className="text-2xl font-bold text-center mb-6">
              Register Here!🚦
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              

              {/* Input Fields */}
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="E-mail"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                required
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone No."
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none"
                required
              />
              {/* Role Selector */}
              <RoleSelector role={formData.role} setRole={handleRoleChange} />
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Register
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Register;
