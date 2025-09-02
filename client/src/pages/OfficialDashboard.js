// src/pages/OfficialDashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import NavbarDashboardofficial from "../components/NavbarDashboardofficial";
import Footer from "../components/Footer";

const OfficialDashboard = () => {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedComplaint, setSelectedComplaint] = useState(null);

  // Fetch complaints
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/complaints");
        setComplaints(res.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  // Status badge display
  const getStatusBadge = (status) => {
    if (status === "REJECTED") {
      return (
        <span className="bg-red-600 text-white px-4 py-1 rounded-full text-xs font-semibold">
          {status}
        </span>
      );
    } else if (status === "SOLVED") {
      return (
        <span className="bg-green-600 text-white px-4 py-1 rounded-full text-xs font-semibold">
          {status}
        </span>
      );
    } else if (status === "ACCEPTED") {
      return (
        <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-semibold">
          {status}
        </span>
      );
    }
    return (
      <span className="bg-gray-400 text-white px-4 py-1 rounded-full text-xs font-semibold">
        {status}
      </span>
    );
  };

  // Update complaint status
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:5000/api/complaints/${id}/status`, {
        status: newStatus,
      });

      // Update local state
      setComplaints((prev) =>
        prev.map((c) => (c._id === id ? { ...c, status: newStatus } : c))
      );

      alert(`Complaint marked as ${newStatus}`);
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status");
    }
  };

  return (
    <div className="bg-gradient-to-r from-white to-cyan-100 min-h-screen flex flex-col">
      {/* Navbar fixed at top */}
      <div className="fixed top-0 left-0 w-full z-50">
        <NavbarDashboardofficial />
      </div>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 pt-24">
        <h1 className="text-2xl font-bold mb-6">Official Dashboard</h1>

        {loading ? (
          <p className="text-gray-600">Loading complaints...</p>
        ) : (
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full text-sm text-left text-gray-600">
              <thead className="bg-gray-100 text-gray-700 text-sm uppercase font-semibold">
                <tr>
                  <th className="px-6 py-3">Complaint Reason</th>
                  <th className="px-6 py-3">Reported By</th>
                  <th className="px-6 py-3">Reported Location</th>
                  <th className="px-6 py-3">Reported Date & Time</th>
                  <th className="px-6 py-3">Status / Actions</th>
                </tr>
              </thead>
              <tbody>
                {complaints.length > 0 ? (
                  complaints.map((c, idx) => (
                    <tr
                      key={c._id || idx}
                      className={`border-b hover:bg-gray-50 ${
                        idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                      }`}
                    >
                      <td
                        className="px-6 py-4 text-blue-600 cursor-pointer hover:underline"
                        onClick={() => setSelectedComplaint(c)}
                      >
                        {c.reason}
                      </td>
                      <td className="px-6 py-4">{c.reportedBy || c.user}</td>
                      <td className="px-6 py-4">{c.location}</td>
                      <td className="px-6 py-4">
                        {new Date(c.createdAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        {c.status === "PENDING" ? (
                          <div className="flex space-x-2">
                            <button
                              onClick={() =>
                                handleStatusUpdate(c._id, "ACCEPTED")
                              }
                              className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                            >
                              Accept
                            </button>
                            <button
                              onClick={() =>
                                handleStatusUpdate(c._id, "REJECTED")
                              }
                              className="bg-red-600 text-white px-2 py-1 rounded text-xs"
                            >
                              Reject
                            </button>
                          </div>
                        ) : c.status === "ACCEPTED" ? (
                          <div className="flex space-x-2">
                            <button
                              onClick={() =>
                                handleStatusUpdate(c._id, "SOLVED")
                              }
                              className="bg-green-600 text-white px-2 py-1 rounded text-xs"
                            >
                              Mark as Solved
                            </button>
                            <button
                              onClick={() =>
                                handleStatusUpdate(c._id, "REJECTED")
                              }
                              className="bg-red-600 text-white px-2 py-1 rounded text-xs"
                            >
                              Reject
                            </button>
                          </div>
                        ) : (
                          getStatusBadge(c.status)
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-4 text-center text-gray-500 font-bold"
                    >
                      No complaints found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Footer row inside table */}
            <div className="flex items-center justify-between p-3 text-sm text-gray-600">
              <span>{complaints.length} rows</span>
              <div className="flex items-center space-x-2">
                <span>Rows per page:</span>
                <select className="border rounded px-2 py-1 text-gray-700">
                  <option>10</option>
                  <option>25</option>
                  <option>50</option>
                </select>
                <span>
                  1-{complaints.length} of {complaints.length}
                </span>
                <button className="px-2">&lt;</button>
                <button className="px-2">&gt;</button>
              </div>
            </div>
          </div>
        )}
      </main>
        
      {/* Complaint Details Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/2 p-6 relative overflow-y-auto max-h-[90vh]">
            {/* Close button */}
            <button
              className="absolute top-2 right-2 text-gray-800 hover:text-black "
              onClick={() => setSelectedComplaint(null)}
            >
              ✕
            </button>
             <br></br>
            {/* Status */}
             <div className="flex justify-between items-center mb-4">
  <h2 className="text-xl  font-bold ">Complaint Details</h2>
  <div>
    {getStatusBadge(selectedComplaint.status)}
  </div>
</div>
            <p className="text-gray-600">
              📍 {selectedComplaint.location}
            </p>
            <p className="text-gray-600">
              🕒 {new Date(selectedComplaint.createdAt).toLocaleString()}
            </p>
            <h3 className="mt-1 text-lg font-semibold">
              {selectedComplaint.reason}
            </h3>
             <p className="text-gray-700 mb-4">{selectedComplaint.moreInfo}</p>
             <center>
           <img
  src={`http://localhost:5000${selectedComplaint.fileUrl}`}
  alt="Complaint evidence"
  style={{ width: '500px', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
/>
<div className="border-t border-gray-700 mt-4 pt-2 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} CrowdSource App. All rights reserved.
      </div>
      </center>
          </div>
        </div>
      )}

      {/* Footer always at bottom */}
      <footer className="mt-6">
        <Footer />
      </footer>
    </div>
  );
};

export default OfficialDashboard;
