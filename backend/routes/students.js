const express = require("express");
const router = express.Router();

// ⚠️ IMPORTANT: Ensure this points to your main User model 
// because students, teachers, and admins are usually in the same collection.
const User = require("../models/User");
const Course = require("../models/Course");

// ✅ 1. GET ALL STUDENTS
// This allows the Admin to see everyone with role: "student"
// URL: http://localhost:5000/api/students/all
// backend/routes/students.js

router.get("/all", async (req, res) => {
  try {
    // 1. Log EVERYTHING in the User collection to see what's actually there
    const allUsers = await User.find({});
    console.log("Full User List from DB:", allUsers); 

    // 2. Log specifically the students
    const students = await User.find({ role: "student" });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ 2. DELETE STUDENT (CASCADING)
// This removes the student from the DB and from any courses they joined
// URL: http://localhost:5000/api/students/delete/:id
router.delete("/delete/:id", async (req, res) => {
  try {
    const studentId = req.params.id;

    // Find student to get their username before deleting
    const student = await User.findById(studentId);
    if (!student) return res.status(404).json({ message: "Student not found" });

    const username = student.username;

    // 1. Remove from Users collection
    await User.findByIdAndDelete(studentId);

    // 2. Remove from all course enrollment lists ($pull removes them from the array)
    await Course.updateMany(
      {}, 
      { $pull: { enrolledStudents: username } }
    );

    res.json({ message: "Student deleted and unenrolled from all courses" });
  } catch (error) {
    res.status(500).json({ message: "Server error during deletion" });
  }
});

// ✅ 3. GET ONE STUDENT BY USERNAME
// URL: http://localhost:5000/api/students/user/:username
router.get("/user/:username", async (req, res) => {
  try {
    const student = await User.findOne({ username: req.params.username, role: "student" }).select("-password");
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;