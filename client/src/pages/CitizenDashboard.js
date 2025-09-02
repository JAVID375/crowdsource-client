import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NavbarDashboard from "../components/NavbarDashboard";
import Footer from "../components/Footer";

const CitizenDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch complaints for logged-in user
  useEffect(() => {
    const fetchComplaints = async () => {
      setLoading(true);
      try {
        const userId = localStorage.getItem("userId");
        const res = await axios.get(
          `http://localhost:5000/api/complaints/user/${userId}`
        );
        setComplaints(res.data);
      } catch (err) {
        console.error(err);
        toast.error("❌ Failed to fetch complaints");
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50">
      {/* Navbar fixed at top */}
      <div className="fixed top-0 left-0 w-full z-50">
        <NavbarDashboard />
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

      {/* Complaints List */}
      <div className="mt-24 w-full max-w-3xl bg-white p-6 rounded-2xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">
          Complaints Reported By You
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : complaints.length === 0 ? (
          <p className="text-center text-gray-500">No complaints reported yet.</p>
        ) : (
          <div className="space-y-4">
            {complaints.map((complaint) => (
              <div
                key={complaint._id}
                className="border rounded-lg p-4 shadow-sm bg-gradient-to-r from-blue-50 to-cyan-50"
              >
                <div className="flex justify-between items-center mb-2">
                  <p className="text-sm text-gray-600">
                    Reported Date:{" "}
                    {new Date(complaint.createdAt).toLocaleDateString()}
                  </p>
                  <p
                    className="text-blue-600 hover:underline text-sm font-medium cursor-pointer"
                    onClick={() => {
                      setSelectedComplaint(complaint);
                      setIsModalOpen(true);
                    }}
                  >
                    Detailed View
                  </p>
                </div>
                <p className="font-semibold">{complaint.reason}</p>
                <p className="text-sm text-gray-600">📍 {complaint.location}</p>
                <p
                  className={`mt-2 font-semibold ${
                    complaint.status === "PENDING"
                      ? "text-yellow-600"
                      : complaint.status === "SOLVED"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}
                >
                  Status: {complaint.status}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Detailed View Modal */}
      {isModalOpen && selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-lg w-full relative shadow-lg">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 font-bold"
              onClick={() => setIsModalOpen(false)}
            >
              X
            </button>
            <p
              className={`mt-4 font-semibold ${
                selectedComplaint.status === "PENDING"
                  ? "text-yellow-600"
                  : selectedComplaint.status === "SOLVED"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              Status: {selectedComplaint.status}
            </p>
            <h2 className="text-xl font-bold mb-4">{selectedComplaint.reason}</h2>
            <p className="text-sm text-gray-600 mb-2">📍 {selectedComplaint.location}</p>
            <p className="text-sm text-gray-600 mb-4">
              Reported On: {new Date(selectedComplaint.createdAt).toLocaleDateString()}
            </p>
            <p className="mb-4">{selectedComplaint.moreInfo}</p>
            <center>
            {selectedComplaint.fileUrl && (
              <img
  src={`http://localhost:5000${selectedComplaint.fileUrl}`}
  alt="Complaint evidence"
  style={{ width: '500px', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
/>

            )}
            <div className="border-t border-gray-700 mt-10 pt-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} CrowdSource App. All rights reserved.
      </div>
            </center>
          </div>
        </div>
      )}

      {/* Example Images Section */}
      <div className="mt-10 w-full max-w-4xl">
        <h3 className="text-xl font-semibold mb-4 text-center">
          Types of Issues You Can Report
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {/* Replace image src with actual issue-related images */}
          {[
            { src: "/roaddamage.jpeg", label: "Road Damage" },
            { src: "/trafficissue.jpeg", label: "Traffic Signal Issue" },
            { src: "/garbage.jpg", label: "Garbage on Roads" },
            { src: "/illegalparking.jpg", label: "Illegal Parking" },
            { src: "/streetlight.jpeg", label: "Streetlight Not Working" },
            { src: "/waterleak.webp", label: "Other Issues" },
          ].map((item, index) => (
            <a key={index} href="/report-issue">
              <div className="bg-white shadow rounded-lg overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-lg">
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full h-40 object-cover transition duration-300 hover:opacity-90"
                />
                <p className="p-2 text-center text-sm font-medium transition-colors duration-300 hover:text-blue-600">
                  {item.label}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CitizenDashboard;
