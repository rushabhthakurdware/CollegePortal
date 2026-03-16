const express = require("express");
const router = express.Router();
const User = require("../../models/User"); // Using your main User model
const OTP = require("../../models/OTP");   // The temporary code collection
const sendEmail = require("../../utils/sendEmail"); // Your Nodemailer utility

router.post("/", async (req, res) => {
  const { email } = req.body;

  try {
    // 1. Check if the user exists in your Database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ msg: "This email is not registered with YCCE." });
    }

    // 2. Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // 3. Save OTP to the temporary collection (Overwrites if one already exists for this email)
    await OTP.findOneAndUpdate(
      { email },
      { otp, createdAt: Date.now() },
      { upsert: true, new: true }
    );

    // 4. Send the actual email using Nodemailer
    await sendEmail({
      email: email,
      subject: "YCCE Portal: Password Reset OTP",
      html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2 style="color: #4f46e5;">Password Reset Request</h2>
          <p>Hello ${user.name || 'User'},</p>
          <p>You requested to reset your password. Use the 6-digit OTP below to proceed:</p>
          <div style="background: #f3f4f6; padding: 15px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: #1e1b4b;">
            ${otp}
          </div>
          <p style="margin-top: 20px; font-size: 12px; color: #666;">This code will expire in 5 minutes.</p>
        </div>
      `,
    });

    res.json({ msg: "A 6-digit OTP has been sent to your email address." });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ msg: "Server error. Could not send email." });
  }
});

module.exports = router;