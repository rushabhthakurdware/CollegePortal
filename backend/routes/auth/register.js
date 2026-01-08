const express = require("express");
const bcrypt = require("bcryptjs");

const Student = require("../../models/Student");
const Teacher = require("../../models/Teacher");
const Admin = require("../../models/Admin");

const router = express.Router();

router.post("/", async (req, res) => {
  const { username, email, password, role } = req.body;

  if (!username || !email || !password || !role) {
    return res.status(400).json({ msg: "All fields required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    let user;
    if (role === "student") {
      user = new Student({ username, email, password: hashedPassword });
    } else if (role === "teacher") {
      user = new Teacher({ username, email, password: hashedPassword });
    } else if (role === "admin") {
      user = new Admin({ username, email, password: hashedPassword });
    }

    await user.save();
    res.status(201).json({ msg: `${role} registered successfully` });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
