const express = require("express");
const bcrypt = require("bcryptjs");

const Student = require("../../models/Student");
const Teacher = require("../../models/Teacher");
const Admin = require("../../models/Admin");

const router = express.Router();

router.post("/", async (req, res) => {
  const { email, newPassword, role } = req.body;

  if (!email || !newPassword || !role) {
    return res.status(400).json({ msg: "All fields required" });
  }

  try {
    let user;

    if (role === "student") {
      user = await Student.findOne({ email });
    } else if (role === "teacher") {
      user = await Teacher.findOne({ email });
    } else if (role === "admin") {
      user = await Admin.findOne({ email });
    }

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ msg: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
