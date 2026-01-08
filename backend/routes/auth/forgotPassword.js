const express = require("express");


const router = express.Router();
const Student = require("../../models/Student");
const Teacher = require("../../models/Teacher");
const Admin = require("../../models/Admin");

router.post("/", async (req, res) => {
  const { email, role } = req.body;

  let user;
  if (role === "student") user = await Student.findOne({ email });
  else if (role === "teacher") user = await Teacher.findOne({ email });
  else if (role === "admin") user = await Admin.findOne({ email });

  if (!user) return res.status(404).json({ msg: "Email not found" });

  res.json({ msg: `Password reset link sent to ${email}` });
});

module.exports = router;
