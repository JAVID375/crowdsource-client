const express = require("express");
const multer = require("multer");
const path = require("path");
const router = express.Router();
const Complaint = require("../models/Complaint");

// ---- Multer setup ----
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // save files inside "server/uploads/"
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // unique file name
  },
});

const upload = multer({ storage: storage });

// ---- POST new complaint with file ----
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { location, reason, moreInfo, user } = req.body; // user = userId from frontend

    if (!user) return res.status(400).json({ error: "User ID is required" });

    const newComplaint = new Complaint({
      user, // link complaint to user
      location,
      reason,
      moreInfo,
      fileUrl: req.file ? `/uploads/${req.file.filename}` : null,
      status: "PENDING", // default status
    });

    await newComplaint.save();
    res.status(201).json({ message: "Complaint submitted successfully!", complaint: newComplaint });
  } catch (error) {
    console.error("Error saving complaint:", error);
    res.status(500).json({ error: "Failed to submit complaint" });
  }
});

// ---- GET all complaints ----
router.get("/", async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch complaints" });
  }
});

// ---- GET complaints for a specific user ----
router.get("/user/:userId", async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.params.userId }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    console.error("Error fetching user complaints:", err);
    res.status(500).json({ error: "Failed to fetch complaints" });
  }
});

// ---- PATCH: Update complaint status (Official action) ----
router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body; // status: "ACCEPTED", "SOLVED", "REJECTED"

    if (!["ACCEPTED", "SOLVED", "REJECTED"].includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const complaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true } // return updated document
    );

    if (!complaint) return res.status(404).json({ error: "Complaint not found" });

    res.json({ message: "Status updated successfully", complaint });
  } catch (err) {
    console.error("Error updating status:", err);
    res.status(500).json({ error: "Failed to update status" });
  }
});


module.exports = router;
