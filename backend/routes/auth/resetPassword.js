const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../../models/User"); // Using your main User model
const OTP = require("../../models/OTP");   // Using your temp OTP model

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, otp, newPassword } = req.body;

  // 1. Validate Input
  if (!email || !otp || !newPassword) {
    return res.status(400).json({ msg: "Email, OTP, and New Password are required" });
  }

  try {
    // 2. Verify OTP exists and matches
    const validOtp = await OTP.findOne({ email, otp });
    if (!validOtp) {
      return res.status(400).json({ msg: "Invalid or expired OTP. Please try again." });
    }

    // 3. Find User in the database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    // 4. Hash the new password and save
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    // 5. Delete the OTP so it can't be used again
    await OTP.deleteOne({ _id: validOtp._id });

    res.json({ msg: "Password updated successfully! You can now login." });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;