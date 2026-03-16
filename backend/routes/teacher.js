const express = require("express");
const router = express.Router();
const Student = require("../models/User"); // Assuming students are in the same collection as users with role: "student"

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

module.exports = router;