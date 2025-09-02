const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// JWT secret key (add this in .env for production)
const JWT_SECRET = process.env.JWT_SECRET || "mysecretkey";

// ---------------------
// REGISTER ROUTE
// ---------------------
router.post("/register", async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    const newUser = new User({
      name,
      email,
      phone,
      password: hashedPassword,
      role
    });

    await newUser.save();

    res.json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

// ---------------------
// LOGIN ROUTE (Citizen & Official)
// ---------------------
router.post("/login", async (req, res) => {
  try {
    const { email, password,role } = req.body;

    // Find user by email
    const user = await User.findOne({ email,role });
    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({ error: "Server error: " + err.message });
  }
});

module.exports = router;
