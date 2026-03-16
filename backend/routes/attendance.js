const express = require("express");
const router = express.Router();
const Student = require("../models/User"); // Assuming students are in the same collection as users with role: "student"

// ✅ 1. ADD THIS: Route for Teacher to update counts (POST)
// URL: http://localhost:5000/api/attendance/update
router.post("/update", async (req, res) => {
  try {
    const { studentId, status } = req.body; // status: "Present" or "Absent"

    // Determine which counter to increment
    const updateField = status === "Present" ? { presentCount: 1 } : { absentCount: 1 };

    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { $inc: updateField }, // Increments the value in MongoDB by 1
      { new: true }
    );

    if (!updatedStudent) return res.status(404).json({ message: "Student not found" });

    res.json({ 
      msg: "Attendance Updated", 
      present: updatedStudent.presentCount, 
      absent: updatedStudent.absentCount 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ 2. KEEP THIS: Route for Student Dashboard (GET)
// URL: http://localhost:5000/api/attendance/stats/:studentId
router.get("/stats/:studentId", async (req, res) => {
  try {
    const student = await Student.findById(req.params.studentId);
    
    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    const present = student.presentCount || 0;
    const absent = student.absentCount || 0;
    const total = present + absent;
    const percentage = total > 0 ? Math.round((present / total) * 100) : 0;

    res.json({ total:total, present:present, absent:absent, percentage:percentage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;