const express = require("express");


const router = express.Router();
const bcrypt = require("bcryptjs");
const Student = require("../../models/Student");
const Teacher = require("../../models/Teacher");
const Admin = require("../../models/Admin");

router.post("/", async (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ msg: "All fields required" });
  }

  let user;
  if (role === "student") {
    user = await Student.findOne({ username });
  } else if (role === "teacher") {
    user = await Teacher.findOne({ username });
  } else if (role === "admin") {
    user = await Admin.findOne({ username });
  }

  if (!user) return res.status(400).json({ msg: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

  res.json({ msg: "Login successful", role: user.role, username: user.username });
});

module.exports = router;
