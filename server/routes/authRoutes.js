const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
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
//-------------
// --------------------- Forgot Password Route




router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // ✅ Generate token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
   console.log("Generated Reset URL:", resetUrl); // Debugging log
    // ✅ Hash token (security)
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    // ✅ Save in DB
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 min

    await user.save();
   // writing node mailer code here to send email to user with resetUrl


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const message = `
  <h3>Password Reset Request</h3>
  <p>Click the link below to reset your password:</p>
  <a href="${resetUrl}">${resetUrl}</a>
`;

await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: user.email,
  subject: "Password Reset",
  html: message
});
  

   res.status(200).json({ message: "Reset link sent to your email" });

  } catch (err) {
    
  console.log("FULL ERROR:", err); 
 

    res.status(500).json({ error: "Server error: " + err.message });
  }
});

// --------------------- Reset Password Route
router.post("/reset-password/:token", async (req, res) => {
  try {
    const crypto = require("crypto");

    // 1️⃣ Hash the token from URL
    const hashedToken = crypto
      .createHash("sha256")
      .update(req.params.token)
      .digest("hex");

    // 2️⃣ Find user with valid token
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token"
      });
    }

    // 3️⃣ Hash new password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    // 4️⃣ Clear reset fields
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    // 5️⃣ Save user
    await user.save();

    res.json({
      message: "Password reset successful"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
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
