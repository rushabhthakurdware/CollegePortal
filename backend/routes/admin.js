const express = require("express");
const router = express.Router();

// ✅ Import Admin model
const Admin = require("../models/Admin");

// GET all admins from MongoDB
router.get("/", async (req, res) => {
  try {
    const admins = await Admin.find({});
    res.json(admins);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// backend/routes/admin.js (or routes/students.js)

// ✅ Admin: Delete a student by ID
router.delete("/delete-student/:id", async (req, res) => {
  try {
    const student = await User.findById(req.params.id);
    if (!student) return res.status(404).json({ error: "Not found" });

    const username = student.username;

    // 1. Delete user record
    await User.findByIdAndDelete(req.params.id);
    // 2. Delete their payment history
    await Payment.findOneAndDelete({ studentUsername: username });
    // 3. Remove them from all course enrollments
    await Course.updateMany({}, { $pull: { enrolledStudents: username } });

    res.json({ message: "Student and all associated records wiped." });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
