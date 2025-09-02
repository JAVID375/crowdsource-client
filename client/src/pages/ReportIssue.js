// src/pages/ReportIssue.js
import React, { useState } from "react";
import NavbarDashboard from "../components/NavbarDashboard";
import Footer from "../components/Footer";

const ReportIssue = () => {
  const [formData, setFormData] = useState({
    location: "",
    reason: "",
    moreInfo: "",
    file: null,
    agreement: false,
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreement) {
      alert("You must agree to the terms before submitting.");
      return;
    }

    // Get logged-in userId from localStorage
    const userId = localStorage.getItem("userId");
    if (!userId) {
      alert("You must be logged in to submit a complaint.");
      return;
    }

    const submissionData = new FormData();
    submissionData.append("location", formData.location);
    submissionData.append("reason", formData.reason);
    submissionData.append("moreInfo", formData.moreInfo);
    if (formData.file) submissionData.append("file", formData.file);
    submissionData.append("user", userId); // link complaint to user

    try {
      const response = await fetch("http://localhost:5000/api/complaints", {
        method: "POST",
        body: submissionData, // browser sets multipart/form-data automatically
      });

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        // Reset form
        setFormData({
          location: "",
          reason: "",
          moreInfo: "",
          file: null,
          agreement: false,
        });
      } else {
        alert("Error: " + data.error);
      }
    } catch (error) {
      console.error("Error submitting complaint:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-r from-blue-50 to-cyan-50">
      {/* Navbar fixed at top */}
      <div className="fixed top-0 left-0 w-full z-50">
        <NavbarDashboard />
      </div>

      {/* Main Content */}
      <main className="flex-grow flex justify-center items-start p-6 mt-24">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-2xl p-8">
          <h2 className="text-2xl font-bold mb-6 text-left">Report a Complaint</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* File Upload */}
            <label className="w-full h-40 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400">
              <span className="text-gray-500 flex flex-col items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 mb-2 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 7h4l3-3h4l3 3h4v12H3V7z"
                  />
                </svg>
                {formData.file ? (
                  <p className="font-semibold text-green-600">{formData.file.name} ✅ Selected</p>
                ) : (
                  <>
                    Upload a picture/video of incident
                    <p className="text-sm text-gray-400">(Make sure everything is clear)</p>
                  </>
                )}
              </span>
              <input
                type="file"
                name="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={handleChange}
              />
            </label>

            {/* Location */}
            <select
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full border p-3 rounded-lg"
            >
              <option value="">Location *</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Chennai">Chennai</option>
            </select>

            {/* Reason */}
            <div>
              <p className="font-semibold mb-2">Reason:</p>
              <div className="space-y-2">
                {[
                  "Street Lights Not Working",
                  "Garbage Accumulation on Roads",
                  "Water Logging On Roads",
                  "Traffic Light Not Working",
                  "Potholes in Roads",
                  "Roads Not Cleaned",
                  "Neighbourhood Issues",
                  "Others",
                ].map((reason, index) => (
                  <label key={index} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="reason"
                      value={reason}
                      checked={formData.reason === reason}
                      onChange={handleChange}
                      required
                    />
                    <span>{reason}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* More Info */}
            <textarea
              name="moreInfo"
              value={formData.moreInfo}
              onChange={handleChange}
              placeholder="Provide more information about the incident"
              className="w-full border p-3 rounded-lg h-28"
            />

            {/* Agreement */}
            <label className="flex items-start space-x-2">
              <input
                type="checkbox"
                name="agreement"
                checked={formData.agreement}
                onChange={handleChange}
                required
              />
              <span className="text-sm text-gray-600">
                By clicking this checkbox, I understand that reporting fake complaints against anyone will lead to legal actions against me. *
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ReportIssue;
