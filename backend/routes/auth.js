const express = require("express");
const router = express.Router();

// Dummy users
const users = [
  { id: 1, username: "student1", password: "123", role: "student", email: "student1@gmail.com" },
  { id: 2, username: "teacher1", password: "123", role: "teacher", email: "teacher1@gmail.com" },
  { id: 3, username: "admin1", password: "123", role: "admin", email: "admin1@gmail.com" },
];

// Login route
router.post("/login", (req, res) => {
  const { username, password, role } = req.body;
  const user = users.find(u => u.username === username && u.password === password && u.role === role);
  
  if (!user) return res.status(400).json({ msg: "Invalid credentials" });
  res.json({ msg: "Login successful", role: user.role, username: user.username });
});

// Forgot password route
router.post("/forgot-password", (req, res) => {
  const { email } = req.body;
  const user = users.find(u => u.email === email);

  if (!user) return res.status(404).json({ message: "Email not found!" });
  res.json({ message: `Reset link sent to ${email}` });
});

module.exports = router;
