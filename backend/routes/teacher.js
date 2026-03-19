const express = require("express");
const router = express.Router();
const Student = require("../models/User"); // Assuming students are in the same collection as users with role: "student"
const Teacher = require("../models/Teacher");
// Route for Teacher to update counts
router.post("/update-attendance", async (req, res) => {
  try {
    const { studentId, status } = req.body; // status: "Present" or "Absent"

    const updateField = status === "Present" ? { presentCount: 1 } : { absentCount: 1 };

    const updatedStudent = await Student.findByIdAndUpdate(
      { _id: studentId, role: "student" }, // 👈 Ensure they are actually a student
      { $inc: updateField },
      { new: true }
    );

    res.json({ 
      msg: "Attendance Updated", 
      present: updatedStudent.presentCount, 
      absent: updatedStudent.absentCount 
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// backend/routes/teacher.js

// Update Teacher Profile
router.put("/update/:id", async (req, res) => {
  try {
    const { department } = req.body;
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      { department },
      { new: true }
    );

    if (!updatedTeacher) {
      return res.status(404).json({ message: "Teacher not found in Database" });
    }

    res.json(updatedTeacher);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
});

module.exports = router; // 👈 CRITICAL: Is this line at the bottom?