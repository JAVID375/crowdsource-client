// server/models/Complaint.js
const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // <-- add this
  location: { type: String, required: true },
  reason: { type: String, required: true },
  moreInfo: { type: String },
  fileUrl: { type: String }, // store file path / link later
  status: { type: String, enum: ["PENDING", "ACCEPTED", "SOLVED", "REJECTED"], default: "PENDING" }, // optional: track status
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Complaint", complaintSchema);
