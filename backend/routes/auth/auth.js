// Inside your Register or Forgot Password route in backend/routes/auth.js
const express = require("express");
const router = express.Router(); // ✅ ADD THIS

const bcrypt = require("bcryptjs");
// ✅ Change these from ../ to ../../
const User = require("../../models/User"); 
const OTP = require("../../models/OTP");   
const sendEmail = require("../../utils/sendEmail");
// ... (your other imports)
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

  try {
    await sendEmail({
      email: email,
      subject: "YCCE Security: Your OTP Code",
      message: `Your verification code is ${otp}. It expires in 10 minutes.`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #eee;">
          <h2 style="color: #4f46e5;">YCCE Academic Portal</h2>
          <p>You requested a password reset. Use the code below:</p>
          <h1 style="background: #f3f4f6; padding: 10px; text-align: center; letter-spacing: 5px;">${otp}</h1>
          <p>If you didn't request this, please ignore this email.</p>
        </div>
      `,
    });

    // Save OTP to user in DB (temporarily)
    // ... logic to save to DB ...

    res.status(200).json({ message: "OTP sent to email!" });
  } catch (err) {
    res.status(500).json({ error: "Email could not be sent." });
  }
});

// backend/routes/auth.js

router.post("/send-otp", async (req, res) => {
  console.log("OTP Request received for:", req.body.email);
  const { email } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already registered" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Save/Update OTP
    await OTP.findOneAndUpdate({ email }, { otp }, { upsert: true, new: true });
    
    await sendEmail({
      email,
      subject: "Verify your YCCE Account",
      html: `<h1>Your Registration OTP is: ${otp}</h1>`
    });

    res.status(200).json({ message: "OTP sent to email" });
  } catch (err) {
    res.status(500).json({ message: "Error sending email" });
  }
});

// --- Final Registration ---
router.post("/verify-and-register", async (req, res) => {
  const { name, username, email, password, role, otp } = req.body;
  try {
    const validOtp = await OTP.findOne({ email, otp });
    if (!validOtp) return res.status(400).json({ message: "Invalid or expired OTP" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, username, email, password: hashedPassword, role });
    
    await newUser.save();
    await OTP.deleteMany({ email }); 

    res.status(201).json({ message: "User verified and created successfully!" });
  } catch (err) {
    res.status(500).json({ message: "Database Error" });
  }
});

// backend/routes/auth/auth.js

// ... (your existing send-otp and register routes)

const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Create a Token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || "your_default_secret", // Use an env variable!
      { expiresIn: "1d" } // Token lasts for 1 day
    );

    res.json({
      token, // Send the token to frontend
      id: user._id,
      role: user.role,
      username: user.username, // <--- MUST HAVE THIS
      // name: user.name
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router; // ✅ EXPORT THE ROUTER