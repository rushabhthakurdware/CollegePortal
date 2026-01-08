// const express = require("express");
// const bcrypt = require("bcryptjs");

// const Student = require("../../models/Student");
// const Teacher = require("../../models/Teacher");
// const Admin = require("../../models/Admin");

// const router = express.Router();


// router.post("/register", async (req, res) => {
//   const { username, email, password, role } = req.body;

//   if (!username || !email || !password || !role) {
//     return res.status(400).json({ msg: "All fields required" });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   let user;

//   if (role === "student") {
//     user = new Student({ username, email, password: hashedPassword });
//   } else if (role === "teacher") {
//     user = new Teacher({ username, email, password: hashedPassword });
//   } else if (role === "admin") {
//     user = new Admin({ username, email, password: hashedPassword });
//   }

//   await user.save();
//   res.status(201).json({ msg: `${role} registered successfully` });
// });


// /* ================= LOGIN ================= */
// router.post("/login", async (req, res) => {
//   const { username, password, role } = req.body;

//   if (!username || !password || !role) {
//     return res.status(400).json({ msg: "All fields required" });
//   }

//   let user;

//   try {
//     if (role === "student") {
//       user = await Student.findOne({ username });
//     } else if (role === "teacher") {
//       user = await Teacher.findOne({ username });
//     } else if (role === "admin") {
//       user = await Admin.findOne({ username });
//     } else {
//       return res.status(400).json({ msg: "Invalid role" });
//     }

//     if (!user) {
//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ msg: "Invalid credentials" });
//     }

//     res.json({
//       msg: "Login successful",
//       role: user.role,
//       username: user.username
//     });

//   } catch (error) {
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// /* ============ FORGOT PASSWORD ============ */
// router.post("/forgot-password", async (req, res) => {
//   const { email, role } = req.body;

//   if (!email || !role) {
//     return res.status(400).json({ msg: "Email and role required" });
//   }

//   let user;

//   try {
//     if (role === "student") {
//       user = await Student.findOne({ email });
//     } else if (role === "teacher") {
//       user = await Teacher.findOne({ email });
//     } else if (role === "admin") {
//       user = await Admin.findOne({ email });
//     }

//     if (!user) {
//       return res.status(404).json({ msg: "Email not found" });
//     }

//     // Later: send email (nodemailer)
//     res.json({ msg: `Password reset link sent to ${email}` });

//   } catch (error) {
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// module.exports = router;
